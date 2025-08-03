"use client";

import Image from "next/image";
import HeaderDark from "../components/HeaderDark";
import FooterDark from "../components/FooterDark";
import { trackButtonClick } from "../lib/gtag";
import { useScrollTracking, useSectionTracking, usePageTracking } from "../lib/useAnalytics";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Tables } from "../lib/database.types";

// Types for the data from API
type CoverItem = Tables<'products_cover_items'>;
type Category = Tables<'products_categories'>;
type CategoryItem = Tables<'products_categories_items'>;

interface CategoryWithProducts extends Category {
  products: CategoryItem[];
}

interface PageData {
  coverItems: CoverItem[];
  categories: CategoryWithProducts[];
}

export default function Prodotti() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [categoryScrollPositions, setCategoryScrollPositions] = useState<Record<number, number>>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Analytics tracking
  useScrollTracking();
  usePageTracking('prodotti');
  
  const heroRef = useSectionTracking('hero-carousel');
  const categoriesRef = useSectionTracking('categories');

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products/page-data');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products data');
        }
        
        const data: PageData = await response.json();
        setPageData(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleProductClick = (productName: string, location: string) => {
    trackButtonClick(productName, location);
    // TODO: Navigate to product detail
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

  // Early return for loading state - Skeleton Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark />
        
        {/* Hero Carousel Skeleton */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 animate-pulse">
            {/* Hero content skeleton */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-16 bg-gray-600 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Dots skeleton */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Skeleton */}
        <section className="py-6">
          <div className="max-w-7xl mx-auto px-2">
            {[...Array(4)].map((_, categoryIndex) => (
              <div key={categoryIndex} className="mb-6">
                {/* Category title skeleton */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-64 h-8 bg-gray-700 rounded animate-pulse"></div>
                  <div className="hidden md:flex gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                {/* Products skeleton */}
                <div className="flex gap-2 overflow-hidden">
                  {[...Array(5)].map((_, productIndex) => (
                    <div key={productIndex} className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden">
                      <div className="aspect-[3/4] bg-gray-700 animate-pulse"></div>
                      <div className="p-4">
                        <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <FooterDark />
      </div>
    );
  }

  // Early return for error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-red-400 mb-4">Errore nel caricamento dei prodotti</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-white text-gray-950 rounded hover:bg-gray-200 transition-colors"
            >
              Riprova
            </button>
          </div>
        </div>
        <FooterDark />
      </div>
    );
  }

  // Main render - only if data is loaded
  if (!pageData) return null;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeaderDark />

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
              onClick={() => handleProductClick(item.name || 'Prodotto', 'Hero Carousel')}
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
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
              
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {pageData.coverItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentHeroIndex ? 'bg-white' : 'bg-white/40'
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
                <h2 className="text-2xl md:text-3xl font-medium text-white">
                  {category.name}
                </h2>
                
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
                      onClick={() => handleProductClick(product.name || 'Prodotto', `Category: ${category.name}`)}
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
                        <h3 className="font-semibold text-white line-clamp-1">
                          {product.name || 'Prodotto'}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FooterDark />
    </div>
  );
}