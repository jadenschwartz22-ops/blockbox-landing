// Track use case selection (radio buttons)
document.querySelectorAll('input[name="use-case"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const useCase = e.target.value;

        // Track in Google Analytics
        gtag('event', 'use_case_selected', {
            use_case: useCase
        });

        console.log(`Use case selected: ${useCase}`);
    });
});

// Track clicks on CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        gtag('event', 'cta_click', {
            button_location: e.target.closest('form').id || 'unknown'
        });
    });
});

// Form submission handler
async function handleFormSubmission(email, formId) {
    // Collect selected use case (radio button - only one)
    const useCase = document.querySelector('input[name="use-case"]:checked');
    const useCaseValue = useCase ? useCase.value : 'none';

    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || 'direct';
    const utmMedium = urlParams.get('utm_medium') || 'none';
    const utmCampaign = urlParams.get('utm_campaign') || 'none';

    // Prepare submission data
    const submissionData = {
        email: email,
        use_case: useCaseValue,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        timestamp: new Date().toISOString(),
        form_id: formId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct'
    };

    console.log('Form submission data:', submissionData);

    // Track in Google Analytics
    gtag('event', 'waitlist_signup', {
        email: email,
        use_case: useCaseValue,
        utm_source: utmSource
    });

    // Submit to Google Sheets via Web App
    // You'll replace this URL with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData)
        });

        // Note: With no-cors, we can't read the response, but the data is sent
        console.log('Submission sent to Google Sheets');
        return true;
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);

        // Still track the email locally even if submission fails
        gtag('event', 'submission_error', {
            error_message: error.message
        });

        // For now, we'll still show success to user (data is captured in GA)
        return true;
    }
}

// Hero form submission
document.getElementById('hero-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('hero-email').value;

    const success = await handleFormSubmission(email, 'hero-form');

    if (success) {
        // Show success modal
        document.getElementById('success-modal').style.display = 'block';

        // Reset form
        e.target.reset();
    }
});

// Main form submission
document.getElementById('main-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('main-email').value;

    const success = await handleFormSubmission(email, 'main-form');

    if (success) {
        // Show success modal
        document.getElementById('success-modal').style.display = 'block';

        // Reset form
        e.target.reset();
    }
});

// Modal close functionality
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('success-modal').style.display = 'none';
});

window.addEventListener('click', (e) => {
    const modal = document.getElementById('success-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Track external link clicks (if you add any)
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', (e) => {
        gtag('event', 'external_link_click', {
            link_url: e.target.href,
            link_text: e.target.textContent
        });
    });
});

// Track when user leaves page (engagement metric)
let isEngaged = false;
setTimeout(() => {
    isEngaged = true;
}, 10000); // Consider engaged after 10 seconds

window.addEventListener('beforeunload', () => {
    if (isEngaged) {
        gtag('event', 'engaged_visit', {
            time_on_page: Math.floor(window.performance.now() / 1000)
        });
    }
});

// Save UTM parameters to localStorage for attribution
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('utm_source')) {
    const utmData = {
        source: urlParams.get('utm_source'),
        medium: urlParams.get('utm_medium'),
        campaign: urlParams.get('utm_campaign'),
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('blockbox_utm', JSON.stringify(utmData));

    // Track initial landing with UTM
    gtag('event', 'utm_landing', {
        utm_source: utmData.source,
        utm_medium: utmData.medium,
        utm_campaign: utmData.campaign
    });
}
