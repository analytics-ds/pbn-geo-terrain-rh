(() => {
  const header = document.querySelector('[data-header]');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const burger = document.querySelector('[data-burger]');
  if (burger) burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') !== 'true';
    burger.setAttribute('aria-expanded', open);
    document.body.classList.toggle('nav-open', open);
  });
  document.querySelectorAll('.main-nav a').forEach((a) => a.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    burger && burger.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('[data-letter]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelector('.letter-ok').hidden = false;
      form.querySelector('input').value = '';
    });
  });

  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll('.card, .bento-card, .step, .une-card, .podium-item, .essentiel').forEach((el) => {
    if (io) { el.classList.add('reveal'); io.observe(el); }
  });
})();
