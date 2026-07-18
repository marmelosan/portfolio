

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
  setupFiltering(savedFilter);
  setupFormValidation();
  setupNavigation();
  setupMediaModal();
  setupVideoThumbnails();
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

/* === FILTERING === */
function setupFiltering(savedFilter) {
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const blurbs = document.querySelectorAll("[data-blurb-item]");

  let lastActiveBtn = filterBtns[0];

  function filterFunc(selectedValue) {
    localStorage.setItem("activeFilter", selectedValue);

    filterItems.forEach(item => {
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

  filterFunc(savedFilter); // <-- corre o filtro sem criar chamada recursiva
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

const modal = document.getElementById('universal-modal');
const modalTitle = document.getElementById('universal-modal-title');
const modalMedia = document.getElementById('universal-modal-media');
const modalCaption = document.getElementById('universal-modal-caption');
const modalLink = document.getElementById('universal-modal-link');
const modalClose = document.getElementById('universal-modal-close');

document.querySelectorAll('.open-modal').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();

    const type = el.dataset.type;
    const src = el.dataset.src;
    const title = el.querySelector('.project-title')?.innerText || '';
    const caption = el.querySelector('.project-hover-text')?.innerText || '';
    const link = el.getAttribute('href') || '#';

    modalTitle.textContent = title;
    modalCaption.textContent = caption;
    modalLink.href = link;
    modalMedia.innerHTML = ''; // clear

    let mediaEl;

if (type === 'image') {
  // Get images, default to single source if no list provided
  const images = el.dataset.images ? el.dataset.images.split(',') : [src];
  
  // Clear modal and show it
  modalMedia.innerHTML = ''; 
  modal.style.display = 'flex';

  // Add each image
  images.forEach(imageSrc => {
    const img = document.createElement('img');
    img.src = imageSrc.trim();
    img.className = 'project-image-stack'; // Using the CSS class we defined
    img.alt = title;
    modalMedia.appendChild(img);
  });
}

modalClose.addEventListener('click', () => {
  modal.style.display = 'none';
  modalMedia.innerHTML = '';
});

window.addEventListener('click', function (e) {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalMedia.innerHTML = '';
  }
});

/* === VIDEO THUMBNAILS === */
function setupVideoThumbnails() {
  document.querySelectorAll('.open-modal').forEach(link => {
    if (link.dataset.type === 'video') {
      const videoSrc = link.dataset.src;
      const img = link.querySelector('.video-thumb');

      const video = document.createElement('video');
      video.src = videoSrc;
      video.crossOrigin = 'anonymous';
      video.muted = true;
      video.preload = 'auto';

      video.addEventListener('loadeddata', () => video.currentTime = 0.1);
      video.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        img.src = canvas.toDataURL('image/jpeg');
      });
    }
  });
}

// CORREÇÃO: Usamos o ID 'portfolio-modal' que está no teu CSS
const modal = document.getElementById('portfolio-modal');
const modalTitle = document.querySelector('#portfolio-modal .modal-title') || document.createElement('div'); // Ajusta se necessário
const modalMedia = document.getElementById('portfolio-modal'); // Nota: Se o teu HTML for diferente, ajusta o ID aqui
const modalCaption = document.querySelector('.modal-caption'); 
const modalClose = document.querySelector('.modal-close-btn');

// Na tua função de clique, garante que limpas e injetas as imagens corretamente:
document.querySelectorAll('.open-modal').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Identifica o modal correto pelo ID do CSS
    const modal = document.getElementById('portfolio-modal');
    const modalMediaContainer = modal.querySelector('.modal-content'); // Onde as imagens vão entrar
    
    const type = el.dataset.type;
    const images = el.dataset.images ? el.dataset.images.split(',') : [el.dataset.src];

    // Limpa apenas a área das imagens (cria uma div dedicada se não tiveres)
    // Se não tiveres uma div específica, limpa o conteúdo que não seja o botão de fechar
    
    if (type === 'image') {
      images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc.trim();
        img.className = 'modal-stack-img'; // Classe para o CSS
        modalMediaContainer.appendChild(img);
      });
      modal.style.display = 'flex';
    }
  });
});
