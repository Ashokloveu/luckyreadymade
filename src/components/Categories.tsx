import { categoryCards } from '../data';

interface CategoriesProps {
  onCategorySelect: (categoryId: string) => void;
}

export default function Categories({ onCategorySelect }: CategoriesProps) {
  return (
    <section id="categories-section" className="py-12 bg-white px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      
      {/* Title with decorative lines */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <div className="h-[1px] flex-1 max-w-[80px] sm:max-w-[150px] bg-gray-200" />
        <h3 className="text-sm sm:text-base md:text-lg font-black text-[#08214d] tracking-[0.2em] uppercase text-center select-none">
          SHOP BY CATEGORY
        </h3>
        <div className="h-[1px] flex-1 max-w-[80px] sm:max-w-[150px] bg-gray-200" />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
        {categoryCards.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onCategorySelect(cat.id)}
            className="group bg-white rounded-xl border border-gray-100 hover:border-[#08214d]/20 shadow-xs hover:shadow-lg transition-all duration-350 cursor-pointer text-center p-3 sm:p-4 flex flex-col items-center select-none transform hover:-translate-y-1 active:translate-y-0"
          >
            {/* Image Wrapper */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden mb-3.5 relative shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-t from-[#08214d]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img
                src={cat.image}
                alt={`${cat.title} category`}
                className="w-full h-full object-cover group-hover:scale-112 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Labels */}
            <h4 className="text-xs sm:text-sm font-black text-gray-800 leading-tight group-hover:text-[#08214d] transition-colors">
              {cat.title}
            </h4>
            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 mt-0.5 tracking-wider uppercase">
              {cat.subtitle}
            </span>
          </div>
        ))}
      </div>

    </section>
  );
}
