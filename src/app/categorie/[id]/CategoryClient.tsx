"use client";

import Link from "next/link";
import ProtectedImage from "./ProtectedImage";
import SellingLinkBanner from "./SellingLinkBanner";

interface CategoryItem {
  id: string;
  name: string | null;
  slug: string | null;
  image_url: string | null;
}

type SellingLink = {
  id: string;
  name: string | null;
  descrizione: string | null;
  img_url: string | null;
  link: string | null;
  calltoaction: string | null;
};

interface CategoryClientProps {
  products: CategoryItem[];
  sellingLinks: SellingLink[];
}

export default function CategoryClient({ products, sellingLinks }: CategoryClientProps) {
  const renderProductsWithAds = () => {
    // Se non ci sono selling links, non mostrare card promozionali
    if (sellingLinks.length === 0) {
      return products.map((product) => (
        <Link
          key={product.id}
          href={`/prodotti/${product.slug || product.id}`}
          className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-700 transition-shadow"
        >
          <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
            {product.image_url ? (
              <ProtectedImage 
                src={product.image_url} 
                alt={product.name || 'Prodotto'} 
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                {product.name || 'Prodotto'}
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="overflow-hidden relative group">
              {(product.name || 'Prodotto').length > 25 ? (
                <h3 className="font-semibold text-white whitespace-nowrap">
                  <div 
                    className="inline-block group-hover:animate-none"
                    style={{
                      animation: 'marquee-loop 15s linear infinite'
                    }}
                  >
                    <span className="inline-block pr-8">
                      {product.name || 'Prodotto'}
                    </span>
                    <span className="inline-block pr-8">
                      {product.name || 'Prodotto'}
                    </span>
                  </div>
                </h3>
              ) : (
                <h3 className="font-semibold text-white">
                  {product.name || 'Prodotto'}
                </h3>
              )}
            </div>
          </div>
        </Link>
      ));
    }

    // Se abbiamo meno di 5 prodotti, mettiamo la card banner alla fine
    if (products.length < 5) {
      const elements = [];
      
      // Aggiungi tutti i prodotti
      products.forEach((product) => {
        elements.push(
          <Link
            key={product.id}
            href={`/prodotti/${product.slug || product.id}`}
            className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-700 transition-shadow"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
              {product.image_url ? (
                <ProtectedImage 
                  src={product.image_url} 
                  alt={product.name || 'Prodotto'} 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                  {product.name || 'Prodotto'}
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="overflow-hidden relative group">
                {(product.name || 'Prodotto').length > 25 ? (
                  <h3 className="font-semibold text-white whitespace-nowrap">
                    <div 
                      className="inline-block group-hover:animate-none"
                      style={{
                        animation: 'marquee-loop 15s linear infinite'
                      }}
                    >
                      <span className="inline-block pr-8">
                        {product.name || 'Prodotto'}
                      </span>
                      <span className="inline-block pr-8">
                        {product.name || 'Prodotto'}
                      </span>
                    </div>
                  </h3>
                ) : (
                  <h3 className="font-semibold text-white">
                    {product.name || 'Prodotto'}
                  </h3>
                )}
              </div>
            </div>
          </Link>
        );
      });
      
      // Aggiungi la card banner alla fine (usa il primo selling link)
      if (sellingLinks.length > 0) {
        elements.push(
          <SellingLinkBanner 
            key="selling-link-end" 
            sellingLink={sellingLinks[0]} 
            colorIndex={0} 
          />
        );
      }
      
      return elements;
    }
    
    // Pattern base per ogni 100 elementi: 6,15,26,38,50,58,70,80,88,97
    const basePattern = [6, 15, 26, 38, 50, 58, 70, 80, 88, 97];
    
    // Genera tutte le posizioni delle card banner
    const bannerPositions = new Set<number>();
    for (let century = 0; century < Math.ceil(products.length / 100); century++) {
      basePattern.forEach(pos => {
        const actualPosition = pos + (century * 100);
        if (actualPosition <= products.length) {
          bannerPositions.add(actualPosition);
        }
      });
    }
    
    const elements = [];
    let productIndex = 0;
    let position = 1;
    let bannerIndex = 0;
    
    while (productIndex < products.length || bannerPositions.has(position)) {
      if (bannerPositions.has(position)) {
        // Inserisci selling link banner con logica ciclica
        const sellingLinkIndex = bannerIndex % sellingLinks.length;
        const currentSellingLink = sellingLinks[sellingLinkIndex];
        
        elements.push(
          <SellingLinkBanner 
            key={`selling-link-${position}`} 
            sellingLink={currentSellingLink} 
            colorIndex={bannerIndex} 
          />
        );
        bannerIndex++;
      } else if (productIndex < products.length) {
        // Inserisci card prodotto
        const product = products[productIndex];
        elements.push(
          <Link
            key={product.id}
            href={`/prodotti/${product.slug || product.id}`}
            className="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-gray-700 transition-shadow"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
              {product.image_url ? (
                <ProtectedImage 
                  src={product.image_url} 
                  alt={product.name || 'Prodotto'} 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                  {product.name || 'Prodotto'}
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="overflow-hidden relative group">
                {(product.name || 'Prodotto').length > 25 ? (
                  <h3 className="font-semibold text-white whitespace-nowrap">
                    <div 
                      className="inline-block group-hover:animate-none"
                      style={{
                        animation: 'marquee-loop 15s linear infinite'
                      }}
                    >
                      <span className="inline-block pr-8">
                        {product.name || 'Prodotto'}
                      </span>
                      <span className="inline-block pr-8">
                        {product.name || 'Prodotto'}
                      </span>
                    </div>
                  </h3>
                ) : (
                  <h3 className="font-semibold text-white">
                    {product.name || 'Prodotto'}
                  </h3>
                )}
              </div>
            </div>
          </Link>
        );
        productIndex++;
      }
      position++;
    }
    
    return elements;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {renderProductsWithAds()}
    </div>
  );
}
