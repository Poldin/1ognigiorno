"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeContent from "./components/HomeContent";
import { useScrollTracking, usePageTracking } from "./lib/useAnalytics";

export default function Home() {
  // Analytics tracking
  useScrollTracking();
  usePageTracking('homepage');
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Main content area that grows to push footer down */}
      <main className="flex-1">
        <HomeContent />
      </main>

      <Footer />
    </div>
  );
}
