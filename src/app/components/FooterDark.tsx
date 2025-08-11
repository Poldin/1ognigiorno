import Link from "next/link";
import { getDayNumber } from "../lib/getDayNumber";
import CtaLinks from "./CtaLinks";

export default function FooterDark() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
                <span className="text-black text-lg">{getDayNumber()}</span>
              </div>
            </div>
            <h3 className="text-lg font-medium tracking-tight text-white font-spacegrotesk">
              IL PRODOTTO DEL GIORNO
            </h3>
          </Link>
          <CtaLinks variant="dark" contextLabel="Footer Dark" />
          <p className="text-gray-400 mb-4">
            La piattaforma che ogni giorno scopre, valorizza e condivide prodotti che meritano di essere conosciuti.
          </p>
          <p className="text-gray-300">
            Vuoi segnalarci un prodotto che merita di essere incluso? Scrivici una mail a{" "}
            <a
              href="mailto:scrivici@ilprodottodelgiorno.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-gray-200"
            >
              scrivici@ilprodottodelgiorno.it
            </a>
            .
          </p>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Il prodotto del giorno. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Termini</a>
            <a href="#" className="hover:text-white transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 