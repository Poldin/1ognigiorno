"use client";

import Link from "next/link";
import { useState } from "react";
import { trackButtonClick, trackModalOpen, trackModalClose, trackFormSubmission, trackSocialShare, trackSubscription } from "../lib/gtag";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
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

    // Prova a usare l'API nativa di condivisione (mobile)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        setIsShareModalOpen(false);
        return;
      } catch {
        console.log('Condivisione nativa annullata o fallita');
      }
    }

    // Fallback: apri il modal di condivisione
    trackModalOpen('share');
    setIsShareModalOpen(true);
    setIsMenuOpen(false);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: 'from-green-500 to-green-600',
      action: () => {
        trackSocialShare('WhatsApp');
        const text = encodeURIComponent('Scopri Il prodotto del giorno - prodotti straordinari ogni giorno!');
        const url = encodeURIComponent(window.location.origin);
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
        setIsShareModalOpen(false);
      }
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: 'from-blue-500 to-blue-600',
      action: () => {
        trackSocialShare('Telegram');
        const text = encodeURIComponent('Scopri Il prodotto del giorno - prodotti straordinari ogni giorno!');
        const url = encodeURIComponent(window.location.origin);
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
        setIsShareModalOpen(false);
      }
    },
    {
      name: 'Facebook',
      icon: '👥',
      color: 'from-blue-600 to-blue-700',
      action: () => {
        trackSocialShare('Facebook');
        const url = encodeURIComponent(window.location.origin);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        setIsShareModalOpen(false);
      }
    },
    {
      name: 'Twitter/X',
      icon: '🐦',
      color: 'from-gray-800 to-black',
      action: () => {
        trackSocialShare('Twitter');
        const text = encodeURIComponent('Scopri Il prodotto del giorno - prodotti straordinari ogni giorno!');
        const url = encodeURIComponent(window.location.origin);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
        setIsShareModalOpen(false);
      }
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: 'from-blue-700 to-blue-800',
      action: () => {
        trackSocialShare('LinkedIn');
        const url = encodeURIComponent(window.location.origin);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        setIsShareModalOpen(false);
      }
    },
    {
      name: 'Email',
      icon: '📧',
      color: 'from-gray-600 to-gray-700',
      action: () => {
        trackSocialShare('Email');
        const subject = encodeURIComponent('Scopri Il prodotto del giorno');
        const body = encodeURIComponent(`Ciao!\n\nVolevo condividere con te Il prodotto del giorno, una piattaforma che ogni giorno presenta un prodotto straordinario e lo trasforma in un fenomeno virale.\n\nDai un'occhiata: ${window.location.origin}`);
        window.open(`mailto:?subject=${subject}&body=${body}`);
        setIsShareModalOpen(false);
      }
    },
    {
      name: 'Copia Link',
      icon: '🔗',
      color: 'from-purple-600 to-purple-700',
      action: async () => {
        trackSocialShare('Copy Link');
        try {
          await navigator.clipboard.writeText(window.location.origin);
          // Potresti aggiungere una notifica di successo qui
          alert('Link copiato negli appunti!');
        } catch {
          // Fallback per browser più vecchi
          const textArea = document.createElement('textarea');
          textArea.value = window.location.origin;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Link copiato negli appunti!');
        }
        setIsShareModalOpen(false);
      }
    }
  ];

  return (
    <>
      <header className="border-b border-gray-200 relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{new Date().getDate()}</span>
                  </div>
                  {/* <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div> */}
                </div>
                <h1 className="text-lg sm:text-xl font-medium tracking-tight text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text">
                  IL PRODOTTO DEL GIORNO
                </h1>
              </div>
            </Link>
            
            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link 
                href="/how" 
                onClick={() => trackButtonClick('Come funziona', 'Header Desktop')}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                🤔 Scopri
              </Link>
              <button 
                onClick={openSubscribeModal}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                😊 Aggiornati
              </button>
              <button 
                onClick={handleNativeShare}
                className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                🔗 Condividi
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                aria-expanded="false"
              >
                <span className="sr-only">Apri menu principale</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
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
          <div className="fixed inset-y-0 right-0 w-full bg-white shadow-xl transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{new Date().getDate()}</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                  <h2 className="text-base font-medium text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text">
                    IL PRODOTTO DEL GIORNO
                  </h2>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Menu Content */}
              <div className="flex-1 px-6 py-8 space-y-6">
                <Link 
                  href="/how" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-gray-900 hover:from-blue-100 hover:to-purple-100 transition-all duration-200"
                  onClick={() => {
                    trackButtonClick('Come funziona', 'Header Mobile');
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="text-2xl">🤔</span>
                  <div>
                    <div className="font-semibold">Scopri</div>
                    <div className="text-sm text-gray-600">Scopri di più su OgniGiorno</div>
                  </div>
                </Link>
                
                <button 
                  onClick={openSubscribeModal}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 text-gray-900 hover:from-green-100 hover:to-emerald-100 transition-all duration-200"
                >
                  <span className="text-2xl">😊</span>
                  <div className="text-left">
                    <div className="font-semibold">Aggiornati</div>
                    <div className="text-sm text-gray-600">Non perderti prodotti straordinari</div>
                  </div>
                </button>
                
                <button 
                  onClick={handleNativeShare}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 text-gray-900 hover:from-orange-100 hover:to-red-100 transition-all duration-200"
                >
                  <span className="text-2xl">🔗</span>
                  <div className="text-left">
                    <div className="font-semibold">Condividi</div>
                    <div className="text-sm text-gray-600">Con chi sai che apprezza</div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-center text-sm text-gray-500">
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
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto relative transform transition-all">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">😊</span>
                    <h3 className="text-lg font-semibold text-gray-900">Iscriviti agli aggiornamenti</h3>
                  </div>
                  <button
                    onClick={() => {
                      trackModalClose('subscribe');
                      setIsSubscribeModalOpen(false);
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Ricevi aggiornamenti sui prossimi prodotti.
                </p>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubscribeSubmit} className="px-6 py-6">
                <div className="space-y-4">
                  {/* Nome */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium  mb-1 text-gray-700 ">
                      Nome (opzionale)
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={subscribeForm.firstName}
                      onChange={(e) => setSubscribeForm({...subscribeForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700 placeholder-gray-500"
                      placeholder="Il tuo nome"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={subscribeForm.email}
                      onChange={(e) => setSubscribeForm({...subscribeForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700 placeholder-gray-500"
                      placeholder="tua@email.com"
                    />
                  </div>

                  {/* Separatore OR */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">oppure</span>
                    </div>
                  </div>

                  {/* Telefono */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Numero di telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={subscribeForm.phone}
                      onChange={(e) => setSubscribeForm({...subscribeForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-700 placeholder-gray-500"
                      placeholder="+39 123 456 7890"
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-600">{errorMessage}</p>
                    </div>
                  )}

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-600">🎉 Iscrizione completata con successo!</p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Iscrizione in corso...
                      </span>
                    ) : submitStatus === 'success' ? (
                      '✅ Iscritto!'
                    ) : (
                      '🚀 Iscriviti ora'
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsShareModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto relative transform transition-all">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔗</span>
                    <h3 className="text-lg font-semibold text-gray-900">Condividi Il prodotto del giorno</h3>
                  </div>
                  <button
                    onClick={() => {
                      trackModalClose('share');
                      setIsShareModalOpen(false);
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Condividi con chi sai che apprezza le belle scoperte
                </p>
              </div>

              {/* Share Options */}
              <div className="px-6 py-6">
                <div className="grid grid-cols-2 gap-3">
                  {shareOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={option.action}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-r ${option.color} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-sm font-medium">{option.name}</span>
                    </button>
                  ))}
                </div>

                {/* Info aggiuntiva */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    Aiutaci a far scoprire Il prodotto del giorno a più persone possibili.
                    <br />
                    Ogni condivisione conta! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 