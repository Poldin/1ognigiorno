"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tables } from "../../lib/database.types";

type Category = Tables<'products_categories'>;
type CategoryItem = Tables<'products_categories_items'>;

interface CategoryWithProducts extends Category {
  products: CategoryItem[];
  sellingLinks: SellingLink[];
}

type SellingLink = {
  id: string;
  name: string | null;
  descrizione: string | null;
  img_url: string | null;
  link: string | null;
  calltoaction: string | null;
};

interface ExpertCategoriesClientProps {
  categories: CategoryWithProducts[];
}

export default function ExpertCategoriesClient({ categories }: ExpertCategoriesClientProps) {
  const [categoryScrollPositions, setCategoryScrollPositions] = useState<Record<number, number>>({});

  const handleProductClick = (product: CategoryItem) => {
    window.location.href = `/prodotti/${product.slug || product.id}`;
  };

  const scrollCategory = (categoryIndex: number, direction: 'left' | 'right') => {
    const container = document.getElementById(`expert-category-${categoryIndex}`);
    if (container) {
      const scrollAmount = 280; // Larghezza card + gap
      const currentPosition = categoryScrollPositions[categoryIndex] || 0;
      
      let newPosition;
      if (direction === 'left') {
        newPosition = Math.max(0, currentPosition - scrollAmount);
      } else {
        const maxScroll = container.scrollWidth - container.clientWidth;
        newPosition = Math.min(maxScroll, currentPosition + scrollAmount);
      }
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setCategoryScrollPositions(prev => ({
        ...prev,
        [categoryIndex]: newPosition
      }));
    }
  };

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Nessuna categoria associata a questo esperto.</p>
      </div>
    );
  }

  return (
    <section className="py-6">
      <div className="max-w-7xl mx-auto px-2">
        {categories.map((category, categoryIndex) => (
          <div key={category.id} className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <Link href={`/categorie/${category.slug || category.id}`} className="flex items-center gap-2 group">
                <h2 className="text-2xl md:text-3xl font-medium text-white group-hover:underline">
                  {category.name}
                </h2>
              </Link>
              
              <div className="flex items-center gap-4">
                {/* Desktop Navigation Arrows */}
                <div className="hidden md:flex gap-2">
                  <button
                    onClick={() => scrollCategory(categoryIndex, 'left')}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => scrollCategory(categoryIndex, 'right')}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {category.category_description && (
              <p className="text-gray-400 mb-6 leading-relaxed">
                {category.category_description.length > 200 
                  ? category.category_description.substring(0, 200) + '...'
                  : category.category_description
                }
              </p>
            )}
            
            {/* Horizontal Scroll */}
            {category.products.length > 0 && (
              <div className="relative">
                <div 
                  id={`expert-category-${categoryIndex}`}
                  className="flex gap-2 overflow-x-auto scrollbar-hide md:scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                        {product.image_url ? (
                          <>
                            <Image
                              src={product.image_url}
                              alt={product.name || 'Prodotto'}
                              fill
                              className="object-cover select-none pointer-events-none"
                              draggable={false}
                              onContextMenu={(e) => e.preventDefault()}
                            />
                            {/* Watermark */}
                            <div className="absolute top-2 left-2 text-gray-400/60 text-xs font-medium z-10">
                              ilPDG
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                            {product.name || 'Prodotto'}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <div className="overflow-hidden relative group">
                          {(product.name || 'Prodotto').length > 25 ? (
                            <h3 className="font-semibold text-white whitespace-nowrap">
                              <div 
                                className="inline-block group-hover:animate-none"
                                style={{
                                  animation: 'marquee-loop 15s linear infinite'
                                }}
                              >
                                <span className="inline-block pr-8">
                                  {product.name || 'Prodotto'}
                                </span>
                                <span className="inline-block pr-8">
                                  {product.name || 'Prodotto'}
                                </span>
                              </div>
                            </h3>
                          ) : (
                            <h3 className="font-semibold text-white">
                              {product.name || 'Prodotto'}
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
