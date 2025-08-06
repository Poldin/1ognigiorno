import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify the request has proper authorization
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.REVALIDATE_TOKEN;
    
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { path, type } = body;

    if (type === 'product') {
      // Revalidate specific product page
      revalidatePath(`/prodotti/${path}`);
      revalidatePath('/prodotti'); // Also revalidate main products page
    } else if (type === 'products') {
      // Revalidate all product pages
      revalidatePath('/prodotti');
    } else {
      // Revalidate specific path
      revalidatePath(path || '/');
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path: path || '/',
      type: type || 'general'
    });
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json({ 
      message: 'Error revalidating', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    }, { status: 500 });
  }
}
