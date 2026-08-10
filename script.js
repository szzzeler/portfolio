const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.classList.toggle('active', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.classList.remove('active');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelector('[data-back]')?.addEventListener('click', () => {
  window.location.href = 'index.html#games';
});

const navLinks = [...document.querySelectorAll('[data-nav]')];
if (navLinks.length) {
  const navObserver = new IntersectionObserver((entries) => {
    const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!current) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.dataset.nav === current.target.id));
  }, { threshold: [0.25, 0.5, 0.75] });
  navLinks.map((link) => document.getElementById(link.dataset.nav)).filter(Boolean).forEach((section) => navObserver.observe(section));
}
