/**
 * Meta Description Utilities
 * Centralized management for SEO meta descriptions
 */

/**
 * Truncates text to optimal meta description length
 * Preserves word boundaries and adds ellipsis when needed
 */
export function truncateMetaDescription(text: string, maxLength: number = 155): string {
  if (!text) return '';
  
  // Remove any markdown formatting for meta descriptions
  const cleanText = text
    .replace(/[#*_~`]/g, '') // Remove markdown symbols
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text only
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  if (cleanText.length <= maxLength) {
    return cleanText;
  }
  
  // Find the last complete word within the limit
  const truncated = cleanText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If we can't find a space, just cut at the limit
  if (lastSpaceIndex === -1) {
    return truncated.substring(0, maxLength - 3) + '...';
  }
  
  return truncated.substring(0, lastSpaceIndex) + '...';
}

/**
 * Generates optimized meta description for products
 */
export function generateProductMetaDescription(
  productName: string, 
  description?: string | null,
  categoryName?: string | null
): string {
  if (description) {
    return truncateMetaDescription(description);
  }
  
  const baseText = `Scopri tutti i dettagli di ${productName}`;
  const categoryText = categoryName ? ` nella categoria ${categoryName}` : '';
  const fullText = `${baseText}${categoryText}. Prodotto di qualità disponibile nel nostro catalogo.`;
  
  return truncateMetaDescription(fullText);
}

/**
 * Generates optimized meta description for categories
 */
export function generateCategoryMetaDescription(
  categoryName: string,
  description?: string | null,
  productCount?: number
): string {
  if (description) {
    return truncateMetaDescription(description);
  }
  
  const countText = productCount && productCount > 0 ? ` con ${productCount} prodotti disponibili` : '';
  const fallbackText = `Esplora la categoria ${categoryName}${countText}. Scopri la nostra selezione di prodotti di qualità.`;
  
  return truncateMetaDescription(fallbackText);
}

/**
 * Generates optimized meta description for products catalog
 */
export function generateCatalogMetaDescription(
  categoryNames: string[],
  totalProducts: number
): string {
  // Limit category names to avoid overly long descriptions
  const maxCategories = 4;
  const displayCategories = categoryNames.slice(0, maxCategories);
  const hasMore = categoryNames.length > maxCategories;
  
  let categoriesText = displayCategories.join(', ');
  if (hasMore) {
    categoriesText += ` e altre ${categoryNames.length - maxCategories} categorie`;
  }
  
  const baseText = `Scopri il nostro catalogo completo con ${totalProducts} prodotti`;
  const categoryText = displayCategories.length > 0 ? ` nelle categorie: ${categoriesText}` : '';
  const fullText = `${baseText}${categoryText}. Prodotti di qualità selezionati per te.`;
  
  return truncateMetaDescription(fullText);
}

/**
 * Validates meta description length and provides feedback
 */
export function validateMetaDescription(description: string): {
  isValid: boolean;
  length: number;
  recommendation: string;
} {
  const length = description.length;
  
  if (length < 120) {
    return {
      isValid: false,
      length,
      recommendation: 'Meta description troppo corta. Consigliato: 120-155 caratteri.'
    };
  }
  
  if (length > 160) {
    return {
      isValid: false,
      length,
      recommendation: 'Meta description troppo lunga. Verrà troncata da Google.'
    };
  }
  
  return {
    isValid: true,
    length,
    recommendation: 'Lunghezza ottimale per SEO.'
  };
}
