/* Language (ja/en) and site theme (light/dark/auto) controls. */
(function () {
  "use strict";

  /* ---------- language (separate en/ja pages for SEO; / is English) ----------
     Priority: explicit choice (saved) > explicit URL > browser language.
     Shared links stay stable: /ja/ never bounces away on its own. */
  var LANG_KEY = "gumicord-site-lang";
  var langSel = document.getElementById("lang-select");
  var isJa = location.pathname.indexOf("/ja/") !== -1;
  function browserLang() {
    try {
      return (navigator.language || "en").toLowerCase().indexOf("ja") === 0 ? "ja" : "en";
    } catch (e) { return "en"; }
  }
  function savedLang() {
    try {
      var v = localStorage.getItem(LANG_KEY);
      return v === "ja" || v === "en" ? v : null;
    } catch (e) { return null; }
  }
  function goLang(lang) {
    var h = location.hash;
    if (lang === "ja" && !isJa) location.assign("ja/" + h);
    else if (lang === "en" && isJa) location.assign("../" + h);
  }
  langSel.value = isJa ? "ja" : "en";
  langSel.addEventListener("change", function () {
    try { localStorage.setItem(LANG_KEY, langSel.value); } catch (e) {}
    goLang(langSel.value);
  });
  // Auto-switch on arrival: a saved choice always wins; otherwise the
  // browser language decides only at the front door (/).
  (function autoLang() {
    var saved = savedLang();
    if (saved) {
      if ((saved === "ja") !== isJa) goLang(saved);
      return;
    }
    if (!isJa && browserLang() === "ja") goLang("ja");
  })();

  /* ---------- theme ---------- */
  var KEY = "gumicord-site-theme";
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".theme-switch button"));
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function currentTheme() {
    try { return localStorage.getItem(KEY) || "auto"; }
    catch (e) { return "auto"; }
  }
  function applyTheme(mode) {
    var darkOn = mode === "dark" || (mode === "auto" && media.matches);
    document.documentElement.setAttribute("data-theme", darkOn ? "dark" : "light");
    try { document.documentElement.style.colorScheme = darkOn ? "dark" : "light"; } catch (e) {}
    buttons.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-mode") === mode ? "true" : "false");
    });
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var mode = b.getAttribute("data-mode");
      try { localStorage.setItem(KEY, mode); } catch (e) {}
      applyTheme(mode);
    });
  });
  if (media.addEventListener) {
    media.addEventListener("change", function () { if (currentTheme() === "auto") applyTheme("auto"); });
  }
  applyTheme(currentTheme());
})();
