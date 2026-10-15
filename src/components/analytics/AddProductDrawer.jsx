import { useState } from 'react';
import { ChevronLeft, Camera, Download, X } from 'lucide-react';

const emptyForm = {
  name: '',
  brand: 'Apple',
  price: '',
  negotiable: false,
  description: ''
};

export default function AddProductDrawer({ isOpen, onClose, onSaveProduct }) {
  const [formData, setFormData] = useState(emptyForm);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveProduct) {
      onSaveProduct({
        ...formData,
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim()
      });
    }
    setFormData(emptyForm);
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
            {/* Header with back arrow */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-100">
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-sm font-bold text-[#1E1B3A] hover:text-[#5B52F9] transition-colors"
              >
                <ChevronLeft size={20} />
                <span>Add a New Product</span>
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {/* Photo upload circle */}
            <div className="flex justify-center my-6">
              <label className="w-24 h-24 rounded-full bg-[#F4F5F9] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-[#5B52F9] hover:bg-indigo-50/50 cursor-pointer transition-all">
                <Camera size={26} />
                <span className="text-[10px] mt-1 font-medium">Add Photo</span>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>

            {/* Form Fields matching screenshot 11 */}
            <form onSubmit={handleSubmit} id="add-product-form" className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. MacBook Pro 14"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Brand
                </label>
                <select
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                >
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Sony">Sony</option>
                  <option value="Nike">Nike</option>
                  <option value="Generic">Generic</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Price
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-2.5 text-xs text-gray-500 font-semibold">$</span>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="1200"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9]"
                      required
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.negotiable}
                      onChange={(e) => setFormData({ ...formData, negotiable: e.target.checked })}
                      className="w-4 h-4 rounded text-[#5B52F9] focus:ring-[#5B52F9] accent-[#5B52F9]"
                    />
                    <span className="text-xs font-semibold text-[#1E1B3A]">Negotiable</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E1B3A] mb-1.5">
                  Descriptions
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20 focus:border-[#5B52F9] resize-none"
                  placeholder="Provide product specifications..."
                />
              </div>
            </form>
          </div>

          {/* Footer with Save Product Button matching screenshot 11 */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              form="add-product-form"
              className="w-full py-3 px-4 bg-[#5B52F9] hover:bg-[#4d44e4] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              <Download size={16} />
              <span>Save Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
