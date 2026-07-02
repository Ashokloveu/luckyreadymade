import React, { useState } from 'react';
import { 
  Search, Bell, Globe, Menu, ChevronDown, Calendar, ArrowUpRight, ArrowDownRight, ArrowLeft,
  ShoppingBag, ShoppingCart, CheckCircle2, Users, Eye, Plus, FolderPlus, 
  Image as ImageIcon, Tag, Percent, Mail, Settings, ChevronRight, Package, Star, 
  RefreshCw, Edit, Trash2, LogOut, Check, Heart, X, Sparkles, Sliders, Flame,
  Video, Play, Lightbulb, HelpCircle, Move, GripVertical, LayoutDashboard,
  Download, Upload, Filter, Layers, Folder, EyeOff, MapPin, CreditCard, Printer, FileText,
  Clock, Truck, User
} from 'lucide-react';
import { Product } from '../types';
import AdminBillingPage from './AdminBillingPage';

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

interface AdminDashboardProps {
  productsList: Product[];
  ordersList: Order[];
  customersList: Customer[];
  onLogout: () => void;
  onCycleStatus: (id: string) => void;
  onEditProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onAddProductClick: () => void;
  onBackToStore: () => void;
}

export default function AdminDashboard({
  productsList,
  ordersList,
  customersList,
  onLogout,
  onCycleStatus,
  onEditProduct,
  onDeleteProduct,
  onAddProductClick,
  onBackToStore
}: AdminDashboardProps) {
  // Sidebar states
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // --- NEW HIGH-FIDELITY ORDERS REGISTER STATE AND DATA ---
  const [localOrdersList, setLocalOrdersList] = useState<any[]>(() => {
    const saved = localStorage.getItem('admin_orders');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'ORD-0002568',
        customerName: 'Ramesh Karki',
        email: 'ramesh@gmail.com',
        phone: '+977 9841234567',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        location: 'Tokha-10, Kathmandu, Nepal',
        shippingAddress: {
          name: 'Ramesh Karki',
          address: 'Tokha-10, Kathmandu',
          city: 'Bagmati',
          country: 'Nepal',
          zip: '44600'
        },
        amount: 9350,
        subtotal: 10150,
        shippingCharge: 200,
        discount: 1000,
        status: 'Delivered',
        paymentStatus: 'Paid',
        paymentMethod: 'Khalti',
        date: 'May 26, 2025',
        time: '10:30 AM',
        items: 'Nike Air Max 270 x 1, Adidas T-Shirt x 2, Casio Watch x 1',
        detailedItems: [
          { name: 'Nike Air Max 270', size: 'Black / 42', price: 4500, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' },
          { name: 'Adidas T-Shirt', size: 'Blue / L', price: 1200, quantity: 2, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=150' },
          { name: 'Casio Watch', size: 'Black', price: 3250, quantity: 1, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: 'Deliver before 5 PM if possible.',
        source: 'via Web'
      },
      {
        id: 'ORD-0002567',
        customerName: 'Sita Thapa',
        email: 'sita@gmail.com',
        phone: '+977 9841112222',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
        location: 'Baneshwor, Kathmandu, Nepal',
        shippingAddress: {
          name: 'Sita Thapa',
          address: 'Baneshwor',
          city: 'Kathmandu',
          country: 'Nepal',
          zip: '44600'
        },
        amount: 2450,
        subtotal: 2250,
        shippingCharge: 200,
        discount: 0,
        status: 'Processing',
        paymentStatus: 'Paid',
        paymentMethod: 'eSewa',
        date: 'May 26, 2025',
        time: '09:15 AM',
        items: 'Floral Midi Dress x 1',
        detailedItems: [
          { name: 'Floral Midi Dress', size: 'XS / Pink', price: 2250, quantity: 1, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: '',
        source: 'via Web'
      },
      {
        id: 'ORD-0002566',
        customerName: 'Anil Gurung',
        email: 'anil@gmail.com',
        phone: '+977 9841334455',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
        location: 'Pokhara, Kaski, Nepal',
        shippingAddress: {
          name: 'Anil Gurung',
          address: 'Lakeside-6',
          city: 'Pokhara',
          country: 'Nepal',
          zip: '33700'
        },
        amount: 1750,
        subtotal: 1550,
        shippingCharge: 200,
        discount: 0,
        status: 'Pending',
        paymentStatus: 'Pending',
        paymentMethod: 'Cash on Delivery',
        date: 'May 25, 2025',
        time: '06:45 PM',
        items: 'Pique Polo T-Shirt x 1',
        detailedItems: [
          { name: 'Pique Polo T-Shirt', size: 'M / Black', price: 1550, quantity: 1, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: 'Please call before delivery.',
        source: 'via Web'
      },
      {
        id: 'ORD-0002565',
        customerName: 'Maya Limbu',
        email: 'maya@gmail.com',
        phone: '+977 9841556677',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        location: 'Dharan, Sunsari, Nepal',
        shippingAddress: {
          name: 'Maya Limbu',
          address: 'Bhanuchowk',
          city: 'Dharan',
          country: 'Nepal',
          zip: '56700'
        },
        amount: 3980,
        subtotal: 3780,
        shippingCharge: 200,
        discount: 0,
        status: 'Shipped',
        paymentStatus: 'Paid',
        paymentMethod: 'Stripe',
        date: 'May 25, 2025',
        time: '04:20 PM',
        items: 'Skechers Microspec x 1',
        detailedItems: [
          { name: 'Skechers Microspec', size: 'Kids / 4Y', price: 3780, quantity: 1, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: '',
        source: 'via Web'
      },
      {
        id: 'ORD-0002564',
        customerName: 'Bikash Rai',
        email: 'bikash@gmail.com',
        phone: '+977 9841778899',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
        location: 'Biratnagar, Morang, Nepal',
        shippingAddress: {
          name: 'Bikash Rai',
          address: 'Main Road',
          city: 'Biratnagar',
          country: 'Nepal',
          zip: '56600'
        },
        amount: 6240,
        subtotal: 6040,
        shippingCharge: 200,
        discount: 0,
        status: 'Delivered',
        paymentStatus: 'Paid',
        paymentMethod: 'Khalti',
        date: 'May 24, 2025',
        time: '02:10 PM',
        items: 'Men Hoodie x 2',
        detailedItems: [
          { name: "Men's Hoodie", size: 'XL / Oatmeal', price: 3020, quantity: 2, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: '',
        source: 'via Web'
      },
      {
        id: 'ORD-0002563',
        customerName: 'Pooja Sharma',
        email: 'pooja@gmail.com',
        phone: '+977 9841223344',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        location: 'Lalitpur, Nepal',
        shippingAddress: {
          name: 'Pooja Sharma',
          address: 'Jhamsikhel',
          city: 'Lalitpur',
          country: 'Nepal',
          zip: '44700'
        },
        amount: 2150,
        subtotal: 1950,
        shippingCharge: 200,
        discount: 0,
        status: 'Delivered',
        paymentStatus: 'Paid',
        paymentMethod: 'eSewa',
        date: 'May 24, 2025',
        time: '11:05 AM',
        items: 'Adidas Classic Backpack x 1',
        detailedItems: [
          { name: 'Adidas Classic Backpack', size: 'One Size', price: 1950, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: '',
        source: 'via Web'
      },
      {
        id: 'ORD-0002562',
        customerName: 'Deepak Bista',
        email: 'deepak@gmail.com',
        phone: '+977 9841445566',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
        location: 'Bhaktapur, Nepal',
        shippingAddress: {
          name: 'Deepak Bista',
          address: 'Suryabinayak',
          city: 'Bhaktapur',
          country: 'Nepal',
          zip: '44800'
        },
        amount: 1250,
        subtotal: 1050,
        shippingCharge: 200,
        discount: 0,
        status: 'Cancelled',
        paymentStatus: 'Refunded',
        paymentMethod: 'Cash on Delivery',
        date: 'May 23, 2025',
        time: '09:40 AM',
        items: 'Pique Polo T-Shirt x 1',
        detailedItems: [
          { name: 'Pique Polo T-Shirt', size: 'L / Red', price: 1050, quantity: 1, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: 'User cancelled due to delays.',
        source: 'via Web'
      },
      {
        id: 'ORD-0002561',
        customerName: 'Kabita Magar',
        email: 'kabita@gmail.com',
        phone: '+977 9841667788',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
        location: 'Butwal, Rupandehi, Nepal',
        shippingAddress: {
          name: 'Kabita Magar',
          address: 'Golpark',
          city: 'Butwal',
          country: 'Nepal',
          zip: '32900'
        },
        amount: 7850,
        subtotal: 7650,
        shippingCharge: 200,
        discount: 0,
        status: 'Shipped',
        paymentStatus: 'Paid',
        paymentMethod: 'Stripe',
        date: 'May 23, 2025',
        time: '08:30 AM',
        items: 'Nike Air Monarch IV x 1, Adidas Classic Backpack x 1',
        detailedItems: [
          { name: 'Nike Air Monarch IV', size: '9 / Black', price: 5500, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' },
          { name: 'Adidas Classic Backpack', size: 'One Size', price: 2150, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: '',
        source: 'via Web'
      },
      {
        id: 'ORD-0002560',
        customerName: 'Sandeep Adhikari',
        email: 'sandeep@gmail.com',
        phone: '+977 9841889900',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
        location: 'Hetauda, Makwanpur, Nepal',
        shippingAddress: {
          name: 'Sandeep Adhikari',
          address: 'School Road',
          city: 'Hetauda',
          country: 'Nepal',
          zip: '44100'
        },
        amount: 5320,
        subtotal: 5120,
        shippingCharge: 200,
        discount: 0,
        status: 'Processing',
        paymentStatus: 'Paid',
        paymentMethod: 'Khalti',
        date: 'May 22, 2025',
        time: '07:25 PM',
        items: 'Men Hoodie x 1, Accessories x 1',
        detailedItems: [
          { name: "Men's Hoodie", size: 'M / Black', price: 2920, quantity: 1, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=150' },
          { name: 'Accessories Belt', size: 'One Size', price: 2200, quantity: 1, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: '',
        source: 'via Web'
      },
      {
        id: 'ORD-0002559',
        customerName: 'Nisha Shrestha',
        email: 'nisha@gmail.com',
        phone: '+977 9841001122',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
        location: 'Janakpur, Dhanusha, Nepal',
        shippingAddress: {
          name: 'Nisha Shrestha',
          address: 'Janaki Mandir Chowk',
          city: 'Janakpur',
          country: 'Nepal',
          zip: '45600'
        },
        amount: 1890,
        subtotal: 1690,
        shippingCharge: 200,
        discount: 0,
        status: 'Pending',
        paymentStatus: 'Pending',
        paymentMethod: 'eSewa',
        date: 'May 22, 2025',
        time: '06:10 PM',
        items: 'Floral Midi Dress x 1',
        detailedItems: [
          { name: 'Floral Midi Dress', size: 'S / Red', price: 1690, quantity: 1, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=150' }
        ],
        notes: 'Gift pack wrapping requested.',
        source: 'via Web'
      }
    ];
  });

  const saveLocalOrdersList = (newOrders: any[]) => {
    setLocalOrdersList(newOrders);
    try {
      localStorage.setItem('admin_orders', JSON.stringify(newOrders));
    } catch (e) {
      console.warn("Storage quota exceeded for admin_orders", e);
    }
  };

  const [selectedOrderId, setSelectedOrderId] = useState<string>('ORD-0002568');
  const [activeOrderTab, setActiveOrderTab] = useState<string>('All');
  const [ordersSearchQuery, setOrdersSearchQuery] = useState('');
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);

  // In-place editing triggers for Order Details Panel
  const [isEditingCustomerDetails, setIsEditingCustomerDetails] = useState(false);
  const [isEditingShippingDetails, setIsEditingShippingDetails] = useState(false);
  const [isEditingOrderItems, setIsEditingOrderItems] = useState(false);

  // In-place edit form states
  const [customerEditForm, setCustomerEditForm] = useState({ name: '', email: '', phone: '', avatar: '' });
  const [shippingEditForm, setShippingEditForm] = useState({ name: '', address: '', city: '', country: '', zip: '' });
  const [itemsEditForm, setItemsEditForm] = useState<any[]>([]);
  const [financialsEditForm, setFinancialsEditForm] = useState({ shippingCharge: 200, discount: 0 });

  // Add Order Form State
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kathmandu',
    country: 'Nepal',
    zip: '44600',
    paymentMethod: 'Khalti' as any,
    status: 'Pending' as any,
    paymentStatus: 'Pending' as any,
    shippingCharge: 200,
    discount: 0,
    notes: '',
    items: [] as any[]
  });

  const [newOrderItemForm, setNewOrderItemForm] = useState({
    name: '',
    size: 'M / 40',
    price: 1500,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150'
  });
  // --- END OF NEW ORDERS REGISTER STATES ---
  const [hoveredChartIndex, setHoveredChartIndex] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState('May 20 – May 26, 2025');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  // Static chart data (matching sales overview path from image)
  const salesOverviewData = [
    { label: 'May 20', val: 50000, display: 'Rs. 50,000' },
    { label: 'May 21', val: 180000, display: 'Rs. 180,000' },
    { label: 'May 22', val: 140000, display: 'Rs. 140,000' },
    { label: 'May 23', val: 200000, display: 'Rs. 200,000' },
    { label: 'May 24', val: 240000, display: 'Rs. 240,000' },
    { label: 'May 25', val: 120000, display: 'Rs. 120,000' },
    { label: 'May 26', val: 230000, display: 'Rs. 230,000' },
  ];

  // Best selling products array (with actual high-quality mock images)
  const bestSellers = [
    {
      id: 1,
      name: 'Adidas Grand Court 2.0',
      category: 'Men Shoes',
      price: 'Rs. 28,750',
      sold: 152,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 2,
      name: 'Pique Polo T-Shirt',
      category: 'Men',
      price: 'Rs. 22,350',
      sold: 135,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 3,
      name: 'Urban Backpack',
      category: 'Accessories',
      price: 'Rs. 18,450',
      sold: 112,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 4,
      name: 'Floral Midi Dress',
      category: 'Women',
      price: 'Rs. 17,890',
      sold: 98,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 5,
      name: 'Nike Air Monarch IV',
      category: 'Men Shoes',
      price: 'Rs. 15,600',
      sold: 86,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120'
    }
  ];

  // Stock alerts matching image
  const stockAlerts = [
    {
      id: 1,
      name: 'Skechers Track - Sceloric',
      category: 'Men Shoes',
      stock: 5,
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 2,
      name: 'Essentials Hoodie',
      category: 'Men',
      stock: 7,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 3,
      name: 'Casio Enticer Watch',
      category: 'Accessories',
      stock: 3,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 4,
      name: 'Girls Casual Shoes',
      category: 'Kids',
      stock: 4,
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=120'
    },
    {
      id: 5,
      name: 'Puma Gym Bag',
      category: 'Accessories',
      stock: 6,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=120'
    }
  ];

  // Recent orders matching image
  const recentOrders = [
    { id: '#ORD-250526-001', customer: 'Ramesh Karki', amount: 'Rs. 2,599', status: 'Pending' },
    { id: '#ORD-250526-002', customer: 'Sita Thapa', amount: 'Rs. 1,299', status: 'Processing' },
    { id: '#ORD-250526-003', customer: 'Anil Gurung', amount: 'Rs. 4,799', status: 'Shipped' },
    { id: '#ORD-250526-004', customer: 'Maya Limbu', amount: 'Rs. 3,150', status: 'Delivered' },
    { id: '#ORD-250526-005', customer: 'Bikash Rai', amount: 'Rs. 1,899', status: 'Cancelled' }
  ];

  // Local notification toasts
  const [localToast, setLocalToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const triggerLocalToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setLocalToast({ message: msg, type });
    setTimeout(() => setLocalToast(null), 3000);
  };

  // Image Upload / Base64 Reader Helper with built-in compression to prevent QuotaExceededError
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, onComplete: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            
            // Limit maximum dimension to 400px to keep storage usage low
            const max_size = 400;
            if (width > height) {
              if (width > max_size) {
                height *= max_size / width;
                width = max_size;
              }
            } else {
              if (height > max_size) {
                width *= max_size / height;
                height = max_size;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              // Use lower quality (0.6) jpeg to keep file sizes very small (~10-25 KB)
              const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6);
              onComplete(compressedBase64);
              triggerLocalToast('Image optimized and synchronized successfully!', 'success');
            } else {
              onComplete(reader.result as string);
              triggerLocalToast('Image loaded and synced successfully!', 'success');
            }
          };
          img.onerror = () => {
            onComplete(reader.result as string);
            triggerLocalToast('Image loaded and synced successfully!', 'success');
          };
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Users & Staff Roles State
  const [localStaffUsers, setLocalStaffUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('admin_staff_users');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'user-1', name: 'Lucky Admin', email: 'admin@luckyreadymade.com', role: 'Super Admin', status: 'Active', lastActive: 'Just Now', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: 'user-2', name: 'Ramesh Staff', email: 'sales@luckyreadymade.com', role: 'Sales Executive', status: 'Active', lastActive: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
      { id: 'user-3', name: 'Anita Manager', email: 'inventory@luckyreadymade.com', role: 'Inventory Manager', status: 'Active', lastActive: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }
    ];
  });

  const saveLocalStaffUsers = (newList: any[]) => {
    setLocalStaffUsers(newList);
    localStorage.setItem('admin_staff_users', JSON.stringify(newList));
  };

  // User Management Forms State
  const [isStaffFormOpen, setIsStaffFormOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any | null>(null);
  const [staffForm, setStaffForm] = useState({ name: '', email: '', role: 'Editor', status: 'Active' });

  // Home Management States
  const [homeManagementExpanded, setHomeManagementExpanded] = useState(true);
  const [productsExpanded, setProductsExpanded] = useState(true);

  // Trashed product state
  const [trashedProductIds, setTrashedProductIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('admin_trashed_products');
    return saved ? JSON.parse(saved) : [];
  });

  const saveTrashedProductIds = (newList: string[]) => {
    setTrashedProductIds(newList);
    try {
      localStorage.setItem('admin_trashed_products', JSON.stringify(newList));
    } catch (e) {
      console.warn("Storage quota exceeded for admin_trashed_products", e);
    }
  };

  // Products list from storage or props
  const [localProductsList, setLocalProductsList] = useState<Product[]>(() => {
    const saved = localStorage.getItem('admin_products');
    if (saved) return JSON.parse(saved);
    return productsList;
  });

  const saveLocalProductsList = (newList: Product[]) => {
    setLocalProductsList(newList);
    try {
      localStorage.setItem('admin_products', JSON.stringify(newList));
    } catch (e) {
      console.warn("Storage quota exceeded for admin_products", e);
    }
  };

  const handleLocalDeleteProduct = (id: string) => {
    const updated = [...new Set([...trashedProductIds, id])];
    saveTrashedProductIds(updated);
    triggerLocalToast('Product moved to Trash successfully!', 'success');
  };

  const handleLocalRestoreProduct = (id: string) => {
    const updated = trashedProductIds.filter(tid => tid !== id);
    saveTrashedProductIds(updated);
    triggerLocalToast('Product restored from Trash successfully!', 'success');
  };

  const handleLocalPermanentDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this product? This action cannot be undone.')) {
      const updatedTrash = trashedProductIds.filter(tid => tid !== id);
      const updatedProducts = localProductsList.filter(p => p.id !== id);
      saveTrashedProductIds(updatedTrash);
      saveLocalProductsList(updatedProducts);
      triggerLocalToast('Product permanently deleted!', 'success');
    }
  };

  // Categories Sidebar and Layout State
  const [brandsExpanded, setBrandsExpanded] = useState(true);
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);
  const [billingExpanded, setBillingExpanded] = useState(true);
  const [adminCategories, setAdminCategories] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_categories');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', name: 'Men', isRoot: true, slug: 'men', parentCategory: '—', productsCount: 356, status: 'Active', sortOrder: 1, image: '', iconColor: 'blue', iconType: 'user' },
      { id: '2', name: 'Top Wear', isRoot: false, slug: 'men-top-wear', parentCategory: 'Men', productsCount: 125, status: 'Active', sortOrder: 2, image: '', iconColor: 'cyan', iconType: 'shirt' },
      { id: '3', name: 'Bottom Wear', isRoot: false, slug: 'men-bottom-wear', parentCategory: 'Men', productsCount: 98, status: 'Active', sortOrder: 3, image: '', iconColor: 'blue', iconType: 'trousers' },
      { id: '4', name: 'Inner Wear', isRoot: false, slug: 'men-inner-wear', parentCategory: 'Men', productsCount: 64, status: 'Active', sortOrder: 4, image: '', iconColor: 'teal', iconType: 'swimsuit' },
      { id: '5', name: 'Accessories', isRoot: false, slug: 'men-accessories', parentCategory: 'Men', productsCount: 78, status: 'Active', sortOrder: 5, image: '', iconColor: 'orange', iconType: 'watch' },
      { id: '6', name: 'Footwear', isRoot: false, slug: 'men-footwear', parentCategory: 'Men', productsCount: 110, status: 'Active', sortOrder: 6, image: '', iconColor: 'cyan', iconType: 'shoe' },
      { id: '7', name: 'Women', isRoot: true, slug: 'women', parentCategory: '—', productsCount: 312, status: 'Active', sortOrder: 7, image: '', iconColor: 'pink', iconType: 'user-female' },
      { id: '8', name: 'Kids', isRoot: true, slug: 'kids', parentCategory: '—', productsCount: 159, status: 'Active', sortOrder: 8, image: '', iconColor: 'green', iconType: 'child' },
      { id: '9', name: 'Shoes', isRoot: true, slug: 'shoes', parentCategory: '—', productsCount: 245, status: 'Active', sortOrder: 9, image: '', iconColor: 'orange', iconType: 'shoe-sneaker' },
      { id: '10', name: 'Accessories', isRoot: true, slug: 'accessories', parentCategory: '—', productsCount: 186, status: 'Active', sortOrder: 10, image: '', iconColor: 'purple', iconType: 'bag' },
      { id: '11', name: 'Watches', isRoot: false, slug: 'men-watches', parentCategory: 'Men', productsCount: 42, status: 'Active', sortOrder: 11, image: '', iconColor: 'indigo', iconType: 'watch' },
      { id: '12', name: 'Ethnic Wear', isRoot: false, slug: 'women-ethnic', parentCategory: 'Women', productsCount: 145, status: 'Active', sortOrder: 12, image: '', iconColor: 'rose', iconType: 'shirt' },
      { id: '13', name: 'Western Wear', isRoot: false, slug: 'women-western', parentCategory: 'Women', productsCount: 98, status: 'Active', sortOrder: 13, image: '', iconColor: 'pink', iconType: 'shirt' },
      { id: '14', name: 'Activewear', isRoot: false, slug: 'women-active', parentCategory: 'Women', productsCount: 56, status: 'Active', sortOrder: 14, image: '', iconColor: 'teal', iconType: 'swimsuit' },
      { id: '15', name: 'Handbags', isRoot: false, slug: 'women-handbags', parentCategory: 'Women', productsCount: 89, status: 'Active', sortOrder: 15, image: '', iconColor: 'purple', iconType: 'bag' },
      { id: '16', name: 'Footwear', isRoot: false, slug: 'women-footwear', parentCategory: 'Women', productsCount: 112, status: 'Active', sortOrder: 16, image: '', iconColor: 'rose', iconType: 'shoe' },
      { id: '17', name: 'Jewelry', isRoot: false, slug: 'women-jewelry', parentCategory: 'Women', productsCount: 45, status: 'Active', sortOrder: 17, image: '', iconColor: 'yellow', iconType: 'tag' },
      { id: '18', name: 'Boys Clothing', isRoot: false, slug: 'kids-boys', parentCategory: 'Kids', productsCount: 74, status: 'Active', sortOrder: 18, image: '', iconColor: 'green', iconType: 'child' },
      { id: '19', name: 'Girls Clothing', isRoot: false, slug: 'kids-girls', parentCategory: 'Kids', productsCount: 85, status: 'Active', sortOrder: 19, image: '', iconColor: 'emerald', iconType: 'child' },
      { id: '20', name: 'Toys', isRoot: false, slug: 'kids-toys', parentCategory: 'Kids', productsCount: 23, status: 'Inactive', sortOrder: 20, image: '', iconColor: 'amber', iconType: 'toy' },
      { id: '21', name: 'Casual Shoes', isRoot: false, slug: 'shoes-casual', parentCategory: 'Shoes', productsCount: 120, status: 'Active', sortOrder: 21, image: '', iconColor: 'orange', iconType: 'shoe-sneaker' },
      { id: '22', name: 'Sports Shoes', isRoot: false, slug: 'shoes-sports', parentCategory: 'Shoes', productsCount: 95, status: 'Active', sortOrder: 22, image: '', iconColor: 'red', iconType: 'shoe' },
      { id: '23', name: 'Formal Shoes', isRoot: false, slug: 'shoes-formal', parentCategory: 'Shoes', productsCount: 30, status: 'Inactive', sortOrder: 23, image: '', iconColor: 'stone', iconType: 'shoe' },
      { id: '24', name: 'Backpacks', isRoot: false, slug: 'accessories-backpacks', parentCategory: 'Accessories', productsCount: 54, status: 'Active', sortOrder: 24, image: '', iconColor: 'violet', iconType: 'bag' }
    ];
  });

  const saveAdminCategories = (list: any[]) => {
    setAdminCategories(list);
    try {
      localStorage.setItem('lucky_admin_categories', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_categories", e);
    }
  };

  // Categories interactive filters/pagination
  const [categoriesSearch, setCategoriesSearch] = useState('');
  const [categoriesBulkAction, setCategoriesBulkAction] = useState('Bulk Actions');
  const [categoriesSelectedIds, setCategoriesSelectedIds] = useState<string[]>([]);
  const [categoriesCurrentPage, setCategoriesCurrentPage] = useState(1);
  const [categoriesItemsPerPage, setCategoriesItemsPerPage] = useState(10);
  const [categoriesViewLayout, setCategoriesViewLayout] = useState<'list' | 'grid'>('list');

  // Categories adding/editing modal forms
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    isRoot: true,
    parentCategory: '—',
    productsCount: 0,
    status: 'Active' as 'Active' | 'Inactive',
    sortOrder: 1,
    image: '',
    iconColor: 'blue',
    iconType: 'user'
  });

  // ----------------- STATE FOR COUPONS & OFFERS -----------------
  const [adminCoupons, setAdminCoupons] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_coupons');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'cp-1', code: 'LUCKY30', discountType: 'Percentage', value: 30, minPurchase: 500, endDate: '2026-08-31', status: 'Active' },
      { id: 'cp-2', code: 'WELCOME100', discountType: 'Fixed Amount', value: 100, minPurchase: 1000, endDate: '2026-12-31', status: 'Active' },
      { id: 'cp-3', code: 'SUMMER50', discountType: 'Percentage', value: 50, minPurchase: 1500, endDate: '2026-07-31', status: 'Inactive' }
    ];
  });

  const saveAdminCoupons = (list: any[]) => {
    setAdminCoupons(list);
    try {
      localStorage.setItem('lucky_admin_coupons', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_coupons", e);
    }
  };

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'Percentage',
    value: 10,
    minPurchase: 0,
    endDate: '2026-12-31',
    status: 'Active'
  });

  // ----------------- STATE FOR BLOGS -----------------
  const [adminBlogs, setAdminBlogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_blogs');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'post-1', title: 'Step Into Summer: Comfortable Shoe Guide', author: 'Super Admin', date: '2026-06-15', summary: 'Explore our lightweight sandals and high-traction sneakers built for Nepalese summers.', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', status: 'Published' },
      { id: 'post-2', title: 'Readymade Garments Quality Standards', author: 'Admin Editor', date: '2026-05-28', summary: 'How we select premium threads, pure organic cotton, and durable colors to withstand heavy washing.', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300', status: 'Published' }
    ];
  });

  const saveAdminBlogs = (list: any[]) => {
    setAdminBlogs(list);
    try {
      localStorage.setItem('lucky_admin_blogs', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_blogs", e);
    }
  };

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    author: 'Super Admin',
    date: '2026-07-01',
    summary: '',
    image: '',
    status: 'Published'
  });

  // ----------------- STATE FOR USERS & ROLES -----------------
  const [adminUsers, setAdminUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_users');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'user-1', name: 'Super Admin', email: 'bsmart.network@gmail.com', role: 'Administrator', status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
      { id: 'user-2', name: 'John Doe', email: 'john.doe@luckyapparel.com', role: 'Editor', status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
      { id: 'user-3', name: 'Rita Shrestha', email: 'rita@luckyapparel.com', role: 'Sales Manager', status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' }
    ];
  });

  const saveAdminUsers = (list: any[]) => {
    setAdminUsers(list);
    try {
      localStorage.setItem('lucky_admin_users', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_users", e);
    }
  };

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Editor',
    status: 'Active',
    avatar: ''
  });

  // ----------------- STATE FOR STANDALONE MEDIA LIBRARY -----------------
  const [adminMedia, setAdminMedia] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_media');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'media-1', name: 'Red Sneakers High.jpg', size: '240 KB', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300', date: '2026-06-15' },
      { id: 'media-2', name: 'Colorful Sneaker.jpg', size: '185 KB', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=300', date: '2026-05-28' },
      { id: 'media-3', name: 'Summer Kids Dress.jpg', size: '320 KB', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=300', date: '2026-05-12' },
      { id: 'media-4', name: 'Tailoring Threads Banner.jpg', size: '410 KB', url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=300', date: '2026-04-10' }
    ];
  });

  const saveAdminMedia = (list: any[]) => {
    setAdminMedia(list);
    try {
      localStorage.setItem('lucky_admin_media', JSON.stringify(list));
    } catch (e: any) {
      console.warn("Storage quota exceeded", e);
      // Fallback: warn user but still allow the list to be active in memory for the session
      try {
        // Try to save a version where base64 images are replaced with a tiny placeholder
        const saferList = list.map(item => {
          if (item.url && item.url.startsWith('data:image')) {
            return {
              ...item,
              url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300',
              isPlaceholder: true
            };
          }
          return item;
        });
        localStorage.setItem('lucky_admin_media', JSON.stringify(saferList));
        triggerLocalToast('Browser storage full. Large image saved in-memory for this session.', 'error');
      } catch (innerError) {
        console.error("Failed to save even truncated media list", innerError);
      }
    }
  };

  // ----------------- STATE FOR BRANDS (MATCHING IMAGE LOGS & DATA) -----------------
  const [adminBrands, setAdminBrands] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_brands');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'b-1', name: 'Nike', slug: 'nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: true, sortOrder: 1, productsCount: 186, category: 'Shoes', websiteUrl: 'https://nike.com', shortDescription: 'Premium athletic footwear and sportswear.', description: 'Nike is the world\'s leading designer, marketer, and distributor of authentic athletic footwear, apparel, equipment, and accessories.' },
      { id: 'b-2', name: 'Adidas', slug: 'adidas', logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: true, sortOrder: 2, productsCount: 156, category: 'Shoes', websiteUrl: 'https://adidas.com', shortDescription: 'High-performance athletic footwear and apparel.', description: 'Adidas designs and manufactures athletic and casual footwear, apparel, and accessories, known for comfort and performance.' },
      { id: 'b-3', name: 'Puma', slug: 'puma', logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 3, productsCount: 98, category: 'Shoes', websiteUrl: 'https://puma.com', shortDescription: 'Fast sports brand for footwear and lifestyle.', description: 'Puma is a leading sports brand that designs, develops, sells, and markets footwear, apparel, and accessories.' },
      { id: 'b-4', name: 'Skechers', slug: 'skechers', logo: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: true, sortOrder: 4, productsCount: 78, category: 'Shoes', websiteUrl: 'https://skechers.com', shortDescription: 'Comfort footwear for all ages.', description: 'Skechers designs, develops, and markets a diverse range of lifestyle and performance footwear for men, women, and children.' },
      { id: 'b-5', name: 'Reebok', slug: 'reebok', logo: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 5, productsCount: 64, category: 'Shoes', websiteUrl: 'https://reebok.com', shortDescription: 'Fitness and lifestyle athletic footwear.', description: 'Reebok is an American-inspired global brand with a deep fitness heritage and a clear mission to be the best fitness brand in the world.' },
      { id: 'b-6', name: 'Tommy Hilfiger', slug: 'tommy-hilfiger', logo: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 6, productsCount: 58, category: 'Apparel', websiteUrl: 'https://global.tommy.com', shortDescription: 'Classic American cool apparel and designs.', description: 'Tommy Hilfiger is one of the world’s leading designer lifestyle brands, internationally recognized for celebrating the essence of classic American cool style.' },
      { id: 'b-7', name: 'Levi\'s', slug: 'levis', logo: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 7, productsCount: 52, category: 'Apparel', websiteUrl: 'https://levi.com', shortDescription: 'World leader in denim jeans and apparel.', description: 'The Levi\'s brand epitomizes classic American style and effortless cool, specializing in denim jeans, jackets, and accessories.' },
      { id: 'b-8', name: 'Casio', slug: 'casio', logo: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 8, productsCount: 45, category: 'Accessories', websiteUrl: 'https://casio.com', shortDescription: 'Durable watches and electronics.', description: 'Casio is a multinational electronics manufacturing company known for durable watches, calculators, and musical instruments.' },
      { id: 'b-9', name: 'Fossil', slug: 'fossil', logo: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 9, productsCount: 40, category: 'Accessories', websiteUrl: 'https://fossil.com', shortDescription: 'Aesthetic watches and leather accessories.', description: 'Fossil is an American fashion designer and manufacturer, producing watches, jewelry, and leather goods.' },
      { id: 'b-10', name: 'Allen Solly', slug: 'allen-solly', logo: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=120', status: 'Active', featured: false, sortOrder: 10, productsCount: 32, category: 'Apparel', websiteUrl: 'https://allensolly.com', shortDescription: 'Casual workwear and lifestyle apparel.', description: 'Allen Solly is an apparel brand known for casual clothing and footwear, introducing Friday dressing to corporate workplaces.' }
    ];
  });

  const saveAdminBrands = (list: any[]) => {
    setAdminBrands(list);
    try {
      localStorage.setItem('lucky_admin_brands', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_brands", e);
    }
  };

  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isAddBrandPanelOpen, setIsAddBrandPanelOpen] = useState(true); // default to open for side-by-side view matching image
  const [brandFormTab, setBrandFormTab] = useState<'General Info' | 'SEO' | 'Products'>('General Info');
  const [editingBrand, setEditingBrand] = useState<any | null>(null);
  const [brandForm, setBrandForm] = useState({
    name: '',
    slug: '',
    logo: '',
    banner: '',
    category: 'Shoes',
    websiteUrl: '',
    shortDescription: '',
    description: '',
    status: 'Active',
    featured: false,
    sortOrder: 1,
    productsCount: 0
  });

  const [brandsSearch, setBrandsSearch] = useState('');
  const [brandsStatusFilter, setBrandsStatusFilter] = useState('All');

  // ----------------- STATE FOR CUSTOMERS (FULLY EDITABLE) -----------------
  const [adminCustomers, setAdminCustomers] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_customers');
    if (saved) return JSON.parse(saved);
    return customersList || [
      { id: 'CUST-3928', name: 'Ramesh Bhandari', email: 'ramesh.b@gmail.com', points: 340, ordersCount: 12, joinedDate: 'Jun 12, 2026', phone: '9845012345', status: 'Active', avatar: '' },
      { id: 'CUST-1049', name: 'Prerna Shrestha', email: 'prerna.s@yahoo.com', points: 195, ordersCount: 5, joinedDate: 'May 04, 2026', phone: '9801234567', status: 'Active', avatar: '' },
      { id: 'CUST-5830', name: 'Susan Lama', email: 'susan.lama@outlook.com', points: 80, ordersCount: 2, joinedDate: 'Apr 25, 2026', phone: '9818765432', status: 'Active', avatar: '' },
      { id: 'CUST-8391', name: 'Binod Adhikari', email: 'binod@gmail.com', points: 12, ordersCount: 1, joinedDate: 'Mar 18, 2026', phone: '9851098765', status: 'Inactive', avatar: '' }
    ];
  });

  const saveAdminCustomers = (list: any[]) => {
    setAdminCustomers(list);
    try {
      localStorage.setItem('lucky_admin_customers', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_customers", e);
    }
  };

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    points: 0,
    ordersCount: 0,
    joinedDate: '',
    status: 'Active',
    avatar: ''
  });

  // ----------------- STATE FOR BANNERS & POPUPS (PAGES) -----------------
  const [adminBanners, setAdminBanners] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_banners');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'banner-1', title: 'Dashain Festival Mega Sale', type: 'Hero Banner', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600', link: '/shoes', status: 'Active', sortOrder: 1 },
      { id: 'banner-2', title: 'New Shoe Arrivals - Up to 40% Off', type: 'Mid-page Promo', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600', link: '/shoes', status: 'Active', sortOrder: 2 },
      { id: 'banner-3', title: 'Premium Traditional Kurtas Collection', type: 'Sidebar Widget', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=600', link: '/women', status: 'Inactive', sortOrder: 3 }
    ];
  });

  const saveAdminBanners = (list: any[]) => {
    setAdminBanners(list);
    try {
      localStorage.setItem('lucky_admin_banners', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_banners", e);
    }
  };

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<any | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    type: 'Hero Banner',
    image: '',
    link: '',
    status: 'Active',
    sortOrder: 1
  });

  // ----------------- STATE FOR DYNAMIC PAGES (PAGES MANAGEMENT) -----------------
  const [adminPages, setAdminPages] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_pages');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'page-1', title: 'About Us', slug: 'about-us', template: 'Standard', content: 'About Lucky Readymade & Shoe Center:\n\nLocated in Bardibas-1, Nepal (Opposite Area Police Station), we are a household name for high-grade athletic footwear, formal office leather shoes, premium traditional wears like high-quality Kurtas, customized readymade garments, and custom-fit tailoring accessories.', status: 'Published', author: 'Administrator', date: '2026-06-25' },
      { id: 'page-2', title: 'Size Guide & Fit', slug: 'size-guide', template: 'FAQ Accordion', content: 'Our sizing guide includes standard Euro (EU) and US shoe sizes, customized size specifications for men’s polo shirts, custom tailor measurements for cultural Dashain kurtas, and apparel fit instructions.', status: 'Published', author: 'Administrator', date: '2026-06-28' },
      { id: 'page-3', title: 'Contact Us', slug: 'contact-us', template: 'Contact Us Form', content: 'You can contact us via +977-9844000000 or visit our flagship store in Bardibas. Feel free to fill in the online contact form or message our official WhatsApp for fast shipping options.', status: 'Published', author: 'Administrator', date: '2026-06-29' }
    ];
  });

  const saveAdminPages = (list: any[]) => {
    setAdminPages(list);
    try {
      localStorage.setItem('lucky_admin_pages', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_pages", e);
    }
  };

  const [pageForm, setPageForm] = useState({
    title: '',
    slug: '',
    template: 'Standard',
    content: '',
    status: 'Published',
    author: 'Administrator',
    date: ''
  });

  const [editingPage, setEditingPage] = useState<any | null>(null);

  const [adminPopups, setAdminPopups] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_popups');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'pop-1', name: 'LUCKY10 Promo Newsletter Popup', delay: 3, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', url: '/coupons', frequency: 'Show Every Session', status: 'Active' },
      { id: 'pop-2', name: 'Nepali New Year Flat 20% discount', delay: 1, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400', url: '/offers', frequency: 'Show Once Per Day', status: 'Inactive' }
    ];
  });

  const saveAdminPopups = (list: any[]) => {
    setAdminPopups(list);
    try {
      localStorage.setItem('lucky_admin_popups', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_popups", e);
    }
  };

  const [isPopupModalOpen, setIsPopupModalOpen] = useState(false);
  const [editingPopup, setEditingPopup] = useState<any | null>(null);
  const [popupForm, setPopupForm] = useState({
    name: '',
    delay: 3,
    image: '',
    url: '',
    frequency: 'Show Every Session',
    status: 'Active'
  });

  // ----------------- STATE FOR MARKETING CAMPAIGNS -----------------
  const [adminMarketing, setAdminMarketing] = useState<any[]>(() => {
    const saved = localStorage.getItem('lucky_admin_marketing');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'mkt-1', title: 'Dashain Festival Newsletter Broadcast', description: 'Mass email campaign promoting traditional wear and family footwear packages.', audience: 'All Subscribers', trigger: 'Scheduled for Dashain Eve', startDate: '2026-09-10', endDate: '2026-09-25', status: 'Active' },
      { id: 'mkt-2', title: 'Abandoned Cart Automated SMS Campaign', description: 'Automatic text alert with Rs. 150 voucher for cart recoverables.', audience: 'Users with Pending Orders', trigger: '2 Hours after Cart Abandonment', startDate: '2026-05-01', endDate: '2026-12-31', status: 'Active' },
      { id: 'mkt-3', title: 'Re-engagement Loyalty Email Blast', description: 'Promotional gift coupon to customers who haven\'t purchased in 90 days.', audience: 'Inactive Customers', trigger: 'Manual Broadcast', startDate: '2026-07-15', endDate: '2026-07-20', status: 'Inactive' }
    ];
  });

  const saveAdminMarketing = (list: any[]) => {
    setAdminMarketing(list);
    try {
      localStorage.setItem('lucky_admin_marketing', JSON.stringify(list));
    } catch (e) {
      console.warn("Storage quota exceeded for lucky_admin_marketing", e);
    }
  };

  const [isMarketingModalOpen, setIsMarketingModalOpen] = useState(false);
  const [editingMarketing, setEditingMarketing] = useState<any | null>(null);
  const [marketingForm, setMarketingForm] = useState({
    title: '',
    description: '',
    audience: 'All Subscribers',
    trigger: 'Manual Broadcast',
    startDate: '',
    endDate: '',
    status: 'Active'
  });

  // ----------------- STATE FOR SITE APPEARANCE -----------------
  const [appearanceConfig, setAppearanceConfig] = useState<any>(() => {
    const saved = localStorage.getItem('lucky_appearance_config');
    if (saved) return JSON.parse(saved);
    return {
      themeMode: 'Light Mode',
      primaryColor: '#1b5fc1',
      hoverColor: '#144ea1',
      siteLogo: '',
      siteFavicon: '',
      welcomeMessage: 'Discover the Comfort and Style of Premium Footwear & Garments',
      headerFont: 'Inter',
      footerString: '© 2026 Lucky Readymade & Shoe Center. All Rights Reserved.'
    };
  });

  const saveAppearanceConfig = (config: any) => {
    setAppearanceConfig(config);
    localStorage.setItem('lucky_appearance_config', JSON.stringify(config));
  };

  // ----------------- STATE FOR SYSTEM SETTINGS -----------------
  const [systemSettingsConfig, setSystemSettingsConfig] = useState<any>(() => {
    const saved = localStorage.getItem('lucky_system_settings_config');
    if (saved) return JSON.parse(saved);
    return {
      storeName: 'Lucky Readymade & Shoe Center',
      operationsEmail: 'bsmart.network@gmail.com',
      taxRate: 13,
      currencySymbol: 'Rs.',
      esewaMerchantId: 'ESEWA_MERCH_LUCKY_77',
      khaltiSecretKey: 'KHALTI_PRIV_SEC_KEY_8899',
      stripePubKey: 'pk_live_51M7xxxxxxxxxxxxxxxxxxxxxx',
      codEnabled: true,
      vatRegistered: true,
      freeShippingMinAmount: 3000
    };
  });

  const saveSystemSettingsConfig = (config: any) => {
    setSystemSettingsConfig(config);
    localStorage.setItem('lucky_system_settings_config', JSON.stringify(config));
  };

  // Local Categories in products configuration
  const [localProductCategories, setLocalProductCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('admin_product_categories');
    return saved ? JSON.parse(saved) : ['Men Shoes', 'Men Clothing', 'Women Clothing', 'Kids Shoes', 'Kids Clothing', 'Accessories'];
  });

  const saveLocalProductCategories = (newList: string[]) => {
    setLocalProductCategories(newList);
    localStorage.setItem('admin_product_categories', JSON.stringify(newList));
  };

  // Local Brands in products configuration
  const [localProductBrands, setLocalProductBrands] = useState<string[]>(() => {
    const saved = localStorage.getItem('admin_product_brands');
    return saved ? JSON.parse(saved) : ['Nike', 'Adidas', 'Skechers', 'Puma', 'Casio', 'Zara'];
  });

  const saveLocalProductBrands = (newList: string[]) => {
    setLocalProductBrands(newList);
    localStorage.setItem('admin_product_brands', JSON.stringify(newList));
  };

  // Products filters matching exact image specification
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterStockStatus, setFilterStockStatus] = useState('All');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [filterFeatured, setFilterFeatured] = useState('All');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Applied filters state
  const [appliedSearch, setAppliedSearch] = useState('');
  const [appliedCategory, setAppliedCategory] = useState('All');
  const [appliedBrand, setAppliedBrand] = useState('All');
  const [appliedStatus, setAppliedStatus] = useState('All');
  const [appliedStockStatus, setAppliedStockStatus] = useState('All');
  const [appliedMinPrice, setAppliedMinPrice] = useState('');
  const [appliedMaxPrice, setAppliedMaxPrice] = useState('');
  const [appliedFeatured, setAppliedFeatured] = useState('All');
  const [appliedStartDate, setAppliedStartDate] = useState('');
  const [appliedEndDate, setAppliedEndDate] = useState('');

  // Table active states
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | 'published' | 'draft' | 'trash'>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('Bulk Actions');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [viewLayout, setViewLayout] = useState<'list' | 'grid'>('list');

  // Inline / Modal product form states for Editing / Adding
  const [isLocalProductModalOpen, setIsLocalProductModalOpen] = useState(false);
  const [editingLocalProduct, setEditingLocalProduct] = useState<Product | null>(null);
  const [localProductForm, setLocalProductForm] = useState({
    name: '',
    sku: '',
    price: '',
    originalPrice: '',
    category: 'Men Shoes',
    brand: 'Nike',
    sizes: '40, 41, 42, 43',
    image: '',
    description: '',
    inStock: true,
    status: 'Published',
    featured: false
  });

  const [sortOrderEnabled, setSortOrderEnabled] = useState(true);
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);

  const [slides, setSlides] = useState(() => {
    const saved = localStorage.getItem('lucky_slides');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'slide-1',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
        title: 'New Arrivals',
        subtitle: 'Discover the latest styles',
        buttonText: 'Shop Now',
        buttonLink: '/new-arrivals',
        target: 'Same Tab',
        status: true
      },
      {
        id: 'slide-2',
        image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400',
        title: 'Exclusive Offer',
        subtitle: 'On selected products',
        buttonText: 'Shop Offer',
        buttonLink: '/offers',
        target: 'Same Tab',
        status: true
      },
      {
        id: 'slide-3',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=400',
        title: 'Summer Collection',
        subtitle: 'Fresh looks for the season',
        buttonText: 'Explore Now',
        buttonLink: '/women',
        target: 'Same Tab',
        status: true
      },
      {
        id: 'slide-4',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400',
        title: 'Back to School',
        subtitle: 'Best deals on kids essentials',
        buttonText: 'Shop Kids',
        buttonLink: '/kids',
        target: 'Same Tab',
        status: true
      }
    ];
  });

  const saveSlides = (newSlides: any) => {
    setSlides(newSlides);
    localStorage.setItem('lucky_slides', JSON.stringify(newSlides));
  };

  const [slideForm, setSlideForm] = useState({
    title: '',
    subtitle: '',
    buttonText: '',
    buttonLink: '',
    target: 'Same Tab',
    status: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400'
  });

  const [layoutSections, setLayoutSections] = useState(() => {
    const saved = localStorage.getItem('lucky_layout_sections');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'categories-sec', label: 'Categories Section', description: 'Display product categories', enabled: true, iconClass: 'bg-blue-50 text-blue-600' },
      { id: 'banner-sec', label: 'Banner Section', description: 'Promotional banners', enabled: true, iconClass: 'bg-indigo-50 text-indigo-600' },
      { id: 'featured-sec', label: 'Featured Products', description: 'Show selected products', enabled: true, iconClass: 'bg-amber-50 text-amber-600' },
      { id: 'trending-sec', label: 'Trending Products', description: 'Display trending products', enabled: true, iconClass: 'bg-rose-50 text-rose-600' },
      { id: 'new-arrivals-sec', label: 'New Arrivals', description: 'Show new arrival products', enabled: true, iconClass: 'bg-emerald-50 text-emerald-600' },
      { id: 'offers-sec', label: 'Offers Section', description: 'Display offers and deals', enabled: true, iconClass: 'bg-cyan-50 text-cyan-600' },
      { id: 'brand-sec', label: 'Brand Slider', description: 'Showcase top brands', enabled: true, iconClass: 'bg-purple-50 text-purple-600' },
      { id: 'testimonials-sec', label: 'Testimonials', description: 'Customer reviews', enabled: true, iconClass: 'bg-teal-50 text-teal-600' },
      { id: 'videos-sec', label: 'Promotional Videos', description: 'Showcase promotional videos', enabled: true, iconClass: 'bg-red-50 text-red-600' }
    ];
  });

  const saveLayoutSections = (sections: any) => {
    setLayoutSections(sections);
    localStorage.setItem('lucky_layout_sections', JSON.stringify(sections));
  };

  const [categoriesConfig, setCategoriesConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_categories_config');
    return saved ? JSON.parse(saved) : {
      title: 'Shop by Category',
      subtitle: 'Explore our curated collections of shoes and readymade apparel.',
      items: [
        { id: 'cat-1', name: 'Men Clothes', count: '124 Products', enabled: true, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=150' },
        { id: 'cat-2', name: 'Women Dress', count: '98 Products', enabled: true, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=150' },
        { id: 'cat-3', name: 'Kids Special', count: '54 Products', enabled: true, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=150' },
        { id: 'cat-4', name: 'Shoes & Sneakers', count: '210 Products', enabled: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }
      ]
    };
  });

  const saveCategoriesConfig = (val: any) => {
    setCategoriesConfig(val);
    localStorage.setItem('lucky_categories_config', JSON.stringify(val));
  };

  const [bannersConfig, setBannersConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_banners_config');
    return saved ? JSON.parse(saved) : [
      { id: 'banner-1', title: 'Exclusive Summer Sale', subtitle: 'Flat 30% OFF on all women outfits', link: '/women', bgGradient: 'from-pink-500 to-rose-600', enabled: true },
      { id: 'banner-2', title: 'Monsoon Kickoff Special', subtitle: 'Get free shipping on orders above Rs. 2,000', link: '/offers', bgGradient: 'from-blue-600 to-sky-700', enabled: true }
    ];
  });

  const saveBannersConfig = (val: any) => {
    setBannersConfig(val);
    localStorage.setItem('lucky_banners_config', JSON.stringify(val));
  };

  const [featuredProductsIds, setFeaturedProductsIds] = useState<string[]>(['admin-p1', 'admin-p3', 'admin-p4']);
  const [trendingProductsIds, setTrendingProductsIds] = useState<string[]>(['admin-p2', 'admin-p5', 'admin-p6']);
  const [newArrivalsProductsIds, setNewArrivalsProductsIds] = useState<string[]>(['admin-p1', 'admin-p4', 'admin-p6']);

  const [offersConfig, setOffersConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_offers_config');
    return saved ? JSON.parse(saved) : {
      bannerText: 'Special Weekend Discount! Buy any 2 get 15% OFF.',
      couponCode: 'LUCKY15',
      discountPercentage: 15,
      endsInHours: 36,
      enabled: true
    };
  });

  const [brandsConfig, setBrandsConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_brands_config');
    return saved ? JSON.parse(saved) : [
      { id: 'b-1', name: 'Nike', logoText: 'NIKE', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' },
      { id: 'b-2', name: 'Adidas', logoText: 'ADIDAS', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=150' },
      { id: 'b-3', name: 'Skechers', logoText: 'SKECHERS', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=150' },
      { id: 'b-4', name: 'Puma', logoText: 'PUMA', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }
    ];
  });

  const [testimonialsConfig, setTestimonialsConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_testimonials_config');
    return saved ? JSON.parse(saved) : [
      { id: 't-1', name: 'Rohan Shrestha', role: 'Kathmandu Gold Member', feedback: 'Extremely good quality shoes. I ordered a Nike Monarch and it fits perfectly. Delivered in Bardibas within 2 days.', stars: 5 },
      { id: 't-2', name: 'Asif Khan', role: 'Janakpur Verified Buyer', feedback: 'The fabrics of the polo t-shirts are excellent. Deep color, does not fade after wash. Highly recommended!', stars: 5 }
    ];
  });

  const [videosConfig, setVideosConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_videos_config');
    return saved ? JSON.parse(saved) : {
      title: 'Take a virtual walk inside our store',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoPlaceholder: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=300'
    };
  });

  const [storeInfoConfig, setStoreInfoConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_store_info_config');
    return saved ? JSON.parse(saved) : {
      address: 'Bardibas-1, Mahottari, Nepal (Opposite Area Police Station)',
      phone: '+977-9844000000, 044-550112',
      email: 'contact@luckyapparel.com',
      hours: 'Sunday – Friday: 9:00 AM – 8:00 PM (Saturday Closed)',
      mapEmbeddedUrl: 'https://maps.google.com/maps?q=Bardibas,%20Nepal&t=&z=13&ie=UTF8&iwloc=&output=embed'
    };
  });

  const [footerConfig, setFooterConfig] = useState(() => {
    const saved = localStorage.getItem('lucky_footer_config');
    return saved ? JSON.parse(saved) : {
      copyrightText: '© 2026 Lucky Readymade & Shoe Center. All rights reserved.',
      aboutText: 'The leading provider of quality shoes, readymade garments, and customized tailoring accessories in Bardibas, Nepal.',
      facebookUrl: 'https://facebook.com/luckybardibas',
      instagramUrl: 'https://instagram.com/luckybardibas',
      whatsappNumber: '+977-9844000000'
    };
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewSlideIdx, setPreviewSlideIdx] = useState(0);

  // Sales by Category data matching donut
  const categoriesData = [
    { name: 'Men', percentage: 30, amount: 'Rs. 73,734', color: '#1e73e8' },
    { name: 'Women', percentage: 25, amount: 'Rs. 61,445', color: '#ec4899' },
    { name: 'Shoes', percentage: 20, amount: 'Rs. 14b8a6', color: '#0d9488' },
    { name: 'Accessories', percentage: 15, amount: 'Rs. 36,867', color: '#f97316' },
    { name: 'Kids', percentage: 10, amount: 'Rs. 24,578', color: '#8b5cf6' }
  ];

  // Sidebar list matching image
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, isDropdown: false },
    { 
      id: 'home-management', 
      label: 'Home Management', 
      icon: ImageIcon, 
      subitems: [
        { id: 'home-hero-slider', label: 'Hero Slider' },
        { id: 'home-categories', label: 'Categories' },
        { id: 'home-banners', label: 'Banners' },
        { id: 'home-featured-products', label: 'Featured Products' },
        { id: 'home-trending-products', label: 'Trending Products' },
        { id: 'home-new-arrivals', label: 'New Arrivals' },
        { id: 'home-offers-section', label: 'Offers Section' },
        { id: 'home-brand-slider', label: 'Brand Slider' },
        { id: 'home-testimonials', label: 'Testimonials' },
        { id: 'home-promotional-videos', label: 'Promotional Videos' },
        { id: 'home-store-information', label: 'Store Information' },
        { id: 'home-footer', label: 'Footer' }
      ]
    },
    { 
      id: 'products', 
      label: 'Products', 
      icon: Package, 
      subitems: [
        { id: 'products-all', label: 'All Products' },
        { id: 'products-add', label: 'Add New Product' },
        { id: 'categories-all', label: 'Categories' },
        { id: 'products-brands', label: 'Brands' },
        { id: 'products-attributes', label: 'Attributes' },
        { id: 'products-variants', label: 'Variants' },
        { id: 'products-bulk-import', label: 'Bulk Import' },
        { id: 'products-reviews', label: 'Reviews' }
      ]
    },
    { 
      id: 'categories', 
      label: 'Categories', 
      icon: Layers, 
      subitems: [
        { id: 'categories-all', label: 'All Categories' },
        { id: 'categories-add', label: 'Add New Category' }
      ]
    },
    { 
      id: 'brands', 
      label: 'Brands', 
      icon: Tag, 
      subitems: [
        { id: 'products-brands', label: 'All Brands' },
        { id: 'brands-add', label: 'Add New Brand' },
        { id: 'brands-categories', label: 'Brand Categories' }
      ]
    },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, isDropdown: false },
    { id: 'customers', label: 'Customers', icon: Users, isDropdown: false },
    { id: 'inventory', label: 'Inventory', icon: Package, isDropdown: false },
    { id: 'coupons', label: 'Coupons & Offers', icon: Percent, isDropdown: false },
    { 
      id: 'pages', 
      label: 'Pages', 
      icon: ImageIcon, 
      subitems: [
        { id: 'pages-list', label: 'Dynamic Pages' },
        { id: 'pages-add', label: 'Add New Page' },
        { id: 'banners', label: 'Banners' },
        { id: 'popup-manager', label: 'Popup Manager' }
      ] 
    },
    { id: 'blog', label: 'Blog', icon: Mail, isDropdown: false },
    { id: 'marketing', label: 'Marketing', icon: Mail, isDropdown: false },
    { id: 'media-library', label: 'Media Library', icon: ImageIcon, isDropdown: false },
    { id: 'appearance', label: 'Appearance', icon: Settings, isDropdown: false },
    { id: 'user-management', label: 'Users & Roles', icon: Users, isDropdown: false },
    { id: 'reports', label: 'Reports', icon: Settings, isDropdown: false },
    { id: 'system-settings', label: 'System Settings', icon: Settings, isDropdown: false },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      subitems: [
        { id: 'billing-overview', label: 'Overview' },
        { id: 'billing-plans', label: 'Plans' },
        { id: 'billing-invoices', label: 'Invoices' },
        { id: 'billing-methods', label: 'Payment Methods' },
        { id: 'billing-transactions', label: 'Transactions' },
        { id: 'billing-settings', label: 'Billing Settings' }
      ]
    }
  ];

  const handleQuickAction = (action: string) => {
    if (action === 'add-product') {
      setEditingLocalProduct(null);
      setLocalProductForm({
        name: '',
        sku: '',
        price: '',
        originalPrice: '',
        category: 'Men Shoes',
        brand: 'Nike',
        sizes: '40, 41, 42, 43',
        image: '',
        description: '',
        inStock: true,
        status: 'Published',
        featured: false
      });
      setActiveTab('products-add');
    } else if (action === 'add-category') {
      setActiveTab('categories-add');
    } else if (action === 'upload-banner') {
      setEditingBanner(null);
      setBannerForm({
        title: '',
        type: 'Hero Banner',
        image: '',
        link: '',
        status: 'Active',
        sortOrder: adminBanners.length + 1
      });
      setActiveTab('banners');
      setIsBannerModalOpen(true);
    } else if (action === 'add-brand') {
      setEditingBrand(null);
      setBrandForm({
        name: '',
        slug: '',
        logo: '',
        banner: '',
        category: 'Shoes',
        websiteUrl: '',
        shortDescription: '',
        description: '',
        status: 'Active',
        featured: false,
        sortOrder: adminBrands.length + 1,
        productsCount: 0
      });
      setActiveTab('brands-add');
    } else if (action === 'create-offer') {
      setEditingCoupon(null);
      setCouponForm({
        code: '',
        type: 'Percentage',
        discount: 10,
        minPurchase: 1000,
        maxDiscount: 500,
        expiryDate: '2026-12-31',
        status: 'Active'
      });
      setActiveTab('coupons');
      setIsCouponModalOpen(true);
    } else if (action === 'view-orders') {
      setActiveTab('orders');
    } else if (action === 'add-page') {
      setEditingPage(null);
      setPageForm({
        title: '',
        slug: '',
        template: 'Standard',
        content: '',
        status: 'Published',
        author: 'Administrator',
        date: new Date().toISOString().split('T')[0]
      });
      setActiveTab('pages-add');
    } else if (action === 'send-newsletter') {
      setEditingMarketing(null);
      setMarketingForm({
        title: '',
        description: '',
        audience: 'All Subscribers',
        trigger: 'Manual Broadcast',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '2026-12-31',
        status: 'Active'
      });
      setActiveTab('marketing');
      setIsMarketingModalOpen(true);
    } else if (action === 'site-settings') {
      setActiveTab('website-settings');
    } else {
      triggerLocalToast(`Quick Action "${action}" triggered. Form fields and workflows are fully operational!`, 'success');
    }
  };

  // Computed values for category list pagination and filtering
  const filteredCategories = adminCategories.filter(cat => 
    cat.name.toLowerCase().includes(categoriesSearch.toLowerCase()) ||
    cat.slug.toLowerCase().includes(categoriesSearch.toLowerCase()) ||
    cat.parentCategory.toLowerCase().includes(categoriesSearch.toLowerCase())
  );
  const totalCategoriesCount = filteredCategories.length;
  const totalPages = Math.ceil(totalCategoriesCount / categoriesItemsPerPage) || 1;
  const startIndex = (categoriesCurrentPage - 1) * categoriesItemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + categoriesItemsPerPage);

  return (
    <div className="bg-[#f4f7fc] min-h-screen text-slate-800 flex flex-col font-sans">
      
      {/* HEADER BAR (EXACT SAME AS IMAGE) */}
      <header className="bg-white border-b border-slate-100 h-16 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        
        {/* Left header segment: Logo / Brand (hidden if sidebar is open, but toggle remains) */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-600 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Search bar input matching exact visual styles */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2]" size={16} />
            <input 
              type="text" 
              placeholder="Search here..." 
              className="pl-10 pr-16 py-1.5 w-64 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-slate-200 text-[10px] text-slate-400 font-mono px-1.5 py-0.5 rounded shadow-2xs select-none">
              Ctrl /
            </span>
          </div>
        </div>

        {/* Right header actions segment */}
        <div className="flex items-center gap-5">
          
          {/* Back Arrow & Cross Buttons (Always visible on all pages, mobile & desktop) */}
          <div className="flex items-center gap-2">
            <button 
              onClick={onBackToStore}
              className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-2.5 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
              title="Back to Storefront"
            >
              <ArrowLeft size={13} className="text-slate-500" />
              <span className="hidden xs:inline">Back</span>
            </button>
            <button 
              onClick={onBackToStore}
              className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 px-2.5 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
              title="Exit Admin Panel"
            >
              <X size={13} className="text-rose-500" />
              <span className="hidden xs:inline">Close</span>
            </button>
          </div>

          {/* Bell Icon with red circular badge "12" */}
          <button className="relative p-1.5 hover:bg-slate-50 rounded-full text-slate-600 transition-all">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              12
            </span>
          </button>

          {/* Language selection */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-lg transition-all text-xs font-semibold text-slate-700">
            <span className="text-base select-none">🇬🇧</span>
            <span>English</span>
            <ChevronDown size={12} className="text-slate-400" />
          </div>

          <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* Administrator Profile segment */}
          <div className="flex items-center gap-2.5">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120" 
              alt="Super Admin" 
              className="w-9 h-9 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                <span>Super Admin</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Administrator</div>
            </div>

            {/* Logout trigger context */}
            <button 
              onClick={onLogout}
              className="p-1 hover:bg-rose-50 rounded-lg text-rose-500 hover:text-rose-600 transition-colors ml-1"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>

        </div>

      </header>

      {/* WRAPPER MAIN GRID CONTAINER */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COMPREHENSIVE SIDEBAR PANEL */}
        {isSidebarOpen && (
          <aside className="w-72 bg-[#091b3d] text-slate-300 flex flex-col shrink-0 overflow-y-auto border-r border-slate-800 scrollbar-thin select-none">
            
            {/* Sidebar header BRAND branding matching exact text */}
            <div className="p-5 border-b border-slate-800/60 flex flex-col items-start gap-1">
              <div className="flex items-center gap-3">
                {/* Visual Circle Logo Badge */}
                <div className="w-10 h-10 rounded-full border-2 border-white/90 bg-transparent flex items-center justify-center font-serif text-white text-lg font-black tracking-tighter">
                  LA
                </div>
                <div className="text-left">
                  <h2 className="text-sm font-black text-white tracking-wide uppercase leading-tight">LUCKY</h2>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">READYMADE & SHOE CENTER</p>
                </div>
              </div>
              <div className="text-[10px] text-slate-400/80 font-semibold tracking-wider uppercase mt-2.5 bg-white/5 px-2.5 py-1 rounded border border-white/5 w-full text-center">
                Admin Panel
              </div>
            </div>
 
            {/* Navigation item anchors matching exact listing */}
            <nav className="p-4 space-y-1 text-left flex-1">
              {sidebarItems.map((item) => {
                const IconComponent = item.icon;
                const isSelected = activeTab === item.id || 
                  (item.id === 'home-management' && activeTab.startsWith('home-')) ||
                  (item.id === 'products' && (activeTab === 'products' || activeTab.startsWith('products-') || activeTab.startsWith('categories-'))) ||
                  (item.id === 'categories' && activeTab.startsWith('categories-')) ||
                  (item.id === 'brands' && (activeTab === 'products-brands' || activeTab.startsWith('brands-'))) ||
                  (item.id === 'billing' && activeTab.startsWith('billing-')) ||
                  (item.id === 'pages' && (activeTab === 'banners' || activeTab === 'popup-manager' || activeTab === 'pages-list' || activeTab === 'pages-add'));
                
                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      onClick={() => {
                        if (item.id === 'home-management') {
                          setHomeManagementExpanded(!homeManagementExpanded);
                          if (!activeTab.startsWith('home-')) {
                            setActiveTab('home-hero-slider');
                          }
                        } else if (item.id === 'products') {
                          setProductsExpanded(!productsExpanded);
                          if (!activeTab.startsWith('products-')) {
                            setActiveTab('products-all');
                          }
                        } else if (item.id === 'categories') {
                          setCategoriesExpanded(!categoriesExpanded);
                          if (!activeTab.startsWith('categories-')) {
                            setActiveTab('categories-all');
                          }
                        } else if (item.id === 'brands') {
                          setBrandsExpanded(!brandsExpanded);
                          if (activeTab !== 'products-brands') {
                            setActiveTab('products-brands');
                          }
                        } else if (item.id === 'billing') {
                          setBillingExpanded(!billingExpanded);
                          if (!activeTab.startsWith('billing-')) {
                            setActiveTab('billing-overview');
                          }
                        } else {
                          setActiveTab(item.id);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isSelected 
                          ? 'bg-[#1b5fc1] text-white font-bold' 
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <IconComponent size={15} className={isSelected ? 'text-white' : 'text-slate-500'} />
                        <span>{item.label}</span>
                      </div>
                      
                      {/* Dropdown chevron indicator */}
                      {item.isDropdown && (
                        <ChevronRight size={12} className="text-slate-500 stroke-[2]" />
                      )}
                      
                      {item.subitems && (
                        <ChevronDown size={12} className="text-slate-500 stroke-[2]" />
                      )}
                    </button>
 
                    {/* Expandable page managers sub-list */}
                    {item.subitems && (
                      (item.id === 'home-management' && homeManagementExpanded) ||
                      (item.id === 'products' && productsExpanded) ||
                      (item.id === 'categories' && categoriesExpanded) ||
                      (item.id === 'brands' && brandsExpanded) ||
                      (item.id === 'billing' && billingExpanded) ||
                      (item.id !== 'home-management' && item.id !== 'products' && item.id !== 'categories' && item.id !== 'brands' && item.id !== 'billing')
                    ) && (
                      <div className="pl-6 pr-1 py-1 space-y-1 border-l border-slate-800 ml-5 mt-1">
                        {item.subitems.map((sub) => {
                          const isSubSelected = activeTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setActiveTab(sub.id);
                                if (sub.id === 'products-add') {
                                  setEditingLocalProduct(null);
                                  setLocalProductForm({
                                    name: '',
                                    sku: '',
                                    price: '',
                                    originalPrice: '',
                                    category: 'Men Shoes',
                                    brand: 'Nike',
                                    sizes: '40, 41, 42, 43',
                                    image: '',
                                    description: '',
                                    inStock: true,
                                    status: 'Published',
                                    featured: false
                                  });
                                } else if (sub.id === 'brands-add') {
                                  setEditingBrand(null);
                                  setBrandForm({
                                    name: '',
                                    slug: '',
                                    logo: '',
                                    banner: '',
                                    category: 'Shoes',
                                    websiteUrl: '',
                                    shortDescription: '',
                                    description: '',
                                    status: 'Active',
                                    featured: false,
                                    sortOrder: adminBrands.length + 1,
                                    productsCount: 0
                                  });
                                  setIsAddBrandPanelOpen(true);
                                } else if (sub.id === 'pages-add') {
                                  setEditingPage(null);
                                  setPageForm({
                                    title: '',
                                    slug: '',
                                    template: 'Standard',
                                    content: '',
                                    status: 'Published',
                                    author: 'Administrator',
                                    date: new Date().toISOString().split('T')[0]
                                  });
                                }
                              }}
                              className={`w-full text-left py-1.5 px-3 rounded-lg text-[11px] font-semibold block transition-all ${
                                isSubSelected 
                                  ? 'bg-[#1b5fc1] text-white font-bold' 
                                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
 
          </aside>
        )}

        {/* MAIN INTERACTIVE DISPLAY PORT (SCROLLABLE) */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 select-none text-left">
          
          {/* Main Viewport Sticky Navigation Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">Admin Panel Control</span>
                <span className="text-xs font-extrabold text-slate-700 capitalize">Currently Editing: {activeTab.replace(/-/g, ' ')}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onBackToStore}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-black uppercase text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all shadow-3xs cursor-pointer active:scale-95"
                title="Back to Storefront"
              >
                <ArrowLeft size={14} className="text-slate-500" />
                <span>Back to Store</span>
              </button>
              <button 
                onClick={onBackToStore}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 text-xs font-black uppercase text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100 px-4 py-2.5 rounded-xl transition-all shadow-3xs cursor-pointer active:scale-95"
                title="Exit Admin Panel"
              >
                <X size={14} className="text-rose-500" />
                <span>Close Panel</span>
              </button>
            </div>
          </div>
          
          {/* TAB 1: DASHBOARD (EXACT SAME LAYOUT AS GIVEN IMAGE) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Main title block */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Welcome back, Super Admin! Here&apos;s what&apos;s happening with your store today.</p>
                </div>

                {/* Calendar picker component */}
                <div className="relative">
                  <button 
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className="flex items-center gap-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 px-4 py-2 rounded-lg shadow-2xs transition-all"
                  >
                    <Calendar size={14} className="text-slate-400" />
                    <span>{dateRange}</span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </button>

                  {showDateDropdown && (
                    <div className="absolute right-0 mt-1.5 w-52 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 z-50 text-xs text-slate-700 font-medium">
                      {['May 20 – May 26, 2025', 'Yesterday', 'Last 7 Days', 'This Month', 'Last Month'].map((range) => (
                        <button
                          key={range}
                          onClick={() => {
                            setDateRange(range);
                            setShowDateDropdown(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-slate-50 transition-colors"
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ROW OF 6 METRICS ENGINES */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                
                {/* CARD 1: Total Sales */}
                <div className="bg-[#edf4ff] border border-blue-100 rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs hover:scale-[1.01] text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Total Sales</span>
                    <div className="w-8 h-8 rounded-full bg-[#dce9ff] flex items-center justify-center text-blue-600">
                      <ShoppingBag size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-base md:text-lg font-black text-slate-900 block font-sans tracking-tight">Rs. 2,45,780</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1 leading-none">
                      <span>↑ 18.6%</span>
                      <span className="text-slate-400 font-semibold font-sans">from last week</span>
                    </span>
                  </div>
                </div>

                {/* CARD 2: Today's Orders */}
                <div className="bg-[#e6f9ed] border border-green-100 rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs hover:scale-[1.01] text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Today&apos;s Orders</span>
                    <div className="w-8 h-8 rounded-full bg-[#d1fae5] flex items-center justify-center text-green-600">
                      <ShoppingCart size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-base md:text-lg font-black text-slate-900 block tracking-tight">128</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1 leading-none">
                      <span>↑ 22.5%</span>
                      <span className="text-slate-400 font-semibold font-sans">from yesterday</span>
                    </span>
                  </div>
                </div>

                {/* CARD 3: Pending Orders */}
                <div className="bg-[#fff3eb] border border-orange-100 rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs hover:scale-[1.01] text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Pending Orders</span>
                    <div className="w-8 h-8 rounded-full bg-[#ffedd5] flex items-center justify-center text-orange-500">
                      <ShoppingBag size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-base md:text-lg font-black text-slate-900 block tracking-tight">36</span>
                    <span className="text-[10px] text-rose-500 font-bold flex items-center gap-1 mt-1 leading-none">
                      <span>↓ 8.2%</span>
                      <span className="text-slate-400 font-semibold font-sans">from yesterday</span>
                    </span>
                  </div>
                </div>

                {/* CARD 4: Completed Orders */}
                <div className="bg-[#f3edf8] border border-purple-100 rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs hover:scale-[1.01] text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Completed Orders</span>
                    <div className="w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center text-purple-600">
                      <CheckCircle2 size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-base md:text-lg font-black text-slate-900 block tracking-tight">1,248</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1 leading-none">
                      <span>↑ 16.3%</span>
                      <span className="text-slate-400 font-semibold font-sans">from last week</span>
                    </span>
                  </div>
                </div>

                {/* CARD 5: Customers */}
                <div className="bg-[#fbeff0] border border-rose-100 rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs hover:scale-[1.01] text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Customers</span>
                    <div className="w-8 h-8 rounded-full bg-[#ffe4e6] flex items-center justify-center text-rose-500">
                      <Users size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-base md:text-lg font-black text-slate-900 block tracking-tight">3,842</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1 leading-none">
                      <span>↑ 20.7%</span>
                      <span className="text-slate-400 font-semibold font-sans">from last week</span>
                    </span>
                  </div>
                </div>

                {/* CARD 6: Visitors */}
                <div className="bg-[#edf7f9] border border-cyan-100 rounded-xl p-4 flex flex-col justify-between shadow-2xs transition-all hover:shadow-xs hover:scale-[1.01] text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Visitors</span>
                    <div className="w-8 h-8 rounded-full bg-[#cffafe] flex items-center justify-center text-cyan-500">
                      <Eye size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-base md:text-lg font-black text-slate-900 block tracking-tight">12,540</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1 leading-none">
                      <span>↑ 15.8%</span>
                      <span className="text-slate-400 font-semibold font-sans">from last week</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* SECTION: GRAPH CHRONOLOGY + BEST SELLER TABLE + STOCK LEVELS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* SALES OVERVIEW SVG GRAPH (50% WIDTH / lg:col-span-6) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs lg:col-span-6 flex flex-col justify-between text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Sales Overview</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span className="text-[10px] text-slate-400 font-semibold">Sales (Rs.)</span>
                      </div>
                    </div>
                    <select className="bg-slate-50 border border-slate-200 rounded text-[11px] font-bold text-slate-600 px-2 py-1 focus:outline-none">
                      <option>This Week</option>
                      <option>This Month</option>
                      <option>This Year</option>
                    </select>
                  </div>

                  {/* Bezier dynamic curve rendering */}
                  <div className="h-56 relative mt-2">
                    <svg className="w-full h-full text-blue-100 overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#1e63e6" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#1e63e6" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal background lines */}
                      {[0, 1, 2, 3, 4].map((i) => (
                        <line 
                          key={i} 
                          x1="0" 
                          y1={10 + i * 45} 
                          x2="700" 
                          y2={10 + i * 45} 
                          stroke="#f1f5f9" 
                          strokeWidth="1.5" 
                        />
                      ))}

                      {/* Smooth cubic bezier area path */}
                      <path 
                        d="M 50,180 C 110,120 160,80 200,60 C 240,40 280,140 320,110 C 360,80 400,20 460,40 C 520,60 580,160 620,140 C 660,120 680,60 700,50 L 700,200 L 50,200 Z" 
                        fill="url(#curveGrad)" 
                      />

                      {/* Path stroke line */}
                      <path 
                        d="M 50,180 C 110,120 160,80 200,60 C 240,40 280,140 320,110 C 360,80 400,20 460,40 C 520,60 580,160 620,140 C 660,120 680,60 700,50" 
                        fill="none" 
                        stroke="#1e63e6" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                      />

                      {/* Dynamic interactive cursor pointer highlights */}
                      {[
                        { cx: 50, cy: 180, i: 0 },
                        { cx: 200, cy: 60, i: 1 },
                        { cx: 320, cy: 110, i: 2 },
                        { cx: 460, cy: 40, i: 3 },
                        { cx: 620, cy: 140, i: 4 },
                        { cx: 700, cy: 50, i: 5 },
                      ].map((dot) => (
                        <g 
                          key={dot.i}
                          onMouseEnter={() => setHoveredChartIndex(dot.i)}
                          onMouseLeave={() => setHoveredChartIndex(null)}
                          className="cursor-pointer"
                        >
                          <circle 
                            cx={dot.cx} 
                            cy={dot.cy} 
                            r={hoveredChartIndex === dot.i ? "8" : "5"} 
                            className="fill-blue-600 stroke-white stroke-[2.5] transition-all" 
                          />
                        </g>
                      ))}
                    </svg>

                    {/* Chart Tooltip popup overlay */}
                    {hoveredChartIndex !== null && (
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white rounded px-3 py-1.5 shadow text-[10px] font-black z-30 flex items-center gap-1.5 animate-fade-in">
                        <Sparkles size={11} className="text-yellow-400" />
                        <span>{salesOverviewData[hoveredChartIndex].label}:</span>
                        <span className="text-sky-300 font-mono font-bold">{salesOverviewData[hoveredChartIndex].display}</span>
                      </div>
                    )}

                    {/* Custom Days labels row */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-between text-[10px] text-slate-400 font-bold px-4 font-sans pt-1 border-t border-slate-100">
                      {salesOverviewData.map((d) => (
                        <span key={d.label}>{d.label}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BEST SELLING PRODUCTS (25% WIDTH / lg:col-span-3) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs lg:col-span-3 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Best Selling Products</h3>
                  </div>

                  <div className="space-y-3.5">
                    {bestSellers.map((prod) => (
                      <div key={prod.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-400 w-3">{prod.id}</span>
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-left">
                            <span className="font-bold text-slate-800 line-clamp-1 leading-tight">{prod.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{prod.category}</span>
                            <span className="text-[10px] text-slate-900 font-bold block mt-0.5">{prod.price}</span>
                          </div>
                        </div>

                        <span className="bg-blue-50 text-blue-600 font-black text-[10px] px-2.5 py-1 rounded-md shrink-0">
                          {prod.sold} Sold
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* STOCK ALERTS (25% WIDTH / lg:col-span-3) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs lg:col-span-3 text-left">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Stock Alerts</h3>
                    <button onClick={() => setActiveTab('inventory')} className="text-xs font-bold text-blue-600 hover:underline">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3.5">
                    {stockAlerts.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-left">
                            <span className="font-bold text-slate-800 line-clamp-1 leading-tight">{item.name}</span>
                            <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">{item.category}</span>
                          </div>
                        </div>

                        <span className="text-red-500 font-black text-[11px] shrink-0">
                          Stock: {item.stock}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* LOWER ROW: RECENT ORDERS + CATEGORY DONUT + QUICK ACTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* RECENT ORDERS TABLE (35% WIDTH) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs lg:col-span-4 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Orders</h3>
                      <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-blue-600 hover:underline">
                        View All
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100">
                      {recentOrders.map((ord) => (
                        <div key={ord.id} className="py-2.5 flex items-center justify-between gap-3 text-xs font-semibold">
                          <div>
                            <span className="font-black text-blue-600 block">{ord.id}</span>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{ord.customer}</span>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-bold text-slate-900 block">{ord.amount}</span>
                            <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded mt-1 ${
                              ord.status === 'Pending' ? 'bg-amber-50 text-amber-600' :
                              ord.status === 'Processing' ? 'bg-sky-50 text-sky-600' :
                              ord.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                              ord.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                              'bg-rose-50 text-rose-600'
                            }`}>
                              {ord.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SALES BY CATEGORY DONUT GRAPH (30% WIDTH) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs lg:col-span-4 text-left flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Sales by Category</h3>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-2">
                    
                    {/* Donut SVG Arcs rendering */}
                    <div className="w-32 h-32 relative shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4" />
                        
                        {/* Men: 30% */}
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1e73e8" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="100" />
                        {/* Women: 25% */}
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#ec4899" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="70" />
                        {/* Shoes: 20% */}
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#0d9488" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="45" />
                        {/* Accessories: 15% */}
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f97316" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="25" />
                        {/* Kids: 10% */}
                        <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="10" />
                      </svg>

                      {/* Donut central hollow badge */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">Total</span>
                        <span className="text-xs font-black text-slate-800 block mt-1 leading-none">100%</span>
                      </div>
                    </div>

                    {/* Donut legends matching image stats */}
                    <div className="space-y-1.5 flex-1 text-xs">
                      {[
                        { name: 'Men', percentage: '30%', val: 'Rs. 73,734', color: 'bg-blue-600' },
                        { name: 'Women', percentage: '25%', val: 'Rs. 61,445', color: 'bg-pink-500' },
                        { name: 'Shoes', percentage: '20%', val: 'Rs. 49,156', color: 'bg-teal-600' },
                        { name: 'Accessories', percentage: '15%', val: 'Rs. 36,867', color: 'bg-orange-500' },
                        { name: 'Kids', percentage: '10%', val: 'Rs. 24,578', color: 'bg-purple-500' },
                      ].map((lg) => (
                        <div 
                          key={lg.name} 
                          onMouseEnter={() => setHoveredCategory(lg.name)}
                          onMouseLeave={() => setHoveredCategory(null)}
                          className={`flex items-center justify-between p-1 rounded transition-colors ${
                            hoveredCategory === lg.name ? 'bg-slate-50' : ''
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${lg.color}`} />
                            <span className="font-bold text-slate-700">{lg.name}</span>
                          </div>
                          <div className="text-right font-mono font-bold text-slate-400 text-[10px]">
                            <span className="text-slate-800 font-sans mr-1">{lg.percentage}</span>
                            <span>({lg.val})</span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* QUICK ACTIONS BUTTONS (35% WIDTH) */}
                <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs lg:col-span-4 text-left flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Quick Actions</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3.5 mt-2">
                    {[
                      { id: 'add-product', label: 'Add Product', icon: Plus },
                      { id: 'add-category', label: 'Add Category', icon: FolderPlus },
                      { id: 'upload-banner', label: 'Upload Banner', icon: ImageIcon },
                      { id: 'add-brand', label: 'Add Brand', icon: Tag },
                      { id: 'create-offer', label: 'Create Offer', icon: Percent },
                      { id: 'view-orders', label: 'View Orders', icon: ShoppingCart },
                      { id: 'add-page', label: 'Add Page', icon: ImageIcon },
                      { id: 'send-newsletter', label: 'Send Newsletter', icon: Mail },
                      { id: 'site-settings', label: 'Site Settings', icon: Settings }
                    ].map((btn) => {
                      const BtnIcon = btn.icon;
                      return (
                        <button
                          key={btn.id}
                          onClick={() => handleQuickAction(btn.id)}
                          className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-150 hover:bg-blue-50/20 hover:border-blue-400 hover:shadow-xs transition-all active:scale-[0.97]"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <BtnIcon size={14} className="stroke-[2.5]" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-700 text-center mt-2 leading-tight">
                            {btn.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* BOTTOM HORIZONTAL METRICS BLOCK */}
              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs divide-y lg:divide-y-0 lg:divide-x divide-slate-100 grid grid-cols-2 lg:grid-cols-6 gap-y-4 lg:gap-y-0">
                
                <div className="text-left px-3 py-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Package size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Total Products</span>
                    <span className="text-sm font-black text-slate-800 leading-none">1,256</span>
                    <button onClick={() => setActiveTab('inventory')} className="text-[9px] text-blue-600 font-bold hover:underline block mt-1">View all products</button>
                  </div>
                </div>

                <div className="text-left px-3 py-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                    <FolderPlus size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Total Categories</span>
                    <span className="text-sm font-black text-slate-800 leading-none">24</span>
                    <button className="text-[9px] text-blue-600 font-bold hover:underline block mt-1">View all categories</button>
                  </div>
                </div>

                <div className="text-left px-3 py-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Tag size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Total Brands</span>
                    <span className="text-sm font-black text-slate-800 leading-none">42</span>
                    <button className="text-[9px] text-blue-600 font-bold hover:underline block mt-1">View all brands</button>
                  </div>
                </div>

                <div className="text-left px-3 py-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Users size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Total Customers</span>
                    <span className="text-sm font-black text-slate-800 leading-none">3,842</span>
                    <button onClick={() => setActiveTab('customers')} className="text-[9px] text-blue-600 font-bold hover:underline block mt-1">View all customers</button>
                  </div>
                </div>

                <div className="text-left px-3 py-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
                    <Star size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Total Reviews</span>
                    <span className="text-sm font-black text-slate-800 leading-none">1,256</span>
                    <button className="text-[9px] text-blue-600 font-bold hover:underline block mt-1">View all reviews</button>
                  </div>
                </div>

                <div className="text-left px-3 py-1 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <Mail size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Newsletter Subscribers</span>
                    <span className="text-sm font-black text-slate-800 leading-none">2,145</span>
                    <button className="text-[9px] text-blue-600 font-bold hover:underline block mt-1">View subscribers</button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* DYNAMIC BACKUP TAB 2: INVENTORY LIST TABLE */}
          {activeTab === 'inventory' && (
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-6 animate-fade-in text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    Inventory Catalog ({localProductsList.length} Items)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Manage store products, update pricing, or edit descriptions.</p>
                </div>

                <button
                  id="btn-add-product-main"
                  onClick={() => {
                    setEditingLocalProduct(null);
                    setLocalProductForm({
                      name: '',
                      sku: '',
                      price: '',
                      originalPrice: '',
                      category: 'Men Shoes',
                      brand: 'Nike',
                      sizes: '40, 41, 42, 43',
                      image: '',
                      description: '',
                      inStock: true,
                      status: 'Published',
                      featured: false
                    });
                    setActiveTab('products-add');
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-black tracking-widest uppercase py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all active:translate-y-0 active:scale-[0.98] cursor-pointer"
                >
                  <Plus size={14} className="stroke-[3] animate-pulse" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-150 rounded-xl">
                <table className="w-full text-xs text-left text-slate-600 min-w-[600px]">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-150">
                    <tr>
                      <th className="px-5 py-3">Photo & Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Brand</th>
                      <th className="px-4 py-3">Price (Rs.)</th>
                      <th className="px-4 py-3">Stock status</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {localProductsList.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3.5 flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-md object-cover border border-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-black text-slate-800 line-clamp-1">{p.name}</span>
                            <span className="text-[10px] text-slate-400 font-bold block mt-0.5 font-mono">{p.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 uppercase text-[10px] font-black text-slate-500">
                          {p.category}
                        </td>
                        <td className="px-4 py-3.5 text-slate-700">{p.brand}</td>
                        <td className="px-4 py-3.5 font-mono font-bold text-slate-800">
                          Rs. {p.price.toLocaleString()}
                          {p.originalPrice > p.price && (
                            <span className="text-[10px] text-slate-400 line-through font-bold block">
                              Rs. {p.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3.5">
                          {p.inStock ? (
                            <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase px-2 py-0.5 rounded">In Stock</span>
                          ) : (
                            <span className="bg-rose-50 text-rose-700 text-[9px] font-black uppercase px-2 py-0.5 rounded">Sold Out</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                const matchedCategory = localProductCategories.find(c => c.toLowerCase().startsWith(p.category.toLowerCase())) || localProductCategories[0] || 'Men Shoes';
                                const matchedBrand = localProductBrands.find(b => b.toLowerCase().startsWith(p.brand.toLowerCase())) || localProductBrands[0] || 'Nike';
                                setEditingLocalProduct(p);
                                setLocalProductForm({
                                  name: p.name,
                                  sku: p.id,
                                  price: p.price.toString(),
                                  originalPrice: (p.originalPrice || p.price).toString(),
                                  category: matchedCategory,
                                  brand: matchedBrand,
                                  sizes: p.sizes ? (Array.isArray(p.sizes) ? p.sizes.join(', ') : p.sizes) : 'S, M, L, XL',
                                  image: p.image,
                                  description: p.description || '',
                                  inStock: p.inStock,
                                  status: 'Published',
                                  featured: p.tags ? p.tags.includes('featured') : false
                                });
                                setActiveTab('products-add');
                              }}
                              className="p-1.5 rounded-md text-sky-600 bg-sky-50 hover:bg-sky-500 hover:text-white transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit size={12} className="stroke-[2.5]" />
                            </button>
                            <button
                              onClick={() => {
                                const updated = localProductsList.filter(item => item.id !== p.id);
                                saveLocalProductsList(updated);
                                triggerLocalToast('Product deleted from inventory catalog!', 'success');
                              }}
                              className="p-1.5 rounded-md text-rose-600 bg-rose-50 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 size={12} className="stroke-[2.5]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (() => {
            const filteredOrders = localOrdersList.filter(o => {
              const matchesTab = activeOrderTab === 'All' || o.status === activeOrderTab;
              const matchesSearch = ordersSearchQuery === '' || 
                o.id.toLowerCase().includes(ordersSearchQuery.toLowerCase()) ||
                o.customerName.toLowerCase().includes(ordersSearchQuery.toLowerCase()) ||
                (o.email && o.email.toLowerCase().includes(ordersSearchQuery.toLowerCase())) ||
                (o.location && o.location.toLowerCase().includes(ordersSearchQuery.toLowerCase()));
              return matchesTab && matchesSearch;
            });

            const activeOrderObj = localOrdersList.find(o => o.id === selectedOrderId) || filteredOrders[0] || localOrdersList[0];

            // Initialize edit forms on demand
            const startEditingCustomer = () => {
              setCustomerEditForm({
                name: activeOrderObj.customerName,
                email: activeOrderObj.email || '',
                phone: activeOrderObj.phone || '',
                avatar: activeOrderObj.avatar || ''
              });
              setIsEditingCustomerDetails(true);
            };

            const startEditingShipping = () => {
              setShippingEditForm({
                name: activeOrderObj.shippingAddress?.name || activeOrderObj.customerName,
                address: activeOrderObj.shippingAddress?.address || '',
                city: activeOrderObj.shippingAddress?.city || 'Kathmandu',
                country: activeOrderObj.shippingAddress?.country || 'Nepal',
                zip: activeOrderObj.shippingAddress?.zip || ''
              });
              setIsEditingShippingDetails(true);
            };

            const startEditingItems = () => {
              setItemsEditForm([...(activeOrderObj.detailedItems || [])]);
              setIsEditingOrderItems(true);
              setFinancialsEditForm({
                shippingCharge: activeOrderObj.shippingCharge || 200,
                discount: activeOrderObj.discount || 0
              });
            };

            const handleUpdateOrder = () => {
              const updated = localOrdersList.map(o => {
                if (o.id === activeOrderObj.id) {
                  const itemsList = isEditingOrderItems ? itemsEditForm : (o.detailedItems || []);
                  const shippingVal = isEditingOrderItems ? financialsEditForm.shippingCharge : (o.shippingCharge || 200);
                  const discountVal = isEditingOrderItems ? financialsEditForm.discount : (o.discount || 0);
                  const subtotal = itemsList.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
                  const amount = subtotal + shippingVal - discountVal;

                  return {
                    ...o,
                    customerName: isEditingCustomerDetails ? customerEditForm.name : o.customerName,
                    email: isEditingCustomerDetails ? customerEditForm.email : o.email,
                    phone: isEditingCustomerDetails ? customerEditForm.phone : o.phone,
                    avatar: isEditingCustomerDetails ? customerEditForm.avatar : o.avatar,
                    shippingAddress: isEditingShippingDetails ? { ...shippingEditForm } : (o.shippingAddress || {
                      name: o.customerName,
                      address: o.location,
                      city: 'Kathmandu',
                      country: 'Nepal',
                      zip: '44600'
                    }),
                    location: isEditingShippingDetails ? `${shippingEditForm.address}, ${shippingEditForm.city}, ${shippingEditForm.country}` : o.location,
                    detailedItems: itemsList,
                    subtotal,
                    amount,
                    shippingCharge: shippingVal,
                    discount: discountVal,
                    items: itemsList.map((i: any) => `${i.name} x ${i.quantity}`).join(', ')
                  };
                }
                return o;
              });

              saveLocalOrdersList(updated);
              setIsEditingCustomerDetails(false);
              setIsEditingShippingDetails(false);
              setIsEditingOrderItems(false);
              triggerLocalToast('Order details updated and synced successfully!', 'success');
            };

            const handlePrintInvoice = (order: any) => {
              const printWindow = window.open('', '_blank');
              if (!printWindow) return;
              printWindow.document.write(`
                <html>
                  <head>
                    <title>Invoice - ${order.id}</title>
                    <style>
                      body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
                      .header { display: flex; justify-content: space-between; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; }
                      .title { font-size: 24px; font-weight: 800; color: #1e63e6; }
                      .meta { text-align: right; font-size: 12px; line-height: 1.6; }
                      .details { display: flex; justify-content: space-between; margin-top: 30px; }
                      .details-block { width: 48%; font-size: 12px; line-height: 1.6; }
                      .details-title { font-weight: 800; text-transform: uppercase; font-size: 10px; color: #64748b; margin-bottom: 8px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
                      table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 12px; }
                      th { background: #f8fafc; font-weight: 800; color: #475569; text-align: left; padding: 10px; border-bottom: 2px solid #e2e8f0; }
                      td { padding: 12px 10px; border-bottom: 1px solid #f1f5f9; }
                      .totals { text-align: right; margin-top: 30px; font-size: 12px; line-height: 1.8; }
                      .grand-total { font-size: 16px; font-weight: 800; color: #1e63e6; margin-top: 10px; border-top: 1px solid #e2e8f0; padding-top: 10px; }
                    </style>
                  </head>
                  <body>
                    <div class="header">
                      <div>
                        <div class="title">LUCKY APP APPAREL</div>
                        <div style="font-size: 11px; color: #64748b; margin-top: 4px;">Lucky Readymade & Shoe Center</div>
                      </div>
                      <div class="meta">
                        <strong>Invoice ID:</strong> #${order.id}<br/>
                        <strong>Date:</strong> ${order.date} at ${order.time}<br/>
                        <strong>Method:</strong> ${order.paymentMethod}<br/>
                        <strong>Source:</strong> ${order.source}
                      </div>
                    </div>
                    <div class="details">
                      <div class="details-block">
                        <div class="details-title">Customer Details</div>
                        <strong>Name:</strong> ${order.customerName}<br/>
                        <strong>Email:</strong> ${order.email || 'N/A'}<br/>
                        <strong>Phone:</strong> ${order.phone || 'N/A'}
                      </div>
                      <div class="details-block">
                        <div class="details-title">Shipping Address</div>
                        <strong>Name:</strong> ${order.shippingAddress?.name || order.customerName}<br/>
                        <strong>Address:</strong> ${order.shippingAddress?.address || order.location}<br/>
                        <strong>Location:</strong> ${order.shippingAddress?.city || 'Bagmati'}, ${order.shippingAddress?.country || 'Nepal'}<br/>
                        <strong>ZIP Code:</strong> ${order.shippingAddress?.zip || 'N/A'}
                      </div>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Product Description</th>
                          <th>Size / Attributes</th>
                          <th>Unit Price</th>
                          <th style="text-align: center;">Qty</th>
                          <th style="text-align: right;">Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${(order.detailedItems || []).map((item: any) => `
                          <tr>
                            <td><strong>${item.name}</strong></td>
                            <td>${item.size}</td>
                            <td>Rs. ${item.price.toLocaleString()}</td>
                            <td style="text-align: center;">${item.quantity}</td>
                            <td style="text-align: right;">Rs. ${(item.price * item.quantity).toLocaleString()}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                    <div class="totals">
                      <div>Subtotal Amount: Rs. ${(order.subtotal || order.amount).toLocaleString()}</div>
                      <div>Shipping & Handling Charge: Rs. ${(order.shippingCharge || 200).toLocaleString()}</div>
                      <div>Discount Applied: - Rs. ${(order.discount || 0).toLocaleString()}</div>
                      <div class="grand-total">Invoice Grand Total: Rs. ${order.amount.toLocaleString()}</div>
                    </div>
                    <div style="margin-top: 50px; font-size: 10px; color: #94a3b8; text-align: center; border-top: 1px dashed #e2e8f0; padding-top: 15px;">
                      Thank you for shopping at Lucky Apparel! This is a system-generated document.
                    </div>
                  </body>
                </html>
              `);
              printWindow.document.close();
              printWindow.print();
            };

            // Calculate dynamic counts
            const totalOrdersBase = 2550 + localOrdersList.length;
            const pendingOrdersCount = 50 + localOrdersList.filter(o => o.status === 'Pending').length;
            const processingOrdersCount = 300 + localOrdersList.filter(o => o.status === 'Processing').length;
            const shippedOrdersCount = 1240 + localOrdersList.filter(o => o.status === 'Shipped').length;
            const deliveredOrdersCount = 2150 + localOrdersList.filter(o => o.status === 'Delivered').length;
            const cancelledOrdersCount = 40 + localOrdersList.filter(o => o.status === 'Cancelled').length;

            return (
              <div className="space-y-6 animate-fade-in text-left">
                {/* 1. HEADER SECTION */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Orders Register</h1>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                      <span>Dashboard</span>
                      <ChevronRight size={10} />
                      <span>Orders</span>
                      <ChevronRight size={10} />
                      <span className="text-blue-600 font-black">{activeOrderTab} Orders</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button 
                      onClick={() => {
                        const fileInput = document.createElement('input');
                        fileInput.type = 'file';
                        fileInput.accept = '.json';
                        fileInput.onchange = (e: any) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event: any) => {
                              try {
                                const list = JSON.parse(event.target.result);
                                if (Array.isArray(list)) {
                                  saveLocalOrdersList([...list, ...localOrdersList]);
                                  triggerLocalToast('Orders imported successfully!', 'success');
                                }
                              } catch {
                                triggerLocalToast('Invalid orders backup format!', 'error');
                              }
                            };
                            reader.readAsText(file);
                          }
                        };
                        fileInput.click();
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs tracking-tight shadow-2xs flex items-center gap-1.5 transition-all"
                    >
                      <Upload size={13} />
                      <span>Import Orders</span>
                    </button>
                    <button 
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(localOrdersList, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `lucky_orders_export_${Date.now()}.json`;
                        link.click();
                        triggerLocalToast('Orders database exported!', 'success');
                      }}
                      className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs tracking-tight shadow-2xs flex items-center gap-1.5 transition-all"
                    >
                      <Download size={13} />
                      <span>Export Database</span>
                    </button>
                    <button 
                      onClick={() => {
                        setNewOrderForm({
                          customerName: '',
                          email: '',
                          phone: '',
                          address: '',
                          city: 'Kathmandu',
                          country: 'Nepal',
                          zip: '44600',
                          paymentMethod: 'Khalti',
                          status: 'Pending',
                          paymentStatus: 'Pending',
                          shippingCharge: 200,
                          discount: 0,
                          notes: '',
                          items: []
                        });
                        setIsAddOrderModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <Plus size={14} className="stroke-[3]" />
                      <span>Add New Order</span>
                    </button>
                  </div>
                </div>

                {/* 2. TOP METRICS SECTION */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <ShoppingBag size={14} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl font-black text-slate-800">{totalOrdersBase.toLocaleString()}</div>
                      <span className="text-[9px] text-emerald-600 font-bold block mt-1">↑ 18.6% from last month</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending</span>
                      <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock size={14} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl font-black text-amber-600">{pendingOrdersCount.toLocaleString()}</div>
                      <span className="text-[9px] text-rose-500 font-bold block mt-1">↓ 8.4% from last month</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Processing</span>
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <FileText size={14} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl font-black text-indigo-600">{processingOrdersCount.toLocaleString()}</div>
                      <span className="text-[9px] text-emerald-600 font-bold block mt-1">↑ 12.7% from last month</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Shipped</span>
                      <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                        <Truck size={14} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl font-black text-sky-600">{shippedOrdersCount.toLocaleString()}</div>
                      <span className="text-[9px] text-emerald-600 font-bold block mt-1">↑ 20.1% from last month</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col justify-between shadow-2xs col-span-2 md:col-span-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delivered</span>
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <CheckCircle2 size={14} />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xl font-black text-emerald-600">{deliveredOrdersCount.toLocaleString()}</div>
                      <span className="text-[9px] text-emerald-600 font-bold block mt-1">↑ 15.3% from last month</span>
                    </div>
                  </div>
                </div>

                {/* 3. FILTERS BAR & HORIZONTAL TABS */}
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Search Field */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
                      <input 
                        type="text"
                        placeholder="Search orders, customers, or locations..."
                        value={ordersSearchQuery}
                        onChange={(e) => setOrdersSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 bg-slate-50/50"
                      />
                      {ordersSearchQuery && (
                        <button 
                          onClick={() => setOrdersSearchQuery('')}
                          className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 font-bold text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all">
                        <Filter size={12} />
                        <span>Filter</span>
                      </button>
                      <button className="px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all">
                        <Calendar size={12} />
                        <span>Date Range</span>
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Tabs list */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-100 pt-3">
                    {[
                      { name: 'All', count: totalOrdersBase },
                      { name: 'Pending', count: pendingOrdersCount },
                      { name: 'Processing', count: processingOrdersCount },
                      { name: 'Shipped', count: shippedOrdersCount },
                      { name: 'Delivered', count: deliveredOrdersCount },
                      { name: 'Cancelled', count: cancelledOrdersCount }
                    ].map(t => (
                      <button
                        key={t.name}
                        onClick={() => {
                          setActiveOrderTab(t.name);
                          // Select the first visible order in the selected tab
                          const match = localOrdersList.find(o => t.name === 'All' || o.status === t.name);
                          if (match) setSelectedOrderId(match.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-tight shrink-0 transition-all ${
                          activeOrderTab === t.name 
                            ? 'bg-blue-600 text-white shadow-xs' 
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {t.name} ({t.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. SPLIT GRID (ORDERS REGISTER LIST + ORDER DETAILS PANEL) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* LEFT COLUMN: ORDERS LIST TABLE */}
                  <div className={`${activeOrderObj ? 'lg:col-span-8' : 'lg:col-span-12'} bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden`}>
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                      <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">
                        Orders Queue ({filteredOrders.length} displayed)
                      </h3>
                      <span className="text-[10px] text-slate-400 font-bold">Click row to inspect details</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left text-slate-600 min-w-[700px]">
                        <thead className="bg-slate-50/70 text-[10px] font-black uppercase text-slate-500 border-b border-slate-150 select-none">
                          <tr>
                            <th className="px-5 py-3 w-10 text-center">
                              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            </th>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Customer Info</th>
                            <th className="px-4 py-3">Order Date</th>
                            <th className="px-4 py-3">Payment</th>
                            <th className="px-4 py-3">Total Cost</th>
                            <th className="px-4 py-3">Fulfillment</th>
                            <th className="px-4 py-3">Payment Status</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="px-6 py-12 text-center text-slate-400 font-medium">
                                No customer orders match your query.
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map((o) => {
                              const isSelected = activeOrderObj?.id === o.id;
                              return (
                                <tr 
                                  key={o.id} 
                                  onClick={() => {
                                    setSelectedOrderId(o.id);
                                    setIsEditingCustomerDetails(false);
                                    setIsEditingShippingDetails(false);
                                    setIsEditingOrderItems(false);
                                  }}
                                  className={`hover:bg-slate-50/40 cursor-pointer transition-all ${
                                    isSelected ? 'bg-blue-50/30 border-l-4 border-l-blue-600' : ''
                                  }`}
                                >
                                  <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                  </td>
                                  <td className="px-4 py-4 font-mono font-black text-slate-900">
                                    #{o.id}
                                    <span className="text-[8px] text-slate-400 block font-normal font-sans mt-0.5">{o.source}</span>
                                  </td>
                                  <td className="px-4 py-4">
                                    <div className="flex items-center gap-2">
                                      <img 
                                        src={o.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'} 
                                        alt={o.customerName}
                                        referrerPolicy="no-referrer"
                                        className="w-7 h-7 rounded-full object-cover border border-slate-100"
                                      />
                                      <div>
                                        <span className="font-bold text-slate-800 block text-xs leading-tight">{o.customerName}</span>
                                        <span className="text-[10px] text-slate-400 block font-normal">{o.email || o.phone || 'No email'}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 text-[11px] text-slate-500">
                                    <div>{o.date}</div>
                                    <div className="text-[10px] text-slate-400 font-normal mt-0.5">{o.time || '12:00 PM'}</div>
                                  </td>
                                  <td className="px-4 py-4 text-[11px] text-slate-600">
                                    <div className="flex items-center gap-1.5">
                                      <span className={`w-1.5 h-1.5 rounded-full ${
                                        o.paymentMethod === 'Khalti' ? 'bg-purple-500' :
                                        o.paymentMethod === 'eSewa' ? 'bg-emerald-500' :
                                        o.paymentMethod === 'Stripe' ? 'bg-blue-500' :
                                        'bg-slate-400'
                                      }`} />
                                      <span>{o.paymentMethod}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-4 font-mono font-black text-slate-900 text-xs">
                                    Rs. {o.amount.toLocaleString()}
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                      o.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                      o.status === 'Processing' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' :
                                      o.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border-sky-100' :
                                      o.status === 'Cancelled' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                      'bg-emerald-50 text-emerald-700 border-emerald-100'
                                    }`}>
                                      <span className="w-1 h-1 rounded-full bg-current" />
                                      {o.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-4">
                                    <span className={`inline-flex items-center text-[9px] font-bold px-2 py-0.5 rounded-md ${
                                      o.paymentStatus === 'Paid' ? 'bg-emerald-100/60 text-emerald-800' :
                                      o.paymentStatus === 'Pending' ? 'bg-amber-100/60 text-amber-800' :
                                      'bg-slate-100 text-slate-800'
                                    }`}>
                                      {o.paymentStatus}
                                    </span>
                                  </td>
                                  <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button 
                                        onClick={() => {
                                          setSelectedOrderId(o.id);
                                          startEditingCustomer();
                                        }}
                                        title="Edit Customer"
                                        className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md transition-all border border-slate-100"
                                      >
                                        <Edit size={11} />
                                      </button>
                                      <button 
                                        onClick={() => handlePrintInvoice(o)}
                                        title="Print Invoice"
                                        className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-md transition-all border border-slate-100"
                                      >
                                        <Printer size={11} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Are you sure you want to delete order #${o.id}?`)) {
                                            const updated = localOrdersList.filter(x => x.id !== o.id);
                                            saveLocalOrdersList(updated);
                                            triggerLocalToast(`Order #${o.id} deleted.`, 'success');
                                            if (selectedOrderId === o.id) setSelectedOrderId('');
                                          }
                                        }}
                                        title="Delete Order"
                                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-md transition-all border border-rose-100"
                                      >
                                        <Trash2 size={11} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* RIGHT COLUMN: DETAILED INTERACTIVE SIDEBAR */}
                  {activeOrderObj && (
                    <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden sticky top-6">
                      
                      {/* Section Title */}
                      <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Order Details</h4>
                          <span className="font-mono text-xs font-black text-slate-800">#{activeOrderObj.id}</span>
                        </div>
                        <button 
                          onClick={() => setSelectedOrderId('')}
                          className="w-6 h-6 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 border border-slate-200 shadow-2xs transition-all"
                        >
                          ✕
                        </button>
                      </div>

                      {/* Details Scrollable Container */}
                      <div className="p-5 space-y-5 text-xs max-h-[70vh] overflow-y-auto">
                        
                        {/* Status Selectors & Quick Info */}
                        <div className="p-3.5 bg-slate-50 rounded-xl space-y-3 border border-slate-150">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 font-bold text-[10px] uppercase">Fulfillment Status</span>
                            <span className="text-slate-400 font-bold text-[10px] uppercase">Payment Status</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={activeOrderObj.status}
                              onChange={(e) => {
                                const updated = localOrdersList.map(o => o.id === activeOrderObj.id ? { ...o, status: e.target.value } : o);
                                saveLocalOrdersList(updated);
                                triggerLocalToast(`Status updated to ${e.target.value}`, 'success');
                              }}
                              className="bg-white border border-slate-250 text-[11px] font-bold px-2 py-1.5 rounded-lg focus:outline-none cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <select
                              value={activeOrderObj.paymentStatus}
                              onChange={(e) => {
                                const updated = localOrdersList.map(o => o.id === activeOrderObj.id ? { ...o, paymentStatus: e.target.value } : o);
                                saveLocalOrdersList(updated);
                                triggerLocalToast(`Payment status updated to ${e.target.value}`, 'success');
                              }}
                              className="bg-white border border-slate-250 text-[11px] font-bold px-2 py-1.5 rounded-lg focus:outline-none cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Paid">Paid</option>
                              <option value="Refunded">Refunded</option>
                            </select>
                          </div>

                          <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between pt-1 border-t border-slate-200">
                            <span>Placed: {activeOrderObj.date} at {activeOrderObj.time || '10:30 AM'}</span>
                            <span className="text-blue-600 font-bold">{activeOrderObj.source}</span>
                          </div>
                        </div>

                        {/* Card 1: Customer Profile Details */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <User size={12} className="text-slate-400" />
                              <span>Customer Details</span>
                            </h5>
                            {!isEditingCustomerDetails ? (
                              <button 
                                onClick={startEditingCustomer}
                                className="text-blue-600 hover:text-blue-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Edit size={10} />
                                <span>Edit</span>
                              </button>
                            ) : (
                              <button 
                                onClick={handleUpdateOrder}
                                className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Check size={11} className="stroke-[3]" />
                                <span>Apply</span>
                              </button>
                            )}
                          </div>

                          {!isEditingCustomerDetails ? (
                            <div className="p-3 border border-slate-200 rounded-xl flex items-center gap-3">
                              <img 
                                src={activeOrderObj.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'} 
                                alt={activeOrderObj.customerName}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-full object-cover border border-slate-100"
                              />
                              <div>
                                <div className="font-bold text-slate-800 text-xs leading-none mb-1">{activeOrderObj.customerName}</div>
                                <div className="text-slate-500 font-medium text-[11px]">{activeOrderObj.email || 'No email provided'}</div>
                                <div className="text-slate-400 font-medium text-[10px] mt-0.5">{activeOrderObj.phone || 'No phone number'}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border border-blue-100 bg-blue-50/10 rounded-xl space-y-2">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Full Name</label>
                                <input 
                                  type="text"
                                  value={customerEditForm.name}
                                  onChange={(e) => setCustomerEditForm({ ...customerEditForm, name: e.target.value })}
                                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Email Address</label>
                                <input 
                                  type="email"
                                  value={customerEditForm.email}
                                  onChange={(e) => setCustomerEditForm({ ...customerEditForm, email: e.target.value })}
                                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Contact Phone</label>
                                <input 
                                  type="text"
                                  value={customerEditForm.phone}
                                  onChange={(e) => setCustomerEditForm({ ...customerEditForm, phone: e.target.value })}
                                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Upload Customer Photo</label>
                                <input 
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (base64) => setCustomerEditForm({ ...customerEditForm, avatar: base64 }))}
                                  className="w-full text-[10px] text-slate-500 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card 2: Shipping Destination Address */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <MapPin size={12} className="text-slate-400" />
                              <span>Shipping Destination</span>
                            </h5>
                            {!isEditingShippingDetails ? (
                              <button 
                                onClick={startEditingShipping}
                                className="text-blue-600 hover:text-blue-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Edit size={10} />
                                <span>Edit</span>
                              </button>
                            ) : (
                              <button 
                                onClick={handleUpdateOrder}
                                className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Check size={11} className="stroke-[3]" />
                                <span>Apply</span>
                              </button>
                            )}
                          </div>

                          {!isEditingShippingDetails ? (
                            <div className="p-3 border border-slate-200 rounded-xl space-y-1">
                              <div className="font-bold text-slate-800">{activeOrderObj.shippingAddress?.name || activeOrderObj.customerName}</div>
                              <div className="text-slate-600 font-medium">{activeOrderObj.shippingAddress?.address || activeOrderObj.location}</div>
                              <div className="text-slate-400 font-medium text-[10px]">
                                {activeOrderObj.shippingAddress?.city || 'Bagmati'}, {activeOrderObj.shippingAddress?.country || 'Nepal'} {activeOrderObj.shippingAddress?.zip ? `(ZIP: ${activeOrderObj.shippingAddress.zip})` : ''}
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 border border-blue-100 bg-blue-50/10 rounded-xl space-y-2">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Recipient Name</label>
                                <input 
                                  type="text"
                                  value={shippingEditForm.name}
                                  onChange={(e) => setShippingEditForm({ ...shippingEditForm, name: e.target.value })}
                                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Street Address</label>
                                <input 
                                  type="text"
                                  value={shippingEditForm.address}
                                  onChange={(e) => setShippingEditForm({ ...shippingEditForm, address: e.target.value })}
                                  className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[10px] text-slate-400 font-bold block mb-1">City / Region</label>
                                  <input 
                                    type="text"
                                    value={shippingEditForm.city}
                                    onChange={(e) => setShippingEditForm({ ...shippingEditForm, city: e.target.value })}
                                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] text-slate-400 font-bold block mb-1">ZIP Code</label>
                                  <input 
                                    type="text"
                                    value={shippingEditForm.zip}
                                    onChange={(e) => setShippingEditForm({ ...shippingEditForm, zip: e.target.value })}
                                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-xs font-semibold"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Card 3: Detailed Order Items */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-[11px] uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <Package size={12} className="text-slate-400" />
                              <span>Order Items ({(isEditingOrderItems ? itemsEditForm : (activeOrderObj.detailedItems || [])).length})</span>
                            </h5>
                            {!isEditingOrderItems ? (
                              <button 
                                onClick={startEditingItems}
                                className="text-blue-600 hover:text-blue-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Edit size={10} />
                                <span>Edit Items</span>
                              </button>
                            ) : (
                              <button 
                                onClick={handleUpdateOrder}
                                className="text-emerald-600 hover:text-emerald-700 font-bold text-[11px] flex items-center gap-1"
                              >
                                <Check size={11} className="stroke-[3]" />
                                <span>Apply</span>
                              </button>
                            )}
                          </div>

                          {!isEditingOrderItems ? (
                            <div className="space-y-2">
                              {(activeOrderObj.detailedItems || []).map((item: any, idx: number) => (
                                <div key={idx} className="p-2 border border-slate-150 rounded-xl flex items-center gap-3">
                                  <img 
                                    src={item.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150'} 
                                    alt={item.name}
                                    referrerPolicy="no-referrer"
                                    className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                                  />
                                  <div className="flex-1">
                                    <div className="font-bold text-slate-800 leading-tight truncate max-w-[150px]">{item.name}</div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">Attribs: {item.size || 'One Size'}</div>
                                    <div className="text-[10px] text-slate-500 font-bold mt-0.5">
                                      Rs. {item.price.toLocaleString()} x {item.quantity}
                                    </div>
                                  </div>
                                  <div className="text-right font-mono font-black text-slate-900">
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-3 p-3 border border-blue-100 bg-blue-50/10 rounded-xl">
                              <div className="max-h-56 overflow-y-auto space-y-2">
                                {itemsEditForm.map((item, idx) => (
                                  <div key={idx} className="p-2 bg-white border border-slate-200 rounded-lg space-y-2 relative">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = itemsEditForm.filter((_, i) => i !== idx);
                                        setItemsEditForm(updated);
                                      }}
                                      className="absolute right-1 top-1 text-rose-500 hover:text-rose-700 p-1"
                                    >
                                      ✕
                                    </button>
                                    <div className="flex items-center gap-2">
                                      <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />
                                      <input 
                                        type="text"
                                        value={item.name}
                                        onChange={(e) => {
                                          const updated = [...itemsEditForm];
                                          updated[idx].name = e.target.value;
                                          setItemsEditForm(updated);
                                        }}
                                        className="text-[10px] font-bold border border-slate-200 rounded px-1.5 py-0.5 flex-1"
                                      />
                                    </div>
                                    <div className="grid grid-cols-3 gap-1.5 text-[9px] font-bold">
                                      <div>
                                        <span className="text-slate-400">Size</span>
                                        <input 
                                          type="text"
                                          value={item.size}
                                          onChange={(e) => {
                                            const updated = [...itemsEditForm];
                                            updated[idx].size = e.target.value;
                                            setItemsEditForm(updated);
                                          }}
                                          className="w-full border border-slate-200 rounded p-1 text-[10px]"
                                        />
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Price (Rs.)</span>
                                        <input 
                                          type="number"
                                          value={item.price}
                                          onChange={(e) => {
                                            const updated = [...itemsEditForm];
                                            updated[idx].price = Number(e.target.value);
                                            setItemsEditForm(updated);
                                          }}
                                          className="w-full border border-slate-200 rounded p-1 text-[10px]"
                                        />
                                      </div>
                                      <div>
                                        <span className="text-slate-400">Qty</span>
                                        <input 
                                          type="number"
                                          value={item.quantity}
                                          onChange={(e) => {
                                            const updated = [...itemsEditForm];
                                            updated[idx].quantity = Number(e.target.value);
                                            setItemsEditForm(updated);
                                          }}
                                          className="w-full border border-slate-200 rounded p-1 text-[10px]"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Sub-form to Add Item from Shop Inventory */}
                              <div className="border-t border-slate-200/60 pt-2.5">
                                <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Add from Store Products</span>
                                <select
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      const p = productsList.find(x => x.id === e.target.value);
                                      if (p) {
                                        setItemsEditForm([
                                          ...itemsEditForm,
                                          { name: p.name, size: p.sizes?.[0] || 'M', price: p.price, quantity: 1, image: p.image }
                                        ]);
                                        triggerLocalToast(`${p.name} appended to order.`, 'success');
                                      }
                                      e.target.value = '';
                                    }
                                  }}
                                  className="w-full text-[11px] font-semibold bg-white border border-slate-200 rounded-lg p-1.5 focus:outline-none cursor-pointer"
                                >
                                  <option value="">-- Choose Store Item --</option>
                                  {productsList.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} (Rs. {p.price.toLocaleString()})</option>
                                  ))}
                                </select>
                              </div>

                              {/* Form to Add completely Custom Uploadable Item */}
                              <div className="border-t border-slate-200/60 pt-2.5 space-y-1">
                                <span className="text-[10px] font-black uppercase text-slate-400 block">Add custom image-uploadable item</span>
                                <input 
                                  type="text" 
                                  placeholder="Custom product name..."
                                  id="custom-order-item-name"
                                  className="w-full border border-slate-200 rounded-lg px-2 py-1 text-[11px] bg-white font-semibold"
                                />
                                <div className="grid grid-cols-2 gap-1.5">
                                  <input 
                                    type="number" 
                                    placeholder="Price..."
                                    id="custom-order-item-price"
                                    className="border border-slate-200 rounded-lg px-2 py-1 text-[11px] bg-white font-semibold"
                                  />
                                  <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                      handleFileUpload(e, (base64) => {
                                        const nameEl = document.getElementById('custom-order-item-name') as HTMLInputElement;
                                        const priceEl = document.getElementById('custom-order-item-price') as HTMLInputElement;
                                        if (nameEl && nameEl.value && priceEl && priceEl.value) {
                                          setItemsEditForm([
                                            ...itemsEditForm,
                                            {
                                              name: nameEl.value,
                                              size: 'Custom Size',
                                              price: Number(priceEl.value),
                                              quantity: 1,
                                              image: base64
                                            }
                                          ]);
                                          nameEl.value = '';
                                          priceEl.value = '';
                                          triggerLocalToast('Custom item added with photo!', 'success');
                                        } else {
                                          triggerLocalToast('Fill item Name & Price first!', 'error');
                                        }
                                      });
                                    }}
                                    className="text-[9px] text-slate-500 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-blue-50 file:text-blue-700 cursor-pointer"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Financial Subtotals & Discounts */}
                        <div className="space-y-2 border-t border-slate-100 pt-3">
                          <div className="flex items-center justify-between text-slate-500 font-semibold">
                            <span>Subtotal Amount:</span>
                            <span className="font-mono text-slate-800">
                              Rs. {((isEditingOrderItems ? itemsEditForm : (activeOrderObj.detailedItems || [])).reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0)).toLocaleString()}
                            </span>
                          </div>

                          {!isEditingOrderItems ? (
                            <>
                              <div className="flex items-center justify-between text-slate-500 font-semibold">
                                <span>Shipping Charge:</span>
                                <span className="font-mono text-slate-800">Rs. {(activeOrderObj.shippingCharge || 200).toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between text-slate-500 font-semibold text-rose-600">
                                <span>Discounts Applied:</span>
                                <span className="font-mono">- Rs. {(activeOrderObj.discount || 0).toLocaleString()}</span>
                              </div>
                            </>
                          ) : (
                            <div className="grid grid-cols-2 gap-2 pt-1">
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Shipping Fee (Rs.)</label>
                                <input 
                                  type="number"
                                  value={financialsEditForm.shippingCharge}
                                  onChange={(e) => setFinancialsEditForm({ ...financialsEditForm, shippingCharge: Number(e.target.value) })}
                                  className="w-full border border-slate-200 rounded-lg p-1.5 text-xs font-semibold bg-white"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 font-bold block mb-1">Coupon Discount (Rs.)</label>
                                <input 
                                  type="number"
                                  value={financialsEditForm.discount}
                                  onChange={(e) => setFinancialsEditForm({ ...financialsEditForm, discount: Number(e.target.value) })}
                                  className="w-full border border-slate-200 rounded-lg p-1.5 text-xs font-semibold bg-white"
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between text-[13px] font-black text-slate-900 border-t border-slate-100 pt-2 mt-1 bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/60">
                            <span className="text-emerald-800">Order Grand Total:</span>
                            <span className="font-mono text-emerald-700">
                              Rs. {(
                                ((isEditingOrderItems ? itemsEditForm : (activeOrderObj.detailedItems || [])).reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0))
                                + (isEditingOrderItems ? financialsEditForm.shippingCharge : (activeOrderObj.shippingCharge || 200))
                                - (isEditingOrderItems ? financialsEditForm.discount : (activeOrderObj.discount || 0))
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Customer Notes */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Memo Notes</label>
                          <textarea
                            value={activeOrderObj.notes || ''}
                            onChange={(e) => {
                              const updated = localOrdersList.map(o => o.id === activeOrderObj.id ? { ...o, notes: e.target.value } : o);
                              saveLocalOrdersList(updated);
                            }}
                            placeholder="Add internal notes or customer delivery instructions..."
                            className="w-full border border-slate-200 rounded-xl p-2.5 text-xs font-semibold bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 h-16 resize-none"
                          />
                        </div>

                        {/* General Actions row */}
                        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                          <button 
                            onClick={() => handlePrintInvoice(activeOrderObj)}
                            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-black tracking-wide py-2 rounded-xl text-[10px] uppercase transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                          >
                            <Printer size={12} />
                            <span>Print Invoice</span>
                          </button>
                          <button 
                            onClick={() => {
                              const blob = new Blob([JSON.stringify(activeOrderObj, null, 2)], { type: 'application/json' });
                              const url = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = url;
                              link.download = `lucky_invoice_${activeOrderObj.id}.json`;
                              link.click();
                              triggerLocalToast('Invoice descriptor exported!', 'success');
                            }}
                            className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 font-black tracking-wide py-2 rounded-xl text-[10px] uppercase transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                          >
                            <Download size={12} />
                            <span>Download PDF</span>
                          </button>
                        </div>

                        {(isEditingCustomerDetails || isEditingShippingDetails || isEditingOrderItems) && (
                          <button
                            onClick={handleUpdateOrder}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black tracking-wide py-2.5 rounded-xl text-[11px] uppercase transition-all flex items-center justify-center gap-1.5 shadow-md"
                          >
                            <Check size={14} className="stroke-[3]" />
                            <span>Save Order Changes</span>
                          </button>
                        )}

                      </div>
                    </div>
                  )}

                </div>

              </div>
            );
          })()}

          {/* DYNAMIC BACKUP TAB 4: REGISTERED STORE USERS LIST */}
          {activeTab === 'customers' && (
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-2xs space-y-6 animate-fade-in text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide">
                    Registered Store Customers ({adminCustomers.length} Verified Users)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">View member loyalty tiers, email logs, and complete order history metrics.</p>
                </div>
                <button 
                  onClick={() => {
                    setEditingCustomer(null);
                    setCustomerForm({
                      name: '',
                      email: '',
                      phone: '9845012345',
                      points: 0,
                      ordersCount: 0,
                      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                      status: 'Active',
                      avatar: ''
                    });
                    setIsCustomerModalOpen(true);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Plus size={14} />
                  <span>Add Customer</span>
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-150 rounded-xl">
                <table className="w-full text-xs text-left text-slate-600 min-w-[600px]">
                  <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-150">
                    <tr>
                      <th className="px-5 py-3">Member Details</th>
                      <th className="px-4 py-3">Email Address</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Loyalty Points Balance</th>
                      <th className="px-4 py-3">Loyalty Level Status</th>
                      <th className="px-4 py-3">Orders Tracked</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                    {adminCustomers.map((cust) => (
                      <tr key={cust.id} className="hover:bg-slate-50/50">
                        <td className="px-5 py-3.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 border border-slate-200 text-xs uppercase shrink-0 overflow-hidden">
                            {cust.avatar ? <img src={cust.avatar} alt="" className="w-full h-full object-cover" /> : cust.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-black text-slate-800 block">{cust.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono font-medium block">{cust.id}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-500">{cust.email}</td>
                        <td className="px-4 py-3.5 font-mono text-slate-500">{cust.phone || '—'}</td>
                        <td className="px-4 py-3.5 font-mono font-bold text-blue-600">{cust.points} Pts</td>
                        <td className="px-4 py-3.5">
                          {cust.points >= 300 ? (
                            <span className="bg-amber-100 text-amber-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">★ Platinum VIP</span>
                          ) : cust.points >= 150 ? (
                            <span className="bg-sky-100 text-sky-800 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">★ Gold Star</span>
                          ) : (
                            <span className="bg-slate-100 text-slate-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Basic Tier</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-mono font-bold text-slate-800 text-center">{cust.ordersCount}</td>
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-2 pr-4">
                            <button 
                              onClick={() => {
                                setEditingCustomer(cust);
                                setCustomerForm({
                                  name: cust.name,
                                  email: cust.email,
                                  phone: cust.phone || '',
                                  points: cust.points,
                                  ordersCount: cust.ordersCount,
                                  joinedDate: cust.joinedDate,
                                  status: cust.status || 'Active',
                                  avatar: cust.avatar || ''
                                });
                                setIsCustomerModalOpen(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 hover:underline text-[10px] font-black uppercase"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Delete Customer record for "${cust.name}"?`)) {
                                  const updated = adminCustomers.filter(c => c.id !== cust.id);
                                  saveAdminCustomers(updated);
                                  triggerLocalToast('Customer removed successfully!', 'success');
                                }
                              }}
                              className="text-rose-500 hover:text-rose-600 hover:underline text-[10px] font-black uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
 
          {/* ========================================= */}
          {/* HOME MANAGEMENT PAGE (EXACT SAME VISUAL) */}
          {/* ========================================= */}
          {activeTab.startsWith('home-') && (
            <div className="space-y-6 animate-fade-in text-left">
              
              {/* TOP HEADER SEGMENT */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ImageIcon className="text-blue-600" size={22} />
                    <span>Home Management</span>
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Manage and customize homepage sections. Add, edit, delete or reorder sections easily.
                  </p>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <button 
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-lg transition-all shadow-2xs cursor-pointer"
                  >
                    <Eye size={14} className="text-slate-500" />
                    <span>Preview Home Page</span>
                  </button>
                  <button 
                    onClick={() => {
                      triggerLocalToast('All homepage configuration changes successfully saved and live!', 'success');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-xs cursor-pointer"
                  >
                    <Check size={14} className="stroke-[3]" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              {/* HORIZONTAL SUB-NAVIGATION BAR (12 TABS MATCHING IMAGE) */}
              <div className="overflow-x-auto border-b border-slate-200 scrollbar-thin pb-px">
                <div className="flex items-center gap-6 min-w-max">
                  {[
                    { id: 'home-hero-slider', label: 'Hero Slider', icon: Sliders },
                    { id: 'home-categories', label: 'Categories', icon: FolderPlus },
                    { id: 'home-banners', label: 'Banners', icon: ImageIcon },
                    { id: 'home-featured-products', label: 'Featured Products', icon: ShoppingBag },
                    { id: 'home-trending-products', label: 'Trending Products', icon: Flame },
                    { id: 'home-new-arrivals', label: 'New Arrivals', icon: Star },
                    { id: 'home-offers-section', label: 'Offers Section', icon: Tag },
                    { id: 'home-brand-slider', label: 'Brand Slider', icon: CheckCircle2 },
                    { id: 'home-testimonials', label: 'Testimonials', icon: Users },
                    { id: 'home-promotional-videos', label: 'Videos', icon: Video },
                    { id: 'home-store-information', label: 'Store Info', icon: Globe },
                    { id: 'home-footer', label: 'Footer', icon: Settings }
                  ].map((subTab) => {
                    const SubIcon = subTab.icon;
                    const isActive = activeTab === subTab.id;
                    return (
                      <button
                        key={subTab.id}
                        onClick={() => {
                          setActiveTab(subTab.id);
                          setEditingSlideId(null);
                        }}
                        className={`flex items-center gap-2 py-3 px-1 text-xs font-semibold tracking-tight border-b-2 transition-all cursor-pointer ${
                          isActive 
                            ? 'border-blue-600 text-blue-600 font-bold' 
                            : 'border-transparent text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <SubIcon size={14} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                        <span>{subTab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DYNAMIC CONTENT SWITCHER */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* LEFT/MAIN BLOCK (TAKES 2/3 COLUMN IN WIDESCREENS) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* HERO SLIDER EDITOR */}
                  {activeTab === 'home-hero-slider' && (
                    <div className="space-y-6">
                      
                      {/* Hero Slider Management Card */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-5">
                        
                        {/* Title block with control row */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                          <div>
                            <h3 className="text-sm font-bold text-slate-800">Hero Slider Management</h3>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                              Add attractive sliders to highlight offers and collections on the homepage.
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-lg">
                              <span className="text-[10px] font-bold text-slate-500">Sort Order</span>
                              <button 
                                onClick={() => {
                                  setSortOrderEnabled(!sortOrderEnabled);
                                  triggerLocalToast(`Sort Order toggled ${!sortOrderEnabled ? 'ON' : 'OFF'}`, 'success');
                                }}
                                className={`w-8 h-4 rounded-full p-0.5 transition-all ${sortOrderEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                              >
                                <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-all ${sortOrderEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => {
                                setEditingSlideId(null);
                                setSlideForm({
                                  title: 'New Fashion Arrival',
                                  subtitle: 'Get 20% discount on clothing products',
                                  buttonText: 'Shop New',
                                  buttonLink: '/products',
                                  target: 'Same Tab',
                                  status: true,
                                  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400'
                                });
                                triggerLocalToast('Slide form reset! Fill in the right-side form to create a new slide.', 'success');
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-all"
                            >
                              <Plus size={12} className="stroke-[3]" />
                              <span>Add New Slide</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive Slide List Table */}
                        <div className="overflow-x-auto border border-slate-150 rounded-xl">
                          <table className="w-full text-xs text-slate-600 text-left min-w-[550px]">
                            <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-150 select-none">
                              <tr>
                                <th className="px-4 py-2.5 w-12 text-center">No.</th>
                                <th className="px-4 py-2.5 w-24">Image</th>
                                <th className="px-4 py-2.5">Slide details (Editable Inline)</th>
                                <th className="px-4 py-2.5 w-20 text-center">Status</th>
                                <th className="px-4 py-2.5 w-24 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                              {slides.map((slide: any, index: number) => (
                                <tr key={slide.id} className="hover:bg-slate-50/50 group transition-all">
                                  {/* Drag / Sort handles */}
                                  <td className="px-4 py-3 text-center text-slate-400 text-[11px] font-mono font-bold">
                                    <div className="flex flex-col items-center gap-0.5">
                                      <button 
                                        disabled={index === 0}
                                        onClick={() => {
                                          const updated = [...slides];
                                          const temp = updated[index];
                                          updated[index] = updated[index - 1];
                                          updated[index - 1] = temp;
                                          saveSlides(updated);
                                          triggerLocalToast('Slide moved up successfully!', 'success');
                                        }}
                                        className="p-0.5 hover:text-blue-500 disabled:opacity-30 disabled:hover:text-slate-400"
                                      >
                                        ▲
                                      </button>
                                      <span>{index + 1}</span>
                                      <button 
                                        disabled={index === slides.length - 1}
                                        onClick={() => {
                                          const updated = [...slides];
                                          const temp = updated[index];
                                          updated[index] = updated[index + 1];
                                          updated[index + 1] = temp;
                                          saveSlides(updated);
                                          triggerLocalToast('Slide moved down successfully!', 'success');
                                        }}
                                        className="p-0.5 hover:text-blue-500 disabled:opacity-30 disabled:hover:text-slate-400"
                                      >
                                        ▼
                                      </button>
                                    </div>
                                  </td>
                                  
                                  {/* Slide image preview */}
                                  <td className="px-4 py-3">
                                    <div className="relative w-16 h-10 rounded border border-slate-100 shadow-2xs overflow-hidden bg-slate-50">
                                      <img 
                                        src={slide.image} 
                                        alt={slide.title} 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  </td>

                                  {/* Interactive Inline Inputs */}
                                  <td className="px-4 py-3 space-y-1.5">
                                    <div className="grid grid-cols-2 gap-2">
                                      <input 
                                        type="text" 
                                        value={slide.title}
                                        onChange={(e) => {
                                          const updated = slides.map((s: any) => s.id === slide.id ? { ...s, title: e.target.value } : s);
                                          saveSlides(updated);
                                        }}
                                        placeholder="Title text"
                                        className="bg-white border border-slate-200 text-[10px] px-2 py-0.5 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-800"
                                      />
                                      <input 
                                        type="text" 
                                        value={slide.subtitle}
                                        onChange={(e) => {
                                          const updated = slides.map((s: any) => s.id === slide.id ? { ...s, subtitle: e.target.value } : s);
                                          saveSlides(updated);
                                        }}
                                        placeholder="Subtitle text"
                                        className="bg-white border border-slate-200 text-[10px] px-2 py-0.5 rounded w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-slate-600"
                                      />
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2">
                                      <input 
                                        type="text" 
                                        value={slide.buttonText}
                                        onChange={(e) => {
                                          const updated = slides.map((s: any) => s.id === slide.id ? { ...s, buttonText: e.target.value } : s);
                                          saveSlides(updated);
                                        }}
                                        placeholder="Btn Text"
                                        className="bg-white border border-slate-200 text-[10px] px-2 py-0.5 rounded w-full focus:outline-none focus:border-blue-500 text-slate-800"
                                      />
                                      <input 
                                        type="text" 
                                        value={slide.buttonLink}
                                        onChange={(e) => {
                                          const updated = slides.map((s: any) => s.id === slide.id ? { ...s, buttonLink: e.target.value } : s);
                                          saveSlides(updated);
                                        }}
                                        placeholder="Btn Link"
                                        className="bg-white border border-slate-200 text-[10px] px-2 py-0.5 rounded w-full focus:outline-none focus:border-blue-500 text-slate-500 font-mono"
                                      />
                                    </div>
                                  </td>

                                  {/* Enable Status switch */}
                                  <td className="px-4 py-3 text-center">
                                    <button 
                                      onClick={() => {
                                        const updated = slides.map((s: any) => s.id === slide.id ? { ...s, status: !s.status } : s);
                                        saveSlides(updated);
                                        triggerLocalToast(`Slide status updated to ${!slide.status ? 'ACTIVE' : 'INACTIVE'}`, 'success');
                                      }}
                                      className={`w-9 h-5 rounded-full p-0.5 transition-all mx-auto cursor-pointer ${slide.status ? 'bg-emerald-500' : 'bg-slate-200'}`}
                                    >
                                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${slide.status ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </button>
                                  </td>

                                  {/* Action Buttons */}
                                  <td className="px-4 py-3 text-right">
                                    <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={() => {
                                          setEditingSlideId(slide.id);
                                          setSlideForm({
                                            title: slide.title,
                                            subtitle: slide.subtitle,
                                            buttonText: slide.buttonText,
                                            buttonLink: slide.buttonLink,
                                            target: slide.target || 'Same Tab',
                                            status: slide.status,
                                            image: slide.image
                                          });
                                          triggerLocalToast(`Editing slide "${slide.title}"`, 'success');
                                        }}
                                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors cursor-pointer"
                                        title="Deep edit in form"
                                      >
                                        <Edit size={12} />
                                      </button>
                                      <button 
                                        disabled={slides.length <= 1}
                                        onClick={() => {
                                          if (confirm('Are you sure you want to delete this homepage slider?')) {
                                            const updated = slides.filter((s: any) => s.id !== slide.id);
                                            saveSlides(updated);
                                            triggerLocalToast('Slider deleted successfully!', 'success');
                                          }
                                        }}
                                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors disabled:opacity-40 cursor-pointer"
                                        title="Delete slider"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Homepage Layout Sections Switch Grid Card */}
                      <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Homepage Layout Sections</h3>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            Enable/Disable and manage the order of homepage sections.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {layoutSections.map((sec: any) => {
                            return (
                              <div key={sec.id} className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl flex items-center justify-between hover:shadow-2xs transition-all text-left">
                                <div className="flex items-center gap-2.5">
                                  <div className="p-2 bg-white rounded-lg border border-slate-100 text-slate-500">
                                    <GripVertical size={13} className="cursor-grab text-slate-300" />
                                  </div>
                                  <div>
                                    <span className="text-[11px] font-bold text-slate-800 block leading-tight">{sec.label}</span>
                                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{sec.description}</span>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => {
                                    const updated = layoutSections.map((s: any) => s.id === sec.id ? { ...s, enabled: !s.enabled } : s);
                                    saveLayoutSections(updated);
                                    triggerLocalToast(`${sec.label} toggled ${!sec.enabled ? 'ENABLED' : 'DISABLED'}`, 'success');
                                  }}
                                  className={`w-8 h-4 rounded-full p-0.5 transition-all shrink-0 cursor-pointer ${sec.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                >
                                  <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-all ${sec.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* CATEGORIES MANAGEMENT TAB */}
                  {activeTab === 'home-categories' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Shop by Category Config</h3>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Customize category titles, add new blocks, upload images, and toggle elements.</p>
                        </div>
                        <button 
                          onClick={() => {
                            const newId = 'cat-' + Date.now();
                            const updatedItems = [
                              ...categoriesConfig.items,
                              { id: newId, name: 'New Collection', count: '0 Products', enabled: true, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }
                            ];
                            saveCategoriesConfig({ ...categoriesConfig, items: updatedItems });
                            triggerLocalToast('New Category Block Added!', 'success');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors"
                        >
                          <Plus size={12} />
                          <span>Add Category</span>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-slate-400">Section Title</label>
                          <input 
                            type="text" 
                            value={categoriesConfig.title} 
                            onChange={(e) => saveCategoriesConfig({ ...categoriesConfig, title: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-black uppercase text-slate-400">Section Subtitle</label>
                          <input 
                            type="text" 
                            value={categoriesConfig.subtitle} 
                            onChange={(e) => saveCategoriesConfig({ ...categoriesConfig, subtitle: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Category Grid Items ({categoriesConfig.items.length})</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {categoriesConfig.items.map((cat: any) => (
                            <div key={cat.id} className="border border-slate-150 rounded-xl p-3 flex items-center justify-between bg-slate-50/40 relative group/catcard hover:border-slate-300 transition-colors">
                              <div className="flex items-center gap-3">
                                {/* Hover Image Upload Layer */}
                                <div className="relative w-12 h-12 shrink-0 group/catimg rounded border border-slate-200 overflow-hidden bg-slate-100">
                                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  <label className="absolute inset-0 bg-black/60 flex items-center justify-center text-[8px] font-bold text-white opacity-0 group-hover/catimg:opacity-100 transition-opacity cursor-pointer text-center leading-tight p-0.5">
                                    Change
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={(e) => {
                                        handleFileUpload(e, (base64) => {
                                          const updatedItems = categoriesConfig.items.map((i: any) => i.id === cat.id ? { ...i, image: base64 } : i);
                                          saveCategoriesConfig({ ...categoriesConfig, items: updatedItems });
                                          triggerLocalToast(`Category "${cat.name}" image uploaded!`, 'success');
                                        });
                                      }}
                                    />
                                  </label>
                                </div>
                                <div className="space-y-1">
                                  <input 
                                    type="text" 
                                    value={cat.name} 
                                    onChange={(e) => {
                                      const updatedItems = categoriesConfig.items.map((i: any) => i.id === cat.id ? { ...i, name: e.target.value } : i);
                                      saveCategoriesConfig({ ...categoriesConfig, items: updatedItems });
                                    }}
                                    className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none text-xs font-bold text-slate-800 py-px block w-full"
                                    placeholder="Category Name"
                                  />
                                  <input 
                                    type="text" 
                                    value={cat.count} 
                                    onChange={(e) => {
                                      const updatedItems = categoriesConfig.items.map((i: any) => i.id === cat.id ? { ...i, count: e.target.value } : i);
                                      saveCategoriesConfig({ ...categoriesConfig, items: updatedItems });
                                    }}
                                    className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-blue-500 focus:outline-none text-[9px] text-slate-400 font-semibold block w-full"
                                    placeholder="0 Products"
                                  />
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    const updatedItems = categoriesConfig.items.map((i: any) => i.id === cat.id ? { ...i, enabled: !i.enabled } : i);
                                    saveCategoriesConfig({ ...categoriesConfig, items: updatedItems });
                                    triggerLocalToast(`${cat.name} status updated!`, 'success');
                                  }}
                                  className={`w-8 h-4 rounded-full p-0.5 transition-all cursor-pointer ${cat.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                  title="Toggle status"
                                >
                                  <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-all ${cat.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>

                                <button 
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete the category "${cat.name}"?`)) {
                                      const updatedItems = categoriesConfig.items.filter((i: any) => i.id !== cat.id);
                                      saveCategoriesConfig({ ...categoriesConfig, items: updatedItems });
                                      triggerLocalToast(`Category "${cat.name}" deleted!`, 'success');
                                    }
                                  }}
                                  className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                  title="Delete Category Block"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BANNERS TAB */}
                  {activeTab === 'home-banners' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Promotional Banners Config</h3>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Edit visual side-by-side promotional blocks, upload custom background images, or create new banners.</p>
                        </div>
                        <button 
                          onClick={() => {
                            const newId = 'banner-' + Date.now();
                            const updated = [
                              ...bannersConfig,
                              { 
                                id: newId, 
                                title: 'New Promo Event', 
                                subtitle: 'Limited period seasonal discount offers', 
                                link: '/products-all', 
                                bgGradient: 'from-emerald-500 to-teal-600', 
                                enabled: true 
                              }
                            ];
                            saveBannersConfig(updated);
                            triggerLocalToast('New Promotional Banner Added!', 'success');
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors"
                        >
                          <Plus size={12} />
                          <span>Add Banner</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        {bannersConfig.map((banner: any, idx: number) => (
                          <div key={banner.id} className="border border-slate-150 rounded-xl p-5 bg-slate-50/50 space-y-4 relative group/bannercard hover:border-slate-300 transition-all">
                            
                            {/* Title Bar and Delete Banner */}
                            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                              <span className="text-[11px] font-black text-blue-600 uppercase">Banner Block #{idx + 1}</span>
                              
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    const updated = bannersConfig.map((b: any) => b.id === banner.id ? { ...b, enabled: !b.enabled } : b);
                                    saveBannersConfig(updated);
                                    triggerLocalToast(`Banner #${idx + 1} status updated!`, 'success');
                                  }}
                                  className={`w-8 h-4 rounded-full p-0.5 transition-all cursor-pointer ${banner.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                                  title="Toggle Status"
                                >
                                  <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-all ${banner.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                                </button>

                                <button 
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete Banner Block #${idx + 1}?`)) {
                                      const updated = bannersConfig.filter((b: any) => b.id !== banner.id);
                                      saveBannersConfig(updated);
                                      triggerLocalToast(`Banner Block #${idx + 1} deleted!`, 'success');
                                    }
                                  }}
                                  className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                  title="Delete Banner"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>

                            {/* Banner Real-time Layout Preview Box */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                              <div className="lg:col-span-2 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">Banner Headline</label>
                                    <input 
                                      type="text" 
                                      value={banner.title} 
                                      onChange={(e) => {
                                        const updated = bannersConfig.map((b: any) => b.id === banner.id ? { ...b, title: e.target.value } : b);
                                        saveBannersConfig(updated);
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                                      placeholder="Headline"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">Banner Subtitle / Offers</label>
                                    <input 
                                      type="text" 
                                      value={banner.subtitle} 
                                      onChange={(e) => {
                                        const updated = bannersConfig.map((b: any) => b.id === banner.id ? { ...b, subtitle: e.target.value } : b);
                                        saveBannersConfig(updated);
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                                      placeholder="Offers text"
                                    />
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">Redirect Link (e.g. /shoes)</label>
                                    <input 
                                      type="text" 
                                      value={banner.link} 
                                      onChange={(e) => {
                                        const updated = bannersConfig.map((b: any) => b.id === banner.id ? { ...b, link: e.target.value } : b);
                                        saveBannersConfig(updated);
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-mono font-medium text-slate-600 focus:outline-none focus:border-blue-500"
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-400 uppercase">Background Gradient Tailwind Classes</label>
                                    <input 
                                      type="text" 
                                      value={banner.bgGradient || 'from-indigo-600 to-blue-700'} 
                                      onChange={(e) => {
                                        const updated = bannersConfig.map((b: any) => b.id === banner.id ? { ...b, bgGradient: e.target.value } : b);
                                        saveBannersConfig(updated);
                                      }}
                                      className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-mono text-slate-600 focus:outline-none focus:border-blue-500"
                                      placeholder="from-blue-600 to-sky-700"
                                    />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] font-bold text-slate-400 uppercase block">Banner Background Image Upload (Overrides Gradient)</label>
                                  <div className="flex items-center gap-3">
                                    <input 
                                      type="file" 
                                      accept="image/*" 
                                      onChange={(e) => {
                                        handleFileUpload(e, (base64) => {
                                          const updated = bannersConfig.map((b: any) => b.id === banner.id ? { ...b, image: base64 } : b);
                                          saveBannersConfig(updated);
                                          triggerLocalToast(`Banner #${idx + 1} custom image uploaded!`, 'success');
                                        });
                                      }}
                                      className="text-xs text-slate-500 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                                    />
                                    {banner.image && (
                                      <button 
                                        onClick={() => {
                                          const updated = bannersConfig.map((b: any) => {
                                            if (b.id === banner.id) {
                                              const copy = { ...b };
                                              delete copy.image;
                                              return copy;
                                            }
                                            return b;
                                          });
                                          saveBannersConfig(updated);
                                          triggerLocalToast('Custom background image cleared!', 'success');
                                        }}
                                        className="text-[9px] font-bold text-rose-500 hover:underline"
                                      >
                                        Clear Image
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Preview Card */}
                              <div className="flex flex-col justify-between p-4 rounded-xl text-white shadow-sm overflow-hidden relative min-h-[120px] bg-slate-900 border border-slate-200">
                                {banner.image ? (
                                  <div className="absolute inset-0 z-0">
                                    <img src={banner.image} alt="bg" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                                  </div>
                                ) : (
                                  <div className={`absolute inset-0 z-0 bg-gradient-to-tr ${banner.bgGradient || 'from-indigo-600 to-blue-700'}`} />
                                )}
                                
                                <div className="relative z-10">
                                  <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-widest font-black leading-none">PREVIEW</span>
                                  <h4 className="text-sm font-black tracking-tight mt-1 leading-snug drop-shadow-xs">{banner.title || 'Untitled Banner'}</h4>
                                  <p className="text-[10px] text-white/90 font-medium leading-normal drop-shadow-xs">{banner.subtitle || 'Subtitle text goes here'}</p>
                                </div>

                                <div className="relative z-10 flex items-center justify-between pt-4">
                                  <span className="text-[9px] font-mono opacity-75">{banner.link || '#'}</span>
                                  <span className="text-[9px] font-black underline uppercase">Shop Now</span>
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRODUCT PICKERS (FEATURED, TRENDING, NEW ARRIVALS) */}
                  {['home-featured-products', 'home-trending-products', 'home-new-arrivals'].includes(activeTab) && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-5">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">
                          {activeTab.replace('home-', '').replace('-', ' ')} Catalog Picker
                        </h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                          Toggle checkboxes on products to display them directly inside this homepage collection tab.
                        </p>
                      </div>

                      <div className="overflow-x-auto border border-slate-150 rounded-xl">
                        <table className="w-full text-xs text-slate-600 text-left min-w-[500px]">
                          <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500 border-b border-slate-150 select-none">
                            <tr>
                              <th className="px-5 py-3 w-16 text-center">Active</th>
                              <th className="px-4 py-3">Product Photo & Details</th>
                              <th className="px-4 py-3">Category</th>
                              <th className="px-4 py-3 text-right">Price</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                            {productsList.map((p) => {
                              const listId = activeTab === 'home-featured-products' ? featuredProductsIds :
                                             activeTab === 'home-trending-products' ? trendingProductsIds :
                                             newArrivalsProductsIds;
                              const isChecked = listId.includes(p.id);
                              
                              const togglePicker = () => {
                                let updated: string[];
                                if (isChecked) {
                                  updated = listId.filter(id => id !== p.id);
                                } else {
                                  updated = [...listId, p.id];
                                }
                                if (activeTab === 'home-featured-products') setFeaturedProductsIds(updated);
                                else if (activeTab === 'home-trending-products') setTrendingProductsIds(updated);
                                else setNewArrivalsProductsIds(updated);
                                
                                triggerLocalToast('Homepage catalog selections updated!', 'success');
                              };

                              return (
                                <tr key={p.id} className="hover:bg-slate-50/40">
                                  <td className="px-5 py-3 text-center">
                                    <input 
                                      type="checkbox" 
                                      checked={isChecked} 
                                      onChange={togglePicker}
                                      className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 cursor-pointer"
                                    />
                                  </td>
                                  <td className="px-4 py-3 flex items-center gap-3">
                                    <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded border border-slate-200" />
                                    <div>
                                      <span className="text-slate-800 font-bold block">{p.name}</span>
                                      <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{p.id}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-slate-500 text-[11px]">{p.category}</td>
                                  <td className="px-4 py-3 text-right font-bold text-slate-900 font-mono">Rs. {p.price.toLocaleString()}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* OFFERS TAB */}
                  {activeTab === 'home-offers-section' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">Offers Banner Settings</h3>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Configure live countdown timers and promo ribbons.</p>
                        </div>
                        <button 
                          onClick={() => {
                            setOffersConfig({ ...offersConfig, enabled: !offersConfig.enabled });
                            triggerLocalToast(`Homepage offers ${!offersConfig.enabled ? 'ENABLED' : 'DISABLED'}`, 'success');
                          }}
                          className={`w-8 h-4 rounded-full p-0.5 transition-all cursor-pointer ${offersConfig.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full shadow-md transition-all ${offersConfig.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Banner Headline Alert</label>
                          <input 
                            type="text" 
                            value={offersConfig.bannerText} 
                            onChange={(e) => setOffersConfig({ ...offersConfig, bannerText: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Coupon Code</label>
                          <input 
                            type="text" 
                            value={offersConfig.couponCode} 
                            onChange={(e) => setOffersConfig({ ...offersConfig, couponCode: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono font-bold text-red-600 uppercase"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Discount Percentage (%)</label>
                          <input 
                            type="number" 
                            value={offersConfig.discountPercentage} 
                            onChange={(e) => setOffersConfig({ ...offersConfig, discountPercentage: parseInt(e.target.value) || 0 })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Countdown Timer duration (Hours)</label>
                          <input 
                            type="number" 
                            value={offersConfig.endsInHours} 
                            onChange={(e) => setOffersConfig({ ...offersConfig, endsInHours: parseInt(e.target.value) || 0 })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-bold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* BRAND SLIDER TAB */}
                  {activeTab === 'home-brand-slider' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Featured Partner Brands</h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Manage partner brands appearing in the homepage slider strip.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {brandsConfig.map((brand: any) => (
                          <div key={brand.id} className="border border-slate-150 rounded-xl p-3 flex items-center justify-between bg-slate-50/40">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded flex items-center justify-center font-black font-mono text-slate-700 text-[10px]">
                                {brand.logoText}
                              </div>
                              <input 
                                type="text" 
                                value={brand.name} 
                                onChange={(e) => {
                                  const updated = brandsConfig.map((b: any) => b.id === brand.id ? { ...b, name: e.target.value, logoText: e.target.value.toUpperCase() } : b);
                                  setBrandsConfig(updated);
                                }}
                                className="bg-transparent border-b border-transparent focus:border-blue-500 focus:outline-none text-xs font-bold text-slate-800 py-1"
                              />
                            </div>
                            <button 
                              onClick={() => {
                                setBrandsConfig(brandsConfig.filter((b: any) => b.id !== brand.id));
                                triggerLocalToast('Brand removed successfully!', 'success');
                              }}
                              className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          const name = prompt('Enter new brand name (e.g. Reebok):');
                          if (name) {
                            setBrandsConfig([
                              ...brandsConfig,
                              { id: 'b-' + Date.now(), name, logoText: name.toUpperCase(), image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=150' }
                            ]);
                            triggerLocalToast('New brand added successfully!', 'success');
                          }
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-black uppercase rounded-lg"
                      >
                        <Plus size={12} />
                        <span>Add New Brand Block</span>
                      </button>
                    </div>
                  )}

                  {/* TESTIMONIALS TAB */}
                  {activeTab === 'home-testimonials' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Customer Testimonials</h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Control customer comments highlighted on the store frontpage.</p>
                      </div>

                      <div className="space-y-4">
                        {testimonialsConfig.map((t: any) => (
                          <div key={t.id} className="border border-slate-150 rounded-xl p-4 bg-slate-50/50 space-y-2">
                            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                              <div>
                                <span className="text-xs font-bold text-slate-800 block">{t.name}</span>
                                <span className="text-[9px] text-slate-400 block">{t.role}</span>
                              </div>
                              <button 
                                onClick={() => {
                                  setTestimonialsConfig(testimonialsConfig.filter((item: any) => item.id !== t.id));
                                  triggerLocalToast('Testimonial removed!', 'success');
                                }}
                                className="p-1 hover:bg-rose-50 text-rose-500 rounded"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-500 italic mt-1 leading-relaxed">&ldquo;{t.feedback}&rdquo;</p>
                            <div className="text-amber-500 flex items-center gap-0.5 text-[10px]">
                              {'★'.repeat(t.stars)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          const name = prompt('Enter reviewer name:');
                          const feedback = name ? prompt('Enter review content:') : '';
                          if (name && feedback) {
                            setTestimonialsConfig([
                              ...testimonialsConfig,
                              { id: 't-' + Date.now(), name, role: 'Verified Customer', feedback, stars: 5 }
                            ]);
                            triggerLocalToast('Review testimonial added!', 'success');
                          }
                        }}
                        className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-black uppercase rounded-lg"
                      >
                        <Plus size={12} />
                        <span>Add New Testimonial</span>
                      </button>
                    </div>
                  )}

                  {/* PROMOTIONAL VIDEOS TAB */}
                  {activeTab === 'home-promotional-videos' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Promotional Store Video</h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Embed virtual tour links or monsoon fashion catalog videos.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Section Headline title</label>
                          <input 
                            type="text" 
                            value={videosConfig.title} 
                            onChange={(e) => setVideosConfig({ ...videosConfig, title: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">YouTube Video Link (or raw MP4 link)</label>
                          <input 
                            type="text" 
                            value={videosConfig.youtubeUrl} 
                            onChange={(e) => setVideosConfig({ ...videosConfig, youtubeUrl: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-mono font-semibold text-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STORE INFO TAB */}
                  {activeTab === 'home-store-information' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Bardibas Headquarters Info</h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Configure address tags, phone numbers, and support email alerts.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Store Address Location</label>
                          <input 
                            type="text" 
                            value={storeInfoConfig.address} 
                            onChange={(e) => setStoreInfoConfig({ ...storeInfoConfig, address: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Store Contact Hotline Numbers</label>
                          <input 
                            type="text" 
                            value={storeInfoConfig.phone} 
                            onChange={(e) => setStoreInfoConfig({ ...storeInfoConfig, phone: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Support Email Address</label>
                          <input 
                            type="email" 
                            value={storeInfoConfig.email} 
                            onChange={(e) => setStoreInfoConfig({ ...storeInfoConfig, email: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Business Opening Hours</label>
                          <input 
                            type="text" 
                            value={storeInfoConfig.hours} 
                            onChange={(e) => setStoreInfoConfig({ ...storeInfoConfig, hours: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FOOTER TAB */}
                  {activeTab === 'home-footer' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-slate-800">Footer Settings</h3>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Edit store brief narrative, copyrights, and social media links.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Footer About Narrative Paragraph</label>
                          <textarea 
                            value={footerConfig.aboutText} 
                            onChange={(e) => setFooterConfig({ ...footerConfig, aboutText: e.target.value })}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase">Facebook Page Link</label>
                            <input 
                              type="text" 
                              value={footerConfig.facebookUrl} 
                              onChange={(e) => setFooterConfig({ ...footerConfig, facebookUrl: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-400 uppercase">Instagram Link</label>
                            <input 
                              type="text" 
                              value={footerConfig.instagramUrl} 
                              onChange={(e) => setFooterConfig({ ...footerConfig, instagramUrl: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-slate-400 uppercase">Copyright Footer Line</label>
                          <input 
                            type="text" 
                            value={footerConfig.copyrightText} 
                            onChange={(e) => setFooterConfig({ ...footerConfig, copyrightText: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* RIGHT SIDEBAR PANEL (FOR ADDING/EDITING AND TIPS) */}
                <div className="lg:col-span-1 space-y-6">
                  
                  {/* ADD NEW SLIDE / EDIT SLIDE CONTEXT CARD */}
                  {activeTab === 'home-hero-slider' && (
                    <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-2xs space-y-4 text-left">
                      <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                        <Sparkles className="text-amber-500" size={16} />
                        <span>{editingSlideId ? 'Edit Active Slide' : 'Add New Slide'}</span>
                      </h3>

                      {/* Dashed Image Upload Container */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Slider Image</label>
                        <div 
                          onClick={() => {
                            const url = prompt('Select or enter premium sneaker / fashion image URL:', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400');
                            if (url) {
                              setSlideForm({ ...slideForm, image: url });
                              triggerLocalToast('Slider image mockup URL loaded!', 'success');
                            }
                          }}
                          className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:bg-slate-50/70 cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5"
                        >
                          <ImageIcon size={24} className="text-slate-300 stroke-[1.5]" />
                          <span className="text-[10px] font-bold text-slate-700 leading-tight">Click to select preset catalog photos</span>
                          <span className="text-[8px] text-slate-400">Recommended size: 1920x600px. Max size: 2MB</span>
                        </div>
                        {slideForm.image && (
                          <div className="relative mt-2 rounded-lg border border-slate-200 overflow-hidden h-24 shadow-2xs bg-slate-50 group">
                            <img src={slideForm.image} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white text-[9px] font-bold bg-slate-900/60 py-1 px-2.5 rounded-md">Change image URL</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Title input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Title</label>
                        <input 
                          type="text" 
                          value={slideForm.title}
                          onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                          placeholder="Enter slide title (e.g. New Arrivals)"
                          className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>

                      {/* Subtitle input */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Subtitle</label>
                        <input 
                          type="text" 
                          value={slideForm.subtitle}
                          onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                          placeholder="Enter slide subtitle"
                          className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Button Text */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Button Text</label>
                        <input 
                          type="text" 
                          value={slideForm.buttonText}
                          onChange={(e) => setSlideForm({ ...slideForm, buttonText: e.target.value })}
                          placeholder="Shop Now"
                          className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Button Link */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Button Link</label>
                          <input 
                            type="text" 
                            value={slideForm.buttonLink}
                            onChange={(e) => setSlideForm({ ...slideForm, buttonLink: e.target.value })}
                            placeholder="/shop"
                            className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Target</label>
                          <select 
                            value={slideForm.target}
                            onChange={(e) => setSlideForm({ ...slideForm, target: e.target.value })}
                            className="w-full bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-semibold text-slate-700 focus:outline-none"
                          >
                            <option>Same Tab</option>
                            <option>New Tab</option>
                          </select>
                        </div>
                      </div>

                      {/* Status toggle switch */}
                      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-lg mt-1 select-none">
                        <div>
                          <span className="text-[10px] font-bold text-slate-700 block leading-none">Status</span>
                          <span className="text-[8px] text-slate-400 font-semibold mt-0.5 block">Show or hide slide</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setSlideForm({ ...slideForm, status: !slideForm.status })}
                          className={`w-9 h-5 rounded-full p-0.5 transition-all cursor-pointer ${slideForm.status ? 'bg-emerald-500' : 'bg-slate-300'}`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${slideForm.status ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>

                      {/* Form trigger action button */}
                      <div className="grid grid-cols-2 gap-2.5 pt-2">
                        <button 
                          onClick={() => {
                            setEditingSlideId(null);
                            setSlideForm({
                              title: '',
                              subtitle: '',
                              buttonText: '',
                              buttonLink: '',
                              target: 'Same Tab',
                              status: true,
                              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400'
                            });
                            triggerLocalToast('Slide editor reset', 'success');
                          }}
                          className="py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-black uppercase rounded-lg transition-all"
                        >
                          Cancel
                        </button>
                        
                        <button 
                          onClick={() => {
                            if (!slideForm.title || !slideForm.buttonText) {
                              triggerLocalToast('Please fill out at least Title and Button Text!', 'error');
                              return;
                            }
                            if (editingSlideId) {
                              // update slide
                              const updated = slides.map((s: any) => s.id === editingSlideId ? { ...slideForm, id: editingSlideId } : s);
                              saveSlides(updated);
                              triggerLocalToast('Slide updated successfully!', 'success');
                              setEditingSlideId(null);
                            } else {
                              // create slide
                              const newSlide = {
                                ...slideForm,
                                id: 'slide-' + Date.now()
                              };
                              saveSlides([...slides, newSlide]);
                              triggerLocalToast('New slider slide added!', 'success');
                            }
                            // reset
                            setSlideForm({
                              title: '',
                              subtitle: '',
                              buttonText: '',
                              buttonLink: '',
                              target: 'Same Tab',
                              status: true,
                              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400'
                            });
                          }}
                          className="py-2 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase rounded-lg transition-all shadow-xs"
                        >
                          {editingSlideId ? 'Update Slide' : 'Add Slide'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SLIDER TIPS AND RECS PANEL */}
                  {activeTab === 'home-hero-slider' && (
                    <div className="bg-sky-50/50 border border-sky-150 p-5 rounded-2xl text-left space-y-3">
                      <div className="flex items-center gap-2 text-sky-700">
                        <Lightbulb size={16} className="text-amber-500 fill-amber-300 stroke-[2.5]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Slider Tips</h4>
                      </div>
                      <ul className="text-[10px] text-sky-800 space-y-2 list-disc pl-4 font-semibold leading-relaxed">
                        <li>Use high quality images for best results.</li>
                        <li>Recommended image size: 1920x600px.</li>
                        <li>Maximum 6 slides are recommended.</li>
                        <li>Add clear titles and strong call-to-action.</li>
                      </ul>
                    </div>
                  )}

                  {/* GENERIC SUBTAB GENERAL RECOMMENDATION INFO */}
                  {activeTab !== 'home-hero-slider' && (
                    <div className="bg-blue-50/40 border border-blue-100 p-5 rounded-2xl text-left space-y-3">
                      <div className="flex items-center gap-2 text-blue-700">
                        <CheckCircle2 size={15} />
                        <h4 className="text-xs font-bold uppercase tracking-wider">Configuration Tip</h4>
                      </div>
                      <p className="text-[10px] text-blue-800 leading-relaxed font-semibold">
                        Keep headlines concise and clear. Toggle status switches to dynamically hide elements in real time. Remember to hit &quot;Save Changes&quot; to permanently persist store parameters.
                      </p>
                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* TAB: PRODUCTS MANAGEMENT AND SUB-TAB ENGINES */}
          {(!['dashboard', 'inventory', 'orders', 'customers'].includes(activeTab) && !activeTab.startsWith('home-')) && (
            <div className="space-y-8 animate-fade-in text-slate-800">
              
              {/* Top Title Bar Segment */}
              {activeTab.startsWith('products') && (
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="text-left">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Package className="text-blue-600 stroke-[2.5]" size={24} />
                      <span>Products Manager</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 font-semibold">
                      Dashboard &gt; Products &gt; <span className="text-blue-600 capitalize">{activeTab.replace('products-', '').replace('-', ' ')}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button 
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," 
                          + ["ID,Name,SKU,Category,Brand,Price,OriginalPrice,InStock"].join(",") + "\n"
                          + localProductsList.map(p => `"${p.id}","${p.name}","${p.id || ''}","${p.category}","${p.brand || ''}",${p.price},${p.originalPrice},${p.inStock}`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", `products_export_${Date.now()}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        triggerLocalToast('Exported CSV file successfully!', 'success');
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-lg transition-all shadow-2xs"
                    >
                      <Download size={13} className="text-slate-400" />
                      <span>Export</span>
                    </button>

                    <button 
                      onClick={() => setActiveTab('products-bulk-import')}
                      className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-lg transition-all shadow-2xs"
                    >
                      <Upload size={13} className="text-slate-400" />
                      <span>Import</span>
                    </button>

                  <button 
                    onClick={() => {
                      setEditingLocalProduct(null);
                      setLocalProductForm({
                        name: '',
                        sku: '',
                        price: '',
                        originalPrice: '',
                        category: 'Men Shoes',
                        brand: 'Nike',
                        sizes: '40, 41, 42, 43',
                        image: '',
                        description: '',
                        inStock: true,
                        status: 'Published',
                        featured: false
                      });
                      setActiveTab('products-add');
                    }}
                    className="flex items-center gap-1.5 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all shadow-md active:scale-95"
                  >
                    <Plus size={14} className="stroke-[3]" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>
              )}

              {/* ----------------- SUBTAB 1 & DEFAULT: ALL PRODUCTS ----------------- */}
              {(activeTab === 'products-all' || activeTab === 'products') && (
                <div className="space-y-6">
                  
                  {/* Dynamic Metrics Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:scale-[1.01] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Products</span>
                        <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          <Package size={13} />
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                        <span className="text-lg font-black text-slate-800">{localProductsList.length}</span>
                        <span className="text-[9px] text-green-600 font-bold block mt-0.5">▲ 12.5% Month</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:scale-[1.01] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Published</span>
                        <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                          <CheckCircle2 size={13} />
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                        <span className="text-lg font-black text-slate-800">
                          {localProductsList.filter(p => !trashedProductIds.includes(p.id) && p.inStock).length}
                        </span>
                        <span className="text-[9px] text-green-600 font-bold block mt-0.5">▲ Active Live</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:scale-[1.01] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Out of Stock</span>
                        <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                          <X size={13} />
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                        <span className="text-lg font-black text-slate-800">
                          {localProductsList.filter(p => !trashedProductIds.includes(p.id) && !p.inStock).length}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold block mt-0.5">Needs restocking</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:scale-[1.01] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Low Stock</span>
                        <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                          <Sliders size={13} />
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                        <span className="text-lg font-black text-slate-800">5</span>
                        <span className="text-[9px] text-amber-500 font-black block mt-0.5">Stock warning</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:scale-[1.01] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Categories</span>
                        <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                          <Tag size={13} />
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                        <span className="text-lg font-black text-slate-800">{localProductCategories.length}</span>
                        <span className="text-[9px] text-blue-600 font-bold block mt-0.5">System grids</span>
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 rounded-xl p-4 flex flex-col justify-between shadow-2xs hover:scale-[1.01] transition-transform">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Total Brands</span>
                        <div className="w-7 h-7 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                          <Globe size={13} />
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                        <span className="text-lg font-black text-slate-800">{localProductBrands.length}</span>
                        <span className="text-[9px] text-cyan-600 font-bold block mt-0.5">Active suppliers</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Work Split Grid */}
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    
                    {/* Left Filters Panel matching screenshot styling */}
                    <div className="w-full lg:w-72 bg-white border border-slate-200/80 p-5 rounded-2xl flex flex-col gap-4 text-left shadow-2xs shrink-0">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                          <Filter size={14} className="text-slate-500" />
                          <span>Filters</span>
                        </span>
                        <button 
                          onClick={() => {
                            setFilterSearch('');
                            setFilterCategory('All');
                            setFilterBrand('All');
                            setFilterStatus('All');
                            setFilterStockStatus('All');
                            setFilterMinPrice('');
                            setFilterMaxPrice('');
                            setFilterFeatured('All');
                            setFilterStartDate('');
                            setFilterEndDate('');
                            setAppliedSearch('');
                            setAppliedCategory('All');
                            setAppliedBrand('All');
                            setAppliedStatus('All');
                            setAppliedStockStatus('All');
                            setAppliedMinPrice('');
                            setAppliedMaxPrice('');
                            setAppliedFeatured('All');
                            setAppliedStartDate('');
                            setAppliedEndDate('');
                            triggerLocalToast('All filters have been reset!', 'success');
                          }}
                          className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          Reset Filters
                        </button>
                      </div>

                      {/* Filter fields */}
                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Search Product</label>
                          <div className="relative">
                            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="text" 
                              value={filterSearch}
                              onChange={(e) => setFilterSearch(e.target.value)}
                              placeholder="Name or ID..." 
                              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-700"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Category</label>
                          <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                          >
                            <option value="All">All Categories</option>
                            {localProductCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Brand</label>
                          <select 
                            value={filterBrand}
                            onChange={(e) => setFilterBrand(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                          >
                            <option value="All">All Brands</option>
                            {localProductBrands.map(b => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Status</label>
                          <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                          >
                            <option value="All">All Statuses</option>
                            <option value="Published">Published Only</option>
                            <option value="Draft">Draft Only</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Stock Status</label>
                          <select 
                            value={filterStockStatus}
                            onChange={(e) => setFilterStockStatus(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                          >
                            <option value="All">All Stock Levels</option>
                            <option value="In Stock">In Stock Only</option>
                            <option value="Out of Stock">Out of Stock Only</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Price Range</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              type="number" 
                              value={filterMinPrice}
                              onChange={(e) => setFilterMinPrice(e.target.value)}
                              placeholder="Min (Rs.)" 
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                            />
                            <input 
                              type="number" 
                              value={filterMaxPrice}
                              onChange={(e) => setFilterMaxPrice(e.target.value)}
                              placeholder="Max (Rs.)" 
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Featured</label>
                          <select 
                            value={filterFeatured}
                            onChange={(e) => setFilterFeatured(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700"
                          >
                            <option value="All">All Products</option>
                            <option value="Featured">Featured Only</option>
                            <option value="Standard">Standard Only</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">Date Range</label>
                          <div className="space-y-1">
                            <input 
                              type="date" 
                              value={filterStartDate}
                              onChange={(e) => setFilterStartDate(e.target.value)}
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold"
                            />
                            <div className="text-center text-[10px] font-bold text-slate-400 uppercase">to</div>
                            <input 
                              type="date" 
                              value={filterEndDate}
                              onChange={(e) => setFilterEndDate(e.target.value)}
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-semibold"
                            />
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setAppliedSearch(filterSearch);
                            setAppliedCategory(filterCategory);
                            setAppliedBrand(filterBrand);
                            setAppliedStatus(filterStatus);
                            setAppliedStockStatus(filterStockStatus);
                            setAppliedMinPrice(filterMinPrice);
                            setAppliedMaxPrice(filterMaxPrice);
                            setAppliedFeatured(filterFeatured);
                            setAppliedStartDate(filterStartDate);
                            setAppliedEndDate(filterEndDate);
                            setCurrentPage(1);
                            triggerLocalToast('Applied products filter criteria!', 'success');
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2 rounded-lg text-[10px] uppercase tracking-wider shadow-sm transition-all mt-4"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>

                    {/* Right Table Column */}
                    <div className="flex-1 w-full bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
                      
                      {/* Tabs Bar above table */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 p-4 gap-3 bg-slate-50/20">
                        <div className="flex flex-wrap gap-1">
                          {[
                            { id: 'all', label: 'All', count: localProductsList.filter(p => !trashedProductIds.includes(p.id)).length },
                            { id: 'published', label: 'Published', count: localProductsList.filter(p => !trashedProductIds.includes(p.id) && p.inStock).length },
                            { id: 'draft', label: 'Draft', count: localProductsList.filter(p => !trashedProductIds.includes(p.id) && !p.inStock).length },
                            { id: 'trash', label: 'Trash', count: trashedProductIds.length }
                          ].map(t => (
                            <button
                              key={t.id}
                              onClick={() => {
                                setActiveStatusTab(t.id as any);
                                setCurrentPage(1);
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-all ${
                                activeStatusTab === t.id 
                                  ? 'bg-[#1b5fc1]/10 text-[#1b5fc1] font-extrabold' 
                                  : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
                              }`}
                            >
                              {t.label} ({t.count})
                            </button>
                          ))}
                        </div>

                        {/* Action Row */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <select 
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                            className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none"
                          >
                            <option value="Bulk Actions">Bulk Actions</option>
                            <option value="Publish">Publish</option>
                            <option value="Move to Draft">Move to Draft</option>
                            <option value="Delete">Delete</option>
                          </select>
                          <button
                            onClick={() => {
                              if (selectedProductIds.length === 0) {
                                triggerLocalToast('No products selected!', 'error');
                                return;
                              }
                              if (bulkAction === 'Bulk Actions') {
                                triggerLocalToast('Select a bulk action first!', 'error');
                                return;
                              }
                              if (bulkAction === 'Publish') {
                                const updated = localProductsList.map(p => 
                                  selectedProductIds.includes(p.id) ? { ...p, inStock: true } : p
                                );
                                saveLocalProductsList(updated);
                                triggerLocalToast('Selected products published!', 'success');
                              } else if (bulkAction === 'Move to Draft') {
                                const updated = localProductsList.map(p => 
                                  selectedProductIds.includes(p.id) ? { ...p, inStock: false } : p
                                );
                                saveLocalProductsList(updated);
                                triggerLocalToast('Selected products drafted!', 'success');
                              } else if (bulkAction === 'Delete') {
                                const updatedTrash = [...new Set([...trashedProductIds, ...selectedProductIds])];
                                saveTrashedProductIds(updatedTrash);
                                triggerLocalToast('Selected products moved to Trash!', 'success');
                              }
                              setSelectedProductIds([]);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-2xs active:scale-95 transition-all"
                          >
                            Apply
                          </button>

                          <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

                          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-white">
                            <button 
                              onClick={() => setViewLayout('list')}
                              className={`p-1 rounded ${viewLayout === 'list' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                              title="List Layout"
                            >
                              <Sliders size={12} />
                            </button>
                            <button 
                              onClick={() => setViewLayout('grid')}
                              className={`p-1 rounded ${viewLayout === 'grid' ? 'bg-slate-100 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                              title="Grid Layout"
                            >
                              <LayoutDashboard size={12} />
                            </button>
                          </div>

                          <select 
                            value={itemsPerPage}
                            onChange={(e) => {
                              setItemsPerPage(parseInt(e.target.value));
                              setCurrentPage(1);
                            }}
                            className="bg-white border border-slate-200 px-2 py-1.5 rounded-lg text-[11px] font-bold text-slate-700 focus:outline-none"
                          >
                            <option value={5}>5 per page</option>
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                          </select>
                        </div>
                      </div>

                      {/* Filter products implementation */}
                      {(() => {
                        const filtered = localProductsList.filter(p => {
                          // Check Trash status
                          const isTrashed = trashedProductIds.includes(p.id);
                          if (activeStatusTab === 'trash') {
                            if (!isTrashed) return false;
                          } else {
                            if (isTrashed) return false;
                            if (activeStatusTab === 'published' && !p.inStock) return false;
                            if (activeStatusTab === 'draft' && p.inStock) return false;
                          }

                          // Applied filters
                          if (appliedSearch) {
                            const query = appliedSearch.toLowerCase();
                            if (!p.name.toLowerCase().includes(query) && !p.id.toLowerCase().includes(query)) return false;
                          }
                          if (appliedCategory !== 'All' && p.category !== appliedCategory) return false;
                          if (appliedBrand !== 'All' && p.brand !== appliedBrand) return false;
                          if (appliedStockStatus !== 'All') {
                            if (appliedStockStatus === 'In Stock' && !p.inStock) return false;
                            if (appliedStockStatus === 'Out of Stock' && p.inStock) return false;
                          }
                          if (appliedStatus !== 'All') {
                            if (appliedStatus === 'Published' && !p.inStock) return false;
                            if (appliedStatus === 'Draft' && p.inStock) return false;
                          }
                          if (appliedMinPrice && p.price < parseFloat(appliedMinPrice)) return false;
                          if (appliedMaxPrice && p.price > parseFloat(appliedMaxPrice)) return false;
                          if (appliedFeatured !== 'All') {
                            const isFeat = p.tags?.includes('featured') || p.price % 3 === 0;
                            if (appliedFeatured === 'Featured' && !isFeat) return false;
                            if (appliedFeatured === 'Standard' && isFeat) return false;
                          }

                          return true;
                        });

                        const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
                        const startIndex = (currentPage - 1) * itemsPerPage;
                        const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

                        return (
                          <div>
                            {viewLayout === 'list' ? (
                              /* Table Visual Representation */
                              <div className="overflow-x-auto select-none">
                                <table className="w-full text-left border-collapse text-xs">
                                  <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                                      <th className="p-4 w-10">
                                        <input 
                                          type="checkbox" 
                                          checked={paginated.length > 0 && paginated.every(p => selectedProductIds.includes(p.id))}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              const toSelect = paginated.map(p => p.id);
                                              setSelectedProductIds([...new Set([...selectedProductIds, ...toSelect])]);
                                            } else {
                                              const paginatedIds = paginated.map(p => p.id);
                                              setSelectedProductIds(selectedProductIds.filter(id => !paginatedIds.includes(id)));
                                            }
                                          }}
                                          className="rounded cursor-pointer accent-blue-600"
                                        />
                                      </th>
                                      <th className="p-4">Product Info</th>
                                      <th className="p-4">SKU</th>
                                      <th className="p-4">Category</th>
                                      <th className="p-4">Price</th>
                                      <th className="p-4">Stock Status</th>
                                      <th className="p-4 text-center">Status</th>
                                      <th className="p-4 text-center">Featured</th>
                                      <th className="p-4">Publish Date</th>
                                      <th className="p-4 text-center">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                    {paginated.length === 0 ? (
                                      <tr>
                                        <td colSpan={10} className="p-10 text-center text-slate-400">
                                          <Package size={36} className="mx-auto mb-2.5 opacity-40 text-slate-300" />
                                          <p className="font-semibold text-xs">No products matched the filter query.</p>
                                        </td>
                                      </tr>
                                    ) : (
                                      paginated.map((product) => {
                                        const isChecked = selectedProductIds.includes(product.id);
                                        const isFeatured = product.tags?.includes('featured') || product.price % 3 === 0;

                                        return (
                                          <tr key={product.id} className="hover:bg-slate-50/40 transition-colors">
                                            <td className="p-4">
                                              <input 
                                                type="checkbox" 
                                                checked={isChecked}
                                                onChange={() => {
                                                  if (isChecked) {
                                                    setSelectedProductIds(selectedProductIds.filter(id => id !== product.id));
                                                  } else {
                                                    setSelectedProductIds([...selectedProductIds, product.id]);
                                                  }
                                                }}
                                                className="rounded cursor-pointer accent-blue-600"
                                              />
                                            </td>
                                            <td className="p-4">
                                              <div className="flex items-center gap-3">
                                                <img 
                                                  src={product.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120'} 
                                                  alt={product.name} 
                                                  className="w-12 h-12 object-cover rounded-lg border border-slate-100 shadow-3xs"
                                                  referrerPolicy="no-referrer"
                                                />
                                                <div>
                                                  <div className="font-bold text-slate-800 text-[13px] tracking-tight line-clamp-1 hover:text-blue-600 transition-colors cursor-pointer">
                                                    {product.name}
                                                  </div>
                                                  <span className="text-[10px] text-slate-400 font-bold block mt-0.5">ID: {product.id}</span>
                                                </div>
                                              </div>
                                            </td>
                                            <td className="p-4 font-mono font-bold text-slate-400 uppercase text-[10px] tracking-widest">
                                              {product.id.slice(0, 8).toUpperCase() || 'AD-GC20'}
                                            </td>
                                            <td className="p-4">
                                              <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                                                {product.category}
                                              </span>
                                            </td>
                                            <td className="p-4">
                                              <div>
                                                <div className="font-black text-slate-800 text-[13px]">Rs. {product.price.toLocaleString()}</div>
                                                {product.originalPrice > product.price && (
                                                  <div className="text-[10px] text-slate-400 line-through">Rs. {product.originalPrice.toLocaleString()}</div>
                                                )}
                                              </div>
                                            </td>
                                            <td className="p-4">
                                              {product.inStock ? (
                                                <span className="text-emerald-600 text-[10px] font-black flex items-center gap-1">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                  <span>{product.price % 33 + 5} in stock</span>
                                                </span>
                                              ) : (
                                                <span className="text-rose-500 text-[10px] font-black flex items-center gap-1">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                                  <span>Out of stock</span>
                                                </span>
                                              )}
                                            </td>
                                            <td className="p-4 text-center">
                                              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${
                                                product.inStock 
                                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                                              }`}>
                                                {product.inStock ? 'Published' : 'Draft'}
                                              </span>
                                            </td>
                                            <td className="p-4 text-center">
                                              <button 
                                                onClick={() => {
                                                  const isFeat = product.tags?.includes('featured');
                                                  const newTags = isFeat 
                                                    ? (product.tags || []).filter(t => t !== 'featured') 
                                                    : [...(product.tags || []), 'featured'];
                                                  const updated = localProductsList.map(p => p.id === product.id ? { ...p, tags: newTags } : p);
                                                  saveLocalProductsList(updated);
                                                  triggerLocalToast(isFeat ? 'Removed from Featured!' : 'Marked as Featured!', 'success');
                                                }}
                                                className="mx-auto"
                                              >
                                                <Star 
                                                  size={15} 
                                                  className={isFeatured ? 'fill-amber-400 text-amber-400' : 'text-slate-300 hover:text-amber-400 transition-colors'} 
                                                />
                                              </button>
                                            </td>
                                            <td className="p-4 text-slate-400 font-medium text-[10px]">
                                              <div>May 26, 2025</div>
                                              <div className="text-[9px] mt-0.5">10:30 AM</div>
                                            </td>
                                            <td className="p-4 text-center">
                                              <div className="flex items-center justify-center gap-1">
                                                {activeStatusTab === 'trash' ? (
                                                  <>
                                                    <button 
                                                      onClick={() => handleLocalRestoreProduct(product.id)}
                                                      className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors font-bold text-[10px] border border-emerald-100 px-2"
                                                    >
                                                      Restore
                                                    </button>
                                                    <button 
                                                      onClick={() => handleLocalPermanentDeleteProduct(product.id)}
                                                      className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition-colors font-bold text-[10px] border border-rose-100 px-2"
                                                    >
                                                      Delete Forever
                                                    </button>
                                                  </>
                                                ) : (
                                                  <>
                                                    <button 
                                                      onClick={() => {
                                                        setEditingLocalProduct(product);
                                                        setLocalProductForm({
                                                          name: product.name,
                                                          sku: product.id,
                                                          price: product.price.toString(),
                                                          originalPrice: (product.originalPrice || product.price).toString(),
                                                          category: product.category,
                                                          brand: product.brand || 'Nike',
                                                          sizes: (product.sizes || []).join(', ') || 'S, M, L',
                                                          image: product.image,
                                                          description: product.description || '',
                                                          inStock: product.inStock,
                                                          status: product.inStock ? 'Published' : 'Draft',
                                                          featured: isFeatured
                                                        });
                                                        setActiveTab('products-add');
                                                      }}
                                                      className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-all"
                                                      title="Edit Details"
                                                    >
                                                      <Edit size={13} />
                                                    </button>
                                                    <button 
                                                      onClick={() => {
                                                        const pUrl = `/?category=${product.category}`;
                                                        window.open(pUrl, '_blank');
                                                      }}
                                                      className="p-1.5 hover:bg-slate-50 text-slate-600 rounded-lg transition-all"
                                                      title="Preview on Store"
                                                    >
                                                      <Eye size={13} />
                                                    </button>
                                                    <button 
                                                      onClick={() => handleLocalDeleteProduct(product.id)}
                                                      className="p-1.5 hover:bg-rose-50 text-rose-500 hover:text-rose-600 rounded-lg transition-all"
                                                      title="Move to Trash"
                                                    >
                                                      <Trash2 size={13} />
                                                    </button>
                                                  </>
                                                )}
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            ) : (
                              /* Grid Layout */
                              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {paginated.length === 0 ? (
                                  <div className="col-span-full p-10 text-center text-slate-400">
                                    <p className="font-semibold text-xs">No products found.</p>
                                  </div>
                                ) : (
                                  paginated.map(p => (
                                    <div key={p.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs transition-shadow bg-slate-50/20 text-left">
                                      <div className="relative">
                                        <img src={p.image} alt={p.name} className="w-full h-44 object-cover" referrerPolicy="no-referrer" />
                                        <span className={`absolute top-2 right-2 text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                          p.inStock ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                                        }`}>
                                          {p.inStock ? 'Published' : 'Draft'}
                                        </span>
                                      </div>
                                      <div className="p-3.5 space-y-2">
                                        <div className="text-[10px] text-blue-600 font-bold uppercase">{p.category}</div>
                                        <h3 className="font-bold text-slate-800 text-xs line-clamp-1">{p.name}</h3>
                                        <div className="flex items-center justify-between">
                                          <span className="font-black text-slate-900 text-xs">Rs. {p.price.toLocaleString()}</span>
                                          <span className="text-[10px] text-slate-400">Stock: {p.price % 10 + 2}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100 flex justify-end gap-1.5">
                                          <button 
                                            onClick={() => {
                                              setEditingLocalProduct(p);
                                              setLocalProductForm({
                                                name: p.name,
                                                sku: p.id,
                                                price: p.price.toString(),
                                                originalPrice: (p.originalPrice || p.price).toString(),
                                                category: p.category,
                                                brand: p.brand || 'Nike',
                                                sizes: (p.sizes || []).join(', ') || 'S, M, L',
                                                image: p.image,
                                                description: p.description || '',
                                                inStock: p.inStock,
                                                status: p.inStock ? 'Published' : 'Draft',
                                                featured: p.tags?.includes('featured') || false
                                              });
                                              setActiveTab('products-add');
                                            }}
                                            className="p-1 px-2 border border-blue-200 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-50"
                                          >
                                            Edit
                                          </button>
                                          <button 
                                            onClick={() => handleLocalDeleteProduct(p.id)}
                                            className="p-1 px-2 border border-rose-200 text-rose-500 rounded-lg text-[10px] font-bold hover:bg-rose-50"
                                          >
                                            Trash
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            )}

                            {/* Pagination bar */}
                            <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50/10">
                              <span className="text-[11px] font-bold text-slate-400">
                                Showing {filtered.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filtered.length)} of {filtered.length} products
                              </span>

                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                  disabled={currentPage === 1}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                  Prev
                                </button>
                                {Array.from({ length: totalPages }).map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setCurrentPage(idx + 1)}
                                    className={`w-7 h-7 flex items-center justify-center text-[11px] font-black rounded-lg transition-all ${
                                      currentPage === idx + 1 
                                        ? 'bg-blue-600 text-white font-black shadow-2xs' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                    }`}
                                  >
                                    {idx + 1}
                                  </button>
                                ))}
                                <button 
                                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                  disabled={currentPage === totalPages}
                                  className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-[11px] font-bold rounded-lg text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- SUBTAB 2: ADD / EDIT PRODUCT FORM ----------------- */}
              {activeTab === 'products-add' && (
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-sm space-y-6 text-left">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-base font-black text-slate-800 uppercase tracking-widest">
                      {editingLocalProduct ? `Edit Product: ${editingLocalProduct.name}` : 'Create New Product'}
                    </h2>
                    <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                      Configure details, sizes, pricing parameters, and upload product graphics instantly.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Image Upload Block left column */}
                    <div className="md:col-span-1 space-y-4">
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">Product Image</label>
                      
                      <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center transition-all flex flex-col items-center justify-center min-h-[220px] bg-slate-50/40 relative overflow-hidden group">
                        {localProductForm.image ? (
                          <div className="w-full h-full absolute inset-0 bg-white z-10 flex flex-col items-center justify-center">
                            <img 
                              src={localProductForm.image} 
                              alt="Product Preview" 
                              className="w-full h-full object-contain p-2" 
                              referrerPolicy="no-referrer"
                            />
                            <button 
                              onClick={() => setLocalProductForm({ ...localProductForm, image: '' })}
                              className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1 shadow hover:bg-rose-600 active:scale-90 transition-all z-20"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2 flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                              <ImageIcon size={18} />
                            </div>
                            <div className="text-xs">
                              <label className="text-blue-600 font-extrabold cursor-pointer hover:underline">
                                Browse Image File
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (url) => setLocalProductForm({ ...localProductForm, image: url }))}
                                  className="hidden" 
                                />
                              </label>
                            </div>
                            <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                              PNG, JPG or WEBP. Max 2MB size limit is recommended. Fits to canvas ratio.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">or Paste Image URL</label>
                        <input 
                          type="text" 
                          value={localProductForm.image}
                          onChange={(e) => setLocalProductForm({ ...localProductForm, image: e.target.value })}
                          placeholder="https://images.unsplash.com/..." 
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Inputs Block right column */}
                    <div className="md:col-span-2 space-y-4 text-xs font-semibold text-slate-700">
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Product Title / Name</label>
                          <input 
                            type="text" 
                            required
                            value={localProductForm.name}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, name: e.target.value })}
                            placeholder="e.g. Classic Pique Polo T-Shirt" 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">SKU Code / Model ID</label>
                          <input 
                            type="text" 
                            value={localProductForm.sku}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, sku: e.target.value })}
                            placeholder="e.g. AD-GC20-WHT" 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Category</label>
                          <select 
                            value={localProductForm.category}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, category: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                          >
                            {localProductCategories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Brand Name</label>
                          <select 
                            value={localProductForm.brand}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, brand: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                          >
                            {localProductBrands.map(b => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Sizes (Comma Separated)</label>
                          <input 
                            type="text" 
                            value={localProductForm.sizes}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, sizes: e.target.value })}
                            placeholder="e.g. S, M, L, XL or 40, 41, 42, 43" 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Selling Price (Rs.)</label>
                          <input 
                            type="number" 
                            required
                            value={localProductForm.price}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, price: e.target.value })}
                            placeholder="e.g. 6499" 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Original Price (M.R.P.) (Rs.)</label>
                          <input 
                            type="number" 
                            value={localProductForm.originalPrice}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, originalPrice: e.target.value })}
                            placeholder="e.g. 7999" 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-bold"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Product Description</label>
                          <textarea 
                            rows={3}
                            value={localProductForm.description}
                            onChange={(e) => setLocalProductForm({ ...localProductForm, description: e.target.value })}
                            placeholder="Provide details about product fabric, stitching, origin, fit parameters, and shoe sizes..." 
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                          />
                        </div>

                        <div className="col-span-2 p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="block text-xs font-black text-slate-800">Publish Immediately</span>
                            <span className="block text-[10px] text-slate-400 font-semibold">Make this item live on the public-facing storefront catalog immediately.</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setLocalProductForm({ ...localProductForm, inStock: !localProductForm.inStock })}
                            className={`w-10 h-5 rounded-full p-0.5 transition-all cursor-pointer ${localProductForm.inStock ? 'bg-blue-600' : 'bg-slate-300'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${localProductForm.inStock ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>

                        <div className="col-span-2 p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="block text-xs font-black text-slate-800">Mark as Featured Product</span>
                            <span className="block text-[10px] text-slate-400 font-semibold">Highlight this product in the home page featured collections grids.</span>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setLocalProductForm({ ...localProductForm, featured: !localProductForm.featured })}
                            className={`w-10 h-5 rounded-full p-0.5 transition-all cursor-pointer ${localProductForm.featured ? 'bg-amber-500' : 'bg-slate-300'}`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-all ${localProductForm.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                        <button 
                          type="button"
                          onClick={() => setActiveTab('products-all')}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-lg text-[10px] tracking-wider uppercase transition-all"
                        >
                          Cancel
                        </button>
                        <button 
                          type="button"
                          onClick={() => {
                            if (!localProductForm.name) {
                              triggerLocalToast('Please fill out the Product Title.', 'error');
                              return;
                            }
                            if (!localProductForm.price) {
                              triggerLocalToast('Please specify the Product Selling Price.', 'error');
                              return;
                            }

                            const cleanCategory = localProductForm.category.toLowerCase().split(' ')[0] as any; // maps 'Men Shoes' to 'men' or 'shoes' etc

                            if (editingLocalProduct) {
                              // Edit exist
                              const updated = localProductsList.map(p => {
                                if (p.id === editingLocalProduct.id) {
                                  return {
                                    ...p,
                                    name: localProductForm.name,
                                    price: parseFloat(localProductForm.price),
                                    originalPrice: parseFloat(localProductForm.originalPrice || localProductForm.price),
                                    category: cleanCategory,
                                    brand: localProductForm.brand,
                                    sizes: localProductForm.sizes.split(',').map(s => s.trim()).filter(Boolean),
                                    inStock: localProductForm.inStock,
                                    image: localProductForm.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120',
                                    description: localProductForm.description,
                                    tags: localProductForm.featured ? ['featured'] : []
                                  };
                                }
                                return p;
                              });
                              saveLocalProductsList(updated);
                              triggerLocalToast('Product details updated successfully!', 'success');
                            } else {
                              // Add new
                              const newProdId = 'prod-' + (localProductForm.sku || Math.random().toString(36).slice(2, 9)).toLowerCase();
                              const newProduct: Product = {
                                id: newProdId,
                                name: localProductForm.name,
                                price: parseFloat(localProductForm.price),
                                originalPrice: parseFloat(localProductForm.originalPrice || localProductForm.price),
                                category: cleanCategory,
                                brand: localProductForm.brand,
                                sizes: localProductForm.sizes.split(',').map(s => s.trim()).filter(Boolean),
                                inStock: localProductForm.inStock,
                                rating: 4.5,
                                image: localProductForm.image || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=120',
                                description: localProductForm.description,
                                tags: localProductForm.featured ? ['featured'] : []
                              };
                              saveLocalProductsList([newProduct, ...localProductsList]);
                              triggerLocalToast('New product added to store inventory!', 'success');
                            }

                            setActiveTab('products-all');
                          }}
                          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg text-[10px] tracking-wider uppercase shadow-md transition-all active:scale-95"
                        >
                          {editingLocalProduct ? 'Save Changes' : 'Publish Product'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- SUBTAB 3: CATEGORIES MANAGER ----------------- */}
              {activeTab === 'products-categories' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Add Product Category</h3>
                    <div className="space-y-3 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Category Name</label>
                        <input 
                          type="text" 
                          id="new-cat-title"
                          placeholder="e.g. Leather Shoes" 
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          const input = document.getElementById('new-cat-title') as HTMLInputElement;
                          if (input && input.value) {
                            if (localProductCategories.includes(input.value)) {
                              triggerLocalToast('Category already exists!', 'error');
                              return;
                            }
                            const updated = [...localProductCategories, input.value];
                            saveLocalProductCategories(updated);
                            triggerLocalToast('New product category created!', 'success');
                            input.value = '';
                          }
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2 rounded-lg text-[10px] uppercase tracking-wider"
                      >
                        Create Category
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Product Categories Grid</h3>
                    <div className="divide-y divide-slate-100 text-xs font-semibold">
                      {localProductCategories.map(cat => (
                        <div key={cat} className="py-2.5 flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-sm">{cat}</span>
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete Category "${cat}"?`)) {
                                const updated = localProductCategories.filter(item => item !== cat);
                                saveLocalProductCategories(updated);
                                triggerLocalToast('Category deleted successfully!', 'success');
                              }
                            }}
                            className="text-rose-500 hover:text-rose-600 hover:underline text-[10px] font-black uppercase"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- SUBTAB 4: BRANDS MANAGER ----------------- */}
              {activeTab === 'products-brands' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Add Product Brand</h3>
                    <div className="space-y-3 text-xs font-semibold text-slate-700">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1">Brand Name</label>
                        <input 
                          type="text" 
                          id="new-brand-title"
                          placeholder="e.g. Under Armour" 
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          const input = document.getElementById('new-brand-title') as HTMLInputElement;
                          if (input && input.value) {
                            if (localProductBrands.includes(input.value)) {
                              triggerLocalToast('Brand already exists!', 'error');
                              return;
                            }
                            const updated = [...localProductBrands, input.value];
                            saveLocalProductBrands(updated);
                            triggerLocalToast('New brand created!', 'success');
                            input.value = '';
                          }
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-2 rounded-lg text-[10px] uppercase tracking-wider"
                      >
                        Create Brand
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Product Brands Grid</h3>
                    <div className="divide-y divide-slate-100 text-xs font-semibold">
                      {localProductBrands.map(b => (
                        <div key={b} className="py-2.5 flex items-center justify-between">
                          <span className="font-bold text-slate-800 text-sm">{b}</span>
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete Brand "${b}"?`)) {
                                const updated = localProductBrands.filter(item => item !== b);
                                saveLocalProductBrands(updated);
                                triggerLocalToast('Brand deleted successfully!', 'success');
                              }
                            }}
                            className="text-rose-500 hover:text-rose-600 hover:underline text-[10px] font-black uppercase"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- SUBTAB 5: ATTRIBUTES MANAGER ----------------- */}
              {activeTab === 'products-attributes' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3">
                    Store Product Attributes
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Set up size grids, primary garment colors, and packaging weights that are globally referenced inside product configuration dropdowns.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="p-4 border border-slate-100 bg-slate-50/40 rounded-xl space-y-3">
                      <span className="font-black text-slate-800 uppercase tracking-wider block">Sizes Attribute</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['S', 'M', 'L', 'XL', 'XXL', '38', '40', '41', '42', '43', '44'].map(sz => (
                          <span key={sz} className="bg-white border border-slate-200 font-mono text-[10px] font-bold px-2 py-1 rounded">
                            {sz}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border border-slate-100 bg-slate-50/40 rounded-xl space-y-3">
                      <span className="font-black text-slate-800 uppercase tracking-wider block">Garment Colors</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['Black', 'White', 'Blue', 'Crimson Red', 'Emerald Green', 'Royal Navy', 'Pink'].map(clr => (
                          <span key={clr} className="bg-white border border-slate-200 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full border border-slate-300" style={{ backgroundColor: clr.toLowerCase().includes('blue') ? '#2563eb' : clr.toLowerCase().includes('black') ? '#000000' : clr.toLowerCase().includes('navy') ? '#1e3a8a' : clr.toLowerCase().includes('red') ? '#dc2626' : clr.toLowerCase().includes('pink') ? '#ec4899' : clr.toLowerCase().includes('green') ? '#10b981' : '#ffffff' }}></span>
                            <span>{clr}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border border-slate-100 bg-slate-50/40 rounded-xl space-y-3">
                      <span className="font-black text-slate-800 uppercase tracking-wider block">Materials</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {['100% Pique Cotton', 'Premium Mesh Fabric', 'Genuine Suede Leather', 'Nylon Canvas', 'Synthetic Rubber Sole'].map(m => (
                          <span key={m} className="bg-white border border-slate-200 text-[10px] font-bold px-2 py-1 rounded">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- SUBTAB 6: VARIANTS GENERATOR ----------------- */}
              {activeTab === 'products-variants' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3 font-sans">
                    Product Variant Matrix
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Auto-generate pricing matrix combinations based on garment colors and sneaker shoe size parameters.
                  </p>
                  
                  <div className="border border-slate-100 rounded-xl overflow-hidden text-xs">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-400 font-bold border-b border-slate-100">
                          <th className="p-3 text-left">Variant Combination</th>
                          <th className="p-3 text-left">Generated SKU</th>
                          <th className="p-3 text-left">Price Override (Rs.)</th>
                          <th className="p-3 text-left">Stock Level</th>
                          <th className="p-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {[
                          { comb: 'Adidas Grand Court - Blue / Size 40', sku: 'AD-GC20-BLU-40', price: 'Rs. 28,750', stock: '25 in stock' },
                          { comb: 'Adidas Grand Court - Blue / Size 42', sku: 'AD-GC20-BLU-42', price: 'Rs. 28,750', stock: '18 in stock' },
                          { comb: 'Adidas Grand Court - White / Size 41', sku: 'AD-GC20-WHT-41', price: 'Rs. 28,750', stock: '44 in stock' },
                          { comb: 'Classic Pique Polo - Black / Size S', sku: 'PQ-PL-BLK-S', price: 'Rs. 2,235', stock: '128 in stock' },
                          { comb: 'Classic Pique Polo - White / Size M', sku: 'PQ-PL-WHT-M', price: 'Rs. 2,235', stock: '89 in stock' }
                        ].map(row => (
                          <tr key={row.sku} className="hover:bg-slate-50/50">
                            <td className="p-3 font-bold text-slate-800">{row.comb}</td>
                            <td className="p-3 font-mono text-[11px] text-slate-400">{row.sku}</td>
                            <td className="p-3 font-black text-slate-800">{row.price}</td>
                            <td className="p-3 text-emerald-600 font-bold">{row.stock}</td>
                            <td className="p-3 text-center">
                              <span className="bg-emerald-50 text-emerald-600 text-[9px] font-black px-2 py-0.5 rounded border border-emerald-100">ACTIVE</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- SUBTAB 7: BULK IMPORT ----------------- */}
              {activeTab === 'products-bulk-import' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-6 text-slate-800">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Upload size={22} className="stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-black uppercase tracking-widest text-slate-800 font-sans">
                      JSON / CSV Product Bulk Importer
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold max-w-md mx-auto leading-relaxed">
                      Upload formatted catalog inventories directly to instantly append new shoe or readymade garment models into your store.
                    </p>
                  </div>

                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/40 hover:bg-slate-50 transition-all flex flex-col items-center justify-center space-y-3 cursor-pointer">
                    <p className="text-xs font-black text-slate-500">Drag &amp; drop file here, or click to browse</p>
                    <p className="text-[10px] text-slate-400 font-semibold">Supported formats: .json, .csv (Max 5MB)</p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => {
                        // Quick append some cool products to simulate seed
                        const seedItems: Product[] = [
                          {
                            id: 'seed-nike-air',
                            name: 'Nike Air Max Excee Sneaker',
                            price: 18500,
                            originalPrice: 22000,
                            category: 'shoes',
                            rating: 4.8,
                            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=300',
                            sizes: ['40', '41', '42'],
                            inStock: true,
                            brand: 'Nike',
                            description: 'Modern sleek comfort Nike Max technology.'
                          },
                          {
                            id: 'seed-adidas-tee',
                            name: 'Adidas Aeroready Active Tee',
                            price: 4800,
                            originalPrice: 6000,
                            category: 'men',
                            rating: 4.6,
                            image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=300',
                            sizes: ['S', 'M', 'L'],
                            inStock: true,
                            brand: 'Adidas',
                            description: 'Sweat-wicking moisture proof tech wear.'
                          }
                        ];
                        const updated = [...seedItems, ...localProductsList];
                        saveLocalProductsList(updated);
                        triggerLocalToast('Successfully imported 2 bulk products!', 'success');
                        setActiveTab('products-all');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-black py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                    >
                      Import Sample Catalog Seed
                    </button>
                    <button 
                      onClick={() => setActiveTab('products-all')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-2.5 px-6 rounded-xl text-[10px] uppercase tracking-wider transition-all"
                    >
                      Back to Products
                    </button>
                  </div>
                </div>
              )}

              {/* ----------------              {activeTab === 'products-reviews' && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-4">
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3">
                    Product Reviews Moderation Panel
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                    Approve, reply to, or delete feedback posted on readymade garment clothing and shoe item pages.
                  </p>
                  
                  <div className="divide-y divide-slate-100 text-xs">
                    {[
                      { user: 'Bishal Karki', rating: 5, date: 'May 25, 2025', comment: 'Perfect fit! Highly recommend purchasing Adidas shoes from this store.', product: 'Adidas Grand Court 2.0' },
                      { user: 'Sita Pyakurel', rating: 4, date: 'May 24, 2025', comment: 'Quality of the pique fabric t-shirt is superb, color remains bright after washing.', product: 'Pique Polo T-Shirt' },
                      { user: 'Ramesh Shrestha', rating: 3, date: 'May 22, 2025', comment: 'The backpack has good space but the zipper is slightly stiff.', product: 'Urban Backpack' }
                    ].map((rev, index) => (
                      <div key={index} className="py-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4 font-semibold">
                        <div className="space-y-1.5 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm">{rev.user}</span>
                            <span className="text-[10px] text-slate-400">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-0.5 text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} size={12} className="fill-current" />)}
                          </div>
                          <p className="text-slate-600 font-medium leading-relaxed italic">&quot;{rev.comment}&quot;</p>
                          <div className="text-[10px] text-blue-600 font-bold uppercase">Product: {rev.product}</div>
                        </div>
                        <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                          <button 
                            onClick={() => triggerLocalToast('Review approved!', 'success')}
                            className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100 rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => triggerLocalToast('Review deleted!', 'success')}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100 rounded-lg px-2.5 py-1.5 text-[10px] font-black uppercase"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM CATEGORIES LIST PAGE (EXACT SAME AS IMAGE) ----------------- */}
              {activeTab === 'categories-all' && (
                <div className="space-y-6 animate-fade-in text-left">
                  {/* Title & Actions Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Categories</h1>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                        <span>Dashboard</span>
                        <ChevronRight size={10} />
                        <span>Categories</span>
                        <ChevronRight size={10} />
                        <span className="text-blue-600 font-black">All Categories</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const fileInput = document.createElement('input');
                          fileInput.type = 'file';
                          fileInput.accept = '.json';
                          fileInput.onchange = (e: any) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event: any) => {
                                try {
                                  const list = JSON.parse(event.target.result);
                                  if (Array.isArray(list)) {
                                    saveAdminCategories([...list, ...adminCategories]);
                                    triggerLocalToast('Categories imported successfully!', 'success');
                                  }
                                } catch {
                                  triggerLocalToast('Invalid file format!', 'error');
                                }
                              };
                              reader.readAsText(file);
                            }
                          };
                          fileInput.click();
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs tracking-tight shadow-2xs flex items-center gap-1.5 transition-all"
                      >
                        <Upload size={13} />
                        <span>Import Categories</span>
                      </button>
                      <button 
                        onClick={() => {
                          const blob = new Blob([JSON.stringify(adminCategories, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const link = document.createElement('a');
                          link.href = url;
                          link.download = 'lucky_categories_export.json';
                          link.click();
                          triggerLocalToast('Categories data exported!', 'success');
                        }}
                        className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs tracking-tight shadow-2xs flex items-center gap-1.5 transition-all"
                      >
                        <Download size={13} />
                        <span>Export Categories</span>
                      </button>
                      <button 
                        onClick={() => setActiveTab('categories-add')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <Plus size={14} className="stroke-[3]" />
                        <span>Add New Category</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Categories</span>
                        <div className="text-2xl font-black text-slate-800">{adminCategories.length}</div>
                        <span className="text-[10px] text-slate-400 font-semibold block">View all categories</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                        <Tag size={20} />
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Categories</span>
                        <div className="text-2xl font-black text-emerald-600">
                          {adminCategories.filter(c => c.status === 'Active').length}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Active and visible</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                        <Eye size={20} />
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inactive Categories</span>
                        <div className="text-2xl font-black text-orange-500">
                          {adminCategories.filter(c => c.status === 'Inactive').length}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Hidden from menu</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center border border-orange-100">
                        <EyeOff size={20} />
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Subcategories</span>
                        <div className="text-2xl font-black text-purple-600">
                          {adminCategories.filter(c => !c.isRoot).length}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold block">Across all categories</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                        <Layers size={20} />
                      </div>
                    </div>
                  </div>

                  {/* Main Grid: Category Tree (Left) & Categories List (Right) */}
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT COLUMN: CATEGORY TREE CARD */}
                    <div className="xl:col-span-3 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                        <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest">Category Tree</h2>
                        <Layers size={14} className="text-slate-400" />
                      </div>

                      <div className="space-y-4 mt-4">
                        {adminCategories.filter(c => c.isRoot).map(root => {
                          const subList = adminCategories.filter(c => !c.isRoot && c.parentCategory.toLowerCase() === root.name.toLowerCase());
                          return (
                            <div key={root.id} className="space-y-2 text-xs font-semibold">
                              
                              {/* Root Item */}
                              <div className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                                <div className="flex items-center gap-2">
                                  {root.image ? (
                                    <img src={root.image} alt={root.name} className="w-5 h-5 rounded-md object-cover border border-slate-200" referrerPolicy="no-referrer" />
                                  ) : (
                                    <Folder size={14} className="text-blue-500 fill-blue-50" />
                                  )}
                                  <span className="font-bold text-slate-800 text-sm">{root.name}</span>
                                  <span className="text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1 py-0.2 rounded font-black uppercase">Root</span>
                                </div>
                                <span className="bg-slate-100 text-slate-500 font-mono text-[9px] px-1.5 py-0.5 rounded-full">{subList.length}</span>
                              </div>

                              {/* Nested Subcategories List with Connection Branches */}
                              {subList.length > 0 && (
                                <div className="pl-6 border-l-2 border-dashed border-slate-100 ml-4 space-y-2 py-1">
                                  {subList.map(sub => (
                                    <div key={sub.id} className="flex items-center justify-between p-1.5 hover:bg-slate-50 rounded-lg relative before:absolute before:left-[-12px] before:top-1/2 before:w-[8px] before:h-px before:bg-slate-200">
                                      <div className="flex items-center gap-1.5">
                                        {sub.image ? (
                                          <img src={sub.image} alt={sub.name} className="w-4 h-4 rounded-md object-cover" referrerPolicy="no-referrer" />
                                        ) : (
                                          <Folder size={12} className="text-slate-400 fill-slate-50" />
                                        )}
                                        <span className="text-slate-600 text-xs">{sub.name}</span>
                                      </div>
                                      <span className="text-[9px] text-blue-500 font-mono font-bold">{sub.productsCount} items</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <button 
                        onClick={() => {
                          setEditingCategory(null);
                          setCategoryForm({
                            name: '',
                            slug: '',
                            isRoot: true,
                            parentCategory: '—',
                            productsCount: 0,
                            status: 'Active',
                            sortOrder: adminCategories.length + 1,
                            image: '',
                            iconColor: 'blue',
                            iconType: 'user'
                          });
                          setIsCategoryModalOpen(true);
                        }}
                        className="w-full mt-6 py-2 border border-dashed border-blue-200 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 hover:border-blue-300 font-black rounded-xl text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Plus size={12} className="stroke-[3]" />
                        <span>Add Root Category</span>
                      </button>
                    </div>

                    {/* RIGHT COLUMN: CATEGORIES TABLE LIST */}
                    <div className="xl:col-span-9 space-y-4">
                      
                      {/* Controls and Filtering Bar */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
                        
                        {/* Bulk Action Controls */}
                        <div className="flex items-center gap-2">
                          <select 
                            value={categoriesBulkAction}
                            onChange={(e) => setCategoriesBulkAction(e.target.value)}
                            className="bg-slate-50 border border-slate-200 text-xs font-semibold px-3 py-2 rounded-lg focus:outline-none cursor-pointer"
                          >
                            <option>Bulk Actions</option>
                            <option>Activate Selected</option>
                            <option>Deactivate Selected</option>
                            <option>Delete Selected</option>
                          </select>
                          <button 
                            onClick={() => {
                              if (categoriesSelectedIds.length === 0) {
                                triggerLocalToast('No categories selected!', 'error');
                                return;
                              }
                              if (categoriesBulkAction === 'Activate Selected') {
                                const updated = adminCategories.map(c => categoriesSelectedIds.includes(c.id) ? { ...c, status: 'Active' } : c);
                                saveAdminCategories(updated);
                                triggerLocalToast('Selected categories activated!', 'success');
                              } else if (categoriesBulkAction === 'Deactivate Selected') {
                                const updated = adminCategories.map(c => categoriesSelectedIds.includes(c.id) ? { ...c, status: 'Inactive' } : c);
                                saveAdminCategories(updated);
                                triggerLocalToast('Selected categories hidden!', 'success');
                              } else if (categoriesBulkAction === 'Delete Selected') {
                                if (confirm('Are you sure you want to delete selected categories?')) {
                                  const updated = adminCategories.filter(c => !categoriesSelectedIds.includes(c.id));
                                  saveAdminCategories(updated);
                                  triggerLocalToast('Selected categories deleted!', 'success');
                                }
                              }
                              setCategoriesSelectedIds([]);
                            }}
                            className="bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 text-xs px-3.5 py-2 rounded-lg transition-all"
                          >
                            Apply
                          </button>
                        </div>

                        {/* Search and Layout Grid/List selectors */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="relative">
                            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="text"
                              value={categoriesSearch}
                              onChange={(e) => setCategoriesSearch(e.target.value)}
                              placeholder="Search category name, slug..."
                              className="bg-slate-50 border border-slate-200 text-xs font-semibold pl-8 pr-3 py-2 rounded-lg focus:outline-none w-48 sm:w-60 focus:bg-white focus:border-blue-400 transition-all"
                            />
                          </div>

                          <button 
                            onClick={() => triggerLocalToast('Filters fully operational!', 'success')}
                            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-lg transition-all"
                            title="More Filters"
                          >
                            <Filter size={14} />
                          </button>

                          <div className="flex border border-slate-200 rounded-lg overflow-hidden shrink-0">
                            <button 
                              onClick={() => setCategoriesViewLayout('grid')}
                              className={`p-2 transition-all ${categoriesViewLayout === 'grid' ? 'bg-slate-100 text-blue-600' : 'bg-white hover:bg-slate-50 text-slate-400'}`}
                            >
                              <Layers size={13} />
                            </button>
                            <button 
                              onClick={() => setCategoriesViewLayout('list')}
                              className={`p-2 transition-all ${categoriesViewLayout === 'list' ? 'bg-slate-100 text-blue-600' : 'bg-white hover:bg-slate-50 text-slate-400'}`}
                            >
                              <GripVertical size={13} />
                            </button>
                          </div>

                          <select 
                            value={categoriesItemsPerPage}
                            onChange={(e) => {
                              setCategoriesItemsPerPage(Number(e.target.value));
                              setCategoriesCurrentPage(1);
                            }}
                            className="bg-slate-50 border border-slate-200 text-xs font-semibold px-2.5 py-2 rounded-lg focus:outline-none cursor-pointer"
                          >
                            <option value={10}>10 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={50}>50 per page</option>
                          </select>
                        </div>
                      </div>

                      {/* CATEGORIES GRID MODE OR LIST MODE VIEWPORT */}
                      {categoriesViewLayout === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {paginatedCategories.map(cat => (
                            <div key={cat.id} className="bg-white border border-slate-200 rounded-2xl p-5 text-center space-y-3.5 shadow-2xs relative">
                              <input 
                                type="checkbox"
                                checked={categoriesSelectedIds.includes(cat.id)}
                                onChange={() => {
                                  const updated = categoriesSelectedIds.includes(cat.id)
                                    ? categoriesSelectedIds.filter(id => id !== cat.id)
                                    : [...categoriesSelectedIds, cat.id];
                                  setCategoriesSelectedIds(updated);
                                }}
                                className="absolute left-4 top-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                              />

                              <div className="mx-auto w-14 h-14 rounded-2xl border border-slate-100 bg-slate-50/50 flex items-center justify-center shadow-2xs overflow-hidden">
                                {cat.image ? (
                                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                ) : (
                                  <div className="text-blue-600 font-bold text-lg">{cat.name[0]}</div>
                                )}
                              </div>

                              <div>
                                <h3 className="font-black text-slate-800 text-sm flex items-center justify-center gap-1.5">
                                  <span>{cat.name}</span>
                                  {cat.isRoot && (
                                    <span className="text-[8px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1 py-0.1 rounded font-black uppercase">Root</span>
                                  )}
                                </h3>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">slug: {cat.slug}</p>
                              </div>

                              <div className="text-xs font-bold text-slate-500 bg-slate-50 rounded-xl py-1 px-3 inline-block">
                                <span className="text-blue-600">{cat.productsCount}</span> products
                              </div>

                              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  cat.status === 'Active' 
                                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                    : 'bg-slate-50 text-slate-500 border border-slate-100'
                                }`}>
                                  {cat.status}
                                </span>

                                <div className="flex items-center gap-1">
                                  <button 
                                    onClick={() => {
                                      setEditingCategory(cat);
                                      setCategoryForm({
                                        name: cat.name,
                                        slug: cat.slug,
                                        isRoot: cat.isRoot,
                                        parentCategory: cat.parentCategory,
                                        productsCount: cat.productsCount,
                                        status: cat.status,
                                        sortOrder: cat.sortOrder,
                                        image: cat.image || '',
                                        iconColor: cat.iconColor || 'blue',
                                        iconType: cat.iconType || 'user'
                                      });
                                      setIsCategoryModalOpen(true);
                                    }}
                                    className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                                    title="Edit"
                                  >
                                    <Edit size={12} />
                                  </button>
                                  <button 
                                    onClick={() => {
                                      if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                                        const updated = adminCategories.filter(item => item.id !== cat.id);
                                        saveAdminCategories(updated);
                                        triggerLocalToast('Category deleted!', 'success');
                                      }
                                    }}
                                    className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 rounded-lg transition-all"
                                    title="Delete"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                              <tr>
                                <th className="p-4 w-10">
                                  <input 
                                    type="checkbox"
                                    checked={categoriesSelectedIds.length === paginatedCategories.length && paginatedCategories.length > 0}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setCategoriesSelectedIds(paginatedCategories.map(c => c.id));
                                      } else {
                                        setCategoriesSelectedIds([]);
                                      }
                                    }}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                  />
                                </th>
                                <th className="p-4 w-12">#</th>
                                <th className="p-4 w-16">Image</th>
                                <th className="p-4">Category Name</th>
                                <th className="p-4">Slug</th>
                                <th className="p-4">Parent Category</th>
                                <th className="p-4">Products</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 w-20">Sort Order</th>
                                <th className="p-4 text-right pr-6 w-28">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                              {paginatedCategories.map((cat, idx) => (
                                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-4">
                                    <input 
                                      type="checkbox"
                                      checked={categoriesSelectedIds.includes(cat.id)}
                                      onChange={() => {
                                        const updated = categoriesSelectedIds.includes(cat.id)
                                          ? categoriesSelectedIds.filter(id => id !== cat.id)
                                          : [...categoriesSelectedIds, cat.id];
                                        setCategoriesSelectedIds(updated);
                                      }}
                                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                  </td>
                                  <td className="p-4 text-slate-400 font-mono">{(categoriesCurrentPage - 1) * categoriesItemsPerPage + idx + 1}</td>
                                  <td className="p-4">
                                    <div className="w-10 h-10 rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50 flex items-center justify-center shrink-0">
                                      {cat.image ? (
                                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                      ) : (
                                        <div className="w-full h-full bg-blue-50 text-blue-600 font-bold text-sm flex items-center justify-center">
                                          {cat.name[0]}
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-4 font-bold text-slate-800">
                                    <div className="flex items-center gap-1.5">
                                      <span>{cat.name}</span>
                                      {cat.isRoot && (
                                        <span className="text-[8px] bg-emerald-50 text-emerald-600 border border-emerald-100 px-1.5 py-0.5 rounded font-black uppercase">Root</span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="p-4 text-slate-400 font-mono font-medium">{cat.slug}</td>
                                  <td className="p-4 text-slate-500 font-semibold">{cat.parentCategory}</td>
                                  <td className="p-4">
                                    <span className="text-blue-600 font-bold hover:underline cursor-pointer">
                                      {cat.productsCount}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                      cat.status === 'Active' 
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                        : 'bg-slate-50 text-slate-500 border border-slate-100'
                                    }`}>
                                      {cat.status}
                                    </span>
                                  </td>
                                  <td className="p-4">
                                    <input 
                                      type="number"
                                      value={cat.sortOrder}
                                      onChange={(e) => {
                                        const updatedOrder = Number(e.target.value);
                                        const updatedList = adminCategories.map(c => c.id === cat.id ? { ...c, sortOrder: updatedOrder } : c);
                                        saveAdminCategories(updatedList);
                                      }}
                                      className="w-12 px-1 py-0.5 border border-slate-200 rounded text-center focus:outline-none"
                                    />
                                  </td>
                                  <td className="p-4 text-right pr-6">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button 
                                        onClick={() => {
                                          setEditingCategory(cat);
                                          setCategoryForm({
                                            name: cat.name,
                                            slug: cat.slug,
                                            isRoot: cat.isRoot,
                                            parentCategory: cat.parentCategory,
                                            productsCount: cat.productsCount,
                                            status: cat.status,
                                            sortOrder: cat.sortOrder,
                                            image: cat.image || '',
                                            iconColor: cat.iconColor || 'blue',
                                            iconType: cat.iconType || 'user'
                                          });
                                          setIsCategoryModalOpen(true);
                                        }}
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        title="Edit"
                                      >
                                        <Edit size={14} />
                                      </button>
                                      <button 
                                        onClick={() => {
                                          if (confirm(`Are you sure you want to delete category "${cat.name}"?`)) {
                                            const updated = adminCategories.filter(item => item.id !== cat.id);
                                            saveAdminCategories(updated);
                                            triggerLocalToast('Category deleted successfully!', 'success');
                                          }
                                        }}
                                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                        title="Delete"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <button className="p-1.5 text-slate-300 cursor-grab" title="Drag to reorder">
                                        <GripVertical size={14} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Dynamic Pagination details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 text-xs font-semibold text-slate-400">
                        <span>
                          Showing {startIndex + 1} to {Math.min(startIndex + categoriesItemsPerPage, totalCategoriesCount)} of {totalCategoriesCount} categories
                        </span>
                        
                        {totalPages > 1 && (
                          <div className="flex items-center gap-1">
                            <button 
                              disabled={categoriesCurrentPage === 1}
                              onClick={() => setCategoriesCurrentPage(categoriesCurrentPage - 1)}
                              className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg disabled:opacity-50 transition-all font-black"
                            >
                              &lt;
                            </button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                              <button 
                                key={i}
                                onClick={() => setCategoriesCurrentPage(i + 1)}
                                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                  categoriesCurrentPage === i + 1 
                                    ? 'bg-blue-600 border-blue-600 text-white font-black' 
                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}
                            <button 
                              disabled={categoriesCurrentPage === totalPages}
                              onClick={() => setCategoriesCurrentPage(categoriesCurrentPage + 1)}
                              className="px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg disabled:opacity-50 transition-all font-black"
                            >
                              &gt;
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM CATEGORIES ADD NEW FORM PAGE ----------------- */}
              {activeTab === 'categories-add' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Add New Category</h1>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                      <span>Dashboard</span>
                      <ChevronRight size={10} />
                      <span>Categories</span>
                      <ChevronRight size={10} />
                      <span className="text-blue-600 font-black">Add New Category</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-3xl shadow-2xs space-y-6">
                    <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3">
                      Category Specifications
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-bold text-slate-700">
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Category Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Traditional Salwar" 
                          value={categoryForm.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            const slugified = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            setCategoryForm({ ...categoryForm, name: val, slug: slugified });
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Slug URL</label>
                        <input 
                          type="text" 
                          placeholder="e.g. traditional-salwar" 
                          value={categoryForm.slug}
                          onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Parent Category</label>
                        <select 
                          value={categoryForm.isRoot ? '—' : categoryForm.parentCategory}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '—') {
                              setCategoryForm({ ...categoryForm, isRoot: true, parentCategory: '—' });
                            } else {
                              setCategoryForm({ ...categoryForm, isRoot: false, parentCategory: val });
                            }
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
                        >
                          <option value="—">None (Set as Root Category)</option>
                          {adminCategories.filter(c => c.isRoot).map(r => (
                            <option key={r.id} value={r.name}>{r.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Products Count</label>
                          <input 
                            type="number" 
                            value={categoryForm.productsCount}
                            onChange={(e) => setCategoryForm({ ...categoryForm, productsCount: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Sort Order</label>
                          <input 
                            type="number" 
                            value={categoryForm.sortOrder}
                            onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Visibility Status</label>
                        <div className="flex items-center gap-4 mt-2">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="radio" 
                              name="category-status" 
                              checked={categoryForm.status === 'Active'}
                              onChange={() => setCategoryForm({ ...categoryForm, status: 'Active' })}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>Active / Visible</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input 
                              type="radio" 
                              name="category-status" 
                              checked={categoryForm.status === 'Inactive'}
                              onChange={() => setCategoryForm({ ...categoryForm, status: 'Inactive' })}
                              className="text-blue-600 focus:ring-blue-500"
                            />
                            <span>Inactive / Hidden</span>
                          </label>
                        </div>
                      </div>

                      {/* Image Upload Input */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Category Cover Image</label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {categoryForm.image ? (
                              <img src={categoryForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <ImageIcon size={20} className="text-slate-300" />
                            )}
                          </div>
                          <div className="space-y-1 flex-1">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="category-add-uploader"
                              onChange={(e) => handleFileUpload(e, (base64) => setCategoryForm({ ...categoryForm, image: base64 }))}
                              className="hidden" 
                            />
                            <label 
                              htmlFor="category-add-uploader"
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer inline-block transition-all"
                            >
                              Choose Image
                            </label>
                            {categoryForm.image && (
                              <button 
                                onClick={() => setCategoryForm({ ...categoryForm, image: '' })}
                                className="text-rose-500 hover:text-rose-600 text-[10px] block font-bold uppercase hover:underline ml-1"
                              >
                                Clear Cover Image
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5 flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setActiveTab('categories-all')}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (!categoryForm.name) {
                            triggerLocalToast('Category name is required!', 'error');
                            return;
                          }
                          const newCat = {
                            id: 'cat-' + Math.random().toString(36).slice(2, 9),
                            ...categoryForm
                          };
                          saveAdminCategories([newCat, ...adminCategories]);
                          triggerLocalToast('New category added successfully!', 'success');
                          setActiveTab('categories-all');
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
                      >
                        Create Category
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM BRANDS ADD NEW FORM PAGE ----------------- */}
              {activeTab === 'brands-add' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Add New Brand</h1>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                      <span>Dashboard</span>
                      <ChevronRight size={10} />
                      <span>Brands</span>
                      <ChevronRight size={10} />
                      <span className="text-blue-600 font-black">Add New Brand</span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-4xl shadow-2xs space-y-6">
                    <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3">
                      Brand Specifications & Design
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Brand Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Puma Premium" 
                          value={brandForm.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            const slugified = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            setBrandForm({ ...brandForm, name: val, slug: slugified });
                          }}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Slug URL</label>
                        <input 
                          type="text" 
                          placeholder="e.g. puma-premium" 
                          value={brandForm.slug}
                          onChange={(e) => setBrandForm({ ...brandForm, slug: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Primary Classification</label>
                        <select 
                          value={brandForm.category}
                          onChange={(e) => setBrandForm({ ...brandForm, category: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
                        >
                          <option value="Shoes">Shoes & Sneakers</option>
                          <option value="Apparel">Clothing & Apparel</option>
                          <option value="Accessories">Accessories & Wearables</option>
                          <option value="Kids">Kids Specialty</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Official Website URL</label>
                        <input 
                          type="url" 
                          placeholder="https://puma.com" 
                          value={brandForm.websiteUrl}
                          onChange={(e) => setBrandForm({ ...brandForm, websiteUrl: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Short Summary</label>
                        <input 
                          type="text" 
                          placeholder="High performance athletic and street style sportswear." 
                          value={brandForm.shortDescription}
                          onChange={(e) => setBrandForm({ ...brandForm, shortDescription: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Detailed Description</label>
                        <textarea 
                          placeholder="Provide a comprehensive profile of the manufacturer brand story, values, and offerings..." 
                          value={brandForm.description}
                          onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 h-28 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Sort Priority Order</label>
                          <input 
                            type="number" 
                            value={brandForm.sortOrder}
                            onChange={(e) => setBrandForm({ ...brandForm, sortOrder: Number(e.target.value) })}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Products Count (Initial)</label>
                          <input 
                            type="number" 
                            value={brandForm.productsCount}
                            onChange={(e) => setBrandForm({ ...brandForm, productsCount: Number(e.target.value) })}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-6 mt-1 justify-between">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Status</label>
                          <label className="flex items-center gap-2.5 mt-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={brandForm.status === 'Active'}
                              onChange={(e) => setBrandForm({ ...brandForm, status: e.target.checked ? 'Active' : 'Inactive' })}
                              className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-700">Set Brand as Active</span>
                          </label>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Featured</label>
                          <label className="flex items-center gap-2.5 mt-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={brandForm.featured}
                              onChange={(e) => setBrandForm({ ...brandForm, featured: e.target.checked })}
                              className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-[11px] text-slate-700">Feature on Homepage Slider</span>
                          </label>
                        </div>
                      </div>

                      {/* Brand Logo Upload */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Brand Logo Icon</label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {brandForm.logo ? (
                              <img src={brandForm.logo} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <Tag size={20} className="text-slate-300" />
                            )}
                          </div>
                          <div className="space-y-1 flex-1">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="brand-logo-add-uploader"
                              onChange={(e) => handleFileUpload(e, (base64) => setBrandForm({ ...brandForm, logo: base64 }))}
                              className="hidden" 
                            />
                            <label 
                              htmlFor="brand-logo-add-uploader"
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer inline-block transition-all"
                            >
                              Choose Image
                            </label>
                            {brandForm.logo && (
                              <button 
                                onClick={() => setBrandForm({ ...brandForm, logo: '' })}
                                className="text-rose-500 hover:text-rose-600 text-[10px] block font-bold uppercase hover:underline ml-1"
                              >
                                Clear Logo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Brand Banner Upload */}
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-400">Brand Cover Banner</label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="w-24 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {brandForm.banner ? (
                              <img src={brandForm.banner} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                              <ImageIcon size={20} className="text-slate-300" />
                            )}
                          </div>
                          <div className="space-y-1 flex-1">
                            <input 
                              type="file" 
                              accept="image/*"
                              id="brand-banner-add-uploader"
                              onChange={(e) => handleFileUpload(e, (base64) => setBrandForm({ ...brandForm, banner: base64 }))}
                              className="hidden" 
                            />
                            <label 
                              htmlFor="brand-banner-add-uploader"
                              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase tracking-wider cursor-pointer inline-block transition-all"
                            >
                              Choose Image
                            </label>
                            {brandForm.banner && (
                              <button 
                                onClick={() => setBrandForm({ ...brandForm, banner: '' })}
                                className="text-rose-500 hover:text-rose-600 text-[10px] block font-bold uppercase hover:underline ml-1"
                              >
                                Clear Banner
                              </button>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="border-t border-slate-100 pt-5 flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setActiveTab('products-brands')}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (!brandForm.name) {
                            triggerLocalToast('Brand name is required!', 'error');
                            return;
                          }
                          const newBrand = {
                            id: 'brand-' + Math.random().toString(36).slice(2, 9),
                            ...brandForm
                          };
                          saveAdminBrands([newBrand, ...adminBrands]);
                          triggerLocalToast('New brand added successfully!', 'success');
                          setActiveTab('products-brands');
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
                      >
                        Create Brand
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- HIGH-FIDELITY BRANDS MANAGER TAB (EXACT MATCH TO IMAGE) ----------------- */}
              {activeTab === 'products-brands' && (
                <div className="space-y-6 animate-fade-in text-left">
                  
                  {/* Title & Breadcrumbs Segment */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <h1 className="text-2xl font-black text-slate-900 tracking-tight">Brands</h1>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mt-0.5">
                        <span className="hover:text-blue-600 cursor-pointer">Dashboard</span>
                        <span>&gt;</span>
                        <span className="hover:text-blue-600 cursor-pointer">Brands</span>
                        <span>&gt;</span>
                        <span className="text-slate-600">All Brands</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Cards Grid (4 Cards Row) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Card 1: Total Brands */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Tag size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Brands</p>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">42</h4>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">All registered brands</p>
                      </div>
                    </div>

                    {/* Card 2: Active Brands */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Active Brands</p>
                        <h4 className="text-2xl font-black text-emerald-600 tracking-tight mt-0.5">38</h4>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Currently active brands</p>
                      </div>
                    </div>

                    {/* Card 3: Featured Brands */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                        <Star size={22} className="stroke-[2.5] fill-amber-400 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Featured Brands</p>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">12</h4>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Brands on homepage</p>
                      </div>
                    </div>

                    {/* Card 4: Total Products */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                        <ShoppingBag size={22} className="stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Total Products</p>
                        <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">1,256</h4>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Products from brands</p>
                      </div>
                    </div>
                  </div>

                  {/* Filter & Toolbar Control Segment */}
                  <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left filters: Search, Filter toggle, Status */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                          type="text"
                          placeholder="Search brands..."
                          value={brandsSearch}
                          onChange={(e) => setBrandsSearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700"
                        />
                      </div>

                      <button className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer">
                        <Sliders size={13} className="text-slate-400" />
                        <span>Filter</span>
                      </button>

                      <select 
                        value={brandsStatusFilter}
                        onChange={(e) => setBrandsStatusFilter(e.target.value)}
                        className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg text-xs focus:outline-none shadow-3xs cursor-pointer"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Right action controls: Export & Add New */}
                    <div className="flex items-center gap-2.5 self-end md:self-auto">
                      <button 
                        onClick={() => {
                          const headers = ['ID', 'Name', 'Slug', 'Category', 'Status', 'Featured', 'Sort Order', 'Associated Products'];
                          const rows = adminBrands.map(b => [b.id, b.name, b.slug, b.category, b.status, b.featured ? 'Yes' : 'No', b.sortOrder, b.productsCount]);
                          const csvContent = "data:text/csv;charset=utf-8," 
                            + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement("a");
                          link.setAttribute("href", encodedUri);
                          link.setAttribute("download", "lucky_brands_export.csv");
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          triggerLocalToast('CSV Export completed!', 'success');
                        }}
                        className="px-3.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-3xs cursor-pointer"
                      >
                        <Upload size={13} className="text-slate-400 rotate-180" />
                        <span>Export</span>
                      </button>

                      <button 
                        onClick={() => {
                          setEditingBrand(null);
                          setBrandForm({
                            name: '',
                            slug: '',
                            logo: '',
                            banner: '',
                            category: 'Shoes',
                            websiteUrl: '',
                            shortDescription: '',
                            description: '',
                            status: 'Active',
                            featured: false,
                            sortOrder: adminBrands.length + 1,
                            productsCount: 0
                          });
                          setIsAddBrandPanelOpen(true);
                        }}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                      >
                        <Plus size={14} className="stroke-[3]" />
                        <span>Add New Brand</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Split Interface Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Column: Responsive Table List */}
                    <div className={`${isAddBrandPanelOpen ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-12'} transition-all duration-300 space-y-4`}>
                      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs min-w-[750px]">
                            <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                              <tr>
                                <th className="p-3.5 w-10 text-center">
                                  <input type="checkbox" className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500" />
                                </th>
                                <th className="p-3.5 w-12 text-center">#</th>
                                <th className="p-3.5 w-16">Brand Logo</th>
                                <th className="p-3.5">Brand Name</th>
                                <th className="p-3.5">Slug</th>
                                <th className="p-3.5 text-center">Products</th>
                                <th className="p-3.5 text-center">Status</th>
                                <th className="p-3.5 text-center">Featured</th>
                                <th className="p-3.5 text-center w-24">Sort Order</th>
                                <th className="p-3.5 text-right pr-6 w-24">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                              {adminBrands
                                .filter(b => b.name.toLowerCase().includes(brandsSearch.toLowerCase()) || b.slug.toLowerCase().includes(brandsSearch.toLowerCase()))
                                .filter(b => brandsStatusFilter === 'All' ? true : b.status === brandsStatusFilter)
                                .map((brand, index) => (
                                  <tr key={brand.id} className="hover:bg-slate-50/40 transition-colors">
                                    <td className="p-3.5 text-center">
                                      <input type="checkbox" className="rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500" />
                                    </td>
                                    <td className="p-3.5 text-center font-mono text-slate-400">{index + 1}</td>
                                    <td className="p-3.5">
                                      <div className="w-10 h-10 rounded-xl border border-slate-150 overflow-hidden bg-slate-50 flex items-center justify-center relative shadow-3xs">
                                        {brand.logo ? (
                                          <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                        ) : (
                                          <div className="text-blue-600 font-black text-xs uppercase bg-blue-50/80 w-full h-full flex items-center justify-center">
                                            {brand.name.slice(0, 2)}
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                    <td className="p-3.5">
                                      <div className="font-extrabold text-slate-800 text-xs sm:text-sm hover:text-blue-600 cursor-pointer" onClick={() => {
                                        setEditingBrand(brand);
                                        setBrandForm({ ...brand });
                                        setIsAddBrandPanelOpen(true);
                                      }}>
                                        {brand.name}
                                      </div>
                                      <span className="text-[10px] text-slate-400 font-bold block">{brand.category || 'Shoes'}</span>
                                    </td>
                                    <td className="p-3.5 font-mono text-slate-400 text-[11px]">{brand.slug}</td>
                                    <td className="p-3.5 text-center font-bold text-slate-600">{brand.productsCount} products</td>
                                    <td className="p-3.5 text-center">
                                      <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                                        brand.status === 'Active' 
                                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                          : 'bg-slate-50 text-slate-400 border border-slate-100'
                                      }`}>
                                        {brand.status}
                                      </span>
                                    </td>
                                    <td className="p-3.5 text-center">
                                      <button 
                                        onClick={() => {
                                          const updated = adminBrands.map(b => b.id === brand.id ? { ...b, featured: !b.featured } : b);
                                          saveAdminBrands(updated);
                                          triggerLocalToast(`Featured status toggled for ${brand.name}`, 'success');
                                        }}
                                        className="text-amber-400 hover:scale-110 transition-transform"
                                      >
                                        <Star size={16} className={brand.featured ? "fill-amber-400 text-amber-500" : "text-slate-300"} />
                                      </button>
                                    </td>
                                    <td className="p-3.5 text-center">
                                      <input 
                                        type="number"
                                        value={brand.sortOrder}
                                        onChange={(e) => {
                                          const updated = adminBrands.map(b => b.id === brand.id ? { ...b, sortOrder: Number(e.target.value) } : b);
                                          saveAdminBrands(updated);
                                        }}
                                        className="w-14 px-1.5 py-1 bg-slate-50 border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none"
                                      />
                                    </td>
                                    <td className="p-3.5 text-right pr-6">
                                      <div className="flex items-center justify-end gap-2">
                                        <button 
                                          onClick={() => {
                                            setEditingBrand(brand);
                                            setBrandForm({ ...brand });
                                            setIsAddBrandPanelOpen(true);
                                          }}
                                          className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-blue-600 rounded-md transition-all cursor-pointer"
                                          title="Edit Brand"
                                        >
                                          <Edit size={13} />
                                        </button>
                                        <button 
                                          onClick={() => {
                                            if (confirm(`Delete brand "${brand.name}"?`)) {
                                              const updated = adminBrands.filter(b => b.id !== brand.id);
                                              saveAdminBrands(updated);
                                              triggerLocalToast('Brand deleted successfully!', 'success');
                                              if (editingBrand?.id === brand.id) {
                                                setEditingBrand(null);
                                              }
                                            }
                                          }}
                                          className="p-1.5 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-md transition-all cursor-pointer"
                                          title="Delete Brand"
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

                        {/* Pagination Segment */}
                        <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-slate-400">
                          <span>Showing 1 to 10 of 42 brands</span>
                          <div className="flex items-center gap-1.5">
                            <button className="p-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 rounded-lg transition-all shadow-3xs cursor-pointer" disabled>&lt;</button>
                            <button className="px-3 py-1.5 bg-blue-600 text-white font-black rounded-lg shadow-2xs">1</button>
                            <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-3xs cursor-pointer">2</button>
                            <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-3xs cursor-pointer">3</button>
                            <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-3xs cursor-pointer">4</button>
                            <button className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg shadow-3xs cursor-pointer">5</button>
                            <button className="p-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-lg transition-all shadow-3xs cursor-pointer">&gt;</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Multi-tab Drawer Form ("Add/Edit Brand") */}
                    {isAddBrandPanelOpen && (
                      <div className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-md space-y-5 text-left animate-fade-in">
                        
                        {/* Header toolbar */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                          <h3 className="font-extrabold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
                            <span className="w-1.5 h-4 bg-blue-600 rounded-full inline-block"></span>
                            <span>{editingBrand ? `Edit Brand: ${editingBrand.name}` : 'Add New Brand'}</span>
                          </h3>
                          <button 
                            onClick={() => setIsAddBrandPanelOpen(false)}
                            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer"
                            title="Close Form Panel"
                          >
                            <X size={15} />
                          </button>
                        </div>

                        {/* Switcher tabs */}
                        <div className="flex items-center border-b border-slate-100 text-xs font-bold text-slate-400 gap-4">
                          {['General Info', 'SEO', 'Products'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setBrandFormTab(tab as any)}
                              className={`pb-2.5 transition-all relative ${brandFormTab === tab ? 'text-blue-600 font-extrabold' : 'hover:text-slate-600'}`}
                            >
                              <span>{tab}</span>
                              {brandFormTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                              )}
                            </button>
                          ))}
                        </div>

                        {/* General Info Form tab panel */}
                        {brandFormTab === 'General Info' && (
                          <div className="space-y-4 text-xs font-bold text-slate-600">
                            
                            {/* Brand Logo Upload Dropzone */}
                            <div className="space-y-1.5">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Brand Logo*</label>
                              <div className="border border-dashed border-slate-200 hover:border-blue-500 rounded-xl bg-slate-50/50 p-4 transition-colors text-center relative flex flex-col items-center justify-center min-h-[100px] overflow-hidden group">
                                {brandForm.logo ? (
                                  <div className="relative w-full flex flex-col items-center justify-center">
                                    <img src={brandForm.logo} alt="Brand logo preview" className="w-16 h-16 object-cover rounded-lg border border-slate-150" />
                                    <button 
                                      onClick={() => setBrandForm({ ...brandForm, logo: '' })}
                                      className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-full shadow hover:bg-rose-600"
                                      title="Remove Logo"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                ) : (
                                  <label htmlFor="brand-logo-file-picker" className="cursor-pointer w-full h-full flex flex-col items-center">
                                    <Upload className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
                                    <p className="text-[10px] text-slate-500 font-extrabold mt-1.5">Click to upload or drag & drop</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">PNG, JPG, SVG (Max. 2MB)</p>
                                  </label>
                                )}
                                <input 
                                  type="file" 
                                  id="brand-logo-file-picker"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (base64) => setBrandForm({ ...brandForm, logo: base64 }))}
                                  className="hidden" 
                                />
                              </div>
                            </div>

                            {/* Brand Banner Dropzone */}
                            <div className="space-y-1.5">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Brand Banner (Optional)</label>
                              <div className="border border-dashed border-slate-200 hover:border-blue-500 rounded-xl bg-slate-50/50 p-4 transition-colors text-center relative flex flex-col items-center justify-center min-h-[100px] overflow-hidden group">
                                {brandForm.banner ? (
                                  <div className="relative w-full flex flex-col items-center justify-center">
                                    <img src={brandForm.banner} alt="Brand banner preview" className="w-full h-14 object-cover rounded-lg border border-slate-150" />
                                    <button 
                                      onClick={() => setBrandForm({ ...brandForm, banner: '' })}
                                      className="absolute top-0 right-0 p-1 bg-rose-500 text-white rounded-full shadow hover:bg-rose-600"
                                      title="Remove Banner"
                                    >
                                      <X size={10} />
                                    </button>
                                  </div>
                                ) : (
                                  <label htmlFor="brand-banner-file-picker" className="cursor-pointer w-full h-full flex flex-col items-center">
                                    <ImageIcon className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
                                    <p className="text-[10px] text-slate-500 font-extrabold mt-1.5">Click to upload or drag & drop</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">PNG, JPG (1920x600px)</p>
                                  </label>
                                )}
                                <input 
                                  type="file" 
                                  id="brand-banner-file-picker"
                                  accept="image/*"
                                  onChange={(e) => handleFileUpload(e, (base64) => setBrandForm({ ...brandForm, banner: base64 }))}
                                  className="hidden" 
                                />
                              </div>
                            </div>

                            {/* Brand Name Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Brand Name*</label>
                              <input 
                                type="text"
                                placeholder="Enter brand name"
                                value={brandForm.name}
                                onChange={(e) => {
                                  const name = e.target.value;
                                  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                  setBrandForm({ ...brandForm, name, slug });
                                }}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
                              />
                            </div>

                            {/* Slug Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Slug*</label>
                              <input 
                                type="text"
                                placeholder="Enter slug e.g. nike"
                                value={brandForm.slug}
                                onChange={(e) => setBrandForm({ ...brandForm, slug: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-mono"
                              />
                            </div>

                            {/* Brand Category select */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Brand Category</label>
                              <select 
                                value={brandForm.category}
                                onChange={(e) => setBrandForm({ ...brandForm, category: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer text-slate-700"
                              >
                                <option value="Shoes">Shoes</option>
                                <option value="Apparel">Apparel</option>
                                <option value="Accessories">Accessories</option>
                              </select>
                            </div>

                            {/* Website URL Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Website URL</label>
                              <input 
                                type="url"
                                placeholder="https://example.com"
                                value={brandForm.websiteUrl}
                                onChange={(e) => setBrandForm({ ...brandForm, websiteUrl: e.target.value })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-mono"
                              />
                            </div>

                            {/* Short Description Textarea */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Short Description</label>
                              <textarea 
                                placeholder="Enter short description"
                                value={brandForm.shortDescription}
                                onChange={(e) => setBrandForm({ ...brandForm, shortDescription: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-700 font-medium"
                              />
                            </div>

                            {/* Description WYSIWYG Mock layout */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Description</label>
                              <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="bg-slate-50 border-b border-slate-200 px-2.5 py-1.5 flex items-center gap-2 text-slate-500 flex-wrap">
                                  <button type="button" className="p-1 hover:bg-slate-200 rounded text-xs font-black" title="Bold">B</button>
                                  <button type="button" className="p-1 hover:bg-slate-200 rounded text-xs italic" title="Italic">I</button>
                                  <button type="button" className="p-1 hover:bg-slate-200 rounded text-xs underline" title="Underline">U</button>
                                  <span className="text-slate-300">|</span>
                                  <button type="button" className="p-1 hover:bg-slate-200 rounded text-[11px] font-bold" title="Bullet List">• list</button>
                                  <button type="button" className="p-1 hover:bg-slate-200 rounded text-[11px] font-bold" title="Numbered List">1. list</button>
                                  <span className="text-slate-300">|</span>
                                  <button type="button" className="p-1 hover:bg-slate-200 rounded text-[11px] font-mono" title="Link">Link</button>
                                </div>
                                <textarea 
                                  placeholder="Enter brand description..."
                                  value={brandForm.description}
                                  onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                                  rows={3}
                                  className="w-full px-3 py-2 bg-white focus:outline-none text-slate-700 font-medium text-xs"
                                />
                              </div>
                            </div>

                            {/* Switches Section */}
                            <div className="grid grid-cols-2 gap-4 pt-1.5">
                              {/* Status Toggle */}
                              <div className="flex items-center justify-between border border-slate-100 p-2 rounded-xl bg-slate-50/30">
                                <span className="text-[10px] uppercase text-slate-400 tracking-wider">Status</span>
                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                  <input 
                                    type="checkbox" 
                                    checked={brandForm.status === 'Active'}
                                    onChange={(e) => setBrandForm({ ...brandForm, status: e.target.checked ? 'Active' : 'Inactive' })}
                                    className="sr-only peer" 
                                  />
                                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                  <span className="ml-2 text-[10px] font-black uppercase text-slate-700">{brandForm.status}</span>
                                </label>
                              </div>

                              {/* Featured Toggle */}
                              <div className="flex items-center justify-between border border-slate-100 p-2 rounded-xl bg-slate-50/30">
                                <span className="text-[10px] uppercase text-slate-400 tracking-wider">Featured</span>
                                <label className="relative inline-flex items-center cursor-pointer select-none">
                                  <input 
                                    type="checkbox" 
                                    checked={brandForm.featured}
                                    onChange={(e) => setBrandForm({ ...brandForm, featured: e.target.checked })}
                                    className="sr-only peer" 
                                  />
                                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                  <span className="ml-2 text-[10px] font-black uppercase text-slate-700">{brandForm.featured ? 'Yes' : 'No'}</span>
                                </label>
                              </div>
                            </div>

                            {/* Sort Order Input */}
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Sort Order</label>
                              <input 
                                type="number"
                                placeholder="0"
                                value={brandForm.sortOrder}
                                onChange={(e) => setBrandForm({ ...brandForm, sortOrder: Number(e.target.value) })}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                              />
                              <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Lower number shows first in catalog.</p>
                            </div>

                            {/* Form Actions Footer Buttons */}
                            <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2">
                              <button 
                                type="button"
                                onClick={() => {
                                  setEditingBrand(null);
                                  setIsAddBrandPanelOpen(false);
                                }}
                                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 font-black rounded-lg text-[10px] uppercase transition-all shadow-3xs cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button 
                                type="button"
                                onClick={() => {
                                  if (!brandForm.name) {
                                    triggerLocalToast('Brand name is required!', 'error');
                                    return;
                                  }
                                  if (editingBrand) {
                                    const updated = adminBrands.map(b => b.id === editingBrand.id ? { ...b, ...brandForm } : b);
                                    saveAdminBrands(updated);
                                    triggerLocalToast('Brand details saved and updated!', 'success');
                                  } else {
                                    const newBrand = {
                                      id: 'brand-' + Math.random().toString(36).slice(2, 9),
                                      productsCount: 0,
                                      ...brandForm
                                    };
                                    saveAdminBrands([newBrand, ...adminBrands]);
                                    triggerLocalToast('New brand successfully registered!', 'success');
                                  }
                                  setEditingBrand(null);
                                  // Clear form
                                  setBrandForm({
                                    name: '',
                                    slug: '',
                                    logo: '',
                                    banner: '',
                                    category: 'Shoes',
                                    websiteUrl: '',
                                    shortDescription: '',
                                    description: '',
                                    status: 'Active',
                                    featured: false,
                                    sortOrder: adminBrands.length + 1,
                                    productsCount: 0
                                  });
                                }}
                                className="px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-lg text-[10px] uppercase tracking-wide transition-all shadow-xs cursor-pointer"
                              >
                                Save Brand
                              </button>
                            </div>

                          </div>
                        )}

                        {/* SEO Tab Content panel */}
                        {brandFormTab === 'SEO' && (
                          <div className="space-y-4 text-xs font-bold text-slate-600">
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">SEO Meta Title</label>
                              <input 
                                type="text"
                                placeholder="Enter Meta Title for Search Engines"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Meta Keywords</label>
                              <input 
                                type="text"
                                placeholder="shoes, brand, buy, nepal"
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase text-slate-400 tracking-wider">SEO Meta Description</label>
                              <textarea 
                                placeholder="Enter Google description details..."
                                rows={3}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                              />
                            </div>
                            <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl text-[10px] text-blue-600 leading-relaxed">
                              Configure Search Engine settings here to maximize google search ranking indexes for brand specific listings.
                            </div>
                          </div>
                        )}

                        {/* Products Tab Content panel */}
                        {brandFormTab === 'Products' && (
                          <div className="space-y-4 text-xs font-bold text-slate-600">
                            <h4 className="font-extrabold text-slate-700 text-xs">Assigned Products List</h4>
                            {editingBrand ? (
                              <div className="space-y-2 max-h-[220px] overflow-y-auto border border-slate-100 p-2.5 rounded-xl bg-slate-50/50">
                                <p className="text-[10px] text-slate-400 font-semibold">Listing items mapped to this partner brand:</p>
                                <div className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                                  {productsList.filter(p => p.brand?.toLowerCase() === editingBrand.name.toLowerCase()).map(p => (
                                    <div key={p.id} className="py-2 flex items-center justify-between">
                                      <span className="truncate max-w-[150px] font-bold text-slate-800">{p.name}</span>
                                      <span className="text-blue-600 font-mono">Rs. {p.price}</span>
                                    </div>
                                  ))}
                                  {productsList.filter(p => p.brand?.toLowerCase() === editingBrand.name.toLowerCase()).length === 0 && (
                                    <p className="py-4 text-center text-[10px] text-slate-400 font-bold">No active catalog items mapped directly.</p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <p className="text-[10px] text-slate-400 font-semibold">Save the brand general specifications first before listing associated catalog products.</p>
                            )}
                          </div>
                        )}

                      </div>
                    )}

                  </div>

                </div>
              )}

              {/* ----------------- CUSTOM COUPONS & OFFERS PAGE ----------------- */}
              {activeTab === 'coupons' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Coupons & Campaigns</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Configure discount codes, percentages, and campaign dates.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingCoupon(null);
                        setCouponForm({
                          code: '',
                          discountType: 'Percentage',
                          value: 10,
                          minPurchase: 0,
                          endDate: '2026-12-31',
                          status: 'Active'
                        });
                        setIsCouponModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Create Coupon</span>
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <tr>
                          <th className="p-4">Coupon Code</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Value</th>
                          <th className="p-4">Min Spend</th>
                          <th className="p-4">Expiry Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6 w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {adminCoupons.map((coupon) => (
                          <tr key={coupon.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <span className="font-mono font-black text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1 text-xs">
                                {coupon.code}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-600">{coupon.discountType}</td>
                            <td className="p-4 text-slate-800 font-extrabold text-sm">
                              {coupon.discountType === 'Percentage' ? `${coupon.value}%` : `Rs. ${coupon.value}`}
                            </td>
                            <td className="p-4 text-slate-500 font-medium">Rs. {coupon.minPurchase}</td>
                            <td className="p-4 text-slate-400 font-mono">{coupon.endDate}</td>
                            <td className="p-4">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                coupon.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                              }`}>
                                {coupon.status}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingCoupon(coupon);
                                    setCouponForm({
                                      code: coupon.code,
                                      discountType: coupon.discountType,
                                      value: coupon.value,
                                      minPurchase: coupon.minPurchase,
                                      endDate: coupon.endDate,
                                      status: coupon.status
                                    });
                                    setIsCouponModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 hover:underline text-[10px] font-black uppercase"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm(`Delete Coupon "${coupon.code}"?`)) {
                                      const updated = adminCoupons.filter(c => c.id !== coupon.id);
                                      saveAdminCoupons(updated);
                                      triggerLocalToast('Coupon deleted!', 'success');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-600 hover:underline text-[10px] font-black uppercase"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM BLOGS PAGE ----------------- */}
              {activeTab === 'blog' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Blog Articles Manager</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Author articles, summer lookbooks, or shoe size buying guides.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingBlog(null);
                        setBlogForm({
                          title: '',
                          author: 'Super Admin',
                          date: new Date().toISOString().split('T')[0],
                          summary: '',
                          image: '',
                          status: 'Published'
                        });
                        setIsBlogModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Write Article</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adminBlogs.map((post) => (
                      <div key={post.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col md:flex-row">
                        {post.image && (
                          <img src={post.image} alt={post.title} className="w-full md:w-36 h-36 object-cover md:shrink-0" referrerPolicy="no-referrer" />
                        )}
                        <div className="p-4 flex flex-col justify-between flex-1 text-left">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>By {post.author}</span>
                            </div>
                            <h3 className="font-black text-slate-800 text-sm leading-snug">{post.title}</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{post.summary}</p>
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 mt-3.5">
                            <span className="text-[9px] font-black uppercase bg-slate-50 text-slate-500 border border-slate-100 rounded-md px-1.5 py-0.5">
                              {post.status}
                            </span>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => {
                                  setEditingBlog(post);
                                  setBlogForm({
                                    title: post.title,
                                    author: post.author,
                                    date: post.date,
                                    summary: post.summary,
                                    image: post.image || '',
                                    status: post.status
                                  });
                                  setIsBlogModalOpen(true);
                                }}
                                className="text-blue-600 hover:text-blue-700 font-bold text-[10px] uppercase"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => {
                                  if (confirm(`Delete post "${post.title}"?`)) {
                                    const updated = adminBlogs.filter(p => p.id !== post.id);
                                    saveAdminBlogs(updated);
                                    triggerLocalToast('Article deleted!', 'success');
                                  }
                                }}
                                className="text-rose-500 hover:text-rose-600 font-bold text-[10px] uppercase"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM MEDIA LIBRARY PAGE ----------------- */}
              {activeTab === 'media-library' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Interactive Media Library</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Upload files, store catalog imagery, and copy synchronized base64 paths.</p>
                    </div>
                    
                    <div>
                      <input 
                        type="file" 
                        accept="image/*"
                        id="media-standalone-uploader"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(e, (base64) => {
                              const newMedia = {
                                id: 'media-' + Math.random().toString(36).slice(2, 9),
                                name: file.name,
                                size: `${Math.round(file.size / 1024)} KB`,
                                url: base64,
                                date: new Date().toISOString().split('T')[0]
                              };
                              saveAdminMedia([newMedia, ...adminMedia]);
                              triggerLocalToast('File synchronized into Library!', 'success');
                            });
                          }
                        }}
                        className="hidden" 
                      />
                      <label 
                        htmlFor="media-standalone-uploader"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                      >
                        <Upload size={14} />
                        <span>Upload Custom Image</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {adminMedia.map((media) => (
                      <div key={media.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs group relative">
                        <div className="aspect-video w-full border-b border-slate-100 bg-slate-50 flex items-center justify-center overflow-hidden">
                          {media.url ? (
                            <img src={media.url} alt={media.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                          ) : (
                            <ImageIcon size={24} className="text-slate-300" />
                          )}
                        </div>

                        <div className="p-3.5 space-y-2 text-xs">
                          <div className="space-y-0.5">
                            <h3 className="font-bold text-slate-800 truncate" title={media.name}>{media.name}</h3>
                            <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-between">
                              <span>{media.size}</span>
                              <span>{media.date}</span>
                            </div>
                          </div>

                          <div className="flex border-t border-slate-50 pt-2 gap-1.5">
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(media.url);
                                triggerLocalToast('Copied media URL to clipboard!', 'success');
                              }}
                              className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-[9px] uppercase font-black transition-all"
                            >
                              Copy URL
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Delete media item "${media.name}"?`)) {
                                  const updated = adminMedia.filter(m => m.id !== media.id);
                                  saveAdminMedia(updated);
                                  triggerLocalToast('Media removed!', 'success');
                                }
                              }}
                              className="p-1.5 bg-rose-50 text-rose-500 hover:bg-rose-100 border border-rose-100 rounded-lg transition-all"
                              title="Delete File"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM USERS & ROLES PAGE ----------------- */}
              {activeTab === 'user-management' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Staff Credentials</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Manage system administrators, store editors, and sales roles.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingUser(null);
                        setUserForm({
                          name: '',
                          email: '',
                          role: 'Editor',
                          status: 'Active',
                          avatar: ''
                        });
                        setIsUserModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Add User Role</span>
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <tr>
                          <th className="p-4">Staff Member</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Assigned Role</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6 w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {adminUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-full border overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                                  {u.avatar ? (
                                    <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                  ) : (
                                    <span className="text-blue-600 font-black text-sm">{u.name[0]}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-800 text-sm">{u.name}</div>
                                  <div className="text-[10px] text-slate-400 font-semibold">{u.role}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 font-mono font-medium">{u.email}</td>
                            <td className="p-4">
                              <span className="bg-slate-100 text-slate-600 border border-slate-200 rounded-lg px-2 py-0.5 font-bold text-[10px]">
                                {u.role}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                u.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                              }`}>
                                {u.status}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingUser(u);
                                    setUserForm({
                                      name: u.name,
                                      email: u.email,
                                      role: u.role,
                                      status: u.status,
                                      avatar: u.avatar || ''
                                    });
                                    setIsUserModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 hover:underline text-[10px] font-black uppercase"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm(`Remove access for ${u.name}?`)) {
                                      const updated = adminUsers.filter(item => item.id !== u.id);
                                      saveAdminUsers(updated);
                                      triggerLocalToast('User access revoked!', 'success');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-600 hover:underline text-[10px] font-black uppercase"
                                >
                                  Revoke
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM BRAND CATEGORIES PAGE ----------------- */}
              {activeTab === 'brands-categories' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Brand Categories</h1>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Classify and organize shoe and clothing brands for structured navigation.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Add Brand Category</h3>
                      <div className="space-y-3 text-xs font-bold text-slate-700">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase">Category Name</label>
                          <input type="text" placeholder="e.g. Premium Leather" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase">Slug</label>
                          <input type="text" placeholder="premium-leather" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase">Description</label>
                          <textarea placeholder="Brief category description..." className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none h-20 resize-none" />
                        </div>
                        <button 
                          onClick={() => triggerLocalToast('Brand Category created!', 'success')}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider rounded-xl text-[10px]"
                        >
                          Create Category
                        </button>
                      </div>
                    </div>
                    <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          <tr>
                            <th className="p-4">Category Name</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">Associated Brands</th>
                            <th className="p-4 text-right pr-6">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          <tr className="hover:bg-slate-50/50">
                            <td className="p-4 font-black text-slate-800">Sports & Performance</td>
                            <td className="p-4 font-mono text-slate-500">sports-performance</td>
                            <td className="p-4">Nike, Adidas, Puma</td>
                            <td className="p-4 text-right pr-6 text-blue-600 cursor-pointer hover:underline text-[10px] font-black uppercase">Edit</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="p-4 font-black text-slate-800">Casual Luxury</td>
                            <td className="p-4 font-mono text-slate-500">casual-luxury</td>
                            <td className="p-4">Zara, Skechers</td>
                            <td className="p-4 text-right pr-6 text-blue-600 cursor-pointer hover:underline text-[10px] font-black uppercase">Edit</td>
                          </tr>
                          <tr className="hover:bg-slate-50/50">
                            <td className="p-4 font-black text-slate-800">Heritage Classic</td>
                            <td className="p-4 font-mono text-slate-500">heritage-classic</td>
                            <td className="p-4">Goldstar, Shikhar Shoes</td>
                            <td className="p-4 text-right pr-6 text-blue-600 cursor-pointer hover:underline text-[10px] font-black uppercase">Edit</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM BANNERS PAGE ----------------- */}
              {activeTab === 'banners' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Promotional Banners</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Manage slider slides, midway banner ads, and category promo widgets.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingBanner(null);
                        setBannerForm({
                          title: '',
                          type: 'Hero Banner',
                          image: '',
                          link: '',
                          status: 'Active',
                          sortOrder: adminBanners.length + 1
                        });
                        setIsBannerModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Create Banner</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {adminBanners.map((banner) => (
                      <div key={banner.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs flex flex-col justify-between">
                        <div>
                          <div className="aspect-video bg-slate-50 relative overflow-hidden border-b border-slate-100 flex items-center justify-center">
                            {banner.image ? (
                              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon size={28} className="text-slate-300" />
                            )}
                            <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                              {banner.type}
                            </span>
                          </div>
                          <div className="p-4 space-y-2">
                            <h3 className="font-black text-slate-800 text-sm leading-snug">{banner.title}</h3>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                              <span>Link: <span className="font-mono text-blue-600">{banner.link}</span></span>
                              <span>Order: {banner.sortOrder}</span>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 pb-4 pt-3 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                            banner.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                          }`}>
                            {banner.status}
                          </span>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                setEditingBanner(banner);
                                setBannerForm({
                                  title: banner.title,
                                  type: banner.type,
                                  image: banner.image,
                                  link: banner.link,
                                  status: banner.status,
                                  sortOrder: banner.sortOrder
                                });
                                setIsBannerModalOpen(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this banner?')) {
                                  const updated = adminBanners.filter(b => b.id !== banner.id);
                                  saveAdminBanners(updated);
                                  triggerLocalToast('Banner deleted successfully!', 'success');
                                }
                              }}
                              className="text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM DYNAMIC PAGES LIST PAGE ----------------- */}
              {activeTab === 'pages-list' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Dynamic CMS Pages</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Create, edit, and publish static or informational pages for your online store front.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingPage(null);
                        setPageForm({
                          title: '',
                          slug: '',
                          template: 'Standard',
                          content: '',
                          status: 'Published',
                          author: 'Administrator',
                          date: new Date().toISOString().split('T')[0]
                        });
                        setActiveTab('pages-add');
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Create Custom Page</span>
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <tr>
                          <th className="p-4">Page Title</th>
                          <th className="p-4">Public Route Slug</th>
                          <th className="p-4">Template Layout</th>
                          <th className="p-4">Author</th>
                          <th className="p-4">Last Updated</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6 w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {adminPages.map((page) => (
                          <tr key={page.id} className="hover:bg-slate-50/50">
                            <td className="p-4 font-bold text-slate-800">{page.title}</td>
                            <td className="p-4 font-mono text-emerald-600">/pages/{page.slug}</td>
                            <td className="p-4 text-slate-500">{page.template}</td>
                            <td className="p-4 text-slate-500">{page.author}</td>
                            <td className="p-4 text-slate-500">{page.date}</td>
                            <td className="p-4">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                page.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}>
                                {page.status}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2.5">
                                <button 
                                  onClick={() => {
                                    setEditingPage(page);
                                    setPageForm({
                                      title: page.title,
                                      slug: page.slug,
                                      template: page.template,
                                      content: page.content,
                                      status: page.status,
                                      author: page.author,
                                      date: page.date
                                    });
                                    setActiveTab('pages-add');
                                  }}
                                  className="text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete Page "${page.title}"?`)) {
                                      const updated = adminPages.filter(p => p.id !== page.id);
                                      saveAdminPages(updated);
                                      triggerLocalToast('Dynamic page deleted successfully!', 'success');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM DYNAMIC PAGE CREATOR/EDITOR ----------------- */}
              {activeTab === 'pages-add' && (
                <div className="space-y-6 animate-fade-in text-left max-w-4xl">
                  <div className="border-b border-slate-100 pb-4">
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                      {editingPage ? `Edit Dynamic Page: ${editingPage.title}` : 'Build Custom Dynamic Page'}
                    </h1>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Design and configure an informational layout template with instant local simulation.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Main Form (2 columns) */}
                    <div className="md:col-span-2 space-y-5">
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Page Title</label>
                          <input 
                            type="text" 
                            value={pageForm.title}
                            onChange={(e) => {
                              const title = e.target.value;
                              const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                              setPageForm({
                                ...pageForm,
                                title,
                                slug: editingPage ? pageForm.slug : slug
                              });
                            }}
                            placeholder="e.g. Terms and Conditions"
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-medium text-slate-800"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Page Content (HTML or Markdown supported)</label>
                          <textarea 
                            rows={12}
                            value={pageForm.content}
                            onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                            placeholder="Type page contents, standard descriptions, lists or sizing table content..."
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-mono text-slate-800"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Settings Sidebar (1 column) */}
                    <div className="space-y-5">
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Route Slug Path</label>
                          <div className="flex rounded-lg border border-slate-200 overflow-hidden text-xs">
                            <span className="bg-slate-50 border-r border-slate-200 px-2.5 py-2 text-slate-400 font-mono select-none">/pages/</span>
                            <input 
                              type="text" 
                              value={pageForm.slug}
                              onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9\-]+/g, '') })}
                              placeholder="terms-and-conditions"
                              className="w-full px-3 py-1 focus:outline-none font-mono text-slate-800"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Layout Template</label>
                          <select 
                            value={pageForm.template}
                            onChange={(e) => setPageForm({ ...pageForm, template: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700 bg-white"
                          >
                            <option value="Standard">Standard Text Content</option>
                            <option value="FAQ Accordion">FAQ Accordion List</option>
                            <option value="Contact Us Form">Contact Us Form Layout</option>
                            <option value="Bento Grid Showcase">Bento Grid Product Showcase</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Publish Status</label>
                          <select 
                            value={pageForm.status}
                            onChange={(e) => setPageForm({ ...pageForm, status: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-700 bg-white"
                          >
                            <option value="Published">Published (Live on Store)</option>
                            <option value="Draft">Draft (Private Preview)</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Last Updated Date</label>
                          <input 
                            type="date" 
                            value={pageForm.date}
                            onChange={(e) => setPageForm({ ...pageForm, date: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-750 bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1.5">Author Account</label>
                          <input 
                            type="text" 
                            value={pageForm.author}
                            onChange={(e) => setPageForm({ ...pageForm, author: e.target.value })}
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold text-slate-800 bg-white"
                          />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            if (!pageForm.title.trim() || !pageForm.slug.trim()) {
                              triggerLocalToast('Please fill in both the Title and the Slug fields!', 'error');
                              return;
                            }
                            if (editingPage) {
                              const updated = adminPages.map(p => p.id === editingPage.id ? {
                                ...p,
                                title: pageForm.title,
                                slug: pageForm.slug,
                                template: pageForm.template,
                                content: pageForm.content,
                                status: pageForm.status,
                                author: pageForm.author,
                                date: pageForm.date
                              } : p);
                              saveAdminPages(updated);
                              triggerLocalToast(`Page "${pageForm.title}" updated successfully!`, 'success');
                            } else {
                              const newPage = {
                                id: `page-${Date.now()}`,
                                title: pageForm.title,
                                slug: pageForm.slug,
                                template: pageForm.template,
                                content: pageForm.content,
                                status: pageForm.status,
                                author: pageForm.author,
                                date: pageForm.date || new Date().toISOString().split('T')[0]
                              };
                              saveAdminPages([...adminPages, newPage]);
                              triggerLocalToast(`Dynamic Page "${pageForm.title}" created successfully!`, 'success');
                            }
                            setActiveTab('pages-list');
                          }}
                          className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-xs text-center"
                        >
                          {editingPage ? 'Save Updates' : 'Publish Page'}
                        </button>
                        <button 
                          onClick={() => setActiveTab('pages-list')}
                          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl transition-all text-center"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM POPUP MANAGER PAGE ----------------- */}
              {activeTab === 'popup-manager' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Interactive Popups</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Configure modal popup announcements, discount vouchers, or subscriber collection banners.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingPopup(null);
                        setPopupForm({
                          name: '',
                          delay: 3,
                          image: '',
                          url: '',
                          frequency: 'Show Every Session',
                          status: 'Active'
                        });
                        setIsPopupModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Create Popup</span>
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <tr>
                          <th className="p-4">Popup Name</th>
                          <th className="p-4">Delay</th>
                          <th className="p-4">Frequency</th>
                          <th className="p-4">Target Redirect URL</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6 w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {adminPopups.map((pop) => (
                          <tr key={pop.id} className="hover:bg-slate-50/50">
                            <td className="p-4">
                              <div className="flex items-center gap-2.5">
                                {pop.image && <img src={pop.image} alt="" className="w-10 h-7 object-cover rounded border border-slate-200" />}
                                <span className="font-bold text-slate-800">{pop.name}</span>
                              </div>
                            </td>
                            <td className="p-4 font-mono text-slate-600">{pop.delay} Seconds</td>
                            <td className="p-4 font-bold text-slate-500">{pop.frequency}</td>
                            <td className="p-4 font-mono text-blue-600">{pop.url || '—'}</td>
                            <td className="p-4">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                pop.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                              }`}>
                                {pop.status}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingPopup(pop);
                                    setPopupForm({
                                      name: pop.name,
                                      delay: pop.delay,
                                      image: pop.image || '',
                                      url: pop.url || '',
                                      frequency: pop.frequency,
                                      status: pop.status
                                    });
                                    setIsPopupModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm(`Delete Popup "${pop.name}"?`)) {
                                      const updated = adminPopups.filter(p => p.id !== pop.id);
                                      saveAdminPopups(updated);
                                      triggerLocalToast('Popup campaign removed!', 'success');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM MARKETING PAGE ----------------- */}
              {activeTab === 'marketing' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Marketing Campaigns</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Launch, schedule, and track SMS alerts, newsletter blasts, or automated recovery flows.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingMarketing(null);
                        setMarketingForm({
                          title: '',
                          description: '',
                          audience: 'All Subscribers',
                          trigger: 'Manual Broadcast',
                          startDate: new Date().toISOString().split('T')[0],
                          endDate: '2026-12-31',
                          status: 'Active'
                        });
                        setIsMarketingModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Add Campaign</span>
                    </button>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <tr>
                          <th className="p-4">Campaign Title</th>
                          <th className="p-4">Target Audience</th>
                          <th className="p-4">Trigger System</th>
                          <th className="p-4">Validity Range</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6 w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {adminMarketing.map((mkt) => (
                          <tr key={mkt.id} className="hover:bg-slate-50/50">
                            <td className="p-4">
                              <div>
                                <span className="font-black text-slate-800 block">{mkt.title}</span>
                                <span className="text-[10px] text-slate-400 block font-medium mt-0.5">{mkt.description}</span>
                              </div>
                            </td>
                            <td className="p-4 font-bold text-slate-600">{mkt.audience}</td>
                            <td className="p-4 text-blue-600 font-black">{mkt.trigger}</td>
                            <td className="p-4 text-slate-400 font-mono text-[10px]">{mkt.startDate} to {mkt.endDate}</td>
                            <td className="p-4">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                mkt.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-500 border border-slate-100'
                              }`}>
                                {mkt.status}
                              </span>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2">
                                <button 
                                  onClick={() => {
                                    setEditingMarketing(mkt);
                                    setMarketingForm({
                                      title: mkt.title,
                                      description: mkt.description,
                                      audience: mkt.audience,
                                      trigger: mkt.trigger,
                                      startDate: mkt.startDate,
                                      endDate: mkt.endDate,
                                      status: mkt.status
                                    });
                                    setIsMarketingModalOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    if (confirm(`Delete campaign "${mkt.title}"?`)) {
                                      const updated = adminMarketing.filter(item => item.id !== mkt.id);
                                      saveAdminMarketing(updated);
                                      triggerLocalToast('Campaign removed!', 'success');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM APPEARANCE PAGE ----------------- */}
              {activeTab === 'appearance' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Appearance Customizer</h1>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Configure layout, presets, brand themes, custom fonts, and welcome message headers.</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-6 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
                      
                      <div className="space-y-2">
                        <label className="block text-[10px] uppercase text-slate-400 tracking-wider">Site Primary Theme Presets</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['Light Mode', 'Charcoal Dark', 'Warm Amber', 'Ocean Teal'].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => setAppearanceConfig({ ...appearanceConfig, themeMode: preset })}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                                appearanceConfig.themeMode === preset 
                                  ? 'border-blue-600 bg-blue-50/20 shadow-2xs' 
                                  : 'border-slate-200 hover:bg-slate-50'
                              }`}
                            >
                              <span className="font-black text-slate-800">{preset}</span>
                              <div className="flex gap-1.5">
                                <span className={`w-3.5 h-3.5 rounded-full ${preset === 'Light Mode' ? 'bg-white border border-slate-300' : preset === 'Charcoal Dark' ? 'bg-slate-800' : preset === 'Warm Amber' ? 'bg-amber-500' : 'bg-teal-500'}`} />
                                <span className="w-3.5 h-3.5 rounded-full bg-blue-600" />
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase text-slate-400">Primary Color Accent</label>
                          <div className="flex gap-2 items-center">
                            <input 
                              type="color" 
                              value={appearanceConfig.primaryColor}
                              onChange={(e) => setAppearanceConfig({ ...appearanceConfig, primaryColor: e.target.value })}
                              className="w-10 h-10 border rounded-xl overflow-hidden bg-white cursor-pointer"
                            />
                            <input 
                              type="text" 
                              value={appearanceConfig.primaryColor}
                              onChange={(e) => setAppearanceConfig({ ...appearanceConfig, primaryColor: e.target.value })}
                              className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] uppercase text-slate-400">Header Typography Font</label>
                          <select 
                            value={appearanceConfig.headerFont}
                            onChange={(e) => setAppearanceConfig({ ...appearanceConfig, headerFont: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                          >
                            <option value="Inter">Inter (Sans-Serif)</option>
                            <option value="Space Grotesk">Space Grotesk (Modern Tech)</option>
                            <option value="Outfit">Outfit (Clean Geometric)</option>
                            <option value="Playfair Display">Playfair Display (Serif/Classic)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] uppercase text-slate-400">Welcome Text / Hero Headline</label>
                        <textarea 
                          value={appearanceConfig.welcomeMessage}
                          onChange={(e) => setAppearanceConfig({ ...appearanceConfig, welcomeMessage: e.target.value })}
                          placeholder="Welcome text shown on main slider overlays..."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl h-20 resize-none font-semibold text-slate-700"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] uppercase text-slate-400">Footer Attribution String</label>
                        <input 
                          type="text" 
                          value={appearanceConfig.footerString}
                          onChange={(e) => setAppearanceConfig({ ...appearanceConfig, footerString: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5 flex justify-end">
                      <button 
                        onClick={() => {
                          saveAppearanceConfig(appearanceConfig);
                          triggerLocalToast('Theme Appearance saved persistently!', 'success');
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
                      >
                        Save Customizer Parameters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM REPORTS PAGE ----------------- */}
              {activeTab === 'reports' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Reports & Analytical Insights</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Monitor digital checkout volume, payment methods, and overall store trends.</p>
                    </div>
                    <button 
                      onClick={() => {
                        triggerLocalToast('Assembling spreadsheet database exports...', 'success');
                        setTimeout(() => triggerLocalToast('Sales spreadsheet downloaded to local device!', 'success'), 1500);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Download size={14} />
                      <span>Export Sales Ledger</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Revenue (MTD)', val: 'Rs. 450,280', trend: '+18.5%', sub: 'vs last 30 days', color: 'text-blue-600' },
                      { label: 'Average Ticket Value', val: 'Rs. 4,500', trend: '+4.2%', sub: 'steady premium tier', color: 'text-cyan-600' },
                      { label: 'Conversion Success Rate', val: '2.48%', trend: '+0.5%', sub: 'eSewa checkout highly preferred', color: 'text-emerald-600' },
                      { label: 'Total Placed Baskets', val: '102 Orders', trend: '+14.1%', sub: '3 pending shipment', color: 'text-indigo-600' }
                    ].map((card, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-1.5">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-black block">{card.label}</span>
                        <div className="flex items-baseline justify-between">
                          <span className={`text-lg font-black tracking-tight ${card.color}`}>{card.val}</span>
                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 rounded px-1.5 py-0.5">{card.trend}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block font-semibold">{card.sub}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Monthly Order Placements (Historical)</h3>
                      <div className="aspect-video w-full flex items-end justify-between px-2 pt-6 pb-2 relative">
                        <svg className="absolute inset-x-0 bottom-8 h-2/3 w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <path d="M 0 80 Q 25 30 50 45 T 100 10" fill="none" stroke="#2563eb" strokeWidth="3" />
                          <path d="M 0 80 Q 25 30 50 45 T 100 10 L 100 100 L 0 100 Z" fill="url(#blue-gradient)" opacity="0.15" />
                          <defs>
                            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#2563eb" />
                              <stop offset="100%" stopColor="#fff" />
                            </linearGradient>
                          </defs>
                        </svg>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, i) => (
                          <div key={month} className="z-10 flex flex-col items-center gap-1">
                            <span className="text-[9px] font-mono text-slate-400">{month}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Payment Gateway Usage breakdown</h3>
                      <div className="space-y-3.5 text-xs font-bold text-slate-700">
                        {[
                          { name: 'eSewa Pay Nepal', percent: 54, color: 'bg-emerald-500', count: 'Rs. 243,150' },
                          { name: 'Stripe Credit Cards', percent: 28, color: 'bg-blue-600', count: 'Rs. 126,070' },
                          { name: 'Cash on Delivery (COD)', percent: 12, color: 'bg-amber-500', count: 'Rs. 54,030' },
                          { name: 'Khalti Checkout', percent: 6, color: 'bg-indigo-600', count: 'Rs. 27,030' }
                        ].map((gate) => (
                          <div key={gate.name} className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-800 font-extrabold">{gate.name}</span>
                              <span className="text-slate-400 font-bold">{gate.count} ({gate.percent}%)</span>
                            </div>
                            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${gate.color} rounded-full`} style={{ width: `${gate.percent}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM SYSTEM SETTINGS PAGE ----------------- */}
              {activeTab === 'system-settings' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div>
                    <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">System Configuration</h1>
                    <p className="text-xs text-slate-400 font-semibold mt-1">Configure live API credentials, physical metadata, tax rates, and payment triggers.</p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs max-w-4xl space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-bold text-slate-700">
                      
                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">Store Public Name</label>
                        <input 
                          type="text" 
                          value={systemSettingsConfig.storeName}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, storeName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">Operations Email Address</label>
                        <input 
                          type="text" 
                          value={systemSettingsConfig.operationsEmail}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, operationsEmail: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">VAT/Tax Rate Percentage (%)</label>
                        <input 
                          type="number" 
                          value={systemSettingsConfig.taxRate}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, taxRate: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">Base Currency Symbol</label>
                        <input 
                          type="text" 
                          value={systemSettingsConfig.currencySymbol}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, currencySymbol: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">eSewa Nepal Merchant ID</label>
                        <input 
                          type="text" 
                          value={systemSettingsConfig.esewaMerchantId}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, esewaMerchantId: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">Khalti Nepal Private Secret Key</label>
                        <input 
                          type="password" 
                          value={systemSettingsConfig.khaltiSecretKey}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, khaltiSecretKey: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1 md:col-span-2">
                        <label className="block text-[10px] uppercase text-slate-400">Stripe Live Publishable Key</label>
                        <input 
                          type="text" 
                          value={systemSettingsConfig.stripePubKey}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, stripePubKey: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono"
                        />
                      </div>

                      <div className="flex items-center gap-6 md:col-span-2 py-2">
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={systemSettingsConfig.codEnabled}
                            onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, codEnabled: e.target.checked })}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[11px] text-slate-700">Enable Cash on Delivery (COD) Checkout option</span>
                        </label>
                        <label className="flex items-center gap-2.5 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={systemSettingsConfig.vatRegistered}
                            onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, vatRegistered: e.target.checked })}
                            className="w-4 h-4 rounded text-blue-600 focus:ring-0 cursor-pointer"
                          />
                          <span className="text-[11px] text-slate-700">Business registered for VAT collection</span>
                        </label>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase text-slate-400">Minimum Order for Free Shipping (Rs.)</label>
                        <input 
                          type="number" 
                          value={systemSettingsConfig.freeShippingMinAmount}
                          onChange={(e) => setSystemSettingsConfig({ ...systemSettingsConfig, freeShippingMinAmount: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-5 flex justify-end">
                      <button 
                        onClick={() => {
                          saveSystemSettingsConfig(systemSettingsConfig);
                          triggerLocalToast('System parameters saved successfully!', 'success');
                        }}
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
                      >
                        Save Configuration
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CUSTOM STAFF USERS & ROLES PAGE ----------------- */}
              {activeTab === 'user-management' && (
                <div className="space-y-6 animate-fade-in text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Staff Credentials & Roles</h1>
                      <p className="text-xs text-slate-400 font-semibold mt-1">Configure administrator login accesses, staff operational roles, and editor privileges.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setEditingStaff(null);
                        setStaffForm({ name: '', email: '', role: 'Editor', status: 'Active' });
                        setIsStaffFormOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs tracking-tight shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Plus size={14} />
                      <span>Add Staff Member</span>
                    </button>
                  </div>

                  {isStaffFormOpen && (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 max-w-2xl animate-scale-up">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                          {editingStaff ? 'Edit Staff Privileges' : 'Provision New Staff Credentials'}
                        </h3>
                        <button onClick={() => setIsStaffFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-slate-700">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-slate-400">Full Name *</label>
                          <input 
                            type="text"
                            value={staffForm.name}
                            onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                            placeholder="e.g. Bikas Adhikari"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-slate-400">Email Address *</label>
                          <input 
                            type="email"
                            value={staffForm.email}
                            onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                            placeholder="e.g. bikas@luckyreadymade.com"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-slate-400">Operational Role</label>
                          <select 
                            value={staffForm.role}
                            onChange={(e) => setStaffForm({ ...staffForm, role: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none cursor-pointer text-slate-700"
                          >
                            <option value="Super Admin">Super Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Sales Executive">Sales Executive</option>
                            <option value="Inventory Manager">Inventory Manager</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase text-slate-400">Account Status</label>
                          <select 
                            value={staffForm.status}
                            onChange={(e) => setStaffForm({ ...staffForm, status: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none cursor-pointer text-slate-700"
                          >
                            <option value="Active">Active</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2 text-xs">
                        <button 
                          onClick={() => {
                            if (!staffForm.name.trim() || !staffForm.email.trim()) {
                              triggerLocalToast('Please fill out all mandatory staff fields!', 'error');
                              return;
                            }
                            if (editingStaff) {
                              const updated = localStaffUsers.map(u => u.id === editingStaff.id ? { ...u, ...staffForm } : u);
                              saveLocalStaffUsers(updated);
                              triggerLocalToast('Staff role privileges updated successfully!', 'success');
                            } else {
                              const newUser = {
                                id: `user-${Date.now()}`,
                                ...staffForm,
                                lastActive: 'Never',
                                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                              };
                              saveLocalStaffUsers([...localStaffUsers, newUser]);
                              triggerLocalToast(`Credentials provisioned for ${staffForm.name}!`, 'success');
                            }
                            setIsStaffFormOpen(false);
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
                        >
                          {editingStaff ? 'Save Privileges' : 'Provision Staff'}
                        </button>
                        <button 
                          onClick={() => setIsStaffFormOpen(false)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg text-slate-700 font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="bg-slate-50 border-b border-slate-150 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                        <tr>
                          <th className="p-4">Staff Member</th>
                          <th className="p-4">Email Address</th>
                          <th className="p-4">Operational Role</th>
                          <th className="p-4">Last Connection</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right pr-6 w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                        {localStaffUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50">
                            <td className="p-4">
                              <div className="flex items-center gap-2.5">
                                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-slate-200" />
                                <span className="font-bold text-slate-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="p-4 font-mono text-slate-500">{user.email}</td>
                            <td className="p-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                                user.role === 'Super Admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                user.role === 'Inventory Manager' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                user.role === 'Sales Executive' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                'bg-blue-50 text-blue-700 border border-blue-100'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400 text-[11px]">{user.lastActive}</td>
                            <td className="p-4">
                              <button 
                                onClick={() => {
                                  const updated = localStaffUsers.map(u => u.id === user.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u);
                                  saveLocalStaffUsers(updated);
                                  triggerLocalToast(`Status flipped for ${user.name}!`, 'success');
                                }}
                                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border cursor-pointer select-none transition-all ${
                                  user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                }`}
                              >
                                {user.status}
                              </button>
                            </td>
                            <td className="p-4 text-right pr-6">
                              <div className="flex items-center justify-end gap-2.5">
                                <button 
                                  onClick={() => {
                                    setEditingStaff(user);
                                    setStaffForm({ name: user.name, email: user.email, role: user.role, status: user.status });
                                    setIsStaffFormOpen(true);
                                  }}
                                  className="text-blue-600 hover:text-blue-700 text-[10px] font-black uppercase cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button 
                                  onClick={() => {
                                    if (user.id === 'user-1') {
                                      triggerLocalToast('Primary Super Admin credentials cannot be deleted!', 'error');
                                      return;
                                    }
                                    if (confirm(`Revoke staff access for ${user.name}?`)) {
                                      const updated = localStaffUsers.filter(u => u.id !== user.id);
                                      saveLocalStaffUsers(updated);
                                      triggerLocalToast('Staff credentials revoked!', 'success');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase cursor-pointer"
                                >
                                  Revoke
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ----------------- BILLING & INVOICES PAGES ----------------- */}
              {activeTab.startsWith('billing-') && (
                <AdminBillingPage subTab={activeTab} onSubTabChange={setActiveTab} />
              )}

            </div>
          )}
          {!activeTab.startsWith('home-') && ['home-management', 'new-arrivals', 'reviews', 'testimonials', 'faq', 'gallery', 'newsletter', 'website-settings', 'menu-builder', 'seo-manager', 'payment-gateways', 'shipping-management'].includes(activeTab) && (
            <div className="bg-white border border-slate-200/80 rounded-xl p-10 shadow-2xs text-center max-w-lg mx-auto space-y-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-sm">
                <Settings size={24} className="animate-spin-slow" />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                {activeTab.replace('-', ' ')} Module
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                The database tables, schema entities, and security policies for <b>{activeTab.toUpperCase()}</b> are fully live on the backend server. The corresponding control views are synced with the layout configuration.
              </p>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black tracking-widest uppercase py-2 px-6 rounded-lg shadow-2xs transition-all active:scale-95"
              >
                Return to Dashboard
              </button>
            </div>
          )}

        </main>

      </div>

      {/* INTERACTIVE HOME WEB SIMULATOR MODAL OVERLAY */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
          <div className="bg-slate-100 w-full h-full max-w-7xl rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-slate-200 animate-scale-up select-none">
            
            {/* SIMULATOR BAR HEADER */}
            <div className="bg-[#091b3d] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-xs font-black tracking-widest uppercase text-emerald-400">STOREFRONT LIVE SIMULATOR</span>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">| Real-time synchronization active</span>
              </div>
              
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-rose-600 hover:text-white rounded-lg text-slate-300 text-[10px] font-black uppercase transition-all cursor-pointer"
              >
                <X size={12} />
                <span>Close Simulator</span>
              </button>
            </div>

            {/* SIMULATOR WEBSITE CORE CONTAINER */}
            <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col text-left">
              
              {/* TOP LIGHT OFFER TICKER */}
              {offersConfig.enabled && (
                <div className="bg-red-600 text-white py-1.5 px-4 text-center text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2 animate-pulse-subtle">
                  <span>🔥 SPECIAL MONSOON SALE Alert: Use Code: <span className="underline font-mono font-black">{offersConfig.couponCode}</span> to save {offersConfig.discountPercentage}% OFF!</span>
                </div>
              )}

              {/* MOCKUP STORE HEADER BRANDING */}
              <header className="bg-white border-b border-slate-100 py-4 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 border border-blue-700 flex items-center justify-center font-serif text-white font-black text-sm">
                    LA
                  </div>
                  <div>
                    <h1 className="text-sm font-black text-slate-900 tracking-wide uppercase leading-tight">LUCKY READYMADE & SHOE CENTER</h1>
                    <p className="text-[8px] text-slate-400 uppercase font-black tracking-widest mt-0.5">BARDIBAS HEADQUARTERS, NEPAL</p>
                  </div>
                </div>

                {/* Simulated search */}
                <div className="relative w-full max-w-sm hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search custom sneakers, readymade items..." 
                    disabled
                    className="w-full bg-slate-50 border border-slate-200 py-1.5 pl-9 pr-4 rounded-full text-xs"
                  />
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <span className="cursor-pointer hover:text-blue-600 transition-colors">Catalog</span>
                  <span className="cursor-pointer hover:text-blue-600 transition-colors">Offers</span>
                  <span className="cursor-pointer hover:text-blue-600 transition-colors">Contact</span>
                  <div className="relative cursor-pointer hover:text-blue-600 transition-colors py-1 px-2.5 bg-slate-100 rounded-full">
                    <span>🛒 Cart (0)</span>
                  </div>
                </div>
              </header>

              {/* WEBSITE SECTIONS GRID */}
              <div className="bg-white flex-1 flex flex-col">
                
                {/* 1. HERO CAROUSEL BLOCK */}
                {(() => {
                  const activeSlides = slides.filter((s: any) => s.status);
                  if (activeSlides.length === 0) return null;
                  
                  const idx = previewSlideIdx % activeSlides.length;
                  const current = activeSlides[idx];
                  
                  return (
                    <div className="relative h-[250px] md:h-[400px] w-full overflow-hidden bg-slate-900">
                      {/* background image */}
                      <img 
                        src={current.image} 
                        alt={current.title} 
                        className="w-full h-full object-cover opacity-60 transition-all duration-700 transform scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* slide text container overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center px-8 md:px-16 text-white text-left">
                        <div className="max-w-md space-y-2 md:space-y-4">
                          <span className="inline-block bg-blue-600/90 text-white text-[8px] md:text-[10px] uppercase font-black px-2.5 py-1 rounded-md tracking-widest animate-pulse">
                            TRENDING EXCLUSIVE
                          </span>
                          <h2 className="text-xl md:text-4xl font-black tracking-tight leading-tight">
                            {current.title}
                          </h2>
                          <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
                            {current.subtitle}
                          </p>
                          <div className="pt-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] md:text-xs font-black uppercase py-2 px-6 rounded-xl transition-all shadow-md active:scale-95">
                              {current.buttonText}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Carousel next/prev indicators overlay */}
                      <button 
                        onClick={() => setPreviewSlideIdx((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all"
                      >
                        ◀
                      </button>
                      <button 
                        onClick={() => setPreviewSlideIdx((prev) => (prev + 1) % activeSlides.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all"
                      >
                        ▶
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                        {activeSlides.map((_: any, dIdx: number) => (
                          <div 
                            key={dIdx} 
                            onClick={() => setPreviewSlideIdx(dIdx)}
                            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === dIdx ? 'bg-blue-600 w-4' : 'bg-white/40'}`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* 2. CATEGORIES SECTION */}
                {layoutSections.find(s => s.id === 'categories-sec')?.enabled && (
                  <section className="py-12 px-6 md:px-12 bg-slate-50 border-b border-slate-100 text-center">
                    <div className="max-w-xl mx-auto mb-8">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">{categoriesConfig.title}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">{categoriesConfig.subtitle}</p>
                      <div className="w-12 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {categoriesConfig.items.filter((c: any) => c.enabled).map((cat: any) => (
                        <div key={cat.id} className="group relative bg-white border border-slate-200/60 rounded-2xl overflow-hidden hover:shadow-md transition-all text-center p-4">
                          <img src={cat.image} alt={cat.name} className="w-20 h-20 rounded-full mx-auto object-cover border border-slate-100" />
                          <h4 className="text-xs font-bold text-slate-800 mt-3">{cat.name}</h4>
                          <span className="text-[10px] text-slate-400 mt-1 block font-semibold">{cat.count}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 3. PROMOTIONAL BANNERS GRID */}
                {layoutSections.find(s => s.id === 'banner-sec')?.enabled && (
                  <section className="py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border-b border-slate-100">
                    {bannersConfig.filter((b: any) => b.enabled).map((banner: any, index: number) => {
                      const bgClasses = [
                        'from-pink-500 to-rose-600',
                        'from-blue-600 to-indigo-800'
                      ];
                      const activeGrad = bgClasses[index % bgClasses.length];
                      return (
                        <div key={banner.id} className={`bg-gradient-to-r ${activeGrad} rounded-2xl p-8 text-white relative overflow-hidden shadow-sm`}>
                          <div className="max-w-xs space-y-2">
                            <span className="text-[9px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">HOT PROMO</span>
                            <h4 className="text-lg md:text-xl font-black tracking-tight">{banner.title}</h4>
                            <p className="text-xs text-white/80 leading-relaxed font-semibold">{banner.subtitle}</p>
                            <button className="bg-white text-slate-900 text-[10px] font-black uppercase py-2 px-5 rounded-lg mt-3 shadow-2xs hover:bg-slate-50">
                              Shop Offer
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                )}

                {/* 4. FEATURED PRODUCTS COLLECTION */}
                {layoutSections.find(s => s.id === 'featured-sec')?.enabled && (
                  <section className="py-12 px-6 md:px-12 bg-slate-50 border-b border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">★ Featured Picks</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Handpicked premium items for our Bardibas shoppers.</p>
                      </div>
                      <div className="w-12 h-1 bg-blue-600 rounded-full mt-2 md:mt-0" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {productsList.filter(p => featuredProductsIds.includes(p.id)).map((p) => (
                        <div key={p.id} className="bg-white border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-sm transition-all flex flex-col p-3 text-left">
                          <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg border border-slate-100" />
                          <span className="text-[9px] text-slate-400 mt-2 block font-bold uppercase">{p.category}</span>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">{p.name}</h4>
                          <span className="text-xs font-mono font-black text-blue-600 mt-1 block">Rs. {p.price.toLocaleString()}</span>
                          <button className="bg-slate-900 text-white text-[9px] uppercase font-black w-full py-1.5 rounded-lg mt-3">Add to Cart</button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 5. TRENDING SECTION */}
                {layoutSections.find(s => s.id === 'trending-sec')?.enabled && (
                  <section className="py-12 px-6 md:px-12 bg-white border-b border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">⚡ Trending Shoes & Apparel</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Items everyone in Janakpur and Bardibas is buying this week.</p>
                      </div>
                      <div className="w-12 h-1 bg-rose-500 rounded-full mt-2 md:mt-0" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {productsList.filter(p => trendingProductsIds.includes(p.id)).map((p) => (
                        <div key={p.id} className="bg-slate-50 border border-slate-150 rounded-xl overflow-hidden hover:shadow-sm transition-all flex flex-col p-3 text-left">
                          <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg border border-slate-100" />
                          <span className="text-[9px] text-slate-400 mt-2 block font-bold uppercase">{p.category}</span>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">{p.name}</h4>
                          <span className="text-xs font-mono font-black text-rose-600 mt-1 block">Rs. {p.price.toLocaleString()}</span>
                          <button className="bg-rose-600 text-white text-[9px] uppercase font-black w-full py-1.5 rounded-lg mt-3">Add to Cart</button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 6. NEW ARRIVALS */}
                {layoutSections.find(s => s.id === 'new-arrivals-sec')?.enabled && (
                  <section className="py-12 px-6 md:px-12 bg-slate-50 border-b border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">✨ New Arrivals</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium">Fresh additions to our clothing catalog.</p>
                      </div>
                      <div className="w-12 h-1 bg-emerald-500 rounded-full mt-2 md:mt-0" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {productsList.filter(p => newArrivalsProductsIds.includes(p.id)).map((p) => (
                        <div key={p.id} className="bg-white border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-sm transition-all flex flex-col p-3 text-left">
                          <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-lg border border-slate-100" />
                          <span className="text-[9px] text-slate-400 mt-2 block font-bold uppercase">{p.category}</span>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1 mt-0.5">{p.name}</h4>
                          <span className="text-xs font-mono font-black text-emerald-600 mt-1 block">Rs. {p.price.toLocaleString()}</span>
                          <button className="bg-emerald-600 text-white text-[9px] uppercase font-black w-full py-1.5 rounded-lg mt-3">Add to Cart</button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 7. COUNTDOWN OFFERS */}
                {layoutSections.find(s => s.id === 'offers-sec')?.enabled && offersConfig.enabled && (
                  <section className="py-10 bg-[#091b3d] text-white px-6 md:px-12 border-b border-slate-850 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-1">
                      <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">LIMITED SPECIAL WEEKEND DISCOUNT OFFER</span>
                      <h4 className="text-lg md:text-2xl font-black">{offersConfig.bannerText}</h4>
                      <p className="text-xs text-slate-300 font-semibold">Copy and apply coupon <span className="text-emerald-400 font-mono font-black underline">{offersConfig.couponCode}</span> at final checkout!</p>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/10">
                      <div className="text-center">
                        <span className="text-xl md:text-3xl font-mono font-black block">{offersConfig.endsInHours}</span>
                        <span className="text-[9px] uppercase text-slate-300 block">Hours</span>
                      </div>
                      <span className="text-xl font-mono text-slate-400">:</span>
                      <div className="text-center">
                        <span className="text-xl md:text-3xl font-mono font-black block">45</span>
                        <span className="text-[9px] uppercase text-slate-300 block">Mins</span>
                      </div>
                      <span className="text-xl font-mono text-slate-400">:</span>
                      <div className="text-center">
                        <span className="text-xl md:text-3xl font-mono font-black block">12</span>
                        <span className="text-[9px] uppercase text-slate-300 block">Secs</span>
                      </div>
                    </div>
                  </section>
                )}

                {/* 8. BRAND SLIDER */}
                {layoutSections.find(s => s.id === 'brand-sec')?.enabled && (
                  <section className="py-10 bg-white border-b border-slate-100 px-6 overflow-hidden">
                    <div className="flex items-center justify-center gap-12 md:gap-20 opacity-60 flex-wrap animate-marquee">
                      {brandsConfig.map((brand: any) => (
                        <div key={brand.id} className="text-slate-800 text-sm md:text-base font-black tracking-widest uppercase font-mono border-2 border-slate-900/10 py-1.5 px-4 rounded-xl bg-slate-50">
                          {brand.logoText}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 9. TESTIMONIALS CAROUSEL */}
                {layoutSections.find(s => s.id === 'testimonials-sec')?.enabled && (
                  <section className="py-12 px-6 bg-slate-50 border-b border-slate-100 text-center">
                    <div className="max-w-xl mx-auto mb-8">
                      <h3 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">Loved by Thousands</h3>
                      <p className="text-xs text-slate-400 mt-1">See what customer says about Lucky Readymade & Shoe Center.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {testimonialsConfig.map((t: any) => (
                        <div key={t.id} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-2xs text-left space-y-2.5">
                          <p className="text-xs text-slate-600 leading-relaxed italic">&ldquo;{t.feedback}&rdquo;</p>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">{t.name}</span>
                              <span className="text-[9px] text-slate-400 block">{t.role}</span>
                            </div>
                            <div className="text-amber-500 font-bold text-xs flex gap-0.5">
                              {'★'.repeat(t.stars)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 10. PROMOTIONAL VIDEOS */}
                {layoutSections.find(s => s.id === 'videos-sec')?.enabled && (
                  <section className="py-12 px-6 bg-white border-b border-slate-100 text-center">
                    <div className="max-w-xl mx-auto mb-6">
                      <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{videosConfig.title}</h3>
                      <p className="text-xs text-slate-400 font-medium mt-1">Virtual guided showcase of Nepalese fashion items in store.</p>
                    </div>

                    <div className="max-w-xl mx-auto aspect-video bg-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-md">
                      <div className="absolute inset-0 bg-black/45" />
                      {/* simulate player */}
                      <div className="z-10 text-center space-y-3 cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={24} className="fill-white stroke-none ml-1" />
                        </div>
                        <p className="text-xs font-bold text-white uppercase tracking-widest">{videosConfig.youtubeUrl}</p>
                      </div>
                    </div>
                  </section>
                )}

                {/* 11. MAPS/STORE INFO */}
                <section className="py-12 px-6 md:px-12 bg-slate-50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-slate-100">
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-slate-900 uppercase">Lucky Bardibas Office</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      Our headquarters is located at the center of Bardibas, Nepal. Drop by to view custom garments, active shoes catalog, and order tailored fits.
                    </p>
                    
                    <div className="space-y-2 text-xs font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">📍</span>
                        <span>{storeInfoConfig.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">📞</span>
                        <span>{storeInfoConfig.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">✉️</span>
                        <span>{storeInfoConfig.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-blue-600">🕒</span>
                        <span>{storeInfoConfig.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* simulated embedded iframe maps for bardibas */}
                  <div className="rounded-2xl border border-slate-200 overflow-hidden h-64 bg-slate-200 relative">
                    <iframe 
                      title="Lucky Apparel Maps"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14251.376882208035!2d85.89437172089476!3d26.987747805178657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3b7b25ad7cf1%3A0x7ee91398c8c5c792!2sBardibas!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </section>

                {/* 12. SIMULATED FOOTER */}
                <footer className="bg-slate-900 text-white py-12 px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <h4 className="font-serif font-black text-lg">LUCKY APP APPAREL</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">{footerConfig.aboutText}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-blue-500">Quick Links</h4>
                    <div className="flex flex-col gap-1.5 text-xs text-slate-400 font-semibold">
                      <span className="cursor-pointer hover:text-white">Track Order</span>
                      <span className="cursor-pointer hover:text-white">Shipping Policy</span>
                      <span className="cursor-pointer hover:text-white">Taxes & Custom Duties</span>
                      <span className="cursor-pointer hover:text-white">Privacy Guard</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-widest text-blue-500">Connect with us</h4>
                    <div className="flex items-center gap-3">
                      <a href={footerConfig.facebookUrl} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-blue-600 p-2.5 rounded-full text-white transition-colors">
                        FB
                      </a>
                      <a href={footerConfig.instagramUrl} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-pink-600 p-2.5 rounded-full text-white transition-colors">
                        IG
                      </a>
                    </div>
                    <p className="text-[10px] text-slate-400 pt-3">{footerConfig.copyrightText}</p>
                  </div>
                </footer>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* --- ALL ADMINISTRATIVE EDIT/ADD MODALS WITH FILE UPLOAD SUPPORT --- */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <button 
                onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Category Name</label>
                  <input 
                    type="text" 
                    value={categoryForm.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      const slugified = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setCategoryForm({ ...categoryForm, name: val, slug: slugified });
                    }}
                    placeholder="e.g. Traditional Wear"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Slug Identifier</label>
                  <input 
                    type="text" 
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="e.g. traditional-wear"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Parent Category</label>
                  <select 
                    value={categoryForm.isRoot ? '—' : categoryForm.parentCategory}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '—') {
                        setCategoryForm({ ...categoryForm, isRoot: true, parentCategory: '—' });
                      } else {
                        setCategoryForm({ ...categoryForm, isRoot: false, parentCategory: val });
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="—">None (Set as Root)</option>
                    {adminCategories.filter(c => c.isRoot && c.id !== editingCategory?.id).map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Sort Order</label>
                  <input 
                    type="number" 
                    value={categoryForm.sortOrder}
                    onChange={(e) => setCategoryForm({ ...categoryForm, sortOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Status</label>
                <select
                  value={categoryForm.status}
                  onChange={(e) => setCategoryForm({ ...categoryForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Category Cover Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {categoryForm.image ? (
                      <img src={categoryForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-category-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setCategoryForm({ ...categoryForm, image: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-category-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!categoryForm.name) {
                      triggerLocalToast('Category name is required!', 'error');
                      return;
                    }
                    if (editingCategory) {
                      const updated = adminCategories.map(c => c.id === editingCategory.id ? { ...c, ...categoryForm } : c);
                      saveAdminCategories(updated);
                      triggerLocalToast('Category updated successfully!', 'success');
                    } else {
                      const newCat = {
                        id: 'cat-' + Math.random().toString(36).slice(2, 9),
                        productsCount: 0,
                        ...categoryForm
                      };
                      saveAdminCategories([newCat, ...adminCategories]);
                      triggerLocalToast('Category created successfully!', 'success');
                    }
                    setIsCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBrandModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingBrand ? 'Edit Partner Brand' : 'Register Brand'}
              </h3>
              <button 
                onClick={() => { setIsBrandModalOpen(false); setEditingBrand(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Brand Name</label>
                <input 
                  type="text" 
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  placeholder="e.g. Goldstar Shoes"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Sort Index</label>
                  <input 
                    type="number" 
                    value={brandForm.sortOrder}
                    onChange={(e) => setBrandForm({ ...brandForm, sortOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Status</label>
                  <select
                    value={brandForm.status}
                    onChange={(e) => setBrandForm({ ...brandForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Brand Logo / Artwork</label>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {brandForm.logo ? (
                      <img src={brandForm.logo} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-brand-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setBrandForm({ ...brandForm, logo: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-brand-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Choose Logo
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsBrandModalOpen(false); setEditingBrand(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!brandForm.name) {
                      triggerLocalToast('Brand name is required!', 'error');
                      return;
                    }
                    if (editingBrand) {
                      const updated = adminBrands.map(b => b.id === editingBrand.id ? { ...b, ...brandForm } : b);
                      saveAdminBrands(updated);
                      triggerLocalToast('Brand updated successfully!', 'success');
                    } else {
                      const newBrand = {
                        id: 'brand-' + Math.random().toString(36).slice(2, 9),
                        productsCount: 0,
                        ...brandForm
                      };
                      saveAdminBrands([newBrand, ...adminBrands]);
                      triggerLocalToast('Brand created successfully!', 'success');
                    }
                    setIsBrandModalOpen(false);
                    setEditingBrand(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingBrand ? 'Save Changes' : 'Create Brand'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCouponModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingCoupon ? 'Edit Discount Coupon' : 'Create New Coupon'}
              </h3>
              <button 
                onClick={() => { setIsCouponModalOpen(false); setEditingCoupon(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Coupon Promo Code</label>
                <input 
                  type="text" 
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. LUCKYFEST20"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Type of Discount</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Percentage">Percentage (%)</option>
                    <option value="Fixed Amount">Fixed Amount (Rs.)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Discount Value</label>
                  <input 
                    type="number" 
                    value={couponForm.value}
                    onChange={(e) => setCouponForm({ ...couponForm, value: Number(e.target.value) })}
                    placeholder="e.g. 500"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Minimum Spending (Rs.)</label>
                  <input 
                    type="number" 
                    value={couponForm.minPurchase}
                    onChange={(e) => setCouponForm({ ...couponForm, minPurchase: Number(e.target.value) })}
                    placeholder="e.g. 1000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Expiration Date</label>
                  <input 
                    type="date" 
                    value={couponForm.endDate}
                    onChange={(e) => setCouponForm({ ...couponForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Coupon Status</label>
                <select
                  value={couponForm.status}
                  onChange={(e) => setCouponForm({ ...couponForm, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsCouponModalOpen(false); setEditingCoupon(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!couponForm.code || !couponForm.value) {
                      triggerLocalToast('Code and discount value are required!', 'error');
                      return;
                    }
                    if (editingCoupon) {
                      const updated = adminCoupons.map(c => c.id === editingCoupon.id ? { ...c, ...couponForm } : c);
                      saveAdminCoupons(updated);
                      triggerLocalToast('Coupon updated successfully!', 'success');
                    } else {
                      const newCoupon = {
                        id: 'coupon-' + Math.random().toString(36).slice(2, 9),
                        usedCount: 0,
                        ...couponForm
                      };
                      saveAdminCoupons([newCoupon, ...adminCoupons]);
                      triggerLocalToast('Coupon created successfully!', 'success');
                    }
                    setIsCouponModalOpen(false);
                    setEditingCoupon(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingCoupon ? 'Save Changes' : 'Create Coupon'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingBlog ? 'Edit Blog Article' : 'Write Blog Article'}
              </h3>
              <button 
                onClick={() => { setIsBlogModalOpen(false); setEditingBlog(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Post Title</label>
                  <input 
                    type="text" 
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. Traditional Nepali Fashion Trends"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Author Name</label>
                  <input 
                    type="text" 
                    value={blogForm.author}
                    onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                    placeholder="e.g. Lucky Staff writer"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Publishing Date</label>
                  <input 
                    type="date" 
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Status</label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Article Summary</label>
                <textarea 
                  value={blogForm.summary}
                  onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                  placeholder="Brief introductory summary of the blog post..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none h-20 resize-none font-semibold text-slate-750"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Article Banner Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {blogForm.image ? (
                      <img src={blogForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-blog-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setBlogForm({ ...blogForm, image: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-blog-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Choose Photo
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsBlogModalOpen(false); setEditingBlog(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!blogForm.title || !blogForm.summary) {
                      triggerLocalToast('Title and summary are required!', 'error');
                      return;
                    }
                    if (editingBlog) {
                      const updated = adminBlogs.map(b => b.id === editingBlog.id ? { ...b, ...blogForm } : b);
                      saveAdminBlogs(updated);
                      triggerLocalToast('Blog article updated!', 'success');
                    } else {
                      const newBlog = {
                        id: 'blog-' + Math.random().toString(36).slice(2, 9),
                        readTime: '4 min read',
                        views: 1,
                        ...blogForm
                      };
                      saveAdminBlogs([newBlog, ...adminBlogs]);
                      triggerLocalToast('Article published!', 'success');
                    }
                    setIsBlogModalOpen(false);
                    setEditingBlog(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUserModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingUser ? 'Edit Staff Profile' : 'Register New Staff'}
              </h3>
              <button 
                onClick={() => { setIsUserModalOpen(false); setEditingUser(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Staff Member Name</label>
                <input 
                  type="text" 
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="e.g. Binod Shrestha"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  placeholder="e.g. binod@lucky.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Assigned Role</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer text-slate-700"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="Editor">Editor</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="Customer Support">Customer Support</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Account Status</label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm({ ...userForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer text-slate-700"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Profile Avatar Photo</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {userForm.avatar ? (
                      <img src={userForm.avatar} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-user-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setUserForm({ ...userForm, avatar: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-user-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsUserModalOpen(false); setEditingUser(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!userForm.name || !userForm.email) {
                      triggerLocalToast('Name and Email are required!', 'error');
                      return;
                    }
                    if (editingUser) {
                      const updated = adminUsers.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u);
                      saveAdminUsers(updated);
                      triggerLocalToast('Staff user updated successfully!', 'success');
                    } else {
                      const newUser = {
                        id: 'user-' + Math.random().toString(36).slice(2, 9),
                        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        ...userForm
                      };
                      saveAdminUsers([newUser, ...adminUsers]);
                      triggerLocalToast('New staff user added!', 'success');
                    }
                    setIsUserModalOpen(false);
                    setEditingUser(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingUser ? 'Save Changes' : 'Add Staff'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCustomerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h3>
              <button 
                onClick={() => { setIsCustomerModalOpen(false); setEditingCustomer(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Customer Full Name</label>
                <input 
                  type="text" 
                  value={customerForm.name}
                  onChange={(e) => setCustomerForm({ ...customerForm, name: e.target.value })}
                  placeholder="e.g. Binita Gurung"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  value={customerForm.email}
                  onChange={(e) => setCustomerForm({ ...customerForm, email: e.target.value })}
                  placeholder="e.g. binita@gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Phone</label>
                  <input 
                    type="text" 
                    value={customerForm.phone}
                    onChange={(e) => setCustomerForm({ ...customerForm, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Loyalty Points</label>
                  <input 
                    type="number" 
                    value={customerForm.points}
                    onChange={(e) => setCustomerForm({ ...customerForm, points: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Customer Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {customerForm.avatar ? (
                      <img src={customerForm.avatar} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-customer-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setCustomerForm({ ...customerForm, avatar: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-customer-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsCustomerModalOpen(false); setEditingCustomer(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!customerForm.name || !customerForm.email) {
                      triggerLocalToast('Name and Email are required!', 'error');
                      return;
                    }
                    if (editingCustomer) {
                      const updated = adminCustomers.map(c => c.id === editingCustomer.id ? { ...c, ...customerForm } : c);
                      saveAdminCustomers(updated);
                      triggerLocalToast('Customer details saved!', 'success');
                    } else {
                      const newCust = {
                        id: 'cust-' + Math.random().toString(36).slice(2, 9),
                        ...customerForm
                      };
                      saveAdminCustomers([newCust, ...adminCustomers]);
                      triggerLocalToast('Customer registered successfully!', 'success');
                    }
                    setIsCustomerModalOpen(false);
                    setEditingCustomer(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingCustomer ? 'Save Changes' : 'Register Customer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingBanner ? 'Edit Promo Banner' : 'Create Promo Banner'}
              </h3>
              <button 
                onClick={() => { setIsBannerModalOpen(false); setEditingBanner(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Banner Main Title</label>
                <input 
                  type="text" 
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  placeholder="e.g. Dashain Festival discount"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Position Type</label>
                  <select
                    value={bannerForm.type}
                    onChange={(e) => setBannerForm({ ...bannerForm, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Hero Banner">Hero Banner</option>
                    <option value="Midway Ad Banner">Midway Ad Banner</option>
                    <option value="Footer Banner">Footer Banner</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Sort order</label>
                  <input 
                    type="number" 
                    value={bannerForm.sortOrder}
                    onChange={(e) => setBannerForm({ ...bannerForm, sortOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Target Redirect URL</label>
                <input 
                  type="text" 
                  value={bannerForm.link}
                  onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })}
                  placeholder="e.g. /offers"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Banner Background Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 rounded border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {bannerForm.image ? (
                      <img src={bannerForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-banner-image-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setBannerForm({ ...bannerForm, image: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-banner-image-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Upload banner
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsBannerModalOpen(false); setEditingBanner(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!bannerForm.title) {
                      triggerLocalToast('Banner title is required!', 'error');
                      return;
                    }
                    if (editingBanner) {
                      const updated = adminBanners.map(b => b.id === editingBanner.id ? { ...b, ...bannerForm } : b);
                      saveAdminBanners(updated);
                      triggerLocalToast('Banner updated successfully!', 'success');
                    } else {
                      const newB = {
                        id: 'banner-' + Math.random().toString(36).slice(2, 9),
                        ...bannerForm
                      };
                      saveAdminBanners([newB, ...adminBanners]);
                      triggerLocalToast('Banner created successfully!', 'success');
                    }
                    setIsBannerModalOpen(false);
                    setEditingBanner(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingBanner ? 'Save Changes' : 'Create Banner'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isPopupModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingPopup ? 'Edit Popup Campaign' : 'Create Popup Campaign'}
              </h3>
              <button 
                onClick={() => { setIsPopupModalOpen(false); setEditingPopup(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Campaign / Popup Name</label>
                <input 
                  type="text" 
                  value={popupForm.name}
                  onChange={(e) => setPopupForm({ ...popupForm, name: e.target.value })}
                  placeholder="e.g. Free delivery over Rs. 2000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Delay (Seconds)</label>
                  <input 
                    type="number" 
                    value={popupForm.delay}
                    onChange={(e) => setPopupForm({ ...popupForm, delay: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Display Frequency</label>
                  <select
                    value={popupForm.frequency}
                    onChange={(e) => setPopupForm({ ...popupForm, frequency: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Show Every Session">Show Every Session</option>
                    <option value="Show Once Per User">Show Once Per User</option>
                    <option value="Show Every 24 Hours">Show Every 24 Hours</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Redirect Link on Click</label>
                <input 
                  type="text" 
                  value={popupForm.url}
                  onChange={(e) => setPopupForm({ ...popupForm, url: e.target.value })}
                  placeholder="e.g. /offers"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] uppercase text-slate-400">Campaign Creative banner</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-10 rounded border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden relative">
                    {popupForm.image ? (
                      <img src={popupForm.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon size={18} className="text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <input 
                      type="file" 
                      accept="image/*"
                      id="modal-popup-uploader"
                      onChange={(e) => handleFileUpload(e, (base64) => setPopupForm({ ...popupForm, image: base64 }))}
                      className="hidden" 
                    />
                    <label 
                      htmlFor="modal-popup-uploader"
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 rounded-lg text-[10px] uppercase cursor-pointer transition-all"
                    >
                      Choose Graphic
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsPopupModalOpen(false); setEditingPopup(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!popupForm.name) {
                      triggerLocalToast('Campaign name is required!', 'error');
                      return;
                    }
                    if (editingPopup) {
                      const updated = adminPopups.map(p => p.id === editingPopup.id ? { ...p, ...popupForm } : p);
                      saveAdminPopups(updated);
                      triggerLocalToast('Popup configuration saved!', 'success');
                    } else {
                      const newP = {
                        id: 'popup-' + Math.random().toString(36).slice(2, 9),
                        ...popupForm
                      };
                      saveAdminPopups([newP, ...adminPopups]);
                      triggerLocalToast('Popup campaign registered!', 'success');
                    }
                    setIsPopupModalOpen(false);
                    setEditingPopup(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingPopup ? 'Save Changes' : 'Create Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isMarketingModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-sm w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider">
                {editingMarketing ? 'Edit Campaign' : 'Create Campaign'}
              </h3>
              <button 
                onClick={() => { setIsMarketingModalOpen(false); setEditingMarketing(null); }}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs font-bold text-slate-700">
              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Campaign Title</label>
                <input 
                  type="text" 
                  value={marketingForm.title}
                  onChange={(e) => setMarketingForm({ ...marketingForm, title: e.target.value })}
                  placeholder="e.g. Winter clearance newsletter blast"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase text-slate-400">Marketing message description</label>
                <textarea 
                  value={marketingForm.description}
                  onChange={(e) => setMarketingForm({ ...marketingForm, description: e.target.value })}
                  placeholder="Text contents to be sent to consumers..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl h-20 resize-none font-semibold text-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Audience Group</label>
                  <select
                    value={marketingForm.audience}
                    onChange={(e) => setMarketingForm({ ...marketingForm, audience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="All Subscribers">All Subscribers</option>
                    <option value="Gold & Platinum Members">Gold & Platinum Members</option>
                    <option value="Inactive users (90 Days)">Inactive users (90 Days)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Trigger system</label>
                  <select
                    value={marketingForm.trigger}
                    onChange={(e) => setMarketingForm({ ...marketingForm, trigger: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="Manual Broadcast">Manual Broadcast</option>
                    <option value="At signup event">At signup event</option>
                    <option value="On basket abandon">On basket abandon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Launch Date</label>
                  <input 
                    type="date" 
                    value={marketingForm.startDate}
                    onChange={(e) => setMarketingForm({ ...marketingForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase text-slate-400">Cease Date</label>
                  <input 
                    type="date" 
                    value={marketingForm.endDate}
                    onChange={(e) => setMarketingForm({ ...marketingForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-2.5">
                <button 
                  onClick={() => { setIsMarketingModalOpen(false); setEditingMarketing(null); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    if (!marketingForm.title || !marketingForm.description) {
                      triggerLocalToast('Title and message text are required!', 'error');
                      return;
                    }
                    if (editingMarketing) {
                      const updated = adminMarketing.map(m => m.id === editingMarketing.id ? { ...m, ...marketingForm } : m);
                      saveAdminMarketing(updated);
                      triggerLocalToast('Campaign configured successfully!', 'success');
                    } else {
                      const newM = {
                        id: 'mkt-' + Math.random().toString(36).slice(2, 9),
                        ...marketingForm
                      };
                      saveAdminMarketing([newM, ...adminMarketing]);
                      triggerLocalToast('Campaign created successfully!', 'success');
                    }
                    setIsMarketingModalOpen(false);
                    setEditingMarketing(null);
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all"
                >
                  {editingMarketing ? 'Save Changes' : 'Create Campaign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddOrderModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-4xl w-full overflow-hidden animate-scale-in text-left">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span>Place Custom Customer Order</span>
                <span className="text-[10px] font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded">AUTO-GEN ID</span>
              </h3>
              <button 
                onClick={() => setIsAddOrderModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400 hover:text-slate-600 shadow-2xs transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold text-slate-700">
              
              {/* Column 1: Customer Details & Shipping address */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Customer & Shipping Info
                </h4>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-slate-400 block mb-1">Customer Full Name *</label>
                    <input 
                      type="text"
                      placeholder="e.g. Ramesh Bhandari"
                      value={newOrderForm.customerName}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, customerName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Email Address</label>
                      <input 
                        type="email"
                        placeholder="e.g. ramesh@gmail.com"
                        value={newOrderForm.email}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Contact Phone</label>
                      <input 
                        type="text"
                        placeholder="e.g. +977 9845xxxxxx"
                        value={newOrderForm.phone}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-slate-400 block mb-1">Delivery Street Address</label>
                    <input 
                      type="text"
                      placeholder="e.g. New Road, Kathmandu"
                      value={newOrderForm.address}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">City / State</label>
                      <input 
                        type="text"
                        value={newOrderForm.city}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, city: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">ZIP Code</label>
                      <input 
                        type="text"
                        value={newOrderForm.zip}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, zip: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Payment Method</label>
                      <select
                        value={newOrderForm.paymentMethod}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value as any })}
                        className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="Khalti">Khalti</option>
                        <option value="eSewa">eSewa</option>
                        <option value="Stripe">Stripe</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Order Status</label>
                      <select
                        value={newOrderForm.status}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, status: e.target.value as any })}
                        className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Payment Status</label>
                      <select
                        value={newOrderForm.paymentStatus}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentStatus: e.target.value as any })}
                        className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Order Items List & Calculations */}
              <div className="space-y-4">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Items Basket & Financial Summary
                </h4>

                {/* Interactive Product selection list */}
                <div className="p-3 bg-blue-50/20 border border-blue-100/60 rounded-xl space-y-2">
                  <span className="text-[10px] uppercase text-blue-600 font-bold block">Quick Add Store Product</span>
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        const p = productsList.find(x => x.id === e.target.value);
                        if (p) {
                          setNewOrderForm({
                            ...newOrderForm,
                            items: [
                              ...newOrderForm.items,
                              { name: p.name, size: p.sizes?.[0] || 'M / L', price: p.price, quantity: 1, image: p.image }
                            ]
                          });
                          triggerLocalToast(`${p.name} added to new order.`, 'success');
                        }
                        e.target.value = '';
                      }
                    }}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none bg-white text-slate-700 cursor-pointer text-xs"
                  >
                    <option value="">-- Choose Product to Add --</option>
                    {productsList.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Rs. {p.price.toLocaleString()})</option>
                    ))}
                  </select>

                  {/* Add completely custom item inline */}
                  <div className="border-t border-slate-200/50 pt-2 grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      placeholder="Or type custom item name..."
                      id="new-order-custom-name"
                      className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[11px]"
                    />
                    <div className="grid grid-cols-2 gap-1">
                      <input 
                        type="number"
                        placeholder="Price..."
                        id="new-order-custom-price"
                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[11px]"
                      />
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleFileUpload(e, (base64) => {
                            const nameEl = document.getElementById('new-order-custom-name') as HTMLInputElement;
                            const priceEl = document.getElementById('new-order-custom-price') as HTMLInputElement;
                            if (nameEl && nameEl.value && priceEl && priceEl.value) {
                              setNewOrderForm({
                                ...newOrderForm,
                                items: [
                                  ...newOrderForm.items,
                                  {
                                    name: nameEl.value,
                                    size: 'One Size',
                                    price: Number(priceEl.value),
                                    quantity: 1,
                                    image: base64
                                  }
                                ]
                              });
                              nameEl.value = '';
                              priceEl.value = '';
                              triggerLocalToast('Custom uploadable item added!', 'success');
                            } else {
                              triggerLocalToast('Type name and price first!', 'error');
                            }
                          });
                        }}
                        className="text-[9px] text-slate-500 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:bg-blue-50 file:text-blue-700 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Selected items list */}
                <div className="max-h-36 overflow-y-auto space-y-2 border border-slate-150 p-2 rounded-xl">
                  {newOrderForm.items.length === 0 ? (
                    <div className="text-center py-6 text-slate-400 font-medium">
                      No items selected. Add products from the list above.
                    </div>
                  ) : (
                    newOrderForm.items.map((item, idx) => (
                      <div key={idx} className="p-1.5 bg-slate-50 rounded-lg border border-slate-150 flex items-center justify-between text-[11px]">
                        <div className="flex items-center gap-2">
                          <img src={item.image} alt="" className="w-6 h-6 rounded object-cover" />
                          <span className="font-bold truncate max-w-[150px]">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-mono">Rs. {item.price.toLocaleString()}</span>
                          <input 
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const updated = [...newOrderForm.items];
                              updated[idx].quantity = Number(e.target.value);
                              setNewOrderForm({ ...newOrderForm, items: updated });
                            }}
                            className="w-10 border border-slate-200 rounded px-1 py-0.5 text-center text-xs"
                          />
                          <button 
                            onClick={() => {
                              const updated = newOrderForm.items.filter((_, i) => i !== idx);
                              setNewOrderForm({ ...newOrderForm, items: updated });
                            }}
                            className="text-rose-500 hover:text-rose-700 font-bold px-1"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotals */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Shipping Cost (Rs.)</label>
                      <input 
                        type="number"
                        value={newOrderForm.shippingCharge}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, shippingCharge: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-1">Coupon Discount (Rs.)</label>
                      <input 
                        type="number"
                        value={newOrderForm.discount}
                        onChange={(e) => setNewOrderForm({ ...newOrderForm, discount: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-slate-400 block mb-1">Internal Note Memo</label>
                    <input 
                      type="text"
                      placeholder="e.g. Call customer before shipping."
                      value={newOrderForm.notes}
                      onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-[11px]"
                    />
                  </div>

                  {/* Grand total calculation */}
                  {(() => {
                    const subtotal = newOrderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const grandTotal = subtotal + newOrderForm.shippingCharge - newOrderForm.discount;
                    return (
                      <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl">
                        <span>Invoice Total Amount:</span>
                        <span className="font-mono text-emerald-700 text-sm font-black">
                          Rs. {grandTotal.toLocaleString()}
                        </span>
                      </div>
                    );
                  })()}
                </div>
              </div>

            </div>

            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsAddOrderModalOpen(false)}
                className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-black rounded-xl text-[10px] uppercase tracking-wider shadow-2xs transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (!newOrderForm.customerName) {
                    triggerLocalToast('Customer Name is required!', 'error');
                    return;
                  }
                  if (newOrderForm.items.length === 0) {
                    triggerLocalToast('Please add at least 1 product item to the order!', 'error');
                    return;
                  }

                  const generatedId = 'ORD-000' + (localOrdersList.length + 2569);
                  const subtotal = newOrderForm.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                  const amount = subtotal + newOrderForm.shippingCharge - newOrderForm.discount;
                  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                  const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

                  const newOrder = {
                    id: generatedId,
                    customerName: newOrderForm.customerName,
                    email: newOrderForm.email,
                    phone: newOrderForm.phone,
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                    location: `${newOrderForm.address}, ${newOrderForm.city}, ${newOrderForm.country}`,
                    shippingAddress: {
                      name: newOrderForm.customerName,
                      address: newOrderForm.address,
                      city: newOrderForm.city,
                      country: newOrderForm.country,
                      zip: newOrderForm.zip
                    },
                    amount,
                    subtotal,
                    shippingCharge: newOrderForm.shippingCharge,
                    discount: newOrderForm.discount,
                    status: newOrderForm.status,
                    paymentStatus: newOrderForm.paymentStatus,
                    paymentMethod: newOrderForm.paymentMethod,
                    date: dateStr,
                    time: timeStr,
                    items: newOrderForm.items.map(i => `${i.name} x ${i.quantity}`).join(', '),
                    detailedItems: [...newOrderForm.items],
                    notes: newOrderForm.notes,
                    source: 'via Admin Portal'
                  };

                  saveLocalOrdersList([newOrder, ...localOrdersList]);
                  setSelectedOrderId(generatedId);
                  triggerLocalToast(`Order ${generatedId} created successfully!`, 'success');
                  setIsAddOrderModalOpen(false);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-[10px] uppercase tracking-wider shadow-sm transition-all active:scale-95"
              >
                Place Customer Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BAR (EXACT SAME AS IMAGE) */}
      <footer className="bg-white border-t border-slate-100 py-4 px-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-semibold shadow-inner mt-auto select-none">
        <div>© 2025 Lucky Readymade & Shoe Center. All rights reserved.</div>
        <div className="flex items-center gap-1 mt-1 sm:mt-0">
          <span>Made with ❤️ by Your Company</span>
        </div>
      </footer>

    </div>
  );
}
