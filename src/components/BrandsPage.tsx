import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, Award, Tag, Truck, ArrowRight, ExternalLink } from 'lucide-react';

interface BrandsPageProps {
  onBrandSelect?: (brandName: string) => void;
}

interface BrandItem {
  id: string;
  name: string;
  count: number;
  category: string[]; // Categories this brand belongs to
  logoKey: string;
}

const brandsData: BrandItem[] = [
  { id: 'b1', name: 'Adidas', count: 128, category: ['shoes', 'men', 'women', 'kids'], logoKey: 'adidas' },
  { id: 'b2', name: 'Nike', count: 122, category: ['shoes', 'men', 'women', 'kids', 'accessories'], logoKey: 'nike' },
  { id: 'b3', name: 'Puma', count: 98, category: ['shoes', 'men', 'women', 'kids'], logoKey: 'puma' },
  { id: 'b4', name: 'Reebok', count: 76, category: ['shoes', 'men', 'women'], logoKey: 'reebok' },
  { id: 'b5', name: 'FILA', count: 68, category: ['shoes', 'men', 'women', 'kids'], logoKey: 'fila' },
  { id: 'b6', name: 'H&M', count: 58, category: ['men', 'women', 'kids', 'accessories'], logoKey: 'hm' },
  { id: 'b7', name: 'Levi\'s', count: 54, category: ['men', 'women', 'kids', 'accessories'], logoKey: 'levis' },
  { id: 'b8', name: 'Only', count: 42, category: ['women'], logoKey: 'only' },
  { id: 'b9', name: 'Vero Moda', count: 38, category: ['women'], logoKey: 'veromoda' },
  { id: 'b10', name: 'Jack & Jones', count: 36, category: ['men', 'kids'], logoKey: 'jackjones' },
  { id: 'b11', name: 'Zara', count: 34, category: ['men', 'women', 'kids', 'accessories'], logoKey: 'zara' },
  { id: 'b12', name: 'Converse', count: 32, category: ['shoes', 'men', 'women'], logoKey: 'converse' },
  { id: 'b13', name: 'Skechers', count: 30, category: ['shoes', 'men', 'women', 'kids'], logoKey: 'skechers' },
  { id: 'b14', name: 'Timberland', count: 28, category: ['shoes', 'men'], logoKey: 'timberland' },
  { id: 'b15', name: 'New Balance', count: 26, category: ['shoes', 'men', 'women', 'kids'], logoKey: 'newbalance' },
  { id: 'b16', name: 'Casio', count: 22, category: ['accessories', 'men', 'women'], logoKey: 'casio' },
  { id: 'b17', name: 'Tommy Hilfiger', count: 20, category: ['men', 'women', 'kids', 'accessories'], logoKey: 'tommy' },
  { id: 'b18', name: 'Ray-Ban', count: 18, category: ['accessories', 'men', 'women'], logoKey: 'rayban' },
  { id: 'b19', name: 'Allen Solly', count: 16, category: ['men', 'women'], logoKey: 'allensolly' },
  { id: 'b20', name: 'Bata', count: 16, category: ['shoes', 'men', 'women', 'kids'], logoKey: 'bata' },
  { id: 'b21', name: 'Wildcraft', count: 14, category: ['accessories', 'men', 'women'], logoKey: 'wildcraft' },
  { id: 'b22', name: 'Woodland', count: 14, category: ['shoes', 'men', 'accessories'], logoKey: 'woodland' },
  { id: 'b23', name: 'boAt', count: 12, category: ['accessories'], logoKey: 'boat' },
  { id: 'b24', name: 'Fastrack', count: 10, category: ['accessories', 'men', 'women'], logoKey: 'fastrack' },
  { id: 'b25', name: 'Carlton London', count: 10, category: ['shoes', 'women', 'accessories'], logoKey: 'carlton' }
];

export default function BrandsPage({ onBrandSelect }: BrandsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');

  // Sidebar category listing counts (computed or hardcoded exactly matching the design)
  const categoryCounts = [
    { id: 'all', name: 'All Brands', count: 42 },
    { id: 'men', name: 'Men', count: 18 },
    { id: 'women', name: 'Women', count: 16 },
    { id: 'kids', name: 'Kids', count: 10 },
    { id: 'shoes', name: 'Shoes', count: 22 },
    { id: 'accessories', name: 'Accessories', count: 14 }
  ];

  // Filters calculation
  const filteredBrands = useMemo(() => {
    return brandsData.filter((brand) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (!brand.category.includes(activeCategory)) {
          return false;
        }
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          brand.name.toLowerCase().includes(query) ||
          brand.logoKey.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  // Sorting calculation
  const sortedBrands = useMemo(() => {
    const list = [...filteredBrands];
    if (sortBy === 'popular') {
      list.sort((a, b) => b.count - a.count);
    } else if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'alphabetical-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'least-products') {
      list.sort((a, b) => a.count - b.count);
    }
    return list;
  }, [filteredBrands, sortBy]);

  // High fidelity vector representations of brand logos
  const renderLogo = (key: string) => {
    switch (key) {
      case 'adidas':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            {/* Adidas slanted bars */}
            <svg viewBox="0 0 100 60" className="w-16 h-10 fill-current">
              <polygon points="25,45 38,45 15,10 2,10" />
              <polygon points="50,45 63,45 35,5 22,5" />
              <polygon points="75,45 88,45 55,0 42,0" />
            </svg>
            <span className="font-sans font-black text-xs tracking-tight uppercase -mt-1">adidas</span>
          </div>
        );
      case 'nike':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            {/* Nike Swoosh */}
            <svg viewBox="0 0 100 40" className="w-20 h-10 fill-current">
              <path d="M15,22 C35,22 65,10 88,3 C92,1 94,1 92,5 C84,14 62,32 38,36 C24,38 12,34 6,30 C3,28 3,25 6,24 C8,23.5 11,23 15,22 Z" />
            </svg>
          </div>
        );
      case 'puma':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            {/* Puma jumping cat silhouette */}
            <svg viewBox="0 0 100 45" className="w-16 h-10 fill-current">
              <path d="M85,15 C82,10 75,5 70,8 C65,10 60,18 52,22 C45,25 32,22 25,18 C18,14 10,12 5,16 C3,18 6,21 12,22 C22,24 35,28 42,32 C48,35 55,38 65,34 C72,30 80,22 88,24 C90,24.5 92,23 90,20 C88,18 86,16 85,15 Z" />
              <path d="M5,10 C10,11 12,9 14,7 C16,5 12,2 8,3 C4,4 3,8 5,10 Z" />
            </svg>
          </div>
        );
      case 'reebok':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            {/* Reebok Vector Symbol */}
            <svg viewBox="0 0 120 40" className="w-22 h-10 fill-current">
              <path d="M10,25 L75,5 L45,30 Z" className="fill-red-600" />
              <path d="M40,32 L110,12 L90,35 Z" className="fill-blue-800" />
            </svg>
          </div>
        );
      case 'fila':
        return (
          <div className="flex items-center justify-center">
            <span className="font-sans font-black text-2xl tracking-[0.2em] text-[#002C6C]">
              F<span className="text-[#E31B23]">I</span>LA
            </span>
          </div>
        );
      case 'hm':
        return (
          <div className="flex items-center justify-center">
            <span className="font-serif italic font-extrabold text-3xl tracking-tight text-[#E31B23]">
              H&M
            </span>
          </div>
        );
      case 'levis':
        return (
          <div className="bg-[#C41230] text-white px-5 py-1.5 text-xs font-black tracking-[0.15em] uppercase rounded-sm shadow-sm flex flex-col items-center justify-center">
            <span>LEVI&apos;S</span>
          </div>
        );
      case 'only':
        return (
          <div className="flex items-center justify-center">
            <span className="font-sans font-black text-2xl tracking-[0.15em] text-black">
              ONLY
            </span>
          </div>
        );
      case 'veromoda':
        return (
          <div className="flex items-center justify-center">
            <span className="font-serif text-sm tracking-[0.3em] font-bold text-black uppercase">
              VERO MODA
            </span>
          </div>
        );
      case 'jackjones':
        return (
          <div className="flex items-center justify-center">
            <span className="font-sans text-xs tracking-[0.2em] font-black text-black uppercase">
              JACK <span className="text-[#E31B23]">&</span> JONES
            </span>
          </div>
        );
      case 'zara':
        return (
          <div className="flex items-center justify-center">
            <span className="font-serif text-2xl tracking-tight font-extrabold text-black relative">
              <span className="mr-[-6px]">Z</span>
              <span className="mr-[-4px]">A</span>
              <span className="mr-[-6px]">R</span>
              <span>A</span>
            </span>
          </div>
        );
      case 'converse':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            <div className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z M12,17 L9.5,18.5 L10.3,15.5 L8,13.5 L11,13.3 L12,10.5 L13,13.3 L16,13.5 L13.7,15.5 L14.5,18.5 L12,17 Z" />
              </svg>
              <span className="font-sans font-bold text-[11px] tracking-widest uppercase">CONVERSE</span>
            </div>
          </div>
        );
      case 'skechers':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-sans italic font-black text-2xl tracking-tighter text-[#0f2d59]">
              S
            </span>
            <div className="h-[2px] w-8 bg-[#0f2d59] -mt-1" />
            <span className="text-[7px] font-bold tracking-[0.3em] text-gray-500 uppercase mt-0.5">SKECHERS</span>
          </div>
        );
      case 'timberland':
        return (
          <div className="flex flex-col items-center justify-center text-amber-950">
            <svg viewBox="0 0 30 30" className="w-7 h-7 fill-current">
              <path d="M15,2 C10.5,2 7,4.5 7,7 C7,9 8,11 10,12 L11,15 L11,18 L19,18 L19,15 L20,12 C22,11 23,9 23,7 C23,4.5 19.5,2 15,2 Z M14,5 L16,5 L16,7 L17,7 L17,8 L13,8 L13,7 L14,7 Z M12,10 L18,10 L18,11 L12,11 Z" />
            </svg>
            <span className="text-[8px] font-black tracking-widest uppercase mt-1 text-black">Timberland</span>
          </div>
        );
      case 'newbalance':
        return (
          <div className="flex items-center justify-center font-sans font-black italic text-[#E31B23] text-xl">
            <span>N</span>
            <span className="text-black ml-[-2px] text-base">B</span>
          </div>
        );
      case 'casio':
        return (
          <div className="flex items-center justify-center">
            <span className="font-sans font-black text-xl tracking-wider text-[#1a5fb4]">
              CASIO
            </span>
          </div>
        );
      case 'tommy':
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex border border-gray-400 w-10 h-5 overflow-hidden">
              <div className="w-1/2 bg-[#002C6C]" />
              <div className="w-1/2 flex flex-col">
                <div className="h-1/2 bg-white" />
                <div className="h-1/2 bg-[#E31B23]" />
              </div>
            </div>
            <span className="text-[7px] font-bold tracking-widest text-slate-800 uppercase mt-1">TOMMY HILFIGER</span>
          </div>
        );
      case 'rayban':
        return (
          <div className="flex items-center justify-center">
            <span className="font-serif italic font-extrabold text-lg text-black tracking-tight">
              Ray•Ban
            </span>
          </div>
        );
      case 'allensolly':
        return (
          <div className="flex flex-col items-center justify-center text-slate-800">
            {/* Allen Solly Stag Icon */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2]">
              <path d="M12,4 C11,6 9,8 9,11 C9,14 11,16 12,19 C13,16 15,14 15,11 C15,8 13,6 12,4 Z" />
              <path d="M8,7 C6,8 5,10 6,12" />
              <path d="M16,7 C18,8 19,10 18,12" />
            </svg>
            <span className="text-[8px] font-black tracking-widest uppercase mt-0.5">ALLEN SOLLY</span>
          </div>
        );
      case 'bata':
        return (
          <div className="flex items-center justify-center">
            <span className="font-serif italic font-black text-2xl tracking-tighter text-[#E31B23]">
              Bata
            </span>
          </div>
        );
      case 'wildcraft':
        return (
          <div className="flex flex-col items-center justify-center text-[#212121]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M12,2 L2,20 L7,20 L12,10 L17,20 L22,20 Z" />
            </svg>
            <span className="text-[7.5px] font-black tracking-widest uppercase mt-0.5">WILDCRAFT</span>
          </div>
        );
      case 'woodland':
        return (
          <div className="flex flex-col items-center justify-center text-emerald-800">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12,2 L19,14 L15,14 L15,20 L9,20 L9,14 L5,14 Z" />
            </svg>
            <span className="text-[7.5px] font-black tracking-widest text-[#1e3f20] uppercase mt-1">WOODLAND</span>
          </div>
        );
      case 'boat':
        return (
          <div className="flex items-center justify-center font-sans font-black italic text-black text-lg">
            <span>bo</span>
            <span className="text-[#E31B23]">A</span>
            <span>t</span>
          </div>
        );
      case 'fastrack':
        return (
          <div className="flex flex-col items-center justify-center text-slate-900">
            <svg viewBox="0 0 24 24" className="w-7 h-4 fill-current">
              <path d="M2,18 L10,6 L22,6 L14,18 Z" />
            </svg>
            <span className="text-[8px] font-extrabold tracking-[0.2em] uppercase mt-1">FASTRACK</span>
          </div>
        );
      case 'carlton':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[10px] font-serif font-bold">
              C
            </div>
            <span className="text-[7px] font-black tracking-widest uppercase mt-1">CARLTON LONDON</span>
          </div>
        );
      default:
        return <span className="font-extrabold text-sm uppercase text-gray-400">{key}</span>;
    }
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen pb-16 font-sans">
      
      {/* 1. Breadcrumb Path Exactly Like Reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1 select-none">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span className="hover:text-[#08214d] cursor-pointer">Home</span>
          <span>&gt;</span>
          <span className="text-gray-500 font-semibold">Brands</span>
        </div>
      </div>

      {/* 2. Top Banner Row: Title, Subtitle, Search bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 text-left select-none">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight">
              TOP BRANDS, TRUSTED QUALITY
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
              Explore original products from the world&apos;s leading brands.
            </p>
          </div>
          
          {/* Top Search bar block */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-700 pl-4 pr-10 py-2.5 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d] shadow-sm transition-all"
            />
            <Search size={14} className="absolute right-3.5 top-3.5 text-gray-400 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* 3. Horizontal Reassurance Core Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-xl border border-gray-150 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
          
          <div className="flex items-center gap-3.5 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Award size={20} className="stroke-[2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide">100% Original Brands</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Authentic & trusted products</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#08214d] shrink-0">
              <ShieldCheck size={20} className="stroke-[2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide">Best Quality</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Premium quality guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Tag size={18} className="stroke-[2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide">Great Offers</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Exciting deals & discounts</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 px-2 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#08214d] shrink-0">
              <Truck size={20} className="stroke-[2]" />
            </div>
            <div className="text-left">
              <h4 className="text-xs font-black text-gray-800 uppercase tracking-wide">Fast Delivery</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Quick delivery at your doorstep</p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Split Layout: Sidebar vs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* ==================== LEFT COLUMN: SIDEBAR ==================== */}
        <aside className="lg:col-span-1 space-y-6 text-left select-none">
          
          {/* Categories Filter Block */}
          <div className="bg-white rounded-xl border border-gray-150 p-5">
            <h3 className="text-xs font-black text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-100">
              CATEGORIES
            </h3>
            <div className="space-y-3.5">
              {categoryCounts.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between text-xs transition-all py-0.5 ${
                      isActive 
                        ? 'text-[#08214d] font-black scale-102 translate-x-0.5' 
                        : 'text-gray-500 hover:text-[#08214d] font-medium'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-50 text-[#08214d]' : 'text-gray-400'}`}>
                      ({cat.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advert Banner Card */}
          <div className="bg-gradient-to-b from-[#05142e] via-[#09224d] to-[#010816] text-white rounded-xl border border-sky-950 p-6 flex flex-col justify-between items-center relative overflow-hidden min-h-[440px] text-center shadow-lg group">
            
            {/* Background glowing rings */}
            <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-sky-500/10 blur-xl pointer-events-none group-hover:scale-110 duration-500 transition-transform" />
            <div className="absolute -bottom-16 -right-16 w-36 h-36 rounded-full bg-blue-500/15 blur-xl pointer-events-none group-hover:scale-110 duration-500 transition-transform" />

            {/* Sub-text headers */}
            <div className="relative z-10 w-full">
              <span className="text-[10px] font-extrabold tracking-[0.25em] text-sky-400 uppercase">
                LOVE YOUR
              </span>
              <h2 className="text-3xl font-serif italic font-extrabold tracking-tight mt-1 mb-2 text-white">
                Style
              </h2>
              <p className="text-[11px] text-gray-300 font-medium px-4 leading-relaxed max-w-xs mx-auto">
                Shop your favorite brands in one place.
              </p>
              
              <button className="mt-4.5 bg-white text-[#05142e] hover:bg-sky-50 text-[10px] font-black tracking-widest py-2 px-6 rounded-md shadow-md transition-all active:scale-95 uppercase cursor-pointer">
                SHOP NOW
              </button>
            </div>

            {/* High visual item products overlapping */}
            <div className="relative w-full h-44 mt-6 shrink-0 flex items-center justify-center select-none pointer-events-none">
              
              {/* Nike Cap */}
              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=300"
                alt="Nike Cap"
                className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-lg absolute -translate-x-12 -translate-y-8 rotate-[-12deg] z-10 hover:z-30 transition-all hover:scale-105"
              />

              {/* Fossil Watch */}
              <img
                src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=300"
                alt="Fossil Watch"
                className="w-22 h-22 rounded-full object-cover border-2 border-white/20 shadow-xl absolute translate-x-10 -translate-y-4 rotate-[15deg] z-15 hover:z-30 transition-all hover:scale-105"
              />

              {/* Adidas Shoe */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300"
                alt="Adidas Shoe"
                className="w-26 h-18 rounded-lg object-cover border-2 border-white/20 shadow-2xl absolute translate-y-12 rotate-[-5deg] z-20 hover:z-30 transition-all hover:scale-105"
              />

            </div>

          </div>

        </aside>

        {/* ==================== RIGHT COLUMN: BRAND GRID ==================== */}
        <section className="lg:col-span-3">
          
          {/* Controls Bar Row */}
          <div className="flex items-center justify-between pb-4 border-b border-gray-150 mb-6 select-none">
            <span className="text-xs text-gray-500 font-bold">
              Showing 1–{sortedBrands.length} of {activeCategory === 'all' && !searchQuery ? '42' : sortedBrands.length} brands
            </span>

            {/* Sort Dropdown */}
            <div className="relative text-xs">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 text-gray-700 pl-4.5 pr-9 py-2 rounded-lg font-bold focus:outline-none focus:border-[#08214d] cursor-pointer"
              >
                <option value="popular">Sort by: Popular</option>
                <option value="alphabetical">Name: A to Z</option>
                <option value="alphabetical-desc">Name: Z to A</option>
                <option value="least-products">Least Products</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                <svg className="w-3 h-3 fill-current stroke-[2.5]" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Empty Results Alert */}
          {sortedBrands.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-150 p-12 text-center max-w-md mx-auto my-12">
              <span className="text-3xl">🔍</span>
              <h4 className="text-sm font-black text-gray-800 mt-3">No matching brands found</h4>
              <p className="text-xs text-gray-400 mt-1">
                Try revising your query or resetting filters to find what you are looking for.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-5 bg-[#08214d] text-white text-xs font-bold py-2 px-5 rounded-lg hover:bg-[#1d4289] transition-all cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Dynamic 5-Column Brands Grid exactly matching the reference */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedBrands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => onBrandSelect?.(brand.name)}
                className="group bg-white rounded-xl border border-gray-150/70 p-4 flex flex-col justify-between items-center text-center transition-all duration-300 hover:shadow-md hover:border-gray-250 cursor-pointer h-44 select-none relative"
              >
                
                {/* External link cue on hover */}
                <div className="absolute top-2.5 right-2.5 text-gray-300 group-hover:text-[#08214d] transition-colors">
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Brand Logo Container Area */}
                <div className="flex-1 w-full flex items-center justify-center py-2">
                  <div className="transform group-hover:scale-106 duration-300 transition-transform">
                    {renderLogo(brand.logoKey)}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="mt-2 w-full pt-2 border-t border-gray-50 shrink-0">
                  <h4 className="text-[13px] font-black text-gray-850 group-hover:text-[#08214d] transition-colors leading-tight truncate">
                    {brand.name}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-bold block mt-0.5">
                    {brand.count} Products
                  </span>
                </div>

              </div>
            ))}
          </div>

          {/* ==================== AUTHORIZED DEALERS KNOW MORE ROW ==================== */}
          <div className="bg-[#f0f4f8]/50 border border-blue-100 rounded-2xl p-5 sm:p-6 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
            
            <div className="flex items-center gap-4 text-left">
              <div className="w-11 h-11 bg-white border border-blue-150 rounded-full flex items-center justify-center shadow-xs shrink-0 text-[#08214d]">
                <Award size={20} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-black text-[#08214d] uppercase tracking-wider">
                  AUTHORIZED DEALERS IN TOP BRANDS
                </h3>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                  We are authorized dealers of 40+ national & international brands.
                </p>
              </div>
            </div>

            <button className="bg-[#05142e] hover:bg-[#0c244c] text-white text-[10px] font-black tracking-widest uppercase py-3 px-7 rounded-lg shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer">
              KNOW MORE
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}
