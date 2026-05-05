(function () {
  const MOUNT_ID = "career-application-container";
  const SECTION_ID = "career-application";
  const FORM_ID = "career-application-form";
  const SELECT_ID = "career-job-position";
  const MESSAGE_ID = "career-application-message";
  const FORM_OUTPUT_ID = "form-output-global";
  const FORM_ACTION = "bat/rd-mailform.php";

  let pendingSelection = "";

  function getLocalizedValue(value) {
    return window.I18n.getLocalizedValue(value);
  }

  function translate(key, fallback) {
    if (window.I18n && typeof window.I18n.translate === "function") {
      return window.I18n.translate(key) || fallback;
    }

    return fallback;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getSortedJobs() {
    const jobs = window.siteData?.jobs;
    if (!Array.isArray(jobs)) return [];
    return [...jobs].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function getJobById(jobId) {
    return getSortedJobs().find((job) => job.id === jobId) || null;
  }

  function renderJobOptions() {
    const placeholder = escapeHtml(translate("Select Job Position", "Select Job Position"));
    const options = getSortedJobs()
      .map((job) => {
        const title = escapeHtml(getLocalizedValue(job.title));
        const category = escapeHtml(getLocalizedValue(job.category));
        const isSelected = pendingSelection === job.id ? " selected" : "";
        return `<option value="${title}" data-job-id="${escapeHtml(job.id)}"${isSelected}>${title} - ${category}</option>`;
      })
      .join("");

    return `<option value="">${placeholder}</option>${options}`;
  }

  function renderCareerApplicationSection() {
    const mount = document.getElementById(MOUNT_ID);
    const contacts = window.siteData?.contacts;
    if (!mount || !contacts || !window.I18n || typeof window.I18n.getLocalizedValue !== "function") return;

    const fields = contacts.form?.fields || {};
    const formStartedAt = Math.floor(Date.now() / 1000);
    const sectionEyebrow = translate("Career Application Eyebrow", "Careers Contact");
    const sectionTitle = translate("Career Application Title", "Apply for a Role");
    const sectionIntro = translate(
      "Career Application Intro",
      "Send your application directly from this page and choose the position you want to apply for."
    );
    const formTitle = translate("Career Application Form Title", "Application Form");
    const positionLabel = translate("Job Position", "Job Position");
    const cvLabel = getLocalizedValue(fields.cv) || "Upload CV / Document";
    const messageTemplate = translate("Career Application Message Template", "I am applying for: {{title}}");

    mount.innerHTML = `
      <div class="container">
        <div class="contacts-section-header text-center">
          <p class="contacts-eyebrow">${escapeHtml(sectionEyebrow)}</p>
          <h4 class="heading-decorated contacts-title">${escapeHtml(sectionTitle)}</h4>
          <p class="contacts-intro">${escapeHtml(sectionIntro)}</p>
        </div>
        <div class="contacts-layout career-application-layout">
          <article class="contacts-form-card career-application-form-card">
            <h5>${escapeHtml(formTitle)}</h5>
            <form id="${FORM_ID}" class="rd-mailform text-left" data-form-output="${FORM_OUTPUT_ID}" data-form-type="job-application" method="post" action="${FORM_ACTION}" enctype="multipart/form-data">
              <div class="form-wrap">
                <label class="form-label" for="career-application-name">${escapeHtml(getLocalizedValue(fields.name))}</label>
                <input class="form-input" id="career-application-name" type="text" name="name" data-constraints="@Required" required />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="career-application-phone">${escapeHtml(getLocalizedValue(fields.phone))}</label>
                <input class="form-input" id="career-application-phone" type="tel" name="phone" inputmode="tel" autocomplete="tel" data-constraints="@Required" required />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="career-application-email">${escapeHtml(getLocalizedValue(fields.email))}</label>
                <input class="form-input" id="career-application-email" type="email" name="email" data-constraints="@Email @Required" required />
              </div>
              <div class="form-wrap">
                <label class="form-label-outside" for="${SELECT_ID}">${escapeHtml(positionLabel)}</label>
                <select class="form-input" id="${SELECT_ID}" name="job_position" data-constraints="@Required" required>
                  ${renderJobOptions()}
                </select>
              </div>
              <div class="form-wrap form-wrap--file">
                <label class="form-label-outside" for="career-application-cv">${escapeHtml(cvLabel)}</label>
                <input class="form-input" id="career-application-cv" type="file" name="cv" accept=".pdf,.doc,.docx" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="${MESSAGE_ID}">${escapeHtml(getLocalizedValue(fields.message))}</label>
                <textarea class="form-input" id="${MESSAGE_ID}" name="message" data-message-template="${escapeHtml(messageTemplate)}" data-constraints="@Required" required></textarea>
              </div>
              <input type="hidden" name="form-type" value="job-application" />
              <input class="form-honeypot" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input type="hidden" name="form_started_at" value="${formStartedAt}" />
              <div class="form-wrap contacts-form-actions">
                <button class="button button-primary" type="submit">${escapeHtml(getLocalizedValue(contacts.form?.submitLabel) || "Send")}</button>
              </div>
            </form>
          </article>
        </div>
      </div>
    `;

    // Reinitialize form labels for focus/blur handling
    if (window.jQuery) {
      window.jQuery(".form-label").RDInputLabel();
    }

    if (pendingSelection) {
      selectJob(pendingSelection, { scroll: false, focus: false });
    }
  }

  function prefillMessage(job, textarea) {
    if (!job || !textarea) return;

    const template = textarea.getAttribute("data-message-template") || "I am applying for: {{title}}";
    const title = getLocalizedValue(job.title);
    const nextValue = template.replace("{{title}}", title);
    const currentValue = String(textarea.value || "").trim();

    if (!currentValue) {
      textarea.value = nextValue;
      return;
    }

    const lines = currentValue
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.startsWith(template.split("{{title}}")[0].trim()));

    textarea.value = [nextValue, ...lines].join("\n");
  }

  function selectJob(jobId, options) {
    const config = options || {};
    const select = document.getElementById(SELECT_ID);
    const textarea = document.getElementById(MESSAGE_ID);
    const section = document.getElementById(SECTION_ID);
    const job = getJobById(jobId);

    pendingSelection = jobId || "";

    if (!select || !textarea || !section || !job) return false;

    const selectedOption = select.querySelector(`option[data-job-id="${job.id}"]`);
    if (!selectedOption) return false;

    select.value = selectedOption.value;
    prefillMessage(job, textarea);

    ["input", "change", "blur"].forEach((eventName) => {
      select.dispatchEvent(new Event(eventName, { bubbles: true }));
      textarea.dispatchEvent(new Event(eventName, { bubbles: true }));
    });

    if (config.scroll !== false) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (config.focus !== false) {
      window.setTimeout(() => {
        if (typeof select.focus === "function") {
          select.focus({ preventScroll: true });
        }
      }, 260);
    }

    return true;
  }

  document.addEventListener("DOMContentLoaded", renderCareerApplicationSection);
  document.addEventListener("languageChanged", renderCareerApplicationSection);

  window.RafinCareerApplication = {
    render: renderCareerApplicationSection,
    selectJob
  };
})();
