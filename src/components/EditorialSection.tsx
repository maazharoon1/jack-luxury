import React from 'react';

export const EditorialSection: React.FC = () => {
  return (
    <section id="story" className="py-32 sm:py-44 bg-neutral-50/70 border-y border-neutral-200/60 relative overflow-hidden">
      
      {/* Delicate background illumination */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, rgba(250,248,245,0.4) 100%)'
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* Subtle Crimson Micro-Accent Line */}
        <div className="mx-auto w-10 h-[1.5px] bg-red-700 mb-8" />

        {/* Minimal Editorial Statement */}
        <blockquote className="font-serif text-3xl sm:text-5xl md:text-6xl text-neutral-900 font-normal leading-[1.2] tracking-tight">
          Crafted for moments that deserve to last.
        </blockquote>

        {/* Supporting Editorial Paragraph */}
        <p className="mt-8 sm:mt-10 max-w-2xl mx-auto text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          True luxury is never loud. It lives in the quiet weight of hand-finished steel, the silent glide of a mechanical balance wheel, and the enduring resonance of timeless proportions.
        </p>

        {/* Minimal Signature Accent */}
        <div className="mt-12 flex items-center justify-center gap-4 text-xs tracking-[0.25em] uppercase text-neutral-600 font-medium">
          <span>PRECISION</span>
          <span className="text-red-700" aria-hidden="true">·</span>
          <span>INTEGRITY</span>
          <span className="text-red-700" aria-hidden="true">·</span>
          <span>PERMANENCE</span>
        </div>

      </div>
    </section>
  );
};
