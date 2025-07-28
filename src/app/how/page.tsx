"use client";

import Link from "next/link";
import HeaderDark from "../components/HeaderDark";
import FooterDark from "../components/FooterDark";
import { trackButtonClick } from "../lib/gtag";
import { useScrollTracking, useSectionTracking, usePageTracking } from "../lib/useAnalytics";
import { ExternalLink, Calendar } from "lucide-react";

export default function HowItWorks() {
  // Analytics tracking
  useScrollTracking();
  usePageTracking('how-it-works');
  
  const heroRef = useSectionTracking('how-hero');
  const processRef = useSectionTracking('process');
  const approvalRef = useSectionTracking('approval');
  const developmentRef = useSectionTracking('development');
  const faqRef = useSectionTracking('faq');
  const ctaRef = useSectionTracking('how-cta');

  const handleCTAClick = (buttonName: string, location: string) => {
    trackButtonClick(buttonName, location);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderDark />

      {/* Hero Section */}
      <section ref={heroRef} className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-black mb-6">
            Prenota la tua
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"> giornata</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            La nostra piattaforma dedica 24 ore complete al tuo prodotto. 
            Dalle 00:00 alle 23:59 CET, il tuo brand sarà protagonista assoluto.
          </p>
          <div className="mt-8">
            <button 
              onClick={() => handleCTAClick('Prenota la tua giornata', 'Hero CTA')}
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all transform hover:scale-105 inline-flex items-center gap-3"
            >
              <Calendar className="w-6 h-6" />
              Prenota la tua giornata
            </button>
          </div>
        </div>
      </section>



      {/* Booking Process */}
      <section ref={processRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Processo di prenotazione
            </h2>
            <p className="text-lg text-gray-600">
              Un percorso strutturato per garantire la massima qualità
            </p>
          </div>
          
          <div className="space-y-16">
            
            {/* Step 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">1</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-semibold rounded">
                    RICHIESTA INIZIALE
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Invio della domanda
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Compila il modulo di prenotazione fornendo tutti i dettagli del tuo prodotto, 
                  codice sorgente e visualizza immediatamente le informazioni di pagamento.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Dati aziendali completi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Caricamento codice sorgente del prodotto</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Informazioni di pagamento e preventivo</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <a 
                    href="#" 
                    onClick={() => handleCTAClick('Documentazione tecnica', 'Step 1')}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Consulta la documentazione tecnica
                  </a>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-gray-600">📋</div>
                  <p className="text-gray-700 font-semibold">Modulo di prenotazione completo</p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">2</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-semibold rounded">
                    VALUTAZIONE
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Analisi e approvazione
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Il nostro team valuta la richiesta secondo criteri di qualità e coerenza 
                  con i valori della piattaforma. Il codice fornito viene testato e verificato.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Verifica conformità al regolamento</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Test del codice promozionale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Valutazione qualità del prodotto</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-gray-600">🔍</div>
                  <p className="text-gray-700 font-semibold">Processo di approvazione rigoroso</p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-700">3</span>
                  </div>
                  <div className="px-3 py-1 bg-gray-200 text-gray-800 text-sm font-semibold rounded">
                    FINALIZZAZIONE
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-black mb-4">
                  Pagamento e conferma
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Una volta approvato il prodotto, si procede con il pagamento 
                  per confermare definitivamente la prenotazione della giornata.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Preventivo dettagliato dei servizi</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Pagamento sicuro e tracciabile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center mt-0.5">
                      <span className="text-gray-600 text-xs">✓</span>
                    </div>
                    <span className="text-gray-700">Conferma data e calendario pubblicazione</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4 text-gray-600">💳</div>
                  <p className="text-gray-700 font-semibold">Transazione sicura e trasparente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approval Guidelines */}
      <section ref={approvalRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Regolamento e criteri di approvazione
            </h2>
            <p className="text-lg text-gray-600">
              Per mantenere la qualità della piattaforma, tutti i prodotti devono rispettare i nostri standard
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h3 className="text-xl font-semibold text-black mb-4">Criteri principali</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Qualità del prodotto</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Innovazione e unicità</li>
                  <li>• Qualità costruttiva verificabile</li>
                  <li>• Documentazione completa</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Etica e trasparenza</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Nessun contenuto ingannevole</li>
                  <li>• Prezzi e condizioni chiari</li>
                  <li>• Rispetto delle normative</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => handleCTAClick('Leggi regolamento completo', 'Approval Section')}
              className="bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-700 transition-all"
            >
              Leggi il regolamento completo
            </button>
          </div>
        </div>
      </section>

      {/* Technical Development */}
      <section ref={developmentRef} className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">
              Sviluppo tecnico e componenti
            </h2>
            <p className="text-lg text-gray-600">
              Scegli l&apos;approccio che preferisci per il tuo progetto
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🛠️</div>
                <h3 className="text-2xl font-semibold text-black mb-4">Sviluppo autonomo</h3>
                <p className="text-gray-600">
                  Hai già le competenze tecniche? Perfetto! Puoi gestire completamente 
                  lo sviluppo del tuo progetto in autonomia.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-2xl font-semibold text-black mb-4">Collaborazione su misura</h3>
                <p className="text-gray-600">
                  Preferisci un supporto tecnico dedicato? Siamo disponibili a mettere 
                  in campo progetti di creazione personalizzati.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Vuoi sviluppare insieme a noi?
            </h3>
            <p className="text-gray-300 mb-6">
              Fissiamo una call per discutere il tuo progetto e definire la strategia migliore
            </p>
            <button 
              onClick={() => handleCTAClick('Prenota call tecnica', 'Development Section')}
              className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Prenota una call tecnica
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Domande frequenti
            </h2>
            <p className="text-lg text-gray-600">
              Le risposte alle domande più comuni sulla prenotazione
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Quanto tempo richiede il processo di approvazione?
              </h3>
              <p className="text-gray-600">
                Il processo di valutazione richiede tipicamente 3-5 giorni lavorativi. 
                Ti contatteremo per comunicarti l&apos;esito e, in caso di approvazione, procedere con la conferma.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Posso sviluppare il progetto autonomamente?
              </h3>
              <p className="text-gray-600">
                Assolutamente sì! Se hai le competenze tecniche, puoi gestire completamente lo sviluppo in autonomia. 
                Per chi preferisce un supporto dedicato, offriamo servizi di collaborazione su misura.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Cosa succede se il mio prodotto non viene approvato?
              </h3>
              <p className="text-gray-600">
                Ti forniremo un feedback dettagliato sui motivi della non approvazione. 
                Potrai apportare le modifiche necessarie e ripresentare la richiesta.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Come funziona la visibilità di 24 ore?
              </h3>
              <p className="text-gray-600">
                Il tuo prodotto sarà protagonista assoluto dalle 00:00 alle 23:59 CET del giorno prenotato. 
                Avrai visibilità esclusiva su tutta la piattaforma per l&apos;intera giornata.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-black mb-3">
                Posso modificare la data dopo la prenotazione?
              </h3>
              <p className="text-gray-600">
                Le modifiche alla data sono possibili solo prima della conferma finale del pagamento. 
                Una volta completato il pagamento, la data risulta confermata e non modificabile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Prenota la tua giornata
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            24 ore di visibilità esclusiva per il tuo prodotto sulla nostra piattaforma. 
            Scegli l&apos;approccio di sviluppo che preferisci e inizia subito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleCTAClick('Prenota un giorno', 'How Page CTA')}
              className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
            >
              Prenota un giorno
            </button>
            <Link 
              href="/" 
              onClick={() => handleCTAClick('Torna alla home', 'How Page CTA')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-all inline-flex items-center justify-center"
            >
              Torna alla home
            </Link>
          </div>
          <p className="text-gray-400 mt-6 text-sm">
            Scegli tra sviluppo autonomo o collaborazione dedicata in base alle tue esigenze
          </p>
        </div>
      </section>

      <FooterDark />
    </div>
  );
} 