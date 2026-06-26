const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const createParticles = () => {
  const field = document.querySelector('.particle-field');
  if (!field || prefersReducedMotion) return;

  const count = 40;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${8 + Math.random() * 8}s`;
    field.appendChild(particle);
  }
};

const revealItems = () => {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  items.forEach((item) => observer.observe(item));
};

const animateCounters = () => {
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const counter = entry.target;
        const target = Number(counter.dataset.target || 0);
        const duration = 1400;
        const startTime = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.round(target * eased);
          counter.textContent = value.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(tick);
        obs.unobserve(counter);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
};

const handleScrollProgress = () => {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  bar.style.width = `${progress * 100}%`;
};

const attachTilt = () => {
  const cards = document.querySelectorAll('[data-tilt]');
  if (prefersReducedMotion) return;

  cards.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 8;
      const rotateX = (0.5 - y) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });
};

const attachSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

const handlePointerGlow = () => {
  const hero = document.querySelector('.hero-visual');
  if (!hero || prefersReducedMotion) return;

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--pointer-x', `${x}%`);
    hero.style.setProperty('--pointer-y', `${y}%`);
  });
};

const applyPointerGlow = () => {
  const hero = document.querySelector('.hero-visual');
  if (!hero) return;
  hero.style.setProperty('--pointer-x', '50%');
  hero.style.setProperty('--pointer-y', '50%');
};

window.addEventListener('DOMContentLoaded', () => {
  createParticles();
  revealItems();
  animateCounters();
  attachTilt();
  attachSmoothScroll();
  handlePointerGlow();
  applyPointerGlow();
  handleScrollProgress();
});

window.addEventListener('scroll', handleScrollProgress, { passive: true });
