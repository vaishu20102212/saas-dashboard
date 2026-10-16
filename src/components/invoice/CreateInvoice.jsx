import { useState } from 'react';
import {
  Camera,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Printer,
  Download,
  CheckCircle2,
  Send,
  Mail,
  X,
  Paperclip
} from 'lucide-react';

const createInvoiceId = () => `#${Math.floor(100000 + Math.random() * 900000)}`;

const formatDateInputValue = (dateVal) => {
  if (!dateVal) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) return dateVal;

  const slashDate = dateVal.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashDate) {
    const [, day, month, year] = slashDate;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  const parsed = new Date(dateVal);
  if (Number.isNaN(parsed.getTime())) return '';
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (dateVal) => {
  if (!dateVal) {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  if (typeof dateVal === 'string' && (dateVal.includes(',') || dateVal.includes('/'))) {
    return dateVal;
  }
  if (typeof dateVal === 'string' && dateVal.includes('-')) {
    const parts = dateVal.split('-');
    if (parts.length === 3) {
      const parsed = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
    }
  }
  const parsed = new Date(dateVal);
  if (!isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return dateVal;
};

export default function CreateInvoice({ invoice, onSave }) {
  const [invoiceId, setInvoiceId] = useState(() => invoice?.id || createInvoiceId());
  const [date, setDate] = useState(() => formatDateInputValue(invoice?.date));
  const [name, setName] = useState(() => invoice?.name || '');
  const [email, setEmail] = useState(() => invoice?.email || '');
  const [address, setAddress] = useState(() => invoice?.address || '');
  const [items, setItems] = useState(() => {
    return invoice?.items || [];
  });

  const [formError, setFormError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState('');

  // Email form states for Send Invoice Modal
  const [recipientEmail, setRecipientEmail] = useState(() => email || 'Example@gmail.com');
  const [emailSubject, setEmailSubject] = useState(() => `Invoice ${invoiceId || '#876370'} from Base Technologies`);
  const [emailMessage, setEmailMessage] = useState(
    () => `Hello ${name || 'Alison'},\n\nPlease find attached invoice ${invoiceId || '#876370'} for your review.\n\nThank you for choosing Base Technologies!`
  );

  const [newItemName, setNewItemName] = useState('');
  const [newItemRate, setNewItemRate] = useState('');
  const [newItemQty, setNewItemQty] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const addItem = () => {
    const rate = Number(newItemRate);
    const qty = Number(newItemQty);
    if (!newItemName.trim() || rate <= 0 || qty <= 0) {
      setFormError('Enter a product name, a rate, and a quantity greater than zero.');
      return;
    }

    setItems((current) => [
      ...current,
      {
        id: Date.now(),
        name: newItemName.trim(),
        rate,
        qty,
        amount: rate * qty
      }
    ]);
    setNewItemName('');
    setNewItemRate('');
    setNewItemQty('');
    setIsAddingItem(false);
    setFormError('');
  };

  const updateItem = (id, field, value) => {
    setItems((current) =>
      current.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'rate' || field === 'qty') {
            const r = field === 'rate' ? Number(value) || 0 : item.rate;
            const q = field === 'qty' ? Number(value) || 0 : item.qty;
            updated.amount = r * q;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((i) => i.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const buildInvoiceObject = (status = 'Pending') => {
    const finalName = name.trim();
    const finalEmail = (recipientEmail || email || invoice?.email || '').trim();
    const finalAddress = address.trim();
    const finalId = invoiceId.trim().startsWith('#') ? invoiceId.trim() : `#${invoiceId.trim()}`;
    const formattedDate = date.trim()
      ? formatDisplayDate(date)
      : invoice?.date || '';
    const finalItems = items;
    const totalAmount = finalItems.reduce((sum, item) => sum + item.amount, 0);

    return {
      id: finalId,
      date: formattedDate,
      name: finalName,
      email: finalEmail,
      address: finalAddress,
      items: finalItems,
      total: totalAmount,
      avatar: invoice?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      status: invoice?.status || status,
      favorite: invoice?.favorite || false
    };
  };

  const validateInvoice = () => {
    if (invoice) {
      setFormError('');
      return true;
    }

    if (!date.trim() || !name.trim() || !email.trim() || !address.trim()) {
      setFormError('Complete the invoice date and customer details before saving.');
      return false;
    }
    if (items.length === 0) {
      setFormError('Add at least one product before saving the invoice.');
      return false;
    }
    setFormError('');
    return true;
  };

  // Direct Form Submit (Create / Save Invoice)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInvoice()) return;

    const newInvoiceObj = buildInvoiceObject(invoice ? invoice.status : 'Pending');
    setShowSuccess(true);

    setTimeout(() => {
      onSave?.(newInvoiceObj);
    }, 400);
  };

  // Open Send Modal
  const handleOpenSendModal = () => {
    if (!validateInvoice()) return;
    setRecipientEmail(email);
    setEmailSubject(`Invoice ${invoiceId} from Base Technologies`);
    setEmailMessage(
      `Hello ${name || 'there'},\n\nPlease find attached invoice ${invoiceId} for $${total.toLocaleString()} USD.\n\nThank you for choosing Base Technologies!`
    );
    setIsSendModalOpen(true);
  };

  // Confirm Send Invoice
  const handleConfirmSend = () => {
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSendSuccessMessage(`Invoice ${invoiceId} sent to ${recipientEmail} successfully!`);

      const sentInvoiceObj = buildInvoiceObject('Complete');

      setTimeout(() => {
        setIsSendModalOpen(false);
        onSave?.(sentInvoiceObj);
      }, 700);
    }, 600);
  };

  const subtotal = items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Column: Create New Invoice Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-gray-100/60 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1E1B3A]">
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h2>
          {showSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full animate-in fade-in">
              <CheckCircle2 size={14} />
              <span>Invoice Saved!</span>
            </div>
          )}
        </div>

        {/* Camera upload circle */}
        <div className="flex justify-center">
          <label className="w-24 h-24 rounded-full bg-[#F4F5F9] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-[#5B52F9] cursor-pointer transition-colors">
            <Camera size={26} />
            <input type="file" className="hidden" accept="image/*" />
          </label>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
              Invoice Id
            </label>
            <input
              type="text"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 font-semibold"
              placeholder="#876370"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
              Date
            </label>
            <div className="relative">
              <input
                type="date"
                aria-label="Invoice date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 cursor-pointer"
              />
              <Calendar
                size={16}
                className="absolute right-3 top-3 text-[#5B52F9] pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setRecipientEmail(email);
            }}
            placeholder="Alison G."
            className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setRecipientEmail(e.target.value);
              }}
              placeholder="Example@gmail.com"
              className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street"
                className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
              />
              <MapPin
                size={16}
                className="absolute right-3 top-3 text-[#5B52F9] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Product Description section matching screenshot 12 */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-[#1E1B3A]">Product Description</h3>
            <button
              onClick={() => {
                setIsAddingItem((current) => !current);
                setFormError('');
              }}
              type="button"
              title="Add Product"
              aria-label={isAddingItem ? 'Close add product form' : 'Add product'}
              className="w-7 h-7 rounded-full bg-[#5B52F9] text-white flex items-center justify-center hover:bg-[#4a42db] transition-colors shadow-xs cursor-pointer"
            >
              {isAddingItem ? <X size={16} /> : <Plus size={16} />}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-[#8E8EA1] font-semibold border-b border-gray-100">
                  <th className="pb-2.5">Product Name <span className="text-[10px]">▾</span></th>
                  <th className="pb-2.5">Rate <span className="text-[10px]">▾</span></th>
                  <th className="pb-2.5">QTY <span className="text-[10px]">▾</span></th>
                  <th className="pb-2.5">Amount <span className="text-[10px]">▾</span></th>
                  <th className="pb-2.5 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-2.5 font-medium text-[#3B82F6]">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#5B52F9] focus:outline-none w-full"
                      />
                    </td>
                    <td className="py-2.5 text-[#1E1B3A]">
                      <div className="flex items-center gap-1">
                        <span>$</span>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                          className="w-16 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#5B52F9] focus:outline-none"
                        />
                      </div>
                    </td>
                    <td className="py-2.5 text-[#5E6482]">
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItem(item.id, 'qty', e.target.value)}
                          className="w-12 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#5B52F9] focus:outline-none"
                        />
                        <span>Pcs</span>
                      </div>
                    </td>
                    <td className="py-2.5 font-bold text-[#1FA44B]">
                      ${(Number(item.amount) || 0).toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isAddingItem && (
          <div className="flex flex-col sm:flex-row items-center gap-2 mt-3 pt-3 border-t border-gray-100">
            <input
              type="text"
              placeholder="New Item Name"
              aria-label="New product name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addItem();
                }
              }}
              className="px-2.5 py-1.5 text-xs bg-[#F8F9FD] border border-gray-200 rounded-lg flex-1 w-full"
            />
            <input
              type="number"
              placeholder="Rate ($)"
              aria-label="Product rate"
              value={newItemRate}
              onChange={(e) => setNewItemRate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addItem();
                }
              }}
              className="px-2 py-1.5 text-xs bg-[#F8F9FD] border border-gray-200 rounded-lg w-full sm:w-24"
            />
            <input
              type="number"
              placeholder="Qty"
              aria-label="Product quantity"
              value={newItemQty}
              onChange={(e) => setNewItemQty(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addItem();
                }
              }}
              className="px-2 py-1.5 text-xs bg-[#F8F9FD] border border-gray-200 rounded-lg w-full sm:w-20"
            />
            <button
              type="button"
              onClick={addItem}
              className="px-3 py-1.5 bg-[#5B52F9] text-white rounded-lg text-xs font-semibold hover:bg-[#4a42db] whitespace-nowrap w-full sm:w-auto cursor-pointer"
            >
              Add Item
            </button>
          </div>
          )}

          {formError && (
            <p role="alert" className="mt-3 text-xs font-medium text-red-600">
              {formError}
            </p>
          )}
        </div>

        {/* Action Buttons: Send Invoice & Create Invoice */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleOpenSendModal}
            className="flex-1 py-3 px-4 border-2 border-[#5B52F9] text-[#5B52F9] hover:bg-indigo-50 rounded-xl text-xs font-semibold transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Send size={14} />
            <span>Send Invoice</span>
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98 cursor-pointer"
          >
            {invoice ? 'Save Changes' : 'Create Invoice'}
          </button>
        </div>
      </form>

      {/* Right Column: Invoice Preview matching Screenshot 12 */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-gray-100/60 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1E1B3A]">Preview</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert("Invoice PDF downloaded successfully!")}
              className="p-2 text-gray-400 hover:text-[#5B52F9] rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              title="Download PDF"
            >
              <Download size={18} />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-gray-400 hover:text-[#5B52F9] rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              title="Print"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>

        {/* Invoice Paper Document */}
        <div className="bg-[#FAFBFD] p-6 sm:p-8 rounded-xl border border-gray-200/70 text-xs space-y-6">
          {/* Top Branding */}
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white font-extrabold text-xl shadow-xs">
              J
            </div>
            <div className="text-right text-[11px] text-[#8E8EA1] space-y-0.5">
              <p>your.mail@gmail.com</p>
              <p>+386 714 505 8385</p>
            </div>
          </div>

          {/* Recipient & Invoice Info */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-[10px] font-bold text-[#8E8EA1] uppercase tracking-wider mb-1">RECIPIENT</p>
              <h4 className="font-bold text-[#1E1B3A]">{name || 'JOHN SMITH'}</h4>
              <p className="text-[#8E8EA1] text-[11px] leading-relaxed mt-1">
                {address || '4384 Liberty Avenue'}<br />
                92680 Tustin, CA<br />
                VAT no.: 12345678<br />
                {email || 'company.mail@gmail.com'}<br />
                +386 714 505 8385
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-2xl font-extrabold text-[#1E1B3A] tracking-tight mb-2">INVOICE</h3>
              <p className="text-[11px] text-[#8E8EA1]">
                <span className="font-semibold text-[#1E1B3A]">INVOICE NO:</span> {invoiceId}
              </p>
              <p className="text-[11px] text-[#8E8EA1] mt-0.5">
                <span className="font-semibold text-[#1E1B3A]">INVOICE DATE:</span>{' '}
                {date ? formatDisplayDate(date) : 'Select a date'}
              </p>
            </div>
          </div>

          {/* Line items table */}
          <div className="pt-2">
            <table className="w-full text-left text-[11px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 text-[#8E8EA1] uppercase text-[10px]">
                  <th className="pb-2 font-bold">TASK DESCRIPTION</th>
                  <th className="pb-2 font-bold text-center">QTY</th>
                  <th className="pb-2 font-bold text-center">RATE</th>
                  <th className="pb-2 font-bold text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5 font-medium text-[#1E1B3A]">{item.name}</td>
                    <td className="py-2.5 text-center text-[#5E6482]">{item.qty} Pcs</td>
                    <td className="py-2.5 text-center text-[#5E6482]">${item.rate} USD</td>
                    <td className="py-2.5 text-right font-semibold text-[#1E1B3A]">
                      ${(Number(item.amount) || 0).toLocaleString()} USD
                    </td>
                  </tr>
                ))}
                {items.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-3 text-center text-[#8E8EA1]">
                      Add products to see them in the invoice preview.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Calculations */}
            <div className="pt-3 border-t border-gray-200 text-right space-y-1.5 text-[11px]">
              <div className="flex justify-between text-[#8E8EA1]">
                <span>SUBTOTAL</span>
                <span className="font-semibold text-[#1E1B3A]">${subtotal.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between text-[#8E8EA1]">
                <span>DISCOUNT 5%</span>
                <span className="font-semibold text-[#1E1B3A]">${discount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-sm font-extrabold text-[#3B82F6]">
                <span>TOTAL</span>
                <span>${total.toLocaleString()} USD</span>
              </div>
            </div>
          </div>

          {/* Bank transfer info & Notes */}
          <div className="pt-4 border-t border-gray-200 text-[10px] text-[#8E8EA1] space-y-2">
            <p className="leading-relaxed">
              Transfer the amount to the business account below. Please include invoice number on your check.<br />
              <strong className="text-[#1E1B3A]">BANK:</strong> FTSBU533 &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong className="text-[#1E1B3A]">IBAN:</strong> GB82-1111-2222-3333
            </p>
            <div className="pt-2">
              <p className="font-bold text-[#1E1B3A] uppercase mb-1">NOTES</p>
              <p className="leading-relaxed">
                All amounts are in dollars. Please make the payment within 15 days from the issue of date of this invoice. Tax is not charged on the basis of paragraph 1 of Article 94 of the Value Added Tax Act (I am not liable for VAT).
              </p>
            </div>
            <p className="italic text-[#1E1B3A] pt-1">Thank you for your confidence in my work.<br />Signature</p>
          </div>
        </div>
      </div>

      {/* Send Invoice Modal */}
      {isSendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => !isSending && setIsSendModalOpen(false)}
          />

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#5B52F9] flex items-center justify-center">
                  <Mail size={16} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1E1B3A]">Send Invoice</h3>
                  <p className="text-[11px] text-[#8E8EA1]">Dispatch invoice directly to your client via email</p>
                </div>
              </div>
              <button
                disabled={isSending}
                onClick={() => setIsSendModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {sendSuccessMessage ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-base font-bold text-[#1E1B3A]">Invoice Dispatched!</h4>
                <p className="text-xs text-[#5E6482]">{sendSuccessMessage}</p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-[#1E1B3A] mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 font-medium"
                    placeholder="client@company.com"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B3A] mb-1">Email Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#1E1B3A] mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 resize-none"
                  />
                </div>

                {/* Attachment badge */}
                <div className="flex items-center gap-2 p-2.5 bg-[#F8F9FD] rounded-xl border border-gray-200 text-gray-600">
                  <Paperclip size={14} className="text-[#5B52F9]" />
                  <span className="font-semibold text-[11px] text-[#1E1B3A]">{invoiceId}_Invoice_Document.pdf</span>
                  <span className="text-[10px] text-[#8E8EA1] ml-auto">({total.toLocaleString()} USD)</span>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={() => setIsSendModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#8E8EA1] hover:text-[#1E1B3A] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isSending}
                    onClick={handleConfirmSend}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 active:scale-98 cursor-pointer disabled:opacity-50"
                  >
                    {isSending ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send & Save Invoice</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
