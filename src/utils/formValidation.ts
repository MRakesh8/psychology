/**
 * Form Validation Utilities
 * Comprehensive validation for contact and booking forms
 * Production-ready with security considerations
 */

/**
 * Indian phone number validation
 * Accepts: +91xxxxxxxxxx, 91xxxxxxxxxx, xxxxxxxxxx (10 digits)
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+91|91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

/**
 * Email validation - RFC 5322 compliant
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Name validation - alphanumeric, spaces, hyphens, apostrophes only
 */
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s\-']{2,50}$/;
  return nameRegex.test(name.trim());
};

/**
 * Age validation - between 10 and 120
 */
export const validateAge = (age: string | number): boolean => {
  const ageNum = typeof age === 'string' ? parseInt(age, 10) : age;
  return !isNaN(ageNum) && ageNum >= 10 && ageNum <= 120;
};

/**
 * Text validation - min/max length, no suspicious patterns
 */
export const validateText = (
  text: string,
  minLength = 5,
  maxLength = 1000
): boolean => {
  const trimmed = text.trim();
  if (trimmed.length < minLength || trimmed.length > maxLength) {
    return false;
  }
  // Check for excessive special characters or spam patterns
  const suspiciousCount = (trimmed.match(/[!@#$%^&*]/g) || []).length;
  return suspiciousCount <= 3; // Allow some special chars but prevent spam
};

/**
 * Sanitize input - remove potentially dangerous characters
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove HTML special chars
    .slice(0, 1000); // Limit length
};

/**
 * Validate entire contact form
 */
export const validateContactForm = (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validateName(formData.name)) {
    errors.name = 'Please enter a valid name (2-50 characters)';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.subject || formData.subject.trim().length < 3) {
    errors.subject = 'Please enter a subject (minimum 3 characters)';
  }

  if (!validateText(formData.message, 10, 1000)) {
    errors.message = 'Message must be 10-1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validate entire booking form
 */
export const validateBookingForm = (formData: {
  name: string;
  age: string;
  phone: string;
  email: string;
  reason: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!validateName(formData.name)) {
    errors.name = 'Please enter a valid name (2-50 characters)';
  }

  if (!validateAge(formData.age)) {
    errors.age = 'Please enter a valid age (10-120)';
  }

  if (!validatePhoneNumber(formData.phone)) {
    errors.phone = 'Please enter a valid Indian phone number (10 digits)';
  }

  if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!formData.reason || formData.reason.trim().length < 5) {
    errors.reason = 'Please describe your concern (minimum 5 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  if (cleaned.length === 12) {
    return `+${cleaned}`;
  }
  return phone;
};

/**
 * Check if user has submitted recently (rate limiting)
 * Returns remaining wait time in milliseconds or 0 if can submit
 */
export const checkRateLimit = (key: string, delayMs = 30000): number => {
  const lastSubmitTime = localStorage.getItem(`formsubmit_${key}`);
  if (!lastSubmitTime) return 0;

  const elapsed = Date.now() - parseInt(lastSubmitTime, 10);
  const remaining = delayMs - elapsed;

  return remaining > 0 ? remaining : 0;
};

/**
 * Set rate limit for user
 */
export const setRateLimit = (key: string): void => {
  localStorage.setItem(`formsubmit_${key}`, Date.now().toString());
};

/**
 * Generate honeypot field name (prevent bot detection)
 * Different names for different forms
 */
export const getHoneypotFieldName = (formType: string): string => {
  const seed = formType + new Date().toISOString().split('T')[0];
  return `_hp_${Buffer.from(seed).toString('base64').slice(0, 8)}`;
};

/**
 * Validate honeypot (should be empty if human)
 */
export const validateHoneypot = (value: string): boolean => {
  return !value || value.trim().length === 0;
};
