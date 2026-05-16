document.addEventListener('DOMContentLoaded', () => {

    // --- State & Selectors ---
    const navLinks = document.querySelectorAll('.nav-link, .cta-link');
    const pageViews = document.querySelectorAll('.page-view');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contrastToggle = document.getElementById('contrast-toggle');
    const productFilter = document.getElementById('product-filter');
    const productItems = document.querySelectorAll('.product-item');
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    // --- 1. Navigation Engine (Single Page View Controller) ---
    function switchView(targetId) {
        pageViews.forEach(view => {
            if (view.id === targetId) {
                view.classList.add('active-view');
            } else {
                view.classList.remove('active-view');
            }
        });

        // Synchronize Active Classes on Main Navigation Links
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Accessible Focus Shift to Section Heading
        const targetedHeading = document.querySelector(`#${targetId} h2, #${targetId} h1`);
        if (targetedHeading) {
            targetedHeading.setAttribute('tabindex', '-1');
            targetedHeading.focus();
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            switchView(target);
            
            // Auto close mobile drawer system if active
            if (navMenu.classList.contains('mobile-open')) {
                toggleMobileMenu();
            }
        });
    });

    // --- 2. Mobile Responsive Menu Controller ---
    function toggleMobileMenu() {
        const isOpen = navMenu.classList.toggle('mobile-open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    }
    menuToggle.addEventListener('click', toggleMobileMenu);

    // --- 3. Dynamic Product Sorting Filter System ---
    if (productFilter) {
        productFilter.addEventListener('change', (e) => {
            const chosenFilter = e.target.value;
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (chosenFilter === 'all' || category === chosenFilter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- 4. Interactive Validation Engine (Contact Form) ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameField = document.getElementById('user-name');
            const emailField = document.getElementById('user-email');
            const messageField = document.getElementById('user-message');
            
            // Clean slate evaluation
            formFeedback.innerHTML = '';
            formFeedback.style.color = 'inherit';

            if (!nameField.value.trim() || !emailField.value.trim() || !messageField.value.trim()) {
                formFeedback.textContent = 'Error: Please fill in all required fields marked with an asterisk (*).';
                formFeedback.style.color = '#d32f2f';
                return;
            }

            if (!emailField.value.includes('@')) {
                formFeedback.textContent = 'Error: Please enter a valid business email address.';
                formFeedback.style.color = '#d32f2f';
                return;
            }

            // Mock successful transaction deployment
            formFeedback.textContent = 'Thank you! Your inquiry has been sent to our green technology consultants.';
            formFeedback.style.color = 'var(--primary-green)';
            contactForm.reset();
        });
    }

    // --- 5. WCAG Accessibility Contrast System Engine ---
    contrastToggle.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        
        // Notify assistive screen reading applications of modern state alteration
        contrastToggle.setAttribute('aria-pressed', isHighContrast);
    });
});