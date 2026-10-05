/* Bir İZ Derneği — Demo JS (bağımlılık yok) */
(function () {
  "use strict";

  /* Mobil menü */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* Masaüstü alt menü (Hakkımızda ▾) */
  document.querySelectorAll(".has-sub").forEach(function (item) {
    var btn = item.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!item.contains(e.target)) { item.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { item.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  });

  /* Footer yılı */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Sayaç animasyonu (istatistikler). Sayıyı değiştirmek için HTML'deki data-count değerini düzenleyin. */
  var counters = document.querySelectorAll("[data-count]");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function fmt(n) { return n.toLocaleString("tr-TR"); }
  function run(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduce || target < 10) { el.textContent = fmt(target); return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
      }, { threshold: 0.4 });
      counters.forEach(function (c) { io.observe(c); });
    } else { counters.forEach(run); }
  }

  /* Proje filtresi (tema + durum) */
  var grid = document.getElementById("project-grid");
  if (grid) {
    var state = { tema: "all", durum: "all" };
    var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-tema]"));
    var countEl = document.getElementById("filter-count");
    var empty = document.getElementById("empty-state");

    // URL'den ön seçim: projeler.html?tema=goc
    var params = new URLSearchParams(window.location.search);
    if (params.get("tema")) state.tema = params.get("tema");
    if (params.get("durum")) state.durum = params.get("durum");

    function apply() {
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (state.tema === "all" || c.getAttribute("data-tema") === state.tema) &&
                 (state.durum === "all" || c.getAttribute("data-durum") === state.durum);
        c.hidden = !ok;
        if (ok) shown++;
      });
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        var g = b.getAttribute("data-group"), v = b.getAttribute("data-value");
        b.setAttribute("aria-pressed", state[g] === v ? "true" : "false");
      });
      if (countEl) countEl.textContent = shown + " proje listeleniyor";
      if (empty) empty.style.display = shown ? "none" : "block";
    }
    document.querySelectorAll(".filter-btn").forEach(function (b) {
      b.addEventListener("click", function () {
        state[b.getAttribute("data-group")] = b.getAttribute("data-value");
        apply();
      });
    });
    apply();
  }

  /* İletişim formu — yalnızca ön yüz; gönderim yok */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;
      form.querySelectorAll("[required]").forEach(function (inp) {
        var field = inp.closest(".field") || inp.closest(".check");
        var ok = inp.type === "checkbox" ? inp.checked : inp.value.trim() !== "";
        if (ok && inp.type === "email") ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
        if (field) field.classList.toggle("invalid", !ok);
        if (!ok && valid) { inp.focus(); valid = false; }
      });
      if (!valid) return;
      var success = document.getElementById("form-success");
      form.hidden = true;
      if (success) { success.classList.add("show"); success.setAttribute("tabindex", "-1"); success.focus(); }
    });
    var reset = document.getElementById("form-reset");
    if (reset) reset.addEventListener("click", function () {
      form.reset(); form.hidden = false;
      document.getElementById("form-success").classList.remove("show");
      form.querySelector("input").focus();
    });
  }

  /* IBAN kopyala */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy") || "";
      var label = btn.querySelector("span");
      var done = function () { if (label) { var o = label.textContent; label.textContent = "Kopyalandı"; setTimeout(function () { label.textContent = o; }, 1800); } };
      if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, done); }
      else {
        var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); } catch (err) {} document.body.removeChild(ta); done();
      }
    });
  });
})();
