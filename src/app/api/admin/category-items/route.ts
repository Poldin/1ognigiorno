import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET - Fetch category items by category_id (optional)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');

    let query = supabase
      .from('products_categories_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data: categoryItems, error } = await query;

    if (error) {
      console.error('Error fetching category items:', error);
      return NextResponse.json(
        { error: 'Failed to fetch category items' },
        { status: 500 }
      );
    }

    return NextResponse.json({ categoryItems });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new category item
export async function POST(request: NextRequest) {
  try {
    const { name, image_url, is_public, category_id } = await request.json();

    // Validate required fields
    if (!name || !category_id) {
      return NextResponse.json(
        { error: 'Name and category_id are required' },
        { status: 400 }
      );
    }

    // Verify category exists
    const { data: category, error: categoryError } = await supabase
      .from('products_categories')
      .select('id')
      .eq('id', category_id)
      .single();

    if (categoryError || !category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const { data: newItem, error } = await supabase
      .from('products_categories_items')
      .insert([
        {
          name,
          image_url: image_url || null,
          is_public: is_public !== undefined ? is_public : true,
          category_id,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating category item:', error);
      return NextResponse.json(
        { error: 'Failed to create category item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ categoryItem: newItem }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update category item
export async function PUT(request: NextRequest) {
  try {
    const { id, name, image_url, is_public, category_id } = await request.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    // If category_id is being updated, verify new category exists
    if (category_id) {
      const { data: category, error: categoryError } = await supabase
        .from('products_categories')
        .select('id')
        .eq('id', category_id)
        .single();

      if (categoryError || !category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }
    }

    const updateData: Partial<{ name: string; image_url: string | null; is_public: boolean; category_id: string }> = {};
    if (name !== undefined) updateData.name = name;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (is_public !== undefined) updateData.is_public = is_public;
    if (category_id !== undefined) updateData.category_id = category_id;

    const { data: updatedItem, error } = await supabase
      .from('products_categories_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category item:', error);
      return NextResponse.json(
        { error: 'Failed to update category item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ categoryItem: updatedItem });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('products_categories_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting category item:', error);
      return NextResponse.json(
        { error: 'Failed to delete category item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Category item deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}