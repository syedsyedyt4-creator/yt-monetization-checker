async function inspectChannelVideosData(handle) {
  const url = `https://www.youtube.com/${handle}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Cookie': 'CONSENT=YES+cb.20210328-17-p0.en+FX+478; SOCS=CAESEwgDEgk0ODEzNzg5MjQaAmVuIAEaBgiA_LyaBg;'
    }
  });
  const html = await res.text();
  console.log(`Channel ${handle} HTML size:`, html.length);
  
  // Find ytInitialData
  const match = html.match(/ytInitialData\s*=\s*({.+?});(?:var|<\/script>)/);
  if (match) {
    console.log('Found ytInitialData on channel page!');
    const data = JSON.parse(match[1]);
    console.log('Data keys:', Object.keys(data));
    
    // Search for badges, videoRenderers, badges
    const str = JSON.stringify(data);
    console.log('Has BADGE_STYLE_TYPE_VERIFIED:', str.includes('BADGE_STYLE_TYPE_VERIFIED'));
    console.log('Has sponsorButton (Join):', str.includes('sponsorButton') || str.includes('ytd-sponsor-button-renderer'));
    console.log('Has store / merch:', str.includes('merchandiseRenderer') || str.includes('storeTab'));
    
    // Look at badges on the channel header
    const header = data.header?.pageHeaderRenderer || data.header?.c4TabbedHeaderRenderer;
    console.log('Header badges:', JSON.stringify(header?.badges || header?.ownerBadges || {}));

    // Find all video renderers
    const videoMatches = str.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g) || [];
    console.log('Video matches in channel data:', videoMatches.slice(0, 5));
  } else {
    console.log('ytInitialData not found on channel page');
  }
}
inspectChannelVideosData('@Jinus99-b9v');
inspectChannelVideosData('@AlphaGames-o9q');
inspectChannelVideosData('@Orewa_Red01');
