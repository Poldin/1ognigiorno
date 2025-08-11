"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useScrollTracking, usePageTracking } from "../lib/useAnalytics";
import { trackButtonClick } from "../lib/gtag";

export default function ScopriPage() {
  useScrollTracking();
  usePageTracking("scopri");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
            Una comunità che scopre un prodotto straordinario al giorno
          </h1>
          <p className="text-lg text-gray-700">
            ogni giorno
            selezioniamo un prodotto che vale il tuo tempo, senza hype inutile.
            Niente promesse commerciali, solo cura, curiosità e criteri chiari.
          </p>
        </section>

        {/* CTA finale */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-lg border border-gray-200 p-8 text-center bg-white">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Partecipa</h2>
            <p className="text-gray-700 mb-6">
              Aggiungi il calendario per non perdere le prossime uscite.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/calendario"
                onClick={() => trackButtonClick("Calendario", "Scopri CTA")}
                className="inline-flex items-center justify-center px-5 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Aggiungi al tuo calendario
              </Link>
              <Link
                href="/prodotti"
                onClick={() => trackButtonClick("Prodotti", "Scopri CTA")}
                className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Esplora i prodotti
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Siamo una comunità di curiosi: se trovi qualcosa che merita, condividilo.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}