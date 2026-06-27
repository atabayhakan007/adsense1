import { initFire, updateFire, getFireState, setFireState } from './calculators/fire.js';
import { initMortgage, updateMortgage, getMortgageState, setMortgageState } from './calculators/mortgage.js';
import { initFreelance, updateFreelance, getFreelanceState, setFreelanceState } from './calculators/freelance.js';
import { initInflation, updateInflation, getInflationState, setInflationState } from './calculators/inflation.js';
import { detectLanguage, t, localizeDOM, currentCurrency, setCurrency } from './i18n.js';
import { config as defaultConfig } from './config.js';

// Merge configuration with local storage override
let config = { ...defaultConfig };
const localConfigStr = localStorage.getItem('fincalc_config');
if (localConfigStr) {
    try {
        const localConfig = JSON.parse(localConfigStr);
        config = {
            ...defaultConfig,
            ...localConfig,
            adsenseSlots: {
                ...defaultConfig.adsenseSlots,
                ...(localConfig.adsenseSlots || {})
            },
            affiliateLinks: {
                ...defaultConfig.affiliateLinks,
                ...(localConfig.affiliateLinks || {})
            }
        };
    } catch (e) {
        console.error('Error parsing local config:', e);
    }
}


// DOM Elements
let navItems;
let tabContents;
let pageTitle;
let pageSubtitle;
let shareBtn;

// Global App State
let activeTab = 'fire-tab';

// Initialize the Application
function initApp() {
    // Query DOM Elements
    navItems = document.querySelectorAll('.nav-item');
    tabContents = document.querySelectorAll('.tab-content');
    pageTitle = document.getElementById('page-title');
    pageSubtitle = document.getElementById('page-subtitle');
    shareBtn = document.getElementById('btn-share-link');

    // 1. Initialize Nav Clicks
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 2. Initialize Share Button
    shareBtn.addEventListener('click', sharePlan);

    // 3. Initialize individual calculator modules
    initFire(handleSliderChange);
    initMortgage(handleSliderChange);
    initFreelance(handleSliderChange);
    initInflation(handleSliderChange);

    // 4. Load state from URL parameters if they exist, otherwise load defaults
    loadStateFromURL();

    // 5. Trigger initial updates to calculate results and draw charts
    updateAllCalculators();

    // 6. Initialize Admin Panel Settings Form
    initAdminPanel();

    // 7. Initialize Currency Selector & Print Buttons
    initCurrencyAndPrint();

    // 8. Initialize Scenario Presets
    initPresets();

    // 9. Initialize Admin Panel Session Security
    initAdminSessionSecurity();

    // 10. Initialize GDPR Cookie Consent Banner
    initCookieBanner();
}

// Switch between tabs
function switchTab(tabId) {
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === 'true' && tabId === 'admin-tab') {
        return;
    }

    const validTabs = ['fire-tab', 'mortgage-tab', 'freelance-tab', 'inflation-tab', 'admin-tab'];
    if (!validTabs.includes(tabId)) return;

    activeTab = tabId;

    // Update Nav UI
    navItems.forEach(nav => {
        if (nav.getAttribute('data-tab') === tabId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    // Update Content Tabs
    tabContents.forEach(tab => {
        if (tab.id === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update Header Text & Share Button visibility
    if (tabId === 'admin-tab') {
        pageTitle.textContent = t('tab_admin_title');
        pageSubtitle.textContent = t('tab_admin_subtitle');
        if (shareBtn) shareBtn.style.display = 'none';
    } else {
        if (shareBtn) shareBtn.style.display = 'flex';
        if (tabId === 'fire-tab') {
            pageTitle.textContent = t('tab_fire_title');
            pageSubtitle.textContent = t('tab_fire_subtitle');
        } else if (tabId === 'mortgage-tab') {
            pageTitle.textContent = t('tab_mortgage_title');
            pageSubtitle.textContent = t('tab_mortgage_subtitle');
        } else if (tabId === 'freelance-tab') {
            pageTitle.textContent = t('tab_freelance_title');
            pageSubtitle.textContent = t('tab_freelance_subtitle');
        } else if (tabId === 'inflation-tab') {
            pageTitle.textContent = t('tab_inflation_title');
            pageSubtitle.textContent = t('tab_inflation_subtitle');
        }
    }

    // Sync URL when tab changes
    syncStateToURL();

    // Update FAQ section
    injectFAQ(tabId);
}

// Modal Management
let infoModal;
let modalTitle;
let modalBody;
let modalClose;
let linkAbout;
let linkPrivacy;

function initModalListeners() {
    // Query Modal Elements
    infoModal = document.getElementById('info-modal');
    modalTitle = document.getElementById('modal-title');
    modalBody = document.getElementById('modal-body');
    modalClose = document.getElementById('modal-close');
    linkAbout = document.getElementById('link-about');
    linkPrivacy = document.getElementById('link-privacy');

    linkAbout.addEventListener('click', (e) => {
        e.preventDefault();
        showAboutModal();
    });

    linkPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        showPrivacyModal();
    });

    modalClose.addEventListener('click', hideModal);

    infoModal.addEventListener('click', (e) => {
        if (e.target === infoModal) {
            hideModal();
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && infoModal.style.display === 'flex') {
            hideModal();
        }
    });
}

function showAboutModal() {
    modalTitle.textContent = t('about_title');
    modalBody.innerHTML = t('about_body');
    infoModal.style.display = 'flex';
}

function showPrivacyModal() {
    modalTitle.textContent = t('privacy_title');
    modalBody.innerHTML = t('privacy_body');
    infoModal.style.display = 'flex';
}

function hideModal() {
    infoModal.style.display = 'none';
}

// Callback when any slider changes
function handleSliderChange() {
    updateAllCalculators();
    syncStateToURL();
}

// Update all calculator results and charts
function updateAllCalculators() {
    if (activeTab === 'fire-tab') updateFire();
    else if (activeTab === 'mortgage-tab') updateMortgage();
    else if (activeTab === 'freelance-tab') updateFreelance();
    else if (activeTab === 'inflation-tab') updateInflation();
}

// Encode all calculator settings into the URL parameters
function syncStateToURL() {
    const params = new URLSearchParams();
    
    // Set active tab
    params.set('tab', activeTab);

    // Collect states from each calculator module
    const fireState = getFireState();
    const mortgageState = getMortgageState();
    const freelanceState = getFreelanceState();
    const inflationState = getInflationState();

    // Add prefix to avoid namespace collisions
    for (const [key, val] of Object.entries(fireState)) params.set(`f_${key}`, val);
    for (const [key, val] of Object.entries(mortgageState)) params.set(`m_${key}`, val);
    for (const [key, val] of Object.entries(freelanceState)) params.set(`l_${key}`, val);
    for (const [key, val] of Object.entries(inflationState)) params.set(`i_${key}`, val);

    // Update browser history state without page refresh
    const newRelativePathQuery = window.location.pathname + '?' + params.toString();
    history.replaceState(null, '', newRelativePathQuery);
}

// Load state from URL parameters (e.g. when shared link is loaded)
function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    // Check for tab parameter
    const urlTab = params.get('tab');
    const isEmbed = params.get('embed') === 'true';
    const validTabs = ['fire-tab', 'mortgage-tab', 'freelance-tab', 'inflation-tab', 'admin-tab'];
    if (urlTab && validTabs.includes(urlTab)) {
        if (isEmbed && urlTab === 'admin-tab') {
            switchTab('fire-tab');
        } else {
            switchTab(urlTab);
        }
    }

    // Extract states
    const fireState = {};
    const mortgageState = {};
    const freelanceState = {};
    const inflationState = {};

    for (const [key, val] of params.entries()) {
        if (key.startsWith('f_')) fireState[key.replace('f_', '')] = parseFloat(val);
        else if (key.startsWith('m_')) mortgageState[key.replace('m_', '')] = parseFloat(val);
        else if (key.startsWith('l_')) freelanceState[key.replace('l_', '')] = parseFloat(val);
        else if (key.startsWith('i_')) inflationState[key.replace('i_', '')] = parseFloat(val);
    }

    // Pass loaded values back to calculators
    if (Object.keys(fireState).length > 0) setFireState(fireState);
    if (Object.keys(mortgageState).length > 0) setMortgageState(mortgageState);
    if (Object.keys(freelanceState).length > 0) setFreelanceState(freelanceState);
    if (Object.keys(inflationState).length > 0) setInflationState(inflationState);
}

// Share current URL and show alert
function sharePlan() {
    const shareUrl = window.location.href;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
        // Show temporary custom toast notification
        const toast = document.createElement('div');
        toast.style.position = 'fixed';
        toast.style.bottom = '80px';
        toast.style.right = '24px';
        toast.style.backgroundColor = '#10B981';
        toast.style.color = '#fff';
        toast.style.padding = '1rem 1.5rem';
        toast.style.borderRadius = '12px';
        toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '1000';
        toast.style.animation = 'fadeIn 0.3s ease';
        toast.innerHTML = t('toast_copied');
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }).catch(err => {
        console.error('Kopyalama hatası: ', err);
        alert('Plan linki: ' + shareUrl);
    });
}

// Business Widgets: Affiliate Cards and Embed Box Generator
function initBusinessWidgets() {
    // 1. Check if embedded view is requested
    const params = new URLSearchParams(window.location.search);
    if (params.get('embed') === 'true') {
        document.body.classList.add('embedded');
    }

    const suffixMap = {
        'fire': { tab: 'fire-tab', link: config.affiliateLinks.fire || 'https://www.interactivebrokers.com' },
        'mortgage': { tab: 'mortgage-tab', link: config.affiliateLinks.mortgage || 'https://www.lendingtree.com' },
        'freelance': { tab: 'freelance-tab', link: config.affiliateLinks.freelance || 'https://wise.com' },
        'inflation': { tab: 'inflation-tab', link: config.affiliateLinks.inflation || 'https://www.nerdwallet.com/best/banking/high-yield-savings-accounts' }
    };

    const baseUrl = window.location.origin + window.location.pathname;

    for (const [suffix, widgetConfig] of Object.entries(suffixMap)) {
        const promoContainer = document.getElementById(`promo-card-${suffix}`);
        const embedContainer = document.getElementById(`embed-box-${suffix}`);
        const newsletterContainer = document.getElementById(`newsletter-box-${suffix}`);

        if (promoContainer) {
            promoContainer.innerHTML = `
                <div class="promo-card">
                    <span class="promo-badge">💡 Recommendation</span>
                    <h3 class="promo-title">${t('promo_title_' + suffix)}</h3>
                    <p class="promo-desc">${t('promo_desc_' + suffix)}</p>
                    <a href="${widgetConfig.link}" target="_blank" rel="noopener noreferrer" class="promo-btn">
                        <span>${t('promo_btn_' + suffix)}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                </div>
            `;
        }

        if (newsletterContainer) {
            newsletterContainer.innerHTML = `
                <div class="newsletter-box card">
                    <div class="newsletter-header-row">
                        <span class="newsletter-icon">📩</span>
                        <h3 class="newsletter-title">${t('news_title')}</h3>
                    </div>
                    <p class="newsletter-desc">${t('news_desc')}</p>
                    <form class="newsletter-form">
                        <input type="email" required placeholder="${t('news_placeholder')}" class="newsletter-input">
                        <button type="submit" class="newsletter-btn">
                            <span>${t('news_btn')}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                    <div class="newsletter-success-msg" style="display: none;"></div>
                </div>
            `;

            const form = newsletterContainer.querySelector('.newsletter-form');
            const input = newsletterContainer.querySelector('.newsletter-input');
            const successMsg = newsletterContainer.querySelector('.newsletter-success-msg');
            const descText = newsletterContainer.querySelector('.newsletter-desc');

            if (form && input && successMsg && descText) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = input.value.trim();
                    if (email) {
                        if (config.newsletterEndpoint) {
                            fetch(config.newsletterEndpoint, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: email }),
                                mode: 'cors'
                            }).catch(err => {
                                console.warn('Newsletter post error (expected if CORS is not configured on destination or mock link):', err);
                            });
                        }
                        form.style.display = 'none';
                        descText.style.display = 'none';
                        successMsg.innerHTML = t('news_success', { email: email });
                        successMsg.style.display = 'block';
                    }
                });
            }
        }

        if (embedContainer) {
            const embedUrl = `${baseUrl}?tab=${config.tab}&embed=true`;
            const iframeCode = `<iframe src="${embedUrl}" width="100%" height="750" style="border:none; border-radius:16px; box-shadow:var(--shadow-md);"></iframe>`;

            embedContainer.innerHTML = `
                <div class="embed-box card">
                    <h3 class="embed-title">${t('embed_title')}</h3>
                    <p class="embed-desc">${t('embed_desc')}</p>
                    <div class="embed-code-wrapper">
                        <textarea readonly class="embed-textarea">${iframeCode}</textarea>
                        <button class="btn-copy-embed">${t('embed_copy_btn')}</button>
                    </div>
                </div>
            `;

            // Attach event listener to copy button
            const copyBtn = embedContainer.querySelector('.btn-copy-embed');
            const textarea = embedContainer.querySelector('.embed-textarea');

            if (copyBtn && textarea) {
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(textarea.value).then(() => {
                        const originalText = copyBtn.textContent;
                        copyBtn.textContent = t('embed_copied');
                        copyBtn.classList.add('copied');
                        setTimeout(() => {
                            copyBtn.textContent = originalText;
                            copyBtn.classList.remove('copied');
                        }, 2500);
                    }).catch(err => {
                        console.error('Failed to copy embed code: ', err);
                    });
                });
            }
        }
    }
}

// Dynamically inject active tab FAQ
function injectFAQ(tabId) {
    const faqContent = document.getElementById('faq-content');
    const faqSection = document.getElementById('faq-section');
    if (!faqContent) return;

    let faqHtmlKey = '';
    if (tabId === 'fire-tab') faqHtmlKey = 'faq_fire_html';
    else if (tabId === 'mortgage-tab') faqHtmlKey = 'faq_mortgage_html';
    else if (tabId === 'freelance-tab') faqHtmlKey = 'faq_freelance_html';
    else if (tabId === 'inflation-tab') faqHtmlKey = 'faq_inflation_html';

    if (faqHtmlKey) {
        faqContent.innerHTML = t(faqHtmlKey);
        if (faqSection) faqSection.style.display = 'block';
    } else {
        if (faqSection) faqSection.style.display = 'none';
    }
}

// Inject Google Analytics Tracking Script
function injectAnalytics() {
    if (!config.analyticsId) return;
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analyticsId}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${config.analyticsId}');
    `;
    document.head.appendChild(inlineScript);
}

// Inject Google AdSense Tag and Fill Placeholders
function injectAdSense() {
    if (!config.adsenseClientId) return;

    // 1. Inject global script tag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.adsenseClientId}`;
    script.setAttribute('crossorigin', 'anonymous');
    document.head.appendChild(script);

    // 2. Populate header slot
    const headerEl = document.querySelector('.adsense-top-banner');
    if (headerEl && config.adsenseSlots.header) {
        headerEl.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsenseClientId}" data-ad-slot="${config.adsenseSlots.header}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    // 3. Populate sidebar slot
    const sidebarEl = document.querySelector('.adsense-sidebar');
    if (sidebarEl && config.adsenseSlots.sidebar) {
        sidebarEl.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsenseClientId}" data-ad-slot="${config.adsenseSlots.sidebar}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }

    // 4. Populate native slots
    const nativeEls = document.querySelectorAll('.adsense-content-native');
    if (config.adsenseSlots.native) {
        nativeEls.forEach(el => {
            el.innerHTML = `<ins class="adsbygoogle" style="display:block" data-ad-client="${config.adsenseClientId}" data-ad-slot="${config.adsenseSlots.native}" data-ad-format="fluid" data-ad-layout-key="-gw-3+1f-3d+2z" data-full-width-responsive="true"></ins>`;
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
    }

    // 5. Populate sticky footer slot
    const stickyFooterEl = document.querySelector('.adsense-sticky-footer .adsense-placeholder');
    if (stickyFooterEl && config.adsenseSlots.stickyFooter) {
        stickyFooterEl.innerHTML = `<ins class="adsbygoogle" style="display:inline-block;width:728px;height:50px" data-ad-client="${config.adsenseClientId}" data-ad-slot="${config.adsenseSlots.stickyFooter}"></ins>`;
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
}

// Populate Admin form fields with active configuration
function populateAdminForm() {
    const adsenseClientInput = document.getElementById('admin-adsense-client');
    const analyticsIdInput = document.getElementById('admin-analytics-id');
    const adsenseHeaderInput = document.getElementById('admin-adsense-header');
    const adsenseSidebarInput = document.getElementById('admin-adsense-sidebar');
    const adsenseNativeInput = document.getElementById('admin-adsense-native');
    const adsenseStickyInput = document.getElementById('admin-adsense-sticky');
    const newsletterEndpointInput = document.getElementById('admin-newsletter-endpoint');
    const affiliateFireInput = document.getElementById('admin-affiliate-fire');
    const affiliateMortgageInput = document.getElementById('admin-affiliate-mortgage');
    const affiliateFreelanceInput = document.getElementById('admin-affiliate-freelance');
    const affiliateInflationInput = document.getElementById('admin-affiliate-inflation');

    if (adsenseClientInput) adsenseClientInput.value = config.adsenseClientId || '';
    if (analyticsIdInput) analyticsIdInput.value = config.analyticsId || '';
    if (adsenseHeaderInput) adsenseHeaderInput.value = config.adsenseSlots.header || '';
    if (adsenseSidebarInput) adsenseSidebarInput.value = config.adsenseSlots.sidebar || '';
    if (adsenseNativeInput) adsenseNativeInput.value = config.adsenseSlots.native || '';
    if (adsenseStickyInput) adsenseStickyInput.value = config.adsenseSlots.sticky || '';
    if (newsletterEndpointInput) newsletterEndpointInput.value = config.newsletterEndpoint || '';
    
    if (affiliateFireInput) affiliateFireInput.value = config.affiliateLinks.fire || '';
    if (affiliateMortgageInput) affiliateMortgageInput.value = config.affiliateLinks.mortgage || '';
    if (affiliateFreelanceInput) affiliateFreelanceInput.value = config.affiliateLinks.freelance || '';
    if (affiliateInflationInput) affiliateInflationInput.value = config.affiliateLinks.inflation || '';
}

// Bind UI actions to Admin Dashboard Form
function initAdminPanel() {
    populateAdminForm();

    const form = document.getElementById('admin-config-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newConfig = {
                adsenseClientId: document.getElementById('admin-adsense-client').value.trim(),
                analyticsId: document.getElementById('admin-analytics-id').value.trim(),
                adsenseSlots: {
                    header: document.getElementById('admin-adsense-header').value.trim(),
                    sidebar: document.getElementById('admin-adsense-sidebar').value.trim(),
                    native: document.getElementById('admin-adsense-native').value.trim(),
                    stickyFooter: document.getElementById('admin-adsense-sticky').value.trim()
                },
                newsletterEndpoint: document.getElementById('admin-newsletter-endpoint').value.trim(),
                affiliateLinks: {
                    fire: document.getElementById('admin-affiliate-fire').value.trim(),
                    mortgage: document.getElementById('admin-affiliate-mortgage').value.trim(),
                    freelance: document.getElementById('admin-affiliate-freelance').value.trim(),
                    inflation: document.getElementById('admin-affiliate-inflation').value.trim()
                }
            };

            localStorage.setItem('fincalc_config', JSON.stringify(newConfig));

            // Custom toast notification
            const toast = document.createElement('div');
            toast.style.position = 'fixed';
            toast.style.bottom = '80px';
            toast.style.right = '24px';
            toast.style.backgroundColor = '#10B981';
            toast.style.color = '#fff';
            toast.style.padding = '1rem 1.5rem';
            toast.style.borderRadius = '12px';
            toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
            toast.style.fontWeight = '600';
            toast.style.zIndex = '1000';
            toast.style.animation = 'fadeIn 0.3s ease';
            toast.innerHTML = t('admin_success_save');
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        });
    }

    const downloadBtn = document.getElementById('btn-admin-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const adsenseClientId = document.getElementById('admin-adsense-client').value.trim();
            const analyticsId = document.getElementById('admin-analytics-id').value.trim();
            const adsenseHeader = document.getElementById('admin-adsense-header').value.trim();
            const adsenseSidebar = document.getElementById('admin-adsense-sidebar').value.trim();
            const adsenseNative = document.getElementById('admin-adsense-native').value.trim();
            const adsenseSticky = document.getElementById('admin-adsense-sticky').value.trim();
            const newsletterEndpoint = document.getElementById('admin-newsletter-endpoint').value.trim();
            
            const affiliateFire = document.getElementById('admin-affiliate-fire').value.trim();
            const affiliateMortgage = document.getElementById('admin-affiliate-mortgage').value.trim();
            const affiliateFreelance = document.getElementById('admin-affiliate-freelance').value.trim();
            const affiliateInflation = document.getElementById('admin-affiliate-inflation').value.trim();

            const fileContent = `// FinCalc Pro Configuration File
// This file can be modified manually or updated and downloaded via the Admin Dashboard.
export const config = {
    // Google AdSense Configuration
    adsenseClientId: "${adsenseClientId}", // e.g. "ca-pub-1234567890123456"
    adsenseSlots: {
        header: "${adsenseHeader}", // e.g. "9876543210"
        sidebar: "${adsenseSidebar}", // e.g. "9876543211"
        native: "${adsenseNative}", // e.g. "9876543212"
        stickyFooter: "${adsenseSticky}" // e.g. "9876543213"
    },

    // Google Analytics Configuration
    analyticsId: "${analyticsId}", // e.g. "G-XXXXXXXXXX"

    // Newsletter Integration Link (e.g. Substack subscription URL or custom API endpoint)
    newsletterEndpoint: "${newsletterEndpoint}", // e.g. "https://yourbrand.substack.com"

    // Affiliate Partner Links
    affiliateLinks: {
        fire: "${affiliateFire}",
        mortgage: "${affiliateMortgage}",
        freelance: "${affiliateFreelance}",
        inflation: "${affiliateInflation}"
    }
};
`;

            const blob = new Blob([fileContent], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'config.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
}

// Preset configurations for all 4 calculators
const presets = {
    fire: {
        standard: { 'fire-current-age': 30, 'fire-net-worth': 10000, 'fire-monthly-savings': 500, 'fire-monthly-expenses': 1500, 'fire-roi': 10, 'fire-inflation': 3 },
        lean: { 'fire-current-age': 30, 'fire-net-worth': 50000, 'fire-monthly-savings': 1500, 'fire-monthly-expenses': 1200, 'fire-roi': 9, 'fire-inflation': 3 },
        fat: { 'fire-current-age': 30, 'fire-net-worth': 100000, 'fire-monthly-savings': 3500, 'fire-monthly-expenses': 4000, 'fire-roi': 11, 'fire-inflation': 3 }
    },
    mortgage: {
        balanced: { 'mort-home-price': 250000, 'mort-down-payment': 50000, 'mort-loan-term': 30, 'mort-interest': 6.5, 'mort-rent': 1500, 'mort-rent-increase': 4 },
        'low-interest': { 'mort-home-price': 300000, 'mort-down-payment': 60000, 'mort-loan-term': 30, 'mort-interest': 3.5, 'mort-rent': 1800, 'mort-rent-increase': 5 },
        'high-interest': { 'mort-home-price': 200000, 'mort-down-payment': 40000, 'mort-loan-term': 15, 'mort-interest': 8.5, 'mort-rent': 1200, 'mort-rent-increase': 3 }
    },
    freelance: {
        mid: { 'free-target-income': 60000, 'free-expenses': 800, 'free-tax': 20, 'free-weekly-hours': 30, 'free-vacation': 4 },
        junior: { 'free-target-income': 35000, 'free-expenses': 300, 'free-tax': 15, 'free-weekly-hours': 35, 'free-vacation': 2 },
        senior: { 'free-target-income': 120000, 'free-expenses': 1800, 'free-tax': 30, 'free-weekly-hours': 25, 'free-vacation': 6 }
    },
    inflation: {
        mild: { 'inf-starting-amount': 10000, 'inf-inflation-rate': 2, 'inf-years': 10 },
        high: { 'inf-starting-amount': 10000, 'inf-inflation-rate': 10, 'inf-years': 10 },
        hyper: { 'inf-starting-amount': 10000, 'inf-inflation-rate': 25, 'inf-years': 10 }
    }
};

// Bind preset button click events to update inputs dynamically
function initPresets() {
    document.querySelectorAll('.btn-preset').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const calcType = btn.getAttribute('data-calc');
            const presetName = btn.getAttribute('data-preset');
            
            if (presets[calcType] && presets[calcType][presetName]) {
                btn.parentElement.querySelectorAll('.btn-preset').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const values = presets[calcType][presetName];
                for (const [inputId, val] of Object.entries(values)) {
                    const input = document.getElementById(inputId);
                    if (input) {
                        input.value = val;
                        // Dispatch input event to notify calculator modules to update layout badges
                        input.dispatchEvent(new Event('input'));
                    }
                }
                
                updateAllCalculators();
                syncStateToURL();
            }
        });
    });
}

// Bind currency select change handler and print report window prints
function initCurrencyAndPrint() {
    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
        currencySelect.value = currentCurrency;
        currencySelect.addEventListener('change', (e) => {
            setCurrency(e.target.value);
            // Trigger input change events on all sliders to refresh localized currency labels
            document.querySelectorAll('.input-panel input[type="range"]').forEach(input => {
                input.dispatchEvent(new Event('input'));
            });
            updateAllCalculators();
        });
    }

    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
}

// Check URL query parameters and sessionStorage to handle Admin Dashboard link visibility
function initAdminSessionSecurity() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('manage') === 'true') {
        sessionStorage.setItem('fincalc_admin_session', 'true');
    }
    const isAdminSession = sessionStorage.getItem('fincalc_admin_session') === 'true';
    const navAdmin = document.getElementById('nav-admin');
    if (navAdmin) {
        if (isAdminSession) {
            navAdmin.style.display = 'flex';
        } else {
            navAdmin.style.display = 'none';
        }
    }
}

// Initialize cookie banner UI and local storage key persistence
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('btn-cookie-accept');
    const privacyLink = document.getElementById('link-cookie-privacy');

    if (!cookieBanner) return;

    const consentGiven = localStorage.getItem('fincalc_cookie_consent') === 'true';
    if (!consentGiven) {
        cookieBanner.style.display = 'block';
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('fincalc_cookie_consent', 'true');
            cookieBanner.style.animation = 'slideUpCookie 0.4s reverse';
            setTimeout(() => {
                cookieBanner.style.display = 'none';
            }, 400);
        });
    }

    if (privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPrivacyModal();
        });
    }
}

// Inject JSON-LD Schema markup for Google and search engines
function injectSEOSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "FinCalc Pro",
        "operatingSystem": "All",
        "applicationCategory": "FinanceApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": "Smart Financial & FIRE Calculation Tools. Calculate FIRE retirement, Buy vs Rent Mortgage, Freelance rates and Inflation erosion.",
        "featureList": [
            "FIRE Retirement Calculator",
            "Buy vs. Rent Mortgage Simulator",
            "Freelance Hourly Rate Planner",
            "Inflation Erosion Calculator"
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Initialize the Application wrapper to include modals and i18n
function initAppWrapper() {
    // Dynamic tracking and ads scripts injection
    injectAnalytics();
    injectAdSense();

    // Detect and apply language translations
    detectLanguage();
    localizeDOM();
    
    // Initialize monetization and traffic widgets
    initBusinessWidgets();
    
    // Start main app
    injectSEOSchema();
    initApp();
    initModalListeners();
    
    // Initial FAQ injection
    injectFAQ(activeTab);
}

// Start application when DOM is ready
window.addEventListener('DOMContentLoaded', initAppWrapper);

