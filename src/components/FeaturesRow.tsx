import { ShieldAlert, RefreshCw, Truck, Headphones } from 'lucide-react';

export default function FeaturesRow() {
  const features = [
    {
      id: 1,
      title: '100% Original Products',
      desc: 'We deal only in original branded items.',
      icon: ShieldAlert,
      color: 'text-sky-500 bg-sky-50 border-sky-100',
    },
    {
      id: 2,
      title: 'Easy Returns',
      desc: 'Hassle free return within 7 days.',
      icon: RefreshCw,
      color: 'text-emerald-500 bg-emerald-50 border-emerald-100',
    },
    {
      id: 3,
      title: 'Fast Delivery',
      desc: 'Quick delivery at your doorstep.',
      icon: Truck,
      color: 'text-indigo-500 bg-indigo-50 border-indigo-100',
    },
    {
      id: 4,
      title: 'Customer Support',
      desc: "We're here to help you anytime.",
      icon: Headphones,
      color: 'text-amber-500 bg-amber-50 border-amber-100',
    }
  ];

  return (
    <section id="features-row" className="bg-white border-y border-gray-100 py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/70 transition-all duration-200 select-none border border-transparent hover:border-gray-100"
              >
                {/* Icon circle */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center border-2 shrink-0 ${feat.color}`}>
                  <Icon size={18} className="stroke-[2.5]" />
                </div>

                {/* Text Content */}
                <div className="text-left">
                  <h4 className="text-sm font-black text-gray-800 tracking-tight leading-tight">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-medium mt-1 leading-snug">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
