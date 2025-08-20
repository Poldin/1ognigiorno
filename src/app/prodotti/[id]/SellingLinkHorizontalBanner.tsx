"use client";

interface SellingLink {
  id: string;
  name: string | null;
  descrizione: string | null;
  img_url: string | null;
  link: string | null;
  calltoaction: string | null;
}

interface SellingLinkHorizontalBannerProps {
  sellingLink: SellingLink;
}

export default function SellingLinkHorizontalBanner({ sellingLink }: SellingLinkHorizontalBannerProps) {
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
  
  // Usa sempre il primo colore per evitare errori di idratazione
  const bgColor = backgroundColors[0]; // Sempre rosso per consistenza
  
  // Se non c'è un link valido, non renderizzare nulla
  if (!sellingLink.link) {
    return null;
  }

  const ctaText = sellingLink.calltoaction || sellingLink.name || 'Scopri di più';

  return (
    <div 
      onClick={() => window.open(sellingLink.link!, '_blank')}
      className={`w-full ${bgColor} rounded-lg px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity duration-200 mb-6`}
    >
      <div className="flex items-center gap-3 justify-center">
        <div className="overflow-hidden relative group flex-1">
          {ctaText.length > 40 ? (
            <div className="font-semibold text-white font-spacegrotesk whitespace-nowrap text-left">
              <div 
                className="inline-block group-hover:animate-none"
                style={{
                  animation: 'marquee-loop 15s linear infinite'
                }}
              >
                <span className="inline-block pr-8">
                  {ctaText}
                </span>
                <span className="inline-block pr-8">
                  {ctaText}
                </span>
              </div>
            </div>
          ) : (
            <div className="font-semibold text-white font-spacegrotesk text-left">
              {ctaText}
            </div>
          )}
        </div>
        
        <svg 
          className="w-5 h-5 text-white flex-shrink-0 opacity-90" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2.5} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      </div>
    </div>
  );
}
