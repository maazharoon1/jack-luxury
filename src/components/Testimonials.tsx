import React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  timepiece: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The weight and case finishing of the Monarch Chronograph exceed watches twice its price. The red chronograph hand adds an exquisite subtle character.",
    author: "Julian V.",
    location: "Geneva",
    timepiece: "Monarch Chronograph",
  },
  {
    quote: "Understated perfection. The ultra-thin profile sits effortlessly under a tailored cuff, and the guilloché dial reflects light with sublime nuance.",
    author: "Elena R.",
    location: "London",
    timepiece: "Heritage Pure Dress",
  },
  {
    quote: "Uncompromising mechanical precision. Receiving the watch in its presentation case with immediate documentation was an experience in itself.",
    author: "Marcus T.",
    location: "New York",
    timepiece: "Astral Skeleton Tourbillon",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="w-8 h-[1.5px] bg-red-700 mx-auto mb-4" />
          <h2 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-normal">
            COLLECTOR TESTIMONIALS
          </h2>
          <p className="mt-2 text-xs tracking-wider uppercase text-neutral-600 font-light">
            Reflections from patrons of fine horology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="p-8 bg-neutral-50/50 border border-neutral-200/60 flex flex-col justify-between"
            >
              <p className="font-serif text-lg text-neutral-800 leading-relaxed italic">
                "{item.quote}"
              </p>
              
              <div className="mt-8 pt-4 border-t border-neutral-200/70 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-neutral-900">{item.author}</div>
                  <div className="text-neutral-600">{item.location}</div>
                </div>
                <div className="text-[11px] tracking-wider uppercase text-neutral-600 font-medium">
                  {item.timepiece}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
