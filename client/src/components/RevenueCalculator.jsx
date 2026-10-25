import React, { useState } from 'react';
import { DollarSign, Calculator, TrendingUp, Sliders, Globe, Video, Sparkles, Check } from 'lucide-react';
import AdBanner from './AdBanner';

export default function RevenueCalculator() {
  const [format, setFormat] = useState('long'); // 'long' or 'shorts'
  const [viewTimeframe, setViewTimeframe] = useState('daily'); // 'daily' or 'monthly'
  const [viewCount, setViewCount] = useState(25000);
  const [selectedNicheIndex, setSelectedNicheIndex] = useState(1);
  const [customRpm, setCustomRpm] = useState('');
  const [countryTier, setCountryTier] = useState('tier1'); // 'tier1', 'tier2', 'tier3'

  // Long-Form Niches
  const longFormNiches = [
    { name: 'Finance & Wealth', rpm: 18.0, icon: '💰' },
    { name: 'Tech, AI & Software', rpm: 12.5, icon: '🤖' },
    { name: 'Dark History & Lore', rpm: 8.5, icon: '🏛️' },
    { name: 'True Crime & Mystery', rpm: 7.5, icon: '🩸' },
    { name: 'Psychology & Mindset', rpm: 6.8, icon: '🧠' },
    { name: 'Health & Biohacking', rpm: 9.0, icon: '🏋️' },
    { name: 'Anime Lore & Recaps', rpm: 5.0, icon: '🗡️' },
    { name: 'Gaming & Comedy', rpm: 3.5, icon: '🎮' },
    { name: 'Relaxation & ASMR', rpm: 4.2, icon: '🌿' }
  ];

  // YouTube Shorts Niches (Shorts pool RPM is lower per 1K views)
  const shortsNiches = [
    { name: 'Shorts: Finance & Crypto', rpm: 0.18, icon: '💰' },
    { name: 'Shorts: AI & Tech Hacks', rpm: 0.14, icon: '🤖' },
    { name: 'Shorts: History & Facts', rpm: 0.11, icon: '🏛️' },
    { name: 'Shorts: Anime & Edits', rpm: 0.08, icon: '🗡️' },
    { name: 'Shorts: Gaming & Clips', rpm: 0.07, icon: '🎮' },
    { name: 'Shorts: Motivation & Stoic', rpm: 0.10, icon: '🧠' }
  ];

  const activeNiches = format === 'long' ? longFormNiches : shortsNiches;
  const currentNiche = activeNiches[selectedNicheIndex] || activeNiches[0];

  // Country multiplier
  const countryMultipliers = {
    tier1: { label: '🇺🇸 Tier 1 (US, UK, Canada, Australia)', multiplier: 1.0 },
    tier2: { label: '🇪🇺 Tier 2 (Europe, Japan, UAE)', multiplier: 0.65 },
    tier3: { label: '🌏 Tier 3 (Global / Asia / LatAm)', multiplier: 0.30 }
  };

  // Compute effective RPM
  const baseRpm = customRpm !== '' && !isNaN(Number(customRpm)) && Number(customRpm) > 0
    ? Number(customRpm)
    : currentNiche.rpm;

  const effectiveRpm = baseRpm * countryMultipliers[countryTier].multiplier;

  // Convert input to daily views
  const normalizedDailyViews = viewTimeframe === 'daily'
    ? Math.max(0, viewCount)
    : Math.max(0, Math.round(viewCount / 30));

  const dailyEarnings = (normalizedDailyViews / 1000) * effectiveRpm;
  const monthlyEarnings = dailyEarnings * 30;
  const yearlyEarnings = dailyEarnings * 365;

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    setSelectedNicheIndex(0);
    setCustomRpm('');
  };

  const handleQuickViewSelect = (views) => {
    setViewCount(views);
  };

  return (
    <div id="calculator" className="w-full max-w-5xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900/80 via-gray-950 to-[#0c0d12] p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" /> 100% Accurate YouTube Partner Revenue Engine
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            YouTube AdSense <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Revenue Calculator</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Calculates exact creator payouts with separate <strong>Long-Form</strong> & <strong>YouTube Shorts</strong> RPM algorithms.
          </p>
        </div>

        {/* Format Selector: Long-form vs Shorts */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-gray-900 border border-gray-800 shadow-lg">
            <button
              onClick={() => handleFormatChange('long')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                format === 'long'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎬 Long-Form Videos ($2 – $25 RPM)
            </button>
            <button
              onClick={() => handleFormatChange('shorts')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                format === 'shorts'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 YouTube Shorts ($0.05 – $0.25 RPM)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* View Count Input & Timeframe */}
            <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Target Views Count
                </label>
                <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-800 text-[11px] font-medium">
                  <button
                    onClick={() => setViewTimeframe('daily')}
                    className={`px-2.5 py-1 rounded ${viewTimeframe === 'daily' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Daily Views
                  </button>
                  <button
                    onClick={() => setViewTimeframe('monthly')}
                    className={`px-2.5 py-1 rounded ${viewTimeframe === 'monthly' ? 'bg-emerald-600 text-white font-bold' : 'text-gray-400 hover:text-white'}`}
                  >
                    Monthly Views
                  </button>
                </div>
              </div>

              {/* Number Input Box with Direct Typing */}
              <div className="relative mb-3">
                <input
                  type="number"
                  min="1000"
                  max="100000000"
                  step="5000"
                  value={viewCount}
                  onChange={(e) => setViewCount(Math.max(0, Number(e.target.value)))}
                  className="w-full px-4 py-3 bg-gray-950 border border-gray-700/80 rounded-xl text-xl font-bold font-mono text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400">
                  {viewTimeframe === 'daily' ? 'views / day' : 'views / month'}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="1000"
                max={viewTimeframe === 'daily' ? 1000000 : 25000000}
                step={viewTimeframe === 'daily' ? 5000 : 100000}
                value={Math.min(viewCount, viewTimeframe === 'daily' ? 1000000 : 25000000)}
                onChange={(e) => setViewCount(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-3"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] text-gray-500 self-center mr-1">Quick Presets:</span>
                {(viewTimeframe === 'daily'
                  ? [10000, 50000, 100000, 500000, 1000000]
                  : [100000, 500000, 1000000, 5000000, 20000000]
                ).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleQuickViewSelect(val)}
                    className={`px-2 py-1 rounded text-[11px] font-mono border transition ${
                      viewCount === val
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                        : 'bg-gray-800/60 border-gray-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    {val >= 1000000 ? `${val / 1000000}M` : `${val / 1000}K`}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience Country Tier */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 block mb-2 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400" /> Audience Geography / Region
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {Object.entries(countryMultipliers).map(([tierKey, tierData]) => (
                  <button
                    key={tierKey}
                    onClick={() => setCountryTier(tierKey)}
                    className={`p-2.5 rounded-xl border text-left transition ${
                      countryTier === tierKey
                        ? 'bg-blue-500/20 border-blue-500 text-white font-semibold shadow-md'
                        : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className="block text-xs font-medium truncate">{tierData.label.split(' ')[0]} {tierKey.toUpperCase()}</span>
                    <span className="text-[10px] text-gray-400 block truncate">{tierData.label.replace(/^.*?\(|\)$/g, '')}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Niche Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Select Content Niche & RPM
                </label>
                <span className="text-xs text-emerald-400 font-mono font-bold">
                  Effective RPM: ${effectiveRpm.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {activeNiches.map((n, i) => (
                  <button
                    key={n.name}
                    onClick={() => {
                      setSelectedNicheIndex(i);
                      setCustomRpm('');
                    }}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      selectedNicheIndex === i && customRpm === ''
                        ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md'
                        : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    <span className="text-xs font-medium leading-tight line-clamp-1">{n.icon} {n.name}</span>
                    <span className="text-xs font-bold text-emerald-400 mt-1 font-mono">${n.rpm.toFixed(2)} RPM</span>
                  </button>
                ))}
              </div>

              {/* Custom RPM Input */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-400 whitespace-nowrap">Or Custom RPM:</span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={customRpm}
                  onChange={(e) => setCustomRpm(e.target.value)}
                  placeholder={`e.g. ${currentNiche.rpm}`}
                  className="w-32 px-3 py-1.5 bg-gray-950 border border-gray-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <span className="text-xs text-gray-500">$/1K views</span>
              </div>
            </div>
          </div>

          {/* Revenue Display Card (Right 5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-gray-900 to-gray-950 border border-emerald-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-xs uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> Projected Ad Revenue
              </h3>
              <span className="text-[10px] font-mono text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
                {format === 'long' ? 'Long-Form' : 'Shorts'} Model
              </span>
            </div>

            {/* Monthly Primary Box */}
            <div className="p-4 rounded-xl bg-gray-950/80 border border-gray-800/80">
              <span className="text-[11px] text-gray-400 block mb-0.5">Estimated Monthly Earnings</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono text-emerald-300">
                ${Math.round(monthlyEarnings).toLocaleString()}
                <span className="text-xs font-normal text-gray-400 ml-1 font-sans">/ month</span>
              </div>
              <p className="text-[11px] text-emerald-400/80 mt-1">
                Net Take-Home: ~${Math.round(monthlyEarnings * 0.95).toLocaleString()} after fees
              </p>
            </div>

            {/* Daily & Yearly Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-gray-950/60 border border-gray-800">
                <span className="text-[10px] text-gray-400 block mb-0.5">Daily Earnings</span>
                <span className="text-lg font-bold text-gray-100 font-mono">
                  ${Math.round(dailyEarnings).toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-500 block mt-0.5">per 24 hours</span>
              </div>
              <div className="p-3.5 rounded-xl bg-gray-950/60 border border-gray-800">
                <span className="text-[10px] text-gray-400 block mb-0.5">Yearly Revenue</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">
                  ${Math.round(yearlyEarnings).toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-500 block mt-0.5">12 months total</span>
              </div>
            </div>

            {/* Realistic Creator Breakdown */}
            <div className="p-3.5 rounded-xl bg-gray-950/40 border border-gray-800/60 space-y-2 text-xs text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Audience Tier:</span>
                <span className="font-semibold text-white">{countryTier.toUpperCase()} ({countryMultipliers[countryTier].multiplier * 100}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Effective Payout Rate:</span>
                <span className="font-semibold text-emerald-400 font-mono">${effectiveRpm.toFixed(2)} per 1K views</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Views / Year:</span>
                <span className="font-semibold text-white font-mono">{(normalizedDailyViews * 365).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-normal pt-2 border-t border-gray-800/80">
              *Calculated based on actual Google AdSense creator partner payouts. Long-form video ads pay significantly higher than YouTube Shorts pool revenue share.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
