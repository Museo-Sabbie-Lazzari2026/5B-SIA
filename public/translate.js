(function () {
  "use strict";

  var STORAGE_KEY = "museo-language";
  var SOURCE_LANGUAGE = "it";
  var reapplyTimer = null;
  var isApplying = false;

  var LANGUAGES = [
    { code: "it", label: "Italiano" },
    { code: "en", label: "English" },
    { code: "ro", label: "Romana" },
    { code: "sq", label: "Shqip" },
    { code: "ar", label: "العربية" },
    { code: "zh-CN", label: "中文" },
    { code: "uk", label: "Українська" },
    { code: "bn", label: "বাংলা" },
    { code: "hi", label: "हिन्दी" },
    { code: "ur", label: "اردو" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "es", label: "Espanol" },
    { code: "fr", label: "Francais" },
    { code: "tl", label: "Tagalog" },
    { code: "ru", label: "Русский" },
    { code: "pl", label: "Polski" },
    { code: "pt", label: "Portugues" },
    { code: "de", label: "Deutsch" },
    { code: "ta", label: "தமிழ்" },
    { code: "tr", label: "Turkce" },
    { code: "sr", label: "Srpski" },
  ];

  function injectStyles() {
    if (document.getElementById("language-switcher-style")) return;
    var style = document.createElement("style");
    style.id = "language-switcher-style";
    style.textContent = [
      ".language-switcher{position:fixed;right:clamp(.75rem,2vw,1.5rem);bottom:clamp(.75rem,2vw,1.5rem);z-index:1400;display:flex;align-items:center;gap:.45rem;padding:.35rem .45rem .35rem .7rem;border:1px solid rgba(132,92,52,.24);border-radius:999px;background:rgba(255,250,241,.92);box-shadow:0 16px 42px rgba(45,30,16,.18);backdrop-filter:blur(14px) saturate(140%);-webkit-backdrop-filter:blur(14px) saturate(140%);white-space:nowrap;max-width:calc(100vw - 1.5rem)}",
      ".language-switcher-label{font:800 .68rem/1 Inter,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#5d412b;opacity:.86}",
      ".language-switcher-select{height:2.2rem;width:9.4rem;max-width:46vw;border:1px solid rgba(132,92,52,.34);border-radius:999px;background:#fffaf1;color:#3b2617;padding:0 1.8rem 0 .75rem;font:700 .8rem/1 Inter,system-ui,sans-serif;cursor:pointer;outline:none}",
      ".language-switcher-select:focus{border-color:#d98232;box-shadow:0 0 0 3px rgba(217,130,50,.22)}",
      "html[data-theme='dark'] .language-switcher{background:rgba(38,25,16,.94);border-color:rgba(248,193,102,.3);box-shadow:0 16px 42px rgba(0,0,0,.32)}",
      "html[data-theme='dark'] .language-switcher-label{color:#ffe8c2}",
      "html[data-theme='dark'] .language-switcher-select{background:#2d1d12;border-color:rgba(248,193,102,.42);color:#fff4df}",
      "html[data-theme='light'] .language-switcher{background:rgba(255,255,255,.94)}",
      "@media (max-width:560px){.language-switcher{left:.75rem;right:.75rem;bottom:.75rem;justify-content:space-between}.language-switcher-select{width:12rem;max-width:58vw}.language-switcher-label{font-size:.66rem}}",
      "#google_translate_element,.goog-te-gadget,.goog-te-banner-frame,.goog-te-balloon-frame,body>.skiptranslate{display:none!important}",
      "body{top:0!important}",
      ".site-header,.mobile-nav,.mobile-nav-overlay{margin-top:0!important}",
      ".translated-ltr .site-header,.translated-rtl .site-header{top:0!important}",
      ".translated-ltr .hero,.translated-rtl .hero{padding-top:max(8rem,calc(var(--header-height,72px) + 3rem))}",
      ".translated-ltr .header-nav,.translated-rtl .header-nav{gap:clamp(.75rem,1.3vw,1.5rem)}",
      ".translated-ltr .header-nav a,.translated-rtl .header-nav a{letter-spacing:.08em;font-size:.68rem;max-width:9.5rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".translated-ltr .header-logo-center,.translated-rtl .header-logo-center{max-width:min(42vw,28rem)}",
      ".translated-ltr .header-logo-text,.translated-rtl .header-logo-text{font-size:clamp(1rem,2vw,1.35rem);overflow:hidden;text-overflow:ellipsis}",
      ".translated-ltr .multi-select-label,.translated-rtl .multi-select-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".translated-ltr .btn,.translated-rtl .btn{white-space:normal;line-height:1.2}",
    ].join("\n");
    document.head.appendChild(style);
  }

  function getSavedLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || SOURCE_LANGUAGE;
    } catch (e) {
      return SOURCE_LANGUAGE;
    }
  }

  function saveLanguage(code) {
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {}
  }

  function setCookie(name, value) {
    var expires = "expires=Thu, 31 Dec 2099 23:59:59 GMT";
    document.cookie = name + "=" + value + ";path=/;" + expires;
    document.cookie = name + "=" + value + ";path=/5B-SIA/;" + expires;
  }

  function clearCookie(name) {
    document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = name + "=;path=/5B-SIA/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    try {
      var host = window.location.hostname;
      if (host)
        document.cookie =
          name + "=;domain=." + host + ";path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    } catch (e) {}
  }

  function setGoogleTranslateCookie(code) {
    if (code === SOURCE_LANGUAGE) {
      clearCookie("googtrans");
      return;
    }
    var value = "/" + SOURCE_LANGUAGE + "/" + code;
    setCookie("googtrans", value);
    try {
      var host = window.location.hostname;
      if (host)
        document.cookie =
          "googtrans=" +
          value +
          ";domain=." +
          host +
          ";path=/;expires=Thu, 31 Dec 2099 23:59:59 GMT";
    } catch (e) {}
  }

  function getGoogleCombo() {
    return document.querySelector(".goog-te-combo");
  }

  function syncCustomSelects(code) {
    document.querySelectorAll(".language-switcher-select").forEach(function (select) {
      select.value = code;
    });
  }

  function applyGoogleLanguage(code, options) {
    var opts = options || {};
    syncCustomSelects(code);
    saveLanguage(code);
    setGoogleTranslateCookie(code);

    if (code === SOURCE_LANGUAGE) {
      if (opts.reload !== false && document.documentElement.classList.contains("translated-ltr")) {
        window.location.reload();
      }
      return;
    }

    var combo = getGoogleCombo();
    if (!combo) {
      scheduleReapply(450);
      return;
    }

    if (isApplying) return;
    isApplying = true;
    combo.value = code;
    combo.dispatchEvent(new Event("change", { bubbles: true }));
    setTimeout(function () {
      isApplying = false;
    }, 800);
  }

  function scheduleReapply(delay) {
    var code = getSavedLanguage();
    if (code === SOURCE_LANGUAGE) return;
    clearTimeout(reapplyTimer);
    reapplyTimer = setTimeout(function () {
      applyGoogleLanguage(code, { reload: false });
    }, delay || 250);
  }

  function loadGoogleScript() {
    if (document.getElementById("google-translate-script")) return;
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: SOURCE_LANGUAGE,
          includedLanguages: LANGUAGES.map(function (language) {
            return language.code;
          })
            .filter(function (code) {
              return code !== SOURCE_LANGUAGE;
            })
            .join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );
      scheduleReapply(300);
    };

    var script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.referrerPolicy = "no-referrer";
    document.head.appendChild(script);
  }

  function buildSwitcher() {
    var wrapper = document.createElement("div");
    wrapper.className = "language-switcher notranslate";
    wrapper.setAttribute("translate", "no");

    var label = document.createElement("label");
    label.className = "language-switcher-label";
    label.setAttribute("for", "language-select");
    label.textContent = "Lingua";

    var select = document.createElement("select");
    select.className = "language-switcher-select";
    select.id = "language-select";
    select.setAttribute("aria-label", "Cambia lingua");

    LANGUAGES.forEach(function (language) {
      var option = document.createElement("option");
      option.value = language.code;
      option.textContent = language.label;
      select.appendChild(option);
    });

    select.value = getSavedLanguage();
    select.addEventListener("change", function () {
      applyGoogleLanguage(select.value);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    return wrapper;
  }

  function mountSwitcher() {
    injectStyles();

    if (!document.getElementById("google_translate_element")) {
      var googleHost = document.createElement("div");
      googleHost.id = "google_translate_element";
      googleHost.className = "notranslate";
      googleHost.setAttribute("translate", "no");
      document.body.appendChild(googleHost);
    }

    if (!document.querySelector(".language-switcher")) {
      document.body.appendChild(buildSwitcher());
    }

    loadGoogleScript();
  }

  window.MuseoLanguage = {
    refresh: scheduleReapply,
    current: getSavedLanguage,
    set: applyGoogleLanguage,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountSwitcher);
  } else {
    mountSwitcher();
  }
})();
