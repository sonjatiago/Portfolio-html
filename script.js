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
// Project data
const destinations = [
    {
        id: 1,
        image: 'images/img1.png',
        link: 'https://project1.com'
    },
    {
        id: 2,
        image: 'images/img2.png',
        link: 'https://project2.com'
    },
    {
        id: 3,
        image: 'images/img3.png',
        link: 'https://project3.com'
    },
    {
        id: 4,
        image: 'images/img4.png',
        link: 'https://project4.com'
    },
    {
        id: 5,
        image: 'images/img5.png',
        link: 'https://project5.com'
    },
    {
        id: 6,
        image: 'images/img6.png',
        link: 'https://project6.com'
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const featuredDestination = document.querySelector('.featured-destination');
    const locationCards = document.querySelector('.location-cards');
    const navDots = document.querySelector('.nav-dots');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Create navigation dots
    destinations.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `nav-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => updateDestination(index));
        navDots.appendChild(dot);
    });

    // Update the featured destination
    function updateDestination(index) {
        const destination = destinations[index];
        
        featuredDestination.style.opacity = '0';
        
        setTimeout(() => {
            // Update main content
            featuredDestination.querySelector('.main-image').src = destination.image;
            featuredDestination.querySelector('.discover-btn').onclick = () => window.open(destination.link, '_blank');

            // Update active states
            document.querySelectorAll('.location-card').forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            // Scroll card into view
            const activeCard = document.querySelectorAll('.location-card')[index];
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

            featuredDestination.style.opacity = '1';
            currentIndex = index;
        }, 300);
    }

    // Handle card scrolling
    const scrollAmount = 160; // Card width + gap

    prevBtn.addEventListener('click', () => {
        locationCards.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextBtn.addEventListener('click', () => {
        locationCards.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Update scroll button states
    function updateScrollButtons() {
        const { scrollLeft, scrollWidth, clientWidth } = locationCards;
        prevBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
        nextBtn.style.opacity = scrollLeft < scrollWidth - clientWidth ? '1' : '0.5';
    }

    locationCards.addEventListener('scroll', updateScrollButtons);
    
    // Add click handlers to cards
    document.querySelectorAll('.location-card').forEach((card, index) => {
        card.addEventListener('click', () => updateDestination(index));
    });


    // Pause auto-rotation on hover
    featuredDestination.addEventListener('mouseenter', () => clearInterval(autoRotate));
    locationCards.addEventListener('mouseenter', () => clearInterval(autoRotate));
    
    // Resume auto-rotation on mouse leave
    featuredDestination.addEventListener('mouseleave', startAutoRotate);
    locationCards.addEventListener('mouseleave', startAutoRotate);

    function startAutoRotate() {
        if (autoRotate) clearInterval(autoRotate);
        autoRotate = setInterval(() => {
            const nextIndex = (currentIndex + 1) % destinations.length;
            updateDestination(nextIndex);
        }, 5000);
    }


    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            const prevIndex = (currentIndex - 1 + destinations.length) % destinations.length;
            updateDestination(prevIndex);
        } else if (event.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % destinations.length;
            updateDestination(nextIndex);
        }
    });
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