export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="section-container">
        <div className="grid sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Bright Smile Dental</h3>
            <p className="text-sm leading-relaxed">
              Professional teeth whitening and cosmetic dentistry in a judgment-free environment.
              Your smile, your timeline.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Contact</h3>
            <address className="not-italic text-sm leading-relaxed space-y-2">
              <p>
                <a href="tel:+15125550123" className="hover:text-brand-400 transition-colors">(512) 555-0123</a>
              </p>
              <p>1234 Dental Lane, Suite 100</p>
              <p>Austin, TX 78701</p>
            </address>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Hours</h3>
            <dl className="text-sm space-y-2">
              <div className="flex justify-center sm:justify-start gap-4">
                <dt>Mon - Thu</dt>
                <dd>8:00 AM - 7:00 PM</dd>
              </div>
              <div className="flex justify-center sm:justify-start gap-4">
                <dt>Friday</dt>
                <dd>8:00 AM - 4:00 PM</dd>
              </div>
              <div className="flex justify-center sm:justify-start gap-4">
                <dt>Saturday</dt>
                <dd>9:00 AM - 2:00 PM</dd>
              </div>
              <div className="flex justify-center sm:justify-start gap-4">
                <dt>Sunday</dt>
                <dd>Closed</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Bright Smile Dental. All rights reserved.</p>
          <p className="mt-1">
            <a href="/privacy" className="hover:text-brand-400 transition-colors">Privacy Policy</a>
            {' | '}
            <a href="/terms" className="hover:text-brand-400 transition-colors">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}