import React, { useState } from 'react';
import { Gift, Lock, Award, CheckCircle2 } from 'lucide-react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter-banner" className="bg-[#051124] text-white py-10 px-4 sm:px-6 md:px-8 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-center gap-8">
        
        {/* Left Column: Offer Info */}
        <div className="flex items-center gap-4 text-left max-w-sm xl:max-w-none">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Gift size={20} className="animate-bounce" />
          </div>
          <div>
            <h4 className="text-sm font-black tracking-wide uppercase">
              GET EXCLUSIVE OFFERS
            </h4>
            <p className="text-xs text-gray-400 font-medium mt-1 leading-snug">
              New arrivals, special deals & more sent directly to your inbox.
            </p>
          </div>
        </div>

        {/* Center Column: Interactive Subscribe form */}
        <div className="w-full max-w-md">
          {subscribed ? (
            <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 py-3.5 px-4 rounded-xl text-emerald-400 text-xs font-semibold text-left">
              <CheckCircle2 size={16} className="shrink-0" />
              <div>
                <p>Welcome to the Lucky Family! 🎉</p>
                <p className="text-[10px] text-gray-300 font-normal mt-0.5">
                  Use coupon <span className="font-mono font-bold text-white bg-emerald-600 px-1.5 py-0.5 rounded-sm">LUCKY10</span> for 10% off your checkout.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-xs bg-slate-950 text-white rounded-lg border border-slate-800 placeholder-slate-500 focus:outline-hidden focus:border-amber-400 transition-colors"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-500 active:scale-98 text-[#051124] text-xs font-extrabold tracking-widest py-3 px-6 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Secure Pay & Quality Assurance info */}
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center text-left">
          {/* Secure Payment */}
          <div className="flex items-center gap-3">
            <Lock size={18} className="text-sky-400 shrink-0" />
            <div>
              <h5 className="text-[11px] font-extrabold text-white tracking-wider uppercase leading-none">
                SECURE PAYMENT
              </h5>
              <span className="text-[10px] text-gray-400 font-medium leading-none block mt-1">
                100% secure payment
              </span>
            </div>
          </div>

          {/* Quality Assured */}
          <div className="flex items-center gap-3">
            <Award size={18} className="text-emerald-400 shrink-0" />
            <div>
              <h5 className="text-[11px] font-extrabold text-white tracking-wider uppercase leading-none">
                QUALITY ASSURED
              </h5>
              <span className="text-[10px] text-gray-400 font-medium leading-none block mt-1">
                Best quality, always
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
