import brand from '../../brand.json';
import React from 'react';
import { X, MapPin, Facebook, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="contact-title" className="relative w-full max-w-lg bg-white shadow-2xl border border-neutral-200 p-8 sm:p-12 my-auto">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-neutral-900 transition-colors cursor-pointer" aria-label="Close modal">
          <X className="w-5 h-5" />
        </button>
        <div className="w-8 h-[1.5px] bg-red-700 mb-6" />
        <h2 id="contact-title" className="font-serif text-3xl sm:text-4xl text-neutral-900 font-normal">CONTACT</h2>
        <p className="mt-2 text-xs tracking-[0.2em] uppercase text-neutral-600 font-medium">{brand.name}</p>
        <p className="mt-6 text-xs text-neutral-600 leading-relaxed font-light">
          Discover our timepiece collection, based in {brand.location}.
        </p>
        <a href={brand.locationUrl} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-3 px-5 py-4 bg-neutral-900 hover:bg-red-800 transition-colors text-xs tracking-wider text-white">
          <MapPin className="w-4 h-4" />
          <span>{brand.location}</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a href={brand.facebookUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center gap-3 px-5 py-4 bg-neutral-900 hover:bg-red-800 transition-colors text-xs tracking-wider text-white">
          <Facebook className="w-4 h-4" />
          <span>Contact {brand.name} on Facebook</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
