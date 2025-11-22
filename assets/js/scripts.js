console.log("Каталог подарков загружен!");

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за карточками
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});

// Обработка поиска (заглушка)
document.querySelector('.search-box button').addEventListener('click', () => {
    const query = document.querySelector('.search-box input').value;
    if (query.trim()) {
        alert(`Поиск: ${query}\n\nЭта функция находится в разработке!`);
    }
});

document.querySelector('.search-box input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.querySelector('.search-box button').click();
    }
});