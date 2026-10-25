import React, { useState } from 'react';
import { Play, DollarSign, Flame, Hash, Calculator, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-gray-950/85 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-105 transition">
            <Play className="w-4 h-4 fill-white translate-x-0.5" />
          </div>
          <div>
            <span className="text-sm sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span className="bg-red-600 px-1.5 py-0.5 rounded text-white text-xs font-black tracking-normal">YT</span> Channel Monetization <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-400">Checker</span>
            </span>
            <span className="block text-[9px] font-mono uppercase tracking-wider text-gray-400 -mt-0.5">
              Real-time Ad Telemetry & Creator Analytics
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-gray-300">
          <button
            onClick={() => scrollTo('checker')}
            className="hover:text-red-400 transition flex items-center gap-1.5 py-1"
          >
            <Play className="w-3.5 h-3.5 text-red-500" /> Channel Checker
          </button>
          <button
            onClick={() => scrollTo('faceless-niches')}
            className="hover:text-amber-400 transition flex items-center gap-1.5 py-1"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" /> Viral Faceless Niches
          </button>
          <button
            onClick={() => scrollTo('keywords')}
            className="hover:text-pink-400 transition flex items-center gap-1.5 py-1"
          >
            <Hash className="w-3.5 h-3.5 text-pink-500" /> Trending Keywords
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className="hover:text-emerald-400 transition flex items-center gap-1.5 py-1"
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-500" /> Revenue Calc
          </button>
        </div>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollTo('checker')}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs rounded-xl shadow-md hover:shadow-red-500/20 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> Inspect Channel
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-800 space-y-2 text-xs font-semibold text-gray-300 animate-fade-in">
          <button
            onClick={() => scrollTo('checker')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-red-500" /> Monetization Checker
          </button>
          <button
            onClick={() => scrollTo('faceless-niches')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-500" /> Today's Viral Faceless Niches
          </button>
          <button
            onClick={() => scrollTo('keywords')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Hash className="w-4 h-4 text-pink-500" /> Trending Keywords & Hashtags
          </button>
          <button
            onClick={() => scrollTo('calculator')}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-emerald-500" /> Ad Revenue Calculator
          </button>
        </div>
      )}
    </nav>
  );
}
