document.addEventListener("DOMContentLoaded", () => {
  if (!window.I18n || typeof window.I18n.getCurrentLanguage !== "function") return;
  if (window.I18n.getCurrentLanguage() !== "en") return;

  const projects = window.siteData?.projects;
  if (!Array.isArray(projects) || projects.length === 0) return;

  const englishProjects = {
    "liqeni-farkes-pedonale-piste-vrapimi": {
      title: "Construction of pedestrian walkways, a running track, and bicycle lanes at Farka Lake",
      client: "Municipality of Tirana",
      excerpt: "Transformation of the Farka Lake area into a recreational space with a running track, bicycle lanes, and dedicated sidewalks.",
      description: "The project transformed the Farka Lake area into a modern recreational and tourist destination with infrastructure dedicated to outdoor activities.",
      location: "Farka Lake, Tirana",
      paragraphs: [
        "The development project for the Farka Lake area transformed the site into a modern recreational and tourist destination for residents and visitors.",
        "Dedicated outdoor activity infrastructure was built around the lake, turning the area into an active space for sport, relaxation, and outdoor activities for all ages."
      ],
      metrics: [
        "Running track and bicycle lanes with a length of 6,300 linear meters",
        "Stamped concrete sidewalks covering approximately 16,745 m2",
        "Construction of a pier near Helen Park"
      ]
    },
    "garnizoni-skenderbej-infrastruktura": {
      title: "Infrastructure improvement at the Skanderbeg Garrison",
      client: "General Staff of the Armed Forces - Military Unit no. 6630",
      excerpt: "A multifunctional infrastructure project with interventions in roads, squares, buildings, and sports areas inside the Skanderbeg Garrison.",
      description: "The project includes integrated interventions in roads, squares, buildings, and sports areas to improve functionality, safety, and service standards inside the garrison.",
      location: "Skanderbeg Garrison",
      paragraphs: [
        "The infrastructure improvement at the Skanderbeg Garrison is a multifunctional infrastructure project covering integrated works on roads, squares, buildings, and sports areas.",
        "In addition to construction and sports works, the whole project area includes outdoor lighting, stormwater drainage systems, technical installations built to contemporary standards, and a CCTV safety camera system."
      ],
      metrics: [
        "Ceremonial square covering 1,200 m2",
        "Road axes and service areas with new asphalt layers over 5,600 m2",
        "Sports complex with a total area of 12,220 m2",
        "Running track with tartan surface covering 3,500 m2",
        "Football field with artificial grass covering 7,100 m2",
        "Volleyball and basketball court covering 703 m2",
        "Tennis court covering 672 m2",
        "Construction of the new Postblock no. 4 building with a reinforced concrete structure"
      ]
    },
    "parku-mbyllur-hmmwv": {
      title: "Construction of the enclosed parking facility (B) for armored vehicles (HMMWV)",
      client: "Land Forces Command (Military Unit no. 1001)",
      excerpt: "Construction of an enclosed parking facility for HMMWV armored vehicles, with high parking capacity and supporting technical systems.",
      description: "The project includes the enclosed HMMWV parking facility, the access and parking yard, and the technical inspection building with its related systems.",
      paragraphs: [
        "This project includes construction works for the enclosed parking facility for armored vehicles, built with metal structures anchored into concrete footings and covered with sandwich panels on the roof and side walls.",
        "The project also delivered the technical inspection building, electrical installations, fire protection system, and sewerage and rainwater management systems."
      ],
      metrics: [
        "Built area of 11,000 m2",
        "Capacity for up to 87 armored vehicles",
        "Access and parking yard covering 6,800 m2",
        "Floor designed with technical layers for heavy load capacity"
      ]
    },
    "rruga-fshatit-dritas": {
      title: "Road rehabilitation and asphalt paving for Dritas village",
      client: "Tirana Regional Council",
      excerpt: "Construction and rehabilitation of the Dritas village road in Zall Herr, with a complete road package and safety elements.",
      description: "The project included the construction and rehabilitation of the Dritas village road, bringing it up to the standards and needs of the community.",
      location: "Dritas, Zall Herr, Tirana",
      paragraphs: [
        "This project included the construction and rehabilitation of the Dritas village road in the Zall Herr Administrative Unit, Municipality of Tirana.",
        "The works included road profiling, the complete road layer package, rehabilitation of irrigation channels, and installation of horizontal and vertical signage plus protective guardrails where improved road safety was required."
      ],
      metrics: [
        "Two segments with lengths of 2,175 linear meters and 450 linear meters",
        "Total length of 2,625 linear meters",
        "Asphalt layers covering 13,000 m2",
        "Construction of shoulders, drainage channels, and curbs"
      ]
    },
    "rruga-fshatit-luz-i-madh": {
      title: "Road rehabilitation and asphalt paving for Luz i Madh village",
      client: "Tirana Regional Council",
      excerpt: "Full reconstruction of the Luz i Madh village road in the Municipality of Rrogozhina, with new asphalt layers and road safety elements.",
      description: "The project included the construction and rehabilitation of the Luz i Madh village road, improving the segment's safety, functionality, and durability.",
      location: "Luz i Madh, Rrogozhina",
      paragraphs: [
        "This project included the construction and rehabilitation of the Luz i Madh village road in the Municipality of Rrogozhina.",
        "The works included sub-base and base layers, asphalt layer treatment, construction of shoulders, engineering structures for water management, and installation of the required horizontal and vertical road signage."
      ],
      metrics: [
        "Road segment length of 1,600 linear meters",
        "Asphalt layers covering 8,000 m2"
      ]
    },
    "rruget-kryesore-5-maji-faza-3": {
      title: "Construction of the main roads in the 5 Maji area (Phase 3)",
      client: "Municipality of Tirana",
      excerpt: "Interventions for the construction and reconstruction of the main roads in Administrative Units 4 and 8, in the 5 Maji area.",
      description: "The project includes full intervention in the road infrastructure of the 5 Maji area, including roads, sidewalks, bicycle lanes, lighting, and utility networks.",
      location: "5 Maji area, Tirana",
      paragraphs: [
        "This project includes construction and reconstruction works for the main roads in earthquake-affected areas, specifically Administrative Units no. 4 and 8 in the 5 Maji area.",
        "The works include demolition, excavation, construction of the road body and asphalt layers, bicycle lanes, sidewalks, curbs and gutters, bridges, road lighting, power supply, sewerage, water supply, fire protection, signage, landscaping, and urban elements."
      ],
      metrics: [
        "Construction and reconstruction of road infrastructure in Administrative Units 4 and 8",
        "Delivery of bicycle lanes, sidewalks, curbs, and gutters",
        "Construction and reconstruction of bridges",
        "Installation of road lighting and utility networks"
      ]
    },
    "njesite-banimit-mirdite-rreshen": {
      title: "Reconstruction of housing units in Mirdita",
      client: "Albanian Development Fund",
      excerpt: "Construction of multi-storey residential buildings and point housing units in the new development area in Rreshen.",
      description: "Within the Mirdita reconstruction program, multi-storey residential buildings and point housing units were delivered with complete structural, architectural, and technical finishes.",
      location: "Rreshen, Mirdita",
      paragraphs: [
        "Within the reconstruction project, and in cooperation with other economic operators, multi-storey residential buildings and point housing units were built in the Rreshen Administrative Unit, Municipality of Mirdita.",
        "The works included full structural construction, masonry works, floor layers, plastering, painting, and electrical and hydraulic installations in accordance with the architectural and structural designs."
      ],
      metrics: [
        "6 multi-storey residential buildings",
        "3 above-ground floors plus 1 underground parking level",
        "2 point housing units",
        "Dedicated elevators and vertical circulation for accessibility"
      ]
    },
    "shkolla-lidhja-e-prizrenit": {
      title: "Reconstruction of the Lidhja e Prizrenit 9-year school",
      client: "Municipality of Kamez",
      excerpt: "Construction of the new Lidhja e Prizrenit school building in Babrru Paskuqan, with classrooms, a gym, and modern technical systems.",
      description: "In Babrru Paskuqan, the new Lidhja e Prizrenit school has been built with a functional educational layout, an integrated gym, and contemporary technical and safety systems.",
      location: "Babrru Paskuqan, Kamez",
      paragraphs: [
        "In the Paskuqan Administrative Unit, Municipality of Kamez, the new Lidhja e Prizrenit school was built as a classroom building organized to contemporary standards, with a gym on the upper floor.",
        "The building includes a gypsum-cement facade and external insulation system, stairs and an elevator for full access, plus electrical, plumbing, HVAC, normal and emergency lighting, CCTV, and alarm systems."
      ],
      metrics: [
        "Building with 4 above-ground floors plus 1 underground level",
        "Area of 3,450 m2",
        "Gym with complete acoustic insulation measures",
        "Green areas, volleyball court, and multifunctional stepped seating"
      ]
    },
    "farmacia-shendeti-publik": {
      title: "Reconstruction of the Faculty of Pharmacy and Public Health building",
      client: "University of Medicine, Tirana",
      excerpt: "Full reconstruction of the Faculty of Pharmacy and Public Health building, with structural strengthening and a ventilated HPL facade.",
      description: "The project includes the full reconstruction of the Faculty of Pharmacy and Public Health building, with functional reorganization of the interior and full installation of the engineering systems.",
      location: "Tirana",
      paragraphs: [
        "The project includes the full reconstruction of the Faculty of Pharmacy and Public Health building, with selective demolition, structural strengthening, and functional reorganization of the interior spaces.",
        "A defining element of the project is the ventilated facade with HPL panels and the main entrance with structural glass and an Alucobond-clad canopy, giving the building a distinct architectural identity."
      ],
      metrics: [
        "Building with 4 above-ground floors plus 1 underground level",
        "Total area of approximately 2,975 m2",
        "Ventilated facade with HPL panels over approximately 2,000 m2",
        "Installation of electrical, HVAC, fire protection, CCTV, and access control systems"
      ]
    },
    "bashkia-kamez-parkim-shesh": {
      title: "Construction of a one-level underground parking structure, a three-storey municipal building, and square rehabilitation",
      client: "Municipality of Kamez",
      excerpt: "A new administrative building for the Municipality of Kamez, with underground parking and complete treatment of the surrounding outdoor spaces.",
      description: "The project represents the construction of a contemporary administrative building together with underground parking and square rehabilitation.",
      location: "Kamez",
      paragraphs: [
        "The new Municipality of Kamez building is a completely new facility with three floors and one underground level, designed for institutional functionality and high construction quality.",
        "The building will include a thin travertine facade, rock-wool thermal insulation, electrical and electronic systems, monitoring, photovoltaic panels, and a VRF conditioning system, while the outdoor spaces are treated with exposed aggregate concrete, landscaping, and pergola structures."
      ],
      metrics: [
        "Building area of 2,200 m2",
        "Underground parking covering approximately 3,000 m2",
        "Outdoor space treatment covering approximately 9,000 m2"
      ]
    },
    "kopshti-okshtun": {
      title: "Reconstruction of the Okshtun kindergarten",
      client: "UNDP - United Nations Development Programme",
      excerpt: "Reconstruction of the Okshtun kindergarten under the EU4Schools program, with a focus on accessibility, safety, and energy efficiency.",
      description: "The Okshtun kindergarten was rebuilt to high European standards, with emergency exits, full accessibility, and modern technical and safety systems.",
      location: "Okshtun, Rrogozhina",
      paragraphs: [
        "The Okshtun kindergarten in the village of Okshtun, Municipality of Rrogozhina, is one of 15 educational facilities in reconstruction or repair under the EU4Schools program.",
        "The facility was built with two offset volumes, emergency exits, a ramp and toilets for children with disabilities, a fire protection system, security cameras, an outdoor play area, and high energy efficiency."
      ],
      metrics: [
        "Single-storey building with an area of 93 m2",
        "Heating and cooling system plus LED lighting",
        "Reconstruction according to EU4Schools program standards"
      ]
    },
    "banesat-vaqarr": {
      title: "Construction of 20 individual houses in the Vaqarr administrative unit",
      client: "Municipality of Tirana",
      excerpt: "Recovery of the Vaqarr unit after the earthquake through the construction of 20 individual homes and supporting infrastructure.",
      description: "Under the post-earthquake recovery program, 20 individual homes were completed in Vaqarr with full quality standards and different apartment typologies.",
      location: "Vaqarr, Tirana",
      paragraphs: [
        "As part of post-earthquake housing construction in Albania, the recovery of the Vaqarr unit was made possible through the full mobilization of capacities.",
        "In record time, the individual homes and supporting infrastructure for the beneficiary families were completed to full quality standards."
      ],
      metrics: [
        "20 individual homes in total",
        "9 individual 1+1 homes",
        "6 individual 2+1 homes",
        "5 individual 3+1 homes"
      ]
    },
    "kabinat-20kv-tirane": {
      title: "Reconstruction of the 20 kV cabins of the Kashar, Qender, Selita, Traktora, Rajonal, and Farka substations",
      client: "Tirana Regional Directorate / OSSH sh.a",
      excerpt: "Reconstruction of 140 electrical cabins in several areas of Tirana to reduce network losses and improve supply security.",
      description: "The project includes the reconstruction of 140 electrical cabins in Tirana, with equipment interventions, grounding works, and civil works to improve network performance.",
      location: "Tirana",
      paragraphs: [
        "The project includes the reconstruction of 140 electrical cabins across several areas of Tirana, covering Paskuqan, Lapraka, the Great Ring Road, the Small Ring Road, Fusha e Aviacionit, Allias, Shkoza, Sauk, and Don Bosko.",
        "The interventions focus on replacing electrical equipment, medium-voltage cells, low-voltage panels, low- and medium-voltage busbars, cabin grounding, and civil works, with the goal of reducing losses and improving supply safety."
      ],
      metrics: [
        "140 electrical cabins",
        "Geographic coverage of approximately 50 km2",
        "30 feeders in the Kashar, Farka, Rajonal, Kombinat, Selita, Traktora, and Qender substations",
        "Electrical and civil works according to OSSH standards"
      ]
    },
    "rrjeti-tu-0-4kv-bulqize": {
      title: "Reconstruction of the 0.4 kV low-voltage network with A.B.C cable in the Bulqiza unit",
      client: "Distribution System Operator sh.a / Burrel Regional Directorate",
      excerpt: "Construction and reconstruction of the low-voltage network in Bulqiza and the surrounding areas to improve the quality of electricity distribution.",
      description: "The project enabled higher-quality power supply through construction of the new 0.4 kV A.B.C cable network and reconstruction of the existing lines.",
      location: "Bulqiza, Gjorica, Fushe Bulqiza, Krast, Zerqan, and Trebisht",
      paragraphs: [
        "The project includes construction and reconstruction of the low-voltage network across a wide geographic area near the city of Bulqiza and in the areas of Gjorica, Fushe Bulqiza, Krast, Zerqan, and Trebisht.",
        "The works included reconstruction of low- and medium-voltage lines, replacement of deteriorated poles, installation of new poles, construction of new cabins, improvement of supporting infrastructure, and network grounding."
      ],
      metrics: [
        "Geographic coverage of 300 km2",
        "Service for approximately 2,176 subscribers",
        "New 0.4 kV network with A.B.C cable"
      ]
    },
    "kabinat-kashar-selite": {
      title: "Cabin reconstruction at the Kashar and Selita substations",
      client: "OSSH sh.a / Tirana Regional Directorate",
      excerpt: "Interventions in the medium- and low-voltage network on the feeders of the Kashar and Selita substations, focused on reconstructing electrical cabins.",
      description: "The project included interventions in the medium- and low-voltage network, with installation of new electrical equipment and replacement of cable lines for a safer and more durable infrastructure.",
      location: "Kashar and Selita, Tirana",
      paragraphs: [
        "This project included interventions in the medium- and low-voltage network on the feeders of the Kashar and Selita substations.",
        "The project focused on reconstructing electrical cabins according to OSSH standards, installing new electrical equipment, and replacing cable lines to ensure modern, safe, and durable infrastructure."
      ],
      metrics: [
        "Reconstruction of electrical cabins according to OSSH standards",
        "Installation of new cells, transformers, and panels",
        "Replacement of cable lines in the MV/LV network"
      ]
    },
    "kanalet-ujitese-shelqet-pistull-u13-u14": {
      title: "Rehabilitation of the Shelqet-Pistull irrigation canal and the U-13 / U-14 canals",
      client: "Lezha Irrigation and Drainage Directorate",
      excerpt: "Rehabilitation and modernization of the irrigation system in the Milot, Mamurras, and Droja area, including several irrigation canals and related engineering works.",
      description: "This project delivered the rehabilitation and modernization of the irrigation system, including cleaning, concrete lining, and reconstruction of engineering structures for more efficient water distribution.",
      location: "Milot, Mamurras, and Droja",
      paragraphs: [
        "This project delivered the rehabilitation and modernization of the irrigation system in the area owned by the Lezha Irrigation and Drainage Directorate.",
        "The works included canal cleaning, concrete lining along the full length, reconstruction of existing engineering structures, and construction of new engineering structures such as metal gates with lifting mechanisms, intake gates, culverts, and pedestrian bridges."
      ],
      metrics: [
        "Shelqet-Pistull irrigation canal with a length of 4,555 linear meters",
        "U-14 irrigation canal with a length of 6,333 linear meters",
        "U-13 irrigation canal with a total length of 7,000 linear meters"
      ]
    },
    "vepra-marrjes-cengele": {
      title: "Rehabilitation of the Cengele intake structure",
      client: "Durres Irrigation and Drainage Directorate",
      excerpt: "Rehabilitation of the Cengele intake structure on the main Peqin-Kavaja irrigation canal, to stabilize and improve the functionality of the structure.",
      description: "The project included rehabilitation works on the Cengele intake structure after critical degradation of the supporting piers, with specific stabilization and erosion-protection measures.",
      location: "Cengele dam, Peqin-Kavaja canal",
      paragraphs: [
        "This project included rehabilitation works on the Cengele intake structure of the main Peqin-Kavaja irrigation canal, which was in critical condition due to settlement of the supporting piers.",
        "The works included excavation and cleaning in the upstream area, concrete works in the downstream stilling area, construction of the reinforced concrete foundation, and filling with large quarry stones to protect the structure."
      ],
      metrics: [
        "Approximately 327 reinforced concrete stilling blocks",
        "Stabilization works on the intake structure of the Peqin-Kavaja canal"
      ]
    },
    "stacioni-naftes-zharrez": {
      title: "Improvement, digitalization, and upgrading of the infrastructure of the Zharrez oil sales station",
      client: "Albpetrol sh.a",
      excerpt: "Modernization of the Zharrez oil sales station with new tanks, safety systems, civil infrastructure, and real-time SCADA monitoring.",
      description: "The project was undertaken to improve the infrastructure and align the Zharrez station with technical and environmental standards, integrating new operational, safety, and monitoring systems.",
      location: "Zharrez, Patos, Fier",
      paragraphs: [
        "The Zharrez oil sales station is located in the Zharrez Administrative Unit, Fier district, and the project was undertaken to improve the infrastructure and align the facility with applicable technical and environmental standards.",
        "The works include interventions on tanks, loading and unloading stations and pumps, an LPG plant, vehicle scale, road infrastructure, perimeter fence, water and foam fire systems, and integrated real-time monitoring through SCADA."
      ],
      metrics: [
        "Facility area of 50,000 m2",
        "2 new tanks with V=1000 m3 capacity",
        "2 technological water tanks with V=100 m3 capacity",
        "Metal tank with V=2000 m3 capacity for fire protection water reserve",
        "Perimeter fence of 1,600 linear meters",
        "Road axes of 1,100 linear meters",
        "Squares covering 8,729 m2",
        "Sidewalks covering 1,004 m2",
        "Operational and safety monitoring through the SCADA system"
      ]
    },
    "stacionet-ekzistuese-rtsh": {
      title: "Reconstruction of existing stations",
      client: "General Directorate of Albanian Radio Television",
      excerpt: "Technology investments for the reconstruction of five antenna stations and their adaptation for digital technology.",
      description: "The project includes reconstruction and modernization of five existing television stations to guarantee stable and secure transmission in line with contemporary standards.",
      location: "Mide, Tarabosh, Cervenake Gllave, Sopoti, and Llogara",
      paragraphs: [
        "This project includes technology investments for the reconstruction of five antenna stations: Mide, Tarabosh, Cervenake Gllave, Sopoti, and Llogara, adapting the existing stations for digital technology installation.",
        "The reconstruction includes rehabilitation of the building and enclosure, modernization of the electrical and backup supply systems, installation of supporting systems such as air conditioning and fire protection, and improvements to transmission infrastructure plus safety and monitoring systems."
      ],
      metrics: [
        "5 antenna stations: Mide, Tarabosh, Cervenake Gllave, Sopoti, and Llogara",
        "Modernization of electrical systems and backup supply (generator, ATS, diesel tank)",
        "Adaptation for digital technology according to contemporary standards"
      ]
    },
    "rikonstruksion-mesonjetores-se-pare-shqipe": {
      title: "Reconstruction of the First Albanian School",
      excerpt: "Reconstruction of the First Albanian School in Korce, now the National Museum of Education, preserving its historical values while integrating digital technology.",
      description: "The First Albanian School in Korce, now the National Museum of Education, opened on March 7, 1887 and is an important and distinctive institution in the history of Albanian education. The restoration project began after cracks appeared in the building following the 2019 earthquake. Because of its high historical and cultural importance, the investment included complete reconstruction of the building and its redesign without losing the valuable cultural heritage it carries, while also restoring original historic elements to the museum and applying digital technology.",
      location: "Korce",
      paragraphs: [
        "The First Albanian School in Korce, now the National Museum of Education, opened on March 7, 1887 and is an important and distinctive institution in the history of Albanian education. The restoration project began after cracks appeared in the building following the 2019 earthquake.",
        "Because of its high historical and cultural importance, the investment included complete reconstruction of the building and its redesign without losing the valuable cultural heritage it carries.",
        "The intervention also restored original historic elements to the museum and introduced digital technology."
      ],
      metrics: []
    }
  };

  function buildDetailsHtml(projectCopy) {
    const parts = [];
    if (projectCopy.client) {
      parts.push(`<p><strong>Client / Institution:</strong> ${projectCopy.client}</p>`);
    }
    (projectCopy.paragraphs || []).filter(Boolean).forEach((paragraph) => {
      parts.push(`<p>${paragraph}</p>`);
    });
    if (Array.isArray(projectCopy.metrics) && projectCopy.metrics.length > 0) {
      parts.push("<h5>Technical Data</h5>");
      parts.push("<ul>");
      projectCopy.metrics.forEach((metric) => {
        parts.push(`<li>${metric}</li>`);
      });
      parts.push("</ul>");
    }
    return parts.join("");
  }

  function setEnglishField(project, field, value) {
    if (!value) return;
    if (!project[field] || typeof project[field] !== "object") {
      project[field] = { en: value, sq: project[field] || "" };
      return;
    }
    project[field].en = value;
  }

  projects.forEach((project) => {
    const copy = englishProjects[project.slug];
    if (!copy) return;

    setEnglishField(project, "title", copy.title);
    setEnglishField(project, "client", copy.client);
    setEnglishField(project, "excerpt", copy.excerpt);
    setEnglishField(project, "description", copy.description);
    setEnglishField(project, "detailsHtml", buildDetailsHtml(copy));
    setEnglishField(project, "location", copy.location);

    if (Array.isArray(copy.metrics)) {
      project.metrics = copy.metrics.slice();
    }
  });
});
