import React from 'react';
import type { WatchProduct } from '../types/watch';
import { Plus, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface ProductCardProps {
  product: WatchProduct;
  onSelect: (product: WatchProduct) => void;
  onAddToCart: (product: WatchProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
}) => {
  const reducedMotion = useReducedMotion();
  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="product-card group relative flex flex-col bg-white border border-neutral-200/70"
    >
      
      {/* Product Image Stage */}
      <button
        type="button"
        aria-label={`View ${product.name}`}
        onClick={() => onSelect(product)}
        className="product-stage relative w-full aspect-square overflow-hidden bg-neutral-50/60 p-8 flex items-center justify-center cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Subtle Category Micro-Label */}
        <span className="absolute top-4 left-4 text-[11px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
          {product.category}
        </span>

        {/* Quick View Corner Affordance */}
        <span className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 p-1.5 bg-white text-neutral-800 shadow-sm">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </button>

      {/* Card Details */}
      <div className="p-6 flex flex-col flex-grow justify-between border-t border-neutral-100">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 
              onClick={() => onSelect(product)}
              className="font-serif text-xl sm:text-2xl text-neutral-900 group-hover:text-red-900 transition-colors cursor-pointer"
            >
              {product.name}
            </h3>
            <span className="text-sm font-medium text-neutral-900 tabular-nums tracking-tight">
              ${product.price.toLocaleString()}
            </span>
          </div>

          <p className="mt-1 text-xs text-neutral-600 font-light line-clamp-1">
            {product.subtitle}
          </p>

          <p className="mt-3 text-xs text-neutral-600 font-normal leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between gap-3">
          <button
            onClick={() => onSelect(product)}
            className="text-xs tracking-[0.15em] uppercase font-medium text-neutral-900 hover:text-red-700 transition-colors cursor-pointer"
          >
            View Details
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wider uppercase font-medium text-neutral-700 hover:text-white hover:bg-neutral-900 active:bg-red-800 transition-all border border-neutral-200 cursor-pointer"
            title="Add to Shopping Cart"
          >
            <Plus className="w-3.5 h-3.5 text-red-700 group-hover:text-current" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};
