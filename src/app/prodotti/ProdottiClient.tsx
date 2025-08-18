"use client";

import Image from "next/image";
import Link from "next/link";
import { trackButtonClick } from "../lib/gtag";
import { useScrollTracking, useSectionTracking, usePageTracking } from "../lib/useAnalytics";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tables } from "../lib/database.types";
import { useRouter } from "next/navigation";

// Types for the data from API
type CoverItem = Tables<'products_cover_items'> & {
  associated_product?: {
    id: string;
    slug: string | null;
    name: string | null;
  } | null;
};
type Category = Tables<'products_categories'>;
type CategoryItem = Tables<'products_categories_items'>;

interface CategoryWithProducts extends Category {
  products: CategoryItem[];
  expertImageUrl?: string | null;
}

interface PageData {
  coverItems: CoverItem[];
  categories: CategoryWithProducts[];
}

interface ProdottiClientProps {
  pageData: PageData;
}

export default function ProdottiClient({ pageData }: ProdottiClientProps) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [categoryScrollPositions, setCategoryScrollPositions] = useState<Record<number, number>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const router = useRouter();
  
  // Analytics tracking
  useScrollTracking();
  usePageTracking('prodotti');
  
  const heroRef = useSectionTracking('hero-carousel');
  const categoriesRef = useSectionTracking('categories');

  // Auto-slide del carosello hero
  useEffect(() => {
    if (!pageData?.coverItems?.length) return;
    
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % pageData.coverItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [pageData?.coverItems?.length]);

  const nextHero = () => {
    if (!pageData?.coverItems?.length) return;
    setCurrentHeroIndex((prev) => (prev + 1) % pageData.coverItems.length);
  };

  const prevHero = () => {
    if (!pageData?.coverItems?.length) return;
    setCurrentHeroIndex((prev) => (prev - 1 + pageData.coverItems.length) % pageData.coverItems.length);
  };

  const handleProductClick = (product: CategoryItem | CoverItem, productName: string, location: string) => {
    trackButtonClick(productName, location);
    
    // Handle CategoryItem (regular products)
    if ('slug' in product && product.slug !== undefined) {
      const categoryProduct = product as CategoryItem;
      const urlParam = categoryProduct.slug || categoryProduct.id;
      router.push(`/prodotti/${urlParam}`);
      return;
    }
    
    // Handle CoverItem (cover images)
    const coverItem = product as CoverItem;
    if (coverItem.associated_product) {
      const urlParam = coverItem.associated_product.slug || coverItem.associated_product.id;
      router.push(`/prodotti/${urlParam}`);
    }
    // If no associated product, do nothing (image not clickable)
  };

  // Touch handlers per swipe su mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextHero();
    } else if (isRightSwipe) {
      prevHero();
    }
  };

  const scrollCategory = (categoryIndex: number, direction: 'left' | 'right') => {
    const container = document.getElementById(`category-${categoryIndex}`);
    if (container) {
      const scrollAmount = 320; // width of card + gap
      const currentScroll = categoryScrollPositions[categoryIndex] || 0;
      const newScroll = direction === 'left' 
        ? Math.max(0, currentScroll - scrollAmount)
        : currentScroll + scrollAmount;
      
      container.scrollTo({ left: newScroll, behavior: 'smooth' });
      setCategoryScrollPositions(prev => ({
        ...prev,
        [categoryIndex]: newScroll
      }));
    }
  };

  return (
    <>
      {/* Hero Carousel */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div 
          className="relative w-full h-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {pageData.coverItems.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentHeroIndex ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={item.associated_product ? () => handleProductClick(item, item.name || 'Prodotto', 'Hero Carousel') : undefined}
            >
              {/* Background Image */}
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.name || 'Prodotto'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600"></div>
              )}
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center justify-center cursor-pointer">
                <h1 className="text-5xl md:text-7xl font-light text-white text-center leading-tight tracking-tight">
                  {/* {item.name || 'Prodotto del giorno'} */}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
        <button
          onClick={prevHero}
          className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-colors z-20"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextHero}
          className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 hover:bg-black/50 rounded-full backdrop-blur-sm transition-colors z-20"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
          {pageData.coverItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`transition-all duration-300 ${
                index === currentHeroIndex 
                  ? 'w-6 h-2 bg-white rounded-full' 
                  : 'w-2 h-2 bg-white/60 rounded-full hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef} className="py-6">
        <div className="max-w-7xl mx-auto px-2">
          {pageData.categories.map((category, categoryIndex) => (
            <div key={category.id} className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <Link href={`/categorie/${category.slug || category.id}`} className="flex items-center gap-2 group">
                  {category.expertImageUrl ? (
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/10">
                      <Image
                        src={category.expertImageUrl}
                        alt={`Responsabile di ${category.name ?? 'categoria'}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <h2 className="text-2xl md:text-3xl font-medium text-white group-hover:underline">
                    {category.name}
                  </h2>
                </Link>
                
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
              
              {/* Horizontal Scroll */}
              <div className="relative">
                <div 
                  id={`category-${categoryIndex}`}
                  className="flex gap-2 overflow-x-auto scrollbar-hide md:scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {category.products.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product, product.name || 'Prodotto', `Category: ${category.name}`)}
                      className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
                    >
                      <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name || 'Prodotto'}
                            fill
                            className="object-cover"
                          />
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
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
