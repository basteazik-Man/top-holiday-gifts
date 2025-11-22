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

function createCard(p){
  const el = document.createElement('article');
  el.className = 'product';
  el.innerHTML = `
    <div class="img" aria-hidden="true">
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img">
        <rect width="200" height="120" fill="none"/>
        <g transform="translate(10,10)">
          <rect x="0" y="0" width="180" height="100" rx="8" fill="none" stroke="rgba(191,160,106,0.12)" stroke-width="2"/>
          <text x="12" y="42" font-family="Playfair Display, serif" font-size="18" fill="#6b6b6b">${p.title.split(' ').slice(0,3).join(' ')}</text>
        </g>
      </svg>
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
  if(!list.length){ container.innerHTML = '<p class="muted">Ничего не найдено по заданным фильтрам.</p>'; return; }
  list.forEach(p => container.appendChild(createCard(p)));
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

document.getElementById('apply').addEventListener('click', applyFilters);
document.getElementById('reset').addEventListener('click', resetFilters);

window.addEventListener('load', ()=>{ resetFilters(); });
