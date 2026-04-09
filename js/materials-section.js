(function () {
  const MOUNT_ID = "materials-section-container";

  function initMaterialsSectionShell() {
    const mount = document.getElementById(MOUNT_ID);
    if (!mount) return;

    mount.setAttribute("data-phase", "2");
    mount.setAttribute("data-shell", "materials");
  }

  window.RafinSections = window.RafinSections || {};
  window.RafinSections.initMaterialsSectionShell = initMaterialsSectionShell;
})();
