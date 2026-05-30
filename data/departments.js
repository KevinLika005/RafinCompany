const departments = [
  {
    id: "technical",
    name: {
      en: "Technical Department",
      sq: "Departamenti Teknik"
    },
    email: "technical@rafincompany.com",
    phone: "0688080606"
  },
  {
    id: "legal",
    name: {
      en: "Legal Department",
      sq: "Departamenti Ligjor"
    },
    email: "legal@rafincompany.com",
    phone: "0684085510"
  },
  {
    id: "finance",
    name: {
      en: "Finance Department",
      sq: "Departamenti i Financës"
    },
    email: "finance@rafincompany.com",
    phone: "0684085505"
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.departments = departments;
}
