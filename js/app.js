/* Language (ja/en) and color theme (light/dark/auto) controls. */
(function () {
  "use strict";

  var STR = {
    "nav.features": { ja: "機能", en: "Features" },
    "nav.download": { ja: "ダウンロード", en: "Download" },
    "nav.docs": { ja: "ドキュメント", en: "Docs" },
    "hero.eyebrow": { ja: "サードパーティ製 Discord クライアント", en: "Third-party Discord client" },
    "hero.tagline": {
      ja: "テーマとプラグインで、自分好みの Discord を。Windows・macOS・Linux・Android・iOS の5環境で同じ見た目・同じ挙動を目指す、自前レンダラのクライアント。",
      en: "Discord, your way, with themes and plugins. A custom-renderer client aiming for identical looks and behavior on Windows, macOS, Linux, Android and iOS."
    },
    "hero.warn": {
      ja: "警告：サードパーティ製クライアントでの接続は Discord の利用規約に反し、アカウントを失う可能性があります。",
      en: "Warning: connecting with a third-party client breaks Discord's terms of service and can cost you your account."
    },
    "hero.dl": { ja: "ナイトリー版を入手", en: "Get nightly builds" },
    "hero.docs": { ja: "ドキュメントを見る", en: "View docs" },
    "feat.title": { ja: "機能", en: "Features" },
    "feat.theme.t": { ja: "テーマは JSON", en: "Themes in JSON" },
    "feat.theme.d": {
      ja: "CSS は不要。書いたら即反映され、壊れた箇所だけ無視される。5環境で見た目の差なく適用される。",
      en: "No CSS. Applies instantly, ignores only broken spots, and looks the same on all five platforms."
    },
    "feat.plugin.t": { ja: "プラグインは TypeScript", en: "Plugins in TypeScript" },
    "feat.plugin.d": {
      ja: "画面部品を安定 ID で指名して変形を登録。隔離実行と承認制で、暴走しても本体は止まらない。",
      en: "Register transforms on stable IDs. Isolated and permission-gated, so a runaway plugin never kills the app."
    },
    "feat.perf.t": { ja: "軽量・高速を目指す", en: "Light and fast by design" },
    "feat.perf.d": {
      ja: "Rust + wgpu の自前レンダラ。Electron より小さい常駐・速い起動を目標に、計測駆動で開発している。",
      en: "Hand-rolled Rust + wgpu renderer. Developed measurement-first toward smaller footprint and faster startup than Electron."
    },
    "feat.ime.t": { ja: "日本語入力", en: "Japanese input" },
    "feat.ime.d": {
      ja: "インライン変換で打って送信。各環境の標準入力経路を使う。",
      en: "Type with inline conversion and send. Uses each platform's native input path."
    },
    "feat.perm.t": { ja: "権限は宣言制", en: "Declared permissions" },
    "feat.perm.d": {
      ja: "使える道具は宣言した能力だけ。初見は承認窓が出て、許可するまで動かない。",
      en: "Only declared capabilities are injected. First-seen permissions ask approval and stay off until granted."
    },
    "feat.oss.t": { ja: "オープンソース", en: "Open source" },
    "feat.oss.d": {
      ja: "MIT ライセンス。仕様書を正本とする仕様駆動開発で作っている。",
      en: "MIT licensed. Built spec-first, with the spec as source of truth."
    },
    "code.title": { ja: "こんなふうに書く", en: "Written like this" },
    "dl.title": { ja: "ダウンロード", en: "Download" },
    "dl.body": {
      ja: "開発版のナイトリーリリースを配布中。Windows（exe）・macOS（dmg）・Linux（AppImage）・Android（APK）・iOS（未署名 IPA）が入っている。",
      en: "Nightly development releases. Windows (exe), macOS (dmg), Linux (AppImage), Android (APK) and iOS (unsigned IPA) included."
    },
    "dl.btn": { ja: "リリース一覧を開く", en: "Open releases" },
    "dl.login": {
      ja: "ログインは QR コードを携帯の Discord アプリで読む方式。初回起動時は案内に従うこと。",
      en: "Sign in by scanning a QR code with the Discord app on your phone. Follow the on-screen guide on first launch."
    },
    "dl.warn": {
      ja: "サードパーティ製クライアントの利用は自己責任です。",
      en: "Using a third-party client is at your own risk."
    },
    "docs.title": { ja: "ドキュメント", en: "Documentation" },
    "docs.api.t": { ja: "API ドキュメント", en: "API docs" },
    "docs.api.d": {
      ja: "テーマ・プラグイン作者向けリファレンス（日英）。",
      en: "Theme and plugin author reference (Japanese/English)."
    },
    "docs.repo.t": { ja: "ソースコード", en: "Source code" },
    "docs.repo.d": {
      ja: "本体・ドキュメント・ナイトリー配布のリポジトリ。",
      en: "App, docs and nightly distribution repositories."
    }
  };

  var TITLE = {
    ja: "Gumicord — 自分好みの Discord クライアント",
    en: "Gumicord — Discord, your way"
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
  var prismLight = document.getElementById("prism-light");
  var prismDark = document.getElementById("prism-dark");
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
    if (prismLight) prismLight.disabled = darkOn;
    if (prismDark) prismDark.disabled = !darkOn;
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
