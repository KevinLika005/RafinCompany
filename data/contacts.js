const contacts = {
  status: "blocked-pending-client-map-locations",
  section: {
    title: {
      en: "Contacts",
      sq: "Kontakte"
    },
    intro: {
      en: "Placeholder structure for contact form and two map locations.",
      sq: "Strukture e perkohshme per formularin e kontaktit dhe dy vendndodhje harte."
    }
  },
  locations: [
    {
      id: "location-1",
      name: {
        en: "Location 1",
        sq: "Vendndodhja 1"
      },
      address: {
        en: "Pending client-provided address.",
        sq: "Adresa ne pritje nga klienti."
      },
      mapEmbedUrl: null,
      mapTitle: {
        en: "Location 1 map",
        sq: "Harta e vendndodhjes 1"
      }
    },
    {
      id: "location-2",
      name: {
        en: "Location 2",
        sq: "Vendndodhja 2"
      },
      address: {
        en: "Pending client-provided address.",
        sq: "Adresa ne pritje nga klienti."
      },
      mapEmbedUrl: null,
      mapTitle: {
        en: "Location 2 map",
        sq: "Harta e vendndodhjes 2"
      }
    }
  ],
  form: {
    action: "bat/rd-mailform.php",
    method: "post"
  }
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.contacts = contacts;
}
