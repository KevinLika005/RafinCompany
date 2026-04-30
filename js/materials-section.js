(function () {
  const MOUNT_ID = "materials-section-container";

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

  function renderMaterialsSection() {
    const materials = window.siteData?.materials;
    const mount = document.getElementById(MOUNT_ID);
    if (!materials || !mount || !window.I18n || typeof window.I18n.getLocalizedValue !== "function") return;

    const section = materials.section || {};
    const items = Array.isArray(materials.items)
      ? [...materials.items].sort((a, b) => (a.order || 0) - (b.order || 0))
      : [];

    const cardsHtml = items
      .map((item, index) => {
        const title = escapeHtml(getLocalizedValue(item.title));
        const summary = escapeHtml(getLocalizedValue(item.summary));
        const image = escapeHtml(item.image || "images/project-1-480x361.jpg");
        const imageAlt = escapeHtml(getLocalizedValue(item.imageAlt) || title);
        const loading = index === 0 ? "eager" : "auto";
        const fetchPriority = index === 0 ? "high" : "auto";

        return `
          <article class="materials-card">
            <figure class="materials-card__media">
              <img src="${image}" alt="${imageAlt}" width="480" height="360" loading="${loading}" decoding="async" fetchpriority="${fetchPriority}" />
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
            <p class="materials-eyebrow">${escapeHtml(getLocalizedValue(section.eyebrow))}</p>
            <h4 class="heading-decorated materials-title">${escapeHtml(getLocalizedValue(section.title))}</h4>
            <p class="materials-intro">${escapeHtml(getLocalizedValue(section.intro))}</p>
            <p class="materials-note">${escapeHtml(getLocalizedValue(section.recyclingNote))}</p>
            <a class="button button-primary" href="${ctaHref}">${escapeHtml(getLocalizedValue(section.ctaLabel))}</a>
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
