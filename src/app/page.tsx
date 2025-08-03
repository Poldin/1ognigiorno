"use client";

import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { trackButtonClick } from "./lib/gtag";
import { useScrollTracking, useSectionTracking, usePageTracking } from "./lib/useAnalytics";

export default function Home() {
  // Analytics tracking
  useScrollTracking();
  usePageTracking('homepage');
  
  const heroRef = useSectionTracking('hero');
  const featuresRef = useSectionTracking('features');
  const technologyRef = useSectionTracking('technology');
  const benefitsRef = useSectionTracking('benefits');
  const ctaRef = useSectionTracking('cta');

  const handleCTAClick = (buttonName: string, location: string) => {
    trackButtonClick(buttonName, location);
    // Redirect to X-Bio product page
    window.open('https://www.x-bio.it/memory-fresh/115-x-bio-graphene-materasso-in-memory-fresh.html?srsltid=AfmBOoq6_kibgC7RPK6DLQrqhLj4lD-tTPYskwHuGISpArdRDwuOEY7c', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-white pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
              Eletto Prodotto dell&apos;Anno 2025
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
            Il materasso<br />
            <span className="font-medium text-gray-700">del futuro</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
            X-Bio Graphene. L&apos;unico materasso che ricicla il sudore per raffreddarti mentre dormi.
            <br />Tecnologia spaziale per un recupero da campioni.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => handleCTAClick('Scopri di più', 'Hero Section')}
              className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Scopri di più
            </button>
            <div className="text-gray-500 text-sm font-medium">
              Dispositivo Medico Classe 1 • Testato scientificamente
            </div>
          </div>

          {/* Product Image */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-50 rounded-3xl overflow-hidden">
              <Image 
                src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14439_1%202.png"
                alt="Materasso X-Bio Graphene"
                width={800}
                height={600}
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section ref={technologyRef} className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              La scienza che rivoluziona il sonno
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Scopri perché 12.000 consumatori hanno scelto X-Bio Graphene
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">Grafene: Il Materiale del Futuro</h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  200 volte più resistente dell&apos;acciaio, ma ultra-leggero. Nel tuo materasso, 
                  dissipa il calore corporeo istantaneamente per un sonno sempre fresco.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">Power Channels: Brevetto Esclusivo</h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  La prima tecnologia al mondo che ricicla il sudore. Micro-canali trasportano 
                  l&apos;umidità dalle zone calde a quelle fresche, raffreddandoti naturalmente.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium text-gray-900 mb-4">Effetto Antistatico</h3>
                <p className="text-lg text-gray-600 font-light leading-relaxed">
                  Elimina l&apos;elettricità statica che causa mal di testa e stress. 
                  Ti svegli completamente rigenerato, senza tensioni.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-12 shadow-sm">
                <Image 
                  src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14439_1%202.png"
                  alt="Tecnologia X-Bio Graphene"
                  width={500}
                  height={400}
                  className="w-full object-contain"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium">
                Made in Italy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Perché 30.000+ atleti scelgono X-Bio
            </h2>
            <p className="text-xl text-gray-600 font-light">
              I benefici scientificamente provati che trasformano il tuo riposo
            </p>
          </div>
          
          {/* Product Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            <div className="relative group">
              <Image 
                src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14075_1%202.png"
                alt="Dettaglio costruzione materasso"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-3xl"
              />
            </div>
            
            <div className="relative group">
              <Image 
                src="https://www.x-bio.it/img/cms/Mask%20group_1.png"
                alt="Tecnologia grafene in dettaglio"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-3xl"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl font-light">🏃‍♂️</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Recupero Ultra-Rapido</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Il grafene accelera la microcircolazione sanguigna. Gli sportivi recuperano 
                il 40% più velocemente.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl font-light">🧊</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Temperatura Perfetta</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                La tecnologia Power Channels mantiene la temperatura ideale per 
                8 ore consecutive di sonno profondo.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl font-light">🛡️</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Antibatterico Naturale</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Il grafene elimina batteri e acari naturalmente. Perfetto per chi 
                soffre di allergie.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl font-light">🧠</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Zero Stress Elettrico</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Dissipa l&apos;elettricità statica che interferisce con il sistema nervoso. 
                Addio mal di testa.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl font-light">⚕️</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Testato Clinicamente</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Dispositivo Medico Classe 1. La struttura Memory Fresh si adatta 
                perfettamente alla colonna vertebrale.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-blue-600 text-2xl font-light">🌱</span>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">100% Sostenibile</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Materiali naturali e tecnologie eco-friendly. Il futuro del sonno 
                rispetta il pianeta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 tracking-tight">
                La rivoluzione nel tuo letto
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-lg text-gray-700 font-light">27cm di altezza - Massimo comfort</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-lg text-gray-700 font-light">Struttura Memory Fresh - Si adatta al tuo corpo</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-lg text-gray-700 font-light">Garanzia 10 anni - Investimento a lungo termine</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-lg text-gray-700 font-light">100 notti di prova - Testalo a casa tua</span>
                </div>
              </div>
              
              <div className="mt-12 p-8 bg-white rounded-3xl shadow-sm">
                <h3 className="text-xl font-medium text-gray-900 mb-4">La Differenza è Immediata</h3>
                <div className="space-y-3 text-gray-600 font-light">
                  <p><span className="font-medium">Prima notte:</span> Senti subito il fresco naturale</p>
                  <p><span className="font-medium">Prima settimana:</span> Spariscono i dolori al risveglio</p>
                  <p><span className="font-medium">Primo mese:</span> Energia da atleta professionista</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="bg-gray-900 text-white p-8 rounded-3xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <h3 className="text-xl font-medium">Prodotto dell&apos;Anno 2025</h3>
                    <p className="text-gray-300 font-light">Scelto da 12.000 consumatori</p>
                  </div>
                </div>
                <p className="text-gray-300 font-light leading-relaxed">
                  &quot;Dopo 3 anni di ricerca, abbiamo creato il materasso più avanzato al mondo. 
                  Il grafene non è solo il futuro - è il presente.&quot;
                </p>
                <p className="text-gray-400 text-sm mt-4 font-light">- Team R&D Buoninfante Group</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                  <div className="text-3xl font-light text-blue-600 mb-2">99%</div>
                  <p className="text-gray-600 font-light">Clienti soddisfatti</p>
                </div>
                <div className="bg-white p-6 rounded-2xl text-center shadow-sm">
                  <div className="text-3xl font-light text-blue-600 mb-2">48h</div>
                  <p className="text-gray-600 font-light">Consegna Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              Specifiche Tecniche
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Ogni dettaglio progettato per la perfezione del sonno
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dimensioni</h3>
                  <ul className="text-gray-600 space-y-2 font-light">
                    <li>Altezza: 27cm di puro comfort</li>
                    <li>Piazza e mezza: 120x190/200cm</li>
                    <li>Matrimoniale: 160x190/200cm</li>
                    <li>Su misura: Disponibile</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Materiali</h3>
                  <ul className="text-gray-600 space-y-2 font-light">
                    <li>Grafene puro: Conduttività termica</li>
                    <li>Memory Fresh: Adattamento corporeo</li>
                    <li>Power Channels: Brevetto esclusivo</li>
                    <li>Tessuto tecnico: Antistatico</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Certificazioni</h3>
                  <ul className="text-gray-600 space-y-2 font-light">
                    <li>Dispositivo Medico Classe 1</li>
                    <li>Made in Italy: Qualità garantita</li>
                    <li>Testato clinicamente</li>
                    <li>Ecosostenibile: Materiali naturali</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Garanzie</h3>
                  <ul className="text-gray-600 space-y-2 font-light">
                    <li>10 anni di garanzia totale</li>
                    <li>100 notti di prova gratuita</li>
                    <li>Consegna Premium inclusa</li>
                    <li>Pagamento a rate 0% interessi</li>
                 </ul>
               </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gray-50 rounded-3xl overflow-hidden">
                <Image 
                  src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14439_1%202.png"
                  alt="Materasso X-Bio Graphene - Vista completa"
                  width={400}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-6 tracking-tight">
            Il sonno del futuro<br />
            inizia stanotte
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed">
            Non aspettare. Migliaia di persone stanno già vivendo la rivoluzione del sonno. 
            Unisciti a chi ha scelto il meglio per il proprio riposo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => handleCTAClick('Ordina X-Bio Graphene', 'CTA Section')}
              className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Ordina X-Bio Graphene
            </button>
            <button 
              onClick={() => handleCTAClick('Scopri tutti i dettagli', 'CTA Section')}
              className="border border-white text-white px-10 py-4 rounded-xl text-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Scopri tutti i dettagli
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">🛡️</span>
              </div>
              <p className="font-light">100 notti di prova gratuita</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">💳</span>
              </div>
              <p className="font-light">Pagamento a rate senza interessi</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white text-lg">🚚</span>
              </div>
              <p className="font-light">Consegna Premium gratuita</p>
            </div>
          </div>
          
          <p className="text-gray-400 mt-8 font-light">
            Attenzione: Disponibilità limitata Il prezzo potrebbe aumentare domani
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
