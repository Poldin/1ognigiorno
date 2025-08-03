import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  try {
    // Fetch cover items for hero carousel
    const { data: coverItems, error: coverError } = await supabase
      .from('products_cover_items')
      .select('*')
      .eq('is_public', true);

    if (coverError) {
      console.error('Error fetching cover items:', coverError);
      return NextResponse.json(
        { error: 'Failed to fetch cover items' },
        { status: 500 }
      );
    }

    // Fetch categories (NOT randomized)
    const { data: categories, error: categoriesError } = await supabase
      .from('products_categories')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: true });

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    // Fetch all category items
    const { data: categoryItems, error: itemsError } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('is_public', true);

    if (itemsError) {
      console.error('Error fetching category items:', itemsError);
      return NextResponse.json(
        { error: 'Failed to fetch category items' },
        { status: 500 }
      );
    }

    // Group category items by category_id and randomize each group
    const groupedItems = (categoryItems || []).reduce((acc, item) => {
      if (!item.category_id) return acc;
      
      if (!acc[item.category_id]) {
        acc[item.category_id] = [];
      }
      acc[item.category_id].push(item);
      return acc;
    }, {} as Record<string, typeof categoryItems>);

    // Randomize items within each category
    Object.keys(groupedItems).forEach(categoryId => {
      groupedItems[categoryId] = shuffleArray(groupedItems[categoryId]);
    });

    // Create final categories structure with their randomized items
    const categoriesWithItems = (categories || []).map(category => ({
      ...category,
      products: groupedItems[category.id] || []
    }));

    // Prepare response data
    const responseData = {
      coverItems: shuffleArray(coverItems || []), // Randomized cover items
      categories: categoriesWithItems // Categories NOT randomized, but their items ARE randomized
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Fisher-Yates shuffle algorithm for randomizing arrays
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}