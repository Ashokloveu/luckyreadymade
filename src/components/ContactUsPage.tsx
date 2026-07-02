import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, ArrowRight, ExternalLink, ShieldCheck, Award, Tag, Truck } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      return;
    }
    // Simulate successful message transmission
    setStatus('success');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen pb-16 font-sans">
      
      {/* 1. Breadcrumb Path Exactly Like Reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-1 select-none">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium text-left">
          <span className="hover:text-[#08214d] cursor-pointer">Home</span>
          <span>&gt;</span>
          <span className="text-gray-500 font-semibold">Contact Us</span>
        </div>
      </div>

      {/* 2. Top Banner Row: Title, Subtitle */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-6 text-left select-none">
        <h1 className="text-2xl sm:text-3xl font-black text-[#08214d] uppercase tracking-tight">
          CONTACT US
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium mt-1">
          We&apos;d love to hear from you! Get in touch with us for any queries or assistance.
        </p>
      </div>

      {/* 3. Main Split Layout: GET IN TOUCH vs SEND US A MESSAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* ==================== LEFT COLUMN: GET IN TOUCH (5/12 width) ==================== */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 flex flex-col justify-between shadow-sm select-none">
          <div>
            <h2 className="text-sm font-black text-[#08214d] uppercase tracking-wider">
              GET IN TOUCH
            </h2>
            <p className="text-xs text-gray-400 mt-1 mb-8 font-medium">
              Reach out to us through any of the following channels.
            </p>

            {/* List of contact elements */}
            <div className="space-y-6">
              
              {/* Location card */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gray-150/80 bg-white flex items-center justify-center text-[#08214d] shadow-xs shrink-0">
                  <MapPin size={18} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wide">Our Location</h4>
                  <p className="text-xs text-gray-800 font-bold mt-1 leading-relaxed">
                    Lucky Readymade & Shoe Center
                  </p>
                  <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                    Bardibas–1, Mahottari, Nepal
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gray-150/80 bg-white flex items-center justify-center text-[#08214d] shadow-xs shrink-0">
                  <Phone size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wide">Phone</h4>
                  <p className="text-xs text-gray-800 font-bold mt-1 leading-relaxed">
                    9807812515
                  </p>
                  <p className="text-xs text-gray-800 font-bold mt-0.5 leading-relaxed">
                    9815840960
                  </p>
                  <p className="text-[11px] text-gray-400 font-semibold mt-1">
                    Sun – Fri (10:00 AM – 7:00 PM)
                  </p>
                </div>
              </div>

              {/* Email card */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gray-150/80 bg-white flex items-center justify-center text-[#08214d] shadow-xs shrink-0">
                  <Mail size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wide">Email</h4>
                  <p className="text-xs text-gray-800 font-bold mt-1 leading-relaxed">
                    mdasif78664@gmail.com
                  </p>
                  <p className="text-xs text-gray-800 font-bold mt-0.5 leading-relaxed">
                    support@luckyshoecenter.com
                  </p>
                </div>
              </div>

              {/* Working Hours card */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gray-150/80 bg-white flex items-center justify-center text-[#08214d] shadow-xs shrink-0">
                  <Clock size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wide">Working Hours</h4>
                  <p className="text-xs text-gray-800 font-bold mt-1 leading-relaxed">
                    Sunday – Friday: 10:00 AM – 7:00 PM
                  </p>
                  <p className="text-xs text-gray-800 font-bold mt-0.5 leading-relaxed">
                    Saturday: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              {/* Live Chat card */}
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full border border-gray-150/80 bg-white flex items-center justify-center text-[#08214d] shadow-xs shrink-0">
                  <MessageSquare size={16} className="stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wide">Live Chat</h4>
                  <p className="text-xs text-gray-800 font-bold mt-1 leading-relaxed">
                    Chat with our support team
                  </p>
                  <button 
                    onClick={() => alert("Connecting to a live representative in Bardibas, Nepal...")}
                    className="text-xs text-[#08214d] hover:text-blue-700 font-black tracking-wide mt-1.5 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Start Live Chat</span>
                    <ArrowRight size={12} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Social Follow rows at the bottom */}
          <div className="mt-12 pt-6 border-t border-gray-100 flex items-center gap-4.5">
            <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Follow Us</span>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-center text-slate-700"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-pink-50 hover:text-pink-600 transition-colors flex items-center justify-center text-slate-700"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-600 transition-colors flex items-center justify-center text-slate-700"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.63 4.15 1.13 1.22 2.69 1.94 4.31 2.06v3.86a9.016 9.016 0 0 1-5.1-1.74v7.71c.08 4.79-3.77 8.8-8.56 8.94a8.81 8.81 0 0 1-7.24-3.72 9.03 9.03 0 0 1-1.39-7.39c.81-4.04 4.19-7.16 8.3-7.46.2-.01.41-.01.61-.01v3.8c-.14-.01-.28-.01-.42 0a5.132 5.132 0 0 0-4.66 4.75 5.15 5.15 0 0 0 4.11 5.37c3.12.65 6.07-1.57 6.27-4.75.02-1 .01-2.01.01-3.02V0h.03z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* ==================== RIGHT COLUMN: SEND US A MESSAGE (7/12 width) ==================== */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm">
          <h2 className="text-sm font-black text-[#08214d] uppercase tracking-wider">
            SEND US A MESSAGE
          </h2>
          <p className="text-xs text-gray-400 mt-1 mb-6 font-medium">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Success and Error Indicators */}
            {status === 'success' && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3.5 rounded-lg">
                ✓ Message received! Thank you for contacting us, we will respond shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-rose-50 border border-rose-200 text-rose-850 text-xs font-bold p-3.5 rounded-lg">
                ⚠ Please fill out all required fields marked with an asterisk (*).
              </div>
            )}

            {/* Row 1: First Name, Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
                />
              </div>
            </div>

            {/* Row 2: Email */}
            <div>
              <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
              />
            </div>

            {/* Row 3: Phone Number */}
            <div>
              <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
              />
            </div>

            {/* Row 4: Subject Select Option */}
            <div>
              <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">
                Subject <span className="text-rose-500">*</span>
              </label>
              <div className="relative text-xs">
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="appearance-none w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
                >
                  <option value="">Select a subject</option>
                  <option value="General Query">General Inquiry / Question</option>
                  <option value="Order Support">Order Tracking & support</option>
                  <option value="Refund Request">Return / Refund query</option>
                  <option value="Brand Partnership">Wholesale & Brand Partnership</option>
                  <option value="Others">Others</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  <svg className="w-3.5 h-3.5 fill-current stroke-[2.5]" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5H7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Row 5: Message text area */}
            <div>
              <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">
                Message <span className="text-rose-500">*</span>
              </label>
              <textarea
                placeholder="Type your message here..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
              />
            </div>

            {/* Row 6: Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-[#05142e] hover:bg-[#0c244c] text-white text-[10px] font-black tracking-widest uppercase py-3.5 px-7 rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SEND MESSAGE</span>
                <Send size={11} className="fill-current stroke-[2]" />
              </button>
            </div>

          </form>
        </div>

      </div>

      {/* 4. Beautiful Styled Visual Vector Map Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-left">
        <h3 className="text-sm font-black text-[#08214d] uppercase tracking-wider mb-5">
          FIND US HERE
        </h3>

        {/* Map mockup frame */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-gray-150/80 shadow-sm bg-[#e5e9f0] select-none">
          
          {/* Custom vector layout portraying actual roads and landmarks of Bardibas, Nepal */}
          <div className="absolute inset-0 opacity-100 overflow-hidden">
            <svg viewBox="0 0 1000 400" className="w-full h-full text-gray-400">
              
              {/* Grid backdrop */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f1f3f6" strokeWidth="1" />
                </pattern>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15"/>
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Water streams/canals representing local geography */}
              <path d="M-50,80 Q 250,50 480,180 T 1050,320" fill="none" stroke="#b0d4f1" strokeWidth="22" strokeLinecap="round" />
              <path d="M-50,80 Q 250,50 480,180 T 1050,320" fill="none" stroke="#c9e3f6" strokeWidth="14" strokeLinecap="round" />
              <text x="820" y="270" className="fill-[#5390c5] font-sans text-[10px] font-black italic tracking-widest uppercase rotate-[10deg]">Ratu River (रातु खोला)</text>

              {/* Major Highway / Mahendra Highway crossing Bardibas (East-West) */}
              <path d="M-50,220 L 1050,220" fill="none" stroke="#ffffff" strokeWidth="26" />
              <path d="M-50,220 L 1050,220" fill="none" stroke="#fbd350" strokeWidth="18" />
              <path d="M-50,220 L 1050,220" fill="none" stroke="#4a5568" strokeWidth="1" strokeDasharray="8 6" />

              {/* Highway labels */}
              <text x="180" y="200" className="fill-slate-600 font-sans text-[9px] font-black tracking-wider uppercase bg-white">Mahendra Highway (महेन्द्र राजमार्ग)</text>
              <text x="750" y="200" className="fill-slate-600 font-sans text-[9px] font-black tracking-wider uppercase bg-white">H01 Highway</text>

              {/* BP Highway branching north-west from Bardibas Chowk */}
              <path d="M 400,220 L 300, -50" fill="none" stroke="#ffffff" strokeWidth="22" />
              <path d="M 400,220 L 300, -50" fill="none" stroke="#fbd350" strokeWidth="14" />
              <path d="M 400,220 L 300, -50" fill="none" stroke="#4a5568" strokeWidth="1" strokeDasharray="8 6" />
              <text x="210" y="90" className="fill-slate-600 font-sans text-[9px] font-black tracking-wider uppercase rotate-[-70deg]">BP Highway (बी.पी. राजमार्ग)</text>

              {/* Secondary roads and pathways */}
              <path d="M 280,220 L 280,450" fill="none" stroke="#ffffff" strokeWidth="10" />
              <path d="M 550,-50 L 550,220 L 680,450" fill="none" stroke="#ffffff" strokeWidth="12" />
              <path d="M 120,-50 L 120,450" fill="none" stroke="#ffffff" strokeWidth="8" />
              <path d="M 400,220 L 480,450" fill="none" stroke="#ffffff" strokeWidth="14" />

              {/* Neighborhood zones */}
              <circle cx="280" cy="110" r="45" fill="#e2ebd5" opacity="0.5" />
              <text x="250" y="115" className="fill-[#537233] font-sans text-[8px] font-black tracking-widest uppercase">Ward No. 1</text>
              
              <circle cx="700" cy="110" r="60" fill="#e2ebd5" opacity="0.5" />
              <text x="670" y="110" className="fill-[#537233] font-sans text-[8px] font-black tracking-widest uppercase">Bata Colony</text>

              <circle cx="150" cy="310" r="50" fill="#e2ebd5" opacity="0.5" />
              <text x="110" y="315" className="fill-[#537233] font-sans text-[8px] font-black tracking-widest uppercase">Mahottari District</text>

              {/* Local styled landmarks */}
              {/* Bardibas Bus Park */}
              <g transform="translate(320,130)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="8" y="-7" width="92" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">Bardibas Bus Park</text>
              </g>

              {/* Nepal Bank Limited */}
              <g transform="translate(350,270)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="8" y="-7" width="94" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">Nepal Bank Limited</text>
              </g>

              {/* Bardibas Bazaar */}
              <g transform="translate(480,245)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="8" y="-7" width="76" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">Bardibas Bazaar</text>
              </g>

              {/* Sagarmatha Chowk */}
              <g transform="translate(380,335)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="-96" y="-7" width="88" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="-91" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">Sagarmatha Chowk</text>
              </g>

              {/* Hotel Yeti */}
              <g transform="translate(535,220)">
                <circle cx="0" cy="0" r="4" className="fill-pink-500" />
                <rect x="8" y="-7" width="56" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-pink-800 font-sans text-[8px] font-extrabold">HOTEL YETI</text>
              </g>

              {/* Hospital */}
              <g transform="translate(630,190)">
                <circle cx="0" cy="0" r="4" className="fill-red-500" />
                <rect x="-124" y="-7" width="116" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="-119" y="3" className="fill-red-800 font-sans text-[8px] font-extrabold">Janata Service Hospital</text>
              </g>

              {/* Hulas Steel */}
              <g transform="translate(740,160)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="8" y="-7" width="60" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">Hulas Steel</text>
              </g>

              {/* Ever Asia Bank */}
              <g transform="translate(710,205)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="8" y="-7" width="76" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">Ever Asia Bank</text>
              </g>

              {/* NIC Asia Bank */}
              <g transform="translate(755,245)">
                <circle cx="0" cy="0" r="4" className="fill-blue-500" />
                <rect x="8" y="-7" width="76" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="13" y="3" className="fill-blue-800 font-sans text-[8px] font-extrabold">NIC Asia Bank</text>
              </g>

              {/* Mahottari Temple */}
              <g transform="translate(245,335)">
                <circle cx="0" cy="0" r="4" className="fill-amber-600" />
                <rect x="-116" y="-7" width="108" height="15" rx="3" fill="#ffffff" filter="url(#shadow)" />
                <text x="-111" y="3" className="fill-amber-900 font-sans text-[8px] font-extrabold">Mahottari Temple</text>
              </g>

              {/* LUCKY CENTER TARGET PIN POINT */}
              <g transform="translate(480,185)" className="cursor-pointer">
                {/* Expanding pulse animation overlay */}
                <circle cx="0" cy="0" r="16" className="fill-[#08214d]/15 animate-ping" />
                <circle cx="0" cy="0" r="10" className="fill-[#08214d]/20" />
                
                {/* Pin shadow */}
                <ellipse cx="0" cy="12" rx="5" ry="2" className="fill-black/30" />
                
                {/* Real pin */}
                <path d="M0,-12 C-7,-12 -7,-4 0,12 C7,-4 7,-12 0,-12 Z" className="fill-[#08214d]" />
                <circle cx="0" cy="-6" r="3.5" className="fill-white" />
              </g>

            </svg>
          </div>

          {/* Floated custom Map Details Overlay Card */}
          <div className="absolute top-6 left-6 z-10 max-w-[240px] bg-white rounded-xl p-4.5 border border-gray-150/60 shadow-lg text-left select-none animate-fade-in">
            <h4 className="text-xs font-black text-[#08214d] uppercase tracking-wide">
              Lucky Readymade & Shoe Center
            </h4>
            <p className="text-[11px] text-gray-500 font-medium mt-1 leading-relaxed">
              Bardibas–1, Mahottari, Nepal
            </p>
            <button 
              onClick={() => window.open('https://maps.google.com/?q=Lucky+Readymade+and+Shoe+Center+Bardibas+Nepal', '_blank')}
              className="text-[10px] text-blue-600 hover:text-blue-800 font-black tracking-wide uppercase mt-3 flex items-center gap-1 cursor-pointer"
            >
              <span>View larger map</span>
              <ExternalLink size={10} className="stroke-[2.5]" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
