(function () {
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

  function t(key, fallback) {
    const translated = window.I18n.translate(key);
    return translated && translated !== key ? translated : fallback;
  }

  function isRenderableSocialUrl(url) {
    if (!url || typeof url !== "string") return false;
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) return false;

    const placeholders = new Set([
      "https://www.linkedin.com/",
      "https://www.instagram.com/",
      "https://www.facebook.com/"
    ]);
    return !placeholders.has(trimmed.toLowerCase());
  }

  function renderStats(site) {
    const statsContainer = document.getElementById("home-stats-container");
    if (!statsContainer) return;

    statsContainer.innerHTML = `
      <div class="row justify-content-md-center row-50 home-stats-grid">
        <div class="col-md-4 col-lg-4">
          <article class="box-counter home-stat-card">
            <div class="box-counter__wrap"><div class="counter">${site.stats.completedProjects}</div></div>
            <p class="box-counter__title">${escapeHtml(t("Projects Completed", "Projects Completed"))}</p>
          </article>
        </div>
        <div class="col-md-4 col-lg-4">
          <article class="box-counter home-stat-card">
            <div class="box-counter__wrap"><div class="counter">${site.stats.staff}</div></div>
            <p class="box-counter__title">${escapeHtml(t("Staff Members", "Staff Members"))}</p>
          </article>
        </div>
        <div class="col-md-4 col-lg-4">
          <article class="box-counter home-stat-card">
            <div class="box-counter__wrap"><div class="counter">${site.stats.certifications}</div></div>
            <p class="box-counter__title">${escapeHtml(t("Certifications", "Certifications"))}</p>
          </article>
        </div>
      </div>
    `;
  }

  function renderFooter(site, departments) {
    const footerContainer = document.getElementById("footer-company-container");
    if (!footerContainer) return;

    const depsHtml = departments
      .map(
        (dep) => `
          <article class="footer-department-card">
            <h6>${escapeHtml(getLocalizedValue(dep.name))}</h6>
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

    const socialLinks = site.socialLinks || {};
    const socialConfig = [
      { key: "linkedin", label: "LinkedIn", iconClass: "fa fa-linkedin" },
      { key: "instagram", label: "Instagram", iconClass: "fa fa-instagram" },
      { key: "facebook", label: "Facebook", iconClass: "fa fa-facebook" }
    ];
    const socialLinksHtml = socialConfig
      .filter((item) => isRenderableSocialUrl(socialLinks[item.key]))
      .map(
        (item) =>
          `<li><a aria-label="${item.label}" class="${item.iconClass}" href="${escapeHtml(socialLinks[item.key])}" target="_blank" rel="noopener noreferrer"></a></li>`
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
                <h6>${escapeHtml(t("Address", "Address"))}</h6>
                <p>${escapeHtml(addressLine)}</p>
              </div>
              ${socialLinksHtml ? `<ul class="footer-social-list">${socialLinksHtml}</ul>` : ""}
            </div>
            <div class="col-lg-8">
              <div class="footer-section-head">
                <h5>${escapeHtml(t("Departments", "Departments"))}</h5>
              </div>
              <div class="footer-departments-grid">
                ${depsHtml}
              </div>
              <div class="footer-newsletter">
                <h6>${escapeHtml(t("Get In Touch", "Get In Touch"))}</h6>
                <form class="rd-mailform footer-inline-form" data-form-output="form-output-global" data-form-type="subscribe" method="post" action="bat/rd-mailform.php">
                  <div class="form-wrap">
                    <label class="form-label" for="footer-email">${escapeHtml(t("E-Mail", "E-Mail"))}</label>
                    <input class="form-input" id="footer-email" type="email" name="email" data-constraints="@Email @Required" />
                  </div>
                  <button class="button button-primary" type="submit">${escapeHtml(t("Send", "Send"))}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer-corporate redesign-footer-bottom">
        <div class="container">
          <div class="footer-corporate__inner">
            <p class="rights"><span>${escapeHtml(site.companyName.toUpperCase())} &copy; </span><span class="copyright-year">${new Date().getFullYear()}</span><span>. ${escapeHtml(t("All Rights Reserved", "All Rights Reserved"))}</span></p>
          </div>
        </div>
      </footer>
    `;
  }

  function initFooterCompany() {
    const site = window.siteData?.site;
    const departments = window.siteData?.departments;
    if (!site || !Array.isArray(departments) || !window.I18n || typeof window.I18n.getLocalizedValue !== "function") return;

    renderStats(site);
    renderFooter(site, departments);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFooterCompany);
  } else {
    initFooterCompany();
  }

  document.addEventListener("languageChanged", initFooterCompany);
})();
