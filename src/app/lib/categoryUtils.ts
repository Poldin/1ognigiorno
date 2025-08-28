export function getProductImageUrl(imageUrl: string | null): string {
  if (!imageUrl) {
    return '/api/placeholder/300/400';
  }
  
  // Se l'URL è già completo, restituiscilo
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Altrimenti costruisci l'URL Supabase
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${imageUrl}`;
}
