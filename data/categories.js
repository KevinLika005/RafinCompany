const categories = [
  {
    id: "civil-buildings",
    slug: "civil-buildings",
    title: {
      en: "Civil Buildings",
      sq: "Ndërtime Civile"
    },
    shortDescription: {
      en: "Construction and reconstruction of civil facilities.",
      sq: "Ndërtim dhe rikonstruksion i objekteve civile."
    },
    fullDescription: {
      en: "This department organizes and manages construction activities including civil buildings, residential complexes, and general reconstruction with a focus on structural integrity and modern design.",
      sq: "Ky departament organizon dhe menaxhon aktivitetet e ndërtimit duke përfshirë ndërtesat civile, komplekset rezidenciale dhe rikonstruksionin e përgjithshëm me fokus në integritetin strukturor dhe dizajnin modern."
    },
    thumbImage: "images/project-1-480x361.jpg",
    heroImage: "images/project-category-healthcare.jpg",
    order: 1
  },
  {
    id: "road-infrastructure",
    slug: "road-infrastructure",
    title: {
      en: "Road Infrastructure",
      sq: "Infrastrukturë Rrugore"
    },
    shortDescription: {
      en: "High quality road construction and transport infrastructure.",
      sq: "Ndërtim rrugësh me cilësi të lartë dhe infrastrukturë transporti."
    },
    fullDescription: {
      en: "Through our workforce we come to our clients with high quality works and high European capacities in building reliable and durable road infrastructure.",
      sq: "Nëpërmjet fuqisë sonë punëtore ne vijmë tek klientët tanë me punime me cilësi të lartë dhe kapacitete të larta Evropiane në ndërtimin e infrastrukturës rrugore të besueshme dhe të qëndrueshme."
    },
    thumbImage: "images/project-2-480x361.jpg",
    heroImage: "images/slider-slide-1-1920x1080.jpg",
    order: 2
  },
  {
    id: "electrical-infrastructure",
    slug: "electrical-infrastructure",
    title: {
      en: "Electrical Infrastructure",
      sq: "Infrastrukturë Elektrike"
    },
    shortDescription: {
      en: "Implementation of electro-mechanical networks and equipment.",
      sq: "Zbatimi i rrjeteve dhe pajisjeve elektromekanike."
    },
    fullDescription: {
      en: "We trade and assist with high-capacity electromechanical equipment and build sophisticated electrical infrastructure, providing innovative and quality services to every customer.",
      sq: "Ne tregtojmë dhe asistojmë me pajisje elektromekanike të kapaciteteve të larta dhe ndërtojmë infrastrukturë elektrike të sofistikuar, duke ofruar shërbime inovative dhe cilësore për çdo klient."
    },
    thumbImage: "images/project-4-480x361.jpg",
    heroImage: "images/parallax-2.jpg",
    order: 3
  },
  {
    id: "industrial-projects",
    slug: "industrial-projects-oil",
    title: {
      en: "Industrial Projects (Oil)",
      sq: "Projekte Industriale (Naftë)"
    },
    shortDescription: {
      en: "Heavy industry construction and specialized oil infrastructure.",
      sq: "Ndërtim i industrisë së rëndë dhe infrastrukturë e specializuar e naftës."
    },
    fullDescription: {
      en: "Specialized in delivering robust industrial projects, including facilities for the oil sector, ensuring strict compliance with safety, health, and environmental standards.",
      sq: "Të specializuar në ofrimin e projekteve të fuqishme industriale, duke përfshirë objektet për sektorin e naftës, duke siguruar pajtueshmëri të plotë me standardet e sigurisë, shëndetit dhe mjedisit."
    },
    thumbImage: "images/home-post-2-418x315.jpg",
    heroImage: "images/parallax-1.jpg",
    order: 4
  },
  {
    id: "technology",
    slug: "technology",
    title: {
      en: "Technology",
      sq: "Teknologji"
    },
    shortDescription: {
      en: "Implementation of the latest technologies in construction.",
      sq: "Zbatimi i teknologjive më të fundit në ndërtim."
    },
    fullDescription: {
      en: "We are coherent with the implementation of the latest technology for the realization of all disciplines in construction, materials, machinery, and smart systems.",
      sq: "Ne jemi koherent me zbatimin e teknologjisë më të fundit për realizimin e të gjitha disiplinave në ndërtim, materiale, makineri dhe sisteme inteligjente."
    },
    thumbImage: "images/project-5-480x361.jpg",
    heroImage: "images/parallax-3.jpg",
    order: 5
  },
  {
    id: "water-infrastructure",
    slug: "water-infrastructure",
    title: {
      en: "Water Infrastructure",
      sq: "Infrastrukturë Ujësjellësi"
    },
    shortDescription: {
      en: "High standard water supply and sewerage construction.",
      sq: "Ndërtim ujësjellësi dhe kanalizimesh me standarde të larta."
    },
    fullDescription: {
      en: "We apply the highest standards regarding water supply and sewerage construction. We complete all capacities with a specialized workforce dedicated to sustainable water management.",
      sq: "Ne aplikojmë standardet më të larta në lidhje me ndërtimin e ujësjellës-kanalizimeve. Ne i plotësojmë të gjitha kapacitetet me një fuqi punëtore të specializuar, të dedikuar ndaj menaxhimit të qëndrueshëm të ujit."
    },
    thumbImage: "images/project-3-480x361.jpg",
    heroImage: "images/project-category-healthcare.jpg",
    order: 6
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.categories = categories;
}
