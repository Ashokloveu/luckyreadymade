import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldAlert, LogOut, FileText, ShoppingBag } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { name: string; email: string } | null;
  onLogin: (user: { name: string; email: string }) => void;
  onLogout: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}: AuthModalProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      if (name.trim() && email.trim()) {
        onLogin({ name, email });
        onClose();
      }
    } else {
      if (email.trim()) {
        // Mock standard username from email if not registering
        const parsedName = email.split('@')[0];
        const formattedName = parsedName.charAt(0).toUpperCase() + parsedName.slice(1);
        onLogin({ name: formattedName, email });
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs select-none">
      
      {/* Backdrop closes */}
      <div onClick={onClose} className="absolute inset-0 cursor-pointer" />

      {/* Modal Card */}
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative border border-gray-100 z-10 animate-fade-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* LOGGED IN VIEW */}
        {currentUser ? (
          <div className="p-8 text-center text-left">
            <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 text-[#08214d] flex items-center justify-center text-2xl font-black mx-auto mb-4 uppercase">
              {currentUser.name.charAt(0)}
            </div>
            
            <h3 className="text-xl font-black text-gray-800">
              Welcome back, {currentUser.name}!
            </h3>
            <p className="text-xs text-gray-400 font-mono font-medium mt-1">
              {currentUser.email}
            </p>

            {/* Profile items overview */}
            <div className="mt-6 border-t border-gray-100 pt-5 space-y-3.5">
              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                <ShoppingBag size={18} className="text-emerald-500 shrink-0" />
                <div className="text-left">
                  <h5 className="text-xs font-black text-gray-700 uppercase">Loyalty Status</h5>
                  <span className="text-[10px] text-gray-400 font-bold">Lucky Gold Member (120 Points)</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-100">
                <FileText size={18} className="text-sky-500 shrink-0" />
                <div className="text-left">
                  <h5 className="text-xs font-black text-gray-700 uppercase">My Order History</h5>
                  <span className="text-[10px] text-gray-400 font-bold">1 active delivery | 3 completed orders</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="mt-8 w-full bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white py-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <LogOut size={13} />
              <span>SIGN OUT FROM ACCOUNT</span>
            </button>
          </div>
        ) : (
          /* LOGGED OUT SIGN IN/REGISTER FORM */
          <div className="p-8">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-sky-50 border border-sky-100 text-[#08214d] rounded-xl flex items-center justify-center mx-auto mb-3">
                <Lock size={20} />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-[#08214d]">
                {isRegistering ? 'Create Your Account' : 'Sign In to Lucky'}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {isRegistering ? 'Join our store and earn points on clothing' : 'Access your cart and active orders easily'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name (Registration only) */}
              {isRegistering && (
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>
              )}

              {/* Email */}
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-gray-50 text-xs text-gray-800 rounded-lg border border-gray-200 focus:outline-hidden focus:border-[#08214d]"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-bold tracking-wider py-3.5 rounded-lg shadow-sm hover:shadow-md transition-colors cursor-pointer uppercase mt-2"
              >
                {isRegistering ? 'Register Account' : 'Sign In Now'}
              </button>
            </form>

            {/* Toggle form type */}
            <div className="mt-5 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
              {isRegistering ? (
                <p>
                  Already have an account?{' '}
                  <button 
                    onClick={() => setIsRegistering(false)}
                    className="text-[#08214d] font-black hover:underline cursor-pointer"
                  >
                    Login here
                  </button>
                </p>
              ) : (
                <p>
                  Don&apos;t have an account yet?{' '}
                  <button 
                    onClick={() => setIsRegistering(true)}
                    className="text-[#08214d] font-black hover:underline cursor-pointer"
                  >
                    Sign up now
                  </button>
                </p>
              )}
            </div>

            {/* Safety tag */}
            <p className="text-[10px] text-gray-400 font-medium text-center mt-4 flex items-center justify-center gap-1">
              <ShieldAlert size={11} />
              <span>We never share your personal email credentials.</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
