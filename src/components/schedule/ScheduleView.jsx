import { useState } from 'react';
import ScheduleList from './ScheduleList';
import TaskPreview from './TaskPreview';

export default function ScheduleView() {
  const [subTab, setSubTab] = useState('tasks'); // 'tasks' | 'schedules'

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto space-y-6">
      {/* Sub-tab switcher */}
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center p-1 bg-white border border-gray-100 rounded-xl shadow-2xs">
          <button
            onClick={() => setSubTab('tasks')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subTab === 'tasks'
                ? 'bg-[#5B52F9] text-white shadow-xs'
                : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
            }`}
          >
            Tasks (Board & List)
          </button>
          <button
            onClick={() => setSubTab('schedules')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              subTab === 'schedules'
                ? 'bg-[#5B52F9] text-white shadow-xs'
                : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
            }`}
          >
            Schedule List
          </button>
        </div>
      </div>

      {subTab === 'tasks' ? (
        <TaskPreview />
      ) : (
        <ScheduleList />
      )}
    </div>
  );
}
