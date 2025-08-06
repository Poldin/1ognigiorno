"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import HeaderDark from "../../components/HeaderDark";
import FooterDark from "../../components/FooterDark";
import { Tables } from "../../lib/database.types";
import { trackButtonClick } from "../../lib/gtag";
import { useScrollTracking, usePageTracking } from "../../lib/useAnalytics";

type CategoryItem = Tables<'products_categories_items'>;

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<CategoryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Analytics tracking
  useScrollTracking();
  usePageTracking(`product-${params.id}`);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Prodotto non trovato');
          }
          throw new Error('Errore nel caricamento del prodotto');
        }
        
        const data: CategoryItem = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Errore nel caricamento del prodotto');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleBackClick = () => {
    trackButtonClick('Back to Products', 'Product Page');
    router.push('/prodotti');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back button skeleton */}
          <div className="mb-8">
            <div className="w-32 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
          </div>

          {/* Mobile layout skeleton */}
          <div className="block lg:hidden space-y-6">
            <div className="w-3/4 h-8 bg-gray-800 rounded animate-pulse"></div>
            <div className="aspect-square bg-gray-800 rounded-2xl animate-pulse"></div>
            <div className="space-y-3">
              <div className="w-1/4 h-6 bg-gray-800 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-800 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-800 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Desktop layout skeleton */}
          <div className="hidden lg:flex gap-8">
            <div className="w-1/2 aspect-square bg-gray-800 rounded-2xl animate-pulse"></div>
            <div className="w-1/2 space-y-6">
              <div className="w-3/4 h-10 bg-gray-800 rounded animate-pulse"></div>
              <div className="space-y-3">
                <div className="w-1/4 h-6 bg-gray-800 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-800 rounded animate-pulse"></div>
                  <div className="w-4/5 h-4 bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterDark />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <div className="space-y-4">
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-white text-gray-950 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Riprova
              </button>
              <button 
                onClick={handleBackClick}
                className="block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                torna ai prodotti
              </button>
            </div>
          </div>
        </div>
        <FooterDark />
      </div>
    );
  }

  // Main render
  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeaderDark />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 mb-8 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>torna ai prodotti</span>
        </button>

        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-medium text-white">
            {product.name || 'Prodotto'}
          </h1>
          
          {/* Image */}
          <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name || 'Prodotto'}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <span className="text-4xl">📦</span>
                  </div>
                  <p className="text-lg">Nessuna immagine disponibile</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-4">
            {/* <h3 className="text-xl font-medium text-gray-300">Descrizione</h3> */}
            <div className="text-gray-100 leading-relaxed font-light">
              {product.description}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-8">
          {/* Image - Left 50% */}
          <div className="w-1/2">
            <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name || 'Prodotto'}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center mb-4 mx-auto">
                      <span className="text-4xl">📦</span>
                    </div>
                    <p className="text-lg">Nessuna immagine disponibile</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content - Right 50% */}
          <div className="w-1/2 space-y-8">
            {/* Title */}
            <h1 className="text-4xl font-medium text-white">
              {product.name || 'Prodotto'}
            </h1>

            {/* Description */}
            <div className="space-y-4">
              {/* <h3 className="text-xl font-medium text-gray-300">Descrizione</h3> */}
              <div className="text-gray-100 leading-relaxed text-xl font-light">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterDark />
    </div>
  );
}
