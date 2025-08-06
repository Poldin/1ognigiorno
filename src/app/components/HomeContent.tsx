"use client";

import Link from "next/link";
import { trackButtonClick } from "../lib/gtag";
import { HelpCircle, SquareChartGantt } from "lucide-react";

export default function HomeContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        {/* GIF */}
        <div className="mb-12">
          <img 
            src="https://oxmplkkoozzymomyspzg.supabase.co/storage/v1/object/public/images/knowledge.gif" 
            alt="Knowledge animation"
            className="mx-auto max-w-24 sm:max-w-32 md:max-w-40 w-full h-auto rounded-lg"
          />
        </div>

        {/* Main Text */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-spacegrotesk">
            Siamo costantemente alla ricerca dei migliori prodotti
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Così puoi partire dal meglio. <span className="font-semibold">Ogni giorno.</span>
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md mx-auto">
          {/* Primary CTA - Tutti i prodotti */}
          <Link 
            href="/prodotti"
            onClick={() => trackButtonClick('Tutti i prodotti', 'Homepage CTA Primary')}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 sm:px-6 sm:py-3 bg-gray-800 text-white rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <SquareChartGantt className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Tutti i prodotti
          </Link>

          {/* Secondary CTA - Scopri */}
          <Link 
            href="/how"
            onClick={() => trackButtonClick('Scopri', 'Homepage CTA Secondary')}
            className="flex-1 inline-flex items-center justify-center px-6 py-3 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-800 rounded-lg text-base sm:text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
          >
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Scopri
          </Link>
        </div>
      </div>
    </div>
  );
}
