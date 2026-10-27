import brand from '../../brand.json';
import React from 'react';
import { X, ArrowRight } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCollection: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onExploreCollection,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white shadow-2xl border border-neutral-200 p-8 sm:p-12 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Micro Red Accent */}
        <div className="w-10 h-[1.5px] bg-red-700 mb-6" />

        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">
          ABOUT {brand.name.toUpperCase()}
        </h2>

        <p className="mt-2 text-xs tracking-[0.2em] uppercase text-neutral-600 font-medium">
          A Dedication to Horological Distinction
        </p>

        <div className="mt-8 space-y-6 text-sm text-neutral-600 font-light leading-relaxed">
          <p>
            {brand.name} is founded on an enduring reverence for fine mechanical watchmaking. We curate exceptional timepieces that embody the height of precision engineering, noble metallurgy, and timeless aesthetic restraint.
          </p>

          <p>
            In an era of fleeting obsolescence, a mechanical wristwatch remains one of the few true objects of lasting permanence. Every gear, escapement wheel, and balance spring interacts in harmonic calibration to record the passage of time without reliance on ephemeral circuitry.
          </p>

          <p>
            Our curated timepieces are chosen for collectors and connoisseurs who value uncompromised craftsmanship, architectural proportion, and quiet distinction. Each piece undergoes exhaustive rate testing, aesthetic scrutiny, and timing regulation before presentation.
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-neutral-600 flex flex-col gap-3">
            <a href={brand.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors">Contact {brand.name} on Facebook</a>
            <a href={brand.locationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors">{brand.location}</a>
          </div>

          <button
            onClick={() => {
              onClose();
              onExploreCollection();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-red-800 text-white text-xs tracking-[0.18em] uppercase font-semibold transition-colors cursor-pointer"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
