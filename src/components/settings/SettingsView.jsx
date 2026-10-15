import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Save } from 'lucide-react';

export default function SettingsView({ onOpenMobileSidebar }) {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Easin Arafat',
    email: 'arafat.design@base.io',
    phone: '+1 (555) 349-2810',
    company: 'Base Technologies Ltd',
    role: 'Lead UI/UX Designer'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1100px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1E1B3A] tracking-tight">Settings</h1>
        <p className="text-xs text-[#8E8EA1] mt-0.5">Manage your account preferences and integrations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 bg-white rounded-2xl p-3 shadow-2xs border border-gray-100/60 space-y-1">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#ECEBFE] text-[#5B52F9]'
                    : 'text-[#8E8EA1] hover:text-[#1E1B3A] hover:bg-gray-50'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Pane */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-gray-100/60 space-y-6">
          {activeSection === 'profile' && (
            <form onSubmit={handleSave} className="space-y-5">
              <h3 className="text-base font-bold text-[#1E1B3A]">Profile Details</h3>

              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-indigo-50"
                />
                <div>
                  <button
                    type="button"
                    className="px-3 py-1.5 bg-[#F8F9FD] border border-gray-200 text-[#1E1B3A] rounded-xl text-xs font-semibold hover:border-[#5B52F9]"
                  >
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-[#8E8EA1] mt-1">JPG or PNG under 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">Role / Designation</label>
                  <input
                    type="text"
                    value={profile.role}
                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 active:scale-98"
                >
                  <Save size={15} />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {activeSection === 'billing' && (
            <div className="space-y-5">
              <h3 className="text-base font-bold text-[#1E1B3A]">Subscription Plan</h3>
              <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#5B52F9] text-white">Current Plan</span>
                  <h4 className="text-lg font-extrabold text-[#1E1B3A] mt-2">Free Starter</h4>
                  <p className="text-xs text-[#5E6482]">Limited to 100 invoices and 3 teammates</p>
                </div>
                <button
                  onClick={() => alert("Upgrade dialog")}
                  className="px-5 py-2.5 bg-[#5B52F9] text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-200 hover:bg-[#4a42db]"
                >
                  Upgrade to Pro ($29/mo)
                </button>
              </div>
            </div>
          )}

          {activeSection !== 'profile' && activeSection !== 'billing' && (
            <div className="text-center py-12 text-[#8E8EA1] text-xs">
              <p>Section configuration options will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
