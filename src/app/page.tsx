import HeaderPcore from "./components/HeaderPcore";
import FooterPcore from "./components/FooterPcore";
import PcoreHomeContent from "./components/PcoreHomeContent";
import { supabase } from "./lib/supabase";
import { Tables } from "./lib/database.types";

type CategoryItem = Tables<'products_categories_items'>;

const CATEGORY_ID = '721c3aff-7a1f-4a54-aa22-869d5fe6f04f';

// Server-side data fetching
async function getCategoryProducts(): Promise<CategoryItem[]> {
  try {
    const { data, error } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('category_id', CATEGORY_ID)
      .eq('is_public', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching category products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching category products:', error);
    return [];
  }
}

export default async function Home() {
  // Fetch data server-side
  const products = await getCategoryProducts();
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <HeaderPcore />

      {/* Main content area that grows to push footer down */}
      <main className="flex-1">
        <PcoreHomeContent products={products} />
      </main>

      <FooterPcore />
    </div>
  );
}
