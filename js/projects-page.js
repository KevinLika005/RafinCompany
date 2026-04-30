document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const PROJECTS_PER_PAGE = 6;
  const PROJECTS_SECTION_ID = 'projects-section';
  const filtersContainer = document.getElementById('project-filters');
  const gridContainer = document.getElementById('projects-grid');
  const paginationContainer = document.getElementById('projects-pagination');
  const heroContainer = document.getElementById('projects-page-hero');
  const heroTitleElement = document.getElementById('projects-page-hero-title');
  const heroEyebrowElement = document.getElementById('projects-page-hero-eyebrow');
  if (!filtersContainer || !gridContainer || !paginationContainer) return;
  if (gridContainer.dataset.rendered === 'true') return;
  gridContainer.dataset.rendered = 'true';

  const categories = window.ContentStore.getCategories() || [];
  const projects = window.ContentStore.getProjects() || [];
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const activeState = {
    filterId: 'all',
    currentPage: 1
  };

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function toCssUrlValue(url) {
    const escapedUrl = String(url || '').replace(/"/g, '\\"');
    return `url("${escapedUrl}")`;
  }

  function preloadHeroImage(url) {
    const safeUrl = String(url || '');
    if (!safeUrl || !document.head) return;

    const preloadKey = encodeURIComponent(safeUrl);
    if (document.head.querySelector(`link[data-projects-hero-preload="${preloadKey}"]`)) return;

    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = safeUrl;
    preloadLink.setAttribute('fetchpriority', 'high');
    preloadLink.setAttribute('data-projects-hero-preload', preloadKey);
    document.head.appendChild(preloadLink);
  }

  function setPageTitle() {
    const titleElement = document.querySelector('.i18n-projects-title');
    if (!titleElement) return;
    const localizedTitle = window.I18n.translate('projects');
    const safeTitle = localizedTitle || (window.I18n.getCurrentLanguage() === 'sq' ? 'Projektet' : 'Projects');
    titleElement.textContent = safeTitle;
    document.title = `${safeTitle} | Rafin Company`;
  }

  function setHeroState(filterId) {
    if (!heroContainer || !heroTitleElement) return;

    const defaultTitle = window.I18n.translate('projects') || 'Projects';
    const defaultHeroCategory = categories.find((category) => category && category.featuredOnHome) || categories[0] || null;
    const activeCategory = filterId === 'all' ? null : categoryById.get(filterId);
    const heroImageCategory = activeCategory || defaultHeroCategory;
    const heroTitle = activeCategory ? (window.I18n.getLocalizedValue(activeCategory.title) || defaultTitle) : defaultTitle;
    const heroImage = heroImageCategory ? (heroImageCategory.heroImage || heroImageCategory.thumbImage || '') : '';

    heroTitleElement.textContent = heroTitle;
    if (heroEyebrowElement) {
      heroEyebrowElement.textContent = defaultTitle;
    }

    if (heroImage) {
      preloadHeroImage(heroImage);
      heroContainer.style.backgroundImage = toCssUrlValue(heroImage);
      heroContainer.style.setProperty('--category-hero-image', toCssUrlValue(heroImage));
      heroContainer.classList.add('category-hero--has-media');
      heroContainer.classList.remove('category-hero--fallback');
      return;
    }

    heroContainer.style.removeProperty('background-image');
    heroContainer.style.removeProperty('--category-hero-image');
    heroContainer.classList.remove('category-hero--has-media');
    heroContainer.classList.add('category-hero--fallback');
  }

  function getProjectsForFilter(filterId) {
    if (filterId === 'all') return projects;
    return window.ContentStore.getProjectsByCategory(filterId);
  }

  function getPageCount(filteredProjects) {
    return Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));
  }

  function getVisibleProjects(filteredProjects) {
    const pageCount = getPageCount(filteredProjects);
    if (activeState.currentPage > pageCount) {
      activeState.currentPage = 1;
    }

    const startIndex = (activeState.currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }

  function scrollToProjectsSectionTop() {
    const section = document.getElementById(PROJECTS_SECTION_ID);
    if (!section) return;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderFilterBar() {
    const categoriesLabel = window.I18n.translate('categories') || 'Categories';
    const allLabel = window.I18n.translate('all') || 'All';
    const filteredProjects = getProjectsForFilter(activeState.filterId);
    const projectsCountLabel = window.I18n.translate('projects') || 'Projects';

    const buttonsHtml = [
      `<button class="projects-filter-btn ${activeState.filterId === 'all' ? 'active' : ''}" type="button" data-filter="all" aria-pressed="${activeState.filterId === 'all'}" aria-controls="projects-grid">${escapeHtml(allLabel)}</button>`
    ];

    categories.forEach((category) => {
      const label = window.I18n.getLocalizedValue(category.title) || 'Category';
      const isActive = activeState.filterId === category.id;
      buttonsHtml.push(
        `<button class="projects-filter-btn ${isActive ? 'active' : ''}" type="button" data-filter="${escapeHtml(category.id)}" aria-pressed="${isActive}" aria-controls="projects-grid">${escapeHtml(label)}</button>`
      );
    });

    filtersContainer.innerHTML = `
      <div class="projects-filter-bar__inner">
        <div class="projects-filter-bar__meta">
          <p class="projects-filter-bar__label">${escapeHtml(categoriesLabel)}</p>
          <p class="projects-filter-bar__count" aria-live="polite"><strong>${filteredProjects.length}</strong> ${escapeHtml(projectsCountLabel)}</p>
        </div>
        <div class="projects-filter-bar__actions" role="group" aria-label="${escapeHtml(categoriesLabel)}">
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
      paginationContainer.innerHTML = '';
      return;
    }

    const visibleProjects = getVisibleProjects(filteredProjects);
    const cardsHtml = visibleProjects.map((project) => {
      const title = window.I18n.getLocalizedValue(project.title) || 'Project';
      const excerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
      const slugUrl = project.slug ? `project.html?slug=${encodeURIComponent(project.slug)}` : '#';
      const coverImage = project.coverImage || '';
      const category = categoryById.get(project.categoryId);
      const categoryTitle = category ? (window.I18n.getLocalizedValue(category.title) || '') : '';
      const mediaHtml = coverImage
        ? `<img src="${escapeHtml(coverImage)}" alt="${escapeHtml(title)}" width="418" height="315" loading="lazy" decoding="async" fetchpriority="low">`
        : `<span class="project-card__media-placeholder" aria-hidden="true"></span>`;

      return `
        <div class="col-sm-6 col-lg-4 project-card-item">
          <article class="project-card">
            <a class="project-card__media ${coverImage ? '' : 'project-card__media--empty'}" href="${slugUrl}" aria-label="${escapeHtml(title)}">
              ${mediaHtml}
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
    renderPagination(filteredProjects);
  }

  function renderPagination(filteredProjects) {
    const pageCount = getPageCount(filteredProjects);
    if (pageCount <= 1) {
      paginationContainer.innerHTML = '';
      return;
    }

    paginationContainer.innerHTML = `
      <nav class="projects-pagination" aria-label="Projects pagination">
        ${Array.from({ length: pageCount }, (_, index) => {
          const page = index + 1;
          const isActive = page === activeState.currentPage;
          return `
            <button
              type="button"
              class="projects-pagination__button${isActive ? ' is-active' : ''}"
              data-projects-page="${page}"
              aria-current="${isActive ? 'page' : 'false'}"
            >
              ${page}
            </button>
          `;
        }).join('')}
      </nav>
    `;

    paginationContainer.querySelectorAll('[data-projects-page]').forEach((button) => {
      button.addEventListener('click', () => {
        activeState.currentPage = Number(button.getAttribute('data-projects-page')) || 1;
        renderProjects();
        scrollToProjectsSectionTop();
      });
    });
  }

  function setFilter(filterId) {
    activeState.filterId = filterId;
    activeState.currentPage = 1;
    setHeroState(filterId);
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
