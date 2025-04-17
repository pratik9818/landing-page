document.addEventListener('DOMContentLoaded', function() {
    // Word by word animation
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('visible');
        }, index * 200); // 200ms delay between each word
    });

    // Mouse move effect for cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
}); 