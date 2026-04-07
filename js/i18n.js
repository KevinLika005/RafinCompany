const I18n = {
  getCurrentLanguage: () => {
    return localStorage.getItem('lang') || 'en';
  },

  setCurrentLanguage: (lang) => {
    if (lang === 'en' || lang === 'sq') {
      localStorage.setItem('lang', lang);
      location.reload();
    }
  },

  toggleLanguage: () => {
    const current = I18n.getCurrentLanguage();
    I18n.setCurrentLanguage(current === 'en' ? 'sq' : 'en');
  },

  getLocalizedValue: (valObj) => {
    if (!valObj) return "";
    const lang = I18n.getCurrentLanguage();
    return valObj[lang] || valObj['en'] || "";
  },

  translate: (key) => {
    const translations = window.ContentStore?.getTranslations() || {};
    const valObj = translations[key];
    return I18n.getLocalizedValue(valObj) || key;
  },

  applyDataI18n: () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = I18n.translate(key);
      if (translated && translated !== key) {
        el.textContent = translated;
      }
    });
  },

  initToggleUI: () => {
    const toggles = document.querySelectorAll('.lang-toggle');
    toggles.forEach(btn => {
      // Set initial text
      btn.textContent = I18n.getCurrentLanguage() === 'en' ? 'SQ' : 'EN';
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        I18n.toggleLanguage();
      });
    });
  }
};

window.I18n = I18n;

// Initialize toggle listeners after DOM load
document.addEventListener('DOMContentLoaded', () => {
  I18n.initToggleUI();
  I18n.applyDataI18n();
});

