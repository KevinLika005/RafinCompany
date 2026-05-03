document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const titleContainer = document.getElementById('project-title');
  const heroContainer = document.getElementById('project-hero');
  const heroMediaContainer = heroContainer ? heroContainer.querySelector('.project-hero__media') : null;
  const heroCategoryContainer = document.getElementById('project-category-hero');
  const heroSelectorsContainer = document.getElementById('project-hero-selectors');
  const heroPrimaryLayer = document.getElementById('project-hero-image-primary');
  const heroSecondaryLayer = document.getElementById('project-hero-image-secondary');
  const descriptionContainer = document.getElementById('project-description');
  const excerptContainer = document.getElementById('project-excerpt');
  const projectNav = document.getElementById('project-navigation');
  const prevBtn = document.getElementById('prev-project');
  const nextBtn = document.getElementById('next-project');
  const allProjectsLink = document.getElementById('all-projects-link');

  if (!titleContainer || !heroContainer || !descriptionContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const defaultMissingTitle = window.I18n.translate('Project Not Found') || 'Project Not Found';
  const defaultMissingDesc = window.I18n.translate('Please go back and select a valid project.') || 'Please go back and select a valid project.';
  const infoBox = document.querySelector('.project-info-box');

  let activeHeroLayer = heroPrimaryLayer;
  let inactiveHeroLayer = heroSecondaryLayer;
  let currentImageIdx = 0;
  let heroVideoElement = null;

  const toggleClassState = (element, className, shouldEnable) => {
    if (!element) return;
    element.classList.toggle(className, Boolean(shouldEnable));
  };

  const toggleHiddenState = (element, shouldHide) => {
    if (!element) return;
    element.hidden = Boolean(shouldHide);
  };

  const toCssUrlValue = (url) => {
    const escapedUrl = String(url || '').replace(/"/g, '\\"');
    return `url("${escapedUrl}")`;
  };

  const getHeroMediaFallbackValue = (mediaItem) => {
    if (!mediaItem) return '#212121';
    if (mediaItem.type === 'video') return mediaItem.poster || '#212121';
    if (mediaItem.type === 'color') return mediaItem.value || '#212121';
    return mediaItem.src || '#212121';
  };

  const normalizeHeroMediaItem = (item, fallbackPoster = '') => {
    if (!item) return null;

    if (typeof item === 'string') {
      return item.startsWith('#')
        ? { type: 'color', value: item, thumb: item }
        : { type: 'image', src: item, thumb: item };
    }

    if (typeof item !== 'object') return null;

    const itemType = String(item.type || 'image').toLowerCase();

    if (itemType === 'video' && item.src) {
      const poster = item.poster || fallbackPoster || '';
      return {
        type: 'video',
        src: item.src,
        poster,
        thumb: poster || '#212121'
      };
    }

    if (itemType === 'color' && item.value) {
      return {
        type: 'color',
        value: item.value,
        thumb: item.value
      };
    }

    if (!item.src) return null;

    return {
      type: 'image',
      src: item.src,
      thumb: item.thumb || item.src
    };
  };

  const preloadHeroMedia = (mediaItems) => {
    if (!document.head || !Array.isArray(mediaItems)) return;

    mediaItems.forEach((mediaItem, index) => {
      const preloadTarget =
        mediaItem.type === 'image'
          ? mediaItem.src
          : mediaItem.type === 'video'
            ? mediaItem.poster
            : '';

      const safePath = String(preloadTarget || '');
      if (!safePath || safePath.startsWith('#')) return;

      const preloadKey = encodeURIComponent(safePath);
      if (document.head.querySelector(`link[data-project-hero-preload="${preloadKey}"]`)) return;

      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = safePath;
      preloadLink.setAttribute('fetchpriority', index === 0 ? 'high' : 'low');
      preloadLink.setAttribute('data-project-hero-preload', preloadKey);
      document.head.appendChild(preloadLink);
    });
  };

  const ensureHeroVideoElement = () => {
    if (heroVideoElement || !heroMediaContainer) return heroVideoElement;

    heroVideoElement = document.createElement('video');
    heroVideoElement.className = 'project-hero__video';
    heroVideoElement.autoplay = true;
    heroVideoElement.muted = true;
    heroVideoElement.loop = true;
    heroVideoElement.playsInline = true;
    heroVideoElement.preload = 'metadata';
    heroVideoElement.setAttribute('aria-hidden', 'true');
    heroMediaContainer.appendChild(heroVideoElement);

    return heroVideoElement;
  };

  const deactivateHeroVideo = (options = {}) => {
    const { clearSource = false } = options;
    if (!heroVideoElement) return;

    heroVideoElement.classList.remove('project-hero__video--active');
    heroVideoElement.pause();

    if (!clearSource) return;

    heroVideoElement.removeAttribute('src');
    heroVideoElement.removeAttribute('poster');
    heroVideoElement.load();
  };

  const activateHeroVideo = (mediaItem) => {
    const videoElement = ensureHeroVideoElement();
    if (!videoElement || !mediaItem || !mediaItem.src) return;

    const currentSrc = videoElement.getAttribute('src') || '';
    const shouldReload = currentSrc !== mediaItem.src;

    if (shouldReload) {
      videoElement.setAttribute('src', mediaItem.src);
    }

    if (mediaItem.poster) {
      videoElement.setAttribute('poster', mediaItem.poster);
    } else {
      videoElement.removeAttribute('poster');
    }

    if (shouldReload) {
      videoElement.load();
    }

    heroVideoElement.classList.add('project-hero__video--active');
    const playPromise = videoElement.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  };

  const setHeroLayerState = (layer, value) => {
    if (!layer) return;

    const surfaceValue = value || '#212121';
    if (surfaceValue.startsWith('#')) {
      layer.style.backgroundImage = 'none';
      layer.style.backgroundColor = surfaceValue;
      return;
    }

    layer.style.backgroundImage = toCssUrlValue(surfaceValue);
    layer.style.backgroundColor = 'transparent';
  };

  const setHeroBackgroundState = (mediaItem, options = {}) => {
    const { animate = false } = options;
    const surfaceValue = getHeroMediaFallbackValue(mediaItem);
    const isColorSurface = surfaceValue.startsWith('#');
    const isVideoSurface = mediaItem && mediaItem.type === 'video';

    heroContainer.classList.toggle('project-hero--has-color', isColorSurface && !isVideoSurface);
    heroContainer.classList.toggle('project-hero--has-image', !isColorSurface && !isVideoSurface);
    heroContainer.classList.toggle('project-hero--has-video', isVideoSurface);

    if (isVideoSurface) {
      activateHeroVideo(mediaItem);
    } else {
      deactivateHeroVideo();
    }

    if (!activeHeroLayer || !inactiveHeroLayer) return;

    if (!animate) {
      setHeroLayerState(activeHeroLayer, surfaceValue);
      setHeroLayerState(inactiveHeroLayer, surfaceValue);
      activeHeroLayer.classList.add('project-hero__image-layer--active');
      inactiveHeroLayer.classList.remove('project-hero__image-layer--active');
      return;
    }

    setHeroLayerState(inactiveHeroLayer, surfaceValue);
    inactiveHeroLayer.classList.add('project-hero__image-layer--active');
    activeHeroLayer.classList.remove('project-hero__image-layer--active');

    const previousActiveLayer = activeHeroLayer;
    activeHeroLayer = inactiveHeroLayer;
    inactiveHeroLayer = previousActiveLayer;
  };

  const setActiveHeroSelector = (nextIndex) => {
    if (!heroSelectorsContainer) return;

    const selectorButtons = heroSelectorsContainer.querySelectorAll('.project-hero__selector');
    selectorButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === nextIndex;
      button.classList.toggle('project-hero__selector--active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const showMissingState = () => {
    titleContainer.textContent = defaultMissingTitle;
    descriptionContainer.textContent = defaultMissingDesc;
    toggleClassState(excerptContainer, 'project-excerpt--visible', false);
    deactivateHeroVideo({ clearSource: true });
    setHeroBackgroundState({ type: 'color', value: '#212121', thumb: '#212121' });
    toggleHiddenState(heroCategoryContainer, true);

    if (heroSelectorsContainer) {
      heroSelectorsContainer.innerHTML = '';
      toggleClassState(heroSelectorsContainer, 'project-hero__selectors--active', false);
      toggleHiddenState(heroSelectorsContainer, true);
    }

    toggleClassState(infoBox, 'project-info-box--hidden', true);
    toggleClassState(projectNav, 'project-detail-nav--active', false);
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

  toggleClassState(infoBox, 'project-info-box--hidden', false);

  const getUiText = (translationKey, fallback) => {
    const translated = window.I18n.translate(translationKey);
    return translated && translated !== translationKey ? translated : fallback;
  };

  const localizeStatus = (statusValue) => {
    if (!statusValue) return '';
    const statusMap = {
      completed: { en: 'Completed', sq: 'Përfunduar' },
      'in progress': { en: 'In Progress', sq: 'Në proces' }
    };
    const normalizedStatus = String(statusValue).trim().toLowerCase();
    const localized = statusMap[normalizedStatus];
    if (!localized) return statusValue;
    return window.I18n.getLocalizedValue(localized);
  };

  const title = window.I18n.getLocalizedValue(project.title) || 'Project';
  const description = window.I18n.getLocalizedValue(project.description) || '';
  const detailsHtml = window.I18n.getLocalizedValue(project.detailsHtml) || '';
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
      toggleClassState(excerptContainer, 'project-excerpt--visible', true);
    } else {
      toggleClassState(excerptContainer, 'project-excerpt--visible', false);
    }
  }

  descriptionContainer.innerHTML = detailsHtml || description || '';

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
      toggleClassState(el, 'project-info-item--visible', true);
    } else {
      toggleClassState(el, 'project-info-item--visible', false);
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

  if (heroCategoryContainer) {
    if (categoryName) {
      heroCategoryContainer.textContent = categoryName;
      toggleHiddenState(heroCategoryContainer, false);
    } else {
      heroCategoryContainer.textContent = '';
      toggleHiddenState(heroCategoryContainer, true);
    }
  }

  const heroImagesSource =
    project.heroImages && project.heroImages.length > 0
      ? project.heroImages
      : project.coverImage
        ? [project.coverImage]
        : ['#212121'];
  const heroImages = heroImagesSource
    .map((item) => normalizeHeroMediaItem(item, project.coverImage || ''))
    .filter(Boolean);

  if (heroImages.length === 0) {
    heroImages.push({ type: 'color', value: '#212121', thumb: '#212121' });
  }

  preloadHeroMedia(heroImages);

  const setHeroBackground = (idx, options = {}) => {
    const safeIndex = Math.max(0, Math.min(idx, heroImages.length - 1));
    currentImageIdx = safeIndex;
    setHeroBackgroundState(heroImages[safeIndex], options);
  };

  const buildHeroSelectors = () => {
    if (!heroSelectorsContainer) return;

    heroSelectorsContainer.innerHTML = '';
    heroSelectorsContainer.setAttribute('aria-label', getUiText('Project images', 'Project images'));

    if (heroImages.length <= 1) {
      toggleClassState(heroSelectorsContainer, 'project-hero__selectors--active', false);
      toggleHiddenState(heroSelectorsContainer, true);
      return;
    }

    const heroImageLabel = getUiText('Project image', 'Project image');
    const heroVideoLabel = getUiText('Project video', 'Project video');
    const videoBadgeLabel = window.I18n.getCurrentLanguage() === 'sq' ? 'Video' : 'Video';
    const selectorsFragment = document.createDocumentFragment();

    heroImages.forEach((mediaItem, index) => {
      const selector = document.createElement('button');
      const isVideoItem = mediaItem.type === 'video';
      const thumbValue = mediaItem.thumb || getHeroMediaFallbackValue(mediaItem);
      selector.type = 'button';
      selector.className = 'project-hero__selector';
      selector.setAttribute('aria-label', `${isVideoItem ? heroVideoLabel : heroImageLabel} ${index + 1}`);
      selector.setAttribute('aria-pressed', String(index === currentImageIdx));

      const selectorThumb = document.createElement('span');
      selectorThumb.className = 'project-hero__selector-thumb';
      setHeroLayerState(selectorThumb, thumbValue);

      const selectorIndex = document.createElement('span');
      selectorIndex.className = 'project-hero__selector-index';
      selectorIndex.textContent = String(index + 1).padStart(2, '0');

      selector.appendChild(selectorThumb);
      if (isVideoItem) {
        const selectorBadge = document.createElement('span');
        selectorBadge.className = 'project-hero__selector-badge';
        selectorBadge.textContent = videoBadgeLabel;
        selector.appendChild(selectorBadge);
      }
      selector.appendChild(selectorIndex);

      selector.addEventListener('click', () => {
        if (index === currentImageIdx) return;
        setHeroBackground(index, { animate: true });
        setActiveHeroSelector(index);
      });

      selectorsFragment.appendChild(selector);
    });

    heroSelectorsContainer.appendChild(selectorsFragment);
    toggleHiddenState(heroSelectorsContainer, false);
    toggleClassState(heroSelectorsContainer, 'project-hero__selectors--active', true);
    setActiveHeroSelector(currentImageIdx);
  };

  setHeroBackground(0);
  buildHeroSelectors();

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
      toggleClassState(card, 'project-detail-nav-card--active', false);
      return;
    }

    const targetTitle = window.I18n.getLocalizedValue(targetProject.title) || 'Project';
    const targetCategory = categoryById.get(targetProject.categoryId);
    const targetCategoryName = targetCategory ? window.I18n.getLocalizedValue(targetCategory.title) : '';
    const labelEl = card.querySelector('.nav-label');
    const titleEl = card.querySelector('.nav-title');
    const categoryEl = card.querySelector('.nav-category');

    card.href = `project.html?slug=${encodeURIComponent(targetProject.slug)}`;
    toggleClassState(card, 'project-detail-nav-card--active', true);

    if (labelEl) labelEl.textContent = getUiText(navLabelKey, navLabelKey);
    if (titleEl) titleEl.textContent = targetTitle;
    if (categoryEl) {
      if (targetCategoryName) {
        categoryEl.textContent = targetCategoryName;
        toggleClassState(categoryEl, 'nav-category--visible', true);
      } else {
        categoryEl.textContent = '';
        toggleClassState(categoryEl, 'nav-category--visible', false);
      }
    }
  };

  if (projectNav) {
    const hasAdjacentProjects = Boolean(prevProject || nextProject);
    toggleClassState(projectNav, 'project-detail-nav--active', hasAdjacentProjects);

    populateNavCard(prevBtn, prevProject, 'Previous Project');
    populateNavCard(nextBtn, nextProject, 'Next Project');
  }
});
