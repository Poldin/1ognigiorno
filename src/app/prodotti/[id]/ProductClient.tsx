"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Tables } from "../../lib/database.types";
import { trackButtonClick } from "../../lib/gtag";
import { useScrollTracking, usePageTracking } from "../../lib/useAnalytics";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

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
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
              h1: (props) => (
                <h1 className="text-2xl font-semibold text-white mt-6 mb-3" {...props} />
              ),
              h2: (props) => (
                <h2 className="text-xl font-semibold text-white mt-5 mb-2" {...props} />
              ),
              h3: (props) => (
                <h3 className="text-lg font-semibold text-white mt-4 mb-2" {...props} />
              ),
              p: (props) => (
                <p className="text-gray-100 leading-relaxed font-extralight" {...props} />
              ),
              strong: (props) => (
                <strong className="font-semibold text-white" {...props} />
              ),
              ul: (props) => (
                <ul className="list-disc pl-6 space-y-1 text-gray-100" {...props} />
              ),
              ol: (props) => (
                <ol className="list-decimal pl-6 space-y-1 text-gray-100" {...props} />
              ),
              li: (props) => (
                <li className="leading-relaxed" {...props} />
              ),
              a: (props) => (
                <a className="text-blue-300 underline hover:text-blue-200" target="_blank" rel="noopener noreferrer" {...props} />
              ),
              hr: (props) => (
                <hr className="border-gray-700 my-6" {...props} />
              )
            }}
          >
            {product.description || ""}
          </ReactMarkdown>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex gap-8">
        {/* Image - Left 50% */}
        <div className="w-1/2">
          <div className="lg:sticky lg:top-7">
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
        </div>

        {/* Content - Right 50% */}
        <div className="w-1/2 space-y-8">
          {/* Title */}
          <h1 className="text-4xl font-medium text-gray-200">
            {product.name || 'Prodotto'}
          </h1>

          {/* Description */}
          <div className="space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: (props) => (
                  <h1 className="text-3xl font-semibold text-gray-200 mt-6 mb-3" {...props} />
                ),
                h2: (props) => (
                  <h2 className="text-2xl font-semibold text-gray-200 mt-5 mb-2" {...props} />
                ),
                h3: (props) => (
                  <h3 className="text-xl font-semibold text-gray-200 mt-4 mb-2" {...props} />
                ),
                p: (props) => (
                  <p className="text-gray-400 leading-relaxed text-xl font-extralight" {...props} />
                ),
                strong: (props) => (
                  <strong className="font-semibold text-white" {...props} />
                ),
                ul: (props) => (
                  <ul className="list-disc pl-6 space-y-1 text-gray-100 text-lg" {...props} />
                ),
                ol: (props) => (
                  <ol className="list-decimal pl-6 space-y-1 text-gray-100 text-lg" {...props} />
                ),
                li: (props) => (
                  <li className="leading-relaxed" {...props} />
                ),
                a: (props) => (
                  <a className="text-blue-300 underline hover:text-blue-200" target="_blank" rel="noopener noreferrer" {...props} />
                ),
                hr: (props) => (
                  <hr className="border-gray-700 my-6" {...props} />
                )
              }}
            >
              {product.description || ""}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
