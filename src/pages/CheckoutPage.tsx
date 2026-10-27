import brand from '../../brand.json';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Facebook, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import type { CartItem } from '../types/watch';

interface CheckoutProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onExplore: () => void;
}

const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
const emptyDetails = { email: '', firstName: '', lastName: '', address: '', apartment: '', city: '', region: '', postalCode: '', country: '', phone: '', note: '' };

export function CheckoutPage({ items, onUpdateQuantity, onRemoveItem, onExplore }: CheckoutProps) {
  const [details, setDetails] = useState(emptyDetails);
  const [step, setStep] = useState<'details' | 'review' | 'complete'>('details');
  const [confirmedReview, setConfirmedReview] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const count = items.reduce((total, item) => total + item.quantity, 0);

  function goToStep(next: typeof step) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => headingRef.current?.focus());
  }
  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmedReview(false);
    goToStep('review');
  }
  function field(name: keyof typeof details, label: string, autoComplete: string, required = true, type = 'text') {
    return <label className="checkout-field"><span>{label}{!required && <small>Optional</small>}</span><input name={name} type={type} autoComplete={autoComplete} required={required} maxLength={name === 'email' ? 254 : 160} pattern={required && type === 'text' ? '.*\\S.*' : undefined} value={details[name]} onChange={event => setDetails({ ...details, [name]: event.target.value })} /></label>;
  }

  if (step === 'complete') return <section className="checkout-empty page-shell"><CheckCircle2 size={46} strokeWidth={1} /><p className="eyebrow">Checkout preview complete</p><h1 ref={headingRef} tabIndex={-1} className="section-heading">Beautifully chosen, {details.firstName}.</h1><p>This was a demo checkout. No payment was taken, no order was placed, and your bag is saved.</p><a href={brand.facebookUrl} target="_blank" rel="noopener noreferrer" className="luxury-button"><Facebook size={16} /> Contact {brand.name}</a><button className="text-link" onClick={() => goToStep('review')}>Return to your selection <ArrowRight size={16} /></button></section>;

  if (!items.length) return <section className="checkout-empty page-shell"><ShoppingBag size={46} strokeWidth={1} /><p className="eyebrow">Your collection starts here</p><h1 className="section-heading">Something exceptional awaits.</h1><p>Your shopping bag is empty. Explore the collection and find a timepiece that speaks to you.</p><button className="luxury-button" onClick={onExplore}>Explore timepieces <ArrowRight size={16} /></button></section>;

  return <div className="checkout-page"><div className="page-shell">
    <button className="text-link checkout-back" onClick={onExplore}><ArrowLeft size={15} /> Continue exploring</button>
    <div className="checkout-title"><div><p className="eyebrow">A considered choice</p><h1 ref={headingRef} tabIndex={-1} className="display-heading">{step === 'details' ? 'The final details.' : 'Your selection, refined.'}</h1></div><span className="checkout-mode">DEMO CHECKOUT</span></div>
    <ol className="checkout-steps" aria-label="Checkout progress"><li aria-current={step === 'details' ? 'step' : undefined}><span>{step === 'review' ? <Check size={14} /> : '01'}</span> Your details</li><li aria-current={step === 'review' ? 'step' : undefined}><span>02</span> Review selection</li></ol>

    <div className="checkout-layout">
      <div className="checkout-main">
        {step === 'details' ? <form id="delivery-form" onSubmit={handleReview}>
          <section className="checkout-panel"><div className="checkout-section-title"><span>01</span><h2>Contact information</h2></div><p className="checkout-help">The details you would like associated with your selection.</p>{field('email', 'Email address', 'email', true, 'email')}</section>
          <section className="checkout-panel"><div className="checkout-section-title"><span>02</span><h2>Delivery address</h2></div><div className="checkout-fields"><div className="field-pair">{field('firstName', 'First name', 'given-name')}{field('lastName', 'Last name', 'family-name')}</div>{field('address', 'Street address', 'address-line1')}{field('apartment', 'Apartment, suite, etc.', 'address-line2', false)}<div className="field-pair">{field('city', 'City', 'address-level2')}{field('region', 'State / province', 'address-level1', false)}</div><div className="field-pair">{field('postalCode', 'Postal / ZIP code', 'postal-code')}{field('country', 'Country / region', 'country-name')}</div>{field('phone', 'Phone number', 'tel', false, 'tel')}</div></section>
          <section className="checkout-panel"><div className="checkout-section-title"><span>03</span><h2>A personal touch</h2></div><label className="checkout-field"><span>Gift message or delivery note <small>Optional</small></span><textarea name="note" rows={3} maxLength={500} value={details.note} onChange={event => setDetails({ ...details, note: event.target.value })} placeholder="Something you would like us to know…" /></label></section>
          <div className="checkout-notice"><span className="notice-dot" /><p>This checkout is a preview. Your contact details stay on this page and are not submitted. Payment is not collected.</p></div><button className="luxury-button checkout-submit" type="submit">Review your selection <ArrowRight size={17} /></button>
        </form> : <div>
          <section className="checkout-panel"><div className="review-heading"><div className="checkout-section-title"><span><Check size={16} /></span><h2>Your details</h2></div><button className="text-link" onClick={() => goToStep('details')}>Edit</button></div><div className="review-details"><div><p className="eyebrow">Contact</p><p>{details.firstName} {details.lastName}</p><p>{details.email}</p>{details.phone && <p>{details.phone}</p>}</div><div><p className="eyebrow">Delivery address</p><p>{details.address}</p>{details.apartment && <p>{details.apartment}</p>}<p>{details.city}{details.region && `, ${details.region}`} {details.postalCode}</p><p>{details.country}</p></div></div>{details.note && <div className="review-note"><p className="eyebrow">Your note</p><p>{details.note}</p></div>}</section>
          <section className="checkout-panel"><div className="checkout-section-title"><span>02</span><h2>One last look</h2></div><p className="checkout-help">Review your timepieces and details before finishing the preview. Shipping, taxes, availability, and payment would need to be confirmed before a real purchase.</p><label className="checkout-consent"><input type="checkbox" checked={confirmedReview} onChange={event => setConfirmedReview(event.target.checked)} /><span>I have reviewed my selection and understand this is a demo, with no order or charge.</span></label></section><button className="luxury-button checkout-submit" disabled={!confirmedReview} onClick={() => goToStep('complete')}>Complete checkout preview <ArrowRight size={17} /></button><button className="text-link mt-6" onClick={() => goToStep('details')}><ArrowLeft size={15} /> Back to your details</button>
        </div>}
      </div>

      <aside className="order-summary" aria-label="Order summary"><div className="summary-heading"><h2>Your selection</h2><span>{count} {count === 1 ? 'piece' : 'pieces'}</span></div><div className="summary-items">{items.map(({ product, quantity }) => <article className="summary-item" key={product.id}><img src={product.image} alt={product.name} /><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p className="summary-price">{money(product.price * quantity)}</p><div className="summary-item-actions"><div className="quantity-control"><button aria-label={`Decrease ${product.name} quantity`} onClick={() => onUpdateQuantity(product.id, quantity - 1)}><Minus size={12} /></button><span>{quantity}</span><button aria-label={`Increase ${product.name} quantity`} onClick={() => onUpdateQuantity(product.id, quantity + 1)}><Plus size={12} /></button></div><button className="remove-item" aria-label={`Remove ${product.name}`} onClick={() => onRemoveItem(product.id)}><Trash2 size={14} /></button></div></div></article>)}</div><dl className="summary-totals"><div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div><div><dt>Delivery</dt><dd>To be confirmed</dd></div><div><dt>Taxes & duties</dt><dd>To be confirmed</dd></div><div className="summary-total"><dt>Estimated total <span>USD · before delivery & taxes</span></dt><dd aria-live="polite">{money(subtotal)}</dd></div></dl><div className="summary-assistance"><Facebook size={17} strokeWidth={1.3} /><div><h3>Need assistance?</h3><a href={brand.facebookUrl} target="_blank" rel="noopener noreferrer">Contact {brand.name} <ArrowRight size={12} /></a></div></div></aside>
    </div>
  </div></div>;
}
