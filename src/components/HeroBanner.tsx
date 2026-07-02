import { useState, useEffect } from 'react';
import { Award, Tag, ShieldCheck, Smile, Wind, Percent, Star, Truck, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides } from '../data';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const scrollToCatalog = () => {
    const catalog = document.getElementById('shop-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper to render beautiful feature icons
  const renderIcon = (iconName: string) => {
    const props = { size: 14, className: "text-white" };
    switch (iconName) {
      case 'award':
        return <Award {...props} />;
      case 'tag':
        return <Tag {...props} />;
      case 'shield-check':
        return <ShieldCheck {...props} />;
      case 'smile':
        return <Smile {...props} />;
      case 'wind':
        return <Wind {...props} />;
      case 'percent':
        return <Percent {...props} />;
      case 'star':
        return <Star {...props} />;
      case 'truck':
        return <Truck {...props} />;
      case 'hanger':
      default:
        // Precise Clothes Hanger Custom SVG
        return (
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5V5a3 3 0 0 0-3-3z"/>
            <path d="M2 13s2 4 10 4 10-4 10-4"/>
          </svg>
        );
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <div id="hero-slider" className="relative w-full overflow-hidden select-none bg-radial from-sky-50 via-gray-50 to-sky-100/60">
      
      {/* Background Layer with slide key */}
      <div 
        key={`bg-${slide.id}`} 
        className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-60 transition-all duration-1000 ease-in-out`} 
      />

      {/* Grid Content Container */}
      <div 
        id="hero-grid-container"
        className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-12 md:py-20 relative z-10 transition-all duration-700 bg-linear-to-br from-white/60 via-white/35 to-white/10 backdrop-blur-xl rounded-[40px] sm:rounded-[60px] border border-white/60 shadow-3xl shadow-[#08214d]/10 md:my-12"
      >
        {/* Subtle decorative background gradient accent inside glass box */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-300/15 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse" />

        <div 
          id="hero-grid-layout"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center min-h-[380px] md:min-h-[520px] relative"
        >
          {/* LEFT CONTENT (TEXT) */}
          <div 
            key={`text-${slide.id}`} 
            className="lg:col-span-6 flex flex-col items-start text-left animate-slide-in transition-all duration-500 opacity-100"
            style={{ 
              animation: 'slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' 
            }}
          >
            {/* Advertising Campaign Badge */}
            <div className="flex items-center gap-2 mb-4 bg-linear-to-r from-amber-500/10 to-sky-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#08214d] flex items-center gap-1">
                🔥 Nepal Regional Special: <span className="text-amber-600 font-extrabold">{slide.tagline}</span>
              </span>
            </div>

            {/* Title with Gradient Emphasis */}
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-[#08214d] leading-[1.02] tracking-tighter">
              {slide.title.split(' ').map((word, i) => {
                const isHighlight = i === 1 || word === 'Premium' || word === 'Elite' || word === 'Authentic';
                return (
                  <span 
                    key={i} 
                    className={`block ${isHighlight ? 'text-transparent bg-clip-text bg-linear-to-r from-[#08214d] via-sky-600 to-sky-500 drop-shadow-xs' : ''}`}
                  >
                    {word}
                  </span>
                );
              })}
            </h2>

            {/* Cursive Subtitle */}
            <p className="font-serif italic text-3xl md:text-4xl text-sky-600 font-medium tracking-wide mt-3 md:mt-4 select-none drop-shadow-2xs">
              &ldquo; {slide.cursive} &rdquo;
            </p>

            {/* Features list */}
            <div className="flex flex-col gap-4 mt-8 md:mt-10">
              {slide.features.map((feat, index) => (
                <div key={index} className="flex items-center gap-3.5 group">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#08214d] to-[#1e3a8a] shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                    {renderIcon(feat.icon)}
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-wide block">
                      {feat.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Realtime Live shoppers count to trigger FOMO */}
            <div className="mt-6 flex items-center gap-2 text-[10px] text-gray-500 font-bold bg-white/60 border border-white px-3 py-1.5 rounded-xl">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>⚡ 14 active shoppers currently viewing this look in Bardibas, Mahottari</span>
            </div>

            {/* Shop Button */}
            <button
              onClick={scrollToCatalog}
              className="mt-8 md:mt-10 bg-[#08214d] hover:bg-[#1d4289] text-white text-xs sm:text-sm font-black tracking-widest py-4 px-9 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 flex items-center gap-3 transition-all duration-300 cursor-pointer group uppercase border border-white/20"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* RIGHT CONTENT */}
          <div 
            key={`images-${slide.id}`} 
            className="lg:col-span-6 relative h-[320px] sm:h-[380px] md:h-[500px] flex items-center justify-center overflow-hidden transition-all duration-500 opacity-100"
          >
            {/* Ambient Circular Glow */}
            <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] bg-white/45 rounded-full blur-3xl z-0" />

            {(slide as any).isFullImage ? (
              /* Beautiful Shrunk-to-Fit Physical Store Showcase Frame */
              <div 
                className="w-[85%] sm:w-[80%] md:w-[75%] h-[85%] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/95 relative group hover:scale-[1.03] transition-all duration-500 ease-out"
                style={{ animation: 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' }}
              >
                {/* Image */}
                <img 
                  src={(slide as any).fullImageUrl} 
                  alt="Lucky Readymade & Shoe Center Storefront" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  referrerPolicy="no-referrer"
                />

                {/* Elegant dark gradient overlay for copy readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                {/* Premium Location Pin Badge */}
                <div className="absolute top-4 left-4 z-20 bg-[#08214d]/95 backdrop-blur-md border border-sky-400/30 text-[10px] font-black text-white py-1.5 px-3 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>📍 Bardibas Store</span>
                </div>

                {/* Floating rating badge */}
                <div className="absolute top-4 right-4 z-20 bg-amber-500/95 backdrop-blur-md border border-amber-300/30 text-[10px] font-black text-white py-1.5 px-3 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1">
                  <span>⭐ 4.9 Rating</span>
                </div>

                {/* Text overlay info at the bottom of photo */}
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white text-left">
                  <span className="text-[10px] uppercase font-black tracking-widest text-sky-300 block mb-1">
                    Our Landmark Store
                  </span>
                  <h4 className="text-base md:text-lg font-black tracking-tight text-white leading-tight drop-shadow-sm uppercase">
                    LUCKY ReadyMade & Shoe Center
                  </h4>
                  <p className="text-[10px] text-gray-300 font-bold mt-1 tracking-wide">
                    Mainroad, Bardibas-1, Mahottari, Nepal. Family apparel & footwear.
                  </p>
                </div>
              </div>
            ) : (
              /* Slide Images Grid (Original multi-overlapping premium style) */
              <div className="w-full h-full relative flex items-center justify-center gap-4">
                
                {/* Male Model */}
                <div 
                  className="w-[28%] sm:w-[26%] md:w-[24%] h-[75%] rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 absolute left-[10%] sm:left-[16%] top-[12%] z-10 hover:scale-103 hover:z-20 transition-all duration-500 hover:shadow-2xl"
                  style={{ animation: 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' }}
                >
                  <img 
                    src={slide.images.male} 
                    alt="Male Model" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Female Model */}
                <div 
                  className="w-[33%] sm:w-[31%] md:w-[29%] h-[85%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white absolute left-[34%] sm:left-[37%] top-[7%] z-20 hover:scale-103 transition-all duration-500"
                  style={{ animation: 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards' }}
                >
                  <img 
                    src={slide.images.female} 
                    alt="Female Model" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* White Shoes Overlay */}
                <div 
                  className="w-[30%] sm:w-[28%] md:w-[25%] h-[32%] rounded-2xl overflow-hidden shadow-xl border-4 border-white absolute right-[8%] sm:right-[14%] bottom-[12%] z-30 hover:scale-105 transition-all duration-500 rotate-2 hover:rotate-0"
                  style={{ animation: 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards' }}
                >
                  <div className="absolute top-2 left-2 bg-[#08214d] text-[8px] font-bold text-white py-0.5 px-2 rounded-full uppercase tracking-wider shadow-sm">
                    Featured
                  </div>
                  <img 
                    src={slide.images.shoes} 
                    alt="Sneakers on block" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* ARROWS FOR CONTROL */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/60 hover:bg-white text-gray-800 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer z-30"
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === i 
                ? 'w-6 h-2 bg-[#08214d]' 
                : 'w-2 h-2 bg-white hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${i+1}`}
          />
        ))}
      </div>

    </div>
  );
}
