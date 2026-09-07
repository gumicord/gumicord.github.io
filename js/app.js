/* Language (ja/en) and site theme (light/dark/auto) controls. */
(function () {
  "use strict";

  /* ---------- language (separate en/ja pages for SEO; / is English) ---------- */
  var langSel = document.getElementById("lang-select");
  var isJa = location.pathname.indexOf("/ja/") !== -1;
  langSel.value = isJa ? "ja" : "en";
  langSel.addEventListener("change", function () {
    var h = location.hash;
    if (langSel.value === "ja" && !isJa) {
      location.assign("ja/" + h);
    } else if (langSel.value === "en" && isJa) {
      location.assign("../" + h);
    }
  });

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
