'use strict';

// Helper para alternar classe
const elementToggleFunc = (elem) => elem.classList.toggle('active');

// SIDEBAR
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));

// TESTIMONIALS MODAL
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const toggleTestimonialsModal = () => {
  modalContainer.classList.toggle('active');
  overlay.classList.toggle('active');
};

testimonialsItems.forEach(item => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    const title = item.querySelector('[data-testimonials-title]');
    const text = item.querySelector('[data-testimonials-text]');

    modalImg.src = avatar.src;
    modalImg.alt = avatar.alt;
    modalTitle.textContent = title.textContent;
    modalText.textContent = text.textContent;

    toggleTestimonialsModal();
  });
});

modalCloseBtn.addEventListener('click', toggleTestimonialsModal);
overlay.addEventListener('click', toggleTestimonialsModal);

// FILTROS (Portfolio)
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase();
    if (selectedValue === 'all' || category === selectedValue) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  });
};

select.addEventListener('click', () => elementToggleFunc(select));

selectItems.forEach(item => {
  item.addEventListener('click', () => {
    const selected = item.textContent.toLowerCase();
    selectValue.textContent = item.textContent;
    elementToggleFunc(select);
    filterBtns.forEach(btn => btn.classList.remove('active'));
    filterFunc(selected);
  });
});

let lastActiveBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.textContent.toLowerCase();
    selectValue.textContent = btn.textContent;
    filterFunc(selected);
    lastActiveBtn.classList.remove('active');
    btn.classList.add('active');
    lastActiveBtn = btn;
  });
});

// PAGE NAVIGATION (Abas)
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach((link, i) => {
  link.addEventListener('click', () => {
    pages.forEach(page => page.classList.remove('active'));
    navLinks.forEach(nav => nav.classList.remove('active'));
    pages[i].classList.add('active');
    navLinks[i].classList.add('active');
    window.scrollTo(0, 0);
  });
});

// MEDIA MODAL (imagens, vídeos, YouTube)
const mediaModal = document.getElementById('mediaModal');
const modalMediaContainer = document.getElementById('modal-media-container');
const modalCloseMedia = mediaModal.querySelector('.close');

const closeMediaModal = () => {
  mediaModal.style.display = 'none';
  modalMediaContainer.innerHTML = '';
};

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const { type, src } = btn.dataset;
    modalMediaContainer.innerHTML = '';

    let el;
    if (type === 'video') {
      el = document.createElement('video');
      el.src = src;
      el.controls = true;
      el.autoplay = true;
    } else if (type === 'youtube') {
      el = document.createElement('iframe');
      el.src = `${src}?autoplay=1`;
      el.setAttribute('allow', 'autoplay; encrypted-media');
      el.allowFullscreen = true;
    } else if (type === 'image') {
      el = document.createElement('img');
      el.src = src;
    }

    if (el) {
      el.style.maxWidth = '90vw';
      el.style.maxHeight = '80vh';
      modalMediaContainer.appendChild(el);
      mediaModal.style.display = 'flex';
    }
  });
});

modalCloseMedia.addEventListener('click', closeMediaModal);
mediaModal.addEventListener('click', e => {
  if (e.target === mediaModal) closeMediaModal();
});

// THUMBNAIL PARA VÍDEOS MP4
document.querySelectorAll('.open-modal').forEach(link => {
  if (link.dataset.type === 'video') {
    const videoSrc = link.dataset.src;
    const img = link.querySelector('.video-thumb');

    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'auto';

    video.addEventListener('loadeddata', () => {
      video.currentTime = 0.1;
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      img.src = canvas.toDataURL('image/jpeg');
    });
  }
});
