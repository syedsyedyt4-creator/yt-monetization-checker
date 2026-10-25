import React, { useState, useEffect } from 'react';
import {
  Hash, Search, Copy, Check, TrendingUp, Flame,
  Sparkles, Tag, ArrowRight, CheckCircle2, Filter
} from 'lucide-react';

export default function TrendingKeywords() {
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [filterType, setFilterType] = useState('all'); // all, hashtag, keyword
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState(null);
  const [copyAllStatus, setCopyAllStatus] = useState(false);

  useEffect(() => {
    fetch('/api/trending-keywords')
      .then(res => res.json())
      .then(data => {
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
          setActiveCategoryId(data.categories[0].id);
        }
      })
      .catch(err => console.error('Failed to load keywords:', err));
  }, []);

  const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];

  const handleCopySingle = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyAll = (keywordsToCopy) => {
    if (!keywordsToCopy || keywordsToCopy.length === 0) return;
    const formatted = keywordsToCopy.map(k => k.text).join(', ');
    navigator.clipboard.writeText(formatted);
    setCopyAllStatus(true);
    setTimeout(() => setCopyAllStatus(false), 2500);
  };

  // If search query is entered, search across ALL categories
  let displayedKeywords = [];
  let isGlobalSearch = searchQuery.trim().length > 0;

  if (isGlobalSearch) {
    const q = searchQuery.toLowerCase();
    categories.forEach(cat => {
      cat.keywords.forEach(kw => {
        if (kw.text.toLowerCase().includes(q) || cat.name.toLowerCase().includes(q)) {
          if (filterType === 'all' || kw.type === filterType) {
            displayedKeywords.push({ ...kw, categoryName: cat.name });
          }
        }
      });
    });
  } else if (activeCategory) {
    displayedKeywords = activeCategory.keywords.filter(k => {
      if (filterType === 'all') return true;
      return k.type === filterType;
    });
  }

  const totalAllTags = categories.reduce((sum, c) => sum + c.keywords.length, 0);

  return (
    <div id="keywords" className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <Hash className="w-3.5 h-3.5" /> High Search Volume Database ({totalAllTags}+ Curated Tags)
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300">Keywords & Hashtags</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-xl">
            Optimized for YouTube Shorts discovery, algorithmic search pickup, and video title ranking.
          </p>
        </div>

        {/* 1-Click Copy All for YouTube Studio */}
        <button
          onClick={() => handleCopyAll(displayedKeywords)}
          disabled={displayedKeywords.length === 0}
          className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg hover:shadow-red-500/20 transition flex items-center justify-center gap-2 self-start md:self-auto disabled:opacity-50"
        >
          {copyAllStatus ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Copied {displayedKeywords.length} Tags for Studio!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy All {displayedKeywords.length} Tags (Studio Ready)
            </>
          )}
        </button>
      </div>

      {/* Real-time Search Box */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search any keyword e.g. 'anime', 'zoro', 'money', 'ai', 'shorts', 'history'..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-gray-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Tabs (Shown when not in global search) */}
      {!isGlobalSearch && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition flex items-center gap-2 border ${
                activeCategoryId === cat.id
                  ? 'bg-red-600/90 text-white border-red-500 shadow-md shadow-red-600/20'
                  : 'bg-gray-900/60 text-gray-400 border-gray-800 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Filter by Hashtags / Keywords */}
      <div className="flex items-center justify-between gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2 text-gray-400">
          <span>Filter:</span>
          <button
            onClick={() => setFilterType('all')}
            className={`px-2.5 py-1 rounded-md transition ${filterType === 'all' ? 'bg-gray-800 text-white font-semibold' : 'hover:text-white'}`}
          >
            All ({displayedKeywords.length})
          </button>
          <button
            onClick={() => setFilterType('hashtag')}
            className={`px-2.5 py-1 rounded-md transition ${filterType === 'hashtag' ? 'bg-gray-800 text-white font-semibold' : 'hover:text-white'}`}
          >
            #Hashtags Only
          </button>
          <button
            onClick={() => setFilterType('keyword')}
            className={`px-2.5 py-1 rounded-md transition ${filterType === 'keyword' ? 'bg-gray-800 text-white font-semibold' : 'hover:text-white'}`}
          >
            Search Terms Only
          </button>
        </div>
        <span className="text-[11px] text-gray-500 hidden sm:inline">
          Click any card to copy individually
        </span>
      </div>

      {/* Keywords Cards Grid */}
      {displayedKeywords.length === 0 ? (
        <div className="text-center py-12 text-gray-500 text-xs">
          No keywords found matching "{searchQuery}". Try searching another topic.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {displayedKeywords.map((kw, i) => {
            const cardKey = `kw-${i}-${kw.text}`;
            const isCopied = copiedKey === cardKey;
            return (
              <div
                key={cardKey}
                onClick={() => handleCopySingle(kw.text, cardKey)}
                className="p-3.5 rounded-xl bg-gray-900/40 hover:bg-gray-900/80 border border-gray-800/80 hover:border-red-500/40 transition-all cursor-pointer group flex items-center justify-between gap-3 shadow-md backdrop-blur-sm"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-gray-100 group-hover:text-red-400 transition truncate">
                      {kw.text}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 bg-gray-800/60 px-1.5 py-0.5 rounded flex-shrink-0">
                      {kw.volume}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 mt-1 text-[11px] text-gray-400">
                    <span>{kw.trend}</span>
                    <span>•</span>
                    <span>
                      Comp: <strong className={
                        kw.competition === 'Low' ? 'text-emerald-400' : kw.competition === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                      }>{kw.competition}</strong>
                    </span>
                    {kw.categoryName && (
                      <>
                        <span>•</span>
                        <span className="text-[10px] text-gray-500 truncate max-w-[90px]">{kw.categoryName.replace(/^[^\w\s]+/, '')}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-gray-800/60 group-hover:bg-red-500/20 text-gray-400 group-hover:text-red-300 transition flex-shrink-0">
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
