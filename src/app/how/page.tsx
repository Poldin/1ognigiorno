import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-black mb-6">
            Come funziona
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 1OgniGiorno</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Il processo che trasforma prodotti sconosciuti in fenomeni virali globali. 
            Scopri la metodologia dietro ogni successo.
          </p>
        </div>
      </section>

      {/* Main Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    FASE 1
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Ricerca e Selezione
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Il nostro team di esperti scandaglia quotidianamente il mercato globale alla ricerca di prodotti innovativi, 
                  unici o sottovalutati che hanno il potenziale per diventare virali.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Analisi di oltre 1000+ prodotti al giorno</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Criteri rigorosi di innovazione e qualità</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Verifica del potenziale di mercato</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎯</div>
                  <p className="text-gray-700 font-semibold">Solo la metà passa la selezione</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-semibold rounded-full">
                    FASE 2
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Storytelling e Valorizzazione
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Creiamo una narrativa coinvolgente intorno al prodotto, evidenziando i suoi punti di forza unici 
                  e il problema che risolve in modo innovativo.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Video professionali e demo interattive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Analisi approfondita dei benefici</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Storytelling emotivo e autentico</span>
                  </li>
                </ul>
              </div>
              <div className="lg:order-1 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-700 font-semibold">Contenuti che emozionano</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-semibold rounded-full">
                    FASE 3
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Amplificazione e Viralità
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Utilizziamo la nostra community di early adopters e una strategia di distribuzione multi-canale 
                  per massimizzare reach ed engagement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Distribuzione su 15+ canali social</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Community di 50.000+ early adopters</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Collaborazioni con influencer del settore</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📈</div>
                  <p className="text-gray-700 font-semibold">Crescita esponenziale garantita</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Timeline tipica di un prodotto
            </h2>
            <p className="text-lg text-gray-600">
              Dal momento della selezione al successo virale
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                  Giorno 1
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-black mb-2">Selezione e Analisi</h3>
                  <p className="text-gray-600">Il prodotto viene selezionato e sottoposto ad analisi approfondita</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                  Giorno 2-3
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-black mb-2">Creazione Contenuti</h3>
                  <p className="text-gray-600">Produziamo video, recensioni e materiali di presentazione</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                  Giorno 4
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-black mb-2">Lancio e Amplificazione</h3>
                  <p className="text-gray-600">Il prodotto viene presentato alla community e distribuito sui canali</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold relative z-10">
                  Giorno 5-7
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-black mb-2">Monitoraggio e Ottimizzazione</h3>
                  <p className="text-gray-600">Tracciamo performance, engagement e ottimizziamo la strategia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              I nostri risultati
            </h2>
            <p className="text-lg text-gray-600">
              Numeri che parlano da soli
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">365</div>
              <p className="text-gray-600">Prodotti presentati all&apos;anno</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">2.5M+</div>
              <p className="text-gray-600">Reach medio per prodotto</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">78%</div>
              <p className="text-gray-600">Prodotti che diventano virali</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">300%</div>
              <p className="text-gray-600">Crescita media delle vendite</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto a scoprire il prodotto di domani?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Unisciti alla community che scopre per prima i prodotti destinati a cambiare il mondo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
              🚀 Iscriviti ora
            </button>
            <Link href="/" className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all inline-flex items-center justify-center">
              ← Torna alla home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 