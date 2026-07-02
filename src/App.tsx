import { useState, useEffect } from 'react';
import { X, HelpCircle, AlertCircle, Sparkles, Heart } from 'lucide-react';
import { Language, translations } from './utils/language';
import OrderTrackingPage from './components/OrderTrackingPage';
import CustomerFeedbackPage from './components/CustomerFeedbackPage';
import TopBar from './components/TopBar';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';
import ProductCatalog from './components/ProductCatalog';
import BrandsSection from './components/BrandsSection';
import FeaturesRow from './components/FeaturesRow';
import NewsletterBanner from './components/NewsletterBanner';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistModal from './components/WishlistModal';
import AuthModal from './components/AuthModal';
import CheckoutModal from './components/CheckoutModal';
import MenPage from './components/MenPage';
import WomenPage from './components/WomenPage';
import KidsPage from './components/KidsPage';
import ShoesPage from './components/ShoesPage';
import AccessoriesPage from './components/AccessoriesPage';
import BrandsPage from './components/BrandsPage';
import NewArrivalsPage from './components/NewArrivalsPage';
import OffersPage from './components/OffersPage';
import ContactUsPage from './components/ContactUsPage';
import AdminLoginPage from './components/AdminLoginPage';
import HomepageEnhancements from './components/HomepageEnhancements';
import { Product, CartItem } from './types';
import { safeLocalStorage } from './utils/storage';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Custom interactive feature states (Nepali/English support, RGB visuals, and custom notifications)
  const [language, setLanguage] = useState<Language>('en');
  const [rgbMode, setRgbMode] = useState<boolean>(false);
  const [wishlistToast, setWishlistToast] = useState<{ show: boolean; message: string; isAdd: boolean } | null>(null);

  // Cart, Wishlist, and User authentication state managers (with client-side local storage backup)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = safeLocalStorage.getItem('lucky_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = safeLocalStorage.getItem('lucky_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(() => {
    const saved = safeLocalStorage.getItem('lucky_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal display toggles
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedHelpTopic, setSelectedHelpTopic] = useState<string | null>(null);

  // Financial helpers
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutPromoCode, setCheckoutPromoCode] = useState('');

  // Persist local state whenever changes occur
  useEffect(() => {
    safeLocalStorage.setItem('lucky_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    safeLocalStorage.setItem('lucky_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      safeLocalStorage.setItem('lucky_user', JSON.stringify(currentUser));
    } else {
      safeLocalStorage.removeItem('lucky_user');
    }
  }, [currentUser]);

  // Calculations for headers
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [...prev, { product, quantity: 1, selectedSize: size }];
    });

    // Automatically slide-open cart to show confirmation feedback
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, change: number) => {
    setCartItems((prev) => {
      const targetIndex = prev.findIndex(
        (item) => item.product.id === productId && item.selectedSize === size
      );
      if (targetIndex === -1) return prev;

      const updated = [...prev];
      const newQty = updated[targetIndex].quantity + change;
      
      if (newQty <= 0) {
        updated.splice(targetIndex, 1);
      } else {
        updated[targetIndex].quantity = newQty;
      }
      return updated;
    });
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCartItems((prev) => 
      prev.filter((item) => !(item.product.id === productId && item.selectedSize === size))
    );
  };

  // Wishlist toggle with beautiful floating Toast feedback
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];

      const msg = exists ? translations[language].removedFromWishlist : translations[language].addedToWishlist;
      setWishlistToast({ show: true, message: msg, isAdd: !exists });
      setTimeout(() => setWishlistToast(null), 3500);

      return next;
    });
  };

  // Profile auth
  const handleLogin = (user: { name: string; email: string }) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Proceed checkout pipeline
  const handleCheckoutProgress = (discountAmount: number, promoCode: string) => {
    setCheckoutDiscount(discountAmount);
    setCheckoutPromoCode(promoCode);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = () => {
    setCartItems([]); // Reset basket contents upon order registration
    setCheckoutDiscount(0);
    setCheckoutPromoCode('');
  };

  // Redirect categories selection
  const handleCategorySelect = (categoryId: string) => {
    setActiveTab(categoryId);
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Policies and help modal contents helper
  const renderHelpTopicContent = (topic: string) => {
    switch (topic) {
      case 'My Account':
        return {
          title: 'Loyalty Account Benefits',
          text: 'Logging in allows you to unlock exclusive members-only deals, collect reward points on clothes and shoe purchases (which can be redeemed for discounts), and track active home deliveries in real-time.'
        };
      case 'Orders & Returns':
        return {
          title: 'Track Orders & Returns Policy',
          text: 'If you want to track a parcel, please enter the order code (e.g. LUCKY-XXXXXX-NP) in the support chat or call us. Unworn clothing items with tags can be returned hassle-free within 7 days of purchase.'
        };
      case 'Shipping Policy':
        return {
          title: 'Nepal Delivery Information',
          text: 'We provide completely free home delivery inside Bardibas city. For other districts across Nepal, standard regional carrier charges apply. Most parcels arrive at your doorstep in 2 to 4 working days.'
        };
      case 'Return Policy':
        return {
          title: '7-Day Return Policy Details',
          text: 'Your satisfaction is our priority. If a size does not fit, simply return the product to our main showroom or dispatch it back within 7 days. Ensure the clothing/footwear is unused and tags are pristine.'
        };
      case 'Privacy Policy':
        return {
          title: 'Data Safety & Protection Guidelines',
          text: 'We collect your name, physical address, and contact number solely for executing express deliveries and order verifications. Your credit card data and credentials are never stored or shared with external parties.'
        };
      case 'Terms & Conditions':
        return {
          title: 'Store Purchase Terms',
          text: 'All prices displayed on the storefront are inclusive of local Nepalese taxes. Coupon codes like LUCKY10 must be applied in the shopping cart before checkout. We reserve the right to verify COD orders.'
        };
      case 'FAQs':
        return {
          title: 'Frequently Asked Questions',
          text: 'Q: Do you accept eSewa / Fonepay? Yes, scanned QR payments are welcomed at delivery.\nQ: Where is your physical showroom? We are located at Menroad, Bardibas-1, Mahottari, Nepal.\nQ: Can I customize sizes? Absolutely! Speak with support.'
        };
      default:
        return {
          title: 'Help Center Info',
          text: 'Please call our customer care numbers directly at 9807812515 or 9815840960 for swift 24/7 personal assistance.'
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-gray-800">
      
      {/* 1. TOP UTILITY HEADER BAR */}
      <TopBar 
        language={language} 
        setLanguage={setLanguage} 
        rgbMode={rgbMode} 
        setRgbMode={setRgbMode} 
      />

      {/* 2. MAIN STORE BRAND HEADER */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onAuthClick={() => {
          setActiveTab('login-admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onLogout={handleLogout}
        language={language}
        rgbMode={rgbMode}
      />

      {/* 3. DYNAMIC STICKY NAVIGATION BAR */}
      <NavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setSearchQuery={setSearchQuery}
        language={language}
        rgbMode={rgbMode}
      />

      {/* 4. HERO SLIDER BANNER */}
      {activeTab === 'home' && !searchQuery && <HeroBanner />}

      {/* 5. SHOP BY CATEGORY SECTION */}
      {activeTab === 'home' && !searchQuery && (
        <Categories onCategorySelect={handleCategorySelect} />
      )}

      {/* NEW: DYNAMIC & CONVERSION-OPTIMIZED HOME PAGE ENHANCEMENTS */}
      {activeTab === 'home' && !searchQuery && (
        <HomepageEnhancements 
          onAddToCart={handleAddToCart}
          onTabSelect={setActiveTab}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* 6. INTERACTIVE PRODUCT CATALOG OR DEPARTMENT PAGES */}
      {activeTab === 'men' && !searchQuery ? (
        <MenPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'women' && !searchQuery ? (
        <WomenPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'kids' && !searchQuery ? (
        <KidsPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'shoes' && !searchQuery ? (
        <ShoesPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'accessories' && !searchQuery ? (
        <AccessoriesPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'brands' && !searchQuery ? (
        <BrandsPage
          onBrandSelect={(brandName) => {
            setSearchQuery(brandName);
            // also scroll to the catalog so the user sees results
            setTimeout(() => {
              const sec = document.getElementById('shop-section');
              if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
        />
      ) : activeTab === 'new-arrivals' && !searchQuery ? (
        <NewArrivalsPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'offers' && !searchQuery ? (
        <OffersPage
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      ) : activeTab === 'contact-us' && !searchQuery ? (
        <ContactUsPage />
      ) : activeTab === 'order-tracking' && !searchQuery ? (
        <OrderTrackingPage language={language} />
      ) : activeTab === 'feedback' && !searchQuery ? (
        <CustomerFeedbackPage language={language} />
      ) : activeTab === 'login-admin' && !searchQuery ? (
        <AdminLoginPage
          onCustomerLogin={handleLogin}
          currentUser={currentUser}
          onLogout={handleLogout}
          onBackToStore={() => {
            setActiveTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <ProductCatalog 
          activeTab={activeTab}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* 7. BRANDS SLIDER */}
      <BrandsSection />

      {/* 8. FEATURE TRUST BADGES ROW */}
      <FeaturesRow />

      {/* 9. NEWSLETTER SUBSCRIPTION & OFFERS BANNER */}
      <NewsletterBanner />

      {/* 10. MULTI-COLUMN COMPREHENSIVE FOOTER */}
      <Footer 
        onLinkSelect={setActiveTab}
        onHelpSelect={setSelectedHelpTopic}
      />

      {/* --- FLOATING DRAWERS & DIALOG OVERLAYS --- */}

      {/* Sliding Basket Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckoutProgress}
      />

      {/* Wishlist Favorites Modal */}
      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Auth Account Login Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      {/* Multi-step Checkout Pipeline Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={checkoutDiscount}
        promoCode={checkoutPromoCode}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Customer Service / Policy Information Popup Modal */}
      {selectedHelpTopic && (() => {
        const helpContent = renderHelpTopicContent(selectedHelpTopic);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
            <div onClick={() => setSelectedHelpTopic(null)} className="absolute inset-0 cursor-pointer" />
            
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative border border-gray-150 shadow-2xl z-10 animate-fade-in text-left">
              <button
                onClick={() => setSelectedHelpTopic(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="flex items-center gap-2.5 text-[#08214d] mb-4">
                <HelpCircle size={20} className="text-[#08214d]" />
                <h3 className="text-sm sm:text-base font-black uppercase tracking-wider leading-none">
                  {helpContent.title}
                </h3>
              </div>

              <div className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light whitespace-pre-line bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                {helpContent.text}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                <span className="flex items-center gap-1">
                  <AlertCircle size={12} />
                  <span>Lucky Center Support</span>
                </span>
                <span className="font-bold">24/7 Available</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* WISHLIST TOAST NOTIFICATION */}
      {wishlistToast?.show && (
        <div className="fixed top-24 right-4 z-50 animate-bounce pointer-events-none sm:pointer-events-auto">
          <div className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 border ${
            wishlistToast.isAdd 
              ? 'bg-emerald-50 border-emerald-150 text-emerald-900' 
              : 'bg-rose-50 border-rose-150 text-rose-900'
          } max-w-sm text-left`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              wishlistToast.isAdd ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}>
              <Heart size={16} className={wishlistToast.isAdd ? "fill-current" : ""} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider">
                {wishlistToast.isAdd ? "Wishlist Added" : "Wishlist Removed"}
              </p>
              <p className="text-[10px] text-gray-500 font-bold leading-tight mt-0.5">
                {wishlistToast.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Interactive floating bubble notification to let user know about coupon */}
      <div className="fixed bottom-4 left-4 z-30 pointer-events-none sm:pointer-events-auto">
        <div className="bg-slate-900 border border-slate-800 text-white p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce max-w-[260px] sm:max-w-xs text-left">
          <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles size={14} className="animate-spin-slow" />
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-black tracking-wide uppercase">LUCKY10 ACTIVE</p>
            <p className="text-[9px] sm:text-[10px] text-gray-400 leading-tight mt-0.5">Use <span className="text-amber-400 font-bold">LUCKY10</span> at cart checkout for a 10% instant discount!</p>
          </div>
        </div>
      </div>

    </div>
  );
}
