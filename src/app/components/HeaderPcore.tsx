"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { trackSocialShare } from "../lib/gtag";

interface HeaderPcoreProps {
  shareData?: {
    title: string;
    description: string;
  };
}

export default function HeaderPcore({ shareData }: HeaderPcoreProps) {
  const handleNativeShare = async () => {
    const defaultShareData = {
      title: 'PCore - Scopri prodotti straordinari',
      text: 'La piattaforma che presenta prodotti straordinari e li trasforma in fenomeni virali.',
      url: window.location.href
    };

    const currentShareData = shareData 
      ? {
          title: shareData.title,
          text: shareData.description,
          url: window.location.href
        }
      : defaultShareData;

    // Prova a usare l'API nativa di condivisione
    if (navigator.share && navigator.canShare && navigator.canShare(currentShareData)) {
      try {
        await navigator.share(currentShareData);
        trackSocialShare('Native Share');
      } catch {
        console.log('Condivisione nativa annullata dall\'utente');
      }
    } else {
      console.log('API di condivisione nativa non supportata su questo dispositivo');
    }
  };

  return (
    <header className="border-b border-gray-700 relative z-50 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo PCore */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-auto h-10 bg-white rounded-md flex items-center justify-center px-3">
              <span className="text-black text-lg font-medium tracking-tight font-spacegrotesk">PCore</span>
            </div>
          </Link>
          
          {/* Desktop Share Button */}
          <div className="hidden md:flex items-center">
            <button 
              onClick={handleNativeShare}
              className="inline-flex items-center px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Share2 className="w-4 h-4 mr-1" /> Condividi
            </button>
          </div>

          {/* Mobile Share Icon */}
          <div className="md:hidden">
            <button
              onClick={handleNativeShare}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
            >
              <span className="sr-only">Condividi</span>
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
