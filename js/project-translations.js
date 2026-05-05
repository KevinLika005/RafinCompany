document.addEventListener("DOMContentLoaded", () => {
  if (!window.I18n || typeof window.I18n.getCurrentLanguage !== "function") return;
  if (window.I18n.getCurrentLanguage() !== "en") return;

  const projects = window.siteData?.projects;
  if (!Array.isArray(projects) || projects.length === 0) return;

  const exact = new Map([
    ["Ndërtim pedonale, pistë vrapimi dhe korsi biçikletash në Liqenin e Farkës", "Construction of pedestrian walkways, a running track, and bicycle lanes at Farka Lake"],
    ["Transformim i zonës së Liqenit të Farkës në një hapësirë rekreative me pistë vrapimi, korsi biçikletash dhe trotuare të dedikuara.", "Transformation of the Farka Lake area into a recreational space with a running track, bicycle lanes, and dedicated sidewalks."],
    ["Projekti ka transformuar zonën e Liqenit të Farkës në një hapësirë moderne rekreative dhe turistike, me infrastrukturë të dedikuar për aktivitetet në natyrë.", "The project transformed the Farka Lake area into a modern recreational and tourist destination with infrastructure dedicated to outdoor activities."],
    ["Përmirësim i infrastrukturës në Garnizonin \"Skënderbej\"", "Infrastructure improvement at the \"Skënderbej\" Garrison"],
    ["Projekt multifunksional infrastrukturor me ndërhyrje në rrugë, sheshe, objekte dhe hapësira sportive brenda Garnizonit \"Skënderbej\".", "A multifunctional infrastructure project with interventions in roads, squares, buildings, and sports areas inside the \"Skënderbej\" Garrison."],
    ["Projekti përfshin ndërhyrje të integruara në rrugë, sheshe, objekte dhe hapësira sportive me synim rritjen e funksionalitetit, sigurisë dhe standardeve të shërbimit brenda garnizonit.", "The project includes integrated interventions in roads, squares, buildings, and sports areas to improve functionality, safety, and service standards inside the garrison."],
    ["Ndërtim i parkut të mbyllur (B) për mjetet e blinduara (HMMWV)", "Construction of the enclosed parking facility (B) for armored vehicles (HMMWV)"],
    ["Ndërtim i parkut të mbyllur për mjetet e blinduara HMMWV, me kapacitet të lartë parkimi dhe sisteme teknike mbështetëse.", "Construction of an enclosed parking facility for HMMWV armored vehicles, with high parking capacity and supporting technical systems."],
    ["Objekti përfshin parkun e mbyllur për mjetet e blinduara HMMWV, sheshin e aksesit dhe parkimit, si dhe godinën e vendkontrollit teknik me sistemet teknike shoqëruese.", "The project includes the enclosed HMMWV parking facility, the access and parking yard, and the technical inspection building with its related systems."],
    ["Sistemim asfaltim i rrugës së fshatit Dritas", "Road rehabilitation and asphalt paving for Dritas village"],
    ["Ndërtim dhe rehabilitim i rrugës së fshatit Dritas në Zall Herr, me paketë të plotë rrugore dhe elementë sigurie.", "Construction and rehabilitation of the Dritas village road in Zall Herr, with a complete road package and safety elements."],
    ["Projekti ka përfshirë ndërtimin dhe rehabilitimin e rrugës së fshatit Dritas, duke e kthyer atë në një infrastrukturë rrugore sipas standardeve dhe nevojave të komunitetit.", "The project included the construction and rehabilitation of the Dritas village road, bringing it up to the standards and needs of the community."],
    ["Sistemim asfaltim i rrugës së fshatit Luz i Madh", "Road rehabilitation and asphalt paving for Luz i Madh village"],
    ["Rikonstruksion i plotë i rrugës së fshatit Luz i Madh në Bashkinë Rrogozhinë, me shtresa të reja asfaltike dhe elementë sigurie rrugore.", "Full reconstruction of the Luz i Madh village road in the Municipality of Rrogozhinë, with new asphalt layers and road safety elements."],
    ["Projekti ka përfshirë ndërtimin dhe rehabilitimin e rrugës së fshatit Luz i Madh, duke përmirësuar sigurinë, funksionalitetin dhe qëndrueshmërinë e segmentit.", "The project included the construction and rehabilitation of the Luz i Madh village road, improving the segment's safety, functionality, and durability."],
    ["Ndërtimi i rrugëve kryesore të zonës \"5 Maji\" (Faza 3)", "Construction of the main roads in the \"5 Maji\" area (Phase 3)"],
    ["Ndërhyrje për ndërtimin dhe rikonstruksionin e rrugëve kryesore në Njësitë Administrative 4 dhe 8, në zonën \"5 Maji\".", "Interventions for the construction and reconstruction of the main roads in Administrative Units 4 and 8, in the \"5 Maji\" area."],
    ["Projekti parashikon ndërhyrje të plota në infrastrukturën rrugore të zonës \"5 Maji\", duke përfshirë rrugë, trotuare, korsi biçikletash, ndriçim dhe rrjete inxhinierike.", "The project includes full intervention in the road infrastructure of the \"5 Maji\" area, including roads, sidewalks, bicycle lanes, lighting, and utility networks."],
    ["Rindërtimi i njësive të banimit në Mirditë", "Reconstruction of housing units in Mirditë"],
    ["Ndërtim i objekteve shumëkatëshe dhe njësive pikësore të banimit në zonën e re për zhvillim në Rrëshen.", "Construction of multi-storey residential buildings and point housing units in the new development area in Rrëshen."],
    ["Në kuadër të projektit të rindërtimit në Mirditë janë ndërtuar objekte banimi shumëkatëshe dhe njësi banimi pikësore, me përfundime të plota strukturore, arkitektonike dhe teknike.", "Within the Mirditë reconstruction program, multi-storey residential buildings and point housing units were delivered with complete structural, architectural, and technical finishes."],
    ["Rindërtim i shkollës 9-vjeçare \"Lidhja e Prizrenit\"", "Reconstruction of the \"Lidhja e Prizrenit\" 9-year school"],
    ["Ndërtim i godinës së re të shkollës \"Lidhja e Prizrenit\" në Babrru Paskuqan, me ambiente mësimore, palestër dhe sisteme moderne teknike.", "Construction of the new \"Lidhja e Prizrenit\" school building in Babrru Paskuqan, with classrooms, a gym, and modern technical systems."],
    ["Në Babrru Paskuqan është ndërtuar shkolla e re \"Lidhja e Prizrenit\", me organizim funksional të kateve mësimore, palestër të integruar dhe sisteme bashkëkohore teknike e sigurie.", "In Babrru Paskuqan, the new \"Lidhja e Prizrenit\" school has been built with a functional educational layout, an integrated gym, and contemporary technical and safety systems."],
    ["Rikonstruksion i godinës së Farmacisë dhe Shëndetit Publik", "Reconstruction of the Faculty of Pharmacy and Public Health building"],
    ["Rikonstruksion i plotë i godinës së Fakultetit të Farmacisë dhe Shëndetit Publik, me përforcime strukturore dhe fasadë të ventiluar HPL.", "Full reconstruction of the Faculty of Pharmacy and Public Health building, with structural strengthening and a ventilated HPL facade."],
    ["Projekti përfshin rikonstruksionin e plotë të godinës së Fakultetit të Farmacisë dhe Shëndetit Publik, me riorganizim funksional të ambienteve dhe instalim të plotë të rrjeteve inxhinierike.", "The project includes the full reconstruction of the Faculty of Pharmacy and Public Health building, with functional reorganization of the interior and full installation of the engineering systems."],
    ["Ndërtim i parkimit me 1 kat nëntokë, objekti 3-katësh i bashkisë dhe rehabilitimi i sheshit", "Construction of a one-level underground parking structure, a three-storey municipal building, and square rehabilitation"],
    ["Godinë e re administrative për Bashkinë Kamëz, me parkim nëntokësor dhe trajtim të plotë të hapësirave të jashtme.", "A new administrative building for the Municipality of Kamëz, with underground parking and complete treatment of the surrounding outdoor spaces."],
    ["Projekti përfaqëson ndërtimin e një godine administrative me standarde bashkëkohore, së bashku me parkimin nëntokësor dhe rehabilitimin e sheshit.", "The project represents the construction of a contemporary administrative building together with underground parking and square rehabilitation."],
    ["Rindërtim i kopshtit Okshtun", "Reconstruction of the Okshtun kindergarten"],
    ["Rindërtim i kopshtit \"Okshtun\" në kuadër të programit EU4Schools, me fokus aksesueshmërinë, sigurinë dhe eficiencën e energjisë.", "Reconstruction of the \"Okshtun\" kindergarten under the EU4Schools program, with a focus on accessibility, safety, and energy efficiency."],
    ["Kopshti \"Okshtun\" është rindërtuar sipas standardeve të larta europiane, me dalje emergjence, aksesueshmëri të plotë dhe sisteme moderne teknike e sigurie.", "The \"Okshtun\" kindergarten was rebuilt to high European standards, with emergency exits, full accessibility, and modern technical and safety systems."],
    ["Ndërtim i 20 banesave individuale në njësinë administrative Vaqarr", "Construction of 20 individual houses in the Vaqarr administrative unit"],
    ["Rimëkëmbje e njësisë së Vaqarrit pas tërmetit, me ndërtimin e 20 banesave individuale dhe infrastrukturës shoqëruese.", "Recovery of the Vaqarr unit after the earthquake through the construction of 20 individual homes and supporting infrastructure."],
    ["Në kuadër të programit të rimëkëmbjes pas tërmetit janë realizuar me cilësi të plotë 20 banesa individuale në Vaqarr, me tipologji të ndryshme apartamentesh.", "Under the post-earthquake recovery program, 20 individual homes were completed in Vaqarr with full quality standards and different apartment typologies."],
    ["Rikonstruksioni i kabinave 20 kV të nënstacioneve Kashar, Qendër, Selitë, Traktora, Rajonal dhe Farkë", "Reconstruction of the 20 kV cabins of the Kashar, Qendër, Selitë, Traktora, Rajonal, and Farkë substations"],
    ["Rikonstruksion i 140 kabinave elektrike në disa zona të Tiranës për të ulur humbjet në rrjet dhe për të rritur sigurinë e furnizimit me energji.", "Reconstruction of 140 electrical cabins in several areas of Tirana to reduce network losses and improve supply security."],
    ["Projekti përfshin rikonstruksionin e 140 kabinave elektrike në Tiranë, me ndërhyrje në pajisje, tokëzim dhe punime ndërtimore për përmirësimin e performancës së rrjetit.", "The project includes the reconstruction of 140 electrical cabins in Tirana, with equipment interventions, grounding works, and civil works to improve network performance."],
    ["Rikonstruksion i rrjetit 'TU' 0.4 kV me kabëll 'A.B.C' në njësinë Bulqizë", "Reconstruction of the 0.4 kV low-voltage network with A.B.C cable in the Bulqizë unit"],
    ["Ndërtim dhe rikonstruksion i rrjetit të tensionit të ulët në Bulqizë dhe zonat përreth, me qëllim përmirësimin e cilësisë së shpërndarjes së energjisë elektrike.", "Construction and reconstruction of the low-voltage network in Bulqizë and the surrounding areas to improve the quality of electricity distribution."],
    ["Projekti ka mundësuar furnizim më cilësor me energji elektrike përmes ndërtimit të rrjetit të ri 0.4 kV me kabëll A.B.C dhe rikonstruksionit të linjave ekzistuese.", "The project enabled higher-quality power supply through construction of the new 0.4 kV A.B.C cable network and reconstruction of the existing lines."],
    ["Rikonstruksion kabinash në nënstacionet Kashar dhe Selitë", "Cabin reconstruction at the Kashar and Selitë substations"],
    ["Ndërhyrje në rrjetin e tensionit të mesëm dhe të ulët në fidrat e N/St Kashar dhe N/St Selitë, me fokus rikonstruksionin e kabinave elektrike.", "Interventions in the medium- and low-voltage network on the feeders of the Kashar and Selitë substations, focused on reconstructing electrical cabins."],
    ["Projekti ka përfshirë ndërhyrje në rrjetin e tensionit të mesëm dhe të ulët, me instalim pajisjesh të reja elektrike dhe zëvendësim të linjave kabllore për një infrastrukturë më të sigurt dhe të qëndrueshme.", "The project included interventions in the medium- and low-voltage network, with installation of new electrical equipment and replacement of cable lines for a safer and more durable infrastructure."],
    ["Rehabilitimi i kanalit ujitës Shelqet-Pistull dhe i kanaleve U-13 / U-14", "Rehabilitation of the Shelqet-Pistull irrigation canal and the U-13 / U-14 canals"],
    ["Rehabilitim dhe modernizim i sistemit ujitës në zonën e Milotit, Mamurrasit dhe Drojës, me trajtim të disa kanaleve ujitëse dhe veprave inxhinierike shoqëruese.", "Rehabilitation and modernization of the irrigation system in the Milot, Mamurras, and Drojë area, including several irrigation canals and related engineering works."],
    ["Në këtë projekt është realizuar rehabilitimi dhe modernizimi i sistemit ujitës, me pastrim, betonim dhe rikonstruksion të veprave të artit për një shpërndarje më efikase të ujit.", "This project delivered the rehabilitation and modernization of the irrigation system, including cleaning, concrete lining, and reconstruction of engineering structures for more efficient water distribution."],
    ["Rehabilitim i veprës së marrjes diga Çengele", "Rehabilitation of the Çengele intake structure"],
    ["Rehabilitim i veprës së marrjes Çengele në kanalin kryesor vaditës Peqin-Kavajë, për stabilizim dhe përmirësim të funksionalitetit të strukturës.", "Rehabilitation of the Çengele intake structure on the main Peqin-Kavajë irrigation canal, to stabilize and improve the functionality of the structure."],
    ["Projekti ka përfshirë punime për rehabilitimin e veprës së marrjes Çengele pas degradimit kritik të pilave mbështetëse, me masa konkrete për stabilizim dhe mbrojtje nga gërryerja.", "The project included rehabilitation works on the Çengele intake structure after critical degradation of the supporting piers, with specific stabilization and erosion-protection measures."],
    ["Përmirësimi, digjitalizimi dhe rikualifikimi i infrastrukturës së stacionit të shitjes së naftës Zharrëz", "Improvement, digitalization, and upgrading of the infrastructure of the Zharrëz oil sales station"],
    ["Modernizim i stacionit të shitjes së naftës Zharrëz me rezervuarë të rinj, sisteme sigurie, infrastrukturë civile dhe monitorim SCADA në kohë reale.", "Modernization of the Zharrëz oil sales station with new tanks, safety systems, civil infrastructure, and real-time SCADA monitoring."],
    ["Projekti është ndërmarrë për përmirësimin e infrastrukturës dhe përputhjen e stacionit Zharrëz me standardet teknike dhe mjedisore, duke integruar sisteme të reja operative, sigurie dhe monitorimi.", "The project was undertaken to improve the infrastructure and align the Zharrëz station with technical and environmental standards, integrating new operational, safety, and monitoring systems."],
    ["Rikonstruksion i stacioneve ekzistuese", "Reconstruction of existing stations"],
    ["Investime teknologjike për rikonstruksionin e pesë stacioneve të antenave dhe përshtatjen e tyre për teknologjinë digjitale.", "Technology investments for the reconstruction of five antenna stations and their adaptation for digital technology."],
    ["Projekti përfshin rikonstruksionin dhe modernizimin e pesë stacioneve ekzistuese televizive për garantimin e transmetimit të qëndrueshëm dhe të sigurt sipas standardeve bashkëkohore.", "The project includes reconstruction and modernization of five existing television stations to guarantee stable and secure transmission in line with contemporary standards."],
    ["Rikonstruksion i Mësonjëtores së Parë Shqipe", "Reconstruction of the First Albanian School"],
    ["Rikonstruksion i Mësonjëtores së Parë Shqipe në Korçë, sot Muzeu Kombëtar i Arsimit, me ruajtje të vlerave historike dhe integrim të teknologjisë digjitale.", "Reconstruction of the First Albanian School in Korçë, now the National Museum of Education, preserving its historical values while integrating digital technology."]
  ]);

  const phraseReplacements = [
    ["Klienti / Institucioni:", "Client / Institution:"],
    ["Të dhëna teknike", "Technical data"],
    ["Përmirësimi i", "Improvement of"],
    ["Përmirësimi", "Improvement"],
    ["Përveç", "In addition to"],
    ["Përmes", "Through"],
    ["Përfshin", "Includes"],
    ["Projekti përfshin", "The project includes"],
    ["Projekti parashikon", "The project includes"],
    ["Projekti përfaqëson", "The project represents"],
    ["Projekti ka përfshirë", "The project included"],
    ["Projekti është ndërmarrë", "The project was undertaken"],
    ["Punimet kanë përfshirë", "The works included"],
    ["Në kuadër të projektit", "Within the project"],
    ["Në këtë projekt", "In this project"],
    ["Në kohë rekord", "In record time"],
    ["Ndërtim i", "Construction of"],
    ["Ndërtimi i", "Construction of"],
    ["Rikonstruksion i", "Reconstruction of"],
    ["Rikonstruksioni i", "Reconstruction of"],
    ["Rindërtim i", "Reconstruction of"],
    ["Rindërtimi i", "Reconstruction of"],
    ["Rehabilitimi i", "Rehabilitation of"],
    ["Rehabilitim i", "Rehabilitation of"],
    ["Objekti përfshin", "The project includes"],
    ["Objekti është", "The building is"],
    ["Godina e re", "The new building"],
    ["kanalit ujitës", "irrigation canal"],
    ["kanaleve ujitëse", "irrigation canals"],
    ["rrjetit", "network"],
    ["rrugës", "road"],
    ["rrugore", "road"],
    ["rrugë", "roads"],
    ["trotuare", "sidewalks"],
    ["korsi biçikletash", "bicycle lanes"],
    ["ndriçim", "lighting"],
    ["sigurisë", "safety"],
    ["siguri", "safety"],
    ["infrastrukturës", "infrastructure"],
    ["infrastrukturë", "infrastructure"],
    ["sisteme", "systems"],
    ["teknike", "technical"],
    ["teknologjisë digjitale", "digital technology"],
    ["furnizimit me energji", "power supply"],
    ["kabinave elektrike", "electrical cabins"],
    ["stacioneve", "stations"],
    ["stacionit", "station"],
    ["sipërfaqe", "area"],
    ["Sipërfaqe", "Area"],
    ["gjatësi", "length"],
    ["Gjatësi", "Length"],
    ["totale", "total"],
    ["ndërtimore", "built"],
    ["ndërtimit", "construction"],
    ["ndërtimi", "construction"],
    ["ndërtuar", "built"],
    ["rehabilitimin", "rehabilitation"],
    ["rikonstruksionin", "reconstruction"],
    ["rikonstruksioni", "reconstruction"],
    ["rindërtimit", "reconstruction"],
    ["zonën", "the area"],
    ["qytetarët", "citizens"],
    ["vizitorët", "visitors"],
    ["qëndrueshme", "sustainable"],
    ["qëndrueshmërinë", "durability"],
    ["punime", "works"],
    ["mjedisore", "environmental"],
    ["monitorim", "monitoring"],
    ["Muzeu Kombëtar i Arsimit", "National Museum of Education"]
  ];

  function translateText(value) {
    if (typeof value !== "string" || !value) return value;
    let output = exact.get(value) || value;
    phraseReplacements.forEach(([sq, en]) => {
      output = output.split(sq).join(en);
    });
    return output;
  }

  function localizeField(value) {
    if (!value || typeof value !== "object") return value;
    const sq = value.sq || value.en || "";
    return {
      ...value,
      en: translateText(sq),
      sq
    };
  }

  projects.forEach((project) => {
    project.title = localizeField(project.title);
    project.client = localizeField(project.client);
    project.excerpt = localizeField(project.excerpt);
    project.description = localizeField(project.description);
    project.detailsHtml = localizeField(project.detailsHtml);
    project.location = localizeField(project.location);

    if (Array.isArray(project.metrics)) {
      project.metrics = project.metrics.map((metric) => translateText(metric));
    }
  });
});
