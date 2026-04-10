document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const categories = window.ContentStore.getCategories() || [];
  // Find the Projects link by ID, or fallback
  const navProjectsLink = document.getElementById('nav-projects-link') || 
                          document.querySelector('.rd-navbar-nav a[href="#projects"], .rd-navbar-nav a[href="projects.html"]');

  if (navProjectsLink) {
    const parentLi = navProjectsLink.parentElement;

    // Keep Projects as a page link (not section anchor) to preserve click-through behavior.
    navProjectsLink.href = 'projects.html';
    navProjectsLink.textContent = window.I18n.translate('projects');

    // Create or find dropdown
    let dropdown = document.getElementById('nav-projects-dropdown') || parentLi.querySelector('.rd-navbar-dropdown');
    
    if (!dropdown) {
      dropdown = document.createElement('ul');
      dropdown.className = 'rd-navbar-dropdown';
      dropdown.id = 'nav-projects-dropdown';
      parentLi.appendChild(dropdown);
    }

    // Always ensure the parent li has the has-dropdown class
    parentLi.classList.add('rd-navbar--has-dropdown');

    if (dropdown.dataset.rendered === 'true') return;
    dropdown.dataset.rendered = 'true';

    // Populate dropdown with dynamic categories
    let dropdownHtml = '';
    categories.forEach(category => {
      const title = window.I18n.getLocalizedValue(category.title) || 'Category';
      const slugUrl = category.slug ? `category.html?slug=${category.slug}` : '#';
      dropdownHtml += `<li><a href="${slugUrl}">${title}</a></li>`;
    });

    dropdown.innerHTML = dropdownHtml;
  }
});
