const initCertificates = () => {
  const certificates = window.siteData?.certificates;
  if (!certificates) return;

  const container = document.getElementById('certificates-container');
  if (!container) return;

  let html = '<div class="row row-30 justify-content-center">';

  // Sort by order
  const sortedCerts = [...certificates].sort((a, b) => (a.order || 0) - (b.order || 0));

  sortedCerts.forEach(cert => {
    let middleFontSize = "17";
    if (cert.name.length > 20) {
      middleFontSize = "13";
    } else if (cert.name.length > 15) {
      middleFontSize = "15";
    }

    html += `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2">
          <div style="display: flex; justify-content: center; margin-bottom: 25px;">
            <div class="certificate-circle" style="width: 140px; height: 140px; border-radius: 50%; background: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.06);">
              <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <!-- outer bounds for text paths -->
                  <path id="top-arc-${cert.id}" d="M 25 100 A 75 75 0 0 1 175 100" fill="transparent" />
                  <path id="bottom-arc-${cert.id}" d="M 10 100 A 90 90 0 0 0 190 100" fill="transparent" />
                </defs>
                
                <text font-family="Arial, sans-serif" font-size="14" fill="#333" letter-spacing="1.5">
                  <textPath href="#top-arc-${cert.id}" startOffset="50%" text-anchor="middle">swiss safety center</textPath>
                </text>
                
                <text font-family="Arial, sans-serif" font-size="14" fill="#333" letter-spacing="1.5">
                  <textPath href="#bottom-arc-${cert.id}" startOffset="50%" text-anchor="middle">certified system</textPath>
                </text>
                
                <!-- Bolder but smaller middle text -->
                <text x="100" y="105" font-family="Arial, sans-serif" font-size="${middleFontSize}" font-weight="900" fill="#000" text-anchor="middle" dominant-baseline="middle">
                  ${cert.name}
                </text>
              </svg>
            </div>
          </div>
        </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', () => {
  initCertificates();
});

document.addEventListener('languageChanged', () => {
  initCertificates();
});
