document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active-slide');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active-slide');
    }
    
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
    }
    
    // Мобильный слайдер преимуществ
    if (window.innerWidth < 768) {
        const advantagesSlides = document.querySelectorAll('.advantages-slide');
        let currentAdvantageSlide = 0;

        function showAdvantageSlide(index) {
            advantagesSlides.forEach(slide => slide.classList.remove('active'));
            advantagesSlides[index].classList.add('active');
        }

        function nextAdvantageSlide() {
            currentAdvantageSlide = (currentAdvantageSlide + 1) % advantagesSlides.length;
            showAdvantageSlide(currentAdvantageSlide);
        }

        // Автоматическая смена слайдов
        setInterval(nextAdvantageSlide, 3000);
    }

    // Модальное окно политики конфиденциальности
    const privacyModal = document.getElementById('privacy-modal');
    const privacyLink = document.querySelector('a[href="#"]');
    const closePrivacyModal = document.getElementById('close-privacy-modal');

    function showPrivacyModal() {
        privacyModal.classList.remove('hidden');
        privacyModal.classList.add('flex');
        setTimeout(() => privacyModal.classList.add('active'), 10);
        document.body.style.overflow = 'hidden';
    }

    function hidePrivacyModal() {
        privacyModal.classList.remove('active');
        setTimeout(() => {
            privacyModal.classList.remove('flex');
            privacyModal.classList.add('hidden');
            document.body.style.overflow = '';
        }, 300);
    }

    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPrivacyModal();
        });
    }

    if (closePrivacyModal) {
        closePrivacyModal.addEventListener('click', hidePrivacyModal);
    }

    if (privacyModal) {
        privacyModal.addEventListener('click', (e) => {
            if (e.target === privacyModal) hidePrivacyModal();
        });
    }

    // Обработка формы
    const heroForm = document.getElementById('hero-form');
    if (heroForm) {
    heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(heroForm);
        const data = {
        name: formData.get('name'), // Проверьте, что `name` совпадает с атрибутом `name` в HTML!
        phone: formData.get('phone')
        };

        try {
        const response = await fetch('https://surffers.surffers-com.workers.dev', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', // Важно указать заголовок!
            },
            body: JSON.stringify(data), // Отправляем как JSON
        });

        if (response.ok) {
            window.location.href = 'thank-you.html';
        } else {
            console.error('Ошибка при отправке:', await response.text());
        }
        } catch (error) {
        console.error('Ошибка:', error);
        }
    });
    }
}); 
