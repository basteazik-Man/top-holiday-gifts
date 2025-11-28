document.addEventListener('DOMContentLoaded', function() {
    
    // Находим элемент с вашей фотографией
    const heroMedia = document.getElementById('heroMedia');
    
    // Если фото есть на странице, запускаем магию
    if(heroMedia) {
        document.addEventListener('mousemove', function(e) {
            const w = window.innerWidth;
            const h = window.innerHeight;
            
            // Вычисляем положение мышки
            const x = (e.clientX - w / 2) / w; 
            const y = (e.clientY - h / 2) / h;
            
            // Сдвигаем фото в обратную сторону от мышки
            // Числа 20 и 15 — это сила сдвига (можно менять)
            const moveX = x * 20;
            const moveY = y * 15;
            
            // Применяем сдвиг и легкое увеличение (scale), чтобы не было видно краев
            heroMedia.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
    }
});