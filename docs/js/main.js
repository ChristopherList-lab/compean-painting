// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Sticky nav shadow
const nav = document.querySelector('.nav');
addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 8);
}, { passive: true });

// Scroll reveal (skipped for reduced motion via CSS)
const io = new IntersectionObserver((entries) => {
  for (const en of entries) {
    if (en.isIntersecting) {
      en.target.classList.add('in');
      io.unobserve(en.target);
    }
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Estimate form — submit to Netlify without leaving the page
const form = document.querySelector('form[name="estimate"]');
if (form) {
  const btn = form.querySelector('button[type="submit"]');
  const errorBox = document.getElementById('formError');
  const success = document.getElementById('quoteSuccess');
  const btnLabel = btn.textContent;

  // clear the invalid highlight as soon as a field is corrected
  form.addEventListener('input', (e) => e.target.classList.remove('invalid'));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.hidden = true;

    // validate required fields ourselves so we can style them
    const missing = [...form.querySelectorAll('[required]')].filter((f) => !f.value.trim());
    const email = form.querySelector('#f-email');
    if (email.value && !email.checkValidity()) missing.push(email);
    if (missing.length) {
      missing.forEach((f) => f.classList.add('invalid'));
      missing[0].focus();
      return;
    }

    btn.setAttribute('aria-busy', 'true');
    btn.textContent = 'Sending…';

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error('status ' + res.status);

      const first = (form.querySelector('#f-name').value.trim().split(/\s+/)[0]) || 'there';
      document.getElementById('successName').textContent = first;
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      btn.removeAttribute('aria-busy');
      btn.textContent = btnLabel;
      errorBox.hidden = false;
    }
  });
}
