"use client";

import Link from "next/link";
import { Share2 } from "lucide-react";
import { trackSocialShare } from "../lib/gtag";

interface FooterPcoreProps {
  shareData?: {
    title: string;
    description: string;
  };
}

export default function FooterPcore({ shareData }: FooterPcoreProps) {
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
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Link href="" className="inline-flex items-center gap-2 mb-4">
            <div className="w-auto h-10 bg-white rounded-md flex items-center justify-center px-3">
              <span className="text-black text-lg font-medium tracking-tight font-spacegrotesk">PCore</span>
            </div>
          </Link>
          
          {/* CTA Condividi */}
          <div className="mb-4 flex justify-center">
            <button 
              onClick={handleNativeShare}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Condividi con chi apprezza.
            </button>
          </div>
          

        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 PCore. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 sm:mt-0">
            <a href="https://www.iubenda.com/privacy-policy/80959713" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://www.iubenda.com/termini-e-condizioni/80959713" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Termini</a>
            <a href="https://www.iubenda.com/privacy-policy/80959713/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
