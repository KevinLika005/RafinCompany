const categories = [
  {
    id: 'civil-buildings',
    slug: 'civil-buildings',
    title: {
      en: 'Civil Buildings',
      sq: 'Ndërtime Civile'
    },
    shortDescription: {
      en: 'Construction, reconstruction, and public building delivery.',
      sq: 'Ndërtim, rindërtim dhe realizim i objekteve civile e publike.'
    },
    fullDescription: {
      en: 'This category includes schools, public buildings, residential reconstruction, and other civil construction works delivered with complete architectural and technical systems.',
      sq: 'Kjo kategori përfshin shkolla, godina publike, rindërtim banesash dhe punime të tjera civile, të realizuara me zgjidhje të plota arkitektonike dhe teknike.'
    },
    thumbImage: 'images/projects/bashkia-kamez-parkim-shesh-1.jpeg',
    heroImage: 'images/projects/bashkia-kamez-parkim-shesh-1.jpeg',
    featuredOnHome: true,
    order: 1
  },
  {
    id: 'road-infrastructure',
    slug: 'road-infrastructure',
    title: {
      en: 'Road Infrastructure',
      sq: 'Infrastrukturë Rrugore'
    },
    shortDescription: {
      en: 'Roads, public spaces, and urban mobility infrastructure.',
      sq: 'Rrugë, hapësira publike dhe infrastrukturë për lëvizshmëri urbane.'
    },
    fullDescription: {
      en: 'This category includes road construction, rehabilitation, public realm upgrades, and supporting infrastructure such as sidewalks, bicycle lanes, lighting, and safety elements.',
      sq: 'Kjo kategori përfshin ndërtim dhe rehabilitim rrugësh, përmirësim të hapësirave publike dhe elementë mbështetës si trotuare, korsi biçikletash, ndriçim dhe sisteme sigurie.'
    },
    thumbImage: 'images/projects/liqeni-farkes-pedonale-piste-vrapimi-1.png',
    heroImage: 'images/projects/liqeni-farkes-pedonale-piste-vrapimi-1.png',
    featuredOnHome: true,
    order: 2
  },
  {
    id: 'electrical-infrastructure',
    slug: 'electrical-infrastructure',
    title: {
      en: 'Electrical Infrastructure',
      sq: 'Infrastrukturë Elektrike'
    },
    shortDescription: {
      en: 'Medium and low voltage networks, substations, and electrical cabins.',
      sq: 'Rrjete të tensionit të mesëm e të ulët, nënstacione dhe kabina elektrike.'
    },
    fullDescription: {
      en: 'This category covers the reconstruction of electrical cabins, substations, and distribution networks to improve safety, reduce losses, and support future urban growth.',
      sq: 'Kjo kategori mbulon rikonstruksionin e kabinave elektrike, nënstacioneve dhe rrjeteve të shpërndarjes për të rritur sigurinë, ulur humbjet dhe mbështetur zhvillimin e ardhshëm urban.'
    },
    thumbImage: 'images/projects/electrical-infrastructure-home.jpg',
    heroImage: 'images/projects/electrical-infrastructure-home.jpg',
    featuredOnHome: true,
    order: 3
  },
  {
    id: 'technology',
    slug: 'technology',
    title: {
      en: 'Technology',
      sq: 'Teknologji'
    },
    shortDescription: {
      en: 'Industrial and transmission infrastructure with advanced operational systems.',
      sq: 'Infrastrukturë industriale dhe transmetimi me sisteme të avancuara operimi.'
    },
    fullDescription: {
      en: 'This category includes technologically intensive projects such as digital control systems, transmission infrastructure upgrades, safety systems, and industrial modernization.',
      sq: 'Kjo kategori përfshin projekte me intensitet të lartë teknologjik, si sisteme kontrolli digjital, përmirësim të infrastrukturës së transmetimit, sisteme sigurie dhe modernizim industrial.'
    },
    thumbImage: 'images/projects/stacioni-naftes-zharrez-1.jpeg',
    heroImage: 'images/projects/stacioni-naftes-zharrez-1.jpeg',
    featuredOnHome: true,
    order: 4
  },
  {
    id: 'water-infrastructure',
    slug: 'water-infrastructure',
    title: {
      en: 'Water Infrastructure',
      sq: 'Infrastrukturë Ujore'
    },
    shortDescription: {
      en: 'Irrigation, intake works, and river protection infrastructure.',
      sq: 'Infrastrukturë ujitjeje, vepra marrjeje dhe mbrojtje lumore.'
    },
    fullDescription: {
      en: 'This category includes irrigation canals, hydraulic rehabilitation works, intake structures, and river protection interventions that improve water management and protect agricultural land.',
      sq: 'Kjo kategori përfshin kanale ujitëse, rehabilitim hidroteknik, vepra marrjeje dhe ndërhyrje mbrojtëse lumore që rrisin efikasitetin e menaxhimit të ujit dhe mbrojnë tokat bujqësore.'
    },
    thumbImage: 'images/projects/kanalet-ujitese-shelqet-pistull-u13-u14-1.jpeg',
    heroImage: 'images/projects/kanalet-ujitese-shelqet-pistull-u13-u14-1.jpeg',
    featuredOnHome: true,
    order: 5
  },
  {
    id: 'cultural-monuments',
    slug: 'cultural-monuments',
    title: {
      en: 'Cultural Monuments',
      sq: 'Monumente Kulturore'
    },
    shortDescription: {
      en: 'Restoration and reconstruction of historically significant cultural sites.',
      sq: 'Restaurim dhe rikonstruksion i objekteve me vlerë të lartë historike dhe kulturore.'
    },
    fullDescription: {
      en: 'This category includes restoration, reconstruction, and adaptive renewal projects for cultural monuments and heritage buildings, with careful attention to historic identity and contemporary use.',
      sq: 'Kjo kategori përfshin projekte restaurimi, rikonstruksioni dhe rigjallërimi funksional të monumenteve kulturore dhe objekteve të trashëgimisë, me kujdes ndaj identitetit historik dhe përdorimit bashkëkohor.'
    },
    thumbImage: 'images/fotot_kryesore_mesonjetorja/01_pamje_jashte_porta_001s.jpg',
    heroImage: 'images/fotot_kryesore_mesonjetorja/01_pamje_jashte_porta_001s.jpg',
    featuredOnHome: true,
    order: 6
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.categories = categories;
}
