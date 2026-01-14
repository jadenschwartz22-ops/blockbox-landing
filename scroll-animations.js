// Scroll animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll(`
        .step-card,
        .feature-card,
        .privacy-card,
        .comparison-card,
        .truth-block,
        .use-case-item,
        .problem-insight,
        section h2,
        .section-intro,
        .emergency-note,
        .tech-details,
        .honest-claim,
        .diagram-item,
        .layer-card,
        .privacy-features,
        .stat-card-large,
        .impact-visual,
        .category-title
    `);

    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element enters viewport
                entry.target.classList.add('animate-in');
            } else {
                // Remove animation class when element leaves viewport
                // This allows re-animation on scroll back up
                entry.target.classList.remove('animate-in');
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: '0px 0px -80px 0px' // Start animation before element fully enters viewport
    });

    // Observe all elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
