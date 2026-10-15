import React from 'react';
import {
  MoreHorizontal,
  CheckCircle2,
  Circle,
  MessageSquare,
  Heart,
  Plus
} from 'lucide-react';

export default function TaskBoard({ tasks, onToggleComplete }) {
  const columns = [
    { id: 'todo', title: 'ToDo' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'in-review', title: 'In Review' },
    { id: 'done', title: 'Done' }
  ];

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-[#00BCD4] text-white';
      case 'Medium':
        return 'bg-[#FF8A65] text-white';
      case 'Low':
      default:
        return 'bg-[#FF6B6B] text-white';
    }
  };

  const getStatusTrackBadge = (track) => {
    switch (track) {
      case 'At risk':
        return 'bg-[#D32F2F] text-white';
      case 'On Track':
      default:
        return 'bg-[#FFB74D] text-white';
    }
  };

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&auto=format&fit=crop&q=80'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
      {columns.map((col) => {
        const colTasks = tasks.filter((t) => t.column === col.id);

        return (
          <div key={col.id} className="space-y-4">
            <div className="flex items-center justify-between pb-1">
              <h3 className="font-bold text-[#1E1B3A] text-sm">{col.title}</h3>
            </div>

            <div className="space-y-4">
              {colTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl p-5 shadow-2xs border border-gray-100/70 hover:shadow-md transition-all duration-200 space-y-3"
                >
                  {/* Card Header: Checkbox + Title + More */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <button
                        onClick={() => onToggleComplete(task.id)}
                        className="text-[#5B52F9] shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 size={18} className="fill-[#5B52F9] text-white" />
                        ) : (
                          <Circle size={18} className="text-gray-300" />
                        )}
                      </button>
                      <h4 className="font-bold text-xs text-[#1E1B3A] truncate">
                        {task.title}
                      </h4>
                    </div>

                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <MoreHorizontal size={15} />
                    </button>
                  </div>

                  {/* Priority & Status Badges matching screenshot 6 */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-semibold ${getPriorityBadge(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    {task.statusTrack && (
                      <span
                        className={`px-3 py-0.5 rounded-full text-[10px] font-semibold ${getStatusTrackBadge(
                          task.statusTrack
                        )}`}
                      >
                        {task.statusTrack}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#8E8EA1] leading-relaxed">
                    {task.description}
                  </p>

                  {/* Visual Image Attachments matching screenshot 6 */}
                  {task.images && task.images.length > 0 && (
                    <div
                      className={`gap-2 pt-1 ${
                        task.images.length > 1 ? 'grid grid-cols-2' : 'block'
                      }`}
                    >
                      {task.images.map((img, i) => (
                        <div
                          key={i}
                          className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 h-24"
                        >
                          <img
                            src={img}
                            alt="Attachment"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Footer: Avatars + Comments + Likes */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[11px] text-[#8E8EA1]">
                    <div className="flex items-center -space-x-2">
                      {avatars.map((av, i) => (
                        <img
                          key={i}
                          src={av}
                          alt="member"
                          className="w-6 h-6 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-[#00BCD4] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                        +
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-gray-400" />
                        <span>{task.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-gray-400" />
                        <span>{task.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
