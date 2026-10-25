/**
 * Ad Monetization Configuration (Adsterra & High-Converting Creator Sponsors)
 * ----------------------------------------
 * User Account: syeddev001
 * Adsterra Native Banner Unit ID: 6150232
 */
export const ADS_CONFIG = {
  // Google AdSense Publisher ID (ready whenever custom domain is connected)
  publisherId: 'ca-pub-8046276779791670',
  enableGoogleAds: false, // Disabled on free subdomain to prevent blank boxes

  // Active Adsterra Network (Live & Approved for syeddev001)
  adsterra: {
    enabled: true,
    nativeScriptUrl: 'https://bauval.org/21/e03220535c11e711d32c37c7a317b046',
    containerId: 'container-e03220535c11e711d32c37c7a317b046'
  },

  slots: {
    topLeaderboard: '',
    inFeedResult: '',
    footerLeaderboard: ''
  }
};
