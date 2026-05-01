/* ============================================
   MUSEO DIGITALE DELLE SABBIE DEL MONDO
   Detail Page Script
   ============================================ */

const SAND_COLOR_MAP_D = {
  cava: "#2E8B57",
  desertica: "#EDC9AF",
  eolicadesertica: "#F4A460",
  fluviale: "#708090",
  lacustre: "#ADD8E6",
  lagunare: "#20B2AA",
  marina: "#0077BE",
  marinafluviale: "#5F9EA0",
  marinavulcanica: "#483D8B",
  montagna: "#8B4513",
  nonspecificata: "#D3D3D3",
  torrentizia: "#4682B4",
  vulcanica: "#333333",
};

/* ============================================
   PALETTE EDITORIALE — BOX METADATA
   Ogni voce: { bg, border, text }
   ============================================ */

/* Tipologie — toni naturali, museali */
const TIPOLOGIA_PALETTE = {
  desertica:        { bg: "#E8D8BD", border: "#C79A62", text: "#4A331C", label: "#8B6136" },
  eolicadesertica:  { bg: "#E8D8BD", border: "#C79A62", text: "#4A331C", label: "#8B6136" },
  marina:           { bg: "#D9E6EA", border: "#7F9EAA", text: "#2A4450", label: "#64808B" },
  marinafluviale:   { bg: "#DCE5E2", border: "#849E94", text: "#2D4239", label: "#65806F" },
  marinavulcanica:  { bg: "#DAD4DC", border: "#8B8298", text: "#2F2840", label: "#6E6480" },
  fluviale:         { bg: "#DEE4D8", border: "#8E9E84", text: "#374134", label: "#66745F" },
  torrentizia:      { bg: "#DEE4D8", border: "#8E9E84", text: "#374134", label: "#66745F" },
  lacustre:         { bg: "#E1ECEA", border: "#86A5A0", text: "#314644", label: "#67837E" },
  lagunare:         { bg: "#E1ECEA", border: "#86A5A0", text: "#314644", label: "#67837E" },
  vulcanica:        { bg: "#E2D0C8", border: "#AF7D6E", text: "#492C25", label: "#80564B" },
  corallina:        { bg: "#EFDCD5", border: "#C79A90", text: "#55342F", label: "#936C64" },
  organogena:       { bg: "#EFDCD5", border: "#C79A90", text: "#55342F", label: "#936C64" },
  glaciale:         { bg: "#E4ECF2", border: "#97AEC0", text: "#334A5D", label: "#6F889B" },
  montagna:         { bg: "#E2D6C5", border: "#A0866A", text: "#46321F", label: "#7E6448" },
  cava:             { bg: "#E2E5D4", border: "#959E78", text: "#3C4329", label: "#6E7656" },
  nonspecificata:   { bg: "#EEE8DF", border: "#BCAF9F", text: "#4B4339", label: "#7E7469" },
};

/* Continenti — toni naturali, museali */
const CONTINENTE_PALETTE = {
  "nord america":     { bg: "#EAD7CE", border: "#C28D73", text: "#503127", label: "#8A5A46" },
  "centro america":   { bg: "#E5E3CF", border: "#A8A070", text: "#44412A", label: "#7B7552" },
  "sud america":      { bg: "#DDE4D7", border: "#8EA083", text: "#344032", label: "#66775E" },
  "europa":           { bg: "#E2E6EC", border: "#8F9AA8", text: "#3A4450", label: "#6D7886" },
  "africa":           { bg: "#EEE0BE", border: "#C6A15A", text: "#59451B", label: "#927339" },
  "asia":             { bg: "#E7D5D0", border: "#B98578", text: "#4E2F2A", label: "#876057" },
  "oceania":          { bg: "#DCE8E8", border: "#7FA1A0", text: "#2F4747", label: "#64807E" },
  "non specificato":  { bg: "#ECE8E1", border: "#B7ADA0", text: "#4E473F", label: "#81776B" },
};

/* Paesi — palette desaturata, ispirata alle bandiere ma resa raffinata */
const PAESE_PALETTE = {
  "italia":           { bg: "#DEE6D6", border: "#8DA382", text: "#354430", label: "#647A5A" },
  "italy":            { bg: "#DEE6D6", border: "#8DA382", text: "#354430", label: "#647A5A" },
  "francia":          { bg: "#DFE3EA", border: "#8C99AC", text: "#384250", label: "#6B7686" },
  "france":           { bg: "#DFE3EA", border: "#8C99AC", text: "#384250", label: "#6B7686" },
  "germania":         { bg: "#E5DCC6", border: "#B49A66", text: "#473820", label: "#7E6940" },
  "spagna":           { bg: "#EEDDC0", border: "#C29A60", text: "#54401E", label: "#8E6E3C" },
  "portogallo":       { bg: "#DEE4D2", border: "#8DA078", text: "#37412B", label: "#677555" },
  "regno unito":      { bg: "#DFE3EA", border: "#8E9AAE", text: "#374152", label: "#6C7787" },
  "uk":               { bg: "#DFE3EA", border: "#8E9AAE", text: "#374152", label: "#6C7787" },
  "stati uniti":      { bg: "#E5E4EA", border: "#8D93A8", text: "#343847", label: "#73788D" },
  "usa":              { bg: "#E5E4EA", border: "#8D93A8", text: "#343847", label: "#73788D" },
  "canada":           { bg: "#EBD6D2", border: "#B98279", text: "#4E2A26", label: "#83564F" },
  "messico":          { bg: "#DEE5D2", border: "#8DA176", text: "#36412A", label: "#677654" },
  "brasile":          { bg: "#DEE4CA", border: "#94A06C", text: "#3D4326", label: "#6E764B" },
  "argentina":        { bg: "#DEE5EE", border: "#8FA0B8", text: "#36404F", label: "#6C7788" },
  "cile":             { bg: "#E1E3EA", border: "#8D95A8", text: "#363B47", label: "#71788C" },
  "perù":             { bg: "#EBD5D1", border: "#B97E76", text: "#4E2925", label: "#83544E" },
  "peru":             { bg: "#EBD5D1", border: "#B97E76", text: "#4E2925", label: "#83544E" },
  "marocco":          { bg: "#E5D0C5", border: "#B07658", text: "#4A2A1C", label: "#7C5239" },
  "egitto":           { bg: "#EADFC0", border: "#BB9F58", text: "#54441F", label: "#8C6E37" },
  "sud africa":       { bg: "#DEE4D2", border: "#8DA078", text: "#37412B", label: "#677555" },
  "sudafrica":        { bg: "#DEE4D2", border: "#8DA078", text: "#37412B", label: "#677555" },
  "tunisia":          { bg: "#E8D1CC", border: "#B47B6F", text: "#4D2925", label: "#82554D" },
  "kenya":            { bg: "#DEE3D0", border: "#8E9F76", text: "#363F2A", label: "#677454" },
  "namibia":          { bg: "#E4D8C2", border: "#AE9560", text: "#473820", label: "#7B6840" },
  "giappone":         { bg: "#EDD8D6", border: "#BC827C", text: "#4F2A28", label: "#84564F" },
  "japan":            { bg: "#EDD8D6", border: "#BC827C", text: "#4F2A28", label: "#84564F" },
  "cina":             { bg: "#EBD3C8", border: "#BA8067", text: "#4F2C20", label: "#845841" },
  "india":            { bg: "#EADCC0", border: "#BC9C5C", text: "#52401F", label: "#8B6E3C" },
  "thailandia":       { bg: "#E2D7DC", border: "#9D85A0", text: "#3E2B40", label: "#6E5670" },
  "indonesia":        { bg: "#EBD5D1", border: "#B97E76", text: "#4E2925", label: "#83544E" },
  "australia":        { bg: "#DFE3EA", border: "#8C99AC", text: "#374152", label: "#6B7686" },
  "nuova zelanda":    { bg: "#DFE3EA", border: "#8C99AC", text: "#374152", label: "#6B7686" },
  "bahamas":          { bg: "#DCE6EC", border: "#80A0B0", text: "#2D4651", label: "#62808D" },
  "cuba":             { bg: "#DFE3EA", border: "#8C99AC", text: "#374152", label: "#6B7686" },
  "non specificato":  { bg: "#ECE4D8", border: "#B8A189", text: "#4A3A2B", label: "#806E5D" },
};

const PAESE_FALLBACK = { bg: "#ECE4D8", border: "#B8A189", text: "#4A3A2B", label: "#806E5D" };

/* Codici ISO 3166-1 alpha-2 per ottenere bandiere via flagcdn.com */
const PAESE_ISO = {
  "italia": "it", "italy": "it",
  "francia": "fr", "france": "fr",
  "germania": "de",
  "spagna": "es",
  "portogallo": "pt",
  "regno unito": "gb", "uk": "gb",
  "stati uniti": "us", "usa": "us",
  "canada": "ca",
  "messico": "mx",
  "brasile": "br",
  "argentina": "ar",
  "cile": "cl",
  "perù": "pe", "peru": "pe",
  "marocco": "ma",
  "egitto": "eg",
  "sud africa": "za", "sudafrica": "za",
  "tunisia": "tn",
  "kenya": "ke",
  "namibia": "na",
  "giappone": "jp", "japan": "jp",
  "cina": "cn",
  "india": "in",
  "thailandia": "th",
  "indonesia": "id",
  "australia": "au",
  "nuova zelanda": "nz",
  "bahamas": "bs",
  "cuba": "cu",
  "grecia": "gr",
  "turchia": "tr",
  "russia": "ru",
  "norvegia": "no",
  "svezia": "se",
  "danimarca": "dk",
  "finlandia": "fi",
  "islanda": "is",
  "irlanda": "ie",
  "olanda": "nl", "paesi bassi": "nl",
  "belgio": "be",
  "svizzera": "ch",
  "austria": "at",
  "polonia": "pl",
  "croazia": "hr",
  "albania": "al",
  "malta": "mt",
  "cipro": "cy",
  "israele": "il",
  "emirati arabi uniti": "ae",
  "arabia saudita": "sa",
  "vietnam": "vn",
  "filippine": "ph",
  "malesia": "my",
  "singapore": "sg",
  "corea del sud": "kr",
  "nuova caledonia": "nc",
  "polinesia francese": "pf",
  "fiji": "fj",
  "figi": "fj",
  "algeria": "dz",
  "belize": "bz",
  "benin": "bj",
  "bulgaria": "bg",
  "costa rica": "cr",
  "ecuador": "ec",
  "estonia": "ee",
  "giordania": "jo",
  "kenia": "ke",
  "libano": "lb",
  "libia": "ly",
  "lituania": "lt",
  "madagascar": "mg",
  "myanmar": "mm",
  "nigeria": "ng",
  "pakistan": "pk",
  "rep. delle maldive": "mv",
  "maldive": "mv",
  "rep. di capo verde": "cv",
  "capo verde": "cv",
  "rep. di mauritius": "mu",
  "mauritius": "mu",
  "repubblica dominicana": "do",
  "romania": "ro",
  "saint lucia": "lc",
  "senegal": "sn",
  "siria": "sy",
  "slovenia": "si",
  "sri lanka": "lk",
  "tanzania": "tz",
  "ungheria": "hu",
  "uzbekistan": "uz",
  "venezuela": "ve",
  "yemen": "ye",
  "emirati arabi": "ae",
};

function getPaeseFlagUrl(name) {
  var k = normalizeKey(name);
  var iso = PAESE_ISO[k];
  if (!iso) return null;
  return "https://flagcdn.com/w1280/" + iso + ".jpg";
}

/* Palette fisse per campi non categorici — toni archivistici raffinati */
const FIELD_PALETTE = {
  campione:    { bg: "#EEE2C8", border: "#C8A870", text: "#4F3A1F", label: "#8C7350" },
  nome:        { bg: "#EDE3D8", border: "#B9987A", text: "#3E2D21", label: "#8A6C57" },
  provenienza: { bg: "#EFE6DA", border: "#C8AA86", text: "#4E3B2E", label: "#8A7058" },
  provincia:   { bg: "#EFE6DA", border: "#C8AA86", text: "#4E3B2E", label: "#8A7058" },
  isola:       { bg: "#E5ECDF", border: "#9DB28A", text: "#384730", label: "#6C8060" },
  regione:     { bg: "#EFE6DA", border: "#C8AA86", text: "#4E3B2E", label: "#8A7058" },
  bacino:      { bg: "#DCE6EE", border: "#7E9BB2", text: "#2E4657", label: "#66839A" },
  anno:        { bg: "#E6E0D7", border: "#A89A89", text: "#473F37", label: "#796E64" },
  fallback:    { bg: "#ECE8E1", border: "#B7ADA0", text: "#4E473F", label: "#81776B" },
};

function normalizeKey(s) {
  return (s || "").toString().toLowerCase().trim()
    .replace(/\s*[-\/]\s*/g, " ")
    .replace(/\s+/g, " ");
}

function getTipologiaPalette(name) {
  var k = normalizeSandTypeD(name);
  return TIPOLOGIA_PALETTE[k] || FIELD_PALETTE.fallback;
}

function getContinentePalette(name) {
  var k = normalizeKey(name);
  return CONTINENTE_PALETTE[k] || CONTINENTE_PALETTE["non specificato"];
}

function getPaesePalette(name) {
  var k = normalizeKey(name);
  return PAESE_PALETTE[k] || PAESE_FALLBACK;
}

function normalizeSandTypeD(name) {
  if (!name) return "";
  var cleaned = name.toLowerCase().trim()
    .replace(/\s*[-\/]\s*/g, "-")
    .replace(/\s+/g, " ");
  var aliases = {
    "montana": "montagna",
    "eolica-desertica": "eolicadesertica",
    "eolica desertica": "eolicadesertica",
    "marina-fluviale": "marinafluviale",
    "marina-vulcanica": "marinavulcanica",
    "non specificata": "nonspecificata",
  };
  if (aliases[cleaned]) return aliases[cleaned];
  return cleaned.replace(/[-\/ ]/g, "");
}

function getSandColorD(name) {
  return SAND_COLOR_MAP_D[normalizeSandTypeD(name)] || "#D3D3D3";
}

function getContrastTextColorD(hex) {
  var c = hex.replace("#", "");
  var r = parseInt(c.substring(0, 2), 16);
  var g = parseInt(c.substring(2, 4), 16);
  var b = parseInt(c.substring(4, 6), 16);
  var toLinear = function(v) {
    var s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  var L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? "#FFFFFF" : "#111111";
}

/* --- Mobile Menu --- */
function initMobileMenuDetail() {
  var toggle = document.getElementById('menu-toggle');
  var overlay = document.getElementById('mobile-nav-overlay');
  var nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  function openMenu() {
    nav.classList.add('active');
    if (overlay) overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  if (overlay) overlay.addEventListener('click', closeMenu);

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* --- Header glass effect on scroll --- */
(function() {
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
})();

(function () {
  'use strict';

  var detailPage = document.getElementById('detail-page');
  var basePath = (function() {
    var path = window.location.pathname;
    if (path.includes('/museo/')) return '../';
    return '';
  })();

  function getSampleId() {
    var params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id'), 10);
  }

  async function loadDetail() {
    var id = getSampleId();
    if (!id) { showError('ID campione non specificato.'); return; }

    try {
      var response = await fetch(basePath + 'dati.json');
      if (!response.ok) throw new Error('Errore nel caricamento dei dati');
      var campioni = await response.json();
      var campione = campioni.find(function(c){return c.id === id});

      if (!campione) { showError('Campione #' + id + ' non trovato.'); return; }

      document.title = campione.nome + ' — Museo delle Sabbie';
      renderDetail(campione, campioni);
    } catch (error) {
      showError(error.message);
    }
  }

  function showError(message) {
    detailPage.innerHTML =
      '<div class="detail-back"><a href="index.html" class="btn btn-back">← Torna alla collezione</a></div>' +
      '<div class="empty-state"><div class="empty-state-icon">⚠️</div><h3>Errore</h3><p>' + message + '</p></div>';
  }

  function metaItem(label, value, palette, modifier, bgImage) {
    if (value === undefined || value === null || value === '') return '';
    var p = palette || FIELD_PALETTE.fallback;
    var labelColor = p.label || p.text;
    var style = 'background-color:' + p.bg + ';border-color:' + p.border + ';color:' + p.text + ';';
    var mod = modifier ? ' metadata-item--' + modifier : '';
    var hasBg = !!bgImage;
    var bgLayer = hasBg
      ? '<div class="metadata-item__bg" style="background-image:url(\'' + bgImage + '\');"></div>' +
        '<div class="metadata-item__overlay"></div>'
      : '';
    var withBg = hasBg ? ' metadata-item--has-bg' : '';
    return '<div class="metadata-item metadata-item--colored' + mod + withBg + '" style="' + style + '">' +
      bgLayer +
      '<div class="metadata-item__content">' +
        '<div class="metadata-label" style="color:' + labelColor + ';">' + label + '</div>' +
        '<div class="metadata-value">' + value + '</div>' +
      '</div>' +
    '</div>';
  }

  function imageBlock(src, alt, label) {
    return '<div class="detail-image-block">' +
      '<img src="' + basePath + src + '" alt="' + alt + '" onerror="this.src=\'' + basePath + 'images/coming-soon.jpg\';">' +
      '<div class="detail-image-label">' + label + '</div>' +
    '</div>';
  }

  function renderDetail(c, allCampioni) {
    var related = allCampioni
      .filter(function(s){return s.continente === c.continente && s.id !== c.id})
      .slice(0, 4);

    var sc = getSandColorD(c.tipologia);
    var tc = getContrastTextColorD(sc);
    var tipoPal = getTipologiaPalette(c.tipologia);
    var contPal = getContinentePalette(c.continente);
    var paesePal = getPaesePalette(c.paese);

    var imagesHtml = imageBlock(c.immagine, 'Campione di sabbia: ' + c.nome, '📷 Immagine del campione');
    var microscopeImages = [];
    if (c.microscopio && c.microscopio !== 'images/coming-soon.jpg' && c.microscopio !== c.immagine) {
      microscopeImages.push({ src: c.microscopio, label: '🔬 Immagine al microscopio' });
    }
    if (Array.isArray(c.immagini_extra)) {
      c.immagini_extra.forEach(function(img) {
        if (img && img.src && !microscopeImages.some(function(existing) { return existing.src === img.src; })) {
          microscopeImages.push({ src: img.src, label: img.label || '🔬 Immagine al microscopio' });
        }
      });
    }
    imagesHtml += microscopeImages.map(function(img) {
      return imageBlock(img.src, img.label + ': ' + c.nome, img.label);
    }).join('');

    var tipologiaHtml = metaItem('Tipologia', c.tipologia, tipoPal, 'tipologia');

    detailPage.innerHTML =
      '<div class="detail-back"><a href="index.html" class="btn btn-back">← Torna alla collezione</a></div>' +
      '<div class="detail-header"><h1>' + c.nome + '</h1><p class="detail-header-location">📍 ' + c.provenienza + ' — ' + c.paese + ', ' + c.continente + '</p></div>' +
      '<div class="detail-content">' +
        '<div class="detail-images">' +
          imagesHtml +
        '</div>' +
        '<div class="detail-info">' +
          '<div class="detail-description"><h2>Descrizione</h2><p>' + c.descrizione + '</p></div>' +
          '<div class="detail-metadata"><h2>Scheda tecnica</h2><div class="metadata-grid">' +
            metaItem('Campione N°', c.id, FIELD_PALETTE.campione, 'campione') +
            metaItem('Nome', c.nome, FIELD_PALETTE.nome, 'nome') +
            metaItem('Provenienza', c.provenienza, FIELD_PALETTE.provenienza, 'provenienza') +
            metaItem('Provincia', c.provincia, FIELD_PALETTE.provincia) +
            metaItem('Isola', c.isola, FIELD_PALETTE.isola) +
            metaItem('Regione', c.regione, FIELD_PALETTE.regione) +
            metaItem('Bacino / Mare', c.bacino, FIELD_PALETTE.bacino, 'bacino', basePath + 'images/bg-sea.jpg') +
            metaItem('Paese', c.paese, paesePal, 'paese', getPaeseFlagUrl(c.paese)) +
            metaItem('Continente', c.continente, contPal, 'continente') +
            tipologiaHtml +
            metaItem('Anno di raccolta', c.anno, FIELD_PALETTE.anno, 'anno') +
          '</div></div>' +
          '<div class="detail-qr"><h2>QR Code</h2><div class="qr-container" id="qr-code"></div><p class="qr-note">Scansiona per accedere a questa scheda dal tuo dispositivo</p></div>' +
        '</div>' +
      '</div>' +
      (related.length > 0 ? '<section class="related-section"><h2>Campioni correlati</h2><div class="related-grid">' +
        related.map(function(r) {
          var rsc = getSandColorD(r.tipologia);
          var rtc = getContrastTextColorD(rsc);
          return '<a href="dettaglio.html?id=' + r.id + '" class="card" aria-label="Vai al campione: ' + r.nome + '">' +
            '<div class="card-image-wrapper"><img class="card-image" src="' + basePath + r.immagine + '" alt="Campione: ' + r.nome + '" loading="lazy" onerror="this.src=\'' + basePath + 'images/coming-soon.jpg\';"><span class="card-badge">#' + r.id + '</span></div>' +
            '<div class="card-body"><h3 class="card-title">' + r.nome + '</h3><p class="card-location">📍 ' + r.provenienza + '</p>' +
            '<div class="card-meta"><span class="card-tag continent">' + r.continente + '</span><span class="card-tag">' + r.paese + '</span>' +
            '<li class="card-tag type sand-type-item" tabindex="0" role="listitem" data-sand-color="' + rsc + '" data-sand-text="' + rtc + '" style="background-color:' + rsc + ';color:' + rtc + ';transition:all 0.3s ease;"><span class="sand-swatch" style="background-color:' + rsc + ';transition:background-color 0.3s ease;"></span>' + r.tipologia + '</li>' +
            '</div></div></a>';
        }).join('') +
      '</div></section>' : '');

    generateQR(c.id);

    // Attach hover/focus listeners
    document.querySelectorAll('.sand-type-item').forEach(function(el) {
      var color = el.dataset.sandColor;
      var swatch = el.querySelector('.sand-swatch');

      var activate = function() {
        el.style.boxShadow = '0 2px 8px ' + color + '66';
        if (swatch) swatch.style.transform = 'scale(1.3)';
      };
      var deactivate = function() {
        el.style.boxShadow = 'none';
        if (swatch) swatch.style.transform = 'scale(1)';
      };

      el.addEventListener('mouseenter', activate);
      el.addEventListener('mouseleave', deactivate);
      el.addEventListener('focus', activate);
      el.addEventListener('blur', deactivate);
    });
  }

  function generateQR(id) {
    var qrContainer = document.getElementById('qr-code');
    if (!qrContainer) return;
    var pageUrl = window.location.href;

    if (typeof QRCode !== 'undefined') {
      new QRCode(qrContainer, {
        text: pageUrl, width: 180, height: 180,
        colorDark: '#2A2520', colorLight: '#FFFFFF',
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      var img = document.createElement('img');
      img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(pageUrl);
      img.alt = 'QR Code per questo campione';
      img.width = 180;
      img.height = 180;
      qrContainer.appendChild(img);
    }
  }

  initMobileMenuDetail();
  loadDetail();
})();

/* --- Theme Toggle (auto / light / dark) --- */
(function() {
  var STORAGE_KEY = 'museo-theme-mode';
  var ORDER = ['auto', 'light', 'dark'];
  var LABELS = { auto: 'Tema: predefinito', light: 'Tema: chiaro', dark: 'Tema: scuro' };
  var html = document.documentElement;
  var mql = window.matchMedia('(prefers-color-scheme: dark)');

  function getMode() {
    var m = localStorage.getItem(STORAGE_KEY) || 'auto';
    return ORDER.indexOf(m) >= 0 ? m : 'auto';
  }
  function applyMode(mode, animate) {
    if (animate) {
      html.classList.add('theme-anim');
      setTimeout(function(){ html.classList.remove('theme-anim'); }, 600);
    }
    html.setAttribute('data-theme-mode', mode);
    var resolved = mode === 'auto' ? (mql.matches ? 'dark' : 'light') : mode;
    html.setAttribute('data-theme', resolved);
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      btn.setAttribute('aria-label', LABELS[mode]);
      btn.title = LABELS[mode];
    });
  }
  function cycle() {
    var current = getMode();
    var next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    localStorage.setItem(STORAGE_KEY, next);
    applyMode(next, true);
  }

  applyMode(getMode(), false);
  mql.addEventListener('change', function(){
    if (getMode() === 'auto') applyMode('auto', true);
  });

  function bind() {
    document.querySelectorAll('.theme-toggle').forEach(function(btn){
      if (btn.dataset.themeBound === '1') return;
      btn.dataset.themeBound = '1';
      btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        cycle();
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else { bind(); }
})();
