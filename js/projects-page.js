document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const filtersContainer = document.getElementById('project-filters');
  const gridContainer = document.getElementById('projects-grid');
  
  // Only run if we are on the projects page
  if (!filtersContainer || !gridContainer) return;

  // Prevent duplicate rendering
  if (gridContainer.dataset.rendered === 'true') return;
  gridContainer.dataset.rendered = 'true';

  const categories = window.ContentStore.getCategories() || [];
  const projects = window.ContentStore.getProjects() || [];

  if (projects.length === 0) {
    gridContainer.innerHTML = `<div class="empty-state">${window.I18n.translate('noProjectsFound') || 'No projects found.'}</div>`;
    return;
  }

  // Set page text using i18n
  const titleElement = document.querySelector('.i18n-projects-title');
  if (titleElement) {
    const defaultTitle = window.I18n.getCurrentLanguage() === 'sq' ? 'Projektet' : 'Projects';
    titleElement.textContent = window.I18n.translate('projects') || defaultTitle;
  }

  const readMoreText = window.I18n.translate('viewProject') || 'View Project';
  const allText = window.I18n.translate('all') || (window.I18n.getCurrentLanguage() === 'sq' ? 'Të Gjitha' : 'All');

  // Render Category Filter Buttons
  let filtersHtml = `<button class="button button-sm button-secondary filter-btn active" data-filter="all">${allText}</button>`;
  
  categories.forEach(category => {
    const title = window.I18n.getLocalizedValue(category.title) || 'Category';
    filtersHtml += `<button class="button button-sm button-secondary filter-btn" data-filter="${category.id}">${title}</button>`;
  });
  
  filtersContainer.innerHTML = filtersHtml;

  // Render projects
  function renderProjects(filterId) {
    let filteredProjects = projects;
    if (filterId !== 'all') {
      filteredProjects = window.ContentStore.getProjectsByCategory(filterId);
    }

    if (filteredProjects.length === 0) {
      gridContainer.innerHTML = `<div class="empty-state">${window.I18n.translate('noProjectsFound') || 'No projects found in this category.'}</div>`;
      return;
    }

    let cardsHtml = '';
    
    filteredProjects.forEach(project => {
      const title = window.I18n.getLocalizedValue(project.title) || 'Project';
      const excerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
      const slugUrl = project.slug ? `project.html?slug=${project.slug}` : '#';
      const coverImage = project.coverImage || 'images/default-thumb.jpg';

      cardsHtml += `
        <div class="col-md-6 col-xl-4 project-card-item">
          <article class="post-classic post-minimal">
            <a href="${slugUrl}"><img src="${coverImage}" alt="${title}" width="418" height="315" style="width: 100%; object-fit: cover; aspect-ratio: 4/3;"/></a>
            <div class="post-classic-title" style="margin-top: 20px;">
              <h6><a href="${slugUrl}">${title}</a></h6>
            </div>
            <div class="post-classic-body" style="margin-top: 10px;">
              <p>${excerpt}</p>
            </div>
            <div style="margin-top: 15px;">
              <a class="button button-link" href="${slugUrl}">${readMoreText}</a>
            </div>
          </article>
        </div>
      `;
    });

    gridContainer.innerHTML = cardsHtml;
  }

  // Initial render (show all)
  renderProjects('all');

  // Filter click behavior
  filtersContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      // Update active state
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');

      // Filter grid
      const filterId = e.target.dataset.filter;
      renderProjects(filterId);
    }
  });

});
