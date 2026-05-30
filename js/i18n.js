/**
 * Manual i18n system with URL-based language helpers.
 */
(function () {
  const SUPPORTED_LANGS = new Set(["en", "sq"]);
  const LOCALIZABLE_PAGES = new Set([
    "index.html",
    "projects.html",
    "services.html",
    "siguria.html",
    "career.html",
    "project.html",
    "category.html"
  ]);
  const HOME_SECTION_IDS = new Set(["home", "about", "services", "materials", "contacts"]);
  const SAME_SITE_HOSTS = new Set(["rafincompany.com", "www.rafincompany.com"]);

  function normalizeLanguage(lang) {
    return SUPPORTED_LANGS.has(lang) ? lang : "en";
  }

  function isSpecialHref(value) {
    return /^(?:mailto:|tel:|javascript:|data:)/i.test(value);
  }

  function shouldLocalizeAbsoluteUrl(url) {
    return /^https?:$/i.test(url.protocol) && SAME_SITE_HOSTS.has(String(url.hostname || "").toLowerCase());
  }

  function getLocalizablePagePath(url) {
    const pathname = String(url.pathname || "/").replace(/\/+/g, "/");
    const fileName = (pathname.split("/").pop() || "index.html").toLowerCase();
    if (pathname === "/" || fileName === "index.html") return "index.html";
    return LOCALIZABLE_PAGES.has(fileName) ? fileName : "";
  }

  function preserveLocalizedPath(url) {
    const pagePath = getLocalizablePagePath(url);
    if (!pagePath) return "";
    return pagePath;
  }

  const I18n = {
    getCurrentLanguage: () => {
      try {
        const queryLang = new URLSearchParams(window.location.search).get("lang");
        if (SUPPORTED_LANGS.has(queryLang)) return queryLang;
      } catch (error) {
        // Ignore URL parsing failures and fall back to persisted language.
      }

      const storedLang = localStorage.getItem("lang");
      if (SUPPORTED_LANGS.has(storedLang)) return storedLang;
      return "en";
    },

    getUrlLanguage: () => {
      try {
        const queryLang = new URLSearchParams(window.location.search).get("lang");
        return normalizeLanguage(queryLang);
      } catch (error) {
        return "en";
      }
    },

    buildLocalizedUrl: (pathOrUrl, langOverride) => {
      if (typeof pathOrUrl !== "string") return pathOrUrl;

      const rawValue = pathOrUrl.trim();
      if (!rawValue || rawValue === "#" || isSpecialHref(rawValue)) return rawValue;

      const targetLang = normalizeLanguage(langOverride || I18n.getCurrentLanguage());

      if (rawValue.charAt(0) === "#") {
        const fragment = rawValue.slice(1);
        if (!HOME_SECTION_IDS.has(fragment)) return rawValue;

        try {
          const currentUrl = new URL(window.location.href);
          if (getLocalizablePagePath(currentUrl) === "index.html" && document.getElementById(fragment)) {
            return rawValue;
          }
        } catch (error) {
          // Ignore URL parsing failures and fall back to localized home links.
        }

        return `index.html?lang=${encodeURIComponent(targetLang)}#${fragment}`;
      }

      let url;
      try {
        url = new URL(rawValue, window.location.href);
      } catch (error) {
        return rawValue;
      }

      const isRelativeUrl = !/^[a-z][a-z0-9+.-]*:/i.test(rawValue) && !rawValue.startsWith("//");
      if (!isRelativeUrl && !shouldLocalizeAbsoluteUrl(url)) {
        return rawValue;
      }

      const localizedPath = preserveLocalizedPath(url);
      if (!localizedPath) {
        return rawValue;
      }

      const params = new URLSearchParams(url.search);
      params.set("lang", targetLang);

      const query = params.toString();
      return `${localizedPath}${query ? `?${query}` : ""}${url.hash || ""}`;
    },

    localizeInternalLinks: (root) => {
      const scope = root && typeof root.querySelectorAll === "function" ? root : document;
      scope.querySelectorAll("a[href]").forEach((anchor) => {
        const currentHref = anchor.getAttribute("href");
        const localizedHref = I18n.buildLocalizedUrl(currentHref);
        if (localizedHref && localizedHref !== currentHref) {
          anchor.setAttribute("href", localizedHref);
        }
      });
    },

    setCurrentLanguage: (lang) => {
      if (!SUPPORTED_LANGS.has(lang)) return;

      localStorage.setItem("lang", lang);

      const nextUrl = I18n.buildLocalizedUrl(window.location.href, lang);
      if (nextUrl && nextUrl !== window.location.href) {
        window.location.href = nextUrl;
        return;
      }

      try {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        window.location.href = url.toString();
        return;
      } catch (error) {
        // Fallback for older environments.
      }

      location.reload();
    },

    translate: (key) => {
      const translations = window.ContentStore?.getTranslations() || {};
      const valObj = translations[key];
      if (!valObj) return key;
      const lang = I18n.getCurrentLanguage();
      return valObj[lang] || valObj.en || key;
    },

    getLocalizedValue: (valueObj) => {
      if (typeof valueObj === "string") return valueObj;
      if (!valueObj || typeof valueObj !== "object") return valueObj || "";
      const lang = I18n.getCurrentLanguage();
      return valueObj[lang] || valueObj.en || "";
    },

    applyTranslations: () => {
      const lang = I18n.getCurrentLanguage();

      document.documentElement.setAttribute("lang", lang);

      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const translated = I18n.translate(key);

        if (translated && translated !== key) {
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            el.placeholder = translated;
          } else {
            el.innerHTML = translated;
          }
        }
      });

      document.querySelectorAll("[data-i18n-content]").forEach((el) => {
        const key = el.getAttribute("data-i18n-content");
        const translated = I18n.translate(key);
        if (translated && translated !== key) {
          el.setAttribute("content", translated);
        }
      });

      document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
        const key = el.getAttribute("data-i18n-aria-label");
        const translated = I18n.translate(key);
        if (translated && translated !== key) {
          el.setAttribute("aria-label", translated);
        }
      });

      document.querySelectorAll("[data-i18n-title]").forEach((el) => {
        const key = el.getAttribute("data-i18n-title");
        const translated = I18n.translate(key);
        if (translated && translated !== key) {
          el.setAttribute("title", translated);
        }
      });

      I18n.localizeInternalLinks(document);
    },

    initToggleUI: () => {
      const currentLang = I18n.getCurrentLanguage();

      document.querySelectorAll(".lang-toggle-item").forEach((item) => {
        const itemLang = item.getAttribute("data-lang");

        if (itemLang === currentLang) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }

        if (item.dataset.langBound === "true") return;

        item.addEventListener("click", (event) => {
          event.preventDefault();
          if (itemLang !== I18n.getCurrentLanguage()) {
            I18n.setCurrentLanguage(itemLang);
          }
        });

        item.dataset.langBound = "true";
      });

      document.querySelectorAll(".lang-toggle").forEach((button) => {
        button.textContent = currentLang === "en" ? "SQ" : "EN";

        if (button.dataset.langBound === "true") return;

        button.addEventListener("click", (event) => {
          event.preventDefault();
          const nextLang = I18n.getCurrentLanguage() === "en" ? "sq" : "en";
          I18n.setCurrentLanguage(nextLang);
        });

        button.dataset.langBound = "true";
      });
    }
  };

  window.I18n = I18n;

  document.addEventListener("DOMContentLoaded", () => {
    I18n.initToggleUI();
    I18n.applyTranslations();
  });
})();
