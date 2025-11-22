// FULL MAIN.JS (PREMIUM LUXURY VERSION)
const burger = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
if (burger) { burger.addEventListener('click', () => { navMenu.classList.toggle('open'); }); }

const products = [
  { title: "Пальто 'Верона'", price: '52 000 ₽' },
  { title: "Шарф 'Латте'", price: '12 900 ₽' },
  { title: "Платье 'Эстель'", price: '38 500 ₽' }
];

const newGrid = document.getElementById('newItemsGrid');
if (newGrid) {
  newGrid.innerHTML = products.map(p => `
    <div class="lookbook-item">
      Здесь будет фото: ${p.title}<br><br>
      <strong>${p.title}</strong><br>
      <span>${p.price}</span>
    </div>
  `).join('');
}

const catalogGrid = document.getElementById('catalogGrid');
if (catalogGrid) {
  catalogGrid.innerHTML = products.map(p => `
    <div class="lookbook-item">
      Фото: ${p.title}<br><br>
      <strong>${p.title}</strong><br>
      <span>${p.price}</span>
    </div>
  `).join('');
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Ваше сообщение отправлено! Мы свяжемся с вами.');
    contactForm.reset();
  });
}
