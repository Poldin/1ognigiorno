import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    // First try to find in category items
    const { data: categoryProduct, error: categoryError } = await supabase
      .from('products_categories_items')
      .select('*')
      .eq('id', productId)
      .single();

    if (categoryProduct && !categoryError) {
      return NextResponse.json(categoryProduct);
    }

    // If not found in category items, try cover items
    const { data: coverProduct, error: coverError } = await supabase
      .from('products_cover_items')
      .select('*')
      .eq('id', productId)
      .single();

    if (coverProduct && !coverError) {
      // Convert cover item to category item format for consistency
      const productForPage = {
        ...coverProduct,
        category_id: null,
        description: null
      };
      return NextResponse.json(productForPage);
    }

    // If not found in either table
    return NextResponse.json(
      { error: 'Product not found' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
