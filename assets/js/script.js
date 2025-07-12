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
      mediaEl = document.createElement('img');
      mediaEl.src = src;
      mediaEl.style.maxWidth = '100%';
      mediaEl.style.maxHeight = '70vh';
      mediaEl.style.borderRadius = '6px';
      mediaEl.alt = title;
    } else if (type === 'video') {
      mediaEl = document.createElement('video');
      mediaEl.src = src;
      mediaEl.controls = true;
      mediaEl.autoplay = true;
      mediaEl.style.maxWidth = '100%';
      mediaEl.style.maxHeight = '70vh';
      mediaEl.style.borderRadius = '6px';
    } else if (type === 'youtube') {
      mediaEl = document.createElement('iframe');
      mediaEl.src = src.includes('autoplay') ? src : `${src}?autoplay=1`;
      mediaEl.width = "100%";
      mediaEl.height = "400";
      mediaEl.frameBorder = "0";
      mediaEl.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      mediaEl.allowFullscreen = true;
      mediaEl.style.maxWidth = '100%';
    }

    if (mediaEl) {
      modalMedia.appendChild(mediaEl);
      modal.style.display = 'flex';
    }
  });
});

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
