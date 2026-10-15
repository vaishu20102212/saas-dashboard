import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  CheckCheck
} from 'lucide-react';

export default function NotificationView({ onOpenMobileSidebar }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      description: 'Order #876364 for Camera Lens ($178) has been placed by Arrora gaur.',
      time: '10 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'invoice',
      title: 'Invoice Paid',
      description: 'Invoice #876123 ($1,460.00 USD) marked as complete by Robert Bacins.',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'schedule',
      title: 'Upcoming Meeting in 30 Mins',
      description: 'Office Meeting scheduled with Alexey Stave at 12:15 PM.',
      time: '2 hours ago',
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'Monthly Subscription Renewed',
      description: 'Your Base Pro account has been renewed successfully for December 2021.',
      time: 'Yesterday',
      unread: false
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1000px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B3A] tracking-tight">Notifications</h1>
          <p className="text-xs text-[#8E8EA1] mt-0.5">Stay updated on your store and team activity</p>
        </div>

        <button
          onClick={markAllAsRead}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-[#5B52F9] rounded-xl text-xs font-semibold hover:bg-indigo-50 shadow-2xs transition-colors"
        >
          <CheckCheck size={14} />
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-2xs border border-gray-100/60 divide-y divide-gray-50 overflow-hidden">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`p-5 flex items-start justify-between gap-4 transition-colors hover:bg-gray-50/70 ${
              item.unread ? 'bg-indigo-50/20' : ''
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.unread
                    ? 'bg-[#ECEBFE] text-[#5B52F9]'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                <Bell size={18} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-[#1E1B3A]">{item.title}</h4>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#5B52F9]" />
                  )}
                </div>
                <p className="text-xs text-[#5E6482] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-[#8E8EA1] pt-1">
                  <Clock size={11} />
                  <span>{item.time}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => deleteNotification(item.id)}
              className="text-gray-300 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
