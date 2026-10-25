import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AdBanner from './components/AdBanner';
import ChannelChecker from './components/ChannelChecker';
import FacelessNiches from './components/FacelessNiches';
import TrendingKeywords from './components/TrendingKeywords';
import RevenueCalculator from './components/RevenueCalculator';
import Footer from './components/Footer';
import ComplianceModal from './components/ComplianceModal';
import CookieBanner from './components/CookieBanner';

export default function App() {
  const [modalType, setModalType] = useState(null); // 'privacy', 'terms', 'about', 'contact', 'disclaimer'

  const handleOpenModal = (type) => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-gray-100 flex flex-col font-sans selection:bg-red-600/30 selection:text-red-300 relative">
      {/* Navigation */}
      <Navbar onOpenModal={handleOpenModal} />

      {/* Top Leaderboard Ad Unit (Standard 728x90 AdSense placement) */}
      <AdBanner type="leaderboard" className="mt-4" />

      {/* Desktop Left & Right Skyscraper Ads (Visible on 2XL wide screens >= 1440px) */}
      <div className="hidden 2xl:block fixed left-4 top-32 z-20">
        <AdBanner type="skyscraper" />
      </div>
      <div className="hidden 2xl:block fixed right-4 top-32 z-20">
        <AdBanner type="skyscraper" />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {/* Core Tool: YouTube Monetization Checker */}
        <ChannelChecker />

        {/* High-CTR In-Between Section Ad Unit */}
        <AdBanner type="leaderboard" className="my-8" />

        {/* Section 2: Today's Viral Faceless Niches */}
        <FacelessNiches />

        {/* Mid-Page Native Ad Unit */}
        <AdBanner type="leaderboard" className="my-8" />

        {/* Section 3: Trending Keywords & Hashtags */}
        <TrendingKeywords />

        {/* Section 4: Interactive YouTube Revenue Calculator */}
        <RevenueCalculator />
      </main>

      {/* Footer & Compliance Links */}
      <Footer onOpenModal={handleOpenModal} />

      {/* Sticky Bottom Floating Anchor Ad Unit */}
      <AdBanner type="sticky" />

      {/* Cookie Consent Banner (GDPR / AdSense Requirement) */}
      <CookieBanner onOpenPrivacy={() => handleOpenModal('privacy')} />

      {/* Compliance / Legal / Contact Modal */}
      <ComplianceModal
        isOpen={!!modalType}
        type={modalType}
        onClose={handleCloseModal}
      />
    </div>
  );
}
