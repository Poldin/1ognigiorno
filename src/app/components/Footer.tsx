import Link from "next/link";
import { getDayNumber } from "../lib/getDayNumber";

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
          <p className="text-gray-600 mb-4">
            La piattaforma che ogni giorno scopre, valorizza e rende virali prodotti eccezionali che meritano di essere conosciuti dal mondo.
          </p>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 Il prodotto del giorno. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Termini</a>
            <a href="#" className="hover:text-gray-800 transition-colors">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 