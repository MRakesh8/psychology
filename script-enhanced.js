/**
 * ============================================================
 * PRODUCTION-READY FORM HANDLER
 * Form validation, security, rate limiting, and accessibility
 * Production version with enhanced features
 * ============================================================
 */

// ============================================================
// CONFIGURATION
// ============================================================

const FORM_CONFIG = {
  endpoint: 'https://formsubmit.co/ajax/rakesh837m@gmail.com',
  rateLimitMs: 30000, // 30 seconds between submissions
  timeout: 10000, // 10 second API timeout
};

// ============================================================
// VALIDATION UTILITIES
// ============================================================

/**
 * Indian phone number validation
 */
const validatePhoneNumber = (phone) => {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
};

/**
 * Email validation
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Name validation
 */
const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Age validation (10-120)
 */
const validateAge = (age) => {
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
  return !isNaN(ageNum) && ageNum >= 10 && ageNum <= 120;
};

/**
 * Text validation (min/max length, no spam patterns)
 */
const validateText = (text, minLength = 5, maxLength = 1000) => {
  const trimmed = text.trim();
  if (trimmed.length < minLength || trimmed.length > maxLength) return false;
  const suspiciousCount = (trimmed.match(/[!@#$%^&*]/g) || []).length;
  return suspiciousCount <= 3; // Allow some special chars but prevent spam
};

/**
 * Sanitize input - remove potentially dangerous characters
 */
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove HTML special chars
    .slice(0, 1000); // Limit length
};

/**
 * Check rate limit (prevent multiple submissions)
 */
const checkRateLimit = (key, delayMs = 30000) => {
  const lastSubmitTime = localStorage.getItem(`formsubmit_${key}`);
  if (!lastSubmitTime) return 0;

  const elapsed = Date.now() - parseInt(lastSubmitTime, 10);
  const remaining = delayMs - elapsed;

  return remaining > 0 ? remaining : 0;
};

/**
 * Set rate limit in localStorage
 */
const setRateLimit = (key) => {
  localStorage.setItem(`formsubmit_${key}`, Date.now().toString());
};

/**
 * Validate honeypot (should be empty if human)
 */
const validateHoneypot = (value) => {
  return !value || value.trim().length === 0;
};

// ============================================================
// UI FEEDBACK FUNCTIONS
// ============================================================

/**
 * Show status message with aria-live for accessibility
 */
const showStatus = (elementId, message, type) => {
  const el = document.getElementById(elementId);
  if (!el) return;
  
  el.textContent = message;
  el.className = `form-status ${type}`;
  el.setAttribute('role', 'alert');
  el.setAttribute('aria-live', 'assertive');
};

/**
 * Disable form submission button
 */
const disableSubmitButton = (buttonId, originalText) => {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');
  btn.classList.add('loading');
  btn.innerHTML = `<span class="spinner"></span> ${originalText}`;
  btn.style.opacity = '0.7';
};

/**
 * Enable form submission button
 */
const enableSubmitButton = (buttonId, originalText) => {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  
  btn.disabled = false;
  btn.setAttribute('aria-busy', 'false');
  btn.classList.remove('loading');
  btn.textContent = originalText;
  btn.style.opacity = '1';
};

// ============================================================
// MOBILE MENU
// ============================================================

const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');

let isMenuOpen = false;

menuToggle?.addEventListener('click', () => {
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
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
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
      const navHeight = navbar?.offsetHeight || 0;
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
// CONTACT FORM — PRODUCTION VERSION
// ============================================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const subject = document.getElementById('formSubject').value;
    const message = document.getElementById('formMessage').value.trim();
    const honeypot = document.getElementById('hp') ? document.getElementById('hp').value : '';

    // Check rate limit
    const waitTime = checkRateLimit('contact');
    if (waitTime > 0) {
      const seconds = Math.ceil(waitTime / 1000);
      showStatus('contactStatus', `Please wait ${seconds}s before submitting again.`, 'error');
      return;
    }

    // Honeypot check
    if (!validateHoneypot(honeypot)) {
      console.warn('🚫 Honeypot triggered - bot detected');
      showStatus('contactStatus', 'Form validation failed. Please try again.', 'error');
      return;
    }

    // Validate inputs
    if (!validateName(name)) {
      showStatus('contactStatus', 'Please enter a valid name (2-50 characters)', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showStatus('contactStatus', 'Please enter a valid email address', 'error');
      return;
    }

    if (!subject || subject.trim().length < 3) {
      showStatus('contactStatus', 'Please enter a subject', 'error');
      return;
    }

    if (!validateText(message, 10, 1000)) {
      showStatus('contactStatus', 'Message must be 10-1000 characters', 'error');
      return;
    }

    // Disable button and show loading
    const btnText = 'Send Message';
    disableSubmitButton('formSubmit', btnText);
    showStatus('contactStatus', '📤 Sending your message...', 'loading');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FORM_CONFIG.timeout);

      const response = await fetch(FORM_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          'Sender Name': sanitizeInput(name),
          'Sender Email': sanitizeInput(email),
          'Subject': sanitizeInput(subject),
          'Message': sanitizeInput(message),
          '_subject': `Psychology Insight — New Message from ${sanitizeInput(name)}`,
          '_template': 'table',
          '_replyto': sanitizeInput(email),
          '_captcha': 'false',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();

      if (result.success) {
        setRateLimit('contact');
        showStatus('contactStatus', '✅ Message sent successfully!', 'success');
        contactForm.style.display = 'none';
        document.getElementById('contactSuccess').style.display = 'block';
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      const errorMsg = error.message.includes('abort')
        ? 'Request timeout. Please try again.'
        : 'Unable to send. Please email directly at rakesh837m@gmail.com';
      showStatus('contactStatus', errorMsg, 'error');
      enableSubmitButton('formSubmit', btnText);
    }
  });
}

// ============================================================
// BOOKING MODAL — Open / Close
// ============================================================

function openBookingModal(event) {
  if (event) event.preventDefault();
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    
    // Reset form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.reset();
      bookingForm.style.display = 'flex';
    }
    const successMsg = document.getElementById('bookingSuccess');
    if (successMsg) successMsg.style.display = 'none';
    const statusEl = document.getElementById('bookingStatus');
    if (statusEl) {
      statusEl.className = 'form-status';
      statusEl.textContent = '';
    }
    enableSubmitButton('bookingSubmit', 'Request Session');
  }
}

// Close modal when clicking outside
const bookingModal = document.getElementById('bookingModal');
if (bookingModal) {
  bookingModal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeBookingModal();
  });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBookingModal();
});

// ============================================================
// BOOKING FORM — PRODUCTION VERSION
// ============================================================

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('bookingName').value.trim();
    const age = document.getElementById('bookingAge')?.value || '';
    const phone = document.getElementById('bookingPhone')?.value || '';
    const email = document.getElementById('bookingEmail')?.value || '';
    const reason = document.getElementById('bookingReason')?.value || '';
    const honeypot = document.getElementById('bhp') ? document.getElementById('bhp').value : '';

    // Check rate limit
    const waitTime = checkRateLimit('booking');
    if (waitTime > 0) {
      const seconds = Math.ceil(waitTime / 1000);
      showStatus('bookingStatus', `Please wait ${seconds}s before submitting again.`, 'error');
      return;
    }

    // Honeypot check
    if (!validateHoneypot(honeypot)) {
      console.warn('🚫 Honeypot triggered - bot detected');
      showStatus('bookingStatus', 'Form validation failed. Please try again.', 'error');
      return;
    }

    // Validate inputs
    if (!validateName(name)) {
      showStatus('bookingStatus', 'Please enter a valid name', 'error');
      return;
    }

    if (!validateAge(age)) {
      showStatus('bookingStatus', 'Please enter a valid age (10-120)', 'error');
      return;
    }

    if (!validatePhoneNumber(phone)) {
      showStatus('bookingStatus', 'Please enter a valid Indian phone number', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showStatus('bookingStatus', 'Please enter a valid email', 'error');
      return;
    }

    if (!validateText(reason, 5, 500)) {
      showStatus('bookingStatus', 'Please describe your concern (5-500 chars)', 'error');
      return;
    }

    // Disable button and show loading
    const btnText = 'Request Session';
    disableSubmitButton('bookingSubmit', btnText);
    showStatus('bookingStatus', '📤 Processing your request...', 'loading');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), FORM_CONFIG.timeout);

      // Collect all form data
      const formData = {};
      const inputs = bookingForm.querySelectorAll('input:not([id^="bhp"]), select, textarea:not([id^="bhp"])');
      inputs.forEach((input) => {
        const name = input.name;
        if (name && input.value) {
          formData[name] = sanitizeInput(input.value);
        }
      });

      const response = await fetch(FORM_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          ...formData,
          '_subject': `New Booking: ${sanitizeInput(name)} — Psychology Insight`,
          '_template': 'table',
          '_replyto': formData['Email'] || '',
          '_captcha': 'false',
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();

      if (result.success) {
        setRateLimit('booking');
        showStatus('bookingStatus', '✅ Booking request sent! We\'ll contact you soon.', 'success');
        bookingForm.style.display = 'none';
        document.getElementById('bookingSuccess').style.display = 'block';
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error('❌ Booking submission error:', error);
      const errorMsg = error.message.includes('abort')
        ? 'Request timeout. Please try again.'
        : 'Unable to submit booking. Please try again.';
      showStatus('bookingStatus', errorMsg, 'error');
      enableSubmitButton('bookingSubmit', btnText);
    }
  });
}

// ============================================================
// FORM RESET FUNCTIONS
// ============================================================

function resetContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.reset();
    form.style.display = 'flex';
  }
  const successMsg = document.getElementById('contactSuccess');
  if (successMsg) successMsg.style.display = 'none';
  const statusEl = document.getElementById('contactStatus');
  if (statusEl) {
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }
  enableSubmitButton('formSubmit', 'Send Message');
}

// ============================================================
// PERFORMANCE: Image Lazy Loading
// ============================================================

// Ensure images load lazily for better performance
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img:not([loading])').forEach((img) => {
    img.loading = 'lazy';
  });
} else {
  // Fallback for browsers without native lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src || entry.target.src;
        imageObserver.unobserve(entry.target);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================================
// ANALYTICS & TRACKING (Optional)
// ============================================================

// Track form submissions (optional - requires GA4 setup)
function trackFormSubmission(formType, success) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'form_submission', {
      form_type: formType,
      success: success,
      timestamp: new Date().toISOString(),
    });
  }
}

// ============================================================
// PAGE VISIBILITY: Warn User About Unsaved Changes
// ============================================================

let formModified = false;

document.querySelectorAll('form input, form textarea, form select').forEach((field) => {
  field.addEventListener('change', () => {
    formModified = true;
  });
});

window.addEventListener('beforeunload', (e) => {
  if (formModified && !document.getElementById('contactSuccess').style.display === 'block') {
    e.preventDefault();
    e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
  }
});

// ============================================================
// CONSOLE MESSAGES FOR DEVELOPMENT
// ============================================================

console.log(
  '%cPsychology Insight',
  'font-size: 16px; font-weight: bold; color: #5A5A40;'
);
console.log(
  '%cForm Handler Loaded ✓\nValidation: Active ✓\nRate Limiting: Active ✓\nSecurity: Enabled ✓',
  'font-size: 12px; color: #6B7280;'
);
