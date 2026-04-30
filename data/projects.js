const localized = (value) => ({ en: value, sq: value });

function buildProjectBody(client, paragraphs, metrics = []) {
  const parts = [];

  if (client) {
    parts.push(`<p><strong>Klienti / Institucioni:</strong> ${client}</p>`);
  }

  paragraphs.filter(Boolean).forEach((paragraph) => {
    parts.push(`<p>${paragraph}</p>`);
  });

  if (metrics.length > 0) {
    parts.push('<h5>Të dhëna teknike</h5>');
    parts.push('<ul>');
    metrics.forEach((metric) => {
      parts.push(`<li>${metric}</li>`);
    });
    parts.push('</ul>');
  }

  return localized(parts.join(''));
}

const projects = [
  {
    id: 'road-1',
    slug: 'liqeni-farkes-pedonale-piste-vrapimi',
    categoryId: 'road-infrastructure',
    title: localized('Ndërtim pedonale, pistë vrapimi dhe korsi biçikletash në Liqenin e Farkës'),
    client: localized('Bashkia Tiranë'),
    excerpt: localized('Transformim i zonës së Liqenit të Farkës në një hapësirë rekreative me pistë vrapimi, korsi biçikletash dhe trotuare të dedikuara.'),
    description: localized('Projekti ka transformuar zonën e Liqenit të Farkës në një hapësirë moderne rekreative dhe turistike, me infrastrukturë të dedikuar për aktivitetet në natyrë.'),
    detailsHtml: buildProjectBody(
      'Bashkia Tiranë',
      [
        'Projekti për zhvillimin e zonës së Liqenit të Farkës ka transformuar zonën në një hapësirë moderne rekreative dhe turistike për qytetarët dhe vizitorët.',
        'Rreth liqenit është ndërtuar një infrastrukturë e dedikuar për aktivitetet në natyrë, ndërsa projekti e ka kthyer zonën në një hapësirë të gjallë për sport, relaks dhe aktivitete në natyrë për të gjitha moshat.'
      ],
      [
        'Pistë vrapimi dhe korsi biçikletash me gjatësi 6,300 ml',
        'Trotuare me beton të stampuar me sipërfaqe rreth 16,745 m²',
        'Ndërtim i një moli pranë Parkut Helen'
      ]
    ),
    metrics: [
      'Pistë vrapimi dhe korsi biçikletash me gjatësi 6,300 ml',
      'Trotuare me beton të stampuar me sipërfaqe rreth 16,745 m²',
      'Ndërtim i një moli pranë Parkut Helen'
    ],
    coverImage: 'images/projects/liqeni-farkes-pedonale-piste-vrapimi-1.png',
    heroImages: [
      'images/projects/liqeni-farkes-pedonale-piste-vrapimi-1.png',
      'images/projects/liqeni-farkes-pedonale-piste-vrapimi-2.png',
      'images/projects/liqeni-farkes-pedonale-piste-vrapimi-3.png'
    ],
    location: localized('Liqeni i Farkës, Tiranë'),
    order: 1
  },
  {
    id: 'road-2',
    slug: 'garnizoni-skenderbej-infrastruktura',
    categoryId: 'road-infrastructure',
    title: localized('Përmirësim i infrastrukturës në Garnizonin "Skënderbej"'),
    client: localized('Shtabi i Përgjithshëm i Forcave të Armatosura - Reparti Ushtarak nr. 6630'),
    excerpt: localized('Projekt multifunksional infrastrukturor me ndërhyrje në rrugë, sheshe, objekte dhe hapësira sportive brenda Garnizonit "Skënderbej".'),
    description: localized('Projekti përfshin ndërhyrje të integruara në rrugë, sheshe, objekte dhe hapësira sportive me synim rritjen e funksionalitetit, sigurisë dhe standardeve të shërbimit brenda garnizonit.'),
    detailsHtml: buildProjectBody(
      'Shtabi i Përgjithshëm i Forcave të Armatosura - Reparti Ushtarak nr. 6630',
      [
        'Përmirësimi i infrastrukturës në Garnizonin "Skënderbej" është një projekt multifunksional infrastrukturor që përfshin ndërhyrje të integruara në rrugë, sheshe, objekte dhe hapësira sportive.',
        'Përveç ndërhyrjeve ndërtimore dhe sportive, në të gjithë territorin e projektit janë integruar ndriçimi i jashtëm, sistemet e kullimit të ujërave, instalimet teknike sipas standardeve bashkëkohore dhe sistemi i kamerave të sigurisë (CCTV).'
      ],
      [
        'Shesh ceremonial me sipërfaqe 1,200 m²',
        'Akse rrugore dhe zona shërbimi me shtresa të reja asfaltike në 5,600 m²',
        'Kompleks sportiv me sipërfaqe totale 12,220 m²',
        'Pistë vrapimi me shtresë tartani 3,500 m²',
        'Fushë futbolli me tapet bari artificial 7,100 m²',
        'Fushë volejbolli/basketbolli 703 m²',
        'Fushë tenisi 672 m²',
        'Ndërtim i objektit të ri të Postbllokut nr. 4 me strukturë betonarme'
      ]
    ),
    metrics: [
      'Shesh ceremonial me sipërfaqe 1,200 m²',
      'Akse rrugore dhe zona shërbimi me shtresa të reja asfaltike në 5,600 m²',
      'Kompleks sportiv me sipërfaqe totale 12,220 m²',
      'Pistë vrapimi me shtresë tartani 3,500 m²',
      'Fushë futbolli me tapet bari artificial 7,100 m²',
      'Fushë volejbolli/basketbolli 703 m²',
      'Fushë tenisi 672 m²',
      'Ndërtim i objektit të ri të Postbllokut nr. 4 me strukturë betonarme'
    ],
    coverImage: 'images/projects/stadium.jpeg',
    heroImages: [
      'images/projects/stadium.jpeg',
      'images/projects/stadium-2.jpeg',
      'images/projects/stadium-3.jpeg'
    ],
    location: localized('Garnizoni "Skënderbej"'),
    order: 2
  },
  {
    id: 'road-3',
    slug: 'parku-mbyllur-hmmwv',
    categoryId: 'road-infrastructure',
    title: localized('Ndërtim i parkut të mbyllur (B) për mjetet e blinduara (HMMWV)'),
    client: localized('Komanda e Forcës Tokësore (Reparti Ushtarak nr. 1001)'),
    excerpt: localized('Ndërtim i parkut të mbyllur për mjetet e blinduara HMMWV, me kapacitet të lartë parkimi dhe sisteme teknike mbështetëse.'),
    description: localized('Objekti përfshin parkun e mbyllur për mjetet e blinduara HMMWV, sheshin e aksesit dhe parkimit, si dhe godinën e vendkontrollit teknik me sistemet teknike shoqëruese.'),
    detailsHtml: buildProjectBody(
      'Komanda e Forcës Tokësore (Reparti Ushtarak nr. 1001)',
      [
        'Ky objekt përfshin punime ndërtimi për parkun e mbyllur për mjetet e blinduara, të realizuar me konstruksione metalike të inkastruara në plinta betoni dhe me mbulim e mure anësore me panele sandwich.',
        'Në kuadër të projektit janë realizuar edhe godina e vendkontrollit teknik, instalimet elektrike, sistemi i mbrojtjes nga zjarri dhe sistemi i kanalizimit e menaxhimit të ujërave të shiut.'
      ],
      [
        'Sipërfaqe ndërtimore 11,000 m²',
        'Kapacitet deri në 87 mjete të blinduara',
        'Shesh aksesi dhe parkimi me sipërfaqe 6,800 m²',
        'Dysheme e projektuar me shtresa teknike për tonazh të rëndë'
      ]
    ),
    metrics: [
      'Sipërfaqe ndërtimore 11,000 m²',
      'Kapacitet deri në 87 mjete të blinduara',
      'Shesh aksesi dhe parkimi me sipërfaqe 6,800 m²',
      'Dysheme e projektuar me shtresa teknike për tonazh të rëndë'
    ],
    coverImage: 'images/projects/parku-mbyllur-hmmwv-1.jpeg',
    heroImages: [
      'images/projects/parku-mbyllur-hmmwv-1.jpeg',
      'images/projects/parku-mbyllur-hmmwv-2.jpeg'
    ],
    order: 3
  },
  {
    id: 'road-4',
    slug: 'rruga-fshatit-dritas',
    categoryId: 'road-infrastructure',
    title: localized('Sistemim asfaltim i rrugës së fshatit Dritas'),
    client: localized('Këshilli i Qarkut Tiranë'),
    excerpt: localized('Ndërtim dhe rehabilitim i rrugës së fshatit Dritas në Zall Herr, me paketë të plotë rrugore dhe elementë sigurie.'),
    description: localized('Projekti ka përfshirë ndërtimin dhe rehabilitimin e rrugës së fshatit Dritas, duke e kthyer atë në një infrastrukturë rrugore sipas standardeve dhe nevojave të komunitetit.'),
    detailsHtml: buildProjectBody(
      'Këshilli i Qarkut Tiranë',
      [
        'Ky projekt ka përfshirë ndërtimin dhe rehabilitimin e rrugës së fshatit Dritas, Njësia Administrative Zall Herr, Bashkia Tiranë.',
        'Punimet kanë përfshirë profilimin e rrugës, paketën e plotë rrugore, rehabilitimin e kanaleve ujitëse, si dhe pajisjen e segmentit me sinjalistikën horizontale e vertikale dhe guardrail mbrojtës aty ku kërkohej rritja e sigurisë rrugore.'
      ],
      [
        'Dy segmente me gjatësi 2,175 ml dhe 450 ml',
        'Gjatësi totale 2,625 ml',
        'Shtresa asfaltike me sipërfaqe 13,000 m²',
        'Ndërtim bankinash, kunetash dhe bordurash'
      ]
    ),
    metrics: [
      'Dy segmente me gjatësi 2,175 ml dhe 450 ml',
      'Gjatësi totale 2,625 ml',
      'Shtresa asfaltike me sipërfaqe 13,000 m²',
      'Ndërtim bankinash, kunetash dhe bordurash'
    ],
    coverImage: 'images/projects/rruga-fshatit-dritas-1.png',
    heroImages: [
      'images/projects/rruga-fshatit-dritas-1.png',
      'images/projects/rruga-fshatit-dritas-2.jpeg'
    ],
    location: localized('Dritas, Zall Herr, Tiranë'),
    order: 4
  },
  {
    id: 'road-5',
    slug: 'rruga-fshatit-luz-i-madh',
    categoryId: 'road-infrastructure',
    title: localized('Sistemim asfaltim i rrugës së fshatit Luz i Madh'),
    client: localized('Këshilli i Qarkut Tiranë'),
    excerpt: localized('Rikonstruksion i plotë i rrugës së fshatit Luz i Madh në Bashkinë Rrogozhinë, me shtresa të reja asfaltike dhe elementë sigurie rrugore.'),
    description: localized('Projekti ka përfshirë ndërtimin dhe rehabilitimin e rrugës së fshatit Luz i Madh, duke përmirësuar sigurinë, funksionalitetin dhe qëndrueshmërinë e segmentit.'),
    detailsHtml: buildProjectBody(
      'Këshilli i Qarkut Tiranë',
      [
        'Ky projekt ka përfshirë ndërtimin dhe rehabilitimin e rrugës së fshatit Luz i Madh, Bashkia Rrogozhinë.',
        'Punimet kanë përfshirë shtresat e nënbazës dhe bazës, trajtimin me paketën e shtresave asfaltike, ndërtimin e bankinave, veprave të artit për menaxhimin e ujërave dhe pajisjen e rrugës me sinjalistikën e nevojshme horizontale dhe vertikale.'
      ],
      [
        'Gjatësi segmenti 1,600 ml',
        'Shtresa asfaltike me sipërfaqe 8,000 m²'
      ]
    ),
    metrics: [
      'Gjatësi segmenti 1,600 ml',
      'Shtresa asfaltike me sipërfaqe 8,000 m²'
    ],
    coverImage: 'images/projects/luz-1.jpeg',
    heroImages: [
      'images/projects/luz-1.jpeg',
      'images/projects/luz-2.jpeg',
      'images/projects/luz3.jpeg',
      'images/projects/luz4.jpeg'
    ],
    location: localized('Luz i Madh, Rrogozhinë'),
    order: 5
  },
  {
    id: 'road-6',
    slug: 'rruget-kryesore-5-maji-faza-3',
    categoryId: 'road-infrastructure',
    title: localized('Ndërtimi i rrugëve kryesore të zonës "5 Maji" (Faza 3)'),
    client: localized('Bashkia e Tiranës'),
    excerpt: localized('Ndërhyrje për ndërtimin dhe rikonstruksionin e rrugëve kryesore në Njësitë Administrative 4 dhe 8, në zonën "5 Maji".'),
    description: localized('Projekti parashikon ndërhyrje të plota në infrastrukturën rrugore të zonës "5 Maji", duke përfshirë rrugë, trotuare, korsi biçikletash, ndriçim dhe rrjete inxhinierike.'),
    detailsHtml: buildProjectBody(
      'Bashkia e Tiranës',
      [
        'Ky projekt parashikon ndërhyrjet për ndërtimin dhe rikonstruksionin e rrugëve kryesore të zonave të prekura nga tërmeti, konkretisht në Njësinë Administrative nr. 4 dhe 8, Zona "5 Maji".',
        'Punimet përfshijnë prishje, gërmime, ndërtimin e trupit të rrugës dhe shtresave asfaltike, korsitë e biçikletave, trotuaret, bordurat dhe kunetat, si dhe ura, ndriçim rrugor, furnizim me energji elektrike, kanalizime, ujësjellës, mbrojtje kundër zjarrit, sinjalistikë, gjelbërim dhe elementë urbanë.'
      ],
      [
        'Ndërtim dhe rikonstruksion i infrastrukturës rrugore në Njësitë Administrative 4 dhe 8',
        'Realizim i korsive të biçikletave, trotuareve, bordurave dhe kunetave',
        'Ndërtim dhe rikonstruksion i urave',
        'Instalim i ndriçimit rrugor dhe i rrjeteve inxhinierike'
      ]
    ),
    metrics: [
      'Ndërtim dhe rikonstruksion i infrastrukturës rrugore në Njësitë Administrative 4 dhe 8',
      'Realizim i korsive të biçikletave, trotuareve, bordurave dhe kunetave',
      'Ndërtim dhe rikonstruksion i urave',
      'Instalim i ndriçimit rrugor dhe i rrjeteve inxhinierike'
    ],
    coverImage: 'images/projects/rruget-kryesore-5-maji-faza-3-1.jpeg',
    heroImages: [
      'images/projects/rruget-kryesore-5-maji-faza-3-1.jpeg',
      'images/projects/rruget-kryesore-5-maji-faza-3-2.png',
      'images/projects/rruget-kryesore-5-maji-faza-3-3.png',
      'images/projects/rruget-kryesore-5-maji-faza-3-4.jpeg',
      'images/projects/rruget-kryesore-5-maji-faza-3-5.jpeg',
      'images/projects/rruget-kryesore-5-maji-faza-3-6.jpeg'
    ],
    location: localized('Zona "5 Maji", Tiranë'),
    order: 6
  },
  {
    id: 'civil-1',
    slug: 'njesite-banimit-mirdite-rreshen',
    categoryId: 'civil-buildings',
    title: localized('Rindërtimi i njësive të banimit në Mirditë'),
    client: localized('Fondi Shqiptar i Zhvillimit'),
    excerpt: localized('Ndërtim i objekteve shumëkatëshe dhe njësive pikësore të banimit në zonën e re për zhvillim në Rrëshen.'),
    description: localized('Në kuadër të projektit të rindërtimit në Mirditë janë ndërtuar objekte banimi shumëkatëshe dhe njësi banimi pikësore, me përfundime të plota strukturore, arkitektonike dhe teknike.'),
    detailsHtml: buildProjectBody(
      'Fondi Shqiptar i Zhvillimit',
      [
        'Në kuadër të projektit të rindërtimit, në bashkëpunim me operatorë të tjerë ekonomikë, janë ndërtuar objekte banimi shumëkatëshe dhe njësi banimi pikësore në Njësinë Administrative Rrëshen, Bashkia Mirditë.',
        'Punimet kanë përfshirë ndërtimin e plotë të strukturës, punime murature, shtresa, suvatime, bojatisje dhe instalime elektrike e hidraulike, në përputhje me projektin arkitektonik dhe strukturor.'
      ],
      [
        '6 objekte banimi shumëkatëshe',
        'Tipologji 3 kate mbi tokë + 1 kat nëntokë (parkim)',
        '2 njësi banimi pikësore',
        'Ashensorë dhe qarkullim vertikal i dedikuar për aksesueshmëri'
      ]
    ),
    metrics: [
      '6 objekte banimi shumëkatëshe',
      'Tipologji 3 kate mbi tokë + 1 kat nëntokë (parkim)',
      '2 njësi banimi pikësore',
      'Ashensorë dhe qarkullim vertikal i dedikuar për aksesueshmëri'
    ],
    coverImage: 'images/projects/njesite-banimit-mirdite-rreshen-1.png',
    heroImages: [
      'images/projects/njesite-banimit-mirdite-rreshen-1.png',
      'images/projects/njesite-banimit-mirdite-rreshen-2.png'
    ],
    location: localized('Rrëshen, Mirditë'),
    order: 7
  },
  {
    id: 'civil-2',
    slug: 'shkolla-lidhja-e-prizrenit',
    categoryId: 'civil-buildings',
    title: localized('Rindërtim i shkollës 9-vjeçare "Lidhja e Prizrenit"'),
    client: localized('Bashkia Kamëz'),
    excerpt: localized('Ndërtim i godinës së re të shkollës "Lidhja e Prizrenit" në Babrru Paskuqan, me ambiente mësimore, palestër dhe sisteme moderne teknike.'),
    description: localized('Në Babrru Paskuqan është ndërtuar shkolla e re "Lidhja e Prizrenit", me organizim funksional të kateve mësimore, palestër të integruar dhe sisteme bashkëkohore teknike e sigurie.'),
    detailsHtml: buildProjectBody(
      'Bashkia Kamëz',
      [
        'Në Njësinë Administrative Paskuqan, Bashkia Kamëz, është ndërtuar shkolla e re "Lidhja e Prizrenit", një godinë me kate mësimore të organizuara sipas standardeve bashkëkohore dhe me palestër në katin e sipërm.',
        'Objekti është i pajisur me fasadë me gips-çimento dhe sistem kapotë, shkallë dhe ashensor për akses të plotë, si dhe me sisteme elektrike, hidrosanitare, kondicionimi, ndriçimi normal e emergjent, CCTV dhe alarm.'
      ],
      [
        'Godinë 4 kate mbi tokë + 1 kat nëntokë',
        'Sipërfaqe 3,450 m²',
        'Palestër me masa të plota për izolim akustik',
        'Zona të gjelbëruara, fushë volejbolli dhe shkallare multifunksionale'
      ]
    ),
    metrics: [
      'Godinë 4 kate mbi tokë + 1 kat nëntokë',
      'Sipërfaqe 3,450 m²',
      'Palestër me masa të plota për izolim akustik',
      'Zona të gjelbëruara, fushë volejbolli dhe shkallare multifunksionale'
    ],
    coverImage: 'images/projects/shkolla-lidhja-e-prizrenit-1.png',
    heroImages: [
      'images/projects/shkolla-lidhja-e-prizrenit-1.png'
    ],
    location: localized('Babrru Paskuqan, Kamëz'),
    order: 8
  },
  {
    id: 'civil-3',
    slug: 'farmacia-shendeti-publik',
    categoryId: 'civil-buildings',
    title: localized('Rikonstruksion i godinës së Farmacisë dhe Shëndetit Publik'),
    client: localized('Universiteti i Mjekësisë, Tiranë'),
    excerpt: localized('Rikonstruksion i plotë i godinës së Fakultetit të Farmacisë dhe Shëndetit Publik, me përforcime strukturore dhe fasadë të ventiluar HPL.'),
    description: localized('Projekti përfshin rikonstruksionin e plotë të godinës së Fakultetit të Farmacisë dhe Shëndetit Publik, me riorganizim funksional të ambienteve dhe instalim të plotë të rrjeteve inxhinierike.'),
    detailsHtml: buildProjectBody(
      'Universiteti i Mjekësisë, Tiranë',
      [
        'Projekti përfshin rikonstruksionin e plotë të godinës së Fakultetit të Farmacisë dhe Shëndetit Publik, me prishje selektive, përforcime strukturore dhe riorganizim funksional të ambienteve të brendshme.',
        'Një element dallues i projektit është realizimi i fasadës së ventiluar me panele HPL dhe hyrja kryesore me xham strukturor e strehë të veshur me alukobond, që i jep objektit një identitet të veçantë arkitektonik.'
      ],
      [
        'Objekt 4 kate mbi tokë + 1 kat nëntokë',
        'Sipërfaqe totale rreth 2,975 m²',
        'Fasadë e ventiluar me panele HPL në rreth 2,000 m²',
        'Instalim i sistemeve elektrike, HVAC, mbrojtjes nga zjarri, CCTV dhe kontrollit të aksesit'
      ]
    ),
    metrics: [
      'Objekt 4 kate mbi tokë + 1 kat nëntokë',
      'Sipërfaqe totale rreth 2,975 m²',
      'Fasadë e ventiluar me panele HPL në rreth 2,000 m²',
      'Instalim i sistemeve elektrike, HVAC, mbrojtjes nga zjarri, CCTV dhe kontrollit të aksesit'
    ],
    coverImage: 'images/projects/farmacia-shendeti-publik-1.png',
    heroImages: [
      'images/projects/farmacia-shendeti-publik-1.png',
      'images/projects/farmacia-shendeti-publik-2.png'
    ],
    location: localized('Tiranë'),
    order: 9
  },
  {
    id: 'civil-4',
    slug: 'bashkia-kamez-parkim-shesh',
    categoryId: 'civil-buildings',
    title: localized('Ndërtim i parkimit me 1 kat nëntokë, objekti 3-katësh i bashkisë dhe rehabilitimi i sheshit'),
    client: localized('Bashkia Kamëz'),
    excerpt: localized('Godinë e re administrative për Bashkinë Kamëz, me parkim nëntokësor dhe trajtim të plotë të hapësirave të jashtme.'),
    description: localized('Projekti përfaqëson ndërtimin e një godine administrative me standarde bashkëkohore, së bashku me parkimin nëntokësor dhe rehabilitimin e sheshit.'),
    detailsHtml: buildProjectBody(
      'Bashkia Kamëz',
      [
        'Godina e re e Bashkisë Kamëz është një objekt tërësisht i ri me tre kate dhe një kat nëntokë, i projektuar për funksionalitet institucional dhe cilësi të lartë ndërtimi.',
        'Objekti do të pajiset me fasadë me travertinë të hollë, termoizolim me lesh guri, sisteme elektrike dhe elektronike, monitorim, panele fotovoltaike dhe sistem kondicionimi VRF, ndërsa hapësirat e jashtme trajtohen me beton me agregat të ekspozuar, gjelbërim dhe struktura pergola.'
      ],
      [
        'Sipërfaqe objekti 2,200 m²',
        'Parkim nëntokësor me sipërfaqe rreth 3,000 m²',
        'Trajtim i hapësirave të jashtme rreth 9,000 m²'
      ]
    ),
    metrics: [
      'Sipërfaqe objekti 2,200 m²',
      'Parkim nëntokësor me sipërfaqe rreth 3,000 m²',
      'Trajtim i hapësirave të jashtme rreth 9,000 m²'
    ],
    coverImage: 'images/projects/bashkia-kamez-parkim-shesh-1.jpeg',
    heroImages: [
      'images/projects/bashkia-kamez-parkim-shesh-1.jpeg'
    ],
    location: localized('Kamëz'),
    order: 10
  },
  {
    id: 'civil-5',
    slug: 'kopshti-okshtun',
    categoryId: 'civil-buildings',
    title: localized('Rindërtim i kopshtit Okshtun'),
    client: localized('UNDP - United Nations Development Programme'),
    excerpt: localized('Rindërtim i kopshtit "Okshtun" në kuadër të programit EU4Schools, me fokus aksesueshmërinë, sigurinë dhe eficiencën e energjisë.'),
    description: localized('Kopshti "Okshtun" është rindërtuar sipas standardeve të larta europiane, me dalje emergjence, aksesueshmëri të plotë dhe sisteme moderne teknike e sigurie.'),
    detailsHtml: buildProjectBody(
      'UNDP - United Nations Development Programme',
      [
        'Kopshti "Okshtun" në fshatin Okshtun të Bashkisë Rrogozhinë është një prej 15 objekteve arsimore në proces rindërtimi apo riparimi në kuadër të programit "EU4Schools".',
        'Objekti është ndërtuar me dy volume të sfazuar, me dalje emergjence, rampë dhe tualete për fëmijët me aftësi të kufizuara, sistem kundër zjarrit, kamera sigurie, kënd të jashtëm lojërash dhe eficiencë të lartë energjie.'
      ],
      [
        'Godinë njëkatëshe me sipërfaqe 93 m²',
        'Sistem ngrohje-ftohje dhe ndriçim LED',
        'Rindërtim sipas standardeve të programit EU4Schools'
      ]
    ),
    metrics: [
      'Godinë njëkatëshe me sipërfaqe 93 m²',
      'Sistem ngrohje-ftohje dhe ndriçim LED',
      'Rindërtim sipas standardeve të programit EU4Schools'
    ],
    coverImage: 'images/projects/kopshti-okshtun-1.jpeg',
    heroImages: [
      'images/projects/kopshti-okshtun-1.jpeg'
    ],
    location: localized('Okshtun, Rrogozhinë'),
    order: 11
  },
  {
    id: 'civil-6',
    slug: 'banesat-vaqarr',
    categoryId: 'civil-buildings',
    title: localized('Ndërtim i 20 banesave individuale në njësinë administrative Vaqarr'),
    client: localized('Bashkia Tiranë'),
    excerpt: localized('Rimëkëmbje e njësisë së Vaqarrit pas tërmetit, me ndërtimin e 20 banesave individuale dhe infrastrukturës shoqëruese.'),
    description: localized('Në kuadër të programit të rimëkëmbjes pas tërmetit janë realizuar me cilësi të plotë 20 banesa individuale në Vaqarr, me tipologji të ndryshme apartamentesh.'),
    detailsHtml: buildProjectBody(
      'Bashkia Tiranë',
      [
        'Në kuadër të ndërtimit të banesave pas fatkeqësisë së tërmetit në Shqipëri u mundësua rimëkëmbja e njësisë së Vaqarrit me një angazhim total të kapaciteteve.',
        'Në kohë rekord janë realizuar me cilësi të plotë banesat individuale dhe infrastruktura shoqëruese për familjet përfituese.'
      ],
      [
        '20 banesa individuale në total',
        '9 shtëpi individuale 1+1',
        '6 shtëpi individuale 2+1',
        '5 shtëpi individuale 3+1'
      ]
    ),
    metrics: [
      '20 banesa individuale në total',
      '9 shtëpi individuale 1+1',
      '6 shtëpi individuale 2+1',
      '5 shtëpi individuale 3+1'
    ],
    coverImage: 'images/projects/banesat-vaqarr-1.jpeg',
    heroImages: [
      'images/projects/banesat-vaqarr-1.jpeg',
      'images/projects/banesat-vaqarr-2.jpeg'
    ],
    location: localized('Vaqarr, Tiranë'),
    order: 12
  },
  {
    id: 'elec-1',
    slug: 'kabinat-20kv-tirane',
    categoryId: 'electrical-infrastructure',
    title: localized('Rikonstruksioni i kabinave 20 kV të nënstacioneve Kashar, Qendër, Selitë, Traktora, Rajonal dhe Farkë'),
    client: localized('Drejtoria Rajonale Tiranë / OSSH sh.a'),
    excerpt: localized('Rikonstruksion i 140 kabinave elektrike në disa zona të Tiranës për të ulur humbjet në rrjet dhe për të rritur sigurinë e furnizimit me energji.'),
    description: localized('Projekti përfshin rikonstruksionin e 140 kabinave elektrike në Tiranë, me ndërhyrje në pajisje, tokëzim dhe punime ndërtimore për përmirësimin e performancës së rrjetit.'),
    detailsHtml: buildProjectBody(
      'Drejtoria Rajonale Tiranë / OSSH sh.a',
      [
        'Projekti përfshin rikonstruksionin e 140 kabinave elektrike në disa zona të Tiranës, duke mbuluar Paskuqanin, Laprakën, Unazën e Madhe, Unazën e Vogël, Fushën e Aviacionit, Alliasin, Shkozën, Saukun dhe Don Boskon.',
        'Ndërhyrjet fokusohen te zëvendësimi i pajisjeve elektrike, çelat TM, panelet TU, urat TU dhe TM, tokëzimi i kabinave dhe punimet ndërtimore, me synim uljen e humbjeve dhe rritjen e sigurisë së furnizimit.'
      ],
      [
        '140 kabina elektrike',
        'Shtrirje gjeografike rreth 50 km²',
        '30 fidra në nënstacionet Kashar, Farkë, Rajonal, Kombinat, Selitë, Traktora dhe Qendër',
        'Punime elektrike dhe ndërtimore sipas standardeve të OSSH'
      ]
    ),
    metrics: [
      '140 kabina elektrike',
      'Shtrirje gjeografike rreth 50 km²',
      '30 fidra në nënstacionet Kashar, Farkë, Rajonal, Kombinat, Selitë, Traktora dhe Qendër',
      'Punime elektrike dhe ndërtimore sipas standardeve të OSSH'
    ],
    coverImage: 'images/projects/kabinat-20kv-tirane-1.png',
    heroImages: [
      'images/projects/kabinat-20kv-tirane-1.png',
      'images/projects/kabinat-20kv-tirane-2.png'
    ],
    location: localized('Tiranë'),
    order: 13
  },
  {
    id: 'elec-2',
    slug: 'rrjeti-tu-0-4kv-bulqize',
    categoryId: 'electrical-infrastructure',
    title: localized("Rikonstruksion i rrjetit 'TU' 0.4 kV me kabëll 'A.B.C' në njësinë Bulqizë"),
    client: localized('Operatori i Sistemit të Shpërndarjes sh.a / Drejtoria Rajonale Burrel'),
    excerpt: localized('Ndërtim dhe rikonstruksion i rrjetit të tensionit të ulët në Bulqizë dhe zonat përreth, me qëllim përmirësimin e cilësisë së shpërndarjes së energjisë elektrike.'),
    description: localized('Projekti ka mundësuar furnizim më cilësor me energji elektrike përmes ndërtimit të rrjetit të ri 0.4 kV me kabëll A.B.C dhe rikonstruksionit të linjave ekzistuese.'),
    detailsHtml: buildProjectBody(
      'Operatori i Sistemit të Shpërndarjes sh.a / Drejtoria Rajonale Burrel',
      [
        'Projekti përfshin ndërtimin dhe rikonstruksionin e rrjetit të tensionit të ulët në një zonë gjeografike të gjerë pranë qytetit të Bulqizës dhe në zonat Gjoricë, Fushë Bulqizë, Krast, Zerqan dhe Trebisht.',
        'Punimet kanë përfshirë rikonstruksionin e linjave të tensionit të ulët dhe të mesëm, zëvendësimin e shtyllave të amortizuara, vendosjen e shtyllave të reja, ndërtimin e kabinave të reja, përmirësimin e infrastrukturës mbështetëse dhe tokëzimin e rrjetit.'
      ],
      [
        'Shtrirje gjeografike prej 300 km²',
        'Shërbim për rreth 2,176 abonentë',
        'Rrjet i ri 0.4 kV me kabëll A.B.C'
      ]
    ),
    metrics: [
      'Shtrirje gjeografike prej 300 km²',
      'Shërbim për rreth 2,176 abonentë',
      'Rrjet i ri 0.4 kV me kabëll A.B.C'
    ],
    coverImage: 'images/projects/rrjeti-tu-0-4kv-bulqize-1.png',
    heroImages: [
      'images/projects/rrjeti-tu-0-4kv-bulqize-1.png'
    ],
    location: localized('Bulqizë, Gjoricë, Fushë Bulqizë, Krast, Zerqan dhe Trebisht'),
    order: 14
  },
  {
    id: 'elec-3',
    slug: 'kabinat-kashar-selite',
    categoryId: 'electrical-infrastructure',
    title: localized('Rikonstruksion kabinash në nënstacionet Kashar dhe Selitë'),
    client: localized('OSSH sh.a / Drejtoria Rajonale Tiranë'),
    excerpt: localized('Ndërhyrje në rrjetin e tensionit të mesëm dhe të ulët në fidrat e N/St Kashar dhe N/St Selitë, me fokus rikonstruksionin e kabinave elektrike.'),
    description: localized('Projekti ka përfshirë ndërhyrje në rrjetin e tensionit të mesëm dhe të ulët, me instalim pajisjesh të reja elektrike dhe zëvendësim të linjave kabllore për një infrastrukturë më të sigurt dhe të qëndrueshme.'),
    detailsHtml: buildProjectBody(
      'OSSH sh.a / Drejtoria Rajonale Tiranë',
      [
        'Ky objekt ka përfshirë ndërhyrje në rrjetin e tensionit të mesëm dhe tensionit të ulët në fidrat e N/St Kashar dhe N/St Selitë.',
        'Fokusi i projektit ka qenë rikonstruksioni i kabinave elektrike sipas standardeve të OSSH, instalimi i pajisjeve të reja elektrike dhe zëvendësimi i linjave kabllore për të siguruar një infrastrukturë moderne, të sigurt dhe të qëndrueshme.'
      ],
      [
        'Rikonstruksion i kabinave elektrike sipas standardeve të OSSH',
        'Instalim i çelave, transformatorëve dhe paneleve të reja',
        'Zëvendësim i linjave kabllore në rrjetin TM/TU'
      ]
    ),
    metrics: [
      'Rikonstruksion i kabinave elektrike sipas standardeve të OSSH',
      'Instalim i çelave, transformatorëve dhe paneleve të reja',
      'Zëvendësim i linjave kabllore në rrjetin TM/TU'
    ],
    coverImage: 'images/projects/kabinat-kashar-selite-1.jpeg',
    heroImages: [
      'images/projects/kabinat-kashar-selite-1.jpeg',
      'images/projects/kabinat-kashar-selite-2.jpeg',
      'images/projects/kabinat-kashar-selite-3.jpeg'
    ],
    location: localized('Kashar dhe Selitë, Tiranë'),
    order: 15
  },
  {
    id: 'water-1',
    slug: 'kanalet-ujitese-shelqet-pistull-u13-u14',
    categoryId: 'water-infrastructure',
    title: localized('Rehabilitimi i kanalit ujitës Shelqet-Pistull dhe i kanaleve U-13 / U-14'),
    client: localized('Drejtoria e Ujitjes dhe Kullimit Lezhë'),
    excerpt: localized('Rehabilitim dhe modernizim i sistemit ujitës në zonën e Milotit, Mamurrasit dhe Drojës, me trajtim të disa kanaleve ujitëse dhe veprave inxhinierike shoqëruese.'),
    description: localized('Në këtë projekt është realizuar rehabilitimi dhe modernizimi i sistemit ujitës, me pastrim, betonim dhe rikonstruksion të veprave të artit për një shpërndarje më efikase të ujit.'),
    detailsHtml: buildProjectBody(
      'Drejtoria e Ujitjes dhe Kullimit Lezhë',
      [
        'Në këtë projekt është realizuar rehabilitimi dhe modernizimi i sistemit ujitës në zonën në pronësi të Drejtorisë së Ujitjes dhe Kullimit Lezhë.',
        'Punimet kanë përfshirë pastrimin e kanaleve, veshjen me beton në gjithë gjatësinë, rikonstruksionin e veprave të artit ekzistuese dhe ndërtimin e veprave të reja inxhinierike si porta metalike me mekanizëm ngritës, priza me porta, tombino dhe ura këmbësorësh.'
      ],
      [
        'Kanali ujitës Shelqet-Pistull me gjatësi 4,555 ml',
        'Kanali ujitës U-14 me gjatësi 6,333 ml',
        'Kanali ujitës U-13 me gjatësi totale 7,000 ml'
      ]
    ),
    metrics: [
      'Kanali ujitës Shelqet-Pistull me gjatësi 4,555 ml',
      'Kanali ujitës U-14 me gjatësi 6,333 ml',
      'Kanali ujitës U-13 me gjatësi totale 7,000 ml'
    ],
    coverImage: 'images/projects/kanalet-ujitese-shelqet-pistull-u13-u14-1.jpeg',
    heroImages: [
      'images/projects/kanalet-ujitese-shelqet-pistull-u13-u14-1.jpeg'
    ],
    location: localized('Milot, Mamurras dhe Drojë'),
    order: 16
  },
  {
    id: 'water-2',
    slug: 'vepra-marrjes-cengele',
    categoryId: 'water-infrastructure',
    title: localized('Rehabilitim i veprës së marrjes diga Çengele'),
    client: localized('Drejtoria e Ujitjes dhe Kullimit Durrës'),
    excerpt: localized('Rehabilitim i veprës së marrjes Çengele në kanalin kryesor vaditës Peqin-Kavajë, për stabilizim dhe përmirësim të funksionalitetit të strukturës.'),
    description: localized('Projekti ka përfshirë punime për rehabilitimin e veprës së marrjes Çengele pas degradimit kritik të pilave mbështetëse, me masa konkrete për stabilizim dhe mbrojtje nga gërryerja.'),
    detailsHtml: buildProjectBody(
      'Drejtoria e Ujitjes dhe Kullimit Durrës',
      [
        'Në këtë projekt janë kryer punime për rehabilitimin e veprës së marrjes Çengele, të kanalit kryesor vaditës Peqin-Kavajë, e cila gjendej në gjendje kritike prej cedimit të pilave mbështetëse.',
        'Punimet kanë përfshirë gërmimin dhe pastrimin në zonën e bjefit të sipërm, punime betoni në zonën e shuarjes në bjefin e poshtëm, ndërtimin e bazamentit betonarme dhe mbushje me gurë kave masiv për mbrojtjen e strukturës.'
      ],
      [
        'Rreth 327 copë kubikë betonarme shuarës',
        'Punime stabilizuese në veprën e marrjes së kanalit Peqin-Kavajë'
      ]
    ),
    metrics: [
      'Rreth 327 copë kubikë betonarme shuarës',
      'Punime stabilizuese në veprën e marrjes së kanalit Peqin-Kavajë'
    ],
    coverImage: 'images/projects/diga-cengele.jpeg',
    heroImages: [
      'images/projects/diga-cengele.jpeg',
      'images/projects/diga-cengele2.jpeg',
      'images/projects/diga-cengele3.jpeg',
      'images/projects/diga-cengele4.jpeg'
    ],
    location: localized('Diga Çengele, kanali Peqin-Kavajë'),
    order: 17
  },
  {
    id: 'tech-1',
    slug: 'stacioni-naftes-zharrez',
    categoryId: 'technology',
    title: localized('Përmirësimi, digjitalizimi dhe rikualifikimi i infrastrukturës së stacionit të shitjes së naftës Zharrëz'),
    client: localized('Albpetrol sh.a'),
    excerpt: localized('Modernizim i stacionit të shitjes së naftës Zharrëz me rezervuarë të rinj, sisteme sigurie, infrastrukturë civile dhe monitorim SCADA në kohë reale.'),
    description: localized('Projekti është ndërmarrë për përmirësimin e infrastrukturës dhe përputhjen e stacionit Zharrëz me standardet teknike dhe mjedisore, duke integruar sisteme të reja operative, sigurie dhe monitorimi.'),
    detailsHtml: buildProjectBody(
      'Albpetrol sh.a',
      [
        'Stacioni i shitjes së naftës Zharrëz ndodhet në Njësinë Administrative Zharrëz, qarku Fier, dhe projekti u ndërmor për përmirësimin e infrastrukturës dhe përputhjen e objektit me standardet teknike dhe mjedisore në fuqi.',
        'Punimet përfshijnë ndërhyrje në rezervuarë, stacione ngarkim-shkarkimi dhe pompash, impiant GLN, peshore automobilistike, infrastrukturë rrugore, gardh perimetral, sisteme zjarri me ujë dhe shkumë, si dhe monitorim të integruar në kohë reale përmes SCADA.'
      ],
      [
        'Sipërfaqe objekti 50,000 m²',
        '2 rezervuarë të rinj me kapacitet V=1000 m3',
        '2 rezervuarë uji teknologjik me kapacitet V=100 m³',
        'Rezervuar metalik me kapacitet V=2000 m3 për rezervë hidrike kundër zjarrit',
        'Gardh perimetral 1,600 ml',
        'Akse rrugore 1,100 ml',
        'Sheshe 8,729 m²',
        'Trotuare 1,004 m²',
        'Monitorim operacional dhe sigurie përmes sistemit SCADA'
      ]
    ),
    metrics: [
      'Sipërfaqe objekti 50,000 m²',
      '2 rezervuarë të rinj me kapacitet V=1000 m3',
      '2 rezervuarë uji teknologjik me kapacitet V=100 m³',
      'Rezervuar metalik me kapacitet V=2000 m3 për rezervë hidrike kundër zjarrit',
      'Gardh perimetral 1,600 ml',
      'Akse rrugore 1,100 ml',
      'Sheshe 8,729 m²',
      'Trotuare 1,004 m²',
      'Monitorim operacional dhe sigurie përmes sistemit SCADA'
    ],
    coverImage: 'images/projects/stacioni-naftes-zharrez-1.jpeg',
    heroImages: [
      'images/projects/stacioni-naftes-zharrez-1.jpeg',
      'images/projects/stacioni-naftes-zharrez-2.jpeg'
    ],
    location: localized('Zharrëz, Patos, Fier'),
    order: 19
  },
  {
    id: 'tech-2',
    slug: 'stacionet-ekzistuese-rtsh',
    categoryId: 'technology',
    title: localized('Rikonstruksion i stacioneve ekzistuese'),
    client: localized('Drejtoria e Përgjithshme e Radio Televizionit Shqiptar'),
    excerpt: localized('Investime teknologjike për rikonstruksionin e pesë stacioneve të antenave dhe përshtatjen e tyre për teknologjinë digjitale.'),
    description: localized('Projekti përfshin rikonstruksionin dhe modernizimin e pesë stacioneve ekzistuese televizive për garantimin e transmetimit të qëndrueshëm dhe të sigurt sipas standardeve bashkëkohore.'),
    detailsHtml: buildProjectBody(
      'Drejtoria e Përgjithshme e Radio Televizionit Shqiptar',
      [
        'Ky projekt përfshin investime teknologjike për rikonstruksionin e pesë stacioneve të antenave Mide, Tarabosh, Cervenake Gllavë, Sopoti dhe Llogara, për përshtatjen e stacioneve ekzistuese për montimin e teknologjisë digjitale.',
        'Rikonstruksioni përfshin rehabilitimin e godinës dhe rrethimit, modernizimin e sistemit elektrik dhe të furnizimit rezervë, instalimin e sistemeve mbështetëse si kondicionimi dhe mbrojtja nga zjarri, si dhe përmirësimin e infrastrukturës së transmetimit dhe të sistemeve të sigurisë e monitorimit.'
      ],
      [
        '5 stacione antenash: Mide, Tarabosh, Cervenake Gllavë, Sopoti dhe Llogara',
        'Modernizim i sistemeve elektrike dhe furnizimit rezervë (gjenerator, ATS, depozitë gazoili)',
        'Përshtatje për teknologjinë digjitale sipas standardeve bashkëkohore'
      ]
    ),
    metrics: [
      '5 stacione antenash: Mide, Tarabosh, Cervenake Gllavë, Sopoti dhe Llogara',
      'Modernizim i sistemeve elektrike dhe furnizimit rezervë (gjenerator, ATS, depozitë gazoili)',
      'Përshtatje për teknologjinë digjitale sipas standardeve bashkëkohore'
    ],
    coverImage: null,
    heroImages: [],
    location: localized('Mide, Tarabosh, Cervenake Gllavë, Sopoti dhe Llogara'),
    order: 20
  },
  {
    id: 'culture-1',
    slug: 'rikonstruksion-mesonjetores-se-pare-shqipe',
    categoryId: 'cultural-monuments',
    title: localized('Rikonstruksion i Mësonjëtores së Parë Shqipe'),
    client: null,
    excerpt: localized('Rikonstruksion i Mësonjëtores së Parë Shqipe në Korçë, sot Muzeu Kombëtar i Arsimit, me ruajtje të vlerave historike dhe integrim të teknologjisë digjitale.'),
    description: localized('Mësonjëtorja e parë shqipe në Korçë, sot Muzeu Kombëtar i Arsimit, e hapur që në 7 mars 1887, është një institucion i rëndësishëm dhe i veçantë në historinë e arsimit shqiptar. Projekti i restaurimit të këtij objekti lindi si pasojë e çarjeve që pësoi godina pas tërmetit të 2019. Për nga vetë rëndësia e lartë historike dhe kulturore, investimi që i një kujdesi të veçantë e përfshiu ndërhyrjen e plotë për rikonstruksionin e ndërtesës, si dhe rikonceptimin e saj pa humbur vlerat e vyera kulturore që mbart ky objekt, duke sjellë edhe rikthimin e elementeve origjinale, historike, në muze, si dhe aplikimin e teknologjisë digjitale.'),
    detailsHtml: buildProjectBody(
      null,
      [
        'Mësonjëtorja e parë shqipe në Korçë, sot Muzeu Kombëtar i Arsimit, e hapur që në 7 mars 1887, është një institucion i rëndësishëm dhe i veçantë në historinë e arsimit shqiptar. Projekti i restaurimit të këtij objekti lindi si pasojë e çarjeve që pësoi godina pas tërmetit të 2019.',
        'Për nga vetë rëndësia e lartë historike dhe kulturore, investimi që i një kujdesi të veçantë e përfshiu ndërhyrjen e plotë për rikonstruksionin e ndërtesës, si dhe rikonceptimin e saj pa humbur vlerat e vyera kulturore që mbart ky objekt.',
        'Ndërhyrja solli edhe rikthimin e elementeve origjinale, historike, në muze, si dhe aplikimin e teknologjisë digjitale.'
      ]
    ),
    metrics: [],
    coverImage: 'images/fotot_kryesore_mesonjetorja/01_pamje_jashte_porta_001s.jpg',
    heroImages: [
      'images/fotot_kryesore_mesonjetorja/01_pamje_jashte_porta_001s.jpg',
      'images/fotot_kryesore_mesonjetorja/04_salle_ekspozimi_018s.jpg',
      'images/fotot_kryesore_mesonjetorja/08_salle_dritare_045s.jpg',
      'images/fotot_kryesore_mesonjetorja/10_fasade_e_plote_oborr_055s.jpg',
      'images/fotot_kryesore_mesonjetorja/12_fasade_me_ndricim_065s.jpg'
    ],
    location: localized('Korçë'),
    order: 21
  }
];

if (typeof window !== 'undefined') {
  window.siteData = window.siteData || {};
  window.siteData.projects = projects;
}
