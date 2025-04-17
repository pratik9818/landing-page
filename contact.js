document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    const messageError = document.getElementById('messageError');

    // Validation functions
    const validateName = () => {
        const nameRegex = /^[A-Za-z ]{2,50}$/;
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Name is required';
            return false;
        } else if (!nameRegex.test(nameInput.value.trim())) {
            nameError.textContent = 'Please enter a valid name (2-50 characters, letters only)';
            return false;
        }
        nameError.textContent = '';
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    };

    const validateService = () => {
        if (!serviceInput.value) {
            serviceError.textContent = 'Please select a service';
            return false;
        }
        serviceError.textContent = '';
        return true;
    };

    const validateMessage = () => {
        if (!messageInput.value.trim()) {
            messageError.textContent = 'Message is required';
            return false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters long';
            return false;
        }
        messageError.textContent = '';
        return true;
    };

    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    serviceInput.addEventListener('change', validateService);
    messageInput.addEventListener('input', validateMessage);

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isServiceValid && isMessageValid) {
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';

            try {
                // Here you would typically send the form data to your backend
                // For now, we'll just simulate a submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Clear form
                form.reset();
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
            } catch (error) {
                alert('Sorry, there was an error sending your message. Please try again later.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span>';
            }
        }
    });
}); 