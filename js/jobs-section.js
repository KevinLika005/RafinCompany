const initJobs = () => {
  const jobs = window.siteData?.jobs;
  if (!jobs) return;

  const container = document.getElementById('jobs-container');
  if (!container) return;

  const currentLang = (window.I18n && window.I18n.getCurrentLanguage) ? window.I18n.getCurrentLanguage() : (localStorage.getItem('lang') || 'en');
  
  let html = ``;
  
  // Sort by order
  const sortedJobs = [...jobs].sort((a, b) => (a.order || 0) - (b.order || 0));

  sortedJobs.forEach(job => {
    const title = job.title[currentLang] || job.title.en;
    const category = job.category[currentLang] || job.category.en;

    html += `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="job-card" style="background: #2a2c30; border-left: 4px solid #f2cf43; padding: 25px; transition: transform 0.3s ease, box-shadow 0.3s ease; height: 100%; cursor: pointer;">
          <h6 class="text-white mb-2" style="font-size: 18px; font-weight: 600;">${title}</h6>
          <p class="text-gray-light m-0" style="font-size: 14px;">${category}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', () => {
  initJobs();
});

document.addEventListener('languageChanged', () => {
  initJobs();
});

// A small style injection for hover effects on jobs
const style = document.createElement('style');
style.innerHTML = `
  .job-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
`;
document.head.appendChild(style);
