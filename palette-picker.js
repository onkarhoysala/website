// TEMPORARY — for review only. Remove before going live.
(function () {
  const PALETTES = {
    current: { label: 'Red (old)', bg: '#F4F3EE', text: '#17140F', textSecondary: '#46402F', accent: '#B23A2E', accentLight: '#F7E3DF', border: '#DEDCD2', cardBg: '#FFFFFF' },
    coral: { label: 'Warm Coral', bg: '#FAF3E9', text: '#2B2420', textSecondary: '#7A6F62', accent: '#D9704F', accentLight: '#FBE2D8', border: '#EDE1D2', cardBg: '#FFFFFF' },
    sage: { label: 'Sage Green (current)', bg: '#F1F4EC', text: '#141A12', textSecondary: '#202821', accent: '#4C7A52', accentLight: '#E1EBD9', border: '#DEE6D6', cardBg: '#FFFFFF' },
    teal: { label: 'Dusty Teal', bg: '#EEF4F6', text: '#1C2A2E', textSecondary: '#5A6C70', accent: '#2E7D8C', accentLight: '#DCEEF1', border: '#D9E6E9', cardBg: '#FFFFFF' },
    marigold: { label: 'Marigold', bg: '#FFF6E9', text: '#2A2118', textSecondary: '#8A7A63', accent: '#E8873A', accentLight: '#FBE9D3', border: '#F0E3C8', cardBg: '#FFFFFF' }
  };

  const TEXTURES = {
    dots: { label: 'Dots (current)', image: 'radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1.3px)', size: '4px 4px' },
    ruled: { label: 'Ruled notebook', image: 'repeating-linear-gradient(to bottom, transparent 0, transparent 27px, rgba(0,0,0,0.08) 27px, rgba(0,0,0,0.08) 28px)', size: 'auto' },
    graph: { label: 'Graph paper', image: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', size: '28px 28px, 28px 28px' },
    plain: { label: 'Plain (no texture)', image: 'none', size: 'auto' }
  };

  function applyPalette(key) {
    const p = PALETTES[key];
    if (!p) return;
    const r = document.documentElement.style;
    r.setProperty('--bg', p.bg);
    r.setProperty('--text', p.text);
    r.setProperty('--text-secondary', p.textSecondary);
    r.setProperty('--accent', p.accent);
    r.setProperty('--accent-light', p.accentLight);
    r.setProperty('--border', p.border);
    r.setProperty('--card-bg', p.cardBg);
    localStorage.setItem('palette-preview', key);
  }

  function applyTexture(key) {
    const t = TEXTURES[key];
    if (!t) return;
    const r = document.documentElement.style;
    r.setProperty('--texture-image', t.image);
    r.setProperty('--texture-size', t.size);
    localStorage.setItem('texture-preview', key);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const savedPalette = localStorage.getItem('palette-preview') || 'sage';
    const savedTexture = localStorage.getItem('texture-preview') || 'dots';
    applyPalette(savedPalette);
    applyTexture(savedTexture);

    const panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:9999;background:#fff;border:2px solid #000;border-radius:6px;padding:10px;display:flex;flex-direction:column;gap:8px;box-shadow:0 4px 16px rgba(0,0,0,.2);font-family:sans-serif;';

    const colorRow = document.createElement('div');
    colorRow.style.cssText = 'display:flex;gap:6px;';
    Object.keys(PALETTES).forEach(function (key) {
      const p = PALETTES[key];
      const btn = document.createElement('button');
      btn.title = p.label;
      btn.style.cssText = 'width:28px;height:28px;border-radius:50%;cursor:pointer;background:' + p.accent + ';border:2px solid ' + (savedPalette === key ? '#000' : '#ccc') + ';';
      btn.addEventListener('click', function () {
        applyPalette(key);
        Array.from(colorRow.children).forEach(function (c) { c.style.borderColor = '#ccc'; });
        btn.style.borderColor = '#000';
      });
      colorRow.appendChild(btn);
    });

    const textureRow = document.createElement('div');
    textureRow.style.cssText = 'display:flex;gap:6px;';
    Object.keys(TEXTURES).forEach(function (key) {
      const t = TEXTURES[key];
      const btn = document.createElement('button');
      btn.textContent = t.label;
      btn.title = t.label;
      btn.style.cssText = 'font-size:10px;padding:4px 6px;border-radius:4px;cursor:pointer;background:#f3f3f3;border:2px solid ' + (savedTexture === key ? '#000' : '#ccc') + ';';
      btn.addEventListener('click', function () {
        applyTexture(key);
        Array.from(textureRow.children).forEach(function (c) { c.style.borderColor = '#ccc'; });
        btn.style.borderColor = '#000';
      });
      textureRow.appendChild(btn);
    });

    panel.appendChild(colorRow);
    panel.appendChild(textureRow);
    document.body.appendChild(panel);
  });
})();
