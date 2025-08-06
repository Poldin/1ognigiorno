import { MetadataRoute } from 'next';
import { supabase } from './lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/prodotti`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  try {
    // Get all category items
    const { data: categoryItems } = await supabase
      .from('products_categories_items')
      .select('id, created_at')
      .eq('is_public', true);

    // Get all cover items
    const { data: coverItems } = await supabase
      .from('products_cover_items')
      .select('id, created_at')
      .eq('is_public', true);

    const productPages = [];

    // Add category items to sitemap
    if (categoryItems) {
      productPages.push(
        ...categoryItems.map(item => ({
          url: `${baseUrl}/prodotti/${item.id}`,
          lastModified: new Date(item.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        }))
      );
    }

    // Add cover items to sitemap
    if (coverItems) {
      productPages.push(
        ...coverItems.map(item => ({
          url: `${baseUrl}/prodotti/${item.id}`,
          lastModified: new Date(item.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8, // Higher priority for featured items
        }))
      );
    }

    return [...staticPages, ...productPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return only static pages if database query fails
    return staticPages;
  }
}
