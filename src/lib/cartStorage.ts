import { PRODUCTS } from '../data/products';
import type { CartItem } from '../types/watch';

const KEY = 'crown-jewel-bag-v1';
export function readCart(): CartItem[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(saved)) return [];
    const quantities = new Map<string, number>();
    for (const item of saved) {
      if (item && typeof item.id === 'string' && Number.isSafeInteger(item.quantity) && item.quantity > 0) {
        quantities.set(item.id, Math.min(99, item.quantity));
      }
    }
    return PRODUCTS.flatMap(product => quantities.has(product.id) ? [{ product, quantity: quantities.get(product.id)! }] : []);
  } catch { return []; }
}
export function saveCart(items: CartItem[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items.map(({ product, quantity }) => ({ id: product.id, quantity })))); } catch { /* The bag still works if browser storage is unavailable. */ }
}
