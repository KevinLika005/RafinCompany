document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const titleContainer = document.getElementById('project-title');
  const heroContainer = document.getElementById('project-hero');
  const descriptionContainer = document.getElementById('project-description');
  const excerptContainer = document.getElementById('project-excerpt');
  
  if (!titleContainer || !heroContainer || !descriptionContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const defaultMissingTitle = window.I18n.getCurrentLanguage() === 'sq' ? 'Projekti nuk u gjet' : 'Project Not Found';
  const defaultMissingDesc = window.I18n.getCurrentLanguage() === 'sq' ? 'Ju lutemi kthehuni dhe zgjidhni një projekt të vlefshëm.' : 'Please go back and select a valid project.';
  
  const showMissingState = () => {
    titleContainer.textContent = defaultMissingTitle;
    descriptionContainer.textContent = defaultMissingDesc;
    heroContainer.style.backgroundColor = '#212121';
    heroContainer.style.backgroundImage = 'none';
    const infoBox = document.querySelector('.project-info-box');
    if (infoBox) infoBox.style.display = 'none';
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

  // Local translations for project fields
  const uiTranslations = {
    location: { en: 'Location', sq: 'Vendndodhja' },
    year: { en: 'Year', sq: 'Viti' },
    status: { en: 'Status', sq: 'Statusi' },
    category: { en: 'Category', sq: 'Kategoria' },
    projectInfo: { en: 'Project Information', sq: 'Informacion mbi Projektin' },
    prevProject: { en: 'Previous Project', sq: 'Projekti i Mëparshëm' },
    nextProject: { en: 'Next Project', sq: 'Projekti i Rradhës' }
  };

  const getUiText = (key) => {
    const lang = window.I18n.getCurrentLanguage();
    return uiTranslations[key][lang] || uiTranslations[key]['en'];
  };

  // Set localized values
  const title = window.I18n.getLocalizedValue(project.title) || 'Project';
  const description = window.I18n.getLocalizedValue(project.description) || '';
  const excerpt = window.I18n.getLocalizedValue(project.excerpt) || '';
  const location = project.location ? window.I18n.getLocalizedValue(project.location) : '';
  
  titleContainer.textContent = title;
  document.title = `${title} | Rafin Company`;

  if (excerpt) {
    excerptContainer.innerHTML = excerpt;
    excerptContainer.style.display = 'block';
  }

  if (description) {
    descriptionContainer.innerHTML = description;
  } else {
    descriptionContainer.innerHTML = '';
  }

  // Project Info Sidebar
  document.getElementById('project-info-heading').textContent = getUiText('projectInfo');

  const populateField = (id, labelSelector, valSelector, value, labelKey) => {
    const el = document.getElementById(id);
    if (value) {
      el.querySelector(labelSelector).textContent = getUiText(labelKey);
      el.querySelector(valSelector).textContent = value;
      el.style.display = 'list-item';
    } else {
      el.style.display = 'none';
    }
  };

  populateField('info-location', '.lbl-location', '.val-location', location, 'location');
  populateField('info-year', '.lbl-year', '.val-year', project.year, 'year');
  populateField('info-status', '.lbl-status', '.val-status', project.status, 'status');

  const category = project.categoryId ? window.ContentStore.getCategoryBySlug(project.categoryId) || window.ContentStore.getCategories().find(c => c.id === project.categoryId) : null;
  const categoryName = category ? window.I18n.getLocalizedValue(category.title) : '';
  populateField('info-category', '.lbl-category', '.val-category', categoryName, 'category');

  // Hero Slider Initialization (Simplest working implementation)
  const navContainer = document.getElementById('project-slider-nav');
  let currentImageIdx = 0;
  const heroImages = (project.heroImages && project.heroImages.length > 0) 
                     ? project.heroImages 
                     : (project.coverImage ? [project.coverImage] : ['#212121']);

  const setHeroBackground = (idx) => {
    const val = heroImages[idx];
    if (val.startsWith('#')) {
      heroContainer.style.backgroundColor = val;
      heroContainer.style.backgroundImage = 'none';
    } else {
      heroContainer.style.backgroundImage = `url('${val}')`;
    }
  };

  setHeroBackground(0);

  if (heroImages.length > 1) {
    navContainer.style.display = 'flex';
    
    // Check if event listeners are already attached to prevent duplicates on language switch
    const sliderPrevBtn = document.getElementById('slider-prev');
    const sliderNextBtn = document.getElementById('slider-next');
    
    if (sliderPrevBtn.dataset.bound !== 'true') {
      sliderPrevBtn.addEventListener('click', () => {
        currentImageIdx = (currentImageIdx - 1 + heroImages.length) % heroImages.length;
        setHeroBackground(currentImageIdx);
      });
      sliderPrevBtn.dataset.bound = 'true';
    }
    
    if (sliderNextBtn.dataset.bound !== 'true') {
      sliderNextBtn.addEventListener('click', () => {
        currentImageIdx = (currentImageIdx + 1) % heroImages.length;
        setHeroBackground(currentImageIdx);
      });
      sliderNextBtn.dataset.bound = 'true';
    }
    
    // Auto slide
    if (heroContainer.dataset.intervalId) {
       clearInterval(parseInt(heroContainer.dataset.intervalId, 10));
    }
    const intervalId = setInterval(() => {
      currentImageIdx = (currentImageIdx + 1) % heroImages.length;
      setHeroBackground(currentImageIdx);
    }, 4500);
    heroContainer.dataset.intervalId = intervalId.toString();
  } else {
    navContainer.style.display = 'none';
  }

  // Same-Category Project Navigation
  const allProjects = window.ContentStore.getProjects();
  const categoryProjects = allProjects
    .filter(p => p.categoryId === project.categoryId)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const currentIndex = categoryProjects.findIndex(p => p.slug === project.slug);
  
  const prevProject = currentIndex > 0 ? categoryProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < categoryProjects.length - 1 ? categoryProjects[currentIndex + 1] : null;

  const projectNav = document.getElementById('project-navigation');
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');

  if (projectNav) {
    if (categoryProjects.length > 1) {
      // Show container and make it flex
      projectNav.style.display = 'flex';
    }

    if (prevBtn) {
      if (prevProject) {
        prevBtn.href = `project.html?slug=${prevProject.slug}`;
        prevBtn.style.display = 'inline-block';
        prevBtn.querySelector('.nav-label').textContent = getUiText('prevProject');
      } else {
        prevBtn.style.display = 'none';
      }
    }

    if (nextBtn) {
      if (nextProject) {
        nextBtn.href = `project.html?slug=${nextProject.slug}`;
        nextBtn.style.display = 'inline-block';
        nextBtn.querySelector('.nav-label').textContent = getUiText('nextProject');
      } else {
        nextBtn.style.display = 'none';
      }
    }
  }
});
