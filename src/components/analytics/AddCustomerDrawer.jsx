import { useState } from 'react';
import { Camera, X } from 'lucide-react';

export default function AddCustomerDrawer({ isOpen, onClose, onAddCustomer }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddCustomer) {
      onAddCustomer({
        id: Date.now(),
        name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        role: 'Client Member',
        email: formData.email.trim(),
        workEmail: formData.email.trim(),
        phone: formData.phone.trim().startsWith('+')
          ? formData.phone.trim()
          : `+${formData.phone.trim()}`,
        gender: formData.gender,
        location: 'New York, USA',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
        performance: {
          monthly: [
            { month: "Jan", val: 1.8 },
            { month: "Feb", val: 2.2 },
            { month: "Mar", val: 2.5 },
            { month: "Apr", val: 2.8 },
            { month: "May", val: 3.2 },
            { month: "Jun", val: 3.5 }
          ],
          score1: 75,
          score2: 65
        }
      });
    }
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <h2 className="text-base font-bold text-[#1E1B3A]">Add Customer</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-red-50 text-red-400 hover:text-red-600 flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Photo upload circle */}
            <div className="flex justify-center my-6">
              <label className="w-24 h-24 rounded-full bg-[#F4F5F9] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-[#5B52F9] hover:bg-indigo-50/50 cursor-pointer transition-all">
                <Camera size={26} />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>

            {/* Form Fields matching screenshot 8 */}
            <form onSubmit={handleSubmit} id="add-customer-form" className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Deo"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Example@gmail.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="33757005467"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </form>
          </div>

          {/* Footer with Add Customer Button */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              form="add-customer-form"
              className="w-full py-3 px-4 bg-[#5B52F9] hover:bg-[#4d44e4] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
