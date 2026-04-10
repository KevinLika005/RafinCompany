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

  function setHeroBackground(category) {
    if (category && category.heroImage) {
      heroContainer.style.backgroundImage = `url('${category.heroImage}')`;
      heroContainer.style.backgroundColor = '';
      return;
    }

    if (category && category.thumbImage) {
      heroContainer.style.backgroundImage = `url('${category.thumbImage}')`;
      heroContainer.style.backgroundColor = '';
      return;
    }

    heroContainer.style.backgroundImage = '';
    heroContainer.style.backgroundColor = '#212121';
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

  const defaultMissingTitle = window.I18n.getCurrentLanguage() === 'sq' ? 'Kategoria nuk u gjet' : 'Category Not Found';
  const defaultMissingDesc = window.I18n.getCurrentLanguage() === 'sq' ? 'Ju lutemi zgjidhni një kategori të vlefshme.' : 'Please select a valid category.';

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
            <img src="${escapeHtml(coverImage)}" alt="${escapeHtml(projectTitle)}" width="418" height="315" loading="lazy">
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
