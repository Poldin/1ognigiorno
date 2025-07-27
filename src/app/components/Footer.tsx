import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="relative">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-400 rounded-full"></div>
            </div>
            <h3 className="text-xl font-black tracking-tight text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text">
              OgniGiorno
            </h3>
          </Link>
          <p className="text-gray-600 mb-4">
            La piattaforma che ogni giorno scopre, valorizza e rende virali prodotti eccezionali che meritano di essere conosciuti dal mondo.
          </p>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2025 1OgniGiorno. Tutti i diritti riservati.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Termini</a>
            <a href="#" className="hover:text-gray-700">Cookie</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 