import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { products } from '../data';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string) => void;
}

export default function WishlistModal({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}: WishlistModalProps) {
  if (!isOpen) return null;

  // Retrieve products matching IDs in the wishlist array
  const favoriteProducts = products.filter((p) => wishlist.includes(p.id));

  const handleQuickAdd = (p: Product) => {
    onAddToCart(p, p.sizes[0] || 'M');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none">
      
      {/* Backdrop Closes */}
      <div onClick={onClose} className="absolute inset-0 cursor-pointer" />

      {/* Content Box */}
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl relative border border-gray-100 z-10 animate-fade-in flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70 shrink-0">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-[#e1306c]" fill="currentColor" />
            <h3 className="text-sm sm:text-base font-black text-[#08214d]">
              My Wishlist ({favoriteProducts.length} items)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-gray-100">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart size={44} className="text-gray-200 mb-3" />
              <h4 className="text-sm font-bold text-gray-700">Your wishlist is empty</h4>
              <p className="text-xs text-gray-400 mt-1 max-w-[220px]">
                Tap the heart icons on products to save items you love here.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#08214d] text-white text-xs font-bold py-2 px-5 rounded-md hover:bg-[#1d4289] transition-colors cursor-pointer"
              >
                Browse Collections
              </button>
            </div>
          ) : (
            favoriteProducts.map((p) => (
              <div key={p.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4 text-left">
                {/* Image */}
                <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Info details */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                    {p.brand}
                  </span>
                  <h4 className="text-xs font-black text-gray-800 line-clamp-1">
                    {p.name}
                  </h4>
                  <span className="text-xs font-black text-[#08214d] font-mono block mt-1">
                    Rs. {p.price.toLocaleString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                    title="Quick add to basket"
                  >
                    <ShoppingCart size={13} />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist(p.id)}
                    className="border border-gray-200 text-gray-400 hover:text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
