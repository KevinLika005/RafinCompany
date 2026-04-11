const site = {
  stats: {
    completedProjects: 570,
    staff: 300,
    certifications: 11
  },
  address: {
    street: "Rruga \"Haxhi Kika\", Administrative Unit No. 5",
    property: "Property No. 6/538 H 1, Apt. 4",
    city: "Tirana",
    country: "Albania"
  },
  socialLinks: {
    linkedin: "",
    instagram: "",
    facebook: ""
  },
  companyName: "Rafin Company",
  established: 2018,
  seo: {
    canonicalHost: "https://www.rafincompany.com",
    defaultOgImage: "/images/logo-inverse-304x39.png"
  }
};

if (typeof window !== "undefined") {
  window.siteData = window.siteData || {};
  window.siteData.site = site;
}
