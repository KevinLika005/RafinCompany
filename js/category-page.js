document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const titleContainer = document.getElementById('category-title');
  const heroContainer = document.getElementById('category-hero');
  const descriptionContainer = document.getElementById('category-description');
  const gridContainer = document.getElementById('category-projects-grid');
  
  if (!titleContainer || !heroContainer || !descriptionContainer || !gridContainer) return;

  // Prevent duplicate rendering
  if (gridContainer.dataset.rendered === 'true') return;
  gridContainer.dataset.rendered = 'true';

  // Read slug from URL
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const defaultMissingTitle = window.I18n.getCurrentLanguage() === 'sq' ? 'Kategoria nuk u gjet' : 'Category Not Found';
  const defaultMissingDesc = window.I18n.getCurrentLanguage() === 'sq' ? 'Ju lutemi zgjidhni një kategori të vlefshme.' : 'Please select a valid category.';
  
  if (!slug) {
    titleContainer.textContent = defaultMissingTitle;
    descriptionContainer.textContent = defaultMissingDesc;
    gridContainer.innerHTML = '';
    return;
  }

  // Find category using ContentStore
  const category = window.ContentStore.getCategoryBySlug(slug);

  if (!category) {
    titleContainer.textContent = defaultMissingTitle;
    descriptionContainer.textContent = defaultMissingDesc;
    gridContainer.innerHTML = '';
    return;
  }

  // Get matching projects for the category
  const projects = window.ContentStore.getProjectsByCategory(category.id) || [];

  // Set hero image logic (use heroImage, fallback to thumbImage or solid color)
  if (category.heroImage) {
    heroContainer.style.backgroundImage = `url('${category.heroImage}')`;
  } else if (category.thumbImage) {
    heroContainer.style.backgroundImage = `url('${category.thumbImage}')`;
  } else {
    heroContainer.style.backgroundColor = '#212121';
  }

  // Set localized Category texts
  const title = window.I18n.getLocalizedValue(category.title) || 'Category';
  const description = window.I18n.getLocalizedValue(category.fullDescription) || window.I18n.getLocalizedValue(category.shortDescription) || '';
  
  titleContainer.textContent = title;
  
  // Set page document title dynamically
  document.title = `${title} | Rafin Company`;
  
  // Render description (only if exists)
  if (description) {
    descriptionContainer.innerHTML = description;
    // parentElement chain: #category-description > .col-sm-10 > .row > .container > section
    const descSection = descriptionContainer.parentElement?.parentElement?.parentElement?.parentElement;
    if (descSection) descSection.style.display = 'block';
  } else {
    const descSection = descriptionContainer.parentElement?.parentElement?.parentElement?.parentElement;
    if (descSection) descSection.style.display = 'none';
  }

  // Render Category Projects
  if (projects.length === 0) {
    const emptyMsg = window.I18n.translate('noProjectsFound') || (window.I18n.getCurrentLanguage() === 'sq' ? 'Nuk ka projekte në këtë kategori.' : 'No projects found in this category.');
    gridContainer.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
    return;
  }

  const readMoreText = window.I18n.translate('viewProject') || (window.I18n.getCurrentLanguage() === 'sq' ? 'Shiko Projektin' : 'View Project');
  let cardsHtml = '';
  
  projects.forEach(project => {
    const pTitle = window.I18n.getLocalizedValue(project.title) || 'Project';
    const pExcerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
    const slugUrl = project.slug ? `project.html?slug=${project.slug}` : '#';
    const coverImage = project.coverImage || 'images/default-thumb.jpg';

    cardsHtml += `
      <div class="col-md-6 col-xl-4 project-card-item" style="margin-bottom: 30px;">
        <article class="post-classic post-minimal">
          <a href="${slugUrl}">
            <img src="${coverImage}" alt="${pTitle}" width="418" height="315" style="width: 100%; object-fit: cover; aspect-ratio: 4/3;"/>
          </a>
          <div class="post-classic-title" style="margin-top: 20px;">
            <h6><a href="${slugUrl}">${pTitle}</a></h6>
          </div>
          <div class="post-classic-body" style="margin-top: 10px;">
            <p>${pExcerpt}</p>
          </div>
          <div style="margin-top: 15px;">
            <a class="button button-link" href="${slugUrl}">${readMoreText}</a>
          </div>
        </article>
      </div>
    `;
  });

  gridContainer.innerHTML = cardsHtml;
});
