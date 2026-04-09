(function () {
  const MOUNT_ID = "contacts-section-container";

  function getLanguage() {
    if (window.I18n && typeof window.I18n.getCurrentLanguage === "function") {
      return window.I18n.getCurrentLanguage();
    }
    return localStorage.getItem("lang") || "en";
  }

  function localize(value, lang) {
    if (!value || typeof value !== "object") return value || "";
    return value[lang] || value.en || "";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderMapCard(location, lang) {
    const name = escapeHtml(localize(location.name, lang));
    const address = escapeHtml(localize(location.address, lang));
    const mapTitle = escapeHtml(localize(location.mapTitle, lang) || name);
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
    if (!contacts || !mount) return;

    const lang = getLanguage();
    const section = contacts.section || {};
    const form = contacts.form || {};
    const fields = form.fields || {};
    const locations = Array.isArray(contacts.locations) ? contacts.locations.slice(0, 2) : [];

    const mapCards = locations.map((location) => renderMapCard(location, lang)).join("");

    mount.innerHTML = `
      <div class="container">
        <div class="contacts-section-header text-center">
          <p class="contacts-eyebrow">${escapeHtml(localize(section.eyebrow, lang))}</p>
          <h4 class="heading-decorated contacts-title">${escapeHtml(localize(section.title, lang))}</h4>
          <p class="contacts-intro">${escapeHtml(localize(section.intro, lang))}</p>
        </div>
        <div class="contacts-layout">
          <article class="contacts-form-card">
            <h5>${escapeHtml(localize(form.title, lang))}</h5>
            <form class="rd-mailform text-left" data-form-output="form-output-global" data-form-type="contact" method="${escapeHtml(form.method || "post")}" action="${escapeHtml(form.action || "bat/rd-mailform.php")}">
              <div class="form-wrap">
                <label class="form-label" for="contacts-name">${escapeHtml(localize(fields.name, lang))}</label>
                <input class="form-input" id="contacts-name" type="text" name="name" data-constraints="@Required" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="contacts-phone">${escapeHtml(localize(fields.phone, lang))}</label>
                <input class="form-input" id="contacts-phone" type="text" name="phone" data-constraints="@Numeric @Required" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="contacts-email">${escapeHtml(localize(fields.email, lang))}</label>
                <input class="form-input" id="contacts-email" type="email" name="email" data-constraints="@Email @Required" />
              </div>
              <div class="form-wrap">
                <label class="form-label" for="contacts-message">${escapeHtml(localize(fields.message, lang))}</label>
                <textarea class="form-input" id="contacts-message" name="message" data-constraints="@Required"></textarea>
              </div>
              <div class="form-wrap contacts-form-actions">
                <button class="button button-primary" type="submit">${escapeHtml(localize(form.submitLabel, lang))}</button>
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

  document.addEventListener("DOMContentLoaded", renderContactsSection);
  document.addEventListener("languageChanged", renderContactsSection);

  window.RafinSections = window.RafinSections || {};
  window.RafinSections.renderContactsSection = renderContactsSection;
})();
