'use strict';

// Toggle
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// Sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Testimonials Modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = () => {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

testimonialsItem.forEach(item => {
  item.addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
});

modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom Select + Filtering
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
  const category = item.dataset.category.toLowerCase();
  if (selectedValue === "all" || category === selectedValue) {
  item.classList.remove("hide");
} else {
  item.classList.add("hide");
}
  });
document.querySelector('.project-list').setAttribute('data-active', selectedValue);
};

select.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selected = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterBtns.forEach(btn => btn.classList.remove("active"));
    filterFunc(selected);
  });
});

let lastActiveBtn = filterBtns[0];
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

// Form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navigationLinks.forEach((link, i) => {
  link.addEventListener("click", () => {
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    pages[i].classList.add("active");
    navigationLinks[i].classList.add("active");
    window.scrollTo(0, 0);
  });
});

// Media Modal
const mediaModal = document.getElementById('mediaModal');
const modalContainerMedia = document.getElementById('modal-media-container');
const modalCloseMedia = mediaModal.querySelector('.close');

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const type = btn.dataset.type;
    const src = btn.dataset.src;
    modalContainerMedia.innerHTML = '';

    let el;
    if (type === 'video') {
      el = document.createElement('video');
      el.src = src;
      el.controls = true;
      el.autoplay = true;
      el.style.maxWidth = '90vw';
      el.style.maxHeight = '80vh';
    } else if (type === 'youtube') {
      el = document.createElement('iframe');
      el.src = src + '?autoplay=1';
      el.setAttribute('allow', 'autoplay; encrypted-media');
      el.allowFullscreen = true;
      el.style.width = '90vw';
      el.style.height = '50vh';
    } else if (type === 'image') {
      el = document.createElement('img');
      el.src = src;
      el.style.maxWidth = '90vw';
      el.style.maxHeight = '80vh';
    }

    if (el) {
      modalContainerMedia.appendChild(el);
      mediaModal.style.display = 'flex';
    }
  });
});

modalCloseMedia.addEventListener('click', () => closeMediaModal());
mediaModal.addEventListener('click', e => {
  if (e.target === mediaModal) closeMediaModal();
});

function closeMediaModal() {
  mediaModal.style.display = 'none';
  modalContainerMedia.innerHTML = '';
}

// Generate video thumbnails
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
