/**
 * Form Validation Utilities
 * Comprehensive validation for all form inputs
 */

import {
  validateEmail,
  validateUKPostcode,
  validatePhone,
  validateCardNumber,
  validateCVV,
  validateExpiryDate,
  validateLength,
  sanitizeInput,
} from './security';

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// Name validation
export function validateName(name: string, fieldName: string = 'Name'): ValidationResult {
  // Length check
  const lengthCheck = validateLength(name, 2, 50, fieldName);
  if (!lengthCheck.valid) return lengthCheck;

  // Check for only letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!nameRegex.test(name.trim())) {
    return { valid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
  }

  // Check for consecutive special characters
  if (/[\s\-']{2,}/.test(name)) {
    return { valid: false, error: `${fieldName} cannot have consecutive special characters` };
  }

  return { valid: true };
}

// Address validation
export function validateAddress(address: string): ValidationResult {
  const lengthCheck = validateLength(address, 5, 200, 'Address');
  if (!lengthCheck.valid) return lengthCheck;

  // Check for dangerous characters
  const dangerous = ['<', '>', '{', '}', '[', ']', '|', '\\', '^', '`'];
  for (const char of dangerous) {
    if (address.includes(char)) {
      return { valid: false, error: 'Address contains invalid characters' };
    }
  }

  return { valid: true };
}

// City validation
export function validateCity(city: string): ValidationResult {
  const lengthCheck = validateLength(city, 2, 100, 'City');
  if (!lengthCheck.valid) return lengthCheck;

  const cityRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!cityRegex.test(city.trim())) {
    return { valid: false, error: 'City name contains invalid characters' };
  }

  return { valid: true };
}

// County validation
export function validateCounty(county: string): ValidationResult {
  const lengthCheck = validateLength(county, 2, 100, 'County');
  if (!lengthCheck.valid) return lengthCheck;

  const countyRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!countyRegex.test(county.trim())) {
    return { valid: false, error: 'County name contains invalid characters' };
  }

  return { valid: true };
}

// Cardholder name validation
export function validateCardholderName(name: string): ValidationResult {
  const lengthCheck = validateLength(name, 3, 50, 'Cardholder name');
  if (!lengthCheck.valid) return lengthCheck;

  // Cardholder names typically allow letters, spaces, hyphens, and apostrophes
  const cardNameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!cardNameRegex.test(name.trim())) {
    return { valid: false, error: 'Cardholder name can only contain letters and spaces' };
  }

  return { valid: true };
}

// Complete form validation
export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  paymentMethod: 'card' | 'paypal' | 'apple-pay';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
}

export interface FormValidationErrors {
  [key: string]: string;
}

export function validateCheckoutForm(formData: CheckoutFormData): {
  valid: boolean;
  errors: FormValidationErrors;
} {
  const errors: FormValidationErrors = {};

  // Email validation
  const emailResult = validateEmail(formData.email);
  if (!emailResult.valid) {
    errors.email = emailResult.error || 'Invalid email';
  }

  // Name validation
  const firstNameResult = validateName(formData.firstName, 'First name');
  if (!firstNameResult.valid) {
    errors.firstName = firstNameResult.error || 'Invalid first name';
  }

  const lastNameResult = validateName(formData.lastName, 'Last name');
  if (!lastNameResult.valid) {
    errors.lastName = lastNameResult.error || 'Invalid last name';
  }

  // Phone validation
  const phoneResult = validatePhone(formData.phone);
  if (!phoneResult.valid) {
    errors.phone = phoneResult.error || 'Invalid phone number';
  }

  // Address validation
  const addressResult = validateAddress(formData.address);
  if (!addressResult.valid) {
    errors.address = addressResult.error || 'Invalid address';
  }

  // City validation
  const cityResult = validateCity(formData.city);
  if (!cityResult.valid) {
    errors.city = cityResult.error || 'Invalid city';
  }

  // County validation
  const countyResult = validateCounty(formData.county);
  if (!countyResult.valid) {
    errors.county = countyResult.error || 'Invalid county';
  }

  // Postcode validation
  const postcodeResult = validateUKPostcode(formData.postcode);
  if (!postcodeResult.valid) {
    errors.postcode = postcodeResult.error || 'Invalid postcode';
  }

  // Country validation
  if (!formData.country || formData.country.trim().length < 2) {
    errors.country = 'Country is required';
  }

  // Payment method specific validation
  if (formData.paymentMethod === 'card') {
    if (formData.cardNumber) {
      const cardResult = validateCardNumber(formData.cardNumber);
      if (!cardResult.valid) {
        errors.cardNumber = cardResult.error || 'Invalid card number';
      }
    } else {
      errors.cardNumber = 'Card number is required';
    }

    if (formData.cardName) {
      const cardNameResult = validateCardholderName(formData.cardName);
      if (!cardNameResult.valid) {
        errors.cardName = cardNameResult.error || 'Invalid cardholder name';
      }
    } else {
      errors.cardName = 'Cardholder name is required';
    }

    if (formData.expiryDate) {
      const expiryResult = validateExpiryDate(formData.expiryDate);
      if (!expiryResult.valid) {
        errors.expiryDate = expiryResult.error || 'Invalid expiry date';
      }
    } else {
      errors.expiryDate = 'Expiry date is required';
    }

    if (formData.cvv) {
      const cvvResult = validateCVV(formData.cvv);
      if (!cvvResult.valid) {
        errors.cvv = cvvResult.error || 'Invalid CVV';
      }
    } else {
      errors.cvv = 'CVV is required';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Product data validation
export function validateProductData(product: {
  id: string | number;
  name: string;
  price: number;
  quantity?: number;
}): ValidationResult {
  // ID validation
  if (!product.id || (typeof product.id !== 'string' && typeof product.id !== 'number')) {
    return { valid: false, error: 'Product ID is required' };
  }

  // Name validation
  const nameCheck = validateLength(sanitizeInput(product.name), 1, 200, 'Product name');
  if (!nameCheck.valid) return nameCheck;

  // Price validation
  if (typeof product.price !== 'number' || product.price < 0 || product.price > 1000000) {
    return { valid: false, error: 'Invalid product price' };
  }

  // Quantity validation (if provided)
  if (product.quantity !== undefined) {
    if (!Number.isInteger(product.quantity) || product.quantity < 1 || product.quantity > 999) {
      return { valid: false, error: 'Invalid quantity' };
    }
  }

  return { valid: true };
}
