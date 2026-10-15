import { useState } from 'react';
import Sidebar from './components/common/Sidebar';
import DashboardView from './components/dashboard/DashboardView';
import AnalyticsView from './components/analytics/AnalyticsView';
import InvoiceView from './components/invoice/InvoiceView';
import ScheduleView from './components/schedule/ScheduleView';
import CalendarView from './components/calendar/CalendarView';
import ChatView from './components/messages/ChatView';
import NotificationView from './components/notification/NotificationView';
import SettingsView from './components/settings/SettingsView';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import RecoverPassword from './components/auth/RecoverPassword';
import ConfirmAccount from './components/auth/ConfirmAccount';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authScreen, setAuthScreen] = useState('login'); // null | 'login' | 'signup' | 'recover' | 'confirm'

  // Handle Auth Views if selected
  if (authScreen === 'login') {
    return (
      <Login
        onNavigate={(screen) => setAuthScreen(screen)}
        onLoginSuccess={() => setAuthScreen(null)}
      />
    );
  }

  if (authScreen === 'signup') {
    return (
      <SignUp
        onNavigate={(screen) => setAuthScreen(screen)}
        onSignUpSuccess={() => setAuthScreen('confirm')}
      />
    );
  }

  if (authScreen === 'recover') {
    return (
      <RecoverPassword
        onNavigate={(screen) => setAuthScreen(screen)}
      />
    );
  }

  if (authScreen === 'confirm') {
    return (
      <ConfirmAccount
        onGoHome={() => setAuthScreen(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F9] flex flex-col lg:flex-row text-[#1E1B3A]">
      {/* Sidebar Navigation matching screenshot designs */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={() => setAuthScreen('login')}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto">
        {/* View Router */}
        <main className="flex-1 pb-12">
          {activeTab === 'dashboard' && (
            <DashboardView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'invoice' && (
            <InvoiceView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'schedule' && (
            <ScheduleView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'calendar' && (
            <CalendarView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'messages' && (
            <ChatView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'notification' && (
            <NotificationView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}

          {activeTab === 'settings' && (
            <SettingsView onOpenMobileSidebar={() => setMobileOpen(true)} />
          )}
        </main>
      </div>
    </div>
  );
}