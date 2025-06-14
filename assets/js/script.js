document.querySelectorAll('.lightbox-trigger').forEach(btn => {
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const type = this.dataset.type;
    const src = this.dataset.src;
    const wrapper = document.querySelector('.lightbox-content');
    wrapper.innerHTML = '';

    if (type === 'youtube') {
      const iframe = document.createElement('iframe');
      iframe.src = src + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      wrapper.appendChild(iframe);
    } else if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.style.width = '100%';
      wrapper.appendChild(video);
    } else if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      wrapper.appendChild(img);
    }

    document.querySelector('.lightbox').style.display = 'flex';
  });
});

// Fecha o modal
document.querySelector('.lightbox .close').addEventListener('click', () => {
  const lightbox = document.querySelector('.lightbox');
  lightbox.style.display = 'none';
  document.querySelector('.lightbox-content').innerHTML = '';
});
