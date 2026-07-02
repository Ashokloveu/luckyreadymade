import React, { useState, useMemo } from 'react';
import { Heart, Star, ShoppingCart, Eye, ChevronDown, Grid, List, ChevronLeft, ChevronRight, X, Percent, Tag, Clock, Truck } from 'lucide-react';
import { Product } from '../types';

interface OffersPageProps {
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

// 24 offers items matching the exact pattern
const offersProducts: Product[] = [
  {
    id: 'off-p1',
    name: 'Nike Air Monarch IV',
    price: 4499,
    originalPrice: 8999,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    tags: ['-50%'],
    sizes: ['7', '8', '9', '10', '11'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'The ultimate leather training sneaker featuring full-length encapsulated Air-Sole cushioning and supportive synthetic overlays for durable everyday performance.'
  },
  {
    id: 'off-p2',
    name: 'Adidas Classic Backpack',
    price: 1649,
    originalPrice: 2999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    tags: ['-45%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Spacious daily backpack featuring standard double compartment layers, water-resistant base, and padded adjustable Primegreen shoulder straps.'
  },
  {
    id: 'off-p3',
    name: 'Floral Midi Dress',
    price: 1999,
    originalPrice: 3299,
    category: 'women',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600',
    tags: ['-40%'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    brand: 'Women',
    description: 'Blush pink floral flare dress woven from soft airy linen, featuring an elegant tie-up bodice and comfortable elastic bell sleeves.'
  },
  {
    id: 'off-p4',
    name: 'Pique Polo T-Shirt',
    price: 1199,
    originalPrice: 1999,
    category: 'men',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600',
    tags: ['-40%'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    brand: 'Men',
    description: 'Sleek solid black collar tee woven from luxurious breathable pique combed cotton, tailored for a robust standard fit.'
  },
  {
    id: 'off-p5',
    name: 'Skechers Microspec',
    price: 2199,
    originalPrice: 3399,
    category: 'kids',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    tags: ['-35%'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Kids Shoes',
    description: 'Lightweight kids running shoes featuring a secure athletic knit grid mesh upper and highly flexible shock-absorbing white rubber outsoles.'
  },
  {
    id: 'off-p6',
    name: "Men's Hoodie",
    price: 1749,
    originalPrice: 2499,
    category: 'men',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    tags: ['-30%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Cozy and stylish basic oatmeal tan fleece hoodie featuring an adjustable drawstring double-layer hood and spacious kangaroo pocket.'
  },
  {
    id: 'off-p7',
    name: 'Casio Enticer Watch',
    price: 1749,
    originalPrice: 2499,
    category: 'accessories',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    tags: ['-30%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Timeless minimal wrist watch crafted with standard gold-plated case, authentic tan calf leather buckle strap, and robust quartz mechanism.'
  },
  {
    id: 'off-p8',
    name: 'Adidas Ultrabounce',
    price: 5249,
    originalPrice: 6999,
    category: 'shoes',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
    tags: ['-25%'],
    sizes: ['6', '7', '8', '9', '10'],
    inStock: true,
    brand: 'Women Shoes',
    description: 'Maximum energy return athletic trainer engineered with light springy Bounce midsoles, stabilizing TPU heel counters, and engineered mesh.'
  },
  {
    id: 'off-p9',
    name: 'Levi\'s Denim Trucker Jacket',
    price: 3899,
    originalPrice: 5999,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600',
    tags: ['-35%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Classic genuine heavy denim trucker jacket featuring secure copper button closures, dual button-flap chest pockets, and waist adjusters.'
  },
  {
    id: 'off-p10',
    name: 'Ray-Ban Wayfarer Classic',
    price: 6499,
    originalPrice: 9999,
    category: 'accessories',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    tags: ['-35%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Legendary premium sunglasses crafted in durable high-gloss black composite frames paired with standard G-15 polarized green lenses.'
  },
  {
    id: 'off-p11',
    name: 'Puma Winter Beanie Hat',
    price: 799,
    originalPrice: 1499,
    category: 'accessories',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600',
    tags: ['-46%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Warm fold-over rib knit winter watch cap decorated with signature silver metallic Puma leaping cat badge embroidery on cuff.'
  },
  {
    id: 'off-p12',
    name: 'Boys Varsity Bomber Jacket',
    price: 1199,
    originalPrice: 1999,
    category: 'kids',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&q=80&w=600',
    tags: ['-40%'],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    inStock: true,
    brand: 'Kids',
    description: 'Snug fit high school prep style letterman jacket crafted with contrast white sleeves, press buttons, and warm inner fleece lining.'
  }
];

// Exact customer ratings counts
const reviewCounts: Record<string, number> = {
  'off-p1': 24,
  'off-p2': 18,
  'off-p3': 16,
  'off-p4': 14,
  'off-p5': 21,
  'off-p6': 12,
  'off-p7': 15,
  'off-p8': 17,
  'off-p9': 28,
  'off-p10': 32,
  'off-p11': 9,
  'off-p12': 14
};

export default function OffersPage({ onAddToCart, wishlist, onToggleWishlist }: OffersPageProps) {
  // Sidebar State Managers (All checkbox arrays)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(15000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Layout modes
  const [sortBy, setSortBy] = useState<string>('discount-high');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Quick View modals
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');

  // Count metrics exactly as shown in the mockup image sidebar
  const categoryOptions = [
    { name: 'Men', id: 'men', count: 32 },
    { name: 'Women', id: 'women', count: 28 },
    { name: 'Kids', id: 'kids', count: 18 },
    { name: 'Shoes', id: 'shoes', count: 24 },
    { name: 'Accessories', id: 'accessories', count: 14 }
  ];

  const discountOptions = [
    { name: '10% and above', val: 10, count: 40 },
    { name: '20% and above', val: 20, count: 32 },
    { name: '30% and above', val: 30, count: 28 },
    { name: '40% and above', val: 40, count: 20 },
    { name: '50% and above', val: 50, count: 12 }
  ];

  const brandOptions = [
    { name: 'Nike', count: 18 },
    { name: 'Adidas', count: 16 },
    { name: 'Puma', count: 14 },
    { name: 'FILA', count: 10 },
    { name: 'Skechers', count: 8 },
    { name: 'Others', count: 20 }
  ];

  const handleCategoryToggle = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
    setCurrentPage(1);
  };

  const handleDiscountToggle = (val: number) => {
    setSelectedDiscounts(prev =>
      prev.includes(val) ? prev.filter(d => d !== val) : [...prev, val]
    );
    setCurrentPage(1);
  };

  const handleBrandToggle = (bName: string) => {
    setSelectedBrands(prev =>
      prev.includes(bName) ? prev.filter(b => b !== bName) : [...prev, bName]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedDiscounts([]);
    setMaxPrice(15000);
    setSelectedBrands([]);
    setCurrentPage(1);
  };

  // Compute products matching active filters
  const filteredProducts = useMemo(() => {
    return offersProducts.filter(p => {
      // 1. Categories
      if (selectedCategories.length > 0) {
        // Handle overlapping conditions
        const match = selectedCategories.includes(p.category) || 
                      (selectedCategories.includes('shoes') && p.brand.toLowerCase().includes('shoes'));
        if (!match) return false;
      }

      // 2. Discounts Filter
      if (selectedDiscounts.length > 0) {
        const pct = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
        const minSelectedDiscount = Math.min(...selectedDiscounts);
        if (pct < minSelectedDiscount) {
          return false;
        }
      }

      // 3. Max Price boundary
      if (p.price > maxPrice) {
        return false;
      }

      // 4. Brands Filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some(brand => {
          if (brand === 'Others') {
            return !['nike', 'adidas', 'puma', 'fila', 'skechers'].some(b => 
              p.name.toLowerCase().includes(b) || p.brand.toLowerCase().includes(b)
            );
          }
          return p.name.toLowerCase().includes(brand.toLowerCase()) || 
                 p.brand.toLowerCase().includes(brand.toLowerCase());
        });
        if (!matchesBrand) return false;
      }

      return true;
    });
  }, [selectedCategories, selectedDiscounts, maxPrice, selectedBrands]);

  // Sort matching items
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'discount-high') {
      list.sort((a, b) => {
        const pctA = ((a.originalPrice - a.price) / a.originalPrice);
        const pctB = ((b.originalPrice - b.price) / b.originalPrice);
        return pctB - pctA; // High to low discount
      });
    } else if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => b.id.localeCompare(a.id));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const handleOpenQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setChosenSize(p.sizes[0] || 'One Size');
  };

  const handleAddToCartFromQuickView = () => {
    if (quickViewProduct) {
      onAddToCart(quickViewProduct, chosenSize);
      setQuickViewProduct(null);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-16 font-sans">
      
      {/* 1. Page Header (Breadcrumbs, Title, Subtitle) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-left select-none">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span className="hover:text-[#08214d] cursor-pointer">Home</span>
          <span>&gt;</span>
          <span className="text-gray-500 font-semibold">Offers</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight mt-3">
          OFFERS
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
          Great styles. Better prices. Limited time only!
        </p>
      </div>

      {/* 2. Top Promotional Grid exactly matching reference (4 rows columns) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 select-none">
        
        {/* Banner 1: BIG SAVINGS ON TOP BRANDS */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#0e2752] to-slate-950 text-white p-5 flex flex-col justify-between h-48 relative overflow-hidden text-left group border border-slate-800 shadow-md">
          <div className="relative z-10 max-w-[150px]">
            <span className="text-[9px] font-black tracking-widest text-sky-400 uppercase block">BIG SAVINGS</span>
            <h3 className="text-xs font-black uppercase text-white mt-1">ON TOP BRANDS</h3>
            <div className="mt-3">
              <span className="text-[10px] font-bold text-gray-300 block">UP TO</span>
              <span className="text-2xl font-black text-white block -mt-1 leading-none">50% OFF</span>
            </div>
            <button className="mt-4 bg-white text-[#0e2752] hover:bg-sky-50 text-[9px] font-black tracking-wider py-1.5 px-4 rounded-md transition-all active:scale-95 uppercase">
              SHOP NOW
            </button>
          </div>
          {/* Overlapping Sneaker */}
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300"
            alt="Adidas White Sneaker"
            className="w-32 h-24 object-cover rotate-[-15deg] absolute -right-3 -bottom-2 drop-shadow-2xl z-5 group-hover:scale-105 duration-500 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Banner 2: MEN'S SPECIAL */}
        <div className="rounded-2xl bg-gradient-to-br from-red-600 via-red-700 to-rose-855 text-white p-5 flex flex-col justify-between h-48 relative overflow-hidden text-left group border border-red-500 shadow-md">
          <div className="relative z-10 max-w-[150px]">
            <span className="text-[9px] font-black tracking-widest text-red-200 uppercase block">MEN&apos;S SPECIAL</span>
            <h3 className="text-xs font-black uppercase text-white mt-1">NEW PRODUCTS</h3>
            <div className="mt-3">
              <span className="text-[10px] font-bold text-red-100 block">UP TO</span>
              <span className="text-2xl font-black text-white block -mt-1 leading-none">40% OFF</span>
            </div>
            <button className="mt-4 bg-white text-red-700 hover:bg-rose-50 text-[9px] font-black tracking-wider py-1.5 px-4 rounded-md transition-all active:scale-95 uppercase">
              SHOP MEN
            </button>
          </div>
          {/* Overlapping Men Model with Sunglasses */}
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
            alt="Men Model"
            className="w-28 h-40 object-cover object-top absolute right-0 bottom-0 z-5 group-hover:scale-103 duration-500 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Banner 3: WOMEN'S DEALS */}
        <div className="rounded-2xl bg-gradient-to-br from-pink-400 via-rose-400 to-rose-500 text-white p-5 flex flex-col justify-between h-48 relative overflow-hidden text-left group border border-pink-300 shadow-md">
          <div className="relative z-10 max-w-[150px]">
            <span className="text-[9px] font-black tracking-widest text-pink-100 uppercase block">WOMEN&apos;S DEALS</span>
            <h3 className="text-xs font-black uppercase text-white mt-1">UP TO</h3>
            <div className="mt-3">
              <span className="text-2xl font-black text-white block leading-none">40% OFF</span>
            </div>
            <button className="mt-5 bg-rose-800 hover:bg-rose-900 text-white text-[9px] font-black tracking-wider py-1.5 px-4 rounded-md transition-all active:scale-95 uppercase">
              SHOP WOMEN
            </button>
          </div>
          {/* Overlapping Women Model in Pink */}
          <img
            src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=300"
            alt="Women Model"
            className="w-26 h-40 object-cover object-top absolute right-1 bottom-0 z-5 group-hover:scale-103 duration-500 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Banner 4: KIDS' OFFERS */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white p-5 flex flex-col justify-between h-48 relative overflow-hidden text-left group border border-emerald-500 shadow-md">
          <div className="relative z-10 max-w-[150px]">
            <span className="text-[9px] font-black tracking-widest text-emerald-100 uppercase block">KIDS&apos; OFFERS</span>
            <h3 className="text-xs font-black uppercase text-white mt-1">UP TO</h3>
            <div className="mt-3">
              <span className="text-2xl font-black text-white block leading-none">35% OFF</span>
            </div>
            <button className="mt-5 bg-white text-emerald-800 hover:bg-emerald-50 text-[9px] font-black tracking-wider py-1.5 px-4 rounded-md transition-all active:scale-95 uppercase">
              SHOP KIDS
            </button>
          </div>
          {/* Overlapping Kids Model */}
          <img
            src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=300"
            alt="Kids Model"
            className="w-24 h-36 object-cover object-top absolute right-2 bottom-0 z-5 group-hover:scale-103 duration-500 transition-transform"
            referrerPolicy="no-referrer"
          />
        </div>

      </div>

      {/* 3. Horizontal Reassurance Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 select-none">
        <div className="bg-white rounded-xl border border-gray-150 p-4.5 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div className="flex items-center gap-3 px-1.5">
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Tag size={16} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Best Offers</h4>
              <p className="text-[9px] text-gray-400 font-bold mt-0.5">On top brands</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1.5 border-l border-gray-100 pl-4">
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Clock size={16} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Limited Time</h4>
              <p className="text-[9px] text-gray-400 font-bold mt-0.5">Hurry before it&apos;s gone</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1.5 border-l border-gray-100 pl-4">
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Percent size={15} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Great Discounts</h4>
              <p className="text-[9px] text-gray-400 font-bold mt-0.5">Save more on what you love</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1.5 border-l border-gray-100 pl-4">
            <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Truck size={17} className="stroke-[2.5]" />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-gray-800 uppercase tracking-wider">Fast Delivery</h4>
              <p className="text-[9px] text-gray-400 font-bold mt-0.5">Quick delivery at your doorstep</p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Split layout: Sidebar Filters & Catalog Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== LEFT COLUMN: SIDEBAR FILTERS ==================== */}
        <aside className="lg:col-span-1 space-y-7 text-left select-none pb-6 border-b lg:border-b-0 lg:border-r border-gray-150 lg:pr-8">
          
          {/* Categories Block */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              CATEGORIES
            </h3>
            <div className="space-y-3">
              {categoryOptions.map((cat) => {
                const isChecked = selectedCategories.includes(cat.id);
                return (
                  <div key={cat.id} className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleCategoryToggle(cat.id)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{cat.name}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">({cat.count})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Discount Range checkboxes exactly matching image */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              DISCOUNT
            </h3>
            <div className="space-y-3">
              {discountOptions.map((opt) => {
                const isChecked = selectedDiscounts.includes(opt.val);
                return (
                  <div key={opt.val} className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleDiscountToggle(opt.val)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{opt.name}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">({opt.count})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              PRICE
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="200"
                max="15000"
                step="200"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#08214d] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 font-mono">
                <span>Rs. 200</span>
                <span>Rs. {maxPrice === 15000 ? '15,000+' : maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Brands Block */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              BRAND
            </h3>
            <div className="space-y-3">
              {brandOptions.map((brand) => {
                const isChecked = selectedBrands.includes(brand.name);
                return (
                  <div key={brand.name} className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBrandToggle(brand.name)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{brand.name}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">({brand.count})</span>
                  </div>
                );
              })}
              <button className="text-xs font-bold text-[#08214d] flex items-center gap-1 hover:underline mt-2.5 cursor-pointer">
                <span>More</span>
                <ChevronDown size={12} className="stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Reset Filters trigger */}
          {(selectedCategories.length > 0 || selectedDiscounts.length > 0 || maxPrice < 15000 || selectedBrands.length > 0) && (
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black tracking-wider rounded-lg transition-colors cursor-pointer text-center"
            >
              CLEAR ALL FILTERS
            </button>
          )}

        </aside>

        {/* ==================== RIGHT COLUMN: PRODUCTS GRID ==================== */}
        <section className="lg:col-span-3">
          
          {/* Top Selection Row Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4.5 mb-6 border-b border-gray-150 select-none">
            
            <span className="text-xs text-gray-500 font-bold text-left">
              Showing 1–{sortedProducts.length} of {selectedCategories.length === 0 && selectedDiscounts.length === 0 && maxPrice === 15000 && selectedBrands.length === 0 ? '86' : sortedProducts.length} products
            </span>

            {/* Sorters Grid Toggler */}
            <div className="flex items-center justify-between sm:justify-end gap-3.5">
              
              <div className="relative text-xs">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 pl-4.5 pr-9 py-2.5 rounded-lg font-bold focus:outline-none focus:border-[#08214d] cursor-pointer"
                >
                  <option value="discount-high">Sort by: Discount High to Low</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Sort by: Newest</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <ChevronDown size={13} className="stroke-[2.5]" />
                </div>
              </div>

              {/* View Layout Switch buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#08214d] text-white border-[#08214d]'
                      : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="Grid View"
                >
                  <Grid size={14} className="stroke-[2.5]" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-[#08214d] text-white border-[#08214d]'
                      : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="List View"
                >
                  <List size={14} className="stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>

          {/* Empty warnings if nothing matches */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">🏷️</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching offer products</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn&apos;t find any discount matches in our active offers pool. Clear some sidebar filters to see more.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 bg-[#08214d] text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-[#1d4289] transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ==================== CATOLOG ITEMS (Grid or List Layouts) ==================== */}
          {viewMode === 'grid' ? (
            
            /* --- GRID VIEW --- */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 select-none text-left">
              {sortedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                // Calculate actual discount rate
                const pctOff = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

                return (
                  <div key={p.id} className="group flex flex-col h-full relative">
                    
                    {/* Image Box */}
                    <div className="aspect-[4/5] w-full rounded-lg bg-[#f9fafb] border border-gray-100 overflow-hidden relative">
                      
                      {/* Red Percentage tag badge exactly like mockup */}
                      <span className="absolute top-2.5 left-2.5 z-10 bg-[#ff3b30] text-white text-[10px] font-black px-2 py-0.5 rounded-sm">
                        -{pctOff}%
                      </span>

                      {/* Heart Save */}
                      <button
                        onClick={() => onToggleWishlist(p.id)}
                        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-xs hover:scale-110 active:scale-90 transition-all cursor-pointer ${
                          isWishlisted ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-[#ff2d55]'
                        }`}
                      >
                        <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                      </button>

                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Hover Controls Overlays */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenQuickView(p)}
                          className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          title="Quick View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onAddToCart(p, p.sizes[0] || 'One Size')}
                          className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          title="Add to Basket"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>

                    </div>

                    {/* Metadata Summary block */}
                    <div className="mt-3 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Brand category block */}
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                          {p.brand}
                        </span>
                        
                        {/* Title link trigger */}
                        <h4
                          onClick={() => handleOpenQuickView(p)}
                          className="text-xs font-black text-gray-850 hover:text-[#08214d] cursor-pointer mt-0.5 line-clamp-1 transition-colors leading-tight"
                        >
                          {p.name}
                        </h4>

                        {/* Stars */}
                        <div className="flex items-center gap-1 mt-1">
                          <div className="flex items-center text-amber-400">
                            <Star size={11} fill="currentColor" className="stroke-none" />
                            <Star size={11} fill="currentColor" className="stroke-none" />
                            <Star size={11} fill="currentColor" className="stroke-none" />
                            <Star size={11} fill="currentColor" className="stroke-none" />
                            <Star size={11} fill="currentColor" className="stroke-none" />
                          </div>
                          <span className="text-[9px] text-gray-400 font-bold font-mono">
                            ({reviewCounts[p.id] || 15})
                          </span>
                        </div>
                      </div>

                      {/* Pricing block layout */}
                      <div className="mt-2.5 pt-2 border-t border-gray-50 flex items-baseline gap-2">
                        <span className="text-xs font-black text-[#08214d] font-mono">
                          Rs. {p.price.toLocaleString()}
                        </span>
                        {p.originalPrice > p.price && (
                          <span className="text-[10px] text-gray-400 line-through font-bold font-mono">
                            Rs. {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* submission button */}
                      <button
                        onClick={() => onAddToCart(p, p.sizes[0] || 'One Size')}
                        className="mt-3.5 w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-[10px] font-black tracking-wider py-2 rounded-md transition-colors cursor-pointer"
                      >
                        ADD TO BASKET
                      </button>

                    </div>

                  </div>
                );
              })}
            </div>

          ) : (
            
            /* --- LIST VIEW --- */
            <div className="space-y-4 text-left select-none">
              {sortedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                const pctOff = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);

                return (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row items-center gap-5 border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow relative"
                  >
                    {/* Thumbnail box */}
                    <div className="w-full sm:w-36 aspect-square rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0 relative">
                      <span className="absolute top-2 left-2 z-10 bg-[#ff3b30] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs">
                        -{pctOff}%
                      </span>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata text details summary */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-black text-gray-850 mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed line-clamp-2">
                        {p.description}
                      </p>

                      {/* Stars review ratings */}
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <div className="flex items-center text-amber-400">
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono font-bold">
                          ({reviewCounts[p.id] || 12} reviews)
                        </span>
                      </div>

                      {/* sizes row */}
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="text-[9px] text-gray-400 font-black uppercase">Sizes:</span>
                        <div className="flex gap-1">
                          {p.sizes.map(s => (
                            <span key={s} className="bg-gray-50 text-gray-600 font-bold font-mono text-[9px] px-1.5 py-0.5 border border-gray-100 rounded-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Panel Buttons block */}
                    <div className="sm:border-l border-gray-100 sm:pl-5 flex flex-col items-stretch justify-center w-full sm:w-44 shrink-0">
                      <div className="text-left sm:text-right mb-3">
                        <span className="text-base font-black text-[#08214d] font-mono block">
                          Rs. {p.price.toLocaleString()}
                        </span>
                        {p.originalPrice > p.price && (
                          <span className="text-xs text-gray-400 line-through font-bold font-mono block">
                            Rs. {p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => onAddToCart(p, p.sizes[0] || 'One Size')}
                          className="flex-1 bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer text-center"
                        >
                          Add to Basket
                        </button>
                        <button
                          onClick={() => onToggleWishlist(p.id)}
                          className={`p-2.5 border rounded-lg transition-colors cursor-pointer ${
                            isWishlisted ? 'border-[#ff2d55] text-[#ff2d55] bg-[#ff2d55]/5' : 'border-gray-200 text-gray-400 hover:text-[#ff2d55] hover:bg-rose-50'
                          }`}
                        >
                          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          )}

          {/* ==================== UNDER-GRID DUAL CAMPAIGN PROMOTION BANNERS ==================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 select-none">
            
            {/* Banner Row A: CLEARANCE SALE UP TO 60% OFF */}
            <div className="bg-gradient-to-br from-[#0c1c38] via-[#0d2246] to-[#040c1c] text-white rounded-2xl border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden text-left h-52 shadow-md group">
              <div className="relative z-10 max-w-[190px]">
                <span className="text-[10px] font-black tracking-widest text-sky-400 uppercase block">CLEARANCE SALE</span>
                <h3 className="text-xl font-black uppercase text-white mt-1 leading-tight">UP TO 60% OFF</h3>
                <p className="text-[10px] text-gray-300 font-medium mt-1 leading-relaxed">ON SELECT TRENDY CLOTHING & SHOES</p>
                
                <button className="mt-4 bg-white text-[#0d2246] hover:bg-sky-50 text-[9px] font-black tracking-widest uppercase py-2 px-4.5 rounded-md shadow-sm transition-all active:scale-95">
                  SHOP CLEARANCE
                </button>
              </div>

              {/* Stacked overlapping visual products */}
              <div className="relative w-36 h-full flex items-center justify-center shrink-0 pointer-events-none">
                {/* Adidas Superstars */}
                <img
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=300"
                  alt="Sneakers"
                  className="w-22 h-16 rounded-lg object-cover border-2 border-white/15 shadow-md absolute translate-y-8 -translate-x-3 rotate-[-10deg] z-10"
                />
                {/* Folded Jacket */}
                <img
                  src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=300"
                  alt="Hoodie"
                  className="w-20 h-20 rounded-lg object-cover border-2 border-white/15 shadow-xl absolute -translate-y-8 translate-x-5 rotate-[12deg] z-5"
                />
              </div>
            </div>

            {/* Banner Row B: BANK & WALLET OFFERS 10% OFF */}
            <div className="bg-gradient-to-br from-[#121c2c] via-[#1a2c48] to-[#0c1420] text-white rounded-2xl border border-slate-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden text-left h-52 shadow-md group">
              <div className="relative z-10 max-w-[190px]">
                <span className="text-[10px] font-black tracking-widest text-emerald-400 uppercase block">BANK & WALLET OFFERS</span>
                <h3 className="text-xl font-black uppercase text-white mt-1 leading-tight">EXTRA 10% OFF</h3>
                <p className="text-[10px] text-gray-300 font-medium mt-1 leading-relaxed">ON ALL PREPAID ONLINE CARD TRANSACTIONS</p>
                
                <button className="mt-4 bg-white text-slate-900 hover:bg-slate-50 text-[9px] font-black tracking-widest uppercase py-2 px-4.5 rounded-md shadow-sm transition-all active:scale-95">
                  SHOP NOW
                </button>
              </div>

              {/* Overlapping Credit Cards and Wallet */}
              <div className="relative w-36 h-full flex items-center justify-center shrink-0 pointer-events-none">
                {/* Cards mockup overlapping */}
                <div className="w-22 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg border border-white/15 shadow-lg absolute -translate-y-5 -translate-x-6 rotate-[-15deg] z-5 flex items-end p-2 text-[6px] font-mono font-bold tracking-widest uppercase">
                  CREDIT CARD
                </div>
                {/* Leather Wallet */}
                <img
                  src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300"
                  alt="Wallet"
                  className="w-20 h-20 rounded-lg object-cover border border-white/15 shadow-xl absolute translate-y-7 translate-x-4 rotate-[15deg] z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

          {/* Core Simple Pagination row */}
          <div className="mt-12 pt-6 border-t border-gray-150 flex items-center justify-center gap-2 select-none">
            <button
              disabled
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-300 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={15} />
            </button>
            <button className="w-9 h-9 rounded-lg text-xs font-black font-mono bg-[#08214d] text-white">
              1
            </button>
            <button
              disabled
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-300 disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronRight size={15} />
            </button>
          </div>

        </section>

      </div>

      {/* ==================== PRODUCT QUICK VIEW MODAL ==================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300" 
              aria-hidden="true"
              onClick={() => setQuickViewProduct(null)}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-100 animate-zoom-in relative">
              
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-all z-20 cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={18} className="stroke-[2.5]" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Left Side: Photo Frame */}
                <div className="bg-[#f8f9fa] p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100">
                  <span className="absolute top-6 left-6 bg-[#ff3b30] text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider z-10 shadow-xs">
                    OFFER
                  </span>
                  <div className="aspect-square w-full max-w-sm rounded-xl overflow-hidden bg-white border border-gray-150/40 shadow-sm">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Side: Details Summary */}
                <div className="p-8 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[11px] font-black text-gray-400 tracking-widest uppercase block mb-1">
                      {quickViewProduct.brand} DEPARTMENT
                    </span>

                    <h2 className="text-xl sm:text-2xl font-black text-[#08214d] leading-tight">
                      {quickViewProduct.name}
                    </h2>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center text-amber-400">
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                      </div>
                      <span className="text-xs text-gray-400 font-bold font-mono">
                        ({reviewCounts[quickViewProduct.id] || 15} reviews)
                      </span>
                    </div>

                    {/* Pricing block with discounts */}
                    <div className="flex items-baseline gap-3.5 mt-4 mb-4 pb-4 border-b border-gray-100">
                      <span className="text-xl font-black text-[#08214d] font-mono">
                        Rs. {quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice > quickViewProduct.price && (
                        <span className="text-sm text-gray-400 line-through font-bold font-mono">
                          Rs. {quickViewProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-xs font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-xs uppercase">
                        -{Math.round(((quickViewProduct.originalPrice - quickViewProduct.price) / quickViewProduct.originalPrice) * 100)}% Off
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-wider mb-1.5">Description</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {quickViewProduct.description}
                      </p>
                    </div>

                    {/* Sizes Selection */}
                    <div className="mt-5">
                      <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-wider mb-2">Select Size</h4>
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.sizes.map((sz) => {
                          const isPicked = chosenSize === sz;
                          return (
                            <button
                              key={sz}
                              onClick={() => setChosenSize(sz)}
                              className={`h-9 px-4.5 border rounded-lg text-xs font-black tracking-wide transition-all cursor-pointer ${
                                isPicked 
                                  ? 'bg-[#08214d] text-white border-[#08214d] shadow-sm' 
                                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                              }`}
                            >
                              {sz}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Operation Buttons */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCartFromQuickView}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black tracking-widest uppercase py-3 px-6 rounded-lg shadow-md duration-200 transition-colors cursor-pointer text-center"
                      >
                        ADD TO BASKET
                      </button>
                      <button
                        onClick={() => {
                          onToggleWishlist(quickViewProduct.id);
                        }}
                        className={`px-4.5 border rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
                          wishlist.includes(quickViewProduct.id) 
                            ? 'border-[#ff2d55] text-[#ff2d55] bg-[#ff2d55]/5' 
                            : 'border-gray-200 text-gray-400 hover:text-[#ff2d55] hover:bg-rose-50'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart size={16} fill={wishlist.includes(quickViewProduct.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
