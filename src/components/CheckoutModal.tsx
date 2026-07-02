import React, { useState } from 'react';
import { X, CheckCircle2, ShoppingBag, Truck, MapPin, Smartphone, CreditCard, ChevronRight, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  promoCode: string;
  onOrderPlaced: () => void;
}

type CheckoutStep = 'billing' | 'payment' | 'completed';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  promoCode,
  onOrderPlaced
}: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('billing');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Bardibas');
  const [addressLine, setAddressLine] = useState('');
  const [district, setDistrict] = useState('Mahottari');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'fonepay'>('cod');
  
  // Generated order states
  const [trackingId, setTrackingId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const total = subtotal - discountAmount;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'billing') {
      setStep('payment');
    } else if (step === 'payment') {
      // Complete order - generate mock tracking code
      const randomId = Math.floor(100000 + Math.random() * 900000);
      setTrackingId(`LUCKY-${randomId}-NP`);
      setStep('completed');

      // Automatically generate instant billing invoice from the purchase
      const itemsDescription = cartItems.map(item => `${item.quantity}x ${item.product.name}${item.selectedSize ? ` (${item.selectedSize})` : ''}`).join(', ');
      const purchaseTitle = `Website: ${itemsDescription || 'Cart Purchase'}`;
      
      const today = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dateString = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

      const newInvoice = {
        id: `INV-2026-${randomId}`,
        date: dateString,
        plan: purchaseTitle,
        amount: total,
        status: paymentMethod === 'fonepay' ? 'Paid' : 'Pending',
        paymentMethod: paymentMethod === 'fonepay' ? 'Fonepay' : 'COD'
      };

      try {
        const saved = localStorage.getItem('lucky_billing_invoices');
        let currentInvoices = [];
        if (saved) {
          currentInvoices = JSON.parse(saved);
        } else {
          currentInvoices = [
            { id: 'INV-2025-0006', date: '25 May, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
            { id: 'INV-2025-0005', date: '25 Apr, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
            { id: 'INV-2025-0004', date: '25 Mar, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
            { id: 'INV-2025-0003', date: '25 Feb, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
            { id: 'INV-2025-0002', date: '25 Jan, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Overdue', paymentMethod: 'VISA **** 4242' },
            { id: 'INV-2024-0001', date: '25 Dec, 2024', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' }
          ];
        }
        localStorage.setItem('lucky_billing_invoices', JSON.stringify([newInvoice, ...currentInvoices]));
      } catch (err) {
        console.error("Failed to auto-save generated invoice:", err);
      }
    }
  };

  const handleDone = () => {
    onOrderPlaced(); // Clear cart
    onClose();       // Close modal
    setStep('billing'); // Reset form step
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none overflow-y-auto">
      
      {/* Backdrop */}
      {step !== 'completed' && (
        <div onClick={onClose} className="absolute inset-0 cursor-pointer" />
      )}

      {/* Main card box */}
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-hidden shadow-2xl relative border border-gray-100 z-10 animate-fade-in flex flex-col">
        
        {/* Header (Hidden on final success screen) */}
        {step !== 'completed' && (
          <div className="px-6 py-4.5 border-b border-gray-100 flex items-center justify-between bg-gray-50/70 shrink-0">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#08214d]" />
              <h3 className="text-sm sm:text-base font-black text-[#08214d]">
                Checkout Portal ({cartItems.length} items)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Core steps wrapper */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* STEP INDICATORS */}
          {step !== 'completed' && (
            <div className="flex items-center justify-center gap-3.5 mb-8 text-xs select-none">
              <div className={`flex items-center gap-1.5 font-bold ${step === 'billing' ? 'text-[#08214d]' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'billing' ? 'bg-[#08214d] text-white' : 'bg-gray-100 text-gray-400'}`}>1</span>
                <span>Shipping Info</span>
              </div>
              <ChevronRight size={13} className="text-gray-300" />
              <div className={`flex items-center gap-1.5 font-bold ${step === 'payment' ? 'text-[#08214d]' : 'text-gray-400'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#08214d] text-white' : 'bg-gray-100 text-gray-400'}`}>2</span>
                <span>Payment</span>
              </div>
            </div>
          )}

          {/* -------------------- STEP 1: BILLING & SHIPPING INFO -------------------- */}
          {step === 'billing' && (
            <form onSubmit={handleNextStep} className="space-y-4 text-left">
              <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wider mb-2">
                Shipping & Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Asif Mohammad"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>

                {/* Phone number */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Nepalese Phone *</label>
                  <div className="relative">
                    <Smartphone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      required
                      placeholder="E.g. 98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-3.5 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Email Address (Optional)</label>
                <input
                  type="email"
                  placeholder="E.g. customer@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">District *</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>

                {/* Country (Always Nepal) */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Country</label>
                  <input
                    type="text"
                    disabled
                    value="Nepal"
                    className="w-full px-3.5 py-2.5 bg-gray-100 text-xs text-gray-400 rounded-lg border border-gray-200 cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Exact Address Details */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-500 uppercase">Street Address / Landmark *</label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-3.5 text-gray-400" />
                  <textarea
                    required
                    placeholder="E.g. Near Sagarmatha Bank, Menroad, Bardibas-1"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    rows={2}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>
              </div>

              {/* Button Action */}
              <div className="pt-4 flex justify-between items-center border-t border-gray-100 mt-6">
                <span className="text-xs text-gray-400 font-light">* Required Fields</span>
                <button
                  type="submit"
                  className="bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* -------------------- STEP 2: PAYMENT METHOD -------------------- */}
          {step === 'payment' && (
            <form onSubmit={handleNextStep} className="space-y-6 text-left">
              <div>
                <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wider mb-1">
                  Select Payment Method
                </h4>
                <p className="text-[10px] text-gray-400 font-medium">
                  Choose your preferred option. All transactions are fully encrypted and safe.
                </p>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery option */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                    paymentMethod === 'cod' 
                      ? 'bg-[#08214d]/5 border-[#08214d] shadow-xs' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === 'cod' ? 'border-[#08214d]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-[#08214d] rounded-full" />}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[#08214d]/10 flex items-center justify-center text-[#08214d] shrink-0">
                    <Truck size={20} />
                  </div>
                  <div className="text-left flex-1">
                    <h5 className="text-xs font-black text-gray-800 uppercase">Cash On Delivery (COD)</h5>
                    <p className="text-[10px] text-gray-400 leading-snug font-medium mt-0.5">
                      Pay with cash when our express delivery rider reaches your doorstep. Recommended!
                    </p>
                  </div>
                </div>

                {/* Bank / Fonepay Transfer option */}
                <div 
                  onClick={() => setPaymentMethod('fonepay')}
                  className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                    paymentMethod === 'fonepay' 
                      ? 'bg-[#08214d]/5 border-[#08214d] shadow-xs' 
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    paymentMethod === 'fonepay' ? 'border-[#08214d]' : 'border-gray-300'
                  }`}>
                    {paymentMethod === 'fonepay' && <div className="w-2.5 h-2.5 bg-[#08214d] rounded-full" />}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <div className="text-left flex-1">
                    <h5 className="text-xs font-black text-gray-800 uppercase">Fonepay / Bank Transfer</h5>
                    <p className="text-[10px] text-gray-400 leading-snug font-medium mt-0.5">
                      Pay instantly via any Nepalese banking app using QR scanner at delivery or pickup.
                    </p>
                  </div>
                </div>
              </div>

              {/* Fonepay instructions helper */}
              {paymentMethod === 'fonepay' && (
                <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-4 flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                  <div className="text-left text-xs text-emerald-800">
                    <p className="font-bold">Scan &amp; Pay At Delivery 📲</p>
                    <p className="text-[10px] text-emerald-700 mt-1">
                      Our express delivery courier carries an official Lucky Shoppe Fonepay QR card. Simply scan it using any local app (e.g. eSewa, Khalti, Global Smart Plus) to complete the checkout safely!
                    </p>
                  </div>
                </div>
              )}

              {/* Button Actions */}
              <div className="pt-4 flex justify-between items-center border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setStep('billing')}
                  className="border border-gray-200 text-gray-500 hover:text-gray-800 py-3 px-5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-colors cursor-pointer flex items-center gap-1.5 uppercase tracking-wide"
                >
                  <Check size={14} className="stroke-[3]" />
                  <span>CONFIRM ORDER (Rs. {total.toLocaleString()})</span>
                </button>
              </div>
            </form>
          )}

          {/* -------------------- STEP 3: COMPLETED SUCCESS SCREEN -------------------- */}
          {step === 'completed' && (
            <div className="text-center py-6">
              {/* Success celebration graphic */}
              <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-5 animate-pulse scale-105">
                <Check size={32} className="stroke-[3.5]" />
              </div>

              <h3 className="text-2xl font-black text-gray-800">
                Order Placed Successfully! 🎉
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-md mx-auto">
                Thank you for shopping at Lucky Readymade &amp; Shoe Center. Your parcel is registered with our local shipping hub.
              </p>

              {/* Tracking / receipt box */}
              <div className="mt-8 bg-gray-50 border border-gray-100 rounded-2xl p-5 text-left max-w-md mx-auto space-y-4">
                
                <div className="flex justify-between items-center border-b border-gray-250 pb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Tracking ID:</span>
                  <span className="text-xs font-black text-[#08214d] font-mono tracking-wide">{trackingId}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recipient:</span>
                    <span className="font-semibold text-gray-800">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone Contact:</span>
                    <span className="font-semibold font-mono text-gray-800">{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Destination:</span>
                    <span className="font-semibold text-gray-800 text-right">{addressLine}, {city}, {district}, Nepal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Payment:</span>
                    <span className="font-bold text-gray-800 uppercase text-[10px]">
                      {paymentMethod === 'cod' ? 'Cash On Delivery' : 'Fonepay / Bank scanner'}
                    </span>
                  </div>
                  {promoCode && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Promo Applied:</span>
                      <span className="font-mono uppercase text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded-sm">{promoCode}</span>
                    </div>
                  )}
                </div>

                {/* Amount Paid bottom indicator */}
                <div className="flex justify-between items-baseline pt-3 border-t border-gray-250 font-black">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Total Amount:</span>
                  <span className="text-sm font-black text-[#08214d] font-mono">
                    Rs. {total.toLocaleString()}
                  </span>
                </div>

              </div>

              {/* Call out info */}
              <p className="text-[10px] text-gray-400 font-medium max-w-xs mx-auto mt-6">
                Our team will call you at <span className="font-bold text-gray-700 font-mono">{phone}</span> shortly to confirm dispatch times. Thank you!
              </p>

              {/* Reset shopping process */}
              <button
                onClick={handleDone}
                className="mt-8 bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold py-3.5 px-8 rounded-xl transition-colors cursor-pointer tracking-wider"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
