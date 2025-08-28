import HeaderPcore from "../../components/HeaderPcore";
import FooterPcore from "../../components/FooterPcore";
import Image from "next/image";
import ExpertCategoriesClient from "./ExpertCategoriesClient";
import { supabase } from "../../lib/supabase";
import { Tables } from "../../lib/database.types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Expert = Tables<'profile'>;
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

interface ExpertPageData {
  expert: Expert;
  categories: CategoryWithProducts[];
}

async function getExpertData(expertId: string): Promise<ExpertPageData | null> {
  try {
    // Fetch expert profile
    const { data: expert, error: expertError } = await supabase
      .from('profile')
      .select('*')
      .eq('id', expertId)
      .single();

    if (expertError || !expert) {
      return null;
    }

    // Fetch categories associated with this expert
    const { data: categories, error: categoriesError } = await supabase
      .from('products_categories')
      .select('*')
      .eq('expert_id', expertId)
      .eq('is_public', true)
      .order('created_at', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching expert categories:', categoriesError);
      return null;
    }

    if (!categories || categories.length === 0) {
      return {
        expert,
        categories: []
      };
    }

    // Fetch all category items for these categories
    const categoryIds = categories.map(c => c.id);
    const { data: categoryItems, error: itemsError } = await supabase
      .from('products_categories_items')
      .select('*')
      .in('category_id', categoryIds)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (itemsError) {
      console.error('Error fetching category items:', itemsError);
      return null;
    }

    // Group category items by category_id
    const groupedItems = (categoryItems || []).reduce((acc, item) => {
      if (!item.category_id) return acc;
      
      if (!acc[item.category_id]) {
        acc[item.category_id] = [];
      }
      acc[item.category_id].push(item);
      return acc;
    }, {} as Record<string, typeof categoryItems>);

    // Fetch selling links for all categories
    const categorySellingLinks: Record<string, SellingLink[]> = {};
    
    const { data: allCategorySellingLinks, error: sellingLinksError } = await supabase
      .from('link_category_sellinglink')
      .select(`
        category_id,
        selling_links (
          id,
          name,
          descrizione,
          img_url,
          link,
          calltoaction
        )
      `)
      .in('category_id', categoryIds);

    if (sellingLinksError) {
      console.error('Error fetching category selling links:', sellingLinksError);
    } else {
      // Group selling links by category_id
      (allCategorySellingLinks || []).forEach(link => {
        if (link.category_id && link.selling_links) {
          if (!categorySellingLinks[link.category_id]) {
            categorySellingLinks[link.category_id] = [];
          }
          categorySellingLinks[link.category_id].push(link.selling_links as SellingLink);
        }
      });
    }

    // Create final categories structure with their items and selling links
    const categoriesWithItems = categories.map(category => ({
      ...category,
      products: groupedItems[category.id] || [],
      sellingLinks: categorySellingLinks[category.id] || [],
    }));

    return {
      expert,
      categories: categoriesWithItems
    };
  } catch (error) {
    console.error('Error fetching expert data:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getExpertData(id);
  
  if (!data) {
    return { title: 'Esperto non trovato' };
  }
  
  const expertName = data.expert.nome || 'Esperto';
  const categoriesCount = data.categories.length;
  const totalProducts = data.categories.reduce((sum, cat) => sum + cat.products.length, 0);
  
  const description = `Scopri le ${categoriesCount} categorie curate da ${expertName} con ${totalProducts} prodotti selezionati.`;
  
  return {
    title: `${expertName} | Esperto PCore`,
    description,
    keywords: `${expertName}, esperto, categorie, prodotti`,
    openGraph: {
      title: `${expertName} | Esperto PCore`,
      description,
      type: 'profile',
      images: data.expert.img_url ? [{
        url: data.expert.img_url,
        alt: expertName
      }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: `${expertName} | Esperto PCore`,
      description,
      images: data.expert.img_url ? [data.expert.img_url] : []
    }
  };
}

export default async function ExpertPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getExpertData(id);
  
  if (!data) {
    notFound();
  }

  const { expert, categories } = data;
  const expertName = expert.nome || 'Esperto';

  const shareData = {
    title: `${expertName} - Esperto PCore`,
    description: expert.bio 
      ? expert.bio.substring(0, 160) + (expert.bio.length > 160 ? '...' : '')
      : `Scopri le categorie curate da ${expertName} su PCore.`
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <HeaderPcore shareData={shareData} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Expert Profile Section */}
        <div className="flex flex-col items-center text-center gap-6 mb-12">
          {expert.img_url ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-48 h-48 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image 
                  src={expert.img_url} 
                  alt={expertName} 
                  fill 
                  className="object-cover select-none pointer-events-none" 
                  draggable={false}
                />
              </div>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-3 py-1">
                <span className="text-white text-3xl font-spacegrotesk font-medium">{expertName}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-3 py-1">
              <span className="text-white text-3xl font-spacegrotesk font-medium">{expertName}</span>
            </div>
          )}
          
          {expert.bio && (
            <div className="max-w-4xl">
              <p className="text-gray-300 leading-relaxed font-extralight text-justify">
                {expert.bio}
              </p>
            </div>
          )}
        </div>

        {/* Categories Section */}
        <ExpertCategoriesClient categories={categories} />
      </main>

      <FooterPcore shareData={shareData} />
    </div>
  );
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: experts } = await supabase
    .from('profile')
    .select('id')
    .not('nome', 'is', null);
  
  return (experts || []).map((expert) => ({ id: expert.id }));
}
