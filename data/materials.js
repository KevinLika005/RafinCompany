const materials = {
  status: "phase-3-materials-finalized",
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
        en: "Concrete Production",
        sq: "Prodhim Betoni"
      },
      summary: {
        en: "Concrete production for civil, infrastructure, and industrial projects with technical quality control.",
        sq: "Prodhim betoni për projekte civile, infrastrukturore dhe industriale me kontroll teknik të cilësisë."
      },
      image: "images/materials/concrete-production.jpg",
      imageAlt: {
        en: "Concrete mixer truck and production materials at a construction site",
        sq: "Autobetonierë dhe materiale për prodhim betoni në një kantier ndërtimi"
      },
      order: 1
    },
    {
      id: "materials-2",
      title: {
        en: "Aggregates Production",
        sq: "Prodhim Inertesh"
      },
      summary: {
        en: "Processing and supply of aggregates for construction, roads, and infrastructure base layers.",
        sq: "Përpunim dhe furnizim inertesh për ndërtim, rrugë dhe shtresa infrastrukturore."
      },
      image: "images/materials/aggregates-production.jpg",
      imageAlt: {
        en: "Aggregate processing conveyors and gravel stockpiles at an industrial quarry",
        sq: "Rripa transportues inertesh dhe grumbuj zhavorri në një gurore industriale"
      },
      order: 2
    },
    {
      id: "materials-3",
      title: {
        en: "Asphalt Production",
        sq: "Prodhim Asfalti"
      },
      summary: {
        en: "Asphalt production for roads, industrial yards, and public projects with high implementation standards.",
        sq: "Prodhim asfalti për rrugë, sheshe industriale dhe projekte publike me standarde të larta zbatimi."
      },
      image: "images/materials/asphalt-production.jpg",
      imageAlt: {
        en: "Road roller compacting fresh asphalt on a construction project",
        sq: "Rul kompaktues mbi asfalt të freskët në një projekt rrugor"
      },
      order: 3
    }
  ]
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.materials = materials;
}
