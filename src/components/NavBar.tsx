import { useState } from 'react';
import { Home, Menu, X, ArrowLeft } from 'lucide-react';
import { Language, translations } from '../utils/language';

interface NavBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  language: Language;
  rgbMode: boolean;
}

export default function NavBar({ activeTab, setActiveTab, setSearchQuery, language, rgbMode }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = translations[language];

  const menuItems = [
    { id: 'home', label: t.home, icon: Home },
    { id: 'men', label: t.men },
    { id: 'women', label: t.women },
    { id: 'kids', label: t.kids },
    { id: 'shoes', label: t.shoes },
    { id: 'accessories', label: t.accessories },
    { id: 'brands', label: t.brands },
    { id: 'new-arrivals', label: t.newArrivals },
    { id: 'offers', label: t.offers },
    { id: 'order-tracking', label: t.orderTracking },
    { id: 'feedback', label: t.feedback },
    { id: 'contact-us', label: t.contactUs },
    { id: 'login-admin', label: t.loginAdmin }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery(''); // Reset search query on tab switch to avoid confusion
    setIsOpen(false);

    // Scroll to products or relevant sections
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById('shop-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav id="navigation-bar" className={`sticky top-0 z-40 shadow-md transition-all duration-300 ${
      rgbMode ? 'bg-[#1e293b]/95 border-b border-sky-500/30' : 'bg-[#051124]'
    } text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* DESKTOP NAV ITEMS */}
          <div className="hidden md:flex items-center h-full w-full justify-between">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`h-full px-2 xl:px-3 flex items-center gap-1 text-[10px] xl:text-[11px] font-black tracking-wider hover:bg-[#1d4289]/80 transition-all duration-200 cursor-pointer border-b-2 ${
                    isActive 
                      ? 'bg-[#1d4289] border-sky-400 text-white' 
                      : 'border-transparent text-gray-300 hover:text-white'
                  }`}
                >
                  {Icon && <Icon size={13} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* MOBILE NAV TOGGLE */}
          <div className="flex md:hidden justify-between items-center w-full h-full">
            <span className="text-xs font-bold tracking-widest text-sky-400">
              {menuItems.find(i => i.id === activeTab)?.label || 'CATEGORIES'}
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE NAV MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#0a1527] border-t border-white/5 animate-fade-in py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full px-6 py-2.5 flex items-center gap-2.5 text-left text-xs font-bold tracking-wider border-l-4 transition-colors ${
                  isActive 
                    ? 'bg-[#1d4289] border-sky-400 text-white' 
                    : 'border-transparent text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {Icon && <Icon size={14} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
