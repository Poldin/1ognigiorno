//import Image from "next/image";
import HeaderDark from "../components/HeaderDark";
import FooterDark from "../components/FooterDark";
import { Tables } from "../lib/database.types";
import ProdottiClient from "./ProdottiClient";
import { supabase } from "../lib/supabase";
import { Metadata } from "next";

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

/**
 * Server-side data fetching for ISR
 * Fetch data directly from Supabase without randomization for better SEO
 */
async function getPageData(): Promise<PageData> {
  try {
    // Fetch cover items for hero carousel
    const { data: coverItems, error: coverError } = await supabase
      .from('products_cover_items')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false }); // Order by creation date instead of random

    if (coverError) {
      console.error('Error fetching cover items:', coverError);
      throw new Error('Failed to fetch cover items');
    }

    // Fetch categories (ordered by creation date for consistency)
    const { data: categories, error: categoriesError } = await supabase
      .from('products_categories')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      throw new Error('Failed to fetch categories');
    }

    // Fetch all category items (ordered for consistency)
    const { data: categoryItems, error: itemsError } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (itemsError) {
      console.error('Error fetching category items:', itemsError);
      throw new Error('Failed to fetch category items');
    }

    // Group category items by category_id (no randomization for ISR)
    const groupedItems = (categoryItems || []).reduce((acc, item) => {
      if (!item.category_id) return acc;
      
      if (!acc[item.category_id]) {
        acc[item.category_id] = [];
      }
      acc[item.category_id].push(item);
      return acc;
    }, {} as Record<string, typeof categoryItems>);

    // Create final categories structure with their items
    const categoriesWithItems = (categories || []).map(category => ({
      ...category,
      products: groupedItems[category.id] || []
    }));

    return {
      coverItems: coverItems || [],
      categories: categoriesWithItems
    };
  } catch (error) {
    console.error('Error in getPageData:', error);
    throw error;
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getPageData();
    const totalProducts = data.categories.reduce((sum, cat) => sum + cat.products.length, 0);
    const categoryNames = data.categories.map(cat => cat.name).join(', ');
    
    return {
      title: `Prodotti - Catalogo Completo | ${totalProducts} Prodotti Disponibili`,
      description: `Scopri la nostra collezione di prodotti nelle categorie: ${categoryNames}. Catalogo completo con ${totalProducts} prodotti di qualità.`,
      keywords: `prodotti, catalogo, ${categoryNames.toLowerCase()}`,
      openGraph: {
        title: `Catalogo Prodotti - ${totalProducts} Prodotti Disponibili`,
        description: `Esplora il nostro catalogo completo con prodotti nelle categorie: ${categoryNames}`,
        type: 'website',
        images: data.coverItems
          .filter(item => item.image_url)
          .slice(0, 3)
          .map(item => ({
            url: item.image_url!,
            alt: item.name || 'Prodotto'
          }))
      },
      twitter: {
        card: 'summary_large_image',
        title: `Catalogo Prodotti - ${totalProducts} Prodotti`,
        description: `Scopri la nostra collezione completa di prodotti`
      }
    };
  } catch (error) {
    // Fallback metadata in case of error
    return {
      title: 'Prodotti - Catalogo Completo',
      description: 'Scopri la nostra collezione di prodotti di qualità'
    };
  }
}

/**
 * ISR Page Component - Server-rendered with static generation
 */
export default async function Prodotti() {
  try {
    const pageData = await getPageData();

    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark />
        
        {/* Pass data to client component for interactive features */}
        <ProdottiClient pageData={pageData} />
        
        <FooterDark />
      </div>
    );
  } catch (error) {
    console.error('Error rendering Prodotti page:', error);
    
    // Error fallback
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <p className="text-red-400 mb-4">Errore nel caricamento dei prodotti</p>
            <p className="text-gray-400 text-sm">Riprova più tardi</p>
          </div>
        </div>
        <FooterDark />
      </div>
    );
  }
}

/**
 * Enable ISR with revalidation every hour
 * This provides the perfect balance between performance and freshness
 */
export const revalidate = 3600; // 1 hour