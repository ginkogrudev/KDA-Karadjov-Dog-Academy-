/* -----------------------------------------------------------
   1. GOOGLE CONSENT MODE (Default Denied)
----------------------------------------------------------- */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

// Set default consent to 'denied' immediately
gtag('consent', 'default', {
    'ad_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'analytics_storage': 'denied'
});

/* -----------------------------------------------------------
   2. UI INTERACTIONS (Menu & Cookies)
----------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE MENU LOGIC ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- COOKIE BANNER LOGIC ---
    const banner = document.getElementById('cookie-banner');
    const settingsModal = document.getElementById('cookie-settings-modal');

    // Check if user has already made a choice
    const savedConsent = localStorage.getItem('kda_cookie_consent');

    if (!savedConsent) {
        // Show banner after 1.5s delay for smooth entrance
        setTimeout(() => banner.classList.remove('hidden'), 1500);
    } else if (savedConsent === 'granted') {
        updateGTM('granted');
    }

    // Expose functions to window (so HTML buttons can click them)
    window.acceptAllCookies = function() {
        localStorage.setItem('kda_cookie_consent', 'granted');
        updateGTM('granted');
        banner.classList.add('hidden');
    };

    window.openCookieSettings = function() {
        settingsModal.classList.remove('hidden');
    };

    window.closeCookieSettings = function() {
        settingsModal.classList.add('hidden');
    };

    window.saveCookiePreferences = function() {
        const analyticsChecked = document.getElementById('analytics-consent').checked;
        const status = analyticsChecked ? 'granted' : 'denied';
        
        localStorage.setItem('kda_cookie_consent', status);
        updateGTM(status);
        
        settingsModal.classList.add('hidden');
        banner.classList.add('hidden');
    };
});

/* -----------------------------------------------------------
   3. GTM UPDATE HELPER
----------------------------------------------------------- */
function updateGTM(status) {
    console.log('KDA: Consent updated to', status);
    gtag('consent', 'update', {
        'ad_storage': status,
        'ad_user_data': status,
        'ad_personalization': status,
        'analytics_storage': status
    });
}