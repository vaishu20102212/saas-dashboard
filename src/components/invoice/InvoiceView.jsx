import { useState, useEffect } from 'react';
import InvoiceList from './InvoiceList';
import CreateInvoice from './CreateInvoice';
import { ArrowLeft, CheckCircle2, X } from 'lucide-react';
import { initialInvoices } from '../../data/mockData';

const STORAGE_KEY = 'base_saas_invoices';

export default function InvoiceView() {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'create'
  const [invoices, setInvoices] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return initialInvoices;
  });

  const [editingInvoice, setEditingInvoice] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch (e) {
      console.error(e);
    }
  }, [invoices]);

  const handleSaveInvoice = (invoice) => {
    if (editingInvoice) {
      setInvoices((currentInvoices) =>
        currentInvoices.map((currentInvoice) =>
          currentInvoice.id === editingInvoice.id
            ? { ...currentInvoice, ...invoice }
            : currentInvoice
        )
      );
      setToastMessage(`Invoice ${invoice.id} updated successfully!`);
    } else {
      setInvoices((currentInvoices) => [invoice, ...currentInvoices]);
      setToastMessage(`Invoice ${invoice.id} created successfully!`);
    }
    setEditingInvoice(null);
    setViewMode('list');

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Success Notification Banner */}
      {toastMessage && (
        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-semibold text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-600 hover:text-emerald-800 p-1"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {viewMode === 'create' ? (
        <div>
          <button
            onClick={() => {
              setEditingInvoice(null);
              setViewMode('list');
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B52F9] hover:underline mb-4 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Invoices</span>
          </button>
          <CreateInvoice
            invoice={editingInvoice}
            onSave={handleSaveInvoice}
          />
        </div>
      ) : (
        <InvoiceList
          invoices={invoices}
          setInvoices={setInvoices}
          onAddNew={() => {
            setEditingInvoice(null);
            setViewMode('create');
          }}
          onEdit={(invoice) => {
            setEditingInvoice(invoice);
            setViewMode('create');
          }}
        />
      )}
    </div>
  );
}
