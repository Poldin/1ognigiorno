"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useScrollTracking, usePageTracking } from "../lib/useAnalytics";

export default function CalendarioPage() {
  useScrollTracking();
  usePageTracking("calendario");

  const calendarUrl =
    "https://calendar.google.com/calendar/u/0?cid=ZDg5MDFmZmVjYTViMzNmOWZiMTU4ZWQ3YzJlMTA4MTY4NGRjYTllNzhmZDlkZjIyMGU2ZTgzZmQwYjQ1NDk2NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t";

  const publicCalendarUrl =
    "https://calendar.google.com/calendar/embed?src=d8901ffeca5b33f9fb158ed7c2e1081684dca9e78fd9df220e6e83fd0b454964%40group.calendar.google.com&ctz=Europe%2FRome";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 mb-4">
            Calendario dei prodotti
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Associa il nostro calendario al tuo per non perderti le pubblicazioni.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Aggiungi su Google Calendar
            </a>
            <a
              href={publicCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Apri il calendario pubblico
            </a>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Suggerimento: dopo aver aperto il link, usa &quot;Aggiungi&quot; per salvare il calendario nel tuo account.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="w-full">
            <iframe
              src={publicCalendarUrl}
              className="w-full h-[600px] rounded-lg border border-gray-200"
              style={{ border: 0 }}
              frameBorder="0"
              scrolling="no"
              loading="lazy"
              title="Calendario pubblico OgniGiorno"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


