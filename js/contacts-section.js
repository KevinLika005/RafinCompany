(function () {
  const MOUNT_ID = "contacts-section-container";

  function initContactsSectionShell() {
    const mount = document.getElementById(MOUNT_ID);
    if (!mount) return;

    mount.setAttribute("data-phase", "2");
    mount.setAttribute("data-shell", "contacts");
  }

  window.RafinSections = window.RafinSections || {};
  window.RafinSections.initContactsSectionShell = initContactsSectionShell;
})();
