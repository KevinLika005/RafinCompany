(function () {
  const SUPPORTED_LANGS = ["en", "sq"];
  const OG_LOCALE_BY_LANG = {
    en: "en_US",
    sq: "sq_AL"
  };
  const DEFAULT_CANONICAL_HOST = "https://www.rafincompany.com";
  const DEFAULT_OG_IMAGE = "/rafin_transparent_logos_png/rafin-logo-original-transparent.png";

  function normalizeLanguage(value) {
    return SUPPORTED_LANGS.indexOf(value) !== -1 ? value : "en";
  }

  function normalizeHost(value) {
    if (!value || typeof value !== "string") return DEFAULT_CANONICAL_HOST;
    return value.replace(/\/+$/, "");
  }

  function getSiteData() {
    if (window.ContentStore && typeof window.ContentStore.getSiteData === "function") {
      return window.ContentStore.getSiteData() || {};
    }
    return window.siteData || {};
  }

  function getSiteConfig() {
    return getSiteData().site || {};
  }

  function getCanonicalHost() {
    const siteConfig = getSiteConfig();
    return normalizeHost((siteConfig.seo && siteConfig.seo.canonicalHost) || DEFAULT_CANONICAL_HOST);
  }

  function getDefaultOgImage() {
    const siteConfig = getSiteConfig();
    return (siteConfig.seo && siteConfig.seo.defaultOgImage) || DEFAULT_OG_IMAGE;
  }

  function getCompanyName() {
    return getSiteConfig().companyName || "Rafin Company";
  }

  function getLocalizedValue(value) {
    if (window.I18n && typeof window.I18n.getLocalizedValue === "function") {
      return window.I18n.getLocalizedValue(value) || "";
    }
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return value.en || value.sq || "";
    return "";
  }

  function translate(key, fallback) {
    if (!window.I18n || typeof window.I18n.translate !== "function") return fallback;
    const translated = window.I18n.translate(key);
    return translated && translated !== key ? translated : fallback;
  }

  function getUrlLanguage() {
    if (window.I18n && typeof window.I18n.getUrlLanguage === "function") {
      return normalizeLanguage(window.I18n.getUrlLanguage());
    }

    try {
      return normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
    } catch (error) {
      return "en";
    }
  }

  function inferPageType() {
    const pathname = window.location.pathname || "";
    const fileName = (pathname.split("/").pop() || "index.html").toLowerCase();
    if (!fileName || fileName === "index.html") return "home";
    if (fileName === "projects.html") return "projects";
    if (fileName === "services.html") return "services";
    if (fileName === "siguria.html") return "safety";
    if (fileName === "career.html") return "career";
    if (fileName === "category.html") return "category";
    if (fileName === "project.html") return "project";
    return "generic";
  }

  function getSlugFromUrl() {
    try {
      const rawSlug = new URLSearchParams(window.location.search).get("slug");
      return rawSlug ? String(rawSlug).trim() : "";
    } catch (error) {
      return "";
    }
  }

  function appendLanguageParam(path, lang) {
    return path + (path.indexOf("?") === -1 ? "?" : "&") + "lang=" + encodeURIComponent(normalizeLanguage(lang));
  }

  function toAbsoluteUrl(pathOrUrl) {
    if (!pathOrUrl) return "";
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const cleanPath = String(pathOrUrl).replace(/^\.\//, "").replace(/^\/+/, "");
    const base = getCanonicalHost() + "/";

    try {
      return new URL(cleanPath, base).toString();
    } catch (error) {
      return base + cleanPath;
    }
  }

  function buildRoutePath(pageType, slugValue) {
    if (pageType === "home") return "index.html";
    if (pageType === "projects") return "projects.html";
    if (pageType === "services") return "services.html";
    if (pageType === "safety") return "siguria.html";
    if (pageType === "career") return "career.html";
    if (pageType === "category") {
      return slugValue ? "category.html?slug=" + encodeURIComponent(slugValue) : "category.html";
    }
    if (pageType === "project") {
      return slugValue ? "project.html?slug=" + encodeURIComponent(slugValue) : "project.html";
    }

    const pathname = window.location.pathname || "/index.html";
    return pathname.replace(/^\/+/, "") || "index.html";
  }

  function upsertMetaByName(name, content) {
    let element = document.querySelector('meta[name="' + name + '"]');
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("name", name);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  }

  function upsertMetaByProperty(property, content) {
    let element = document.querySelector('meta[property="' + property + '"]');
    if (!element) {
      element = document.createElement("meta");
      element.setAttribute("property", property);
      document.head.appendChild(element);
    }
    element.setAttribute("content", content);
  }

  function upsertCanonical(url) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }

  function setHrefLangAlternates(basePath) {
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((alternate) => {
      alternate.parentNode.removeChild(alternate);
    });

    const enUrl = toAbsoluteUrl(appendLanguageParam(basePath, "en"));
    const sqUrl = toAbsoluteUrl(appendLanguageParam(basePath, "sq"));

    [
      { hreflang: "en", href: enUrl },
      { hreflang: "sq", href: sqUrl },
      { hreflang: "x-default", href: enUrl }
    ].forEach((item) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", item.hreflang);
      link.setAttribute("href", item.href);
      document.head.appendChild(link);
    });
  }

  function resolveCategoryBySlug(slug) {
    if (!slug) return null;
    if (!window.ContentStore || typeof window.ContentStore.getCategoryBySlug !== "function") return undefined;
    return window.ContentStore.getCategoryBySlug(slug);
  }

  function resolveProjectBySlug(slug) {
    if (!slug) return null;
    if (!window.ContentStore || typeof window.ContentStore.getProjectBySlug !== "function") return undefined;
    return window.ContentStore.getProjectBySlug(slug);
  }

  function resolveRouteMeta(context) {
    const pageType = context.pageType || inferPageType();
    const companyName = getCompanyName();
    const slug = context.slug || getSlugFromUrl();
    let title = "";
    let description = "";
    let ogTitle = "";
    let ogDescription = "";
    let ogType = "website";
    let routePath = buildRoutePath(pageType, slug);
    let ogImage = getDefaultOgImage();
    let indexable = true;

    if (pageType === "home") {
      title = translate("Home Page Title", companyName + " | Construction & Infrastructure");
      description = translate(
        "Home Meta Description",
        companyName + " is a leading construction and infrastructure company in Albania."
      );
      ogTitle = translate("Home OG Title", title);
      ogDescription = translate("Home OG Description", description);
    } else if (pageType === "career") {
      title = translate("Careers Page Title", "Careers | " + companyName);
      description = translate(
        "Careers Meta Description",
        "Explore open positions at " + companyName + " across engineering, transport, construction, and machinery maintenance."
      );
      ogTitle = title;
      ogDescription = description;
    } else if (pageType === "projects") {
      title = translate("Projects Page Title", "Projects | " + companyName);
      description = translate(
        "Projects Meta Description",
        "Browse the construction and infrastructure projects delivered by " + companyName + "."
      );
      ogTitle = title;
      ogDescription = description;
    } else if (pageType === "services") {
      title = translate("Services Page Title", "Services | " + companyName);
      description = translate(
        "Services Meta Description",
        "Explore " + companyName + " services across planning, contracting, construction delivery, management, digital coordination, and design-build execution."
      );
      ogTitle = title;
      ogDescription = description;
    } else if (pageType === "safety") {
      title = translate("Safety Page Title", "Safety | " + companyName);
      description = translate(
        "Safety Meta Description",
        "Learn how " + companyName + " approaches site safety, employee protection, machinery safety, and risk prevention in construction work."
      );
      ogTitle = title;
      ogDescription = description;
    } else if (pageType === "category") {
      const category = context.category || resolveCategoryBySlug(slug);
      routePath = buildRoutePath("category", category ? (category.slug || slug) : slug);

      if (category) {
        const categoryTitle = getLocalizedValue(category.title) || translate("Category", "Category");
        const categoryDescription =
          getLocalizedValue(category.fullDescription) || getLocalizedValue(category.shortDescription);

        title = categoryTitle + " | " + companyName;
        description = categoryDescription || translate("Category Meta Description", "Explore projects by category.");
        ogTitle = title;
        ogDescription = description;
        ogImage = category.heroImage || category.thumbImage || ogImage;
      } else if (slug) {
        title = translate("Category Not Found", "Category Not Found") + " | " + companyName;
        description = translate("Please select a valid category.", "Please select a valid category.");
        ogTitle = title;
        ogDescription = description;
        indexable = false;
      } else {
        title = translate("Category Page Title", "Category") + " | " + companyName;
        description = translate("Category Meta Description", "Explore projects by category.");
        ogTitle = title;
        ogDescription = description;
      }
    } else if (pageType === "project") {
      const project = context.project || resolveProjectBySlug(slug);
      routePath = buildRoutePath("project", project ? (project.slug || slug) : slug);

      if (project) {
        const projectTitle = getLocalizedValue(project.title) || translate("Project Page Title", "Project Details");
        const projectExcerpt = getLocalizedValue(project.excerpt);
        const projectDescription = getLocalizedValue(project.description);

        title = projectTitle + " | " + companyName;
        description =
          projectExcerpt ||
          projectDescription ||
          translate("Project Meta Description", "View detailed information about construction projects by " + companyName + ".");
        ogTitle = title;
        ogDescription = description;
        ogType = "article";
        ogImage =
          (project.heroImages && project.heroImages.length > 0 && project.heroImages[0]) ||
          project.coverImage ||
          ogImage;
      } else if (slug) {
        title = translate("Project Not Found", "Project Not Found") + " | " + companyName;
        description = translate(
          "Please go back and select a valid project.",
          "Please go back and select a valid project."
        );
        ogTitle = title;
        ogDescription = description;
        indexable = false;
      } else {
        title = translate("Project Page Title", "Project Details") + " | " + companyName;
        description = translate(
          "Project Meta Description",
          "View detailed information about construction projects delivered by " + companyName + "."
        );
        ogTitle = title;
        ogDescription = description;
      }
    } else {
      title = document.title || companyName;
      description = translate("metaDescription", companyName + " - Construction and infrastructure services in Albania.");
      ogTitle = title;
      ogDescription = description;
    }

    if (context.titleOverride) title = context.titleOverride;
    if (context.descriptionOverride) {
      description = context.descriptionOverride;
      ogDescription = context.descriptionOverride;
    }
    if (typeof context.indexable === "boolean") indexable = context.indexable;

    return {
      routePath: routePath,
      title: title,
      description: description,
      ogTitle: ogTitle || title,
      ogDescription: ogDescription || description,
      ogType: ogType,
      ogImage: ogImage,
      indexable: indexable
    };
  }

  function applyRouteMeta(context) {
    const safeContext = context && typeof context === "object" ? context : {};
    const lang = normalizeLanguage(safeContext.lang || getUrlLanguage());
    const routeMeta = resolveRouteMeta({
      ...safeContext,
      lang: lang
    });
    const canonicalUrl = toAbsoluteUrl(appendLanguageParam(routeMeta.routePath, lang));
    const ogImageUrl = toAbsoluteUrl(routeMeta.ogImage || getDefaultOgImage());
    const locale = OG_LOCALE_BY_LANG[lang] || OG_LOCALE_BY_LANG.en;

    document.documentElement.setAttribute("lang", lang);
    document.title = routeMeta.title;

    upsertMetaByName("description", routeMeta.description);
    upsertMetaByName("robots", routeMeta.indexable ? "index,follow" : "noindex,follow");
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", routeMeta.ogTitle);
    upsertMetaByName("twitter:description", routeMeta.ogDescription);
    upsertMetaByName("twitter:image", ogImageUrl);

    upsertCanonical(canonicalUrl);
    setHrefLangAlternates(routeMeta.routePath);

    upsertMetaByProperty("og:title", routeMeta.ogTitle);
    upsertMetaByProperty("og:description", routeMeta.ogDescription);
    upsertMetaByProperty("og:type", routeMeta.ogType);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", ogImageUrl);
    upsertMetaByProperty("og:locale", locale);
    upsertMetaByProperty("og:site_name", getCompanyName());
  }

  window.SeoHead = {
    applyRouteMeta: applyRouteMeta
  };

  document.addEventListener("DOMContentLoaded", function () {
    window.SeoHead.applyRouteMeta();
  });
})();
