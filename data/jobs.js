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
    order: 9
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.jobs = jobs;
}
