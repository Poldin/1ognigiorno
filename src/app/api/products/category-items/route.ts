import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('is_public', true);

    if (error) {
      console.error('Error fetching category items:', error);
      return NextResponse.json(
        { error: 'Failed to fetch category items' },
        { status: 500 }
      );
    }

    // Group by category_id and randomize each group
    const grouped = (data || []).reduce((acc, item) => {
      if (!item.category_id) return acc;
      
      if (!acc[item.category_id]) {
        acc[item.category_id] = [];
      }
      acc[item.category_id].push(item);
      return acc;
    }, {} as Record<string, typeof data>);

    // Randomize items within each category
    Object.keys(grouped).forEach(categoryId => {
      grouped[categoryId] = shuffleArray(grouped[categoryId]);
    });

    return NextResponse.json(grouped);
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