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

    // Модальное окно благодарности
    const modal = document.getElementById('thank-you-modal');
    const closeModal = document.getElementById('close-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function showModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => modal.classList.add('active'), 10);
    }

    function hideModal() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    }

    closeModal.addEventListener('click', hideModal);
    closeModalBtn.addEventListener('click', hideModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) hideModal();
    });

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
        window.location.href = '/thank-you.html';
      } else {
        console.error('Ошибка при отправке:', await response.text());
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  });
}
}); 
