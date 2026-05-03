(function () {
  const FILTERS_MOUNT_ID = "jobs-filters-container";
  const CARDS_MOUNT_ID = "jobs-container";
  const PAGINATION_MOUNT_ID = "jobs-pagination";
  const CONTACT_SECTION_ID = "contacts";
  const CONTACT_MESSAGE_ID = "contacts-message";
  const MODAL_ID = "jobs-details-modal";
  const MODAL_TRANSITION_MS = 220;
  const APPLICATION_PARAM_KEY = "applyJob";
  const APPLICATION_STORAGE_KEY = "rafin-apply-job-id";
  const JOBS_PER_PAGE = 6;
  const DESKTOP_MODAL_BREAKPOINT = 992;
  const FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])"
  ].join(", ");

  let jobsCache = [];
  let filterState = {
    careerLevel: "all",
    jobCategory: "all"
  };
  let paginationState = {
    currentPage: 1
  };
  let modalState = {
    activeJobId: null,
    lastFocusedElement: null,
    activeImageSrc: "",
    activeImageAlt: ""
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

  function getJobsMeta() {
    return window.siteData?.jobs?.meta || {};
  }

  function getLabel(key, fallback) {
    return getLocalizedValue(getJobsMeta().labels?.[key]) || fallback;
  }

  function getCardsMount() {
    return document.getElementById(CARDS_MOUNT_ID);
  }

  function getPaginationMount() {
    return document.getElementById(PAGINATION_MOUNT_ID);
  }

  function isPagedLayout() {
    return document.body.classList.contains("careers-page");
  }

  function pageHasContactSection() {
    return Boolean(document.getElementById(CONTACT_SECTION_ID));
  }

  function getContactPageHref(jobId) {
    const params = new URLSearchParams();
    const currentLang = window.I18n && typeof window.I18n.getCurrentLanguage === "function"
      ? window.I18n.getCurrentLanguage()
      : "";

    params.set(APPLICATION_PARAM_KEY, jobId);
    if (currentLang) {
      params.set("lang", currentLang);
    }

    return `index.html?${params.toString()}#${CONTACT_SECTION_ID}`;
  }

  function storeApplicationIntent(jobId) {
    if (!jobId) return;

    try {
      window.sessionStorage.setItem(APPLICATION_STORAGE_KEY, jobId);
    } catch (error) {
      // Ignore storage failures in privacy-restricted environments.
    }
  }

  function clearApplicationIntent() {
    try {
      window.sessionStorage.removeItem(APPLICATION_STORAGE_KEY);
    } catch (error) {
      // Ignore storage failures in privacy-restricted environments.
    }
  }

  function readApplicationIntent() {
    const params = new URLSearchParams(window.location.search);
    const paramJobId = params.get(APPLICATION_PARAM_KEY);
    if (paramJobId) return paramJobId;

    try {
      return window.sessionStorage.getItem(APPLICATION_STORAGE_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function clearApplicationIntentFromUrl() {
    const currentUrl = new URL(window.location.href);
    if (!currentUrl.searchParams.has(APPLICATION_PARAM_KEY)) return;

    currentUrl.searchParams.delete(APPLICATION_PARAM_KEY);
    const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
    window.history.replaceState({}, "", nextUrl);
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

  function getJobById(jobId) {
    return jobsCache.find((job) => job.id === jobId) || null;
  }

  function getPageCount(filteredJobs) {
    if (!isPagedLayout()) return 1;
    return Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));
  }

  function getVisibleJobs(filteredJobs) {
    if (!isPagedLayout()) return filteredJobs;

    const pageCount = getPageCount(filteredJobs);
    if (paginationState.currentPage > pageCount) {
      paginationState.currentPage = 1;
    }

    const startIndex = (paginationState.currentPage - 1) * JOBS_PER_PAGE;
    return filteredJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  }

  function renderFilters() {
    const mount = document.getElementById(FILTERS_MOUNT_ID);
    if (!mount) return;

    const labels = getJobsMeta().labels || {};
    const levels = getCareerLevels();
    const categories = getUniqueCategories();
    const filtersRegionLabel = window.I18n
      ? window.I18n.translate("Careers Filters") || "Careers filters"
      : "Careers filters";
    const filteredJobs = getFilteredJobs();

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
          <strong>${filteredJobs.length}</strong>
        </p>
      </div>
    `;

    const levelFilter = document.getElementById("jobs-level-filter");
    const categoryFilter = document.getElementById("jobs-category-filter");

    if (levelFilter) {
      levelFilter.addEventListener("change", (event) => {
        filterState.careerLevel = event.target.value;
        paginationState.currentPage = 1;
        renderJobsSection();
      });
    }

    if (categoryFilter) {
      categoryFilter.addEventListener("change", (event) => {
        filterState.jobCategory = event.target.value;
        paginationState.currentPage = 1;
        renderJobsSection();
      });
    }
  }

  function renderListItems(items) {
    return (items || [])
      .map((item) => `<li>${escapeHtml(getLocalizedValue(item))}</li>`)
      .join("");
  }

  function buildInlineStyle(declarations) {
    return declarations.filter(Boolean).join("; ");
  }

  function ensureModal() {
    let modal = document.getElementById(MODAL_ID);
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.className = "jobs-modal";
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.appendChild(modal);

    modal.addEventListener("click", handleModalClick);

    return modal;
  }

  function resetModalLayout(dialog) {
    if (!dialog) return;

    [
      "--jobs-modal-dialog-width",
      "--jobs-modal-dialog-height",
      "--jobs-modal-media-width",
      "--jobs-modal-content-width"
    ].forEach((property) => {
      dialog.style.removeProperty(property);
    });
  }

  function applyModalImageLayout(modal) {
    const dialog = modal?.querySelector(".jobs-modal__dialog");
    const image = dialog?.querySelector(".jobs-modal__media img");
    if (!dialog || !image) return;

    if (window.innerWidth < DESKTOP_MODAL_BREAKPOINT) {
      resetModalLayout(dialog);
      return;
    }

    const naturalWidth = image.naturalWidth || image.width || 720;
    const naturalHeight = image.naturalHeight || image.height || 900;
    const aspectRatio = naturalWidth / naturalHeight;
    const viewportWidth = Math.max(window.innerWidth - 92, 760);
    const viewportHeight = Math.max(window.innerHeight - 92, 420);

    let contentWidth = Math.round(viewportWidth * 0.31);
    contentWidth = Math.max(360, Math.min(500, contentWidth));

    let mediaWidth = Math.min(980, viewportWidth - contentWidth);
    mediaWidth = Math.max(360, mediaWidth);

    let mediaHeight = Math.round(mediaWidth / aspectRatio);
    if (mediaHeight > viewportHeight) {
      mediaHeight = viewportHeight;
      mediaWidth = Math.round(mediaHeight * aspectRatio);
    }

    let dialogWidth = mediaWidth + contentWidth;
    if (dialogWidth > viewportWidth) {
      mediaWidth = Math.max(320, viewportWidth - contentWidth);
      mediaHeight = Math.round(mediaWidth / aspectRatio);

      if (mediaHeight > viewportHeight) {
        mediaHeight = viewportHeight;
        mediaWidth = Math.round(mediaHeight * aspectRatio);
      }

      dialogWidth = mediaWidth + contentWidth;
    }

    dialog.style.setProperty("--jobs-modal-dialog-width", `${dialogWidth}px`);
    dialog.style.setProperty("--jobs-modal-dialog-height", `${mediaHeight}px`);
    dialog.style.setProperty("--jobs-modal-media-width", `${mediaWidth}px`);
    dialog.style.setProperty("--jobs-modal-content-width", `${contentWidth}px`);
  }

  function setBodyScrollLock(locked) {
    if (locked) {
      const scrollbarOffset = Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
      document.body.style.setProperty("--jobs-modal-scrollbar-offset", `${scrollbarOffset}px`);
      document.body.classList.add("jobs-modal-open");
      return;
    }

    document.body.classList.remove("jobs-modal-open");
    document.body.style.removeProperty("--jobs-modal-scrollbar-offset");
  }

  function renderModal(job, options) {
    const config = options || {};
    const modal = ensureModal();
    const title = escapeHtml(getLocalizedValue(job.title));
    const category = escapeHtml(getLocalizedValue(job.category));
    const level = escapeHtml(getLocalizedValue(job.careerLevel));
    const image = escapeHtml(config.imageSrc || job.cardImage || "images/project-1-480x361.jpg");
    const imageAlt = escapeHtml(config.imageAlt || getLocalizedValue(job.cardImageAlt) || getLocalizedValue(job.title));
    const imageStyle = buildInlineStyle([
      job.modalImagePosition ? `--jobs-modal-image-position: ${escapeHtml(job.modalImagePosition)}` : "",
      typeof job.modalImageScale === "number" && Number.isFinite(job.modalImageScale)
        ? `--jobs-modal-image-scale: ${job.modalImageScale}`
        : ""
    ]);
    const imageStyleAttribute = imageStyle ? ` style="${imageStyle}"` : "";
    const description = escapeHtml(getLocalizedValue(job.shortDescription || job.summary));
    const location = escapeHtml(getLocalizedValue(job.location));
    const employmentType = escapeHtml(getLocalizedValue(job.employmentType));
    const experience = escapeHtml(getLocalizedValue(job.experience));
    const closeLabel = escapeHtml(getLabel("closeLabel", "Close"));
    const applyLabel = escapeHtml(getLabel("applyLabel", "Apply Now"));
    const dialogLabel = escapeHtml(getLabel("dialogLabel", "Job details dialog"));
    const roleOverviewLabel = escapeHtml(getLabel("roleOverview", "Role Overview"));
    const locationLabel = escapeHtml(getLabel("location", "Location"));
    const employmentTypeLabel = escapeHtml(getLabel("employmentType", "Employment Type"));
    const experienceLabel = escapeHtml(getLabel("experience", "Experience"));
    const responsibilitiesLabel = escapeHtml(getLabel("responsibilities", "Responsibilities"));
    const requirementsLabel = escapeHtml(getLabel("requirements", "Requirements"));
    const benefitsLabel = escapeHtml(getLabel("benefits", "Benefits / Notes"));

    modal.innerHTML = `
      <div class="jobs-modal__overlay" data-modal-close="overlay"></div>
      <div
        class="jobs-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-label="${dialogLabel}"
        aria-labelledby="${MODAL_ID}-title"
        aria-describedby="${MODAL_ID}-description"
        tabindex="-1"
      >
        <button type="button" class="jobs-modal__close" data-modal-close="button" aria-label="${closeLabel}">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="jobs-modal__layout">
          <figure class="jobs-modal__media">
            <img src="${image}" alt="${imageAlt}" width="720" height="900" loading="lazy" decoding="async"${imageStyleAttribute} />
          </figure>
          <div class="jobs-modal__content">
            <div class="jobs-modal__header">
              <div class="jobs-modal__chips">
                <span class="jobs-chip">${level}</span>
                <span class="jobs-chip jobs-chip--ghost">${category}</span>
              </div>
              <h5 id="${MODAL_ID}-title">${title}</h5>
            </div>
            <div class="jobs-modal__facts" aria-label="${roleOverviewLabel}">
              <div class="jobs-modal__fact">
                <span>${locationLabel}</span>
                <strong>${location}</strong>
              </div>
              <div class="jobs-modal__fact">
                <span>${employmentTypeLabel}</span>
                <strong>${employmentType}</strong>
              </div>
              <div class="jobs-modal__fact jobs-modal__fact--wide">
                <span>${experienceLabel}</span>
                <strong>${experience}</strong>
              </div>
            </div>
            <div class="jobs-modal__section">
              <h6>${roleOverviewLabel}</h6>
              <p id="${MODAL_ID}-description">${description}</p>
            </div>
            <div class="jobs-modal__section">
              <h6>${responsibilitiesLabel}</h6>
              <ul class="jobs-modal__list">
                ${renderListItems(job.responsibilities)}
              </ul>
            </div>
            <div class="jobs-modal__section">
              <h6>${requirementsLabel}</h6>
              <ul class="jobs-modal__list">
                ${renderListItems(job.requirements)}
              </ul>
            </div>
            <div class="jobs-modal__section">
              <h6>${benefitsLabel}</h6>
              <ul class="jobs-modal__list">
                ${renderListItems(job.benefits)}
              </ul>
            </div>
            <div class="jobs-modal__actions">
              <button type="button" class="jobs-modal__apply button button-primary" data-apply-job="${escapeHtml(job.id)}">
                ${applyLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    modalState.activeJobId = job.id;
    modalState.activeImageSrc = config.imageSrc || job.cardImage || "";
    modalState.activeImageAlt = config.imageAlt || getLocalizedValue(job.cardImageAlt) || getLocalizedValue(job.title);

    const imageElement = modal.querySelector(".jobs-modal__media img");
    if (imageElement) {
      if (imageElement.complete) {
        applyModalImageLayout(modal);
      } else {
        imageElement.addEventListener("load", () => applyModalImageLayout(modal), { once: true });
      }
    }
  }

  function getFocusableElements(container) {
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
      (element) => !element.hasAttribute("hidden") && element.getAttribute("aria-hidden") !== "true"
    );
  }

  function trapModalFocus(event) {
    if (event.key !== "Tab") return;

    const modal = document.getElementById(MODAL_ID);
    const dialog = modal?.querySelector(".jobs-modal__dialog");
    if (!dialog) return;

    const focusable = getFocusableElements(dialog);
    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function handleModalKeydown(event) {
    if (!modalState.activeJobId) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
      return;
    }

    trapModalFocus(event);
  }

  function openModal(jobId, options) {
    const config = options || {};
    const job = getJobById(jobId);
    if (!job) return;

    if (!config.skipFocusCapture) {
      modalState.lastFocusedElement = document.activeElement;
    }

    renderModal(job, config);
    setBodyScrollLock(true);
    document.addEventListener("keydown", handleModalKeydown);

    const modal = ensureModal();
    window.requestAnimationFrame(() => {
      modal.classList.add("is-active");
      const closeButton = modal.querySelector(".jobs-modal__close");
      if (closeButton) closeButton.focus();
    });
  }

  function closeModal(options) {
    const config = options || {};
    const modal = document.getElementById(MODAL_ID);
    if (!modal || modal.hidden) return;

    const lastFocusedElement = modalState.lastFocusedElement;
    modal.classList.remove("is-active");
    document.removeEventListener("keydown", handleModalKeydown);

    window.setTimeout(() => {
      modal.hidden = true;
      modal.setAttribute("aria-hidden", "true");
      modal.innerHTML = "";
      setBodyScrollLock(false);
      modalState.activeJobId = null;
      modalState.activeImageSrc = "";
      modalState.activeImageAlt = "";
      if (config.restoreFocus !== false && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }, MODAL_TRANSITION_MS);
  }

  function prefillApplicationMessage(job) {
    const messageField =
      document.getElementById(CONTACT_MESSAGE_ID) ||
      document.querySelector(`#${CONTACT_SECTION_ID} textarea[name="message"]`);
    if (!messageField) return false;

    const template = getLabel("applyPrefillTemplate", "I am applying for: {{title}}");
    const title = getLocalizedValue(job.title);
    const nextValue = template.replace("{{title}}", title);
    const currentValue = String(messageField.value || "").trim();

    if (!currentValue) {
      messageField.value = nextValue;
    } else if (currentValue.indexOf(nextValue) === -1) {
      messageField.value = `${nextValue}\n${currentValue}`;
    }

    ["input", "change", "blur"].forEach((eventName) => {
      messageField.dispatchEvent(new Event(eventName, { bubbles: true }));
    });

    window.setTimeout(() => {
      if (typeof messageField.focus === "function") {
        messageField.focus({ preventScroll: true });
      }

      if (typeof messageField.setSelectionRange === "function") {
        const end = messageField.value.length;
        messageField.setSelectionRange(end, end);
      }
    }, 320);

    return true;
  }

  function scrollToContactSection() {
    const section = document.getElementById(CONTACT_SECTION_ID);
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleApplyNow(jobId) {
    const job = getJobById(jobId);
    if (!job) return;

    if (window.RafinCareerApplication && typeof window.RafinCareerApplication.selectJob === "function") {
      closeModal({ restoreFocus: false });

      window.setTimeout(() => {
        window.RafinCareerApplication.selectJob(job.id);
      }, MODAL_TRANSITION_MS);

      return;
    }

    storeApplicationIntent(job.id);

    if (!pageHasContactSection()) {
      window.location.href = getContactPageHref(job.id);
      return;
    }

    closeModal({ restoreFocus: false });

    window.setTimeout(() => {
      scrollToContactSection();
      if (prefillApplicationMessage(job)) {
        clearApplicationIntent();
        clearApplicationIntentFromUrl();
      }
    }, MODAL_TRANSITION_MS);
  }

  function applyPendingApplicationPrefill() {
    const jobId = readApplicationIntent();
    if (!jobId || !pageHasContactSection()) return;

    const job = getJobById(jobId);
    if (!job) return;

    window.setTimeout(() => {
      scrollToContactSection();
      if (prefillApplicationMessage(job)) {
        clearApplicationIntent();
        clearApplicationIntentFromUrl();
      }
    }, 120);
  }

  function handleModalClick(event) {
    const closeTrigger = event.target.closest("[data-modal-close]");
    if (closeTrigger) {
      closeModal();
      return;
    }

    const applyTrigger = event.target.closest("[data-apply-job]");
    if (applyTrigger) {
      handleApplyNow(applyTrigger.getAttribute("data-apply-job"));
    }
  }

  function handleViewportChange() {
    if (!modalState.activeJobId) return;

    const modal = document.getElementById(MODAL_ID);
    if (!modal || modal.hidden) return;

    applyModalImageLayout(modal);
  }

  function bindCardEvents() {
    const mount = getCardsMount();
    if (!mount) return;

    mount.querySelectorAll("[data-job-trigger]").forEach((button) => {
      button.addEventListener("click", () => {
        openModal(button.getAttribute("data-job-trigger"), {
          imageSrc: button.getAttribute("data-job-image") || "",
          imageAlt: button.getAttribute("data-job-image-alt") || ""
        });
      });
    });
  }

  function renderCard(job) {
    const title = escapeHtml(getLocalizedValue(job.title));
    const category = escapeHtml(getLocalizedValue(job.category));
    const level = escapeHtml(getLocalizedValue(job.careerLevel));
    const summary = escapeHtml(getLocalizedValue(job.summary));
    const image = escapeHtml(job.cardImage || job.image || "images/project-1-480x361.jpg");
    const imageAlt = escapeHtml(getLocalizedValue(job.cardImageAlt || job.imageAlt) || title);
    const imageStyle = buildInlineStyle([
      job.cardImagePosition ? `--jobs-card-image-position: ${escapeHtml(job.cardImagePosition)}` : "",
      typeof job.cardImageScale === "number" && Number.isFinite(job.cardImageScale)
        ? `--jobs-card-image-scale: ${job.cardImageScale}`
        : "",
      typeof job.cardImageHoverScale === "number" && Number.isFinite(job.cardImageHoverScale)
        ? `--jobs-card-image-hover-scale: ${job.cardImageHoverScale}`
        : ""
    ]);
    const imageStyleAttribute = imageStyle ? ` style="${imageStyle}"` : "";
    const viewDetailsLabel = getLabel("viewDetails", "View Details");

    return `
      <div class="col-md-6 col-xl-4">
        <article class="jobs-card">
          <button
            type="button"
            class="jobs-card__trigger"
            data-job-trigger="${escapeHtml(job.id)}"
            data-job-image="${image}"
            data-job-image-alt="${imageAlt}"
            aria-haspopup="dialog"
            aria-controls="${MODAL_ID}"
          >
            <figure class="jobs-card__media">
              <img src="${image}" alt="${imageAlt}" width="480" height="360" decoding="async" fetchpriority="auto"${imageStyleAttribute} />
            </figure>
            <div class="jobs-card__content">
              <p class="jobs-card__meta">
                <span class="jobs-chip">${level}</span>
                <span class="jobs-chip jobs-chip--ghost">${category}</span>
              </p>
              <h6>${title}</h6>
              <p>${summary}</p>
              <span class="jobs-apply-link">${escapeHtml(viewDetailsLabel)}</span>
            </div>
          </button>
        </article>
      </div>
    `;
  }

  function renderEmptyState() {
    const mount = getCardsMount();
    const paginationMount = getPaginationMount();
    if (!mount) return;

    const emptyState = getJobsMeta().emptyState || {};
    mount.innerHTML = `
      <div class="col-12">
        <article class="jobs-empty-state">
          <h6>${escapeHtml(getLocalizedValue(emptyState.title))}</h6>
          <p>${escapeHtml(getLocalizedValue(emptyState.body))}</p>
        </article>
      </div>
    `;

    if (paginationMount) {
      paginationMount.innerHTML = "";
    }
  }

  
  function scrollToJobsSectionTop() {
    const section = document.getElementById("jobs");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderPagination(filteredJobs) {
    const mount = getPaginationMount();
    if (!mount) return;

    if (!isPagedLayout()) {
      mount.innerHTML = "";
      return;
    }

    const pageCount = getPageCount(filteredJobs);
    if (pageCount <= 1) {
      mount.innerHTML = "";
      return;
    }

    mount.innerHTML = `
      <nav class="jobs-pagination" aria-label="Jobs pagination">
        ${Array.from({ length: pageCount }, (_, index) => {
          const page = index + 1;
          const isActive = page === paginationState.currentPage;
          return `
            <button
              type="button"
              class="jobs-pagination__button${isActive ? " is-active" : ""}"
              data-jobs-page="${page}"
              aria-current="${isActive ? "page" : "false"}"
            >
              ${page}
            </button>
          `;
        }).join("")}
      </nav>
    `;

    mount.querySelectorAll("[data-jobs-page]").forEach((button) => {
      button.addEventListener("click", () => {
        paginationState.currentPage = Number(button.getAttribute("data-jobs-page")) || 1;
        renderJobsSection();
        scrollToJobsSectionTop();
      });
    });
  }

  function renderCards() {
    const mount = getCardsMount();
    if (!mount) return;

    const filteredJobs = getFilteredJobs();
    if (!filteredJobs.length) {
      renderEmptyState();
      return;
    }

    const visibleJobs = getVisibleJobs(filteredJobs);
    mount.innerHTML = visibleJobs.map((job) => renderCard(job)).join("");
    renderPagination(filteredJobs);
    bindCardEvents();
  }

  function renderJobsSection() {
    renderFilters();
    renderCards();

    if (modalState.activeJobId) {
      openModal(modalState.activeJobId, {
        skipFocusCapture: true,
        imageSrc: modalState.activeImageSrc,
        imageAlt: modalState.activeImageAlt
      });
    }
  }

  function initJobsSection() {
    const jobs = window.siteData?.jobs;
    if (!jobs || !Array.isArray(jobs) || !window.I18n || typeof window.I18n.getLocalizedValue !== "function") return;

    jobsCache = [...jobs].sort((a, b) => (a.order || 0) - (b.order || 0));
    renderJobsSection();
    applyPendingApplicationPrefill();
  }

  document.addEventListener("DOMContentLoaded", initJobsSection);
  document.addEventListener("languageChanged", () => {
    paginationState.currentPage = 1;
    initJobsSection();
  });
  window.addEventListener("resize", handleViewportChange);
})();



