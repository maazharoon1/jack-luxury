import React, { useState } from 'react';
import type { WatchProduct } from '../types/watch';
import { X, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: WatchProduct | null;
  onClose: () => void;
  onAddToCart: (product: WatchProduct) => void;
  onBuyNow: (product: WatchProduct) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAdd = () => {
    onAddToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-5xl bg-white shadow-2xl border border-neutral-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Gallery & Large Image (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-50/70 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-200">
            {/* Primary Showcase Image */}
            <div className="relative w-full aspect-square flex items-center justify-center p-4">
              <img
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="mt-6 flex items-center justify-center gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 p-1 border bg-white cursor-pointer transition-all ${
                      activeImageIndex === idx
                        ? 'border-red-700 ring-1 ring-red-700'
                        : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module & Specs (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
            <div>
              {/* Category */}
              <div className="text-[11px] tracking-[0.2em] uppercase text-neutral-600 font-medium">
                {product.category}
              </div>

              {/* Title & Price */}
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
                {product.name}
              </h2>
              <div className="mt-1 text-xs text-neutral-600 font-light">
                {product.subtitle}
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-neutral-900 tabular-nums">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-600 font-light">
                  Tax and insured shipping calculated at checkout
                </span>
              </div>

              <div className="w-full h-[1px] bg-neutral-100 my-6" />

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {product.description}
              </p>

              {/* Specifications Table */}
              <div className="mt-6 border-t border-neutral-100 pt-6">
                <h3 className="text-xs tracking-[0.16em] uppercase font-semibold text-neutral-900 mb-3">
                  Technical Specifications
                </h3>
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-neutral-50">
                    <dt className="text-neutral-600 font-normal">Movement</dt>
                    <dd className="text-neutral-900 font-medium text-right max-w-[60%]">{product.specifications.movement}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-50">
                    <dt className="text-neutral-600 font-normal">Case Dimensions</dt>
                    <dd className="text-neutral-900 font-medium text-right">{product.specifications.case}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-50">
                    <dt className="text-neutral-600 font-normal">Material</dt>
                    <dd className="text-neutral-900 font-medium text-right">{product.specifications.material}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-50">
                    <dt className="text-neutral-600 font-normal">Strap</dt>
                    <dd className="text-neutral-900 font-medium text-right">{product.specifications.strap}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-50">
                    <dt className="text-neutral-600 font-normal">Water Resistance</dt>
                    <dd className="text-neutral-900 font-medium text-right">{product.specifications.waterResistance}</dd>
                  </div>
                  {product.specifications.powerReserve && (
                    <div className="flex justify-between py-1 border-b border-neutral-50">
                      <dt className="text-neutral-600 font-normal">Power Reserve</dt>
                      <dd className="text-neutral-900 font-medium text-right">{product.specifications.powerReserve}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-1">
                    <dt className="text-neutral-600 font-normal">Status</dt>
                    <dd className="text-emerald-700 font-medium text-right">{product.specifications.availability}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* CTAs and Assurance */}
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    addedNotice
                      ? 'bg-neutral-800 text-white'
                      : 'bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-900'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-red-700" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="w-full py-3.5 bg-neutral-900 hover:bg-red-800 text-white text-xs tracking-[0.2em] uppercase font-semibold transition-colors duration-200 cursor-pointer"
                >
                  Purchase Now
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600 pt-4 border-t border-neutral-100">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-neutral-500" />
                  <span>5-Yr Guarantee</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-neutral-500" />
                  <span>Insured Courier</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-neutral-500" />
                  <span>14-Day Returns</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
