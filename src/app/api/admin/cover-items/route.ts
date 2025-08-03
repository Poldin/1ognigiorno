import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET - Fetch all cover items (including non-public)
export async function GET() {
  try {
    const { data: coverItems, error } = await supabase
      .from('products_cover_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching cover items:', error);
      return NextResponse.json(
        { error: 'Failed to fetch cover items' },
        { status: 500 }
      );
    }

    return NextResponse.json({ coverItems });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new cover item
export async function POST(request: NextRequest) {
  try {
    const { name, image_url, is_public } = await request.json();

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const { data: newItem, error } = await supabase
      .from('products_cover_items')
      .insert([
        {
          name,
          image_url: image_url || null,
          is_public: is_public !== undefined ? is_public : true,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating cover item:', error);
      return NextResponse.json(
        { error: 'Failed to create cover item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ coverItem: newItem }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update cover item
export async function PUT(request: NextRequest) {
  try {
    const { id, name, image_url, is_public } = await request.json();

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const updateData: Partial<{ name: string; image_url: string | null; is_public: boolean }> = {};
    if (name !== undefined) updateData.name = name;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (is_public !== undefined) updateData.is_public = is_public;

    const { data: updatedItem, error } = await supabase
      .from('products_cover_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating cover item:', error);
      return NextResponse.json(
        { error: 'Failed to update cover item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ coverItem: updatedItem });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete cover item
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
      .from('products_cover_items')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting cover item:', error);
      return NextResponse.json(
        { error: 'Failed to delete cover item' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Cover item deleted successfully' });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}