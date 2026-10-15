import Header from '../common/Header';
import MetricCard from './MetricCard';
import ReportsChart from './ReportsChart';
import AnalyticsDonut from './AnalyticsDonut';
import RecentOrdersTable from './RecentOrdersTable';
import TopSellingList from './TopSellingList';

export default function DashboardView({ onOpenMobileSidebar }) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      <Header
        title="Dashboard"
        onOpenMobileSidebar={onOpenMobileSidebar}
        showDatePickers={true}
      />

      {/* Top 4 Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard type="save" value="178+" label="Save Products" />
        <MetricCard type="stock" value="20+" label="Stock Products" />
        <MetricCard type="sales" value="190+" label="Sales Products" />
        <MetricCard type="job" value="12+" label="Job Application" />
      </div>

      {/* Middle Row: Reports Line Chart & Analytics Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ReportsChart />
        </div>
        <div>
          <AnalyticsDonut />
        </div>
      </div>

      {/* Bottom Row: Recent Orders Table & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>
        <div>
          <TopSellingList />
        </div>
      </div>
    </div>
  );
}
