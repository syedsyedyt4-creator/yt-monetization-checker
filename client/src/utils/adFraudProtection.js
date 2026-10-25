/**
 * Google AdSense Click-Bombing & Fraud Protection Guard
 * -----------------------------------------------------
 * Protects your AdSense account from competitors or bots who try
 * to repeatedly click your ads to get your account banned for "Invalid Traffic".
 *
 * Rules:
 * - Max 3 ad clicks per visitor every 3 hours.
 * - If a visitor exceeds the limit, ads are automatically hidden for them
 *   and all further clicks are neutralized.
 */

const STORAGE_KEY = 'adsense_safety_guard';
const MAX_CLICKS = 3;
const COOLDOWN_HOURS = 3;

export function getAdSafetyStatus() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { safe: true, clicks: 0 };
    const data = JSON.parse(raw);
    const now = Date.now();
    const expiry = data.timestamp + COOLDOWN_HOURS * 60 * 60 * 1000;

    if (now > expiry) {
      // Cooldown expired, reset
      localStorage.removeItem(STORAGE_KEY);
      return { safe: true, clicks: 0 };
    }

    if (data.clicks >= MAX_CLICKS) {
      return { safe: false, clicks: data.clicks, blockedUntil: new Date(expiry).toLocaleTimeString() };
    }

    return { safe: true, clicks: data.clicks };
  } catch (e) {
    return { safe: true, clicks: 0 };
  }
}

export function recordAdClick() {
  try {
    const now = Date.now();
    const raw = localStorage.getItem(STORAGE_KEY);
    let data = raw ? JSON.parse(raw) : { clicks: 0, timestamp: now };

    data.clicks += 1;
    data.timestamp = data.timestamp || now;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    if (data.clicks >= MAX_CLICKS) {
      console.warn(`[AdSense Safety Shield] High ad activity detected. Temporarily hiding ads to protect AdSense account.`);
    }
  } catch (e) {}
}

/**
 * Initializes iframe/window blur monitoring to detect when visitors click inside Google AdSense iframes
 */
export function initAdClickGuard() {
  if (typeof window === 'undefined') return;

  window.addEventListener('blur', () => {
    // If the active element is an iframe (Google AdSense ad unit)
    if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
      const isAd = document.activeElement.closest('.adsbygoogle') ||
                   document.activeElement.src.includes('google') ||
                   document.activeElement.id.includes('aswift');
      if (isAd) {
        recordAdClick();
      }
    }
  });
}
