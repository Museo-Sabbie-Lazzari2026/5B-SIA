(function () {
  "use strict";

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
      ".language-switcher{display:inline-flex;align-items:center;gap:.45rem;margin-left:.25rem;white-space:nowrap}",
      ".language-switcher-label{font-size:.72rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:currentColor;opacity:.76}",
      ".language-switcher-select{height:2.35rem;max-width:9.75rem;border:1px solid rgba(132,92,52,.34);border-radius:999px;background:rgba(255,250,241,.82);color:#3b2617;padding:0 2rem 0 .8rem;font:700 .82rem/1 inherit;cursor:pointer;box-shadow:0 8px 20px rgba(54,31,15,.08);outline:none}",
      ".language-switcher-select:focus{border-color:#d98232;box-shadow:0 0 0 3px rgba(217,130,50,.22)}",
      "html[data-theme='dark'] .language-switcher-select{background:rgba(45,29,18,.92);border-color:rgba(248,193,102,.42);color:#fff4df;box-shadow:0 8px 20px rgba(0,0,0,.24)}",
      "html[data-theme='light'] .language-switcher-select{background:rgba(255,255,255,.9);color:#322114}",
      ".mobile-nav .language-switcher{display:flex;margin:.35rem 0 0;padding:.2rem 0;width:100%;justify-content:space-between}",
      ".mobile-nav .language-switcher-select{max-width:12rem;width:12rem}",
      "@media (max-width:900px){.header-nav .language-switcher{display:none}}",
      "@media (max-width:560px){.language-switcher-label{font-size:.68rem}.language-switcher-select{height:2.25rem;font-size:.78rem}}",
    ].join("\n");
    document.head.appendChild(style);
  }

  function currentLanguage() {
    var params = new URLSearchParams(window.location.search);
    return params.get("_x_tr_tl") || params.get("tl") || "it";
  }

  function getOriginalUrl() {
    var canonical = document.querySelector("link[rel='canonical']");
    if (canonical && canonical.href) return canonical.href;
    var url = new URL(window.location.href);
    ["_x_tr_sl", "_x_tr_tl", "_x_tr_hl", "_x_tr_pto", "sl", "tl", "u"].forEach(function (param) {
      url.searchParams.delete(param);
    });
    return url.href;
  }

  function translateTo(code) {
    if (code === "it") {
      window.location.href = getOriginalUrl();
      return;
    }

    var target = new URL("https://translate.google.com/translate");
    target.searchParams.set("sl", "it");
    target.searchParams.set("tl", code);
    target.searchParams.set("u", getOriginalUrl());
    window.location.href = target.toString();
  }

  function buildSwitcher(idSuffix) {
    var wrapper = document.createElement("div");
    wrapper.className = "language-switcher";

    var label = document.createElement("label");
    label.className = "language-switcher-label";
    label.setAttribute("for", "language-select-" + idSuffix);
    label.textContent = "Lingua";

    var select = document.createElement("select");
    select.className = "language-switcher-select";
    select.id = "language-select-" + idSuffix;
    select.setAttribute("aria-label", "Cambia lingua");

    LANGUAGES.forEach(function (language) {
      var option = document.createElement("option");
      option.value = language.code;
      option.textContent = language.label;
      select.appendChild(option);
    });

    select.value = currentLanguage();
    select.addEventListener("change", function () {
      translateTo(select.value);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(select);
    return wrapper;
  }

  function mountSwitcher() {
    injectStyles();

    var desktopNav = document.querySelector(".header-nav") || document.querySelector(".nav");
    if (desktopNav && !desktopNav.querySelector(".language-switcher")) {
      desktopNav.appendChild(buildSwitcher("desktop"));
    }

    var mobileNav = document.getElementById("mobile-nav");
    if (mobileNav && !mobileNav.querySelector(".language-switcher")) {
      mobileNav.appendChild(buildSwitcher("mobile"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountSwitcher);
  } else {
    mountSwitcher();
  }
})();
