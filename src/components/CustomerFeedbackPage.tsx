import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, CheckCircle, User, Award, ShieldAlert } from 'lucide-react';
import { translations, Language } from '../utils/language';

interface CustomerFeedbackPageProps {
  language: Language;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  category: string;
  comment: string;
  date: string;
  verified: boolean;
}

export default function CustomerFeedbackPage({ language }: CustomerFeedbackPageProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  
  // Submit Feedback Form states
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formCategory, setFormCategory] = useState('Clothing');
  const [formComment, setFormComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const t = translations[language];

  // Load reviews on mount
  useEffect(() => {
    const defaultReviews: Review[] = [
      { id: 'rev-1', name: "Suresh Mahato", rating: 5, category: "Shoes", comment: "Outstanding shoe quality! Visited the Bardibas showroom and bought two pairs of shoes. Super comfortable and durable.", date: "June 25, 2026", verified: true },
      { id: 'rev-2', name: "Kripa Shrestha", rating: 5, category: "Clothing", comment: "The men's hoodies and women's kurta sets have the best stitching. Very responsive customer care call too! Highly recommended.", date: "June 18, 2026", verified: true },
      { id: 'rev-3', name: "Binod Adhikari", rating: 4, category: "Accessories", comment: "Fast shipping to Mahottari. Quality of jacket and belt is impressive. Will definitely order again soon.", date: "June 10, 2026", verified: true },
      { id: 'rev-4', name: "Aaradhya Thapa", rating: 5, category: "Kids Wear", comment: "Super cute winter outfits for kids. The material is extremely soft and breathable. Best clothing center in Bardibas-1!", date: "May 29, 2026", verified: true },
      { id: 'rev-5', name: "Aslam Ansari", rating: 3, category: "Clothing", comment: "Good quality clothes, but delivery inside Janakpur highway took 3 days instead of 2. Customer support resolved it instantly though.", date: "May 15, 2026", verified: false }
    ];

    try {
      const saved = localStorage.getItem('lucky_customer_reviews');
      if (saved) {
        setReviews(JSON.parse(saved));
      } else {
        setReviews(defaultReviews);
        localStorage.setItem('lucky_customer_reviews', JSON.stringify(defaultReviews));
      }
    } catch (e) {
      setReviews(defaultReviews);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateString = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      rating: formRating,
      category: formCategory,
      comment: formComment.trim(),
      date: dateString,
      verified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('lucky_customer_reviews', JSON.stringify(updated));

    // Clear and show success
    setFormName('');
    setFormComment('');
    setFormRating(5);
    setSubmitSuccess(true);
    
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 4000);
  };

  const filteredReviews = filterRating === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === filterRating);

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "4.8";

  return (
    <div id="customer-feedback-portal" className="max-w-4xl mx-auto px-4 py-8 select-none text-left">
      <div className="bg-white rounded-3xl border border-gray-150 overflow-hidden shadow-xl p-6 sm:p-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center font-bold shadow-2xs">
              <MessageSquare size={24} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#08214d] tracking-tight">
                {t.feedbackTitle}
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                {language === 'en' ? "What our verified clients say about Lucky Center" : "लकी सेन्टरको बारेमा हाम्रा ग्राहकहरूको समीक्षा"}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-black text-[#08214d]">
            <Award size={16} className="text-amber-500" />
            <span>Rating: {averageRating} / 5.0</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* REVIEW FORM & STATS (LEFT - 5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Summary */}
            <div className="bg-[#08214d]/5 border border-[#08214d]/10 rounded-2xl p-5 text-center">
              <h4 className="text-[10px] font-black uppercase text-[#08214d]/70 tracking-widest block mb-1">
                {t.overallRating}
              </h4>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-4xl font-serif font-black text-[#08214d]">{averageRating}</span>
                <span className="text-xs font-bold text-gray-400">/ 5.0</span>
              </div>
              
              <div className="flex justify-center gap-1 mt-2 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    size={16} 
                    className={s <= Math.round(parseFloat(averageRating)) ? "fill-amber-400 stroke-amber-400" : "text-gray-200"} 
                  />
                ))}
              </div>
              <p className="text-[10px] text-gray-400 font-medium">
                Based on {reviews.length} verified ratings submitted by clients inside Bardibas and Mahottari.
              </p>
            </div>

            {/* Submit review Form */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5">
              <h3 className="text-xs font-black text-[#08214d] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Plus size={14} />
                <span>{t.writeReview}</span>
              </h3>

              {submitSuccess && (
                <div className="bg-emerald-50 border border-emerald-150 rounded-xl p-3.5 mb-4 flex items-start gap-2.5 animate-scale-up">
                  <CheckCircle size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-extrabold text-emerald-800 block">Review Submitted!</span>
                    <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                      Thank you! Your feedback has been persistently registered in our customer review feed.
                    </span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t.yourName} *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Krishna Kumar"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-white text-xs text-gray-800 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t.rating} *</label>
                    <select
                      value={formRating}
                      onChange={(e) => setFormRating(Number(e.target.value))}
                      className="w-full px-2 py-2 bg-white text-xs text-gray-800 rounded-lg border border-slate-200 focus:outline-hidden"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                      <option value={4}>⭐⭐⭐⭐ (4)</option>
                      <option value={3}>⭐⭐⭐ (3)</option>
                      <option value={2}>⭐⭐ (2)</option>
                      <option value={1}>⭐ (1)</option>
                    </select>
                  </div>

                  {/* Category Purchased */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t.categoryPurchased} *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-2 py-2 bg-white text-xs text-gray-800 rounded-lg border border-slate-200 focus:outline-hidden"
                    >
                      <option value="Clothing">Clothing</option>
                      <option value="Shoes">Shoes</option>
                      <option value="Kids Wear">Kids Wear</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>

                {/* Feedback Comment */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">{t.yourReview} *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your purchase experience, quality of material, or customer service..."
                    value={formComment}
                    onChange={(e) => setFormComment(e.target.value)}
                    className="w-full px-3 py-2 bg-white text-xs text-gray-800 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#08214d]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#08214d] hover:bg-[#1d4289] text-white text-xs font-black uppercase tracking-wider py-3 rounded-lg transition-all shadow-3xs cursor-pointer text-center"
                >
                  {t.postReview}
                </button>
              </form>

            </div>

          </div>

          {/* REVIEWS LIST FEED (RIGHT - 7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Star Filters */}
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">
                Filter:
              </span>
              <button
                onClick={() => setFilterRating('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  filterRating === 'all' 
                    ? 'bg-[#08214d] text-white' 
                    : 'bg-gray-50 border border-gray-150 text-gray-500 hover:bg-gray-100'
                }`}
              >
                All Reviews ({reviews.length})
              </button>
              {[5, 4, 3, 2, 1].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterRating(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    filterRating === s 
                      ? 'bg-[#08214d] text-white' 
                      : 'bg-gray-50 border border-gray-150 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <span>{s}</span>
                  <Star size={11} className="fill-current" />
                </button>
              ))}
            </div>

            {/* FEED LIST */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {filteredReviews.length === 0 ? (
                <div className="py-12 text-center border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50">
                  <p className="text-xs text-gray-400 font-bold">No reviews found matching selection.</p>
                </div>
              ) : (
                filteredReviews.map((rev) => (
                  <div 
                    key={rev.id} 
                    className="border border-gray-150 hover:border-slate-300 rounded-2xl p-4.5 bg-white transition-all space-y-2 text-left"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-extrabold flex items-center justify-center text-xs">
                          {rev.name[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-800">{rev.name}</span>
                            {rev.verified && (
                              <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                                Verified Buy
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400 block font-medium">Category: {rev.category}</span>
                        </div>
                      </div>
                      
                      <span className="text-[10px] text-gray-400 font-medium font-mono">
                        {rev.date}
                      </span>
                    </div>

                    {/* Star Rating */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={12} 
                          className={star <= rev.rating ? "fill-amber-400 stroke-amber-400" : "text-gray-200"} 
                        />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/30">
                      {rev.comment}
                    </p>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
