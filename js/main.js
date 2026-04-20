/* ============================================
   OLD IRON LIFTING — Global JS
   ============================================ */

(function () {
  'use strict';

  // ─── Scrolled nav ────────────────────────────
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ─── Mobile nav toggle ───────────────────────
  const toggle = document.querySelector('.nav-toggle');
  const drawer = document.querySelector('.nav-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = toggle.classList.toggle('open');
      drawer.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on drawer link click
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !drawer.contains(e.target)) {
        toggle.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Active nav link ─────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ─── Intersection Observer: fade-in ──────────
  const observerOpts = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOpts);

  // Add fade-in class to elements we want to animate
  const animateSelectors = [
    '.lift-card',
    '.tool-card',
    '.philosophy-text',
    '.hero-stats',
  ];

  animateSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = `${i * 80}ms`;
      el.classList.add('fade-up');
      observer.observe(el);
    });
  });

  // Inject the fade-up styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .fade-up {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .fade-up.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

})();
