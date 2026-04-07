const projects = [
  {
    id: "civ-1",
    slug: "sample-civil-project-1",
    categoryId: "civil-buildings",
    title: {
      en: "Healthcare Facility Renovation",
      sq: "Rikonstruksion i Objektit Shëndetësor"
    },
    excerpt: {
      en: "Modernization of safety and mechanical systems in a primary healthcare facility.",
      sq: "Modernizimi i sistemeve të sigurisë dhe mekanike në një objekt të kujdesit parësor shëndetësor."
    },
    description: {
      en: "This project focused on improving the physical layout of the medical facility to enhance safety mechanisms, improve care workflow, and integrate modern healthcare technology standards.",
      sq: "Përmirësim i strukturës fizike të objektit mjekësor për të rritur mekanizmat e sigurisë, për të përmirësuar rrjedhën e kujdesit dhe për të integruar standardet moderne të teknologjisë."
    },
    coverImage: "images/home-post-1-418x315.jpg",
    heroImages: [
      "images/project-category-healthcare.jpg",
      "images/home-1-652x491.jpg"
    ],
    location: {
      en: "Tirana, Albania",
      sq: "Tiranë, Shqipëri"
    },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "civ-2",
    slug: "sample-civil-project-2",
    categoryId: "civil-buildings",
    title: {
      en: "Commercial Warehouse Complex",
      sq: "Kompleks Komercial Magazinimi"
    },
    excerpt: {
      en: "Large scale warehouse construction optimized for logistics.",
      sq: "Ndërtim magazine në shkallë të gjerë i optimizuar për logjistikë."
    },
    description: {
      en: "Completion of a mid-sized warehouse featuring advanced storage mechanics, optimized loading bays, and energy-efficient lighting networks.",
      sq: "Përfundimi i një magazine me madhësi mesatare me mekanikë të avancuar magazinimi, zona ngarkimi të optimizuara dhe rrjete ndriçimi efiçente ndaj energjisë."
    },
    coverImage: "images/home-post-2-418x315.jpg",
    heroImages: [
      "images/parallax-2.jpg",
      "images/project-1-480x361.jpg"
    ],
    location: {
      en: "Durrës, Albania",
      sq: "Durrës, Shqipëri"
    },
    year: "2024",
    status: "In Progress",
    order: 2
  },
  {
    id: "civ-3",
    slug: "sample-civil-project-3",
    categoryId: "civil-buildings",
    title: {
      en: "Riverside Hotel Structure",
      sq: "Strukturë Hoteli Riverside"
    },
    excerpt: {
      en: "Construction of a premium hotel facility incorporating eco-friendly materials.",
      sq: "Ndërtimi i një hapësire hotelerie premium duke përfshirë materiale miqësore me mjedisin."
    },
    description: {
      en: "Our most recent completed building structure taking 14 months to complete, featuring complex foundational work and modern architectural finish.",
      sq: "Struktura jonë e fundit e përfunduar që mori 14 muaj për t'u ndërtuar, duke përfshirë punime fillestare komplekse dhe përfundime arkitekturore moderne."
    },
    coverImage: "images/home-post-3-418x315.jpg",
    heroImages: [
      "images/slider-slide-1-1920x1080.jpg"
    ],
    location: {
      en: "Vlorë, Albania",
      sq: "Vlorë, Shqipëri"
    },
    year: "2022",
    status: "Completed",
    order: 3
  },
  {
    id: "road-1",
    slug: "sample-road-project-1",
    categoryId: "road-infrastructure",
    title: {
      en: "National Highway Expansion",
      sq: "Zgjerim i Autostradës Kombëtare"
    },
    excerpt: {
      en: "Adding two new lanes over a 15km stretch.",
      sq: "Shtim i dy korsive të reja në një shtrirje prej 15km."
    },
    description: {
      en: "Expansion of the main traffic artery to increase capacity and reduce transit times, incorporating advanced signaling.",
      sq: "Zgjerim i arteries kryesore të trafikut për të rritur kapacitetin, duke përfshirë sinjalistikë të avancuar."
    },
    coverImage: "images/project-2-480x361.jpg",
    heroImages: [
      "images/parallax-1.jpg"
    ],
    location: {
      en: "Elbasan, Albania",
      sq: "Elbasan, Shqipëri"
    },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "road-2",
    slug: "sample-road-project-2",
    categoryId: "road-infrastructure",
    title: {
      en: "Mountain Pass Paving",
      sq: "Shtrim i Qafës Malore"
    },
    excerpt: {
      en: "Paving 30km of rugged terrain using durable asphalt formulas.",
      sq: "Shtrimi i 30km terreni të ashpër me formula asfalti të qëndrueshme."
    },
    description: {
      en: "A challenging logistical project bringing high-quality road infrastructure to remote mountainous areas.",
      sq: "Një projekt logjistik sfidues që sjell infrastrukturë rrugore me cilësi të lartë në zona të thella malore."
    },
    coverImage: "images/project-2-480x361.jpg",
    heroImages: [
      "images/parallax-3.jpg"
    ],
    location: {
      en: "Kukës, Albania",
      sq: "Kukës, Shqipëri"
    },
    year: "2021",
    status: "Completed",
    order: 2
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.projects = projects;
}
