document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const titleContainer = document.getElementById('project-title');
  const heroContainer = document.getElementById('project-hero');
  const descriptionContainer = document.getElementById('project-description');
  const excerptContainer = document.getElementById('project-excerpt');
  const projectNav = document.getElementById('project-navigation');
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');
  const allProjectsLink = document.getElementById('all-projects-link');
  const sliderPrevBtn = document.getElementById('slider-prev');
  const sliderNextBtn = document.getElementById('slider-next');

  if (!titleContainer || !heroContainer || !descriptionContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const defaultMissingTitle = window.I18n.translate('Project Not Found') || 'Project Not Found';
  const defaultMissingDesc = window.I18n.translate('Please go back and select a valid project.') || 'Please go back and select a valid project.';

  const showMissingState = () => {
    titleContainer.textContent = defaultMissingTitle;
    descriptionContainer.textContent = defaultMissingDesc;
    if (excerptContainer) excerptContainer.style.display = 'none';
    heroContainer.style.backgroundColor = '#212121';
    heroContainer.style.backgroundImage = 'none';
    const infoBox = document.querySelector('.project-info-box');
    if (infoBox) infoBox.style.display = 'none';
    if (projectNav) projectNav.style.display = 'none';
  };

  if (!slug) {
    showMissingState();
    return;
  }

  const project = window.ContentStore.getProjectBySlug(slug);

  if (!project) {
    showMissingState();
    return;
  }

  const getUiText = (translationKey, fallback) => {
    const translated = window.I18n.translate(translationKey);
    return translated && translated !== translationKey ? translated : fallback;
  };

  const localizeStatus = (statusValue) => {
    if (!statusValue) return '';
    const statusMap = {
      completed: { en: 'Completed', sq: 'Përfunduar' },
      'in progress': { en: 'In Progress', sq: 'Në Proces' }
    };
    const normalizedStatus = String(statusValue).trim().toLowerCase();
    const localized = statusMap[normalizedStatus];
    if (!localized) return statusValue;
    return window.I18n.getLocalizedValue(localized);
  };

  const title = window.I18n.getLocalizedValue(project.title) || 'Project';
  const description = window.I18n.getLocalizedValue(project.description) || '';
  const excerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
  const location = project.location ? window.I18n.getLocalizedValue(project.location) : '';

  titleContainer.textContent = title;
  document.title = `${title} | Rafin Company`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', excerpt || description || metaDescription.getAttribute('content') || '');
  }

  if (excerptContainer) {
    if (excerpt) {
      excerptContainer.innerHTML = excerpt;
      excerptContainer.style.display = 'block';
    } else {
      excerptContainer.style.display = 'none';
    }
  }

  descriptionContainer.innerHTML = description || '';

  const infoHeading = document.getElementById('project-info-heading');
  if (infoHeading) {
    infoHeading.textContent = getUiText('Project Information', 'Project Information');
  }

  const populateField = (id, labelSelector, valSelector, value, labelKey) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (value) {
      const labelEl = el.querySelector(labelSelector);
      const valueEl = el.querySelector(valSelector);
      if (labelEl) labelEl.textContent = getUiText(labelKey, labelKey);
      if (valueEl) valueEl.textContent = value;
      el.style.display = 'list-item';
    } else {
      el.style.display = 'none';
    }
  };

  populateField('info-location', '.lbl-location', '.val-location', location, 'Location');
  populateField('info-year', '.lbl-year', '.val-year', project.year, 'Year');
  populateField('info-status', '.lbl-status', '.val-status', localizeStatus(project.status), 'Status');

  const categories = window.ContentStore.getCategories() || [];
  const categoryById = new Map(categories.map((item) => [item.id, item]));
  const category = project.categoryId
    ? categoryById.get(project.categoryId) || window.ContentStore.getCategoryBySlug(project.categoryId)
    : null;
  const categoryName = category ? window.I18n.getLocalizedValue(category.title) : '';
  populateField('info-category', '.lbl-category', '.val-category', categoryName, 'Category');

  const navContainer = document.getElementById('project-slider-nav');
  let currentImageIdx = 0;
  const heroImages =
    project.heroImages && project.heroImages.length > 0
      ? project.heroImages
      : project.coverImage
        ? [project.coverImage]
        : ['#212121'];

  const setHeroBackground = (idx) => {
    const val = heroImages[idx];
    if (val.startsWith('#')) {
      heroContainer.style.backgroundColor = val;
      heroContainer.style.backgroundImage = 'none';
    } else {
      heroContainer.style.backgroundColor = '';
      heroContainer.style.backgroundImage = `url('${val}')`;
    }
  };

  setHeroBackground(0);

  if (sliderPrevBtn) {
    sliderPrevBtn.setAttribute('aria-label', getUiText('Previous Project', 'Previous Project'));
    sliderPrevBtn.setAttribute('title', getUiText('Previous Project', 'Previous Project'));
  }
  if (sliderNextBtn) {
    sliderNextBtn.setAttribute('aria-label', getUiText('Next Project', 'Next Project'));
    sliderNextBtn.setAttribute('title', getUiText('Next Project', 'Next Project'));
  }

  if (heroImages.length > 1 && navContainer) {
    navContainer.style.display = 'flex';

    if (sliderPrevBtn && sliderPrevBtn.dataset.bound !== 'true') {
      sliderPrevBtn.addEventListener('click', () => {
        currentImageIdx = (currentImageIdx - 1 + heroImages.length) % heroImages.length;
        setHeroBackground(currentImageIdx);
      });
      sliderPrevBtn.dataset.bound = 'true';
    }

    if (sliderNextBtn && sliderNextBtn.dataset.bound !== 'true') {
      sliderNextBtn.addEventListener('click', () => {
        currentImageIdx = (currentImageIdx + 1) % heroImages.length;
        setHeroBackground(currentImageIdx);
      });
      sliderNextBtn.dataset.bound = 'true';
    }

    if (heroContainer.dataset.intervalId) {
      clearInterval(parseInt(heroContainer.dataset.intervalId, 10));
    }
    const intervalId = setInterval(() => {
      currentImageIdx = (currentImageIdx + 1) % heroImages.length;
      setHeroBackground(currentImageIdx);
    }, 4500);
    heroContainer.dataset.intervalId = intervalId.toString();
  } else if (navContainer) {
    navContainer.style.display = 'none';
  }

  const allProjects = window.ContentStore.getProjects();
  const categoryProjects = allProjects
    .filter((p) => p.categoryId === project.categoryId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const currentIndex = categoryProjects.findIndex((p) => p.slug === project.slug);

  const prevProject = currentIndex > 0 ? categoryProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < categoryProjects.length - 1
      ? categoryProjects[currentIndex + 1]
      : null;

  if (allProjectsLink) {
    const allProjectsLabel = allProjectsLink.querySelector('.all-projects-label');
    if (allProjectsLabel) {
      allProjectsLabel.textContent = getUiText('All Projects', 'All Projects');
    }
  }

  const populateNavCard = (card, targetProject, navLabelKey) => {
    if (!card) return;
    if (!targetProject) {
      card.style.display = 'none';
      return;
    }

    const targetTitle = window.I18n.getLocalizedValue(targetProject.title) || 'Project';
    const targetCategory = categoryById.get(targetProject.categoryId);
    const targetCategoryName = targetCategory ? window.I18n.getLocalizedValue(targetCategory.title) : '';
    const labelEl = card.querySelector('.nav-label');
    const titleEl = card.querySelector('.nav-title');
    const categoryEl = card.querySelector('.nav-category');

    card.href = `project.html?slug=${encodeURIComponent(targetProject.slug)}`;
    card.style.display = 'flex';

    if (labelEl) labelEl.textContent = getUiText(navLabelKey, navLabelKey);
    if (titleEl) titleEl.textContent = targetTitle;
    if (categoryEl) {
      if (targetCategoryName) {
        categoryEl.textContent = targetCategoryName;
        categoryEl.style.display = 'block';
      } else {
        categoryEl.textContent = '';
        categoryEl.style.display = 'none';
      }
    }
  };

  if (projectNav) {
    const hasAdjacentProjects = Boolean(prevProject || nextProject);
    projectNav.style.display = hasAdjacentProjects ? 'grid' : 'none';

    populateNavCard(prevBtn, prevProject, 'Previous Project');
    populateNavCard(nextBtn, nextProject, 'Next Project');
  }
});
