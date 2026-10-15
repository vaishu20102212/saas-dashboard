import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export default function AnalyticsDonut() {
  // 80% Transactions donut chart matching screenshot
  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-bold text-[#1E1B3A]">Analytics</h2>
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="relative flex items-center justify-center py-2">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#F4F5F9"
              strokeWidth="11"
              
            />
            {/* Blue Segment (Sale): 48% -> strokeDasharray: 114 238 */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#437EF7"
              strokeWidth="11"
              strokeDasharray="110 238"
              strokeDashoffset="-19"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {/* Yellow Segment (Distribute): 26% -> strokeDasharray: 62 238 */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#FFC107"
              strokeWidth="11"
              strokeDasharray="50 238"
              strokeDashoffset="-90"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
            {/* Coral Segment (Return): 20% -> strokeDasharray: 48 238 */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#FA6400"
              strokeWidth="11"
              strokeDasharray="55 238"
              strokeDashoffset="-145"
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#1E1B3A] tracking-tight">80%</span>
            <span className="text-xs text-[#8E8EA1] font-medium mt-0.5">Transactions</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#437EF7]" />
          <span className="text-xs font-medium text-[#5E6482]">Sale</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
          <span className="text-xs font-medium text-[#5E6482]">Distribute</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FA6400]" />
          <span className="text-xs font-medium text-[#5E6482]">Return</span>
        </div>
      </div>
    </div>
  );
}
