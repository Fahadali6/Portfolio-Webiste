const THEME_KEY = 'portfolio-theme';
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
  const isDark = theme === 'dark';
  body.classList.toggle('dark-mode', isDark);
  body.setAttribute('data-theme', theme);
  themeToggle?.setAttribute('aria-pressed', String(isDark));
  themeToggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
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
mediaQuery.addEventListener('change', (event) => {
  if (!localStorage.getItem(THEME_KEY)) {
    applyTheme(event.matches ? 'dark' : 'light');
  }
});
