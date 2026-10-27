import { useEffect, useRef } from 'react';
import type { CartItem } from '../types/watch';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;
      const controls = drawerRef.current?.querySelectorAll<HTMLElement>('button, a[href], input');
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKey); previousFocus?.focus(); };
  }, [isOpen]);
  if (!isOpen) return null;
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" onClick={onClose}>
    <div ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="bag-heading" className="cart-drawer absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col" onClick={event => event.stopPropagation()}>
      <div className="p-6 border-b border-neutral-200 flex items-center justify-between"><div><p className="eyebrow mb-2">Your considered collection</p><h2 id="bag-heading" className="font-serif text-3xl">Shopping bag <span className="text-base text-neutral-500">({count})</span></h2></div><button onClick={onClose} aria-label="Close shopping bag" className="p-2 cursor-pointer"><X size={20} /></button></div>
      <div className="flex-1 overflow-y-auto p-6">{items.length ? <div className="summary-items">{items.map(({ product, quantity }) => <article className="summary-item" key={product.id}><img src={product.image} alt={product.name} /><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p className="summary-price">${(product.price * quantity).toLocaleString()}</p><div className="summary-item-actions"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => onUpdateQuantity(product.id, quantity - 1)}><Minus size={12} /></button><span>{quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => onUpdateQuantity(product.id, quantity + 1)}><Plus size={12} /></button></div><button className="remove-item" aria-label={`Remove ${product.name}`} onClick={() => onRemoveItem(product.id)}><Trash2 size={14} /></button></div></div></article>)}</div> : <div className="h-full flex flex-col items-center justify-center text-center gap-5"><ShoppingBag size={36} strokeWidth={1} /><h3 className="font-serif text-3xl">Your next discovery awaits.</h3><p className="text-sm text-neutral-500">Add a timepiece to begin your collection.</p><button onClick={onClose} className="luxury-button">Continue exploring <ArrowRight size={15} /></button></div>}</div>
      {items.length > 0 && <div className="p-6 border-t border-neutral-200 bg-[#faf8f4]"><div className="flex justify-between items-center mb-3"><span className="eyebrow">Subtotal</span><span className="font-serif text-3xl">${subtotal.toLocaleString()}</span></div><p className="text-xs text-neutral-500 mb-5">Delivery and taxes to be confirmed.</p><button onClick={onCheckout} className="luxury-button w-full">Continue to checkout <ArrowRight size={16} /></button></div>}
    </div>
  </div>;
}
