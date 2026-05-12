/* ============================================
   MUSEO DIGITALE DELLE SABBIE DEL MONDO
   Main Script — Home Page
   ============================================ */

/* --- Country Flag Emoji Lookup --- */
var COUNTRY_FLAGS = {
  'Algeria':'🇩🇿','Bahamas':'🇧🇸','Belgio':'🇧🇪','Belize':'🇧🇿','Benin':'🇧🇯',
  'Brasile':'🇧🇷','Bulgaria':'🇧🇬','Cipro':'🇨🇾','Costa Rica':'🇨🇷','Croazia':'🇭🇷',
  'Cuba':'🇨🇺','Danimarca':'🇩🇰','Ecuador':'🇪🇨','Egitto':'🇪🇬','Emirati Arabi':'🇦🇪',
  'Estonia':'🇪🇪','Filippine':'🇵🇭','Francia':'🇫🇷','Giordania':'🇯🇴','Grecia':'🇬🇷',
  'India':'🇮🇳','Indonesia':'🇮🇩','Irlanda':'🇮🇪','Islanda':'🇮🇸','Israele':'🇮🇱',
  'Italia':'🇮🇹','Kenia':'🇰🇪','Libano':'🇱🇧','Libia':'🇱🇾','Lituania':'🇱🇹',
  'Madagascar':'🇲🇬','Malesia':'🇲🇾','Malta':'🇲🇹','Marocco':'🇲🇦','Messico':'🇲🇽',
  'Myanmar':'🇲🇲','Namibia':'🇳🇦','Nigeria':'🇳🇬','Norvegia':'🇳🇴','Paesi Bassi':'🇳🇱',
  'Pakistan':'🇵🇰','Perù':'🇵🇪','Polonia':'🇵🇱','Portogallo':'🇵🇹','Regno Unito':'🇬🇧',
  'Rep. delle Maldive':'🇲🇻','Rep. di Capo Verde':'🇨🇻','Rep. di Mauritius':'🇲🇺',
  'Repubblica Dominicana':'🇩🇴','Romania':'🇷🇴','Senegal':'🇸🇳','Siria':'🇸🇾',
  'Slovenia':'🇸🇮','Spagna':'🇪🇸','Sri Lanka':'🇱🇰','Sudafrica':'🇿🇦','Svezia':'🇸🇪',
  'Tanzania':'🇹🇿','Thailandia':'🇹🇭','Tunisia':'🇹🇳','Turchia':'🇹🇷','USA':'🇺🇸',
  'Ungheria':'🇭🇺','Uzbekistan':'🇺🇿','Venezuela':'🇻🇪','Vietnam':'🇻🇳','Yemen':'🇾🇪'
};

const SAND_COLOR_MAP = {
  cava: "#7A8C5E",
  desertica: "#E2BF8A",
  eolicadesertica: "#D89B5C",
  fluviale: "#9A8E7A",
  lacustre: "#B8C9CC",
  lagunare: "#7FA8A2",
  marina: "#5C8A95",
  marinafluviale: "#7C9BA0",
  marinavulcanica: "#6B5E78",
  montagna: "#8C6A4A",
  nonspecificata: "#CFC2AE",
  torrentizia: "#7A8FA0",
  vulcanica: "#4A3E36",
};

function normalizeSandType(name) {
  if (!name) return "";
  const cleaned = name.toLowerCase().trim()
    .replace(/\s*[-\/]\s*/g, "-")
    .replace(/\s+/g, " ");
  const aliases = {
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

function getSandColor(name) {
  return SAND_COLOR_MAP[normalizeSandType(name)] || "#D3D3D3";
}

function getContrastTextColor(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const toLinear = (v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.05 ? "#FFFFFF" : "#111111";
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const overlay = document.getElementById('mobile-nav-overlay');
  const nav = document.getElementById('mobile-nav');
  if (!toggle || !nav) return;

  function bindPress(el, handler) {
    if (!el || el.dataset.pressBound === 'true') return;
    el.dataset.pressBound = 'true';
    var lastTouchPress = 0;
    el.addEventListener('click', handler);
    el.addEventListener('pointerup', function (e) {
      if (e.pointerType === 'mouse') return;
      lastTouchPress = Date.now();
      e.preventDefault();
      handler(e);
    });
    el.addEventListener('click', function (e) {
      if (Date.now() - lastTouchPress < 500) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  }

  function openMenu() {
    nav.classList.add('active');
    nav.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('active');
    nav.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  bindPress(toggle, function () {
    const isOpen = nav.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  if (overlay) bindPress(overlay, closeMenu);

  nav.querySelectorAll('a').forEach(function (link) {
    bindPress(link, closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
}

/* --- Header glass effect on scroll --- */
(function() {
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }
})();

/* --- Hero video: forza autoplay in loop su mobile/tablet/desktop --- */
(function() {
  function initHeroVideo() {
    var v = document.querySelector('.hero-video');
    if (!v) return;
    // Forza attributi richiesti per autoplay su iOS/Android
    v.muted = true;
    v.defaultMuted = true;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.removeAttribute('controls');
    v.controls = false;

    var tryPlay = function() {
      var p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(function() { /* riproveremo al primo gesto */ });
      }
    };
    tryPlay();

    // Riprova quando il video è pronto
    v.addEventListener('loadedmetadata', tryPlay);
    v.addEventListener('canplay', tryPlay);
    // Se per qualche motivo si ferma, riavvia
    v.addEventListener('pause', function() {
      // ignora pause causate da fine documento/visibility
      if (!document.hidden) setTimeout(tryPlay, 50);
    });
    v.addEventListener('ended', tryPlay);

    // Fallback: al primo gesto utente, fai partire il video
    var onFirstGesture = function() {
      tryPlay();
      ['touchstart','click','scroll','keydown'].forEach(function(ev) {
        window.removeEventListener(ev, onFirstGesture, true);
      });
    };
    ['touchstart','click','scroll','keydown'].forEach(function(ev) {
      window.addEventListener(ev, onFirstGesture, { capture: true, passive: true });
    });

    // Riavvia quando la tab torna visibile
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden) tryPlay();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroVideo);
  } else {
    initHeroVideo();
  }
})();

/* --- Curiosità del giorno --- */
(function() {
  var curiosita = [
    "La sabbia del Sahara viene trasportata dal vento fino all'Amazzonia, fertilizzando la foresta pluviale.",
    "Ogni granello di sabbia impiega in media 200 milioni di anni per formarsi dalla roccia madre.",
    "Esistono sabbie di oltre 20 colori diversi: bianche, nere, rosa, verdi, rosse e persino viola.",
    "Le spiagge di sabbia nera, come quelle islandesi, sono formate da basalto vulcanico eroso.",
    "Un solo cucchiaino di sabbia può contenere fino a 8.000 granelli individuali.",
    "La sabbia rosa delle Bermuda deve il suo colore ai gusci di foraminiferi, organismi marini microscopici.",
    "Il deserto del Gobi ha sabbie che 'cantano': le dune emettono suoni a bassa frequenza quando il vento le attraversa."
  ];
  var el = document.getElementById('curiosita-text');
  if (el) {
    el.textContent = curiosita[Math.floor(Math.random() * curiosita.length)];
  }
})();

(function () {
  'use strict';

  function bindPress(el, handler) {
    if (!el) return;
    var lastTouchPress = 0;
    el.addEventListener('click', handler);
    el.addEventListener('pointerup', function (e) {
      if (e.pointerType === 'mouse') return;
      lastTouchPress = Date.now();
      e.preventDefault();
      handler(e);
    });
    el.addEventListener('click', function (e) {
      if (Date.now() - lastTouchPress < 500) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
  }

  let campioni = [];
  let filteredCampioni = [];
  let currentView = 'grid';
  let visibleCount = 12;
  const PAGE_SIZE = 12;

  const galleryGrid = document.getElementById('gallery-grid');
  const searchInput = document.getElementById('search-input');
  const btnReset = document.getElementById('btn-reset');
  const resultsCount = document.getElementById('results-count');
  const filterBadges = document.getElementById('filter-badges');
  const viewToggle = document.getElementById('view-toggle');

  /* --- Multi-select filter state --- */
  var selectedContinenti = new Set();
  var selectedPaesi = new Set();
  var selectedTipologie = new Set();

  var msContinente = {
    key: 'continente',
    set: selectedContinenti,
    btn: document.getElementById('filter-continente-btn'),
    panel: document.getElementById('filter-continente-panel'),
    label: document.querySelector('#filter-continente-btn .multi-select-label'),
    placeholder: 'Tutti i continenti',
    singular: 'continente',
    plural: 'continenti'
  };
  var msPaese = {
    key: 'paese',
    set: selectedPaesi,
    btn: document.getElementById('filter-paese-btn'),
    panel: document.getElementById('filter-paese-panel'),
    label: document.querySelector('#filter-paese-btn .multi-select-label'),
    placeholder: 'Tutti i paesi',
    singular: 'paese',
    plural: 'paesi'
  };
  var msTipologia = {
    key: 'tipologia',
    set: selectedTipologie,
    btn: document.getElementById('filter-tipologia-btn'),
    panel: document.getElementById('filter-tipologia-panel'),
    label: document.querySelector('#filter-tipologia-btn .multi-select-label'),
    placeholder: 'Tutte le tipologie',
    singular: 'tipologia',
    plural: 'tipologie'
  };
  var allMs = [msContinente, msPaese, msTipologia];

  function updateMsLabel(ms) {
    if (!ms.label) return;
    var n = ms.set.size;
    if (n === 0) ms.label.textContent = ms.placeholder;
    else if (n === 1) {
      var only = Array.from(ms.set)[0];
      ms.label.textContent = (ms.key === 'paese' ? ((COUNTRY_FLAGS[only] || '') + ' ' + only).trim() : only);
    } else ms.label.textContent = n + ' ' + ms.plural + ' selezionati';
    if (ms.btn) ms.btn.classList.toggle('has-selection', n > 0);
  }

  function renderMsOptions(ms, options, opts) {
    opts = opts || {};
    if (!ms.panel) return;
    ms.panel.innerHTML = '';
    if (!options.length) {
      var empty = document.createElement('div');
      empty.className = 'multi-select-empty';
      empty.textContent = 'Nessuna opzione';
      ms.panel.appendChild(empty);
      updateMsLabel(ms);
      return;
    }
    options.forEach(function(value) {
      var id = 'ms-' + ms.key + '-' + value.replace(/[^a-zA-Z0-9]/g, '_');
      var row = document.createElement('label');
      row.className = 'multi-select-option';
      row.setAttribute('for', id);
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = id;
      checkbox.value = value;
      checkbox.checked = ms.set.has(value);
      checkbox.addEventListener('change', function() {
        if (checkbox.checked) ms.set.add(value);
        else ms.set.delete(value);
        updateMsLabel(ms);
        if (ms.key === 'continente') updatePaesiDropdown();
        applyFilters();
      });
      var text = document.createElement('span');
      text.className = 'multi-select-option-text';
      text.textContent = (opts.flag ? (COUNTRY_FLAGS[value] || '') + ' ' : '') + value;
      row.appendChild(checkbox);
      row.appendChild(text);
      ms.panel.appendChild(row);
    });
    updateMsLabel(ms);
  }

  function bindMsToggle(ms) {
    if (!ms.btn || !ms.panel) return;
    ms.btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var isOpen = !ms.panel.hasAttribute('hidden');
      // close others
      allMs.forEach(function(o) {
        if (o !== ms && o.panel) {
          o.panel.setAttribute('hidden', '');
          if (o.btn) o.btn.setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        ms.panel.setAttribute('hidden', '');
        ms.btn.setAttribute('aria-expanded', 'false');
      } else {
        ms.panel.removeAttribute('hidden');
        ms.btn.setAttribute('aria-expanded', 'true');
      }
    });
  }
  allMs.forEach(bindMsToggle);
  document.addEventListener('click', function(e) {
    allMs.forEach(function(ms) {
      if (!ms.panel || ms.panel.hasAttribute('hidden')) return;
      if (ms.panel.contains(e.target) || (ms.btn && ms.btn.contains(e.target))) return;
      ms.panel.setAttribute('hidden', '');
      if (ms.btn) ms.btn.setAttribute('aria-expanded', 'false');
    });
  });

  /* Public API for map.js to set country filter */
  window.setPaeseFilter = function(name, additive) {
    if (!name) return;
    if (!additive) selectedPaesi.clear();
    selectedPaesi.add(name);
    updatePaesiDropdown();
    applyFilters();
  };

  const basePath = (function() {
    const path = window.location.pathname;
    if (path.includes('/museo/')) return '../';
    return '';
  })();

  /* --- View Toggle --- */
  if (viewToggle) {
    viewToggle.querySelectorAll('.view-toggle-btn').forEach(function(btn) {
      bindPress(btn, function() {
        var view = btn.dataset.view;
        if (view === currentView) return;
        currentView = view;
        viewToggle.querySelectorAll('.view-toggle-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (galleryGrid) {
          galleryGrid.classList.toggle('gallery-list', view === 'list');
        }
        renderGallery();
      });
    });
  }

  /* --- Load Data --- */
  async function loadData() {
    try {
      const response = await fetch(basePath + 'dati.json');
      if (!response.ok) throw new Error('Errore nel caricamento dei dati');
      campioni = await response.json();
      filteredCampioni = [...campioni];
      galleryGrid.setAttribute('aria-busy', 'false');
      populateFilters();
      renderGallery();
      if (typeof window.initWorldMap === 'function') {
        window.initWorldMap(campioni);
      }
    } catch (error) {
      galleryGrid.setAttribute('aria-busy', 'false');
      galleryGrid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><h3>Errore di caricamento</h3><p>Impossibile caricare la collezione. Riprova più tardi.</p></div>';
    }
  }

  /* --- Populate Filter Dropdowns --- */
  function populateFilters() {
    var continenti = [...new Set(campioni.map(function(c){return c.continente}).filter(Boolean))].sort();
    var tipologie = [...new Set(campioni.map(function(c){return c.tipologia}).filter(Boolean))].sort();

    renderMsOptions(msContinente, continenti);
    renderMsOptions(msTipologia, tipologie);

    updatePaesiDropdown();
  }

  /* Complete list of all recognized countries in Italian */
  var ALL_COUNTRIES = [
    'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua e Barbuda','Arabia Saudita',
    'Argentina','Armenia','Australia','Austria','Azerbaigian','Bahamas','Bahrein','Bangladesh',
    'Barbados','Belgio','Belize','Benin','Bhutan','Bielorussia','Bolivia',
    'Bosnia ed Erzegovina','Botswana','Brasile','Brunei','Bulgaria','Burkina Faso','Burundi',
    'Cambogia','Camerun','Canada','Ciad','Cile','Cina','Cipro','Colombia','Comore',
    'Corea del Nord','Corea del Sud','Costa Rica','Costa d\'Avorio','Croazia','Cuba',
    'Danimarca','Dominica','Ecuador','Egitto','El Salvador','Emirati Arabi','Eritrea',
    'Estonia','Eswatini','Etiopia','Figi','Filippine','Finlandia','Francia','Gabon','Gambia',
    'Georgia','Germania','Ghana','Giamaica','Giappone','Gibuti','Giordania','Grecia',
    'Grenada','Guatemala','Guinea','Guinea Equatoriale','Guinea-Bissau','Guyana','Haiti',
    'Honduras','India','Indonesia','Iran','Iraq','Irlanda','Islanda','Israele','Italia',
    'Kazakistan','Kenia','Kirghizistan','Kiribati','Kuwait','Laos','Lesotho','Lettonia',
    'Libano','Liberia','Libia','Liechtenstein','Lituania','Lussemburgo','Macedonia del Nord',
    'Madagascar','Malawi','Malesia','Maldive','Mali','Malta','Marocco','Mauritania',
    'Messico','Micronesia','Moldavia','Monaco','Mongolia','Montenegro','Mozambico','Myanmar',
    'Namibia','Nauru','Nepal','Nicaragua','Niger','Nigeria','Norvegia','Nuova Zelanda',
    'Oman','Paesi Bassi','Pakistan','Palau','Panama','Papua Nuova Guinea','Paraguay','Perù',
    'Polonia','Portogallo','Qatar','Regno Unito','Rep. Centrafricana','Rep. Ceca',
    'Rep. del Congo','Rep. Dem. del Congo','Rep. delle Maldive','Rep. di Capo Verde',
    'Rep. di Mauritius','Repubblica Dominicana','Romania','Ruanda','Russia',
    'Saint Kitts e Nevis','Saint Lucia','Saint Vincent e Grenadine','Samoa',
    'San Marino','São Tomé e Príncipe','Senegal','Serbia','Seychelles','Sierra Leone',
    'Singapore','Siria','Slovacchia','Slovenia','Somalia','Spagna','Sri Lanka',
    'Sudafrica','Sudan','Sudan del Sud','Suriname','Svezia','Svizzera',
    'Tagikistan','Tanzania','Thailandia','Timor Est','Togo','Tonga',
    'Trinidad e Tobago','Tunisia','Turchia','Turkmenistan','Tuvalu',
    'Ucraina','Uganda','Ungheria','Uruguay','Uzbekistan','Vanuatu','Vaticano',
    'Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'
  ];

  /* Continent mapping for countries not in campioni */
  var COUNTRY_CONTINENT = {
    'Afghanistan':'Asia','Albania':'Europa','Algeria':'Africa','Andorra':'Europa','Angola':'Africa',
    'Antigua e Barbuda':'Nord America','Arabia Saudita':'Asia','Argentina':'Sud America',
    'Armenia':'Asia','Australia':'Oceania','Austria':'Europa','Azerbaigian':'Asia',
    'Bahamas':'Nord America','Bahrein':'Asia','Bangladesh':'Asia','Barbados':'Nord America',
    'Belgio':'Europa','Belize':'Nord America','Benin':'Africa','Bhutan':'Asia',
    'Bielorussia':'Europa','Bolivia':'Sud America','Bosnia ed Erzegovina':'Europa',
    'Botswana':'Africa','Brasile':'Sud America','Brunei':'Asia','Bulgaria':'Europa',
    'Burkina Faso':'Africa','Burundi':'Africa','Cambogia':'Asia','Camerun':'Africa',
    'Canada':'Nord America','Ciad':'Africa','Cile':'Sud America','Cina':'Asia',
    'Cipro':'Europa','Colombia':'Sud America','Comore':'Africa','Corea del Nord':'Asia',
    'Corea del Sud':'Asia','Costa Rica':'Nord America','Costa d\'Avorio':'Africa',
    'Croazia':'Europa','Cuba':'Nord America','Danimarca':'Europa','Dominica':'Nord America',
    'Ecuador':'Sud America','Egitto':'Africa','El Salvador':'Nord America',
    'Emirati Arabi':'Asia','Eritrea':'Africa','Estonia':'Europa','Eswatini':'Africa',
    'Etiopia':'Africa','Figi':'Oceania','Filippine':'Asia','Finlandia':'Europa',
    'Francia':'Europa','Gabon':'Africa','Gambia':'Africa','Georgia':'Asia',
    'Germania':'Europa','Ghana':'Africa','Giamaica':'Nord America','Giappone':'Asia',
    'Gibuti':'Africa','Giordania':'Asia','Grecia':'Europa','Grenada':'Nord America',
    'Guatemala':'Nord America','Guinea':'Africa','Guinea Equatoriale':'Africa',
    'Guinea-Bissau':'Africa','Guyana':'Sud America','Haiti':'Nord America',
    'Honduras':'Nord America','India':'Asia','Indonesia':'Asia','Iran':'Asia',
    'Iraq':'Asia','Irlanda':'Europa','Islanda':'Europa','Israele':'Asia','Italia':'Europa',
    'Kazakistan':'Asia','Kenia':'Africa','Kirghizistan':'Asia','Kiribati':'Oceania',
    'Kuwait':'Asia','Laos':'Asia','Lesotho':'Africa','Lettonia':'Europa','Libano':'Asia',
    'Liberia':'Africa','Libia':'Africa','Liechtenstein':'Europa','Lituania':'Europa',
    'Lussemburgo':'Europa','Macedonia del Nord':'Europa','Madagascar':'Africa',
    'Malawi':'Africa','Malesia':'Asia','Maldive':'Asia','Mali':'Africa','Malta':'Europa',
    'Marocco':'Africa','Mauritania':'Africa','Messico':'Nord America','Micronesia':'Oceania',
    'Moldavia':'Europa','Monaco':'Europa','Mongolia':'Asia','Montenegro':'Europa',
    'Mozambico':'Africa','Myanmar':'Asia','Namibia':'Africa','Nauru':'Oceania',
    'Nepal':'Asia','Nicaragua':'Nord America','Niger':'Africa','Nigeria':'Africa',
    'Norvegia':'Europa','Nuova Zelanda':'Oceania','Oman':'Asia','Paesi Bassi':'Europa',
    'Pakistan':'Asia','Palau':'Oceania','Panama':'Nord America',
    'Papua Nuova Guinea':'Oceania','Paraguay':'Sud America','Perù':'Sud America',
    'Polonia':'Europa','Portogallo':'Europa','Qatar':'Asia','Regno Unito':'Europa',
    'Rep. Centrafricana':'Africa','Rep. Ceca':'Europa','Rep. del Congo':'Africa',
    'Rep. Dem. del Congo':'Africa','Rep. delle Maldive':'Asia','Rep. di Capo Verde':'Africa',
    'Rep. di Mauritius':'Africa','Repubblica Dominicana':'Nord America','Romania':'Europa',
    'Ruanda':'Africa','Russia':'Europa','Saint Kitts e Nevis':'Nord America',
    'Saint Lucia':'Nord America','Saint Vincent e Grenadine':'Nord America','Samoa':'Oceania',
    'San Marino':'Europa','São Tomé e Príncipe':'Africa','Senegal':'Africa','Serbia':'Europa',
    'Seychelles':'Africa','Sierra Leone':'Africa','Singapore':'Asia','Siria':'Asia',
    'Slovacchia':'Europa','Slovenia':'Europa','Somalia':'Africa','Spagna':'Europa',
    'Sri Lanka':'Asia','Sudafrica':'Africa','Sudan':'Africa','Sudan del Sud':'Africa',
    'Suriname':'Sud America','Svezia':'Europa','Svizzera':'Europa','Tagikistan':'Asia',
    'Tanzania':'Africa','Thailandia':'Asia','Timor Est':'Asia','Togo':'Africa',
    'Tonga':'Oceania','Trinidad e Tobago':'Nord America','Tunisia':'Africa','Turchia':'Asia',
    'Turkmenistan':'Asia','Tuvalu':'Oceania','Ucraina':'Europa','Uganda':'Africa',
    'Ungheria':'Europa','Uruguay':'Sud America','Uzbekistan':'Asia','Vanuatu':'Oceania',
    'Vaticano':'Europa','Venezuela':'Sud America','Vietnam':'Asia','Yemen':'Asia',
    'Zambia':'Africa','Zimbabwe':'Africa'
  };

  function updatePaesiDropdown() {
    /* Show ONLY countries that actually have at least one sample, filtered by selected continents. */
    var source = campioni;
    if (selectedContinenti.size > 0) {
      source = source.filter(function(c) { return selectedContinenti.has(c.continente); });
    }
    var allPaesi = [...new Set(
      source
        .map(function(c) { return c.paese; })
        .filter(function(p) { return p && p !== 'Non specificato'; })
    )].sort(function(a,b){ return a.localeCompare(b, 'it'); });

    /* Drop selected paesi that are no longer valid */
    Array.from(selectedPaesi).forEach(function(p) {
      if (allPaesi.indexOf(p) === -1) selectedPaesi.delete(p);
    });
    renderMsOptions(msPaese, allPaesi, { flag: true });
  }

  /* --- Render Filter Badges --- */
  function renderFilterBadges() {
    if (!filterBadges) return;
    var badges = [];
    var search = searchInput.value.trim();

    if (search) {
      badges.push('<span class="filter-badge">🔍 ' + search + ' <button class="filter-badge-x" data-filter="search" aria-label="Rimuovi filtro ricerca">✕</button></span>');
    }
    selectedContinenti.forEach(function(v) {
      badges.push('<span class="filter-badge">🌍 ' + v + ' <button class="filter-badge-x" data-filter="continente" data-value="' + v + '" aria-label="Rimuovi continente ' + v + '">✕</button></span>');
    });
    selectedPaesi.forEach(function(v) {
      var flag = COUNTRY_FLAGS[v] || '🏳️';
      badges.push('<span class="filter-badge">' + flag + ' ' + v + ' <button class="filter-badge-x" data-filter="paese" data-value="' + v + '" aria-label="Rimuovi paese ' + v + '">✕</button></span>');
    });
    selectedTipologie.forEach(function(v) {
      badges.push('<span class="filter-badge">🏖️ ' + v + ' <button class="filter-badge-x" data-filter="tipologia" data-value="' + v + '" aria-label="Rimuovi tipologia ' + v + '">✕</button></span>');
    });

    filterBadges.innerHTML = badges.join('');

    filterBadges.querySelectorAll('.filter-badge-x').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var f = btn.dataset.filter;
        var v = btn.dataset.value;
        if (f === 'search') searchInput.value = '';
        if (f === 'continente') {
          selectedContinenti.delete(v);
          updatePaesiDropdown();
          renderMsOptions(msContinente, [...new Set(campioni.map(function(c){return c.continente}).filter(Boolean))].sort());
        }
        if (f === 'paese') {
          selectedPaesi.delete(v);
          updatePaesiDropdown();
        }
        if (f === 'tipologia') {
          selectedTipologie.delete(v);
          renderMsOptions(msTipologia, [...new Set(campioni.map(function(c){return c.tipologia}).filter(Boolean))].sort());
        }
        applyFilters();
      });
    });
  }

  /* --- Apply Filters --- */
  function applyFilters() {
    var searchTerm = searchInput.value.toLowerCase().trim();

    filteredCampioni = campioni.filter(function(c) {
      if (searchTerm) {
        var searchable = [c.nome, c.provenienza, c.paese, c.continente, c.bacino, c.tipologia, c.id, '#' + c.id]
          .filter(function(v){ return v !== undefined && v !== null && v !== ''; })
          .join(' ').toLowerCase();
        if (!searchable.includes(searchTerm)) return false;
      }
      if (selectedContinenti.size > 0 && !selectedContinenti.has(c.continente)) return false;
      if (selectedPaesi.size > 0 && !selectedPaesi.has(c.paese)) return false;
      if (selectedTipologie.size > 0 && !selectedTipologie.has(c.tipologia)) return false;
      return true;
    });

    applySortOrder();

    visibleCount = PAGE_SIZE;
    renderFilterBadges();
    renderGallery();
  }

  function applySortOrder() {
    var sortEl = document.getElementById('sort-order');
    var dir = sortEl ? sortEl.value : 'asc';
    filteredCampioni.sort(function(a, b) {
      var na = parseInt(a.id, 10); var nb = parseInt(b.id, 10);
      if (isNaN(na) || isNaN(nb)) {
        return dir === 'desc'
          ? String(b.id).localeCompare(String(a.id), 'it', { numeric: true })
          : String(a.id).localeCompare(String(b.id), 'it', { numeric: true });
      }
      return dir === 'desc' ? nb - na : na - nb;
    });
  }

  /* --- Reset Filters --- */
  function resetFilters() {
    searchInput.value = '';
    selectedContinenti.clear();
    selectedPaesi.clear();
    selectedTipologie.clear();
    var continenti = [...new Set(campioni.map(function(c){return c.continente}).filter(Boolean))].sort();
    var tipologie = [...new Set(campioni.map(function(c){return c.tipologia}).filter(Boolean))].sort();
    renderMsOptions(msContinente, continenti);
    renderMsOptions(msTipologia, tipologie);
    updatePaesiDropdown();
    filteredCampioni = [...campioni];
    visibleCount = PAGE_SIZE;
    renderFilterBadges();
    renderGallery();
  }

  /* --- Render Gallery --- */
  function renderGallery() {
    var total = campioni.length;
    var shown = filteredCampioni.length;
    resultsCount.innerHTML = shown === total
      ? '<strong>' + total + '</strong> campioni nella collezione'
      : '<strong>' + shown + '</strong> di ' + total + ' campioni';

    if (shown === 0) {
      galleryGrid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>Nessun campione trovato</h3><p>Prova a modificare i filtri o la ricerca per trovare altri campioni.</p></div>';
      removeLoadMoreBtn();
      return;
    }

    var toShow = filteredCampioni.slice(0, visibleCount);

    function renderCard(c, i) {
      var sandColor = getSandColor(c.tipologia);
      var textColor = getContrastTextColor(sandColor);
      var flag = COUNTRY_FLAGS[c.paese] || '';
      if (currentView === 'list') {
        return '<a href="dettaglio.html?id=' + c.id + '" class="card card-list" style="animation-delay: ' + Math.min(i * 0.03, 0.3) + 's" aria-label="Scheda dettaglio: ' + c.nome + '">' +
          '<div class="card-list-image">' +
            '<img class="card-image" src="' + basePath + c.immagine + '" alt="' + c.nome + '" loading="lazy" onerror="this.src=\'' + basePath + 'images/coming-soon.jpg\';">' +
          '</div>' +
          '<div class="card-list-body">' +
            '<h3 class="card-title">' + c.nome + '</h3>' +
            '<p class="card-location">' + flag + ' ' + c.provenienza + ' — ' + c.paese + ', ' + c.continente + '</p>' +
            '<div class="card-meta">' +
              '<span class="card-tag continent">' + c.continente + '</span>' +
              '<span class="card-tag">' + flag + ' ' + c.paese + '</span>' +
              '<span class="card-tag type" style="background-color:' + sandColor + ';color:' + textColor + ';">' +
                '<span class="sand-swatch" style="background-color:' + sandColor + ';"></span>' + c.tipologia +
              '</span>' +
            '</div>' +
          '</div>' +
          '<span class="card-list-id">#' + c.id + '</span>' +
        '</a>';
      } else {
        return '<a href="dettaglio.html?id=' + c.id + '" class="card" style="animation-delay: ' + Math.min(i * 0.05, 0.4) + 's" aria-label="Scheda dettaglio: ' + c.nome + '">' +
          '<div class="card-image-wrapper">' +
            '<img class="card-image" src="' + basePath + c.immagine + '" alt="Campione di sabbia: ' + c.nome + ', ' + c.provenienza + '" loading="lazy" onerror="this.src=\'' + basePath + 'images/coming-soon.jpg\'; this.alt=\'Immagine non disponibile\';">' +
            '<span class="card-badge">#' + c.id + '</span>' +
          '</div>' +
          '<div class="card-body">' +
            '<h3 class="card-title">' + c.nome + '</h3>' +
            '<p class="card-location">' + flag + ' ' + c.provenienza + '</p>' +
            '<div class="card-meta">' +
              '<span class="card-tag continent">' + c.continente + '</span>' +
              '<span class="card-tag">' + flag + ' ' + c.paese + '</span>' +
              '<span class="card-tag type sand-type-item" tabindex="0" role="listitem" data-sand-color="' + sandColor + '" data-sand-text="' + textColor + '" style="background-color: ' + sandColor + '; color: ' + textColor + '; transition: all 0.3s ease;">' +
                '<span class="sand-swatch" style="background-color: ' + sandColor + '; transition: background-color 0.3s ease;"></span>' +
                c.tipologia +
              '</span>' +
            '</div>' +
          '</div>' +
        '</a>';
      }
    }

    galleryGrid.innerHTML = toShow.map(renderCard).join('');

    // Attach hover/focus listeners
    galleryGrid.querySelectorAll('.sand-type-item').forEach(function(el) {
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

    // Load more button
    updateLoadMoreBtn(shown);
  }

  function removeLoadMoreBtn() {
    var existing = document.getElementById('load-more-container');
    if (existing) existing.remove();
  }

  function updateLoadMoreBtn(totalFiltered) {
    removeLoadMoreBtn();
    var gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;

    var container = document.createElement('div');
    container.id = 'load-more-container';
    container.style.textAlign = 'center';
    container.style.padding = '2rem 1rem';

    if (visibleCount >= totalFiltered) {
      container.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.92rem;">Hai visto tutti i <strong>' + totalFiltered + '</strong> campioni</p>';
    } else {
      var btn = document.createElement('button');
      btn.className = 'btn btn-load-more';
      btn.textContent = 'Mostra altri campioni';
      btn.addEventListener('click', function() {
        visibleCount += PAGE_SIZE;
        renderGallery();
      });
      container.appendChild(btn);
    }
    gallerySection.appendChild(container);
  }

  /* --- Event Listeners --- */
  searchInput.addEventListener('input', applyFilters);
  bindPress(btnReset, resetFilters);

  /* --- Init --- */
  initMobileMenu();
  loadData();
})();

/* --- Animated Stat Counters --- */
(function () {
  const statEls = document.querySelectorAll('.hero-stat-number[data-target]');
  if (!statEls.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    let start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statEls.forEach(function (el) { observer.observe(el); });
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
    var lbl = document.getElementById('theme-toggle-label');
    if (lbl) lbl.textContent = LABELS[mode];
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