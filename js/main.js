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

/* ---- 5. SCROLL PROGRESS BAR ---- */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((window.scrollY / total) * 100) + '%';
}, { passive: true });

/* ---- 6. HERO MOUSE GLOW ---- */
const heroSection = document.getElementById('home');
const heroGlow = document.querySelector('.hero-glow');
if (heroSection && heroGlow) {
  heroSection.addEventListener('mousemove', e => {
    const r = heroSection.getBoundingClientRect();
    heroSection.style.setProperty('--gx', (e.clientX - r.left) + 'px');
    heroSection.style.setProperty('--gy', (e.clientY - r.top) + 'px');
  });
}

/* ---- 7. FLOATING PARTICLES in hero ---- */
const particleContainer = document.getElementById('heroParticles');
if (particleContainer) {
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'hero-particle';
    const size = Math.random() * 6 + 3;
    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 12 + 8}s;
      animation-delay:${Math.random() * 10}s;
      opacity:0;
    `;
    particleContainer.appendChild(p);
  }
}

/* ---- 8. TYPEWRITER on hero role ---- */
const roleEl = document.querySelector('.hero-role');
if (roleEl) {
  const roles = [
    'Software Engineer',
    'AI & ML Engineer',
    'Full-Stack Developer',
    'Published Researcher',
    'Cloud Architect'
  ];
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  roleEl.textContent = '';
  roleEl.appendChild(cursor);

  let ri = 0, ci = 0, deleting = false;
  let textNode = document.createTextNode('');
  roleEl.insertBefore(textNode, cursor);

  function typeStep() {
    const word = roles[ri];
    if (!deleting) {
      ci++;
      textNode.textContent = word.slice(0, ci);
      if (ci >= word.length) {
        deleting = true;
        setTimeout(typeStep, 1800);
        return;
      }
    } else {
      ci--;
      textNode.textContent = word.slice(0, ci);
      if (ci <= 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        ci = 0;
      }
    }
    setTimeout(typeStep, deleting ? 55 : 95);
  }
  setTimeout(typeStep, 3200);
}

/* ---- 9. GITHUB CARD CLICK ---- */
document.querySelectorAll('.card--github-link').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    window.open(card.dataset.github, '_blank', 'noopener,noreferrer');
  });
});

/* ---- 10a. 3D TILT on project & skill cards (desktop only) ---- */
const isTouchDevice = window.matchMedia('(hover: none)').matches;
if (!isTouchDevice) document.querySelectorAll('.proj-grid .card, #skills .card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y - r.height / 2) / r.height) * 10;
    const ry = ((x - r.width  / 2) / r.width)  * -10;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});  // end if (!isTouchDevice)

/* ---- 10b. SKILL TAG stagger pop-in ---- */
document.querySelectorAll('#skills .tag').forEach(tag => tag.classList.add('tag-animate'));
const tagObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const tags = entry.target.querySelectorAll('.tag-animate');
      tags.forEach((t, i) => setTimeout(() => t.classList.add('tag-visible'), i * 60));
    } else {
      entry.target.querySelectorAll('.tag-animate').forEach(t => t.classList.remove('tag-visible'));
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('#skills .card').forEach(card => tagObserver.observe(card));

/* ---- 11. ACTIVE NAV link on scroll ---- */
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
