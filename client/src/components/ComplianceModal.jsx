import React, { useState } from 'react';
import { X, ShieldCheck, FileText, HelpCircle, Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ComplianceModal({ isOpen, type, onClose }) {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setContactStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage
        })
      });
      const data = await res.json();
      if (res.ok) {
        setContactStatus({ success: true, message: data.message });
        setContactName('');
        setContactEmail('');
        setContactSubject('');
        setContactMessage('');
      } else {
        setContactStatus({ success: false, message: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      setContactStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-gray-900 border border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/80">
          <div className="flex items-center gap-2">
            {type === 'privacy' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
            {type === 'terms' && <FileText className="w-5 h-5 text-blue-400" />}
            {type === 'about' && <HelpCircle className="w-5 h-5 text-amber-400" />}
            {type === 'contact' && <Mail className="w-5 h-5 text-red-400" />}
            {type === 'disclaimer' && <AlertCircle className="w-5 h-5 text-purple-400" />}

            <h3 className="text-lg font-bold text-white capitalize">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'about' && 'About YT Channel Monetization Checker'}
              {type === 'contact' && 'Contact Us'}
              {type === 'disclaimer' && 'Legal Disclaimer'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-gray-300 space-y-4 leading-relaxed">
          {type === 'privacy' && (
            <>
              <p className="text-gray-400">
                Last updated: <strong>October 2026</strong>
              </p>
              <h4 className="font-bold text-white text-base">1. Introduction & Overview</h4>
              <p>
                At <strong>YT Channel Monetization Checker</strong>, accessible at our website, the privacy of our visitors is of paramount importance to us. This Privacy Policy outlines the types of personal and non-personal data collected, recorded, and how it is used.
              </p>

              <h4 className="font-bold text-white text-base">2. Google DoubleClick DART Cookie & Third-Party Advertising</h4>
              <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other websites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <span className="text-red-400 underline">https://policies.google.com/technologies/ads</span>.
              </p>

              <h4 className="font-bold text-white text-base">3. Log Files & Analytics</h4>
              <p>
                YT Channel Monetization Checker follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
              </p>

              <h4 className="font-bold text-white text-base">4. CCPA Privacy Rights & GDPR Data Protection</h4>
              <p>
                Under the California Consumer Privacy Act (CCPA) and General Data Protection Regulation (GDPR), users have the right to request disclosure, erasure, or rectification of any stored personal information. We do not sell personal information to any third parties.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h4 className="font-bold text-white text-base">1. Acceptance of Terms</h4>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
              <h4 className="font-bold text-white text-base">2. Informational Purpose Only</h4>
              <p>
                All monetization checks, RPM ranges, and revenue estimates provided by this platform are analytical approximations generated through publicly available web data and YouTube ad placement telemetry. They do not constitute financial advice or formal revenue guarantees.
              </p>
              <h4 className="font-bold text-white text-base">3. Intellectual Property</h4>
              <p>
                YouTube, YouTube Shorts, and the YouTube logo are trademarks of Google LLC. This platform is an independent creator utility and is not affiliated, endorsed, or certified by Google LLC.
              </p>
            </>
          )}

          {type === 'about' && (
            <>
              <h4 className="font-bold text-white text-base">Our Mission</h4>
              <p>
                <strong>YT Channel Monetization Checker</strong> was founded to empower the modern generation of digital creators and faceless video producers. We believe anyone should have free access to deep analytical insights without spending hundreds of dollars on gated enterprise tools.
              </p>
              <h4 className="font-bold text-white text-base">What We Offer</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Instant, verified YouTube Channel monetization inspection using live ad streaming telemetry.</li>
                <li>Curated viral faceless YouTube niches with tested RPM and AI production workflows.</li>
                <li>Trending keywords and hashtags formatted for 1-click YouTube Studio insertion.</li>
                <li>Interactive AdSense revenue projections for creators scaling their digital assets.</li>
              </ul>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <h4 className="font-bold text-white text-base">Independent Disclaimer</h4>
              <p>
                YT Channel Monetization Checker is an independent analytical tool and web utility designed for educational and creator benchmarking purposes.
              </p>
              <p>
                "YouTube", "YouTube Shorts", "Google AdSense", and all associated logos are registered trademarks of Google LLC. YT Channel Monetization Checker is neither affiliated with, authorized by, nor sponsored by Google LLC or YouTube LLC.
              </p>
              <p>
                All metrics, RPM estimates, and revenue projections are simulated estimates and should not be used as guaranteed financial forecasts.
              </p>
            </>
          )}

          {type === 'contact' && (
            <div>
              <p className="text-gray-400 mb-4">
                Have a question, business inquiry, or feature suggestion? Send us a message and our support team will get back to you within 24 hours.
              </p>

              {contactStatus && (
                <div className={`p-3 rounded-xl mb-4 text-xs flex items-center gap-2 ${
                  contactStatus.success
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-300 border border-red-500/20'
                }`}>
                  {contactStatus.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  {contactStatus.message}
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    placeholder="Ad Partnership, Bug Report, Feedback"
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-red-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-3 py-2 bg-gray-950 border border-gray-800 rounded-lg text-white text-xs focus:ring-1 focus:ring-red-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs rounded-lg transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-3.5 h-3.5" /> {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-gray-800 bg-gray-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
