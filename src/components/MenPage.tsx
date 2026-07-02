import React, { useState, useMemo } from 'react';
import { Heart, Star, ShoppingCart, Eye, ChevronDown, Grid, List, ChevronLeft, ChevronRight, X, Shield, RefreshCw, Truck } from 'lucide-react';
import { Product } from '../types';

interface MenPageProps {
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

// Exact list of 12 products shown in the image
const menProducts: Product[] = [
  {
    id: 'men-p1',
    name: 'Denim Jacket',
    price: 2799,
    originalPrice: 2799,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'A premium-cut men\'s denim jacket. Designed with reinforced stitching, traditional chest pockets, and a clean, comfortable regular fit.'
  },
  {
    id: 'men-p2',
    name: 'Oversized Hoodie',
    price: 1699,
    originalPrice: 1999,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Ultra-soft relaxed fit pullover hoodie crafted with heavyweight organic cotton fleece. Features drop shoulders and double-lined hood.'
  },
  {
    id: 'men-p3',
    name: 'Slim Fit Jeans',
    price: 2199,
    originalPrice: 2199,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    brand: 'Men',
    description: 'Classic five-pocket slim jeans crafted with premium stretch-denim for active comfort and daily versatile style.'
  },
  {
    id: 'men-p4',
    name: 'Casual Shirt',
    price: 1799,
    originalPrice: 1999,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'A crisp casual button-down shirt designed with breathable lightweight linen-cotton fabric. Tailored curved hem.'
  },
  {
    id: 'men-p5',
    name: 'Polo T-Shirt',
    price: 1349,
    originalPrice: 1349,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    inStock: true,
    brand: 'Men',
    description: 'Breathable pique-knit classic polo shirt with tipped collars, comfortable rib cuffs, and premium three-button placket.'
  },
  {
    id: 'men-p6',
    name: 'Track Pants',
    price: 999,
    originalPrice: 1249,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600',
    tags: ['-20%'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Athletic-fit jogger track pants with elasticized waistband, dynamic zip pockets, and comfortable tapered cuffs.'
  },
  {
    id: 'men-p7',
    name: 'Bomber Jacket',
    price: 2999,
    originalPrice: 2999,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Water-resistant nylon aviator bomber jacket featuring windproof construction, ribbed collar, and sleeve utility zip pockets.'
  },
  {
    id: 'men-p8',
    name: 'Printed T-Shirt',
    price: 799,
    originalPrice: 899,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
    tags: ['-12%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Crew-neck graphic printed t-shirt made with 100% fine combed cotton. Durable screenprint and premium texture.'
  },
  {
    id: 'men-p9',
    name: 'Adidas Retro Sneakers',
    price: 6499,
    originalPrice: 6499,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['7', '8', '9', '10'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'Authentic retro-inspired lifestyle sneakers with contrasting classic stripe patterns and a comfortable padded sole.'
  },
  {
    id: 'men-p10',
    name: 'Leather Belt',
    price: 849,
    originalPrice: 999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb80f0212?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Double-sided genuine leather belt featuring a solid metallic buckle and sleek burnished edges. Ideal for both formal and casual settings.'
  },
  {
    id: 'men-p11',
    name: 'Nike Revolution 7',
    price: 6999,
    originalPrice: 6999,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['8', '9', '10', '11'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'High-performance running shoe with upgraded lightweight cushioning and breathable knit panels for maximum speed and longevity.'
  },
  {
    id: 'men-p12',
    name: 'Casual Shorts',
    price: 1199,
    originalPrice: 1299,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Extremely comfortable drawcord shorts designed with heavy French-terry fleece fabric. Perfect for warm-weather relaxation.'
  }
];

// Review counts mapping to match the image exactly
const reviewCounts: Record<string, number> = {
  'men-p1': 12,
  'men-p2': 18,
  'men-p3': 24,
  'men-p4': 15,
  'men-p5': 11,
  'men-p6': 17,
  'men-p7': 10,
  'men-p8': 9,
  'men-p9': 20,
  'men-p10': 8,
  'men-p11': 16,
  'men-p12': 7,
};

export default function MenPage({ onAddToCart, wishlist, onToggleWishlist }: MenPageProps) {
  // Sidebar State Managers
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Sorting and view mode
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Quick view popup modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');

  // Static options with counts matching the image
  const categoryOptions = [
    { name: 'T-Shirts', count: 24, match: 'T-Shirt' },
    { name: 'Shirts', count: 20, match: 'Shirt' },
    { name: 'Polo T-Shirts', count: 18, match: 'Polo' },
    { name: 'Jeans', count: 16, match: 'Jeans' },
    { name: 'Jackets', count: 14, match: 'Jacket' },
    { name: 'Hoodies & Sweatshirts', count: 12, match: 'Hoodie' },
    { name: 'Shorts', count: 10, match: 'Shorts' },
    { name: 'Track Pants', count: 8, match: 'Track' },
    { name: 'Innerwear', count: 6, match: 'Innerwear' },
    { name: 'Suits & Blazers', count: 4, match: 'Suit' }
  ];

  const brandOptions = [
    { name: 'Adidas', count: 18 },
    { name: 'Nike', count: 16 },
    { name: 'Puma', count: 14 },
    { name: 'Reebok', count: 10 },
    { name: 'FILA', count: 8 },
    { name: 'Levi\'s', count: 8 },
    { name: 'Jockey', count: 6 }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const colorOptions = [
    { name: 'Black', class: 'bg-black border border-black' },
    { name: 'Grey', class: 'bg-gray-400 border border-gray-400' },
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Navy Blue', class: 'bg-slate-900 border border-slate-900' },
    { name: 'Royal Blue', class: 'bg-blue-600 border border-blue-600' },
    { name: 'Red', class: 'bg-red-600 border border-red-600' },
    { name: 'Green', class: 'bg-green-600 border border-green-600' },
    { name: 'Tan', class: 'bg-amber-800 border border-amber-800' },
    { name: 'Peach', class: 'bg-amber-200 border border-amber-200' },
    { name: 'Sky Blue', class: 'bg-sky-300 border border-sky-300' }
  ];

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName)
        ? prev.filter(b => b !== brandName)
        : [...prev, brandName]
    );
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedBrands([]);
    setMaxPrice(10000);
    setSelectedSize(null);
    setSelectedColor(null);
    setCurrentPage(1);
  };

  // Filter and Sort core calculations
  const filteredProducts = useMemo(() => {
    return menProducts.filter(product => {
      // 1. Category Filter
      if (selectedCategory) {
        const option = categoryOptions.find(o => o.name === selectedCategory);
        if (option && !product.name.toLowerCase().includes(option.match.toLowerCase())) {
          return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some(brand => 
          product.name.toLowerCase().includes(brand.toLowerCase()) || 
          product.brand.toLowerCase().includes(brand.toLowerCase())
        );
        if (!matchesBrand) return false;
      }

      // 3. Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Size Filter
      if (selectedSize && product.sizes) {
        if (!product.sizes.includes(selectedSize) && selectedSize !== 'One Size') {
          return false;
        }
      }

      // 5. Color Filter (Just simple mockup metadata filtering)
      if (selectedColor) {
        if (selectedColor === 'Black' && !['Denim', 'Hoodie', 'Track', 'Bomber'].some(x => product.name.includes(x))) return false;
        if (selectedColor === 'White' && !['Printed', 'Sneakers', 'Shirt'].some(x => product.name.includes(x))) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedBrands, maxPrice, selectedSize, selectedColor]);

  // Sorting options
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
    setChosenSize(p.sizes[0] || 'M');
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
          <span className="text-gray-500 font-semibold">Men</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight mt-3">
          MEN
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
          Explore our latest collection of men&apos;s fashion.
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

          {/* Price Range Filter */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              PRICE
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="500"
                max="10000"
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
                <span>Rs. {maxPrice === 10000 ? '10,000+' : maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Size grid selection */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              SIZE
            </h3>
            <div className="grid grid-cols-4 gap-2">
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

          {/* Color circular selections */}
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
                        col.name === 'White' || col.name === 'Peach' || col.name === 'Sky Blue' ? 'text-gray-800' : 'text-white'
                      }`}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <button className="text-xs font-bold text-gray-400 hover:text-gray-700 mt-3 block">
              + More
            </button>
          </div>

          {/* Reset Filters Option */}
          {(selectedCategory || selectedBrands.length > 0 || maxPrice < 10000 || selectedSize || selectedColor) && (
            <button
              onClick={resetAllFilters}
              className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-lg transition-colors text-center"
            >
              CLEAR ALL FILTERS
            </button>
          )}

        </aside>

        {/* ==================== PRODUCTS LISTING & GRID (Right Column) ==================== */}
        <section className="lg:col-span-3">
          
          {/* Top Controls Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4.5 mb-6 border-b border-gray-100">
            {/* Counts */}
            <span className="text-xs text-gray-500 font-medium text-left">
              Showing 1–{Math.min(12, sortedProducts.length)} of {sortedProducts.length} products
            </span>

            {/* Sorting and layouts wrapper */}
            <div className="flex items-center justify-between sm:justify-end gap-3.5">
              
              {/* Custom Selector Dropdown */}
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

              {/* Grid / List controls matching the image style */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg border transition-all ${
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
                  className={`p-2.5 rounded-lg border transition-all ${
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

          {/* Empty filtered list message */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">🔍</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching products</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn&apos;t find any products in our Men&apos;s department matching your active filter criteria.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-5 bg-[#08214d] text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-[#1d4289] transition-all"
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
                const isRedTag = tag && (tag.startsWith('-') || tag.includes('%'));

                return (
                  <div key={p.id} className="group flex flex-col h-full text-left relative select-none">
                    
                    {/* Image Area */}
                    <div className="aspect-square w-full rounded-lg bg-[#f9fafb] border border-gray-100 overflow-hidden relative">
                      
                      {/* Brand Label Top Center/Left */}
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
                        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/95 shadow-sm hover:scale-110 active:scale-90 transition-all ${
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

                      {/* Quick hover overlay triggers */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenQuickView(p)}
                          className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                          title="View product details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onAddToCart(p, p.sizes[0] || 'M')}
                          className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                          title="Instant Add to cart"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>

                    </div>

                    {/* Information detail block */}
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

                      {/* Ratings stars */}
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

                      {/* Pricing block */}
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

                      {/* Add directly to Cart action */}
                      <button
                        onClick={() => onAddToCart(p, p.sizes[0] || 'M')}
                        className="mt-3.5 w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-[10px] font-black tracking-wider py-2 rounded-md transition-colors"
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
                const isRedTag = tag && (tag.startsWith('-') || tag.includes('%'));

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

                    {/* Meta detail */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-black text-gray-800 mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-1.5 line-clamp-2">
                        {p.description || 'Premium-grade high quality selection item designed for daily stylish performance.'}
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

                      {/* Sizes badges */}
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

                    {/* Pricing & checkout actions */}
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
                          onClick={() => onAddToCart(p, p.sizes[0] || 'M')}
                          className="flex-1 bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
                        >
                          Add to Basket
                        </button>
                        <button
                          onClick={() => onToggleWishlist(p.id)}
                          className={`p-2.5 border rounded-lg transition-colors ${
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
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => setCurrentPage(1)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === 1
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                1
              </button>

              <button
                onClick={() => setCurrentPage(2)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === 2
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                2
              </button>

              <button
                onClick={() => setCurrentPage(3)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === 3
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                3
              </button>

              <button
                onClick={() => setCurrentPage(4)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === 4
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                4
              </button>

              <button
                onClick={() => setCurrentPage(5)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === 5
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                5
              </button>

              <button
                onClick={() => setCurrentPage(6)}
                className={`w-9 h-9 rounded-lg text-xs font-bold font-mono transition-colors ${
                  currentPage === 6
                    ? 'bg-[#08214d] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                6
              </button>

              <button
                disabled={currentPage === 6}
                onClick={() => setCurrentPage(prev => Math.min(6, prev + 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={15} />
              </button>

            </div>
          )}

        </section>

      </div>

      {/* ==================== INDIVIDUAL QUICK VIEW DIALOG OVERLAY ==================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in select-none">
          <div onClick={() => setQuickViewProduct(null)} className="absolute inset-0 cursor-pointer" />
          
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto relative shadow-2xl border border-gray-100 z-10 text-left flex flex-col md:flex-row">
            
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full z-20 cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Image Column */}
            <div className="w-full md:w-1/2 bg-gray-50 relative aspect-square md:aspect-auto">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {quickViewProduct.price < quickViewProduct.originalPrice && (
                <div className="absolute top-4 left-4 bg-[#ff3b30] text-white text-[10px] font-black px-2.5 py-1 rounded-sm shadow-xs tracking-wider uppercase">
                  Off Coupon Active
                </div>
              )}
            </div>

            {/* Details Content Column */}
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                {quickViewProduct.brand}
              </span>
              
              <h3 className="text-lg font-black text-gray-800 leading-tight mt-1.5">
                {quickViewProduct.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex items-center text-amber-400">
                  <Star size={11} fill="currentColor" className="stroke-none" />
                  <Star size={11} fill="currentColor" className="stroke-none" />
                  <Star size={11} fill="currentColor" className="stroke-none" />
                  <Star size={11} fill="currentColor" className="stroke-none" />
                  <Star size={11} fill="currentColor" className="stroke-none" />
                </div>
                <span className="text-[10px] text-gray-500 font-bold font-mono">
                  {quickViewProduct.rating} / 5.0
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-2.5 mt-4">
                <span className="text-lg font-black text-[#08214d] font-mono">
                  Rs. {quickViewProduct.price.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-xs text-gray-400 line-through font-bold font-mono">
                    Rs. {quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Sizes Selector */}
              {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                <div className="mt-5">
                  <span className="block text-[10px] font-black text-gray-700 uppercase tracking-wider">
                    Select Apparel Size:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setChosenSize(sz)}
                        className={`min-w-[34px] h-8 text-[11px] font-bold rounded-md transition-all border ${
                          chosenSize === sz
                            ? 'bg-[#08214d] text-white border-[#08214d]'
                            : 'bg-white text-gray-650 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust markers */}
              <div className="grid grid-cols-3 gap-2 border-y border-gray-100 py-3.5 mt-6.5 text-center">
                <div className="flex flex-col items-center">
                  <Shield size={14} className="text-[#08214d]" />
                  <span className="text-[8px] font-black text-gray-400 uppercase mt-1">100% Original</span>
                </div>
                <div className="flex flex-col items-center">
                  <RefreshCw size={14} className="text-emerald-500" />
                  <span className="text-[8px] font-black text-gray-400 uppercase mt-1">7 Days Returns</span>
                </div>
                <div className="flex flex-col items-center">
                  <Truck size={14} className="text-sky-500" />
                  <span className="text-[8px] font-black text-gray-400 uppercase mt-1">Fast Delivery</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                onClick={handleAddToCartWithSelectedSize}
                className="mt-6 w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingCart size={13} />
                <span>ADD ITEM TO CART</span>
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
