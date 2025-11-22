// scripts.js
// Новогодние продукты
const PRODUCTS = [
    {
        "id": 1,
        "title": "Умная кофемашина с Wi-Fi",
        "desc": "Автоматическое приготовление кофе с управлением через приложение",
        "price": 299,
        "category": "tech",
        "occasion": ["newyear", "birthday", "corporate"],
        "recipient": ["him", "her", "colleague"]
    },
    {
        "id": 2,
        "title": "Беспроводная акустика премиум",
        "desc": "360° звук с технологией шумоподавления",
        "price": 199,
        "category": "tech",
        "occasion": ["newyear", "birthday"],
        "recipient": ["him", "her", "family"]
    },
    {
        "id": 3,
        "title": "Набор умного дома",
        "desc": "Умные лампы, розетки и датчики для автоматизации",
        "price": 159,
        "category": "tech",
        "occasion": ["newyear", "birthday"],
        "recipient": ["him", "her", "family"]
    },
    {
        "id": 4,
        "title": "Электронная книга премиум",
        "desc": "Безбликовый экран с подсветкой и защитой от воды",
        "price": 129,
        "category": "tech",
        "occasion": ["newyear", "birthday"],
        "recipient": ["him", "her"]
    },
    {
        "id": 5,
        "title": "Новогодний гастрономический набор",
        "desc": "Изысканные деликатесы и напитки для праздничного стола",
        "price": 149,
        "category": "newyear-set",
        "occasion": ["newyear", "corporate"],
        "recipient": ["family", "couple", "colleague"]
    },
    {
        "id": 6,
        "title": "Подарочный сертификат SPA",
        "desc": "Премиальные процедуры и релаксация",
        "price": 120,
        "category": "lifestyle",
        "occasion": ["newyear", "birthday", "romantic"],
        "recipient": ["her", "couple"]
    },
    {
        "id": 7,
        "title": "Набор элитного чая и аксессуаров",
        "desc": "Редкие сорта чая в подарочной упаковке",
        "price": 89,
        "category": "lifestyle",
        "occasion": ["newyear", "birthday", "corporate"],
        "recipient": ["him", "her", "colleague"]
    },
    {
        "id": 8,
        "title": "Умные часы для фитнеса",
        "desc": "Мониторинг здоровья и уведомления",
        "price": 179,
        "category": "tech",
        "occasion": ["newyear", "birthday"],
        "recipient": ["him", "her"]
    },
    {
        "id": 9,
        "title": "Набор ароматических свечей",
        "desc": "Эксклюзивные ароматы для создания атмосферы",
        "price": 65,
        "category": "home",
        "occasion": ["newyear", "romantic"],
        "recipient": ["her", "couple", "family"]
    },
    {
        "id": 10,
        "title": "Беспроводное зарядное устройство",
        "desc": "Быстрая зарядка для всех устройств",
        "price": 79,
        "category": "tech",
        "occasion": ["newyear", "corporate"],
        "recipient": ["him", "her", "colleague"]
    },
    {
        "id": 11,
        "title": "Набор для создания коктейлей",
        "desc": "Премиальные ингредиенты и аксессуары",
        "price": 110,
        "category": "lifestyle",
        "occasion": ["newyear", "birthday"],
        "recipient": ["him", "her", "couple"]
    },
    {
        "id": 12,
        "title": "Умный термос с подогревом",
        "desc": "Поддержание температуры через приложение",
        "price": 95,
        "category": "tech",
        "occasion": ["newyear", "corporate"],
        "recipient": ["him", "her", "colleague"]
    }
];

// Форматирование цены
function formatPrice(price) {
    return '€' + price;
}

// Создание снежинок
function createSnowflakes() {
    const snowContainer = document.getElementById('snow-container');
    const snowflakes = ['❄', '✨', '⭐', '💫'];
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        snowContainer.appendChild(snowflake);
    }
}

// Создание карточки товара
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <div style="font-size: 48px; opacity: 0.7;">🎁</div>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.desc}</p>
            <div class="product-footer">
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-actions">
                    <button class="btn-sm secondary" onclick="showProductDetails(${product.id})">Подробнее</button>
                    <button class="btn-sm primary" onclick="addToCart(${product.id})">В корзину</button>
                </div>
            </div>
        </div>
    `;
    return card;
}

// Показать детали товара
function showProductDetails(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
        alert(`${product.title}\n\n${product.desc}\n\nЦена: ${formatPrice(product.price)}`);
    }
}

// Добавить в корзину
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (product) {
        // Создаем праздничное уведомление
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">🎉</span>
                <span>Добавлено: ${product.title}</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
        
        // Добавляем CSS для анимаций
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Рендер сетки товаров
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 48px; margin-bottom: 16px;">🎁</div>
                <h3 style="margin-bottom: 8px; color: var(--text-primary);">Ничего не найдено</h3>
                <p style="color: var(--text-secondary);">Попробуйте изменить параметры фильтра</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Применение фильтров
function applyFilters() {
    const occasion = document.getElementById('occasion').value;
    const recipient = document.getElementById('recipient').value;
    const priceRange = document.getElementById('priceRange').value;
    const category = document.getElementById('category').value;
    
    let filteredProducts = PRODUCTS.filter(product => {
        // Фильтр по поводу
        if (occasion !== 'any' && !product.occasion.includes(occasion)) {
            return false;
        }
        
        // Фильтр по получателю
        if (recipient !== 'any' && !product.recipient.includes(recipient)) {
            return false;
        }
        
        // Фильтр по категории
        if (category !== 'any' && product.category !== category) {
            return false;
        }
        
        // Фильтр по цене
        if (priceRange !== 'any') {
            if (priceRange === '300+') {
                if (product.price < 300) return false;
            } else {
                const [min, max] = priceRange.split('-').map(Number);
                if (product.price < min || product.price > max) return false;
            }
        }
        
        return true;
    });
    
    renderProducts(filteredProducts, 'catalogGrid');
    
    // Плавная прокрутка к результатам
    document.getElementById('catalog').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Сброс фильтров
function resetFilters() {
    document.getElementById('occasion').value = 'any';
    document.getElementById('recipient').value = 'any';
    document.getElementById('priceRange').value = 'any';
    document.getElementById('category').value = 'any';
    
    renderProducts(PRODUCTS, 'catalogGrid');
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Создаем снежинки
    createSnowflakes();
    
    // Рендерим все товары при загрузке
    renderProducts(PRODUCTS, 'catalogGrid');
    
    // Назначаем обработчики событий
    document.getElementById('apply').addEventListener('click', applyFilters);
    document.getElementById('reset').addEventListener('click', resetFilters);
    
    // Добавляем новогоднее приветствие
    setTimeout(() => {
        console.log('%c 🎄 С Новым Годом! 🎁', 'font-size: 24px; color: #1428A0; font-weight: bold;');
        console.log('%c Пусть 2024 год принесет много радости и прекрасных подарков!', 'font-size: 16px; color: #00A3FF;');
    }, 1000);
});

// Добавляем эффект параллакса для снежинок при скролле
window.addEventListener('scroll', function() {
    const snowflakes = document.querySelectorAll('.snowflake');
    const scrolled = window.pageYOffset;
    
    snowflakes.forEach((snowflake, index) => {
        const speed = (index % 3 + 1) * 0.5;
        snowflake.style.transform = `translateY(${scrolled * speed}px)`;
    });
});