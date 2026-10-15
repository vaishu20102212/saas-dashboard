import React from 'react';
import { MoreHorizontal, Star } from 'lucide-react';
import { initialTopProducts } from '../../data/mockData';

export default function TopSellingList() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#1E1B3A]">Top Selling Products</h2>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {initialTopProducts.map((prod) => (
          <div
            key={prod.id}
            className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50/70 transition-colors"
          >
            {/* Blue background container for product photo */}
            <div className="w-20 h-16 rounded-xl bg-[#DCE9F8] flex items-center justify-center p-2 shrink-0">
              <img
                src={prod.image}
                alt={prod.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-sm"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#1E1B3A] truncate">
                {prod.name}
              </h4>

              {/* 5 Yellow Stars */}
              <div className="flex items-center gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-[#FFC107] fill-[#FFC107]"
                  />
                ))}
              </div>

              <p className="text-xs font-bold text-[#1E1B3A]">
                ${prod.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
