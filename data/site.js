const site = {
  stats: {
    completedProjects: 570,
    staff: 300,
    certifications: 11
  },
  address: {
    street: "Rruga “Haxhi Kika”, Administrative Unit No. 5",
    property: "Property No. 6/538 H 1, Apt. 4",
    city: "Tirana",
    country: "Albania"
  },
  socialLinks: {
    linkedin: "https://www.linkedin.com/",
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/"
  },
  companyName: "Rafin Company",
  established: 2018
};

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.site = site;
}
