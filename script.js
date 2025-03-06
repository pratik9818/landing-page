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

      // Form validation
      const form = document.getElementById('contactForm');
      const inputs = {
          name: {
              element: document.getElementById('name'),
              error: document.getElementById('nameError'),
              validate: (value) => {
                  const regex = /^[A-Za-z ]{2,50}$/;
                  return regex.test(value) ? '' : 'Please enter a valid name (2-50 characters, letters only)';
              }
          },
          email: {
              element: document.getElementById('email'),
              error: document.getElementById('emailError'),
              validate: (value) => {
                  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  return regex.test(value) ? '' : 'Please enter a valid email address';
              }
          },
          message: {
              element: document.getElementById('message'),
              error: document.getElementById('messageError'),
              validate: (value) => {
                  return value.length >= 10 ? '' : 'Message must be at least 10 characters long';
              }
          }
      };

      // Real-time validation
      Object.values(inputs).forEach(input => {
          input.element.addEventListener('input', () => {
              const error = input.validate(input.element.value);
              input.error.textContent = error;
              input.error.style.display = error ? 'block' : 'none';
          });
      });

      // Form submission
      form.addEventListener('submit', async (e) => {
          e.preventDefault();
        
          // Validate all fields
          let isValid = true;
          Object.values(inputs).forEach(input => {
              const error = input.validate(input.element.value);
              input.error.textContent = error;
              input.error.style.display = error ? 'block' : 'none';
              if (error) isValid = false;
          });

          if (isValid) {
              const submitBtn = form.querySelector('.submit-btn');
              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';

              try {
                  // Add your form submission logic here
                  // Example: await fetch('/api/contact', {...})
                
                  // Show success message
                  const successMessage = document.createElement('div');
                  successMessage.className = 'success-message';
                  successMessage.textContent = 'Message sent successfully!';
                  document.body.appendChild(successMessage);

                  // Reset form
                  form.reset();
                  setTimeout(() => {
                      successMessage.remove();
                  }, 3000);
              } catch (error) {
                  console.error('Error:', error);
              } finally {
                  submitBtn.disabled = false;
                  submitBtn.textContent = 'Send Message';
              }
          }
      });
  });// Add scroll-based navbar background
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
