/* =========================================================================
   Cabinet PhysiO2 — scripts du site
   Aucune dépendance externe.
   ========================================================================= */
(function () {
  'use strict';

  var doc = document;

  /* --- 1. Header : état au scroll ---------------------------------------- */
  var header = doc.querySelector('.site-header');
  var mobileBar = doc.querySelector('.mobile-bar');
  var lastKnown = 0;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (mobileBar) mobileBar.classList.toggle('is-visible', y > 420);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    lastKnown = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* --- 2. Menu mobile ----------------------------------------------------- */
  var navToggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('main-nav');

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* --- 3. Modale « Prendre rendez-vous » ---------------------------------- */
  var modal = doc.getElementById('rdv-modal');
  var lastFocused = null;

  function focusable() {
    if (!modal) return [];
    return Array.prototype.slice.call(
      modal.querySelectorAll('a[href], button:not([disabled])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function openModal() {
    if (!modal) return;
    lastFocused = doc.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    doc.body.classList.add('is-locked');
    closeNav();
    var f = focusable();
    if (f.length) f[0].focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    doc.body.classList.remove('is-locked');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  doc.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-rdv]');
    if (trigger) {
      e.preventDefault();
      openModal();
      return;
    }
    if (e.target.closest('[data-close-modal]')) {
      e.preventDefault();
      closeModal();
    }
  });

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  doc.addEventListener('keydown', function (e) {
    if (!modal || !modal.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      closeModal();
      return;
    }

    if (e.key === 'Tab') {
      var f = focusable();
      if (!f.length) return;
      var first = f[0];
      var last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && doc.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* --- 4. Apparition au scroll -------------------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = doc.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* --- 5. Carte Google : chargement différé -------------------------------- */
  var mapFrame = doc.querySelector('[data-map]');
  if (mapFrame && 'IntersectionObserver' in window) {
    var mio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var iframe = entry.target.querySelector('iframe[data-src]');
          if (iframe) {
            iframe.src = iframe.getAttribute('data-src');
            iframe.removeAttribute('data-src');
          }
          mio.unobserve(entry.target);
        }
      });
    }, { rootMargin: '250px' });
    mio.observe(mapFrame);
  } else if (mapFrame) {
    var f2 = mapFrame.querySelector('iframe[data-src]');
    if (f2) f2.src = f2.getAttribute('data-src');
  }
})();
