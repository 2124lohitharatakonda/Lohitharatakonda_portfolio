/* ============================================================
   LOHITHA SAI PRIYA RATAKONDA — Portfolio Scripts
   ============================================================ */

/* ---- 1. NAVBAR scroll shadow ---- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---- 2. MOBILE hamburger menu ---- */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
hbg.addEventListener('click', () => {
  hbg.classList.toggle('open');
  mob.classList.toggle('open');
});
mob.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hbg.classList.remove('open');
    mob.classList.remove('open');
  });
});

/* ---- 3. SCROLL REVEAL — triggers every time element enters view ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const siblings = Array.from(el.parentElement.querySelectorAll('.reveal'));
      const index = siblings.indexOf(el);
      el.style.transitionDelay = (index * 0.07) + 's';
      el.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
      entry.target.style.transitionDelay = '0s';
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- 4. DIRECTIONAL reveals — every time (up / left / right) ---- */
const dirObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => dirObserver.observe(el));

/* ---- 5. ACTIVE NAV link on scroll ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const a = document.querySelector('.nav-links a[href="#' + e.target.id + '"]');
      if (a) a.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => activeObserver.observe(s));
