const THEME_KEY = 'portfolio-theme';
const CONTACT_ENDPOINT = 'https://formsubmit.co/ajax/fahad@thedevnation.com';

const body = document.body;
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const contactSection = document.getElementById('contact');
const contactTriggers = document.querySelectorAll('.js-scroll-contact');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  root.classList.toggle('dark-mode', isDark);
  body.classList.toggle('dark-mode', isDark);
  body.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
};

const setTheme = (theme) => {
  applyTheme(theme);
  localStorage.setItem(THEME_KEY, theme);
};

applyTheme(getPreferredTheme());

themeToggle?.addEventListener('click', () => {
  const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
  setTheme(nextTheme);
});

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const handleSystemThemeChange = (event) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
};

if (typeof mediaQuery.addEventListener === 'function') {
  mediaQuery.addEventListener('change', handleSystemThemeChange);
} else if (typeof mediaQuery.addListener === 'function') {
  mediaQuery.addListener(handleSystemThemeChange);
}

contactTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const formData = new FormData(contactForm);

  formStatus.textContent = 'Sending your message...';
  formStatus.className = 'form-status';
  submitButton.disabled = true;

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });

    if (!response.ok) throw new Error('Submission failed');

    formStatus.textContent = 'Thanks! Your message was sent successfully.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = 'Sorry, we could not send your message right now. Please try again.';
    formStatus.className = 'form-status error';
  } finally {
    submitButton.disabled = false;
  }
});
