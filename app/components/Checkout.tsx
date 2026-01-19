'use client';

import { useState, FormEvent } from 'react';
import { useCart } from './CartContext';
import { products } from '../data/products';
import { formatCurrency } from '../utils/currency';
import { sanitizeInput, checkRateLimit, validateEmail, validatePhone, validateCardNumber, validateCVV, validateExpiryDate } from '../utils/security';
import { validateName, validateAddress, validateCity, validateCounty, validateCardholderName } from '../utils/validation';
import { validateUKPostcode } from '../utils/security';

interface CheckoutProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
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
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function Checkout({ onClose, onSuccess }: CheckoutProps) {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateStep = (currentStep: string): boolean => {
    const newErrors: FormErrors = {};

    // Check rate limiting
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      newErrors._rateLimit = rateLimitCheck.error || 'Too many requests';
      setErrors(newErrors);
      return false;
    }

    if (currentStep === 'shipping') {
      // Email validation with comprehensive security checks
      const emailResult = validateEmail(formData.email);
      if (!emailResult.valid) {
        newErrors.email = emailResult.error || 'Valid email is required';
      }

      // Name validation
      const firstNameResult = validateName(formData.firstName, 'First name');
      if (!firstNameResult.valid) {
        newErrors.firstName = firstNameResult.error || 'Invalid first name';
      }

      const lastNameResult = validateName(formData.lastName, 'Last name');
      if (!lastNameResult.valid) {
        newErrors.lastName = lastNameResult.error || 'Invalid last name';
      }

      // Phone validation
      const phoneResult = validatePhone(formData.phone);
      if (!phoneResult.valid) {
        newErrors.phone = phoneResult.error || 'Valid UK phone number is required';
      }

      // Address validation
      const addressResult = validateAddress(formData.address);
      if (!addressResult.valid) {
        newErrors.address = addressResult.error || 'Invalid address';
      }

      // City validation
      const cityResult = validateCity(formData.city);
      if (!cityResult.valid) {
        newErrors.city = cityResult.error || 'Invalid city';
      }

      // County validation
      const countyResult = validateCounty(formData.county);
      if (!countyResult.valid) {
        newErrors.county = countyResult.error || 'Invalid county';
      }

      // UK postcode validation with comprehensive security
      const postcodeResult = validateUKPostcode(formData.postcode);
      if (!postcodeResult.valid) {
        newErrors.postcode = postcodeResult.error || 'Valid UK postcode is required (e.g., SW1A 1AA)';
      }

      // Country validation
      if (!formData.country || formData.country.trim().length < 2) {
        newErrors.country = 'Country is required';
      }
    }

    if (currentStep === 'payment') {
      if (formData.paymentMethod === 'card') {
        // Card number validation with Luhn algorithm
        if (formData.cardNumber) {
          const cardResult = validateCardNumber(formData.cardNumber);
          if (!cardResult.valid) {
            newErrors.cardNumber = cardResult.error || 'Valid card number is required';
          }
        } else {
          newErrors.cardNumber = 'Card number is required';
        }

        // Cardholder name validation
        if (formData.cardName) {
          const cardNameResult = validateCardholderName(formData.cardName);
          if (!cardNameResult.valid) {
            newErrors.cardName = cardNameResult.error || 'Invalid cardholder name';
          }
        } else {
          newErrors.cardName = 'Cardholder name is required';
        }

        // Expiry date validation
        if (formData.expiryDate) {
          const expiryResult = validateExpiryDate(formData.expiryDate);
          if (!expiryResult.valid) {
            newErrors.expiryDate = expiryResult.error || 'Valid expiry date (MM/YY) is required';
          }
        } else {
          newErrors.expiryDate = 'Expiry date is required';
        }

        // CVV validation
        if (formData.cvv) {
          const cvvResult = validateCVV(formData.cvv);
          if (!cvvResult.valid) {
            newErrors.cvv = cvvResult.error || 'Valid CVV is required';
          }
        } else {
          newErrors.cvv = 'CVV is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    // Rate limiting check on input
    const rateLimitCheck = checkRateLimit();
    if (!rateLimitCheck.allowed) {
      setErrors((prev) => ({ ...prev, _rateLimit: rateLimitCheck.error || 'Too many requests' }));
      return;
    }

    // Sanitize input using comprehensive security utility
    let sanitizedValue = sanitizeInput(value);

    // Format card number (only digits, max 16)
    if (field === 'cardNumber') {
      sanitizedValue = sanitizedValue.replace(/\D/g, '');
      if (sanitizedValue.length <= 16) {
        sanitizedValue = sanitizedValue.match(/.{1,4}/g)?.join(' ') || sanitizedValue;
      } else {
        sanitizedValue = sanitizedValue.slice(0, 16).match(/.{1,4}/g)?.join(' ') || sanitizedValue.slice(0, 16);
      }
    }

    // Format expiry date (MM/YY format)
    if (field === 'expiryDate') {
      sanitizedValue = sanitizedValue.replace(/\D/g, '');
      if (sanitizedValue.length >= 2) {
        sanitizedValue = sanitizedValue.slice(0, 2) + '/' + sanitizedValue.slice(2, 4);
      }
    }

    // Format CVV (only numbers, max 4 digits)
    if (field === 'cvv') {
      sanitizedValue = sanitizedValue.replace(/\D/g, '').slice(0, 4);
    }

    // Format postcode (uppercase)
    if (field === 'postcode') {
      sanitizedValue = sanitizedValue.toUpperCase().trim();
    }

    // Update form data
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors._rateLimit; // Also clear rate limit error
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (step === 'shipping') {
      if (validateStep('shipping')) {
        setStep('payment');
      }
    } else if (step === 'payment') {
      if (validateStep('payment')) {
        setStep('review');
      }
    } else if (step === 'review') {
      setIsProcessing(true);
      
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // In a real app, you would send this data to your backend
      const orderData = {
        items: items.map((item) => {
          const product = products.find((p) => p.id === item.id);
          return {
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: product?.price || item.price,
          };
        }),
        total,
        shipping: formData,
        paymentMethod: formData.paymentMethod,
        orderDate: new Date().toISOString(),
        orderNumber: `ORD-${Date.now()}`,
      };

      console.log('Order submitted:', orderData);
      
      clearCart();
      setIsProcessing(false);
      onSuccess();
    }
  };

  const subtotal = total;
  const shipping = 7.99; // UK shipping
  const tax = subtotal * 0.20; // 20% VAT
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close checkout"
          >
            ×
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            {['Shipping', 'Payment', 'Review'].map((label, index) => {
              const stepIndex = ['shipping', 'payment', 'review'].indexOf(step);
              const isActive = stepIndex === index;
              const isCompleted = stepIndex > index;

              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={`h-0.5 flex-1 mx-2 ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {step === 'shipping' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        County *
                      </label>
                      <input
                        type="text"
                        value={formData.county}
                        onChange={(e) => handleInputChange('county', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 ${
                          errors.county ? 'border-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.county && <p className="text-red-500 text-xs mt-1">{errors.county}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-slate-900 ${
                          errors.postcode ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="SW1A 1AA"
                      />
                      {errors.postcode && <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="England">England</option>
                      <option value="Scotland">Scotland</option>
                      <option value="Wales">Wales</option>
                      <option value="Northern Ireland">Northern Ireland</option>
                    </select>
                    {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h3>

                  <div className="space-y-3">
                    {[
                      { value: 'card', label: 'Credit/Debit Card', icon: '💳' },
                      { value: 'paypal', label: 'PayPal', icon: '🔵' },
                      { value: 'apple-pay', label: 'Apple Pay', icon: '🍎' },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method.value
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-medium text-gray-900">{method.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4 border-t pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          maxLength={19}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.cardName ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="John Doe"
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            maxLength={5}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="MM/YY"
                          />
                          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            maxLength={4}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                              errors.cvv ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="123"
                          />
                          {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'paypal' && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        You will be redirected to PayPal to complete your payment securely.
                      </p>
                    </div>
                  )}

                  {formData.paymentMethod === 'apple-pay' && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        You will be redirected to Apple Pay to complete your payment securely.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Review</h3>

                  {/* Shipping Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Shipping To:</h4>
                    <p className="text-sm text-gray-700">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.county} {formData.postcode}
                      <br />
                      {formData.country}
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Method:</h4>
                    <p className="text-sm text-gray-700 capitalize">
                      {formData.paymentMethod === 'card' && '💳 Credit/Debit Card ending in '}
                      {formData.paymentMethod === 'card' && formData.cardNumber.slice(-4)}
                      {formData.paymentMethod === 'paypal' && '🔵 PayPal'}
                      {formData.paymentMethod === 'apple-pay' && '🍎 Apple Pay'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Order Items:</h4>
                    <div className="space-y-3">
                      {items.map((item) => {
                        const product = products.find((p) => p.id === item.id);
                        const itemTotal = (product?.price || item.price) * item.quantity;

                        return (
                          <div key={`${item.id}-${item.variant || 'default'}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <div className="text-3xl">{product?.image || '📦'}</div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-slate-900">{formatCurrency(itemTotal)}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    const itemTotal = (product?.price || item.price) * item.quantity;

                    return (
                      <div key={`${item.id}-${item.variant || 'default'}`} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-slate-900 font-medium">{formatCurrency(itemTotal)}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-300 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="text-slate-900">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">VAT (20%)</span>
                    <span className="text-slate-900">{formatCurrency(tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-slate-300 pt-3 mt-3">
                    <span className="text-slate-900">Total</span>
                    <span className="text-slate-900">{formatCurrency(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-between items-center">
          <button
            type="button"
            onClick={step === 'shipping' ? onClose : () => setStep(step === 'review' ? 'payment' : 'shipping')}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            {step === 'shipping' ? 'Cancel' : 'Back'}
          </button>
          
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isProcessing}
            className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : step === 'review' ? (
              'Place Order'
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
