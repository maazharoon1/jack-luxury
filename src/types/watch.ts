export type WatchCategory = 'Classic' | 'Chronograph' | 'Dress' | 'Sport' | 'Automatic' | 'Limited Edition';

export interface WatchProduct {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  category: WatchCategory;
  image: string;
  gallery: string[];
  description: string;
  specifications: {
    movement: string;
    case: string;
    material: string;
    strap: string;
    waterResistance: string;
    availability: string;
    powerReserve?: string;
  };
  featured?: boolean;
}

export interface CartItem {
  product: WatchProduct;
  quantity: number;
}
