import React from 'react';
import craftsmanshipImg from '../assets/images/craftsmanship_watchmaking_1791406593306.jpg';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-24 sm:py-32 bg-neutral-50/60 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Principles */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="w-8 h-[1.5px] bg-red-700 mb-6" />
            
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-neutral-900 font-normal leading-tight">
              THE ART OF PRECISION
            </h2>

            <p className="mt-6 text-sm text-neutral-600 font-light leading-relaxed">
              Every mechanical calibre represents hundreds of hours of micro-engineering. Our horological philosophy unites unyielding mechanical discipline with immaculate hand-finishing.
            </p>

            <div className="mt-10 space-y-6">
              <div className="border-l-2 border-neutral-200 pl-4 hover:border-red-700 transition-colors">
                <h3 className="text-xs tracking-[0.18em] uppercase font-semibold text-neutral-900">
                  Mechanical Architecture
                </h3>
                <p className="mt-1 text-xs text-neutral-600 font-normal leading-relaxed">
                  In-house column wheels, free-sprung balances, and frictionless ruby bearings calibrated to microscopic tolerances.
                </p>
              </div>

              <div className="border-l-2 border-neutral-200 pl-4 hover:border-red-700 transition-colors">
                <h3 className="text-xs tracking-[0.18em] uppercase font-semibold text-neutral-900">
                  Noble Materials
                </h3>
                <p className="mt-1 text-xs text-neutral-600 font-normal leading-relaxed">
                  Forged 904L stainless steel, Grade 5 titanium, high-tech ceramic bezels, and scratch-resistant dual sapphire crystals.
                </p>
              </div>

              <div className="border-l-2 border-neutral-200 pl-4 hover:border-red-700 transition-colors">
                <h3 className="text-xs tracking-[0.18em] uppercase font-semibold text-neutral-900">
                  Hand-Finished Decoration
                </h3>
                <p className="mt-1 text-xs text-neutral-600 font-normal leading-relaxed">
                  Circular Côtes de Genève, mirror-polished bevels, perlage mainplates, and heat-blued screws executed with artisanal patience.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Large Macro Image Stage */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden bg-white shadow-xl border border-neutral-200">
              <img
                src={craftsmanshipImg}
                alt="Horologist assembling mechanical balance wheel under focused studio light"
                className="w-full h-[380px] sm:h-[480px] object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Subtle caption strip */}
              <div className="p-4 sm:p-5 bg-white/95 backdrop-blur-sm border-t border-neutral-100 flex items-center justify-between text-[11px] tracking-wider text-neutral-600 uppercase">
                <span>Hand-Regulation & Assembly</span>
                <span className="text-neutral-400">Micro-Tolerance Testing</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
