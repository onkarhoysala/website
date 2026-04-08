// Photo grid — random 6 from pool
(function() {
  const all = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,23,24,25,26,27,28,29,30,31,33,34];
  const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 6);
  const grid = document.getElementById('photo-grid');
  shuffled.forEach(n => {
    const div = document.createElement('div');
    div.className = 'photo-slot';
    const img = document.createElement('img');
    img.src = `../photos/photo_${n}.jpg`;
    img.alt = '';
    div.appendChild(img);
    grid.appendChild(div);
  });
})();

// World map — Alidade Smooth
const map = L.map('world-map', {
  center: [20, 10],
  zoom: 1,
  zoomControl: false,
  attributionControl: false,
  scrollWheelZoom: false,
  dragging: false,
  doubleClickZoom: false,
  touchZoom: false
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  subdomains: 'abcd',
  maxZoom: 20,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
}).addTo(map);

// Shelf scroll — show/hide edge gradients
document.querySelectorAll('.shelf-scroll').forEach(scroll => {
  const wrapper = scroll.closest('.shelf-wrapper');
  const update = () => {
    wrapper.classList.toggle('can-scroll-left', scroll.scrollLeft > 1);
    wrapper.classList.toggle('at-end', scroll.scrollLeft + scroll.clientWidth >= scroll.scrollWidth - 1);
  };
  scroll.addEventListener('scroll', update, { passive: true });
  update();
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, section, footer').forEach(el => observer.observe(el));
