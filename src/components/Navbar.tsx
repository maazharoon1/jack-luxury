import brand from '../../brand.json';
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (section: 'collection' | 'about' | 'contact' | 'craftsmanship') => void;
  currentSection?: string;
  onHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigate,
  currentSection,
  onHome,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (section: 'collection' | 'about' | 'contact' | 'craftsmanship') => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`site-header fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] py-3 sm:py-4'
            : 'bg-white/80 backdrop-blur-sm py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark (Single text element) */}
          <button
            onClick={() => {
              onHome();
              setMobileMenuOpen(false);
            }}
            className="brand-wordmark text-left font-serif text-lg sm:text-xl tracking-[0.2em] uppercase text-neutral-900 hover:text-red-800 transition-colors duration-200 cursor-pointer font-medium"
          >
            {brand.name.toUpperCase()}
          </button>

          {/* Desktop Navigation Links (Zone 2) */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-xs tracking-[0.16em] uppercase font-medium text-neutral-700">
            <button
              onClick={() => handleLinkClick('collection')}
              className={`hover:text-red-700 transition-colors duration-150 cursor-pointer relative py-1 ${
                currentSection === 'collection' ? 'text-red-700 font-semibold' : ''
              }`}
            >
              Collection
              {currentSection === 'collection' && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-red-700" />
              )}
            </button>

            <button
              onClick={() => handleLinkClick('craftsmanship')}
              className={`hover:text-red-700 transition-colors duration-150 cursor-pointer relative py-1 ${
                currentSection === 'craftsmanship' ? 'text-red-700 font-semibold' : ''
              }`}
            >
              Craftsmanship
            </button>

            <button
              onClick={() => handleLinkClick('about')}
              className={`hover:text-red-700 transition-colors duration-150 cursor-pointer relative py-1 ${
                currentSection === 'about' ? 'text-red-700 font-semibold' : ''
              }`}
            >
              About
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className={`hover:text-red-700 transition-colors duration-150 cursor-pointer relative py-1 ${
                currentSection === 'contact' ? 'text-red-700 font-semibold' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action: Cart + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCart}
              className="group relative flex items-center gap-2 p-2 text-neutral-800 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              <span className="hidden sm:inline text-xs tracking-[0.15em] uppercase font-medium">
                Cart
              </span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-red-700 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-900 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Down / Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-8 pb-12 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 text-base tracking-[0.2em] uppercase font-light text-neutral-900 mt-6">
            <button
              onClick={() => handleLinkClick('collection')}
              className="flex items-center justify-between py-3 border-b border-neutral-100 hover:text-red-700 text-left cursor-pointer"
            >
              <span>Collection</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleLinkClick('craftsmanship')}
              className="flex items-center justify-between py-3 border-b border-neutral-100 hover:text-red-700 text-left cursor-pointer"
            >
              <span>Craftsmanship</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleLinkClick('about')}
              className="flex items-center justify-between py-3 border-b border-neutral-100 hover:text-red-700 text-left cursor-pointer"
            >
              <span>About</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="flex items-center justify-between py-3 border-b border-neutral-100 hover:text-red-700 text-left cursor-pointer"
            >
              <span>Contact</span>
              <ArrowRight className="w-4 h-4 text-neutral-400" />
            </button>
          </nav>

          <div className="pt-8 border-t border-neutral-200 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCart();
              }}
              className="w-full py-3.5 bg-neutral-900 hover:bg-red-800 text-white text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart ({cartCount})</span>
            </button>
            <div className="text-[11px] text-neutral-600 text-center tracking-wider flex flex-col gap-3">
              <a href={brand.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors">{brand.name} on Facebook</a>
              <a href={brand.locationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-colors">{brand.location}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
