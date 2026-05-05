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
          title: "New developments in civil projects",
          body: "Rafin Company continues work on civil buildings with a strong focus on quality, safety, and technical coordination.",
          alt: "Civil construction project in progress by Rafin Company",
          aria: "Read more about new developments in civil projects"
        },
        {
          category: "Road Infrastructure",
          date: "April 2026",
          title: "Infrastructure works delivered to high standards",
          body: "Our teams are actively delivering road works with discipline, consistency, and professional responsibility.",
          alt: "Road infrastructure works on site",
          aria: "Read more about infrastructure works delivered to high standards"
        },
        {
          category: "Electrical Infrastructure",
          date: "April 2026",
          title: "Technical solutions for electrical networks",
          body: "Electrical projects are executed with careful technical control and implementation aligned with current standards.",
          alt: "Electrical infrastructure installations",
          aria: "Read more about technical solutions for electrical networks"
        },
        {
          category: "Industrial Projects",
          date: "March 2026",
          title: "Advanced capacity in industrial projects",
          body: "Rafin supports industrial projects with specialized staff and structured field organization.",
          alt: "View from an industrial project",
          aria: "Read more about advanced capacity in industrial projects"
        },
        {
          category: "Technology",
          date: "March 2026",
          title: "Technology supporting construction delivery",
          body: "The use of technology improves planning, quality control, and more efficient project management.",
          alt: "Technical planning and technology in construction",
          aria: "Read more about technology supporting construction delivery"
        },
        {
          category: "Water Projects",
          date: "February 2026",
          title: "Focus on water infrastructure projects",
          body: "Water infrastructure works are delivered with careful attention to functionality and long-term durability.",
          alt: "Water infrastructure and canal works",
          aria: "Read more about water infrastructure projects"
        },
        {
          category: "Sustainability",
          date: "February 2026",
          title: "Recycling construction materials",
          body: "Rafin promotes more responsible use of materials and reduced environmental impact.",
          alt: "Construction materials and recycling process",
          aria: "Read more about recycling construction materials"
        },
        {
          category: "Safety",
          date: "January 2026",
          title: "Site safety remains a priority",
          body: "Every work process is supported by safety measures, coordination, and professional responsibility.",
          alt: "Site staff working with a focus on safety",
          aria: "Read more about site safety"
        },
        {
          category: "Staff & Operations",
          date: "December 2025",
          title: "Technical teams in the field",
          body: "Technical staff play a key role in organizing, monitoring, and delivering projects to a high standard.",
          alt: "Technical team monitoring works on site",
          aria: "Read more about technical teams in the field"
        },
        {
          category: "Company",
          date: "December 2025",
          title: "Continuous development of capabilities",
          body: "Rafin Company continues strengthening its human, technical, and operational capacity for more complex projects.",
          alt: "Operational capacity and continuous company development",
          aria: "Read more about the continuous development of company capabilities"
        }
      ]
    },
    sq: {
      eyebrow: "RAFIN COMPANY",
      title: "Lajmet e fundit",
      subtitle: "Zhvillimet më të fundit nga projektet, infrastruktura dhe aktivitetet tona në terren.",
      cta: "Shiko të gjitha",
      readMore: "Lexo më shumë",
      controls: "Kontrollet e karuselit të lajmeve",
      previous: "Lajmi i mëparshëm",
      next: "Lajmi i radhës",
      carousel: "Karusel me lajmet e fundit",
      items: [
        {
          category: "Ndërtim Civil",
          date: "Maj 2026",
          title: "Zhvillime të reja në projektet civile",
          body: "Rafin Company vijon punën në objekte civile me fokus cilësinë, sigurinë dhe koordinimin teknik.",
          alt: "Objekt civil në zhvillim nga Rafin Company",
          aria: "Lexo më shumë për zhvillimet e reja në projektet civile"
        },
        {
          category: "Infrastrukturë Rrugore",
          date: "Prill 2026",
          title: "Punime infrastrukturore me standarde të larta",
          body: "Ekipet tona janë të angazhuara në realizimin e punimeve rrugore me disiplinë dhe përgjegjësi.",
          alt: "Punime infrastrukturore rrugore në terren",
          aria: "Lexo më shumë për punimet infrastrukturore me standarde të larta"
        },
        {
          category: "Infrastrukturë Elektrike",
          date: "Prill 2026",
          title: "Zgjidhje teknike për rrjete elektrike",
          body: "Projektet elektrike zhvillohen me kujdes teknik dhe zbatim të standardeve bashkëkohore.",
          alt: "Instalime të infrastrukturës elektrike",
          aria: "Lexo më shumë për zgjidhjet teknike për rrjete elektrike"
        },
        {
          category: "Projekte Industriale",
          date: "Mars 2026",
          title: "Kapacitete të avancuara në projekte industriale",
          body: "Rafin mbështet projekte industriale me staf të specializuar dhe organizim të strukturuar në terren.",
          alt: "Pamje nga një projekt industrial",
          aria: "Lexo më shumë për kapacitetet e avancuara në projekte industriale"
        },
        {
          category: "Teknologji",
          date: "Mars 2026",
          title: "Teknologjia në shërbim të ndërtimit",
          body: "Përdorimi i teknologjisë ndihmon në planifikim, kontroll cilësie dhe menaxhim më efikas të projekteve.",
          alt: "Planifikim teknik dhe teknologji në ndërtim",
          aria: "Lexo më shumë për teknologjinë në shërbim të ndërtimit"
        },
        {
          category: "Projekte Ujore",
          date: "Shkurt 2026",
          title: "Fokus në projektet ujore",
          body: "Punimet në infrastrukturën ujore realizohen me kujdes ndaj funksionalitetit dhe qëndrueshmërisë afatgjatë.",
          alt: "Punime në infrastrukturë ujore dhe kanale",
          aria: "Lexo më shumë për fokusin në projektet ujore"
        },
        {
          category: "Qëndrueshmëri",
          date: "Shkurt 2026",
          title: "Riciklimi i materialeve të ndërtimit",
          body: "Rafin synon përdorimin më të përgjegjshëm të materialeve dhe reduktimin e ndikimit në mjedis.",
          alt: "Proces pune me materiale ndërtimi dhe riciklim",
          aria: "Lexo më shumë për riciklimin e materialeve të ndërtimit"
        },
        {
          category: "Siguri",
          date: "Janar 2026",
          title: "Siguria në kantier mbetet prioritet",
          body: "Çdo proces pune mbështetet në masa sigurie, koordinim dhe përgjegjësi profesionale.",
          alt: "Staf në kantier me fokus te siguria",
          aria: "Lexo më shumë për sigurinë në kantier"
        },
        {
          category: "Staf & Operim",
          date: "Dhjetor 2025",
          title: "Ekipet teknike në terren",
          body: "Stafi teknik luan rol kyç në organizimin, monitorimin dhe përfundimin me cilësi të projekteve.",
          alt: "Ekip teknik duke monitoruar punimet në terren",
          aria: "Lexo më shumë për ekipet teknike në terren"
        },
        {
          category: "Kompania",
          date: "Dhjetor 2025",
          title: "Zhvillim i vazhdueshëm i kapaciteteve",
          body: "Rafin Company vijon të forcojë kapacitetet njerëzore, teknike dhe operative për projekte më komplekse.",
          alt: "Kapacitete operative dhe zhvillim i vazhdueshëm i kompanisë",
          aria: "Lexo më shumë për zhvillimin e vazhdueshëm të kapaciteteve"
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

    const imageLink = card.querySelector(".news-card__image");
    const image = card.querySelector(".news-card__image img");
    const badge = card.querySelector(".news-card__category-badge");
    const category = card.querySelector(".news-card__category");
    const time = card.querySelector("time");
    const title = card.querySelector(".news-card__title");
    const body = card.querySelector(".news-card__description");
    const link = card.querySelector(".news-card__link");

    if (imageLink) imageLink.setAttribute("aria-label", item.aria);
    if (image) image.setAttribute("alt", item.alt);
    if (badge) badge.textContent = item.category;
    if (category) category.textContent = item.category;
    if (time) time.textContent = item.date;
    if (title) title.textContent = item.title;
    if (body) body.textContent = item.body;
    if (link) link.textContent = copy.readMore;
  });
});
