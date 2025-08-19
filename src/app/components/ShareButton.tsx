"use client";

import { Share2 } from "lucide-react";
import { trackSocialShare } from "../lib/gtag";

interface ShareButtonProps {
  shareData: {
    title: string;
    description: string;
  };
  className?: string;
}

export default function ShareButton({ shareData, className = "" }: ShareButtonProps) {
  const handleNativeShare = async () => {
    const currentShareData = {
      title: shareData.title,
      text: shareData.description,
      url: window.location.href
    };

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
    <button
      onClick={handleNativeShare}
      className={`md:hidden flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors ${className}`}
    >
      <Share2 className="w-4 h-4" />
      <span>condividi</span>
    </button>
  );
}
