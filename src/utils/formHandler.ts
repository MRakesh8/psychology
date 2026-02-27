/**
 * Production-Ready Form Handler
 * Enhanced security, validation, rate limiting, and accessibility
 * Compatible with FormSubmit.co service
 */

import {
  validateContactForm,
  validateBookingForm,
  validateHoneypot,
  checkRateLimit,
  setRateLimit,
  sanitizeInput,
} from './formValidation';

// Configuration
const FORM_CONFIG = {
  endpoint: import.meta.env.VITE_FORMSUBMIT_ENDPOINT || 'https://formsubmit.co/ajax/rakesh837m@gmail.com',
  rateLimitMs: 30000, // 30 seconds between submissions
  timeout: 10000, // 10 second API timeout
};

/**
 * Show status message in UI
 */
export const showFormStatus = (
  elementId: string,
  message: string,
  type: 'success' | 'error' | 'loading' | 'info'
): void => {
  const statusEl = document.getElementById(elementId);
  if (!statusEl) return;

  statusEl.textContent = message;
  statusEl.className = `form-status ${type}`;
  statusEl.setAttribute('role', 'alert');
  statusEl.setAttribute('aria-live', 'assertive');
};

/**
 * Disable form submission to prevent double-submit
 */
export const disableFormSubmission = (
  buttonId: string,
  originalText: string,
  showLoader = true
): void => {
  const btn = document.getElementById(buttonId) as HTMLButtonElement;
  if (!btn) return;

  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');
  btn.innerHTML = showLoader
    ? `<span class="loading-spinner"></span> ${originalText}`
    : originalText;
};

/**
 * Enable form submission
 */
export const enableFormSubmission = (
  buttonId: string,
  originalText: string
): void => {
  const btn = document.getElementById(buttonId) as HTMLButtonElement;
  if (!btn) return;

  btn.disabled = false;
  btn.setAttribute('aria-busy', 'false');
  btn.textContent = originalText;
};

/**
 * Process contact form submission
 */
export const submitContactForm = async (
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    honeypot?: string;
  },
  options: {
    statusElementId: string;
    submitButtonId: string;
    formElementId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
): Promise<boolean> => {
  const { statusElementId, submitButtonId, formElementId, onSuccess, onError } = options;

  // Rate limit check
  const waitTime = checkRateLimit('contact');
  if (waitTime > 0) {
    const seconds = Math.ceil(waitTime / 1000);
    showFormStatus(
      statusElementId,
      `Please wait ${seconds} seconds before submitting again.`,
      'error'
    );
    return false;
  }

  // Validate honeypot
  if (!validateHoneypot(formData.honeypot || '')) {
    console.warn('Honeypot triggered - likely bot submission');
    showFormStatus(statusElementId, 'Form validation failed. Please try again.', 'error');
    return false;
  }

  // Validate form
  const validation = validateContactForm(formData);
  if (!validation.isValid) {
    const errorList = Object.values(validation.errors).join('. ');
    showFormStatus(statusElementId, errorList, 'error');
    return false;
  }

  // Disable button to prevent double-submit
  const originalButtonText = 'Send Message';
  disableFormSubmission(submitButtonId, originalButtonText, true);
  showFormStatus(statusElementId, 'Sending your message...', 'loading');

  try {
    // Prepare form data with security headers
    const submitData = {
      'Sender Name': sanitizeInput(formData.name),
      'Sender Email': sanitizeInput(formData.email),
      'Subject': sanitizeInput(formData.subject),
      'Message': sanitizeInput(formData.message),
      '_subject': `Psychology Insight — New Message from ${sanitizeInput(formData.name)}`,
      '_template': 'table',
      '_replyto': sanitizeInput(formData.email),
      '_captcha': 'false', // FormSubmit will handle reCAPTCHA if needed
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FORM_CONFIG.timeout);

    const response = await fetch(FORM_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(submitData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      // Set rate limit
      setRateLimit('contact');

      // Show success message
      showFormStatus(
        statusElementId,
        '✓ Message sent successfully! Redirecting...',
        'success'
      );

      // Reset form
      const form = document.getElementById(formElementId) as HTMLFormElement;
      if (form) form.reset();

      // Hide form and show thank you
      const formElement = document.getElementById(formElementId);
      if (formElement) formElement.style.display = 'none';
      const successElement = document.getElementById('contactSuccess');
      if (successElement) successElement.style.display = 'block';

      onSuccess?.();
      return true;
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Form submission error:', error);

    const errorMessage =
      error instanceof Error && error.message.includes('abort')
        ? 'Request timeout. Please try again.'
        : 'Unable to send your message. Please try again or email directly.';

    showFormStatus(statusElementId, errorMessage, 'error');
    onError?.(errorMessage);

    // Re-enable button on error
    enableFormSubmission(submitButtonId, originalButtonText);
    return false;
  }
};

/**
 * Process booking form submission
 */
export const submitBookingForm = async (
  formData: {
    name: string;
    age: string;
    phone: string;
    email: string;
    gender?: string;
    language?: string;
    reason: string;
    description?: string;
    preferredDate?: string;
    preferredTime?: string;
    honeypot?: string;
  },
  options: {
    statusElementId: string;
    submitButtonId: string;
    formElementId: string;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
): Promise<boolean> => {
  const { statusElementId, submitButtonId, formElementId, onSuccess, onError } = options;

  // Rate limit check
  const waitTime = checkRateLimit('booking');
  if (waitTime > 0) {
    const seconds = Math.ceil(waitTime / 1000);
    showFormStatus(
      statusElementId,
      `Please wait ${seconds} seconds before submitting again.`,
      'error'
    );
    return false;
  }

  // Validate honeypot
  if (!validateHoneypot(formData.honeypot || '')) {
    console.warn('Honeypot triggered - likely bot submission');
    showFormStatus(statusElementId, 'Form validation failed. Please try again.', 'error');
    return false;
  }

  // Validate form
  const validation = validateBookingForm(formData);
  if (!validation.isValid) {
    const errorList = Object.values(validation.errors).join('. ');
    showFormStatus(statusElementId, errorList, 'error');
    return false;
  }

  // Disable button
  const originalButtonText = 'Request Session';
  disableFormSubmission(submitButtonId, originalButtonText, true);
  showFormStatus(statusElementId, 'Processing your request...', 'loading');

  try {
    // Prepare form data
    const submitData = {
      'Client Name': sanitizeInput(formData.name),
      'Age': formData.age,
      'Phone': sanitizeInput(formData.phone),
      'Email': sanitizeInput(formData.email),
      ...(formData.gender && { 'Gender': sanitizeInput(formData.gender) }),
      ...(formData.language && { 'Preferred Language': sanitizeInput(formData.language) }),
      'Concern': sanitizeInput(formData.reason),
      ...(formData.description && { 'Details': sanitizeInput(formData.description) }),
      ...(formData.preferredDate && { 'Preferred Date': sanitizeInput(formData.preferredDate) }),
      ...(formData.preferredTime && { 'Preferred Time': sanitizeInput(formData.preferredTime) }),
      '_subject': `New Booking: ${sanitizeInput(formData.name)} — Psychology Insight`,
      '_template': 'table',
      '_replyto': sanitizeInput(formData.email),
      '_captcha': 'false',
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FORM_CONFIG.timeout);

    const response = await fetch(FORM_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify(submitData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      // Set rate limit
      setRateLimit('booking');

      // Show success
      showFormStatus(
        statusElementId,
        '✓ Booking request sent! We\'ll contact you soon.',
        'success'
      );

      // Reset form
      const form = document.getElementById(formElementId) as HTMLFormElement;
      if (form) form.reset();

      // Hide form, show thank you
      const formElement = document.getElementById(formElementId);
      if (formElement) formElement.style.display = 'none';
      const successElement = document.getElementById('bookingSuccess');
      if (successElement) successElement.style.display = 'block';

      onSuccess?.();
      return true;
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (error) {
    console.error('Booking submission error:', error);

    const errorMessage =
      error instanceof Error && error.message.includes('abort')
        ? 'Request timeout. Please try again.'
        : 'Unable to submit your booking. Please try again.';

    showFormStatus(statusElementId, errorMessage, 'error');
    onError?.(errorMessage);

    // Re-enable button
    enableFormSubmission(submitButtonId, originalButtonText);
    return false;
  }
}

/**
 * Sanitize form values before submission
 */
export const getSanitizedFormData = (form: HTMLFormElement): Record<string, string> => {
  const data: Record<string, string> = {};
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach((input: HTMLElement) => {
    const element = input as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const name = element.name;
    if (name && element.value) {
      data[name] = sanitizeInput(element.value);
    }
  });

  return data;
};
