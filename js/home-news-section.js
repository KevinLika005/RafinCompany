document.addEventListener("DOMContentLoaded", () => {
  if (!window.I18n || typeof window.I18n.getCurrentLanguage !== "function") return;

  const lang = window.I18n.getCurrentLanguage();
  const copy = {
    en: {
      eyebrow: "RAFIN COMPANY",
      title: "Latest News",
      subtitle: "The latest updates from our projects, infrastructure work, and field activities.",
      cta: "View All",
      readMore: "Read More",
      controls: "News carousel controls",
      previous: "Previous news item",
      next: "Next news item",
      carousel: "Carousel with the latest news",
      items: [
        {
          category: "Civil Construction",
          date: "May 2026",
          title: "20 individual homes in Vaqarr",
          body: "Reconstruction project delivering 20 individual homes and supporting infrastructure in the Vaqarr administrative unit.",
          alt: "Civil construction project in progress by Rafin Company",
          aria: "Read more about the 20 individual homes project in Vaqarr"
        },
        {
          category: "Road Infrastructure",
          date: "April 2026",
          title: "Main roads of the \"5 Maji\" area",
          body: "Construction and reconstruction of the main road infrastructure in the \"5 Maji\" area, including sidewalks, lighting, and engineering networks.",
          alt: "Road infrastructure works on site",
          aria: "Read more about the main roads project in the 5 Maji area"
        },
        {
          category: "Electrical Infrastructure",
          date: "April 2026",
          title: "Substations in Kashar and Selite",
          body: "Reconstruction of electrical substations with new equipment and cable line replacements across the medium and low-voltage network.",
          alt: "Electrical infrastructure installations",
          aria: "Read more about the substation reconstruction project in Kashar and Selite"
        },
        {
          category: "Technology",
          date: "March 2026",
          title: "Zharrez oil station",
          body: "Infrastructure upgrade, digitization, and modernization of the station with SCADA systems and current technical standards.",
          alt: "View from the Zharrez oil station project",
          aria: "Read more about the Zharrez oil station digitization project"
        },
        {
          category: "Civil Construction",
          date: "March 2026",
          title: "Pharmacy and Public Health building",
          body: "Full reconstruction of the building with structural strengthening, ventilated facade systems, and complete engineering installations.",
          alt: "Pharmacy and Public Health reconstruction project",
          aria: "Read more about the Pharmacy and Public Health reconstruction project"
        },
        {
          category: "Water Projects",
          date: "February 2026",
          title: "Cengele intake structure",
          body: "Rehabilitation of the intake structure on the main Peqin-Kavaja irrigation canal, with stabilization works and structural protection measures.",
          alt: "Works at the Cengele intake structure",
          aria: "Read more about the Cengele intake structure rehabilitation project"
        },
        {
          category: "Civil Construction",
          date: "February 2026",
          title: "Reconstruction of Okshtun kindergarten",
          body: "EU4Schools reconstruction project focused on accessibility, safety, and energy efficiency for the new educational facilities.",
          alt: "View from the reconstruction of Okshtun kindergarten",
          aria: "Read more about the reconstruction project of Okshtun kindergarten"
        },
        {
          category: "Road Infrastructure",
          date: "January 2026",
          title: "Skenderbej Garrison",
          body: "Multifunctional infrastructure project with interventions on roads, plazas, buildings, and sports spaces inside the garrison.",
          alt: "Infrastructure works inside Skenderbej Garrison",
          aria: "Read more about the infrastructure project in Skenderbej Garrison"
        },
        {
          category: "Civil Construction",
          date: "December 2025",
          title: "Lidhja e Prizrenit school",
          body: "Reconstruction of the new school building with classrooms, a gymnasium, and modern technical and safety systems.",
          alt: "Lidhja e Prizrenit school construction project",
          aria: "Read more about the Lidhja e Prizrenit school project"
        },
        {
          category: "Civil Construction",
          date: "December 2025",
          title: "Residential units in Mirdita",
          body: "Reconstruction project delivering multi-storey buildings and point residential units in the new development zone of Rreshen.",
          alt: "View from the reconstruction of residential units in Mirdita",
          aria: "Read more about the residential reconstruction project in Mirdita"
        }
      ]
    },
    sq: {
      eyebrow: "RAFIN COMPANY",
      title: "Lajmet e fundit",
      subtitle: "Zhvillimet m\u00eb t\u00eb fundit nga projektet, infrastruktura dhe aktivitetet tona n\u00eb terren.",
      cta: "Shiko t\u00eb gjitha",
      readMore: "Lexo m\u00eb shum\u00eb",
      controls: "Kontrollet e karuselit t\u00eb lajmeve",
      previous: "Lajmi i m\u00ebparsh\u00ebm",
      next: "Lajmi i radh\u00ebs",
      carousel: "Karusel me lajmet e fundit",
      items: [
        {
          category: "Nd\u00ebrtim Civil",
          date: "Maj 2026",
          title: "20 banesa individuale n\u00eb Vaqarr",
          body: "Projekt rind\u00ebrtimi me 20 banesa individuale dhe infrastruktur\u00eb shoq\u00ebruese n\u00eb nj\u00ebsin\u00eb administrative Vaqarr.",
          alt: "Objekt civil n\u00eb zhvillim nga Rafin Company",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e 20 banesave individuale n\u00eb Vaqarr"
        },
        {
          category: "Infrastruktur\u00eb Rrugore",
          date: "Prill 2026",
          title: "Rrug\u00ebt kryesore t\u00eb zon\u00ebs \"5 Maji\"",
          body: "Nd\u00ebrtim dhe rikonstruksion i infrastruktur\u00ebs rrugore n\u00eb zon\u00ebn \"5 Maji\", me trotuare, ndri\u00e7im dhe rrjete inxhinierike.",
          alt: "Punime infrastrukturore rrugore n\u00eb terren",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e rrug\u00ebve kryesore t\u00eb zon\u00ebs 5 Maji"
        },
        {
          category: "Infrastruktur\u00eb Elektrike",
          date: "Prill 2026",
          title: "Kabinat n\u00eb n\u00ebnstacionet Kashar dhe Selit\u00eb",
          body: "Rikonstruksion i kabinave elektrike me pajisje t\u00eb reja dhe z\u00ebvend\u00ebsim t\u00eb linjave kabllore n\u00eb rrjetin TM/TU.",
          alt: "Instalime t\u00eb infrastruktur\u00ebs elektrike",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e rikonstruksionit t\u00eb kabinave n\u00eb Kashar dhe Selit\u00eb"
        },
        {
          category: "Teknologji",
          date: "Mars 2026",
          title: "Stacioni i naft\u00ebs Zharr\u00ebz",
          body: "P\u00ebrmir\u00ebsim, digjitalizim dhe rikualifikim i infrastruktur\u00ebs s\u00eb stacionit me sisteme SCADA dhe standarde teknike bashk\u00ebkohore.",
          alt: "Pamje nga projekti i stacionit t\u00eb naft\u00ebs Zharr\u00ebz",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e digjitalizimit t\u00eb stacionit t\u00eb naft\u00ebs Zharr\u00ebz"
        },
        {
          category: "Nd\u00ebrtim Civil",
          date: "Mars 2026",
          title: "Farmacia dhe Sh\u00ebndeti Publik",
          body: "Rikonstruksion i plot\u00eb i godin\u00ebs me p\u00ebrforcime strukturore, fasad\u00eb t\u00eb ventiluar dhe instalim t\u00eb rrjeteve inxhinierike.",
          alt: "Projekti i rikonstruksionit t\u00eb Farmacis\u00eb dhe Sh\u00ebndetit Publik",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e rikonstruksionit t\u00eb Farmacis\u00eb dhe Sh\u00ebndetit Publik"
        },
        {
          category: "Projekte Ujore",
          date: "Shkurt 2026",
          title: "Vepra e marrjes \u00c7engele",
          body: "Rehabilitim i vepr\u00ebs s\u00eb marrjes n\u00eb kanalin kryesor vadit\u00ebs Peqin-Kavaj\u00eb, me masa stabilizuese dhe mbrojtje t\u00eb struktur\u00ebs.",
          alt: "Punime n\u00eb vepr\u00ebn e marrjes \u00c7engele",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e rehabilitimit t\u00eb vepr\u00ebs s\u00eb marrjes \u00c7engele"
        },
        {
          category: "Nd\u00ebrtim Civil",
          date: "Shkurt 2026",
          title: "Rind\u00ebrtimi i kopshtit Okshtun",
          body: "Projekt EU4Schools me fokus aksesueshm\u00ebrin\u00eb, sigurin\u00eb dhe eficienc\u00ebn e energjis\u00eb p\u00ebr ambientet e reja arsimore.",
          alt: "Pamje nga rind\u00ebrtimi i kopshtit Okshtun",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e rind\u00ebrtimit t\u00eb kopshtit Okshtun"
        },
        {
          category: "Infrastruktur\u00eb Rrugore",
          date: "Janar 2026",
          title: "Garnizoni \"Sk\u00ebnderbej\"",
          body: "Projekt multifunksional me nd\u00ebrhyrje n\u00eb rrug\u00eb, sheshe, objekte dhe hap\u00ebsira sportive brenda garnizonit.",
          alt: "Punime infrastrukturore n\u00eb Garnizonin Sk\u00ebnderbej",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e infrastruktur\u00ebs n\u00eb Garnizonin Sk\u00ebnderbej"
        },
        {
          category: "Nd\u00ebrtim Civil",
          date: "Dhjetor 2025",
          title: "Shkolla \"Lidhja e Prizrenit\"",
          body: "Rind\u00ebrtim i godin\u00ebs s\u00eb re shkollore me ambiente m\u00ebsimore, palest\u00ebr dhe sisteme moderne teknike e sigurie.",
          alt: "Projekti i nd\u00ebrtimit t\u00eb shkoll\u00ebs Lidhja e Prizrenit",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e shkoll\u00ebs Lidhja e Prizrenit"
        },
        {
          category: "Nd\u00ebrtim Civil",
          date: "Dhjetor 2025",
          title: "Nj\u00ebsit\u00eb e banimit n\u00eb Mirdit\u00eb",
          body: "Projekt rind\u00ebrtimi me objekte shum\u00ebkat\u00ebshe dhe nj\u00ebsi banimi pik\u00ebsore n\u00eb zon\u00ebn e re p\u00ebr zhvillim n\u00eb Rr\u00ebshen.",
          alt: "Pamje nga rind\u00ebrtimi i nj\u00ebsive t\u00eb banimit n\u00eb Mirdit\u00eb",
          aria: "Lexo m\u00eb shum\u00eb p\u00ebr projektin e rind\u00ebrtimit t\u00eb nj\u00ebsive t\u00eb banimit n\u00eb Mirdit\u00eb"
        }
      ]
    }
  }[lang];

  const root = document.querySelector(".news-carousel-section");
  if (!root || !copy) return;

  const setText = (selector, value) => {
    const node = root.querySelector(selector);
    if (node) node.textContent = value;
  };

  const setAttr = (selector, attr, value) => {
    const node = root.querySelector(selector);
    if (node) node.setAttribute(attr, value);
  };

  setText(".news-carousel-section__eyebrow", copy.eyebrow);
  setText(".news-carousel-section__title", copy.title);
  setText(".news-carousel-section__subtitle", copy.subtitle);
  setText(".news-carousel-section__cta", copy.cta);
  setAttr(".news-carousel__controls", "aria-label", copy.controls);
  setAttr(".news-carousel__button--prev", "aria-label", copy.previous);
  setAttr(".news-carousel__button--next", "aria-label", copy.next);
  setAttr(".news-carousel", "aria-label", copy.carousel);

  const cards = root.querySelectorAll(".news-card");
  cards.forEach((card, index) => {
    const item = copy.items[index];
    if (!item) return;

    const cardLink = card.querySelector(".news-card__card-link");
    const image = card.querySelector(".news-card__image img");
    const badge = card.querySelector(".news-card__category-badge");
    const category = card.querySelector(".news-card__category");
    const time = card.querySelector("time");
    const title = card.querySelector(".news-card__title");
    const body = card.querySelector(".news-card__description");
    const link = card.querySelector(".news-card__link");

    if (cardLink) cardLink.setAttribute("aria-label", item.aria);
    if (image) image.setAttribute("alt", item.alt);
    if (badge) badge.textContent = item.category;
    if (category) category.textContent = item.category;
    if (time) time.textContent = item.date;
    if (title) title.textContent = item.title;
    if (body) body.textContent = item.body;
    if (link) link.textContent = copy.readMore;
  });
});
