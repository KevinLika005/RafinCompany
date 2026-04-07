// Get the data exposed globally by the data files
const ContentStore = {
  getSiteData: () => window.siteData || {},
  
  getCategories: () => {
    const data = ContentStore.getSiteData();
    return (data.categories || []).sort((a, b) => a.order - b.order);
  },

  getProjects: () => {
    const data = ContentStore.getSiteData();
    return (data.projects || []).sort((a, b) => a.order - b.order);
  },

  getCategoryBySlug: (slug) => {
    return ContentStore.getCategories().find(c => c.slug === slug) || null;
  },

  getProjectsByCategory: (categoryId) => {
    return ContentStore.getProjects().filter(p => p.categoryId === categoryId);
  },

  getProjectBySlug: (slug) => {
    return ContentStore.getProjects().find(p => p.slug === slug) || null;
  },

  getOrderedProjectsByCategory: (categoryId) => {
    return ContentStore.getProjectsByCategory(categoryId).sort((a, b) => a.order - b.order);
  },

  getTranslations: () => {
    const data = ContentStore.getSiteData();
    return data.translations || {};
  }
};

window.ContentStore = ContentStore;
