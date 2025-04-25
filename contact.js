document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase client
    const supabaseUrl = 'https://aekkltpttkwexbwtngft.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFla2tsdHB0dGt3ZXhid3RuZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0OTY2NTUsImV4cCI6MjA2MTA3MjY1NX0.gRxL2xJFM_YgN7nW0ohZBdkE4sTjRXhatm9sNTwjgXA';
    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const numberInput = document.getElementById('number');
    console.log(numberInput);
    
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    // Error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const serviceError = document.getElementById('serviceError');
    const messageError = document.getElementById('messageError');
    const numberError = document.getElementById('numberError');

    // Check if all error elements exist
    if (!nameError || !emailError || !serviceError || !messageError || !numberError) {
        console.error('Error: One or more error message elements are missing from the HTML');
        return; // Exit early if elements are missing
    }

    // Success message function with smooth transition
    const showSuccessMessage = () => {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.opacity = '0';  // Start invisible
        successDiv.textContent = 'Message sent successfully!';
        form.insertBefore(successDiv, form.firstChild);
        
        // Trigger reflow for animation
        successDiv.offsetHeight;
        successDiv.style.opacity = '1';
        
        // Remove success message after animation
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                successDiv.remove();
            }, 300); // Match the CSS transition duration
        }, 2000);
    };

    // Clear all error messages
    const clearErrors = () => {
        nameError.textContent = '';
        emailError.textContent = '';
        serviceError.textContent = '';
        messageError.textContent = '';
        numberError.textContent = '';
    };

    // Validation functions
    const validateName = () => {
        const name = nameInput.value.trim();
        const nameRegex = /^[A-Za-z ]{2,50}$/;
        
        if (!name) {
            nameError.textContent = 'Name is required';
            nameInput.classList.add('invalid');
            return false;
        } else if (!nameRegex.test(name)) {
            nameError.textContent = 'Please enter a valid name (2-50 characters, letters only)';
            nameInput.classList.add('invalid');
            return false;
        }
        nameError.textContent = '';
        nameInput.classList.remove('invalid');
        return true;
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailError.textContent = 'Email is required';
            emailInput.classList.add('invalid');
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.classList.add('invalid');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('invalid');
        return true;
    };

    const validateService = () => {
        const service = serviceInput.value;
        
        if (!service) {
            serviceError.textContent = 'Please select a service';
            serviceInput.classList.add('invalid');
            return false;
        }
        serviceError.textContent = '';
        serviceInput.classList.remove('invalid');
        return true;
    };

    const validateMessage = () => {
        const message = messageInput.value.trim();
        
        // If message is empty, it's valid since it's optional
        if (!message) {
            messageError.textContent = '';
            messageInput.classList.remove('invalid');
            return true;
        }
        
        // If message is provided, it should be at least 10 characters
        if (message.length < 10) {
            messageError.textContent = 'If providing a message, it must be at least 10 characters long';
            messageInput.classList.add('invalid');
            return false;
        }
        
        messageError.textContent = '';
        messageInput.classList.remove('invalid');
        return true;
    };

    const validateNumber = () => {
        const number = numberInput.value.trim();
        const numberRegex = /^\d{10}$/;
        
        if (!number) {
            numberError.textContent = 'Phone number is required';
            numberInput.classList.add('invalid');
            return false;
        } else if (!numberRegex.test(number)) {
            numberError.textContent = 'Please enter a valid 10-digit phone number';
            numberInput.classList.add('invalid');
            return false;
        }
        numberError.textContent = '';
        numberInput.classList.remove('invalid');
        return true;
    };

    // Add input event listeners for real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    serviceInput.addEventListener('change', validateService);
    messageInput.addEventListener('input', validateMessage);
    numberInput.addEventListener('input', validateNumber);

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Form submission started');
        
        // Clear any existing error messages
        clearErrors();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isMessageValid = validateMessage();
        const isNumberValid = validateNumber();

        console.log('Validation results:', {
            name: isNameValid,
            email: isEmailValid,
            service: isServiceValid,
            message: isMessageValid,
            number: isNumberValid
        });

        if (isNameValid && isEmailValid && isServiceValid && isMessageValid && isNumberValid) {
            const submitBtn = form.querySelector('.submit-btn');
            const formInputs = form.querySelectorAll('input, select, textarea');
            
            // Disable form
            submitBtn.disabled = true;
            formInputs.forEach(input => input.disabled = true);
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';

            try {
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    service: serviceInput.value,
                    message: messageInput.value.trim(),
                    number:numberInput.value,
                    created_at: new Date().toISOString()
                };

                console.log('Sending data to Supabase:', formData);
    
                // Insert data into Supabase
                const { data, error } = await supabaseClient
                    .from('contacts')
                    .insert([formData]);
    
                if (error) {
                    console.error('Supabase error:', error);
                    throw error;
                }
    
                console.log('Data sent successfully:', data);
                
                // Show success message first
                showSuccessMessage();
                
                // Wait a bit before resetting the form
                setTimeout(() => {
                    // Store form elements that should receive focus
                    const firstInput = nameInput;
                    
                    // Reset form
                    form.reset();
                    
                    // Re-enable form with a slight delay
                    setTimeout(() => {
                        formInputs.forEach(input => input.disabled = false);
                        firstInput.focus(); // Optional: focus the first input
                    }, 100);
                }, 500);
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Sorry, there was an error sending your message. Please try again later.');
                // Re-enable form immediately if there's an error
                formInputs.forEach(input => input.disabled = false);
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span class="btn-text">Send Message</span>';
            }
        } else {
            console.log('Form validation failed');
        }
    });
}); 



