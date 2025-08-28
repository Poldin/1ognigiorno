"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Zap, Users, TrendingUp, Star, ShoppingBag, Wallet, ChevronLeft, ChevronRight } from 'lucide-react';
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
      {/* Hero Section con animazione cards */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Testo Hero */}
            <div className="space-y-8">
              <div className="animate-fade-in-up">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight font-spacegrotesk">
                  La rivoluzione dell&apos;
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
                  <div className="relative w-96 h-[500px] mb-8">
                    <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
                      {/* Immagine a card intera */}
                      <div className="w-full h-full relative overflow-hidden bg-gray-100">
                        {products.map((product, index) => (
                          <img
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
                          />
                        ))}
                      </div>
                      
                      {/* Solo pulsante dentro la card */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <button className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 hover:scale-105 shadow-lg">
                          Acquista
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Titolo sotto la card */}
                  <div className="text-center">
                    <h3 className="font-semibold text-2xl mb-4 text-white leading-tight max-w-xs transition-all duration-300">
                      {products[currentCard]?.name || 'Prodotto senza nome'}
                    </h3>
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
                  Per Esperti, Creator o semplici Privati
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
              Come Funziona PCore
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
                  Per Brand & E-commerce
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed hover:text-gray-100 transition-colors duration-300">
                  Caricate i vostri prodotti su PCore e allineatevi tecnologicamente con una piattaforma 
                  centralizzata che garantisce visibilità e controllo totale.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start group hover:translate-x-3 transition-transform duration-300">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-yellow-300 transition-colors duration-300">Setup Immediato</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Caricate i prodotti e iniziate subito a vendere</p>
                    </div>
                  </li>
                  <li className="flex items-start group hover:translate-x-3 transition-transform duration-300">
                    <TrendingUp className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-green-300 transition-colors duration-300">Crescita Garantita</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Network di creator pronti a promuovere i vostri prodotti</p>
                    </div>
                  </li>
                  <li className="flex items-start group hover:translate-x-3 transition-transform duration-300">
                    <Star className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h3 className="font-semibold group-hover:text-blue-300 transition-colors duration-300">Design Centralizzato</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Grafiche coerenti e professionali per tutti i prodotti</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 transform">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center">
                    <ShoppingBag className="w-8 h-8 text-blue-400 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h4 className="font-semibold group-hover:text-blue-300 transition-colors duration-300">Prodotti Caricati</h4>
                      <p className="text-gray-400 text-sm">+2,547 questo mese</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">15,432</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-purple-400 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h4 className="font-semibold group-hover:text-purple-300 transition-colors duration-300">Creator Attivi</h4>
                      <p className="text-gray-400 text-sm">+134 questa settimana</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform duration-300">3,891</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-600 rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
                  <div className="flex items-center">
                    <TrendingUp className="w-8 h-8 text-green-400 mr-3 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                    <div>
                      <h4 className="font-semibold group-hover:text-green-300 transition-colors duration-300">Vendite Generate</h4>
                      <p className="text-gray-400 text-sm">+18% rispetto al mese scorso</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-green-400 group-hover:scale-110 transition-transform duration-300">€1.2M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Finale */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-spacegrotesk">
              Pronto a rivoluzionare il tuo business?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Unisciti alla piattaforma che sta cambiando le regole dell&apos;affiliate marketing. 
              Semplice, redditizio, innovativo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-white text-black rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                Inizia come Brand <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button className="px-10 py-4 border-2 border-white rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-colors">
                Diventa Creator
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
