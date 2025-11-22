// Minimal JS: products dataset, render and filtering
const PRODUCTS = [
  {"id":1,"title":"Подарочный набор для кофемана","desc":"Ароматный кофе, ручная мельница и чашки.","price":85,"category":"home","occasion":["birthday","anniversary"],"recipient":["him","her","any"]},
  {"id":2,"title":"Романтический набор для пары","desc":"Свечи, шоколад и дизайнерская карточка.","price":120,"category":"premium","occasion":["romantic"],"recipient":["couple"]},
  {"id":3,"title":"Электронный гаджет для офиса","desc":"Беспроводная зарядка и умный блокнот.","price":65,"category":"gadgets","occasion":["corporate"],"recipient":["colleague","him","her"]},
  {"id":4,"title":"Подарок для коллеги","desc":"Стильная термокружка и набор для заметок.","price":35,"category":"premium","occasion":["corporate"],"recipient":["colleague"]},
  {"id":5,"title":"Набор хобби — арт","desc":"Акварельный набор авторского качества.","price":48,"category":"hobby","occasion":["birthday"],"recipient":["her","him"]},
  {"id":6,"title":"Детский развивающий набор","desc":"Креативные пазлы и книга-игра.","price":29,"category":"for-kids","occasion":["birthday"],"recipient":["kid"]},
  {"id":7,"title":"Премиальный аксессуар","desc":"Минималистичный кошелёк из натуральной кожи.","price":220,"category":"for-men","occasion":["anniversary"],"recipient":["him"]},
  {"id":8,"title":"Гаджет-органайзер","desc":"Элегантный органайзер для кабелей и аксессуаров.","price":40,"category":"gadgets","occasion":["any"],"recipient":["him","her","colleague"]},
  {"id":9,"title":"Набор для дома — ароматы","desc":"Авторские ароматы и диффузор.","price":150,"category":"home","occasion":["wedding","anniversary"],"recipient":["couple","her","him"]},
  {"id":10,"title":"Подарок для женщин — уход","desc":"Натуральный уходовый набор.","price":95,"category":"for-women","occasion":["birthday","romantic"],"recipient":["her"]},
  {"id":11,"title":"Подарочный набор путешественника","desc":"Дорожный набор премиум-класса.","price":180,"category":"premium","occasion":["birthday","wedding"],"recipient":["him","her"]},
  {"id":12,"title":"Креативный гаджет для дома","desc":"Умная лампа с управлением через приложение.","price":75,"category":"gadgets","occasion":["any"],"recipient":["any"]}
];

function formatPrice(p){ return p>=100? '€'+p : '€'+p; }

// Генерация абстрактных геометрических форм для плейсхолдеров
function generatePlaceholderSVG(title) {
  const shapes = [
    `<rect x="20" y="20" width="160" height="80" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>`,
    `<circle cx="100" cy="60" r="40" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>`,
    `<polygon points="100,20 180,80 20,80" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1"/>`,
    `<rect x="40" y="30" width="120" height="60" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="1" transform="rotate(45 100 60)"/>`
  ];
  
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return `
    <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img">
      <rect width="200" height="120" fill="rgba(10,10,10,0.5)"/>
      ${randomShape}
      <text x="100" y="65" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="14" fill="rgba(212,175,55,0.7)">${title.split(' ')[0]}</text>
    </svg>
  `;
}

function createCard(p){
  const el = document.createElement('article');
  el.className = 'product fade-in';
  el.innerHTML = `
    <div class="img" aria-hidden="true">
      ${generatePlaceholderSVG(p.title)}
    </div>
    <h3>${p.title}</h3>
    <p>${p.desc}</p>
    <div class="actions">
      <div class="price">${formatPrice(p.price)}</div>
      <div>
        <button class="btn" onclick="alert('Добавлено в корзину: ${p.title.replace(/'/g,'\'')}')">Добавить</button>
        <button class="link-ghost" onclick="showDetails(${p.id})">Подробнее</button>
      </div>
    </div>
  `;
  return el;
}

function renderGrid(list, containerId){
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  if(!list.length){ 
    container.innerHTML = '<p class="muted" style="text-align:center;grid-column:1/-1;padding:40px;">Ничего не найдено по заданным фильтрам.</p>'; 
    return; 
  }
  list.forEach(p => container.appendChild(createCard(p)));
  // Активируем анимации появления
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

function applyFilters(){
  const occ = document.getElementById('occasion').value;
  const rec = document.getElementById('recipient').value;
  const price = document.getElementById('priceRange').value;
  const cat = document.getElementById('category').value;

  let result = PRODUCTS.slice();

  if(cat !== 'any') result = result.filter(r => r.category === cat);
  if(occ !== 'any') result = result.filter(r => r.occasion.includes(occ) || r.occasion.includes('any'));
  if(rec !== 'any') result = result.filter(r => r.recipient.includes(rec) || r.recipient.includes('any'));
  if(price !== 'any'){
    if(price === '300+') result = result.filter(r => r.price >= 300);
    else {
      const [min,max] = price.split('-').map(Number);
      result = result.filter(r => r.price >= min && r.price <= (max===0?9999:max));
    }
  }
  // render into showcase (top picks) and full catalog
  renderGrid(result.slice(0,4), 'showcase');
  renderGrid(result, 'catalogGrid');
  // smooth scroll to results
  document.getElementById('catalog').scrollIntoView({behavior:'smooth'});
}

function resetFilters(){
  document.getElementById('filterForm').reset();
  renderGrid(PRODUCTS.slice(0,8), 'catalogGrid');
  renderGrid(PRODUCTS.slice(0,3), 'showcase');
}

function showDetails(id){
  const p = PRODUCTS.find(x=>x.id===id);
  alert(p.title + "\n\n" + p.desc + "\nЦена: " + formatPrice(p.price));
}

// Анимация появления элементов при скролле
function checkVisibility() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

document.getElementById('apply').addEventListener('click', applyFilters);
document.getElementById('reset').addEventListener('click', resetFilters);

window.addEventListener('load', ()=>{ 
  resetFilters(); 
  // Запускаем проверку видимости после загрузки
  setTimeout(checkVisibility, 500);
});

window.addEventListener('scroll', checkVisibility);