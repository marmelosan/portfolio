'use strict';

// === Element Toggle ===
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// === Sidebar Toggle ===
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// === Testimonials Modal ===
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
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

if (modalCloseBtn && overlay) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// === Custom Select & Filtering ===
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// === Filter Buttons (grande ecrã) ===
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// === Contact Form ===
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// === Navegação entre páginas ===
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// === Filtro por colunas (extra) ===
function filterSelection(c) {
  const cols = document.getElementsByClassName("column");
  if (c === "all") c = "";
  for (let i = 0; i < cols.length; i++) {
    const el = cols[i];
    el.style.display = el.className.indexOf(c) > -1 ? "block" : "none";
  }
}
filterSelection("all");

// === Botões ativos para colunas ===
const btnContainer = document.getElementById("myBtnContainer");
if (btnContainer) {
  const btns = btnContainer.getElementsByClassName("btn");
  for (let btn of btns) {
    btn.addEventListener("click", function () {
      btnContainer.querySelector(".active").classList.remove("active");
      this.classList.add("active");
    });
  }
}

// === MODAL UNIVERSAL (YouTube, MP4, Imagem) ===
document.querySelectorAll('.open-modal').forEach(el => {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const type = this.dataset.type;
    const src = this.dataset.src;
    const modal = document.getElementById("mediaModal");
    const container = document.getElementById("modal-media-container");

    container.innerHTML = '';

    let media;
    if (type === 'youtube') {
      media = document.createElement('iframe');
      media.src = src + '?autoplay=1';
      media.allow = "autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      media.allowFullscreen = true;
    } else if (type === 'video') {
      media = document.createElement('video');
      media.src = src;
      media.controls = true;
      media.autoplay = true;
    } else if (type === 'image') {
      media = document.createElement('img');
      media.src = src;
    }

    container.appendChild(media);
    modal.style.display = "flex";
  });
});

// === Fechar modal ===
document.querySelector('.close').addEventListener('click', () => {
  const modal = document.getElementById("mediaModal");
  modal.style.display = "none";
  document.getElementById("modal-media-container").innerHTML = '';
});

window.addEventListener('click', function (event) {
  const modal = document.getElementById("mediaModal");
  if (event.target === modal) {
    modal.style.display = "none";
    document.getElementById("modal-media-container").innerHTML = '';
  }
});
