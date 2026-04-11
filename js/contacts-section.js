(function () {
  const MOUNT_ID = "contacts-section-container";

  function getLocalizedValue(value) {
    return window.I18n.getLocalizedValue(value);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderMapCard(location) {
    const name = escapeHtml(getLocalizedValue(location.name));
    const address = escapeHtml(getLocalizedValue(location.address));
    const mapTitle = escapeHtml(getLocalizedValue(location.mapTitle) || name);
    const mapUrl = escapeHtml(location.mapEmbedUrl || "about:blank");

    return `
      <article class="contacts-map-card">
        <div class="contacts-map-frame">
          <iframe src="${mapUrl}" title="${mapTitle}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div class="contacts-map-copy">
          <h6>${name}</h6>
          <p>${address}</p>
        </div>
      </article>
    `;
  }

  function renderContactsSection() {
    const contacts = window.siteData?.contacts;
    const mount = document.getElementById(MOUNT_ID);
    if (!contacts || !mount || !window.I18n || typeof window.I18n.getLocalizedValue !== "function") return;

    const section = contacts.section || {};
    const form = contacts.form || {};
    const fields = form.fields || {};
    const locations = Array.isArray(contacts.locations) ? contacts.locations.slice(0, 2) : [];
    const formStartedAt = Math.floor(Date.now() / 1000);
    const formAction = "bat/rd-mailform.php";

    const mapCards = locations.map((location) => renderMapCard(location)).join("");

    mount.innerHTML = `
      <div class="container">
        <div class="contacts-section-header text-center">
          <p class="contacts-eyebrow">${escapeHtml(getLocalizedValue(section.eyebrow))}</p>
          <h4 class="heading-decorated contacts-title">${escapeHtml(getLocalizedValue(section.title))}</h4>
          <p class="contacts-intro">${escapeHtml(getLocalizedValue(section.intro))}</p>
        </div>
        <div class="contacts-layout">
          <article class="contacts-form-card">
            <h5>${escapeHtml(getLocalizedValue(form.title))}</h5>
            <form class="rd-mailform text-left" data-form-output="form-output-global" data-form-type="contact" method="${escapeHtml(form.method || "post")}" action="${formAction}">
              <div class="form-wrap">
                <label class="form-label" for="contacts-name">${escapeHtml(getLocalizedValue(fields.name))}</label>
                <input class="form-input" id="contacts-name" type="text" name="name" data-constraints="@Required" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="contacts-phone">${escapeHtml(getLocalizedValue(fields.phone))}</label>
                <input class="form-input" id="contacts-phone" type="tel" name="phone" inputmode="tel" autocomplete="tel" data-constraints="@Required" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="contacts-email">${escapeHtml(getLocalizedValue(fields.email))}</label>
                <input class="form-input" id="contacts-email" type="email" name="email" data-constraints="@Email @Required" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="contacts-message">${escapeHtml(getLocalizedValue(fields.message))}</label>
                <textarea class="form-input" id="contacts-message" name="message" data-constraints="@Required"></textarea>
              </div>
              <input type="hidden" name="form-type" value="contact" />
              <input type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;" />
              <input type="hidden" name="form_started_at" value="${formStartedAt}" />
              <div class="form-wrap contacts-form-actions">
                <button class="button button-primary" type="submit">${escapeHtml(getLocalizedValue(form.submitLabel))}</button>
              </div>
            </form>
          </article>
          <div class="contacts-maps-grid">
            ${mapCards}
          </div>
        </div>
      </div>
    `;
  }

  renderContactsSection();
  document.addEventListener("languageChanged", renderContactsSection);

  window.RafinSections = window.RafinSections || {};
  window.RafinSections.renderContactsSection = renderContactsSection;
})();
