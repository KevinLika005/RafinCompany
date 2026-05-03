const sharedBenefits = {
  engineering: [
    {
      en: "Structured project onboarding and coordination with multidisciplinary site teams.",
      sq: "Integrim i strukturuar ne projekt dhe koordinim me ekipet multidisiplinare ne terren."
    },
    {
      en: "Professional, safety-focused work environment with active infrastructure projects.",
      sq: "Ambient pune profesional, i fokusuar ne sigurine dhe projektet aktive te infrastruktures."
    },
    {
      en: "Competitive compensation package based on experience and project scope.",
      sq: "Pakete konkurruese kompensimi sipas eksperiences dhe pergjegjesive te projektit."
    }
  ],
  transport: [
    {
      en: "Stable route planning and dispatch coordination across active company projects.",
      sq: "Planifikim i qendrueshem i rrugeve dhe koordinim me dispecerine ne projektet aktive."
    },
    {
      en: "Well-maintained fleet support and clear daily handover procedures.",
      sq: "Mbeshtetje me mjete te mirembajtura dhe procedura te qarta dorezimi ditor."
    },
    {
      en: "Reliable schedule with compensation aligned to license class and field responsibility.",
      sq: "Orar i qendrueshem dhe kompensim sipas kategorise se lejes dhe pergjegjesise ne terren."
    }
  ],
  operators: [
    {
      en: "Consistent work pipeline on road, utility, and civil infrastructure projects.",
      sq: "Vijueshmeri pune ne projekte rrugore, utilitare dhe infrastrukturore."
    },
    {
      en: "Operational planning with site engineers and supervisors before each phase starts.",
      sq: "Planifikim operacional me inxhinieret dhe drejtuesit e kantierit perpara cdo faze."
    },
    {
      en: "Compensation tied to machine class, capability, and site assignment.",
      sq: "Kompensim i lidhur me klasen e makinerise, aftesite dhe caktimin ne kantier."
    }
  ],
  specialists: [
    {
      en: "Long-term opportunities across building, civil, and finishing works projects.",
      sq: "Mundesi afatgjata ne projekte ndertimi, pune civile dhe perfundime."
    },
    {
      en: "Organized site supervision with material planning and daily task coordination.",
      sq: "Mbikqyrje e organizuar ne terren me planifikim materialesh dhe koordinim detyrash ditore."
    },
    {
      en: "Fair compensation according to trade experience, output quality, and reliability.",
      sq: "Kompensim i drejte sipas eksperiences ne profesion, cilesise se punes dhe seriozitetit."
    }
  ],
  maintenance: [
    {
      en: "Mixed workshop and field support role tied to active fleet and equipment needs.",
      sq: "Rol i kombinuar ne servis dhe ne terren sipas nevojave te flotës dhe makinerive aktive."
    },
    {
      en: "Planned maintenance schedules with practical coordination across operations teams.",
      sq: "Plane mirembajtjeje te programuara dhe koordinim praktik me ekipet operative."
    },
    {
      en: "Competitive package based on diagnostic ability, repair speed, and equipment knowledge.",
      sq: "Pakete konkurruese sipas aftesise diagnostikuese, shpejtesise se riparimit dhe njohurive teknike."
    }
  ]
};

const jobProfiles = {
  engineering: {
    image: "images/jobs/engineer-blueprint.jpg",
    imageAlt: {
      en: "Construction management team reviewing plans on site",
      sq: "Ekip i menaxhimit te ndertimit duke shqyrtuar planet ne kantier"
    },
    location: {
      en: "Project offices and active sites across Albania",
      sq: "Zyra projekti dhe kantiere aktive ne Shqiperi"
    },
    employmentType: {
      en: "Full-time",
      sq: "Me kohe te plote"
    },
    benefits: sharedBenefits.engineering
  },
  transport: {
    image: "images/jobs/truck-driver-cabin-2.jpg",
    imageAlt: {
      en: "Transport and logistics operator for construction projects",
      sq: "Operator transporti dhe logjistike per projekte ndertimi"
    },
    location: {
      en: "Logistics routes and project sites across Albania",
      sq: "Rruge logjistike dhe kantiere ne Shqiperi"
    },
    employmentType: {
      en: "Full-time",
      sq: "Me kohe te plote"
    },
    benefits: sharedBenefits.transport
  },
  operators: {
    image: "images/jobs/excavator-operator.jpg",
    imageAlt: {
      en: "Heavy machinery operating on infrastructure works",
      sq: "Makineri e rende ne operim ne pune infrastrukturore"
    },
    location: {
      en: "Road, utility, and civil works sites across Albania",
      sq: "Kantiere rrugore, utilitare dhe civile ne Shqiperi"
    },
    employmentType: {
      en: "Full-time",
      sq: "Me kohe te plote"
    },
    benefits: sharedBenefits.operators
  },
  specialists: {
    image: "images/jobs/construction-worker-site.jpg",
    imageAlt: {
      en: "Construction specialist working on a live site",
      sq: "Specialist ndertimi duke punuar ne kantier aktiv"
    },
    location: {
      en: "Civil and building sites across Albania",
      sq: "Kantiere civile dhe objektesh ne Shqiperi"
    },
    employmentType: {
      en: "Full-time",
      sq: "Me kohe te plote"
    },
    benefits: sharedBenefits.specialists
  },
  maintenance: {
    image: "images/jobs/mechanic-diagnostic.jpg",
    imageAlt: {
      en: "Maintenance technician servicing construction machinery",
      sq: "Teknik mirembajtjeje duke servisuar makineri ndertimi"
    },
    location: {
      en: "Service base and field support locations in Albania",
      sq: "Baze servisi dhe pika mbeshtetjeje ne terren ne Shqiperi"
    },
    employmentType: {
      en: "Full-time",
      sq: "Me kohe te plote"
    },
    benefits: sharedBenefits.maintenance
  }
};

function createJob(config) {
  const profile = jobProfiles[config.profileKey] || {};
  const image = config.image || config.cardImage || profile.image || "images/project-1-480x361.jpg";
  const imageAlt = config.imageAlt || config.cardImageAlt || profile.imageAlt || config.title;

  return {
    id: config.id,
    slug: config.slug,
    title: config.title,
    category: config.category,
    careerLevel: config.careerLevel,
    summary: config.summary,
    shortDescription: config.shortDescription || config.summary,
    location: config.location || profile.location,
    employmentType: config.employmentType || profile.employmentType,
    experience: config.experience,
    responsibilities: config.responsibilities || [],
    requirements: config.requirements || [],
    benefits: config.benefits || profile.benefits || [],
    cardImage: config.cardImage || image,
    cardImageAlt: config.cardImageAlt || imageAlt,
    cardImagePosition: config.cardImagePosition || null,
    cardImageScale: config.cardImageScale || null,
    cardImageHoverScale: config.cardImageHoverScale || null,
    image,
    imageAlt,
    modalImagePosition: config.modalImagePosition || config.cardImagePosition || null,
    modalImageScale: config.modalImageScale || config.cardImageScale || null,
    order: config.order
  };
}

const jobs = [
  createJob({
    id: "job-1",
    slug: "construction-engineer",
    profileKey: "engineering",
    title: { en: "Construction Engineer", sq: "Inxhinier Ndertimi" },
    category: { en: "Construction Management", sq: "Menaxhim Ndertimi" },
    careerLevel: { en: "Senior", sq: "Senior" },
    summary: {
      en: "Lead structural planning, execution supervision, and quality compliance across active sites.",
      sq: "Drejton planifikimin strukturor, mbikqyr zbatimin dhe kontrollon cilesine ne kantier."
    },
    shortDescription: {
      en: "This role supports daily site coordination, technical review, and contractor follow-through for civil and infrastructure works.",
      sq: "Ky rol mbeshtet koordinimin ditor ne kantier, kontrollin teknik dhe ndjekjen e zbatimit per punime civile dhe infrastrukturore."
    },
    experience: {
      en: "5+ years managing or supervising construction site delivery.",
      sq: "5+ vite eksperience ne menaxhim ose mbikqyrje te zbatimit ne kantier."
    },
    responsibilities: [
      {
        en: "Coordinate site execution with subcontractors, survey data, and approved drawings.",
        sq: "Koordinon zbatimin ne terren me nenkontraktoret, matjet dhe vizatimet e miratuara."
      },
      {
        en: "Monitor progress, workmanship quality, and compliance with technical specifications.",
        sq: "Monitoron progresin, cilesine e punimeve dhe respektimin e specifikimeve teknike."
      },
      {
        en: "Prepare site reports, quantity checks, and handover notes for each work phase.",
        sq: "Pergatit raportet e kantierit, verifikimet e sasive dhe procesverbalet per cdo faze."
      }
    ],
    requirements: [
      {
        en: "Degree in civil engineering or equivalent construction discipline.",
        sq: "Diplome ne inxhinieri civile ose fushe te ngjashme te ndertimit."
      },
      {
        en: "Strong understanding of site sequencing, drawings, and quality control routines.",
        sq: "Njohuri te forta mbi fazat e zbatimit, vizatimet dhe kontrollin e cilesise."
      },
      {
        en: "Practical communication skills for site teams, supervisors, and suppliers.",
        sq: "Aftesi praktike komunikimi me ekipet e terrenit, drejtuesit dhe furnitoret."
      }
    ],
    cardImage: "images/jobs/engineer-blueprint.jpg",
    cardImageAlt: { en: "Construction engineer on site", sq: "Inxhinier ndertimi ne kantier" },
    order: 1
  }),
  createJob({
    id: "job-2",
    slug: "hydrotechnical-engineer",
    profileKey: "engineering",
    title: { en: "Hydrotechnical Engineer", sq: "Inxhinier hidroteknik" },
    category: { en: "Construction Management", sq: "Menaxhim Ndertimi" },
    careerLevel: { en: "Senior", sq: "Senior" },
    summary: {
      en: "Design and supervise water supply and drainage systems for infrastructure projects.",
      sq: "Projekton dhe mbikqyr sistemet e furnizimit me uje dhe drenazhimit."
    },
    shortDescription: {
      en: "The position focuses on utility layouts, network coordination, and practical site support for water-related infrastructure works.",
      sq: "Pozicioni fokusohet ne skemat utilitare, koordinimin e rrjeteve dhe mbeshtetjen praktike ne terren per punime hidroteknike."
    },
    experience: {
      en: "4+ years working on water, drainage, or utility infrastructure projects.",
      sq: "4+ vite eksperience ne projekte te ujit, drenazhimit ose infrastruktures utilitare."
    },
    responsibilities: [
      {
        en: "Review hydraulic layouts, utility conflicts, and installation sequencing on site.",
        sq: "Rishikon skemat hidraulike, konfliktet utilitare dhe renditjen e instalimeve ne terren."
      },
      {
        en: "Support field teams during trenching, pipe placement, and network testing phases.",
        sq: "Mbeshtet ekipet gjate germimeve, vendosjes se tubacioneve dhe testimeve te rrjetit."
      },
      {
        en: "Verify that installed systems match project intent and operating requirements.",
        sq: "Verifikon qe sistemet e instaluara perputhen me projektin dhe kerkesat funksionale."
      }
    ],
    requirements: [
      {
        en: "Relevant engineering qualification in hydrotechnics or civil infrastructure.",
        sq: "Kualifikim perkates ne hidroteknike ose infrastrukture civile."
      },
      {
        en: "Ability to read utility drawings and resolve field coordination issues.",
        sq: "Aftesi per te lexuar projektet utilitare dhe per te zgjidhur ceshtje koordinimi ne terren."
      },
      {
        en: "Familiarity with installation quality checks and commissioning support.",
        sq: "Njohuri mbi kontrollet e cilesise se instalimeve dhe mbeshtetjen ne venie ne funksion."
      }
    ],
    cardImage: "images/jobs/engineer-portrait-2.jpg",
    cardImageAlt: { en: "Hydrotechnical engineer", sq: "Inxhinier hidroteknik" },
    image: "images/jobs/pipe-repair.jpg",
    imageAlt: { en: "Hydrotechnical infrastructure installation work", sq: "Punime instalimi ne infrastrukture hidroteknike" },
    order: 2
  }),
  createJob({
    id: "job-3",
    slug: "electrical-engineer",
    profileKey: "engineering",
    title: { en: "Electrical Engineer", sq: "Inxhinier Elektrik" },
    category: { en: "Construction Management", sq: "Menaxhim Ndertimi" },
    careerLevel: { en: "Senior", sq: "Senior" },
    summary: {
      en: "Coordinate electrical design and installation standards for industrial and civil works.",
      sq: "Koordinon projektimin dhe standardet e instalimeve elektrike ne terren."
    },
    shortDescription: {
      en: "This role combines design review, site coordination, and installation oversight for building and infrastructure power systems.",
      sq: "Ky rol kombinon rishikimin e projektit, koordinimin ne terren dhe mbikqyrjen e instalimeve per sistemet elektrike."
    },
    experience: {
      en: "4+ years delivering electrical systems for civil, industrial, or building projects.",
      sq: "4+ vite eksperience ne zbatimin e sistemeve elektrike per projekte civile, industriale ose objektesh."
    },
    responsibilities: [
      {
        en: "Coordinate electrical installation works with civil, mechanical, and finishing teams.",
        sq: "Koordinon instalimet elektrike me ekipet civile, mekanike dhe te perfundimeve."
      },
      {
        en: "Review panel layouts, cable routes, and equipment interfaces before execution.",
        sq: "Rishikon skemat e paneleve, kalimet e kabllove dhe nderfaqet e pajisjeve para zbatimit."
      },
      {
        en: "Support testing, snag resolution, and technical documentation closeout.",
        sq: "Mbeshtet testimet, zgjidhjen e verejtjeve dhe dokumentacionin teknik perfundimtar."
      }
    ],
    requirements: [
      {
        en: "Degree in electrical engineering or closely related discipline.",
        sq: "Diplome ne inxhinieri elektrike ose fushe te afert."
      },
      {
        en: "Solid understanding of electrical drawings, safety practices, and site coordination.",
        sq: "Njohuri te mira mbi projektet elektrike, praktikat e sigurise dhe koordinimin ne terren."
      },
      {
        en: "Ability to organize inspections, punch lists, and technical clarifications.",
        sq: "Aftesi per te organizuar inspektime, lista verejtjesh dhe sqarime teknike."
      }
    ],
    cardImage: "images/jobs/electrician-installation.jpg",
    cardImageAlt: { en: "Electrical engineer at work", sq: "Inxhinier elektrik ne pune" },
    image: "images/jobs/electrician-installation.jpg",
    imageAlt: { en: "Electrical systems installation on a construction site", sq: "Instalime te sistemeve elektrike ne kantier" },
    order: 3
  }),
  createJob({
    id: "job-4",
    slug: "electrotechnical-engineer",
    profileKey: "engineering",
    title: { en: "Electrotechnical Engineer", sq: "Inxhinier Elektroteknik" },
    category: { en: "Construction Management", sq: "Menaxhim Ndertimi" },
    careerLevel: { en: "Senior", sq: "Senior" },
    summary: {
      en: "Manage electrotechnical integration, controls, and commissioning for project assets.",
      sq: "Menaxhon integrimin elektroteknik, sistemet e kontrollit dhe testimet finale."
    },
    shortDescription: {
      en: "The role supports systems integration, control logic coordination, and readiness checks before handover.",
      sq: "Roli mbeshtet integrimin e sistemeve, koordinimin e logjikes se kontrollit dhe verifikimet para dorezimit."
    },
    experience: {
      en: "4+ years in electrotechnical coordination, automation, or commissioning support.",
      sq: "4+ vite eksperience ne koordinim elektroteknik, automatizim ose mbeshtetje komisionimi."
    },
    responsibilities: [
      {
        en: "Coordinate control panels, interface points, and system integration sequences.",
        sq: "Koordinon panelet e kontrollit, pikat e nderfaqes dhe sekuencat e integrimit te sistemeve."
      },
      {
        en: "Review technical submittals and verify compatibility between installed components.",
        sq: "Rishikon dokumentacionin teknik dhe verifikon perputhshmerine midis komponenteve te instaluar."
      },
      {
        en: "Support functional testing and final readiness for operational handover.",
        sq: "Mbeshtet testimet funksionale dhe gatishmerine finale per dorezim operacional."
      }
    ],
    requirements: [
      {
        en: "Engineering background in electrotechnics, automation, or similar field.",
        sq: "Formim inxhinierik ne elektroteknike, automatizim ose fushe te ngjashme."
      },
      {
        en: "Experience with controls coordination and multidisciplinary site interfaces.",
        sq: "Eksperience me koordinimin e kontrolleve dhe nderfaqet multidisiplinare ne terren."
      },
      {
        en: "Methodical approach to documentation, testing, and issue trackInxhinier",
        sq: "Qasje metodike ndaj dokumentacionit, testimeve dhe ndjekjes se problematikave."
      }
    ],
    cardImage: "images/jobs/engineer-portrait-1.jpg",
    cardImageAlt: { en: "Electrotechnical engineer", sq: "Inxhinier elektroteknik" },
    order: 4
  }),
  createJob({
    id: "job-5",
    slug: "mechanical-engineer",
    profileKey: "engineering",
    title: { en: "Mechanical Engineer", sq: "Inxhinier Mekanik" },
    category: { en: "Construction Management", sq: "Menaxhim Ndertimi" },
    careerLevel: { en: "Senior", sq: "Senior" },
    summary: {
      en: "Deliver mechanical systems design and execution support across multidisciplinary teams.",
      sq: "Zbaton projektimin mekanik dhe mbeshtet implementimin ne ekipe multidisiplinare."
    },
    shortDescription: {
      en: "This position contributes to mechanical installation planning, field coordination, and execution follow-up for complex project packages.",
      sq: "Ky pozicion kontribuon ne planifikimin e instalimeve mekanike, koordinimin ne terren dhe ndjekjen e zbatimit per paketa komplekse projektesh."
    },
    experience: {
      en: "4+ years supporting mechanical works in construction or industrial projects.",
      sq: "4+ vite eksperience ne punime mekanike per projekte ndertimi ose industriale."
    },
    responsibilities: [
      {
        en: "Review mechanical layouts, equipment placement, and access requirements on site.",
        sq: "Rishikon skemat mekanike, vendosjen e pajisjeve dhe kerkesat e aksesit ne kantier."
      },
      {
        en: "Coordinate fabrication, delivery, and installation readiness with project teams.",
        sq: "Koordinon pergatitjen, furnizimin dhe gatishmerine e instalimit me ekipet e projektit."
      },
      {
        en: "Track punch items and support technical closeout for mechanical packages.",
        sq: "Ndjek verejtjet dhe mbeshtet mbylljen teknike te paketave mekanike."
      }
    ],
    requirements: [
      {
        en: "Degree in mechanical engineering or related technical field.",
        sq: "Diplome ne inxhinieri mekanike ose fushe teknike te ngjashme."
      },
      {
        en: "Working knowledge of mechanical drawings and field installation practices.",
        sq: "Njohuri pune mbi projektet mekanike dhe praktikat e instalimit ne terren."
      },
      {
        en: "Strong coordination skills and practical problem-solving mindset.",
        sq: "Aftesi te mira koordinimi dhe qasje praktike ne zgjidhjen e problemeve."
      }
    ],
    cardImage: "images/jobs/engineer-portrait-1.jpg",
    cardImageAlt: { en: "Mechanical engineer", sq: "Inxhinier mekanik" },
    order: 5
  }),
  createJob({
    id: "job-6",
    slug: "mechatronics-engineer",
    profileKey: "engineering",
    title: { en: "Mechatronics Engineer", sq: "Inxhinier Mekatronik" },
    category: { en: "Construction Management", sq: "Menaxhim Ndertimi" },
    careerLevel: { en: "Senior", sq: "Senior" },
    summary: {
      en: "Implement automation, sensors, and mechatronic controls in modern infrastructure.",
      sq: "Implementon automatizimin, sensoret dhe kontrollet mekatronike ne infrastrukture."
    },
    shortDescription: {
      en: "The role blends controls coordination, equipment integration, and practical automation support during installation and startup.",
      sq: "Roli kombinon koordinimin e kontrolleve, integrimin e pajisjeve dhe mbeshtetjen praktike te automatizimit gjate instalimit dhe startimit."
    },
    experience: {
      en: "3+ years in mechatronics, automation support, or integrated equipment delivery.",
      sq: "3+ vite eksperience ne mekatronike, mbeshtetje automatizimi ose integrim pajisjesh."
    },
    responsibilities: [
      {
        en: "Assist with sensors, control loops, and equipment interface coordination on site.",
        sq: "Ndihmon ne koordinimin e sensoreve, cikleve te kontrollit dhe nderfaqeve te pajisjeve ne terren."
      },
      {
        en: "Review installation readiness for automation-related systems and assemblies.",
        sq: "Rishikon gatishmerine e instalimit per sistemet dhe agregatet e lidhura me automatizimin."
      },
      {
        en: "Support troubleshooting and commissioning documentation with project engineers.",
        sq: "Mbeshtet diagnostikimin dhe dokumentacionin e komisionimit me inxhinieret e projektit."
      }
    ],
    requirements: [
      {
        en: "Relevant degree in mechatronics, automation, or electromechanical engineerInxhinier",
        sq: "Diplome perkatese ne mekatronike, automatizim ose inxhinieri elektromekanike."
      },
      {
        en: "Comfort working across mechanical and electrical installation environments.",
        sq: "Komoditet pune ne mjedise instalimi mekanike dhe elektrike."
      },
      {
        en: "Attention to detail in testing, setup, and technical reportInxhinier",
        sq: "Kujdes ndaj detajeve ne testime, konfigurim dhe raportim teknik."
      }
    ],
    cardImage: "images/jobs/engineer-portrait-2.jpg",
    cardImageAlt: { en: "Mechatronics engineer", sq: "Inxhinier mekatronik" },
    order: 6
  }),
  createJob({
    id: "job-7",
    slug: "truck-driver",
    profileKey: "transport",
    title: { en: "Truck Driver", sq: "Shofer Kamioni" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Transport heavy materials and equipment between depots and construction sites.",
      sq: "Transporton materiale dhe pajisje te renda drejt kantierit dhe bazes logjistike."
    },
    shortDescription: {
      en: "This role supports reliable material movement, safe route execution, and coordination with site logistics teams.",
      sq: "Ky rol mbeshtet levizjen e besueshme te materialeve, zbatimin e sigurt te rrugeve dhe koordinimin me ekipet logjistike."
    },
    employmentType: {
      en: "Full-time / shift-based",
      sq: "Me kohe te plote / me turne"
    },
    experience: {
      en: "3+ years driving heavy vehicles for logistics or construction operations.",
      sq: "3+ vite eksperience ne drejtimin e mjeteve te renda per logjistike ose operacione ndertimi."
    },
    responsibilities: [
      {
        en: "Transport aggregates, machinery attachments, and site supplies safely and on time.",
        sq: "Transporton inerte, aksesore makinerish dhe furnizime kantieri ne menyre te sigurt dhe ne kohe."
      },
      {
        en: "Complete daily vehicle checks and report maintenance or route issues promptly.",
        sq: "Kryen kontrolle ditore te mjetit dhe raporton menjehere problematikat e mirembajtjes ose rrugeve."
      },
      {
        en: "Coordinate loading and unloading with dispatchers, warehouse staff, and site supervisors.",
        sq: "Koordinon ngarkim-shkarkimin me dispecerine, magazinen dhe drejtuesit e kantierit."
      }
    ],
    requirements: [
      {
        en: "Valid heavy vehicle driving license and practical road safety awareness.",
        sq: "Leje e vlefshme drejtimi per mjete te renda dhe vetedije praktike per sigurine rrugore."
      },
      {
        en: "Experience moving materials to construction or industrial locations.",
        sq: "Eksperience ne transportin e materialeve drejt zonave te ndertimit ose industriale."
      },
      {
        en: "Dependable communication and disciplined compliance with delivery schedules.",
        sq: "Komunikim i besueshem dhe disipline ne respektimin e orareve te dorezimit."
      }
    ],
    cardImage: "images/jobs/shoferkamioni.jpeg",
    cardImageAlt: { en: "Truck driver", sq: "Shofer kamioni" },
    cardImagePosition: "48% 54%",
    cardImageScale: 1.36,
    cardImageHoverScale: 1.42,
    image: "images/jobs/shoferkamioni.jpeg",
    imageAlt: { en: "Construction truck on site", sq: "Kamion ne kantier" },
    modalImagePosition: "48% 52%",
    modalImageScale: 1.28,
    order: 7
  }),
  createJob({
    id: "job-8",
    slug: "light-truck-driver",
    profileKey: "transport",
    title: { en: "Light Truck Driver", sq: "Shofer Kamioncine" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Entry", sq: "Fillestar" },
    summary: {
      en: "Operate light trucks for daily support transport and on-site material delivery.",
      sq: "Drejton kamioncine per transport ditor dhe furnizim me materiale ne terren."
    },
    shortDescription: {
      en: "The role focuses on responsive daily deliveries, practical support for site teams, and orderly vehicle use.",
      sq: "Roli fokusohet ne dorezime ditore te shpejta, mbeshtetje praktike per ekipet ne terren dhe perdorim te rregullt te mjetit."
    },
    experience: {
      en: "1+ year of delivery or support transport experience preferred.",
      sq: "Preferohet 1+ vit eksperience ne dorezime ose transport mbeshtetes."
    },
    responsibilities: [
      {
        en: "Deliver tools, consumables, and small equipment to multiple job sites during the day.",
        sq: "Dergon vegla, materiale konsumi dhe pajisje te vogla ne disa kantiere gjate dites."
      },
      {
        en: "Confirm delivery notes, loading lists, and site receipt details accurately.",
        sq: "Konfirmon sakte flete-dorezimet, listat e ngarkeses dhe marrjen ne kantier."
      },
      {
        en: "Keep the vehicle clean, organized, and ready for scheduled dispatch.",
        sq: "Mban mjetin te paster, te organizuar dhe gati per nisjet e programuara."
      }
    ],
    requirements: [
      {
        en: "Valid driving license and confident urban and intercity driving habits.",
        sq: "Leje e vlefshme drejtimi dhe aftesi te sigurta drejtimi ne qytet dhe interurban."
      },
      {
        en: "Basic understanding of loading care and transport discipline.",
        sq: "Njohuri bazike mbi kujdesin ne ngarkim dhe disiplinen ne transport."
      },
      {
        en: "Reliable attendance and willingness to support changing site needs.",
        sq: "Prezence e rregullt dhe gatishmeri per te mbeshtetur nevojat ndryshuese te kantierit."
      }
    ],
    cardImage: "images/kamioncina.jpg",
    cardImageAlt: { en: "Light truck driver", sq: "Shofer kamioncine" },
    image: "images/kamioncina.jpg",
    imageAlt: { en: "Light truck supporting construction logistics", sq: "Kamioncine ne sherbim te logjistikes se ndertimit" },
    order: 8
  }),
  createJob({
    id: "job-9",
    slug: "van-driver",
    profileKey: "transport",
    title: { en: "Van Driver", sq: "Shofer Fugoni" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Entry", sq: "Fillestar" },
    summary: {
      en: "Support field teams with fast transport of tools, personnel, and light equipment.",
      sq: "Mbeshtet ekipet ne terren me transport te shpejte te mjeteve dhe personelit."
    },
    shortDescription: {
      en: "This role helps keep crews mobile by managing prompt personnel and tool transfers between sites and support locations.",
      sq: "Ky rol ndihmon ekipet te levizin shpejt duke menaxhuar transportin e personelit dhe mjeteve midis kantierit dhe pikave mbeshtetese."
    },
    experience: {
      en: "1+ year of fleet, courier, or field-support driving experience preferred.",
      sq: "Preferohet 1+ vit eksperience ne drejtim flotash, korrier ose mbeshtetje terreni."
    },
    responsibilities: [
      {
        en: "Transport personnel, tools, and urgent materials between operational points.",
        sq: "Transporton personel, mjete dhe materiale urgjente midis pikave operative."
      },
      {
        en: "Coordinate arrival times with supervisors to avoid site downtime.",
        sq: "Koordinon oraret e mberritjes me drejtuesit per te shmangur vonesat ne kantier."
      },
      {
        en: "Track fuel, mileage, and basic vehicle condition checks.",
        sq: "Ndjek karburantin, kilometrat dhe kontrollet baze te gjendjes se mjetit."
      }
    ],
    requirements: [
      {
        en: "Valid driving license and confident handling of daily field routes.",
        sq: "Leje e vlefshme drejtimi dhe aftesi per menaxhimin e rrugeve ditore ne terren."
      },
      {
        en: "Dependable time management and clear communication with dispatch contacts.",
        sq: "Menaxhim i mire i kohes dhe komunikim i qarte me kontaktet e dispecerise."
      },
      {
        en: "Professional conduct when supporting teams, visitors, or deliveries.",
        sq: "Sjellje profesionale gjate mbeshtetjes se ekipeve, vizitoreve ose dorezimeve."
      }
    ],
    cardImage: "images/vans.jpg",
    cardImageAlt: { en: "Van driver", sq: "Shofer fugoni" },
    image: "images/vans.jpg",
    imageAlt: { en: "Van used for workforce and tools transport", sq: "Furgon i perdorur per transport personeli dhe mjetesh" },
    order: 9
  }),
  createJob({
    id: "job-11",
    slug: "excavator-operator",
    profileKey: "operators",
    title: { en: "Excavator Operator", sq: "Manovrator Eskavatori" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Perform precision excavations for foundations, trenches, and utility line routInxhinier",
      sq: "Kryen germime precize per themele, kanale dhe kalime linjash teknike."
    },
    shortDescription: {
      en: "The role centers on controlled excavation, trench shaping, and support for utility and foundation crews.",
      sq: "Roli fokusohet ne germime te kontrolluara, formim kanalizimesh dhe mbeshtetje per ekipet e utiliteteve dhe themeleve."
    },
    experience: {
      en: "3+ years operating tracked or wheeled excavators in civil works.",
      sq: "3+ vite eksperience ne operimin e eskavatoreve me zinxhire ose me goma ne pune civile."
    },
    responsibilities: [
      {
        en: "Execute trenching, digging, and backfilling in line with marked levels and site instructions.",
        sq: "Realizon kanalet, germimet dhe mbushjet sipas kuotave te percaktuara dhe udhezimeve te kantierit."
      },
      {
        en: "Protect nearby utilities, structures, and workers during machine operation.",
        sq: "Mbron utilitetet, strukturat dhe punetoret perreth gjate operimit te makinerise."
      },
      {
        en: "Report wear, attachment issues, or ground risks before they affect progress.",
        sq: "Raporton konsumimet, problemet me aksesoret ose rreziqet e terrenit perpara se te ndikojne progresin."
      }
    ],
    requirements: [
      {
        en: "Practical excavation experience on infrastructure or building foundations projects.",
        sq: "Eksperience praktike ne germime per projekte infrastrukturore ose themele objektesh."
      },
      {
        en: "Ability to read markings, work levels, and instructions from site supervisors.",
        sq: "Aftesi per te lexuar shenjat, kuotat e punes dhe udhezimet e drejtuesve ne terren."
      },
      {
        en: "Consistent safety discipline when operating around utilities and crews.",
        sq: "Disipline e vazhdueshme sigurie gjate operimit prane rrjeteve dhe ekipeve."
      }
    ],
    cardImage: "images/jobs/eskavator.jpeg",
    cardImageAlt: { en: "Excavator operator", sq: "Manovrator eskavatori" },
    image: "images/jobs/eskavator.jpeg",
    imageAlt: { en: "Excavator on a work site", sq: "Eskavator ne kantier" },
    order: 11
  }),
  createJob({
    id: "job-12",
    slug: "bulldozer-operator",
    profileKey: "operators",
    title: { en: "Bulldozer Operator", sq: "Manovrator Buldozeri" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Handle terrain leveling and earthmoving operations in road and site development.",
      sq: "Kryen nivelim tereni dhe levizje masive dheu ne punime rrugore dhe civile."
    },
    shortDescription: {
      en: "This role supports rough grading, earthmoving, and preparation of work platforms for subsequent site activities.",
      sq: "Ky rol mbeshtet nivelimin fillestar, levizjen e dheut dhe pergatitjen e platformave te punes per fazat e tjera."
    },
    experience: {
      en: "3+ years operating bulldozers on earthworks or road construction projects.",
      sq: "3+ vite eksperience ne operimin e buldozereve ne punime toke ose rruge."
    },
    responsibilities: [
      {
        en: "Carry out rough leveling, spreading, and pushing operations to site tolerances.",
        sq: "Kryen nivelime fillestare, shperndarje dhe shtyrje materialesh sipas tolerancave te punes."
      },
      {
        en: "Coordinate machine movement with survey references and other heavy equipment nearby.",
        sq: "Koordinon levizjen e makinerise me referencat e matjes dhe makinerite e tjera ne afersi."
      },
      {
        en: "Keep work areas stable, accessible, and ready for following crews.",
        sq: "Mban zonat e punes te qendrueshme, te aksesueshme dhe gati per ekipet pasuese."
      }
    ],
    requirements: [
      {
        en: "Strong practical control of blade work and basic cut-and-fill understandInxhinier",
        sq: "Kontroll i mire praktik i punes me lame dhe njohuri baze te prerjes dhe mbushjes."
      },
      {
        en: "Experience on road, platform, or general earthworks sites.",
        sq: "Eksperience ne kantiere rrugore, platformash ose punimesh te pergjithshme dheu."
      },
      {
        en: "Good machine awareness in changing terrain and weather conditions.",
        sq: "Ndjeshmeri e mire ndaj makinerise ne kushte terreni dhe moti te ndryshueshem."
      }
    ],
    cardImage: "images/jobs/bulldozer-operator.jpg",
    cardImageAlt: { en: "Bulldozer operator", sq: "Manovrator buldozeri" },
    image: "images/jobs/bulldozer-operator.jpg",
    imageAlt: { en: "Bulldozer shaping terrain on a construction site", sq: "Buldozer duke formuar terrenin ne nje kantier ndertimi" },
    order: 12
  }),
  createJob({
    id: "job-13",
    slug: "grader-operator",
    profileKey: "operators",
    title: { en: "Grader Operator", sq: "Manovrator Grejderi" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Shape and finish road profiles to meet slope and leveling requirements.",
      sq: "Formon profilin e rruges dhe realizon nivelimet sipas parametrave teknik."
    },
    shortDescription: {
      en: "The role focuses on fine grading and profile finishing for roads, access areas, and prepared site layers.",
      sq: "Roli fokusohet ne nivelimet e imta dhe perfundimin e profileve per rruge, akses dhe shtresa te pergatitura."
    },
    experience: {
      en: "3+ years operating graders for roadworks or infrastructure preparation.",
      sq: "3+ vite eksperience ne operimin e grejderave per punime rrugore ose pergatitje infrastrukture."
    },
    responsibilities: [
      {
        en: "Finish base layers and road sections to required level, slope, and profile accuracy.",
        sq: "Perfundon shtresat baze dhe segmentet rrugore sipas kuotave, pjerresive dhe saktesise se profilit."
      },
      {
        en: "Coordinate with survey teams to maintain alignment and final formation tolerances.",
        sq: "Koordinon me ekipet e matjes per te ruajtur aksin dhe tolerancat e formimit final."
      },
      {
        en: "Adjust machine setup to suit varying materials and weather conditions.",
        sq: "Pershtat konfigurimin e makinerise sipas materialeve dhe kushteve te motit."
      }
    ],
    requirements: [
      {
        en: "Practical road-profile experience and confidence working to site levels.",
        sq: "Eksperience praktike me profile rrugore dhe siguri ne punen sipas kuotave."
      },
      {
        en: "Ability to coordinate closely with compaction and paving teams.",
        sq: "Aftesi per te koordinuar ngushte me ekipet e ngjeshjes dhe asfaltimit."
      },
      {
        en: "Disciplined approach to machine checks and precision output.",
        sq: "Qasje e disiplinuar ndaj kontrolleve te makinerise dhe rezultateve precize."
      }
    ],
    cardImage: "images/jobs/grejder.jpeg",
    cardImageAlt: { en: "Grader operator", sq: "Manovrator grejderi" },
    image: "images/jobs/grejder.jpeg",
    imageAlt: { en: "Grader on a work site", sq: "Grejder ne kantier" },
    order: 13
  }),
  createJob({
    id: "job-14",
    slug: "roller-operator",
    profileKey: "operators",
    title: { en: "Roller Operator", sq: "Manovrator Rruli" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Compact soil and asphalt layers to required density and durability standards.",
      sq: "Kryen ngjeshjen e shtresave te dheut dhe asfaltit sipas standardeve."
    },
    shortDescription: {
      en: "This role supports compaction quality by controlling passes, density routines, and site safety around live paving or earthworks.",
      sq: "Ky rol mbeshtet cilesine e ngjeshjes duke kontrolluar kalimet, rutinat e densitetit dhe sigurine ne terren gjate asfaltimit ose punimeve te dheut."
    },
    experience: {
      en: "2+ years operating compactors on earthworks, sub-base, or asphalt projects.",
      sq: "2+ vite eksperience ne operimin e rrulave ne punime dheu, shtresa baze ose asfalt."
    },
    responsibilities: [
      {
        en: "Compact prepared layers according to instructed sequence and site quality targets.",
        sq: "Ngjesh shtresat e pergatitura sipas sekuences se kerkuar dhe objektivave te cilesise."
      },
      {
        en: "Monitor rolling patterns, edge conditions, and material behavior during operation.",
        sq: "Monitoron modelet e kalimit, skajet dhe sjelljen e materialit gjate operimit."
      },
      {
        en: "Coordinate with grading and paving crews to keep the work face moving smoothly.",
        sq: "Koordinon me ekipet e nivelimit dhe asfaltimit per te mbajtur frontin e punes ne vijim."
      }
    ],
    requirements: [
      {
        en: "Experience operating vibratory or static rollers in active site conditions.",
        sq: "Eksperience ne operimin e rrulave vibrues ose statik ne kushte aktive kantieri."
      },
      {
        en: "Basic understanding of compaction quality and safe rolling limits.",
        sq: "Njohuri baze mbi cilesine e ngjeshjes dhe kufijte e sigurise gjate kalimit."
      },
      {
        en: "Reliable teamwork during long production shifts.",
        sq: "Bashkepunim i besueshem gjate turneve te zgjatura te prodhimit."
      }
    ],
    cardImage: "images/jobs/rrul.jpeg",
    cardImageAlt: { en: "Road roller operator", sq: "Manovrator rruli" },
    image: "images/jobs/rrul.jpeg",
    imageAlt: { en: "Road roller on a work site", sq: "Rrul ne kantier" },
    order: 14
  }),
  createJob({
    id: "job-15",
    slug: "asphalt-paver-operator",
    profileKey: "operators",
    title: { en: "Asphalt Paver Operator", sq: "Asfaltshtrues" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Operate paving machinery for uniform asphalt placement on roads and work yards.",
      sq: "Operon makinerine e asfaltshtrimit per shtrime uniforme ne rruge dhe sheshe."
    },
    shortDescription: {
      en: "The role is responsible for controlled asphalt placement, paving consistency, and coordination with supply and compaction crews.",
      sq: "Roli eshte pergjegjes per shtrimin e kontrolluar te asfaltit, uniformitetin e punes dhe koordinimin me furnizimin dhe ngjeshjen."
    },
    experience: {
      en: "3+ years operating pavers on road or yard surfacing projects.",
      sq: "3+ vite eksperience ne operimin e asfaltshtruesve ne projekte rrugore ose sheshesh."
    },
    responsibilities: [
      {
        en: "Set paving speed, feed, and alignment to maintain consistent asphalt placement.",
        sq: "Rregullon shpejtesine, ushqimin dhe drejtimin per te mbajtur shtrim te qendrueshem te asfaltit."
      },
      {
        en: "Coordinate with truck drivers and roller operators during active paving operations.",
        sq: "Koordinon me shoferet dhe operatoret e rrulit gjate procesit aktiv te asfaltimit."
      },
      {
        en: "Inspect machine readiness and report any screed or feed issues immediately.",
        sq: "Kontrollon gatishmerine e makinerise dhe raporton menjehere problemet e ushqimit ose screed-it."
      }
    ],
    requirements: [
      {
        en: "Hands-on paving experience and awareness of asphalt handling best practices.",
        sq: "Eksperience praktike ne asfaltim dhe njohuri mbi praktikat e mira te trajtimit te asfaltit."
      },
      {
        en: "Ability to keep line, level, and workflow stable during production.",
        sq: "Aftesi per te mbajtur vijimin, nivelin dhe ritmin e punes gjate prodhimit."
      },
      {
        en: "Strong collaboration habits under time-sensitive site conditions.",
        sq: "Aftesi te mira bashkepunimi ne kushte kantieri me ritme te larta."
      }
    ],
    cardImage: "images/jobs/asphalt-paver-operator.jpg",
    cardImageAlt: { en: "Asphalt paver operator", sq: "Operator asfaltshtruesi" },
    image: "images/jobs/asphalt-paver-operator.jpg",
    imageAlt: { en: "Asphalt paving machinery in operation", sq: "Makineri asfaltimi ne operim" },
    order: 15
  }),
  createJob({
    id: "job-16",
    slug: "wheel-loader-operator",
    profileKey: "operators",
    title: { en: "Wheel Loader Operator", sq: "Manovrator Fadrome" },
    category: { en: "Vehicle Operators", sq: "Drejtues Mjetesh" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Load and move aggregates, soil, and materials safely across construction zones.",
      sq: "Ngarkon dhe leviz inerte, dhe dhe materiale ne zonat e punimit."
    },
    shortDescription: {
      en: "This role handles stockpile movement, truck loading, and practical support for production and logistics areas on site.",
      sq: "Ky rol merret me levizjen e stokut, ngarkimin e kamioneve dhe mbeshtetjen praktike te zonave te prodhimit dhe logjistikes ne kantier."
    },
    experience: {
      en: "2+ years operating wheel loaders or similar loading equipment.",
      sq: "2+ vite eksperience ne operimin e fadromave ose pajisjeve te ngjashme per ngarkim."
    },
    responsibilities: [
      {
        en: "Load trucks, move aggregates, and support material handling across the work zone.",
        sq: "Ngarkon kamione, leviz inerte dhe mbeshtet trajtimin e materialeve ne zonen e punes."
      },
      {
        en: "Maintain safe circulation in shared loading and storage areas.",
        sq: "Mban qarkullim te sigurt ne zonat e perbashketa te ngarkimit dhe magazinimit."
      },
      {
        en: "Check tires, bucket condition, and visible hydraulic issues before operation.",
        sq: "Kontrollon gomat, gjendjen e kovës dhe problemet e dukshme hidraulike para operimit."
      }
    ],
    requirements: [
      {
        en: "Practical experience with loading cycles and material stock management.",
        sq: "Eksperience praktike me ciklet e ngarkimit dhe menaxhimin e stokut te materialeve."
      },
      {
        en: "Good awareness of visibility, reversing, and shared-traffic safety.",
        sq: "Vetedije e mire per dukshmerine, kthimet mbrapa dhe sigurine ne qarkullim te perbashket."
      },
      {
        en: "Dependable coordination with transport and production teams.",
        sq: "Koordinim i besueshem me ekipet e transportit dhe prodhimit."
      }
    ],
    cardImage: "images/jobs/fadrom.jpeg",
    cardImageAlt: { en: "Wheel loader operator", sq: "Manovrator fadrome" },
    image: "images/jobs/fadrom.jpeg",
    imageAlt: { en: "Wheel loader on a work site", sq: "Fadrome ne kantier" },
    order: 16
  }),
  createJob({
    id: "job-17",
    slug: "construction-worker",
    profileKey: "specialists",
    title: { en: "Construction Worker", sq: "Puntor Ndertimi" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Entry", sq: "Fillestar" },
    summary: {
      en: "Support civil works, material handling, and daily execution tasks on active sites.",
      sq: "Mbeshtet punimet civile, levizjen e materialeve dhe detyrat ditore ne kantier."
    },
    shortDescription: {
      en: "This role helps crews complete day-to-day site work through practical labor support, preparation, and cleanup tasks.",
      sq: "Ky rol ndihmon ekipet te kryejne punet e perditshme ne kantier permes mbeshtetjes praktike, pergatitjes dhe pastrimit."
    },
    experience: {
      en: "Entry-level role; previous construction site exposure is helpful.",
      sq: "Rol fillestar; eksperienca e meparshme ne kantier eshte ndihmuese."
    },
    responsibilities: [
      {
        en: "Assist teams with carrying materials, preparing work zones, and basic site tasks.",
        sq: "Ndihmon ekipet me transport materialesh, pergatitje zonesh pune dhe detyra baze ne kantier."
      },
      {
        en: "Follow daily instructions from supervisors and maintain orderly work areas.",
        sq: "Zbaton udhezimet ditore te drejtuesve dhe mban zonat e punes te rregullta."
      },
      {
        en: "Support safe housekeeping and cleanup at the end of each task phase.",
        sq: "Mbeshtet pastrimin e sigurt dhe sistemimin ne fund te cdo faze pune."
      }
    ],
    requirements: [
      {
        en: "Willingness to work outdoors and support a physically active site role.",
        sq: "Gatishmeri per te punuar jashte dhe per te mbeshtetur nje rol fizik ne kantier."
      },
      {
        en: "Basic awareness of site safety and respect for supervisor direction.",
        sq: "Njohuri baze per sigurine ne terren dhe respektim i udhezimeve te drejtuesit."
      },
      {
        en: "Reliable attendance and collaborative attitude toward site teams.",
        sq: "Prezence e rregullt dhe qendrim bashkepunues me ekipet ne terren."
      }
    ],
    cardImage: "images/jobs/construction-worker-site.jpg",
    cardImageAlt: { en: "Construction worker", sq: "Puntor ndertimi" },
    image: "images/jobs/construction-worker-site.jpg",
    imageAlt: { en: "Construction worker active on a civil works site", sq: "Punetor ndertimi aktiv ne nje kantier civil" },
    order: 17
  }),
  createJob({
    id: "job-18",
    slug: "electrician",
    profileKey: "specialists",
    title: { en: "Electrician", sq: "Elektricist" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Install and maintain electrical lines, panels, and site power connections.",
      sq: "Instalon dhe miremban linja elektrike, panele dhe lidhje energjie ne terren."
    },
    shortDescription: {
      en: "This role delivers practical electrical installation work for buildings, temporary power, and infrastructure support systems.",
      sq: "Ky rol realizon instalime praktike elektrike per objekte, energji provizore dhe sisteme mbeshtetese te infrastruktures."
    },
    experience: {
      en: "2+ years in electrical installation, maintenance, or site power works.",
      sq: "2+ vite eksperience ne instalime elektrike, mirembajtje ose energji ne terren."
    },
    responsibilities: [
      {
        en: "Install cable routes, terminations, and small distribution works according to instructions.",
        sq: "Instalon rruge kabllosh, terminime dhe punime te vogla shpërndarjeje sipas udhezimeve."
      },
      {
        en: "Support panel setup, testing, and fault checking under engineering guidance.",
        sq: "Mbeshtet montimin e paneleve, testimet dhe kontrollin e defekteve nen drejtimin e inxhinierise."
      },
      {
        en: "Maintain clean, safe work areas around live or partially completed systems.",
        sq: "Mban zona pune te pastra dhe te sigurta prane sistemeve aktive ose te paplotesuara."
      }
    ],
    requirements: [
      {
        en: "Relevant vocational background or proven practical electrical site experience.",
        sq: "Formim profesional perkates ose eksperience e provuar praktike ne terren elektrik."
      },
      {
        en: "Ability to work safely with hand tools, test gear, and installation drawings.",
        sq: "Aftesi per te punuar ne menyre te sigurt me vegla, aparatura testimi dhe vizatime instalimi."
      },
      {
        en: "Reliable workmanship and attention to neat routing and finish quality.",
        sq: "Pune e besueshme dhe vemendje ndaj rregullsise se kalimeve dhe cilesise se perfundimit."
      }
    ],
    cardImage: "images/jobs/electrician-installation.jpg",
    cardImageAlt: { en: "Electrician on site", sq: "Elektricist ne terren" },
    image: "images/jobs/electrician-installation.jpg",
    imageAlt: { en: "Electrician installing electrical systems on site", sq: "Elektricist duke instaluar sisteme elektrike ne terren" },
    order: 18
  }),
  createJob({
    id: "job-19",
    slug: "hydrotechnician",
    profileKey: "specialists",
    title: { en: "Hydraulic Technician", sq: "Hidraulik" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Execute piping, fittings, and water network installation with technical precision.",
      sq: "Realizon punime në rrjete ujore dhe instalime hidraulike me saktësi teknike."
    },
    shortDescription: {
      en: "This role supports utility crews through practical pipework, fittings, and network installation tasks in the field.",
      sq: "Ky rol mbështet ekipet në terren në montimin, lidhjen dhe kontrollin e elementeve të rrjeteve hidraulike dhe ujore."
    },
    experience: {
      en: "2+ years in pipe installation, utility works, or water-system support.",
      sq: "2+ vite eksperiencë në instalime hidraulike, rrjete ujore ose punime utilitare të ngjashme."
    },
    responsibilities: [
      {
        en: "Install pipes, fittings, and accessories for water, drainage, or related utility networks.",
        sq: "Instalon tubacione, rakorderi dhe aksesorë për rrjete uji, drenazhimi dhe sisteme të ngjashme hidraulike."
      },
      {
        en: "Prepare trenches, supports, and joint areas in coordination with operators and supervisors.",
        sq: "Përgatit trasetë, mbështetjet dhe zonat e lidhjes në koordinim me operatorët dhe drejtuesit e punimeve."
      },
      {
        en: "Assist with pressure tests, flushing, and defect correction before handover.",
        sq: "Ndihmon në prova presioni, shpëlarje teknike dhe korrigjimin e problematikave para dorëzimit të punës."
      }
    ],
    requirements: [
      {
        en: "Hands-on experience with pipework and field installation routines.",
        sq: "Eksperiencë praktike me tubacione, lidhje hidraulike dhe procese montimi në terren."
      },
      {
        en: "Ability to follow line, level, and connection instructions accurately.",
        sq: "Aftësi për të ndjekur me saktësi udhëzimet për aksin, kuotat dhe lidhjet teknike."
      },
      {
        en: "Steady teamwork and attention to leak prevention and finish quality.",
        sq: "Përgjegjshmëri në punë në ekip dhe vëmendje ndaj parandalimit të rrjedhjeve dhe cilësisë së përfundimit."
      }
    ],
    cardImage: "images/jobs/pipe-repair.jpg",
    cardImageAlt: { en: "Hydraulic technician", sq: "Hidraulik në punë" },
    image: "images/jobs/pipe-repair.jpg",
    imageAlt: { en: "Hydraulic technician working on pipeline installation", sq: "Hidraulik duke punuar në instalimin e tubacioneve" },
    order: 19
  }),
  createJob({
    id: "job-20",
    slug: "mason-plasterer",
    profileKey: "specialists",
    title: { en: "Mason / Plasterer", sq: "Murator / Suvaxhi" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Build masonry works and apply plaster finishes according to project specifications.",
      sq: "Realizon murature dhe suvatuese sipas kerkesave teknike te projektit."
    },
    shortDescription: {
      en: "The role supports structural and finishing stages through blockwork, repairs, and clean plaster application.",
      sq: "Roli mbeshtet fazat strukturore dhe perfundimtare permes muratures, riparimeve dhe suvase se paster."
    },
    experience: {
      en: "2+ years in masonry, plastering, or mixed civil finishing works.",
      sq: "2+ vite eksperience ne murature, suvatim ose punime te kombinuara civile dhe perfundime."
    },
    responsibilities: [
      {
        en: "Carry out masonry walls, patching, and plaster application to required finish standards.",
        sq: "Kryen mure, riparime dhe suvatim sipas standardeve te kerkuara te perfundimit."
      },
      {
        en: "Prepare surfaces, mix materials, and maintain clean work sequences with adjacent trades.",
        sq: "Pergatit siperfaqet, perzien materialet dhe ruan radhen e paster te punes me profesionet fqinje."
      },
      {
        en: "Check alignment, corners, and surface consistency before sign-off.",
        sq: "Kontrollon drejtimin, kendet dhe njehtrajtshmerine e siperfaqeve perpara aprovimit."
      }
    ],
    requirements: [
      {
        en: "Practical site experience in wall building, rendering, or repair works.",
        sq: "Eksperience praktike ne kantier me mure, suvatim ose punime riparimi."
      },
      {
        en: "Understanding of finish quality, level lines, and material handling discipline.",
        sq: "Njohuri mbi cilesine e perfundimit, vijat e nivelit dhe disiplinen ne trajtimin e materialeve."
      },
      {
        en: "Ability to work productively within coordinated site schedules.",
        sq: "Aftesi per te punuar me produktivitet brenda orareve te koordinuara te kantierit."
      }
    ],
    cardImage: "images/jobs/masonry-worker.jpg",
    cardImageAlt: { en: "Mason and plasterer", sq: "Murator dhe suvaxhi" },
    image: "images/jobs/masonry-worker.jpg",
    imageAlt: { en: "Masonry and plastering works in progress", sq: "Punime murature dhe suvaje ne proces" },
    order: 20
  }),
  createJob({
    id: "job-21",
    slug: "tile-installer",
    profileKey: "specialists",
    title: { en: "Tile Installer", sq: "Pllaka Shtrues" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Install wall and floor tiles with alignment and finish quality control.",
      sq: "Shtron pllaka muri dhe dyshemeje me kontroll te saktesise dhe perfundimit."
    },
    shortDescription: {
      en: "This role focuses on careful tile placement, clean alignment, and durable finishing in interior or exterior areas.",
      sq: "Ky rol fokusohet ne vendosjen e kujdesshme te pllakave, drejtimin e paster dhe perfundimin e qendrueshem ne ambiente te brendshme ose te jashtme."
    },
    experience: {
      en: "2+ years in ceramic, porcelain, or stone tile installation.",
      sq: "2+ vite eksperience ne shtrim pllakash qeramike, porcelani ose guri."
    },
    responsibilities: [
      {
        en: "Prepare surfaces, layout reference lines, and install tiles to consistent spacInxhinier",
        sq: "Pergatit siperfaqet, vijat orientuese dhe shtron pllakat me hapesira te njejta."
      },
      {
        en: "Cut and fit tiles around corners, drains, and architectural details.",
        sq: "Pret dhe pershtat pllakat rreth kendeve, kullimeve dhe detajeve arkitektonike."
      },
      {
        en: "Complete grouting and finishing while keeping surfaces clean and protected.",
        sq: "Kryen fugimin dhe perfundimin duke mbajtur siperfaqet te pastra dhe te mbrojtura."
      }
    ],
    requirements: [
      {
        en: "Practical tiling experience with good finish quality expectations.",
        sq: "Eksperience praktike ne shtrim pllakash me pritshmeri te mira per cilesine e perfundimit."
      },
      {
        en: "Ability to keep levels, patterns, and joints accurate.",
        sq: "Aftesi per te mbajtur sakte nivelet, modelet dhe fugat."
      },
      {
        en: "Careful material handling and consistent attention to detail.",
        sq: "Trajtim i kujdesshem i materialeve dhe vemendje e vazhdueshme ndaj detajeve."
      }
    ],
    cardImage: "images/jobs/tile-installation.jpg",
    cardImageAlt: { en: "Tile installer", sq: "Pllaka shtrues" },
    image: "images/jobs/tile-installation.jpg",
    imageAlt: { en: "Tile installation work on a construction project", sq: "Punime shtrimi pllakash ne nje projekt ndertimi" },
    order: 21
  }),
  createJob({
    id: "job-22",
    slug: "rebar-worker",
    profileKey: "specialists",
    title: { en: "Rebar Worker", sq: "Hekurkthyes" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Cut, bend, and place reinforcement steel for concrete structural elements.",
      sq: "Pret, lakon dhe vendos armaturen e hekurit per elemente betoni."
    },
    shortDescription: {
      en: "This role supports concrete works through reinforcement preparation, tying, and site-ready steel placement.",
      sq: "Ky rol mbeshtet punimet e betonit permes pergatitjes se armatures, lidhjeve dhe vendosjes se hekurit ne kantier."
    },
    experience: {
      en: "2+ years in reinforcement cutting, bending, or placement works.",
      sq: "2+ vite eksperience ne prerje, lakim ose vendosje armature."
    },
    responsibilities: [
      {
        en: "Prepare and place reinforcement steel according to drawings and bar schedules.",
        sq: "Pergatit dhe vendos armaturen sipas projektit dhe listave te hekurit."
      },
      {
        en: "Tie cages, spacers, and structural assemblies before concrete placement.",
        sq: "Lidh kafazet, distancatoret dhe montimet strukturore para betonimit."
      },
      {
        en: "Coordinate with carpenters and supervisors to keep pour areas ready.",
        sq: "Koordinon me karpentieret dhe drejtuesit per te mbajtur gati zonat e betonimit."
      }
    ],
    requirements: [
      {
        en: "Practical understanding of reinforcement placement and tying methods.",
        sq: "Kuptim praktik i vendosjes se armatures dhe metodave te lidhjes."
      },
      {
        en: "Ability to follow bar marks, spacing, and cover requirements accurately.",
        sq: "Aftesi per te ndjekur sakte shenjat e hekurit, largesite dhe mbulesat."
      },
      {
        en: "Steady physical work ethic and attention to structural detail.",
        sq: "Etike e qendrueshme pune fizike dhe vemendje ndaj detajeve strukturore."
      }
    ],
    cardImage: "images/jobs/construction-engineer.jpg",
    cardImageAlt: { en: "Rebar worker", sq: "Hekurthyes ne kantier" },
    image: "images/jobs/construction-engineer.jpg",
    imageAlt: { en: "Steel reinforcement preparation on a construction site", sq: "Pergatitje e armatures se celikut ne kantier" },
    order: 22
  }),
  createJob({
    id: "job-23",
    slug: "carpenter",
    profileKey: "specialists",
    title: { en: "Carpenter", sq: "Karpentier" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Prepare and assemble wooden formwork for concrete and structural stages.",
      sq: "Pergatit dhe monton kallupe druri per fazat e betonimit dhe struktures."
    },
    shortDescription: {
      en: "This role builds and adjusts formwork elements to support safe, accurate concrete placement on site.",
      sq: "Ky rol nderton dhe pershtat elementet e kallepeve per te mbeshtetur betonim te sigurt dhe te sakte ne terren."
    },
    experience: {
      en: "2+ years in formwork carpentry or related structural support works.",
      sq: "2+ vite eksperience ne karpentieri kallepesh ose punime te ngjashme strukturore."
    },
    responsibilities: [
      {
        en: "Assemble, adjust, and dismantle timber formwork according to the work sequence.",
        sq: "Monton, pershtat dhe cmonton kallepet prej druri sipas sekuences se punes."
      },
      {
        en: "Check dimensions, levels, and stability before concrete operations begin.",
        sq: "Kontrollon dimensionet, kuotat dhe stabilitetin perpara nisjes se betonimit."
      },
      {
        en: "Coordinate with rebar crews and supervisors to keep pour zones ready.",
        sq: "Koordinon me ekipet e armatures dhe drejtuesit per te mbajtur gati zonat e hedhjes."
      }
    ],
    requirements: [
      {
        en: "Hands-on carpentry or formwork experience on active construction sites.",
        sq: "Eksperience praktike ne karpentieri ose kallepe ne kantiere aktive."
      },
      {
        en: "Ability to read simple dimensions, keep lines true, and work safely at pace.",
        sq: "Aftesi per te lexuar dimensione te thjeshta, per te mbajtur drejtimin dhe per te punuar me siguri."
      },
      {
        en: "Reliable workmanship and practical teamwork with structural crews.",
        sq: "Pune e besueshme dhe bashkepunim praktik me ekipet strukturore."
      }
    ],
    cardImage: "images/jobs/carpenter-site.jpg",
    cardImageAlt: { en: "Construction carpenter", sq: "Karpentier ne pune" },
    image: "images/jobs/carpenter-site.jpg",
    imageAlt: { en: "Carpenter assembling formwork on site", sq: "Karpentier duke montuar kallepet ne kantier" },
    order: 23
  }),
  createJob({
    id: "job-24",
    slug: "woodworker",
    profileKey: "specialists",
    title: { en: "Woodworker", sq: "Marangoz" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Produce and repair wooden components used across site and facility operations.",
      sq: "Prodhon dhe riparon elemente druri per nevojat e kantierit dhe objekteve."
    },
    shortDescription: {
      en: "The role supports workshop and site needs through practical timber fabrication, repairs, and finishing assistance.",
      sq: "Roli mbeshtet nevojat e punishtes dhe kantierit permes prodhimit praktik ne dru, riparimeve dhe ndihmes ne perfundime."
    },
    experience: {
      en: "2+ years in joinery, woodworking, or site-based timber fabrication.",
      sq: "2+ vite eksperience ne marangoz, perpunim druri ose prodhim elementesh druri ne kantier."
    },
    responsibilities: [
      {
        en: "Produce and repair timber elements used for support works, fittings, or temporary solutions.",
        sq: "Prodhon dhe riparon elemente druri te perdorur per mbeshtetje, pajisje ose zgjidhje provizore."
      },
      {
        en: "Cut, shape, and assemble wooden pieces to requested dimensions and finishes.",
        sq: "Pret, formon dhe monton elemente druri sipas dimensioneve dhe perfundimeve te kerkuara."
      },
      {
        en: "Keep workshop and site tools organized, safe, and ready for use.",
        sq: "Mban veglat e punishtes dhe terrenit te organizuara, te sigurta dhe gati per perdorim."
      }
    ],
    requirements: [
      {
        en: "Practical woodworking ability with hand and power tools.",
        sq: "Aftesi praktike ne perpunimin e drurit me vegla dore dhe elektrike."
      },
      {
        en: "Attention to dimensions, finish quality, and tidy workmanship.",
        sq: "Vemendje ndaj dimensioneve, cilesise se perfundimit dhe rregullsise ne pune."
      },
      {
        en: "Flexible attitude toward workshop support and site-driven tasks.",
        sq: "Qendrim fleksibel ndaj mbeshtetjes se punishtes dhe detyrave te diktuara nga terreni."
      }
    ],
    cardImage: "images/jobs/carpenter-site.jpg",
    cardImageAlt: { en: "Woodworker", sq: "Marangoz ne pune" },
    image: "images/jobs/carpenter-site.jpg",
    imageAlt: { en: "Woodworker preparing components for site use", sq: "Marangoz duke pergatitur elemente per perdorim ne kantier" },
    order: 24
  }),
  createJob({
    id: "job-25",
    slug: "welder",
    profileKey: "specialists",
    title: { en: "Welder", sq: "Saldator" },
    category: { en: "Construction Specialists", sq: "Specialist Ndertimi" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Execute structural welding, repairs, and steel assembly on project elements.",
      sq: "Kryen saldime strukturore, riparime dhe montim elementesh celiku."
    },
    shortDescription: {
      en: "This role supports fabrication and site installation through clean welding work, repairs, and steel fitting tasks.",
      sq: "Ky rol mbeshtet fabrikimin dhe instalimin ne terren permes saldimeve te pastra, riparimeve dhe montimit te celikut."
    },
    experience: {
      en: "2+ years in structural, workshop, or field welding activities.",
      sq: "2+ vite eksperience ne saldime strukturore, punishte ose aktivitete ne terren."
    },
    responsibilities: [
      {
        en: "Carry out welding, tack work, and steel repairs according to assigned tasks.",
        sq: "Kryen saldime, lidhje paraprake dhe riparime celiku sipas detyrave te caktuara."
      },
      {
        en: "Prepare materials, edges, and fittings before assembly or repair work begins.",
        sq: "Pergatit materialet, skajet dhe lidhjet para fillimit te montimit ose riparimit."
      },
      {
        en: "Maintain safe hot-work practices and orderly equipment handlInxhinier",
        sq: "Mban praktika te sigurta ne punet me nxehtesi dhe trajtim te rregullt te pajisjeve."
      }
    ],
    requirements: [
      {
        en: "Practical welding experience in steel fabrication, repair, or site works.",
        sq: "Eksperience praktike ne saldim per fabrikim celiku, riparime ose pune ne terren."
      },
      {
        en: "Understanding of basic joint preparation and weld quality expectations.",
        sq: "Njohuri mbi pergatitjen baze te nyjeve dhe pritshmerite e cilesise se saldimit."
      },
      {
        en: "Responsible approach to PPE, hot-work control, and team coordination.",
        sq: "Qasje e pergjegjshme ndaj PPE, kontrollit te punes me nxehtesi dhe koordinimit ne ekip."
      }
    ],
    cardImage: "images/jobs/welder-workshop.jpg",
    cardImageAlt: { en: "Welder working", sq: "Saldator ne pune" },
    image: "images/jobs/welder-workshop.jpg",
    imageAlt: { en: "Welder working on structural steel elements", sq: "Saldator duke punuar mbi elemente strukturore celiku" },
    order: 25
  }),
  createJob({
    id: "job-26",
    slug: "auto-electrician",
    profileKey: "maintenance",
    title: { en: "Auto Electrician", sq: "Elektroaut" },
    category: { en: "Machinery Maintenance", sq: "Mirmbajtje Makinerish" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Diagnose and repair electrical systems in trucks and heavy construction vehicles.",
      sq: "Diagnostikon dhe riparon sistemet elektrike ne kamione dhe makineri te renda."
    },
    shortDescription: {
      en: "This role keeps fleet and heavy equipment available by troubleshooting electrical faults and restoring reliable operation.",
      sq: "Ky rol mban flotën dhe makinerite te gatshme duke diagnostikuar defekte elektrike dhe duke rikthyer funksionimin e besueshem."
    },
    experience: {
      en: "3+ years diagnosing electrical faults on heavy vehicles or machinery.",
      sq: "3+ vite eksperience ne diagnostikimin e defekteve elektrike ne mjete te renda ose makineri."
    },
    responsibilities: [
      {
        en: "Inspect and diagnose electrical faults in trucks, vans, and heavy site machinery.",
        sq: "Inspekton dhe diagnostikon defektet elektrike ne kamione, furgone dhe makineri te renda."
      },
      {
        en: "Repair wiring, charging systems, lighting, and control-related components.",
        sq: "Riparon instalimet, sistemet e karikimit, ndricimin dhe komponentet e lidhur me kontrollin."
      },
      {
        en: "Record maintenance actions and coordinate follow-up repairs with mechanics.",
        sq: "Regjistron veprimet e mirembajtjes dhe koordinon riparimet pasuese me mekaniket."
      }
    ],
    requirements: [
      {
        en: "Relevant technical background in vehicle electrics or machinery systems.",
        sq: "Formim teknik perkates ne elektrike automjetesh ose sisteme makinerish."
      },
      {
        en: "Comfort using practical diagnostic methods and repair tools.",
        sq: "Komoditet ne perdorimin e metodave praktike diagnostikuese dhe veglave te riparimit."
      },
      {
        en: "Dependable documentation and fault-tracking habits.",
        sq: "Zakone te besueshme dokumentimi dhe ndjekjeje te defekteve."
      }
    ],
    cardImage: "images/jobs/mechanic-diagnostic.jpg",
    cardImageAlt: { en: "Auto electrician", sq: "Elektroaut ne servis" },
    image: "images/jobs/mechanic-diagnostic.jpg",
    imageAlt: { en: "Auto electrician diagnosing heavy equipment systems", sq: "Elektroaut duke diagnostikuar sistemet e makinerive te renda" },
    order: 26
  }),
  createJob({
    id: "job-27",
    slug: "mechanic",
    profileKey: "maintenance",
    title: { en: "Mechanic", sq: "Mekanik" },
    category: { en: "Machinery Maintenance", sq: "Mirmbajtje Makinerish" },
    careerLevel: { en: "Mid", sq: "Mesatar" },
    summary: {
      en: "Maintain and repair construction machinery to keep operations running reliably.",
      sq: "Miremban dhe riparon makinerite e ndertimit per operim te qendrueshem."
    },
    shortDescription: {
      en: "The role supports plant availability through preventive maintenance, repairs, and practical field troubleshootInxhinier",
      sq: "Roli mbeshtet gatishmerine e makinerive permes mirembajtjes parandaluese, riparimeve dhe diagnostikimit praktik ne terren."
    },
    experience: {
      en: "3+ years repairing heavy construction machinery, trucks, or similar equipment.",
      sq: "3+ vite eksperience ne riparimin e makinerive te renda, kamioneve ose pajisjeve te ngjashme."
    },
    responsibilities: [
      {
        en: "Carry out preventive maintenance, servicing, and mechanical repairs on fleet equipment.",
        sq: "Kryen mirembajtje parandaluese, servise dhe riparime mekanike ne flotë dhe pajisje."
      },
      {
        en: "Inspect engines, hydraulic systems, and running gear to identify faults early.",
        sq: "Kontrollon motorret, sistemet hidraulike dhe pjeset levizese per te identifikuar heret defektet."
      },
      {
        en: "Coordinate with operators to return machinery to service safely and efficiently.",
        sq: "Koordinon me operatoret per ta kthyer makinerine ne pune ne menyre te sigurt dhe efikase."
      }
    ],
    requirements: [
      {
        en: "Technical experience with heavy machinery mechanics or fleet servicInxhinier",
        sq: "Eksperience teknike me mekaniken e makinerive te renda ose servisin e flotave."
      },
      {
        en: "Ability to diagnose routine faults and complete repairs methodically.",
        sq: "Aftesi per te diagnostikuar defekte rutine dhe per te kryer riparime ne menyre metodike."
      },
      {
        en: "Organized approach to spare parts, tools, and maintenance records.",
        sq: "Qasje e organizuar ndaj pjeseve rezerve, veglave dhe regjistrave te mirembajtjes."
      }
    ],
    cardImage: "images/jobs/mechanic-diagnostic.jpg",
    cardImageAlt: { en: "Machinery mechanic", sq: "Mekanik makinerish" },
    image: "images/jobs/mechanic-diagnostic.jpg",
    imageAlt: { en: "Mechanic servicing construction equipment", sq: "Mekanik duke servisuar pajisje ndertimi" },
    order: 27
  })
];

jobs.meta = {
  filters: {
    careerLevels: ["Entry", "Mid", "Senior"]
  },
  labels: {
    careerLevel: {
      en: "Career Level",
      sq: "Niveli i Karrieres"
    },
    jobCategory: {
      en: "Job Category",
      sq: "Kategoria e Pozicionit"
    },
    roleCount: {
      en: "Open Roles",
      sq: "Pozicione te Hapura"
    },
    viewDetails: {
      en: "View Details",
      sq: "Shiko Detajet"
    },
    applyLabel: {
      en: "Apply Now",
      sq: "Apliko Tani"
    },
    closeLabel: {
      en: "Close",
      sq: "Mbyll"
    },
    dialogLabel: {
      en: "Job details dialog",
      sq: "Dritare me detajet e pozicionit"
    },
    location: {
      en: "Location",
      sq: "Vendndodhja"
    },
    employmentType: {
      en: "Employment Type",
      sq: "Lloji i Punesimit"
    },
    experience: {
      en: "Experience",
      sq: "Eksperienca"
    },
    responsibilities: {
      en: "Responsibilities",
      sq: "Pergjegjesite"
    },
    requirements: {
      en: "Requirements",
      sq: "Kerkesat"
    },
    benefits: {
      en: "Benefits / Notes",
      sq: "Perfitime / Shenime"
    },
    roleOverview: {
      en: "Role Overview",
      sq: "Permbledhje e Pozicionit"
    },
    applyPrefillTemplate: {
      en: "I am applying for: {{title}}",
      sq: "Po aplikoj per: {{title}}"
    }
  },
  emptyState: {
    title: {
      en: "No matching roles",
      sq: "Nuk u gjeten role per filtrin"
    },
    body: {
      en: "Try changing the selected career level or job category.",
      sq: "Provoni te ndryshoni nivelin e karrieres ose kategorine e pozicionit."
    }
  }
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.jobs = jobs;
}

