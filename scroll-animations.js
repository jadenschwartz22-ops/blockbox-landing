// Scroll animations using Intersection Observer (like QuantMage)
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(`
        .problem-card,
        .step-card,
        .category-card,
        .use-case-card,
        section h2,
        .section-intro,
        .emergency-note
    `);

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: unobserve after animation to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    });

    // Observe all elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
