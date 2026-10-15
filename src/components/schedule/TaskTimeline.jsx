import { useState } from 'react';
import { ChevronRight, CheckCircle2, Circle, ChevronDown } from 'lucide-react';

const categories = [
  { id: 'todo', label: 'To Do', columns: ['todo'] },
  { id: 'doing', label: 'Doing', columns: ['in-progress', 'in-review'] },
  { id: 'done', label: 'Done', columns: ['done'] }
];

export default function TaskTimeline({ tasks, onToggleComplete }) {
  const [activeCategory, setActiveCategory] = useState('todo');
  const [selectedDay, setSelectedDay] = useState('02');
  const days = [
    '29', '30', '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12', '13', '14'
  ];
  const category = categories.find((item) => item.id === activeCategory);
  const visibleTasks = tasks.filter((task) => category.columns.includes(task.column));

  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-100/60 bg-white p-6 shadow-2xs lg:grid-cols-5">
      <div className="space-y-3 lg:col-span-1">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-xs font-bold transition-all ${
              activeCategory === item.id
                ? 'bg-[#5B52F9] text-white shadow-md shadow-indigo-200'
                : 'bg-[#F8F9FD] text-[#1E1B3A] hover:bg-gray-100'
            }`}
          >
            <span>{item.label}</span>
            <ChevronRight size={16} />
          </button>
        ))}
      </div>

      <div className="space-y-6 lg:col-span-4">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {days.map((day, index) => (
              <button
                key={`${day}-${index}`}
                onClick={() => setSelectedDay(day)}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                  day === selectedDay
                    ? 'bg-[#5B52F9] text-white shadow-sm'
                    : 'text-[#8E8EA1] hover:bg-gray-100 hover:text-[#1E1B3A]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 cursor-pointer items-center gap-2 self-start rounded-xl border border-gray-200 bg-[#F8F9FD] px-3 py-1.5 text-xs font-bold text-[#1E1B3A] sm:self-auto">
            <span>December 2021</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>

        <div className="space-y-4">
          {visibleTasks.map((task) => {
            const startTime = task.timeSlot?.split(' - ')[0] || '09.00 AM';
            return (
              <div key={task.id} className="group flex items-center gap-4 text-xs">
                <span className="w-20 shrink-0 font-medium text-[#8E8EA1]">
                  {startTime}
                </span>
                <div className="relative flex-1 border-t border-gray-100 py-2">
                  <div className="inline-flex max-w-full flex-wrap items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-2xs transition-shadow hover:shadow-md">
                    <button
                      type="button"
                      onClick={() => onToggleComplete(task.id)}
                      aria-label={`Mark ${task.title} complete`}
                      className="flex items-center gap-2"
                    >
                      {task.completed ? (
                        <CheckCircle2 size={16} className="fill-[#5B52F9] text-white" />
                      ) : (
                        <Circle size={16} className="text-gray-300" />
                      )}
                      <span className="text-left text-xs font-bold text-[#1E1B3A]">
                        {task.title}
                      </span>
                    </button>
                    <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold ${
                      task.priority === 'High'
                        ? 'bg-[#00BCD4] text-white'
                        : task.priority === 'Medium'
                          ? 'bg-[#FF8A65] text-white'
                          : 'bg-[#FF6B6B] text-white'
                    }`}>
                      {task.priority}
                    </span>
                    {task.statusTrack && (
                      <span className="rounded-full bg-[#FFB74D] px-2.5 py-0.5 text-[9px] font-bold text-white">
                        {task.statusTrack}
                      </span>
                    )}
                    <span className="text-[10px] text-[#8E8EA1]">
                      {task.startDate} – {task.endDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          {visibleTasks.length === 0 && (
            <p className="py-8 text-center text-xs text-[#8E8EA1]">
              No tasks in {category.label}.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
