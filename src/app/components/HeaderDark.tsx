"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Loader, HelpCircle, Bell, Share2, PartyPopper, Rocket, CheckCircle } from "lucide-react";
import { trackButtonClick, trackModalOpen, trackModalClose, trackFormSubmission, trackSocialShare, trackSubscription } from "../lib/gtag";
import { getDayNumber } from "../lib/getDayNumber";

export default function HeaderDark() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [subscribeForm, setSubscribeForm] = useState({
    email: '',
    phone: '',
    firstName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscribeForm.email && !subscribeForm.phone) {
      setErrorMessage('Inserisci almeno email o numero di telefono');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/brevo/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscribeForm.email || undefined,
          phone: subscribeForm.phone || undefined,
          firstName: subscribeForm.firstName || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const subscriptionMethod = subscribeForm.email && subscribeForm.phone ? 'both' : 
                                 subscribeForm.email ? 'email' : 'phone';
        trackSubscription(subscriptionMethod);
        trackFormSubmission('subscribe', true);
        setSubmitStatus('success');
        setSubscribeForm({ email: '', phone: '', firstName: '' });
        setTimeout(() => {
          setIsSubscribeModalOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        trackFormSubmission('subscribe', false);
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Errore durante l\'iscrizione');
      }
    } catch {
      trackFormSubmission('subscribe', false);
      setSubmitStatus('error');
      setErrorMessage('Errore di connessione. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openSubscribeModal = () => {
    trackModalOpen('subscribe');
    setIsSubscribeModalOpen(true);
    setIsMenuOpen(false); // Chiudi il menu mobile se aperto
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Il prodotto del giorno - Scopri prodotti straordinari ogni giorno',
      text: 'La piattaforma che ogni giorno presenta un prodotto straordinario e lo trasforma in un fenomeno virale.',
      url: window.location.origin
    };

    // Prova a usare l'API nativa di condivisione
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        trackSocialShare('Native Share');
        setIsMenuOpen(false);
      } catch {
        console.log('Condivisione nativa annullata dall\'utente');
      }
    } else {
      console.log('API di condivisione nativa non supportata su questo dispositivo');
    }
  };

  return (
    <>
      <header className="border-b border-gray-700 relative z-50 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                    <span className="text-black text-lg">{getDayNumber()}</span>
                  </div>
                  {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div> */}
                </div>
                <h1 className="text-lg sm:text-xl font-medium tracking-tight text-white">
                  IL PRODOTTO DEL GIORNO
                </h1>
              </div>
            </Link>
            
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/how" 
                onClick={() => trackButtonClick('Come funziona', 'Header Desktop')}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <HelpCircle className="w-4 h-4 mr-1" /> Scopri
              </Link>
              <button 
                onClick={openSubscribeModal}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Bell className="w-4 h-4 mr-1" /> Aggiornati
              </button>
              <button 
                onClick={handleNativeShare}
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" /> Condividi
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Apri menu principale</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Dark Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 right-0 w-full bg-gray-900 shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-2 py-4 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                      <span className="text-black text-lg">{getDayNumber()}</span>
                    </div>
                  </div>
                  <h2 className="text-base font-medium text-white">
                    IL PRODOTTO DEL GIORNO
                  </h2>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 px-2 py-8 space-y-6">
                <Link 
                  href="/how" 
                  className="flex items-center gap-4 p-4 rounded-sm bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-all duration-200"
                  onClick={() => {
                    trackButtonClick('Come funziona', 'Header Mobile');
                    setIsMenuOpen(false);
                  }}
                >
                  <HelpCircle className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="font-semibold">Scopri</div>
                    <div className="text-sm text-gray-400">Scopri di più su OgniGiorno</div>
                  </div>
                </Link>
                
                <button 
                  onClick={openSubscribeModal}
                  className="w-full flex items-center gap-4 p-4 rounded-sm bg-gray-800 border border-gray-700 text-white hover:bg-gray-700 transition-all duration-200"
                >
                  <Bell className="w-6 h-6 text-gray-400" />
                  <div className="text-left">
                    <div className="font-semibold">Aggiornati</div>
                    <div className="text-sm text-gray-400">Non perderti prodotti straordinari</div>
                  </div>
                </button>
                
                <button 
                  onClick={handleNativeShare}
                  className="w-full flex items-center gap-4 p-4 rounded-sm bg-white border border-gray-300 text-black hover:bg-gray-200 transition-all duration-200"
                >
                  <Share2 className="w-6 h-6 text-gray-700" />
                  <div className="text-left">
                    <div className="font-semibold">Condividi</div>
                    <div className="text-sm text-gray-700">Con chi sai che apprezza</div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-700 bg-gray-800">
                <p className="text-center text-sm text-gray-400">
                  Scopri ogni giorno un prodotto straordinario. Insieme a 1200+ appassionati.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Modal */}
      {isSubscribeModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsSubscribeModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full mx-auto relative transform transition-all">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white">Iscriviti agli aggiornamenti</h3>
                  </div>
                  <button
                    onClick={() => {
                      trackModalClose('subscribe');
                      setIsSubscribeModalOpen(false);
                    }}
                    className="p-2 rounded-lg text-gray-600 hover:text-gray-400 hover:bg-gray-800 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Ricevi aggiornamenti sui prossimi prodotti.
                </p>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubscribeSubmit} className="px-6 py-6">
                <div className="space-y-4">
                  {/* Nome */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium  mb-1 text-gray-300 ">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={subscribeForm.firstName}
                      onChange={(e) => setSubscribeForm({...subscribeForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 bg-gray-800"
                      placeholder="Il tuo nome"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={subscribeForm.email}
                      onChange={(e) => setSubscribeForm({...subscribeForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 bg-gray-800"
                      placeholder="tua@email.com"
                    />
                  </div>

                  {/* Separatore OR */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-900 text-gray-500">oppure</span>
                    </div>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                      Numero di telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={subscribeForm.phone}
                      onChange={(e) => setSubscribeForm({...subscribeForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-500 bg-gray-800"
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-900 border border-red-700 rounded-lg">
                      <p className="text-sm text-red-300">{errorMessage}</p>
                    </div>
                  )}

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-green-900 border border-green-700 rounded-lg">
                      <p className="text-sm text-green-300 flex items-center gap-2">
                        <PartyPopper className="w-4 h-4" />
                        Iscrizione completata con successo!
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full bg-white text-black py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader className="animate-spin h-4 w-4" />
                        Iscrizione in corso...
                      </span>
                    ) : submitStatus === 'success' ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Iscritto!
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Rocket className="w-4 h-4" />
                        Iscriviti ora
                      </span>
                    )}
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  Cliccando su &quot;Iscriviti ora&quot; accetti di ricevere le nostre comunicazioni.
                  <br />
                  Puoi cancellarti in qualsiasi momento.
                </p>
              </form>
            </div>
                     </div>
         </div>
       )}
    </>
  );
} 