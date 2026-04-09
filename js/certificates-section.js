(function () {
  function renderCertificates() {
    const certificates = window.siteData?.certificates;
    const container = document.getElementById("certificates-container");
    if (!Array.isArray(certificates) || !container) return;

    const sorted = [...certificates].sort((a, b) => (a.order || 0) - (b.order || 0));

    container.innerHTML = `
      <div class="row row-30 justify-content-center">
        ${sorted
          .map((cert) => {
            const fontSize = cert.name.length > 20 ? 13 : cert.name.length > 15 ? 15 : 17;
            return `
              <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                <article class="certificate-badge" aria-label="${cert.name}">
                  <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
                    <defs>
                      <path id="top-arc-${cert.id}" d="M 25 100 A 75 75 0 0 1 175 100" fill="transparent" />
                      <path id="bottom-arc-${cert.id}" d="M 10 100 A 90 90 0 0 0 190 100" fill="transparent" />
                    </defs>
                    <text class="certificate-badge__ring" font-size="14" letter-spacing="1.5">
                      <textPath href="#top-arc-${cert.id}" startOffset="50%" text-anchor="middle">swiss safety center</textPath>
                    </text>
                    <text class="certificate-badge__ring" font-size="14" letter-spacing="1.5">
                      <textPath href="#bottom-arc-${cert.id}" startOffset="50%" text-anchor="middle">certified system</textPath>
                    </text>
                    <text x="100" y="105" class="certificate-badge__name" font-size="${fontSize}" text-anchor="middle" dominant-baseline="middle">${cert.name}</text>
                  </svg>
                </article>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", renderCertificates);
  document.addEventListener("languageChanged", renderCertificates);
})();
