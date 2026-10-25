import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Sparkles, X, ShieldCheck } from 'lucide-react';
import { ADS_CONFIG } from '../adsConfig';
import { getAdSafetyStatus, initAdClickGuard } from '../utils/adFraudProtection';

export default function AdBanner({ type = 'leaderboard', slotId = '', className = '' }) {
  const [dismissed, setDismissed] = useState(false);
  const [safetyStatus, setSafetyStatus] = useState({ safe: true });
  const adsterraRef = useRef(null);

  useEffect(() => {
    initAdClickGuard();
    setSafetyStatus(getAdSafetyStatus());

    if (ADS_CONFIG.enableGoogleAds && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Ignore duplicate push errors in dev
      }
    }

    // Dynamic Adsterra Native Banner script execution
    if (type === 'infeed' && ADS_CONFIG.adsterra?.enabled && adsterraRef.current) {
      try {
        if (!adsterraRef.current.querySelector('script')) {
          const script = document.createElement('script');
          script.async = true;
          script.setAttribute('data-cfasync', 'false');
          script.src = ADS_CONFIG.adsterra.nativeScriptUrl;
          adsterraRef.current.appendChild(script);
        }
      } catch (e) {}
    }
  }, [type]);

  if (dismissed) return null;

  // Anti-Click-Bombing Guard: Hide ads if someone attempts click fraud to protect AdSense
  if (!safetyStatus.safe) {
    return null;
  }

  // Active Adsterra Native Monetization (syeddev001 - Ad Unit 6150232)
  if (type === 'infeed' && ADS_CONFIG.adsterra?.enabled) {
    return (
      <div className={`w-full max-w-5xl mx-auto my-6 px-4 ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 px-1">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-amber-400" /> Recommended For Creators</span>
          <span className="text-[10px] text-gray-500 bg-gray-800/60 px-1.5 py-0.5 rounded border border-gray-700/50">Sponsored</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-800/80 bg-gray-950/70 p-3 shadow-lg min-h-[110px] flex flex-col justify-center">
          <div
            id={ADS_CONFIG.adsterra.containerId}
            ref={adsterraRef}
            className="w-full"
          />
        </div>
      </div>
    );
  }

  // Live Google AdSense Rendering (if enabled with custom domain)
  if (ADS_CONFIG.enableGoogleAds && ADS_CONFIG.publisherId !== 'ca-pub-XXXXXXXXXXXXXXXX') {
    const activeSlotId = slotId || (
      type === 'leaderboard' ? ADS_CONFIG.slots.topLeaderboard :
      type === 'infeed' ? ADS_CONFIG.slots.inFeedResult :
      ADS_CONFIG.slots.footerLeaderboard
    );

    if (type === 'skyscraper') {
      return (
        <div className={`w-[160px] text-center ${className}`}>
          <div className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold mb-1">
            Ad
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-800/80 bg-gray-950/60 p-1 shadow-lg min-h-[600px] flex items-center justify-center">
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '160px', height: '600px' }}
              data-ad-client={ADS_CONFIG.publisherId}
              data-ad-slot={activeSlotId || undefined}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`w-full max-w-5xl mx-auto my-6 px-4 text-center ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-1 px-1">
          <span>Advertisement</span>
          <span className="text-[10px] text-gray-600 bg-gray-800/60 px-1.5 py-0.5 rounded">Google AdSense</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-800/80 bg-gray-950/60 p-2 shadow-lg min-h-[90px] flex items-center justify-center">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={ADS_CONFIG.publisherId}
            data-ad-slot={activeSlotId || undefined}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // Fallback: High-CTR Creator Affiliate Units (Earn money before / during AdSense approval)
  
  // 1. Skyscraper (Desktop Gutters: 160x600)
  if (type === 'skyscraper') {
    return (
      <div className={`w-[160px] p-3 rounded-2xl border border-gray-800 bg-gray-900/90 shadow-2xl backdrop-blur-sm flex flex-col justify-between text-center min-h-[580px] ${className}`}>
        <div>
          <span className="text-[9px] uppercase font-bold text-gray-400 bg-gray-800 px-2 py-0.5 rounded">Sponsored</span>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 text-2xl font-bold mx-auto mt-4 mb-3 shadow-inner">
            🎙️
          </div>
          <h5 className="text-xs font-bold text-white mb-2 leading-snug">
            Hyper-Realistic AI Voiceovers
          </h5>
          <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
            Bypass YouTube demonetization with real human voices for your faceless videos.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-2 rounded-lg bg-gray-950 border border-gray-800 text-[10px] text-emerald-400 font-mono">
            ⭐ 10,000 Free Credits
          </div>
          <a
            href="https://elevenlabs.io"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-semibold text-[11px] rounded-lg shadow block transition"
          >
            Try Free <ExternalLink className="w-3 h-3 inline ml-1" />
          </a>
        </div>
      </div>
    );
  }

  // 2. Leaderboard (Top / Between Sections: 728x90 responsive)
  if (type === 'leaderboard') {
    return (
      <div className={`w-full max-w-5xl mx-auto my-6 px-4 ${className}`}>
        <div className="flex items-center justify-between text-[11px] text-gray-500 uppercase tracking-widest font-semibold mb-1 px-1">
          <span>Advertisement</span>
          <span className="text-[10px] text-gray-600 bg-gray-800/60 px-1.5 py-0.5 rounded">Creator Partner</span>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-gray-800/80 bg-gradient-to-r from-gray-900/90 via-gray-950 to-gray-900/90 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-lg shadow-inner">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white text-sm sm:text-base">Scale Your Faceless Channel 10x Faster</h4>
                  <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/30">Sponsored</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-1">
                  AI voice generation, 4K b-roll clips & automatic subtitles in 1-click. Free trial available.
                </p>
              </div>
            </div>
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-semibold rounded-lg shadow-md hover:shadow-red-500/20 transition-all flex items-center gap-1.5"
            >
              Try For Free <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 3. In-Feed Native Card (Native look, high CTR)
  if (type === 'infeed') {
    return (
      <div className={`p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-gray-900/70 to-gray-900/40 relative overflow-hidden shadow-lg ${className}`}>
        <div className="flex items-center justify-between text-[10px] text-amber-400/80 uppercase tracking-wider font-semibold mb-3">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> Recommended Creator Tool</span>
          <span className="bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[10px]">Sponsored</span>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl font-bold flex-shrink-0">
            🎙️
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-100 text-sm mb-1">Human-Sounding Voiceovers for Faceless YouTube</h4>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Don't get demonetized with robotic voices. Top viral channels use hyper-realistic voice AI that bypasses robotic filters.
            </p>
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 px-3 py-1.5 rounded-lg transition"
            >
              Get 10,000 Free Credits <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 4. Sticky Bottom Banner (Very high viewability & impression RPM)
  if (type === 'sticky') {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 border-t border-gray-800/80 backdrop-blur-md px-4 py-2.5 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded">Ad</span>
            <span className="text-xs text-gray-300 hidden sm:inline">
              🔥 <strong>Pro Creator Tip:</strong> Automate your YouTube Shorts subtitles with AI in seconds.
            </span>
            <span className="text-xs text-gray-300 sm:hidden">
              🔥 Auto-generate viral Shorts subtitles
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://www.capcut.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold rounded-md shadow transition flex items-center gap-1"
            >
              Explore Free <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-500 hover:text-gray-300 p-1"
              title="Close Ad"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
