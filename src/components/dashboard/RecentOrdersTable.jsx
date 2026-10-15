import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { initialOrders } from '../../data/mockData';

export default function RecentOrdersTable() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#1E1B3A]">Recent Orders</h2>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-[#8E8EA1] font-semibold border-b border-gray-100/80">
              <th className="pb-3 font-semibold">Tracking no <span className="text-[10px]">▾</span></th>
              <th className="pb-3 font-semibold">Product Name <span className="text-[10px]">▾</span></th>
              <th className="pb-3 font-semibold">Price <span className="text-[10px]">▾</span></th>
              <th className="pb-3 font-semibold">Total Order <span className="text-[10px]">▾</span></th>
              <th className="pb-3 font-semibold text-right">Total Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {initialOrders.map((order, idx) => (
              <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                <td className="py-3.5 font-medium text-[#1E1B3A]">{order.id}</td>
                <td className="py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-7 h-7 rounded-md object-cover ring-1 ring-gray-100"
                    />
                    <span className="font-semibold text-[#1E1B3A]">{order.name}</span>
                  </div>
                </td>
                <td className="py-3.5 text-[#1E1B3A] font-medium">{order.price}</td>
                <td className="py-3.5">
                  <span className="inline-block px-3 py-1 rounded-md bg-[#D9F7F6] text-[#009688] font-bold text-[11px]">
                    {order.totalOrder}
                  </span>
                </td>
                <td className="py-3.5 text-right font-medium text-[#1E1B3A]">
                  {order.totalAmount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
