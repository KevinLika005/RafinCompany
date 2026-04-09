(function () {
  const FILTERS_MOUNT_ID = "jobs-filters-container";
  const CARDS_MOUNT_ID = "jobs-container";

  let jobsCache = [];
  let filterState = {
    careerLevel: "all",
    jobCategory: "all"
  };

  function getLanguage() {
    if (window.I18n && typeof window.I18n.getCurrentLanguage === "function") {
      return window.I18n.getCurrentLanguage();
    }
    return localStorage.getItem("lang") || "en";
  }

  function localize(value, lang) {
    if (!value || typeof value !== "object") return value || "";
    return value[lang] || value.en || "";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getUniqueCategories(lang) {
    const map = new Map();
    jobsCache.forEach((job) => {
      const key = job.category?.en || localize(job.category, lang);
      if (!key || map.has(key)) return;
      map.set(key, localize(job.category, lang));
    });
    return Array.from(map.entries()).map(([key, label]) => ({ key, label }));
  }

  function getCareerLevels(lang) {
    const metaLevels = window.siteData?.jobs?.meta?.filters?.careerLevels;
    if (Array.isArray(metaLevels) && metaLevels.length) {
      return metaLevels.map((level) => ({
        key: level,
        label: window.I18n ? window.I18n.translate(level) : level
      }));
    }

    const unique = new Set();
    jobsCache.forEach((job) => {
      const key = job.careerLevel?.en || localize(job.careerLevel, lang);
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

  function renderFilters(lang) {
    const mount = document.getElementById(FILTERS_MOUNT_ID);
    if (!mount) return;

    const labels = window.siteData?.jobs?.meta?.labels || {};
    const levels = getCareerLevels(lang);
    const categories = getUniqueCategories(lang);

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
      <div class="jobs-filters-panel" role="region" aria-label="Careers filters">
        <div class="jobs-filter-field">
          <label for="jobs-level-filter">${escapeHtml(localize(labels.careerLevel, lang))}</label>
          <select id="jobs-level-filter" class="jobs-filter-control">
            <option value="all">${escapeHtml(window.I18n ? window.I18n.translate("All Levels") : "All Levels")}</option>
            ${careerOptions}
          </select>
        </div>
        <div class="jobs-filter-field">
          <label for="jobs-category-filter">${escapeHtml(localize(labels.jobCategory, lang))}</label>
          <select id="jobs-category-filter" class="jobs-filter-control">
            <option value="all">${escapeHtml(window.I18n ? window.I18n.translate("All Job Categories") : "All Job Categories")}</option>
            ${categoryOptions}
          </select>
        </div>
        <p class="jobs-role-count">
          <span>${escapeHtml(localize(labels.roleCount, lang) || "Open Roles")}</span>
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

  function renderCards(lang) {
    const mount = document.getElementById(CARDS_MOUNT_ID);
    if (!mount) return;

    const applyLabel = localize(window.siteData?.jobs?.meta?.labels?.applyLabel, lang) || "Apply Now";
    const filteredJobs = getFilteredJobs();

    if (!filteredJobs.length) {
      const emptyState = window.siteData?.jobs?.meta?.emptyState || {};
      mount.innerHTML = `
        <div class="col-12">
          <article class="jobs-empty-state">
            <h6>${escapeHtml(localize(emptyState.title, lang))}</h6>
            <p>${escapeHtml(localize(emptyState.body, lang))}</p>
          </article>
        </div>
      `;
      return;
    }

    mount.innerHTML = filteredJobs
      .map((job) => {
        const title = escapeHtml(localize(job.title, lang));
        const category = escapeHtml(localize(job.category, lang));
        const level = escapeHtml(localize(job.careerLevel, lang));
        const summary = escapeHtml(localize(job.summary, lang));
        const image = escapeHtml(job.cardImage || "images/project-1-480x361.jpg");
        const imageAlt = escapeHtml(localize(job.cardImageAlt, lang) || title);

        return `
          <div class="col-md-6 col-xl-4">
            <article class="jobs-card">
              <figure class="jobs-card__media">
                <img src="${image}" alt="${imageAlt}" loading="lazy" />
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
    const lang = getLanguage();
    renderFilters(lang);
    renderCards(lang);
  }

  function initJobsSection() {
    const jobs = window.siteData?.jobs;
    if (!jobs || !Array.isArray(jobs)) return;

    jobsCache = [...jobs].sort((a, b) => (a.order || 0) - (b.order || 0));
    renderJobsSection();
  }

  document.addEventListener("DOMContentLoaded", initJobsSection);
  document.addEventListener("languageChanged", initJobsSection);
})();
