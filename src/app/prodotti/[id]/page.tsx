import HeaderDark from "../../components/HeaderDark";
import FooterDark from "../../components/FooterDark";
import { Tables } from "../../lib/database.types";
import { supabase } from "../../lib/supabase";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { generateProductMetaDescription } from "../../lib/metaUtils";
// removed headers to keep ISR static

type CategoryItem = Tables<'products_categories_items'>;
type CoverItem = Tables<'products_cover_items'>;

/**
 * Server-side data fetching for individual products
 * Supports both slug and id lookup for SEO-friendly URLs
 */
interface ProductWithCategory {
  product: CategoryItem;
  categorySlug?: string | null;
}

async function getProductWithCategory(slugOrId: string): Promise<ProductWithCategory | null> {
  try {
    // First try to find in category items by slug
    const { data: categoryProductBySlug, error: categorySlugError } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('slug', slugOrId)
      .eq('is_public', true)
      .single();

    if (categoryProductBySlug && !categorySlugError) {
      // Get category slug for navigation
      const categorySlug = await getCategorySlug(categoryProductBySlug.category_id);
      return {
        product: categoryProductBySlug,
        categorySlug
      };
    }

    // If not found by slug, try by id in category items
    const { data: categoryProduct, error: categoryError } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('id', slugOrId)
      .eq('is_public', true)
      .single();

    if (categoryProduct && !categoryError) {
      // Get category slug for navigation
      const categorySlug = await getCategorySlug(categoryProduct.category_id);
      return {
        product: categoryProduct,
        categorySlug
      };
    }

    // If not found in category items, try cover items (only by id, cover items don't have slugs)
    const { data: coverProduct, error: coverError } = await supabase
      .from('products_cover_items')
      .select('*')
      .eq('id', slugOrId)
      .eq('is_public', true)
      .single();

    if (coverProduct && !coverError) {
      // Convert cover item to category item format for consistency
      const productForPage = {
        ...coverProduct,
        category_id: null,
        description: null, // Cover items don't have descriptions
        slug: null // Cover items don't have slugs
      };
      // Remove properties that don't exist in CategoryItem
      const { order, product_id, ...categoryItemFormat } = productForPage;
      return {
        product: categoryItemFormat as CategoryItem,
        categorySlug: null // Cover items don't belong to a category
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getCategorySlug(categoryId: string | null): Promise<string | null> {
  if (!categoryId) return null;
  
  try {
    const { data: category, error } = await supabase
      .from('products_categories')
      .select('slug, id')
      .eq('id', categoryId)
      .eq('is_public', true)
      .single();
    
    if (error || !category) return null;
    
    // Return slug if available, otherwise return id
    return category.slug || category.id;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

/**
 * Generate static params for all products (ISR)
 * Uses slug when available for SEO, fallback to id
 */
export async function generateStaticParams() {
  try {
    // Get all category items with slug and id
    const { data: categoryItems } = await supabase
      .from('products_categories_items')
      .select('id, slug')
      .eq('is_public', true);

    // Get all cover items (only id, no slug)
    const { data: coverItems } = await supabase
      .from('products_cover_items')
      .select('id')
      .eq('is_public', true);

    const params = [];

    // Add category items - use slug if available, otherwise id
    if (categoryItems) {
      params.push(...categoryItems.map(item => ({ 
        id: item.slug || item.id 
      })));
    }

    // Add cover items - only id available
    if (coverItems) {
      params.push(...coverItems.map(item => ({ id: item.id })));
    }

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const productData = await getProductWithCategory(id);
    
    if (!productData) {
      return {
        title: 'Prodotto non trovato',
        description: 'Il prodotto richiesto non è disponibile'
      };
    }

    const { product } = productData;

    const title = `${product.name || 'Prodotto'} - Dettagli Prodotto`;
    const productDescription = 'description' in product ? product.description : null;
    const description = generateProductMetaDescription(
      product.name || 'Prodotto',
      productDescription
    );

    return {
      title,
      description,
      keywords: `${product.name}, prodotto, dettagli`,
      openGraph: {
        title,
        description,
        type: 'website',
        images: product.image_url ? [{
          url: product.image_url,
          alt: product.name || 'Prodotto'
        }] : []
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: product.image_url ? [product.image_url] : []
      }
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Prodotto',
      description: 'Dettagli del prodotto'
    };
  }
}

/**
 * ISR Product Page Component
 */
export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  try {
    const { id } = await params;
    const productData = await getProductWithCategory(id);
    
    if (!productData) {
      notFound();
    }

    const { product, categorySlug } = productData;

    const shareData = {
      title: `${product.name || 'Prodotto'} - Il Prodotto del Giorno`,
      description: product.description 
        ? product.description.substring(0, 160) + (product.description.length > 160 ? '...' : '')
        : `Scopri ${product.name || 'questo prodotto straordinario'} su Il Prodotto del Giorno.`
    };

    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <HeaderDark shareData={shareData} />
        
        {/* Pass data to client component for interactive features */}
        <ProductClient product={product} categorySlug={categorySlug} shareData={shareData} />
        
        <FooterDark />
      </div>
    );
  } catch (error) {
    console.error('Error rendering product page:', error);
    notFound();
  }
}

/**
 * Enable ISR with revalidation every hour
 */
export const revalidate = 3600; // 1 hour
