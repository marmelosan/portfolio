'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

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

// custom select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
select.addEventListener("click", function () { elementToggleFunc(this); });

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    const match = selectedValue === "all" || item.dataset.category.toLowerCase() === selectedValue;
    item.classList.toggle("active", match);
  });
}

let lastClickedBtn = filterBtn[0];
filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

// form validation
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    formBtn.disabled = !form.checkValidity();
  });
});

// page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
navigationLinks.forEach((link, i) => {
  link.addEventListener("click", function () {
    pages.forEach(page => page.classList.remove("active"));
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    pages[i].classList.add("active");
    navigationLinks[i].classList.add("active");
    window.scrollTo(0, 0);
  });
});

// MEDIA MODAL (YouTube / Vídeo / Imagem)
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
    }
    else if (type === 'youtube') {
      el = document.createElement('iframe');
      el.src = src + '?autoplay=1';
      el.setAttribute('allow', 'autoplay; encrypted-media');
      el.allowFullscreen = true;
      el.style.width = '90vw';
      el.style.height = '50vh';
    }
    else if (type === 'image') {
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


