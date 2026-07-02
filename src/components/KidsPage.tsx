import React, { useState, useMemo } from 'react';
import { Heart, Star, ShoppingCart, Eye, ChevronDown, Grid, List, ChevronLeft, ChevronRight, X, Shield, RefreshCw, Truck } from 'lucide-react';
import { Product } from '../types';

interface KidsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

// Exact list of 12 kids' products shown in the reference image
const kidsProducts: Product[] = [
  {
    id: 'kids-p1',
    name: 'Boys Polo T-Shirt',
    price: 899,
    originalPrice: 899,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Boys Clothing',
    description: 'Smart and sporty kids colorblock polo shirt. Made with high-quality, breathable cotton-pique knit fabric featuring classic ribbed collar and sleeve cuffs.'
  },
  {
    id: 'kids-p2',
    name: 'Girls Cotton Dress',
    price: 1299,
    originalPrice: 1529,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Girls Clothing',
    description: 'Lovely and comfortable pink ruffle summer dress for girls. Crafted from 100% organic soft cotton, featuring a tiered flowy hem and cute puff sleeves.'
  },
  {
    id: 'kids-p3',
    name: 'Boys Graphic T-Shirt',
    price: 799,
    originalPrice: 799,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    inStock: true,
    brand: 'Boys Clothing',
    description: 'Fun and vibrant green kids crewneck graphic t-shirt. Extremely soft pre-shrunk cotton ensures comfortable wear all day long.'
  },
  {
    id: 'kids-p4',
    name: 'Kids Backpack',
    price: 1169,
    originalPrice: 1299,
    category: 'bags',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1587301620394-38254be313b0?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Vibrant and magical pastel pink unicorn school backpack for kids. Water-resistant outer shell with spacious compartments and soft cushioned shoulder straps.'
  },
  {
    id: 'kids-p5',
    name: 'Girls Denim Jacket',
    price: 1599,
    originalPrice: 1599,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1472586662442-3eec04b9dbda?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    inStock: true,
    brand: 'Girls Clothing',
    description: 'Chic and classic washed blue denim jacket for girls. Durable and easy to layer, designed with metal buttons and front chest flap pockets.'
  },
  {
    id: 'kids-p6',
    name: 'Boys Jogger Pants',
    price: 999,
    originalPrice: 1249,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=600',
    tags: ['-20%'],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    inStock: true,
    brand: 'Boys Clothing',
    description: 'Cozy and durable navy blue track jogger pants with white drawstrings and stylish NYC varsity letter print on the leg. Ribbed elasticized ankle cuffs.'
  },
  {
    id: 'kids-p7',
    name: 'Girls Casual Shoes',
    price: 1799,
    originalPrice: 1799,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['28', '30', '32', '34'],
    inStock: true,
    brand: 'Girls Shoes',
    description: 'Lovely pastel pink sporty sneakers for girls. Lightweight, featuring white triple stripes, supportive foam midsoles, and an adjustable strap for simple wear.'
  },
  {
    id: 'kids-p8',
    name: 'Boys Sandals',
    price: 849,
    originalPrice: 999,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=600',
    tags: ['-15%'],
    sizes: ['26', '28', '30', '32'],
    inStock: true,
    brand: 'Boys Shoes',
    description: 'Heavy-duty active summer sandals for boys. Waterproof straps with velcro hook-and-loop closures and deep-traction rubber outsoles.'
  },
  {
    id: 'kids-p9',
    name: 'Boys Hoodie',
    price: 1399,
    originalPrice: 1399,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    inStock: true,
    brand: 'Boys Clothing',
    description: 'Trendy colorblocked hoodie for boys with bright blue and charcoal accents. Soft-brushed cotton lining keeps them incredibly warm.'
  },
  {
    id: 'kids-p10',
    name: 'Girls Co-Ord Set',
    price: 1259,
    originalPrice: 1399,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600',
    tags: ['-10%'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Girls Clothing',
    description: 'Delightful yellow summer floral matching two-piece co-ord top and shorts set for girls. Extremely breathable cotton gauze material.'
  },
  {
    id: 'kids-p11',
    name: 'Boys Sports Shoes',
    price: 1999,
    originalPrice: 1999,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['28', '30', '32', '34', '36'],
    inStock: true,
    brand: 'Boys Shoes',
    description: 'Premium kids sports running shoes by FILA. Navy blue body with athletic red details, shock-absorbing spring soles, and custom slip-on fit.'
  },
  {
    id: 'kids-p12',
    name: 'Kids Cap',
    price: 439,
    originalPrice: 499,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13ce35?auto=format&fit=crop&q=80&w=600',
    tags: ['-12%'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Cool kids embroidered Batman yellow logo baseball cap. Made with structured dark cotton canvas and adjustable snapback closure.'
  }
];

// Exact review numbers displayed on the kids reference screen mockup
const reviewCounts: Record<string, number> = {
  'kids-p1': 12,
  'kids-p2': 15,
  'kids-p3': 10,
  'kids-p4': 18,
  'kids-p5': 12,
  'kids-p6': 14,
  'kids-p7': 20,
  'kids-p8': 16,
  'kids-p9': 11,
  'kids-p10': 9,
  'kids-p11': 17,
  'kids-p12': 13,
};

export default function KidsPage({ onAddToCart, wishlist, onToggleWishlist }: KidsPageProps) {
  // Sidebar states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Sorting and view modes
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Quick view popup states
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');

  // Sidebar mock options with quantities matching the image
  const categoryOptions = [
    { name: 'Boys Clothing', count: 32, match: 'Boys' },
    { name: 'Girls Clothing', count: 32, match: 'Girls' },
    { name: 'Boys Shoes', count: 18, match: 'Boys Shoes' },
    { name: 'Girls Shoes', count: 14, match: 'Girls Shoes' },
    { name: 'Unisex Clothing', count: 12, match: 'Unisex' },
    { name: 'Accessories', count: 10, match: 'Accessories' },
    { name: 'Bags & Backpacks', count: 10, match: 'Backpack' }
  ];

  const ageGroupOptions = [
    { label: '0 - 2 Years', count: 18 },
    { label: '2 - 4 Years', count: 24 },
    { label: '4 - 6 Years', count: 26 },
    { label: '6 - 8 Years', count: 28 },
    { label: '8 - 10 Years', count: 20 },
    { label: '10 - 12 Years', count: 12 }
  ];

  const brandOptions = [
    { name: 'Nike', count: 16 },
    { name: 'Adidas', count: 14 },
    { name: 'Puma', count: 12 },
    { name: 'Reebok', count: 10 },
    { name: 'FILA', count: 8 },
    { name: 'H&M', count: 8 }
  ];

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  const colorOptions = [
    { name: 'Black', class: 'bg-black border border-black' },
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Grey', class: 'bg-gray-400 border border-gray-400' },
    { name: 'Navy Blue', class: 'bg-slate-900 border border-slate-900' },
    { name: 'Royal Blue', class: 'bg-blue-600 border border-blue-600' },
    { name: 'Red', class: 'bg-red-600 border border-red-600' },
    { name: 'Lime Green', class: 'bg-lime-500 border border-lime-500' },
    { name: 'Yellow', class: 'bg-amber-400 border border-amber-400' },
    { name: 'Peach', class: 'bg-amber-200 border border-amber-200' },
    { name: 'Lavender', class: 'bg-purple-300 border border-purple-300' },
    { name: 'Sky Blue', class: 'bg-sky-300 border border-sky-300' },
    { name: 'Brown', class: 'bg-amber-800 border border-amber-800' }
  ];

  const handleAgeToggle = (label: string) => {
    setSelectedAgeGroups(prev =>
      prev.includes(label) ? prev.filter(g => g !== label) : [...prev, label]
    );
    setCurrentPage(1);
  };

  const handleBrandToggle = (brandName: string) => {
    setSelectedBrands(prev =>
      prev.includes(brandName) ? prev.filter(b => b !== brandName) : [...prev, brandName]
    );
    setCurrentPage(1);
  };

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedAgeGroups([]);
    setSelectedBrands([]);
    setMaxPrice(5000);
    setSelectedSize(null);
    setSelectedColor(null);
    setCurrentPage(1);
  };

  // Filter core calculations
  const filteredProducts = useMemo(() => {
    return kidsProducts.filter(product => {
      // 1. Category Filter
      if (selectedCategory) {
        const option = categoryOptions.find(o => o.name === selectedCategory);
        if (option) {
          // Check name or category fields for matching
          const categoryTerm = option.match.toLowerCase();
          const matchesCategory = product.name.toLowerCase().includes(categoryTerm) || 
                                  product.brand.toLowerCase().includes(categoryTerm) ||
                                  product.category.toLowerCase().includes(categoryTerm);
          if (!matchesCategory) return false;
        }
      }

      // 2. Brand Filter
      if (selectedBrands.length > 0) {
        const matchesBrand = selectedBrands.some(brand => 
          product.name.toLowerCase().includes(brand.toLowerCase()) || 
          product.brand.toLowerCase().includes(brand.toLowerCase()) ||
          product.description.toLowerCase().includes(brand.toLowerCase())
        );
        if (!matchesBrand) return false;
      }

      // 3. Price Filter
      if (product.price > maxPrice) {
        return false;
      }

      // 4. Size Filter (Simulate check)
      if (selectedSize && product.sizes) {
        if (product.sizes.includes('One Size')) return true;
      }

      // 5. Color Filter
      if (selectedColor) {
        if (selectedColor === 'White' && !['Polo', 'T-Shirt', 'Cap'].some(x => product.name.includes(x))) return false;
        if (selectedColor === 'Pink' && !['Dress', 'Backpack', 'Shoes'].some(x => product.name.includes(x))) return false;
        if (selectedColor === 'Navy Blue' && !['Jogger', 'Cap', 'Sports'].some(x => product.name.includes(x))) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedBrands, maxPrice, selectedSize, selectedColor]);

  // Sorting
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
    setChosenSize(p.sizes[0] || '6-8Y');
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
          <span className="text-gray-500 font-semibold">Kids</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight mt-3">
          KIDS
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
          Adorable styles for your little ones.
        </p>
      </div>

      {/* 2. Main content split grid (Sidebar & Products) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== SIDEBAR FILTERS (Left Column) ==================== */}
        {/* Filter blocks order exactly as shown in reference image: CATEGORIES, AGE GROUP, BRAND, PRICE, COLOR */}
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

          {/* Age Group (Checkboxes) */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              AGE GROUP
            </h3>
            <div className="space-y-2.5">
              {ageGroupOptions.map((opt) => {
                const isChecked = selectedAgeGroups.includes(opt.label);
                return (
                  <div key={opt.label} className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleAgeToggle(opt.label)}
                        className="w-4 h-4 rounded-sm border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{opt.label}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">({opt.count})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Brand */}
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
                min="300"
                max="5000"
                step="200"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#08214d] cursor-pointer"
              />
              
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 font-mono">
                <span>Rs. 300</span>
                <span>Rs. {maxPrice === 5000 ? '5,000+' : maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Color circular bubble tags */}
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
                        col.name === 'White' || col.name === 'Peach' || col.name === 'Yellow' || col.name === 'Lime Green' ? 'text-gray-850' : 'text-white'
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

          {/* Reset Filters button */}
          {(selectedCategory || selectedAgeGroups.length > 0 || selectedBrands.length > 0 || maxPrice < 5000 || selectedSize || selectedColor) && (
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
            {/* Dynamic counter */}
            <span className="text-xs text-gray-500 font-medium text-left">
              Showing 1–{Math.min(12, sortedProducts.length)} of {sortedProducts.length === 12 ? '128' : sortedProducts.length} products
            </span>

            {/* Sorting and view selectors */}
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

          {/* Empty filters warning */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">🔍</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching products</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn&apos;t find any products in our Kids&apos; department matching your active filter choices.
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

                      {/* Hover details trigger buttons */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenQuickView(p)}
                          className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                          title="View product details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onAddToCart(p, p.sizes[0] || '6-8Y')}
                          className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                          title="Instant Add to cart"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>

                    </div>

                    {/* Meta details text */}
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
                        onClick={() => onAddToCart(p, p.sizes[0] || '6-8Y')}
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

                    {/* Metadata summary info */}
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block">
                        {p.brand}
                      </span>
                      <h4 className="text-sm font-black text-gray-800 mt-1">
                        {p.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-light mt-1.5 line-clamp-2">
                        {p.description || 'Premium-grade high quality kids apparel item designed for comfortable daily performance.'}
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
                          onClick={() => onAddToCart(p, p.sizes[0] || '6-8Y')}
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
                disabled={currentPage === 5}
                onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={15} />
              </button>

            </div>
          )}

        </section>

      </div>

      {/* ==================== QUICK VIEW DETAILS DIALOG OVERLAY ==================== */}
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

              {/* Description */}
              <p className="text-xs text-gray-500 mt-4 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Sizes Selection */}
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

              {/* Badges Row */}
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

              {/* Submit Button */}
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
