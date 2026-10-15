import { Award, TrendingUp, Headphones, Package, Footprints, Shirt, Watch } from 'lucide-react';
import { initialProductAnalytics } from '../../data/mockData';

export default function ProductAnalytics({ products }) {
  const { totalProduct, newAdded, totalSales, salesToday, monthlyAdds } = initialProductAnalytics;
  const topProductsTable = products ?? initialProductAnalytics.topProductsTable;

  // Maximum value for horizontal bar chart scaling
  const maxAddValue = 35000;

  const renderIcon = (icon) => {
    switch (icon) {
      case 'headphones': return <Headphones size={14} className="text-gray-700" />;
      case 'box': return <Package size={14} className="text-gray-700" />;
      case 'shoe': return <Footprints size={14} className="text-gray-700" />;
      case 'shirt': return <Shirt size={14} className="text-gray-700" />;
      case 'watch': return <Watch size={14} className="text-gray-700" />;
      default: return <Shirt size={14} className="text-gray-700" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 2 Wide Metric Cards with Spline Waves */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Product Card */}
        <div className="relative h-[220px] overflow-hidden rounded-2xl border border-gray-100/60 bg-white p-6 shadow-2xs">
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F3F7FF] text-[#5B8FF9]">
                <img src="/total-product.png" alt="" className="h-8 w-8 object-contain" />
              </div>
              <div>
                <p className="text-base font-medium text-[#5E5B78]">Total Product</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-[#55536F]">
                  {totalProduct}
                </h3>
              </div>
            </div>
            <span className="ml-auto hidden shrink-0 pt-2 text-sm font-medium text-[#25A84A] sm:block">
              {newAdded}
            </span>
          </div>

          {/* Smooth Blue Wave Graphic */}
          <div className="absolute inset-x-0 bottom-0 h-28 w-full">
            <svg viewBox="0 0 500 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="prodWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5B8FF9" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0 82 C42 88, 55 85, 80 72 S125 58, 158 65 S202 38, 230 30 S270 48, 300 52 S350 50, 382 35 S425 12, 458 20 S485 22, 500 4 L500 100 L0 100 Z"
                fill="url(#prodWave)"
              />
              <path
                d="M0 82 C42 88, 55 85, 80 72 S125 58, 158 65 S202 38, 230 30 S270 48, 300 52 S350 50, 382 35 S425 12, 458 20 S485 22, 500 4"
                fill="none"
                stroke="#5B8FF9"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="absolute bottom-3 right-5 z-10 text-xs font-medium text-[#25A84A] sm:hidden">
            {newAdded}
          </span>
        </div>

        {/* Total Sales Card */}
        <div className="relative h-[220px] overflow-hidden rounded-2xl border border-gray-100/60 bg-white p-6 shadow-2xs">
          <div className="relative z-10 flex items-start gap-5">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#FFFAEF] text-[#FFB91F]">
                <img src="/total-sales.png?v=2" alt="" className="h-12 w-12 object-contain" />
              </div>
              <div>
                <p className="text-base font-medium text-[#5E5B78]">Total Sales</p>
                <h3 className="mt-1 text-3xl font-bold tracking-tight text-[#55536F]">
                  {totalSales}
                </h3>
              </div>
            </div>
            <span className="ml-auto hidden shrink-0 pt-2 text-sm font-medium text-[#25A84A] sm:block">
              {salesToday}
            </span>
          </div>

          {/* Smooth Yellow Wave Graphic */}
          <div className="absolute inset-x-0 bottom-0 h-28 w-full">
            <svg viewBox="0 0 500 100" className="h-full w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="salesWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD05B" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M0 48 C28 55, 44 57, 68 48 S108 37, 136 43 S177 58, 203 43 S236 16, 263 28 S300 55, 334 59 S381 49, 411 39 S450 33, 475 42 S492 45, 500 34 L500 100 L0 100 Z"
                fill="url(#salesWave)"
              />
              <path
                d="M0 48 C28 55, 44 57, 68 48 S108 37, 136 43 S177 58, 203 43 S236 16, 263 28 S300 55, 334 59 S381 49, 411 39 S450 33, 475 42 S492 45, 500 34"
                fill="none"
                stroke="#FFD05B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="absolute bottom-3 right-5 z-10 text-xs font-medium text-[#25A84A] sm:hidden">
            {salesToday}
          </span>
        </div>
      </div>

      {/* Main Content: Left Top Selling Products & Right Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Top Selling Products Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-[#1E1B3A]">Top Selling Products</h3>
            <button className="text-xs font-semibold text-[#5B52F9] hover:underline">
              See More
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="text-[#8E8EA1] font-semibold border-b border-gray-100">
                  <th className="pb-3 w-12">SN <span className="text-[10px]">▾</span></th>
                  <th className="pb-3">Name <span className="text-[10px]">▾</span></th>
                  <th className="pb-3">Price <span className="text-[10px]">▾</span></th>
                  <th className="pb-3">Total Order <span className="text-[10px]">▾</span></th>
                  <th className="pb-3 text-right">Total Sales <span className="text-[10px]">▾</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topProductsTable.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 font-medium">
                      {item.badge === 'gold' ? (
                        <Award size={18} className="text-[#F59E0B]" />
                      ) : item.badge === 'silver' ? (
                        <Award size={18} className="text-[#9CA3AF]" />
                      ) : item.badge === 'bronze' ? (
                        <Award size={18} className="text-[#D97706]" />
                      ) : (
                        <span className="text-[#8E8EA1] font-semibold pl-1">{item.sn}</span>
                      )}
                    </td>
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          {renderIcon(item.icon)}
                        </div>
                        <span className="font-semibold text-[#3B82F6] hover:underline cursor-pointer">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-[#1E1B3A] font-semibold">{item.price}</td>
                    <td className="py-3.5 text-[#8E8EA1] font-medium">{item.totalOrder}</td>
                    <td className="py-3.5 text-right font-bold text-[#039855]">
                      {item.totalSales}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Product Add by Month & Product Sales Analytics */}
        <div className="space-y-6">
          {/* Product Add by Month */}
          <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
            <h3 className="text-sm font-bold text-[#1E1B3A] mb-4">Product Add by Month</h3>

            <div className="space-y-3">
              {monthlyAdds.map((item, idx) => {
                const pct = (item.value / maxAddValue) * 100;
                return (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <span className="w-8 text-[#8E8EA1] font-medium">{item.month}</span>
                    <div className="flex-1 bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${pct}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <span className="w-14 text-right font-semibold text-[#1E1B3A]">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Product Sales Analytics */}
          <div className="bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#1E1B3A]">Product Sales Analytics</h3>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#F4F5F9"
                    strokeWidth="10"
                  />
                  {/* Blue arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#437EF7"
                    strokeWidth="10"
                    strokeDasharray="95 226"
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  {/* Yellow arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#FFC107"
                    strokeWidth="10"
                    strokeDasharray="75 226"
                    strokeDashoffset="-105"
                    strokeLinecap="round"
                  />
                  {/* Coral arc */}
                  <circle
                    cx="50"
                    cy="50"
                    r="36"
                    fill="transparent"
                    stroke="#FA6400"
                    strokeWidth="10"
                    strokeDasharray="40 226"
                    strokeDashoffset="-185"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center trend icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#437EF7]">
                    <TrendingUp size={20} />
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-[11px] font-medium text-[#5E6482]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#437EF7]" />
                <span>Total Sales</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
                <span>Total Order</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FA6400]" />
                <span>Order Cancel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
