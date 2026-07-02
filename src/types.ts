export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: 'men' | 'women' | 'kids' | 'shoes' | 'accessories' | 'bags' | 'sports';
  rating: number;
  image: string;
  tags?: string[];
  sizes: string[];
  inStock: boolean;
  brand: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
