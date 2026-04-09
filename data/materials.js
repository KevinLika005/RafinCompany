const materials = {
  status: "blocked-pending-client-material-list",
  section: {
    title: {
      en: "Building Materials",
      sq: "Materiale Ndertimi"
    },
    intro: {
      en: "Structured content placeholder for the upcoming materials section.",
      sq: "Permbajtje e perkohshme per seksionin e ardhshem te materialeve."
    },
    recyclingNote: {
      en: "Recycling and sustainability note placeholder.",
      sq: "Shenim i perkohshem per riciklimin dhe qendrueshmerine."
    }
  },
  items: []
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.materials = materials;
}
