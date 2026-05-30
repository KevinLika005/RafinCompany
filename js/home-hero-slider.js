document.addEventListener('DOMContentLoaded', () => {
  const heroSection = document.querySelector('.video-hero-section');
  const slider = document.getElementById('home-hero-slider');
  const slides = slider ? Array.from(slider.querySelectorAll('.video-hero-slide')) : [];
  const indicators = Array.from(document.querySelectorAll('.video-hero-indicator[data-slide-to]'));

  if (!heroSection || slides.length < 2 || indicators.length !== slides.length) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const autoplayDelay = Number.parseInt(heroSection.getAttribute('data-hero-autoplay') || '2000', 10);
  const safeDelay = Number.isFinite(autoplayDelay) && autoplayDelay >= 1200 ? autoplayDelay : 2000;

  let activeIndex = 0;
  let autoplayTimer = null;

  const setActiveSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.toggle('video-hero-slide--active', index === activeIndex);
    });

    indicators.forEach((indicator, index) => {
      const isActive = index === activeIndex;
      indicator.classList.toggle('video-hero-indicator--active', isActive);
      indicator.setAttribute('aria-pressed', String(isActive));
    });
  };

  const stopAutoplay = () => {
    if (!autoplayTimer) return;
    window.clearTimeout(autoplayTimer);
    autoplayTimer = null;
  };

  const startAutoplay = () => {
    stopAutoplay();

    if (reducedMotionQuery.matches || document.hidden) return;

    autoplayTimer = window.setTimeout(() => {
      setActiveSlide(activeIndex + 1);
      startAutoplay();
    }, safeDelay);
  };

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      setActiveSlide(index);
      startAutoplay();
    });
  });

  heroSection.addEventListener('mouseenter', stopAutoplay);
  heroSection.addEventListener('mouseleave', startAutoplay);
  heroSection.addEventListener('focusin', stopAutoplay);
  heroSection.addEventListener('focusout', (event) => {
    if (heroSection.contains(event.relatedTarget)) return;
    startAutoplay();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  if (typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', startAutoplay);
  } else if (typeof reducedMotionQuery.addListener === 'function') {
    reducedMotionQuery.addListener(startAutoplay);
  }

  setActiveSlide(0);
  startAutoplay();
});
