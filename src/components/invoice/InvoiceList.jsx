import { useState } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Mail,
  Calendar,
  Star,
  MoreHorizontal,
  Edit2
} from 'lucide-react';

export default function InvoiceList({ invoices, setInvoices, onAddNew, onEdit }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(['#876213', '#876987', '#872345', '#878769']);
  const [activeMenuId, setActiveMenuId] = useState('#876364'); // default open on first row matching screenshot 4

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInvoices.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInvoices.map((inv) => inv.id));
    }
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setInvoices(
      invoices.map((inv) =>
        inv.id === id ? { ...inv, favorite: !inv.favorite } : inv
      )
    );
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setInvoices(invoices.filter((inv) => inv.id !== id));
    setActiveMenuId(null);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setInvoices(invoices.filter((inv) => !selectedIds.includes(inv.id)));
    setSelectedIds([]);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
      {/* Top Header matching screenshots 3 & 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-[#1E1B3A]">Invoice List</h2>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-48 sm:w-64 pl-4 pr-9 py-2 bg-[#F8F9FD] rounded-xl text-xs text-[#1E1B3A] border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
            />
            <Search
              size={14}
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Add New Button */}
          <button
            onClick={onAddNew}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
          >
            <Plus size={16} />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-[#8E8EA1] font-semibold border-b border-gray-100">
              <th className="pb-3.5 w-10">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === filteredInvoices.length &&
                    filteredInvoices.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded text-[#5B52F9] accent-[#5B52F9]"
                />
              </th>
              <th className="pb-3.5">Invoice Id <span className="text-[10px]">▾</span></th>
              <th className="pb-3.5">Name <span className="text-[10px]">▾</span></th>
              <th className="pb-3.5">Email <span className="text-[10px]">▾</span></th>
              <th className="pb-3.5">Date <span className="text-[10px]">▾</span></th>
              <th className="pb-3.5">Status <span className="text-[10px]">▾</span></th>
              <th className="pb-3.5 w-10"></th>
              <th className="pb-3.5 text-right w-10">
                {selectedIds.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    title="Delete Selected"
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredInvoices.map((inv, index) => {
              const isChecked = selectedIds.includes(inv.id);
              const isMenuOpen = activeMenuId === inv.id;

              return (
                <tr
                  key={`${inv.id}-${index}`}
                  className={`hover:bg-gray-50/70 transition-colors ${
                    isChecked ? 'bg-indigo-50/30' : ''
                  }`}
                >
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(inv.id)}
                      className="w-4 h-4 rounded text-[#5B52F9] accent-[#5B52F9]"
                    />
                  </td>
                  <td className="py-3.5 font-semibold text-[#1E1B3A]">{inv.id}</td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={inv.avatar}
                        alt={inv.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-100"
                      />
                      <span className="font-semibold text-[#1E1B3A]">{inv.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2 text-[#5E6482]">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Mail size={12} />
                      </div>
                      <span className="truncate max-w-[180px]">{inv.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2 text-[#5E6482]">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Calendar size={12} />
                      </div>
                      <span>{inv.date}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-semibold ${
                        inv.status === 'Complete'
                          ? 'bg-[#E3F9E9] text-[#1FA44B]'
                          : inv.status === 'Sent'
                          ? 'bg-[#EBF3FF] text-[#3B82F6]'
                          : inv.status === 'Pending'
                          ? 'bg-[#FFF3E8] text-[#F38A35]'
                          : 'bg-[#FEECEE] text-[#F14658]'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <button
                      onClick={(e) => toggleFavorite(inv.id, e)}
                      className="text-gray-300 hover:text-amber-400 p-1 transition-colors"
                    >
                      <Star
                        size={15}
                        className={
                          inv.favorite
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }
                      />
                    </button>
                  </td>
                  <td className="py-3.5 text-right relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(isMenuOpen ? null : inv.id);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {/* Dropdown Popup matching screenshot 4 */}
                    {isMenuOpen && (
                      <div
                        className="absolute right-0 top-10 w-28 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onEdit(inv);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                        >
                          <Edit2 size={12} className="text-blue-500" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={(e) => handleDelete(inv.id, e)}
                          className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={12} className="text-red-500" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
