import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { checkChannelMonetization } from './youtubeChecker.js';
import { getDailyNiches } from './facelessNichesData.js';
import { TRENDING_CATEGORIES } from './trendingKeywordsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Cloudflare & reverse proxies for real visitor IP resolution
app.set('trust proxy', 1);

// Security Headers (Protects against clickjacking, iframe injection, MIME sniffing)
app.use(helmet({
  contentSecurityPolicy: false, // Allows Google AdSense & external fonts to render smoothly
  crossOriginEmbedderPolicy: false
}));

app.use(cors());
app.use(express.json());

// Anti-DDoS & Fake Traffic Shield (Rate Limiting)
// 1. General limiter: 300 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests from this IP. Please try again in a few minutes.' }
});
app.use(generalLimiter);

// 2. Strict API limiter: Max 30 lookups per minute per IP (Stops bot storms & scrapers)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'High traffic detected. Please wait a few seconds before checking another channel.' }
});
app.use('/api/', apiLimiter);

// In-memory cache for fast response times on repeat lookups
const channelCache = new Map();

// API: Check YouTube Channel or Video Monetization
app.get('/api/check-monetization', async (req, res) => {
  const query = req.query.query || req.query.url;
  if (!query || typeof query !== 'string' || !query.trim()) {
    return res.status(400).json({ error: 'Please enter a valid YouTube channel URL, handle (@username), or video link.' });
  }

  const cacheKey = query.trim().toLowerCase();
  const cached = channelCache.get(cacheKey);
  // Cache lookup with custom TTL
  if (cached && (Date.now() - cached.timestamp < (cached.ttl || 60 * 1000))) {
    return res.json({ ...cached.data, fromCache: true });
  }

  try {
    const result = await checkChannelMonetization(query);
    // Cache verified results (10 min for monetized, 30s for non-monetized to allow instant re-check)
    const ttl = result.isMonetized ? 10 * 60 * 1000 : 30 * 1000;
    channelCache.set(cacheKey, { timestamp: Date.now(), ttl, data: result });
    if (result.handle) {
      channelCache.set(result.handle.toLowerCase(), { timestamp: Date.now(), ttl, data: result });
    }
    return res.json(result);
  } catch (err) {
    console.error('Monetization check error for query:', query, err.message);
    return res.status(500).json({
      error: err.message || 'Unable to analyze channel. Please make sure the channel or video link is valid and public.'
    });
  }
});

// API: Get Faceless Niches (dynamically rotated daily)
app.get('/api/faceless-niches', (req, res) => {
  const dailyData = getDailyNiches();
  res.json(dailyData);
});

// API: Get Trending Keywords & Hashtags
app.get('/api/trending-keywords', (req, res) => {
  res.json({
    categories: TRENDING_CATEGORIES,
    updatedAt: new Date().toISOString()
  });
});

// API: AdSense Configuration & Publisher Info
app.get('/api/ads-config', (req, res) => {
  res.json({
    adsensePublisherId: process.env.ADSENSE_PUB_ID || 'ca-pub-8046276779791670',
    enabled: process.env.ADS_ENABLED !== 'false',
    adSlots: {
      headerLeaderboard: 'slot-header-728x90',
      inFeedResult: 'slot-infeed-native',
      sidebarSticky: 'slot-sidebar-300x250',
      nicheCardNative: 'slot-niche-card',
      footerBanner: 'slot-footer-leaderboard'
    }
  });
});

// API: Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide your name, email, and message.' });
  }
  // Store or log inquiry
  console.log('Received contact message from:', email, `[${name}]`, '-', subject);
  return res.json({ success: true, message: 'Thank you! Your message has been received. Our team will get back to you shortly.' });
});

// Serve frontend in production
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.use((req, res, next) => {
  // If it's an API route that wasn't matched, return 404
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      // Client not built yet, return friendly message
      res.send('API Server is running. Run client in development or run `npm run build` in client.');
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Monetization Checker API & Server running on http://localhost:${PORT}`);
});
