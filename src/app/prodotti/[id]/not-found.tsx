import Link from "next/link";
import HeaderDark from "../../components/HeaderDark";
import FooterDark from "../../components/FooterDark";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeaderDark />
      
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="text-8xl mb-4">🔍</div>
          
          <h1 className="text-3xl font-bold text-white">
            Prodotto non trovato
          </h1>
          
          <p className="text-gray-400 text-lg">
            Il prodotto che stai cercando non esiste o non è più disponibile.
          </p>
          
          <div className="space-y-4 pt-4">
            <Link
              href="/prodotti"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-950 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Torna ai prodotti
            </Link>
            
            <Link
              href="/"
              className="block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Vai alla home
            </Link>
          </div>
        </div>
      </div>
      
      <FooterDark />
    </div>
  );
}
