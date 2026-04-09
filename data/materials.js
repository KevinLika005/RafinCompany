const materials = {
  status: "phase-3-seeded-awaiting-client-final-list",
  section: {
    eyebrow: {
      en: "Material Strategy",
      sq: "Strategjia e Materialeve"
    },
    title: {
      en: "Building Materials",
      sq: "Materiale Ndertimi"
    },
    intro: {
      en: "Rafin sources materials through audited suppliers and technical controls to keep infrastructure projects durable, safe, and efficient.",
      sq: "Rafin furnizohet me materiale nga furnitore te kontrolluar dhe mbikqyrje teknike per te mbajtur projektet e infrastruktures te qendrueshme, te sigurta dhe efikase."
    },
    recyclingNote: {
      en: "Construction material recycling is integrated into planning and site operations to reduce waste and recover reusable value.",
      sq: "Riciklimi i materialeve te ndertimit integrohet ne planifikim dhe ne operacionet ne terren per te ulur mbetjet dhe per te rikuperuar vlere te riperdorshme."
    },
    ctaLabel: {
      en: "Request Material Information",
      sq: "Kerko Informacion per Materialet"
    },
    ctaHref: "#contacts"
  },
  items: [
    {
      id: "materials-1",
      title: {
        en: "Concrete and Structural Systems",
        sq: "Sisteme Betoni dhe Strukturore"
      },
      summary: {
        en: "High-strength concrete mixes and steel-reinforced solutions for public and industrial assets.",
        sq: "Perzierje betoni me rezistence te larte dhe zgjidhje te armuara me celik per vepra publike dhe industriale."
      },
      image: "images/home-1-652x491.jpg",
      imageAlt: {
        en: "Concrete and structural works",
        sq: "Punime betoni dhe strukturore"
      },
      order: 1
    },
    {
      id: "materials-2",
      title: {
        en: "Road Infrastructure Layers",
        sq: "Shtresa te Infrastruktures Rrugore"
      },
      summary: {
        en: "Aggregates, base layers, and compaction-ready materials for long-life transport corridors.",
        sq: "Agregate, shtresa baze dhe materiale te gatshme per kompaktesim per korridore transporti me jete te gjate."
      },
      image: "images/infrastucture/mo2.jpg",
      imageAlt: {
        en: "Road infrastructure materials",
        sq: "Materiale per infrastrukture rrugore"
      },
      order: 2
    },
    {
      id: "materials-3",
      title: {
        en: "Water Supply Components",
        sq: "Komponente per Furnizim me Uje"
      },
      summary: {
        en: "Pressure-rated PE pipes and fittings selected for municipal and utility-grade performance.",
        sq: "Tuba PE dhe aksesore me klase presioni te zgjedhur per performance komunale dhe utility."
      },
      image: "images/materials/PE-Water-Supply-Pipes.jpg",
      imageAlt: {
        en: "Water supply pipes and components",
        sq: "Tuba dhe komponente te furnizimit me uje"
      },
      order: 3
    },
    {
      id: "materials-4",
      title: {
        en: "Electro-Mechanical Equipment",
        sq: "Pajisje Elektro-Mekanike"
      },
      summary: {
        en: "Transformers, pumps, and control hardware for power and utility infrastructure.",
        sq: "Transformatore, pompa dhe hardware kontrolli per infrastrukture energjie dhe sherbimesh."
      },
      image: "images/equipement/transformator.jpg",
      imageAlt: {
        en: "Electro-mechanical equipment",
        sq: "Pajisje elektro-mekanike"
      },
      order: 4
    }
  ]
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.materials = materials;
}
