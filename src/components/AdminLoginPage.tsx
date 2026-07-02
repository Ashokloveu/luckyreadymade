import React, { useState } from 'react';
import { 
  Lock, Mail, User, ShieldCheck, LogOut, FileText, ShoppingBag, 
  CheckCircle2, AlertCircle, X, Eye, EyeOff, Key, ArrowLeft
} from 'lucide-react';
import { Product } from '../types';
import AdminDashboard from './AdminDashboard';
import { safeLocalStorage } from '../utils/storage';

interface AdminLoginPageProps {
  onCustomerLogin: (user: { name: string; email: string }) => void;
  currentUser: { name: string; email: string } | null;
  onLogout: () => void;
  onBackToStore: () => void;
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  location: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  items: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  points: number;
  joinedDate: string;
  ordersCount: number;
}

// Initial mockup data matching original state
const initialOrders: Order[] = [
  { id: 'LKY-9801', customerName: 'Rohan Shrestha', email: 'rohan@gmail.com', location: 'Kathmandu, Nepal', amount: 4499, status: 'Pending', date: '2026-06-29', items: 'Nike Air Monarch IV x 1' },
  { id: 'LKY-9802', customerName: 'Pooja Thapa', email: 'pooja.t@yahoo.com', location: 'Bardibas-1, Nepal', amount: 1649, status: 'Shipped', date: '2026-06-28', items: 'Adidas Classic Backpack x 1' },
  { id: 'LKY-9803', customerName: 'Asif Khan', email: 'mdasif78664@gmail.com', location: 'Mahottari, Nepal', amount: 1999, status: 'Delivered', date: '2026-06-25', items: 'Floral Midi Dress x 1' },
  { id: 'LKY-9804', customerName: 'Sita Kumari', email: 'sita.k@gmail.com', location: 'Janakpur, Nepal', amount: 3898, status: 'Processing', date: '2026-06-30', items: 'Pique Polo T-Shirt x 2' },
  { id: 'LKY-9805', customerName: 'Manish Giri', email: 'manish.giri@outlook.com', location: 'Lalitpur, Nepal', amount: 5249, status: 'Pending', date: '2026-07-01', items: 'Adidas Ultrabounce x 1' }
];

const initialCustomers: Customer[] = [
  { id: 'CUST-101', name: 'Rohan Shrestha', email: 'rohan@gmail.com', points: 120, joinedDate: 'June 2026', ordersCount: 3 },
  { id: 'CUST-102', name: 'Pooja Thapa', email: 'pooja.t@yahoo.com', points: 80, joinedDate: 'May 2026', ordersCount: 1 },
  { id: 'CUST-103', name: 'Asif Khan', email: 'mdasif78664@gmail.com', points: 450, joinedDate: 'Jan 2025', ordersCount: 12 },
  { id: 'CUST-104', name: 'Sita Kumari', email: 'sita.k@gmail.com', points: 210, joinedDate: 'March 2026', ordersCount: 4 },
  { id: 'CUST-105', name: 'Niranjan Sah', email: 'sah.niranjan@gmail.com', points: 340, joinedDate: 'Feb 2026', ordersCount: 8 }
];

const initialProducts: Product[] = [
  { id: 'admin-p1', name: 'Nike Air Monarch IV', price: 4499, originalPrice: 8999, category: 'shoes', rating: 5.0, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', brand: 'Men Shoes', inStock: true, sizes: ['7', '8', '9', '10', '11'], description: 'The ultimate leather training sneaker featuring supportive synthetic overlays.' },
  { id: 'admin-p2', name: 'Adidas Classic Backpack', price: 1649, originalPrice: 2999, category: 'accessories', rating: 5.0, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300', brand: 'Accessories', inStock: true, sizes: ['One Size'], description: 'Spacious daily backpack featuring standard double compartment layers.' },
  { id: 'admin-p3', name: 'Floral Midi Dress', price: 1999, originalPrice: 3299, category: 'women', rating: 4.8, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=300', brand: 'Women', inStock: true, sizes: ['XS', 'S', 'M', 'L'], description: 'Blush pink floral flare dress woven from soft airy linen.' },
  { id: 'admin-p4', name: 'Pique Polo T-Shirt', price: 1199, originalPrice: 1999, category: 'men', rating: 4.9, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=300', brand: 'Men', inStock: true, sizes: ['S', 'M', 'L', 'XL'], description: 'Sleek solid black collar tee woven from luxurious breathable pique.' },
  { id: 'admin-p5', name: 'Skechers Microspec', price: 2199, originalPrice: 3399, category: 'kids', rating: 4.7, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300', brand: 'Kids Shoes', inStock: true, sizes: ['2-4Y', '4-6Y', '6-8Y'], description: 'Lightweight kids running shoes featuring a secure athletic knit mesh upper.' },
  { id: 'admin-p6', name: "Men's Hoodie", price: 1749, originalPrice: 2499, category: 'men', rating: 4.8, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=300', brand: 'Men', inStock: true, sizes: ['S', 'M', 'L', 'XL'], description: 'Cozy and stylish basic oatmeal tan fleece hoodie.' }
];

export default function AdminLoginPage({ onCustomerLogin, currentUser, onLogout, onBackToStore }: AdminLoginPageProps) {
  // Login flow states
  const [loginTab, setLoginTab] = useState<'customer' | 'admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return safeLocalStorage.getItem('lucky_admin_token') === 'true';
  });

  // Admin core lists
  const [productsList, setProductsList] = useState<Product[]>(() => {
    const saved = safeLocalStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [ordersList, setOrdersList] = useState<Order[]>(() => {
    const saved = safeLocalStorage.getItem('admin_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [customersList, setCustomersList] = useState<Customer[]>(() => {
    const saved = safeLocalStorage.getItem('admin_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  // Product CRUD modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    originalPrice: '',
    category: 'men',
    brand: '',
    sizes: 'S, M, L, XL',
    image: '',
    description: '',
    inStock: true
  });

  // Toast notifier popup state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const triggerToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveProductsToStorage = (list: Product[]) => {
    setProductsList(list);
    safeLocalStorage.setItem('admin_products', JSON.stringify(list));
  };

  const saveOrdersToStorage = (list: Order[]) => {
    setOrdersList(list);
    safeLocalStorage.setItem('admin_orders', JSON.stringify(list));
  };

  // Sign In / Register customer submit
  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistering) {
      if (name.trim() && email.trim() && password.trim()) {
        onCustomerLogin({ name, email });
        triggerToast(`Welcome aboard, ${name}!`);
        setIsRegistering(false);
      } else {
        setErrorMessage('All fields are required.');
      }
    } else {
      if (email.trim() && password.trim()) {
        const customerName = email.split('@')[0];
        const capitalized = customerName.charAt(0).toUpperCase() + customerName.slice(1);
        onCustomerLogin({ name: capitalized, email });
        triggerToast(`Signed in successfully as ${capitalized}!`);
      } else {
        setErrorMessage('Please enter email and password.');
      }
    }
  };

  // Admin login submit
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@lucky.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      safeLocalStorage.setItem('lucky_admin_token', 'true');
      setErrorMessage('');
      triggerToast('Welcome Back, Administrator!', 'success');
    } else {
      setErrorMessage('Invalid Admin Credentials. Tip: Use helper card details.');
      triggerToast('Login Failed', 'error');
    }
  };

  const handleFillCredentials = (type: 'customer' | 'admin') => {
    setErrorMessage('');
    if (type === 'customer') {
      setEmail('customer@lucky.com');
      setPassword('lucky123');
      setName('John Doe');
    } else {
      setEmail('admin@lucky.com');
      setPassword('admin123');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    safeLocalStorage.removeItem('lucky_admin_token');
    triggerToast('Logged out of Admin Portal successfully', 'success');
  };

  const handleCycleStatus = (orderId: string) => {
    const nextStatusMap: Record<string, 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'> = {
      'Pending': 'Processing',
      'Processing': 'Shipped',
      'Shipped': 'Delivered',
      'Delivered': 'Pending',
      'Cancelled': 'Pending'
    };

    const updated = ordersList.map(o => {
      if (o.id === orderId) {
        const next = nextStatusMap[o.status];
        triggerToast(`Order ${orderId} updated to ${next}`, 'success');
        return { ...o, status: next };
      }
      return o;
    });
    saveOrdersToStorage(updated);
  };

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price || !productForm.brand) {
      triggerToast('Please fill out required fields', 'error');
      return;
    }

    const priceNum = Number(productForm.price);
    const origPriceNum = productForm.originalPrice ? Number(productForm.originalPrice) : priceNum;

    if (editingProduct) {
      const updated = productsList.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: productForm.name,
            price: priceNum,
            originalPrice: origPriceNum,
            category: productForm.category as any,
            brand: productForm.brand,
            sizes: productForm.sizes.split(',').map(s => s.trim()),
            image: productForm.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300',
            description: productForm.description,
            inStock: productForm.inStock
          };
        }
        return p;
      });
      saveProductsToStorage(updated);
      triggerToast('Product details updated successfully!', 'success');
    } else {
      const newProduct: Product = {
        id: `admin-new-${Date.now()}`,
        name: productForm.name,
        price: priceNum,
        originalPrice: origPriceNum,
        category: productForm.category as any,
        rating: 5.0,
        image: productForm.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300',
        brand: productForm.brand,
        sizes: productForm.sizes.split(',').map(s => s.trim()),
        inStock: productForm.inStock,
        description: productForm.description || 'No description provided.'
      };
      saveProductsToStorage([newProduct, ...productsList]);
      triggerToast('New product added to catalog!', 'success');
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleEditProductClick = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      price: p.price.toString(),
      originalPrice: p.originalPrice.toString(),
      category: p.category,
      brand: p.brand,
      sizes: p.sizes.join(', '),
      image: p.image,
      description: p.description || '',
      inStock: p.inStock
    });
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product from the inventory?')) {
      const filtered = productsList.filter(p => p.id !== id);
      saveProductsToStorage(filtered);
      triggerToast('Product removed from catalog', 'success');
    }
  };

  return (
    <div className="bg-[#f8f9fc] min-h-screen pb-16 font-sans">
      
      {/* Toast Notification Popup */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 py-3 px-5 rounded-xl shadow-xl border animate-fade-in text-xs font-black tracking-wide ${
          toast.type === 'success' 
            ? 'bg-emerald-500 text-white border-emerald-400' 
            : 'bg-rose-500 text-white border-rose-400'
        }`}>
          <CheckCircle2 size={15} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* RENDER THE HIGH-FIDELITY DASHBOARD IF ADMIN IS LOGGED IN */}
      {isAdminLoggedIn ? (
        <AdminDashboard
          productsList={productsList}
          ordersList={ordersList}
          customersList={customersList}
          onLogout={handleAdminLogout}
          onCycleStatus={handleCycleStatus}
          onEditProduct={handleEditProductClick}
          onDeleteProduct={handleDeleteProduct}
          onAddProductClick={() => {
            setEditingProduct(null);
            setProductForm({
              name: '',
              price: '',
              originalPrice: '',
              category: 'men',
              brand: '',
              sizes: 'S, M, L, XL',
              image: '',
              description: '',
              inStock: true
            });
            setIsProductModalOpen(true);
          }}
          onBackToStore={onBackToStore}
        />
      ) : (
        
        /* OTHERWISE: LOGIN FORM SCREEN */
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          
          {/* Breadcrumbs for login form */}
          <div className="flex items-center justify-between gap-1.5 text-xs text-gray-400 font-semibold mb-5 select-none text-left">
            <div className="flex items-center gap-1.5">
              <span onClick={onBackToStore} className="hover:text-[#08214d] cursor-pointer transition-colors">Home</span>
              <span>&gt;</span>
              <span className="text-gray-500">Account Login</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={onBackToStore}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Back to Storefront"
              >
                <ArrowLeft size={12} />
                <span>Back</span>
              </button>
              <button 
                onClick={onBackToStore}
                className="px-3 py-1.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 hover:border-rose-200 text-rose-600 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Close"
              >
                <X size={12} />
                <span>Close</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-12 text-left">
            
            {/* LEFT SPLIT COLUMN: BRAND BANNER PANEL (5/12) */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#04122e] via-[#09224f] to-[#040e24] text-white p-8 flex flex-col justify-between relative overflow-hidden min-h-[300px]">
              
              <div className="absolute top-0 right-0 w-44 h-44 bg-sky-500/5 rounded-full -translate-y-8 translate-x-8 blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-52 h-52 bg-emerald-500/5 rounded-full translate-y-12 -translate-x-12 blur-xl pointer-events-none" />

              <div className="relative z-10 select-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-sky-400 font-bold mb-8">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shrink-0"></span>
                  <span>BARDIBAS NEPAL STORE GATEWAY</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">
                  Lucky Apparel & Shoes
                </h2>
                <p className="text-xs text-gray-300 font-medium mt-2 leading-relaxed">
                  Sign in to access your loyalty gold status card, active delivery updates, and premium member discount coupons.
                </p>
              </div>

              {/* Demo Quick Fills details overlay card */}
              <div className="relative z-10 bg-white/5 border border-white/10 rounded-xl p-4 select-none mt-8">
                <span className="text-[9px] font-black text-sky-400 tracking-wider uppercase block">DEMO TESTING CREDENTIALS</span>
                
                <div className="mt-3.5 space-y-2.5">
                  <div>
                    <span className="text-[9px] text-gray-400 block font-black uppercase">Demo Customer Account:</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-gray-200">customer@lucky.com / lucky123</span>
                      <button
                        onClick={() => {
                          setLoginTab('customer');
                          handleFillCredentials('customer');
                        }}
                        className="text-[9px] font-black text-sky-400 hover:underline hover:text-white uppercase shrink-0 cursor-pointer"
                      >
                        Auto Fill
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-2.5">
                    <span className="text-[9px] text-gray-400 block font-black uppercase">Demo Administrator:</span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-gray-200">admin@lucky.com / admin123</span>
                      <button
                        onClick={() => {
                          setLoginTab('admin');
                          handleFillCredentials('admin');
                        }}
                        className="text-[9px] font-black text-sky-400 hover:underline hover:text-white uppercase shrink-0 cursor-pointer"
                      >
                        Auto Fill
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SPLIT COLUMN: FORMS INTERACTION TABS (7/12) */}
            <div className="md:col-span-7 p-8 flex flex-col justify-center">
              
              <div className="grid grid-cols-2 gap-2 mb-8 bg-gray-50 border border-gray-200/60 p-1.5 rounded-xl select-none">
                <button
                  onClick={() => {
                    setLoginTab('customer');
                    setErrorMessage('');
                  }}
                  className={`py-2 px-4 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginTab === 'customer'
                      ? 'bg-white text-[#08214d] shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <User size={13} />
                  <span>Customer Log</span>
                </button>

                <button
                  onClick={() => {
                    setLoginTab('admin');
                    setErrorMessage('');
                  }}
                  className={`py-2 px-4 text-xs font-black rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    loginTab === 'admin'
                      ? 'bg-white text-[#08214d] shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Key size={13} />
                  <span>Admin Portal</span>
                </button>
              </div>

              {currentUser && loginTab === 'customer' ? (
                <div className="text-center py-6 select-none">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-200 text-[#08214d] flex items-center justify-center text-2xl font-black mx-auto mb-4 uppercase">
                    {currentUser.name.charAt(0)}
                  </div>
                  
                  <h3 className="text-lg font-black text-gray-800">
                    Welcome Back, {currentUser.name}!
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 font-mono font-bold">
                    {currentUser.email}
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-5 space-y-3 max-w-sm mx-auto text-left">
                    <div className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3 border border-gray-100">
                      <ShoppingBag size={16} className="text-emerald-500 shrink-0" />
                      <div>
                        <h5 className="text-xs font-black text-gray-700 uppercase">Loyalty status</h5>
                        <span className="text-[10px] text-gray-400 font-bold">Lucky Gold Member (120 Points)</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-3.5 flex items-center gap-3 border border-gray-100">
                      <FileText size={16} className="text-sky-500 shrink-0" />
                      <div>
                        <h5 className="text-xs font-black text-gray-700 uppercase">My Order History</h5>
                        <span className="text-[10px] text-gray-400 font-bold">1 active delivery | 3 completed orders</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onLogout}
                    className="mt-8 bg-rose-50 border border-rose-100 hover:bg-rose-500 hover:text-white text-rose-600 font-black tracking-wider text-[10px] py-2.5 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    SIGN OUT OF MY ACCOUNT
                  </button>
                </div>
              ) : (
                
                <div className="select-none animate-fade-in">
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-black text-[#08214d]">
                      {loginTab === 'customer' 
                        ? (isRegistering ? 'Register Store Account' : 'Customer Account Login') 
                        : 'Store Owner Login'
                      }
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      {loginTab === 'customer'
                        ? (isRegistering ? 'Become a member and earn reward points on clothing.' : 'Manage your cart, address cards and track orders.')
                        : 'Secure portal for Lucky Readymade administrators only.'
                      }
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="mb-4 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-bold p-3 rounded-lg flex items-center gap-2">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <form 
                    onSubmit={loginTab === 'customer' ? handleCustomerSubmit : handleAdminSubmit}
                    className="space-y-4"
                  >
                    
                    {loginTab === 'customer' && isRegistering && (
                      <div>
                        <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">Full Name</label>
                        <div className="relative">
                          <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="text-[11px] font-black text-gray-700 uppercase block mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          placeholder={loginTab === 'customer' ? "customer@lucky.com" : "admin@lucky.com"}
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 bg-gray-50 text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[11px] font-black text-gray-700 uppercase">Password</label>
                        {loginTab === 'customer' && !isRegistering && (
                          <button 
                            type="button"
                            onClick={() => alert("Password reset directions simulated to your inbox.")}
                            className="text-[10px] font-bold text-gray-400 hover:text-[#08214d] hover:underline"
                          >
                            Forgot Password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-9 pr-11 py-2.5 bg-gray-50 text-xs font-semibold text-gray-800 rounded-lg border border-gray-200 focus:outline-none focus:border-[#08214d] focus:ring-1 focus:ring-[#08214d]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#05142e] hover:bg-[#0c244c] text-white text-[10px] font-black tracking-widest py-3.5 rounded-lg shadow-xs hover:shadow-md transition-all active:scale-[0.99] uppercase cursor-pointer"
                    >
                      {loginTab === 'customer'
                        ? (isRegistering ? 'Register New Account' : 'Sign In Customer')
                        : 'Admin Secure Login'
                      }
                    </button>

                  </form>

                  {loginTab === 'customer' && (
                    <div className="mt-5 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                      {isRegistering ? (
                        <p>
                          Already have a member account?{' '}
                          <button 
                            onClick={() => {
                              setIsRegistering(false);
                              setErrorMessage('');
                            }}
                            className="text-[#08214d] font-black hover:underline cursor-pointer"
                          >
                            Sign in here
                          </button>
                        </p>
                      ) : (
                        <p>
                          Don&apos;t have a member account?{' '}
                          <button 
                            onClick={() => {
                              setIsRegistering(true);
                              setErrorMessage('');
                            }}
                            className="text-[#08214d] font-black hover:underline cursor-pointer"
                          >
                            Sign up here
                          </button>
                        </p>
                      )}
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* Intertwined modal dialogue for creating or editing products */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="product-modal" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => {
                setIsProductModalOpen(false);
                setEditingProduct(null);
              }}
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-gray-100 select-none">
              
              <div className="bg-[#04122e] text-white p-5 flex items-center justify-between">
                <h4 className="text-xs font-black tracking-widest uppercase">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Inventory Product'}
                </h4>
                <button
                  onClick={() => {
                    setIsProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <form onSubmit={handleProductFormSubmit} className="p-6 space-y-4">
                
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Product Title Name <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Slim-Fit Stretch Denim"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Category <span className="text-rose-500">*</span></label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-850 rounded-lg py-2.5 px-3 focus:outline-none focus:border-[#08214d]"
                    >
                      <option value="men">Men Clothes</option>
                      <option value="women">Women Dress</option>
                      <option value="kids">Kids Special</option>
                      <option value="shoes">Shoes & Sneakers</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Brand <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adidas, Men, Kids"
                      value={productForm.brand}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Sale Price (Rs.) <span className="text-rose-500">*</span></label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1999"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Original Retail Price (Rs.)</label>
                    <input
                      type="number"
                      placeholder="e.g. 2999"
                      value={productForm.originalPrice}
                      onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Photo Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Sizes (Comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. S, M, L, XL"
                      value={productForm.sizes}
                      onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                      className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-800 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Inventory Stock Status</label>
                    <div className="flex items-center gap-3 mt-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                        <input
                          type="radio"
                          name="inStock"
                          checked={productForm.inStock === true}
                          onChange={() => setProductForm({ ...productForm, inStock: true })}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>In Stock</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-600 cursor-pointer">
                        <input
                          type="radio"
                          name="inStock"
                          checked={productForm.inStock === false}
                          onChange={() => setProductForm({ ...productForm, inStock: false })}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span>Out of Stock</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase block mb-1.5">Detailed Description</label>
                  <textarea
                    placeholder="Enter material, wash guidelines and dimensions..."
                    rows={2}
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-white border border-gray-200 text-xs font-semibold text-gray-850 rounded-lg py-2.5 px-4 focus:outline-none focus:border-[#08214d]"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsProductModalOpen(false);
                      setEditingProduct(null);
                    }}
                    className="bg-gray-150 hover:bg-gray-200 text-gray-700 text-[10px] font-black tracking-widest uppercase py-3 px-6 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black tracking-widest uppercase py-3 px-6 rounded-lg shadow-2xs cursor-pointer"
                  >
                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                  </button>
                </div>

              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
