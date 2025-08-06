"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Tables } from "../../lib/database.types";
import { trackButtonClick } from "../../lib/gtag";
import { useScrollTracking, usePageTracking } from "../../lib/useAnalytics";

type CategoryItem = Tables<'products_categories_items'>;

interface ProductClientProps {
  product: CategoryItem;
}

export default function ProductClient({ product }: ProductClientProps) {
  const router = useRouter();
  
  // Analytics tracking
  useScrollTracking();
  usePageTracking(`product-${product.id}`);

  const handleBackClick = () => {
    trackButtonClick('Back to Products', 'Product Page');
    router.push('/prodotti');
  };

  return (
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
        <div className="aspect-[9/16] bg-gray-800 rounded-2xl overflow-hidden">
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
            <div className="text-gray-100 leading-relaxed text-xl font-light">
              {product.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
