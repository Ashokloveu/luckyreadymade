import { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Ticket, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, change: number) => void;
  onRemove: (productId: string, size: string) => void;
  onCheckout: (appliedDiscount: number, promoCode: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onCheckout
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoStatus, setPromoStatus] = useState<'idle' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  // Calculate financials
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'LUCKY10') {
      setDiscountPercent(10);
      setPromoStatus('success');
    } else {
      setPromoStatus('error');
    }
  };

  const handleCheckoutClick = () => {
    onCheckout(discountAmount, discountPercent > 0 ? promoCode.trim().toUpperCase() : '');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300" 
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 animate-slide-in">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-gray-100">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
            <div className="flex items-center gap-2.5">
              <ShoppingBag size={18} className="text-[#08214d]" />
              <h3 className="text-sm sm:text-base font-black text-[#08214d] tracking-tight">
                Your Cart ({cartItems.length} items)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-4 px-6 divide-y divide-gray-100">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[50vh] text-center">
                <ShoppingBag size={54} className="text-gray-200 mb-4" />
                <h4 className="text-sm font-bold text-gray-700">Your basket is empty</h4>
                <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
                  Add clothing items or footwear from our collections to checkout.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 bg-[#08214d] text-white text-xs font-bold py-2 px-6 rounded-md hover:bg-[#1d4289] transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4 text-left">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Core Details */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start gap-1">
                      <h4 className="text-xs font-black text-gray-800 line-clamp-1 hover:text-[#08214d]">
                        {item.product.name}
                      </h4>
                      <span className="text-xs font-bold text-[#08214d] font-mono shrink-0">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-[10px] text-gray-400 font-bold mt-0.5">
                      Brand: {item.product.brand} | Size: <span className="text-[#08214d] font-black">{item.selectedSize}</span>
                    </p>

                    {/* Adjust and Delete Row */}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <div className="flex items-center gap-1.5 border border-gray-200 rounded-md p-1 bg-gray-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                          className="p-1 rounded-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-xs font-bold px-1.5 font-mono text-gray-700 min-w-[14px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                          className="p-1 rounded-sm text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.product.id, item.selectedSize)}
                        className="text-gray-400 hover:text-rose-500 p-1 rounded-sm hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove product"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout/Financials Panel (Only if cart items exist) */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-150 p-6 bg-gray-50">
              
              {/* Promo code entry */}
              <div className="mb-5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Coupon Code (LUCKY10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white text-gray-800 rounded-lg border border-gray-200 placeholder-gray-400 focus:outline-hidden focus:border-[#08214d]"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                  >
                    APPLY
                  </button>
                </div>

                {/* Promo application status indicators */}
                {promoStatus === 'success' && (
                  <p className="text-[10px] text-emerald-600 font-bold mt-1.5 flex items-center gap-1 text-left">
                    <Check size={12} className="stroke-[3]" />
                    <span>Promo Applied: 10% Discount Saved!</span>
                  </p>
                )}
                {promoStatus === 'error' && (
                  <p className="text-[10px] text-rose-600 font-semibold mt-1.5 text-left">
                    Invalid promo code. Try &quot;LUCKY10&quot;.
                  </p>
                )}
              </div>

              {/* Financial Sub-items */}
              <div className="space-y-2 border-b border-gray-200 pb-3">
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Cart Subtotal</span>
                  <span className="font-mono">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-bold">
                    <span>Discount (10%)</span>
                    <span className="font-mono">-Rs. {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>Delivery Charge</span>
                  <span className="text-emerald-600 font-bold uppercase text-[10px] bg-emerald-50 px-1.5 py-0.5 rounded-sm">
                    FREE DELIVERY
                  </span>
                </div>
              </div>

              {/* Final total */}
              <div className="flex justify-between items-baseline mt-4 mb-5">
                <span className="text-sm font-black text-gray-800 uppercase">Total Amount:</span>
                <span className="text-lg sm:text-xl font-black text-[#08214d] font-mono">
                  Rs. {total.toLocaleString()}
                </span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={15} />
                <span>PROCEED TO CHECKOUT</span>
              </button>
              
              <p className="text-[10px] text-gray-400 mt-2.5 text-center font-light">
                Cash on Delivery & Bank Fonepay accepted.
              </p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
