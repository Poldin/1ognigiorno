import HeaderDark from "../../components/HeaderDark";
import FooterDark from "../../components/FooterDark";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import { Tables } from "../../lib/database.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import DescriptionToggle from "./DescriptionToggle";
import ImageProtection from "./ImageProtection";
import ProtectedImage from "./ProtectedImage";
import CategoryActions from "./CategoryActions";
import CategoryClient from "./CategoryClient";
import { generateCategoryMetaDescription } from "../../lib/metaUtils";

type Category = Tables<'products_categories'>;
type CategoryItem = Tables<'products_categories_items'>;

interface CategoryPageData {
  category: Category & { expertImageUrl?: string | null };
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

async function getCategoryData(slugOrId: string): Promise<CategoryPageData | null> {
  // First try to find category by slug
  const { data: categoryBySlug, error: categorySlugError } = await supabase
    .from('products_categories')
    .select('*')
    .eq('slug', slugOrId)
    .eq('is_public', true)
    .single();

  let category = categoryBySlug;
  
  // If not found by slug, try by id
  if (categorySlugError || !categoryBySlug) {
    const { data: categoryById, error: categoryIdError } = await supabase
      .from('products_categories')
      .select('*')
      .eq('id', slugOrId)
      .eq('is_public', true)
      .single();
    
    if (categoryIdError || !categoryById) {
      return null;
    }
    category = categoryById;
  }

  // Fetch products for this category
  if (!category) {
    return null;
  }
  
  const { data: products, error: productsError } = await supabase
    .from('products_categories_items')
    .select('*')
    .eq('category_id', category.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (productsError) {
    return null;
  }

  // Fetch expert image if present
  let expertImageUrl: string | null = null;
  if (category.expert_id) {
    const { data: profile, error: profileError } = await supabase
      .from('profile')
      .select('img_url')
      .eq('id', category.expert_id)
      .single();
    if (!profileError) {
      expertImageUrl = profile?.img_url ?? null;
    }
  }

  // Fetch selling links for this category
  const { data: sellingLinks, error: sellingLinksError } = await supabase
    .from('link_category_sellinglink')
    .select(`
      selling_links (
        id,
        name,
        descrizione,
        img_url,
        link,
        calltoaction
      )
    `)
    .eq('category_id', category.id);

  if (sellingLinksError) {
    console.error('Error fetching selling links:', sellingLinksError);
  }

  // Extract selling links from the join result
  const categorySellingLinks = (sellingLinks || [])
    .map(link => link.selling_links)
    .filter((link): link is SellingLink => link !== null);

  return {
    category: { ...category, expertImageUrl },
    products: products || [],
    sellingLinks: categorySellingLinks,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getCategoryData(id);
  if (!data) {
    return { title: 'Categoria non trovata' };
  }
  
  const description = generateCategoryMetaDescription(
    data.category.name ?? 'Categoria',
    data.category.category_description,
    data.products.length
  );
  
  return {
    title: `${data.category.name ?? 'Categoria'} | Prodotti`,
    description,
    keywords: `${data.category.name}, categoria, prodotti`,
    openGraph: {
      title: `${data.category.name ?? 'Categoria'} | Prodotti`,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.category.name ?? 'Categoria'} | Prodotti`,
      description,
    }
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getCategoryData(id);
  if (!data) {
    notFound();
  }

  const { category, products, sellingLinks } = data!;

  const shareData = {
    title: `${category.name || 'Categoria'} - Il Prodotto del Giorno`,
    description: category.category_description 
      ? category.category_description.substring(0, 160) + (category.category_description.length > 160 ? '...' : '')
      : `Esplora la categoria ${category.name || 'prodotti'} con ${products.length} prodotti straordinari.`
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeaderDark shareData={shareData} />
      <ImageProtection />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Back and Share Buttons */}
        <CategoryActions shareData={shareData} />

        {/* Hero section with expert avatar, title, description */}
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          {category.expertImageUrl ? (
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
              <Image 
                src={category.expertImageUrl} 
                alt="Responsabile categoria" 
                fill 
                className="object-cover select-none pointer-events-none" 
                draggable={false}
              />
            </div>
          ) : null}
          <h1 className="text-3xl md:text-5xl font-medium">{category.name}</h1>
          {category.category_description ? (
            <DescriptionToggle>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  h1: (props) => (
                    <h1 className="text-2xl md:text-3xl font-semibold text-white mt-6 mb-3" {...props} />
                  ),
                  h2: (props) => (
                    <h2 className="text-xl md:text-2xl font-semibold text-white mt-5 mb-2" {...props} />
                  ),
                  h3: (props) => (
                    <h3 className="text-lg md:text-xl font-semibold text-white mt-4 mb-2" {...props} />
                  ),
                  p: (props) => (
                    <p className="text-gray-300 leading-relaxed font-extralight" {...props} />
                  ),
                  strong: (props) => (
                    <strong className="font-semibold text-white" {...props} />
                  ),
                  ul: (props) => (
                    <ul className="list-disc pl-6 space-y-1 text-gray-200" {...props} />
                  ),
                  ol: (props) => (
                    <ol className="list-decimal pl-6 space-y-1 text-gray-200" {...props} />
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
                {category.category_description}
              </ReactMarkdown>
            </DescriptionToggle>
          ) : null}
        </div>

        {/* Products grid with integrated banners */}
        <CategoryClient products={products} sellingLinks={sellingLinks} />
      </main>

      <FooterDark />
    </div>
  );
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: categories } = await supabase
    .from('products_categories')
    .select('id, slug')
    .eq('is_public', true);
  return (categories || []).map((c) => ({ id: c.slug || c.id }));
}


