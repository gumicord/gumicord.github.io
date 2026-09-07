/* Language (ja/en), site theme (light/dark/auto) and mock theme demo. */
(function () {
  "use strict";

  var STR = {
    "nav.demo": { ja: "試す", en: "Try" },
    "nav.features": { ja: "特徴", en: "Features" },
    "nav.download": { ja: "ダウンロード", en: "Download" },
    "hero.eyebrow": { ja: "Discordを、もっと自分好みに", en: "Discord, much more you" },
    "hero.tagline": {
      ja: "好きな見た目、好きな機能、好きなデバイスで。重いクライアントにさよならして、軽くてかわいい毎日へ。",
      en: "Your look, your features, your devices. Say goodbye to heavy clients and hello to light, lovely days."
    },
    "hero.dl": { ja: "無料でダウンロード", en: "Download free" },
    "hero.try": { ja: "テーマを試す", en: "Try themes" },
    "demo.title": { ja: "着せ替え、してみる？", en: "Fancy a new outfit?" },
    "demo.lede": {
      ja: "色を押すと、この見本のチャットがその場で着替える。実際のアプリではこんな感じに一瞬で変わる。",
      en: "Tap a color and this sample chat changes on the spot. The real app switches just like this, instantly."
    },
    "demo.midnight": { ja: "ミッドナイト", en: "Midnight" },
    "demo.sakura": { ja: "さくら", en: "Sakura" },
    "demo.mint": { ja: "ミント", en: "Mint" },
    "demo.honey": { ja: "はちみつ", en: "Honey" },
    "demo.general": { ja: "ざつだん", en: "general" },
    "demo.bot": { ja: "botあそび", en: "bot-play" },
    "demo.theme": { ja: "テーマじまん", en: "theme-showoff" },
    "demo.m1": { ja: "新しいテーマ入れたよ〜！見て見て", en: "Got a new theme! Look look!" },
    "demo.m2": { ja: "かわいい！うちはミントにした", en: "Cute! I went with mint" },
    "demo.m3": { ja: "軽いから古いPCでもサクサクだね", en: "So light it flies even on my old PC" },
    "demo.input": { ja: "メッセージを送信", en: "Send a message" },
    "feat.title": { ja: "うれしいこと", en: "Why you'll love it" },
    "feat.theme.t": { ja: "見た目を変える", en: "Change the look" },
    "feat.theme.d": {
      ja: "壁紙を敷いたり、色を塗り替えたり。気分で着替えて、友だちに自慢しよう。",
      en: "Lay down a wallpaper, repaint the colors. Dress it up by mood and show your friends."
    },
    "feat.plugin.t": { ja: "機能を足せる", en: "Add features" },
    "feat.plugin.d": {
      ja: "便利機能は後から追加。変なものは入る前に止まるから安心。",
      en: "Add handy features later. Shady ones get stopped before they get in."
    },
    "feat.perf.t": { ja: "軽くて速い", en: "Light and fast" },
    "feat.perf.d": {
      ja: "起動は一瞬、動作はサクサク。古いPCやスマホでも快適に。",
      en: "Starts in a blink, runs buttery smooth. Comfy even on old PCs and phones."
    },
    "feat.dev.t": { ja: "どこでも同じ", en: "Same everywhere" },
    "feat.dev.d": {
      ja: "パソコンでもスマホでも、見た目も使い心地もそのまま。",
      en: "Desktop or phone, the look and feel come along."
    },
    "feat.more": { ja: "作る人向けの詳しい説明 →", en: "Details for makers →" },
    "dl.title": { ja: "ダウンロード", en: "Download" },
    "dl.body": {
      ja: "開発版を配布中。Windows・macOS・Linux・Android・iOS 用が入っている。ログインは携帯の Discord アプリで QR を読むだけ。",
      en: "Development builds available. Windows, macOS, Linux, Android and iOS included. Sign in by scanning a QR code with the Discord app on your phone."
    },
    "dl.btn": { ja: "リリース一覧を開く", en: "Open releases" },
    "dl.warn": {
      ja: "サードパーティ製クライアントの利用は Discord の利用規約に反し、アカウントを失う可能性があります。自己責任でどうぞ。",
      en: "Third-party clients break Discord's terms of service and can cost you your account. Use at your own risk."
    },
    "foot.disc": { ja: "Discord とは関係ありません。", en: "Not affiliated with Discord." }
  };

  var TITLE = {
    ja: "Gumicord — Discordを、もっと自分好みに",
    en: "Gumicord — Discord, much more you"
  };

  /* ---------- language ---------- */
  var langSel = document.getElementById("lang-select");
  function currentLang() {
    try {
      var saved = null;
      try { saved = localStorage.getItem("gumicord-site-lang"); } catch (e) {}
      if (saved === "ja" || saved === "en") return saved;
      return (navigator.language || "ja").toLowerCase().indexOf("ja") === 0 ? "ja" : "en";
    } catch (e) { return "ja"; }
  }
  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.title = TITLE[lang];
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var t = STR[el.getAttribute("data-i18n")];
      if (t) el.textContent = t[lang];
    });
    langSel.value = lang;
  }
  langSel.addEventListener("change", function () {
    try { localStorage.setItem("gumicord-site-lang", langSel.value); } catch (e) {}
    applyLang(langSel.value);
  });
  applyLang(currentLang());

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

  /* ---------- mock theme demo ---------- */
  var mock = document.getElementById("mock");
  var swatches = Array.prototype.slice.call(document.querySelectorAll(".swatches button"));
  swatches.forEach(function (b) {
    b.addEventListener("click", function () {
      var name = b.getAttribute("data-theme-set");
      if (name === "midnight") {
        mock.removeAttribute("data-mock");
      } else {
        mock.setAttribute("data-mock", name);
      }
      swatches.forEach(function (o) {
        o.setAttribute("aria-pressed", o === b ? "true" : "false");
      });
    });
  });
})();
