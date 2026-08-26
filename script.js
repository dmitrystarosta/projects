/* =========================================================================
   Проекты Дмитрия Старосты — script.js
   Общий скрипт для всех страниц: меню, согласие на веб-аналитику, Метрика.
   ========================================================================= */
(function () {
  'use strict';

  /* ---------- Яндекс.Метрика ----------
     Счётчик грузится ТОЛЬКО после нажатия «Принять» (см. политику конфиденциальности).
     ID и параметры — как в коде счётчика Яндекса (включая webvisor).                    */
  var METRIKA_ID = 111971624;

  function initMetrika() {
    if (!METRIKA_ID) return;               // ID не задан — ничего не грузим
    if (window.__ymLoaded) return;         // не грузим повторно
    window.__ymLoaded = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < e.scripts.length; j++) { if (e.scripts[j].src === r) return; }
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js?id=' + METRIKA_ID, 'ym');
    window.ym(METRIKA_ID, 'init', {
      ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer",
      referrer: document.referrer, url: location.href,
      accurateTrackBounce: true, trackLinks: true
    });
  }

  /* ---------- Согласие на аналитику ---------- */
  var KEY = 'cookie-consent';
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.querySelector('.cookie');
    var consent = getConsent();

    if (consent === 'accepted') {
      initMetrika();
    } else if (banner) {
      banner.classList.add('show');
    }

    if (banner) {
      var accept = banner.querySelector('.cc-accept');
      if (accept) accept.addEventListener('click', function () {
        setConsent('accepted'); banner.classList.remove('show'); initMetrika();
      });
    }

    /* ---------- Выпадающее меню (только на главной) ---------- */
    var btn = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.site-menu');
    var scrim = document.querySelector('.scrim');
    if (btn && menu) {
      var setOpen = function (open) {
        btn.setAttribute('aria-expanded', String(open));
        btn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
        menu.classList.toggle('open', open);
        if (scrim) { scrim.hidden = false; scrim.classList.toggle('open', open); }
        document.body.style.overflow = open ? 'hidden' : '';
      };
      btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
      menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
      if (scrim) scrim.addEventListener('click', function () { setOpen(false); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    }
  });
})();
