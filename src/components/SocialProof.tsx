'use client';

import { Variant } from '@/lib/variants';
import { trackCTAClick } from '@/lib/tracking';

interface SocialProofProps {
  variant: Variant;
}

const testimonials = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    outcome: '8 shades whiter in 2 weeks',
    text: '"I&rsquo;d been putting off whitening for years, worried about sensitivity. The consultation was free, they explained every option, and the custom trays they made fit perfectly. Zero sensitivity, amazing results."',
  },
  {
    name: 'James R.',
    location: 'Round Rock, TX',
    outcome: 'First dental visit in 5 years',
    text: '&ldquo;Honestly? I was embarrassed. But from the moment I walked in, zero judgment. The free consultation gave me a clear plan and pricing upfront. Best decision I&rsquo;ve made for my health in years.&rdquo;',
  },
  {
    name: 'Lisa K.',
    location: 'Cedar Park, TX',
    outcome: 'Wedding-ready smile',
    text: '&ldquo;My wedding was 3 months away and I hated my smile in photos. They fit me in same week, created a timeline that worked, and I walked down the aisle confident. The team genuinely cares.&rdquo;',
  },
];

export function SocialProof({ variant }: SocialProofProps) {
  const handleCTAClick = () => {
    trackCTAClick('social_proof', variant);
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Real patients. Real results.
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Don&rsquo;t take our word for it &mdash; hear from people who were in your shoes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-brand-50 rounded-xl p-6 border border-brand-100 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-amber-400 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 flex-1">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="border-t border-brand-100 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-sm text-brand-700 font-medium mt-1">{testimonial.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => {
              handleCTAClick();
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary text-lg px-8 py-4.5"
            aria-label="Book my free consultation"
          >
            Book My Free Consultation
            <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}