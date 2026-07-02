import React, { useState, useMemo } from 'react';
import { Heart, Star, ShoppingCart, Eye, ChevronDown, Grid, List, ChevronLeft, ChevronRight, X, Shield, RefreshCw, Truck } from 'lucide-react';
import { Product } from '../types';

interface NewArrivalsPageProps {
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

// 24 New Arrivals items matching the reference pattern
const newArrivalsProducts: Product[] = [
  {
    id: 'new-p1',
    name: 'Pique Polo T-Shirt',
    price: 1299,
    originalPrice: 1299,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    brand: 'Men',
    description: 'High-quality structured polo collar t-shirt in solid black, engineered with pure combed cotton pique for premium breathability and casual everyday elegance.'
  },
  {
    id: 'new-p2',
    name: 'Floral Midi Dress',
    price: 2299,
    originalPrice: 2299,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    brand: 'Women',
    description: 'Beautiful blush pink mid-length dress adorned with dainty floral arrangements, featuring a flattering tied empire waist and comfortable bell-flared sleeves.'
  },
  {
    id: 'new-p3',
    name: 'Adidas Grand Court 2.0',
    price: 6499,
    originalPrice: 7999,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['7', '8', '9', '10', '11'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'Timeless street court shoes featuring contrasting three-stripe leather side-panels, durable vulcanized rubber soles, and plush Cloudfoam sockliner comfort.'
  },
  {
    id: 'new-p4',
    name: 'Urban Backpack',
    price: 1899,
    originalPrice: 2499,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Waterproof olive green urban commuter canvas backpack with multi-layer device protection sleeves, sturdy brass buckles, and breathable foam shoulder straps.'
  },
  {
    id: 'new-p5',
    name: 'Puff Sleeve Crop Top',
    price: 899,
    originalPrice: 1199,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Women',
    description: 'Charming pastel lavender crop-cut top featuring dynamic pleated puff shoulder sleeves, adjustable front drawstring ties, and comfortable soft modal ribbing.'
  },
  {
    id: 'new-p6',
    name: 'Essential Hoodie',
    price: 1999,
    originalPrice: 1999,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    brand: 'Men',
    description: 'Oversized fleece drop-shoulder hoodie in rich oatmeal tan, highlighted with dynamic silicone brand lettering and extra-large protective hood.'
  },
  {
    id: 'new-p7',
    name: 'Boys Varsity Jacket',
    price: 1599,
    originalPrice: 1999,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['4-6Y', '6-8Y', '8-10Y', '10-12Y'],
    inStock: true,
    brand: 'Kids',
    description: 'Classic high-school style sporty bomber jacket featuring snap-button closures, ribbed striped cuffs, and warm fleece interior.'
  },
  {
    id: 'new-p8',
    name: 'Skechers Track - Scoloric',
    price: 7499,
    originalPrice: 7499,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['6', '7', '8', '9', '10'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'High-performance black and white athletic shoes with responsive Skechers memory foam cushioning, lightweight synthetic knit mesh, and shock-absorbing traction outsoles.'
  },
  {
    id: 'new-p9',
    name: 'Mini Shoulder Bag',
    price: 1499,
    originalPrice: 1999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Elegant cream white textured vegan leather handbag featuring golden lock hardware and adjustable shoulder strap chains.'
  },
  {
    id: 'new-p10',
    name: 'Casio Enticer Watch',
    price: 2549,
    originalPrice: 2999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Feminine minimal wristwatch featuring an elegant genuine leather buckle strap, high contrast polished gold-toned case, and protective mineral watch crystal glass.'
  },
  {
    id: 'new-p11',
    name: 'Slim Fit Jeans',
    price: 2199,
    originalPrice: 2499,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    brand: 'Men',
    description: 'Classic high-grade washed blue denim jeans styled with a tailored slim silhouette, five-pocket layout, and high-tensile stretch fibers.'
  },
  {
    id: 'new-p12',
    name: 'Girls Casual Shoes',
    price: 1799,
    originalPrice: 1799,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Kids',
    description: 'Vibrant pink breathable kids sneakers with adjustable strap buckles, robust white non-marking rubber outsoles, and padded ankle collars.'
  },

  // PAGE 2 PRODUCTS (Exactly matches the types counts)
  {
    id: 'new-p13',
    name: 'Classic Casual Linen Shirt',
    price: 1499,
    originalPrice: 1899,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Lightweight linen cotton blended button-down shirt. Perfect for smart-casual summer wear, featuring curved hems and breast pockets.'
  },
  {
    id: 'new-p14',
    name: 'Elegant Red Evening Dress',
    price: 3499,
    originalPrice: 3499,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true,
    brand: 'Women',
    description: 'Sophisticated deep red wrap dress with an elegant waist-tie loop, premium crepe finish, and fluid visual flare.'
  },
  {
    id: 'new-p15',
    name: 'Vero Moda Denim Jacket',
    price: 2499,
    originalPrice: 2999,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Women',
    description: 'Sleek dark wash denim utility jacket featuring silver branded buttons, double breast flap pockets, and adjustable waist buckles.'
  },
  {
    id: 'new-p16',
    name: 'Premium Leather Watch',
    price: 4999,
    originalPrice: 5999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Elegant chronographic analog watch with premium tanned calf leather strap and waterproof metallic alloy frame.'
  },
  {
    id: 'new-p17',
    name: 'Ray-Ban Wayfarer Classic',
    price: 8999,
    originalPrice: 9999,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'The standard of luxury eyewear. Featuring deep dark green polarized protective lenses and high gloss black composite acetate temples.'
  },
  {
    id: 'new-p18',
    name: 'Kids Hooded Fleece Sweatshirt',
    price: 1199,
    originalPrice: 1199,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Kids',
    description: 'Extremely soft high-loft thermal fleece hoodies keeping kids fully protected. Highlighted with cute cartoon embroidery.'
  },
  {
    id: 'new-p19',
    name: 'Classic White Crewneck',
    price: 999,
    originalPrice: 1299,
    category: 'men',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    brand: 'Men',
    description: 'Perfect heavy cotton t-shirt in optical white. Designed with tight ribbed crewneck collar and premium double needle stitching.'
  },
  {
    id: 'new-p20',
    name: 'Puma Runner Pro v2',
    price: 5499,
    originalPrice: 5499,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['7', '8', '9', '10'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'Super lightweight athletic running sneakers featuring carbon-fiber support shanks, high-grip traction heels, and breathable outer fabrics.'
  },
  {
    id: 'new-p21',
    name: 'Nike Air Max Elite',
    price: 9999,
    originalPrice: 11999,
    category: 'shoes',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['8', '9', '10', '11'],
    inStock: true,
    brand: 'Men Shoes',
    description: 'Legendary visible air-sole cushioning units paired with retro design lines, premium leather panel overlays, and dynamic red swoosh accents.'
  },
  {
    id: 'new-p22',
    name: 'Elegant Pearl Stud Earrings',
    price: 2999,
    originalPrice: 3499,
    category: 'accessories',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['One Size'],
    inStock: true,
    brand: 'Accessories',
    description: 'Hand-selected organic freshwater pearls mounted on premium solid sterling silver push-back pins. Classic luxury reinvented.'
  },
  {
    id: 'new-p23',
    name: 'Women High-Rise Skinny Jeans',
    price: 1999,
    originalPrice: 1999,
    category: 'women',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['26', '28', '30', '32'],
    inStock: true,
    brand: 'Women',
    description: 'Flattering stretch-fit high waisted blue jeans tailored to sculpt the legs. Outfitted with high-recovery Lycra weave fibers.'
  },
  {
    id: 'new-p24',
    name: 'Girls Pastel Bow Dress',
    price: 1599,
    originalPrice: 1999,
    category: 'kids',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=600',
    tags: ['NEW'],
    sizes: ['2-4Y', '4-6Y', '6-8Y', '8-10Y'],
    inStock: true,
    brand: 'Kids',
    description: 'Delightful pink birthday tutu dress featuring lovely satin bow waistlines, layers of fine flowy mesh, and premium soft cotton linings.'
  }
];

// Exact review numbers to make layout match the design
const reviewCounts: Record<string, number> = {
  'new-p1': 12,
  'new-p2': 18,
  'new-p3': 24,
  'new-p4': 10,
  'new-p5': 14,
  'new-p6': 16,
  'new-p7': 12,
  'new-p8': 20,
  'new-p9': 11,
  'new-p10': 15,
  'new-p11': 13,
  'new-p12': 17,
  'new-p13': 8,
  'new-p14': 25,
  'new-p15': 19,
  'new-p16': 14,
  'new-p17': 33,
  'new-p18': 11,
  'new-p19': 20,
  'new-p20': 15,
  'new-p21': 42,
  'new-p22': 9,
  'new-p23': 21,
  'new-p24': 13
};

export default function NewArrivalsPage({ onAddToCart, wishlist, onToggleWishlist }: NewArrivalsPageProps) {
  // Sidebar states mirroring exact layout in the image
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(15000);

  // Layout modes & pagination
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Quick view triggers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [chosenSize, setChosenSize] = useState<string>('');

  // Counts exactly matching categories in sidebar
  const categoryCounts = [
    { name: 'Men', id: 'men', count: 18 },
    { name: 'Women', id: 'women', count: 20 },
    { name: 'Kids', id: 'kids', count: 12 },
    { name: 'Shoes', id: 'shoes', count: 14 },
    { name: 'Accessories', id: 'accessories', count: 8 }
  ];

  // Garment Types counts exactly as sidebar image
  const typeOptions = [
    { name: 'T-Shirts', count: 10, term: 'polo' },
    { name: 'Shirts', count: 8, term: 'shirt' },
    { name: 'Dresses', count: 8, term: 'dress' },
    { name: 'Hoodies', count: 6, term: 'hood' },
    { name: 'Jeans', count: 6, term: 'jeans' },
    { name: 'Shoes', count: 10, term: 'shoes' },
    { name: 'Bags', count: 6, term: 'bag' },
    { name: 'Watches', count: 4, term: 'watch' }
  ];

  // Size buttons shown in the image
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  // 12 precise color circular swatches in the image
  const colorOptions = [
    { name: 'Black', class: 'bg-black border border-black' },
    { name: 'White', class: 'bg-white border border-gray-200' },
    { name: 'Grey', class: 'bg-gray-400 border border-gray-400' },
    { name: 'Navy', class: 'bg-slate-900 border border-slate-900' },
    { name: 'Royal Blue', class: 'bg-blue-600 border border-blue-600' },
    { name: 'Red', class: 'bg-red-600 border border-red-600' },
    { name: 'Green', class: 'bg-green-600 border border-green-600' },
    { name: 'Orange', class: 'bg-amber-600 border border-amber-600' },
    { name: 'Peach', class: 'bg-orange-200 border border-orange-200' },
    { name: 'Pink', class: 'bg-pink-300 border border-pink-300' },
    { name: 'Purple', class: 'bg-purple-400 border border-purple-400' },
    { name: 'Yellow', class: 'bg-yellow-300 border border-yellow-300' }
  ];

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeName) ? prev.filter(t => t !== typeName) : [...prev, typeName]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedTypes([]);
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(15000);
    setCurrentPage(1);
  };

  // Filtration logic block
  const filteredProducts = useMemo(() => {
    return newArrivalsProducts.filter((product) => {
      // 1. Sidebar Category
      if (selectedCategory && product.category !== selectedCategory) {
        // Special case: if category is shoes, matching 'shoes' category
        if (selectedCategory === 'shoes' && product.category !== 'shoes') {
          return false;
        }
        if (selectedCategory !== 'shoes' && product.category !== selectedCategory) {
          return false;
        }
      }

      // 2. Garment/Item Type Selection
      if (selectedTypes.length > 0) {
        const matchesType = selectedTypes.some(type => {
          const option = typeOptions.find(o => o.name === type);
          if (!option) return false;
          const term = option.term.toLowerCase();
          return product.name.toLowerCase().includes(term) || 
                 product.brand.toLowerCase().includes(term) ||
                 product.description.toLowerCase().includes(term);
        });
        if (!matchesType) return false;
      }

      // 3. Size Filter Selection
      if (selectedSize) {
        if (!product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      // 4. Color Filter Selection
      if (selectedColor) {
        const term = selectedColor.toLowerCase();
        const matchesCol = product.name.toLowerCase().includes(term) || 
                           product.description.toLowerCase().includes(term) ||
                           (term === 'navy' && product.description.toLowerCase().includes('dark')) ||
                           (term === 'peach' && product.description.toLowerCase().includes('pink')) ||
                           (term === 'grey' && product.name.toLowerCase().includes('grey')) ||
                           (term === 'peach' && product.name.toLowerCase().includes('midi'));
        if (!matchesCol) return false;
      }

      // 5. Price Slide Interval
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedTypes, selectedSize, selectedColor, maxPrice]);

  // Sorting logic block
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

  // Pagination bounds
  const paginatedProducts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIdx, startIdx + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleOpenQuickView = (p: Product) => {
    setQuickViewProduct(p);
    setChosenSize(p.sizes[0] || 'S');
  };

  const handleAddFromQuickView = () => {
    if (quickViewProduct) {
      onAddToCart(quickViewProduct, chosenSize);
      setQuickViewProduct(null);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-16 font-sans">
      
      {/* 1. Page Breadcrumbs & Title precisely matching reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-left select-none">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span className="hover:text-[#08214d] cursor-pointer">Home</span>
          <span>&gt;</span>
          <span className="text-gray-500 font-semibold">New Arrivals</span>
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight mt-3">
          NEW ARRIVALS
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
          Check out the latest styles just landed. Be the first to own them!
        </p>
      </div>

      {/* 2. Main content split layout (Sidebar & Listing) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== LEFT COLUMN: ADVANCED FILTERS ==================== */}
        <aside className="lg:col-span-1 space-y-7 text-left select-none pb-6 border-b lg:border-b-0 lg:border-r border-gray-150 lg:pr-8">
          
          {/* Categories block */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              CATEGORIES
            </h3>
            <div className="space-y-2.5">
              {categoryCounts.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(isActive ? null : cat.id);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center justify-between text-xs transition-colors py-0.5 ${
                      isActive 
                        ? 'text-[#08214d] font-black' 
                        : 'text-gray-600 hover:text-[#08214d] font-medium'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">({cat.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Garment Type selection checkboxes */}
          <div>
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              TYPE
            </h3>
            <div className="space-y-2.5">
              {typeOptions.map((opt) => {
                const isChecked = selectedTypes.includes(opt.name);
                return (
                  <div key={opt.name} className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 font-medium">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTypeToggle(opt.name)}
                        className="w-4 h-4 rounded-xs border-gray-300 text-[#08214d] focus:ring-[#08214d]"
                      />
                      <span>{opt.name}</span>
                    </label>
                    <span className="text-[10px] text-gray-400 font-mono">({opt.count})</span>
                  </div>
                );
              })}
              
              <button className="text-xs font-bold text-[#08214d] flex items-center gap-1 hover:underline mt-2.5 cursor-pointer">
                <span>+ More</span>
              </button>
            </div>
          </div>

          {/* Sizes buttons */}
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
                    className={`h-9 border rounded-md text-xs font-bold transition-all cursor-pointer ${
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

          {/* Color swatches */}
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
                        col.name === 'White' || col.name === 'Peach' || col.name === 'Yellow' ? 'text-gray-800' : 'text-white'
                      }`}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <button className="text-xs font-bold text-[#08214d] flex items-center gap-1 hover:underline mt-3 cursor-pointer">
              <span>+ More</span>
            </button>
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
                max="15000"
                step="300"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#08214d] cursor-pointer"
              />
              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 font-mono">
                <span>Rs. 300</span>
                <span>Rs. {maxPrice === 15000 ? '15,000+' : maxPrice.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Promotional Banner Card exactly matching image */}
          <div className="bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-center relative overflow-hidden select-none">
            <span className="text-[10px] font-extrabold text-blue-500 uppercase tracking-widest block">
              NEW SEASON
            </span>
            <h3 className="text-base font-black text-[#08214d] uppercase mt-1 leading-tight">
              NEW STYLES
            </h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">
              Fresh arrivals, trendy looks!
            </p>
            
            <button className="mt-4 bg-[#08214d] hover:bg-indigo-900 text-white text-[10px] font-black tracking-widest uppercase py-2 px-6 rounded-md shadow-md transition-all active:scale-95 cursor-pointer">
              SHOP NOW
            </button>

            {/* Elegant overlay model depiction matching image */}
            <div className="mt-5 w-full aspect-video rounded-xl overflow-hidden bg-gray-200 border border-white relative shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
                alt="Model Style"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Clear Filters indicator */}
          {(selectedCategory || selectedTypes.length > 0 || selectedSize || selectedColor || maxPrice < 15000) && (
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-black tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          )}

        </aside>

        {/* ==================== RIGHT COLUMN: PRODUCT DIRECTORY ==================== */}
        <section className="lg:col-span-3">
          
          {/* Control Options Header Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-100 select-none">
            
            {/* Dynamic Results Counter */}
            <span className="text-xs text-gray-500 font-bold text-left">
              Showing {Math.min(1, sortedProducts.length)}–{Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} products
            </span>

            {/* Sorting, Mode controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              
              {/* Dropdown Menu Selection */}
              <div className="relative text-xs">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 pl-4.5 pr-9 py-2.5 rounded-lg font-bold focus:outline-none focus:border-[#08214d] cursor-pointer"
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

              {/* Grid / List Toggler buttons matching reference */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#08214d] text-white border-[#08214d]'
                      : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                  }`}
                  aria-label="Grid view"
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
                  aria-label="List view"
                >
                  <List size={14} className="stroke-[2.5]" />
                </button>
              </div>

            </div>
          </div>

          {/* Empty Results Warning */}
          {sortedProducts.length === 0 && (
            <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">✨</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching products found</h4>
              <p className="text-xs text-gray-400 mt-1">
                We couldn&apos;t find any new arrivals matching your search or filters choice. Let&apos;s clear some!
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-5 bg-[#08214d] text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-[#1d4289] transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* ==================== VIEW MODES RENDERING ==================== */}
          {viewMode === 'grid' ? (
            
            /* --- GRID VIEW --- */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8 text-left select-none">
              {paginatedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                return (
                  <div key={p.id} className="group flex flex-col h-full relative">
                    
                    {/* Visual Card Wrapper */}
                    <div className="aspect-[4/5] w-full rounded-lg bg-[#f9fafb] border border-gray-100 overflow-hidden relative">
                      
                      {/* NEW TAG exactly like reference (blue bg, white bold text) */}
                      <span className="absolute top-2.5 left-2.5 z-10 bg-[#08214d] text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        NEW
                      </span>

                      {/* Heart Save Icon */}
                      <button
                        onClick={() => onToggleWishlist(p.id)}
                        className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer ${
                          isWishlisted ? 'text-[#ff2d55]' : 'text-gray-400 hover:text-[#ff2d55]'
                        }`}
                      >
                        <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} className="stroke-[2.5]" />
                      </button>

                      {/* Product Main Display Photo */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Trigger overlays on hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-300 transition-opacity flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleOpenQuickView(p)}
                          className="bg-white text-gray-800 p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          title="Quick View Details"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => onAddToCart(p, p.sizes[0] || 'S')}
                          className="bg-emerald-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all cursor-pointer"
                          title="Add to Basket"
                        >
                          <ShoppingCart size={15} />
                        </button>
                      </div>

                    </div>

                    {/* Metadata text content block */}
                    <div className="mt-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Dynamic capitalized brand category indicator */}
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                          {p.brand}
                        </span>
                        
                        {/* Title link */}
                        <h4
                          onClick={() => handleOpenQuickView(p)}
                          className="text-xs font-black text-gray-850 hover:text-[#08214d] cursor-pointer mt-0.5 line-clamp-1 transition-colors leading-tight"
                        >
                          {p.name}
                        </h4>

                        {/* Ratings & reviews */}
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
                      </div>

                      {/* Pricing labels */}
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

                      {/* Immediate trigger button */}
                      <button
                        onClick={() => onAddToCart(p, p.sizes[0] || 'S')}
                        className="mt-3 w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-[10px] font-black tracking-wider py-2.5 rounded-md transition-colors cursor-pointer"
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
              {paginatedProducts.map((p) => {
                const isWishlisted = wishlist.includes(p.id);
                return (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row items-center gap-5 border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow relative text-left"
                  >
                    
                    {/* Visual frame thumbnail */}
                    <div className="w-full sm:w-36 aspect-square rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0 relative">
                      <span className="absolute top-2 left-2 z-10 bg-[#08214d] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs uppercase tracking-wider">
                        NEW
                      </span>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Description details content */}
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

                      {/* Star marks feedback */}
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

                      {/* Display sizes list */}
                      <div className="flex items-center gap-1.5 mt-3">
                        <span className="text-[9px] text-gray-400 font-black uppercase">Available Sizes:</span>
                        <div className="flex gap-1">
                          {p.sizes.map(s => (
                            <span key={s} className="bg-gray-50 text-gray-600 font-bold font-mono text-[9px] px-1.5 py-0.5 border border-gray-100 rounded-sm">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Operational Action Block */}
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
                          onClick={() => onAddToCart(p, p.sizes[0] || 'S')}
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

          {/* ==================== RESILIENT PAGINATION DOTS ROW ==================== */}
          {totalPages > 1 && (
            <div className="mt-12 pt-6 border-t border-gray-100 flex items-center justify-center gap-1.5 select-none">
              
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} className="stroke-[2.5]" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => {
                const isActive = currentPage === pNum;
                return (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className={`w-9 h-9 rounded-lg text-xs font-black font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#08214d] text-white'
                        : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition-colors cursor-pointer"
              >
                <ChevronRight size={14} className="stroke-[2.5]" />
              </button>

            </div>
          )}

        </section>

      </div>

      {/* ==================== DYNAMIC DETAILED QUICK VIEW DIALOG ==================== */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            {/* Overlay bg */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300" 
              aria-hidden="true"
              onClick={() => setQuickViewProduct(null)}
            ></div>

            {/* Vertically centering spacer */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            {/* Modal Body Container */}
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-gray-100 animate-zoom-in relative">
              
              {/* Close pin */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-all z-20 cursor-pointer"
              >
                <X size={18} className="stroke-[2.5]" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Left side: Premium Image Area */}
                <div className="bg-[#f8f9fa] p-8 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100">
                  <span className="absolute top-6 left-6 bg-[#08214d] text-white text-[9px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider z-10 shadow-xs">
                    NEW ARRIVAL
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

                {/* Right side: Information block */}
                <div className="p-8 flex flex-col justify-between text-left">
                  <div>
                    {/* Brand capitalized indicator */}
                    <span className="text-[11px] font-black text-gray-400 tracking-widest uppercase block mb-1">
                      {quickViewProduct.brand} DEPARTMENT
                    </span>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl font-black text-[#08214d] leading-tight">
                      {quickViewProduct.name}
                    </h2>

                    {/* Reviews */}
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

                    {/* Description details */}
                    <div>
                      <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-wider mb-1.5">Overview</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {quickViewProduct.description}
                      </p>
                    </div>

                    {/* Interactive Sizes selector */}
                    <div className="mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-[10px] font-black text-gray-800 uppercase tracking-wider">Choose Size</h4>
                        <span className="text-[10px] text-gray-400 font-bold underline cursor-pointer hover:text-gray-600">Size Guide</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {quickViewProduct.sizes.map((sz) => {
                          const isPicked = chosenSize === sz;
                          return (
                            <button
                              key={sz}
                              onClick={() => setChosenSize(sz)}
                              className={`h-9 px-4 border rounded-lg text-xs font-black transition-all cursor-pointer ${
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

                  {/* Submission and guarantee tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex gap-3">
                      <button
                        onClick={handleAddFromQuickView}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black tracking-widest uppercase py-3.5 px-6 rounded-lg shadow-md duration-200 transition-colors cursor-pointer text-center"
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
                        title="Save to wishlist"
                      >
                        <Heart size={16} fill={wishlist.includes(quickViewProduct.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Operational assurance badges */}
                    <div className="mt-5 grid grid-cols-3 gap-2 text-center text-gray-400 text-[9px] font-bold">
                      <div className="flex flex-col items-center gap-1 py-1">
                        <Truck size={12} className="text-gray-500" />
                        <span>FAST DESPATCH</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 py-1 border-x border-gray-100">
                        <RefreshCw size={12} className="text-gray-500" />
                        <span>7 DAY RETURNS</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 py-1">
                        <Shield size={12} className="text-gray-500" />
                        <span>100% ORIGINAL</span>
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
