import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET - Fetch all categories with their items
export async function GET() {
  try {
    // Fetch categories
    const { data: categories, error: categoriesError } = await supabase
      .from('products_categories')
      .select('*')
      .order('created_at', { ascending: false });

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
      .order('created_at', { ascending: false });

    if (itemsError) {
      console.error('Error fetching category items:', itemsError);
      return NextResponse.json(
        { error: 'Failed to fetch category items' },
        { status: 500 }
      );
    }

    // Group items by category
    const groupedItems = (categoryItems || []).reduce((acc, item) => {
      if (!item.category_id) return acc;
      
      if (!acc[item.category_id]) {
        acc[item.category_id] = [];
      }
      acc[item.category_id].push(item);
      return acc;
    }, {} as Record<string, typeof categoryItems>);

    // Attach items to categories
    const categoriesWithItems = (categories || []).map(category => ({
      ...category,
      items: groupedItems[category.id] || []
    }));

    return NextResponse.json({ categories: categoriesWithItems });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request: NextRequest) {
  try {
    const { name, is_public } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const { data: newCategory, error } = await supabase
      .from('products_categories')
      .insert([
        {
          name,
          is_public: is_public !== undefined ? is_public : true,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating category:', error);
      return NextResponse.json(
        { error: 'Failed to create category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ category: { ...newCategory, items: [] } }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request: NextRequest) {
  try {
    const { id, name, is_public } = await request.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<{ name: string; is_public: boolean }> = {};
    if (name !== undefined) updateData.name = name;
    if (is_public !== undefined) updateData.is_public = is_public;

    const { data: updatedCategory, error } = await supabase
      .from('products_categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating category:', error);
      return NextResponse.json(
        { error: 'Failed to update category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ category: updatedCategory });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category (and all its items)
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

    // Delete all items in this category first
    const { error: itemsError } = await supabase
      .from('products_categories_items')
      .delete()
      .eq('category_id', id);

    if (itemsError) {
      console.error('Error deleting category items:', itemsError);
      return NextResponse.json(
        { error: 'Failed to delete category items' },
        { status: 500 }
      );
    }

    // Then delete the category
    const { error: categoryError } = await supabase
      .from('products_categories')
      .delete()
      .eq('id', id);

    if (categoryError) {
      console.error('Error deleting category:', categoryError);
      return NextResponse.json(
        { error: 'Failed to delete category' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Category and all its items deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}