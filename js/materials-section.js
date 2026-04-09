(function () {
  const MOUNT_ID = "materials-section-container";

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

  function renderMaterialsSection() {
    const materials = window.siteData?.materials;
    const mount = document.getElementById(MOUNT_ID);
    if (!materials || !mount) return;

    const lang = getLanguage();
    const section = materials.section || {};
    const items = Array.isArray(materials.items)
      ? [...materials.items].sort((a, b) => (a.order || 0) - (b.order || 0))
      : [];

    const cardsHtml = items
      .map((item) => {
        const title = escapeHtml(localize(item.title, lang));
        const summary = escapeHtml(localize(item.summary, lang));
        const image = escapeHtml(item.image || "images/project-1-480x361.jpg");
        const imageAlt = escapeHtml(localize(item.imageAlt, lang) || title);

        return `
          <article class="materials-card">
            <figure class="materials-card__media">
              <img src="${image}" alt="${imageAlt}" loading="lazy" />
            </figure>
            <div class="materials-card__body">
              <h6>${title}</h6>
              <p>${summary}</p>
            </div>
          </article>
        `;
      })
      .join("");

    const ctaHref = escapeHtml(section.ctaHref || "#contacts");

    mount.innerHTML = `
      <div class="container">
        <div class="materials-layout">
          <div class="materials-copy">
            <p class="materials-eyebrow">${escapeHtml(localize(section.eyebrow, lang))}</p>
            <h4 class="heading-decorated materials-title">${escapeHtml(localize(section.title, lang))}</h4>
            <p class="materials-intro">${escapeHtml(localize(section.intro, lang))}</p>
            <p class="materials-note">${escapeHtml(localize(section.recyclingNote, lang))}</p>
            <a class="button button-primary" href="${ctaHref}">${escapeHtml(localize(section.ctaLabel, lang))}</a>
          </div>
          <div class="materials-grid">
            ${cardsHtml}
          </div>
        </div>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", renderMaterialsSection);
  document.addEventListener("languageChanged", renderMaterialsSection);

  window.RafinSections = window.RafinSections || {};
  window.RafinSections.renderMaterialsSection = renderMaterialsSection;
})();
