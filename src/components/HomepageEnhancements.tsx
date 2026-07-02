import { useState, useEffect } from 'react';
import { Clock, Tag, MapPin, CheckCircle, ChevronDown, HelpCircle, Star, ThumbsUp, ShoppingBag, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';

interface HomepageEnhancementsProps {
  onAddToCart: (product: Product, size: string) => void;
  onTabSelect: (tabId: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export default function HomepageEnhancements({
  onAddToCart,
  onTabSelect,
  wishlist,
  onToggleWishlist
}: HomepageEnhancementsProps) {
  // Live Countdown Timer State for Flash Deals (e.g. counts down to end of today)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 34, seconds: 12 });
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeLookbookTab, setActiveLookbookTab] = useState<'street' | 'festive' | 'casual'>('street');
  const [selectedHotspot, setSelectedHotspot] = useState<{ id: string; name: string; price: number; x: number; y: number; productId: string } | null>(null);

  // Live Timer decrement logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep demo live and vibrant
          return { hours: 6, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format single digit with leading zero
  const fmt = (num: number) => String(num).padStart(2, '0');

  // Interactive FAQ dataset
  const faqs = [
    {
      q: "Where is the physical showroom of Lucky Readymade & Shoe Center?",
      a: "Our prime retail showroom is centrally located at Menroad, Bardibas-1, Mahottari, Nepal (opposite major local landmarks). Drop in to try on sizes and check material quality in person!"
    },
    {
      q: "Is home delivery really free in Bardibas?",
      a: "Yes! We offer completely free home delivery inside Bardibas city limits. No minimum order value is required. For outer regions and other major districts across Nepal, a flat standard shipping fee of Rs. 150 is applied."
    },
    {
      q: "Can I pay using eSewa or Fonepay?",
      a: "Absolutely! We accept Cash on Delivery (COD) as well as direct scanned digital payments via eSewa, Fonepay, and Khalti right at your doorstep when your package is handed over."
    },
    {
      q: "What is your return and size exchange policy?",
      a: "We want you to love your purchase. If a garment or shoe doesn't fit perfectly, you can request an exchange or return within 7 days of delivery. Ensure that tags are attached and the item remains completely unworn."
    }
  ];

  // Hotspots for shoppable lookbooks
  const lookbooks = {
    street: {
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
      title: "Chic Street Outfits",
      desc: "Vibrant casual combinations designed for effortless everyday confidence.",
      hotspots: [
        { id: "hp-1", name: "A-Line Coral Pink Midi Dress", price: 2199, x: 50, y: 40, productId: "w1" },
        { id: "hp-2", name: "Chic Linen Tops Set", price: 1299, x: 45, y: 70, productId: "w3" }
      ]
    },
    festive: {
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
      title: "Nepalese Festive Chic",
      desc: "Stunning colors and rich details crafted specifically for local celebrations and weddings.",
      hotspots: [
        { id: "hp-3", name: "Premium Denim Casual Jacket", price: 2499, x: 55, y: 35, productId: "m1" },
        { id: "hp-4", name: "Elite Pro Air Running Shoes", price: 4299, x: 60, y: 85, productId: "s2" }
      ]
    },
    casual: {
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
      title: "Smart Casual Wear",
      desc: "Perfect transition pieces blending workplace professionalism with weekend comfort.",
      hotspots: [
        { id: "hp-5", name: "Slim-Fit Stretch Chino Trousers", price: 1899, x: 50, y: 65, productId: "m3" },
        { id: "hp-6", name: "Classic Checkered Flannel Shirt", price: 1499, x: 48, y: 28, productId: "m2" }
      ]
    }
  };

  const handleHotspotAdd = (productId: string) => {
    const matchedProduct = products.find(p => p.id === productId);
    if (matchedProduct) {
      onAddToCart(matchedProduct, matchedProduct.sizes[0] || 'M');
    }
  };

  return (
    <div className="space-y-16 py-4 bg-slate-50">
      
      {/* 1. DYNAMIC FLASH SALES URGENCE BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-gradient-to-r from-[#08214d] to-[#123e85] rounded-3xl overflow-hidden shadow-xl border border-slate-700/30 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 md:p-10">
            
            {/* Countdown info */}
            <div className="lg:col-span-4 space-y-4 text-left">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-500 text-xs font-extrabold tracking-wider uppercase animate-pulse shadow-sm">
                <Clock size={12} />
                Flash Deal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                TODAY&apos;S SUPER OFFERS
              </h2>
              <p className="text-slate-300 text-xs font-medium leading-relaxed">
                Grab these premium clothing & footwear styles at direct warehouse rates. Offers close instantly upon timer expiry!
              </p>
              
              {/* Timer clock */}
              <div className="flex items-center gap-2.5 pt-2 select-none">
                <div className="flex flex-col items-center">
                  <span className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 text-xl font-black min-w-[48px] text-center border border-white/10">
                    {fmt(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-slate-300 mt-1">Hours</span>
                </div>
                <span className="text-xl font-black text-rose-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 text-xl font-black min-w-[48px] text-center border border-white/10">
                    {fmt(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-slate-300 mt-1">Mins</span>
                </div>
                <span className="text-xl font-black text-rose-400">:</span>
                <div className="flex flex-col items-center">
                  <span className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2 text-xl font-black min-w-[48px] text-center border border-white/10">
                    {fmt(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] font-bold uppercase text-slate-300 mt-1">Secs</span>
                </div>
              </div>
            </div>

            {/* Flash Sales Products (3 Columns) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.slice(0, 3).map((item) => {
                const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
                const isWishlisted = wishlist.includes(item.id);
                return (
                  <div key={`flash-${item.id}`} className="bg-white/5 backdrop-blur-xs border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between text-left hover:bg-white/10 transition-colors group relative">
                    {/* Discount tag */}
                    <span className="absolute top-2.5 left-2.5 bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs z-10">
                      -{discount}% OFF
                    </span>
                    
                    {/* Wishlist */}
                    <button 
                      onClick={() => onToggleWishlist(item.id)}
                      className={`absolute top-2.5 right-2.5 w-6.5 h-6.5 rounded-full flex items-center justify-center transition-transform hover:scale-110 z-10 ${
                        isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/10 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Heart size={12} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>

                    {/* Image */}
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-white/5 mb-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta */}
                    <div className="space-y-1">
                      <span className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">{item.brand}</span>
                      <h4 className="text-xs font-black text-white leading-tight line-clamp-1">{item.name}</h4>
                      
                      {/* Price row */}
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="text-xs font-black text-rose-400">Rs. {item.price}</span>
                        <span className="text-[10px] text-slate-400 line-through">Rs. {item.originalPrice}</span>
                      </div>
                    </div>

                    {/* Action */}
                    <button 
                      onClick={() => onAddToCart(item, item.sizes[0] || 'M')}
                      className="mt-3.5 w-full bg-white hover:bg-slate-100 text-[#08214d] text-[10px] font-black uppercase py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={11} />
                      <span>Add To Bag</span>
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 2. STYLE CATEGORY DIVISION BANNERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Women Premium Showcase */}
        <div className="group relative h-[300px] sm:h-[350px] rounded-3xl overflow-hidden shadow-md">
          {/* Overlay Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800" 
            alt="Women's Fashion Showcase"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Content */}
          <div className="absolute inset-0 z-20 p-6 sm:p-10 flex flex-col justify-end items-start text-left text-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-1">ELEGANT ETHNIC & WESTERN</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-2">
              WOMEN&apos;S CHIC
            </h3>
            <p className="text-xs text-slate-300 font-medium max-w-sm mb-5 leading-relaxed">
              Discover beautiful sarees, elegant midi dresses, and premium local wear crafted with precision fabrics.
            </p>
            <button 
              onClick={() => onTabSelect('women')}
              className="bg-white hover:bg-amber-400 hover:text-slate-950 text-[#08214d] text-xs font-black uppercase px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Explore Women</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Men Premium Showcase */}
        <div className="group relative h-[300px] sm:h-[350px] rounded-3xl overflow-hidden shadow-md">
          {/* Overlay Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800" 
            alt="Men's Fashion Showcase"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Content */}
          <div className="absolute inset-0 z-20 p-6 sm:p-10 flex flex-col justify-end items-start text-left text-white">
            <span className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-1">RUGGED STYLE & PREMIUM FIT</span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-2">
              MEN&apos;S SHARP
            </h3>
            <p className="text-xs text-slate-300 font-medium max-w-sm mb-5 leading-relaxed">
              Step out in high-comfort premium denim jackets, smart linen polos, and durable street footwear.
            </p>
            <button 
              onClick={() => onTabSelect('men')}
              className="bg-white hover:bg-sky-500 text-[#08214d] text-xs font-black uppercase px-6 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <span>Explore Men</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </section>

      {/* 3. INTERACTIVE SHOPPABLE LOOKBOOK GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-xs">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-black uppercase text-rose-500 tracking-[0.2em]">SHOP THE INSPIRED HOOD</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#08214d] tracking-tight mt-1">
              Interactive Lookbooks & Street Styles
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-1.5 leading-relaxed">
              Hover or click on the glowing pulse hotspots on our Nepalese models to immediately identify and add the garments to your shopping basket!
            </p>

            {/* Lookbook switch tabs */}
            <div className="flex justify-center gap-2 mt-6 select-none">
              {(Object.keys(lookbooks) as Array<keyof typeof lookbooks>).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActiveLookbookTab(key);
                    setSelectedHotspot(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeLookbookTab === key 
                      ? 'bg-[#08214d] text-white shadow-sm' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {lookbooks[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual with interactive canvas hotspots */}
            <div className="lg:col-span-7 relative bg-slate-100 rounded-2xl overflow-hidden aspect-4/5 sm:aspect-video lg:aspect-4/5 shadow-sm max-h-[500px]">
              <img 
                src={lookbooks[activeLookbookTab].image} 
                alt="Shoppable style combination"
                className="w-full h-full object-cover filter brightness-[0.95]"
                referrerPolicy="no-referrer"
              />
              
              {/* Hotspots */}
              {lookbooks[activeLookbookTab].hotspots.map((spot) => (
                <div 
                  key={spot.id}
                  className="absolute"
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                >
                  {/* Glowing Pulse Circle */}
                  <button 
                    onClick={() => setSelectedHotspot(spot)}
                    onMouseEnter={() => setSelectedHotspot(spot)}
                    className="relative w-6 h-6 flex items-center justify-center cursor-pointer group"
                    aria-label={`Hotspot info for ${spot.name}`}
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white shadow-md group-hover:scale-125 transition-transform" />
                  </button>
                </div>
              ))}

              {/* Hover or select helper overlay label */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center justify-between pointer-events-none">
                <span>{lookbooks[activeLookbookTab].desc}</span>
                <span className="text-emerald-400 font-black animate-pulse uppercase">← Tap Hotspot</span>
              </div>
            </div>

            {/* Shoppable Sidebar Panel */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full text-left space-y-5">
              <div className="border-b border-gray-150 pb-4">
                <span className="text-[10px] font-black text-emerald-600 tracking-wider uppercase">Style Breakdown</span>
                <h3 className="text-lg sm:text-xl font-black text-gray-800 tracking-tight mt-1">
                  Featured Items In This Look
                </h3>
              </div>

              {/* Hotspot detail popup display */}
              {selectedHotspot ? (
                <div className="bg-slate-50 border-2 border-emerald-500/20 rounded-2xl p-5 space-y-4 animate-fade-in relative">
                  <span className="absolute top-3.5 right-3.5 bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase border border-emerald-100">
                    Selected
                  </span>
                  
                  <div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">Lucky Center Outfit</span>
                    <h4 className="text-sm font-black text-gray-800 mt-1">{selectedHotspot.name}</h4>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Rs. {selectedHotspot.price}</p>
                  </div>

                  <div className="flex gap-2.5">
                    <button
                      onClick={() => handleHotspotAdd(selectedHotspot.productId)}
                      className="flex-1 bg-[#08214d] hover:bg-[#1d4289] text-white text-[11px] font-black uppercase py-2.5 rounded-lg transition-colors text-center flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag size={12} />
                      <span>Instant Add to Bag</span>
                    </button>
                    <button
                      onClick={() => setSelectedHotspot(null)}
                      className="px-3 py-2.5 bg-gray-150 hover:bg-gray-200 text-gray-700 text-[10px] font-bold uppercase rounded-lg transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-dashed border-gray-200 rounded-2xl p-6 text-center text-gray-400 py-12 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 animate-bounce">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <h4 className="text-xs font-black text-gray-700">No hotspot selected yet</h4>
                  <p className="text-[11px] text-gray-400 mt-1 max-w-[240px]">
                    Click or point at any glowing green marker on the model to view full pricing details and checkout instantly.
                  </p>
                </div>
              )}

              {/* Complete catalog items in this outfit list */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-black text-gray-400 tracking-wider uppercase block">All Outfits Items:</span>
                {lookbooks[activeLookbookTab].hotspots.map((spot) => (
                  <div 
                    key={`list-${spot.id}`} 
                    onClick={() => setSelectedHotspot(spot)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedHotspot?.id === spot.id 
                        ? 'bg-emerald-50/50 border-emerald-500/30' 
                        : 'bg-white border-gray-150 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="text-left">
                        <h5 className="text-xs font-black text-gray-800 leading-tight">{spot.name}</h5>
                        <span className="text-[10px] text-slate-400 font-bold">Rs. {spot.price}</span>
                      </div>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 transform -rotate-90" />
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. SHOWROOM location & VERIFIED NEPAL PAYMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#04122d] to-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
          {/* Subtle overlay decorative circle */}
          <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-white/5 rounded-full blur-xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Showroom visual detail */}
            <div className="lg:col-span-5 text-left space-y-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-950/50 px-3.5 py-1 rounded-full border border-emerald-800">
                <MapPin size={12} />
                Visit Showroom
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                Lucky Readymade & Shoe Center
              </h2>
              <div className="space-y-3.5 text-slate-300 text-xs font-semibold">
                <p className="leading-relaxed">
                  Experience full tactile satisfaction before paying. Walk in to inspect our hand-picked quality collections of clothes and shoes.
                </p>
                
                <div className="flex items-start gap-2 pt-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-black">Address Location</span>
                    <span className="text-[11px] text-slate-400">Menroad, Bardibas-1, Mahottari, Nepal</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-black">Store Opening Hours</span>
                    <span className="text-[11px] text-slate-400">08:00 AM - 08:30 PM (Open 7 Days a Week)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white block font-black">Contact Direct Helpline</span>
                    <span className="text-[11px] text-emerald-400">9807812515 | 9815840960</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle decorative Divider map mock */}
            <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-left">
              <span className="text-[9px] font-black uppercase text-slate-400">Location Area</span>
              <div className="h-28 bg-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Simulated Grid Map */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="absolute bottom-2 bg-slate-950/80 px-2.5 py-1 rounded-md text-[9px] text-slate-300 font-bold border border-white/10">
                  Bardibas Highway Corner
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Centrally located near the main bus terminal and opposite primary markets, with clean parking space.
              </p>
            </div>

            {/* Payments badging trust list (Local Nepalese Brands) */}
            <div className="lg:col-span-4 text-left space-y-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">Accepted Nepalese Payments</span>
              <h3 className="text-sm font-black text-slate-200">Instant Doorstep Digital Settlements</h3>
              
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* eSewa mockup badge */}
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-2 transition-all">
                  <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-xs">
                    eS
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-white block leading-none">eSewa</span>
                    <span className="text-[8px] text-slate-400">Instant Wallet</span>
                  </div>
                </div>

                {/* Fonepay mockup badge */}
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-2 transition-all">
                  <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-xs">
                    Fp
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-white block leading-none">Fonepay</span>
                    <span className="text-[8px] text-slate-400">Mobile Banking</span>
                  </div>
                </div>

                {/* Khalti mockup badge */}
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-2 transition-all">
                  <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-xs">
                    Kh
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-white block leading-none">Khalti Wallet</span>
                    <span className="text-[8px] text-slate-400">QR Scans</span>
                  </div>
                </div>

                {/* Cash on Delivery */}
                <div className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 flex items-center gap-2 transition-all">
                  <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-xs">
                    COD
                  </div>
                  <div>
                    <span className="text-[11px] font-black text-white block leading-none">COD</span>
                    <span className="text-[8px] text-slate-400">Cash on Hand</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-400 font-semibold bg-white/5 p-3 rounded-xl border border-white/5">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>Our system secures all transaction receipts for official warranty records automatically.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. VERIFIED CUSTOMERS TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-black uppercase text-sky-600 tracking-[0.2em]">CUSTOMER VERDICT</span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#08214d] tracking-tight mt-1">
            Loved By Families Across Nepal
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-1.5">
            Read real feedback from verified customers who shop local quality from our physical showroom and online website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Review 1 */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl text-left space-y-4 shadow-2xs hover:shadow-md transition-shadow relative">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed font-semibold italic">
              &quot;I purchased the Premium Denim jacket and a pair of running shoes for my son. The stitching is excellent and delivery to my home in Bardibas was free. Highly recommend Lucky Center!&quot;
            </p>

            <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 font-black text-xs flex items-center justify-center">
                AK
              </div>
              <div>
                <span className="text-xs font-black text-gray-800 block">Anuj Karki</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Verified Buyer • Bardibas</span>
              </div>
            </div>
            <span className="absolute bottom-5 right-6 text-slate-100 font-black text-5xl font-mono select-none pointer-events-none">&quot;</span>
          </div>

          {/* Review 2 */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl text-left space-y-4 shadow-2xs hover:shadow-md transition-shadow relative">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed font-semibold italic">
              &quot;Finding genuine quality clothing in Mahottari used to be difficult. Lucky Readymade solved that. Their offline showroom is vast and staff is extremely helpful in finding the perfect size.&quot;
            </p>

            <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
              <div className="w-9 h-9 rounded-full bg-sky-50 text-sky-700 font-black text-xs flex items-center justify-center">
                SD
              </div>
              <div>
                <span className="text-xs font-black text-gray-800 block">Sajina Dahal</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Verified Buyer • Janakpur</span>
              </div>
            </div>
            <span className="absolute bottom-5 right-6 text-slate-100 font-black text-5xl font-mono select-none pointer-events-none">&quot;</span>
          </div>

          {/* Review 3 */}
          <div className="bg-white border border-gray-150 p-6 rounded-2xl text-left space-y-4 shadow-2xs hover:shadow-md transition-shadow relative">
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
              <Star size={13} fill="currentColor" />
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed font-semibold italic">
              &quot;I ordered from Kathmandu and was skeptical, but the parcel arrived in 3 days. I paid upon delivery using eSewa scan. Shoes are lightweight and incredibly comfortable. Best pricing in Nepal!&quot;
            </p>

            <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
              <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-700 font-black text-xs flex items-center justify-center">
                RB
              </div>
              <div>
                <span className="text-xs font-black text-gray-800 block">Rohan Bhattarai</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">Verified Buyer • Kathmandu</span>
              </div>
            </div>
            <span className="absolute bottom-5 right-6 text-slate-100 font-black text-5xl font-mono select-none pointer-events-none">&quot;</span>
          </div>

        </div>
      </section>

      {/* 6. EXPANDABLE FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-6 text-left">
        <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-xs">
          
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="text-[#08214d]" size={20} />
            <h3 className="text-lg sm:text-xl font-black text-[#08214d] tracking-tight">
              Customer Support & Shopping FAQs
            </h3>
          </div>

          <div className="divide-y divide-gray-150 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={`faq-${index}`} className="pt-3 first:pt-0">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-2 focus:outline-none group cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-black text-gray-800 group-hover:text-[#08214d] transition-colors leading-snug">
                      {faq.q}
                    </span>
                    <span className={`p-1.5 rounded-full bg-slate-50 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#08214d]' : ''}`}>
                      <ChevronDown size={14} />
                    </span>
                  </button>

                  {/* Collapsible Content */}
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-32 opacity-100 mt-2 pb-3' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed pl-1">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Support Phone Call Action */}
          <div className="mt-8 bg-sky-50 border border-sky-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider block">Need Direct Personal Assistance?</span>
              <p className="text-xs text-slate-600 font-semibold">
                Our staff is ready to help you coordinate sizes, custom colors, and delivery timelines instantly.
              </p>
            </div>
            <a 
              href="tel:9807812515"
              className="px-5 py-2.5 bg-[#08214d] hover:bg-[#123e85] text-white font-black text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-xs text-center shrink-0"
            >
              Call 9807812515
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
