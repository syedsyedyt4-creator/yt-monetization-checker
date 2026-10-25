import React, { useState, useEffect } from 'react';
import {
  Sparkles, DollarSign, TrendingUp, Cpu, ChevronDown,
  ChevronUp, Check, Copy, Flame, Layers, Award, RefreshCw, Calendar, Eye
} from 'lucide-react';
import AdBanner from './AdBanner';

export default function FacelessNiches() {
  const [niches, setNiches] = useState([]);
  const [todayDate, setTodayDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [formatMode, setFormatMode] = useState('long'); // 'long' or 'shorts'
  const [shuffleOffset, setShuffleOffset] = useState(0);

  const fetchNiches = () => {
    setLoading(true);
    fetch('/api/faceless-niches')
      .then(res => res.json())
      .then(data => {
        if (data.niches) {
          setNiches(data.niches);
          setTodayDate(data.todayDate || new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }));
        }
      })
      .catch(err => console.error('Failed to load niches:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNiches();
  }, []);

  const handleShuffle = () => {
    setShuffleOffset(prev => prev + 1);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Re-order if user clicks shuffle
  const displayedList = [...niches];
  if (shuffleOffset > 0 && displayedList.length > 0) {
    const shift = shuffleOffset % displayedList.length;
    displayedList.push(...displayedList.splice(0, shift));
  }

  const filteredNiches = displayedList.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'highest-rpm') return n.rpmTier === 'highest' || n.rpmTier === 'high';
    if (filter === 'low-comp') return n.competition.toLowerCase().includes('low') || n.competition.toLowerCase().includes('medium');
    if (filter === 'rapid-growth') return n.growthSpeed.toLowerCase().includes('rapid') || n.growthSpeed.toLowerCase().includes('explosive');
    return true;
  });

  return (
    <div id="faceless-niches" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Flame className="w-3.5 h-3.5" /> Featured Daily Picks: {todayDate || 'Updated Daily at 00:00 UTC'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Today’s Viral <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Faceless Niches</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            Rotated and updated daily with real creator RPM, AI tool stacks, and beginner-friendly production blueprints.
          </p>
        </div>

        {/* Format Selector & Shuffle Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Long form vs Shorts RPM Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-gray-900 border border-gray-800 text-xs font-semibold">
            <button
              onClick={() => setFormatMode('long')}
              className={`px-3 py-1.5 rounded-lg transition ${
                formatMode === 'long' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              🎬 Long-Form RPM
            </button>
            <button
              onClick={() => setFormatMode('shorts')}
              className={`px-3 py-1.5 rounded-lg transition ${
                formatMode === 'shorts' ? 'bg-red-600 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              📱 Shorts RPM
            </button>
          </div>

          <button
            onClick={handleShuffle}
            title="Rotate / Shuffle Daily Featured Niches"
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Next Picks
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-gray-900/60 border border-gray-800/80 text-xs font-medium mb-6 w-fit">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filter === 'all' ? 'bg-gray-800 text-white shadow font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          All 12 Niches
        </button>
        <button
          onClick={() => setFilter('highest-rpm')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filter === 'highest-rpm' ? 'bg-amber-600 text-white shadow font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          💰 Highest RPM ($10+)
        </button>
        <button
          onClick={() => setFilter('rapid-growth')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filter === 'rapid-growth' ? 'bg-orange-600 text-white shadow font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          ⚡ Fastest Growth
        </button>
        <button
          onClick={() => setFilter('low-comp')}
          className={`px-3 py-1.5 rounded-lg transition ${
            filter === 'low-comp' ? 'bg-emerald-600 text-white shadow font-semibold' : 'text-gray-400 hover:text-white'
          }`}
        >
          🟢 Low Competition
        </button>
      </div>

      {/* Niches Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-gray-900/60 border border-gray-800" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNiches.map((niche, idx) => {
            const isExpanded = expandedId === niche.id;
            const isTopRank = idx === 0;

            return (
              <React.Fragment key={niche.id}>
                <div className={`rounded-2xl border transition-all p-6 shadow-xl flex flex-col justify-between backdrop-blur-sm relative group ${
                  isTopRank
                    ? 'border-amber-500/50 bg-gradient-to-br from-amber-950/25 via-gray-900/80 to-gray-950 shadow-amber-950/20 ring-1 ring-amber-500/30'
                    : 'border-gray-800/90 bg-gray-900/40 hover:border-gray-700/80'
                }`}>
                  {/* Card Top */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isTopRank
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {niche.dailyBadge || niche.badge}
                      </span>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {niche.viralScore || niche.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition mb-2">
                      {niche.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">
                      {niche.overview}
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-gray-950/70 border border-gray-800/80 mb-4 text-center">
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                          {formatMode === 'long' ? 'Est. Long RPM' : 'Est. Shorts RPM'}
                        </span>
                        <span className="text-sm font-extrabold text-emerald-400 font-mono">
                          {formatMode === 'long' ? niche.rpm : (niche.rpmShorts || '$0.08 - $0.16')}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Competition</span>
                        <span className="text-sm font-bold text-amber-400">{niche.competition}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Growth</span>
                        <span className="text-sm font-bold text-blue-400">{niche.growthSpeed}</span>
                      </div>
                    </div>

                    {/* AI Tool Stack Badges */}
                    <div className="mb-4">
                      <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-2 block flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-red-400" /> Recommended AI Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {niche.aiToolStack.map((tool, ti) => (
                          <span
                            key={ti}
                            className="text-[11px] bg-gray-800/80 text-gray-300 px-2 py-1 rounded-md border border-gray-700/60"
                            title={tool.role}
                          >
                            {tool.tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Blueprint */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-800/80 animate-fade-in text-xs space-y-3">
                        <div>
                          <strong className="text-gray-200 block mb-1">🎬 Step-by-Step Production Blueprint:</strong>
                          <ul className="list-disc pl-4 space-y-1 text-gray-400">
                            {niche.productionBlueprint.map((step, si) => (
                              <li key={si}>{step}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <strong className="text-gray-200 block mb-1">🏷️ Top Keywords for Tags:</strong>
                          <div className="flex flex-wrap gap-1">
                            {niche.topKeywords.map((kw, ki) => (
                              <span key={ki} className="bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-[10px] border border-gray-700">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <strong className="text-gray-200 block mb-1">💵 Monetization Channels:</strong>
                          <div className="flex flex-wrap gap-2 text-gray-300">
                            {niche.monetizationChannels.map((mc, mi) => (
                              <span key={mi} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                                ✓ {mc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">
                      Pot. Monthly: <strong className="text-white">{niche.monthlyEarningsEstimate}</strong>
                    </span>
                    <button
                      onClick={() => toggleExpand(niche.id)}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                    >
                      {isExpanded ? (
                        <>Hide Blueprint <ChevronUp className="w-3.5 h-3.5" /></>
                      ) : (
                        <>View Blueprint <ChevronDown className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  </div>
                </div>

                {/* Inject an Ad unit after the 2nd card */}
                {idx === 1 && (
                  <div className="md:col-span-2">
                    <AdBanner type="leaderboard" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
