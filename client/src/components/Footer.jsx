import React from 'react';
import { Play, Heart, Shield, FileText, Mail, HelpCircle, AlertCircle } from 'lucide-react';
import AdBanner from './AdBanner';

export default function Footer({ onOpenModal }) {
  return (
    <footer className="mt-20 border-t border-gray-800/80 bg-gray-950 pt-12 pb-24 sm:pb-16 text-gray-400 text-xs">
      {/* Footer Banner Ad */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <AdBanner type="leaderboard" />
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-bold shadow">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              <span className="bg-red-600 px-1.5 py-0.5 rounded text-white text-[11px] font-black mr-1">YT</span> Channel Monetization <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Checker</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
            The free intelligence platform for digital creators, YouTube channel operators, and faceless video producers. Inspect monetization status, uncover viral high-RPM niches, and grab trending keywords.
          </p>
          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} YT Channel Monetization Checker. All rights reserved.
          </div>
        </div>

        {/* Creator Tools */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
            Creator Tools
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="#checker" className="hover:text-red-400 transition">YouTube Monetization Checker</a>
            </li>
            <li>
              <a href="#faceless-niches" className="hover:text-amber-400 transition">Viral Faceless Niches</a>
            </li>
            <li>
              <a href="#keywords" className="hover:text-pink-400 transition">Trending Keywords & Tags</a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-emerald-400 transition">YouTube AdSense Calculator</a>
            </li>
          </ul>
        </div>

        {/* Legal & Compliance (Crucial for Google AdSense Approval) */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
            Legal & Compliance
          </h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onOpenModal('privacy')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-gray-400" /> Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenModal('terms')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-gray-400" /> Terms of Service
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenModal('about')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-gray-400" /> About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenModal('contact')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-gray-400" /> Contact Support
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenModal('disclaimer')}
                className="hover:text-white transition flex items-center gap-1.5"
              >
                <AlertCircle className="w-3.5 h-3.5 text-gray-400" /> Disclaimer
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 border-t border-gray-900 text-[11px] text-gray-500 text-center">
        Disclaimer: YT Channel Monetization Checker is an independent creator analytics tool. YouTube, YouTube Shorts, and Google AdSense are registered trademarks of Google LLC. This platform is not affiliated with or endorsed by YouTube or Google LLC.
      </div>
    </footer>
  );
}
