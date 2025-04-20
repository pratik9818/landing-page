document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Clone first and last slide
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
    
    // Add clones to carousel
    carousel.appendChild(firstSlideClone);
    carousel.insertBefore(lastSlideClone, slides[0]);
    
    // Adjust initial position to show first real slide
    carousel.style.transform = `translateX(-12.5%)`;
    
    function updateIndicators(index) {
        indicators.forEach(ind => ind.classList.remove('active'));
        // Normalize index for indicator display
        const normalizedIndex = (index + totalSlides) % totalSlides;
        indicators[normalizedIndex].classList.add('active');
    }
    
    function goToSlide(index, smooth = true) {
        // Account for cloned slides in translation
        const translation = (index + 1) * 12.5;  // Each slide is 12.5% wide
        carousel.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        carousel.style.transform = `translateX(-${translation}%)`;
        currentSlide = index;
        updateIndicators(currentSlide);
    }
    
    function handleTransitionEnd() {
        // If we're at the clone of the last slide, jump to the real last slide
        if (currentSlide === -1) {
            carousel.style.transition = 'none';
            currentSlide = totalSlides - 1;
            goToSlide(currentSlide, false);
        }
        // If we're at the clone of the first slide, jump to the real first slide
        else if (currentSlide === totalSlides) {
            carousel.style.transition = 'none';
            currentSlide = 0;
            goToSlide(currentSlide, false);
        }
    }
    
    // Event Listeners
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
    
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
    
    carousel.addEventListener('transitionend', handleTransitionEnd);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // Auto-advance carousel
    let autoAdvance = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 5000); // Change slide every 5 seconds
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoAdvance);
    });
    
    carousel.addEventListener('mouseleave', () => {
        autoAdvance = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    });
}); 