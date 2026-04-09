const jobs = [
  {
    id: "job-1",
    slug: "truck-driver",
    title: {
      en: "Truck Driver",
      sq: "Shofer Kamioni"
    },
    category: {
      en: "Transport",
      sq: "Transport"
    },
    careerLevel: {
      en: "Entry",
      sq: "Fillestar"
    },
    summary: {
      en: "Operate heavy transport vehicles and support material movement across active construction sites.",
      sq: "Operacion i automjeteve te renda dhe mbeshtetje per levizjen e materialeve ne kantieret aktive."
    },
    cardImage: "images/truck1.jpg",
    cardImageAlt: {
      en: "Truck driver role",
      sq: "Pozicion shofer kamioni"
    },
    order: 1
  },
  {
    id: "job-2",
    slug: "construction-worker",
    title: {
      en: "Construction Worker",
      sq: "Punetor Ndertimi"
    },
    category: {
      en: "Construction",
      sq: "Ndertim"
    },
    careerLevel: {
      en: "Entry",
      sq: "Fillestar"
    },
    summary: {
      en: "Support civil works, concrete preparation, and on-site execution under engineering supervision.",
      sq: "Mbeshtetje ne punime civile, pergatitje betoni dhe zbatim ne terren nen mbikqyrje inxhinierike."
    },
    cardImage: "images/excavator22.jpg",
    cardImageAlt: {
      en: "Construction worker role",
      sq: "Pozicion punetor ndertimi"
    },
    order: 2
  },
  {
    id: "job-3",
    slug: "surveyor",
    title: {
      en: "Surveyor",
      sq: "Topograf"
    },
    category: {
      en: "Construction Management",
      sq: "Menaxhimi i Ndertimit"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    summary: {
      en: "Lead terrain measurement, topographic records, and layout control for infrastructure execution.",
      sq: "Udheheq matjet ne terren, regjistrimet topografike dhe kontrollin e piketimit per zbatimin e infrastruktures."
    },
    cardImage: "images/infrastucture/mo2.jpg",
    cardImageAlt: {
      en: "Surveyor role",
      sq: "Pozicion topografi"
    },
    order: 3
  },
  {
    id: "job-4",
    slug: "machinery-mechanic",
    title: {
      en: "Machinery Mechanic",
      sq: "Mekanik Makinerie"
    },
    category: {
      en: "Service and Maintenance",
      sq: "Sherbim dhe Mirembajtje"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    summary: {
      en: "Maintain and repair heavy machinery used for earthworks, lifting, and site logistics.",
      sq: "Mirembajtje dhe riparim i makinerive te renda per germime, ngritje dhe logjistike ne kantier."
    },
    cardImage: "images/equipement/MechanicalControls.jpg",
    cardImageAlt: {
      en: "Machinery mechanic role",
      sq: "Pozicion mekanik makinerie"
    },
    order: 4
  },
  {
    id: "job-5",
    slug: "electrical-engineer",
    title: {
      en: "Electrical Engineer",
      sq: "Inxhinier Elektrik"
    },
    category: {
      en: "Service and Maintenance",
      sq: "Sherbim dhe Mirembajtje"
    },
    careerLevel: {
      en: "Senior",
      sq: "Senior"
    },
    summary: {
      en: "Design and supervise electrical systems for industrial and infrastructure projects.",
      sq: "Projektim dhe mbikqyrje e sistemeve elektrike per projekte industriale dhe infrastrukturore."
    },
    cardImage: "images/equipement/transformator.jpg",
    cardImageAlt: {
      en: "Electrical engineer role",
      sq: "Pozicion inxhinier elektrik"
    },
    order: 5
  },
  {
    id: "job-6",
    slug: "mechanical-engineer",
    title: {
      en: "Mechanical Engineer",
      sq: "Inxhinier Mekanik"
    },
    category: {
      en: "Service and Maintenance",
      sq: "Sherbim dhe Mirembajtje"
    },
    careerLevel: {
      en: "Senior",
      sq: "Senior"
    },
    summary: {
      en: "Own mechanical design quality and execution standards across multidisciplinary project teams.",
      sq: "Pergjegjes per cilesine e projektimit mekanik dhe standardet e zbatimit ne ekipe multidisiplinare."
    },
    cardImage: "images/equipement/aircompressor.jpg",
    cardImageAlt: {
      en: "Mechanical engineer role",
      sq: "Pozicion inxhinier mekanik"
    },
    order: 6
  },
  {
    id: "job-7",
    slug: "industrial-electrician",
    title: {
      en: "Industrial Electrician",
      sq: "Elektricist Industrial"
    },
    category: {
      en: "Service and Maintenance",
      sq: "Sherbim dhe Mirembajtje"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    summary: {
      en: "Install, inspect, and troubleshoot industrial electrical networks and control units.",
      sq: "Instalim, inspektim dhe diagnostikim i rrjeteve elektrike industriale dhe njesive te kontrollit."
    },
    cardImage: "images/equipement/stabilizator.jpg",
    cardImageAlt: {
      en: "Industrial electrician role",
      sq: "Pozicion elektricist industrial"
    },
    order: 7
  },
  {
    id: "job-8",
    slug: "team-leader",
    title: {
      en: "Team Leader",
      sq: "Udheheqes Ekipi"
    },
    category: {
      en: "Construction Management",
      sq: "Menaxhimi i Ndertimit"
    },
    careerLevel: {
      en: "Senior",
      sq: "Senior"
    },
    summary: {
      en: "Coordinate site teams, schedule resources, and enforce delivery, quality, and safety targets.",
      sq: "Koordinim i ekipeve ne terren, planifikim burimesh dhe zbatim i objektivave te afatit, cilesise dhe sigurise."
    },
    cardImage: "images/home-1-652x491.jpg",
    cardImageAlt: {
      en: "Team leader role",
      sq: "Pozicion udheheqes ekipi"
    },
    order: 8
  },
  {
    id: "job-9",
    slug: "mechatronics-technician",
    title: {
      en: "Mechatronics Technician",
      sq: "Teknik Mekatronike"
    },
    category: {
      en: "Vehicle Technology",
      sq: "Teknologjia e Automjeteve"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    summary: {
      en: "Maintain mechatronic systems combining mechanics, electronics, and diagnostic software.",
      sq: "Mirembajtje e sistemeve mekatronike qe kombinojne mekanike, elektronike dhe software diagnostikues."
    },
    cardImage: "images/equipement/generator.jpg",
    cardImageAlt: {
      en: "Mechatronics technician role",
      sq: "Pozicion teknik mekatronike"
    },
    order: 9
  }
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
    applyLabel: {
      en: "Apply Now",
      sq: "Apliko Tani"
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
