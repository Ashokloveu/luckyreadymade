import { useState } from 'react';
import { Heart, Star, ShoppingCart, Eye, AlertCircle, X, Shield, RefreshCw, Truck } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';

interface ProductCatalogProps {
  activeTab: string;
  searchQuery: string;
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export default function ProductCatalog({
  activeTab,
  searchQuery,
  onAddToCart,
  wishlist,
  onToggleWishlist
}: ProductCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({});
  const [modalSize, setModalSize] = useState<string>('');

  // Handle local size picking for inline quick additions
  const handleSizeChange = (productId: string, size: string) => {
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  // Determine filtering logic
  const filteredProducts = products.filter((p) => {
    // 1. Filter by Tab Category
    if (activeTab !== 'home' && activeTab !== 'brands' && activeTab !== 'new-arrivals' && activeTab !== 'offers' && activeTab !== 'contact-us') {
      if (p.category !== activeTab) return false;
    }

    // Special cases
    if (activeTab === 'new-arrivals') {
      if (!p.tags?.includes('New Arrival') && !p.tags?.includes('Trending')) return false;
    }
    if (activeTab === 'offers') {
      if (p.price >= p.originalPrice) return false;
    }

    // 2. Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description?.toLowerCase().includes(q) || false;
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  // Calculate discount percentage
  const calculateDiscount = (orig: number, curr: number) => {
    if (orig <= curr) return 0;
    return Math.round(((orig - curr) / orig) * 100);
  };

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setModalSize(product.sizes[0] || 'M');
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  const handleInlineAdd = (product: Product) => {
    const chosenSize = selectedSizeMap[product.id] || product.sizes[0] || 'M';
    onAddToCart(product, chosenSize);
  };

  const handleModalAdd = () => {
    if (selectedProduct) {
      onAddToCart(selectedProduct, modalSize);
      closeQuickView();
    }
  };

  return (
    <section id="shop-section" className="py-12 bg-gray-50 px-4 sm:px-6 md:px-8 scroll-mt-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-200 pb-5">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-[#08214d] tracking-tight">
              {activeTab === 'home' && searchQuery ? 'Search Results' : 
               activeTab === 'home' ? 'Our Featured Products' : 
               activeTab === 'new-arrivals' ? 'New Arrivals Collection' :
               activeTab === 'offers' ? 'Exclusive Deals & Discounts' :
               `${activeTab.toUpperCase()} Collection`}
            </h3>
            <p className="text-xs text-gray-400 font-medium mt-1">
              Showing {filteredProducts.length} premium high-quality items available at Lucky Center
            </p>
          </div>

          {/* Quick Filter Info tags */}
          {searchQuery && (
            <div className="flex items-center gap-2 bg-sky-50 text-sky-800 text-xs px-3.5 py-1.5 rounded-lg border border-sky-100 font-semibold shadow-xs">
              <AlertCircle size={13} />
              <span>Filtering by search: &quot;{searchQuery}&quot;</span>
            </div>
          )}
        </div>

        {/* Empty Catalog State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center max-w-lg mx-auto shadow-sm">
            <AlertCircle size={44} className="text-amber-500 mx-auto mb-4" />
            <h4 className="text-base font-black text-gray-800">No products found</h4>
            <p className="text-xs text-gray-500 mt-2">
              We couldn&apos;t find any products matching your selection. Try checking other categories or clearing your search filter.
            </p>
            <button
              onClick={() => { window.location.reload(); }}
              className="mt-6 bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Reset Products View
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => {
            const disc = calculateDiscount(p.originalPrice, p.price);
            const isWishlisted = wishlist.includes(p.id);
            const inlineSize = selectedSizeMap[p.id] || p.sizes[0] || 'M';

            return (
              <div
                key={p.id}
                className="group bg-white rounded-xl border border-gray-150/70 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 duration-300 transition-all flex flex-col h-full relative"
              >
                {/* Image Area */}
                <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                  
                  {/* Heart Wishlist Trigger */}
                  <button
                    onClick={() => onToggleWishlist(p.id)}
                    className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center shadow-sm hover:scale-110 active:scale-90 transition-all cursor-pointer z-10 ${
                      isWishlisted 
                        ? 'bg-[#e1306c] text-white' 
                        : 'bg-white/90 text-gray-500 hover:text-[#e1306c] hover:bg-white'
                    }`}
                    aria-label="Add to wishlist"
                  >
                    <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>

                  {/* Discount Percentage Badge */}
                  {disc > 0 && (
                    <span className="absolute top-2.5 left-2.5 bg-[#e1306c] text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-xs tracking-wider">
                      -{disc}% OFF
                    </span>
                  )}

                  {/* Tags */}
                  {p.tags && p.tags[0] && !disc && (
                    <span className="absolute top-2.5 left-2.5 bg-sky-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-sm uppercase tracking-widest shadow-xs">
                      {p.tags[0]}
                    </span>
                  )}

                  {/* Product Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Action Overlays */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button
                      onClick={() => openQuickView(p)}
                      className="bg-white hover:bg-sky-50 text-[#08214d] p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 duration-200 transition-all cursor-pointer"
                      title="Quick View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleInlineAdd(p)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 duration-200 transition-all cursor-pointer"
                      title="Quick Add to Cart"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-4 flex flex-col flex-1 text-left">
                  {/* Brand */}
                  <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">
                    {p.brand}
                  </span>

                  {/* Title */}
                  <h4 
                    onClick={() => openQuickView(p)}
                    className="text-xs sm:text-sm font-black text-gray-800 leading-snug mt-1 hover:text-[#08214d] cursor-pointer transition-colors line-clamp-1"
                  >
                    {p.name}
                  </h4>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 mt-1.5">
                    <div className="flex items-center text-amber-400">
                      <Star size={12} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 font-mono">
                      {p.rating}
                    </span>
                    <span className="text-[9px] text-gray-400 font-medium">
                      (24 reviews)
                    </span>
                  </div>

                  {/* Sizes Row */}
                  {p.sizes && p.sizes.length > 0 && (
                    <div className="flex items-center gap-1.5 mt-3 border-t border-gray-100 pt-3">
                      <span className="text-[9px] font-extrabold text-gray-400 uppercase">
                        Size:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {p.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleSizeChange(p.id, sz)}
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm transition-all border ${
                              inlineSize === sz 
                                ? 'bg-[#08214d] text-white border-[#08214d]' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price & Action Bottom Row */}
                  <div className="mt-auto pt-3.5 flex items-center justify-between border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-black text-[#08214d] font-mono">
                        Rs. {p.price.toLocaleString()}
                      </span>
                      {disc > 0 && (
                        <span className="text-[10px] text-gray-400 font-bold line-through font-mono">
                          Rs. {p.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleInlineAdd(p)}
                      className="bg-[#08214d] hover:bg-[#1d4289] text-white text-[10px] font-bold tracking-wide py-2 px-3.5 rounded-md flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      <ShoppingCart size={11} />
                      <span>ADD TO CART</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* QUICK VIEW POPUP MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-100">
            
            {/* Close button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Column Image */}
              <div className="bg-gray-50 aspect-square md:aspect-auto md:h-full relative overflow-hidden flex items-center justify-center p-4">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover rounded-xl shadow-xs"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hot Deals indicator */}
                {selectedProduct.price < selectedProduct.originalPrice && (
                  <div className="absolute top-6 left-6 bg-[#e1306c] text-white text-xs font-black tracking-wider py-1 px-3 rounded-md shadow-md">
                    SALE ACTIVE
                  </div>
                )}
              </div>

              {/* Right Column Product Details */}
              <div className="p-6 sm:p-8 flex flex-col text-left">
                {/* Brand */}
                <span className="text-xs font-black text-gray-400 tracking-widest uppercase">
                  {selectedProduct.brand}
                </span>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-[#08214d] leading-snug mt-1.5">
                  {selectedProduct.name}
                </h3>

                {/* Rating & Stock */}
                <div className="flex flex-wrap items-center gap-4 mt-3 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 py-1 px-2.5 rounded-md text-amber-700 font-bold text-xs font-mono">
                    <Star size={13} fill="currentColor" />
                    <span>{selectedProduct.rating} / 5.0</span>
                  </div>
                  <div className={`text-xs font-bold py-1 px-2.5 rounded-md border ${
                    selectedProduct.inStock 
                      ? 'bg-emerald-50 border-emerald-150 text-emerald-700' 
                      : 'bg-rose-50 border-rose-150 text-rose-700'
                  }`}>
                    {selectedProduct.inStock ? '● In Stock & Ready' : '✕ Out of Stock'}
                  </div>
                </div>

                {/* Pricing Details */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-xl sm:text-2xl font-black text-[#08214d] font-mono">
                    Rs. {selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice > selectedProduct.price && (
                    <>
                      <span className="text-xs sm:text-sm text-gray-400 line-through font-bold font-mono">
                        Rs. {selectedProduct.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold py-0.5 px-2 rounded-sm uppercase tracking-wider">
                        Save Rs. {(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed font-light">
                  {selectedProduct.description || 'Enjoy comfortable styling with this hand-selected catalog product. Constructed from fine premium fabrics for ultimate longevity.'}
                </p>

                {/* Size Selector */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="mt-5">
                    <span className="block text-xs font-bold text-gray-700 tracking-wide uppercase">
                      Select Clothing/Shoe Size:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2.5">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setModalSize(sz)}
                          className={`min-w-[40px] text-xs font-bold py-2 px-3 rounded-lg transition-all border ${
                            modalSize === sz 
                              ? 'bg-[#08214d] text-white border-[#08214d] shadow-sm' 
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trust Elements */}
                <div className="grid grid-cols-3 gap-3 border-y border-gray-100 py-4 mt-6">
                  <div className="flex flex-col items-center text-center">
                    <Shield size={16} className="text-[#08214d]" />
                    <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase">100% Original</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <RefreshCw size={16} className="text-emerald-500" />
                    <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase">7 Days Returns</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Truck size={16} className="text-sky-500" />
                    <span className="text-[9px] text-gray-500 font-bold mt-1 uppercase">Fast Delivery</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={handleModalAdd}
                  className="mt-6 w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-xs sm:text-sm font-bold tracking-wider py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <ShoppingCart size={16} />
                  <span>ADD SELECTED TO BASKET</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
