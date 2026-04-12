document.addEventListener('DOMContentLoaded', () => {
  if (!window.ContentStore || !window.I18n) return;

  const projectsGridContainer = document.querySelector('#projects .row.no-gutters');
  if (!projectsGridContainer) return;

  // Prevent duplicate rendering
  if (projectsGridContainer.dataset.rendered === 'true') return;
  projectsGridContainer.dataset.rendered = 'true';

  const categories = window.ContentStore.getCategories() || [];
  if (categories.length === 0) return;

  const readMoreText = window.I18n.translate('viewProject');

  let cardsHtml = '';

  categories.forEach(category => {
    const title = window.I18n.getLocalizedValue(category.title) || 'Category';
    const shortDesc = window.I18n.getLocalizedValue(category.shortDescription) || '';
    const slugUrl = category.slug ? `category.html?slug=${category.slug}` : '#';
    const thumbImage = category.thumbImage || 'images/default-thumb.jpg';

    cardsHtml += `
      <div class="col-sm-6 col-lg-4 col-xl-4">
        <!-- Thumb creative-->
        <div class="thumb-creative">
          <div class="thumb-creative__inner">
            <div class="thumb-creative__front">
              <figure class="thumb-creative__image-wrap">
                <img class="thumb-creative__image" src="${thumbImage}" alt="${title}" width="480" height="361" loading="lazy" decoding="async" fetchpriority="low"/>
              </figure>
              <div class="thumb-creative__content">
                <h6>${title}</h6>
              </div>
            </div>
            <div class="thumb-creative__back">
              <figure class="thumb-creative__image-wrap">
                <img class="thumb-creative__image" src="${thumbImage}" alt="${title}" width="480" height="361" loading="lazy" decoding="async" fetchpriority="low"/>
              </figure>
              <div class="thumb-creative__content">
                <h6 class="thumb-creative__title"><a href="${slugUrl}">${title}</a></h6>
                <p>${shortDesc}</p>
                <a class="button button-link" href="${slugUrl}">${readMoreText}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  projectsGridContainer.innerHTML = cardsHtml;
});
