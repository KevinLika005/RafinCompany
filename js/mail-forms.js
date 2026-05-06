"use strict";

(function () {
  var READY_MARKER = "mailFormsReady";
  var FALLBACK_ERROR_MESSAGE = "The form could not be submitted. Please review the fields and try again.";
  var FORM_SELECTOR = "form.rd-mailform";
  var DEFAULT_MESSAGES = {
    MF000: "Message sent successfully.",
    MF001: "Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.",
    MF004: "The form could not be submitted. Please review the fields and try again.",
    MF005: "Please review the highlighted form fields.",
    MF006: "Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.",
    MF007: "Submission blocked by anti-spam checks. Please wait and try again.",
    MF254: "Mail delivery is temporarily unavailable. Please try again later or contact info@rafincompany.com.",
    MF255: "Unexpected server error. Please try again later."
  };
  var DEFAULT_FIELD_MESSAGES = {
    name: "Please enter your name.",
    phone: "Please enter a valid phone number.",
    email: "Please enter a valid email address.",
    message: "Please enter a message.",
    job_position: "Please select a job position.",
    cv: "Please upload a PDF, DOC, or DOCX file up to 5 MB."
  };

  function trimValue(value) {
    return String(value == null ? "" : value).trim();
  }

  function compactWhitespace(value) {
    return trimValue(value).replace(/\s+/g, " ");
  }

  function clearFieldError(field) {
    var validation;

    if (!field) {
      return;
    }

    field.setCustomValidity("");
    if (field.parentNode) {
      field.parentNode.classList.remove("has-error");
      validation = field.parentNode.querySelector(".form-validation");
      if (validation) {
        validation.textContent = "";
      }
    }
  }

  function setFieldError(field, message) {
    if (!field) {
      return false;
    }

    field.setCustomValidity(message);
    if (field.parentNode) {
      field.parentNode.classList.add("has-error");
    }
    return true;
  }

  function setVisibleFieldError(field, message) {
    var validation;

    if (!setFieldError(field, message)) {
      return false;
    }

    if (field.parentNode) {
      validation = field.parentNode.querySelector(".form-validation");
      if (validation) {
        validation.textContent = message;
      }
    }

    return true;
  }

  function getTimestamp() {
    return String(Math.floor(Date.now() / 1000));
  }

  function ensureField(form, selector, factory) {
    var field = form.querySelector(selector);
    if (!field) {
      field = factory();
      form.appendChild(field);
    }
    return field;
  }

  function ensureAntiSpamFields(form) {
    ensureField(form, 'input[name="company_website"]', function () {
      var honeypot = document.createElement("input");
      honeypot.type = "text";
      honeypot.name = "company_website";
      honeypot.className = "form-honeypot";
      honeypot.tabIndex = -1;
      honeypot.autocomplete = "off";
      honeypot.setAttribute("aria-hidden", "true");
      return honeypot;
    });

    var startedAt = ensureField(form, 'input[name="form_started_at"]', function () {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = "form_started_at";
      return input;
    });

    if (!/^\d{10}$/.test(String(startedAt.value || ""))) {
      startedAt.value = getTimestamp();
    }
  }

  function getOutputElement(form) {
    var outputId = form.getAttribute("data-form-output");
    if (outputId) {
      return document.getElementById(outputId);
    }

    return document.getElementById("form-output-global");
  }

  function clearOutputState(output) {
    if (!output) {
      return;
    }

    output.classList.remove("active", "error", "success");
  }

  function renderOutput(output, message, isSuccess) {
    if (!output) {
      return;
    }

    clearOutputState(output);

    if (output.classList.contains("snackbars")) {
      if (isSuccess) {
        output.innerHTML = '<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + escapeHtml(message) + "</span></p>";
      } else {
        output.innerHTML = '<p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + escapeHtml(message) + "</span></p>";
      }

      output.classList.add("active");
    } else {
      output.textContent = message;
      output.classList.add("active", isSuccess ? "success" : "error");
    }
  }

  function renderPendingOutput(output) {
    if (!output) {
      return;
    }

    clearOutputState(output);

    if (output.classList.contains("snackbars")) {
      output.innerHTML = '<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>';
      output.classList.add("active");
    } else {
      output.textContent = "Sending";
      output.classList.add("active");
    }
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function scheduleOutputReset(output, form) {
    window.setTimeout(function () {
      clearOutputState(output);
      if (form) {
        form.classList.remove("success", "form-in-process");
      }
    }, 3500);
  }

  function parseResponsePayload(rawText, response) {
    var code = "";
    var message = "";
    var payload = null;
    var fields = [];

    if (typeof rawText === "string" && rawText.trim()) {
      try {
        payload = JSON.parse(rawText);
      } catch (error) {
        payload = null;
      }
    }

    if (payload && typeof payload.code === "string") {
      code = payload.code;
      if (typeof payload.message === "string") {
        message = payload.message;
      }
      if (Array.isArray(payload.fields)) {
        fields = payload.fields.filter(function (fieldName) {
          return typeof fieldName === "string" && /^[a-zA-Z0-9_-]+$/.test(fieldName);
        });
      }
    }

    if (!code && response && response.headers) {
      code = response.headers.get("X-Rafin-Mail-Code") || "";
    }

    if (!code && typeof rawText === "string") {
      var match = rawText.match(/MF\d{3}/);
      code = match ? match[0] : "";
    }

    if (!code) {
      code = "MF255";
    }

    return {
      code: code,
      message: message || DEFAULT_MESSAGES[code] || DEFAULT_MESSAGES.MF255,
      fields: fields
    };
  }

  function applyServerFieldErrors(form, fields) {
    var firstInvalidField = null;

    if (!Array.isArray(fields) || !fields.length) {
      return;
    }

    fields.forEach(function (fieldName) {
      var field = form.querySelector('[name="' + fieldName + '"]');
      var message = DEFAULT_FIELD_MESSAGES[fieldName] || DEFAULT_MESSAGES.MF005;

      if (setVisibleFieldError(field, message)) {
        firstInvalidField = firstInvalidField || field;
      }
    });

    if (firstInvalidField && typeof firstInvalidField.focus === "function") {
      firstInvalidField.focus();
    }

    if (typeof form.reportValidity === "function") {
      form.reportValidity();
    }
  }

  function resetFormAfterSuccess(form) {
    form.reset();
    ensureAntiSpamFields(form);
  }

  function showFallbackStatusMessage() {
    var url = new URL(window.location.href);
    var status = url.searchParams.get("formStatus");

    if (status !== "error") {
      return;
    }

    renderOutput(document.getElementById("form-output-global"), FALLBACK_ERROR_MESSAGE, false);
    url.searchParams.delete("formStatus");
    history.replaceState({}, document.title, url.pathname + url.search + url.hash);
  }

  function validateForm(form, output) {
    var nameField = form.querySelector('[name="name"]');
    var emailField = form.querySelector('[name="email"]');
    var phoneField = form.querySelector('[name="phone"]');
    var messageField = form.querySelector('[name="message"]');
    var jobPositionField = form.querySelector('[name="job_position"]');
    var fileField = form.querySelector('input[type="file"][name="cv"]');
    var invalidField = null;
    var digits;
    var phone;
    var plusCount;
    var plusPosition;
    var extension;
    var file;
    var allowedExtensions = { pdf: true, doc: true, docx: true };

    Array.prototype.forEach.call(form.elements, function (field) {
      if (field && typeof field.setCustomValidity === "function") {
        clearFieldError(field);
      }
    });

    if (nameField) {
      if (compactWhitespace(nameField.value).length < 2) {
        invalidField = invalidField || nameField;
        setFieldError(nameField, "Please enter at least 2 characters.");
      }
    }

    if (emailField) {
      emailField.value = trimValue(emailField.value);
      if (!emailField.value || !emailField.checkValidity()) {
        invalidField = invalidField || emailField;
        setFieldError(emailField, "Please enter a valid email address.");
      }
    }

    if (phoneField) {
      phone = compactWhitespace(phoneField.value);
      digits = phone.replace(/\D+/g, "");
      plusCount = (phone.match(/\+/g) || []).length;
      plusPosition = phone.indexOf("+");

      if (!phone || /[^0-9+\s().-]/.test(phone) || digits.length < 7 || digits.length > 15 || plusCount > 1 || (plusCount === 1 && plusPosition !== 0 && !(plusPosition === 1 && phone.indexOf("(+") === 0))) {
        invalidField = invalidField || phoneField;
        setFieldError(phoneField, "Please enter a valid phone number.");
      } else {
        phoneField.value = phone;
      }
    }

    if (messageField) {
      if (trimValue(messageField.value).replace(/\s+/g, "").length < 5) {
        invalidField = invalidField || messageField;
        setFieldError(messageField, "Please enter a longer message.");
      }
    }

    if (jobPositionField && !trimValue(jobPositionField.value)) {
      invalidField = invalidField || jobPositionField;
      setFieldError(jobPositionField, "Please select a job position.");
    }

    if (fileField && fileField.files && fileField.files.length > 0) {
      file = fileField.files[0];
      extension = "";

      if (file && file.name.indexOf(".") !== -1) {
        extension = file.name.split(".").pop().toLowerCase();
      }

      if (!allowedExtensions[extension]) {
        invalidField = invalidField || fileField;
        setFieldError(fileField, "Please upload a PDF, DOC, or DOCX file.");
      } else if (file.size <= 0 || file.size > 5 * 1024 * 1024) {
        invalidField = invalidField || fileField;
        setFieldError(fileField, "The selected file must be 5 MB or smaller.");
      }
    }

    if (!invalidField && form.checkValidity()) {
      return true;
    }

    renderOutput(output, DEFAULT_MESSAGES.MF005, false);
    if (typeof form.reportValidity === "function") {
      form.reportValidity();
    }
    if (invalidField && typeof invalidField.focus === "function") {
      invalidField.focus();
    }
    scheduleOutputReset(output, form);
    return false;
  }

  function handleSubmit(event) {
    var form = event.target instanceof HTMLFormElement ? event.target : event.target && event.target.closest ? event.target.closest(FORM_SELECTOR) : null;
    var output;
    var formData;
    var action;
    var formType;

    if (!form || !form.matches(FORM_SELECTOR)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === "function") {
      event.stopImmediatePropagation();
    }

    output = getOutputElement(form);
    clearOutputState(output);

    if (form.dataset.mailFormSubmitting === "true") {
      return;
    }

    ensureAntiSpamFields(form);

    if (!validateForm(form, output)) {
      return;
    }

    formData = new FormData(form);
    formType = form.getAttribute("data-form-type") || formData.get("form-type") || "contact";
    formData.set("form-type", formType);

    form.dataset.mailFormSubmitting = "true";
    form.classList.add("form-in-process");
    renderPendingOutput(output);

    action = form.getAttribute("action") || "bat/rd-mailform.php";

    fetch(action, {
      method: String(form.getAttribute("method") || "post").toUpperCase(),
      body: formData,
      credentials: "same-origin",
      headers: {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    })
      .then(function (response) {
        return response.text().then(function (rawText) {
          return {
            response: response,
            rawText: rawText
          };
        });
      })
      .then(function (result) {
        var normalized = parseResponsePayload(result.rawText, result.response);
        var isSuccess = normalized.code === "MF000";

        form.dataset.mailFormSubmitting = "false";
        form.classList.remove("form-in-process");
        form.classList.toggle("success", isSuccess);
        renderOutput(output, normalized.message, isSuccess);

        if (isSuccess) {
          resetFormAfterSuccess(form);
        } else {
          applyServerFieldErrors(form, normalized.fields);
        }

        scheduleOutputReset(output, form);
      })
      .catch(function () {
        form.dataset.mailFormSubmitting = "false";
        form.classList.remove("form-in-process");
        renderOutput(output, DEFAULT_MESSAGES.MF255, false);
        scheduleOutputReset(output, form);
      });
  }

  function primeExistingForms() {
    var forms = document.querySelectorAll(FORM_SELECTOR);
    var index;

    for (index = 0; index < forms.length; index += 1) {
      ensureAntiSpamFields(forms[index]);
    }
  }

  function init() {
    primeExistingForms();
    showFallbackStatusMessage();
    document.documentElement.dataset[READY_MARKER] = "true";
  }

  document.addEventListener("submit", handleSubmit, true);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());
