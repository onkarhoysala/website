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

// Travel carousel dots
const travelCarousel = document.getElementById('travel-carousel');
const dots = document.querySelectorAll('.travel-dot');
if (travelCarousel) {
  travelCarousel.addEventListener('scroll', () => {
    const index = Math.round(travelCarousel.scrollLeft / travelCarousel.offsetWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }, { passive: true });
}

// World map (only init if element exists)
if (document.getElementById('world-map')) {
  const map = L.map('world-map', {
    center: [20, 15],
    zoom: 1,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: true,
    dragging: true,
    doubleClickZoom: true,
    touchZoom: true
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 20,
  }).addTo(map);

  const ACCENT = '#4A9B8E';

  const places = [
    { name: 'Bangalore',       ll: [12.9716,  77.5946] },
    { name: 'Stockholm',       ll: [59.3293,  18.0686] },
    { name: 'San Francisco',   ll: [37.7749, -122.4194] },
    { name: 'Las Vegas',       ll: [36.1699, -115.1398] },
    { name: 'Los Angeles',     ll: [34.0522, -118.2437] },
    { name: 'Grand Canyon',    ll: [36.0544, -112.1401] },
    { name: 'Antelope Canyon', ll: [36.8619, -111.3743] },
    { name: 'Siem Reap',       ll: [13.3671,  103.8448] },
    { name: 'Sri Lanka',       ll: [ 7.8731,   80.7718] },
    { name: 'Singapore',       ll: [ 1.3521,  103.8198] },
    { name: 'Mumbai',          ll: [19.0760,   72.8777] },
    { name: 'Pune',            ll: [18.5204,   73.8567] },
    { name: 'Chennai',         ll: [13.0827,   80.2707] },
    { name: 'Delhi',           ll: [28.6139,   77.2090] },
    { name: 'Kolkata',         ll: [22.5726,   88.3639] },
    { name: 'Jaipur',          ll: [26.9124,   75.7873] },
    { name: 'Lucknow',         ll: [26.8467,   80.9462] },
  ];

  const byName = Object.fromEntries(places.map(p => [p.name, p.ll]));
  const home = byName['Bangalore'];
  const sf   = byName['San Francisco'];
  const usStops = ['Las Vegas', 'Los Angeles', 'Grand Canyon', 'Antelope Canyon'];

  const routes = [
    ...places.filter(p => p.name !== 'Bangalore' && !usStops.includes(p.name)).map(p => [home, p.ll]),
    ...usStops.map(name => [sf, byName[name]]),
  ];

  routes.forEach(([a, b]) => {
    new L.Geodesic([[a, b]], { weight: 1.2, opacity: 0.4, color: ACCENT, steps: 8 }).addTo(map);
  });

  places.forEach(p => {
    const isHome = p.name === 'Bangalore';
    L.circleMarker(p.ll, {
      radius: isHome ? 6 : 4, fillColor: ACCENT, color: '#ffffff',
      weight: isHome ? 2 : 1.5, fillOpacity: 1,
    }).addTo(map).bindTooltip(p.name, { permanent: false, direction: 'top' });
  });
}

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
