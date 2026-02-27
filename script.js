// ============================================================
// CONFIGURATION — Change these values to update the website
// ============================================================

// FormSubmit.co endpoint — This is linked to: rakesh837m@gmail.com
// Activated at: https://formsubmit.co/el/yacenu
// TO CHANGE RECEIVER EMAIL:
//   1. Go to https://formsubmit.co/
//   2. Enter your new email and activate it
//   3. Replace the email in the URL below with your new email
const FORM_URL = 'https://formsubmit.co/ajax/rakesh837m@gmail.com';

// ============================================================
// MOBILE MENU
// ============================================================
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');

let isMenuOpen = false;

menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileNav.classList.toggle('open', isMenuOpen);
    menuIconOpen.classList.toggle('hidden', isMenuOpen);
    menuIconClose.classList.toggle('hidden', !isMenuOpen);
});

function closeMobileMenu() {
    isMenuOpen = false;
    mobileNav.classList.remove('open');
    menuIconOpen.classList.remove('hidden');
    menuIconClose.classList.add('hidden');
}

// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.querySelectorAll('.animate-on-scroll')) : [];
            const siblingIndex = siblings.indexOf(entry.target);
            const delay = siblingIndex >= 0 ? siblingIndex * 100 : 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
});

// ============================================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('onclick')) return;
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ============================================================
// FOOTER YEAR
// ============================================================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ============================================================
// CONTACT FORM — AJAX submission (no page redirect)
//
// Email you receive will look like:
//   Subject: "Psychology Insight — New Message from [Name]"
//   Body: A clean table with Name, Email, Subject, Message
// ============================================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !message) {
        showStatus('contactStatus', 'Please fill in all required fields.', 'error');
        return;
    }

    // Show sending state
    const btn = document.getElementById('formSubmit');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    showStatus('contactStatus', 'Sending your message...', 'sending');

    try {
        const response = await fetch(FORM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "Sender Name": name,
                "Sender Email": email,
                "Subject": subject,
                "Message": message,
                "_subject": `Psychology Insight — New Message from ${name}`,
                "_template": "table",
                "_replyto": email
            })
        });

        const result = await response.json();

        if (result.success) {
            // Show success message, hide form
            contactForm.style.display = 'none';
            document.getElementById('contactSuccess').style.display = 'block';
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        showStatus('contactStatus', 'Could not send. Please email directly at rakesh837m@gmail.com', 'error');
        btn.textContent = 'Send Message';
        btn.disabled = false;
        btn.style.opacity = '1';
    }
});

/**
 * Reset contact form — show form again, hide success message
 */
function resetContactForm() {
    contactForm.reset();
    contactForm.style.display = 'flex';
    document.getElementById('contactSuccess').style.display = 'none';
    document.getElementById('contactStatus').className = 'form-status';
    document.getElementById('contactStatus').textContent = '';
    const btn = document.getElementById('formSubmit');
    btn.textContent = 'Send Message';
    btn.disabled = false;
    btn.style.opacity = '1';
}

// ============================================================
// BOOKING MODAL — Open / Close
// ============================================================

/**
 * Opens the booking session modal popup
 */
function openBookingModal(event) {
    if (event) event.preventDefault();
    document.getElementById('bookingModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the booking session modal popup
 */
function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('open');
    document.body.style.overflow = '';
    // Reset booking form for next use
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.reset();
    bookingForm.style.display = 'flex';
    document.getElementById('bookingSuccess').style.display = 'none';
    document.getElementById('bookingStatus').className = 'form-status';
    document.getElementById('bookingStatus').textContent = '';
    const btn = document.getElementById('bookingSubmit');
    btn.textContent = 'Request Session';
    btn.disabled = false;
    btn.style.opacity = '1';
}

// Close modal when clicking outside
document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeBookingModal();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBookingModal();
});

// ============================================================
// BOOKING FORM — AJAX submission (no page redirect)
//
// Email you receive will look like:
//   Subject: "New Client: [Client Name] — Booking from Psychology Insight"
//   Body: A clean table with all client details:
//         Client Name, Age, Gender, Phone, Email,
//         Preferred Language, Reason, Description,
//         Preferred Date, Preferred Time
// ============================================================
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect all form data
    const clientName = document.getElementById('bookingName').value.trim();

    // Get all named inputs from the form
    const formData = {};
    const inputs = bookingForm.querySelectorAll('input:not([type="hidden"]), select, textarea');
    inputs.forEach((input) => {
        const name = input.getAttribute('name');
        if (name && input.value) {
            formData[name] = input.value;
        }
    });

    // Validate required fields
    if (!clientName) {
        showStatus('bookingStatus', 'Please fill in all required fields.', 'error');
        return;
    }

    // Show sending state
    const btn = document.getElementById('bookingSubmit');
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    showStatus('bookingStatus', 'Submitting your booking request...', 'sending');

    try {
        const response = await fetch(FORM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                "_subject": `New Client: ${clientName} — Booking from Psychology Insight`,
                "_template": "table",
                "_replyto": formData["Email"] || ""
            })
        });

        const result = await response.json();

        if (result.success) {
            // Show success message, hide form
            bookingForm.style.display = 'none';
            document.getElementById('bookingSuccess').style.display = 'block';
        } else {
            throw new Error('Submission failed');
        }
    } catch (error) {
        showStatus('bookingStatus', 'Could not send. Please email directly at rakesh837m@gmail.com', 'error');
        btn.textContent = 'Request Session';
        btn.disabled = false;
        btn.style.opacity = '1';
    }
});

// ============================================================
// HELPER — Show status messages
// ============================================================

/**
 * Show a status message below a form
 * @param {string} elementId - ID of the status div
 * @param {string} message - Message to show
 * @param {string} type - 'success', 'error', or 'sending'
 */
function showStatus(elementId, message, type) {
    const el = document.getElementById(elementId);
    el.textContent = message;
    el.className = `form-status ${type}`;
}
