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

  const car = document.querySelector('[data-carousel]');
  if (car) {
    const slides = [...car.querySelectorAll('[data-slide]')];
    const texts = [...car.querySelectorAll('[data-text]')];
    let i = 0, timer;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      texts.forEach((t, k) => t.classList.toggle('is-active', k === i));
    };
    const auto = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 6500); };
    car.querySelector('[data-prev]')?.addEventListener('click', () => { show(i - 1); auto(); });
    car.querySelector('[data-next]')?.addEventListener('click', () => { show(i + 1); auto(); });
    if (slides.length > 1) auto();
  }

  document.querySelectorAll('[data-tabs]').forEach((wrap) => {
    const tabs = [...wrap.querySelectorAll('[data-tab]')];
    tabs.forEach((tab) => {
      tab.querySelector('.tab-label').addEventListener('click', () => {
        tabs.forEach((t) => {
          const on = t === tab;
          t.classList.toggle('is-open', on);
          t.querySelector('.tab-label').setAttribute('aria-expanded', on);
        });
      });
    });
  });

  document.querySelectorAll('[data-letter]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelector('.letter-ok').hidden = false;
      form.querySelector('input').value = '';
    });
  });

  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { threshold: 0.15 }) : null;
  document.querySelectorAll('.card, .duo-card, .stat, .tab, .podium-item, .essentiel').forEach((el) => {
    if (io) { el.classList.add('reveal'); io.observe(el); }
  });
})();
