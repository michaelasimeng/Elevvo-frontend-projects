// SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll(
    '.hero-content, .hero-visual, .section-heading, .feature-card, .testimonial-card, .pricing-card, .cta-content, .footer-content'
);

// Add the reveal class to each selected element
revealElements.forEach((element) => {
    element.classList.add('reveal');
});

// Observe elements as they enter the screen
const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Stop observing after the animation
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

// Start observing every element
revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ==============================
// 2. CURRENT YEAR IN FOOTER
// ==============================

const currentYear = new Date().getFullYear();

const footerYear = document.querySelector('.footer-bottom');

if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace(
        /\d{4}/,
        currentYear
    );
}


//NAVIGATION LINK SMOOTH SCROLL
const navigationLinks = document.querySelectorAll(
    '.nav-links a'
);

navigationLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');

        if (targetId && targetId.startsWith('#') && targetId.length > 1) {
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

console.log('TaskFlow website is ready!');
