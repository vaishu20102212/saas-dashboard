import {
  LayoutGrid,
  BarChart2,
  Layers,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  X
} from 'lucide-react';
import BaseLogo from './BaseLogo';

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  onLogout
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'invoice', label: 'Invoice', icon: Layers },
    { id: 'schedule', label: 'Schedule', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 49 },
    { id: 'notification', label: 'Notification', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white flex flex-col justify-between py-6 px-4 z-50 transition-transform duration-300 border-r border-slate-100 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Logo */}
        <div>
          <div className="flex items-center justify-between px-3 mb-8">
            <BaseLogo />
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (setMobileOpen) setMobileOpen(false);
                  }}
                  className={`relative w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#ECEBFE] text-[#5B52F9] font-semibold'
                      : 'text-[#8E8EA1] hover:text-[#1E1B3A] hover:bg-gray-50'
                  }`}
                >
                  {/* Left edge indicator bar when active */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#5B52F9] rounded-r-md" />
                  )}

                  <div className="flex items-center gap-3.5">
                    <Icon
                      size={20}
                      className={`transition-colors ${
                        isActive
                          ? 'text-[#5B52F9]'
                          : 'text-[#8E8EA1] group-hover:text-[#1E1B3A]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded-full bg-[#FF4D4F] text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Upgrade Banner & User Profile */}
        <div className="space-y-4 pt-4">
          {/* Upgrade Banner matching screenshots */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#EFF4FE] to-[#F7FAFF] p-4 text-center border border-indigo-50/60 shadow-xs">
            {/* Visual 3D Cone spotlight SVG */}
            <div className="flex justify-center mb-3">
              <svg width="100" height="70" viewBox="0 0 120 80" fill="none">
                <line x1="60" y1="0" x2="60" y2="25" stroke="#4F46E5" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M60 25 L25 70 L95 70 Z" fill="url(#coneGrad)" opacity="0.85" />
                <ellipse cx="60" cy="70" rx="35" ry="6" fill="#6366F1" opacity="0.4" />
                <defs>
                  <linearGradient id="coneGrad" x1="60" y1="25" x2="60" y2="70" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#93C5FD" stopOpacity="0.8" />
                    <stop stopColor="#6366F1" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <button
              onClick={() => alert("Upgrade to Pro features: Unlimited Invoices, Multi-team workspaces, and Advanced Reports!")}
              className="w-full py-2.5 px-4 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
            >
              Upgrade Now
            </button>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <img
                src="/easin-arafat.png"
                alt="Easin Arafat"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-[#1E1B3A] leading-tight">
                  Easin Arafat
                </p>
                <p className="text-[11px] text-[#8E8EA1] leading-tight">
                  Free Account
                </p>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Logout / Sign In"
              className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
