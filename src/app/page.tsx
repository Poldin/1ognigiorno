import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              Trasforma ogni giorno in un
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> successo</span>
            </h1>
                         <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
               1OgniGiorno è la piattaforma che ogni giorno presenta un prodotto straordinario, 
               lo racconta con passione e lo trasforma in un fenomeno virale. Un prodotto alla volta, una storia alla volta.
             </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <button className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all transform hover:scale-105">
                 🚀 Scopri il prodotto di oggi
               </button>
               <Link href="/how" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-all inline-flex items-center justify-center">
                 🤔 Come funziona
               </Link>
             </div>
          </div>
        </div>
        
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-black mb-4">
               Perché scegliere 1OgniGiorno?
             </h2>
             <p className="text-xl text-gray-600">
               La piattaforma che trasforma prodotti nascosti in fenomeni globali
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="text-4xl mb-4">🎯</div>
               <h3 className="text-xl font-semibold text-black mb-3">Selezione Curata</h3>
               <p className="text-gray-600">
                 Ogni prodotto è scelto con cura dal nostro team di esperti per garantire qualità, innovazione e potenziale virale.
               </p>
             </div>
             
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="text-4xl mb-4">📈</div>
               <h3 className="text-xl font-semibold text-black mb-3">Risultati Misurabili</h3>
               <p className="text-gray-600">
                 Tracciamo reach, engagement e conversioni per mostrare l&apos;impatto reale della nostra valorizzazione.
               </p>
             </div>
             
             <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="text-4xl mb-4">🌟</div>
               <h3 className="text-xl font-semibold text-black mb-3">Community Engaged</h3>
               <p className="text-gray-600">
                 Una community attiva di early adopters e influencer pronti a scoprire e condividere il prossimo big thing.
               </p>
             </div>
           </div>
        </div>
             </section>

       {/* Come Funziona Section */}
       <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
             <h2 className="text-4xl font-bold text-black mb-4">
               Come funziona 1OgniGiorno
             </h2>
             <p className="text-xl text-gray-600">
               Il processo che trasforma prodotti nascosti in fenomeni virali
             </p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             <div className="text-center">
               <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                 <span className="text-3xl">🔍</span>
               </div>
               <h3 className="text-xl font-semibold text-black mb-3">1. Selezioniamo</h3>
               <p className="text-gray-600">
                 Ogni giorno scegliamo accuratamente un prodotto innovativo, unico o sottovalutato 
                 che merita di essere conosciuto dal mondo.
               </p>
             </div>
             
             <div className="text-center">
               <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                 <span className="text-3xl">✨</span>
               </div>
               <h3 className="text-xl font-semibold text-black mb-3">2. Valorizziamo</h3>
               <p className="text-gray-600">
                 Creiamo contenuti coinvolgenti, storytelling autentico e presentazioni 
                 che mettono in luce il vero valore e potenziale del prodotto.
               </p>
             </div>
             
             <div className="text-center">
               <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                 <span className="text-3xl">🚀</span>
               </div>
               <h3 className="text-xl font-semibold text-black mb-3">3. Rendiamo virale</h3>
               <p className="text-gray-600">
                 Attraverso la nostra community e strategie di engagement, trasformiamo 
                 l&apos;attenzione in buzz autentico e crescita esponenziale.
               </p>
             </div>
           </div>
           
           <div className="text-center mt-12">
             <div className="inline-flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-full">
               <span className="text-2xl">⏰</span>
               <span className="font-semibold text-gray-700">Ogni giorno alle 10:00 • Un nuovo prodotto • Una nuova storia</span>
             </div>
           </div>
         </div>
       </section>

       {/* Product Showcase */}
       <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-4xl font-bold text-black mb-6">
                 Storytelling che converte
               </h2>
               <p className="text-lg text-gray-600 mb-8">
                 Ogni prodotto viene presentato attraverso contenuti coinvolgenti, video emozionali 
                 e storytelling autentico che trasforma la curiosità in desiderio d&apos;acquisto.
               </p>
               <ul className="space-y-4">
                 <li className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                     <span className="text-green-600 text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Video presentazioni professionali</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                     <span className="text-green-600 text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Recensioni autentiche della community</span>
                 </li>
                 <li className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                     <span className="text-green-600 text-sm">✓</span>
                   </div>
                   <span className="text-gray-700">Analisi approfondite dei benefici</span>
                 </li>
               </ul>
             </div>
             <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-96 flex items-center justify-center">
               <div className="text-6xl">🎬</div>
             </div>
           </div>
        </div>
      </section>

      {/* CTA Section */}
             <section className="py-20 bg-black">
         <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl font-bold text-white mb-6">
             Scopri il prodotto di domani, oggi
           </h2>
           <p className="text-xl text-gray-300 mb-10">
             Unisciti alla community che scopre per prima i prodotti destinati a diventare virali. 
             Non perdere il prossimo fenomeno globale.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
               🚀 Iscriviti gratuitamente
             </button>
             <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all">
               📧 Ricevi le notifiche via email
             </button>
           </div>
           <p className="text-gray-400 mt-6 text-sm">
             Gratuito per sempre • Una scoperta al giorno • Cancellazione in qualsiasi momento
           </p>
         </div>
       </section>

      <Footer />
    </div>
  );
}
