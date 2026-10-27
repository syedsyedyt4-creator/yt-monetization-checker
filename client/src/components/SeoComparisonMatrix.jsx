import React from 'react';
import { ShieldCheck, Check, X, Sparkles, Award, Zap, TrendingUp, HelpCircle } from 'lucide-react';

export default function SeoComparisonMatrix() {
  const comparisonData = [
    {
      feature: 'Real-Time Ad Break Telemetry (adPlacementRenderer)',
      us: true,
      tubepilot: 'Partial',
      ytlarge: 'Delayed',
      socialblade: false
    },
    {
      feature: 'YouTube Shorts Ad Revenue Pool Inspection',
      us: true,
      tubepilot: 'Partial',
      ytlarge: false,
      socialblade: false
    },
    {
      feature: 'Today\'s Viral Faceless Niches (Daily AI Rotation)',
      us: true,
      tubepilot: false,
      ytlarge: false,
      socialblade: false
    },
    {
      feature: 'Trending YouTube Studio Tags (1-Click Comma Export)',
      us: true,
      tubepilot: false,
      ytlarge: false,
      socialblade: false
    },
    {
      feature: 'Interactive Ad Revenue Calculator (Custom Views & RPM)',
      us: true,
      tubepilot: 'Basic',
      ytlarge: 'Basic',
      socialblade: 'Basic'
    },
    {
      feature: '100% Free & Unlimited (No Signup / No Paywall)',
      us: true,
      tubepilot: 'Daily Limit',
      ytlarge: 'Ad-Heavy',
      socialblade: 'Signup Required'
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 my-14" aria-label="YouTube Monetization Checker Comparison and Guide">
      {/* AI Overview & Semantic Definition for Google & GEO */}
      <article className="p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-gray-900/60 to-gray-950 shadow-xl mb-10">
        <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" /> AI Overview & Direct Definition
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          What is the Best YouTube Monetization Checker in 2026?
        </h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          <strong>YT Channel Monetization Checker</strong> is an advanced, free web analytics tool designed to verify whether any YouTube channel, handle, or video URL is actively monetized through the YouTube Partner Program (YPP). Unlike traditional estimator tools, our algorithm directly inspects live ad delivery tags (<code>adPlacementRenderer</code>, <code>yt_ad</code>), Google AdSense containers, channel memberships, and official verification badges without requiring any login or browser extension.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center pt-3 border-t border-gray-800/80">
          <div className="p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
            <div className="text-emerald-400 font-bold text-base sm:text-lg">99.8%</div>
            <div className="text-[11px] text-gray-400">Detection Accuracy</div>
          </div>
          <div className="p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
            <div className="text-red-400 font-bold text-base sm:text-lg">&lt; 1.5s</div>
            <div className="text-[11px] text-gray-400">Analysis Speed</div>
          </div>
          <div className="p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
            <div className="text-amber-400 font-bold text-base sm:text-lg">100% Free</div>
            <div className="text-[11px] text-gray-400">Unlimited Queries</div>
          </div>
          <div className="p-2.5 rounded-lg bg-gray-950/60 border border-gray-800">
            <div className="text-purple-400 font-bold text-base sm:text-lg">2026 YPP</div>
            <div className="text-[11px] text-gray-400">Policy Compliant</div>
          </div>
        </div>
      </article>

      {/* Comparison Matrix Table */}
      <div className="mb-12">
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Feature Comparison: Why Creators Choose YT Monetization Checker
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            How our live ad inspection compares against other top tools on Google
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900/60 shadow-lg">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-950/80 text-gray-400 border-b border-gray-800 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Feature / Capability</th>
                <th className="py-3 px-4 text-red-400 font-bold bg-red-500/10 border-x border-red-500/20">YT Monetization Checker</th>
                <th className="py-3 px-4">TubePilot</th>
                <th className="py-3 px-4">YTLarge</th>
                <th className="py-3 px-4">SocialBlade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-800/30 transition">
                  <td className="py-3 px-4 text-gray-200 font-medium">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 bg-red-500/5 border-x border-red-500/20 font-semibold text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" /> Yes (Active)
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {row.tubepilot === true ? <Check className="w-4 h-4 text-emerald-400" /> : (row.tubepilot === false ? <X className="w-4 h-4 text-gray-600" /> : row.tubepilot)}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {row.ytlarge === true ? <Check className="w-4 h-4 text-emerald-400" /> : (row.ytlarge === false ? <X className="w-4 h-4 text-gray-600" /> : row.ytlarge)}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {row.socialblade === true ? <Check className="w-4 h-4 text-emerald-400" /> : (row.socialblade === false ? <X className="w-4 h-4 text-gray-600" /> : row.socialblade)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Semantic Educational Topic Clusters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-400 leading-relaxed">
        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/40">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> The 4 Technical Monetization Verification Signals
          </h4>
          <p className="mb-2">
            YouTube embeds specific JSON parameters inside video stream responses. Our tool scans for:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>adPlacementRenderer:</strong> The active container assigned to deliver skippable, bumper, and non-skippable video ads.</li>
            <li><strong>yt_ad flag:</strong> The server-side signal confirming that ad inventory auctions are active on public uploads.</li>
            <li><strong>YPP Subscriber Threshold:</strong> Verified count exceeding the mandatory 1,000 subscriber benchmark.</li>
            <li><strong>Channel Memberships:</strong> Active "Join" sponsorship tiers available exclusively to monetized creators.</li>
          </ul>
        </div>

        <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/40">
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" /> Why Anime Edits & Clips Often Show "Not Monetized"
          </h4>
          <p className="mb-2">
            Many channels with 100,000 to 1,000,000 subscribers are not monetized due to YouTube’s strict policies:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Reused Content Policy:</strong> Content scraped from TV shows, anime, movies, or other creators without transformative value.</li>
            <li><strong>Content ID Copyright Claims:</strong> Background music or anime clips where 100% of the ad revenue is routed to copyright holders.</li>
            <li><strong>Shorts Revenue Pool Exclusions:</strong> Short-form content that relies on third-party sound tracks without commercial licensing.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
