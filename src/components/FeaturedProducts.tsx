import React from 'react';
import type { WatchProduct } from '../types/watch';
import { ProductCard } from './ProductCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedProductsProps {
  products: WatchProduct[];
  onSelectProduct: (product: WatchProduct) => void;
  onAddToCart: (product: WatchProduct) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onViewAll,
}) => {
  const featuredList = products.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="featured" className="py-24 sm:py-32 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal">
              FEATURED TIMEPIECES
            </h2>
            <p className="mt-3 text-sm text-neutral-600 max-w-lg font-light leading-relaxed">
              Curated masterworks exhibiting uncompromising mechanical integrity and refined aesthetic restraint.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase font-semibold text-neutral-900 hover:text-red-700 transition-colors group cursor-pointer self-start md:self-end"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredList.map((product) => (
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
