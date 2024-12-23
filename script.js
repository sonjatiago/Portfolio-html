console.clear();

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    // Create the scroll animation
    gsap.timeline({
        scrollTrigger: {
            trigger: ".wrapper",
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
            markers: false
        }
    })
    // Animate both images simultaneously
    .to([".window-image", ".frame-image"], {
        scale: 1,
        duration: 1,
        ease: "power2.inOut"
    })
    .to(".circle-window", {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        duration: 1,
        ease: "power2.inOut"
    }, "<")
    .to(".frame-image", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
    }, "<0.5");
});

/* ==========================================================================
   Projects - Interactive Images Carousel
   ========================================================================== */
   document.addEventListener('DOMContentLoaded', () => {
    const seeMoreButton = document.querySelector('.see-more-btn');
    const seeLessButton = document.querySelector('.see-less-btn');
    const hiddenCards = document.querySelectorAll('.hidden');

    if (seeMoreButton && seeLessButton) {
        // Show hidden projects on "See More" click
        seeMoreButton.addEventListener('click', () => {
            hiddenCards.forEach(card => card.classList.remove('hidden')); // Show all hidden cards
            seeMoreButton.classList.add('hidden'); // Hide "See More"
            seeLessButton.classList.remove('hidden'); // Show "See Less"
        });

        // Hide additional projects on "See Less" click
        seeLessButton.addEventListener('click', () => {
            hiddenCards.forEach(card => card.classList.add('hidden')); // Re-hide the cards
            seeLessButton.classList.add('hidden'); // Hide "See Less"
            seeMoreButton.classList.remove('hidden'); // Show "See More"
        });
    }
});


/* ==========================================================================
   Contact Section Styles - Additional styles for the contact form section
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.setAttribute('data-focused', 'true');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.removeAttribute('data-focused');
            }
        });
    });

    // Form submission handling
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        try {
            // Show loading state
            const submitButton = contactForm.querySelector('button');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate sending (replace with actual API call)
            await simulateSendEmail(formData);

            // Show success message
            contactForm.classList.add('form-success');
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();

            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;

        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
});

// Form validation
function validateForm(formData) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.name.trim()) {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!formData.message.trim()) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Simulate sending email (replace with actual API call)
function simulateSendEmail(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data:', formData);
            resolve();
        }, 1500);
    });
}