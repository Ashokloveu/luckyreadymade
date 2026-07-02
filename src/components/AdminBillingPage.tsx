import React, { useState, useEffect } from 'react';
import InstantInvoicePage from './InstantInvoicePage';
import { 
  CreditCard, Download, Upload, Clock, Settings, LayoutDashboard, Calendar, 
  Trash2, Edit, Plus, FileText, Check, AlertTriangle, Eye, ArrowUpRight, 
  Sparkles, CheckCircle2, ChevronRight, X, Heart, ShieldCheck, HelpCircle, 
  Award, RefreshCw, BarChart2, Layers, Printer
} from 'lucide-react';

// Interfaces
export interface BillingPlan {
  id: string;
  name: string;
  slug: string;
  billingCycle: 'Monthly' | 'Yearly';
  price: number;
  comparePrice?: number;
  shortDescription: string;
  status: 'Active' | 'Inactive';
  popular: boolean;
  image?: string;
  features: string[];
}

export interface BillingInvoice {
  id: string;
  date: string;
  plan: string;
  amount: number;
  status: 'Paid' | 'Overdue' | 'Pending';
  paymentMethod: string;
}

export interface BillingPaymentMethod {
  brand: string; // 'VISA' | 'MasterCard' | 'eSewa' | 'Fonepay'
  last4: string;
  cardHolder: string;
  expiry: string;
}

export interface BillingUsage {
  products: { current: number; max: number };
  orders: { current: number; max: number };
  storage: { current: number; max: number; unit: string };
  teamMembers: { current: number; max: number };
}

interface AdminBillingPageProps {
  subTab: string; // 'billing-overview' | 'billing-plans' | 'billing-invoices' | 'billing-methods' | 'billing-transactions' | 'billing-settings'
  onSubTabChange: (id: string) => void;
}

export default function AdminBillingPage({ subTab = 'billing-overview', onSubTabChange }: AdminBillingPageProps) {
  // Local state for Plans list
  const [plans, setPlans] = useState<BillingPlan[]>(() => {
    const saved = localStorage.getItem('lucky_billing_plans');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'plan-1',
        name: 'Enterprise',
        slug: 'enterprise-monthly',
        billingCycle: 'Monthly',
        price: 5999,
        comparePrice: 7999,
        shortDescription: 'Comprehensive high-volume scale engine for prominent retail operations.',
        status: 'Active',
        popular: true,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300',
        features: ['Up to 5,000 Products', 'Up to 10,000 Orders/mo', '100 GB Storage Space', 'Up to 20 Team Members', 'Dedicated Priority Helpline Support']
      },
      {
        id: 'plan-2',
        name: 'Premium Pro',
        slug: 'premium-pro-monthly',
        billingCycle: 'Monthly',
        price: 2999,
        comparePrice: 3999,
        shortDescription: 'Ideal for medium size local fashion retail storefronts with expanding footprints.',
        status: 'Active',
        popular: false,
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300',
        features: ['Up to 2,000 Products', 'Up to 4,000 Orders/mo', '40 GB Storage Space', 'Up to 8 Team Members', 'Standard Business Hours Support']
      },
      {
        id: 'plan-3',
        name: 'Starter Basic',
        slug: 'starter-basic-monthly',
        billingCycle: 'Monthly',
        price: 1499,
        comparePrice: 1999,
        shortDescription: 'Perfect entry layer for small localized shops starting with online selling.',
        status: 'Active',
        popular: false,
        image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=300',
        features: ['Up to 500 Products', 'Up to 1,000 Orders/mo', '10 GB Storage Space', 'Up to 2 Team Members', 'Online Ticket Support Only']
      }
    ];
  });

  // Local state for Invoices list
  const [invoices, setInvoices] = useState<BillingInvoice[]>(() => {
    const saved = localStorage.getItem('lucky_billing_invoices');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'INV-2025-0006', date: '25 May, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
      { id: 'INV-2025-0005', date: '25 Apr, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
      { id: 'INV-2025-0004', date: '25 Mar, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
      { id: 'INV-2025-0003', date: '25 Feb, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' },
      { id: 'INV-2025-0002', date: '25 Jan, 2025', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Overdue', paymentMethod: 'VISA **** 4242' },
      { id: 'INV-2024-0001', date: '25 Dec, 2024', plan: 'Enterprise (Monthly)', amount: 5999, status: 'Paid', paymentMethod: 'VISA **** 4242' }
    ];
  });

  // Local state for current active plan details
  const [currentPlanId, setCurrentPlanId] = useState<string>('plan-1');
  
  // Local state for payment method
  const [paymentMethod, setPaymentMethod] = useState<BillingPaymentMethod>(() => {
    const saved = localStorage.getItem('lucky_billing_method');
    if (saved) return JSON.parse(saved);
    return {
      brand: 'VISA',
      last4: '4242',
      cardHolder: 'Super Admin',
      expiry: '12/28'
    };
  });

  // Usage Overview stats state
  const [usage, setUsage] = useState<BillingUsage>({
    products: { current: 1256, max: 5000 },
    orders: { current: 2568, max: 10000 },
    storage: { current: 12.4, max: 100, unit: 'GB' },
    teamMembers: { current: 8, max: 20 }
  });

  // Billing Settings State
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('lucky_billing_settings');
    if (saved) return JSON.parse(saved);
    return {
      companyName: 'Lucky Readymade & Shoe Center',
      billingEmail: 'billing@luckycenter.com',
      taxId: 'PAN-302451928',
      address: 'Menroad, Bardibas-1, Mahottari, Nepal',
      currency: 'Rs.',
      invoicePrefix: 'INV-'
    };
  });

  // State for Add / Edit Plan Side drawer panel
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<'Add' | 'Edit'>('Add');
  const [panelTab, setPanelTab] = useState<'details' | 'features'>('details');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // Form states for Plan Add/Edit
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCycle, setFormCycle] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [formPrice, setFormPrice] = useState('');
  const [formComparePrice, setFormComparePrice] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');
  const [formPopular, setFormPopular] = useState(false);
  const [formImage, setFormImage] = useState('');
  const [formFeatures, setFormFeatures] = useState<string[]>(['']);

  // Edit payment method modal state
  const [isMethodModalOpen, setIsMethodModalOpen] = useState(false);
  const [cardBrand, setCardBrand] = useState('VISA');
  const [cardHolder, setCardHolder] = useState('Super Admin');
  const [cardNumber, setCardNumber] = useState('4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');

  // New Invoice Modal
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [showInstantCreator, setShowInstantCreator] = useState(false);
  const [invoicePlan, setInvoicePlan] = useState('Enterprise (Monthly)');
  const [invoiceAmount, setInvoiceAmount] = useState('5999');
  const [invoiceStatus, setInvoiceStatus] = useState<'Paid' | 'Overdue' | 'Pending'>('Paid');

  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState('');
  const [invoiceTypeFilter, setInvoiceTypeFilter] = useState<'all' | 'website' | 'saas'>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<BillingInvoice | null>(null);
  const [editingInvoice, setEditingInvoice] = useState<BillingInvoice | null>(null);

  const startEditInvoice = (invoice: BillingInvoice) => {
    setEditingInvoice(invoice);
    setInvoicePlan(invoice.plan);
    setInvoiceAmount(invoice.amount.toString());
    setInvoiceStatus(invoice.status);
    setIsInvoiceModalOpen(true);
  };

  // Notification Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Save data to localStorage on changes
  useEffect(() => {
    localStorage.setItem('lucky_billing_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('lucky_billing_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('lucky_billing_method', JSON.stringify(paymentMethod));
  }, [paymentMethod]);

  useEffect(() => {
    localStorage.setItem('lucky_billing_settings', JSON.stringify(settings));
  }, [settings]);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Find active plan details
  const currentPlan = plans.find(p => p.id === currentPlanId) || plans[0];

  // Handler for custom image file uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast("Image exceeds maximum permitted size of 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormImage(reader.result as string);
        triggerToast("Plan logo/image loaded successfully!", "info");
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Add Plan Panel
  const openAddPanel = () => {
    setPanelMode('Add');
    setPanelTab('details');
    setSelectedPlanId(null);
    setFormName('');
    setFormSlug('');
    setFormCycle('Monthly');
    setFormPrice('');
    setFormComparePrice('');
    setFormDescription('');
    setFormStatus('Active');
    setFormPopular(false);
    setFormImage('');
    setFormFeatures(['Premium Customer Support', 'Up to 2,000 active catalog items', 'Realtime transactional logs']);
    setIsPanelOpen(true);
  };

  // Open Edit Plan Panel
  const openEditPanel = (plan: BillingPlan) => {
    setPanelMode('Edit');
    setPanelTab('details');
    setSelectedPlanId(plan.id);
    setFormName(plan.name);
    setFormSlug(plan.slug);
    setFormCycle(plan.billingCycle);
    setFormPrice(String(plan.price));
    setFormComparePrice(plan.comparePrice ? String(plan.comparePrice) : '');
    setFormDescription(plan.shortDescription);
    setFormStatus(plan.status);
    setFormPopular(plan.popular);
    setFormImage(plan.image || '');
    setFormFeatures(plan.features.length > 0 ? [...plan.features] : ['']);
    setIsPanelOpen(true);
  };

  // Save Plan Action
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim() || !formPrice.trim()) {
      triggerToast("Please fill in all mandatory plan parameters (*)", "error");
      return;
    }

    const priceNum = parseFloat(formPrice);
    const comparePriceNum = formComparePrice ? parseFloat(formComparePrice) : undefined;

    if (isNaN(priceNum)) {
      triggerToast("Price must be a valid number", "error");
      return;
    }

    // Filter out blank features
    const cleanFeatures = formFeatures.filter(f => f.trim() !== '');

    if (panelMode === 'Add') {
      const newPlan: BillingPlan = {
        id: `plan-${Date.now()}`,
        name: formName,
        slug: formSlug,
        billingCycle: formCycle,
        price: priceNum,
        comparePrice: comparePriceNum,
        shortDescription: formDescription,
        status: formStatus,
        popular: formPopular,
        image: formImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300',
        features: cleanFeatures.length > 0 ? cleanFeatures : ['Premium Core Modules access']
      };
      setPlans([...plans, newPlan]);
      triggerToast(`Plan "${formName}" created and published successfully!`);
    } else {
      setPlans(plans.map(p => p.id === selectedPlanId ? {
        ...p,
        name: formName,
        slug: formSlug,
        billingCycle: formCycle,
        price: priceNum,
        comparePrice: comparePriceNum,
        shortDescription: formDescription,
        status: formStatus,
        popular: formPopular,
        image: formImage || p.image,
        features: cleanFeatures.length > 0 ? cleanFeatures : p.features
      } : p));
      triggerToast(`Plan details for "${formName}" updated successfully!`);
    }

    setIsPanelOpen(false);
  };

  // Delete Plan
  const handleDeletePlan = (id: string, name: string) => {
    if (id === currentPlanId) {
      triggerToast("Cannot delete the active subscription plan currently running on the server!", "error");
      return;
    }
    if (confirm(`Are you sure you want to permanently delete the "${name}" plan? This is irreversible.`)) {
      setPlans(plans.filter(p => p.id !== id));
      triggerToast(`Plan "${name}" has been deleted.`);
    }
  };

  // Toggle Plan Status
  const togglePlanStatus = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: p.status === 'Active' ? 'Inactive' : 'Active' } : p));
    triggerToast("Plan publishing status toggled successfully.");
  };

  // Switch Active Current Plan
  const handleSwitchActivePlan = (planId: string) => {
    const matched = plans.find(p => p.id === planId);
    if (matched) {
      if (matched.status === 'Inactive') {
        triggerToast("Cannot activate an inactive plan! Please publish the plan first.", "error");
        return;
      }
      setCurrentPlanId(planId);
      
      // Update usage limit dynamically based on plan
      if (matched.name.toLowerCase().includes('starter')) {
        setUsage({
          products: { current: 1256, max: 500 }, // Overlimit starter
          orders: { current: 2568, max: 1000 },
          storage: { current: 12.4, max: 10, unit: 'GB' },
          teamMembers: { current: 8, max: 2 }
        });
      } else if (matched.name.toLowerCase().includes('premium') || matched.name.toLowerCase().includes('pro')) {
        setUsage({
          products: { current: 1256, max: 2000 },
          orders: { current: 2568, max: 4000 },
          storage: { current: 12.4, max: 40, unit: 'GB' },
          teamMembers: { current: 8, max: 8 }
        });
      } else {
        // Enterprise default
        setUsage({
          products: { current: 1256, max: 5000 },
          orders: { current: 2568, max: 10000 },
          storage: { current: 12.4, max: 100, unit: 'GB' },
          teamMembers: { current: 8, max: 20 }
        });
      }

      // Add a fresh invoice reflecting this plan switch
      const newInvoice: BillingInvoice = {
        id: `INV-${new Date().getFullYear()}-000${invoices.length + 1}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        plan: `${matched.name} (${matched.billingCycle})`,
        amount: matched.price,
        status: 'Paid',
        paymentMethod: `${paymentMethod.brand} **** ${paymentMethod.last4}`
      };
      setInvoices([newInvoice, ...invoices]);
      triggerToast(`Successfully switched local account subscription to ${matched.name}!`);
    }
  };

  // Add Dynamic Invoice
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(invoiceAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      triggerToast("Please provide a valid amount value.", "error");
      return;
    }

    if (editingInvoice) {
      setInvoices(invoices.map(i => i.id === editingInvoice.id ? {
        ...i,
        plan: invoicePlan,
        amount: parsedAmount,
        status: invoiceStatus
      } : i));
      setIsInvoiceModalOpen(false);
      setEditingInvoice(null);
      triggerToast("Invoice updated and saved successfully!", "success");
    } else {
      const newInv: BillingInvoice = {
        id: `INV-${new Date().getFullYear()}-000${invoices.length + 1}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        plan: invoicePlan,
        amount: parsedAmount,
        status: invoiceStatus,
        paymentMethod: `${paymentMethod.brand} **** ${paymentMethod.last4}`
      };

      setInvoices([newInv, ...invoices]);
      setIsInvoiceModalOpen(false);
      triggerToast("Manual administrative invoice drafted and saved!");
    }
  };

  // Delete Invoice
  const handleDeleteInvoice = (id: string) => {
    if (confirm(`Delete draft invoice record ${id}?`)) {
      setInvoices(invoices.filter(i => i.id !== id));
      triggerToast("Invoice record deleted from log.");
    }
  };

  // Toggle invoice status
  const toggleInvoiceStatus = (id: string) => {
    setInvoices(invoices.map(i => i.id === id ? {
      ...i,
      status: i.status === 'Paid' ? 'Overdue' : i.status === 'Overdue' ? 'Pending' : 'Paid'
    } : i));
    triggerToast("Invoice payment status updated.");
  };

  // Save Card Details
  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber.trim() || !cardHolder.trim() || !cardExpiry.trim()) {
      triggerToast("Please provide all card credit fields", "error");
      return;
    }
    const cleanLast4 = cardNumber.replace(/\s+/g, '').slice(-4);
    setPaymentMethod({
      brand: cardBrand,
      last4: cleanLast4 || '4242',
      cardHolder: cardHolder,
      expiry: cardExpiry
    });
    setIsMethodModalOpen(false);
    triggerToast("Standard payment method refreshed on gateway server.");
  };

  // Save Billing Settings Form
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Corporate billing details synced with global system successfully!");
  };

  // Feature Add/Edit Helper methods
  const handleFeatureTextChange = (index: number, val: string) => {
    const updated = [...formFeatures];
    updated[index] = val;
    setFormFeatures(updated);
  };

  const addFeatureInputRow = () => {
    setFormFeatures([...formFeatures, '']);
  };

  const removeFeatureInputRow = (index: number) => {
    if (formFeatures.length <= 1) return;
    setFormFeatures(formFeatures.filter((_, idx) => idx !== index));
  };

  return (
    <div className="space-y-6 text-slate-800 relative min-h-screen">
      
      {/* Dynamic Toast feedback */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg border text-xs font-black uppercase flex items-center gap-2.5 animate-scale-up ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
          toast.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-800' :
          'bg-blue-50 border-blue-300 text-blue-800'
        }`}>
          {toast.type === 'success' && <CheckCircle2 size={16} className="text-emerald-500" />}
          {toast.type === 'error' && <AlertTriangle size={16} className="text-rose-500" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* HEADER SECTION EXACT STYLE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="text-left">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Billing & Invoices</h1>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
            <span>Dashboard</span>
            <ChevronRight size={10} />
            <span>Billing</span>
            <ChevronRight size={10} />
            <span className="text-blue-600">{subTab.replace('billing-', '')}</span>
          </div>
        </div>

        {/* Action button in heading */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onSubTabChange('billing-overview')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              subTab === 'billing-overview' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Overview
          </button>
          <button 
            onClick={() => onSubTabChange('billing-plans')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              subTab === 'billing-plans' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Manage Plans
          </button>
          <button 
            onClick={openAddPanel}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus size={13} />
            <span>Add New Plan</span>
          </button>
        </div>
      </div>

      {/* TABBED CONTENTS CONTAINER */}
      <div className="grid grid-cols-1 gap-6">

        {/* -------------------- 1. OVERVIEW VIEW -------------------- */}
        {(subTab === 'billing-overview' || subTab === 'billing') && (
          <div className="space-y-6">

            {/* TOP ROW: FOUR HIGHLIGHT SUMMARY CARDS EXACTLY AS IMAGE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Current Plan */}
              <div className="bg-white border border-slate-150 rounded-2xl p-4.5 text-left flex items-center justify-between shadow-xs relative overflow-hidden group hover:border-blue-300 transition-all">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Current Plan</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-800">{currentPlan.name}</span>
                    <span className="inline-flex items-center gap-1 bg-purple-50 border border-purple-150 text-[9px] font-extrabold text-purple-600 px-2 py-0.5 rounded-md uppercase">
                      Current
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">Renews on 25 Jun, 2025</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center border border-purple-100 group-hover:scale-105 transition-transform">
                  <Award size={18} fill="currentColor" />
                </div>
              </div>

              {/* Card 2: Monthly Cost */}
              <div className="bg-white border border-slate-150 rounded-2xl p-4.5 text-left flex items-center justify-between shadow-xs relative overflow-hidden group hover:border-emerald-300 transition-all">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monthly Cost</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-slate-800">Rs. {currentPlan.price.toLocaleString()}</span>
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">Billed {currentPlan.billingCycle.toLowerCase()}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center border border-emerald-100 group-hover:scale-105 transition-transform">
                  <CreditCard size={18} />
                </div>
              </div>

              {/* Card 3: Last Payment */}
              <div className="bg-white border border-slate-150 rounded-2xl p-4.5 text-left flex items-center justify-between shadow-xs relative overflow-hidden group hover:border-amber-300 transition-all">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Last Payment</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-slate-800">Rs. {currentPlan.price.toLocaleString()}</span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">Paid on 25 May, 2025</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-100 group-hover:scale-105 transition-transform">
                  <CheckCircle2 size={18} />
                </div>
              </div>

              {/* Card 4: Next Billing */}
              <div className="bg-white border border-slate-150 rounded-2xl p-4.5 text-left flex items-center justify-between shadow-xs relative overflow-hidden group hover:border-blue-300 transition-all">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Next Billing</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black text-slate-800">25 Jun, 2025</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">In 22 days</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                  <Calendar size={18} />
                </div>
              </div>

            </div>

            {/* THREE SECTION GRID BELOW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SECTION A: Current Plan Details */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Current Plan Details</h3>
                  <button 
                    onClick={() => openEditPanel(currentPlan)}
                    className="p-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-400 transition-colors"
                    title="Edit Plan Config"
                  >
                    <Edit size={13} />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs py-1 border-b border-dashed border-slate-100">
                    <span className="font-semibold text-slate-400">Plan Name</span>
                    <span className="font-black text-slate-800">{currentPlan.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-dashed border-slate-100">
                    <span className="font-semibold text-slate-400">Billing Cycle</span>
                    <span className="font-black text-slate-800">{currentPlan.billingCycle}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-dashed border-slate-100">
                    <span className="font-semibold text-slate-400">Amount</span>
                    <span className="font-black text-slate-800">Rs. {currentPlan.price.toLocaleString()} / month</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-dashed border-slate-100">
                    <span className="font-semibold text-slate-400">Status</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-100">
                      {currentPlan.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-dashed border-slate-100">
                    <span className="font-semibold text-slate-400">Renews On</span>
                    <span className="font-black text-slate-800">25 Jun, 2025</span>
                  </div>
                  
                  {/* Payment method selection row */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-slate-400">Payment Method</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-500 font-bold uppercase">{paymentMethod.brand}</span>
                      <span className="font-mono text-slate-700 font-bold">•••• •••• •••• {paymentMethod.last4}</span>
                      <button 
                        onClick={() => setIsMethodModalOpen(true)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md transition-colors"
                        title="Update Card details"
                      >
                        <Edit size={10} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Switch Plan selector list for instant testing */}
                <div className="pt-3 border-t border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Switch Active Server Plan</label>
                  <select 
                    value={currentPlanId} 
                    onChange={(e) => handleSwitchActivePlan(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - Rs. {p.price} / mo</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SECTION B: Usage Overview with progressive loaders exact percentages */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4.5 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Usage Overview</h3>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Stats</span>
                </div>

                <div className="space-y-3.5">
                  
                  {/* Progress 1: Products */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-500">Products</span>
                      <span className="text-slate-800">
                        {usage.products.current.toLocaleString()} / <span className="text-slate-400">{usage.products.max.toLocaleString()}</span>
                        <span className="text-slate-400 text-[10px] font-bold ml-1.5">({Math.round((usage.products.current / usage.products.max) * 100)}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (usage.products.current / usage.products.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress 2: Orders */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-500">Orders</span>
                      <span className="text-slate-800">
                        {usage.orders.current.toLocaleString()} / <span className="text-slate-400">{usage.orders.max.toLocaleString()}</span>
                        <span className="text-slate-400 text-[10px] font-bold ml-1.5">({Math.round((usage.orders.current / usage.orders.max) * 100)}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (usage.orders.current / usage.orders.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress 3: Storage */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-500">Storage</span>
                      <span className="text-slate-800">
                        {usage.storage.current} {usage.storage.unit} / <span className="text-slate-400">{usage.storage.max} {usage.storage.unit}</span>
                        <span className="text-slate-400 text-[10px] font-bold ml-1.5">({Math.round((usage.storage.current / usage.storage.max) * 100)}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (usage.storage.current / usage.storage.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Progress 4: Team Members */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-slate-500">Team Members</span>
                      <span className="text-slate-800">
                        {usage.teamMembers.current} / <span className="text-slate-400">{usage.teamMembers.max}</span>
                        <span className="text-slate-400 text-[10px] font-bold ml-1.5">({Math.round((usage.teamMembers.current / usage.teamMembers.max) * 100)}%)</span>
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, (usage.teamMembers.current / usage.teamMembers.max) * 100)}%` }}
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION C: Quick Actions exactly like in the image */}
              <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Quick Actions</h3>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Controls</span>
                </div>

                <div className="space-y-2">
                  
                  <button 
                    onClick={() => {
                      triggerToast("Opening Subscription Upgrade catalog...", "info");
                      onSubTabChange('billing-plans');
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:bg-blue-50/50 hover:border-blue-300 transition-all text-xs font-bold text-slate-700 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Plus size={12} />
                      </div>
                      <span>Upgrade Plan</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>

                  <button 
                    onClick={() => {
                      triggerToast("Downloading latest invoice pdf receipt...", "success");
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:bg-blue-50/50 hover:border-blue-300 transition-all text-xs font-bold text-slate-700 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Download size={12} />
                      </div>
                      <span>Download Invoice</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>

                  <button 
                    onClick={() => setIsMethodModalOpen(true)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:bg-blue-50/50 hover:border-blue-300 transition-all text-xs font-bold text-slate-700 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <CreditCard size={12} />
                      </div>
                      <span>Update Payment Method</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>

                  <button 
                    onClick={() => onSubTabChange('billing-settings')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:bg-blue-50/50 hover:border-blue-300 transition-all text-xs font-bold text-slate-700 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Settings size={12} />
                      </div>
                      <span>Billing Settings</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>

                  <button 
                    onClick={() => onSubTabChange('billing-invoices')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-150 hover:bg-blue-50/50 hover:border-blue-300 transition-all text-xs font-bold text-slate-700 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center">
                        <FileText size={12} />
                      </div>
                      <span>View Transactions</span>
                    </div>
                    <ChevronRight size={14} className="text-slate-400" />
                  </button>

                </div>
              </div>

            </div>

            {/* LOWER SECTION: Recent Invoices Table (Exactly like in image) */}
            <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-slate-800">Recent Invoices</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Historical payment transcripts logged under this server account</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      setEditingInvoice(null);
                      setInvoicePlan('Enterprise (Monthly)');
                      setInvoiceAmount('5999');
                      setInvoiceStatus('Paid');
                      setIsInvoiceModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={11} />
                    <span>Draft Invoice</span>
                  </button>
                  <button 
                    onClick={() => onSubTabChange('billing-invoices')}
                    className="px-4 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-black uppercase tracking-wider cursor-pointer"
                  >
                    View All Invoices
                  </button>
                </div>
              </div>

              {/* Invoices table element */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px]">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider select-none">
                      <th className="py-3 px-2 w-10">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" readOnly checked />
                      </th>
                      <th className="py-3 px-4">Invoice ID</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Plan</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    {invoices.slice(0, 6).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5 px-2">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                        </td>
                        <td className="py-3.5 px-4 font-black text-blue-600 hover:underline cursor-pointer" onClick={() => triggerToast(`Previewing invoice ${item.id}`, 'info')}>
                          {item.id}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-500">{item.date}</td>
                        <td className="py-3.5 px-4 font-black text-slate-700">{item.plan}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900">Rs. {item.amount.toLocaleString()}</td>
                        <td className="py-3.5 px-4">
                          <button 
                            onClick={() => toggleInvoiceStatus(item.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase cursor-pointer border ${
                              item.status === 'Paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                              item.status === 'Overdue' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                              'bg-amber-50 border-amber-100 text-amber-700'
                            }`}
                          >
                            <span className={`w-1 h-1 rounded-full ${item.status === 'Paid' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                            {item.status}
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-[9px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-mono">VISA</span>
                            <span className="font-mono font-bold text-slate-500 text-[11px]">{item.paymentMethod.replace('VISA ', '')}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => setSelectedInvoice(item)}
                              className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer" 
                              title="View Invoice"
                            >
                              <Eye size={13} />
                            </button>
                            <button 
                              onClick={() => startEditInvoice(item)}
                              className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors cursor-pointer" 
                              title="Edit Invoice"
                            >
                              <Edit size={13} />
                            </button>
                            <button 
                              onClick={() => setSelectedInvoice(item)}
                              className="p-1 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors cursor-pointer" 
                              title="Print Invoice / Bill"
                            >
                              <Printer size={13} />
                            </button>
                            <button 
                              onClick={() => handleDeleteInvoice(item.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" 
                              title="Delete Invoice"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination footer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-slate-400 select-none">
                <span>Showing 1 to {Math.min(invoices.length, 6)} of {invoices.length} invoices</span>
                <div className="flex items-center gap-1.5">
                  <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                    &laquo;
                  </button>
                  <span className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-extrabold">1</span>
                  <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                    &raquo;
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* -------------------- 2. MANAGE PLANS LIST VIEW -------------------- */}
        {subTab === 'billing-plans' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-2">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-black text-slate-800">Available Subscription Tiers</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Configure standard cloud subscription scopes for client storefronts</p>
                </div>
                <button 
                  onClick={openAddPanel}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm transition-all"
                >
                  <Plus size={13} />
                  <span>Create New Plan</span>
                </button>
              </div>

              {/* Grid cards for each plan */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((item) => {
                  const isActive = item.id === currentPlanId;
                  return (
                    <div 
                      key={item.id} 
                      className={`rounded-2xl border-2 p-5 text-left flex flex-col justify-between space-y-4 relative transition-all ${
                        isActive 
                          ? 'border-blue-600 bg-blue-50/10 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Popular badge */}
                      {item.popular && (
                        <span className="absolute -top-3 left-4 bg-amber-500 text-slate-950 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs border border-amber-300">
                          Highly Recommended
                        </span>
                      )}

                      {/* Status indicator badge */}
                      <span className={`absolute top-4 right-4 text-[9px] font-extrabold px-2 py-0.5 rounded uppercase border ${
                        item.status === 'Active' ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}>
                        {item.status}
                      </span>

                      {/* Info body */}
                      <div className="space-y-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div>
                          <h4 className="text-base font-black text-slate-800">{item.name}</h4>
                          <span className="text-[10px] font-mono text-slate-400 font-bold tracking-tight block">/{item.slug}</span>
                        </div>

                        <div className="flex items-baseline gap-1 pt-1">
                          <span className="text-2xl font-black text-slate-900">Rs. {item.price.toLocaleString()}</span>
                          <span className="text-xs text-slate-400 font-bold">/{item.billingCycle === 'Monthly' ? 'mo' : 'yr'}</span>
                          {item.comparePrice && (
                            <span className="text-xs text-slate-400 line-through ml-2">Rs. {item.comparePrice.toLocaleString()}</span>
                          )}
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed font-semibold min-h-[48px]">
                          {item.shortDescription}
                        </p>

                        {/* Features list */}
                        <div className="space-y-1.5 pt-2 border-t border-slate-100">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Plan features Included:</span>
                          {item.features.map((feat, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                              <Check size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom action controls */}
                      <div className="flex items-center gap-2.5 pt-3">
                        {isActive ? (
                          <div className="flex-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-wider py-2 rounded-lg text-center font-bold border border-blue-200">
                            Active Subscription
                          </div>
                        ) : (
                          <button 
                            onClick={() => handleSwitchActivePlan(item.id)}
                            className="flex-1 bg-[#091b3d] hover:bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest py-2 rounded-lg transition-colors cursor-pointer text-center"
                          >
                            Set Active
                          </button>
                        )}
                        <button 
                          onClick={() => openEditPanel(item)}
                          className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg text-slate-500 transition-colors border border-slate-200"
                          title="Edit Details"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeletePlan(item.id, item.name)}
                          className="p-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 rounded-lg text-slate-400 transition-colors border border-slate-200"
                          title="Delete Plan"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
             {/* -------------------- 3. INVOICES DETAIL VIEW -------------------- */}
        {subTab === 'billing-invoices' && (
          showInstantCreator ? (
            <InstantInvoicePage 
              onBack={() => setShowInstantCreator(false)}
              onSaved={() => {
                setShowInstantCreator(false);
                const saved = localStorage.getItem('lucky_billing_invoices');
                if (saved) setInvoices(JSON.parse(saved));
              }}
            />
          ) : (
            <div className="space-y-6">
              <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-black text-slate-800">Accounting Ledger / Invoices</h3>
                    <p className="text-[10px] text-slate-400 font-bold">Comprehensive historical listing of transactional and credit invoices</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowInstantCreator(true)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-all active:scale-95"
                    >
                      <Plus size={13} />
                      <span>Create Instant Invoice (Mock Image Style)</span>
                    </button>
                    <button 
                      onClick={() => {
                        setEditingInvoice(null);
                        setInvoicePlan('Enterprise (Monthly)');
                        setInvoiceAmount('5999');
                        setInvoiceStatus('Paid');
                        setIsInvoiceModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus size={13} />
                      <span>Draft Manual Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Search & Filter Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 pt-2">
                  <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1 rounded-xl self-start">
                    <button
                      onClick={() => setInvoiceTypeFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        invoiceTypeFilter === 'all' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      All Invoices ({invoices.length})
                    </button>
                    <button
                      onClick={() => setInvoiceTypeFilter('website')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        invoiceTypeFilter === 'website' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Website Purchases ({invoices.filter(i => i.plan.toLowerCase().includes('website:')).length})
                    </button>
                    <button
                      onClick={() => setInvoiceTypeFilter('saas')}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                        invoiceTypeFilter === 'saas' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      SaaS Subscriptions ({invoices.filter(i => !i.plan.toLowerCase().includes('website:')).length})
                    </button>
                  </div>

                  <div className="relative max-w-xs w-full">
                    <input
                      type="text"
                      placeholder="Search by ID, items, date, method..."
                      value={invoiceSearchQuery}
                      onChange={(e) => setInvoiceSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-500 focus:bg-white transition-all pl-8"
                    />
                    <svg
                      className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {invoiceSearchQuery && (
                      <button
                        onClick={() => setInvoiceSearchQuery('')}
                        className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 font-bold text-xs"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                {/* Larger table of invoices */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead>
                      <tr className="border-b border-slate-150 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-3 w-10">
                          <input type="checkbox" className="rounded border-slate-300 text-blue-600" defaultChecked />
                        </th>
                        <th className="py-3 px-4">Invoice ID</th>
                        <th className="py-3 px-4">Draft Date</th>
                        <th className="py-3 px-4">Source &amp; Description</th>
                        <th className="py-3 px-4">Charged Amount</th>
                        <th className="py-3 px-4">Gateway Status</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {invoices.filter((item) => {
                        const matchesQuery = 
                          item.id.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                          item.plan.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                          item.paymentMethod.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
                          item.date.toLowerCase().includes(invoiceSearchQuery.toLowerCase());

                        if (!matchesQuery) return false;

                        if (invoiceTypeFilter === 'website') {
                          return item.plan.toLowerCase().includes('website:');
                        }
                        if (invoiceTypeFilter === 'saas') {
                          return !item.plan.toLowerCase().includes('website:');
                        }
                        return true;
                      }).map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-3.5 px-3">
                            <input type="checkbox" className="rounded border-slate-300" />
                          </td>
                          <td className="py-3.5 px-4 font-black text-blue-600">{item.id}</td>
                          <td className="py-3.5 px-4 font-bold text-slate-500">{item.date}</td>
                          <td className="py-3.5 px-4 font-black text-slate-700">
                            {item.plan.startsWith('Website:') ? (
                              <div className="flex flex-col gap-0.5">
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-emerald-50 border border-emerald-100 text-[9px] font-black text-emerald-700 uppercase tracking-wider w-max">
                                  Website Cart Sale
                                </span>
                                <span className="text-slate-600 text-[11px] font-medium leading-relaxed max-w-md truncate" title={item.plan.replace('Website:', '').trim()}>
                                  {item.plan.replace('Website:', '').trim()}
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-0.5">
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-blue-50 border border-blue-100 text-[9px] font-black text-blue-700 uppercase tracking-wider w-max">
                                  SaaS Subscription Plan
                                </span>
                                <span className="text-slate-800 font-bold">{item.plan}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-black text-slate-900">Rs. {item.amount.toLocaleString()}</td>
                          <td className="py-3.5 px-4">
                            <button 
                              onClick={() => toggleInvoiceStatus(item.id)}
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                                item.status === 'Paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                item.status === 'Overdue' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                                'bg-amber-50 border-amber-100 text-amber-700'
                              }`}
                            >
                              <span className={`w-1 h-1 rounded-full ${item.status === 'Paid' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                              {item.status}
                            </button>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-slate-500 font-bold text-[11px]">{item.paymentMethod}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-2">
                              <button 
                                onClick={() => setSelectedInvoice(item)}
                                className="p-1 text-slate-400 hover:text-blue-600 rounded cursor-pointer"
                                title="View Invoice"
                              >
                                <Eye size={13} />
                              </button>
                              <button 
                                onClick={() => startEditInvoice(item)}
                                className="p-1 text-slate-400 hover:text-amber-600 rounded cursor-pointer"
                                title="Edit Invoice"
                              >
                                <Edit size={13} />
                              </button>
                              <button 
                                onClick={() => setSelectedInvoice(item)}
                                className="p-1 text-slate-400 hover:text-emerald-600 rounded cursor-pointer"
                                title="Print Invoice / Bill"
                              >
                                <Printer size={13} />
                              </button>
                              <button 
                                onClick={() => handleDeleteInvoice(item.id)}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                                title="Delete Invoice"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        )}

        {/* -------------------- 4. PAYMENT METHODS VIEW -------------------- */}
        {subTab === 'billing-methods' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-5 shadow-2xs">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-800">Saved Payment Methods</h3>
                <p className="text-[10px] text-slate-400 font-bold">Manage credit profiles, bank channels, and digital mobile wallet scans</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Credit card design mock element */}
                <div className="bg-gradient-to-br from-[#091b3d] to-[#17489a] text-white p-6 rounded-2xl space-y-6 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-widest text-blue-300">LUCKY PARTNER CREDIT</span>
                    <span className="font-serif italic font-black text-lg">{paymentMethod.brand}</span>
                  </div>

                  <div className="space-y-1.5 pt-4">
                    <span className="text-[10px] text-blue-200/80 uppercase block tracking-wider font-bold">Card Number</span>
                    <p className="font-mono text-lg font-bold tracking-[0.2em]">•••• •••• •••• {paymentMethod.last4}</p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-left">
                      <span className="text-[8px] text-blue-200/70 uppercase block">Card Holder</span>
                      <span className="text-xs font-black tracking-wide">{paymentMethod.cardHolder}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-blue-200/70 uppercase block">Expires</span>
                      <span className="text-xs font-black tracking-wide font-mono">{paymentMethod.expiry}</span>
                    </div>
                  </div>
                </div>

                {/* Info and change form */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-100">
                      Primary Payment Profile
                    </span>
                    <h4 className="text-sm font-black text-slate-800">Digital Settlement Node Active</h4>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      All future renewals, extra team member additions, and high volume catalog listings will be automatically processed through this card. Scanned receipts will be emailed directly to your admin inbox.
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsMethodModalOpen(true)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CreditCard size={14} />
                      <span>Edit Card Credentials</span>
                    </button>
                    <button 
                      onClick={() => triggerToast("Directing to digital wallet gateway configurations...", "info")}
                      className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase"
                    >
                      Configure Scans
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* -------------------- 5. TRANSACTIONS VIEW -------------------- */}
        {subTab === 'billing-transactions' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left space-y-4 shadow-2xs">
              <div className="space-y-0.5 border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-800">Scanned Digital Settlements</h3>
                <p className="text-[10px] text-slate-400 font-bold">Direct scanned eSewa, Fonepay, Khalti, and Cash collections logged across Nepal districts</p>
              </div>

              {/* Transactions list */}
              <div className="space-y-2.5">
                {[
                  { id: 'TXN-90234510', method: 'eSewa Pay', user: 'krishna@gmail.com', date: '01 Jul, 2026', desc: 'Saree Collection & Leather Shoes retail billing', amount: 'Rs. 4,350', status: 'Success' },
                  { id: 'TXN-90234509', method: 'Fonepay', user: 'ashish@gmail.com', date: '30 Jun, 2026', desc: 'Slim-Fit Stretch Chino Trousers online checkout', amount: 'Rs. 1,899', status: 'Success' },
                  { id: 'TXN-90234508', method: 'Khalti QR', user: 'dahal@yahoo.com', date: '28 Jun, 2026', desc: 'Chic Linen Tops Set & Elite Pro Shoes package', amount: 'Rs. 5,598', status: 'Success' },
                  { id: 'TXN-90234507', method: 'Cash on Delivery', user: 'nepal@gmail.com', date: '25 Jun, 2026', desc: 'A-Line Coral Pink Midi Dress delivery', amount: 'Rs. 2,199', status: 'Pending' }
                ].map((txn) => (
                  <div key={txn.id} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono text-[10px] font-black text-slate-500 uppercase">
                        {txn.method.slice(0, 2)}
                      </div>
                      <div className="text-left space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-800">{txn.desc}</span>
                          <span className="text-[9px] font-bold text-slate-400 font-mono">#{txn.id}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 block">{txn.date} • via {txn.method} ({txn.user})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      <span className="text-xs font-black text-slate-900">{txn.amount}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                        txn.status === 'Success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-amber-50 border-amber-100 text-amber-700'
                      }`}>
                        {txn.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- 6. BILLING SETTINGS VIEW -------------------- */}
        {subTab === 'billing-settings' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-150 rounded-2xl p-5 text-left shadow-2xs">
              <div className="space-y-0.5 border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-sm font-black text-slate-800">Billing Profile Configurations</h3>
                <p className="text-[10px] text-slate-400 font-bold">Configure corporate invoice headers, VAT registrations, and default currency labels</p>
              </div>

              <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Company Name</label>
                  <input 
                    type="text" 
                    defaultValue={settings.companyName}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Billing Notification Email</label>
                  <input 
                    type="email" 
                    defaultValue={settings.billingEmail}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">PAN / VAT Registration No.</label>
                  <input 
                    type="text" 
                    defaultValue={settings.taxId}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Invoice Prefix</label>
                  <input 
                    type="text" 
                    defaultValue={settings.invoicePrefix}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Registered Office Address</label>
                  <textarea 
                    rows={2}
                    defaultValue={settings.address}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                  />
                </div>

                <div className="md:col-span-2 pt-3 flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    Save Config Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* ==================== ADD / EDIT PLAN SLIDE OUT PANEL DRAWERS (EXACT AS IMAGE) ==================== */}
      {isPanelOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl animate-slide-left overflow-y-auto select-none border-l border-slate-100">
            
            {/* Header section with X */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-sm font-black text-slate-900 tracking-tight">Add / Edit Plan</h2>
              <button 
                onClick={() => setIsPanelOpen(false)}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sidebar Subtabs inside drawer */}
            <div className="flex border-b border-slate-100 select-none">
              <button
                onClick={() => setPanelTab('details')}
                className={`flex-1 py-3 text-xs font-black tracking-wider uppercase border-b-2 transition-all ${
                  panelTab === 'details' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Plan Details
              </button>
              <button
                onClick={() => setPanelTab('features')}
                className={`flex-1 py-3 text-xs font-black tracking-wider uppercase border-b-2 transition-all ${
                  panelTab === 'features' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Features
              </button>
            </div>

            {/* Panel form container */}
            <form onSubmit={handleSavePlan} className="flex-1 flex flex-col justify-between p-6 overflow-y-auto space-y-6 text-left">
              
              {/* DETAILS SUBTAB */}
              {panelTab === 'details' && (
                <div className="space-y-4">
                  
                  {/* Upload Plan Image block (gorgeous upload block exact as image) */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Plan Image Badge</label>
                    
                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 transition-all rounded-2xl p-6 text-center cursor-pointer relative overflow-hidden bg-slate-50 flex flex-col items-center justify-center">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {formImage ? (
                        <div className="space-y-2">
                          <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden bg-white border border-slate-200">
                            <img src={formImage} alt="Uploaded badge" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[9px] text-emerald-600 font-extrabold uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 block">Image loaded successfully</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Upload size={18} />
                          </div>
                          <h4 className="text-xs font-black text-slate-700">Upload Plan Image</h4>
                          <p className="text-[10px] text-slate-400 font-semibold leading-none">JPG, PNG, WEBP (Max. 2MB)</p>
                          <p className="text-[9px] text-slate-400 font-medium">Recommended size 600x400px</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-700 uppercase block">Plan Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Enter plan name"
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                        // Auto slugification
                        setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Plan Slug */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-700 uppercase block">Plan Slug *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. enterprise-monthly"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Billing Cycle select dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-700 uppercase block">Billing Cycle *</label>
                    <select
                      value={formCycle}
                      onChange={(e) => setFormCycle(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                    >
                      <option value="Monthly">Select billing cycle</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>

                  {/* Price and Compare Price input fields with Rs. dropdown prefix */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    {/* Price */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-700 uppercase block">Price *</label>
                      <div className="relative flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <input 
                          type="text" 
                          required
                          placeholder="Enter price"
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          className="flex-1 bg-transparent px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                        <div className="px-3 bg-slate-100 border-l border-slate-200 flex items-center text-xs font-black text-slate-500">
                          Rs.
                        </div>
                      </div>
                    </div>

                    {/* Compare Price */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-700 uppercase block">Compare Price</label>
                      <div className="relative flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                        <input 
                          type="text" 
                          placeholder="Enter compare price"
                          value={formComparePrice}
                          onChange={(e) => setFormComparePrice(e.target.value)}
                          className="flex-1 bg-transparent px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                        />
                        <div className="px-3 bg-slate-100 border-l border-slate-200 flex items-center text-xs font-black text-slate-500">
                          Rs.
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Short Description */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black text-slate-700 uppercase block">Short Description</label>
                      <span className="text-[9px] text-slate-400 font-bold">{formDescription.length}/150</span>
                    </div>
                    <textarea 
                      rows={3}
                      maxLength={150}
                      placeholder="Enter short description..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  {/* Status select dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-700 uppercase block">Status *</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-400"
                    >
                      <option value="Active">Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  {/* Popular Plan toggle (gorgeous switches exact like image) */}
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-150">
                    <div className="space-y-0.5">
                      <span className="text-xs font-black text-slate-800 block">Popular Plan</span>
                      <span className="text-[9px] text-slate-400 font-bold">Show this plan as popular on checkout</span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => setFormPopular(!formPopular)}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        formPopular ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                          formPopular ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                </div>
              )}

              {/* FEATURES SUBTAB */}
              {panelTab === 'features' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="space-y-0.5 text-left">
                      <h4 className="text-xs font-black text-slate-800">Plan Feature Rows</h4>
                      <p className="text-[9px] text-slate-400 font-bold">Declare specific items or quotas permitted on this subscription tier</p>
                    </div>
                    <button
                      type="button"
                      onClick={addFeatureInputRow}
                      className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 cursor-pointer"
                    >
                      <Plus size={11} />
                      <span>Add row</span>
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {formFeatures.map((feat, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {index + 1}
                        </div>
                        <input 
                          type="text"
                          required
                          value={feat}
                          placeholder="e.g. Up to 5,000 products allowed"
                          onChange={(e) => handleFeatureTextChange(index, e.target.value)}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-400"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeatureInputRow(index)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-slate-200"
                          title="Remove row"
                          disabled={formFeatures.length <= 1}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-[10px] text-slate-600 font-semibold leading-relaxed">
                    Declare precise limits like products capacity, bandwidth storage, order limits, or active staff accounts to control automated enforcement logic.
                  </div>
                </div>
              )}

              {/* Bottom drawer buttons cancel / save */}
              <div className="pt-6 border-t border-slate-100 flex gap-3 select-none">
                <button
                  type="button"
                  onClick={() => setIsPanelOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-xl transition-colors cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-colors cursor-pointer text-center"
                >
                  Save Plan
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ==================== EDIT CREDIT CARD MODAL POPUP ==================== */}
      {isMethodModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">Update Payment Method</h3>
              <button 
                onClick={() => setIsMethodModalOpen(false)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveCard} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Card Brand</label>
                <select 
                  value={cardBrand}
                  onChange={(e) => setCardBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="VISA">VISA</option>
                  <option value="MasterCard">MasterCard</option>
                  <option value="eSewa Pay">eSewa Pay Link</option>
                  <option value="Fonepay Link">Fonepay Link</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Card Holder Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Super Admin"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Card Number / Token</label>
                <input 
                  type="text" 
                  required
                  placeholder="4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Expiry Date</label>
                <input 
                  type="text" 
                  required
                  placeholder="12/28"
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsMethodModalOpen(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== CREATE NEW INVOICE MODAL POPUP ==================== */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4 shadow-2xl border border-slate-100 animate-scale-up">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900">{editingInvoice ? 'Edit Invoice Record' : 'Draft Account Invoice'}</h3>
              <button 
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddInvoice} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Plan/Description (Editable)</label>
                <input 
                  list="plans-datalist"
                  value={invoicePlan}
                  onChange={(e) => setInvoicePlan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                  placeholder="e.g. Premium Plan or Custom Order"
                  required
                />
                <datalist id="plans-datalist">
                  {plans.map(p => (
                    <option key={p.id} value={`${p.name} (${p.billingCycle})`} />
                  ))}
                  <option value="Standard Extra Volume" />
                  <option value="SMS Notification bundle" />
                </datalist>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Charged Amount (Rs.)</label>
                <input 
                  type="number" 
                  required
                  placeholder="5999"
                  value={invoiceAmount}
                  onChange={(e) => setInvoiceAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Receipt Payment Status</label>
                <select 
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                >
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase rounded-lg transition-colors cursor-pointer"
                >
                  {editingInvoice ? 'Save Changes' : 'Draft Receipt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable & Viewable Invoice Modal */}
      {selectedInvoice && (() => {
        // Parse items
        let cleanPlan = selectedInvoice.plan;
        const isWebsiteSale = cleanPlan.toLowerCase().includes('website:');
        if (isWebsiteSale) {
          cleanPlan = cleanPlan.replace(/website:/i, '').trim();
        }

        const rawParts = cleanPlan.split(',').map(p => p.trim()).filter(Boolean);
        const parsedItems = rawParts.length > 0 ? rawParts.map(part => {
          const match = part.match(/^(\d+)\s*[xX]\s*(.+)$/);
          if (match) {
            return {
              name: match[2].trim(),
              quantity: parseInt(match[1], 10),
              unitPrice: 0,
              total: 0
            };
          }
          return {
            name: part,
            quantity: 1,
            unitPrice: 0,
            total: 0
          };
        }) : [{ name: selectedInvoice.plan, quantity: 1, unitPrice: selectedInvoice.amount, total: selectedInvoice.amount }];

        // Distribute amount among items
        const totalQty = parsedItems.reduce((sum, item) => sum + item.quantity, 0);
        let remainingAmount = selectedInvoice.amount;
        parsedItems.forEach((item, index) => {
          if (index === parsedItems.length - 1) {
            item.total = remainingAmount;
            item.unitPrice = Math.round((remainingAmount / item.quantity) * 100) / 100;
          } else {
            const share = Math.round((item.quantity / totalQty) * selectedInvoice.amount);
            item.total = share;
            item.unitPrice = Math.round((share / item.quantity) * 100) / 100;
            remainingAmount -= share;
          }
        });

        // VAT & Subtotal calculations
        const subtotal = Math.round((selectedInvoice.amount / 1.13) * 100) / 100;
        const vatAmount = Math.round((selectedInvoice.amount - subtotal) * 100) / 100;

        return (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden no-print">
            {/* Dynamic CSS for print view */}
            <style>{`
              @media print {
                body * {
                  visibility: hidden !important;
                }
                #printable-invoice-modal-content, #printable-invoice-modal-content * {
                  visibility: visible !important;
                }
                #printable-invoice-modal-content {
                  position: absolute !important;
                  left: 0 !important;
                  top: 0 !important;
                  width: 100% !important;
                  max-width: 100% !important;
                  background: white !important;
                  color: black !important;
                  box-shadow: none !important;
                  border: none !important;
                  padding: 1.5in !important;
                  margin: 0 !important;
                  overflow: visible !important;
                  max-height: none !important;
                }
                .no-print {
                  display: none !important;
                }
              }
            `}</style>

            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden animate-scale-up my-auto">
              {/* Header bar controls */}
              <div className="bg-slate-900 text-white px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between no-print shrink-0">
                <div className="flex items-center gap-2">
                  <Printer size={18} className="text-blue-400" />
                  <span className="font-sans font-black text-xs uppercase tracking-widest text-slate-300">Tax Invoice Receipt</span>
                </div>
                <button 
                  onClick={() => setSelectedInvoice(null)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-all text-slate-400 hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Printable Invoice Card */}
              <div id="printable-invoice-modal-content" className="p-5 sm:p-8 space-y-5 sm:space-y-8 bg-white text-slate-800 text-left overflow-y-auto flex-1">
                {/* Brand Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-6">
                  <div>
                    <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                      <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded text-sm font-serif italic">L</span>
                      Lucky Readymade
                    </h1>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-0.5">Quality Ready-to-Wear Apparel Manufacturer</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Gongabu-2, Kathmandu, Nepal<br />
                      Tel: +977-1-4912345 | VAT No: 609876543
                    </p>
                  </div>
                  <div className="text-left sm:text-right space-y-1">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                      TAX INVOICE
                    </span>
                    <p className="text-xs text-slate-500 pt-1">
                      Invoice No: <strong className="text-slate-900 font-mono">{selectedInvoice.id}</strong>
                    </p>
                    <p className="text-xs text-slate-500">
                      Issue Date: <strong className="text-slate-900">{selectedInvoice.date}</strong>
                    </p>
                  </div>
                </div>

                {/* Billed To / Client section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2">Billed From (Seller)</span>
                    <h3 className="text-xs font-black text-slate-800">LUCKY READYMADE PVT. LTD.</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                      PAN/VAT: 609876543<br />
                      Gongabu, Kathmandu, Nepal<br />
                      sales@luckyreadymade.com
                    </p>
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-2">Billed To (Buyer)</span>
                    {isWebsiteSale ? (
                      <>
                        <h3 className="text-xs font-black text-slate-800">Nepal Retail Customer (Web Checkout)</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                          Delivery: Kathmandu Valley Region<br />
                          Contact: Online Web Checkout User<br />
                          Nepal
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-xs font-black text-slate-800">Lucky Readymade - Admin Office</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">
                          Email: krishnakumarmahato323@gmail.com<br />
                          Main Factory Warehouse<br />
                          Kathmandu, Nepal
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Itemized Invoice Table */}
                <div className="space-y-2">
                  <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block mb-1">Receipt Line Items</span>
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-500 font-extrabold uppercase text-[9px] tracking-wider border-b border-slate-200">
                          <th className="py-2.5 px-4 w-12">S.N.</th>
                          <th className="py-2.5 px-4">Item &amp; Description</th>
                          <th className="py-2.5 px-4 text-center w-16">Qty</th>
                          <th className="py-2.5 px-4 text-right w-24">Rate (Rs.)</th>
                          <th className="py-2.5 px-4 text-right w-28">Amount (Rs.)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {parsedItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/30">
                            <td className="py-3 px-4 font-mono text-slate-400">{idx + 1}</td>
                            <td className="py-3 px-4">
                              <span className="font-bold text-slate-800">{item.name}</span>
                              <span className="text-[9px] text-slate-400 block font-medium mt-0.5">
                                {isWebsiteSale ? 'Direct Retail Dispatch Order' : 'SaaS System Enterprise Cloud Service License'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-slate-600">{item.quantity}</td>
                            <td className="py-3 px-4 text-right font-mono text-slate-500">{item.unitPrice.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right font-bold text-slate-900">{(item.quantity * item.unitPrice).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Totals Summary */}
                <div className="flex flex-col items-end gap-1.5 pt-4 border-t border-slate-150">
                  <div className="w-64 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal (VAT Exclusive):</span>
                      <span className="font-mono font-bold">Rs. {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>VAT (13% Included):</span>
                      <span className="font-mono font-bold">Rs. {vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-900 border-t border-slate-200 pt-2 text-sm font-black uppercase">
                      <span>Grand Total:</span>
                      <span className="font-mono text-blue-700">Rs. {selectedInvoice.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Additional Note & Signature Placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-slate-150 font-medium">
                  <div className="space-y-1.5">
                    <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest block">Payment Details</span>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="text-[11px] text-slate-600">
                        Gateway Method: <strong className="text-slate-800">{selectedInvoice.paymentMethod}</strong>
                      </p>
                      <p className="text-[11px] text-slate-600">
                        Settlement Node: <strong className={selectedInvoice.status === 'Paid' ? 'text-emerald-600' : 'text-amber-600'}>{selectedInvoice.status}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end items-start sm:items-end">
                    <p className="text-[10px] text-slate-400 italic">Thank you for choosing Lucky Readymade!</p>
                    <p className="text-[9px] text-slate-400 mt-2">This is a system generated tax invoice and is valid without manual signatures.</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 px-6 py-4 flex gap-2 justify-end border-t border-slate-200 no-print shrink-0">
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-xl text-slate-700 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-sm shadow-blue-200"
                >
                  <Printer size={14} />
                  Print Bill / Save PDF
                </button>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}
