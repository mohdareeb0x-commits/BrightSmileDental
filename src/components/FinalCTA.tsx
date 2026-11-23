'use client';

import { Variant } from '@/lib/variants';
import { trackCTAClick } from '@/lib/tracking';

interface FinalCTAProps {
  variant: Variant;
  ctaText: string;
}

export function FinalCTA({ variant, ctaText }: FinalCTAProps) {
  const handleCTAClick = () => {
    trackCTAClick('final_cta', variant);
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-900">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Still thinking about it?
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            The free consultation expires this month. No cost, no pressure &mdash; just a clear
            path to the smile you&rsquo;ve been waiting for.
          </p>
          <button
            onClick={() => {
              handleCTAClick();
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-8 py-4.5"
            aria-label={ctaText}
          >
            {ctaText}
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="mt-6 text-sm text-gray-500">
            Or call us directly: <a href="tel:+15125550123" className="text-brand-400 hover:text-brand-300 font-medium">(512) 555-0123</a>
          </p>
        </div>
      </div>
    </section>
  );
}