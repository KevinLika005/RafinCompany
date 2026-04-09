const contacts = {
  status: "phase-3-ready-with-provisional-second-location",
  section: {
    eyebrow: {
      en: "Contact & Locations",
      sq: "Kontakt dhe Vendndodhje"
    },
    title: {
      en: "Contacts",
      sq: "Kontakte"
    },
    intro: {
      en: "Share your project needs and our team will get back to you quickly with the right department.",
      sq: "Ndani nevojat e projektit dhe ekipi yne do tju ktheje pergjigje shpejt me departamentin e duhur."
    }
  },
  locations: [
    {
      id: "location-1",
      name: {
        en: "Head Office - Tirane",
        sq: "Zyra Qendrore - Tirane"
      },
      address: {
        en: "Rruga Haxhi Kika, Administrative Unit No. 5, Property No. 6/538 H 1, Apartment 4, Tirane.",
        sq: "Rruga Haxhi Kika, Njesia Administrative Nr. 5, Prona Nr. 6/538 H 1, Apartamenti 4, Tirane."
      },
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=19.7930%2C41.3120%2C19.8440%2C41.3425&layer=mapnik&marker=41.3275%2C19.8187",
      mapTitle: {
        en: "Rafin Head Office map",
        sq: "Harta e zyres qendrore Rafin"
      }
    },
    {
      id: "location-2",
      name: {
        en: "Operations Hub - Durres (Provisional)",
        sq: "Qender Operacionesh - Durres (Perkohesisht)"
      },
      address: {
        en: "Second client location pending final confirmation. Current map is provisional for layout validation.",
        sq: "Vendndodhja e dyte eshte ne pritje te konfirmimit final nga klienti. Harta aktuale eshte provizore per validim layout-i."
      },
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=19.4110%2C41.2920%2C19.4850%2C41.3490&layer=mapnik&marker=41.3231%2C19.4414",
      mapTitle: {
        en: "Rafin Operations Hub map",
        sq: "Harta e qendres operacionale Rafin"
      }
    }
  ],
  form: {
    action: "bat/rd-mailform.php",
    method: "post",
    title: {
      en: "Send a Message",
      sq: "Dergo Mesazh"
    },
    fields: {
      name: {
        en: "Name",
        sq: "Emri"
      },
      phone: {
        en: "Phone",
        sq: "Telefoni"
      },
      email: {
        en: "E-Mail",
        sq: "E-Mail"
      },
      message: {
        en: "Message",
        sq: "Mesazhi"
      }
    },
    submitLabel: {
      en: "Send",
      sq: "Dergo"
    }
  }
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.contacts = contacts;
}
