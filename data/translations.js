const translations = {
  Home: { en: "Home", sq: "Kryefaqja" },
  About: { en: "About", sq: "Rreth Nesh" },
  Services: { en: "Services", sq: "ShÃ«rbimet" },
  Staff: { en: "Staff", sq: "Stafi" },
  Careers: { en: "Careers", sq: "Karriera" },
  Contacts: { en: "Contacts", sq: "Kontakte" },
  projects: {
    en: "Projects",
    sq: "Projektet"
  },
  previous: {
    en: "Previous",
    sq: "MÃ«parshme"
  },
  next: {
    en: "Next",
    sq: "Tjetra"
  },
  readMore: {
    en: "Read More",
    sq: "Lexo MÃ« ShumÃ«"
  },
  viewProject: {
    en: "View Project",
    sq: "Shiko Projektin"
  },
  categories: {
    en: "Categories",
    sq: "KategoritÃ«"
  },
  contact: {
    en: "Contact",
    sq: "Kontakt"
  },
  departments: {
    en: "Departments",
    sq: "Departamentet"
  },
  certifications: {
    en: "Certifications",
    sq: "Certifikimet"
  },
  materials: {
    en: "Materials",
    sq: "Materiale"
  },
  "Building Materials": {
    en: "Building Materials",
    sq: "Materiale Ndertimi"
  },
  "Materials Section Intro": {
    en: "Structured content placeholder for the upcoming materials section.",
    sq: "Permbajtje e perkohshme per seksionin e ardhshem te materialeve."
  },
  "Materials Recycling Note": {
    en: "Recycling and sustainability note placeholder.",
    sq: "Shenim i perkohshem per riciklimin dhe qendrueshmerine."
  },
  "Contacts Section Intro": {
    en: "Placeholder structure for contact form and two map locations.",
    sq: "Strukture e perkohshme per formularin e kontaktit dhe dy vendndodhje harte."
  },
  "Location Pending": {
    en: "Pending client-provided address.",
    sq: "Adresa ne pritje nga klienti."
  },
  "Career Level": {
    en: "Career Level",
    sq: "Niveli i Karrieres"
  },
  "Job Category": {
    en: "Job Category",
    sq: "Kategoria e Pozicionit"
  },
  "All Levels": {
    en: "All Levels",
    sq: "Te Gjitha Nivelet"
  },
  "All Job Categories": {
    en: "All Job Categories",
    sq: "Te Gjitha Kategorite"
  },
  Entry: {
    en: "Entry",
    sq: "Fillestar"
  },
  Mid: {
    en: "Mid",
    sq: "Mesatar"
  },
  Senior: {
    en: "Senior",
    sq: "Senior"
  },
  "No matching roles": {
    en: "No matching roles",
    sq: "Nuk u gjeten role per filtrin"
  },
  "Try changing the selected career level or job category.": {
    en: "Try changing the selected career level or job category.",
    sq: "Provoni te ndryshoni nivelin e karrieres ose kategorine e pozicionit."
  },
  jobs: {
    en: "Jobs / Careers",
    sq: "PunÃ« / Karriera"
  },
  all: {
    en: "All",
    sq: "TÃ« Gjitha"
  },
  noProjectsFound: {
    en: "No projects found.",
    sq: "Nuk u gjetÃ«n projekte."
  },
  "Jobs / Careers": {
    en: "Jobs / Careers",
    sq: "PunÃ« / Karriera"
  },
  "Join our dynamic team": {
    en: "Join our dynamic team and build the future with us",
    sq: "Bashkohuni me ekipin tonÃ« dinamik dhe ndÃ«rtoni tÃ« ardhmen me ne"
  },
  // Homepage Sections
  "About Us": { en: "About Us", sq: "Rreth Nesh" },
  "Our Services": { en: "Our Services", sq: "ShÃ«rbimet Tona" },
  "Our Staff": { en: "Our Staff", sq: "Stafi YnÃ«" },
  "Recent News": { en: "Recent News", sq: "Lajmet e Fundit" },
  "Get In Touch": { en: "Get In Touch", sq: "Na Kontaktoni" },
  "Contact Us": { en: "Contact Us", sq: "Na Kontaktoni" },

  // Footer / Search Information
  "Search projects": { en: "Search projects...", sq: "KÃ«rko projekte..." },
  "All": { en: "All", sq: "TÃ« Gjitha" },

  // Project Metadata Labels
  "Location": { en: "Location", sq: "Vendndodhja" },
  "Year": { en: "Year", sq: "Viti" },
  "Status": { en: "Status", sq: "Statusi" },
  "Category": { en: "Category", sq: "Kategoria" },

  // Meta / SEO placeholders
  "metaDescription": {
    en: "Rafin Company - Leading construction and infrastructure company in Albania, specializing in civil construction, public works, and professional engineering.",
    sq: "Rafin Company - Kompani lider nÃ« ndÃ«rtim dhe infrastrukturÃ« nÃ« ShqipÃ«ri, e specializuar nÃ« ndÃ«rtime civile, vepra publike dhe inxhinieri profesionale."
  },

  // Recent News Placeholders
  "News1Title": { en: "Quality Infrastructure Development", sq: "Zhvillimi i InfrastrukturÃ«s CilÃ«sore" },
  "News1Body": { en: "We are expanding our reach in public works across Albania, bringing innovation and high standards.", sq: "Po zgjerojmÃ« shtrirjen tonÃ« nÃ« veprat publike nÃ« tÃ« gjithÃ« ShqipÃ«rinÃ«, duke sjellÃ« inovacion dhe standarde tÃ« larta." },
  "News2Title": { en: "Sustainable Building Practices", sq: "Praktikat e NdÃ«rtimit tÃ« QÃ«ndrueshÃ«m" },
  "News2Body": { en: "Integrating eco-friendly materials and energy-efficient solutions in our latest civil projects.", sq: "Integrimi i materialeve ekologjike dhe zgjidhjeve efiÃ§iente tÃ« energjisÃ« nÃ« projektet tona tÃ« fundit civile." },
  "News3Title": { en: "Engineering Excellence 2024", sq: "Ekselenca Inxhinierike 2024" },
  "News3Body": { en: "Our team of experts continues to deliver complex engineering solutions with precision and safety.", sq: "Ekipi ynÃ« i ekspertÃ«ve vazhdon tÃ« ofrojÃ« zgjidhje komplekse inxhinierike me precizion dhe siguri." }
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.translations = translations;
}
