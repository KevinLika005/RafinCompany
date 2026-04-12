document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const titleContainer = document.getElementById('category-title');
  const eyebrowContainer = document.getElementById('category-eyebrow');
  const heroContainer = document.getElementById('category-hero');
  const descriptionSection = document.getElementById('category-description-section');
  const descriptionContainer = document.getElementById('category-description');
  const gridContainer = document.getElementById('category-projects-grid');

  if (!titleContainer || !heroContainer || !descriptionContainer || !gridContainer || !descriptionSection) return;
  if (gridContainer.dataset.rendered === 'true') return;
  gridContainer.dataset.rendered = 'true';

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
    if (document.head.querySelector(`link[data-hero-preload="${preloadKey}"]`)) return;

    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = safeUrl;
    preloadLink.setAttribute('fetchpriority', 'high');
    preloadLink.setAttribute('data-hero-preload', preloadKey);
    document.head.appendChild(preloadLink);
  }

  function setHeroBackground(category) {
    const heroImage = category && (category.heroImage || category.thumbImage);

    if (heroImage) {
      preloadHeroImage(heroImage);
      heroContainer.style.setProperty('--category-hero-image', toCssUrlValue(heroImage));
      heroContainer.classList.add('category-hero--has-media');
      heroContainer.classList.remove('category-hero--fallback');
      return;
    }

    heroContainer.style.removeProperty('--category-hero-image');
    heroContainer.classList.remove('category-hero--has-media');
    heroContainer.classList.add('category-hero--fallback');
  }

  function renderMissingState(titleText, descriptionText) {
    setHeroBackground(null);
    titleContainer.textContent = titleText;
    descriptionContainer.textContent = descriptionText;
    descriptionSection.classList.remove('category-description-section--hidden');
    gridContainer.innerHTML = `<div class="col-12"><div class="projects-empty-state">${escapeHtml(descriptionText)}</div></div>`;
    document.title = `${titleText} | Rafin Company`;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const defaultMissingTitle = window.I18n.translate('Category Not Found') || 'Category Not Found';
  const defaultMissingDesc = window.I18n.translate('Please select a valid category.') || 'Please select a valid category.';

  if (eyebrowContainer) {
    eyebrowContainer.textContent = window.I18n.translate('Category') || 'Category';
  }

  if (!slug) {
    renderMissingState(defaultMissingTitle, defaultMissingDesc);
    return;
  }

  const category = window.ContentStore.getCategoryBySlug(slug);
  if (!category) {
    renderMissingState(defaultMissingTitle, defaultMissingDesc);
    return;
  }

  setHeroBackground(category);

  const projects = window.ContentStore.getProjectsByCategory(category.id) || [];
  const categoryTitle = window.I18n.getLocalizedValue(category.title) || 'Category';
  const categoryDescription = window.I18n.getLocalizedValue(category.fullDescription) || window.I18n.getLocalizedValue(category.shortDescription) || '';

  titleContainer.textContent = categoryTitle;
  document.title = `${categoryTitle} | Rafin Company`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', categoryDescription || metaDescription.getAttribute('content') || '');
  }

  if (categoryDescription) {
    descriptionContainer.textContent = categoryDescription;
    descriptionSection.classList.remove('category-description-section--hidden');
  } else {
    descriptionContainer.textContent = '';
    descriptionSection.classList.add('category-description-section--hidden');
  }

  if (projects.length === 0) {
    const emptyMsg = window.I18n.translate('noProjectsFound') || (window.I18n.getCurrentLanguage() === 'sq' ? 'Nuk ka projekte në këtë kategori.' : 'No projects found in this category.');
    gridContainer.innerHTML = `<div class="col-12"><div class="projects-empty-state">${escapeHtml(emptyMsg)}</div></div>`;
    return;
  }

  const readMoreText = window.I18n.translate('viewProject') || (window.I18n.getCurrentLanguage() === 'sq' ? 'Shiko Projektin' : 'View Project');

  const cardsHtml = projects.map((project) => {
    const projectTitle = window.I18n.getLocalizedValue(project.title) || 'Project';
    const projectExcerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
    const slugUrl = project.slug ? `project.html?slug=${encodeURIComponent(project.slug)}` : '#';
    const coverImage = project.coverImage || 'images/default-thumb.jpg';

    return `
      <div class="col-sm-6 col-lg-4 project-card-item">
        <article class="project-card">
          <a class="project-card__media" href="${slugUrl}">
            <img src="${escapeHtml(coverImage)}" alt="${escapeHtml(projectTitle)}" width="418" height="315" loading="lazy" decoding="async" fetchpriority="low">
          </a>
          <div class="project-card__content">
            <p class="project-card__category">${escapeHtml(categoryTitle)}</p>
            <h5 class="project-card__title"><a href="${slugUrl}">${escapeHtml(projectTitle)}</a></h5>
            <p class="project-card__excerpt">${escapeHtml(projectExcerpt)}</p>
            <a class="project-card__link" href="${slugUrl}">${escapeHtml(readMoreText)}</a>
          </div>
        </article>
      </div>
    `;
  }).join('');

  gridContainer.innerHTML = cardsHtml;
});
