export function ProblemBenefit() {
  return (
    <section className="py-16 sm:py-24 bg-white border-y border-brand-100">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why put off the smile you want?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Most people delay dental visits for the same reasons &mdash; and our free consultation
            removes every one of them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 bg-brand-50 rounded-xl border border-brand-100">
            <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">&ldquo;I don&rsquo;t have time&rdquo;</h3>
            <p className="text-gray-600 leading-relaxed">
              30 minutes. That&rsquo;s all the consultation takes. Same-week availability means
              you&rsquo;re in and out before your schedule fills up.
            </p>
          </div>

          <div className="p-6 bg-brand-50 rounded-xl border border-brand-100">
            <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">&ldquo;I&rsquo;m worried about cost&rdquo;</h3>
            <p className="text-gray-600 leading-relaxed">
              The consultation is completely free. You&rsquo;ll leave with a clear treatment plan
              and transparent pricing &mdash; no surprise bills, no pressure to commit.
            </p>
          </div>

          <div className="p-6 bg-brand-50 rounded-xl border border-brand-100">
            <div className="w-12 h-12 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">&ldquo;I&rsquo;m embarrassed about my teeth&rdquo;</h3>
            <p className="text-gray-600 leading-relaxed">
              We&rsquo;ve seen it all. Zero judgment, zero lectures &mdash; just a supportive team
              focused on helping you feel confident in your smile again.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">The free consultation removes the friction. You just have to show up.</p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
          >
            Book my free consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}