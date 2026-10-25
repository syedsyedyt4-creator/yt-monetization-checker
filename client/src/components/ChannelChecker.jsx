import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Search, CheckCircle2, XCircle, AlertTriangle, DollarSign,
  TrendingUp, Users, Video, ShieldCheck, Sparkles,
  ExternalLink, ArrowRight, Loader2, Info, Eye, AlertCircle,
  ChevronDown, HelpCircle, BookOpen, Check
} from 'lucide-react';
import AdBanner from './AdBanner';

export default function ChannelChecker() {
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#10b981', '#34d399', '#f59e0b']
      });
    } catch (e) {}
  };

  const handleCheck = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const query = directQuery || inputUrl;
    if (!query || !query.trim()) {
      setError('Please enter a YouTube channel URL, handle (@username), or video link.');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    setLoadingStep('Connecting to YouTube API & scraping channel manifest...');
    const stepTimer1 = setTimeout(() => {
      setLoadingStep('Analyzing video ad streaming tags & yt_ad telemetry...');
    }, 900);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep('Verifying Google AdSense ad slots & YPP partnership status...');
    }, 1800);

    try {
      const response = await fetch(`/api/check-monetization?query=${encodeURIComponent(query.trim())}`);
      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to analyze channel.');
      }

      setResult(data);
      if (data.isMonetized) {
        triggerConfetti();
      }
    } catch (err) {
      setError(err.message || 'Could not verify channel monetization. Check the link and try again.');
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleExampleClick = (example) => {
    setInputUrl(example);
    handleCheck(null, example);
  };

  return (
    <div id="checker" className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> 100% Accurate YouTube Monetization Inspector
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Is This YouTube Channel <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">Monetized?</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Paste any YouTube channel link, handle, or video URL below. Our engine analyzes live ad inventory tags, Google AdSense units, and YPP eligibility.
        </p>
      </div>

      {/* Input Box */}
      <div className="relative max-w-3xl mx-auto">
        <form onSubmit={handleCheck} className="relative flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="e.g. https://youtube.com/@MrBeast or @mkbhd or video link"
              className="w-full pl-11 pr-4 py-3.5 bg-gray-900/90 border border-gray-700/80 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 shadow-xl text-sm transition"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-red-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Checking...
              </>
            ) : (
              <>
                Check Channel <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Example Clickers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-gray-400">
          <span className="text-gray-500">Try popular:</span>
          {['@MrBeast', '@veritasium', '@mkbhd', '@TEDEd', '@Orewa_Red01'].map((handle) => (
            <button
              key={handle}
              type="button"
              onClick={() => handleExampleClick(handle)}
              className="px-2.5 py-1 bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 rounded-md border border-gray-700/50 transition hover:text-white"
            >
              {handle}
            </button>
          ))}
        </div>
      </div>

      {/* Loading Progress State */}
      {loading && (
        <div className="mt-8 max-w-xl mx-auto p-6 rounded-2xl bg-gray-900/60 border border-gray-800 text-center animate-fade-in shadow-xl">
          <Loader2 className="w-8 h-8 animate-spin text-red-500 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-white mb-1">Scanning YouTube Page Telemetry</h4>
          <p className="text-xs text-gray-400">{loadingStep}</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="mt-6 max-w-2xl mx-auto p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-400 mt-0.5" />
          <div>
            <p className="font-semibold text-red-200">Analysis Error</p>
            <p className="text-red-300/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Result Section */}
      {result && !loading && (
        <div className="mt-8 max-w-4xl mx-auto animate-fade-in">
          {/* Main Status Card */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-md relative overflow-hidden ${
            result.isMonetized
              ? 'bg-gradient-to-br from-emerald-950/40 via-gray-900 to-gray-950 border-emerald-500/30 shadow-emerald-950/30'
              : 'bg-gradient-to-br from-amber-950/30 via-gray-900 to-gray-950 border-amber-500/30 shadow-amber-950/30'
          }`}>
            {/* Top Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-4">
                <img
                  src={result.avatar}
                  alt={result.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-gray-700 shadow-md"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80';
                  }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{result.title}</h2>
                    {result.isVerified && (
                      <span className="text-blue-400 text-xs bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 font-medium">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-mono mt-0.5">{result.handle || 'YouTube Creator'}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-300">
                    <span className="flex items-center gap-1.5 font-semibold text-white">
                      <Users className="w-3.5 h-3.5 text-red-400" /> {result.subscribers}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-gray-400" /> {result.videosCount}
                    </span>
                    {result.totalViews && (
                      <span className="flex items-center gap-1.5 text-gray-400">
                        <Eye className="w-3.5 h-3.5 text-gray-400" /> {result.totalViews}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Monetization Status Badge */}
              <div className="flex flex-col items-start sm:items-end">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg ${
                  result.isMonetized
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-emerald-500/10'
                    : 'bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-amber-500/10'
                }`}>
                  {result.isMonetized ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" /> MONETIZED
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-amber-400" /> NOT MONETIZED
                    </>
                  )}
                </div>
                <span className="text-[11px] text-gray-400 mt-1.5">
                  Confidence Score: <strong className="text-gray-200">{result.confidenceScore}</strong>
                </span>
              </div>
            </div>

            {/* Revenue Estimation Box (If Monetized) */}
            {result.isMonetized && (
              <div className="my-6 p-5 rounded-2xl bg-gray-950/70 border border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" /> Est. Monthly Ad Revenue
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    ${result.revenueEstimate.minMonthly.toLocaleString()} - ${result.revenueEstimate.maxMonthly.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400/90 mt-1">
                    Avg. ~${result.revenueEstimate.estMonthly.toLocaleString()} / mo
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <TrendingUp className="w-4 h-4 text-blue-400" /> Est. Yearly Ad Revenue
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    ${(result.revenueEstimate.estYearly).toLocaleString()}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    Based on standard Creator RPM
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gray-900/60 border border-gray-800/80">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                    <ShieldCheck className="w-4 h-4 text-purple-400" /> Niche Average RPM
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {result.revenueEstimate.estRPM}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    per 1,000 monetized views
                  </div>
                </div>
              </div>
            )}

            {/* Verification Checklist */}
            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Technical Verification Signals
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {result.checks.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-gray-900/50 border border-gray-800 flex items-start gap-3">
                    {c.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-200">{c.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          c.passed ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations / Analytical Explanations */}
            {result.recommendations && result.recommendations.length > 0 && (
              <div className="mt-5 p-4 rounded-xl bg-gray-950/60 border border-gray-800 text-xs">
                <h5 className="font-semibold text-gray-300 flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" /> Channel Insights & Monetization Analysis
                </h5>
                <ul className="space-y-1.5 text-gray-400 pl-4 list-disc">
                  {result.recommendations.map((rec, ri) => (
                    <li key={ri} className="leading-relaxed">{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Latest Video Inspected */}
            {result.analyzedVideo && (
              <div className="mt-4 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
                <span className="line-clamp-1">
                  Sample video tested: <strong className="text-gray-300">{result.analyzedVideo.title}</strong>
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${result.analyzedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-medium whitespace-nowrap ml-2"
                >
                  View on YouTube <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Ad Slot directly below result for max CTR */}
          <AdBanner type="infeed" className="mt-6" />
        </div>
      )}

      {/* SEO Educational Guide & Knowledge Base */}
      <div className="mt-14 pt-10 border-t border-gray-800/80">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Complete Creator Guide
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            How to Check If a YouTube Channel is Monetized (2026 Guide)
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mt-2 leading-relaxed">
            Everything you need to know about YouTube Partner Program eligibility, ad inventory tags, and how to verify channel monetization status accurately.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/60">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm mb-3">
              1
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Copy Channel or Video Link</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Copy any channel URL, handle (e.g. <code className="text-red-400">@MrBeast</code>), or direct video link from YouTube.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/60">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm mb-3">
              2
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Deep Ad Telemetry Scan</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our automated engine inspects active Google AdSense ad units (<code className="text-amber-400">adPlacementRenderer</code>), video ad breaks, and YPP status.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-gray-800 bg-gray-900/60">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm mb-3">
              3
            </div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Instant Revenue & Signals Report</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              View guaranteed monetization badge, confidence score, estimated monthly earnings, and detailed compliance breakdown.
            </p>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-3xl mx-auto mt-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-red-400" />
            <h3 className="text-lg font-bold text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How to check if a YouTube channel is monetized?',
                a: 'Simply paste any YouTube channel handle (@username), channel link, or video URL into our search bar above and click "Check Channel". Our tool scans live ad placement containers (adPlacementRenderer), Google AdSense tags, and YouTube Partner Program thresholds in seconds.'
              },
              {
                q: 'What are the official requirements for YouTube monetization in 2026?',
                a: 'To qualify for ad revenue sharing under the YouTube Partner Program (YPP), creators must have: (1) At least 1,000 subscribers, (2) Either 4,000 valid public watch hours in the past 12 months OR 10 million valid Shorts views in the last 90 days, (3) An active Google AdSense account with no active Community Guidelines strikes.'
              },
              {
                q: 'Why are some channels with over 100k subscribers NOT monetized?',
                a: 'This commonly happens with anime edits, movie clip channels, reused TikTok clips, or copyright-claimed music channels. Under YouTube\'s Reused Content and Repetitive Content policies, channels without significant original commentary, transformative editing, or authentic educational value are routinely denied monetization or demonetized.'
              },
              {
                q: 'How does our YouTube Monetization Checker detect monetization?',
                a: 'Our algorithm performs multi-signal verification: (1) Official YouTube Verified Partner status, (2) Real-time video streaming ad parameters (yt_ad flag), (3) Video player ad inventory containers (adPlacementRenderer), and (4) Channel membership and creator perks.'
              },
              {
                q: 'How much money does a monetized YouTube channel make?',
                a: 'Earnings depend on RPM (Revenue Per Mille - earnings per 1,000 views). Standard entertainment channels average $2.00 - $5.00 RPM, while high-CPM niches (finance, tech, AI, business) earn $12.00 - $35.00+ RPM. You can use our interactive YouTube Revenue Calculator above to simulate exact earnings.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-800/80 rounded-xl bg-gray-900/50 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-gray-200 hover:text-white transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-2 ${
                      openFaq === idx ? 'rotate-180 text-red-400' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-gray-400 leading-relaxed border-t border-gray-800/50 bg-gray-950/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
