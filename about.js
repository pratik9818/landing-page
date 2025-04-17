document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current > target) {
                element.textContent = target;
            } else {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        };

        updateCounter();
    };

    // Intersection Observer for stats
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // Testimonials carousel functionality
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-nav-btn.prev');
    const nextBtn = document.querySelector('.testimonial-nav-btn.next');
    const testimonialWrapper = document.querySelector('.testimonials-wrapper');
    
    let currentIndex = 0;
    let autoScrollInterval;
    let isPaused = false;
    const cardWidth = cards[0].offsetWidth;
    const gap = 32; // 2rem gap
    const cardsPerView = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    const maxIndex = cards.length - 1; // Changed to account for all cards
    const autoScrollDelay = 3000; // 3 seconds between slides

    // Update card classes based on their position
    const updateCardClasses = () => {
        cards.forEach((card, index) => {
            // Remove all possible classes first
            card.classList.remove('active', 'adjacent', 'inactive');
            
            if (index === currentIndex) {
                // Center card
                card.classList.add('active');
            } else if (index === currentIndex - 1 || index === currentIndex + 1) {
                // Adjacent cards
                card.classList.add('adjacent');
            } else {
                // Other cards
                card.classList.add('inactive');
            }
        });
    };

    // Update button states
    const updateButtons = () => {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === maxIndex;
    };

    // Handle navigation
    const navigate = (direction) => {
        const newIndex = currentIndex + direction;
        
        // Check if the new index is within bounds
        if (newIndex >= 0 && newIndex <= maxIndex) {
            currentIndex = newIndex;
            const offset = -(currentIndex * (cardWidth + gap));
            track.style.transform = `translateX(${offset}px)`;
            updateButtons();
            updateCardClasses();
        }
    };

    // Auto scroll function
    const startAutoScroll = () => {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            if (!isPaused) {
                if (currentIndex === maxIndex) {
                    // If at the end, reset to start
                    currentIndex = 0;
                    track.style.transform = 'translateX(0)';
                    updateButtons();
                    updateCardClasses();
                } else {
                    navigate(1);
                }
            }
        }, autoScrollDelay);
    };

    // Pause auto scroll
    const pauseAutoScroll = () => {
        isPaused = true;
    };

    // Resume auto scroll
    const resumeAutoScroll = () => {
        isPaused = false;
    };

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        navigate(-1);
        pauseAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        navigate(1);
        pauseAutoScroll();
    });

    // Event listeners for hover
    testimonialWrapper.addEventListener('mouseenter', pauseAutoScroll);
    testimonialWrapper.addEventListener('mouseleave', resumeAutoScroll);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoScroll();
    }, { passive: true });

    testimonialWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0 && currentIndex < maxIndex) {
                navigate(1); // Swipe left
            } else if (difference < 0 && currentIndex > 0) {
                navigate(-1); // Swipe right
            }
        }
        
        setTimeout(resumeAutoScroll, 1000); // Resume after interaction
    }, { passive: true });

    // Update carousel on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Reset position and recalculate dimensions
            currentIndex = 0;
            track.style.transform = 'translateX(0)';
            updateButtons();
            updateCardClasses();
            startAutoScroll();
        }, 100);
    });

    // Create the Intersection Observer for cards with sequential animation
    let lastAnimatedIndex = -1;
    const aboutCards = document.querySelectorAll('.about-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentCard = entry.target;
                const currentIndex = Array.from(aboutCards).indexOf(currentCard);
                
                // Only animate if this card comes after the last animated card
                if (currentIndex > lastAnimatedIndex) {
                    // Add a delay based on the difference between indices
                    const delay = (currentIndex - lastAnimatedIndex) * 200;
                    setTimeout(() => {
                        currentCard.classList.add('visible');
                    }, delay);
                    
                    lastAnimatedIndex = currentIndex;
                } else {
                    // If we're scrolling back up, just show the card immediately
                    currentCard.classList.add('visible');
                }
                
                // Once the animation is done, we can stop observing the element
                observer.unobserve(currentCard);
            }
        });
    }, {
        // Card will animate when 20% of it is visible
        threshold: 0.2,
        // Start observing when card is 100px from viewport
        rootMargin: '0px 0px -100px 0px'
    });

    // Get all cards and observe them
    aboutCards.forEach(card => {
        observer.observe(card);
    });

    // Initial setup
    updateCardClasses();
    updateButtons();
    startAutoScroll();
}); 