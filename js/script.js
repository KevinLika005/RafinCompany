/**
 * Global variables
 */
"use strict";
(function () {

  var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $document = $(document),
    $window = $(window),
    $html = $("html"),
    $body = $("body"),

    isRtl = $html.attr("dir") === "rtl",
    isDesktop = $html.hasClass("desktop"),
    isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
    isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isCategoryRoute = $body.hasClass("category-page"),
    isProjectRoute = $body.hasClass("project-page"),
    isProjectsRoute = $body.hasClass("projects-page") && !isCategoryRoute,
    isHomeRoute = !isCategoryRoute && !isProjectRoute && !isProjectsRoute,

    plugins = {
      pointerEvents: isIE < 11 ? "js/pointer-events.min.js" : false,
      bootstrapTooltip: $("[data-toggle='tooltip']"),
      bootstrapModalDialog: $('.modal'),
      rdNavbar: $(".rd-navbar"),
      materialParallax: isHomeRoute ? $(".parallax-container") : $(),
      rdGoogleMaps: isHomeRoute ? $(".rd-google-map") : $(),
      mailchimp: $('.mailchimp-mailform'),
      campaignMonitor: $('.campaign-mailform'),
      rdMailForm: $(".rd-mailform"),
      rdInputLabel: $(".form-label"),
      regula: $("[data-constraints]"),
      captcha: $('.recaptcha'),
      owl: isHomeRoute ? $(".owl-carousel") : $(),
      swiper: isHomeRoute ? $(".swiper-slider") : $(),
      
      wow: isHomeRoute ? $('.wow') : $(),
     
      radio: $("input[type='radio']"),
      checkbox: $("input[type='checkbox']"),
      customToggle: $("[data-custom-toggle]"),
      counter: $(".counter"),
      
      pageLoader: $("#page-loader"),
    
      selectFilter: $("select"),
      
      customParallax: $(".custom-parallax"),
      
      stepper: $("input[type='number']"),
      customWaypoints: isHomeRoute ? $('[data-custom-scroll-to]') : $(),
      scroller: isHomeRoute ? $(".scroll-wrap") : $(),
      copyrightYear: $(".copyright-year")
    };

  /**
   * Initialize All Scripts
   */
  $(function () {
    var isNoviBuilder = window.xMode;

    /**
     * getSwiperHeight
     * @description  calculate the height of swiper slider basing on data attr
     */
    function getSwiperHeight(object, attr) {
      var val = object.attr("data-" + attr),
        dim;

      if (!val) {
        return undefined;
      }

      dim = val.match(/(px)|(%)|(vh)|(vw)$/i);

      if (dim.length) {
        switch (dim[0]) {
          case "px":
            return parseFloat(val);
          case "vh":
            return $window.height() * (parseFloat(val) / 100);
          case "vw":
            return $window.width() * (parseFloat(val) / 100);
          case "%":
            return object.width() * (parseFloat(val) / 100);
        }
      } else {
        return undefined;
      }
    }

    /**
     * toggleSwiperInnerVideos
     * @description  toggle swiper videos on active slides
     */
    function toggleSwiperInnerVideos(swiper) {
      var prevSlide = $(swiper.slides[swiper.previousIndex]),
        nextSlide = $(swiper.slides[swiper.activeIndex]),
        videos,
        videoItems = prevSlide.find("video");

      for (var i = 0; i < videoItems.length; i++) {
        videoItems[i].pause();
      }

      videos = nextSlide.find("video");
      if (videos.length) {
        videos.get(0).play();
      }
    }

    /**
     * toggleSwiperCaptionAnimation
     * @description  toggle swiper animations on active slides
     */
    function toggleSwiperCaptionAnimation(swiper) {
      var prevSlide = $(swiper.container).find("[data-caption-animate]"),
        nextSlide = $(swiper.slides[swiper.activeIndex]).find("[data-caption-animate]"),
        delay,
        duration,
        nextSlideItem,
        prevSlideItem;

      for (var i = 0; i < prevSlide.length; i++) {
        prevSlideItem = $(prevSlide[i]);

        prevSlideItem.removeClass("animated")
          .removeClass(prevSlideItem.attr("data-caption-animate"))
          .addClass("not-animated");
      }


      var tempFunction = function (nextSlideItem, duration) {
        return function () {
          nextSlideItem
            .removeClass("not-animated")
            .addClass(nextSlideItem.attr("data-caption-animate"))
            .addClass("animated");
          if (duration) {
            nextSlideItem.css('animation-duration', duration + 'ms');
          }
        };
      };

      for (var i = 0; i < nextSlide.length; i++) {
        nextSlideItem = $(nextSlide[i]);
        duration = nextSlideItem.attr('data-caption-duration');
        if (!isNoviBuilder) {
          setTimeout(tempFunction(nextSlideItem, duration), parseInt(delay, 10));

        } else {
          nextSlideItem.removeClass("not-animated")
        }
      }
    }


    /**
     * makeWaypointScroll
     * @description  init smooth anchor animations
     */
    function makeWaypointScroll(obj) {
      var $this = $(obj);
      if (!isNoviBuilder) {
        $this.on('click', function (e) {
          e.preventDefault();
          $("body, html").stop().animate({
            scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
          }, 1000, function () {
            $window.trigger("resize");
          });
        });
      }
    }


    /**
     * initSwiperWaypoints
     * @description  toggle waypoints on active slides
     */
    function initSwiperWaypoints(swiper) {
      var prevSlide = $(swiper.container),
        nextSlide = $(swiper.slides[swiper.activeIndex]);

      prevSlide
        .find('[data-custom-scroll-to]')
        .each(function () {
          var $this = $(this);
          makeWaypointScroll($this);
        });

      nextSlide
        .find('[data-custom-scroll-to]')
        .each(function () {
          var $this = $(this);
          makeWaypointScroll($this);
        });
    }

    /**
     * initOwlCarousel
     * @description  Init owl carousel plugin
     */
    function initOwlCarousel(c) {
      var aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"],
        values = [0, 576, 768, 992, 1200, 1600],
        responsive = {};

      for (var j = 0; j < values.length; j++) {
        responsive[values[j]] = {};
        for (var k = j; k >= -1; k--) {
          if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
            responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
          }
          if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
            responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
          }
          if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
            responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
          }
        }
      }

      // Enable custom pagination
      if (c.attr('data-dots-custom')) {
        c.on("initialized.owl.carousel", function (event) {
          var carousel = $(event.currentTarget),
            customPag = $(carousel.attr("data-dots-custom")),
            active = 0;

          if (carousel.attr('data-active')) {
            active = parseInt(carousel.attr('data-active'), 10);
          }

          carousel.trigger('to.owl.carousel', [active, 300, true]);
          customPag.find("[data-owl-item='" + active + "']").addClass("active");

          customPag.find("[data-owl-item]").on('click', function (e) {
            e.preventDefault();
            carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item"), 10), 300, true]);
          });

          carousel.on("translate.owl.carousel", function (event) {
            customPag.find(".active").removeClass("active");
            customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
          });
        });
      }

      c.owlCarousel({
        autoplay: isNoviBuilder ? false : c.attr("data-autoplay") === "true",
        loop: isNoviBuilder ? false : c.attr("data-loop") !== "false",
        items: 1,
        rtl: isRtl,
        center: c.attr("data-center") === "true",
        dotsContainer: c.attr("data-pagination-class") || false,
        navContainer: c.attr("data-navigation-class") || false,
        mouseDrag: isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
        nav: c.attr("data-nav") === "false",
        dots: c.attr("data-dots") === "true",
        dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
        animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
        animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
        responsive: responsive,
        navText: function () {
          try {
            return JSON.parse(c.attr("data-nav-text"));
          } catch (e) {
            return [];
          }
        }(),
        navClass: function () {
          try {
            return JSON.parse(c.attr("data-nav-class"));
          } catch (e) {
            return ['owl-prev', 'owl-next'];
          }
        }()
      });
    }

    /**
     * isScrolledIntoView
     * @description  check the element whas been scrolled into the view
     */
    function isScrolledIntoView(elem) {
      if (!isNoviBuilder) {
        return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
      }
      else {
        return true;
      }
    }

    /**
     * initOnView
     * @description  calls a function when element has been scrolled into the view
     */
    function lazyInit(element, func) {
      $document.on('scroll', function () {
        if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
          func.call();
          element.addClass('lazy-loaded');
        }
      }).trigger("scroll");
    }


    /**
     * Owl carousel
     * @description Enables Owl carousel plugin
     */
    if (plugins.owl.length) {
      for (var i = 0; i < plugins.owl.length; i++) {
        var c = $(plugins.owl[i]);
        plugins.owl[i].owl = c;

        initOwlCarousel(c);
      }
    }

    function initNewsCarousel(section) {
      var carousel = section.querySelector(".news-carousel"),
        viewport = section.querySelector(".news-carousel__viewport"),
        track = section.querySelector(".news-carousel__track"),
        slides = section.querySelectorAll(".news-card"),
        prevButton = section.querySelector(".news-carousel__button--prev"),
        nextButton = section.querySelector(".news-carousel__button--next"),
        progressBar = section.querySelector(".news-carousel__progress-bar"),
        status = section.querySelector(".news-carousel__status"),
        resizeTimer = null,
        currentIndex = 0,
        visibleCount = 1,
        maxIndex = 0,
        activePointerId = null,
        dragStartX = 0,
        dragStartY = 0,
        dragDeltaX = 0,
        dragBaseOffset = 0,
        isPointerDown = false,
        isDragging = false,
        suppressClick = false,
        autoplayId = null,
        autoplayDelay = parseInt(carousel && carousel.getAttribute("data-autoplay-delay"), 10) || 5500,
        autoplayEnabled = carousel && carousel.getAttribute("data-autoplay") === "true",
        prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!carousel || !viewport || !track || !slides.length || !prevButton || !nextButton || !progressBar || !status) {
        return;
      }

      function padNumber(value) {
        return value < 10 ? "0" + value : String(value);
      }

      function getVisibleCount() {
        if (window.matchMedia("(min-width: 1200px)").matches) {
          return 3;
        }

        if (window.matchMedia("(min-width: 768px)").matches) {
          return 2;
        }

        return 1;
      }

      function getGap() {
        var styles = window.getComputedStyle(track),
          gap = parseFloat(styles.columnGap || styles.gap || 0);

        return isNaN(gap) ? 0 : gap;
      }

      function setInteractiveState() {
        var visibleEnd = currentIndex + visibleCount,
          slideIndex,
          isVisible,
          focusableElements,
          focusIndex;

        for (slideIndex = 0; slideIndex < slides.length; slideIndex++) {
          isVisible = slideIndex >= currentIndex && slideIndex < visibleEnd;
          slides[slideIndex].setAttribute("aria-hidden", isVisible ? "false" : "true");
          focusableElements = slides[slideIndex].querySelectorAll("a, button");

          for (focusIndex = 0; focusIndex < focusableElements.length; focusIndex++) {
            focusableElements[focusIndex].setAttribute("tabindex", isVisible ? "0" : "-1");
          }
        }
      }

      function getSlideWidth() {
        return slides[0].getBoundingClientRect().width;
      }

      function getStepWidth() {
        return getSlideWidth() + getGap();
      }

      function getBaseOffset() {
        return getStepWidth() * currentIndex;
      }

      function renderOffset(offset) {
        track.style.transform = "translate3d(" + offset + "px, 0, 0)";
      }

      function updateCarousel() {
        var baseOffset = getBaseOffset(),
          visibleEnd = Math.min(currentIndex + visibleCount, slides.length),
          progress = slides.length <= visibleCount ? 100 : (visibleEnd / slides.length) * 100;

        track.style.transition = "";
        renderOffset(-baseOffset);
        progressBar.style.width = progress + "%";
        status.textContent = padNumber(currentIndex + 1) + (visibleCount > 1 ? "-" + padNumber(visibleEnd) : "") + " / " + padNumber(slides.length);
        setInteractiveState();
      }

      function refreshMetrics() {
        visibleCount = getVisibleCount();
        maxIndex = Math.max(0, slides.length - visibleCount);

        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }
      }

      function goTo(index) {
        currentIndex = index;

        if (currentIndex < 0) {
          currentIndex = maxIndex;
        }

        if (currentIndex > maxIndex) {
          currentIndex = 0;
        }

        updateCarousel();
      }

      function stopAutoplay() {
        if (autoplayId) {
          window.clearInterval(autoplayId);
          autoplayId = null;
        }
      }

      function startAutoplay() {
        stopAutoplay();

        if (!autoplayEnabled || prefersReducedMotion || slides.length <= visibleCount) {
          return;
        }

        autoplayId = window.setInterval(function () {
          goTo(currentIndex + 1);
        }, autoplayDelay);
      }

      function resetDragState() {
        isPointerDown = false;
        isDragging = false;
        dragDeltaX = 0;
        activePointerId = null;
        carousel.classList.remove("news-carousel--is-dragging");
        track.style.transition = "";
      }

      prevButton.addEventListener("click", function () {
        goTo(currentIndex - 1);
      });

      nextButton.addEventListener("click", function () {
        goTo(currentIndex + 1);
      });

      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", function () {
        window.setTimeout(function () {
          if (!carousel.contains(document.activeElement)) {
            startAutoplay();
          }
        }, 0);
      });

      viewport.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(currentIndex - 1);
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(currentIndex + 1);
        }
      });

      viewport.addEventListener("click", function (event) {
        if (!suppressClick) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        suppressClick = false;
      }, true);

      viewport.addEventListener("dragstart", function (event) {
        event.preventDefault();
      });

      viewport.addEventListener("pointerdown", function (event) {
        if (event.button !== undefined && event.button !== 0) {
          return;
        }

        if (event.pointerType === "mouse" && event.buttons !== undefined && event.buttons !== 1) {
          return;
        }

        activePointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        dragDeltaX = 0;
        dragBaseOffset = getBaseOffset();
        isPointerDown = true;
        isDragging = false;
        stopAutoplay();

        if (viewport.setPointerCapture) {
          viewport.setPointerCapture(event.pointerId);
        }
      });

      viewport.addEventListener("pointermove", function (event) {
        var deltaX,
          deltaY;

        if (!isPointerDown || activePointerId !== event.pointerId) {
          return;
        }

        deltaX = event.clientX - dragStartX;
        deltaY = event.clientY - dragStartY;

        if (!isDragging) {
          if (Math.abs(deltaY) > 10 && Math.abs(deltaY) > Math.abs(deltaX)) {
            resetDragState();
            startAutoplay();
            return;
          }

          if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
            isDragging = true;
            carousel.classList.add("news-carousel--is-dragging");
            track.style.transition = "none";
          }
        }

        if (!isDragging) {
          return;
        }

        dragDeltaX = deltaX;
        renderOffset(-dragBaseOffset + dragDeltaX);
        event.preventDefault();
      });

      viewport.addEventListener("pointerup", function (event) {
        var dragThreshold,
          completedDrag = isDragging;

        if (!isPointerDown || activePointerId !== event.pointerId) {
          return;
        }

        if (viewport.releasePointerCapture) {
          viewport.releasePointerCapture(event.pointerId);
        }

        dragThreshold = Math.max(45, getStepWidth() * 0.18);

        if (isDragging && Math.abs(dragDeltaX) > dragThreshold) {
          suppressClick = true;

          if (dragDeltaX < 0) {
            goTo(currentIndex + 1);
          } else {
            goTo(currentIndex - 1);
          }
        } else {
          updateCarousel();
        }

        resetDragState();
        startAutoplay();

        if (completedDrag) {
          window.setTimeout(function () {
            suppressClick = false;
          }, 220);
        }
      });

      viewport.addEventListener("pointercancel", function (event) {
        if (!isPointerDown || activePointerId !== event.pointerId) {
          return;
        }

        updateCarousel();
        resetDragState();
        startAutoplay();
      });

      window.addEventListener("resize", function () {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function () {
          refreshMetrics();
          updateCarousel();
          startAutoplay();
        }, 80);
      });

      refreshMetrics();
      updateCarousel();
      startAutoplay();
    }

    var newsSections = document.querySelectorAll(".news-carousel-section"),
      newsSectionIndex;

    for (newsSectionIndex = 0; newsSectionIndex < newsSections.length; newsSectionIndex++) {
      initNewsCarousel(newsSections[newsSectionIndex]);
    }

    /**
     * Live Search
     * @description  create live search results
     */
    function liveSearch(options) {
      $('#' + options.live).removeClass('cleared').html();
      options.current++;
      options.spin.addClass('loading');
      $.get(handler, {
        s: decodeURI(options.term),
        liveSearch: options.live,
        dataType: "html",
        liveCount: options.liveCount,
        filter: options.filter,
        template: options.template
      }, function (data) {
        options.processed++;
        var live = $('#' + options.live);
        if ((options.processed === options.current) && !live.hasClass('cleared')) {
          live.find('> #search-results').removeClass('active');
          live.html(data);
          setTimeout(function () {
            live.find('> #search-results').addClass('active');
          }, 50);
        }
        options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
      })
    }

    /**
     * attachFormValidator
     * @description  attach form validation to elements
     */
    function isPhoneField($input) {
      var inputType = ($input.attr('type') || '').toLowerCase();
      var inputName = ($input.attr('name') || '').toLowerCase();
      var inputId = ($input.attr('id') || '').toLowerCase();
      return inputType === 'tel' || inputName === 'phone' || inputId.indexOf('phone') !== -1;
    }

    function isContactFormField($input) {
      return (($input.closest('form').attr('data-form-type') || '').toLowerCase() === 'contact');
    }

    function isContactNameField($input) {
      if (!isContactFormField($input)) return false;
      var inputType = ($input.attr('type') || '').toLowerCase();
      var inputName = ($input.attr('name') || '').toLowerCase();
      var inputId = ($input.attr('id') || '').toLowerCase();
      return inputType === 'text' && (inputName === 'name' || inputId.indexOf('name') !== -1);
    }

    function isContactMessageField($input) {
      if (!isContactFormField($input)) return false;
      var inputName = ($input.attr('name') || '').toLowerCase();
      var inputId = ($input.attr('id') || '').toLowerCase();
      return inputName === 'message' || inputId.indexOf('message') !== -1;
    }

    function isMeaningfulPhoneNumber(value) {
      var normalized = String(value || '').trim();
      var plusSigns = normalized.match(/\+/g) || [];
      var digits = normalized.replace(/\D/g, '');

      if (!normalized) return false;
      if (/[^0-9+\s().-]/.test(normalized)) return false;
      if (plusSigns.length > 1) return false;
      if (plusSigns.length === 1) {
        var plusIndex = normalized.indexOf('+');
        var startsWithParenthesizedPlus = plusIndex === 1 && normalized.indexOf('(+') === 0;
        if (plusIndex !== 0 && !startsWithParenthesizedPlus) return false;
      }

      return digits.length >= 7 && digits.length <= 15;
    }

    function validateContactNameInput($input) {
      if (!isContactNameField($input)) return true;

      if (String($input.val() || '').trim().length >= 2) return true;

      $input
        .siblings(".form-validation")
        .text("Name must be at least 2 characters.")
        .parent()
        .addClass("has-error");

      return false;
    }

    function validateContactMessageInput($input) {
      if (!isContactMessageField($input)) return true;

      var normalized = String($input.val() || '').replace(/\s+/g, '');
      if (normalized.length >= 5) return true;

      $input
        .siblings(".form-validation")
        .text("Message must be at least 5 characters.")
        .parent()
        .addClass("has-error");

      return false;
    }

    function validatePhoneInput($input) {
      if (!isPhoneField($input)) return true;
      if (isMeaningfulPhoneNumber($input.val())) return true;

      $input
        .siblings(".form-validation")
        .text("Enter a valid phone number (for example +355 68 123 4567).")
        .parent()
        .addClass("has-error");

      return false;
    }

    function validateContactFieldInput($input) {
      return validateContactNameInput($input)
        && validateContactMessageInput($input)
        && validatePhoneInput($input);
    }

    function attachFormValidator(elements) {
      var $elements = $(elements),
        elementsToBind = $();

      for (var i = 0; i < $elements.length; i++) {
        var o = $($elements[i]), v;

        if (!o.hasClass("form-control-has-validation")) {
          o.addClass("form-control-has-validation");
        }

        if (!o.siblings(".form-validation").length) {
          o.after("<span class='form-validation'></span>");
        }

        v = o.siblings(".form-validation").first();
        if (v.is(":last-child")) {
          o.addClass("form-control-last-child");
        }

        if (!o.data("rafinValidationBound")) {
          elementsToBind = elementsToBind.add(o);
        }
      }

      elementsToBind
        .on('input change propertychange blur', function (e) {
          var $this = $(this), results;

          if (e.type !== "blur") {
            if (!$this.parent().hasClass("has-error")) {
              return;
            }
          }

          if ($this.parents('.rd-mailform').hasClass('success')) {
            return;
          }

          if ((results = $this.regula('validate')).length) {
            for (i = 0; i < results.length; i++) {
              $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
            }
          } else if (!validateContactFieldInput($this)) {
            return;
          } else {
            $this.siblings(".form-validation").text("").parent().removeClass("has-error")
          }
        })
        .regula('bind');

      elementsToBind.each(function () {
        $(this).data("rafinValidationBound", true);
      });

      var regularConstraintsMessages = [
        {
          type: regula.Constraint.Required,
          newMessage: "The text field is required."
        },
        {
          type: regula.Constraint.Email,
          newMessage: "The email is not a valid email."
        },
        {
          type: regula.Constraint.Numeric,
          newMessage: "Only numbers are required"
        },
        {
          type: regula.Constraint.Selected,
          newMessage: "Please choose an option."
        }
      ];


      for (var i = 0; i < regularConstraintsMessages.length; i++) {
        var regularConstraint = regularConstraintsMessages[i];

        regula.override({
          constraintType: regularConstraint.type,
          defaultMessage: regularConstraint.newMessage
        });
      }
    }

    /**
     * isValidated
     * @description  check if all elemnts pass validation
     */
    function isValidated(elements, captcha) {
      var results, errors = 0;

      if (elements.length) {
        for (var j = 0; j < elements.length; j++) {

          var $input = $(elements[j]);
          if ((results = $input.regula('validate')).length) {
            for (k = 0; k < results.length; k++) {
              errors++;
              $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
            }
          } else if (!validateContactFieldInput($input)) {
            errors++;
          } else {
            $input.siblings(".form-validation").text("").parent().removeClass("has-error")
          }
        }

        if (captcha) {
          if (captcha.length) {
            return validateReCaptcha(captcha) && errors === 0
          }
        }

        return errors === 0;
      }
      return true;
    }

    /**
     * validateReCaptcha
     * @description  validate google reCaptcha
     */
    function validateReCaptcha(captcha) {
      var captchaToken = captcha.find('.g-recaptcha-response').val();

      if (captchaToken.length === 0) {
        captcha
          .siblings('.form-validation')
          .html('Please, prove that you are not robot.')
          .addClass('active');
        captcha
          .closest('.form-wrap')
          .addClass('has-error');

        captcha.on('propertychange', function () {
          var $this = $(this),
            captchaToken = $this.find('.g-recaptcha-response').val();

          if (captchaToken.length > 0) {
            $this
              .closest('.form-wrap')
              .removeClass('has-error');
            $this
              .siblings('.form-validation')
              .removeClass('active')
              .html('');
            $this.off('propertychange');
          }
        });

        return false;
      }

      return true;
    }

    /**
     * onloadCaptchaCallback
     * @description  init google reCaptcha
     */
    window.onloadCaptchaCallback = function () {
      for (var i = 0; i < plugins.captcha.length; i++) {
        var $capthcaItem = $(plugins.captcha[i]);

        grecaptcha.render(
          $capthcaItem.attr('id'),
          {
            sitekey: $capthcaItem.attr('data-sitekey'),
            size: $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
            theme: $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
            callback: function (e) {
              $('.recaptcha').trigger('propertychange');
            }
          }
        );
        $capthcaItem.after("<span class='form-validation'></span>");
      }
    };

    /**
     * Init Bootstrap tooltip
     * @description  calls a function when need to init bootstrap tooltips
     */
    function initBootstrapTooltip(tooltipPlacement) {
      if (window.innerWidth < 576) {
        plugins.bootstrapTooltip.tooltip('dispose');
        plugins.bootstrapTooltip.tooltip({
          placement: 'bottom'
        });
      } else {
        plugins.bootstrapTooltip.tooltip('dispose');
        plugins.bootstrapTooltip.tooltip({
          placement: tooltipPlacement
        });
      }
    }

    /**
     * Google ReCaptcha
     * @description Enables Google ReCaptcha
     */
    if (plugins.captcha.length) {
      $.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
    }

    /**
     * Copyright Year
     * @description  Evaluates correct copyright year
     */
    if (plugins.copyrightYear.length) {
      plugins.copyrightYear.text(initialDate.getFullYear());
    }

    /**
     * Is Mac os
     * @description  add additional class on html if mac os.
     */
    if (navigator.platform.match(/(Mac)/i)) $html.addClass("mac-os");

    /**
     * Is Firefox
     * @description  add additional class on html if mac os.
     */
    if (isFirefox) $html.addClass("firefox");

    /**
     * IE Polyfills
     * @description  Adds some loosing functionality to IE browsers
     */
    if (isIE) {
      if (isIE < 10) {
        $html.addClass("lt-ie-10");
      }

      if (isIE < 11) {
        if (plugins.pointerEvents) {
          $.getScript(plugins.pointerEvents)
            .done(function () {
              $html.addClass("ie-10");
              PointerEventsPolyfill.initialize({});
            });
        }
      }

      if (isIE === 11) {
        $html.addClass("ie-11");
      }

      if (isIE === 12) {
        $html.addClass("ie-edge");
      }
    }

    /**
     * Bootstrap Tooltips
     * @description Activate Bootstrap Tooltips
     */
    if (plugins.bootstrapTooltip.length) {
      var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
      initBootstrapTooltip(tooltipPlacement);

      $window.on('resize orientationchange', function () {
        initBootstrapTooltip(tooltipPlacement);
      })
    }

    /**
     * bootstrapModalDialog
     * @description Stap vioeo in bootstrapModalDialog
     */
    if (plugins.bootstrapModalDialog.length > 0) {
      for (var i = 0; i < plugins.bootstrapModalDialog.length; i++) {
        var modalItem = $(plugins.bootstrapModalDialog[i]);

        modalItem.on('hidden.bs.modal', $.proxy(function () {
          var activeModal = $(this),
            rdVideoInside = activeModal.find('video'),
            youTubeVideoInside = activeModal.find('iframe');

          if (rdVideoInside.length) {
            rdVideoInside[0].pause();
          }

          if (youTubeVideoInside.length) {
            var videoUrl = youTubeVideoInside.attr('src');

            youTubeVideoInside
              .attr('src', '')
              .attr('src', videoUrl);
          }
        }, modalItem));
      }
    }

    /**
     * RD Google Maps
     * @description Enables RD Google Maps plugin
     */
    if (plugins.rdGoogleMaps.length) {
      $.getScript("//maps.google.com/maps/api/js?key=AIzaSyAwH60q5rWrS8bXwpkZwZwhw9Bw0pqKTZM&sensor=false&libraries=geometry,places&v=3.7", function () {
        var head = document.getElementsByTagName('head')[0],
          insertBefore = head.insertBefore;

        head.insertBefore = function (newElement, referenceElement) {
          if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') !== -1 || newElement.innerHTML.indexOf('gm-style') !== -1) {
            return;
          }
          insertBefore.call(head, newElement, referenceElement);
        };

        for (var i = 0; i < plugins.rdGoogleMaps.length; i++) {
          var $googleMapItem = $(plugins.rdGoogleMaps[i]);

          lazyInit($googleMapItem, $.proxy(function () {
            var $this = $(this),
              styles = $this.attr("data-styles");

            $this.googleMap({
              marker: {
                basic: $this.data('marker'),
                active: $this.data('marker-active')
              },
              styles: styles ? JSON.parse(styles) : [],
              onInit: function (map) {
                var inputAddress = $('#rd-google-map-address');


                if (inputAddress.length) {
                  var input = inputAddress;
                  var geocoder = new google.maps.Geocoder();
                  var marker = new google.maps.Marker(
                    {
                      map: map,
                      icon: $this.data('marker-url')
                    }
                  );

                  var autocomplete = new google.maps.places.Autocomplete(inputAddress[0]);
                  autocomplete.bindTo('bounds', map);
                  inputAddress.attr('placeholder', '');
                  inputAddress.on('change', function () {
                    $("#rd-google-map-address-submit").trigger('click');
                  });
                  inputAddress.on('keydown', function (e) {
                    if (e.keyCode === 13) {
                      $("#rd-google-map-address-submit").trigger('click');
                    }
                  });


                  $("#rd-google-map-address-submit").on('click', function (e) {
                    e.preventDefault();
                    var address = input.val();
                    geocoder.geocode({'address': address}, function (results, status) {
                      if (status === google.maps.GeocoderStatus.OK) {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();

                        map.setCenter(new google.maps.LatLng(
                          parseFloat(latitude),
                          parseFloat(longitude)
                        ));
                        marker.setPosition(new google.maps.LatLng(
                          parseFloat(latitude),
                          parseFloat(longitude)
                        ))
                      }
                    });
                  });
                }
              }
            });
          }, $googleMapItem));
        }
      });
    }

    /**
     * Radio
     * @description Add custom styling options for input[type="radio"]
     */
    if (plugins.radio.length) {
      for (var i = 0; i < plugins.radio.length; i++) {
        $(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
      }
    }

    /**
     * Checkbox
     * @description Add custom styling options for input[type="checkbox"]
     */
    if (plugins.checkbox.length) {
      for (var i = 0; i < plugins.checkbox.length; i++) {
        $(plugins.checkbox[i]).addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
      }
    }


    /**
     * UI To Top
     * @description Enables ToTop Button
     */
    if (!isNoviBuilder) {
      $().UItoTop({
        easingType: 'easeOutQuart',
        containerClass: 'ui-to-top'
      });
    }

    /**
     * RD Navbar
     * @description Enables RD Navbar plugin
     */
    if (plugins.rdNavbar.length) {
      var aliaces, i, j, len, value, values, responsiveNavbar;

      aliaces = ["-", "-sm-", "-md-", "-lg-", "-xl-", "-xxl-"];
      values = [0, 576, 768, 992, 1200, 1600];
      responsiveNavbar = {};

      for (i = j = 0, len = values.length; j < len; i = ++j) {
        value = values[i];
        if (!responsiveNavbar[values[i]]) {
          responsiveNavbar[values[i]] = {};
        }
        if (plugins.rdNavbar.attr('data' + aliaces[i] + 'layout')) {
          responsiveNavbar[values[i]].layout = plugins.rdNavbar.attr('data' + aliaces[i] + 'layout');
        }
        if (plugins.rdNavbar.attr('data' + aliaces[i] + 'device-layout')) {
          responsiveNavbar[values[i]]['deviceLayout'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'device-layout');
        }
        if (plugins.rdNavbar.attr('data' + aliaces[i] + 'hover-on')) {
          responsiveNavbar[values[i]]['focusOnHover'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'hover-on') === 'true';
        }
        if (plugins.rdNavbar.attr('data' + aliaces[i] + 'auto-height')) {
          responsiveNavbar[values[i]]['autoHeight'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'auto-height') === 'true';
        }

        if (isNoviBuilder) {
          responsiveNavbar[values[i]]['stickUp'] = false;
        } else if (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up')) {
          responsiveNavbar[values[i]]['stickUp'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up') === 'true';
        }

        if (plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up-offset')) {
          responsiveNavbar[values[i]]['stickUpOffset'] = plugins.rdNavbar.attr('data' + aliaces[i] + 'stick-up-offset');
        }
      }


      plugins.rdNavbar.RDNavbar({
        anchorNav: !isNoviBuilder,
        stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
        responsive: responsiveNavbar,
        callbacks: {
          onStuck: function () {
            var navbarSearch = this.$element.find('.rd-search input');

            if (navbarSearch) {
              navbarSearch.val('').trigger('propertychange');
            }
          },
          onDropdownOver: function () {
            return !isNoviBuilder;
          },
          onUnstuck: function () {
            if (this.$clone === null)
              return;

            var navbarSearch = this.$clone.find('.rd-search input');

            if (navbarSearch) {
              navbarSearch.val('').trigger('propertychange');
              navbarSearch.trigger('blur');
            }

          }
        }
      });


      if (plugins.rdNavbar.attr("data-body-class")) {
        document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
      }
    }


    /**
     * Swiper
     * @description  Enable Swiper Slider
     */
    if (plugins.swiper.length) {
      for (var i = 0; i < plugins.swiper.length; i++) {
        var s = $(plugins.swiper[i]);
        var pag = s.find(".swiper-pagination"),
          next = s.find(".swiper-button-next"),
          prev = s.find(".swiper-button-prev"),
          bar = s.find(".swiper-scrollbar"),
          swiperSlide = s.find(".swiper-slide"),
          autoplay = false;

        for (var j = 0; j < swiperSlide.length; j++) {
          var $this = $(swiperSlide[j]),
            url;

          if (url = $this.attr("data-slide-bg")) {
            $this.css({
              "background-image": "url(" + url + ")",
              "background-size": "cover"
            })
          }
        }

        swiperSlide.end()
          .find("[data-caption-animate]")
          .addClass("not-animated")
          .end();

        s.swiper({
          autoplay: s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
          direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
          effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
          speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
          keyboardControl: s.attr('data-keyboard') === "true",
          mousewheelControl: s.attr('data-mousewheel') === "true",
          mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
          nextButton: next.length ? next.get(0) : null,
          prevButton: prev.length ? prev.get(0) : null,
          pagination: pag.length ? pag.get(0) : null,
          paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
          paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (swiper, index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          } : null : null,
          scrollbar: bar.length ? bar.get(0) : null,
          scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
          scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
          loop: isNoviBuilder ? false : s.attr('data-loop') !== "false",
          simulateTouch: s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
          onTransitionStart: function (swiper) {
            toggleSwiperInnerVideos(swiper);
          },
          onTransitionEnd: function (swiper) {
            toggleSwiperCaptionAnimation(swiper);
          },
          onInit: function (swiper) {
            toggleSwiperInnerVideos(swiper);
            toggleSwiperCaptionAnimation(swiper);

            if (!isRtl) {
              $window.on('resize', function () {
                swiper.update(true);
              });
            }
          }
        });

        $window.on("resize", (function (s) {
          return function () {
            var mh = getSwiperHeight(s, "min-height"),
              h = getSwiperHeight(s, "height");
            if (h) {
              s.css("height", mh ? mh > h ? mh : h : h);
            }
          }
        })(s)).trigger("resize");
      }
    }

    /**
     * WOW
     * @description Enables Wow animation plugin
     */
    if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
      new WOW().init();
    }


    /**
     * RD Input Label
     * @description Enables RD Input Label Plugin
     */
    if (plugins.rdInputLabel.length) {
      plugins.rdInputLabel.RDInputLabel();
    }

    /**
     * Regula
     * @description Enables Regula plugin
     */
    if (plugins.regula.length) {
      attachFormValidator(plugins.regula);
    }


    /**
     * MailChimp Ajax subscription
     */
    if (plugins.mailchimp.length) {
      for (i = 0; i < plugins.mailchimp.length; i++) {
        var $mailchimpItem = $(plugins.mailchimp[i]),
          $email = $mailchimpItem.find('input[type="email"]');

        // Required by MailChimp
        $mailchimpItem.attr('novalidate', 'true');
        $email.attr('name', 'EMAIL');

        $mailchimpItem.on('submit', $.proxy(function (e) {
          e.preventDefault();

          var $this = this;

          var data = {},
            url = $this.attr('action').replace('/post?', '/post-json?').concat('&c=?'),
            dataArray = $this.serializeArray(),
            $output = $("#" + $this.attr("data-form-output"));

          for (i = 0; i < dataArray.length; i++) {
            data[dataArray[i].name] = dataArray[i].value;
          }

          $.ajax({
            data: data,
            url: url,
            dataType: 'jsonp',
            error: function (resp, text) {
              $output.html('Server error: ' + text);

              setTimeout(function () {
                $output.removeClass("active");
              }, 4000);
            },
            success: function (resp) {
              $output.html(resp.msg).addClass('active');

              setTimeout(function () {
                $output.removeClass("active");
              }, 6000);
            },
            beforeSend: function (data) {
              // Stop request if builder or inputs are invalide
              if (isNoviBuilder || !isValidated($this.find('[data-constraints]')))
                return false;

              $output.html('Submitting...').addClass('active');
            }
          });

          return false;
        }, $mailchimpItem));
      }
    }


    /**
     * Campaign Monitor ajax subscription
     */
    if (plugins.campaignMonitor.length) {
      for (i = 0; i < plugins.campaignMonitor.length; i++) {
        var $campaignItem = $(plugins.campaignMonitor[i]);

        $campaignItem.on('submit', $.proxy(function (e) {
          var data = {},
            url = this.attr('action'),
            dataArray = this.serializeArray(),
            $output = $("#" + plugins.campaignMonitor.attr("data-form-output")),
            $this = $(this);

          for (i = 0; i < dataArray.length; i++) {
            data[dataArray[i].name] = dataArray[i].value;
          }

          $.ajax({
            data: data,
            url: url,
            dataType: 'jsonp',
            error: function (resp, text) {
              $output.html('Server error: ' + text);

              setTimeout(function () {
                $output.removeClass("active");
              }, 4000);
            },
            success: function (resp) {
              $output.html(resp.Message).addClass('active');

              setTimeout(function () {
                $output.removeClass("active");
              }, 6000);
            },
            beforeSend: function (data) {
              // Stop request if builder or inputs are invalide
              if (isNoviBuilder || !isValidated($this.find('[data-constraints]')))
                return false;

              $output.html('Submitting...').addClass('active');
            }
          });

          return false;
        }, $campaignItem));
      }
    }


    /**
     * RD Mailform
     * @version      3.2.0
     */
    function getFormStartedAtTimestamp() {
      return Math.floor(Date.now() / 1000).toString();
    }

    function ensureHoneypotField($form) {
      var $honeypot = $form.find('input[name="company_website"]');

      if (!$honeypot.length) {
        $honeypot = $('<input class="form-honeypot" type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" />');
        $form.append($honeypot);
      }
    }

    function ensureFormStartedAtField($form) {
      var $startedAt = $form.find('input[name="form_started_at"]');

      if (!$startedAt.length) {
        $startedAt = $('<input type="hidden" name="form_started_at" value="">');
        $form.append($startedAt);
      }

      if (!/^\d{10}$/.test(String($startedAt.val() || ''))) {
        $startedAt.val(getFormStartedAtTimestamp());
      }
    }

    function ensureAntiSpamFields($form) {
      ensureHoneypotField($form);
      ensureFormStartedAtField($form);
    }

    function normalizeMailFormResult(result, xhr) {
      var rawResult = '',
        headerCode = '',
        requestId = '',
        responseMessage = '',
        fields = [],
        matchedCode;

      if (result && typeof result === 'object' && typeof result.code === 'string') {
        headerCode = result.code;
        responseMessage = typeof result.message === 'string' ? result.message : '';
        requestId = typeof result.requestId === 'string' ? result.requestId : '';
        rawResult = typeof result.raw === 'string' ? result.raw : '';
        if ($.isArray(result.fields)) {
          fields = $.grep(result.fields, function (fieldName) {
            return typeof fieldName === 'string' && /^[a-zA-Z0-9_-]+$/.test(fieldName);
          });
        }
      } else if (typeof result === 'string') {
        rawResult = result;
      } else if (result && typeof result.responseText === 'string') {
        rawResult = result.responseText;
      } else if (xhr && typeof xhr.responseText === 'string') {
        rawResult = xhr.responseText;
      }

      rawResult = String(rawResult == null ? '' : rawResult).trim();

      if (xhr && typeof xhr.getResponseHeader === 'function') {
        headerCode = headerCode || xhr.getResponseHeader('X-Rafin-Mail-Code') || '';
        requestId = requestId || xhr.getResponseHeader('X-Rafin-Mail-Request-Id') || '';
      } else if (result && typeof result.getResponseHeader === 'function') {
        headerCode = headerCode || result.getResponseHeader('X-Rafin-Mail-Code') || '';
        requestId = requestId || result.getResponseHeader('X-Rafin-Mail-Request-Id') || '';
      }

      matchedCode = String(headerCode || rawResult).match(/MF\d{3}/);

      return {
        code: matchedCode ? matchedCode[0] : 'MF255',
        raw: rawResult,
        requestId: requestId,
        message: responseMessage,
        fields: fields
      };
    }

    function getMailFormMessage(code, rawResult, fallbackMessages, responseMessage) {
      var isLocalHost = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname || '');

      if (code === 'MF255' && isLocalHost && /(<\?php|<!doctype|<html[\s>])/i.test(rawResult)) {
        return 'Run the site through PHP locally. A static server cannot execute bat/rd-mailform.php.';
      }

      if (responseMessage) {
        return responseMessage;
      }

      return fallbackMessages[code] || fallbackMessages.MF255;
    }

    function getMailFormFieldMessage(fieldName, fallbackMessages) {
      var messages = {
        name: 'Please enter your name.',
        phone: 'Please enter a valid phone number.',
        email: 'Please enter a valid email address.',
        message: 'Please enter a message.',
        job_position: 'Please select a job position.',
        cv: 'Please upload a PDF, DOC, or DOCX file up to 5 MB.'
      };

      return messages[fieldName] || fallbackMessages.MF005;
    }

    function clearMailFormServerFieldErrors(form) {
      form.find('input, textarea, select').each(function () {
        var field = this,
          $field = $(field);

        if (typeof field.setCustomValidity === 'function') {
          field.setCustomValidity('');
        }

        $field.siblings('.form-validation').text('');
        $field.parent().removeClass('has-error');
      });
    }

    function applyMailFormServerFieldErrors(form, fields, fallbackMessages) {
      var firstInvalidField = null;

      if (!$.isArray(fields) || !fields.length) {
        return;
      }

      $.each(fields, function (_, fieldName) {
        var field = form.find('[name="' + fieldName + '"]').get(0),
          $field = $(field),
          message = getMailFormFieldMessage(fieldName, fallbackMessages);

        if (!field) {
          return;
        }

        if (typeof field.setCustomValidity === 'function') {
          field.setCustomValidity(message);
        }

        $field.siblings('.form-validation').text(message);
        $field.parent().addClass('has-error');
        firstInvalidField = firstInvalidField || field;
      });

      if (firstInvalidField && typeof firstInvalidField.focus === 'function') {
        firstInvalidField.focus();
      }

      if (form.get(0) && typeof form.get(0).reportValidity === 'function') {
        form.get(0).reportValidity();
      }
    }

    function renderMailFormResult(form, output, normalizedResult, fallbackMessages) {
      var select = form.find('select'),
        code = normalizedResult.code,
        message = getMailFormMessage(code, normalizedResult.raw, fallbackMessages, normalizedResult.message),
        isSuccess = code === "MF000";

      form.removeClass('form-in-process success');
      output.removeClass("active error success");

      if (isSuccess) {
        form.addClass('success');
      }

      if (!isSuccess) {
        applyMailFormServerFieldErrors(form, normalizedResult.fields, fallbackMessages);
      }

      output.text(message);

      if (output.hasClass("snackbars")) {
        if (isSuccess) {
          output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + message + '</span></p>');
        } else {
          output.html('<p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + message + '</span></p>');
        }
        output.addClass("active");
      } else {
        output.addClass(isSuccess ? "active success" : "active error");
      }

      if (isSuccess) {
        form.clearForm();

        if (select.length) {
          select.select2("val", "");
        }

        ensureAntiSpamFields(form);
        form.find('input, textarea').trigger('blur');
      }

      setTimeout(function () {
        output.removeClass("active error success");
        form.removeClass('success');
      }, 3500);
    }

    function getMailFormOutput(form) {
      var outputId = form.attr("data-form-output");
      return outputId ? $("#" + outputId) : $();
    }

    function prepareMailForm(form) {
      form.attr('novalidate', 'novalidate');
      ensureAntiSpamFields(form);
      attachFormValidator(form.find('[data-constraints]'));
    }

    function verifyMailFormCaptcha(form, output) {
      var captcha = form.find('.recaptcha');

      if (!captcha.length) {
        return true;
      }

      var captchaToken = captcha.find('.g-recaptcha-response').val(),
        captchaFlag = true,
        captchaMsg = {
          'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
          'CPT002': 'Something wrong with google reCaptcha'
        };

      $.ajax({
        method: "POST",
        url: "bat/reCaptcha.php",
        data: {'g-recaptcha-response': captchaToken},
        async: false
      })
        .done(function (responceCode) {
          if (responceCode !== 'CPT000') {
            if (output.hasClass("snackbars")) {
              output.html('<p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + captchaMsg[responceCode] + '</span></p>');
            } else {
              output.text(captchaMsg[responceCode]);
            }

            output.addClass("active error");
            captchaFlag = false;
          }
        })
        .fail(function () {
          if (output.hasClass("snackbars")) {
            output.html('<p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>Captcha validation failed. Please try again.</span></p>');
          } else {
            output.text('Captcha validation failed. Please try again.');
          }

          output.addClass("active error");
          captchaFlag = false;
        });

      return captchaFlag;
    }

    function parseMailFormJson(rawText) {
      if (typeof rawText !== 'string' || !rawText.trim()) {
        return null;
      }

      try {
        return JSON.parse(rawText);
      } catch (error) {
        return null;
      }
    }

    function setMailFormPendingState(form, output) {
      form.addClass('form-in-process');

      if (output.hasClass("snackbars")) {
        output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
        output.addClass("active");
      } else {
        output.text('Sending').addClass("active");
      }
    }

    function submitMailForm(form, fallbackMessages) {
      var output = getMailFormOutput(form),
        inputs = form.find("[data-constraints]"),
        captcha = form.find('.recaptcha'),
        action = form.attr("action") || "bat/rd-mailform.php",
        method = String(form.attr("method") || "POST").toUpperCase(),
        formType = form.attr("data-form-type") || form.find('input[name="form-type"]').val() || "contact";

      prepareMailForm(form);
      clearMailFormServerFieldErrors(form);
      output.removeClass("active error success");

      if (!isValidated(inputs, captcha)) {
        renderMailFormResult(form, output, {
          code: 'MF005',
          raw: '',
          requestId: '',
          message: fallbackMessages.MF005
        }, fallbackMessages);
        return;
      }

      if (!verifyMailFormCaptcha(form, output)) {
        return;
      }

      if (form.data("mailformSubmitting")) {
        return;
      }

      var formData = new FormData(form[0]);
      formData.set("form-type", formType);

      form.data("mailformSubmitting", true);
      setMailFormPendingState(form, output);

      fetch(action, {
        method: method,
        body: formData,
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
        .then(function (response) {
          return response.text().then(function (rawText) {
            var payload = parseMailFormJson(rawText),
              normalizedResult = normalizeMailFormResult({
                code: payload && typeof payload.code === 'string' ? payload.code : '',
                message: payload && typeof payload.message === 'string' ? payload.message : '',
                requestId: response.headers.get('X-Rafin-Mail-Request-Id') || '',
                fields: payload && $.isArray(payload.fields) ? payload.fields : [],
                raw: rawText
              });

            if (captcha.length && typeof grecaptcha !== "undefined") {
              grecaptcha.reset();
            }

            form.data("mailformSubmitting", false);
            renderMailFormResult(form, output, normalizedResult, fallbackMessages);
          });
        })
        .catch(function () {
          if (captcha.length && typeof grecaptcha !== "undefined") {
            grecaptcha.reset();
          }

          form.data("mailformSubmitting", false);
          renderMailFormResult(form, output, {
            code: 'MF255',
            raw: '',
            requestId: '',
            message: 'Unable to send the form right now. Please try again later.'
          }, fallbackMessages);
        });
    }

    if (plugins.rdMailForm.length) {
      var i,
        msg = {
          'MF000': 'Message sent successfully.',
          'MF001': 'Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.',
          'MF005': 'Please review the highlighted form fields.',
          'MF006': 'Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.',
          'MF007': 'Submission blocked by anti-spam checks. Please wait and try again.',
          'MF002': 'Unable to send the form right now. Please try again later.',
          'MF003': 'Please review the highlighted form fields.',
          'MF004': 'Unable to process the form submission.',
          'MF254': 'Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.',
          'MF255': 'Unexpected server error. Please try again later.'
        };

      for (i = 0; i < plugins.rdMailForm.length; i++) {
        prepareMailForm($(plugins.rdMailForm[i]));
      }

      $(document)
        .off('submit.rafinMailForm')
        .on('submit.rafinMailForm', '.rd-mailform', function (event) {
          if (isNoviBuilder) {
            return false;
          }

          event.preventDefault();
          submitMailForm($(this), msg);
          return false;
        });
    }


    
    /**
     * Custom Toggles
     */
    if (plugins.customToggle.length) {
      for (var i = 0; i < plugins.customToggle.length; i++) {
        var $this = $(plugins.customToggle[i]);

        $this.on('click', $.proxy(function (event) {
          event.preventDefault();

          var $ctx = $(this);
          $($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
        }, $this));

        if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
          $body.on("click", $this, function (e) {
            if (e.target !== e.data[0]
              && $(e.data.attr('data-custom-toggle')).find($(e.target)).length
              && e.data.find($(e.target)).length === 0) {
              $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
            }
          })
        }

        if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
          $body.on("click", $this, function (e) {
            if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length === 0 && e.data.find($(e.target)).length === 0) {
              $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
            }
          })
        }
      }
    }


    /**
     * jQuery Count To
     * @description Enables Count To plugin
     */
    if (plugins.counter.length) {
      for (var i = 0; i < plugins.counter.length; i++) {
        var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
        $document.on("scroll", $.proxy(function () {
          var $this = this;

          if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
            $this.countTo({
              refreshInterval: 40,
              from: 0,
              to: parseInt($this.text(), 10),
              speed: $this.attr("data-speed") || 1000
            });
            $this.addClass('animated');
          }
        }, $counterNotAnimated))
          .trigger("scroll");
      }
    }


    /**
     * Material Parallax
     * @description Enables Material Parallax plugin
     */
    if (plugins.materialParallax.length) {
      if (!isNoviBuilder && !isIE && !isMobile) {
        plugins.materialParallax.parallax();
      } else {
        for (var i = 0; i < plugins.materialParallax.length; i++) {
          var parallax = $(plugins.materialParallax[i]),
            imgPath = parallax.data("parallax-img");

          parallax.css({
            "background-image": 'url(' + imgPath + ')',
            "background-attachment": "fixed",
            "background-size": "cover"
          });
        }
      }
    }

    /**
     * Select2
     * @description Enables select2 plugin
     */
    if (plugins.selectFilter.length) {
      var i;
      for (i = 0; i < plugins.selectFilter.length; i++) {
        var select = $(plugins.selectFilter[i]);

        select.select2({
          theme: "bootstrap"
        }).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
      }
    }

  
    /**
     * Bootstrap collapse
     *
     */
    var bootstrapCollapse = $('.calendar-box-list-view');
    if (bootstrapCollapse.length) {
      bootstrapCollapse.collapse({
        toggle: false
      });

      $body.on("click", bootstrapCollapse, function () {
        bootstrapCollapse.collapse('hide');
      });
    }

    /**
     * Stepper
     * @description Enables Stepper Plugin
     */
    if (plugins.stepper.length) {
      plugins.stepper.stepper({
        labels: {
          up: "",
          down: ""
        }
      });
    }

    /**
     * Custom Waypoints
     */
    if (plugins.customWaypoints.length) {
      var i;
      for (i = 0; i < plugins.customWaypoints.length; i++) {
        var $this = $(plugins.customWaypoints[i]);
        makeWaypointScroll($this);
      }
    }

    /**
     * JQuery mousewheel plugin
     * @description  Enables jquery mousewheel plugin
     */
    if (plugins.scroller.length) {
      for (var i = 0; i < plugins.scroller.length; i++) {
        var scrollerItem = $(plugins.scroller[i]);

        scrollerItem.mCustomScrollbar({
          theme: scrollerItem.attr('data-theme') ? scrollerItem.attr('data-theme') : 'minimal',
          scrollInertia: 100,
          scrollButtons: {enable: false}
        });
      }
    }

  });

  /**
   * Page loader
   * @description Releases page loader on critical route readiness with a hard fallback
   */
  if (plugins.pageLoader.length) {
    var pageLoaderReleased = false;
    var pageLoaderStartedAt = Date.now();
    var pageLoaderMinVisibleMs = 120;
    var pageLoaderFallbackMs = 1800;
    var pageLoaderPollMs = 40;
    var pageLoaderReadinessTimer = null;
    var pageLoaderFallbackTimer = null;

    function getLoaderRoute() {
      if ($body.hasClass("category-page")) {
        return "category";
      }

      if ($body.hasClass("project-page")) {
        return "project";
      }

      if ($body.hasClass("projects-page")) {
        return "projects";
      }

      return "home";
    }

    function isCriticalRouteReady() {
      var pageRoot = document.querySelector(".page");
      var route = getLoaderRoute();
      var titleText, grid, title, descriptionText;

      if (!pageRoot) {
        return false;
      }

      if (route === "home") {
        return !!(document.querySelector(".page-header .rd-navbar") && document.querySelector("#home .swiper-container, #home.video-hero-section"));
      }

      if (route === "projects") {
        grid = document.getElementById("projects-grid");
        return !!(document.getElementById("project-filters") && grid && grid.childElementCount > 0);
      }

      if (route === "category") {
        title = document.getElementById("category-title");
        grid = document.getElementById("category-projects-grid");
        titleText = title ? $.trim(title.textContent || "") : "";
        return !!(title && grid && grid.childElementCount > 0 && titleText && titleText !== "Loading...");
      }

      if (route === "project") {
        title = document.getElementById("project-title");
        titleText = title ? $.trim(title.textContent || "") : "";
        descriptionText = $.trim($("#project-description").text() || "");
        return !!(title && (descriptionText.length > 0 || (titleText && titleText !== "Loading...")));
      }

      return true;
    }

    function revealPageLoader() {
      var elapsed, remainingDelay;

      if (pageLoaderReleased) {
        return;
      }

      pageLoaderReleased = true;

      if (pageLoaderReadinessTimer) {
        clearInterval(pageLoaderReadinessTimer);
        pageLoaderReadinessTimer = null;
      }

      if (pageLoaderFallbackTimer) {
        clearTimeout(pageLoaderFallbackTimer);
        pageLoaderFallbackTimer = null;
      }

      elapsed = Date.now() - pageLoaderStartedAt;
      remainingDelay = Math.max(0, pageLoaderMinVisibleMs - elapsed);

      setTimeout(function () {
        plugins.pageLoader.addClass("loaded");
        $window.trigger("resize");
      }, remainingDelay);
    }

    function startPageLoaderReadinessChecks() {
      if (isCriticalRouteReady()) {
        revealPageLoader();
        return;
      }

      pageLoaderReadinessTimer = setInterval(function () {
        if (isCriticalRouteReady()) {
          revealPageLoader();
        }
      }, pageLoaderPollMs);
    }

    pageLoaderFallbackTimer = setTimeout(function () {
      revealPageLoader();
    }, pageLoaderFallbackMs);

    if (document.readyState === "loading") {
      var onDomReady = function () {
        document.removeEventListener("DOMContentLoaded", onDomReady);
        startPageLoaderReadinessChecks();
      };

      document.addEventListener("DOMContentLoaded", onDomReady);
    } else {
      startPageLoaderReadinessChecks();
    }

    $window.on("load.pageLoader", function () {
      revealPageLoader();
    });
  }

}());

document.addEventListener("DOMContentLoaded", function () {
  var mobileNavQuery = window.matchMedia("(max-width: 1199px)");
  var navbars = document.querySelectorAll(".page-header .rd-navbar");

  function normalizePath(pathname) {
    var normalized = pathname || "/";

    normalized = normalized.replace(/\/index\.html$/i, "/");
    normalized = normalized.replace(/\/+$/, "");

    return normalized || "/";
  }

  function isMobileNav() {
    return mobileNavQuery.matches;
  }

  function getTopLevelItem(link, navbar) {
    var currentItem = link ? link.closest("li") : null;

    while (currentItem && currentItem.parentElement && !currentItem.parentElement.classList.contains("rd-navbar-nav")) {
      currentItem = currentItem.parentElement.closest("li");
    }

    return currentItem && navbar.contains(currentItem) ? currentItem : null;
  }

  function clearActiveItems(navbar) {
    navbar.querySelectorAll(".rd-navbar-nav li.active").forEach(function (item) {
      item.classList.remove("active");
    });
  }

  function setActiveItem(navbar, link) {
    var topLevelItem = getTopLevelItem(link, navbar);
    var nestedItem = link ? link.closest("li") : null;

    if (!topLevelItem) {
      return;
    }

    clearActiveItems(navbar);
    topLevelItem.classList.add("active");

    if (nestedItem && nestedItem !== topLevelItem) {
      nestedItem.classList.add("active");
    }
  }

  function closeMobileNav(navbar) {
    var toggle = navbar.querySelector(".rd-navbar-toggle");
    var navWrap = navbar.querySelector(".rd-navbar-nav-wrap");

    if (toggle) {
      toggle.classList.remove("active");
    }

    if (navWrap) {
      navWrap.classList.remove("active");
    }

    navbar.querySelectorAll(".rd-navbar-submenu.opened, .rd-navbar-submenu.focus").forEach(function (item) {
      item.classList.remove("opened", "focus");
    });
  }

  function syncActiveItem(navbar) {
    var currentPath = normalizePath(window.location.pathname);
    var currentHash = window.location.hash;
    var matchedLink = null;
    var relatedPathFallbacks = {
      "/category.html": "projects.html",
      "/project.html": "projects.html"
    };

    navbar.querySelectorAll(".rd-navbar-nav a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      var url;
      var linkPath;

      if (!href || href === "#") {
        return;
      }

      try {
        url = new URL(href, window.location.href);
      } catch (error) {
        return;
      }

      linkPath = normalizePath(url.pathname);

      if (url.hash && linkPath === currentPath && url.hash === currentHash) {
        matchedLink = link;
        return;
      }

      if (!matchedLink && !url.hash && linkPath === currentPath) {
        matchedLink = link;
      }
    });

    clearActiveItems(navbar);

    if (!matchedLink && relatedPathFallbacks[currentPath]) {
      matchedLink = navbar.querySelector('.rd-navbar-nav a[href="' + relatedPathFallbacks[currentPath] + '"]');
    }

    if (matchedLink) {
      setActiveItem(navbar, matchedLink);
    }
  }

  navbars.forEach(function (navbar) {
    navbar.querySelectorAll(".rd-navbar-nav a[href]").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!isMobileNav()) {
          return;
        }

        setActiveItem(navbar, link);

        window.setTimeout(function () {
          closeMobileNav(navbar);
        }, 0);
      });
    });

    syncActiveItem(navbar);
  });

  window.addEventListener("hashchange", function () {
    navbars.forEach(syncActiveItem);
  });

  window.addEventListener("resize", function () {
    if (!isMobileNav()) {
      navbars.forEach(closeMobileNav);
    }
  });
});
