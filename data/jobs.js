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
    cardImage: null,
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
      sq: "Punëtor Ndërtimi"
    },
    category: {
      en: "Construction",
      sq: "Ndërtim"
    },
    careerLevel: {
      en: "Entry",
      sq: "Fillestar"
    },
    cardImage: null,
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
      sq: "Menaxhimi i Ndërtimit"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    cardImage: null,
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
      sq: "Shërbim dhe Mirëmbajtje"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    cardImage: null,
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
      sq: "Shërbim dhe Mirëmbajtje"
    },
    careerLevel: {
      en: "Senior",
      sq: "Senior"
    },
    cardImage: null,
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
      sq: "Shërbim dhe Mirëmbajtje"
    },
    careerLevel: {
      en: "Senior",
      sq: "Senior"
    },
    cardImage: null,
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
      sq: "Shërbim dhe Mirëmbajtje"
    },
    careerLevel: {
      en: "Mid",
      sq: "Mesatar"
    },
    cardImage: null,
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
      sq: "Udhëheqës Ekipi"
    },
    category: {
      en: "Construction Management",
      sq: "Menaxhimi i Ndërtimit"
    },
    careerLevel: {
      en: "Senior",
      sq: "Senior"
    },
    cardImage: null,
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
    cardImage: null,
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
