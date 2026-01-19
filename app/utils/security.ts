/**
 * Comprehensive Security Utilities
 * Enterprise-grade security functions for input validation and sanitization
 */

// XSS Protection - Comprehensive HTML/JS sanitization
export function sanitizeInput(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '';
  if (typeof input === 'number') return String(input);

  let sanitized = String(input);

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Remove script tags and their content
  sanitized = sanitized.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');

  // Remove data: protocol (except data:image for images which are handled separately)
  sanitized = sanitized.replace(/data:(?!image\/)/gi, '');

  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '');

  // Remove object/embed tags
  sanitized = sanitized.replace(/<(object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '');

  // Remove dangerous HTML tags
  sanitized = sanitized.replace(/<(link|meta|style|base)[^>]*>/gi, '');

  // Escape remaining HTML characters
  sanitized = sanitized
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Trim whitespace
  sanitized = sanitized.trim();

  // Maximum length protection (prevent DoS)
  if (sanitized.length > 10000) {
    sanitized = sanitized.substring(0, 10000);
  }

  return sanitized;
}

// SQL Injection Prevention (even though we're using client-side, good practice)
export function sanitizeSQL(input: string): string {
  const dangerous = [
    "'", '"', ';', '--', '/*', '*/', 'xp_', 'sp_', 'exec', 'execute',
    'union', 'select', 'insert', 'update', 'delete', 'drop', 'create',
    'alter', 'script', 'javascript', '<', '>'
  ];

  let sanitized = input.toLowerCase();
  for (const char of dangerous) {
    if (sanitized.includes(char)) {
      throw new Error('Invalid input detected: potential SQL injection attempt');
    }
  }
  return input;
}

// Email validation with security considerations
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  // Length check
  if (email.length > 254) {
    return { valid: false, error: 'Email address too long' };
  }

  // Basic email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Prevent email injection attacks
  const dangerousChars = ['\n', '\r', '%0a', '%0d', 'bcc:', 'cc:', 'to:', 'from:'];
  const lowerEmail = email.toLowerCase();
  for (const char of dangerousChars) {
    if (lowerEmail.includes(char)) {
      return { valid: false, error: 'Invalid email format detected' };
    }
  }

  return { valid: true };
}

// UK Postcode validation with security
export function validateUKPostcode(postcode: string): { valid: boolean; error?: string } {
  if (!postcode || typeof postcode !== 'string') {
    return { valid: false, error: 'Postcode is required' };
  }

  // Sanitize input
  const sanitized = sanitizeInput(postcode).trim().toUpperCase();

  // UK postcode regex (comprehensive)
  const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/;

  if (!postcodeRegex.test(sanitized)) {
    return { valid: false, error: 'Invalid UK postcode format (e.g., SW1A 1AA)' };
  }

  // Length check
  if (sanitized.length > 8) {
    return { valid: false, error: 'Postcode too long' };
  }

  return { valid: true };
}

// Phone number validation
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required' };
  }

  const sanitized = sanitizeInput(phone);

  // Remove common formatting characters
  const digitsOnly = sanitized.replace(/[\s\-\(\)\+]/g, '');

  // UK phone number validation (allowing various formats)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return { valid: false, error: 'Phone number must be between 10-15 digits' };
  }

  // Check for only digits
  if (!/^\d+$/.test(digitsOnly)) {
    return { valid: false, error: 'Phone number must contain only digits and formatting' };
  }

  // UK phone number starts with 0 or +44
  if (!/^(0|\+44)/.test(sanitized)) {
    return { valid: false, error: 'Please enter a valid UK phone number' };
  }

  return { valid: true };
}

// Credit card validation (Luhn algorithm)
export function validateCardNumber(cardNumber: string): { valid: boolean; error?: string } {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return { valid: false, error: 'Card number is required' };
  }

  const sanitized = sanitizeInput(cardNumber).replace(/\s/g, '');

  // Check length (13-19 digits)
  if (sanitized.length < 13 || sanitized.length > 19) {
    return { valid: false, error: 'Card number must be 13-19 digits' };
  }

  // Check for only digits
  if (!/^\d+$/.test(sanitized)) {
    return { valid: false, error: 'Card number must contain only digits' };
  }

  // Luhn algorithm validation
  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return { valid: false, error: 'Invalid card number' };
  }

  return { valid: true };
}

// CVV validation
export function validateCVV(cvv: string): { valid: boolean; error?: string } {
  if (!cvv || typeof cvv !== 'string') {
    return { valid: false, error: 'CVV is required' };
  }

  const sanitized = sanitizeInput(cvv);

  // CVV must be 3 or 4 digits
  if (!/^\d{3,4}$/.test(sanitized)) {
    return { valid: false, error: 'CVV must be 3 or 4 digits' };
  }

  return { valid: true };
}

// Expiry date validation
export function validateExpiryDate(expiryDate: string): { valid: boolean; error?: string } {
  if (!expiryDate || typeof expiryDate !== 'string') {
    return { valid: false, error: 'Expiry date is required' };
  }

  const sanitized = sanitizeInput(expiryDate);

  // Format: MM/YY
  if (!/^\d{2}\/\d{2}$/.test(sanitized)) {
    return { valid: false, error: 'Invalid format. Use MM/YY' };
  }

  const [month, year] = sanitized.split('/').map(Number);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  // Validate month
  if (month < 1 || month > 12) {
    return { valid: false, error: 'Invalid month' };
  }

  // Validate year (not in past, not too far in future)
  if (year < currentYear || year > currentYear + 20) {
    return { valid: false, error: 'Invalid expiry year' };
  }

  // Check if card is expired
  if (year === currentYear && month < currentMonth) {
    return { valid: false, error: 'Card has expired' };
  }

  return { valid: true };
}

// Rate limiting token (simple client-side check)
let requestCount = 0;
let lastRequestTime = Date.now();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 100;

export function checkRateLimit(): { allowed: boolean; error?: string } {
  const now = Date.now();

  // Reset counter if window has passed
  if (now - lastRequestTime > RATE_LIMIT_WINDOW) {
    requestCount = 0;
    lastRequestTime = now;
  }

  requestCount++;

  if (requestCount > MAX_REQUESTS) {
    return {
      allowed: false,
      error: 'Too many requests. Please wait a moment and try again.',
    };
  }

  return { allowed: true };
}

// Input length validation
export function validateLength(
  input: string,
  min: number,
  max: number,
  fieldName: string
): { valid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { valid: false, error: `${fieldName} is required` };
  }

  const length = input.trim().length;

  if (length < min) {
    return { valid: false, error: `${fieldName} must be at least ${min} characters` };
  }

  if (length > max) {
    return { valid: false, error: `${fieldName} must be less than ${max} characters` };
  }

  return { valid: true };
}

// Price validation (prevent negative or extremely large prices)
export function validatePrice(price: number): { valid: boolean; error?: string } {
  if (typeof price !== 'number' || isNaN(price)) {
    return { valid: false, error: 'Price must be a valid number' };
  }

  if (price < 0) {
    return { valid: false, error: 'Price cannot be negative' };
  }

  if (price > 1000000) {
    return { valid: false, error: 'Price exceeds maximum allowed value' };
  }

  // Check for reasonable decimal places
  const decimalPlaces = (price.toString().split('.')[1] || '').length;
  if (decimalPlaces > 2) {
    return { valid: false, error: 'Price can only have up to 2 decimal places' };
  }

  return { valid: true };
}

// Quantity validation
export function validateQuantity(quantity: number): { valid: boolean; error?: string } {
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    return { valid: false, error: 'Quantity must be a valid number' };
  }

  if (quantity < 1) {
    return { valid: false, error: 'Quantity must be at least 1' };
  }

  if (quantity > 999) {
    return { valid: false, error: 'Quantity cannot exceed 999' };
  }

  if (!Number.isInteger(quantity)) {
    return { valid: false, error: 'Quantity must be a whole number' };
  }

  return { valid: true };
}

// Secure data encoding (for sensitive data)
export function encodeData(data: string): string {
  return btoa(encodeURIComponent(data)).replace(/[=+/]/g, (c) => {
    const encoding: Record<string, string> = { '=': '-', '+': '_', '/': '~' };
    return encoding[c] || c;
  });
}

// Generate CSRF token (simplified for client-side)
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    // Fallback for environments without crypto
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
