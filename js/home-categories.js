document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const projectsSection = document.getElementById('projects');
  const showcaseMount = document.getElementById('home-categories-showcase');
  if (!projectsSection || !showcaseMount) return;

  if (showcaseMount.dataset.rendered === 'true') return;
  showcaseMount.dataset.rendered = 'true';

  const preferredHomeSlugs = [
    'civil-buildings',
    'road-infrastructure',
    'electrical-infrastructure',
    'water-infrastructure',
    'technology'
  ];

  const categories = window.ContentStore.getCategories() || [];
  const featuredCategories = getHomeCategories(categories, preferredHomeSlugs);
  if (featuredCategories.length === 0) return;

  const state = {
    activeIndex: 0,
    switchTimer: null
  };

  const uiCopy = {
    badge: {
      en: 'Our Projects',
      sq: 'Projektet tona'
    },
    heading: {
      en: 'Explore our project categories',
      sq: 'Eksploroni kategorit\u00eb e projekteve'
    },
    description: {
      en: 'Rafin delivers civil, road, electrical, water, technology, cultural, and residential projects with disciplined execution and long-term value.',
      sq: 'Rafin realizon projekte n\u00eb nd\u00ebrtime civile, infrastruktur\u00eb rrugore, elektrike dhe ujore, si edhe n\u00eb teknologji, monumente kulturore dhe rezidenca banuese.'
    },
    tabListLabel: {
      en: 'Project categories',
      sq: 'Kategorit\u00eb e projekteve'
    },
    panelBadge: {
      en: 'Rafin expertise',
      sq: 'Ekspertiza Rafin'
    },
    categoryImageAlt: {
      en: 'Representative image for',
      sq: 'Imazh p\u00ebrfaq\u00ebsues p\u00ebr'
    },
    primaryCta: {
      en: 'View projects',
      sq: 'Shiko projektet'
    },
    secondaryCta: {
      en: 'View all projects',
      sq: 'Shiko t\u00eb gjitha projektet'
    }
  };

  showcaseMount.innerHTML = `
    <div class="home-projects-showcase">
      <div class="home-projects-showcase__intro">
        <span class="home-projects-showcase__eyebrow">${escapeHtml(getUiText(uiCopy.badge))}</span>
        <h2 class="home-projects-showcase__title">${escapeHtml(getUiText(uiCopy.heading))}</h2>
        <p class="home-projects-showcase__description">${escapeHtml(getUiText(uiCopy.description))}</p>
      </div>
      <div class="home-projects-showcase__tabs" role="tablist" aria-label="${escapeHtml(getUiText(uiCopy.tabListLabel))}"></div>
      <div class="home-projects-showcase__panel" aria-live="polite">
        <div class="home-projects-showcase__panel-body" id="home-projects-panel" role="tabpanel"></div>
      </div>
    </div>
  `;

  const tabsContainer = showcaseMount.querySelector('.home-projects-showcase__tabs');
  const panelContainer = showcaseMount.querySelector('.home-projects-showcase__panel');
  const panelBody = showcaseMount.querySelector('.home-projects-showcase__panel-body');

  function getUiText(value) {
    return window.I18n.getLocalizedValue(value) || value.en || '';
  }

  function getHomeCategories(categoryList, preferredSlugs) {
    const featured = categoryList
      .filter((category) => category && category.featuredOnHome)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    if (featured.length > 0) {
      return featured;
    }

    const preferred = preferredSlugs
      .map((slug) => categoryList.find((category) => category && category.slug === slug))
      .filter(Boolean);

    if (preferred.length > 0) {
      return preferred;
    }

    return [...categoryList].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function getCategoryTitle(category) {
    return window.I18n.getLocalizedValue(category.title) || 'Category';
  }

  function getCategoryDescription(category) {
    return window.I18n.getLocalizedValue(category.fullDescription) ||
      window.I18n.getLocalizedValue(category.shortDescription) ||
      '';
  }

  function getCategoryImage(category) {
    return category.heroImage || category.thumbImage || 'images/default-thumb.jpg';
  }

  function getCategoryUrl(category) {
    return category.slug ? `category.html?slug=${encodeURIComponent(category.slug)}` : 'projects.html';
  }

  function renderTabs(focusIndex) {
    tabsContainer.innerHTML = featuredCategories.map((category, index) => {
      const isActive = index === state.activeIndex;
      const title = getCategoryTitle(category);

      return `
        <button
          class="home-projects-showcase__tab ${isActive ? 'is-active' : ''}"
          type="button"
          role="tab"
          id="home-projects-tab-${index}"
          aria-selected="${isActive}"
          aria-controls="home-projects-panel"
          tabindex="${isActive ? '0' : '-1'}"
          data-index="${index}"
        >
          <span class="home-projects-showcase__tab-label">${escapeHtml(title)}</span>
        </button>
      `;
    }).join('');

    if (typeof focusIndex === 'number') {
      const nextButton = tabsContainer.querySelector(`[data-index="${focusIndex}"]`);
      if (nextButton) nextButton.focus();
    }
  }

  function renderPanel() {
    const activeCategory = featuredCategories[state.activeIndex];
    const title = getCategoryTitle(activeCategory);
    const description = getCategoryDescription(activeCategory);
    const image = getCategoryImage(activeCategory);
    const categoryUrl = getCategoryUrl(activeCategory);
    const imageAltPrefix = getUiText(uiCopy.categoryImageAlt);

    panelBody.setAttribute('aria-labelledby', `home-projects-tab-${state.activeIndex}`);
    panelBody.innerHTML = `
      <article class="home-projects-showcase__panel-card">
        <div class="home-projects-showcase__content">
          <span class="home-projects-showcase__content-badge">${escapeHtml(getUiText(uiCopy.panelBadge))}</span>
          <h3 class="home-projects-showcase__content-title">${escapeHtml(title)}</h3>
          <p class="home-projects-showcase__content-text">${escapeHtml(description)}</p>
          <div class="home-projects-showcase__actions">
            <a class="home-projects-showcase__cta home-projects-showcase__cta--primary" href="${escapeHtml(categoryUrl)}">
              <span>${escapeHtml(getUiText(uiCopy.primaryCta))}</span>
              <span class="home-projects-showcase__cta-arrow" aria-hidden="true">&rarr;</span>
            </a>
            <a class="home-projects-showcase__cta home-projects-showcase__cta--secondary" href="projects.html">
              <span>${escapeHtml(getUiText(uiCopy.secondaryCta))}</span>
            </a>
          </div>
        </div>
        <div class="home-projects-showcase__media">
          <figure class="home-projects-showcase__image-frame">
            <img src="${escapeHtml(image)}" alt="${escapeHtml(`${imageAltPrefix} ${title}`)}" loading="lazy" decoding="async" fetchpriority="low">
          </figure>
        </div>
      </article>
    `;
  }

  function setActiveIndex(nextIndex, options) {
    const config = options || {};
    if (nextIndex < 0 || nextIndex >= featuredCategories.length) return;
    if (nextIndex === state.activeIndex && !config.force) return;

    state.activeIndex = nextIndex;
    renderTabs(config.focusIndex);

    if (state.switchTimer) {
      window.clearTimeout(state.switchTimer);
    }

    panelContainer.classList.add('is-switching');
    state.switchTimer = window.setTimeout(() => {
      renderPanel();
      panelContainer.classList.remove('is-switching');
    }, config.instant ? 0 : 150);
  }

  tabsContainer.addEventListener('click', (event) => {
    const tabButton = event.target.closest('.home-projects-showcase__tab');
    if (!tabButton || !tabsContainer.contains(tabButton)) return;

    const nextIndex = Number(tabButton.getAttribute('data-index'));
    if (Number.isNaN(nextIndex)) return;
    setActiveIndex(nextIndex);
  });

  tabsContainer.addEventListener('keydown', (event) => {
    const tabButton = event.target.closest('.home-projects-showcase__tab');
    if (!tabButton) return;

    let nextIndex = null;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (state.activeIndex + 1) % featuredCategories.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (state.activeIndex - 1 + featuredCategories.length) % featuredCategories.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = featuredCategories.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex, { focusIndex: nextIndex });
  });

  renderTabs();
  renderPanel();
});
