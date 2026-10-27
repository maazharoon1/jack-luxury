import React, { useState } from 'react';
import type { WatchCategory, WatchProduct } from '../types/watch';
import { ProductCard } from './ProductCard';

interface CollectionGridProps {
  products: WatchProduct[];
  onSelectProduct: (product: WatchProduct) => void;
  onAddToCart: (product: WatchProduct) => void;
}

const CATEGORIES: ('All' | WatchCategory)[] = [
  'All',
  'Classic',
  'Chronograph',
  'Dress',
  'Sport',
  'Automatic',
  'Limited Edition',
];

export const CollectionGrid: React.FC<CollectionGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | WatchCategory>('All');

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="collection" className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal">
            CURATED COLLECTION
          </h2>
          <p className="mt-3 text-sm text-neutral-600 font-light leading-relaxed">
            Every timepiece is hand-regulated and calibrated to rigorous standards of horological distinction.
          </p>
        </div>

        {/* Clean Interactive Category Filter Bar */}
        <div className="mt-10 flex items-center justify-center flex-wrap gap-2 sm:gap-3 border-b border-neutral-200 pb-4">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-2 text-xs tracking-[0.16em] uppercase font-medium transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {cat}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-red-700" />
                )}
              </button>
            );
          })}
        </div>

        {/* Collection Products Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
