/**
 * Google AdSense Configuration
 * ----------------------------------------
 * Connected to verified AdSense account: ca-pub-8046276779791670
 */
export const ADS_CONFIG = {
  // Your Google AdSense Publisher ID
  publisherId: 'ca-pub-8046276779791670',

  // Google AdSense is now enabled
  enableGoogleAds: true,

  // Ad Slot IDs (from AdSense dashboard > Ads > By ad unit > Display ads)
  // If left empty, Google Auto Ads and responsive auto placements will be served!
  slots: {
    topLeaderboard: '',     // e.g. '1234567890' (Responsive / 728x90)
    inFeedResult: '',       // e.g. '2345678901' (In-article or Square)
    footerLeaderboard: '',  // e.g. '3456789012' (Responsive footer banner)
  }
};
