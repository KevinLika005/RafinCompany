const projects = [
  // --- Civil Buildings ---
  {
    id: "civ-1",
    slug: "healthcare-facility-renovation",
    categoryId: "civil-buildings",
    title: { en: "Healthcare Facility Renovation", sq: "Rikonstruksion i Objektit Shëndetësor" },
    excerpt: { en: "Modernization of safety and mechanical systems in a primary healthcare facility.", sq: "Modernizimi i sistemeve të sigurisë dhe mekanike në një objekt të kujdesit parësor shëndetësor." },
    description: { en: "This project focused on improving the physical layout of the medical facility to enhance safety mechanisms, improve care workflow, and integrate modern healthcare technology standards.", sq: "Përmirësim i strukturës fizike të objektit mjekësor për të rritur mekanizmat e sigurisë, për të përmirësuar rrjedhën e kujdesit dhe për të integruar standardet moderne të teknologjisë." },
    coverImage: "images/home-post-1-418x315.jpg",
    heroImages: ["images/project-category-healthcare.jpg", "images/home-1-652x491.jpg"],
    location: { en: "Tirana, Albania", sq: "Tiranë, Shqipëri" },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "civ-2",
    slug: "commercial-warehouse-complex",
    categoryId: "civil-buildings",
    title: { en: "Commercial Warehouse Complex", sq: "Kompleks Komercial Magazinimi" },
    excerpt: { en: "Large scale warehouse construction optimized for logistics.", sq: "Ndërtim magazine në shkallë të gjerë i optimizuar për logjistikë." },
    description: { en: "Completion of a mid-sized warehouse featuring advanced storage mechanics, optimized loading bays, and energy-efficient lighting networks.", sq: "Përfundimi i një magazine me madhësi mesatare me mekanikë të avancuar magazinimi, zona ngarkimi të optimizuara dhe rrjete ndriçimi efiçente ndaj energjisë." },
    coverImage: "images/home-post-2-418x315.jpg",
    heroImages: ["images/parallax-2.jpg", "images/project-1-480x361.jpg"],
    location: { en: "Durrës, Albania", sq: "Durrës, Shqipëri" },
    year: "2024",
    status: "In Progress",
    order: 2
  },
  {
    id: "civ-3",
    slug: "riverside-hotel-structure",
    categoryId: "civil-buildings",
    title: { en: "Riverside Hotel Structure", sq: "Strukturë Hoteli Riverside" },
    excerpt: { en: "Construction of a premium hotel facility incorporating eco-friendly materials.", sq: "Ndërtimi i një hapësire hotelerie premium duke përfshirë materiale miqësore me mjedisin." },
    description: { en: "Our most recent completed building structure taking 14 months to complete, featuring complex foundational work and modern architectural finish.", sq: "Struktura jonë e fundit e përfunduar që mori 14 muaj për t'u ndërtuar, duke përfshirë punime fillestare komplekse dhe përfundime arkitekturore moderne." },
    coverImage: "images/home-post-3-418x315.jpg",
    heroImages: ["images/slider-slide-1-1920x1080.jpg"],
    location: { en: "Vlorë, Albania", sq: "Vlorë, Shqipëri" },
    year: "2022",
    status: "Completed",
    order: 3
  },

  // --- Road Infrastructure ---
  {
    id: "road-1",
    slug: "national-highway-expansion",
    categoryId: "road-infrastructure",
    title: { en: "National Highway Expansion", sq: "Zgjerim i Autostradës Kombëtare" },
    excerpt: { en: "Adding two new lanes over a 15km stretch.", sq: "Shtim i dy korsive të reja në një shtrirje prej 15km." },
    description: { en: "Expansion of the main traffic artery to increase capacity and reduce transit times, incorporating advanced signaling and safety barriers.", sq: "Zgjerim i arteries kryesore të trafikut për të rritur kapacitetin, duke përfshirë sinjalistikë të avancuar dhe bariera sigurie." },
    coverImage: "images/project-2-480x361.jpg",
    heroImages: ["images/parallax-1.jpg"],
    location: { en: "Elbasan, Albania", sq: "Elbasan, Shqipëri" },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "road-2",
    slug: "mountain-pass-paving",
    categoryId: "road-infrastructure",
    title: { en: "Mountain Pass Paving", sq: "Shtrim i Qafës Malore" },
    excerpt: { en: "Paving 30km of rugged terrain using durable asphalt formulas.", sq: "Shtrimi i 30km terreni të ashpër me formula asfalti të qëndrueshme." },
    description: { en: "A challenging logistical project bringing high-quality road infrastructure to remote mountainous areas, improving accessibility and safety.", sq: "Një projekt logjistik sfidues që sjell infrastrukturë rrugore me cilësi të lartë në zona të thella malore, duke përmirësuar aksesin dhe sigurinë." },
    coverImage: "images/project-2-480x361.jpg",
    heroImages: ["images/parallax-3.jpg"],
    location: { en: "Kukës, Albania", sq: "Kukës, Shqipëri" },
    year: "2021",
    status: "Completed",
    order: 2
  },
  {
    id: "road-3",
    slug: "urban-ring-road",
    categoryId: "road-infrastructure",
    title: { en: "Urban Ring Road Phase II", sq: "Unaza Urbane Faza II" },
    excerpt: { en: "Strategic urban connection to alleviate city center traffic.", sq: "Lidhje strategjike urbane për të lehtësuar trafikun e qendrës së qytetit." },
    description: { en: "Implementation of the second phase of the urban ring road, including bridges, underpasses, and modern lighting systems.", sq: "Zbatimi i fazës së dytë të unazës urbane, duke përfshirë ura, nënkalime dhe sisteme moderne ndriçimi." },
    coverImage: "images/project-1-480x361.jpg",
    heroImages: ["images/parallax-2.jpg"],
    location: { en: "Fier, Albania", sq: "Fier, Shqipëri" },
    year: "2024",
    status: "In Progress",
    order: 3
  },

  // --- Electrical Infrastructure ---
  {
    id: "elec-1",
    slug: "smart-grid-substation",
    categoryId: "electrical-infrastructure",
    title: { en: "Smart Grid Substation", sq: "Nënstacioni i Rrjetit Inteligjent" },
    excerpt: { en: "High-voltage substation upgrade with smart monitoring.", sq: "Përmirësim i nënstacionit të tensionit të lartë me monitorim inteligjent." },
    description: { en: "Modernization of power distribution hubs using digital twins and automated switching for increased reliability.", sq: "Modernizimi i nyjeve të shpërndarjes së energjisë duke përdorur binjakët digjitalë dhe ndërrim automatik për rritjen e besueshmërisë." },
    coverImage: "images/project-4-480x361.jpg",
    heroImages: ["images/parallax-2.jpg"],
    location: { en: "Korçë, Albania", sq: "Korçë, Shqipëri" },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "elec-2",
    slug: "industrial-solar-park",
    categoryId: "electrical-infrastructure",
    title: { en: "Industrial Solar Park Connection", sq: "Lidhja e Parkut Solar Industrial" },
    excerpt: { en: "Grid integration for a 50MW renewable energy plant.", sq: "Integrimi në rrjet për një impiant të energjisë së renovueshme 50MW." },
    description: { en: "Installation of medium and high voltage lines to connect the new solar park to the national grid.", sq: "Instalimi i linjave të tensionit të mesëm dhe të lartë për të lidhur parkun e ri solar me rrjetin kombëtar." },
    coverImage: "images/project-5-480x361.jpg",
    heroImages: ["images/parallax-1.jpg"],
    location: { en: "Berat, Albania", sq: "Berat, Shqipëri" },
    year: "2024",
    status: "In Progress",
    order: 2
  },
  {
    id: "elec-3",
    slug: "city-lighting-efficiency",
    categoryId: "electrical-infrastructure",
    title: { en: "City Lighting Efficiency Program", sq: "Programi i Efiçencës së Ndriçimit të Qytetit" },
    excerpt: { en: "Upgrade to LED and central control for municipal lighting.", sq: "Kalimi në LED dhe kontrolli qendror për ndriçimin bashkiak." },
    description: { en: "Replacement of traditional street lights with energy-efficient LED technology and smart dimming capabilities.", sq: "Zëvendësimi i dritave tradicionale të rrugës me teknologji LED efiçente ndaj energjisë dhe aftësi inteligjente të zbehur." },
    coverImage: "images/project-4-480x361.jpg",
    heroImages: ["images/parallax-3.jpg"],
    location: { en: "Lushnje, Albania", sq: "Lushnje, Shqipëri" },
    year: "2022",
    status: "Completed",
    order: 3
  },

  // --- Industrial Projects (Oil) ---
  {
    id: "ind-1",
    slug: "crude-oil-storage-terminal",
    categoryId: "industrial-projects",
    title: { en: "Crude Oil Storage Terminal", sq: "Terminali i Magazinimit të Naftës Bruto" },
    excerpt: { en: "Safe storage facilities for strategic oil reserves.", sq: "Objekte magazinimi të sigurta për rezervat strategjike të naftës." },
    description: { en: "Construction of high-safety storage tanks and pumping stations following international health and safety protocols.", sq: "Ndërtimi i rezervuarëve të magazinimit me siguri të lartë dhe stacioneve të pompimit sipas protokolleve ndërkombëtare të shëndetit dhe sigurisë." },
    coverImage: "images/home-post-2-418x315.jpg",
    heroImages: ["images/parallax-1.jpg"],
    location: { en: "Vlorë, Albania", sq: "Vlorë, Shqipëri" },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "ind-2",
    slug: "refinery-facility-upgrade",
    categoryId: "industrial-projects",
    title: { en: "Refinery Facility Upgrade", sq: "Përmirësimi i Objektit të Rafinerisë" },
    excerpt: { en: "Modernization of processing units and environmental filters.", sq: "Modernizimi i njësive të përpunimit dhe filtrave mjedisorë." },
    description: { en: "Integration of new filtration systems to reduce environmental impact and improve processing efficiency.", sq: "Integrimi i sistemeve të reja të filtrimit për të reduktuar ndikimin mjedisor dhe për të përmirësuar efikasitetin e përpunimit." },
    coverImage: "images/project-3-480x361.jpg",
    heroImages: ["images/parallax-2.jpg"],
    location: { en: "Ballsh, Albania", sq: "Ballsh, Shqipëri" },
    year: "2024",
    status: "In Progress",
    order: 2
  },
  {
    id: "ind-3",
    slug: "industrial-pipeline-network",
    categoryId: "industrial-projects",
    title: { en: "Industrial Pipeline Network", sq: "Rrjeti i Tubacioneve Industriale" },
    excerpt: { en: "Critical infrastructure for regional transport of crude oil.", sq: "Infrastrukturë kritike për transportin rajonal të naftës bruto." },
    description: { en: "Welding and installation of high-pressure pipelines across diverse terrains with focus on leak prevention.", sq: "Harkimi dhe instalimi i tubacioneve me presion të lartë në terrene të larmishme me fokus në parandalimin e rrjedhjeve." },
    coverImage: "images/project-5-480x361.jpg",
    heroImages: ["images/parallax-3.jpg"],
    location: { en: "Patos, Albania", sq: "Patos, Shqipëri" },
    year: "2022",
    status: "Completed",
    order: 3
  },

  // --- Technology ---
  {
    id: "tech-1",
    slug: "automated-sorting-center",
    categoryId: "technology",
    title: { en: "Automated Sorting Center", sq: "Qendra e Automatizuar e Klasifikimit" },
    excerpt: { en: "High-tech logistics hub with robotic integration.", sq: "Nyja logjistike e teknologjisë së lartë me integrim robotik." },
    description: { en: "Implementation of AI-driven sorting belts and automated inventory tracking for a modern distribution facility.", sq: "Zbatimi i rripave të klasifikimit të drejtuar nga AI dhe ndjekja e automatizuar e inventarit për një objekt modern shpërndarjeje." },
    coverImage: "images/project-5-480x361.jpg",
    heroImages: ["images/parallax-3.jpg"],
    location: { en: "Tirana, Albania", sq: "Tiranë, Shqipëri" },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "tech-2",
    slug: "smart-building-controls",
    categoryId: "technology",
    title: { en: "Smart Building Control Systems", sq: "Sistemet e Kontrollit të Ndërtesave Inteligjente" },
    excerpt: { en: "IoT integration for modern office complexes.", sq: "Integrimi i IoT për komplekset moderne të zyrave." },
    description: { en: "Installation of smart HVAC, lighting, and security systems controlled via a centralized cloud platform.", sq: "Instalimi i sistemeve inteligjente HVAC, ndriçimit dhe sigurisë të kontrolluara nëpërmjet një platforme të centralizuar në cloud." },
    coverImage: "images/project-4-480x361.jpg",
    heroImages: ["images/parallax-2.jpg"],
    location: { en: "Durrës, Albania", sq: "Durrës, Shqipëri" },
    year: "2024",
    status: "In Progress",
    order: 2
  },
  {
    id: "tech-3",
    slug: "3d-printed-modular-pilot",
    categoryId: "technology",
    title: { en: "3D Printed Modular Pilot", sq: "Piloti Modular i Printuar në 3D" },
    excerpt: { en: "Exploring advanced additive manufacturing in construction.", sq: "Eksplorimi i prodhimit të avancuar aditiv në ndërtim." },
    description: { en: "A research and pilot project building small-scale modular structures using large-scale 3D printers.", sq: "Një projekt kërkimor dhe pilot që ndërton struktura modulare në shkallë të vogël duke përdorur printerë 3D në shkallë të gjerë." },
    coverImage: "images/project-1-480x361.jpg",
    heroImages: ["images/parallax-1.jpg"],
    location: { en: "Tirana, Albania", sq: "Tiranë, Shqipëri" },
    year: "2022",
    status: "Completed",
    order: 3
  },

  // --- Water Infrastructure ---
  {
    id: "water-1",
    slug: "municipal-water-treatment-plant",
    categoryId: "water-infrastructure",
    title: { en: "Municipal Water Treatment Plant", sq: "Impianti Bashkiak i Trajtimit të Ujit" },
    excerpt: { en: "Advanced filtration for city-wide water supply.", sq: "Filtrimi i avancuar për furnizimin me ujë në mbarë qytetin." },
    description: { en: "Construction of a new water treatment facility using modern sedimentation and disinfection technology.", sq: "Ndërtimi i një objekti të ri për trajtimin e ujit duke përdorur teknologjinë moderne të sedimentimit dhe dezinfektimit." },
    coverImage: "images/project-3-480x361.jpg",
    heroImages: ["images/project-category-healthcare.jpg"],
    location: { en: "Pogradec, Albania", sq: "Pogradec, Shqipëri" },
    year: "2023",
    status: "Completed",
    order: 1
  },
  {
    id: "water-2",
    slug: "regional-sewerage-network",
    categoryId: "water-infrastructure",
    title: { en: "Regional Sewerage Network", sq: "Rrjeti Rajonal i Kanalizimeve" },
    excerpt: { en: "Extending modern sanitation to rural areas.", sq: "Zgjerimi i kanalizimeve moderne në zonat rurale." },
    description: { en: "Installation of over 50km of sewerage pipes and connecting thousands of households to the central network.", sq: "Instalimi i mbi 50km tubacioneve të kanalizimeve dhe lidhja e mijëra familjeve me rrjetin qendror." },
    coverImage: "images/project-2-480x361.jpg",
    heroImages: ["images/home-1-652x491.jpg"],
    location: { en: "Golem, Albania", sq: "Golem, Shqipëri" },
    year: "2024",
    status: "In Progress",
    order: 2
  },
  {
    id: "water-3",
    slug: "strategic-water-reservoir",
    categoryId: "water-infrastructure",
    title: { en: "Strategic Water Reservoir", sq: "Rezervuari Strategjik i Ujit" },
    excerpt: { en: "High-capacity concrete reservoir for drought resilience.", sq: "Rezervuari i betonit me kapacitet të lartë për qëndrueshmëri ndaj thatësirës." },
    description: { en: "Construction of a large-scale concrete water storage facility, ensuring emergency supply during dry seasons.", sq: "Ndërtimi i një objekti magazinimi uji prej betoni në shkallë të gjerë, duke siguruar furnizim emergjent gjatë stinëve të thata." },
    coverImage: "images/project-3-480x361.jpg",
    heroImages: ["images/parallax-3.jpg"],
    location: { en: "Lezhë, Albania", sq: "Lezhë, Shqipëri" },
    year: "2022",
    status: "Completed",
    order: 3
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.projects = projects;
}
