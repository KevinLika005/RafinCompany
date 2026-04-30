const contacts = {
  status: "phase-4-production-contact",
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
    },
    openLocationLabel: {
      en: "Open Location",
      sq: "Hap Vendndodhjen"
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
      googleMapsUrl:
        "https://maps.app.goo.gl/sSJKcZmiTMZPzwa77?g_st=com.apple.sharing.quick-note",
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=19.7949295%2C41.3080490%2C19.8149295%2C41.3280490&layer=mapnik&marker=41.3180490%2C19.8049295",
      mapTitle: {
        en: "Rafin Head Office map",
        sq: "Harta e zyres qendrore Rafin"
      }
    },
    {
      id: "location-2",
      name: {
        en: "Operations Hub - Durres",
        sq: "Qender Operacionesh - Durres"
      },
      address: {
        en: "Durres, Albania.",
        sq: "Durres, Shqiperi."
      },
      googleMapsUrl:
        "https://maps.app.goo.gl/Up7AUjJq8FXWLLUg6?g_st=aw",
      mapEmbedUrl:
        "https://www.openstreetmap.org/export/embed.html?bbox=19.7042718%2C41.2689567%2C19.7242718%2C41.2889567&layer=mapnik&marker=41.2789567%2C19.7142718",
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
      cv: {
        en: "Ngarko CV / Dokument",
        sq: "Ngarko CV / Dokument"
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
