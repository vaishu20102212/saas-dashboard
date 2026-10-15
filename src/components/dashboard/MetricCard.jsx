import { Heart, ShoppingBag } from 'lucide-react';

export default function MetricCard({ type, value, label }) {
  const configs = {
    save: {
      icon: Heart,
      bg: 'bg-[#EBF3FF]',
      color: 'text-[#3B82F6]'
    },
    stock: {
      bg: 'bg-[#FFF8E7]',
      color: 'text-[#F59E0B]'
    },
    sales: {
      icon: ShoppingBag,
      bg: 'bg-[#FFF0EB]',
      color: 'text-[#FF6B4A]'
    },
    job: {
      bg: 'bg-[#F3E8FF]',
      color: 'text-[#8B5CF6]'
    }
  };

  const config = configs[type] || configs.save;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-gray-100/60 bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${config.bg} ${config.color}`}>
        {type === 'stock' || type === 'sales' || type === 'job' ? (
          <img
            src={
              type === 'stock'
                ? '/stock-products.png'
                : type === 'sales'
                  ? '/sales-products.png'
                  : '/job-application.png'
            }
            alt=""
            className="h-8 w-8 object-contain"
          />
        ) : (
          <Icon size={22} className="fill-current" />
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight text-[#1E1B3A]">{value}</h3>
        <p className="mt-0.5 text-xs font-medium text-[#8E8EA1]">{label}</p>
      </div>
    </div>
  );
}
