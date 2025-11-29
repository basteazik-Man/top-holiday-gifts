document.addEventListener('DOMContentLoaded', function() {
    
    // Параллакс эффект для фонового изображения
    const heroMedia = document.getElementById('heroMedia');
    
    if(heroMedia) {
        document.addEventListener('mousemove', function(e) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            
            const x = (e.clientX - w / 2) / w; 
            const y = (e.clientY - h / 2) / h;
            
            const moveX = x * 20;
            const moveY = y * 15;
            
            heroMedia.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
    }

    // Плавная прокрутка для якорных ссылок
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

    // Фиксация шапки при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(12, 43, 75, 0.98)';
        } else {
            header.style.background = 'rgba(12, 43, 75, 0.95)';
        }
    });

    // Обработка формы
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
            contactForm.reset();
        });
    }
});