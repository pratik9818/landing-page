// Smooth cursor effect
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
  document.addEventListener('DOMContentLoaded', () => {
      // Animate form elements on load
      const formGroups = document.querySelectorAll('.form-group');
      formGroups.forEach((group, index) => {
          setTimeout(() => {
              group.classList.add('animate');
          }, index * 200);
      });

      // Real-time validation for improved user experience
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const serviceInput = document.getElementById('service');
      const messageInput = document.getElementById('message');
      
      // Add input event listeners for real-time feedback
      nameInput.addEventListener('input', () => {
          if (nameInput.value.trim().length >= 2) {
              document.getElementById('nameError').style.display = 'none';
          }
      });
      
      emailInput.addEventListener('input', () => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (emailRegex.test(emailInput.value.trim())) {
              document.getElementById('emailError').style.display = 'none';
          }
      });
      
      serviceInput.addEventListener('change', () => {
          if (serviceInput.value) {
              document.getElementById('serviceError').style.display = 'none';
          }
      });
      
      messageInput.addEventListener('input', () => {
          if (messageInput.value.trim().length >= 10) {
              document.getElementById('messageError').style.display = 'none';
          }
      });
  });

// Add scroll-based navbar background
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Animate testimonials on scroll
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.testimonial-card');
    const title = document.querySelector('.section-title');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 0.2}s`;
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('section-title')) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, { threshold: 0.2 });
    
    cards.forEach(card => observer.observe(card));
    observer.observe(title);
});

// Typing animation
document.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('.typing-text');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 500);
            }
        });
    }, { threshold: 0.5 });
    
    textElements.forEach(text => observer.observe(text));
});

// Number counter animation with one-time trigger
const animatedElements = new Set(); // Track elements that have been animated

const animateCounter = (element) => {
    if (animatedElements.has(element)) return; // Skip if already animated
    
    animatedElements.add(element); // Mark as animated
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Trigger counter animation once on scroll
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            const numberElement = entry.target.querySelector('.stat-number');
            if (numberElement) {
                animateCounter(numberElement);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Initialize Supabase client
const supabaseUrl = 'https://xkerkqfhbcvwslcmwykz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZXJrcWZoYmN2d3NsY213eWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUxMTcwNzgsImV4cCI6MjA0MDY5MzA3OH0.7V168e1QCuv_-bFxXf5hBOyJFXQm_9hHOlBa-7jXUQQ'
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    
    // Function to show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Function to clear error message
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'none';
    }

    // Function to show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const service = document.getElementById('service');
        const message = document.getElementById('message');

        console.log('Name:', name.value);
        console.log('Email:', email.value);
        console.log('Service:', service.value);
        console.log('Message:', message.value);

        // Name validation
        if (!name.value.trim() || name.value.length < 2) {
            showError('nameError', 'Please enter a valid name (minimum 2 characters)');
            isValid = false;
        } else {
            clearError('nameError');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError('emailError');
        }

        // Service validation
        if (!service.value) {
            showError('serviceError', 'Please select a service');
            isValid = false;
        } else {
            clearError('serviceError');
        }

        // Message validation
        if (!message.value.trim() || message.value.length < 10) {
            showError('messageError', 'Please enter a message (minimum 10 characters)');
            isValid = false;
        } else {
            clearError('messageError');
        }

        console.log('Form is valid:', isValid);
        return isValid;
    }

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return; // Prevent submission if validation fails
        }
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.textContent = 'Sending...';

        try {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value,
                created_at: new Date().toISOString()
            };

            // Insert data into Supabase
            const { data, error } = await supabaseClient
                .from('contacts')
                .insert([formData]);

            if (error) throw error;

            // Show success message
            showSuccessMessage();
            
            // Reset form
            form.reset();

            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';

        } catch (error) {
            console.error('Error:', error);
            showError('messageError', 'Failed to send message. Please try again.');
            
            // Reset button state
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
        }
    });
});
