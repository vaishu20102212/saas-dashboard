import { useState } from 'react';
import { Menu, ChevronDown } from 'lucide-react';

const formatDate = (value) => {
  const [year, month, day] = value.split('-');
  return `${day}-${month}-${year}`;
};

export default function Header({
  title,
  subtitle,
  onOpenMobileSidebar,
  showDatePickers = false,
  rightActions = null
}) {
  const [startDate, setStartDate] = useState('2021-06-10');
  const [endDate, setEndDate] = useState('2021-10-10');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-gray-500 hover:text-gray-700 bg-white border border-gray-200 rounded-xl shadow-2xs"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B3A] tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-[#8E8EA1] mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {rightActions}

        {showDatePickers && (
          <div className="flex items-center gap-2">
            <label className="relative flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-white px-3.5 py-2 text-xs font-semibold text-[#1E1B3A] shadow-2xs hover:border-gray-200">
              <span>{formatDate(startDate)}</span>
              <ChevronDown size={14} className="text-gray-400" />
              <input
                type="date"
                aria-label="Start date"
                value={startDate}
                max={endDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
            <label className="relative flex cursor-pointer items-center gap-2 rounded-xl border border-gray-100 bg-white px-3.5 py-2 text-xs font-semibold text-[#1E1B3A] shadow-2xs hover:border-gray-200">
              <span>{formatDate(endDate)}</span>
              <ChevronDown size={14} className="text-gray-400" />
              <input
                type="date"
                aria-label="End date"
                value={endDate}
                min={startDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
