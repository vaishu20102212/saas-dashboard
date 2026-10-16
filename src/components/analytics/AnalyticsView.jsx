import { useState } from 'react';
import ProductAnalytics from './ProductAnalytics';
import CustomerList from './CustomerList';
import AddProductDrawer from './AddProductDrawer';
import AddCustomerDrawer from './AddCustomerDrawer';
import { ChevronDown, Plus } from 'lucide-react';
import { initialCustomers, initialProductAnalytics } from '../../data/mockData';

export default function AnalyticsView() {
  const [activeSubTab, setActiveSubTab] = useState('product'); // 'product' | 'customer'
  const [startDate, setStartDate] = useState('2021-06-10');
  const [endDate, setEndDate] = useState('2021-10-10');
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [addCustomerOpen, setAddCustomerOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [products, setProducts] = useState(initialProductAnalytics.topProductsTable);
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(1);

  const handleAddProduct = (product) => {
    setProducts((currentProducts) => [
      {
        sn: currentProducts.length + 1,
        badge: 'none',
        name: product.name,
        icon: 'box',
        price: `$${Number(product.price).toLocaleString()}`,
        totalOrder: '0 Piece',
        totalSales: '$0'
      },
      ...currentProducts
    ]);
    setAddProductOpen(false);
  };

  const handleSaveCustomer = (customer) => {
    if (editingCustomer) {
      setCustomers((currentCustomers) =>
        currentCustomers.map((currentCustomer) =>
          currentCustomer.id === customer.id ? customer : currentCustomer
        )
      );
    } else {
      setCustomers((currentCustomers) => [customer, ...currentCustomers]);
    }
    setSelectedCustomerId(customer.id);
    setEditingCustomer(null);
    setAddCustomerOpen(false);
  };

  const handleOpenAddCustomer = () => {
    setEditingCustomer(null);
    setAddCustomerOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setAddCustomerOpen(true);
  };

  const formatDate = (value) => {
    const [year, month, day] = value.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Header with Sub-tabs and Action Button matching Screenshot 10 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B3A] tracking-tight">
            {activeSubTab === 'product' ? 'Product Analytics' : 'Customer Analytics'}
          </h1>
          {/* Sub-tabs toggle matching screenshot 10 */}
          <div className="inline-flex items-center p-1 bg-white border border-gray-100 rounded-xl mt-3 shadow-2xs">
            <button
              onClick={() => setActiveSubTab('product')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'product'
                  ? 'bg-[#5B52F9] text-white shadow-xs'
                  : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
              }`}
            >
              Product
            </button>
            <button
              onClick={() => setActiveSubTab('customer')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeSubTab === 'customer'
                  ? 'bg-[#5B52F9] text-white shadow-xs'
                  : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
              }`}
            >
              Customer
            </button>
          </div>
        </div>

        {/* Right header actions */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2">
            <label className="relative flex h-[50px] min-w-[152px] cursor-pointer items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-white px-5 text-xs font-semibold text-[#1E1B3A] shadow-2xs hover:border-gray-200">
              <span>{formatDate(startDate)}</span>
              <ChevronDown size={14} className="text-gray-400" />
              <input
                type="date"
                aria-label="Analytics start date"
                value={startDate}
                max={endDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
            <label className="relative flex h-[50px] min-w-[152px] cursor-pointer items-center justify-between gap-2 rounded-2xl border border-gray-100 bg-white px-5 text-xs font-semibold text-[#1E1B3A] shadow-2xs hover:border-gray-200">
              <span>{formatDate(endDate)}</span>
              <ChevronDown size={14} className="text-gray-400" />
              <input
                type="date"
                aria-label="Analytics end date"
                value={endDate}
                min={startDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>
          {activeSubTab === 'product' && (
            <button
              onClick={() => setAddProductOpen(true)}
              className="flex h-[50px] items-center gap-2 rounded-2xl bg-[#5B52F9] px-6 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-[#4a42db] active:scale-98"
            >
              <Plus size={16} />
              <span>Add Product</span>
            </button>
          )}

        </div>
      </div>

      {/* Tab contents */}
      {activeSubTab === 'product' ? (
        <ProductAnalytics products={products} />
      ) : (
        <CustomerList
          customers={customers}
          setCustomers={setCustomers}
          selectedCustomerId={selectedCustomerId}
          setSelectedCustomerId={setSelectedCustomerId}
          onOpenAddCustomer={handleOpenAddCustomer}
          onEditCustomer={handleEditCustomer}
        />
      )}

      {/* Drawers */}
      <AddProductDrawer
        isOpen={addProductOpen}
        onClose={() => setAddProductOpen(false)}
        onSaveProduct={handleAddProduct}
      />

      {addCustomerOpen && (
        <AddCustomerDrawer
          onClose={() => setAddCustomerOpen(false)}
          onSaveCustomer={handleSaveCustomer}
          customer={editingCustomer}
        />
      )}
    </div>
  );
}
