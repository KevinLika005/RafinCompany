/**
 * Pure High-End Manual i18n System
 * Replaces Google Translate widget for a professional "No-Bar" experience.
 */
const I18n = {
  getCurrentLanguage: () => {
    try {
      const queryLang = new URLSearchParams(window.location.search).get('lang');
      if (queryLang === 'en' || queryLang === 'sq') return queryLang;
    } catch (error) {
      // Ignore URL parsing failures and fall back to persisted language.
    }
    return localStorage.getItem('lang') || 'en';
  },

  setCurrentLanguage: (lang) => {
    if (lang === 'en' || lang === 'sq') {
      localStorage.setItem('lang', lang);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.location.href = url.toString();
        return;
      } catch (error) {
        // Fallback for older environments.
      }
      location.reload(); // Reload to ensure all components/sliders reflect the new language
    }
  },

  // Get translated string from ContentStore
  translate: (key) => {
    const translations = window.ContentStore?.getTranslations() || {};
    const valObj = translations[key];
    if (!valObj) return key;
    const lang = I18n.getCurrentLanguage();
    return valObj[lang] || valObj.en || key;
  },

  // Resolve bilingual objects used across data files, e.g. { en: '', sq: '' }.
  getLocalizedValue: (valueObj) => {
    if (typeof valueObj === 'string') return valueObj;
    if (!valueObj || typeof valueObj !== 'object') return valueObj || '';
    const lang = I18n.getCurrentLanguage();
    return valueObj[lang] || valueObj.en || '';
  },

  // Apply translations to all elements with [data-i18n]
  applyTranslations: () => {
    const lang = I18n.getCurrentLanguage();
    
    // Update HTML lang attribute for browser detection
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = I18n.translate(key);
      
      if (translated && translated !== key) {
        // Handle input placeholders
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = translated;
        } else {
          el.innerHTML = translated; // Using innerHTML to allow for small tags/br
        }
      }
    });

    // Handle translated content attributes (meta/og tags).
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      const key = el.getAttribute('data-i18n-content');
      const translated = I18n.translate(key);
      if (translated && translated !== key) {
        el.setAttribute('content', translated);
      }
    });

    // Handle translated aria-label attributes.
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const translated = I18n.translate(key);
      if (translated && translated !== key) {
        el.setAttribute('aria-label', translated);
      }
    });

    // Handle translated title attributes.
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const translated = I18n.translate(key);
      if (translated && translated !== key) {
        el.setAttribute('title', translated);
      }
    });
  },

  // Initialize your custom premium UI
  initToggleUI: () => {
    const currentLang = I18n.getCurrentLanguage();
    
    const toggleItems = document.querySelectorAll('.lang-toggle-item');
    if (toggleItems.length > 0) {
      toggleItems.forEach(item => {
        const itemLang = item.getAttribute('data-lang');
        
        if (itemLang === currentLang) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }

        item.addEventListener('click', (e) => {
          e.preventDefault();
          if (itemLang !== currentLang) {
            I18n.setCurrentLanguage(itemLang);
          }
        });
      });
    }

    // Support for fallback toggles
    const toggles = document.querySelectorAll('.lang-toggle');
    toggles.forEach(btn => {
      btn.textContent = currentLang === 'en' ? 'SQ' : 'EN';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextLang = currentLang === 'en' ? 'sq' : 'en';
        I18n.setCurrentLanguage(nextLang);
      });
    });
  }
};

window.I18n = I18n;

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', () => {
  I18n.initToggleUI();
  I18n.applyTranslations();
});
