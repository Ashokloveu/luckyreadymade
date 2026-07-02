import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, Download, Upload, Printer, FileSpreadsheet, 
  Send, CheckCircle, ArrowLeft, RefreshCw, UploadCloud, X, ArrowUpRight
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  taxRate: number; // e.g. 0, 5, 12, 18, 28
}

interface InstantInvoicePageProps {
  onBack?: () => void;
  onSaved?: () => void;
}

// Convert a number to English Words for Nepali/Indian Rupee Denominations (Rupees & Paise)
function numberToWords(num: number): string {
  if (num === 0) return 'Zero Rupees Only';
  
  const singleDigits = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teenDigits = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const doubleDigits = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  const formatTens = (n: number): string => {
    if (n < 10) return singleDigits[n];
    if (n < 20) return teenDigits[n - 10];
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    return doubleDigits[tens] + (ones > 0 ? ' ' + singleDigits[ones] : '');
  };
  
  const formatHundreds = (n: number): string => {
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    let str = '';
    if (hundreds > 0) {
      str += singleDigits[hundreds] + ' Hundred';
    }
    if (rest > 0) {
      if (str !== '') str += ' and ';
      str += formatTens(rest);
    }
    return str;
  };

  let rupeePart = Math.floor(num);
  let paisePart = Math.round((num - rupeePart) * 100);

  let words = '';

  if (rupeePart > 0) {
    // Crore
    const crores = Math.floor(rupeePart / 10000000);
    rupeePart %= 10000000;
    if (crores > 0) {
      words += formatHundreds(crores) + ' Crore ';
    }

    // Lakh
    const lakhs = Math.floor(rupeePart / 100000);
    rupeePart %= 100000;
    if (lakhs > 0) {
      words += formatHundreds(lakhs) + ' Lakh ';
    }

    // Thousand
    const thousands = Math.floor(rupeePart / 1000);
    rupeePart %= 1000;
    if (thousands > 0) {
      words += formatHundreds(thousands) + ' Thousand ';
    }

    // Rest
    if (rupeePart > 0) {
      words += formatHundreds(rupeePart);
    }
    
    words += ' Rupees';
  }

  if (paisePart > 0) {
    if (words !== '') words += ' and ';
    words += formatTens(paisePart) + ' Paise';
  }

  return words.trim() + ' Only';
}

export default function InstantInvoicePage({ onBack, onSaved }: InstantInvoicePageProps) {
  // --- STATE FOR BUSINESS INFORMATION ---
  const [businessName, setBusinessName] = useState('Lucky Readymade & Shoes Center');
  const [businessAddress, setBusinessAddress] = useState('Ward No. 3, Tinkune, Kathmandu, Nepal');
  const [businessPhone, setBusinessPhone] = useState('9800000000');
  const [businessGSTIN, setBusinessGSTIN] = useState('29AAAAA1111A1Z1');
  const [businessLogo, setBusinessLogo] = useState<string>(() => {
    // Default nice red shirt/shoe minimal SVG icon
    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" fill="%23fee2e2" rx="20"/><path d="M30 40 L45 25 L55 25 L70 40 L60 40 L60 75 L40 75 L40 40 Z" fill="%23ef4444"/><circle cx="50" cy="50" r="5" fill="white"/></svg>';
  });

  // --- STATE FOR INVOICE DETAILS ---
  const [invoiceNo, setInvoiceNo] = useState('01');
  const [invoiceDate, setInvoiceDate] = useState('2026-06-28');

  // --- STATE FOR BILL TO ---
  const [customerName, setCustomerName] = useState('Ramesh Sharma Store');

  // --- STATE FOR ITEMS LIST ---
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: 'item-1', name: 'Item Name', qty: 1.00, price: 0.00, taxRate: 0 },
    { id: 'item-2', name: 'Item Name', qty: 1.00, price: 0.00, taxRate: 0 },
    { id: 'item-3', name: 'Item Name', qty: 1.00, price: 0.00, taxRate: 0 },
    { id: 'item-4', name: 'Item Name', qty: 1.00, price: 0.00, taxRate: 0 },
  ]);

  // --- STATE FOR PAYMENTS ---
  const [receivedAmount, setReceivedAmount] = useState<string>('0.00');
  const [notes, setNotes] = useState('Thanks for shopping with us!');

  // --- NOTIFICATION STATE ---
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // --- LOGO FILE UPLOAD HANDLING ---
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast('Image exceeds maximum permitted size of 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setBusinessLogo(reader.result as string);
        triggerToast('Business logo loaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // --- CSV / EXCEL ITEM LOADER ---
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (!text) return;
        
        try {
          const lines = text.split('\n');
          const parsedItems: InvoiceItem[] = [];
          
          // Skip header if it starts with word character, try to guess
          let startIndex = 0;
          if (lines[0].toLowerCase().includes('name') || lines[0].toLowerCase().includes('item')) {
            startIndex = 1;
          }

          for (let i = startIndex; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            const cols = line.split(',');
            if (cols.length >= 2) {
              const name = cols[0].replace(/"/g, '').trim();
              const qty = parseFloat(cols[1]) || 1.00;
              const price = parseFloat(cols[2]) || 0.00;
              const taxRate = parseFloat(cols[3]) || 0;
              parsedItems.push({
                id: `csv-${Date.now()}-${i}`,
                name,
                qty,
                price,
                taxRate
              });
            }
          }

          if (parsedItems.length > 0) {
            setItems(parsedItems);
            triggerToast(`Successfully loaded ${parsedItems.length} items from CSV spreadsheet!`, 'success');
          } else {
            triggerToast('Could not find any valid item columns in CSV file.', 'error');
          }
        } catch (err) {
          triggerToast('Failed to parse CSV file formatting.', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  // --- ITEM CRUD HANDLERS ---
  const handleAddItemRow = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}-${items.length}`,
      name: 'Item Name',
      qty: 1.00,
      price: 0.00,
      taxRate: 0
    };
    setItems([...items, newItem]);
    triggerToast('Added empty item row', 'info');
  };

  const handleDeleteItemRow = (id: string) => {
    if (items.length <= 1) {
      triggerToast('Invoice must have at least one line item', 'error');
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        let parsed = value;
        if (field === 'qty' || field === 'price' || field === 'taxRate') {
          parsed = parseFloat(value) || 0;
        }
        return { ...item, [field]: parsed };
      }
      return item;
    }));
  };

  // --- MATH CALCULATION ENGINE ---
  const subTotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  
  // Calculate total GST dynamically
  const gstTotal = items.reduce((sum, item) => sum + (item.qty * item.price * (item.taxRate / 100)), 0);
  
  // Splits
  const cgstAmount = gstTotal / 2;
  const sgstAmount = gstTotal / 2;
  
  const grandTotal = subTotal + gstTotal;
  const balanceDue = Math.max(0, grandTotal - (parseFloat(receivedAmount) || 0));

  // --- SAVE ACTION ---
  const handleSaveInvoice = () => {
    const currentInvoicesStr = localStorage.getItem('lucky_billing_invoices') || '[]';
    let currentInvoices: any[] = [];
    try {
      currentInvoices = JSON.parse(currentInvoicesStr);
    } catch (e) {
      currentInvoices = [];
    }

    const newSavedInvoice = {
      id: `INV-2026-${invoiceNo.padStart(4, '0')}`,
      date: new Date(invoiceDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      plan: `Instant Sale (${customerName || 'Walk-in Customer'})`,
      amount: grandTotal,
      status: balanceDue <= 0 ? 'Paid' : 'Pending',
      paymentMethod: 'Cash/Scan QR'
    };

    localStorage.setItem('lucky_billing_invoices', JSON.stringify([newSavedInvoice, ...currentInvoices]));
    triggerToast(`Invoice #${invoiceNo} for Rs. ${grandTotal.toLocaleString()} saved to local system!`, 'success');
    if (onSaved) {
      setTimeout(() => onSaved(), 1000);
    }
  };

  // --- PRINT WINDOW TRIGGER ---
  const handlePrintInvoice = () => {
    const printContent = document.getElementById('printable-invoice-card');
    if (!printContent) {
      triggerToast('Invoice elements could not be packaged.', 'error');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=800');
    if (!printWindow) {
      triggerToast('Popup blocked! Please allow popups to open the print wizard.', 'error');
      return;
    }

    const inlineStyles = `
      <html>
        <head>
          <title>Invoice #${invoiceNo} - Lucky Readymade & Shoes Center</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .font-display { font-family: 'Space-Grotesk', sans-serif; }
            .font-mono { font-family: 'JetBrains Mono', monospace; }
          </style>
        </head>
        <body class="bg-white p-8">
          <div class="max-w-4xl mx-auto border border-slate-200 p-8 rounded-2xl shadow-sm bg-white">
            ${printContent.innerHTML}
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(inlineStyles);
    printWindow.document.close();
  };

  // --- DOWNLOAD EXCEL ---
  const handleDownloadExcel = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += `Invoice Details,Invoice No: #${invoiceNo},Date: ${invoiceDate}\n`;
    csvContent += `Business,${businessName},Address: ${businessAddress},Phone: ${businessPhone},GSTIN: ${businessGSTIN}\n`;
    csvContent += `Bill To,Customer Name: ${customerName}\n\n`;
    csvContent += '#,Item Name,QTY,Price/Unit (Rs),Tax (%),Amount (Rs)\n';
    
    items.forEach((item, index) => {
      const lineAmt = item.qty * item.price;
      csvContent += `${index + 1},"${item.name.replace(/"/g, '""')}",${item.qty.toFixed(2)},${item.price.toFixed(2)},${item.taxRate}%,${lineAmt.toFixed(2)}\n`;
    });
    
    csvContent += `\nSub Total,,,Rs. ${subTotal.toFixed(2)}\n`;
    csvContent += `SGST@9% (Split),,,Rs. ${sgstAmount.toFixed(2)}\n`;
    csvContent += `CGST@9% (Split),,,Rs. ${cgstAmount.toFixed(2)}\n`;
    csvContent += `Total,,,Rs. ${grandTotal.toFixed(2)}\n`;
    csvContent += `Balance Due,,,Rs. ${balanceDue.toFixed(2)}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Lucky_Invoice_${invoiceNo}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('Excel sheet downloaded successfully!', 'success');
  };

  // --- SEND WHATSAPP ---
  const handleSendWhatsApp = () => {
    const formattedDate = new Date(invoiceDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const message = `Hello *${customerName}*,\n\nHere is your digital invoice summary from *${businessName}*:\n\n*Invoice No:* #${invoiceNo}\n*Date:* ${formattedDate}\n\n*Total Amount:* Rs. ${grandTotal.toLocaleString()}\n*Amount Paid:* Rs. ${(parseFloat(receivedAmount) || 0).toLocaleString()}\n*Balance Due:* Rs. ${balanceDue.toLocaleString()}\n\nThank you for shopping with us! Join us again soon.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/977${businessPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    triggerToast('Pre-filled WhatsApp messenger link triggered!', 'info');
  };

  return (
    <div className="space-y-6 text-slate-800 relative pb-16">
      
      {/* Dynamic Toast Feedback */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-xl border text-xs font-black uppercase flex items-center gap-2.5 animate-scale-up ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-300 text-emerald-800' :
          toast.type === 'error' ? 'bg-rose-50 border-rose-300 text-rose-800' :
          'bg-blue-50 border-blue-300 text-blue-800'
        }`}>
          {toast.type === 'success' && <CheckCircle size={16} className="text-emerald-500" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* TOP HEADER MENU NAVIGATION SIMILAR TO SCREENSHOT */}
      <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm text-left">
        <div className="flex items-center gap-4">
          {onBack && (
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold text-[#ef4444] tracking-tight">Lucky</span>
              <span className="text-xl font-bold text-slate-800 tracking-tight">Readymade & Shoes Center</span>
            </div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">Premium Quality | Best Price</p>
          </div>
        </div>

        {/* Action Controls Header Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            onClick={handleSaveInvoice}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle size={14} />
            <span>Save Invoice</span>
          </button>
          <button 
            onClick={handlePrintInvoice}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Printer size={14} />
            <span>Print Invoice</span>
          </button>
          <button 
            onClick={handleDownloadExcel}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase tracking-wider rounded-lg border border-slate-200 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <FileSpreadsheet size={14} />
            <span>Excel Sheet</span>
          </button>
          <button 
            onClick={handleSendWhatsApp}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider rounded-lg border border-emerald-200 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <Send size={14} />
            <span>Send WhatsApp</span>
          </button>
        </div>
      </div>

      {/* PRIMARY GRID SPLIT: EDIT FORM ON LEFT, BEAUTIFUL RECEIPT PREVIEW ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
        
        {/* LEFT COMPONENT COLUMN (FORM INPUTS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Business Information */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Business Information
            </h3>

            {/* Logo + Name grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Business Logo Section */}
              <div className="md:col-span-4 flex flex-col items-center">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block w-full mb-1">Business Logo</label>
                <div className="relative group w-24 h-24 border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center p-2">
                  <img src={businessLogo} alt="Logo" className="max-w-full max-h-full object-contain" />
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                    <UploadCloud size={16} className="text-white" />
                    <span className="text-[8px] text-white font-black uppercase mt-1">Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-bold">JPG, PNG (Max. 2MB)</span>
              </div>

              {/* Business Name input */}
              <div className="md:col-span-8 space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase block">Business Name *</label>
                  <input 
                    type="text" 
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-red-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase block">GSTIN (Optional)</label>
                  <input 
                    type="text" 
                    value={businessGSTIN}
                    placeholder="e.g. 29AAAAA1111A1Z1"
                    onChange={(e) => setBusinessGSTIN(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address, Phone, & GSTIN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase block">Business Address *</label>
                <input 
                  type="text" 
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase block">Phone *</label>
                <input 
                  type="text" 
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Invoice Details & Bill To split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Invoice parameters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                Invoice Details
              </h3>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase block">Invoice Number *</label>
                <input 
                  type="text" 
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase block">Invoice Date *</label>
                <input 
                  type="date" 
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>
            </div>

            {/* Bill To */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  Bill To
                </h3>
                <span className="text-[9px] text-blue-600 font-extrabold uppercase hover:underline cursor-pointer">or pick from list</span>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase block">Customer Name *</label>
                <input 
                  type="text" 
                  value={customerName}
                  placeholder="Enter Customer Name"
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Quick selectors for local stores as seen in screenshot */}
              <div className="pt-1.5 space-y-1.5">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">Quick Pick Client Stores:</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Ramesh Sharma Store', 'Anita Kirana Bhandar', 'Bikas Medical Hall'].map(client => (
                    <button 
                      key={client}
                      onClick={() => {
                        setCustomerName(client);
                        triggerToast(`Client switched to "${client}"`, 'info');
                      }}
                      className={`px-2.5 py-1 text-[9px] font-extrabold uppercase rounded-lg border transition-all ${
                        customerName === client 
                          ? 'bg-purple-50 border-purple-300 text-purple-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                      }`}
                    >
                      {client.split(' ')[0] + ' ' + (client.split(' ')[1] || '')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Card 3: Items Grid (addable, uploadable table!) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Line Items Catalog
                </h3>
                <p className="text-[10px] text-slate-400 font-bold">Configure checkout quotas, unit base rates, and applicable GST</p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* CSV Excel item loader */}
                <label className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-black uppercase rounded-lg cursor-pointer transition-colors border border-blue-200">
                  <Upload size={12} />
                  <span>Upload CSV/Excel</span>
                  <input 
                    type="file" 
                    accept=".csv, .txt" 
                    onChange={handleCSVUpload}
                    className="hidden"
                  />
                </label>
                
                <button 
                  onClick={handleAddItemRow}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <Plus size={12} />
                  <span>Add Row</span>
                </button>
              </div>
            </div>

            {/* Main Items Input Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-extrabold uppercase text-[10px] tracking-wider select-none pb-2">
                    <th className="py-2 w-8">#</th>
                    <th className="py-2 px-3">Item Name *</th>
                    <th className="py-2 px-2 w-20 text-center">QTY</th>
                    <th className="py-2 px-2 w-28 text-right">Price/Unit (Rs)</th>
                    <th className="py-2 px-3 w-24 text-center">Tax (%)</th>
                    <th className="py-2 px-2 w-24 text-right">Amount (Rs)</th>
                    <th className="py-2 w-10 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-semibold">
                  {items.map((item, index) => {
                    const lineAmount = item.qty * item.price;
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-3 text-slate-400 text-[11px] font-black">{index + 1}</td>
                        
                        {/* Item Name */}
                        <td className="py-2 px-3">
                          <input 
                            type="text" 
                            value={item.name}
                            onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:bg-white focus:border-red-400"
                          />
                        </td>

                        {/* Quantity */}
                        <td className="py-2 px-2">
                          <input 
                            type="number" 
                            step="0.01"
                            value={item.qty}
                            onChange={(e) => handleUpdateItem(item.id, 'qty', e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-slate-700 text-center focus:outline-none focus:bg-white"
                          />
                        </td>

                        {/* Unit Price */}
                        <td className="py-2 px-2">
                          <input 
                            type="number" 
                            step="0.01"
                            value={item.price}
                            onChange={(e) => handleUpdateItem(item.id, 'price', e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-slate-700 text-right focus:outline-none focus:bg-white"
                          />
                        </td>

                        {/* Tax select dropdown */}
                        <td className="py-2 px-3">
                          <select 
                            value={item.taxRate}
                            onChange={(e) => handleUpdateItem(item.id, 'taxRate', e.target.value)}
                            className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 focus:outline-none focus:bg-white"
                          >
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                          </select>
                        </td>

                        {/* Line Amount (computed) */}
                        <td className="py-2 px-2 text-right font-black text-slate-800 text-[11px]">
                          {lineAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>

                        {/* Row deletion control */}
                        <td className="py-2 text-center">
                          <button 
                            onClick={() => handleDeleteItemRow(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors border border-slate-100"
                            title="Delete Item"
                          >
                            <Trash2 size={12} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Card Row: Payment details + notes split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Invoice Summary input panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Invoice Payments Summary
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase block">Total Invoice Amt (Rs)</label>
                    <input 
                      type="text" 
                      disabled
                      value={grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-500 text-left"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase block">Amount Received (Rs) *</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={receivedAmount}
                      onChange={(e) => setReceivedAmount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-slate-800 text-left focus:outline-none"
                    />
                  </div>
                </div>

                {/* Display balance block colored green or yellow based on values */}
                <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-between">
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wide">Pending Balance:</span>
                  <span className="text-sm font-black text-emerald-700">Rs. {balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>

            {/* Optional remarks block */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-2 h-2 rounded-full bg-slate-500" />
                Optional Notes & Remarks
              </h3>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-500 uppercase block">Invoice Footer Remarks Message</label>
                <textarea 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Thanks for shopping with us!"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
                />
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT LIVE PREVIEW PANEL COLUMN (DURABLE PAPER INVOICE STYLE AS IMAGE) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Real-time Print Receipt Preview</h4>
            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
              <RefreshCw size={10} className="animate-spin" />
              Auto-Synced
            </span>
          </div>

          {/* DUST-CRISP PAPER CARD CONTAINER EXACTLY IN STYLE OF MOCK */}
          <div 
            id="printable-invoice-card"
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md text-slate-900 select-all font-sans relative overflow-hidden"
          >
            {/* Top decorative watermark/corner color */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none" />

            {/* Receipt Header block */}
            <div className="flex justify-between items-start gap-4 border-b border-slate-100 pb-5">
              
              {/* Left Side: Logo and business names */}
              <div className="text-left space-y-2 max-w-[60%]">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-xl p-1.5 flex items-center justify-center shrink-0">
                    <img src={businessLogo} alt="Preview Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-[#ef4444] tracking-tight leading-none">{businessName.split(' ')[0]}</h2>
                    <p className="text-[10px] font-bold text-slate-800 leading-snug">{businessName.split(' ').slice(1).join(' ')}</p>
                    <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mt-0.5">Premium Quality | Best Price</p>
                  </div>
                </div>

                <div className="space-y-0.5 pt-2 text-[9px] text-slate-500 leading-tight">
                  <p className="font-semibold text-slate-600">{businessAddress}</p>
                  <p className="font-semibold">Phone: <span className="text-slate-700 font-bold">{businessPhone}</span></p>
                  {businessGSTIN && <p className="font-mono text-[8px]">GSTIN: <span className="font-bold text-slate-700">{businessGSTIN}</span></p>}
                </div>
              </div>

              {/* Right Side: Invoice metadata header */}
              <div className="text-right space-y-1">
                <h1 className="text-sm font-black text-slate-800 tracking-wider uppercase">Instant Invoice</h1>
                <span className="inline-block bg-red-600 text-white text-[9px] font-extrabold px-3 py-1 rounded uppercase tracking-widest select-none">
                  Invoice
                </span>
                
                <div className="pt-2 text-[10px] space-y-0.5 font-semibold text-slate-500">
                  <p>Invoice No: <span className="text-slate-800 font-black">#{invoiceNo}</span></p>
                  <p>Date: <span className="text-slate-800 font-bold">{new Date(invoiceDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span></p>
                </div>
              </div>

            </div>

            {/* Split billing details table address */}
            <div className="grid grid-cols-2 gap-4 py-4 text-xs font-semibold leading-tight border-b border-slate-100">
              
              {/* Bill To Info */}
              <div className="text-left space-y-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Bill To:</span>
                <p className="text-xs font-black text-slate-800 underline decoration-red-200 decoration-2">
                  {customerName || 'Enter Customer Name'}
                </p>
              </div>

              {/* Status block info */}
              <div className="text-right space-y-1">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Settlement Channel:</span>
                <p className="text-[10px] font-black text-emerald-600 uppercase">
                  {balanceDue <= 0 ? 'Full Settlement (Cash)' : 'Deferred Account Credit'}
                </p>
              </div>

            </div>

            {/* Crisp preview table columns list */}
            <div className="py-4">
              <table className="w-full text-left text-[11px] leading-snug">
                <thead>
                  <tr className="border-b border-slate-150 text-slate-400 font-extrabold uppercase text-[8px] tracking-wider pb-1">
                    <th className="py-1 w-6">#</th>
                    <th className="py-1 px-2">Item Name</th>
                    <th className="py-1 px-1 text-center w-12">QTY</th>
                    <th className="py-1 px-1 text-right w-20">Price/Unit</th>
                    <th className="py-1 px-1 text-center w-12">Tax</th>
                    <th className="py-1 px-1 text-right w-20">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {items.map((item, idx) => {
                    const lineAmt = item.qty * item.price;
                    return (
                      <tr key={item.id} className="align-middle">
                        <td className="py-2 font-black text-slate-400">{idx + 1}</td>
                        <td className="py-2 px-2 font-bold text-slate-800 text-[10px]">{item.name}</td>
                        <td className="py-2 px-1 text-center font-bold text-slate-700">{item.qty.toFixed(2)}</td>
                        <td className="py-2 px-1 text-right font-bold text-slate-700">{item.price.toFixed(2)}</td>
                        <td className="py-2 px-1 text-center font-bold text-slate-500">{item.taxRate}%</td>
                        <td className="py-2 px-1 text-right font-black text-slate-900">{lineAmt.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom calculation details blocks split */}
            <div className="border-t border-slate-150 pt-3 flex flex-col sm:flex-row sm:justify-between gap-4 text-xs font-semibold">
              
              {/* Amount in words */}
              <div className="text-left max-w-sm space-y-1 leading-snug sm:w-1/2">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Amount in words:</span>
                <p className="text-[10px] font-black text-[#ef4444] leading-tight">
                  {numberToWords(grandTotal)}
                </p>
                {notes && (
                  <div className="pt-2">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">Remarks:</span>
                    <p className="text-[9px] italic text-slate-500 font-medium mt-0.5">"{notes}"</p>
                  </div>
                )}
              </div>

              {/* Pricing totals list ledger exact splits */}
              <div className="text-right space-y-1.5 sm:w-1/2">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Sub Total:</span>
                  <span className="font-bold text-slate-700">Rs. {subTotal.toFixed(2)}</span>
                </div>
                {gstTotal > 0 && (
                  <>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>SGST@9% (Split):</span>
                      <span className="font-bold text-slate-700">Rs. {sgstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>CGST@9% (Split):</span>
                      <span className="font-bold text-slate-700">Rs. {cgstAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-xs font-black text-slate-900 border-t border-slate-100 pt-1.5">
                  <span className="text-[11px]">Total:</span>
                  <span className="text-[11px] text-red-600">Rs. {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
                  <span>Balance Due:</span>
                  <span>Rs. {balanceDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

            </div>

            {/* Thank you and footer of receipt exact as given image */}
            <div className="border-t border-slate-100 pt-4 mt-4 text-center space-y-1 text-[9px] font-bold text-slate-400 tracking-wide select-none leading-tight">
              <p className="text-slate-500">Thank you for trusting Lucky Readymade & Shoes Center.</p>
              <p className="text-[8px]">Certified offline GST accounting ledger.</p>
            </div>

          </div>

          {/* Share Block Section at bottom of preview */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-wider">Export & Share Node</h4>
              <p className="text-[8px] text-slate-400 font-bold">Instantly broadcast PDF receipt documents to your vendors</p>
            </div>
            
            <button 
              onClick={handlePrintInvoice}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 text-[10px] font-black uppercase rounded-lg shadow-2xs transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <span>Trigger PDF</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
