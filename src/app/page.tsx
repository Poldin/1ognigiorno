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
      <section ref={heroRef} className="relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center text-white">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                🏆 ELETTO PRODOTTO DELL&apos;ANNO 2025
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Il <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">materasso del futuro</span><br />
              è <span className="text-white">già qui</span>
            </h1>
                         <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
               <strong>X-Bio Graphene</strong> - L&apos;unico materasso al mondo che <span className="text-blue-400 font-semibold">ricicla il sudore</span> per raffreddarti mentre dormi. 
               Tecnologia spaziale che trasforma ogni notte in un recupero da campioni.
             </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
               <button 
                onClick={() => handleCTAClick('Scopri la rivoluzione', 'Hero Section')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
               >
                🚀 Scopri la rivoluzione
               </button>
              <div className="text-gray-400 text-sm">
                ⚡ Dispositivo Medico Classe 1 • 🧪 Testato scientificamente
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <span className="text-2xl">🔬</span>
                <span><strong>Grafene:</strong> Il materiale più conduttivo al mondo</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <span className="text-2xl">💧</span>
                <span><strong>Power Channels:</strong> Ricicla il sudore</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-300">
                <span className="text-2xl">⚡</span>
                <span><strong>Antistatico:</strong> Elimina stress elettrico</span>
              </div>
            </div>
          </div>
          
                    {/* Hero Product Image */}
          <div className="max-w-4xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Image 
                src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14439_1%202.png"
                alt="Materasso X-Bio Graphene - Tecnologia del futuro"
                width={800}
                height={600}
                className="w-full max-w-2xl mx-auto object-contain rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold animate-bounce">
                ⚡ NOVITÀ 2025
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* Revolutionary Technology Section */}
      <section ref={technologyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              La scienza che <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">rivoluziona il sonno</span>
             </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri perché <strong>12.000 consumatori</strong> hanno scelto X-Bio Graphene come Prodotto dell&apos;Anno 2025
             </p>
           </div>
           
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">🔬</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">Grafene: Il Materiale del Futuro</h3>
                    <p className="text-gray-600 text-lg">
                                             <strong>200 volte</strong> più resistente dell&apos;acciaio, ma ultra-leggero. Conduce calore ed elettricità meglio di qualsiasi altro materiale. 
                       Nel tuo materasso, <span className="text-blue-600 font-semibold">dissipa il calore corporeo istantaneamente</span>.
               </p>
                  </div>
             </div>
             
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">💧</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">Power Channels: Brevetto Esclusivo</h3>
                    <p className="text-gray-600 text-lg">
                                             La <span className="text-green-600 font-semibold">prima tecnologia al mondo</span> che ricicla il sudore! Micro-canali sulla superficie 
                       trasportano l&apos;umidità dalle zone calde a quelle fresche, <strong>raffreddandoti naturalmente</strong>.
               </p>
                  </div>
             </div>
             
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">Effetto Antistatico Totale</h3>
                    <p className="text-gray-600 text-lg">
                                             Elimina l&apos;elettricità statica che causa <strong>mal di testa, dolori muscolari e stress</strong>. 
                       Ti svegli <span className="text-purple-600 font-semibold">completamente rigenerato</span>, senza tensioni.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
                  <Image 
                    src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14439_1%202.png"
                    alt="Materasso X-Bio Graphene - Il materasso del futuro"
                    width={600}
                    height={400}
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
                </div>
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  MADE IN ITALY
                </div>
              </div>
             </div>
           </div>
        </div>
             </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Perché 30.000+ atleti <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">scelgono X-Bio</span>
             </h2>
             <p className="text-xl text-gray-600">
              I benefici scientificamente provati che trasformano il tuo riposo
            </p>
          </div>
          
          {/* Image Gallery Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
                         <div className="relative group">
               <Image 
                 src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14075_1%202.png"
                 alt="Dettaglio costruzione materasso X-Bio Graphene"
                 width={600}
                 height={320}
                 className="w-full h-80 object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">🔬 Struttura Scientifica</h3>
                <p className="text-sm opacity-90">Ogni strato progettato per il massimo comfort</p>
              </div>
            </div>
            
                         <div className="relative group">
               <Image 
                 src="https://www.x-bio.it/img/cms/Mask%20group_1.png"
                 alt="Tecnologia grafene X-Bio in dettaglio"
                 width={600}
                 height={320}
                 className="w-full h-80 object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300"
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl font-bold mb-2">⚡ Grafene Attivo</h3>
                <p className="text-sm opacity-90">Il materiale del futuro al lavoro</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🏃‍♂️</div>
              <h3 className="text-2xl font-bold text-black mb-4">Recupero Muscolare Ultra-Rapido</h3>
              <p className="text-gray-600 text-lg">
                Il grafene accelera la <strong>microcircolazione sanguigna</strong> e riduce l&apos;infiammazione. 
                Gli sportivi recuperano <span className="text-blue-600 font-semibold">il 40% più velocemente</span>.
             </p>
           </div>
           
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🧊</div>
              <h3 className="text-2xl font-bold text-black mb-4">Temperatura Perfetta Sempre</h3>
              <p className="text-gray-600 text-lg">
                Non sudi mai più di notte! La tecnologia Power Channels mantiene la temperatura ideale per 
                <strong>8 ore consecutive</strong> di sonno profondo.
              </p>
               </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-black mb-4">Antibatterico Naturale</h3>
              <p className="text-gray-600 text-lg">
                Il grafene <span className="text-green-600 font-semibold">elimina batteri e acari</span> naturalmente. 
                Perfetto per chi soffre di allergie e problemi respiratori.
               </p>
             </div>
             
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-2xl font-bold text-black mb-4">Zero Stress Elettrico</h3>
              <p className="text-gray-600 text-lg">
                Dissipa l&apos;elettricità statica che interferisce con il sistema nervoso. 
                <strong>Addio mal di testa</strong> e risvegli difficili.
              </p>
               </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">⚕️</div>
              <h3 className="text-2xl font-bold text-black mb-4">Testato per Mal di Schiena</h3>
              <p className="text-gray-600 text-lg">
                <span className="text-red-500 font-semibold">Dispositivo Medico Classe 1</span> testato clinicamente. 
                La struttura Memory Fresh si adatta perfettamente alla colonna vertebrale.
               </p>
             </div>
             
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold text-black mb-4">100% Sostenibile</h3>
              <p className="text-gray-600 text-lg">
                Materiali naturali e tecnologie eco-friendly. Il futuro del sonno 
                <strong>rispetta il pianeta</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
                La <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">rivoluzione</span><br />
                nel tuo letto
              </h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <span className="text-xl text-gray-700"><strong>27cm di altezza</strong> - Massimo comfort</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <span className="text-xl text-gray-700"><strong>Struttura Memory Fresh</strong> - Si adatta al tuo corpo</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <span className="text-xl text-gray-700"><strong>Garanzia 10 anni</strong> - Investimento a lungo termine</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">✓</span>
                  </div>
                  <span className="text-xl text-gray-700"><strong>100 notti di prova</strong> - Testalo a casa tua</span>
                </div>
               </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h3 className="text-2xl font-bold text-black mb-4">⚡ La Differenza è Immediata</h3>
                <p className="text-gray-700 text-lg">
                  <strong>Prima notte:</strong> Senti subito il fresco naturale<br />
                  <strong>Prima settimana:</strong> Spariscono i dolori al risveglio<br />
                  <strong>Primo mese:</strong> Energia e recupero da atleta professionista
               </p>
             </div>
           </div>
           
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">🏆</span>
                  <div>
                    <h3 className="text-2xl font-bold">PRODOTTO DELL&apos;ANNO 2025</h3>
                    <p className="text-gray-300">Scelto da 12.000 consumatori</p>
                  </div>
                </div>
                                 <p className="text-lg">
                   &quot;Dopo 3 anni di ricerca, abbiamo creato il materasso più avanzato al mondo. 
                   Il grafene non è solo il futuro - è <strong>il presente</strong>.&quot;
                 </p>
                <p className="text-sm text-gray-400 mt-4">- Team R&D Buoninfante Group</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600">99%</div>
                  <p className="text-gray-600">Clienti soddisfatti</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600">48h</div>
                  <p className="text-gray-600">Consegna Premium</p>
                </div>
              </div>
             </div>
           </div>
         </div>
       </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Specifiche <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Tecniche</span>
               </h2>
            <p className="text-xl text-gray-300">
              Ogni dettaglio progettato per la perfezione del sonno
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    📏 <span>Dimensioni</span>
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Altezza:</strong> 27cm di puro comfort</li>
                    <li>• <strong>Piazza e mezza:</strong> 120x190/200cm</li>
                    <li>• <strong>Matrimoniale:</strong> 160x190/200cm</li>
                    <li>• <strong>Su misura:</strong> Disponibile</li>
                  </ul>
                   </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    🔬 <span>Materiali</span>
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Grafene puro:</strong> Conduttività termica</li>
                    <li>• <strong>Memory Fresh:</strong> Adattamento corporeo</li>
                    <li>• <strong>Power Channels:</strong> Brevetto esclusivo</li>
                    <li>• <strong>Tessuto tecnico:</strong> Antistatico</li>
                  </ul>
                   </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    ⚕️ <span>Certificazioni</span>
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Dispositivo Medico</strong> Classe 1</li>
                    <li>• <strong>Made in Italy:</strong> Qualità garantita</li>
                    <li>• <strong>Testato clinicamente</strong> per mal di schiena</li>
                    <li>• <strong>Ecosostenibile:</strong> Materiali naturali</li>
                  </ul>
                   </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    🛡️ <span>Garanzie</span>
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>10 anni</strong> di garanzia totale</li>
                    <li>• <strong>100 notti</strong> di prova gratuita</li>
                    <li>• <strong>Consegna Premium</strong> inclusa</li>
                    <li>• <strong>Pagamento a rate</strong> 0% interessi</li>
               </ul>
             </div>
              </div>
            </div>
            
                         <div className="relative">
               <Image 
                 src="https://www.x-bio.it/img/cms/Tether%20-%20MATTIA_VALERIO14439_1%202.png"
                 alt="Materasso X-Bio Graphene - Vista completa"
                 width={600}
                 height={800}
                 className="w-full h-full object-cover rounded-2xl shadow-2xl"
               />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
                  <h3 className="text-white font-bold text-lg mb-2">💎 Eccellenza Italiana</h3>
                  <p className="text-white/90 text-sm">
                                         Prodotto negli stabilimenti Buoninfante con tecnologie all&apos;avanguardia
                  </p>
                </div>
              </div>
             </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Il sonno del futuro<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              inizia stanotte
            </span>
           </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Non aspettare. Migliaia di persone stanno già vivendo la <strong>rivoluzione del sonno</strong>. 
            Unisciti a chi ha scelto il meglio per il proprio riposo.
           </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
             <button 
              onClick={() => handleCTAClick('Ordina X-Bio Graphene', 'CTA Section')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
             >
              🚀 Ordina X-Bio Graphene
             </button>
             <button 
              onClick={() => handleCTAClick('Scopri tutti i dettagli', 'CTA Section')}
              className="border-2 border-white text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-white hover:text-gray-900 transition-all"
             >
              📋 Scopri tutti i dettagli
             </button>
           </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span><strong>100 notti</strong> di prova gratuita</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">💳</span>
              <span><strong>Pagamento</strong> a rate senza interessi</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🚚</span>
              <span><strong>Consegna Premium</strong> gratuita</span>
            </div>
          </div>
          
          <p className="text-gray-400 mt-8 text-lg">
            ⚡ <strong>Attenzione:</strong> Disponibilità limitata • Il prezzo potrebbe aumentare domani
           </p>
         </div>
       </section>

      <Footer />
    </div>
  );
}
