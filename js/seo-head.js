(function () {
  const SUPPORTED_LANGS = ['en', 'sq'];
  const OG_LOCALE_BY_LANG = {
    en: 'en_US',
    sq: 'sq_AL'
  };
  const DEFAULT_CANONICAL_HOST = 'https://www.rafincompany.com';
  const DEFAULT_OG_IMAGE = '/images/logo-inverse-304x39.png';
  const ORG_SCHEMA_ID = 'seo-organization-schema';
  const PAGE_SCHEMA_ID = 'seo-page-schema';

  function normalizeHost(value) {
    if (!value || typeof value !== 'string') return DEFAULT_CANONICAL_HOST;
    return value.replace(/\/+$/, '');
  }

  function getSiteData() {
    if (window.ContentStore && typeof window.ContentStore.getSiteData === 'function') {
      return window.ContentStore.getSiteData() || {};
    }
    return window.siteData || {};
  }

  function getSiteConfig() {
    const siteData = getSiteData();
    return siteData.site || {};
  }

  function getCanonicalHost() {
    const siteConfig = getSiteConfig();
    return normalizeHost(
      (siteConfig.seo && siteConfig.seo.canonicalHost) || DEFAULT_CANONICAL_HOST
    );
  }

  function getDefaultOgImage() {
    const siteConfig = getSiteConfig();
    return (siteConfig.seo && siteConfig.seo.defaultOgImage) || DEFAULT_OG_IMAGE;
  }

  function getCompanyName() {
    const siteConfig = getSiteConfig();
    return siteConfig.companyName || 'Rafin Company';
  }

  function getLocalizedValue(value) {
    if (window.I18n && typeof window.I18n.getLocalizedValue === 'function') {
      return window.I18n.getLocalizedValue(value) || '';
    }
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value.en || value.sq || '';
    }
    return '';
  }

  function translate(key, fallback) {
    if (!window.I18n || typeof window.I18n.translate !== 'function') return fallback;
    const translated = window.I18n.translate(key);
    if (!translated || translated === key) return fallback;
    return translated;
  }

  function getCurrentLanguage() {
    if (window.I18n && typeof window.I18n.getCurrentLanguage === 'function') {
      const lang = window.I18n.getCurrentLanguage();
      if (SUPPORTED_LANGS.indexOf(lang) !== -1) return lang;
    }
    const queryLang = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED_LANGS.indexOf(queryLang) !== -1) return queryLang;
    return 'en';
  }

  function inferPageType() {
    const pathname = window.location.pathname || '';
    const fileName = pathname.split('/').pop().toLowerCase();
    if (!fileName || fileName === 'index.html') return 'home';
    if (fileName === 'projects.html') return 'projects';
    if (fileName === 'career.html') return 'career';
    if (fileName === 'category.html') return 'category';
    if (fileName === 'project.html') return 'project';
    return 'generic';
  }

  function getSlugFromUrl() {
    const rawSlug = new URLSearchParams(window.location.search).get('slug');
    return rawSlug ? String(rawSlug).trim() : '';
  }

  function appendLanguageParam(path, lang) {
    const separator = path.indexOf('?') === -1 ? '?' : '&';
    return path + separator + 'lang=' + encodeURIComponent(lang);
  }

  function toAbsoluteUrl(pathOrUrl) {
    if (!pathOrUrl) return '';
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const clean = String(pathOrUrl).replace(/^\.\//, '').replace(/^\/+/, '');
    const base = getCanonicalHost() + '/';
    try {
      return new URL(clean, base).toString();
    } catch (error) {
      return base + clean;
    }
  }

  function buildRoutePath(pageType, slugValue) {
    if (pageType === 'home') return 'index.html';
    if (pageType === 'projects') return 'projects.html';
    if (pageType === 'career') return 'career.html';
    if (pageType === 'category') {
      if (!slugValue) return 'category.html';
      return 'category.html?slug=' + encodeURIComponent(slugValue);
    }
    if (pageType === 'project') {
      if (!slugValue) return 'project.html';
      return 'project.html?slug=' + encodeURIComponent(slugValue);
    }
    const pathname = window.location.pathname || '/index.html';
    const relativePath = pathname.replace(/^\/+/, '') || 'index.html';
    return relativePath;
  }

  function upsertMetaByName(name, content) {
    let element = document.querySelector('meta[name="' + name + '"]');
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
    return element;
  }

  function upsertMetaByProperty(property, content) {
    let element = document.querySelector('meta[property="' + property + '"]');
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
    return element;
  }

  function upsertCanonical(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
  }

  function setHrefLangAlternates(basePath) {
    const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingAlternates.forEach(function (alternate) {
      alternate.parentNode.removeChild(alternate);
    });

    const enUrl = toAbsoluteUrl(appendLanguageParam(basePath, 'en'));
    const sqUrl = toAbsoluteUrl(appendLanguageParam(basePath, 'sq'));

    const alternates = [
      { hreflang: 'en', href: enUrl },
      { hreflang: 'sq', href: sqUrl },
      { hreflang: 'x-default', href: enUrl }
    ];

    alternates.forEach(function (item) {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', item.hreflang);
      link.setAttribute('href', item.href);
      document.head.appendChild(link);
    });
  }

  function setStructuredData(id, payload) {
    let scriptTag = document.getElementById(id);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(payload);
  }

  function resolveCategoryBySlug(slug) {
    if (!slug || !window.ContentStore || typeof window.ContentStore.getCategoryBySlug !== 'function') {
      return null;
    }
    return window.ContentStore.getCategoryBySlug(slug);
  }

  function resolveProjectBySlug(slug) {
    if (!slug || !window.ContentStore || typeof window.ContentStore.getProjectBySlug !== 'function') {
      return null;
    }
    return window.ContentStore.getProjectBySlug(slug);
  }

  function resolveRouteMeta(context) {
    const pageType = context.pageType || inferPageType();
    const companyName = getCompanyName();
    const slug = context.slug || getSlugFromUrl();
    let title = '';
    let description = '';
    let ogTitle = '';
    let ogDescription = '';
    let ogType = 'website';
    let routePath = buildRoutePath(pageType, slug);
    let pageSchemaType = 'WebPage';
    let mainEntity = null;
    let ogImage = getDefaultOgImage();
    let indexable = true;

    if (pageType === 'home') {
      title = translate('Home Page Title', companyName + ' | Construction & Infrastructure');
      description = translate(
        'Home Meta Description',
        companyName + ' is a leading construction and infrastructure company in Albania.'
      );
      ogTitle = translate('Home OG Title', title);
      ogDescription = translate('Home OG Description', description);
      pageSchemaType = 'WebSite';
    } else if (pageType === 'career') {
      title = translate('Careers Page Title', 'Careers | ' + companyName);
      description = translate(
        'Careers Meta Description',
        'Explore open positions at ' + companyName + ' across engineering, transport, construction, and machinery maintenance.'
      );
      ogTitle = title;
      ogDescription = description;
      pageSchemaType = 'CollectionPage';
      mainEntity = {
        '@type': 'ItemList',
        name: translate('Careers', 'Careers')
      };
    } else if (pageType === 'projects') {
      title = translate('Projects Page Title', 'Projects | ' + companyName);
      description = translate(
        'Projects Meta Description',
        'Browse the construction and infrastructure projects delivered by ' + companyName + '.'
      );
      ogTitle = title;
      ogDescription = description;
      pageSchemaType = 'CollectionPage';
      mainEntity = {
        '@type': 'ItemList',
        name: translate('projects', 'Projects')
      };
    } else if (pageType === 'category') {
      const category = context.category || resolveCategoryBySlug(slug);
      const categoryTitle = category ? (getLocalizedValue(category.title) || translate('Category', 'Category')) : '';
      const categoryDescription = category
        ? (getLocalizedValue(category.fullDescription) || getLocalizedValue(category.shortDescription))
        : '';
      routePath = buildRoutePath('category', category ? (category.slug || slug) : slug);
      if (category) {
        title = categoryTitle + ' | ' + companyName;
        description = categoryDescription || translate('Category Meta Description', 'Explore projects by category.');
        ogTitle = title;
        ogDescription = description;
        ogImage = category.heroImage || category.thumbImage || ogImage;
        pageSchemaType = 'CollectionPage';
        mainEntity = {
          '@type': 'Thing',
          name: categoryTitle
        };
      } else {
        const fallbackTitle = translate('Category Not Found', 'Category Not Found');
        title = fallbackTitle + ' | ' + companyName;
        description = translate('Please select a valid category.', 'Please select a valid category.');
        ogTitle = title;
        ogDescription = description;
        indexable = false;
      }
    } else if (pageType === 'project') {
      const project = context.project || resolveProjectBySlug(slug);
      routePath = buildRoutePath('project', project ? (project.slug || slug) : slug);
      if (project) {
        const projectTitle = getLocalizedValue(project.title) || translate('Project Page Title', 'Project Details');
        const projectExcerpt = getLocalizedValue(project.excerpt);
        const projectDescription = getLocalizedValue(project.description);
        title = projectTitle + ' | ' + companyName;
        description =
          projectExcerpt ||
          projectDescription ||
          translate(
            'Project Meta Description',
            'View detailed information about construction projects by ' + companyName + '.'
          );
        ogTitle = title;
        ogDescription = description;
        ogType = 'article';
        ogImage =
          (project.heroImages && project.heroImages.length > 0 && project.heroImages[0]) ||
          project.coverImage ||
          ogImage;
        mainEntity = {
          '@type': 'CreativeWork',
          name: projectTitle
        };
      } else {
        const fallbackTitle = translate('Project Not Found', 'Project Not Found');
        title = fallbackTitle + ' | ' + companyName;
        description = translate(
          'Please go back and select a valid project.',
          'Please go back and select a valid project.'
        );
        ogTitle = title;
        ogDescription = description;
        indexable = false;
      }
    } else {
      title = document.title || companyName;
      description = translate(
        'metaDescription',
        companyName + ' - Construction and infrastructure services in Albania.'
      );
      ogTitle = title;
      ogDescription = description;
    }

    if (context.titleOverride) title = context.titleOverride;
    if (context.descriptionOverride) {
      description = context.descriptionOverride;
      ogDescription = context.descriptionOverride;
    }
    if (typeof context.indexable === 'boolean') indexable = context.indexable;

    return {
      pageType: pageType,
      routePath: routePath,
      title: title,
      description: description,
      ogTitle: ogTitle || title,
      ogDescription: ogDescription || description,
      ogType: ogType,
      ogImage: ogImage,
      pageSchemaType: pageSchemaType,
      mainEntity: mainEntity,
      indexable: indexable
    };
  }

  function buildOrganizationSchema() {
    const siteConfig = getSiteConfig();
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: getCompanyName(),
      url: toAbsoluteUrl('index.html'),
      logo: toAbsoluteUrl(getDefaultOgImage())
    };

    if (siteConfig.established) {
      schema.foundingDate = String(siteConfig.established);
    }

    if (siteConfig.socialLinks && typeof siteConfig.socialLinks === 'object') {
      const sameAs = Object.keys(siteConfig.socialLinks)
        .map(function (key) {
          return siteConfig.socialLinks[key];
        })
        .filter(function (value) {
          return !!value;
        });
      if (sameAs.length > 0) schema.sameAs = sameAs;
    }

    return schema;
  }

  function buildPageSchema(meta, canonicalUrl, lang) {
    const schema = {
      '@context': 'https://schema.org',
      '@type': meta.pageSchemaType,
      name: meta.title,
      url: canonicalUrl,
      inLanguage: lang,
      description: meta.description
    };

    if (meta.pageType !== 'home') {
      schema.isPartOf = {
        '@type': 'WebSite',
        name: getCompanyName(),
        url: toAbsoluteUrl(appendLanguageParam('index.html', lang))
      };
    }

    if (meta.mainEntity) {
      schema.mainEntity = meta.mainEntity;
    }

    return schema;
  }

  function applyRouteMeta(context) {
    const safeContext = context && typeof context === 'object' ? context : {};
    const lang = safeContext.lang || getCurrentLanguage();
    const normalizedLang = SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : 'en';
    const routeMeta = resolveRouteMeta(safeContext);
    const canonicalPath = appendLanguageParam(routeMeta.routePath, normalizedLang);
    const canonicalUrl = toAbsoluteUrl(canonicalPath);
    const ogImageUrl = toAbsoluteUrl(routeMeta.ogImage || getDefaultOgImage());
    const locale = OG_LOCALE_BY_LANG[normalizedLang] || OG_LOCALE_BY_LANG.en;

    document.title = routeMeta.title;
    upsertMetaByName('description', routeMeta.description);
    upsertMetaByName('robots', routeMeta.indexable ? 'index,follow' : 'noindex,follow');
    upsertCanonical(canonicalUrl);
    setHrefLangAlternates(routeMeta.routePath);

    upsertMetaByProperty('og:title', routeMeta.ogTitle);
    upsertMetaByProperty('og:description', routeMeta.ogDescription);
    upsertMetaByProperty('og:type', routeMeta.ogType);
    upsertMetaByProperty('og:url', canonicalUrl);
    upsertMetaByProperty('og:image', ogImageUrl);
    upsertMetaByProperty('og:locale', locale);
    upsertMetaByProperty('og:site_name', getCompanyName());

    setStructuredData(ORG_SCHEMA_ID, buildOrganizationSchema());
    setStructuredData(PAGE_SCHEMA_ID, buildPageSchema(routeMeta, canonicalUrl, normalizedLang));
  }

  window.SeoHead = {
    applyRouteMeta: applyRouteMeta
  };

  window.addEventListener('load', function () {
    window.SeoHead.applyRouteMeta();
  });
})();
