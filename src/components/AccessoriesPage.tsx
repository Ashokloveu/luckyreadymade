import React, { useState, useMemo } from 'react';
import { Heart, Star, ShoppingCart, Eye, ChevronDown, Grid, List, ChevronLeft, ChevronRight, X, Shield, RefreshCw, Truck } from 'lucide-react';
import { Product } from '../types';

interface AccessoriesPageProps {
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

// Exactly 16 accessories items matching the reference pattern
const accessoriesProducts: Product[] = [
  {
    id: 'acc-p1',
    name: 'Ray-Ban Aviator Classic',
    price: 8499,
    originalPrice: 9999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Sunglasses',
    description: 'Iconic Ray-Ban Aviator Classic sunglasses. Originally designed for U.S. aviators in 1937, featuring high-quality gold-toned wire frames and protective G-15 polarized lenses.'
  },
  {
    id: 'acc-p2',
    name: 'Fossil Minimalist Watch',
    price: 11999,
    originalPrice: 11999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Watches',
    description: 'Sleek and slim Fossil watch featuring a minimalist charcoal sunray dial, high-quality stainless steel case, and premium dark brown leather strap.'
  },
  {
    id: 'acc-p3',
    name: 'Levi\'s Classic Leather Belt',
    price: 1999,
    originalPrice: 2499,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    tags: ['-20%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Belts',
    description: 'Crafted from 100% genuine full-grain leather, this Levi\'s belt features a heavy-duty gunmetal harness buckle with engraved logo detailing.'
  },
  {
    id: 'acc-p4',
    name: 'Gucci Marmont Wallet',
    price: 24999,
    originalPrice: 24999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=600',
    tags: ['PREMIUM'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Wallets',
    description: 'Exquisite GG Marmont leather card case wallet. Crafted in matelassé chevron leather with double G gold-toned hardware.'
  },
  {
    id: 'acc-p5',
    name: 'Casio G-Shock Classic',
    price: 7999,
    originalPrice: 8999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600',
    tags: ['-11%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Watches',
    description: 'The ultimate tough watch. Featuring shock resistance, 200m water resistance, world time, stopwatch, and auto-LED backlight.'
  },
  {
    id: 'acc-p6',
    name: 'Nike Club Swoosh Cap',
    price: 1499,
    originalPrice: 1499,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['Adjustable'],
    inStock: true,
    brand: 'Caps & Beanies',
    description: 'Classic mid-depth structured cap with Nike AeroBill technology to wick sweat away. Finished with a clean metallic swoosh.'
  },
  {
    id: 'acc-p7',
    name: 'Tommy Hilfiger Passcase Wallet',
    price: 3499,
    originalPrice: 3999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
    tags: ['-12%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Wallets',
    description: 'Classic passcase wallet with a removable card holder insert. Features the iconic Tommy Hilfiger red-white-blue ribbon inlay.'
  },
  {
    id: 'acc-p8',
    name: 'Hermes Silk Scarf',
    price: 15999,
    originalPrice: 18999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Socks & Scarves',
    description: 'Luxurious silk scarf hand-rolled and printed with exquisite traditional equine and paisley patterns. Adds timeless grace to any ensemble.'
  },
  {
    id: 'acc-p9',
    name: 'Adidas Crew Socks (3-Pack)',
    price: 899,
    originalPrice: 899,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['M', 'L'],
    inStock: true,
    brand: 'Socks & Scarves',
    description: 'Padded everyday crew socks featuring the legendary 3-stripe cuff and ribbed construction for ultimate arch support.'
  },
  {
    id: 'acc-p10',
    name: 'Michael Kors Ritz Watch',
    price: 14999,
    originalPrice: 16999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600',
    tags: ['-11%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Watches',
    description: 'Glitz-trimmed Ritz stainless steel watch featuring a rose gold sunray dial, pave crystal bezels, and a chic 3-link metal bracelet.'
  },
  {
    id: 'acc-p11',
    name: 'Puma Winter Beanie',
    price: 1199,
    originalPrice: 1199,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Caps & Beanies',
    description: 'Warm knit fold-over beanie with classic Puma Cat embroidery on the front cuff. Snug-fit stretch acrylic keeps cold winds at bay.'
  },
  {
    id: 'acc-p12',
    name: 'Oakley Holbrook Sunglasses',
    price: 9499,
    originalPrice: 10999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
    tags: ['-13%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Sunglasses',
    description: 'Timeless, classic design fused with modern Oakley technology. Inspired by the screen heroes from the 1940s, 50s, and 60s.'
  },
  {
    id: 'acc-p13',
    name: 'Secrid Card Protector Wallet',
    price: 4999,
    originalPrice: 4999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Wallets',
    description: 'The most minimal card protector wallet. Lever mechanism slides cards out in a tiered stack. RFID safe aluminum chamber prevents scans.'
  },
  {
    id: 'acc-p14',
    name: 'Saddle Leather Key Fob',
    price: 699,
    originalPrice: 999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600',
    tags: ['-30%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Keychains & More',
    description: 'Premium thick saddle leather strap fitted with a solid brass spring clip and key loop. Handmade with high-contrast edge stitching.'
  },
  {
    id: 'acc-p15',
    name: 'Sterling Silver Pearl Earrings',
    price: 5499,
    originalPrice: 5499,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    tags: ['ELEGANT'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Jewelry',
    description: 'Gorgeous classic freshwater pearl studs mounted on solid sterling silver posts. Elegant and lightweight for everyday brilliance.'
  },
  {
    id: 'acc-p16',
    name: 'Fitbit Charge 6 Smartband',
    price: 16999,
    originalPrice: 18999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Watches',
    description: 'Advanced fitness and health tracker with built-in GPS, active zone minutes, 24/7 heart rate monitoring, and vibrant color touchscreen display.'
  }
];

// Exact review numbers to make layout lively and authentic
const reviewCounts: Record<string, number> = {
  'acc-p1': 32,
  'acc-p2': 18,
  'acc-p3': 41,
  'acc-p4': 14,
  'acc-p5': 29,
  'acc-p6': 22,
  'acc-p7': 27,
  'acc-p8': 9,
  'acc-p9': 48,
  'acc-p10': 15,
  'acc-p11': 19,
  'acc-p12': 25,
  'acc-p13': 33,
  'acc-p14': 8,
  'acc-p15': 12,
  'acc-p16': 54
};

export default function AccessoriesPage({ onAddToCart, wishlist, onToggleWishlist }: AccessoriesPageProps) {
  // Sidebar State Managers
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Sorting and view modes
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Quick view popup states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');

  // Sidebar mock lists with precise counts
  const categoryOptions = [
    { name: 'Watches', count: 48, match: 'Watches' },
    { name: 'Sunglasses', count: 32, match: 'Sunglasses' },
    { name: 'Wallets', count: 28, match: 'Wallets' },
    { name: 'Belts', count: 18, match: 'Belts' },
    { name: 'Caps & Beanies', count: 24, match: 'Caps' },
    { name: 'Socks & Scarves', count: 15, match: 'Socks' },
    { name: 'Jewelry', count: 12, match: 'Jewelry' },
    { name: 'Keychains & More', count: 10, match: 'Keychains' }
  ];

  const brandOptions = [
    { name: 'Ray-Ban', count: 18 },
    { name: 'Fossil', count: 15 },
    { name: 'Nike', count: 24 },
    { name: 'Adidas', count: 20 },
    { name: 'Casio', count: 12 },
    { name: 'Puma', count: 14 },
    { name: 'Levi\'s', count: 10 },
    { name: 'Tommy Hilfiger', count: 9 }
  ];

  const sizeOptions = ['One Size', 'Adjustable', 'S', 'M', 'L', 'XL'];

  const genderOptions = [
    { name: 'Men', match: 'men' },
    { name: 'Women', match: 'women' },
    { name: 'Kids', match: 'kids' },
    { name: 'Unisex', match: 'unisex' }
  ];

  const colorOptions = [
    { name: 'Black', class: 'bg-black border border-black' },
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Grey', class: 'bg-gray-400 border border-gray-400' },
    { name: 'Navy Blue', class: 'bg-slate-900 border border-slate-900' },
    { name: 'Red', class: 'bg-red-600 border border-red-600' },
    { name: 'Gold', class: 'bg-amber-400 border border-amber-500' },
    { name: 'Silver', class: 'bg-gray-300 border border-gray-400' },
    { name: 'Brown', class: 'bg-amber-800 border border-amber-800' }
  ];

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
    setCurrentPage(1);
  };

  const handleGenderToggle = (genderName: string) => {
    setSelectedGenders(prev =>
      prev.includes(genderName) ? prev.filter(g => g !== genderName) : [...prev, genderName]
    );
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrands([]);
    setMaxPrice(25000);
    setSelectedSize(null);
    setSelectedGenders([]);
    setSelectedColor(null);
    setCurrentPage(1);
  };

  // Filter core calculations
  const filteredProducts = useMemo(() => {
    return accessoriesProducts.filter(product => {
      // 1. Category Filter
      if (selectedCategory) {
        const option = categoryOptions.find(o => o.name === selectedCategory);
        if (option) {
          const catTerm = option.match.toLowerCase();
          const matchesCategory = product.brand.toLowerCase().includes(catTerm) || 
                                  product.name.toLowerCase().includes(catTerm) ||
                                  product.description?.toLowerCase().includes(catTerm);
          if (!matchesCategory) return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some(brand => 
          product.name.toLowerCase().includes(brand.toLowerCase()) || 
          product.brand.toLowerCase().includes(brand.toLowerCase()) ||
          product.description?.toLowerCase().includes(brand.toLowerCase())
        );
        if (!matchesBrand) return false;
      }

      // 3. Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Size Filter
      if (selectedSize && product.sizes) {
        if (!product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      // 5. Gender Filter
      if (selectedGenders.length > 0) {
        const matchesGender = selectedGenders.some(gen => {
          const genTerm = gen.toLowerCase();
          if (genTerm === 'unisex') {
            return product.sizes.includes('One Size') || product.sizes.includes('Adjustable');
          }
          return product.description?.toLowerCase().includes(genTerm) || 
                 product.name.toLowerCase().includes(genTerm);
        });
        if (!matchesGender) return false;
      }

      // 6. Color Filter
      if (selectedColor) {
        const colTerm = selectedColor.toLowerCase();
        const matchesColor = product.name.toLowerCase().includes(colTerm) || 
                             product.description?.toLowerCase().includes(colTerm);
        if (!matchesColor) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedBrands, maxPrice, selectedSize, selectedGenders, selectedColor]);

  // Sorting calculations
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const handleOpenQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setChosenSize(p.sizes[0] || 'One Size');
  };

  const handleAddToCartWithSelectedSize = () => {
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
          <span className="text-gray-500 font-semibold">Accessories</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight mt-3">
          ACCESSORIES
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
          Elevate your daily looks with premium watches, sunglasses, belts and luxury accessories.
        </p>
      </div>

      {/* 2. Main content split grid (Sidebar & Products) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== SIDEBAR FILTERS (Left Column) ==================== */}
        <aside className="lg:col-span-1 space-y-7 text-left select-none pb-6 border-b lg:border-b-0 lg:border-r border-gray-100 lg:pr-8">
          
          {/* Categories */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              CATEGORIES
            </h3>
            <div className="space-y-2.5">
              {categoryOptions.map((opt) => {
                const isActive = selectedCategory === opt.name;
                return (
                  <button
                    key={opt.name}
                    onClick={() => {
                      setSelectedCategory(isActive ? null : opt.name);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between text-xs transition-colors py-0.5 ${
                      isActive 
                        ? 'text-[#08214d] font-black' 
                        : 'text-gray-600 hover:text-[#08214d] font-medium'
                    }`}
                  >
                    <span>{opt.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">({opt.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              BRAND
            </h3>
            <div className="space-y-2.5">
              {brandOptions.map((brand) => {
                const isChecked = selectedBrands.includes(brand.name);
                return (
                  <div key={brand.name} className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBrandToggle(brand.name)}
                        className="w-4 h-4 rounded-sm border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{brand.name}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">({brand.count})</span>
                  </div>
                );
              })}
              
              <button className="text-xs font-bold text-[#08214d] flex items-center gap-1 hover:underline mt-2">
                <span>More</span>
                <ChevronDown size={12} className="stroke-[3]" />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              PRICE
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="500"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#08214d] cursor-pointer"
              />
              
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 font-mono">
                <span>Rs. 500</span>
                <span>Rs. {maxPrice === 25000 ? '25,000+' : maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              SIZE
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {sizeOptions.map((sz) => {
                const isActive = selectedSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => {
                      setSelectedSize(isActive ? null : sz);
                      setCurrentPage(1);
                    }}
                    className={`h-9 border rounded-md text-xs font-bold transition-all ${
                      isActive 
                        ? 'bg-[#08214d] text-white border-[#08214d]' 
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gender */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              GENDER
            </h3>
            <div className="space-y-2.5">
              {genderOptions.map((opt) => {
                const isChecked = selectedGenders.includes(opt.name);
                return (
                  <div key={opt.name} className="flex items-center text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleGenderToggle(opt.name)}
                        className="w-4 h-4 rounded-sm border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{opt.name}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              COLOR
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {colorOptions.map((col) => {
                const isActive = selectedColor === col.name;
                return (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(isActive ? null : col.name);
                      setCurrentPage(1);
                    }}
                    className={`w-6 h-6 rounded-full cursor-pointer transition-transform relative ${col.class} ${
                      isActive ? 'scale-115 ring-2 ring-offset-2 ring-[#08214d]' : 'hover:scale-105'
                    }`}
                    title={col.name}
                  >
                    {isActive && (
                      <span className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold ${
                        col.name === 'White' || col.name === 'Gold' || col.name === 'Silver' ? 'text-gray-800' : 'text-white'
                      }`}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Filters button */}
          {(selectedCategory || selectedBrands.length > 0 || maxPrice < 25000 || selectedSize || selectedGenders.length > 0 || selectedColor) && (
            <button
              onClick={resetAllFilters}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors text-center cursor-pointer"
            >
              CLEAR ALL FILTERS
            </button>
          )}

        </aside>

        {/* ==================== PRODUCTS LISTING & GRID (Right Column) ==================== */}
        <section className="lg:col-span-3">
          
          {/* Top Controls Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4.5 mb-6 border-b border-gray-100">
            {/* Dynamic count */}
            <span className="text-xs text-gray-500 font-medium text-left">
              Showing 1–{Math.min(16, sortedProducts.length)} of {sortedProducts.length} products
            </span>

            {/* Sorting controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3.5">
              
              {/* Dropdown Menu */}
              <div className="relative inline-block text-left text-xs">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 pl-4.5 pr-9 py-2.5 rounded-lg font-bold focus:outline-hidden focus:border-[#08214d] cursor-pointer"
                >
                  <option value="newest">Sort by: Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="alphabetical">Sort Alphabetically</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <ChevronDown size={13} className="stroke-[2.5]" />
                </div>
              </div>

              {/* View Layout Switcher (Grid/List) */}
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

          {/* Empty filters warning */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">🔍</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching products</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn&apos;t find any products in our Accessories department matching your active filter choices.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-5 bg-[#08214d] text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-[#1d4289] transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* ==================== VIEW MODES (Grid or List) ==================== */}
          {viewMode === 'grid' ? (
            
            /* --- GRID MODE --- */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
              {sortedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                const tag = p.tags?.[0];
                const isRedTag = tag && (tag.startsWith('-') || tag.includes('%') || tag === 'PREMIUM');

                return (
                  <div key={p.id} className="group flex flex-col h-full text-left relative select-none">
                    
                    {/* Image Area */}
                    <div className="aspect-square w-full rounded-lg bg-[#f9fafb] border border-gray-100 overflow-hidden relative">
                      
                      {/* Tag Label */}
                      {tag && (
                        <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-black px-2 py-0.5 rounded-sm tracking-wide ${
                          isRedTag ? 'bg-[#ff3b30] text-white' : 'bg-[#08214d] text-white'
                        }`}>
                          {tag}
                        </span>
                      )}

                      {/* Heart Save */}
                      <button
                        onClick={() => onToggleWishlist(p.id)}
                        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/95 shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer ${
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

                      {/* Hover details triggers */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenQuickView(p)}
                          className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          title="View product details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onAddToCart(p, p.sizes[0] || 'One Size')}
                          className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          title="Instant Add to cart"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>

                    </div>

                    {/* Metadata block labels */}
                    <div className="mt-3.5 flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">
                        {p.brand}
                      </span>
                      
                      <h4
                        onClick={() => handleOpenQuickView(p)}
                        className="text-xs font-black text-gray-850 hover:text-[#08214d] cursor-pointer mt-0.5 line-clamp-1 transition-colors leading-tight"
                      >
                        {p.name}
                      </h4>

                      {/* Stars review */}
                      <div className="flex items-center gap-1 mt-1.5">
                        <div className="flex items-center text-amber-400">
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                        </div>
                        <span className="text-[9px] text-gray-400 font-bold font-mono">
                          ({reviewCounts[p.id] || 10})
                        </span>
                      </div>

                      {/* Pricing */}
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

                      {/* Submission button */}
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
            
            /* --- LIST MODE --- */
            <div className="space-y-4">
              {sortedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                const tag = p.tags?.[0];
                const isRedTag = tag && (tag.startsWith('-') || tag.includes('%') || tag === 'PREMIUM');

                return (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row items-center gap-5 border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow text-left select-none relative"
                  >
                    {/* Thumbnail */}
                    <div className="w-full sm:w-36 aspect-square rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0 relative">
                      {tag && (
                        <span className={`absolute top-2 left-2 z-10 text-[9px] font-black px-1.5 py-0.5 rounded-xs ${
                          isRedTag ? 'bg-[#ff3b30] text-white' : 'bg-[#08214d] text-white'
                        }`}>
                          {tag}
                        </span>
                      )}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata summary */}
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-black text-gray-850 mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-1.5 line-clamp-2 leading-relaxed">
                        {p.description || 'Premium high performance accessory items engineered with elegant look and durable material.'}
                      </p>

                      {/* Stars review */}
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <div className="flex items-center text-amber-400">
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                          <Star size={11} fill="currentColor" className="stroke-none" />
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono font-bold">
                          ({reviewCounts[p.id] || 12} customer reviews)
                        </span>
                      </div>

                      {/* Sizes list */}
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

                    {/* Action buttons */}
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

          {/* ==================== RESILIENT PAGINATION ==================== */}
          {sortedProducts.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 select-none">
              
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors cursor-pointer ${
                  currentPage === 1
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                1
              </button>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.min(1, prev + 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronRight size={15} />
              </button>

            </div>
          )}

        </section>

      </div>

      {/* ==================== DETAILED PRODUCT QUICK VIEW MODAL ==================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            {/* Modal background overlay */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300" 
              aria-hidden="true"
              onClick={() => setQuickViewProduct(null)}
            ></div>

            {/* Trick to center the modal content */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal Body */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-100 animate-zoom-in">
              
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-all z-20 cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={18} className="stroke-[2.5]" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Left Side: Dynamic Gallery Display */}
                <div className="bg-[#f8f9fa] p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100">
                  {quickViewProduct.tags?.[0] && (
                    <span className="absolute top-6 left-6 bg-[#08214d] text-white text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider z-10 shadow-xs">
                      {quickViewProduct.tags[0]}
                    </span>
                  )}
                  <div className="aspect-square w-full max-w-sm rounded-xl overflow-hidden bg-white border border-gray-150/40 shadow-sm">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Right Side: Information Block */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    {/* Brand */}
                    <span className="text-[11px] font-black text-gray-400 tracking-widest uppercase block mb-1">
                      {quickViewProduct.brand}
                    </span>

                    {/* Product Name */}
                    <h2 className="text-xl sm:text-2xl font-black text-[#08214d] leading-tight">
                      {quickViewProduct.name}
                    </h2>

                    {/* Ratings */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center text-amber-400">
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                        <Star size={13} fill="currentColor" className="stroke-none" />
                      </div>
                      <span className="text-xs text-gray-400 font-bold font-mono">
                        ({reviewCounts[quickViewProduct.id] || 15} customer reviews)
                      </span>
                    </div>

                    {/* Prices */}
                    <div className="flex items-baseline gap-3 mt-4 mb-4 pb-4 border-b border-gray-100">
                      <span className="text-xl font-black text-[#08214d] font-mono">
                        Rs. {quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice > quickViewProduct.price && (
                        <span className="text-sm text-gray-400 line-through font-bold font-mono">
                          Rs. {quickViewProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Description Text */}
                    <div className="mt-4">
                      <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-wider mb-1.5">Description</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {quickViewProduct.description}
                      </p>
                    </div>

                    {/* Interactive Sizes Selection */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Select Size</h4>
                        <span className="text-[10px] text-gray-400 font-bold underline cursor-pointer hover:text-gray-600">Size Guide</span>
                      </div>
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

                  {/* Operational Controls & Guarantee */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCartWithSelectedSize}
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

                    {/* Mini reassurance badges */}
                    <div className="grid grid-cols-3 gap-2 mt-5 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Shield size={12} className="text-emerald-500" />
                        <span>Genuine</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <RefreshCw size={11} className="text-emerald-500" />
                        <span>7 Days Return</span>
                      </div>
                      <div className="flex items-center gap-1 col-span-1">
                        <Truck size={12} className="text-emerald-500" />
                        <span>Fast Delivery</span>
                      </div>
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
