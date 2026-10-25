# 🚀 Free High-Traffic Deployment Guide for YT Channel Monetization Checker

This project is configured for **Render.com**, **Vercel**, and **Railway** to handle large traffic spikes completely free.

---

## ⚡ Option 1: Deploy to Render.com (100% Free - Recommended)
Render allows you to host full-stack Node.js websites with free SSL and automatic deployments.

### Steps:
1. **Push your code to GitHub**:
   - Create a free repository on [GitHub.com](https://github.com).
   - In your project folder, run:
     ```bash
     git init
     git add .
     git commit -m "Initial commit of YT Channel Monetization Checker"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```
2. **Deploy on Render**:
   - Go to **[Render.com](https://render.com)** and create a free account.
   - Click **"New +"** ➔ **"Web Service"**.
   - Connect your GitHub repository.
   - Fill in:
     * **Name:** `yt-monetization-checker`
     * **Environment:** `Node`
     * **Build Command:** `npm install && cd client && npm install && npm run build`
     * **Start Command:** `node server/index.js`
     * **Plan:** `Free`
   - Click **"Create Web Service"**.
   - Within 2 minutes, your website will be live at:
     👉 `https://yt-monetization-checker.onrender.com`

---

## 🛡️ Step 2: Connect Cloudflare (For Handling Millions of Visitors & DDoS Protection)

Once your website is live on Render:
1. Go to **[Cloudflare.com](https://www.cloudflare.com)** (Free plan).
2. Click **"Add a Domain"** (e.g., `yourdomain.com`).
3. Add a CNAME record pointing to your Render URL (`yt-monetization-checker.onrender.com`) with the **Orange Cloud (Proxied)** turned ON.
4. Go to **Security** ➔ **Bots** ➔ Turn **ON** **"Bot Fight Mode"**.
5. **Result:** Cloudflare's global edge network caches your static assets across 300+ global data centers, absorbing 99% of server traffic and blocking all scrapers and fake traffic floods!

---

## 💰 Step 3: Enable Google AdSense on Your Live Domain

1. In your **Google AdSense Dashboard**:
2. Click **Sites** ➔ **Add site**.
3. Type your live domain URL.
4. Click **Request review**.
5. Your publisher ID `ca-pub-8046276779791670` is already live on your site, so Google will approve and begin filling the ad slots!
