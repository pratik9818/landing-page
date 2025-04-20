document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.carousel-slides');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.carousel-slide').length;

    // Auto-advance carousel
    let autoSlideInterval = setInterval(nextSlide, 5000);

    function updateSlidePosition() {
        slides.style.transform = `translateX(-${currentSlide * 16.666}%)`;
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlidePosition();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            currentSlide = index;
            updateSlidePosition();
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
    });

    // Pause auto-advance on hover
    slides.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slides.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    });
});

// Process Section Animations
document.addEventListener('DOMContentLoaded', function() {
    const processSteps = document.querySelectorAll('.process-step');
    
    // Intersection Observer for process steps
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3
    });

    // Observe each process step
    processSteps.forEach(step => {
        stepObserver.observe(step);
    });

    // Add hover effect for step content
    processSteps.forEach(step => {
        const content = step.querySelector('.step-content');
        content.addEventListener('mouseenter', () => {
            content.style.transform = 'translateY(-10px)';
            const icon = content.querySelector('.step-icon');
            icon.style.transform = 'scale(1.1)';
        });

        content.addEventListener('mouseleave', () => {
            content.style.transform = 'translateY(0)';
            const icon = content.querySelector('.step-icon');
            icon.style.transform = 'scale(1)';
        });
    });
}); 