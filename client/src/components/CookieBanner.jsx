import React, { useState, useEffect } from 'react';
import { Shield, Check, X } from 'lucide-react';

export default function CookieBanner({ onOpenPrivacy }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-gray-900/95 border border-gray-800 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-fade-in text-xs text-gray-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex-shrink-0">
          <Shield className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white text-sm mb-1">Cookie & Ad Preferences</h4>
          <p className="text-[11px] text-gray-400 leading-relaxed mb-3">
            We use cookies to analyze traffic, personalize content, and serve relevant Google AdSense ads in accordance with our{' '}
            <button
              onClick={onOpenPrivacy}
              className="text-red-400 hover:underline font-medium inline"
            >
              Privacy Policy
            </button>.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 py-1.5 px-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1 shadow"
            >
              <Check className="w-3.5 h-3.5" /> Accept All
            </button>
            <button
              onClick={handleDecline}
              className="py-1.5 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-xs transition"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
