'use strict';

/* ── 1. NAVBAR : scroll state ───────────────────────────────────── */
const navbar = document.getElementById('navbar');

function updateNavbar() {
  const isLegalPage = document.querySelector('.legal-page');
  // On legal pages, always keep scrolled state; on other pages, toggle based on scroll
  if (isLegalPage) {
    navbar.classList.add('is-scrolled');
    navbar.classList.add('legal-page-navbar');
  } else {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
    navbar.classList.remove('legal-page-navbar');
  }
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ── 2. MOBILE MENU ─────────────────────────────────────────────── */
const burger     = document.getElementById('navbar-burger');
const mobileMenu = document.getElementById('mobile-menu');

burger.addEventListener('click', () => {
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  const nowOpen = !isOpen;

  burger.setAttribute('aria-expanded', nowOpen);
  mobileMenu.setAttribute('aria-hidden', !nowOpen);
  burger.classList.toggle('is-open', nowOpen);
  mobileMenu.classList.toggle('is-open', nowOpen);
  burger.setAttribute('aria-label', nowOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

// Ferme le menu quand un lien est cliqué
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  });
});

/* ── 3. NAV LINKS ACTIFS (IntersectionObserver) ─────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navbar__links a, .mobile-menu a[href^="#"]');

const navbarHeightPx = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue('--navbar-height') || '72',
  10
);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  {
    rootMargin: `-${navbarHeightPx}px 0px -55% 0px`,
    threshold: 0,
  }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── 4. SCROLL ANIMATIONS ───────────────────────────────────────── */
const animateEls = document.querySelectorAll('[data-animate]');

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.10 }
);

animateEls.forEach(el => animObserver.observe(el));

/* ── 5. CONTACT FORM ────────────────────────────────────────────── */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        showSuccess();
      } else {
        const data = await response.json().catch(() => ({}));
        const msg = data?.errors?.[0]?.message || null;
        showError(msg);
      }
    } catch {
      showError(null);
    } finally {
      setLoading(false);
    }
  });
}

function validateForm() {
  let valid = true;

  // Clear previous errors
  document.querySelectorAll('.form-error').forEach(el => { el.textContent = ''; });
  document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const message = document.getElementById('message');

  if (!name.value.trim()) {
    setFieldError(name, 'name-error', 'Veuillez saisir votre nom.');
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim() || !emailPattern.test(email.value)) {
    setFieldError(email, 'email-error', 'Adresse email invalide.');
    valid = false;
  }

  if (message.value.trim().length < 10) {
    setFieldError(message, 'message-error', 'Le message doit contenir au moins 10 caractères.');
    valid = false;
  }

  if (!valid) {
    // Scroll to first error
    const firstInvalid = form.querySelector('.is-invalid');
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus();
    }
  }

  return valid;
}

function setFieldError(input, errorId, message) {
  input.classList.add('is-invalid');
  input.setAttribute('aria-invalid', 'true');
  const el = document.getElementById(errorId);
  if (el) el.textContent = message;
}

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitBtn.querySelector('.submit-btn__text').hidden = isLoading;
  submitBtn.querySelector('.submit-btn__loading').hidden = !isLoading;
}

function showSuccess() {
  form.reset();
  document.getElementById('form-success').hidden = false;
  document.getElementById('form-error-global').hidden = true;
  document.getElementById('form-success').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(msg) {
  const el = document.getElementById('form-error-global');
  el.hidden = false;
  el.textContent = msg ||
    "Une erreur s'est produite. Réessayez ou contactez-nous directement par email.";
}

// Efface l'erreur d'un champ quand l'utilisateur retape
['name', 'email', 'message'].forEach(id => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener('input', () => {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    const errorEl = document.getElementById(`${id}-error`);
    if (errorEl) errorEl.textContent = '';
  });
});

/* ── 6. SMOOTH SCROLL (fallback pour ancres natives) ────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
