import Link from "next/link";
import { getDayNumber } from "../lib/getDayNumber";
import CtaLinks from "./CtaLinks";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center">
                <span className="text-white text-lg">{getDayNumber()}</span>
              </div>
            </div>
            <h3 className="text-lg font-medium tracking-tight text-gray-800 font-spacegrotesk">
              IL PRODOTTO DEL GIORNO
            </h3>
          </Link>
          <CtaLinks variant="light" contextLabel="Footer" />
          <p className="text-gray-600 mb-4">
          La piattaforma che ogni giorno scopre, valorizza e condivide prodotti che meritano di essere conosciuti.
          </p>
          <p className="text-gray-600">
            Vuoi segnalarci un prodotto che merita di essere incluso? Scrivici una mail a{" "}
            <a
              href="mailto:scrivici@ilprodottodelgiorno.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 underline hover:text-gray-900"
            >
              scrivici@ilprodottodelgiorno.it
            </a>
            .
          </p>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Il prodotto del giorno. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 sm:mt-0">
            <a href="https://www.iubenda.com/privacy-policy/80959713" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">Privacy</a>
            <a href="https://www.iubenda.com/termini-e-condizioni/80959713" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">Termini</a>
            <a href="https://www.iubenda.com/privacy-policy/80959713/cookie-policy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 