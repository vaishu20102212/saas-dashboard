import { useState } from 'react';
import {
  Plus,
  Mail,
  Phone,
  MapPin,
  MoreHorizontal,
  Edit2,
  Trash2
} from 'lucide-react';

export default function CustomerList({
  customers,
  setCustomers,
  selectedCustomerId,
  setSelectedCustomerId,
  onOpenAddCustomer,
  onEditCustomer
}) {
  const [menuOpenId, setMenuOpenId] = useState(null);

  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) || customers[0];
  const getCustomerAvatar = (customer) =>
    customer.id === 1 ? '/john-deo.png?v=2' : customer.avatar;

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setCustomers((currentCustomers) =>
      currentCustomers.filter((customer) => customer.id !== id)
    );
    setMenuOpenId(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left/Middle Column: Customer Table */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#1E1B3A]">Customer List</h2>
          <button
            onClick={onOpenAddCustomer}
            className="flex items-center gap-2 px-4 py-2 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
          >
            <Plus size={16} />
            <span>Add Customer</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[#8E8EA1] font-semibold border-b border-gray-100">
                <th className="pb-3.5">Name <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5">Email <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5">Phone number <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5">Gender <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => {
                const isSelected = c.id === selectedCustomerId;
                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomerId(c.id)}
                    className={`cursor-pointer transition-colors relative ${
                      isSelected ? 'bg-indigo-50/40 font-medium' : 'hover:bg-gray-50/60'
                    }`}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={getCustomerAvatar(c)}
                          alt={c.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-100"
                        />
                        <span className="font-semibold text-[#1E1B3A]">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-[#5E6482]">{c.email}</td>
                    <td className="py-3 text-[#5E6482]">{c.phone}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${
                          c.gender === 'Male'
                            ? 'bg-[#EBF3FF] text-[#3B82F6]'
                            : 'bg-[#FFF0EB] text-[#FF6B4A]'
                        }`}
                      >
                        {c.gender}
                      </span>
                    </td>
                    <td className="py-3 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenId(menuOpenId === c.id ? null : c.id);
                        }}
                        className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {/* Dropdown Menu matching screenshot 7 */}
                      {menuOpenId === c.id && (
                        <div
                          className="absolute right-0 top-10 w-28 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-30 animate-in fade-in zoom-in-95"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setMenuOpenId(null);
                              onEditCustomer(c);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                          >
                            <Edit2 size={12} className="text-blue-500" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={(e) => handleDelete(c.id, e)}
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

      {/* Right Column: Customer Details & Performance Pane matching Screenshot 7 */}
      {selectedCustomer && (
        <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60 flex flex-col justify-between space-y-6">
          {/* Header & Avatar */}
          <div className="text-center">
            <img
              src={getCustomerAvatar(selectedCustomer)}
              alt={selectedCustomer.name}
              className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-indigo-50 shadow-sm"
            />
            <h3 className="text-lg font-bold text-[#1E1B3A] mt-3">{selectedCustomer.name}</h3>
            <p className="text-xs text-[#8E8EA1] font-medium">{selectedCustomer.role}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold text-[#1E1B3A] mb-3">Contact Info</h4>
            <div className="space-y-2.5 text-xs text-[#5E6482]">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-gray-400 shrink-0" />
                <span className="truncate">{selectedCustomer.workEmail}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-gray-400 shrink-0" />
                <span>{selectedCustomer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span>{selectedCustomer.location}</span>
              </div>
            </div>
          </div>

          {/* Performance Section with Bar Chart & 2 Circular Gauges */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-[#1E1B3A]">Performance</h4>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreHorizontal size={14} />
              </button>
            </div>

            {/* Vertical Bar Chart matching screenshot 7 */}
            <div className="h-28 w-full flex items-end justify-between gap-2 px-2 pt-6 pb-1 relative">
              {/* Tooltip on Feb (2.33k) */}
              <div className="absolute left-[24%] top-0 transform -translate-x-1/2 bg-[#FF7A50] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                2.33k
                <div className="w-1.5 h-1.5 bg-[#FF7A50] transform rotate-45 mx-auto -mb-1 mt-0.5" />
              </div>

              {selectedCustomer.performance?.monthly.map((bar, idx) => {
                const heightPct = (bar.val / 4.2) * 100;
                const isHighlight = bar.month === 'Feb';

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <div
                      className={`w-full max-w-[12px] rounded-t-full transition-all duration-300 ${
                        isHighlight ? 'bg-[#FF7A50]' : 'bg-[#FFE2D9]'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] text-[#8E8EA1] font-medium">{bar.month}</span>
                  </div>
                );
              })}
            </div>

            {/* 2 Circular Progress Rings */}
            <div className="flex items-center justify-around pt-4 mt-2 border-t border-gray-50">
              {/* Yellow ring 70% */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    className="text-gray-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke="#FFC107"
                    strokeWidth="4"
                    strokeDasharray={`${selectedCustomer.performance?.score1 || 70}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[#1E1B3A]">
                  {selectedCustomer.performance?.score1 || 70}%
                </span>
              </div>

              {/* Blue ring 60% */}
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <path
                    className="text-gray-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    stroke="#437EF7"
                    strokeWidth="4"
                    strokeDasharray={`${selectedCustomer.performance?.score2 || 60}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-xs font-bold text-[#1E1B3A]">
                  {selectedCustomer.performance?.score2 || 60}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
