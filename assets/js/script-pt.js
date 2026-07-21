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
  setupContactForm();
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
    title: 'Beliani – Localização de Vídeo de Marca',
    category: 'branding',
    blurb: 'Localização em PT do conteúdo de vídeo de marca da Beliani — adaptando o tom, os dados e a ressonância emocional para o mercado português.',
    slides: [
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/xLzjcl9GP2M',
        cover: 'https://img.youtube.com/vi/xLzjcl9GP2M/hqdefault.jpg',
        caption: 'Tradução das legendas para o manifesto emocional da Beliani, "Delivering Happiness". Isto foi mais do que uma simples conversão linguística — foi sobre transportar a promessa, a calidez e o tom emocional da marca entre culturas, com nuance e cuidado.'
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/1XRYlaYEe7s',
        cover: 'https://img.youtube.com/vi/1XRYlaYEe7s/hqdefault.jpg',
        caption: 'Tradução do texto no ecrã e da voz off para o vídeo do armazém da Beliani — garantindo que os espectadores portugueses compreendiam claramente estatísticas operacionais como a dimensão do armazém, o número de equipa e o volume de produtos. O objetivo: preservar a clareza e a confiança ao adaptar dados-chave à realidade local.'
      }
    ]
  },
  {
    slug: 'vans-branding-course-clip',
    title: 'Vans – Clip de Curso de Branding',
    category: 'branding',
    blurb: 'Guionismo, narração e interpretação de um vídeo de branding para um curso de Marketing Digital — storytelling de marca do conceito à entrega.',
    slides: [{
      type: 'youtube',
      src: 'https://www.youtube.com/embed/DMoMl-zikTI',
      cover: 'https://img.youtube.com/vi/DMoMl-zikTI/hqdefault.jpg',
      caption: 'Para o projeto final do meu curso de Marketing Digital, escrevi, narrei e interpretei um vídeo de branding inspirado na Vans. Mais do que um trabalho académico, foi uma homenagem aos momentos que nos definem — porque às vezes escolhemos o momento… e às vezes é o momento que nos escolhe a nós.'
    }]
  },
  {
    slug: 'bitsnostalgia-logo',
    title: 'Logótipo Bitsnostalgia',
    category: 'branding',
    blurb: 'Identidade de marca para o meu próprio projeto de retrogaming — logótipo, paleta, tom de voz e diretrizes construídas do zero.',
    slides: [{
      type: 'image',
      src: '../assets/images/bitsnostalgialogo.jpg',
      caption: 'Definição da identidade de marca da Bitsnostalgia, o meu próprio projeto de retrogaming. Desenvolvimento da linguagem visual (logótipo, paleta e estilo gráfico), criação do tom de voz e definição de diretrizes de marca claras — tudo inspirado na cultura gamer dos anos 80, com um toque rebelde.'
    }]
  },

  {
    slug: 'beliani-campaign-copywriting',
    title: 'Beliani – Copywriting & Localização de Campanhas',
    category: 'branding',
    blurb: 'Copywriting e localização em PT em 9 campanhas da Beliani (vídeo + anúncios estáticos) — tom, urgência e clareza de CTA ajustados para conversão.',
    slides: [
      {
        type: 'video',
        src: '../videos/Beliani2024.mp4',
        cover: '../assets/images/thumb-summer_sale_2025.png',
        caption: 'Tradução do guião completo para a versão portuguesa da Promoção de Verão Beliani 2023 — adaptando o tom, o ritmo e a mensagem à energia vibrante e sazonal da campanha.'
      },
      {
        type: 'video',
        src: '../videos/beliani_082024.mp4',
        cover: '../assets/images/thumb-summer_sale_2023.png',
        caption: 'Tradução de títulos, vídeos promocionais e banners para a versão portuguesa da campanha de Verão Beliani 2024 — mantendo o tom e o envolvimento afiados. Acima: anúncio Meta dessa campanha.'
      },
      {
        type: 'video',
        src: '../videos/beliani_socialmedia_2024.mp4',
        cover: '../assets/images/thumb-summer_campaign_2025.png',
        caption: 'Tradução de legendas para um testemunho de grande energia, com um proprietário orgulhoso a celebrar o seu novo jardim. Garantida a preservação da alegria, personalidade e autenticidade na tradução — sem perder ritmo nem tom cultural.'
      },
      {
        type: 'video',
        src: '../videos/Pt Campaign 2025.mp4',
        cover: '../assets/images/thumb-beliani_table_campaign.png',
        caption: 'Tradução da voz off de um vídeo de campanha em que uma mulher deixa cair comida no chão durante um jantar de família — dramatizando a necessidade de uma mesa de jantar adequada. Garantido que o humor e a mensagem passavam de forma fluida em português, mantendo o tom da marca.'
      },
      {
        type: 'video',
        src: '../videos/beliani_campanha_junho2025.mp4',
        cover: '../assets/images/thumb-beliani_summer_campaign.png',
        caption: 'Liderança da adaptação portuguesa usada na voz off da campanha — garantindo tom, ritmo e ressonância cultural. Criação também do jingle original, alinhando melodia e mensagem para elevar a recordação de marca e o impacto emocional.'
      },
      {
        type: 'image',
        src: '../assets/images/beliani0524.png',
        caption: 'Localização do título, texto de banner e copy de anúncio para o mercado português. Foco na calidez, conforto e clareza de clique — mantendo o tom da marca consistente.'
      },
      {
        type: 'image',
        src: '../assets/images/beliani0525.png',
        caption: 'Tradução do título, CTA e corpo de texto para um português fluido e convidativo. O objetivo? Evocar serenidade e confiança — mantendo forte a energia que prende o olhar, com selo canino de aprovação.'
      },
      {
        type: 'image',
        src: '../assets/images/4x3.png',
        caption: 'Tradução de copy dinâmica e lógica promocional para o mercado português. Equilíbrio entre urgência ("Aprese-se!") e clareza dos escalões, mantendo o tom alegre e orientado para a conversão. Alinhamento visual garantido com o ritmo do título e o toque de emoji — para vender com um sorriso.'
      },
      {
        type: 'image',
        src: '../assets/images/candeeiro.png',
        caption: 'Localização e tradução da copy publicitária para a promoção do candeeiro de mesa da Beliani. Alinhamento do tom com a voz elegante mas energética da marca, garantindo que o CTA e a lógica do voucher eram cristalinos. Mantido convidativo, sem ser insistente — porque uma boa UX começa com as palavras certas.'
      }
    ]
  },

  {
    slug: 'joiasonline-conversion-suite',
    title: 'JóiasOnline – Suite de Conversão',
    category: 'e-commerce',
    blurb: 'Copy de conversão de ponta a ponta para uma joalharia premium — hero, navegação, ficha de produto e sinais de confiança no checkout.',
    slides: [
      {
        type: 'image',
        src: '../assets/images/joiasonline1.png',
        caption: 'Mensagem hero para a JóiasOnline.pt promovendo a coleção de anéis de ouro. Foco numa linguagem elegante e na urgência — combinando um tom de luxo com uma chamada à ação clara para aumentar o clique e o envolvimento.'
      },
      {
        type: 'image',
        src: '../assets/images/joiasonline2.png',
        caption: 'Grelha de produtos com broches de ouro premium, preços claros e um layout elegante — estruturada para navegação rápida e apresentação sofisticada, reduzindo a fricção entre descoberta e decisão.'
      },
      {
        type: 'image',
        src: '../assets/images/joiasonline3.png',
        caption: 'Página de produto detalhada para uma peça premium em prata com valor histórico. Combinação de dados técnicos estruturados (material, peso, origem) com preços claros e marcas legais, reduzindo a incerteza pré-compra e mantendo o layout fácil de percorrer.'
      },
      {
        type: 'image',
        src: '../assets/images/joiasonline4.png',
        caption: 'Copy de checkout e sinais de confiança — condições claras de envio, devolução e garantia colocadas exatamente onde a hesitação atinge o pico, concebidas para reduzir o abandono de carrinho e reforçar a confiança no passo final.'
      }
    ]
  },
  {
    slug: 'newgreenfil-investment-funnel',
    title: 'Newgreenfil – Funil de Investimento',
    category: 'e-commerce',
    blurb: 'Copy de funil completo para uma plataforma de investimento em ouro — hero, captação de leads e rodapé legal/de confiança construídos para conversões de alto valor.',
    slides: [
      {
        type: 'image',
        src: '../assets/images/newgreenfil1.png',
        caption: 'Hero da homepage criado para destacar o investimento em barras de ouro, com preços de metais em tempo real e CTAs fortes. Mensagem focada em credibilidade, urgência e clareza para transações de alto valor.'
      },
      {
        type: 'image',
        src: '../assets/images/newgreenfil2.png',
        caption: 'Lead magnet concebido para captar atenção, criar urgência e orientar os utilizadores à ação — tudo apoiado em preços de metais ao vivo para reforçar a credibilidade.'
      },
      {
        type: 'image',
        src: '../assets/images/newgreenfil3.png',
        caption: 'UX de rodapé e secção legal: trabalho no conteúdo e estrutura do rodapé e das secções legais — garantindo clareza, conformidade e facilidade de acesso a informação-chave como termos, licenças e canais de contacto.'
      }
    ]
  },
  {
    slug: 'beliani-ecommerce-suite',
    title: 'Beliani – Localização de E-commerce',
    category: 'e-commerce',
    blurb: 'Localização em PT em toda a loja online da Beliani — banner da homepage, listagens de produtos e email sazonal, mantendo a consistência de marca e o foco na conversão.',
    slides: [
      {
        type: 'image',
        src: '../assets/images/beliani1.png',
        caption: 'Localização da copy do banner da homepage, criando uma mensagem limpa e persuasiva com um CTA claro e uma contagem decrescente orientada para a urgência. Ajuda a alinhar o apelo visual com os gatilhos funcionais de e-commerce para impulsionar conversões sazonais.'
      },
      {
        type: 'image',
        src: '../assets/images/beliani3.png',
        caption: 'Tradução e adaptação do conteúdo das listagens de produtos para o mercado português, garantindo clareza, tom e apelo consistentes com os padrões da marca.'
      },
      {
        type: 'image',
        src: '../assets/images/beliani6.png',
        caption: 'Localização da copy da newsletter sazonal para a campanha de Halloween da Beliani, criando um texto em português culturalmente ressonante que preservou a elegância sombria do design original.'
      }
    ]
  },

  {
    slug: 'checkout-funnel-cro',
    title: 'Funil de Checkout E-commerce — CRO & Arquitetura de Sistemas',
    category: 'automation and ai tools',
    blurb: 'Mapeamento do funil de checkout completo, de ponta a ponta: lógica de decisão de conversão (exit-intent, pontos de fricção, risco de abandono) mais os sistemas técnicos por trás (APIs, webhooks, atribuição).',
    slides: [
      {
        type: 'diagram',
        src: '../assets/images/flowchart-checkout-funnel-logic.png',
        caption: 'Lógica de decisão do funil de checkout: desde adicionar ao carrinho, passando pela fricção do checkout sem registo, gatilhos de exit-intent, limiares de custo de envio, descontos dinâmicos, pagamento e upsell pós-compra — cada ramo construído para identificar e eliminar o risco de abandono.'
      },
      {
        type: 'diagram',
        src: '../assets/images/flowchart-checkout-technical.png',
        caption: 'O mesmo funil mapeado como arquitetura de sistemas: eventos do dataLayer do GTM, validação de stock ERP, autenticação GEO-IP, API de tarifas de envio, gateway de pagamento tokenizado (Stripe/PayPal) e webhooks que alimentam o ERP, analytics de marketing (LTV/CAC) e mensagens transacionais.'
      }
    ]
  },

  {
    slug: 'ebay-store',
    title: 'Loja Ebay',
    category: 'own projects',
    blurb: 'Quase 20 anos e cerca de 900 negócios como vendedor online independente — experiência direta com sistemas de confiança, feedback e reputação.',
    slides: [
      {
        type: 'image',
        src: '../assets/images/ebay store.png',
        caption: 'Vendedor online desde 2007. Comecei a vender artigos de retrogaming em 2007 no Miau, Olx e Ebay.co.uk.'
      },
      {
        type: 'image',
        src: '../assets/images/ebay store 2.png',
        caption: 'Vendedor na Ebay desde 2007. 100% de feedback positivo. Quase 900 negócios concluídos com sucesso.'
      },
      {
        type: 'image',
        src: '../assets/images/ebay store 3.png',
        caption: 'Classificação de vendedor perfeita. Membro de confiança da comunidade Ebay.'
      }
    ]
  },
  {
    slug: 'cv-dojo-master',
    title: 'CV Dojo Master – Gig no Upwork',
    category: 'own projects',
    blurb: 'Identidade de marca e conceito de landing page para um serviço de otimização de CV — posicionamento, tom e estrutura de escalões de serviço.',
    slides: [{
      type: 'image',
      src: '../assets/images/cv dojo master.png',
      caption: 'Criação da identidade de marca e storytelling visual para o "CV Dojo Master" — um projeto pessoal que combina estética samurai com estratégia de CV afiada. Desenvolvimento do logótipo, tagline, tom de voz e todo o mockup de UX para a landing page e os escalões de serviço.'
    }]
  },
  {
    slug: 'data-governance-upwork',
    title: 'Governação de Dados – Histórico no Upwork',
    category: 'own projects',
    blurb: 'Mais de 9.000 horas, 14 contratos, 100% de Sucesso — validação multilingue, conceção de SOPs e documentação à prova de auditoria para clientes empresariais.',
    slides: [{
      type: 'image',
      src: '../assets/images/data governance.png',
      caption: 'Após mais de 9.000 horas registadas, 14 contratos e uma pontuação impecável de 100% de Sucesso, consolidei o meu lugar como especialista em governação de dados. Especializo-me em validação multilingue, arquitetura de SOPs, documentação à prova de auditoria e curadoria de alto risco para empresas dos setores farmacêutico, e-commerce e inteligência financeira.'
    }]
  },
  {
    slug: 'data-governance-lifecycle-logic',
    title: 'Lógica de Ciclo de Vida & Arquivo de Contas',
    category: 'automation and ai tools',
    blurb: 'Uma árvore de decisão de governação para o estado de contas/perfis: validação de funções, auditorias de ligações entre entidades e regras de arquivo — construída para manter cada caso limite auditável.',
    slides: [{
      type: 'diagram',
      src: '../assets/images/flowchart-account-lifecycle.png',
      caption: 'Lógica de decisão para gerir alterações de estado de perfil e sinalizações de contas inativas: verificações de ligações ativas a sub-entidades, auditorias de funções/permissões, distinção entre funções honorárias ou consultivas e operacionais, e uma regra final de arquivo baseada na última referência de confiança conhecida — concebida para que cada resultado seja rastreável e defensável.'
    }]
  },
  {
    slug: 'bitsnostalgia',
    title: 'Bitsnostalgia — Projeto de E-commerce Retro',
    category: 'own projects',
    blurb: 'Construção completa de e-commerce retro (Figma → Shopify/WordPress): landing page, filtros, homepage, blog e páginas de produto — concebidos de ponta a ponta para conversão e UX.',
    slides: [
      {
        type: 'image',
        src: '../assets/images/bitsnostalgia landing.png',
        caption: 'Neste projeto pessoal, concebi e lancei uma landing page de temática retro usando HTML e CSS, alojada via E-goi. O objetivo? Usar a nostalgia como conector de marca, ao mesmo tempo que recolhia insights segmentados de clientes através de perguntas cuidadosamente elaboradas e lúdicas.'
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/tQw-P-QU1eM',
        cover: '../assets/images/thumb-bitsnostalgia-reel.jpg',
        caption: 'Este projeto apresenta um protótipo de loja Shopify, inicialmente desenhado no Figma para mapear toda a jornada do utilizador — da homepage à exploração de produtos e ao processo de encomenda.'
      },
      {
        type: 'youtube',
        src: 'https://www.youtube.com/embed/mpbl7E3g1MA',
        cover: '../assets/images/thumb-bitsnostalgia-filters.jpg',
        caption: 'Loja de temática retro desenhada no Figma e construída em WordPress. Aqui foco-me em filtros dinâmicos que agilizam a descoberta de produtos e melhoram a experiência do utilizador — rápido, simples, eficaz.'
      },
      {
        type: 'image',
        src: '../assets/images/bitsnostalgia1.png',
        caption: 'Homepage da Bitsnostalgia com destaques de retrogaming e bolhas promocionais flutuantes — construída para gerar cliques e memórias. Feita com Figma e Shopify, lançada em WordPress.'
      },
      {
        type: 'image',
        src: '../assets/images/bitsnostalgia2.png',
        caption: 'Carrossel de produtos de retrogaming selecionados à mão, com bolhas promocionais flutuantes — construído para captar atenção e converter com estilo.'
      },
      {
        type: 'image',
        src: '../assets/images/bitsnostalgia4.png',
        caption: 'Dois artigos de blog originais criados para gerar tráfego orgânico e aprofundar o envolvimento do utilizador através de storytelling sobre cultura retro.'
      },
      {
        type: 'image',
        src: '../assets/images/bitsnostalgia5.png',
        caption: 'Formulário de contacto construído à medida, pensado para uma comunicação simples e futura integração com CRM.'
      },
      {
        type: 'image',
        src: '../assets/images/bitsnostalgia6.png',
        caption: 'Página de produto focada, com descrições envolventes e um selo "Recomendado por Fãs" — pensada para gerar cliques e construir confiança.'
      }
    ]
  },
  {
    slug: 'cellphone-store',
    title: 'Loja de Telemóveis',
    category: 'own projects',
    blurb: 'Loja Shopify (Figma → construção): homepage, coleções curadas e filtros dinâmicos — concebidos para simplificar o percurso da navegação até à compra.',
    slides: [
      {
        type: 'image',
        src: '../assets/images/telemoveis1.png',
        caption: 'Construída em Shopify a partir de um design em Figma — a homepage destaca as melhores ofertas, produtos em destaque e um carrossel de produtos fluido para uma navegação intuitiva.'
      },
      {
        type: 'image',
        src: '../assets/images/telemoveis2.png',
        caption: 'Layout curado que dá destaque a smartphones em evidência, pensado para captar a atenção do utilizador e apoiar decisões de compra.'
      },
      {
        type: 'image',
        src: '../assets/images/telemoveis3.png',
        caption: 'Grelha de produtos equipada com filtros essenciais de categoria, preço e especificações — pensada para simplificar a navegação e apoiar transações rápidas e informadas.'
      },
      {
        type: 'image',
        src: '../assets/images/telemoveis6.png',
        caption: 'Layout focado com preços claros, especificações concisas e chamada à ação — construído para gerar confiança e apoiar decisões rápidas.'
      }
    ]
  },

  {
    slug: 'resume-dojo-sensei',
    title: 'Resume Dojo Sensei',
    category: 'automation and ai tools',
    blurb: 'GPT personalizado construído para ajudar candidatos a superar a filtragem de ATS e o enviesamento humano — desde a correspondência de palavras-chave ao coaching de mentalidade.',
    slides: [{
      type: 'image',
      src: '../assets/images/resume dojo sensei.png',
      caption: 'Parte sistema especialista, parte parceiro de treino de carreira — este GPT foi construído à medida para ajudar candidatos a atravessar o ruído dos sistemas de rastreio de candidaturas (ATS) e o enviesamento humano, guiando os utilizadores desde a correspondência de palavras-chave até à reinicialização da mentalidade.'
    }]
  },
  {
    slug: 'career-comeback-dojo',
    title: 'Career Comeback Dojo',
    category: 'automation and ai tools',
    blurb: 'Ferramenta de carreira assistida por IA que otimiza currículos tanto para sistemas ATS como para leitores humanos — clareza e impacto, ajustados para ambos os públicos.',
    slides: [{
      type: 'image',
      src: '../assets/images/career comeback dojo.png',
      caption: 'Uma ferramenta de otimização de carreira construída para ajudar candidatos a destacarem-se — tanto para sistemas ATS como para leitores humanos reais. Pensada para quem quer que a sua experiência fale mais alto, com mais nitidez e propósito.'
    }]
  },
  {
    slug: 'makeit-automation',
    title: 'Automação de Marketing com Make',
    category: 'automation and ai tools',
    blurb: 'Automação no-code (Make.com → Brevo) que liga um formulário web diretamente a uma lista de email — captação instantânea de leads, zero introdução manual.',
    slides: [{
      type: 'image',
      src: '../assets/images/makeit automation.png',
      caption: 'Ligação de um formulário do website ao Brevo via Make.com, de forma a que cada submissão seja instantaneamente adicionada à minha lista de email — automatizando a captação de leads para futuras campanhas de email.'
    }]
  },
  {
    slug: 'email-lifecycle-automation',
    title: 'Lógica de Ciclo de Vida & Segmentação de Email',
    category: 'automation and ai tools',
    blurb: 'Lógica de ciclo de vida de subscritores, desde o opt-in até à segmentação e higiene da lista — concebida para proteger a entregabilidade e maximizar o envolvimento.',
    slides: [{
      type: 'diagram',
      src: '../assets/images/flowchart-email-lifecycle.png',
      caption: 'Automação do ciclo de vida de subscritores: confirmação de duplo opt-in, enriquecimento de perfil (geo/idioma), uma auditoria de envolvimento de 14 dias que segmenta subscritores de alta intenção vs. em risco, uma sequência de reengajamento e limpeza automática da lista para proteger a reputação do domínio/remetente.'
    }]
  }
];

/* Rótulos de categoria corretos (o regex de title-case ingénuo transformava
   "automation and ai tools" em "Automation And Ai Tools" — errado) */
const CATEGORY_LABELS = {
  'branding': 'Branding',
  'e-commerce': 'E-commerce',
  'automation and ai tools': 'Automação & Ferramentas de IA',
  'own projects': 'Projetos Próprios'
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
            ${isDiagram ? '<div class="project-diagram-overlay"><ion-icon name="git-network-outline"></ion-icon> Mapa de Processo</div>' : ''}
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

/* === CONTACT FORM (envio via FormSubmit, sem sair da página) === */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const btn = document.getElementById('contact-form-btn');
  const status = document.getElementById('contact-form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.disabled = true;
    const originalLabel = btn.textContent;
    btn.textContent = 'A enviar...';
    status.textContent = '';
    status.style.color = '';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        status.textContent = "Mensagem enviada — entrarei em contacto brevemente.";
        status.style.color = '#4CAF50';
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      status.textContent = 'Ocorreu um erro. Por favor, envie-me um email diretamente para smarmelo@gmail.com.';
      status.style.color = '#e05353';
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
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
