// === Portfolio filter ===
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const cat = item.dataset.category;
      item.classList.toggle('active', filter === 'all' || filter === cat);
    });
  });
});

// === Lightbox ===
const lightbox = document.querySelector('.lightbox');
const content = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.lightbox-trigger').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const type = el.dataset.type;
    const src = el.dataset.src;

    content.innerHTML = '';
    if (type === 'youtube') {
      const iframe = document.createElement('iframe');
      iframe.src = `${src}?autoplay=1&rel=0`;
      iframe.allow = 'autoplay; encrypted-media';
      iframe.allowFullscreen = true;
      iframe.style.width = '100%';
      iframe.style.height = '500px';
      content.appendChild(iframe);
    } else {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      content.appendChild(video);
    }

    lightbox.style.display = 'flex';
  });
});

// Fechar lightbox
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  content.innerHTML = '';
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    content.innerHTML = '';
  }
});
