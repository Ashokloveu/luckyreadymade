import React, { useState, useEffect } from 'react';
import { Search, MapPin, Truck, CheckCircle2, Clock, Calendar, ShieldCheck, HelpCircle, RefreshCw } from 'lucide-react';
import { translations, Language } from '../utils/language';

interface OrderTrackingPageProps {
  language: Language;
}

interface OrderInfo {
  id: string;
  recipient: string;
  phone: string;
  destination: string;
  amount: number;
  status: 'placed' | 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered';
  date: string;
  items: string;
  courier: string;
}

export default function OrderTrackingPage({ language }: OrderTrackingPageProps) {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [activeOrder, setActiveOrder] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const t = translations[language];

  // Auto-fill an active order if one exists in localStorage to make testing easy
  useEffect(() => {
    try {
      const invoicesStr = localStorage.getItem('lucky_billing_invoices');
      if (invoicesStr) {
        const invoices = JSON.parse(invoicesStr);
        if (invoices && invoices.length > 0) {
          const latest = invoices[0];
          // Use latest invoice to pre-populate search or give a tip
          setOrderIdInput(latest.id.replace('INV-', 'LUCKY-').replace('2026-', '') + '-NP');
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setActiveOrder(null);

    setTimeout(() => {
      setLoading(false);
      const cleanId = orderIdInput.toUpperCase().trim();

      // Check if this matches a local invoice
      let recipient = "Aashish Shrestha";
      let phone = "98440XXXXX";
      let destination = "Bardibas Ward-2, Mahottari, Nepal";
      let amount = 3499;
      let items = "1x Premium Men's Cotton Hoodie";
      let dateString = "July 02, 2026";

      try {
        const invoicesStr = localStorage.getItem('lucky_billing_invoices');
        if (invoicesStr) {
          const invoices = JSON.parse(invoicesStr);
          const found = invoices.find((inv: any) => {
            const trackingEquiv = inv.id.replace('INV-', 'LUCKY-').replace('2026-', '') + '-NP';
            return trackingEquiv.toUpperCase() === cleanId || inv.id.toUpperCase() === cleanId;
          });

          if (found) {
            recipient = "Local Customer";
            phone = "98XXXXXXXX";
            destination = "Bardibas-1, Mahottari, Nepal";
            amount = found.amount;
            items = found.plan;
            dateString = found.date;
          }
        }
      } catch (e) {
        console.error(e);
      }

      // Generate a dynamic status based on the numeric part of the ID
      const numPart = parseInt(cleanId.replace(/\D/g, '')) || 5;
      const statusList: ('placed' | 'processing' | 'dispatched' | 'out_for_delivery' | 'delivered')[] = [
        'placed', 'processing', 'dispatched', 'out_for_delivery', 'delivered'
      ];
      const status = statusList[numPart % 5];

      const mockOrder: OrderInfo = {
        id: cleanId,
        recipient,
        phone,
        destination,
        amount,
        status,
        date: dateString,
        items,
        courier: "Lucky Express Courier Service"
      };

      setActiveOrder(mockOrder);
    }, 800);
  };

  const getStepStatusClass = (stepIndex: number, currentStatus: string) => {
    const statuses = ['placed', 'processing', 'dispatched', 'out_for_delivery', 'delivered'];
    const currentIndex = statuses.indexOf(currentStatus);

    if (stepIndex < currentIndex) {
      return {
        bg: 'bg-emerald-500 text-white border-emerald-500',
        text: 'text-emerald-600 font-bold',
        line: 'bg-emerald-500'
      };
    } else if (stepIndex === currentIndex) {
      return {
        bg: 'bg-[#08214d] text-white border-[#08214d] animate-pulse',
        text: 'text-[#08214d] font-black',
        line: 'bg-gray-200'
      };
    } else {
      return {
        bg: 'bg-white text-gray-400 border-gray-200',
        text: 'text-gray-400',
        line: 'bg-gray-200'
      };
    }
  };

  // Coordinates for interactive map tracking along Mahottari - Bardibas highway
  const getTruckPosition = (status: string) => {
    switch (status) {
      case 'placed': return { x: 40, y: 150, name: "Order Received (Janakpur Hub)" };
      case 'processing': return { x: 120, y: 110, name: "Processing (Dhalkebar Sorting Center)" };
      case 'dispatched': return { x: 220, y: 130, name: "In Transit (East-West Highway)" };
      case 'out_for_delivery': return { x: 330, y: 160, name: "Out for Delivery (Bardibas Chowk)" };
      case 'delivered': return { x: 440, y: 150, name: "Delivered to Doorstep 🏡" };
      default: return { x: 40, y: 150, name: "Janakpur Hub" };
    }
  };

  const truckPos = activeOrder ? getTruckPosition(activeOrder.status) : { x: 0, y: 0, name: '' };

  return (
    <div id="order-tracking-portal" className="max-w-4xl mx-auto px-4 py-8 select-none text-left">
      <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xl p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-bold shadow-2xs">
              <Truck size={24} className="animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#08214d] tracking-tight">
                {t.trackingTitle}
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                {language === 'en' ? "Real-time delivery update within Nepal" : "नेपाल भित्र वास्तविक समयमा डेलिभरी अपडेट"}
              </p>
            </div>
          </div>
          
          <div className="bg-emerald-50 text-emerald-800 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-150 flex items-center gap-1.5 self-start sm:self-auto">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Secure Dispatch Tracking Enabled</span>
          </div>
        </div>

        {/* Search form */}
        <form onSubmit={handleTrack} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8">
          <label className="block text-xs font-black text-[#08214d] uppercase tracking-wider mb-2.5">
            {t.enterOrderId}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                required
                placeholder={t.orderIdPlaceholder}
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-xs sm:text-sm text-gray-800 rounded-xl border border-gray-200 focus:outline-hidden focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d] transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-black uppercase tracking-wider px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <Truck size={14} />
              )}
              <span>{t.trackButton}</span>
            </button>
          </div>
          
          <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400 font-medium">
            <Clock size={12} />
            <span>
              {language === 'en' 
                ? "Tip: Enter your order code from the checkout screen (e.g. LUCKY-123456-NP)" 
                : "सुझाव: चेकआउट स्क्रिनमा दिइएको कोड राख्नुहोस् (जस्तै: LUCKY-123456-NP)"}
            </span>
          </div>
        </form>

        {/* LOADING INDICATOR */}
        {loading && (
          <div className="py-20 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-[#08214d]/20 border-t-[#08214d] rounded-full animate-spin" />
            <p className="text-xs text-gray-400 font-semibold animate-pulse">
              {language === 'en' ? "Scanning Nepal dispatch hubs..." : "नेपाल डेलिभरी हबहरू खोजिदैछ..."}
            </p>
          </div>
        )}

        {/* NO ORDER SEARCHED DEFAULT */}
        {!loading && !activeOrder && (
          <div className="py-16 text-center border-2 border-dashed border-gray-150 rounded-2xl bg-gray-50/50">
            <HelpCircle size={40} className="text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-black text-gray-600 uppercase tracking-wider">
              {t.noOrderFound}
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
              {language === 'en' 
                ? "Enter your unique purchase ID above to view detailed shipping status and real-time highway location map." 
                : "विस्तृत डेलिभरी स्थिति र प्रत्यक्ष राजमार्ग स्थान नक्सा हेर्न माथि आफ्नो अद्वितीय खरिद आईडी प्रविष्ट गर्नुहोस्।"}
            </p>
          </div>
        )}

        {/* ORDER DETAILS & TIMELINE */}
        {!loading && activeOrder && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Found Order Card Summary */}
            <div className="bg-[#08214d]/5 border border-[#08214d]/10 rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#08214d]/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#08214d]/70 tracking-widest block">
                    {t.orderFound}
                  </span>
                  <span className="text-base font-black text-[#08214d] font-mono">
                    {activeOrder.id}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-bold uppercase">
                    {t.estimatedArrival}
                  </span>
                  <span className="text-xs font-black text-[#08214d]">
                    {activeOrder.status === 'delivered' ? 'Completed' : '1 - 2 Business Days'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 font-bold block mb-0.5">Recipient:</span>
                  <span className="font-extrabold text-slate-800">{activeOrder.recipient}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block mb-0.5">Contact phone:</span>
                  <span className="font-semibold text-slate-800 font-mono">{activeOrder.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block mb-0.5">{t.destination}:</span>
                  <span className="font-semibold text-slate-800">{activeOrder.destination}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block mb-0.5">Purchased items:</span>
                  <span className="font-semibold text-slate-800 italic">{activeOrder.items}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block mb-0.5">Payment amount:</span>
                  <span className="font-black text-slate-800 font-mono">Rs. {activeOrder.amount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold block mb-0.5">{t.courierName}:</span>
                  <span className="font-bold text-emerald-600">{activeOrder.courier}</span>
                </div>
              </div>
            </div>

            {/* TIMELINE */}
            <div>
              <h3 className="text-xs font-black text-[#08214d] uppercase tracking-wider mb-6">
                📍 {t.timeline}
              </h3>
              
              <div className="relative">
                {/* Horizontal line */}
                <div className="absolute top-4 left-4 right-4 h-1 bg-gray-100 -z-10 hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-4">
                  {[
                    { title: t.statusPlaced, desc: "Package registered at Janakpur hub" },
                    { title: t.statusProcessing, desc: "Packed & verified by Lucky team" },
                    { title: t.statusDispatched, desc: "Sagarmatha Highway Transit" },
                    { title: t.statusOutForDelivery, desc: "Rider dispatched from Bardibas Hub" },
                    { title: t.statusDelivered, desc: "Handover completed successfully" }
                  ].map((step, idx) => {
                    const statusStyles = getStepStatusClass(idx, activeOrder.status);
                    return (
                      <div key={idx} className="flex md:flex-col items-start md:items-center text-left md:text-center gap-4 md:gap-2.5">
                        <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all ${statusStyles.bg}`}>
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className={`text-xs uppercase tracking-wider ${statusStyles.text}`}>
                            {step.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 leading-snug mt-1 font-medium max-w-[140px] md:mx-auto">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* HIGHWAY VISUAL MAP */}
            <div className="border border-slate-100 rounded-3xl overflow-hidden bg-slate-900 text-white p-5 relative shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-sky-400">
                  🗺️ {t.mapView}
                </h4>
                <span className="text-[9px] font-mono text-emerald-400 animate-pulse uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Live GPS Active
                </span>
              </div>

              {/* SVG Map Canvas */}
              <div className="relative w-full h-[220px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                <svg className="w-full h-full opacity-80" viewBox="0 0 500 200">
                  {/* Decorative Nepal terrain coordinates */}
                  <path d="M 0,100 Q 150,50 300,80 T 500,60" fill="none" stroke="#ffffff10" strokeWidth="2" strokeDasharray="5,5" />
                  <path d="M 0,160 Q 200,120 400,180 T 500,130" fill="none" stroke="#ffffff08" strokeWidth="1" />

                  {/* Highway Route */}
                  <path d="M 40,150 L 120,110 L 220,130 L 330,160 L 440,150" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M 40,150 L 120,110 L 220,130 L 330,160 L 440,150" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8,4" className="animate-pulse" />

                  {/* Milestones / Hubs */}
                  <g className="cursor-pointer">
                    <circle cx="40" cy="150" r="7" fill="#10b981" />
                    <circle cx="40" cy="150" r="11" fill="none" stroke="#10b981" strokeWidth="2" className="animate-ping" />
                    <text x="40" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">Janakpur</text>
                  </g>

                  <g className="cursor-pointer">
                    <circle cx="120" cy="110" r="6" fill="#3b82f6" />
                    <text x="120" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">Dhalkebar</text>
                  </g>

                  <g className="cursor-pointer">
                    <circle cx="220" cy="130" r="6" fill="#3b82f6" />
                    <text x="220" y="115" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">East-West Hwy</text>
                  </g>

                  <g className="cursor-pointer">
                    <circle cx="330" cy="160" r="7" fill="#f59e0b" />
                    <text x="330" y="180" fill="#94a3b8" fontSize="9" textAnchor="middle" fontWeight="bold">Bardibas Hub</text>
                  </g>

                  <g className="cursor-pointer">
                    <circle cx="440" cy="150" r="8" fill="#ef4444" />
                    <circle cx="440" cy="150" r="13" fill="none" stroke="#ef4444" strokeWidth="2" className="animate-ping" />
                    <text x="440" y="135" fill="#ef4444" fontSize="9" textAnchor="middle" fontWeight="black">Home (Nepal)</text>
                  </g>

                  {/* Active delivery courier truck */}
                  <g transform={`translate(${truckPos.x - 15}, ${truckPos.y - 15})`} className="transition-all duration-1000">
                    <rect width="30" height="20" rx="4" fill="#08214d" stroke="#60a5fa" strokeWidth="2" className="shadow-lg" />
                    <circle cx="8" cy="20" r="4" fill="#000" />
                    <circle cx="22" cy="20" r="4" fill="#000" />
                    <rect x="20" y="3" width="8" height="10" rx="1" fill="#60a5fa" />
                    <path d="M 4,10 L 16,10" stroke="#fff" strokeWidth="1.5" />
                  </g>
                </svg>

                {/* Truck Live Location Tooltip */}
                <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 rounded-xl p-2 px-3 text-[10px] space-y-0.5 shadow-md">
                  <span className="text-gray-400 block font-bold uppercase">Current Truck Location:</span>
                  <span className="font-extrabold text-sky-400">{truckPos.name}</span>
                </div>
              </div>
              
              <div className="mt-4 text-[10px] text-gray-400 text-center font-medium leading-relaxed">
                {language === 'en' 
                  ? "Note: Vehicle location updates approximately every 15 minutes. For immediate courier phone contact, please dial support." 
                  : "नोट: सवारी साधनको स्थान लगभग प्रत्येक १५ मिनेटमा अपडेट हुन्छ। कुरियरको फोन सम्पर्कको लागि, कृपया समर्थनमा डायल गर्नुहोस्।"}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
