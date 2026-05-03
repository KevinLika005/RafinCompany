const site = {
  stats: {
    completedProjects: 570,
    staff: 300,
    certifications: 10
  },
  address: {
    street: "Rruga \"Haxhi Kika\", Administrative Unit No. 5",
    property: "Property No. 6/538 H 1, Apt. 4",
    city: "Tirana",
    country: "Albania"
  },
  socialLinks: {
    linkedin: "",
    instagram: "https://www.instagram.com/rafin_company_sh.p.k/",
    facebook: "",
    youtube: "",
    x: ""
  },
  companyName: "Rafin Company",
  established: 2018,
  seo: {
    canonicalHost: "https://www.rafincompany.com",
    defaultOgImage: "/rafin_transparent_logos_png/rafin-logo-original-transparent.png"
  }
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.site = site;
}
