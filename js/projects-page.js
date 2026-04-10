document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const filtersContainer = document.getElementById('project-filters');
  const gridContainer = document.getElementById('projects-grid');
  if (!filtersContainer || !gridContainer) return;
  if (gridContainer.dataset.rendered === 'true') return;
  gridContainer.dataset.rendered = 'true';

  const categories = window.ContentStore.getCategories() || [];
  const projects = window.ContentStore.getProjects() || [];
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const activeState = { filterId: 'all' };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function setPageTitle() {
    const titleElement = document.querySelector('.i18n-projects-title');
    if (!titleElement) return;
    const localizedTitle = window.I18n.translate('projects');
    titleElement.textContent = localizedTitle || (window.I18n.getCurrentLanguage() === 'sq' ? 'Projektet' : 'Projects');
  }

  function getProjectsForFilter(filterId) {
    if (filterId === 'all') return projects;
    return window.ContentStore.getProjectsByCategory(filterId);
  }

  function renderFilterBar() {
    const categoriesLabel = window.I18n.translate('categories') || 'Categories';
    const allLabel = window.I18n.translate('all') || 'All';
    const filteredProjects = getProjectsForFilter(activeState.filterId);
    const projectsCountLabel = window.I18n.translate('projects') || 'Projects';

    const buttonsHtml = [
      `<button class="projects-filter-btn ${activeState.filterId === 'all' ? 'active' : ''}" type="button" data-filter="all" aria-pressed="${activeState.filterId === 'all'}">${escapeHtml(allLabel)}</button>`
    ];

    categories.forEach((category) => {
      const label = window.I18n.getLocalizedValue(category.title) || 'Category';
      const isActive = activeState.filterId === category.id;
      buttonsHtml.push(
        `<button class="projects-filter-btn ${isActive ? 'active' : ''}" type="button" data-filter="${escapeHtml(category.id)}" aria-pressed="${isActive}">${escapeHtml(label)}</button>`
      );
    });

    filtersContainer.innerHTML = `
      <div class="projects-filter-bar__inner">
        <div class="projects-filter-bar__meta">
          <p class="projects-filter-bar__label">${escapeHtml(categoriesLabel)}</p>
          <p class="projects-filter-bar__count"><strong>${filteredProjects.length}</strong> ${escapeHtml(projectsCountLabel)}</p>
        </div>
        <div class="projects-filter-bar__actions" role="tablist" aria-label="${escapeHtml(categoriesLabel)}">
          ${buttonsHtml.join('')}
        </div>
      </div>
    `;
  }

  function renderProjects() {
    const readMoreText = window.I18n.translate('viewProject') || 'View Project';
    const filteredProjects = getProjectsForFilter(activeState.filterId);

    if (filteredProjects.length === 0) {
      const emptyText = window.I18n.translate('noProjectsFound') || 'No projects found.';
      gridContainer.innerHTML = `<div class="col-12"><div class="projects-empty-state">${escapeHtml(emptyText)}</div></div>`;
      return;
    }

    const cardsHtml = filteredProjects.map((project) => {
      const title = window.I18n.getLocalizedValue(project.title) || 'Project';
      const excerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
      const slugUrl = project.slug ? `project.html?slug=${encodeURIComponent(project.slug)}` : '#';
      const coverImage = project.coverImage || 'images/default-thumb.jpg';
      const category = categoryById.get(project.categoryId);
      const categoryTitle = category ? (window.I18n.getLocalizedValue(category.title) || '') : '';

      return `
        <div class="col-sm-6 col-lg-4 project-card-item">
          <article class="project-card">
            <a class="project-card__media" href="${slugUrl}">
              <img src="${escapeHtml(coverImage)}" alt="${escapeHtml(title)}" width="418" height="315" loading="lazy">
            </a>
            <div class="project-card__content">
              <p class="project-card__category">${escapeHtml(categoryTitle)}</p>
              <h5 class="project-card__title"><a href="${slugUrl}">${escapeHtml(title)}</a></h5>
              <p class="project-card__excerpt">${escapeHtml(excerpt)}</p>
              <a class="project-card__link" href="${slugUrl}">${escapeHtml(readMoreText)}</a>
            </div>
          </article>
        </div>
      `;
    }).join('');

    gridContainer.innerHTML = cardsHtml;
  }

  function setFilter(filterId) {
    activeState.filterId = filterId;
    renderFilterBar();
    renderProjects();
  }

  function syncStickyOffset() {
    const navbar = document.querySelector('.page-header .rd-navbar');
    const isMobile = window.matchMedia('(max-width: 1199px)').matches;
    const fallbackHeight = isMobile ? 56 : 84;
    const navbarHeight = navbar ? Math.round(navbar.getBoundingClientRect().height) : fallbackHeight;
    const stickyTop = Math.max(fallbackHeight, navbarHeight + 10);
    document.documentElement.style.setProperty('--projects-filter-top', `${stickyTop}px`);
  }

  setPageTitle();
  syncStickyOffset();
  setFilter('all');

  filtersContainer.addEventListener('click', (event) => {
    const filterButton = event.target.closest('.projects-filter-btn');
    if (!filterButton || !filtersContainer.contains(filterButton)) return;
    const nextFilter = filterButton.getAttribute('data-filter') || 'all';
    if (nextFilter === activeState.filterId) return;
    setFilter(nextFilter);
  });

  let stickyTicking = false;
  function requestStickySync() {
    if (stickyTicking) return;
    stickyTicking = true;
    window.requestAnimationFrame(() => {
      syncStickyOffset();
      stickyTicking = false;
    });
  }

  window.addEventListener('resize', requestStickySync);
  window.addEventListener('scroll', requestStickySync, { passive: true });
});
