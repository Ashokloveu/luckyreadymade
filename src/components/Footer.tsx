import { Facebook, Instagram, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onLinkSelect: (tabId: string) => void;
  onHelpSelect: (topic: string) => void;
}

export default function Footer({ onLinkSelect, onHelpSelect }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (tabId: string) => {
    onLinkSelect(tabId);
    if (tabId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById('shop-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-[#040d1b] text-gray-300 select-none border-t border-slate-900">
      
      {/* Top Footer Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-8">
        
        {/* Brand Column */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={handleScrollToTop}>
            <div className="w-10 h-10 rounded-full border border-sky-400 flex items-center justify-center bg-white shadow-xs overflow-hidden">
              <span className="font-serif text-lg font-black text-[#08214d] tracking-tighter">
                L<span className="text-sky-500 text-sm">A</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black text-white tracking-tight leading-none">LUCKY</span>
              <span className="text-[7px] font-bold text-gray-400 tracking-[0.1em] mt-0.5 uppercase">READYMADE & SHOE CENTER</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-light mb-6">
            Your one-stop destination for fashionable clothing, stylish shoes and quality accessories for the whole family in Bardibas, Mahottari, Nepal.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-[#1877F2] hover:border-[#1877F2] hover:bg-[#1877F2]/5 transition-all duration-300"
              aria-label="Facebook link"
            >
              <Facebook size={14} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/5 transition-all duration-300"
              aria-label="Instagram link"
            >
              <Instagram size={14} />
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
              aria-label="TikTok link"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.16 1.02 1.11 2.44 1.8 3.94 1.96V9.9c-1.78-.04-3.51-.64-4.92-1.76-.05 2.1-.03 4.2-.04 6.3-.06 2.42-.92 4.83-2.66 6.54-1.92 1.95-4.75 2.79-7.39 2.21-2.94-.61-5.4-2.91-6.14-5.8-1-3.69.75-7.91 4.19-9.52.88-.41 1.84-.63 2.81-.66V6.15c-1.31.11-2.58.74-3.46 1.74-.98 1.08-1.39 2.58-1.12 4.02.32 1.85 1.57 3.49 3.28 4.21 1.74.75 3.86.53 5.42-.51 1.34-.88 2.08-2.45 2.05-4.07-.01-3.93-.01-7.86 0-11.79.03-.23.01-.48.04-.73z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="text-left">
          <h4 className="text-xs font-extrabold tracking-widest text-sky-400 uppercase mb-5">
            QUICK LINKS
          </h4>
          <ul className="space-y-2.5 text-xs">
            {[
              { id: 'home', label: 'Home' },
              { id: 'men', label: 'Men Clothing' },
              { id: 'women', label: 'Women Clothing' },
              { id: 'kids', label: 'Kids Clothing' },
              { id: 'shoes', label: 'Shoes Collection' },
              { id: 'accessories', label: 'Accessories' },
              { id: 'new-arrivals', label: 'New Arrivals' },
              { id: 'offers', label: 'Offers' },
              { id: 'contact-us', label: 'Contact Us' },
              { id: 'login-admin', label: 'Login & Admin Portal' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer hover:translate-x-1 duration-200 inline-block"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service Column */}
        <div className="text-left">
          <h4 className="text-xs font-extrabold tracking-widest text-sky-400 uppercase mb-5">
            CUSTOMER SERVICE
          </h4>
          <ul className="space-y-2.5 text-xs">
            {[
              'My Account',
              'Orders & Returns',
              'Shipping Policy',
              'Return Policy',
              'Privacy Policy',
              'Terms & Conditions',
              'FAQs'
            ].map((item) => (
              <li key={item}>
                <button
                  onClick={() => onHelpSelect(item)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer hover:translate-x-1 duration-200 inline-block"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="text-left">
          <h4 className="text-xs font-extrabold tracking-widest text-sky-400 uppercase mb-5">
            CONTACT US
          </h4>
          <ul className="space-y-4 text-xs font-light text-gray-400">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="text-sky-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Menroad, Bardibas-1,<br />Mahottari, Nepal
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-emerald-400 shrink-0" />
              <div className="flex flex-col font-mono">
                <a href="tel:9807812515" className="hover:text-white transition-colors">9807812515</a>
                <a href="tel:9815840960" className="hover:text-white transition-colors mt-0.5">9815840960</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-indigo-400 shrink-0" />
              <a href="mailto:mdasif78664@gmail.com" className="hover:text-white transition-colors break-all">
                mdasif78664@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright bar */}
      <div className="bg-[#030a14] py-6 px-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2025 Lucky Readymade & Shoe Center. All Rights Reserved.</p>
          <button
            onClick={handleScrollToTop}
            className="group flex items-center gap-1.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-gray-400 hover:text-white py-1.5 px-3 rounded-lg cursor-pointer transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={12} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

    </footer>
  );
}
