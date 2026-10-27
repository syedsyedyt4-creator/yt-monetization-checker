async function pollRenderDeploy() {
  for (let i = 1; i <= 20; i++) {
    try {
      console.log(`[Attempt ${i}/20] Checking live Render deployment...`);
      const res = await fetch('https://yt-monetization-checker.onrender.com/api/check-monetization?url=@Orewa_Red01');
      const data = await res.json();
      console.log(`Orewa_Red01 -> isMonetized: ${data.isMonetized} | Badge: ${data.monetizationBadge}`);
      if (data.isMonetized === false) {
        console.log('SUCCESS! Render has successfully deployed the updated version and @Orewa_Red01 is NOT MONETIZED!');
        return;
      }
    } catch (e) {
      console.log('Error:', e.message);
    }
    await new Promise(r => setTimeout(r, 6000));
  }
}
pollRenderDeploy();
