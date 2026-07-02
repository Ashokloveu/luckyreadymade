import React, { useState } from 'react';
import { Search, User, Heart, ShoppingBag, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Language, translations } from '../utils/language';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  cartSubtotal: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onAuthClick: () => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
  language: Language;
  rgbMode: boolean;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  cartCount,
  cartSubtotal,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onAuthClick,
  currentUser,
  onLogout,
  language,
  rgbMode
}: HeaderProps) {
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');

  const t = translations[language];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const startVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError(t.speechError);
      setTimeout(() => setSpeechError(''), 4000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ne' ? 'ne-NP' : 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError('');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition error", event);
        const err = event.error;
        let errMsg = '';
        if (err === 'no-speech') {
          errMsg = language === 'ne' 
            ? "कुनै आवाज सुनिएन। कृपया फेरि प्रयास गर्नुहोस्।" 
            : "No speech detected. Please try speaking clearly.";
        } else if (err === 'not-allowed' || err === 'service-not-allowed') {
          errMsg = language === 'ne' 
            ? "माइक्रोफोन अनुमति अस्वीकृत भयो। कृपया नयाँ ट्याबमा खोलेर प्रयास गर्नुहोस्।" 
            : "Microphone permission denied. Try opening in a new tab or granting access.";
        } else if (err === 'aborted') {
          errMsg = language === 'ne' 
            ? "वाणी खोज रद्द गरियो।" 
            : "Voice search cancelled.";
        } else {
          errMsg = language === 'ne' 
            ? "वाणी पहिचान त्रुटि: " + err 
            : "Speech recognition error: " + err;
        }
        setSpeechError(errMsg);
        setTimeout(() => setSpeechError(''), 4000);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e: any) {
      console.error("Speech initiation error", e);
      const errName = e?.name || '';
      let errMsg = t.speechError;
      if (errName === 'NotAllowedError' || errName === 'SecurityError') {
        errMsg = language === 'ne'
          ? "सुरक्षा वा अनुमति अवरोध। कृपया नयाँ ट्याबमा खोलेर प्रयास गर्नुहोस्।"
          : "Security or permission blocked. Please open the app in a new tab.";
      }
      setSpeechError(errMsg);
      setTimeout(() => setSpeechError(''), 4000);
      setIsListening(false);
    }
  };

  return (
    <header id="main-header" className={`py-4 px-4 sm:px-6 md:px-8 border-b transition-all duration-300 ${
      rgbMode ? 'bg-[#0f172a] border-[#38bdf8]/40 shadow-sky-950/20 shadow-lg' : 'bg-white border-gray-100 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* LOGO AREA */}
        <div className="flex items-center gap-3 cursor-pointer select-none self-start md:self-auto" onClick={() => { setSearchQuery(''); }}>
          <div className={`relative w-14 h-14 rounded-full border-[3px] flex items-center justify-center bg-white shadow-sm overflow-hidden group transition-all ${
            rgbMode ? 'border-[#38bdf8] animate-rgb-glow' : 'border-[#08214d]'
          }`}>
            <div className="absolute inset-0 bg-[#08214d]/5 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
            <span className={`font-serif text-2xl font-black tracking-tighter leading-none relative ${
              rgbMode ? 'text-sky-500' : 'text-[#08214d]'
            }`}>
              L<span className="text-sky-500 absolute -bottom-1 -right-1 text-xl font-sans italic">A</span>
            </span>
          </div>
          <div className="flex flex-col">
            <h1 className={`text-3xl font-black tracking-tight leading-none font-sans flex items-center ${
              rgbMode ? 'text-white animate-rgb-text' : 'text-[#08214d]'
            }`}>
              LUCKY
            </h1>
            <span className="text-[9px] font-bold text-gray-500 tracking-[0.15em] mt-1 whitespace-nowrap">
              READYMADE & SHOE CENTER
            </span>
          </div>
        </div>

        {/* SEARCH BAR & VOICE SEARCH */}
        <div className="w-full md:max-w-lg lg:max-w-xl flex flex-col gap-1.5">
          <form onSubmit={handleSearchSubmit} className="w-full relative flex items-center">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-4 pr-24 py-2.5 text-sm rounded-lg border focus:outline-none transition-all duration-200 shadow-inner ${
                rgbMode 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' 
                  : 'bg-gray-50 hover:bg-gray-100/70 focus:bg-white text-gray-800 placeholder-gray-400 focus:border-[#08214d]'
              }`}
            />
            
            {/* VOICE SEARCH ACTION BUTTON */}
            <button
              type="button"
              onClick={startVoiceSearch}
              className={`absolute right-12 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all cursor-pointer ${
                isListening 
                  ? 'bg-red-500 text-white animate-ping' 
                  : rgbMode 
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-400 hover:text-[#08214d] hover:bg-gray-100'
              }`}
              title="Search with Voice Support"
            >
              {isListening ? <MicOff size={15} /> : <Mic size={15} />}
            </button>

            <button
              type="submit"
              className={`absolute right-0 top-0 bottom-0 px-4 text-white rounded-r-lg flex items-center justify-center transition-colors duration-200 ${
                rgbMode ? 'bg-sky-500 hover:bg-sky-600' : 'bg-[#08214d] hover:bg-[#1d4289]'
              }`}
              aria-label="Search button"
            >
              <Search size={16} />
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-24 text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
              >
                {t.clear}
              </button>
            )}
          </form>

          {/* Real-time Voice Transcription helper or error notifier */}
          {isListening && (
            <div className="flex items-center gap-2 text-[10px] text-red-400 font-extrabold animate-pulse pl-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
              <span>{t.listening}... {t.speakNow}</span>
            </div>
          )}
          {speechError && (
            <div className="flex items-center gap-1.5 text-[10px] text-amber-500 font-bold pl-1 animate-fade-in">
              <AlertCircle size={11} />
              <span>{speechError}</span>
            </div>
          )}
        </div>

        {/* CONTROLS (ACCOUNT, WISHLIST, CART) */}
        <div className="flex items-center justify-between w-full md:w-auto gap-6 sm:gap-8 border-t border-gray-100 pt-3 md:pt-0 md:border-t-0">
          
          {/* My Account */}
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={onAuthClick}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-gray-600 group-hover:text-white transition-all duration-300 shadow-xs ${
              rgbMode 
                ? 'bg-slate-800 border border-slate-700 text-slate-300 group-hover:bg-sky-500' 
                : 'bg-gray-50 border border-gray-100 group-hover:bg-[#08214d]'
            }`}>
              <User size={18} />
            </div>
            <div className="text-left select-none">
              <p className={`text-xs font-semibold leading-none transition-colors ${
                rgbMode ? 'text-slate-200 group-hover:text-sky-400' : 'text-gray-800 group-hover:text-[#08214d]'
              }`}>
                {currentUser ? `Hi, ${currentUser.name.split(' ')[0]}` : t.myAccount}
              </p>
              <p className="text-[10px] text-gray-400 font-medium leading-none mt-1">
                {currentUser ? t.manageSignOut : t.signInRegister}
              </p>
            </div>
          </div>

          {/* Wishlist */}
          <div 
            className="flex items-center gap-2 group cursor-pointer select-none" 
            onClick={onWishlistClick}
          >
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-[#e1306c] group-hover:text-white transition-all duration-300 shadow-xs ${
              rgbMode ? 'bg-slate-800 border border-slate-700 text-slate-300' : 'bg-gray-50 border border-gray-100'
            }`}>
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e1306c] text-white font-mono font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className={`hidden lg:inline text-xs font-semibold group-hover:text-[#e1306c] transition-colors ${
              rgbMode ? 'text-slate-200' : 'text-gray-800'
            }`}>
              {t.wishlist}
            </span>
          </div>

          {/* Cart */}
          <div 
            className="flex items-center gap-2.5 group cursor-pointer select-none" 
            onClick={onCartClick}
          >
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-xs ${
              rgbMode ? 'bg-slate-800 border border-slate-700 text-slate-300' : 'bg-gray-50 border border-gray-100'
            }`}>
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white font-mono font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="text-left">
              <p className={`text-xs font-semibold leading-none group-hover:text-emerald-500 transition-colors ${
                rgbMode ? 'text-slate-200' : 'text-gray-800'
              }`}>
                {t.cart}
              </p>
              <p className="text-[10px] text-gray-400 font-mono font-bold leading-none mt-1">
                Rs. {cartSubtotal.toLocaleString()}
              </p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
