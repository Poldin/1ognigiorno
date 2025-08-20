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
import { useEffect } from "react";
import ShareButton from "../../components/ShareButton";
import SellingLinkHorizontalBanner from "./SellingLinkHorizontalBanner";
import SellingLinkBanner from "./SellingLinkBanner";

type CategoryItem = Tables<'products_categories_items'>;

type SellingLink = {
  id: string;
  name: string | null;
  descrizione: string | null;
  img_url: string | null;
  link: string | null;
  calltoaction: string | null;
};

interface ProductClientProps {
  product: CategoryItem;
  categorySlug?: string | null;
  shareData: {
    title: string;
    description: string;
  };
  sellingLinks: SellingLink[];
}

export default function ProductClient({ product, categorySlug, shareData, sellingLinks }: ProductClientProps) {
  const router = useRouter();
  
  // Analytics tracking
  useScrollTracking();
  usePageTracking(`product-${product.id}`);

  // Protezione contro download immagini
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Blocca Ctrl+S, Ctrl+Shift+S, F12 (dev tools)
      if ((e.ctrlKey && e.key === 's') || 
          (e.ctrlKey && e.shiftKey && e.key === 'S') ||
          e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Blocca click destro su immagini
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleBackClick = () => {
    trackButtonClick('Back', 'Product Page');
    
    // If product has a category, navigate to that category
    if (categorySlug) {
      router.push(`/categorie/${categorySlug}`);
    } else {
      // Fallback to main products page (for cover items or products without category)
      router.push('/prodotti');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back and Share Buttons */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={handleBackClick}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>indietro</span>
        </button>
        <ShareButton shareData={shareData} />
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-6">
        {/* Title */}
        <h1 className="text-3xl font-medium text-white">
          {product.name || 'Prodotto'}
        </h1>
        
        {/* Horizontal Selling Link Banner - Mobile */}
        {sellingLinks.length > 0 && (
          <SellingLinkHorizontalBanner sellingLink={sellingLinks[0]} />
        )}
        
        {/* Image */}
        <div className="aspect-[9/16] bg-gray-800 rounded-2xl overflow-hidden relative">
          {product.image_url ? (
            <>
              <Image
                src={product.image_url}
                alt={product.name || 'Prodotto'}
                width={800}
                height={800}
                className="w-full h-full object-cover select-none pointer-events-none"
                priority
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              {/* Watermark */}
              <div className="absolute top-4 left-4 text-gray-400/60 text-sm font-medium z-10">
                ilPDG
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <h2 className="text-2xl md:text-3xl font-medium text-center px-4">
                {product.name || 'Prodotto'}
              </h2>
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
            <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden relative">
            {product.image_url ? (
              <>
                <Image
                  src={product.image_url}
                  alt={product.name || 'Prodotto'}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  priority
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {/* Watermark */}
                <div className="absolute top-4 left-4 text-gray-400/60 text-sm font-medium z-10">
                  ilPDG
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <h2 className="text-3xl md:text-4xl font-medium text-center px-4">
                  {product.name || 'Prodotto'}
                </h2>
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
          
          {/* Horizontal Selling Link Banner - Desktop */}
          {sellingLinks.length > 0 && (
            <SellingLinkHorizontalBanner sellingLink={sellingLinks[0]} />
          )}

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
      
      {/* Selling Links Cards Section - Bottom of Page */}
      {sellingLinks.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellingLinks.map((sellingLink, index) => (
              <SellingLinkBanner
                key={sellingLink.id}
                sellingLink={sellingLink}
                colorIndex={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
