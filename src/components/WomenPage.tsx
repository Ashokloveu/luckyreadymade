import React, { useState, useMemo } from 'react';
import { Heart, Star, ShoppingCart, Eye, ChevronDown, Grid, List, ChevronLeft, ChevronRight, X, Shield, RefreshCw, Truck } from 'lucide-react';
import { Product } from '../types';

interface WomenPageProps {
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

// Exact list of 12 women's products shown in the image
const womenProducts: Product[] = [
  {
    id: 'women-p1',
    name: 'Ruffle Sleeve Top',
    price: 1499,
    originalPrice: 1499,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Zara',
    description: 'A gorgeous pink ruffle sleeve blouse designed with elegant light fabric. Features structured sleeve folds, a smart V-neck, and modern relaxed fitting.'
  },
  {
    id: 'women-p2',
    name: 'Floral Maxi Dress',
    price: 2199,
    originalPrice: 2599,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'H&M',
    description: 'Lovely long sleeve floral maxi dress crafted with lightweight organic cotton. Flowing fit with button-up front and a comfortable elasticized waistband.'
  },
  {
    id: 'women-p3',
    name: 'High Waist Jeans',
    price: 1999,
    originalPrice: 1999,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['26', '28', '30', '32'],
    inStock: true,
    brand: 'Only',
    description: 'Classic high-waisted denim jeans with a straight-leg cut. Stretchy, comfortable, and perfect for casual wear.'
  },
  {
    id: 'women-p4',
    name: 'Embroidered Kurti',
    price: 1349,
    originalPrice: 1499,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    brand: 'Vero Moda',
    description: 'Traditional yet modern ethnic kurti featuring detailed gold thread embroidery on a premium black cotton canvas.'
  },
  {
    id: 'women-p5',
    name: 'Crop Top',
    price: 899,
    originalPrice: 899,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    brand: 'Zara',
    description: 'Trendy short puff-sleeve crop top designed with custom ribbed fabric. Sweetheart neckline and secure fit.'
  },
  {
    id: 'women-p6',
    name: 'Bow Tie Blouse',
    price: 1279,
    originalPrice: 1599,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600',
    tags: ['-20%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'H&M',
    description: 'A crisp elegant white blouse with an adjustable neckline bow tie. Perfect for business casual or formal evenings.'
  },
  {
    id: 'women-p7',
    name: 'Oversized Hoodie',
    price: 1699,
    originalPrice: 1699,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Puma',
    description: 'Cozy and stylish pastel pink hoodie. Crafted from premium organic fleece with front kangaroo pocket.'
  },
  {
    id: 'women-p8',
    name: 'Pleated Midi Skirt',
    price: 1299,
    originalPrice: 1499,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Only',
    description: 'Elegant mid-calf black pleated skirt. Fluid movement with a comfortable wide elasticized waist band.'
  },
  {
    id: 'women-p9',
    name: 'Denim Jacket',
    price: 2299,
    originalPrice: 2299,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Vero Moda',
    description: 'Classic light-wash denim jacket for women. Perfect layered aesthetic with durable metallic button closures.'
  },
  {
    id: 'women-p10',
    name: 'Printed Kurta Set',
    price: 2699,
    originalPrice: 2999,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Zara',
    description: 'Beautiful ethnic suit set featuring floral print kurti paired with matching parallel trousers and sheer dupatta.'
  },
  {
    id: 'women-p11',
    name: 'Activewear Set',
    price: 1749,
    originalPrice: 1749,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    brand: 'Nike',
    description: 'Highly elastic supportive sports crop tank with matching seamless high-waist fitness leggings.'
  },
  {
    id: 'women-p12',
    name: 'Graphic T-Shirt',
    price: 699,
    originalPrice: 799,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600',
    tags: ['-12%'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Zara',
    description: 'Premium quality crew-neck graphic tee featuring classic "BELIEVE" typography on clean white combed cotton.'
  }
];

// Review counts matching the image exactly
const reviewCounts: Record<string, number> = {
  'women-p1': 12,
  'women-p2': 18,
  'women-p3': 24,
  'women-p4': 15,
  'women-p5': 10,
  'women-p6': 14,
  'women-p7': 20,
  'women-p8': 12,
  'women-p9': 11,
  'women-p10': 9,
  'women-p11': 16,
  'women-p12': 13,
};

export default function WomenPage({ onAddToCart, wishlist, onToggleWishlist }: WomenPageProps) {
  // Sidebar states
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

  // Women page static filter lists
  const categoryOptions = [
    { name: 'Tops', count: 18, match: 'Tops' },
    { name: 'T-Shirts', count: 16, match: 'T-Shirt' },
    { name: 'Dresses', count: 20, match: 'Dress' },
    { name: 'Kurtis & Tunics', count: 14, match: 'Kurti' },
    { name: 'Blouses', count: 12, match: 'Blouse' },
    { name: 'Jeans', count: 10, match: 'Jeans' },
    { name: 'Pants & Trousers', count: 8, match: 'Pants' },
    { name: 'Skirts', count: 6, match: 'Skirt' },
    { name: 'Jackets & Blazers', count: 6, match: 'Jacket' },
    { name: 'Ethnic Wear', count: 8, match: 'Kurta' },
    { name: 'Innerwear', count: 6, match: 'Innerwear' }
  ];

  const brandOptions = [
    { name: 'Zara', count: 16 },
    { name: 'H&M', count: 14 },
    { name: 'Only', count: 12 },
    { name: 'Vero Moda', count: 10 },
    { name: 'Puma', count: 8 },
    { name: 'Levi\'s', count: 8 },
    { name: 'Nike', count: 6 }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const colorOptions = [
    { name: 'Black', class: 'bg-black border border-black' },
    { name: 'Grey', class: 'bg-gray-400 border border-gray-400' },
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Navy Blue', class: 'bg-slate-900 border border-slate-900' },
    { name: 'Royal Blue', class: 'bg-blue-600 border border-blue-600' },
    { name: 'Red', class: 'bg-red-600 border border-red-600' },
    { name: 'Pink', class: 'bg-pink-400 border border-pink-400' },
    { name: 'Beige', class: 'bg-amber-100 border border-amber-200' },
    { name: 'Peach', class: 'bg-amber-200 border border-amber-200' },
    { name: 'Lavender', class: 'bg-purple-300 border border-purple-300' },
    { name: 'Yellow', class: 'bg-yellow-400 border border-yellow-400' }
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

  // Filter core logic
  const filteredProducts = useMemo(() => {
    return womenProducts.filter(product => {
      // 1. Category Filter
      if (selectedCategory) {
        const option = categoryOptions.find(o => o.name === selectedCategory);
        if (option && !product.name.toLowerCase().includes(option.match.toLowerCase()) && !product.brand.toLowerCase().includes(option.match.toLowerCase())) {
          // Fallback check category string matches
          if (product.category !== 'women') return false;
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
        if (!product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      // 5. Color Filter
      if (selectedColor) {
        if (selectedColor === 'Pink' && !['Ruffle', 'Hoodie', 'Kurta'].some(x => product.name.includes(x))) return false;
        if (selectedColor === 'White' && !['Bow', 'T-Shirt'].some(x => product.name.includes(x))) return false;
        if (selectedColor === 'Black' && !['Kurti', 'Skirt', 'Activewear'].some(x => product.name.includes(x))) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedBrands, maxPrice, selectedSize, selectedColor]);

  // Sorting logic
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
          <span className="text-gray-500 font-semibold">Women</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight mt-3">
          WOMEN
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
          Discover the latest trends in women&apos;s fashion.
        </p>
      </div>

      {/* 2. Main content split grid (Sidebar & Products) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== SIDEBAR FILTERS (Left Column) ==================== */}
        {/* Filter order exactly matching the women's page image: CATEGORIES, SIZE, COLOR, BRAND, PRICE */}
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

          {/* Size (Buttons grid) */}
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

          {/* Color (Dots) */}
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
                        col.name === 'White' || col.name === 'Peach' || col.name === 'Beige' || col.name === 'Yellow' ? 'text-gray-850' : 'text-white'
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

          {/* Reset Filters button */}
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
            {/* Dynamic count text matching style */}
            <span className="text-xs text-gray-500 font-medium text-left">
              Showing 1–{Math.min(12, sortedProducts.length)} of {sortedProducts.length === 12 ? '132' : sortedProducts.length} products
            </span>

            {/* Sorting controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3.5">
              
              {/* Dropdown menu */}
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

          {/* Empty search fallback */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">🔍</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching products</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn&apos;t find any products in our Women&apos;s department matching your active filters.
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
                    
                    {/* Image Box */}
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

                      {/* Hover action slide overlays */}
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

                    {/* Meta labels details */}
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

                      {/* Order buttons */}
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

                    {/* Metadata summary */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-black text-gray-800 mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-1.5 line-clamp-2">
                        {p.description || 'Premium-grade high quality women collection item designed for comfortable fashionable performance.'}
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

                    {/* Pricing checkout */}
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

            {/* Details Column */}
            <div className="p-6 md:p-8 flex-1 flex flex-col">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                {quickViewProduct.brand}
              </span>
              
              <h3 className="text-lg font-black text-gray-800 leading-tight mt-1.5">
                {quickViewProduct.name}
              </h3>

              {/* Rating stars */}
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

              {/* Pricing block */}
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

              {/* Description summary */}
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Select size */}
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

              {/* Badges row */}
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

              {/* Add directly to Cart */}
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
