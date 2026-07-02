import { ChevronLeft, ChevronRight } from 'lucide-react';
import { brandLogos } from '../data';

export default function BrandsSection() {
  const scrollBrands = (direction: 'left' | 'right') => {
    const container = document.getElementById('brands-scroller');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Helper to render high-fidelity brand logos in SVGs or stylish styles
  const renderBrandLogo = (brandName: string) => {
    switch (brandName) {
      case 'adidas':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            {/* Adidas Trefoil Shape Mock */}
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
              <path d="M12 2L9.5 8h5L12 2zm-5.5 8L4 14h5l-2.5-6zm11 0l-2.5 6h5l-2.5-6z" />
            </svg>
            <span className="font-sans font-bold text-[10px] tracking-tight -mt-0.5">adidas</span>
          </div>
        );
      case 'nike':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Nike Swoosh Style */}
            <span className="font-sans font-black italic text-base tracking-tighter text-black select-none">
              NIKE
            </span>
            <div className="w-12 h-1 bg-black skew-x-30 -mt-0.5 rounded-full" />
          </div>
        );
      case 'puma':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            <span className="font-sans font-extrabold italic text-xs tracking-widest uppercase">
              PUMA
            </span>
            {/* Minimal Cat Shape */}
            <svg viewBox="0 0 24 24" className="w-5 h-3.5 fill-current">
              <path d="M4 14l3-4h4l4 2 5-6h-3l-4 3H7L3 13z" />
            </svg>
          </div>
        );
      case 'reebok':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-sans font-bold italic text-sm tracking-tighter text-black">
              Reebok
            </span>
            <div className="flex gap-0.5 w-14 h-0.5 mt-0.5">
              <div className="bg-red-500 flex-1" />
              <div className="bg-blue-600 flex-1" />
            </div>
          </div>
        );
      case 'fila':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-mono font-black text-lg tracking-widest text-[#002C6C] select-none flex">
              F<span className="text-[#E31B23]">I</span>LA
            </span>
          </div>
        );
      case 'supreme':
        return (
          <div className="bg-[#E31B23] text-white px-2.5 py-1 text-[10px] font-sans font-bold italic tracking-wide rounded-xs shadow-xs">
            Supreme
          </div>
        );
      case 'jockey':
        return (
          <div className="flex flex-col items-center justify-center">
            <span className="font-serif italic font-bold text-sm tracking-widest text-slate-800">
              JOCKEY
            </span>
          </div>
        );
      case 'levis':
        return (
          <div className="bg-[#C41230] text-white px-3 py-1 text-[9px] font-sans font-extrabold tracking-widest uppercase rounded-sm shadow-xs flex flex-col items-center">
            LEVI&apos;S
          </div>
        );
      case 'lvd':
        return (
          <span className="font-sans font-black text-base tracking-[0.2em] text-slate-800">
            LVD
          </span>
        );
      case 'kelme':
        return (
          <div className="flex flex-col items-center justify-center text-black">
            {/* Kelme Paw Symbol */}
            <div className="flex gap-0.5 justify-center">
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
              <div className="w-1.5 h-1.5 bg-black rounded-full -translate-y-0.5" />
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
            </div>
            <span className="font-sans font-black text-[9px] tracking-wider uppercase mt-1">
              KELME
            </span>
          </div>
        );
      default:
        return <span className="font-bold text-gray-400 uppercase">{brandName}</span>;
    }
  };

  return (
    <section id="brands-section" className="py-10 bg-slate-900 text-white relative">
      
      {/* Background Subtle Wave */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 text-center">
        
        {/* Title */}
        <p className="text-[10px] font-extrabold text-sky-400 tracking-[0.3em] uppercase mb-1">
          AUTHORIZED DEALERS
        </p>
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-[0.1em] uppercase mb-8">
          AUTHORIZED DEALERS IN TOP BRANDS
        </h3>

        {/* Brand slider wrapper */}
        <div className="relative flex items-center group max-w-5xl mx-auto">
          
          {/* Left Arrow */}
          <button
            onClick={() => scrollBrands('left')}
            className="absolute -left-2 sm:-left-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-white hover:text-slate-900 text-white shadow-md flex items-center justify-center transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
            aria-label="Scroll brands left"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Scrolling Row */}
          <div
            id="brands-scroller"
            className="w-full flex items-center gap-4 sm:gap-6 md:gap-8 overflow-x-auto py-4 px-2 select-none no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="flex-none bg-white rounded-xl py-3.5 px-6 w-28 sm:w-32 h-14 sm:h-16 flex items-center justify-center shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                {renderBrandLogo(brand.name)}
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollBrands('right')}
            className="absolute -right-2 sm:-right-6 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-white hover:text-slate-900 text-white shadow-md flex items-center justify-center transition-all cursor-pointer z-10 hover:scale-105 active:scale-95"
            aria-label="Scroll brands right"
          >
            <ChevronRight size={16} />
          </button>

        </div>

      </div>
    </section>
  );
}
