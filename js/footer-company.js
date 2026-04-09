(function () {
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

  function t(lang, enText, sqText) {
    return lang === "sq" ? sqText : enText;
  }

  function renderStats(site, lang) {
    const statsContainer = document.getElementById("home-stats-container");
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="row justify-content-md-center row-50 home-stats-grid">
        <div class="col-md-4 col-lg-4">
          <article class="box-counter home-stat-card">
            <div class="box-counter__wrap"><div class="counter">${site.stats.completedProjects}</div></div>
            <p class="box-counter__title">${t(lang, "Projects Completed", "Projekte te Perfunduara")}</p>
          </article>
        </div>
        <div class="col-md-4 col-lg-4">
          <article class="box-counter home-stat-card">
            <div class="box-counter__wrap"><div class="counter">${site.stats.staff}</div></div>
            <p class="box-counter__title">${t(lang, "Staff Members", "Anetare te Stafit")}</p>
          </article>
        </div>
        <div class="col-md-4 col-lg-4">
          <article class="box-counter home-stat-card">
            <div class="box-counter__wrap"><div class="counter">${site.stats.certifications}</div></div>
            <p class="box-counter__title">${t(lang, "Certifications", "Certifikime")}</p>
          </article>
        </div>
      </div>
    `;
  }

  function renderFooter(site, departments, lang) {
    const footerContainer = document.getElementById("footer-company-container");
    if (!footerContainer) return;

    const depsHtml = departments
      .map(
        (dep) => `
          <article class="footer-department-card">
            <h6>${escapeHtml(localize(dep.name, lang))}</h6>
            <ul>
              <li>
                <a href="mailto:${escapeHtml(dep.email)}">
                  <span class="icon linear-icon-envelope"></span>
                  <span>${escapeHtml(dep.email)}</span>
                </a>
              </li>
              <li>
                <a href="tel:${escapeHtml(dep.phone)}">
                  <span class="icon linear-icon-telephone"></span>
                  <span>${escapeHtml(dep.phone)}</span>
                </a>
              </li>
            </ul>
          </article>
        `
      )
      .join("");

    const addressLine = `${site.address.street}, ${site.address.property}, ${site.address.city}, ${site.address.country}`;

    footerContainer.innerHTML = `
      <section class="section-lg redesign-footer-main">
        <div class="container">
          <div class="row row-50">
            <div class="col-lg-4">
              <div class="footer-brand-wrap">
                <a href="index.html" class="brand-name">
                  <img src="images/logo-inverse-304x39.png" alt="${escapeHtml(site.companyName)}" width="180" height="23" />
                </a>
                <p>${escapeHtml(site.companyName)} est. ${escapeHtml(site.established)}</p>
              </div>
              <div class="footer-address-card">
                <h6>${t(lang, "Address", "Adresa")}</h6>
                <p>${escapeHtml(addressLine)}</p>
              </div>
              <ul class="footer-social-list">
                <li><a aria-label="LinkedIn" class="fa fa-linkedin" href="${escapeHtml(site.socialLinks.linkedin)}" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a aria-label="Instagram" class="fa fa-instagram" href="${escapeHtml(site.socialLinks.instagram)}" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a aria-label="Facebook" class="fa fa-facebook" href="${escapeHtml(site.socialLinks.facebook)}" target="_blank" rel="noopener noreferrer"></a></li>
              </ul>
            </div>
            <div class="col-lg-8">
              <div class="footer-section-head">
                <h5>${t(lang, "Departments", "Departamentet")}</h5>
              </div>
              <div class="footer-departments-grid">
                ${depsHtml}
              </div>
              <div class="footer-newsletter">
                <h6>${t(lang, "Get In Touch", "Na Kontaktoni")}</h6>
                <form class="rd-mailform footer-inline-form" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
                  <div class="form-wrap">
                    <label class="form-label" for="footer-email">${t(lang, "E-Mail", "E-Mail")}</label>
                    <input class="form-input" id="footer-email" type="email" name="email" data-constraints="@Email @Required" />
                  </div>
                  <button class="button button-primary" type="submit">${t(lang, "Send", "Dergo")}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer-corporate redesign-footer-bottom">
        <div class="container">
          <div class="footer-corporate__inner">
            <p class="rights"><span>${escapeHtml(site.companyName.toUpperCase())} &copy; </span><span class="copyright-year">${new Date().getFullYear()}</span><span>. ${t(lang, "All Rights Reserved", "Te Gjitha te Drejtat e Rezervuara")}</span></p>
          </div>
        </div>
      </footer>
    `;
  }

  function initFooterCompany() {
    const site = window.siteData?.site;
    const departments = window.siteData?.departments;
    if (!site || !Array.isArray(departments)) return;

    const lang = getLanguage();
    renderStats(site, lang);
    renderFooter(site, departments, lang);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooterCompany);
  } else {
    initFooterCompany();
  }

  document.addEventListener("languageChanged", initFooterCompany);
})();
