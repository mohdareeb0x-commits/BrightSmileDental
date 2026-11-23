'use client';

import { useState, FormEvent } from 'react';
import { Variant } from '@/lib/variants';
import { getStoredUTMParams } from '@/lib/utm';
import { trackFormSubmit } from '@/lib/tracking';

interface FormData {
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  preferredTime?: string;
}

interface LeadFormProps {
  variant: Variant;
}

const TIME_OPTIONS = [
  { value: 'morning', label: 'Morning (8am - 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm - 4pm)' },
  { value: 'evening', label: 'Evening (4pm - 7pm)' },
  { value: 'flexible', label: 'I&rsquo;m flexible &mdash; call anytime' },
];

const PHONE_REGEX = /^[\d\s\-\(\)\+]{10,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadForm({ variant }: LeadFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferredTime: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!PHONE_REGEX.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select a preferred contact time';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const utmParams = getStoredUTMParams();

    const payload = {
      ...formData,
      variant,
      utm_source: utmParams.utm_source || '',
      utm_medium: utmParams.utm_medium || '',
      utm_campaign: utmParams.utm_campaign || '',
      utm_content: utmParams.utm_content || '',
      utm_term: utmParams.utm_term || '',
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        trackFormSubmit(variant);
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', preferredTime: '' });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitStatus === 'success') {
    return (
      <section id="lead-form" className="py-16 sm:py-24 bg-brand-50">
        <div className="section-container">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">You&rsquo;re all set!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thanks for booking your free whitening consultation. Our team will call you
              within 15 minutes during business hours to confirm your appointment.
            </p>
            <div className="bg-white rounded-xl p-6 border border-brand-100 text-left">
              <p className="font-semibold text-gray-900 mb-2">What happens next:</p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  We&rsquo;ll call to confirm your preferred time
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  You&rsquo;ll get a text reminder 24 hours before
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-brand-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Zero obligation &mdash; cancel or reschedule anytime
                </li>
              </ul>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Questions? Call us at <a href="tel:+15125550123" className="text-brand-600 font-medium hover:underline">(512) 555-0123</a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-16 sm:py-24 bg-brand-50">
      <div className="section-container">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-brand-100">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Claim Your Free Consultation
              </h2>
              <p className="text-gray-600">
                Limited spots this month. Fill out the form and we&rsquo;ll call to confirm.
              </p>
            </div>

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm" role="alert">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="John Smith"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="(512) 555-0123"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="john@email.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Preferred Contact Time <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={(e) => handleChange('preferredTime', e.target.value)}
                  className={`input-field appearance-none bg-white ${errors.preferredTime ? 'border-red-500 focus:ring-red-500' : ''}`}
                  aria-invalid={errors.preferredTime ? 'true' : 'false'}
                  aria-describedby={errors.preferredTime ? 'time-error' : undefined}
                  disabled={isSubmitting}
                >
                  <option value="">Select a time</option>
                  {TIME_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.preferredTime && (
                  <p id="time-error" className="mt-1.5 text-sm text-red-600" role="alert">{errors.preferredTime}</p>
                )}
              </div>

              <input
                type="hidden"
                name="variant"
                value={variant}
              />
              <input
                type="hidden"
                name="utm_source"
                value={getStoredUTMParams().utm_source || ''}
              />
              <input
                type="hidden"
                name="utm_medium"
                value={getStoredUTMParams().utm_medium || ''}
              />
              <input
                type="hidden"
                name="utm_campaign"
                value={getStoredUTMParams().utm_campaign || ''}
              />
              <input
                type="hidden"
                name="utm_content"
                value={getStoredUTMParams().utm_content || ''}
              />
              <input
                type="hidden"
                name="utm_term"
                value={getStoredUTMParams().utm_term || ''}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4.5 text-lg mt-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Book My Free Consultation'
                )}
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                By submitting, you agree to be contacted by phone/text about your consultation.
                We never share your information. <a href="/privacy" className="text-brand-600 hover:underline">Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}