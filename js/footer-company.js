const initFooterCompany = () => {
  const site = window.siteData?.site;
  const departments = window.siteData?.departments;
  
  if (!site || !departments) return;

  const currentLang = (window.I18n && window.I18n.getCurrentLanguage) ? window.I18n.getCurrentLanguage() : (localStorage.getItem('lang') || 'en');
  
  // 1. Update Homepage Stats
  const statsContainer = document.getElementById('home-stats-container');
  if (statsContainer) {
    statsContainer.innerHTML = `
      <div class="row justify-content-md-center row-50">
        <div class="col-md-4 col-lg-4">
          <article class="box-counter">
            <div class="box-counter__wrap"><div class="counter">${site.stats.completedProjects}</div></div>
            <p class="box-counter__title" data-i18n="Projects Completed">${currentLang === 'sq' ? 'Projekte të Përfunduara' : 'Projects Completed'}</p>
          </article>
        </div>
        <div class="col-md-4 col-lg-4">
          <article class="box-counter">
            <div class="box-counter__wrap"><div class="counter">${site.stats.staff}</div></div>
            <p class="box-counter__title" data-i18n="Staff Members">${currentLang === 'sq' ? 'Anëtarë të Stafit' : 'Staff members'}</p>
          </article>
        </div>
        <div class="col-md-4 col-lg-4">
          <article class="box-counter">
            <div class="box-counter__wrap"><div class="counter">${site.stats.certifications}</div></div>
            <p class="box-counter__title" data-i18n="Certifications">${currentLang === 'sq' ? 'Certifikime' : 'Certifications'}</p>
          </article>
        </div>
      </div>
    `;
  }

  // 2. Render Footer
  const footerContainer = document.getElementById('footer-company-container');
  if (footerContainer) {
    const depsHtml = departments.map(dep => `
      <div class="col-sm-12 col-md-4 mb-4">
        <h6 class="text-white mb-2">${dep.name[currentLang] || dep.name.en}</h6>
        <ul class="list-unstyled text-gray-light" style="font-size: 14px; line-height: 1.8;">
          <li><a href="mailto:${dep.email}" class="text-gray-light"><span class="icon linear-icon-envelope icon-sm"></span> ${dep.email}</a></li>
          <li><a href="tel:${dep.phone}" class="text-gray-light"><span class="icon linear-icon-telephone icon-sm"></span> ${dep.phone}</a></li>
        </ul>
      </div>
    `).join('');

    footerContainer.innerHTML = `
      <section class="section-md bg-gray-darker text-left">
        <div class="container">
          <div class="row row-50 justify-content-between">
            <div class="col-md-6 col-lg-4">
              <a href="index.html" class="brand-name mb-4 d-block">
                <img src="images/logo-inverse-304x39.png" alt="${site.companyName}" width="160" />
              </a>
              <p class="text-gray-light mb-4" style="font-size: 14px; line-height: 1.8;">
                ${site.companyName} est. ${site.established}.<br>
                ${site.address.street}, ${site.address.property}<br>
                ${site.address.city}, ${site.address.country}.
              </p>
              <ul class="list-inline-xxs">
                <li><a class="icon icon-xxs icon-gray-darker fa fa-linkedin text-white" href="${site.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a class="icon icon-xxs icon-gray-darker fa fa-instagram text-white" href="${site.socialLinks.instagram}" target="_blank" rel="noopener noreferrer"></a></li>
                <li><a class="icon icon-xxs icon-gray-darker fa fa-facebook text-white" href="${site.socialLinks.facebook}" target="_blank" rel="noopener noreferrer"></a></li>
              </ul>
            </div>
            <div class="col-md-6 col-lg-7">
              <h5 class="text-white mb-4" data-i18n="Departments">${currentLang === 'sq' ? 'Departamentet' : 'Departments'}</h5>
              <div class="row">
                ${depsHtml}
              </div>
              <hr style="border-color: rgba(255,255,255,0.1); margin: 20px 0;">
              <div>
                <h6 class="text-white mb-3" data-i18n="Get In Touch">${currentLang === 'sq' ? 'Na Kontaktoni' : 'Get In Touch'}</h6>
                <form class="rd-mailform d-flex align-items-center" style="max-width: 400px; gap: 10px;">
                  <div class="form-wrap" style="flex: 1; margin: 0;">
                    <input class="form-input" id="footer-email" type="email" name="email" placeholder="${currentLang === 'sq' ? 'E-maili juaj' : 'Your e-mail'}" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff;">
                  </div>
                  <button class="button button-primary button-sm" type="submit">${currentLang === 'sq' ? 'Dërgo' : 'Send'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="footer-corporate bg-gray-dark align-items-center">
        <div class="container">
          <div class="footer-corporate__inner d-flex justify-content-between align-items-center py-3">
            <p class="rights mb-0"><span>${site.companyName.toUpperCase()} &copy;</span><span class="copyright-year">${new Date().getFullYear()}</span>. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    `;
  }
};

// Call immediately at parse-time: all data scripts are already loaded synchronously above,
// so we can inject footer/stats HTML before core.min.js captures plugins.counter.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooterCompany);
} else {
  // DOMContentLoaded already fired (shouldn't happen in normal flow, safety net)
  initFooterCompany();
}

// If i18n triggers a language change, rerender
document.addEventListener('languageChanged', (e) => {
  initFooterCompany();
});
