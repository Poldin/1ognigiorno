"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Users, TrendingUp, Star, ShoppingBag, Wallet } from 'lucide-react';
import { getProductImageUrl } from '../lib/categoryUtils';
import { Tables } from '../lib/database.types';
import { useScrollTracking, usePageTracking } from '../lib/useAnalytics';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type CategoryItem = Tables<'products_categories_items'>;

interface PcoreHomeContentProps {
  products: CategoryItem[];
}

export default function PcoreHomeContent({ products }: PcoreHomeContentProps) {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const router = useRouter();

  // CSS per le animazioni personalizzate
  const animationStyles = `
    @keyframes fade-in-up {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slide-in-left {
      0% {
        opacity: 0;
        transform: translateX(-50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slide-in-right {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes scale-in {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @keyframes glow-pulse {
      0%, 100% {
        text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
      }
      50% {
        text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5);
      }
    }
    
    @keyframes rainbow-text {
      0% { color: #3b82f6; }
      16% { color: #8b5cf6; }
      32% { color: #ec4899; }
      48% { color: #f59e0b; }
      64% { color: #10b981; }
      80% { color: #06b6d4; }
      100% { color: #3b82f6; }
    }
    
    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }
    
    @keyframes blink {
      0%, 50% { border-color: transparent; }
      51%, 100% { border-color: #3b82f6; }
    }
    
    .animate-fade-in-up {
      animation: fade-in-up 0.8s ease-out forwards;
    }
    
    .animate-fade-in-up-delay-1 {
      opacity: 0;
      animation: fade-in-up 0.8s ease-out 1.5s forwards;
    }
    
    .animate-fade-in-up-delay-2 {
      opacity: 0;
      animation: fade-in-up 0.8s ease-out 3s forwards;
    }
    
    .animate-slide-in-left {
      animation: slide-in-left 1s ease-out forwards;
    }
    
    .animate-slide-in-right {
      animation: slide-in-right 1s ease-out forwards;
    }
    
    .animate-scale-in {
      animation: scale-in 0.8s ease-out forwards;
    }
    
    .animate-glow-pulse {
      animation: glow-pulse 2s ease-in-out infinite;
    }
    
    .animate-rainbow-text {
      animation: rainbow-text 3s linear infinite;
    }
    
    .animate-typing {
      overflow: hidden;
      border-right: 2px solid #3b82f6;
      white-space: nowrap;
      animation: typing 3s steps(40, end), blink 0.75s step-end infinite;
    }
    
    .hover-glow:hover {
      animation: glow-pulse 1s ease-in-out infinite;
    }
    
    .keyword-highlight {
      background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: rainbow-text 4s linear infinite;
    }
  `;

  // Analytics tracking
  useScrollTracking();
  usePageTracking('pcore-homepage');

  const handleProductClick = (product: CategoryItem, e: React.MouseEvent) => {
    // Previeni il click se l'utente sta trascinando
    if (isDragging) {
      e.preventDefault();
      return;
    }
    const urlParam = product.slug || product.id;
    router.push(`/prodotti/${urlParam}`);
  };

  // Drag to scroll functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const container = e.currentTarget;
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.cursor = 'grabbing';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = 'grab';
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = e.currentTarget;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Moltiplicatore per velocità
    container.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    if (!isAnimating || products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentCard((prev) => (prev + 1) % products.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating, products.length]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <style jsx>{animationStyles}</style>
      {/* Hero Section con animazione cards */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Testo Hero */}
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight font-spacegrotesk">
                  La <span className="keyword-highlight">rivoluzione</span> dell&apos;
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    affiliate marketing
                  </span>
                </h1>
              </div>
              
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed animate-fade-in-up-delay-1">
                Una piattaforma che connette brand, e-commerce e creator in un ecosistema centralizzato. 
                Facile per i brand, redditizio per i creator.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delay-2">
                <button className="px-8 py-4 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center">
                  Inizia ora <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsAnimating(!isAnimating)}
                  className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  {isAnimating ? 'Pausa animazione' : 'Riprendi animazione'}
                </button>
              </div>
            </div>

            {/* Animazione Cards Stack */}
            <div className="relative h-[700px] flex flex-col items-center justify-center">
              {products.length > 0 ? (
                <>
                  {/* Singola Card */}
                  <div className="relative w-96 h-[500px] mb-2">
                    <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
                      {/* Immagine a card intera */}
                      <div className="w-full h-full relative overflow-hidden bg-gray-100">
                        {products.map((product, index) => (
                          <Image
                            key={product.id}
                            src={getProductImageUrl(product.image_url)}
                            alt={product.name || 'Product'}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                              index === currentCard 
                                ? 'opacity-100 scale-100' 
                                : 'opacity-0 scale-105'
                            }`}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/api/placeholder/300/400';
                            }}
                            width={300}
                            height={400}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Pulsante fuori dalla card */}
                  <div className="w-96">
                    <button className="w-full py-3 bg-white text-black rounded-lg font-spacegrotesk font-semibold hover:bg-gray-200 transition-all duration-200 hover:scale-105 shadow-lg">
                      Acquista
                    </button>
                  </div>
                </>
              ) : (
                <div className="w-96 h-[500px] bg-gray-800 rounded-2xl flex items-center justify-center">
                  <div className="text-gray-400">Nessun prodotto trovato</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Per i Creator */}
      <section className="py-20 bg-gray-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 transform">
                <h4 className="text-xl font-semibold mb-6 animate-pulse">Esempi di collezioni create</h4>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg mr-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <div className="flex-1">
                      <h5 className="font-medium group-hover:text-blue-300 transition-colors">Profumi di Nicchia</h5>
                      <p className="text-gray-400 text-sm">12 prodotti • €2,340 guadagnato</p>
                    </div>
                    <Wallet className="w-5 h-5 text-green-400 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="flex items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg mr-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <div className="flex-1">
                      <h5 className="font-medium group-hover:text-green-300 transition-colors">Tech Essentials</h5>
                      <p className="text-gray-400 text-sm">8 prodotti • €1,890 guadagnato</p>
                    </div>
                    <Wallet className="w-5 h-5 text-green-400 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <div className="flex items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-red-400 rounded-lg mr-3 group-hover:rotate-6 transition-transform duration-300"></div>
                    <div className="flex-1">
                      <h5 className="font-medium group-hover:text-yellow-300 transition-colors">Cucina Gourmet</h5>
                      <p className="text-gray-400 text-sm">15 prodotti • €3,120 guadagnato</p>
                    </div>
                    <Wallet className="w-5 h-5 text-green-400 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg hover:bg-green-800/40 hover:border-green-500 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-semibold">Totale guadagnato</span>
                    <span className="text-2xl font-bold text-green-400 hover:scale-110 transition-transform duration-300">€7,350</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="hover:translate-x-2 transition-transform duration-500">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-500">
                  Per <span className="keyword-highlight">Esperti</span>, <span className="keyword-highlight">Creator</span> o semplici <span className="keyword-highlight">Privati</span>
                </h2>
                                  <p className="text-xl text-gray-300 mb-8 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                  Unisciti a PCore e crea la tua collezione personalizzata! Seleziona i prodotti che ami 
                  dal nostro catalogo, aggiungi le tue descrizioni uniche e inizia a guadagnare commissioni.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <Users className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-300 transition-colors duration-300">Selezioni Prodotti</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Scegli dal nostro catalogo i prodotti che conosci e che ami</p>
                    </div>
                  </li>
                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <Star className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-yellow-300 transition-colors duration-300">Aggiungi la Tua Voce</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Scrivi le tue descrizioni personali per ogni prodotto selezionato</p>
                    </div>
                  </li>
                  <li className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                    <Wallet className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-green-300 transition-colors duration-300">Guadagni Commissioni</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Ricevi una percentuale su ogni vendita generata dalla tua collezione</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <a 
                    href="/expert/dc6a24eb-ac50-43dd-a2eb-e48148d2f0e6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105"
                  >
                    Guarda un esempio di collezione <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Striscia di prodotti esempi */}
        {products.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Prodotti in evidenza</h3>
              <p className="text-gray-400">Alcuni esempi di prodotti che potresti includere nella tua collezione</p>
            </div>
            
            <div className="relative">
              <div 
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 cursor-grab select-none" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {products.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    onClick={(e) => handleProductClick(product, e)}
                    className="flex-shrink-0 w-64 bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-600 to-gray-700 relative overflow-hidden">
                      {product.image_url ? (
                        <>
                          <Image
                            src={product.image_url}
                            alt={product.name || 'Prodotto'}
                            fill
                            className="object-cover select-none pointer-events-none"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                          />
                          {/* Watermark */}
                          <div className="absolute top-2 left-2 text-gray-400/60 text-xs font-medium z-10">
                            PCore
                          </div>
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                          {product.name || 'Prodotto'}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="overflow-hidden relative group">
                        {(product.name || 'Prodotto').length > 25 ? (
                          <h3 className="font-semibold text-white whitespace-nowrap">
                            <div 
                              className="inline-block group-hover:animate-none"
                              style={{
                                animation: 'marquee-loop 15s linear infinite'
                              }}
                            >
                              <span className="inline-block pr-8">
                                {product.name || 'Prodotto'}
                              </span>
                              <span className="inline-block pr-8">
                                {product.name || 'Prodotto'}
                              </span>
                            </div>
                          </h3>
                        ) : (
                          <h3 className="font-semibold text-white">
                            {product.name || 'Prodotto'}
                          </h3>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sezione Come Funziona */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 hover:scale-105 transition-transform duration-500">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-400 transition-all duration-500">
              Come Funziona <span className="keyword-highlight">PCore</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto hover:text-gray-100 transition-colors duration-300">
              Il processo è semplice e trasparente. Tre passi per rivoluzionare il tuo approccio all&apos;affiliate marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Brand Caricano",
                description: "I brand e gli e-commerce caricano i loro prodotti sulla piattaforma PCore con schede dettagliate",
                icon: <ShoppingBag className="w-8 h-8" />,
                color: "from-blue-500 to-cyan-500",
                hoverColor: "group-hover:from-blue-400 group-hover:to-cyan-400"
              },
              {
                step: "02", 
                title: "Esperti Selezionano",
                description: "Gli esperti scelgono i prodotti che amano e creano collezioni personalizzate per il loro pubblico",
                icon: <Users className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500",
                hoverColor: "group-hover:from-purple-400 group-hover:to-pink-400"
              },
              {
                step: "03",
                title: "Tutti Guadagnano", 
                description: "Ogni vendita generata attraverso le collezioni porta commissioni ai creator e visibilità ai brand",
                icon: <Wallet className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500",
                hoverColor: "group-hover:from-green-400 group-hover:to-emerald-400"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-all duration-500 cursor-pointer"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} ${item.hoverColor} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:rotate-12 group-hover:shadow-2xl transition-all duration-500 transform`}>
                  <div className="group-hover:scale-125 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-500 font-spacegrotesk group-hover:text-white group-hover:scale-110 transition-all duration-300 inline-block">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sezione Per i Brand */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="hover:translate-x-2 transition-transform duration-500">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-400 transition-all duration-500">
                  Per <span className="keyword-highlight">Brand</span> & <span className="keyword-highlight">E-commerce</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                  PCore permette a chi conosce il proprio pubblico, anche molto piccolo, di arrivare a consigliarlo efficacemente. 
                  Abbiamo già stretto partnership operative con migliaia di realtà che sono le vere autorità per i loro clienti.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start group hover:translate-x-3 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-yellow-300 transition-colors duration-300">Setup Immediato</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Inserite uno script nel vostro e-commerce e caricate i prodotti tramite API o CSV</p>
                    </div>
                  </li>
                  <li className="flex items-start group hover:translate-x-3 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-green-300 transition-colors duration-300">Dashboard & Insights</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Dashboard completa per monitorare vendite e ricavare insights utili sui vostri clienti</p>
                    </div>
                  </li>
                  <li className="flex items-start group hover:translate-x-3 transition-transform duration-300">
                    <Star className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-300 transition-colors duration-300">Controllo Provvigioni</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Modificate le commissioni quando volete per ottimizzare le vostre strategie</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <a 
                    href="/docs/brand-ecommerce-guide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-all duration-300 hover:scale-105"
                  >
                    Segui la guida per partire <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 transform">
              <h4 className="text-xl font-semibold mb-6 text-center">Partnership Operative Attive</h4>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center">
                    <ShoppingBag className="w-8 h-8 text-blue-400 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h4 className="font-semibold group-hover:text-blue-300 transition-colors duration-300">Ristoranti</h4>
                      <p className="text-gray-400 text-sm">Autorità gastronomiche</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform duration-300">1,000</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-purple-400 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h4 className="font-semibold group-hover:text-purple-300 transition-colors duration-300">B&B e Albergatori</h4>
                      <p className="text-gray-400 text-sm">Esperti di ospitalità</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform duration-300">600</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-yellow-400 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h4 className="font-semibold group-hover:text-yellow-300 transition-colors duration-300">Artigiani</h4>
                      <p className="text-gray-400 text-sm">Maestri della qualità</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">350</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-900/30 border border-green-700 rounded-lg hover:bg-green-800/40 hover:border-green-500 transition-all duration-300">
                <div className="text-center">
                  <p className="text-green-400 font-semibold mb-2">Obiettivo: Vendere di più e vendere meglio</p>
                  <p className="text-sm text-gray-300">Aumentare quantità e qualità delle vendite con dati e insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Emotiva - Il Potere della Raccomandazione */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-green-500 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-500 rounded-full animate-ping"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
              Immagina il <span className="keyword-highlight">Potere</span> di una <span className="keyword-highlight">Raccomandazione Autentica. Scalata a milioni di utenti.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Non è solo una vendita. È la fiducia che si trasforma in successo, 
              la passione che diventa profitto, l&apos;autenticità che crea connessioni durature.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lato Emotivo */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="group hover:translate-x-2 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors">
                    🎯 Il <span className="keyword-highlight">Cliente</span> che Ti <span className="keyword-highlight">Cerca</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    Quando un ristoratore consiglia il tuo olio d&apos;oliva, non sta solo vendendo un prodotto. 
                    Sta condividendo una parte della sua passione culinaria. Quel cliente non compra solo olio, 
                    compra l&apos;esperienza e la fiducia di chi conosce davvero la qualità.
                  </p>
                </div>
                
                <div className="group hover:translate-x-2 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">
                    💝 La <span className="keyword-highlight">Vendita</span> che <span className="keyword-highlight">Conta</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    Ogni vendita attraverso PCore non è un numero, è una storia. È il B&B che consiglia 
                    i tuoi prodotti locali agli ospiti, creando ricordi indimenticabili. È l&apos;artigiano 
                    che apprezza la qualità e la trasmette ai suoi clienti più fedeli.
                  </p>
                </div>
                
                <div className="group hover:translate-x-2 transition-all duration-500">
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">
                    🚀 Il <span className="keyword-highlight">Futuro</span> delle Tue <span className="keyword-highlight">Vendite</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                    Con PCore, ogni partner diventa un ambasciatore autentico del tuo brand. 
                    Non più vendite fredde, ma raccomandazioni calde che nascono dalla conoscenza 
                    diretta e dall&apos;esperienza personale.
                  </p>
                </div>
              </div>
            </div>

            {/* Animazione Vendita */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 relative overflow-hidden">
                {/* Simulazione Dashboard in Tempo Reale */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-white">Dashboard Live</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-sm font-medium">In tempo reale</span>
                    </div>
                  </div>
                  
                  {/* Vendita che Appare */}
                  <div className="space-y-4">
                    <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 animate-fade-in-up transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">€</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">Nuova Vendita!</p>
                            <p className="text-green-300 text-sm">Ristorante &quot;Da Mario&quot; - Milano</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-400">€127</p>
                          <p className="text-green-300 text-sm">+€19 commissione</p>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-300">
                        &quot;Il mio chef ha consigliato questo olio ai nostri ospiti dopo averlo provato&quot;
                      </div>
                    </div>
                    
                    <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 animate-fade-in-up-delay-1 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">€</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">Altra Vendita!</p>
                            <p className="text-blue-300 text-sm">B&B &quot;Vista Mare&quot; - Cinque Terre</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-400">€89</p>
                          <p className="text-blue-300 text-sm">+€13 commissione</p>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-300">
                        &quot;I nostri ospiti volevano portarsi a casa i sapori della Liguria&quot;
                      </div>
                    </div>
                    
                    <div className="bg-purple-900/30 border border-purple-500 rounded-lg p-4 animate-fade-in-up-delay-2 transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">€</span>
                          </div>
                          <div>
                            <p className="text-white font-semibold">Ancora una!</p>
                            <p className="text-purple-300 text-sm">Artigiano &quot;Bottega del Gusto&quot;</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-400">€156</p>
                          <p className="text-purple-300 text-sm">+€23 commissione</p>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-300">
                        &quot;Un cliente abituale che si fida sempre dei miei consigli&quot;
                      </div>
                    </div>
                  </div>
                  
                  {/* Totale Animato */}
                  <div className="border-t border-gray-600 pt-4 mt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium">Vendite di oggi</span>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-white">€372</p>
                        <p className="text-green-400 font-medium">+€55 le tue commissioni</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Effetti Luminosi */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Messaggio Finale Emotivo */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-600 hover:border-gray-500 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Questa è la <span className="keyword-highlight">Differenza</span> di <span className="keyword-highlight">PCore</span>
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto animate-fade-in-up">
                Non vendiamo solo prodotti. Creiamo <span className="keyword-highlight">connessioni autentiche</span> tra chi sa consigliare bene 
                e chi cerca <span className="keyword-highlight">qualità vera</span>. Ogni vendita è una <span className="keyword-highlight">testimonianza di fiducia</span>, 
                ogni commissione è il riconoscimento del <span className="keyword-highlight">valore</span> che porti ai tuoi clienti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sezione Prezzi */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-16 left-16 w-28 h-28 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-24 w-20 h-20 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="absolute top-2/3 left-1/4 w-14 h-14 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-400 transition-all duration-500">
              Ok, ma quanto costa <span className="keyword-highlight">PCore</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed hover:text-gray-100 transition-colors duration-300">
              La risposta ti sorprenderà. Il nostro modello è pensato per crescere insieme a te.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Lato Sinistro - Messaggio Principale */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-2xl p-8 border border-green-600/30 hover:border-green-500/50 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <div className="mb-6">
                    <span className="text-6xl lg:text-7xl font-bold text-green-400 font-spacegrotesk">€0</span>
                    <div className="text-lg text-green-300 mt-2">Costo iniziale</div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    <span className="keyword-highlight">Zero costi</span> finché non <span className="keyword-highlight">guadagni</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Nessun abbonamento, nessun setup fee, nessun costo nascosto. 
                    Guadagniamo solo se Brand e Creator guadagnano.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-125 transition-transform duration-300">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors">E-commerce & Brand</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Caricamento prodotti gratuito, dashboard completa, nessun limite</p>
                  </div>
                </div>
                
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-125 transition-transform duration-300">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors">Creator & Esperti</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Creazione collezioni illimitata, strumenti di promozione inclusi</p>
                  </div>
                </div>
                
                <div className="flex items-start group hover:translate-x-2 transition-transform duration-300">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:scale-125 transition-transform duration-300">
                    <span className="text-black font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-green-300 transition-colors">Gestione Pagamenti</h4>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Ci occupiamo noi di tutti i flussi di denaro, tutto a regola d'arte</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lato Destro - Come Funziona */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Come Funziona il Nostro Modello</h3>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-6 hover:bg-blue-800/40 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-blue-300 font-semibold">Creator guadagna</span>
                        <span className="text-2xl font-bold text-blue-400">€100</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                        <div className="bg-blue-400 h-2 rounded-full" style={{width: '91%'}}></div>
                      </div>
                      <div className="text-sm text-gray-300">Il creator riceve il 91% delle commissioni</div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1">
                        <span className="text-green-400 font-semibold text-sm">€91 al creator</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative mt-8">
                    <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-6 hover:bg-green-800/40 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-green-300 font-semibold">PCore trattiene</span>
                        <span className="text-2xl font-bold text-green-400">9%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-4">
                        <div className="bg-green-400 h-2 rounded-full" style={{width: '9%'}}></div>
                      </div>
                      <div className="text-sm text-gray-300">Solo quando c'è una commissione da distribuire</div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-900 border border-gray-600 rounded-lg px-3 py-1">
                        <span className="text-green-400 font-semibold text-sm">€9 a PCore</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-yellow-300 font-semibold mb-2">💡 Nessuna vendita = Nessun costo</p>
                    <p className="text-sm text-gray-300">Guadagniamo solo se Brand e Creator hanno successo insieme</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Messaggio di Garanzia */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-8 backdrop-blur-sm border border-gray-600 hover:border-gray-500 transition-all duration-500 hover:scale-105">
              <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                <span className="keyword-highlight">Garanzia</span> di <span className="keyword-highlight">Trasparenza</span> Totale
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                Gestiamo tutti i <span className="keyword-highlight">flussi di denaro</span> con la massima trasparenza. 
                Dashboard in tempo reale, report dettagliati e <span className="keyword-highlight">pagamenti puntuali</span>. 
                Se ci riusciamo, ci riusciamo insieme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-20 h-20 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 bg-green-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-yellow-400 rounded-full animate-ping"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="hover:scale-105 transition-transform duration-500">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-500">
              Pronto a <span className="keyword-highlight">rivoluzionare</span> il tuo <span className="keyword-highlight">business</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed hover:text-gray-100 transition-colors duration-300">
              Unisciti alla piattaforma che sta cambiando le regole dell&apos;affiliate marketing. 
              <span className="keyword-highlight">Semplice</span>, <span className="keyword-highlight">redditizio</span>, <span className="keyword-highlight">innovativo</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-200 hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                Inizia come Brand <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="px-10 py-4 border-2 border-white rounded-lg font-semibold text-lg hover:bg-white hover:text-black hover:scale-105 transition-all duration-300">
                Diventa Creator
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
