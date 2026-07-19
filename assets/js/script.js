'use strict';

/* === INIT ALL === */
window.addEventListener("DOMContentLoaded", () => {
  const savedFilter = localStorage.getItem("activeFilter") || "all";
  init(savedFilter);
});

/* === MAIN INIT === */
function init(savedFilter) {
  setupSidebar();
  setupTestimonials();
  renderProjects();       // 1) constrói o grid a partir da fonte única `projects`
  setupFiltering(savedFilter);
  setupFormValidation();
  setupNavigation();
  setupProjectModal();    // 2) modal único + carrossel para os projetos
}

/* === TOGGLE FUNCTION === */
function elementToggleFunc(elem) {
  elem.classList.toggle("active");
}

/* === SIDEBAR === */
function setupSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/* === TESTIMONIAL MODAL === */
function setupTestimonials() {
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const toggleModal = () => {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      toggleModal();
    });
  });

  modalCloseBtn.addEventListener("click", toggleModal);
  overlay.addEventListener("click", toggleModal);
}

/* =====================================================================
   PROJETOS — FONTE ÚNICA DE DADOS
   Cada projeto tem um "slug" único e uma lista de "slides" (uma imagem/
   vídeo/youtube por slide). Um projeto com mais do que um slide mostra
   automaticamente as setas de navegação e os pontos no modal (carrossel).
   Para adicionar um projeto novo: basta acrescentar um objeto a este
   array — nada mais precisa de ser tocado.
===================================================================== */
const projects = [
  {
    slug: 'beliani-brand-films',
    title: 'Beliani – Brand Video Localization',
    category: 'branding',
    blurb: 'PT localization of Beliani\'s brand video content — adapting tone, data points, and emotional resonance for the Portuguese market.',
    slides: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/xLzjcl9GP2M',
        cover: 'https://img.youtube.com/vi/xLzjcl9GP2M/hqdefault.jpg',
        caption: 'Translated the subtitles for Beliani’s emotional manifesto, “Delivering Happiness.” This was more than just language conversion — it was about carrying the brand’s promise, warmth, and emotional tone across cultures with nuance and care.'
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/1XRYlaYEe7s',
        cover: 'https://img.youtube.com/vi/1XRYlaYEe7s/hqdefault.jpg',
        caption: 'Translated the on-screen text and voice-over for Beliani’s warehouse video — ensuring Portuguese viewers could clearly understand operational stats such as warehouse size, team count, and product volume. The goal: preserve clarity and trust while adapting key data points for local relevance.'
      }
    ]
  },
  {
    slug: 'vans-branding-course-clip',
    title: 'Vans – Branding Course Clip',
    category: 'branding',
    blurb: 'Scripted, voiced, and performed a branding video for a Digital Marketing course — brand storytelling from concept to delivery.',
    slides: [{
      type: 'youtube',
      src: 'https://www.youtube.com/embed/DMoMl-zikTI',
      cover: 'https://img.youtube.com/vi/DMoMl-zikTI/hqdefault.jpg',
      caption: 'For the final project in my Digital Marketing course, I scripted, voiced, and performed a branding video inspired by Vans. More than an assignment, it was a tribute to moments that define us — because sometimes, we choose the moment… and sometimes, the moment chooses us.'
    }]
  },
  {
    slug: 'bitsnostalgia-logo',
    title: 'Bitsnostalgia Logo',
    category: 'branding',
    blurb: 'Brand identity for my own retro-gaming label — logo, palette, tone of voice, and guidelines built from scratch.',
    slides: [{
      type: 'image',
      src: './assets/images/bitsnostalgialogo.jpg',
      caption: 'Defined the brand identity for Bitsnostalgia, my own retro-gaming label. Developed the visual language (logo, palette, and graphic style), crafted the tone of voice, and set clear branding guidelines — all inspired by 80s gaming culture with a rebellious twist.'
    }]
  },

  {
    slug: 'beliani-campaign-copywriting',
    title: 'Beliani – Campaign Copywriting & Localization',
    category: 'branding',
    blurb: 'PT copywriting and localization across 9 Beliani campaigns (video + static ads) — tone, urgency, and CTA clarity tuned for conversion.',
    slides: [
      {
        type: 'video',
        src: './videos/Beliani2024.mp4',
        cover: './assets/images/thumb-summer_sale_2025.png',
        caption: 'Translated the full script for the PT version of Beliani Summer Promotion 2023 — adapting tone, rhythm, and message to match the campaign’s vibrant, seasonal energy.'
      },
      {
        type: 'video',
        src: './videos/beliani_082024.mp4',
        cover: './assets/images/thumb-summer_sale_2023.png',
        caption: 'Translated headlines, promotional videos and banners for the PT version of the Beliani Summer campaign 2024 — keeping tone and engagement sharp. Above: Meta ad for that campaign.'
      },
      {
        type: 'video',
        src: './videos/beliani_socialmedia_2024.mp4',
        cover: './assets/images/thumb-summer_campaign_2025.png',
        caption: 'Translated subtitles for a high-energy testimonial featuring a proud homeowner celebrating his new garden. Ensured the translation preserved his joy, personality, and authenticity — without losing rhythm or cultural tone.'
      },
      {
        type: 'video',
        src: './videos/Pt Campaign 2025.mp4',
        cover: './assets/images/thumb-beliani_table_campaign.png',
        caption: 'Translated the voice-over for a campaign video where a woman drops food on the floor during a family dinner — dramatizing the need for a proper dining table. Ensured the humor and message landed smoothly in Portuguese while staying true to brand tone.'
      },
      {
        type: 'video',
        src: './videos/beliani_campanha_junho2025.mp4',
        cover: './assets/images/thumb-beliani_summer_campaign.png',
        caption: 'Led the Portuguese adaptation used in the campaign’s voice-over — ensuring tone, rhythm, and cultural resonance. Also created the original jingle, aligning melody and message to elevate brand recall and emotional impact.'
      },
      {
        type: 'image',
        src: './assets/images/beliani0524.png',
        caption: 'Localized headline, banner text, and ad copy for the Portuguese market. Focused on warmth, comfort, and click-through clarity — all while keeping the brand tone consistent.'
      },
      {
        type: 'image',
        src: './assets/images/beliani0525.png',
        caption: 'Translated headline, CTA, and body copy into smooth, inviting Portuguese. The goal? Evoke serenity and trust — while keeping the scroll-stopper energy strong and dog-approved.'
      },
      {
        type: 'image',
        src: './assets/images/4x3.png',
        caption: 'Translated dynamic copy and promo logic for Portuguese market. Balanced urgency ("Aprese-se!") with clarity of tiers, while keeping tone cheerful and conversion-oriented. Visual match ensured with headline rhythm and emoji touch — to sell with a smile.'
      },
      {
        type: 'image',
        src: './assets/images/candeeiro.png',
        caption: 'Localized and translated ad copy for Beliani’s table lamp promo. Aligned tone with the brand’s elegant yet energetic voice, ensuring the CTA and voucher logic were crystal-clear. Kept it inviting, not pushy — because great UX starts with the right words.'
      }
    ]
  },

  {
    slug: 'joiasonline-conversion-suite',
    title: 'JóiasOnline – Conversion Suite',
    category: 'e-commerce',
    blurb: 'End-to-end conversion copy for a premium jewelry store — hero, browsing, product detail, and checkout trust signals.',
    slides: [
      {
        type: 'image',
        src: './assets/images/joiasonline1.png',
        caption: 'Hero banner messaging for JóiasOnline.pt promoting their gold ring collection. Focused on elegant language and urgency — blending luxury tone with a clear call-to-action to lift click-through and engagement.'
      },
      {
        type: 'image',
        src: './assets/images/joiasonline2.png',
        caption: 'Product grid showcasing premium gold brooches with clear pricing and an elegant layout — structured for fast browsing and upscale presentation, reducing friction between discovery and decision.'
      },
      {
        type: 'image',
        src: './assets/images/joiasonline3.png',
        caption: 'Detailed product page for a premium silver item with historical value. Combined structured technical data (material, weight, origin) with clear pricing and legal marks, reducing pre-purchase uncertainty while keeping the layout easy to scan.'
      },
      {
        type: 'image',
        src: './assets/images/joiasonline4.png',
        caption: 'Checkout and trust-signal copy — clear shipping, return, and guarantee terms placed right where hesitation peaks, designed to reduce cart abandonment and reinforce confidence at the final step.'
      }
    ]
  },
  {
    slug: 'newgreenfil-investment-funnel',
    title: 'Newgreenfil – Investment Funnel',
    category: 'e-commerce',
    blurb: 'Full-funnel copy for a gold-investment platform — hero, lead capture, and legal/trust footer built for high-value conversions.',
    slides: [
      {
        type: 'image',
        src: './assets/images/newgreenfil1.png',
        caption: 'Homepage hero crafted to highlight gold bar investment, with real-time metal prices and bold CTAs. Messaging focused on credibility, urgency, and clarity for high-value transactions.'
      },
      {
        type: 'image',
        src: './assets/images/newgreenfil2.png',
        caption: 'Lead magnet designed to capture attention, create urgency, and guide users to take action — all backed by live metal pricing to reinforce credibility.'
      },
      {
        type: 'image',
        src: './assets/images/newgreenfil3.png',
        caption: 'Footer & legal UX: worked on the content and structure of the footer and legal sections — ensuring clarity, compliance, and ease of access to key info like terms, licenses, and contact channels.'
      }
    ]
  },
  {
    slug: 'beliani-ecommerce-suite',
    title: 'Beliani – E-commerce Localization',
    category: 'e-commerce',
    blurb: 'PT localization across the Beliani storefront — homepage banner, product listings, and seasonal email, kept on-brand and conversion-ready.',
    slides: [
      {
        type: 'image',
        src: './assets/images/beliani1.png',
        caption: 'Localized the homepage banner copy, crafting a clean, persuasive message with a clear CTA and urgency-driven countdown. Helped align visual appeal with functional e-commerce triggers to drive seasonal conversions.'
      },
      {
        type: 'image',
        src: './assets/images/beliani3.png',
        caption: 'Translated and adapted product listing content to the Portuguese market, ensuring clarity, tone, and appeal stayed consistent with brand standards.'
      },
      {
        type: 'image',
        src: './assets/images/beliani6.png',
        caption: 'Localized the seasonal newsletter copy for Beliani’s Halloween campaign, crafting culturally resonant Portuguese text that preserved the eerie elegance of the original design.'
      }
    ]
  },

  {
    slug: 'checkout-funnel-cro',
    title: 'E-commerce Checkout Funnel — CRO & Systems Architecture',
    category: 'automation and ai tools',
    blurb: 'Mapped the full checkout funnel end-to-end: conversion decision logic (exit-intent, friction points, drop-off risk) plus the technical systems behind it (APIs, webhooks, attribution).',
    slides: [
      {
        type: 'diagram',
        src: './assets/images/flowchart-checkout-funnel-logic.png',
        caption: 'Checkout funnel decision logic: from add-to-cart through guest-checkout friction, exit-intent triggers, shipping-cost thresholds, dynamic discounting, payment, and post-purchase upsell — every branch built to identify and remove drop-off risk.'
      },
      {
        type: 'diagram',
        src: './assets/images/flowchart-checkout-technical.png',
        caption: 'The same funnel mapped as a systems architecture: GTM dataLayer events, ERP stock validation, GEO-IP auth, shipping-rate API, tokenized payment gateway (Stripe/PayPal), and webhooks feeding ERP, marketing analytics (LTV/CAC), and transactional messaging.'
      }
    ]
  },

  {
    slug: 'ebay-store',
    title: 'Ebay Store',
    category: 'own projects',
    blurb: 'Nearly 20 years and ~900 deals as an independent online seller — first-hand experience with trust, feedback, and reputation systems.',
    slides: [
      {
        type: 'image',
        src: './assets/images/ebay store.png',
        caption: 'Online seller since 2007. I started selling retrogaming items in 2007 in Miau, Olx and Ebay.co.uk.'
      },
      {
        type: 'image',
        src: './assets/images/ebay store 2.png',
        caption: 'Ebay seller since 2007. 100% positive feedback. Almost 900 deals successfully concluded.'
      },
      {
        type: 'image',
        src: './assets/images/ebay store 3.png',
        caption: 'Perfect seller rating. Trustworthy member of the ebay community.'
      }
    ]
  },
  {
    slug: 'cv-dojo-master',
    title: 'CV Dojo Master – Upwork gig',
    category: 'own projects',
    blurb: 'Brand identity and landing page concept for a CV-optimization service — positioning, tone, and service-tier structure.',
    slides: [{
      type: 'image',
      src: './assets/images/cv dojo master.png',
      caption: 'Created the brand identity and visual storytelling for “CV Dojo Master” — a personal gig project blending samurai aesthetics with sharp CV strategy. Developed the logo, tagline, tone, and entire UX mockup for the landing page and service tiers.'
    }]
  },
  {
    slug: 'data-governance-upwork',
    title: 'Data Governance – Upwork Track Record',
    category: 'own projects',
    blurb: '9,000+ hours, 14 contracts, 100% Job Success — multilingual validation, SOP design, and audit-proof documentation for enterprise clients.',
    slides: [{
      type: 'image',
      src: './assets/images/data governance.png',
      caption: 'After 9,000+ logged hours, 14 contracts, and a pristine 100% Job Success Score, I solidified my place as a data governance expert. I specialize in multilingual validation, SOP architecture, audit-proof documentation, and high-stakes curation for enterprise across pharma, e-commerce, and financial intelligence.'
    }]
  },
  {
    slug: 'data-governance-lifecycle-logic',
    title: 'Account Lifecycle & Archiving Logic',
    category: 'automation and ai tools',
    blurb: 'A governance decision tree for account/profile status: role validation, cross-entity link audits, and archiving rules — built to keep every edge case auditable.',
    slides: [{
      type: 'diagram',
      src: './assets/images/flowchart-account-lifecycle.png',
      caption: 'Decision logic for handling profile status changes and inactive-account flags: checks for active sub-entity links, role/permission audits, distinguishing honorary or advisory roles from operational ones, and a final archiving rule based on the last known trusted baseline — designed so every outcome is traceable and defensible.'
    }]
  },
  {
    slug: 'bitsnostalgia',
    title: 'Bitsnostalgia — Retro E-commerce Project',
    category: 'own projects',
    blurb: 'Full retro e-commerce build (Figma → Shopify/WordPress): landing, filtering, homepage, blog, and product pages — designed end-to-end for conversion and UX.',
    slides: [
      {
        type: 'image',
        src: './assets/images/bitsnostalgia landing.png',
        caption: 'For this personal project, I designed and deployed a retro-themed landing page using HTML and CSS, hosted via E-goi. The goal? To harness nostalgia as a brand connector while collecting segmented customer insights through carefully crafted, playful questions.'
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/tQw-P-QU1eM',
        cover: './assets/images/thumb-bitsnostalgia-reel.jpg',
        caption: 'This project showcases a Shopify storefront prototype, initially designed in Figma to map the full user journey — from homepage to product exploration and the ordering process.'
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/mpbl7E3g1MA',
        cover: './assets/images/thumb-bitsnostalgia-filters.jpg',
        caption: 'Retro-themed store designed in Figma and built on WordPress. Here I focus on dynamic filters that streamline product discovery and boost user experience — fast, simple, effective.'
      },
      {
        type: 'image',
        src: './assets/images/bitsnostalgia1.png',
        caption: 'Homepage for Bitsnostalgia with retrogaming highlights and floating promo bubbles — built to trigger clicks and memories. Built with Figma and Shopify, deployed in WordPress.'
      },
      {
        type: 'image',
        src: './assets/images/bitsnostalgia2.png',
        caption: 'Carousel of handpicked retrogaming products with floating sale bubbles — built to capture attention and convert with style.'
      },
      {
        type: 'image',
        src: './assets/images/bitsnostalgia4.png',
        caption: 'Two original blog posts created to drive organic traffic and deepen user engagement through retro-culture storytelling.'
      },
      {
        type: 'image',
        src: './assets/images/bitsnostalgia5.png',
        caption: 'Custom-built contact form designed for user-friendly communication and future CRM integration.'
      },
      {
        type: 'image',
        src: './assets/images/bitsnostalgia6.png',
        caption: 'Focused product page featuring engaging descriptions and a “Recommended by Fans” badge — designed to drive clicks and build trust.'
      }
    ]
  },
  {
    slug: 'cellphone-store',
    title: 'Cellphone Store',
    category: 'own projects',
    blurb: 'Shopify storefront (Figma → build): homepage, curated collections, and dynamic filters — designed to streamline the path from browsing to purchase.',
    slides: [
      {
        type: 'image',
        src: './assets/images/telemoveis1.png',
        caption: 'Built in Shopify from a Figma design — the homepage highlights top deals, featured products, and a smooth product carousel for an intuitive user flow.'
      },
      {
        type: 'image',
        src: './assets/images/telemoveis2.png',
        caption: 'Curated layout emphasizing standout smartphones, designed to drive user attention and support purchase decisions.'
      },
      {
        type: 'image',
        src: './assets/images/telemoveis3.png',
        caption: 'A product grid equipped with essential filters for category, price, and specs — designed to streamline navigation and support fast, informed transactions.'
      },
      {
        type: 'image',
        src: './assets/images/telemoveis6.png',
        caption: 'Focused layout with clear pricing, concise specs, and call-to-action — built to drive trust and support quick decision-making.'
      }
    ]
  },
  {
    slug: 'enrique-pulido-profile',
    title: 'Curated Profile – Enrique Pulido',
    category: 'own projects',
    blurb: 'Curated Veeva profile — multilingual data validation and governance work within an enterprise compliance system.',
    slides: [{
      type: 'image',
      src: './assets/images/Enrique_Pulido.avif',
      caption: 'Curated Veeva profile — part of the multilingual validation and data governance work across enterprise systems.'
    }]
  },
  {
    slug: 'veeva-interface',
    title: 'Veeva Interface',
    category: 'own projects',
    blurb: 'Curated Veeva interface profile, part of the same enterprise data-governance and compliance track record.',
    slides: [{
      type: 'image',
      src: './assets/images/Paul_winner.avif',
      caption: 'Curated Veeva interface profile, part of the same enterprise data governance track record.'
    }]
  },

  {
    slug: 'resume-dojo-sensei',
    title: 'Resume Dojo Sensei',
    category: 'automation and ai tools',
    blurb: 'Custom GPT built to help job seekers beat ATS filtering and human bias — from keyword matching to mindset coaching.',
    slides: [{
      type: 'image',
      src: './assets/images/resume dojo sensei.png',
      caption: 'Part expert system, part career sparring partner — this GPT was custom-built to help job seekers slice through the noise of Applicant Tracking Systems (ATS) and human bias, guiding users through everything from keyword matching to mindset resets.'
    }]
  },
  {
    slug: 'career-comeback-dojo',
    title: 'Career Comeback Dojo',
    category: 'automation and ai tools',
    blurb: 'AI-assisted career tool that optimizes resumes for both ATS systems and human readers — clarity and impact, tuned for both audiences.',
    slides: [{
      type: 'image',
      src: './assets/images/career comeback dojo.png',
      caption: 'A career optimization tool built to help job seekers stand out — for both ATS systems and real human readers. Designed for those who want their experience to speak louder, sharper, and with purpose.'
    }]
  },
  {
    slug: 'makeit-automation',
    title: 'Marketing Automation with Make',
    category: 'automation and ai tools',
    blurb: 'No-code automation (Make.com → Brevo) connecting a web form directly to a mailing list — instant lead capture, zero manual entry.',
    slides: [{
      type: 'image',
      src: './assets/images/makeit automation.png',
      caption: 'Connected a website form to Brevo via Make.com, so every submission is instantly added to my mailing list — automating lead capture for future email campaigns.'
    }]
  },
  {
    slug: 'email-lifecycle-automation',
    title: 'Email Lifecycle & Segmentation Logic',
    category: 'automation and ai tools',
    blurb: 'Subscriber lifecycle logic from opt-in to segmentation to list hygiene — designed to protect deliverability while maximizing engagement.',
    slides: [{
      type: 'diagram',
      src: './assets/images/flowchart-email-lifecycle.png',
      caption: 'Subscriber lifecycle automation: double opt-in confirmation, profile enrichment (geo/language), a 14-day engagement audit that segments high-intent vs. at-risk subscribers, a re-engagement sequence, and automated list scrubbing to protect domain/sender reputation.'
    }]
  }
];

/* Rótulos de categoria corretos (o regex de title-case ingénuo transformava
   "automation and ai tools" em "Automation And Ai Tools" — errado) */
const CATEGORY_LABELS = {
  'branding': 'Branding',
  'e-commerce': 'E-commerce',
  'automation and ai tools': 'Automation & AI Tools',
  'own projects': 'Own Projects'
};
function categoryLabelFor(category) {
  return CATEGORY_LABELS[category] || category.replace(/\b\w/g, c => c.toUpperCase());
}

/* === RENDER DO GRID DE PROJETOS === */
function renderProjects() {
  const list = document.getElementById('project-list');
  if (!list) return;

  list.innerHTML = projects.map(project => {
    const cover = project.slides[0].cover || project.slides[0].src;
    const firstType = project.slides[0].type;
    const isPlayable = firstType === 'video' || firstType === 'youtube';
    const isDiagram = firstType === 'diagram';
    const multi = project.slides.length > 1;
    const categoryLabel = categoryLabelFor(project.category);

    return `
      <li class="project-item" data-filter-item data-category="${project.category}">
        <a href="#" class="open-modal" data-slug="${project.slug}">
          <figure class="project-img${isDiagram ? ' project-img-diagram' : ''}">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${cover}" alt="${project.title}" loading="lazy">
            ${isPlayable ? '<div class="project-play-overlay">▶</div>' : ''}
            ${isDiagram ? '<div class="project-diagram-overlay"><ion-icon name="git-network-outline"></ion-icon> Process Map</div>' : ''}
            ${multi ? `<span class="project-multi-badge"><ion-icon name="images-outline"></ion-icon> ${project.slides.length}</span>` : ''}
            <figcaption class="project-hover-text">${project.blurb || project.slides[0].caption}</figcaption>
          </figure>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-category">${categoryLabel}</p>
        </a>
      </li>
    `;
  }).join('');
}

/* === FILTERING === */
function setupFiltering(savedFilter) {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const blurbs = document.querySelectorAll("[data-blurb-item]");

  // Se o filtro guardado (ex: de uma visita anterior) já não existir
  // como aba válida — como aconteceu ao fundirmos "copywriting" em
  // "branding" — caímos em segurança para "all" em vez de mostrar um grid vazio.
  const validFilters = [...filterBtns].map(btn => btn.innerText.toLowerCase());
  if (!validFilters.includes(savedFilter)) savedFilter = 'all';

  let lastActiveBtn = filterBtns[0];

  function filterFunc(selectedValue) {
    localStorage.setItem("activeFilter", selectedValue);

    // Os cartões são recriados sempre que o filtro muda, por isso
    // vamos buscar os elementos atuais em vez de guardar uma referência antiga.
    document.querySelectorAll("[data-filter-item]").forEach(item => {
      const category = item.dataset.category?.toLowerCase() ?? '';
      item.classList.toggle("hide", selectedValue !== "all" && category !== selectedValue);
    });

    blurbs.forEach(blurb => {
      const category = blurb.dataset.category?.toLowerCase() ?? '';
      blurb.classList.toggle("hide", category !== selectedValue);
    });

    document.querySelector('.project-list')?.setAttribute('data-active', selectedValue);
  }

  select?.addEventListener("click", () => elementToggleFunc(select));

  selectItems.forEach(item => {
    item.addEventListener("click", () => {
      const selected = item.innerText.toLowerCase();
      selectValue.innerText = item.innerText;
      elementToggleFunc(select);
      filterBtns.forEach(btn => btn.classList.remove("active"));
      filterFunc(selected);
    });
  });

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.innerText.toLowerCase();
      selectValue.innerText = btn.innerText;
      filterFunc(selected);
      lastActiveBtn.classList.remove("active");
      btn.classList.add("active");
      lastActiveBtn = btn;
    });
  });

  filterFunc(savedFilter); // corre o filtro sem criar chamada recursiva
}

/* === FORM VALIDATION === */
function setupFormValidation() {
  const form = document.querySelector("[data-form]");
  const inputs = document.querySelectorAll("[data-form-input]");
  const btn = document.querySelector("[data-form-btn]");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      btn.disabled = !form.checkValidity();
    });
  });
}

/* === NAVIGATION === */
function setupNavigation() {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");
  navLinks.forEach((link, i) => {
    link.addEventListener("click", () => {
      pages.forEach(p => p.classList.remove("active"));
      navLinks.forEach(n => n.classList.remove("active"));
      pages[i].classList.add("active");
      navLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    });
  });
}

/* =====================================================================
   MODAL ÚNICO DE PROJETOS + CARROSSEL
   Um só modal no HTML (#project-modal). Ao clicar numa imagem/vídeo,
   procuramos o projeto correspondente em `projects` pelo data-slug e
   injetamos aqui o slide atual. Se o projeto tiver mais do que um slide,
   mostramos setas e pontos para navegar entre eles.
===================================================================== */
function setupProjectModal() {
  const modal = document.getElementById('project-modal');
  const mediaEl = document.getElementById('pmodal-media');
  const titleEl = document.getElementById('pmodal-title');
  const categoryEl = document.getElementById('pmodal-category');
  const captionEl = document.getElementById('pmodal-caption');
  const dotsEl = document.getElementById('pmodal-dots');
  const prevBtn = document.getElementById('pmodal-prev');
  const nextBtn = document.getElementById('pmodal-next');
  const closeBtn = document.getElementById('pmodal-close');

  if (!modal) return;

  let currentProject = null;
  let currentIndex = 0;

  function renderSlide() {
    const slide = currentProject.slides[currentIndex];
    mediaEl.innerHTML = '';

    let el;
    if (slide.type === 'image') {
      el = document.createElement('img');
      el.src = slide.src;
      el.alt = currentProject.title;
    } else if (slide.type === 'diagram') {
      const frame = document.createElement('div');
      frame.className = 'pmodal-diagram-frame';
      const img = document.createElement('img');
      img.src = slide.src;
      img.alt = currentProject.title;
      frame.appendChild(img);
      el = frame;
    } else if (slide.type === 'video') {
      el = document.createElement('video');
      el.src = slide.src;
      el.controls = true;
    } else if (slide.type === 'youtube') {
      el = document.createElement('iframe');
      el.src = slide.src;
      el.setAttribute('frameborder', '0');
      el.allow = 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      el.allowFullscreen = true;
    }

    if (el) mediaEl.appendChild(el);

    // Diagramas ganham uma caixa mais larga — há mais texto para caber
    // antes de ter de reduzir a escala e perder legibilidade.
    document.querySelector('.pmodal-box')?.classList.toggle('pmodal-box-wide', slide.type === 'diagram');

    captionEl.textContent = slide.caption || '';

    // pontos do carrossel
    [...dotsEl.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function openModal(project) {
    currentProject = project;
    currentIndex = 0;

    titleEl.textContent = project.title;
    categoryEl.textContent = categoryLabelFor(project.category);

    const multi = project.slides.length > 1;
    prevBtn.style.display = multi ? '' : 'none';
    nextBtn.style.display = multi ? '' : 'none';

    dotsEl.innerHTML = '';
    if (multi) {
      project.slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'pmodal-dot';
        dot.setAttribute('aria-label', `Imagem ${i + 1}`);
        dot.addEventListener('click', () => { currentIndex = i; renderSlide(); });
        dotsEl.appendChild(dot);
      });
    }

    renderSlide();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    mediaEl.innerHTML = ''; // pára vídeos/iframes em reprodução
    document.body.style.overflow = '';
  }

  function showPrev() {
    if (!currentProject) return;
    currentIndex = (currentIndex - 1 + currentProject.slides.length) % currentProject.slides.length;
    renderSlide();
  }

  function showNext() {
    if (!currentProject) return;
    currentIndex = (currentIndex + 1) % currentProject.slides.length;
    renderSlide();
  }

  // delegação de eventos: funciona mesmo depois de o grid ser re-renderizado
  document.getElementById('project-list')?.addEventListener('click', e => {
    const link = e.target.closest('.open-modal');
    if (!link) return;
    e.preventDefault();

    const project = projects.find(p => p.slug === link.dataset.slug);
    if (project) openModal(project);
  });

  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal(); // clique fora da caixa
  });

  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
}
