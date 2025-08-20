"use client";

import Image from "next/image";

interface SellingLink {
  id: string;
  name: string | null;
  descrizione: string | null;
  img_url: string | null;
  link: string | null;
  calltoaction: string | null;
}

interface SellingLinkBannerProps {
  sellingLink: SellingLink;
  colorIndex?: number;
}

export default function SellingLinkBanner({ sellingLink, colorIndex = 0 }: SellingLinkBannerProps) {
  // Array di colori primari e secondari alla tonalità 700
  const backgroundColors = [
    'bg-red-700',      // Rosso
    'bg-blue-700',     // Blu
    'bg-green-700',    // Verde
    'bg-yellow-700',   // Giallo
    'bg-purple-700',   // Viola
    'bg-orange-700',   // Arancione
    'bg-pink-700',     // Rosa
    'bg-indigo-700',   // Indaco
    'bg-teal-700',     // Teal
    'bg-cyan-700'      // Ciano
  ];
  
  const bgColor = backgroundColors[colorIndex % backgroundColors.length];
  
  // Se non c'è un link valido, non renderizzare nulla
  if (!sellingLink.link) {
    return null;
  }

  return (
    <div
      onClick={() => window.open(sellingLink.link!, '_blank')}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-600 transition-all duration-300 border border-gray-700 cursor-pointer"
    >
      {/* Area immagine - stesso aspect ratio delle card prodotto */}
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
        {sellingLink.img_url ? (
          <Image
            src={sellingLink.img_url}
            alt={sellingLink.name || 'Annuncio'}
            fill
            className="object-cover select-none pointer-events-none"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
            {sellingLink.name || 'Annuncio'}
          </div>
        )}
      </div>
      
      {/* Contenuto testuale - stesso padding delle card prodotto */}
      <div className={`p-4 ${bgColor}`}>
        <div className="flex items-center gap-2">
          
          <div className="overflow-hidden relative group">
            {((sellingLink.calltoaction || sellingLink.name || 'Scopri di più').length > 25) ? (
              <h3 className="font-semibold text-white font-spacegrotesk whitespace-nowrap">
                <div 
                  className="inline-block group-hover:animate-none"
                  style={{
                    animation: 'marquee-loop 15s linear infinite'
                  }}
                >
                  <span className="inline-block pr-8">
                    {sellingLink.calltoaction || sellingLink.name || 'Scopri di più'}
                  </span>
                  <span className="inline-block pr-8">
                    {sellingLink.calltoaction || sellingLink.name || 'Scopri di più'}
                  </span>
                </div>
              </h3>
            ) : (
              <h3 className="font-semibold text-white font-spacegrotesk">
                {sellingLink.calltoaction || sellingLink.name || 'Scopri di più'}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
