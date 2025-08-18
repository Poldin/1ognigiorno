"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, HelpCircle, Share2, SquareChartGantt, Calendar } from "lucide-react";
import { trackButtonClick, trackSocialShare } from "../lib/gtag";
import { getDayNumber } from "../lib/getDayNumber";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Il prodotto del giorno - Scopri prodotti straordinari ogni giorno',
      text: 'La piattaforma che ogni giorno presenta un prodotto straordinario e lo trasforma in un fenomeno virale.',
      url: window.location.href
    };

    // Prova a usare l'API nativa di condivisione
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        trackSocialShare('Native Share');
        setIsMenuOpen(false);
      } catch {
        console.log('Condivisione nativa annullata dall\'utente');
      }
    } else {
      console.log('API di condivisione nativa non supportata su questo dispositivo');
    }
  };

  return (
    <>
      <header className="border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                    <span className="text-white text-lg font-spacegrotesk">{getDayNumber()}</span>
                  </div>
                  {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div> */}
                </div>
                <h1 className="text-lg sm:text-xl font-medium tracking-tight text-gray-800 font-spacegrotesk">
                  IL PRODOTTO DEL GIORNO
                </h1>
              </div>
            </Link>
            
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/prodotti" 
                onClick={() => trackButtonClick('Prodotti', 'Header Desktop')}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <SquareChartGantt className="w-4 h-4 mr-1" /> Prodotti
              </Link>
              <Link 
                href="/how" 
                onClick={() => trackButtonClick('Come funziona', 'Header Desktop')}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-1" /> Scopri
              </Link>
              <Link 
                href="/calendario" 
                onClick={() => trackButtonClick('Calendario', 'Header Desktop')}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <Calendar className="w-4 h-4 mr-1" /> Calendario
              </Link>
              <button 
                onClick={handleNativeShare}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" /> Condividi
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Apri menu principale</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 right-0 w-full bg-white shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-2 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                      <span className="text-white text-lg font-spacegrotesk">{getDayNumber()}</span>
                    </div>
                  </div>
                  <h2 className="text-base font-medium text-gray-800 font-spacegrotesk">
                    IL PRODOTTO DEL GIORNO
                  </h2>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 px-2 py-8 space-y-6">
                <Link 
                  href="/prodotti" 
                  className="flex items-center gap-4 p-4 rounded-sm bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all duration-200"
                  onClick={() => {
                    trackButtonClick('Prodotti', 'Header Mobile');
                    setIsMenuOpen(false);
                  }}
                >
                  <SquareChartGantt className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="font-semibold">Prodotti</div>
                    <div className="text-sm text-gray-500">Esplora tutti i prodotti</div>
                  </div>
                </Link>
                
                <Link 
                  href="/how" 
                  className="flex items-center gap-4 p-4 rounded-sm bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all duration-200"
                  onClick={() => {
                    trackButtonClick('Come funziona', 'Header Mobile');
                    setIsMenuOpen(false);
                  }}
                >
                  <HelpCircle className="w-6 h-6 text-gray-600" />
                  <div>
                    <div className="font-semibold">Scopri</div>
                    <div className="text-sm text-gray-500">Scopri di più su Il Prodotto del Giorno</div>
                  </div>
                </Link>
                
                <Link 
                  href="/calendario"
                  className="w-full flex items-center gap-4 p-4 rounded-sm bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-all duration-200"
                  onClick={() => {
                    trackButtonClick('Calendario', 'Header Mobile');
                    setIsMenuOpen(false);
                  }}
                >
                  <Calendar className="w-6 h-6 text-gray-600" />
                  <div className="text-left">
                    <div className="font-semibold">Calendario</div>
                    <div className="text-sm text-gray-500">Aggiungi al tuo calendario</div>
                  </div>
                </Link>
                
                <button 
                  onClick={handleNativeShare}
                  className="w-full flex items-center gap-4 p-4 rounded-sm bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-all duration-200"
                >
                  <Share2 className="w-6 h-6 text-gray-300" />
                  <div className="text-left">
                    <div className="font-semibold">Condividi</div>
                    <div className="text-sm text-gray-300">Con chi sai che apprezza</div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-center text-sm text-gray-500">
                  Scopri ogni giorno un prodotto straordinario. Insieme a 1200+ appassionati.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Modal rimosso */}
    </>
  );
} 