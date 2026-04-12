(function () {
  const FILTERS_MOUNT_ID = "jobs-filters-container";
  const CARDS_MOUNT_ID = "jobs-container";

  let jobsCache = [];
  let filterState = {
    careerLevel: "all",
    jobCategory: "all"
  };

  function getLocalizedValue(value) {
    return window.I18n.getLocalizedValue(value);
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getUniqueCategories() {
    const map = new Map();
    jobsCache.forEach((job) => {
      const key = job.category?.en || getLocalizedValue(job.category);
      if (!key || map.has(key)) return;
      map.set(key, getLocalizedValue(job.category));
    });
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  }

  function getCareerLevels() {
    const metaLevels = window.siteData?.jobs?.meta?.filters?.careerLevels;
    if (Array.isArray(metaLevels) && metaLevels.length) {
      return metaLevels.map((level) => ({
        key: level,
        label: window.I18n ? window.I18n.translate(level) : level
      }));
    }

    const unique = new Set();
    jobsCache.forEach((job) => {
      const key = job.careerLevel?.en || getLocalizedValue(job.careerLevel);
      if (key) unique.add(key);
    });
    return Array.from(unique).map((key) => ({
      key,
      label: window.I18n ? window.I18n.translate(key) : key
    }));
  }

  function getFilteredJobs() {
    return jobsCache.filter((job) => {
      const levelKey = job.careerLevel?.en || "";
      const categoryKey = job.category?.en || "";

      const levelMatch = filterState.careerLevel === "all" || filterState.careerLevel === levelKey;
      const categoryMatch = filterState.jobCategory === "all" || filterState.jobCategory === categoryKey;

      return levelMatch && categoryMatch;
    });
  }

  function renderFilters() {
    const mount = document.getElementById(FILTERS_MOUNT_ID);
    if (!mount) return;

    const labels = window.siteData?.jobs?.meta?.labels || {};
    const levels = getCareerLevels();
    const categories = getUniqueCategories();
    const filtersRegionLabel = window.I18n
      ? window.I18n.translate("Careers Filters") || "Careers filters"
      : "Careers filters";

    const careerOptions = levels
      .map(
        (level) =>
          `<option value="${escapeHtml(level.key)}" ${
            filterState.careerLevel === level.key ? "selected" : ""
          }>${escapeHtml(level.label)}</option>`
      )
      .join("");

    const categoryOptions = categories
      .map(
        (category) =>
          `<option value="${escapeHtml(category.key)}" ${
            filterState.jobCategory === category.key ? "selected" : ""
          }>${escapeHtml(category.label)}</option>`
      )
      .join("");

    mount.innerHTML = `
      <div class="jobs-filters-panel" role="region" aria-label="${escapeHtml(filtersRegionLabel)}">
        <div class="jobs-filter-field">
          <label for="jobs-level-filter">${escapeHtml(getLocalizedValue(labels.careerLevel))}</label>
          <select id="jobs-level-filter" class="jobs-filter-control" aria-controls="${CARDS_MOUNT_ID}">
            <option value="all">${escapeHtml(window.I18n ? window.I18n.translate("All Levels") : "All Levels")}</option>
            ${careerOptions}
          </select>
        </div>
        <div class="jobs-filter-field">
          <label for="jobs-category-filter">${escapeHtml(getLocalizedValue(labels.jobCategory))}</label>
          <select id="jobs-category-filter" class="jobs-filter-control" aria-controls="${CARDS_MOUNT_ID}">
            <option value="all">${escapeHtml(window.I18n ? window.I18n.translate("All Job Categories") : "All Job Categories")}</option>
            ${categoryOptions}
          </select>
        </div>
        <p class="jobs-role-count" aria-live="polite">
          <span>${escapeHtml(getLocalizedValue(labels.roleCount) || "Open Roles")}</span>
          <strong>${getFilteredJobs().length}</strong>
        </p>
      </div>
    `;

    const levelFilter = document.getElementById("jobs-level-filter");
    const categoryFilter = document.getElementById("jobs-category-filter");

    if (levelFilter) {
      levelFilter.addEventListener("change", (event) => {
        filterState.careerLevel = event.target.value;
        renderJobsSection();
      });
    }

    if (categoryFilter) {
      categoryFilter.addEventListener("change", (event) => {
        filterState.jobCategory = event.target.value;
        renderJobsSection();
      });
    }
  }

  function renderCards() {
    const mount = document.getElementById(CARDS_MOUNT_ID);
    if (!mount) return;

    const applyLabel = getLocalizedValue(window.siteData?.jobs?.meta?.labels?.applyLabel) || "Apply Now";
    const filteredJobs = getFilteredJobs();

    if (!filteredJobs.length) {
      const emptyState = window.siteData?.jobs?.meta?.emptyState || {};
      mount.innerHTML = `
        <div class="col-12">
          <article class="jobs-empty-state">
            <h6>${escapeHtml(getLocalizedValue(emptyState.title))}</h6>
            <p>${escapeHtml(getLocalizedValue(emptyState.body))}</p>
          </article>
        </div>
      `;
      return;
    }

    mount.innerHTML = filteredJobs
      .map((job) => {
        const title = escapeHtml(getLocalizedValue(job.title));
        const category = escapeHtml(getLocalizedValue(job.category));
        const level = escapeHtml(getLocalizedValue(job.careerLevel));
        const summary = escapeHtml(getLocalizedValue(job.summary));
        const image = escapeHtml(job.cardImage || "images/project-1-480x361.jpg");
        const imageAlt = escapeHtml(getLocalizedValue(job.cardImageAlt) || title);

        return `
          <div class="col-md-6 col-xl-4">
            <article class="jobs-card">
              <figure class="jobs-card__media">
                <img src="${image}" alt="${imageAlt}" width="480" height="360" loading="lazy" decoding="async" fetchpriority="low" />
              </figure>
              <div class="jobs-card__content">
                <p class="jobs-card__meta">
                  <span class="jobs-chip">${level}</span>
                  <span class="jobs-chip jobs-chip--ghost">${category}</span>
                </p>
                <h6>${title}</h6>
                <p>${summary}</p>
                <a class="jobs-apply-link" href="#contacts">${escapeHtml(applyLabel)}</a>
              </div>
            </article>
          </div>
        `;
      })
      .join("");
  }

  function renderJobsSection() {
    renderFilters();
    renderCards();
  }

  function initJobsSection() {
    const jobs = window.siteData?.jobs;
    if (!jobs || !Array.isArray(jobs) || !window.I18n || typeof window.I18n.getLocalizedValue !== "function") return;

    jobsCache = [...jobs].sort((a, b) => (a.order || 0) - (b.order || 0));
    renderJobsSection();
  }

  document.addEventListener("DOMContentLoaded", initJobsSection);
  document.addEventListener("languageChanged", initJobsSection);
})();
