import { MapPin, Phone, Sparkles } from 'lucide-react';
import { Language, translations } from '../utils/language';

interface TopBarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  rgbMode: boolean;
  setRgbMode: (active: boolean) => void;
}

export default function TopBar({ language, setLanguage, rgbMode, setRgbMode }: TopBarProps) {
  const t = translations[language];

  // Premium continuous announcement ticker texts combining address and marketing offers
  const announcements = [
    t.address,
    language === 'en' 
      ? "🔥 Regional Special: Get 15% OFF using code: LUCKY15" 
      : "🔥 विशेष क्षेत्रीय अफर: कुपन LUCKY15 प्रयोग गरी १५% छुट पाउनुहोस्",
    language === 'en'
      ? "✨ Free door-to-door delivery within Bardibas area"
      : "✨ बर्दिबास क्षेत्र भित्र नि:शुल्क होम डेलिभरी सुविधा",
    language === 'en'
      ? "🛍️ Premium collection of hoodies, jackets, footwear and festive wear in-store"
      : "🛍️ जाडो र गर्मीको लागि प्रिमियम कपडाहरू, कुर्ता सेटहरू र ब्रान्डेड जुत्ताहरू उपलब्ध"
  ];

  const tickerText = announcements.join("   •   ");

  return (
    <div id="top-bar" className={`text-white text-xs py-2 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-3 border-b transition-all duration-300 ${
      rgbMode 
        ? 'rgb-gradient-bg shadow-lg border-sky-400/30' 
        : 'bg-[#051124] border-white/10'
    }`}>
      {/* Location Container - First Child */}
      <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200 w-full md:w-[48%] overflow-hidden relative group">
        <MapPin size={13} className="text-sky-400 shrink-0 z-10 bg-[#051124] pr-1" style={{ backgroundColor: rgbMode ? 'transparent' : '#051124' }} />
        
        {/* Target Span Component */}
        <span className="font-extrabold text-[10px] tracking-widest uppercase overflow-hidden whitespace-nowrap block relative w-full pr-4 text-sky-300">
          <span className="animate-marquee pl-1">
            {tickerText} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp; {tickerText} &nbsp;&nbsp;&nbsp; • &nbsp;&nbsp;&nbsp;
          </span>
        </span>
      </div>

      {/* Slogan */}
      <div className="hidden md:block text-gray-200 tracking-wider font-extrabold text-center uppercase text-[10px]">
        {t.slogan}
      </div>

      {/* Contact Info, Language & RGB Toggle */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <a href="tel:9807812515" className="flex items-center gap-1 text-gray-300 hover:text-sky-400 transition-colors duration-200">
            <Phone size={12} className="text-emerald-400" />
            <span className="font-mono">9807812515</span>
          </a>
          <span className="text-gray-500">|</span>
          <a href="tel:9815840960" className="flex items-center gap-1 text-gray-300 hover:text-sky-400 transition-colors duration-200">
            <Phone size={12} className="text-emerald-400" />
            <span className="font-mono">9815840960</span>
          </a>
        </div>

        {/* RGB mode & Language Toggles Segment */}
        <div className="flex items-center gap-3 border-l border-white/20 pl-4">
          {/* RGB Toggle */}
          <button
            onClick={() => setRgbMode(!rgbMode)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer ${
              rgbMode 
                ? 'bg-white text-slate-900 border border-white shadow-md animate-bounce' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
            title="Toggle RGB Rainbow Lights Mode"
          >
            <Sparkles size={11} className={rgbMode ? "text-amber-500" : "text-sky-400"} />
            <span>{rgbMode ? t.rgbOn : t.rgbOff}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-md border border-white/15">
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                language === 'en' ? 'bg-[#1d4289] text-white shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ne')}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                language === 'ne' ? 'bg-[#1d4289] text-white shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              ने
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
