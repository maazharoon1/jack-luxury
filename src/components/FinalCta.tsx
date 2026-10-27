import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  onExploreClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onExploreClick }) => {
  return (
    <section className="py-28 sm:py-36 bg-white border-t border-neutral-100 text-center relative overflow-hidden">
      
      {/* Soft ivory radial glow */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #faf8f5 65%, #f4f1ea 100%)'
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8">
        
        {/* Subtle Red Accent Line */}
        <div className="w-12 h-[1.5px] bg-red-700 mx-auto mb-8" />

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-900 font-normal tracking-tight">
          DISCOVER YOUR NEXT TIMEPIECE
        </h2>

        <p className="mt-6 text-sm sm:text-base text-neutral-600 font-light max-w-xl mx-auto leading-relaxed">
          Explore our collection of hand-regulated mechanical instruments. Each piece delivered with bespoke presentation case and comprehensive documentation.
        </p>

        <div className="mt-10">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold text-white bg-neutral-900 hover:bg-red-800 transition-colors duration-200 cursor-pointer shadow-sm group"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
