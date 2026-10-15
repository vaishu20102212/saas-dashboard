import { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const sections = [
  { id: 'todo', title: 'To Do', columns: ['todo'] },
  { id: 'doing', title: 'Doing', columns: ['in-progress', 'in-review'] },
  { id: 'done', title: 'Done', columns: ['done'] }
];

const appColors = {
  Figma: 'bg-[#A259FF] text-white',
  Illustrator: 'bg-[#FF9A00] text-white',
  Photoshop: 'bg-[#31A8FF] text-white',
  XD: 'bg-[#FF61F6] text-white'
};

const getStatus = (task) => {
  if (task.column === 'done') {
    return { label: 'Done', className: 'bg-[#DCFCE7] text-[#16A34A]' };
  }
  if (task.column === 'todo') {
    return { label: 'Pending', className: 'bg-[#FFE2D9] text-[#FF5722]' };
  }
  return { label: 'Running', className: 'bg-[#E0E7FF] text-[#4F46E5]' };
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask
}) {
  const [editingTask, setEditingTask] = useState(null);

  const handleSave = (event) => {
    event.preventDefault();
    onUpdateTask(editingTask.id, editingTask);
    setEditingTask(null);
  };

  return (
    <>
      <div className="space-y-6">
        {sections.map((section) => {
          const sectionTasks = tasks.filter((task) =>
            section.columns.includes(task.column)
          );

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-gray-100/60 bg-white p-6 shadow-2xs"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#1E1B3A]">{section.title}</h3>
                <span className="text-xs font-medium text-[#8E8EA1]">
                  {sectionTasks.length} tasks
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 font-semibold text-[#8E8EA1]">
                      <th className="w-16 pb-3">Check Box</th>
                      <th className="pb-3">Task Name</th>
                      <th className="pb-3">Start Date</th>
                      <th className="pb-3">End Date</th>
                      <th className="pb-3">Member</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sectionTasks.map((task) => {
                      const status = getStatus(task);
                      return (
                        <tr key={task.id} className="hover:bg-gray-50/50">
                          <td className="py-3.5">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => onToggleComplete(task.id)}
                              aria-label={`Mark ${task.title} complete`}
                              className="h-4 w-4 rounded accent-[#5B52F9]"
                            />
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold ${
                                  appColors[task.appType] || 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {task.appType?.[0] || task.title[0]}
                              </div>
                              <span className="font-semibold text-[#3B82F6]">
                                {task.title}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 text-[#5E6482]">{task.startDate}</td>
                          <td className="py-3.5 font-semibold text-red-500">{task.endDate}</td>
                          <td className="py-3.5 text-[#5E6482]">
                            {task.membersCount} Member{task.membersCount === 1 ? '' : 's'}
                          </td>
                          <td className="py-3.5">
                            <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-semibold ${status.className}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => setEditingTask({ ...task })}
                                aria-label={`Edit ${task.title}`}
                                title="Edit task"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteTask(task.id)}
                                aria-label={`Delete ${task.title}`}
                                title="Delete task"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {sectionTasks.length === 0 && (
                      <tr>
                        <td colSpan="7" className="py-6 text-center text-[#8E8EA1]">
                          No tasks in this section.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close edit task dialog"
            className="absolute inset-0 bg-black/40"
            onClick={() => setEditingTask(null)}
          />
          <form
            onSubmit={handleSave}
            className="relative z-10 w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-base font-bold text-[#1E1B3A]">Edit Task</h3>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Task name
              <input
                type="text"
                value={editingTask.title}
                onChange={(event) =>
                  setEditingTask({ ...editingTask, title: event.target.value })
                }
                required
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              />
            </label>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Application
              <select
                value={editingTask.appType}
                onChange={(event) =>
                  setEditingTask({ ...editingTask, appType: event.target.value })
                }
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              >
                {['Figma', 'Illustrator', 'Photoshop', 'XD'].map((app) => (
                  <option key={app} value={app}>{app}</option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Start date
                <input
                  type="text"
                  value={editingTask.startDate}
                  onChange={(event) =>
                    setEditingTask({ ...editingTask, startDate: event.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                />
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                End date
                <input
                  type="text"
                  value={editingTask.endDate}
                  onChange={(event) =>
                    setEditingTask({ ...editingTask, endDate: event.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Members
                <input
                  type="number"
                  min="1"
                  value={editingTask.membersCount}
                  onChange={(event) =>
                    setEditingTask({ ...editingTask, membersCount: Number(event.target.value) })
                  }
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                />
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Status
                <select
                  value={editingTask.column === 'todo' ? 'todo' : editingTask.column === 'done' ? 'done' : 'doing'}
                  onChange={(event) =>
                    setEditingTask({
                      ...editingTask,
                      column: event.target.value === 'doing' ? 'in-progress' : event.target.value,
                      completed: event.target.value === 'done' ? true : editingTask.completed
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setEditingTask(null)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-[#8E8EA1] hover:text-[#1E1B3A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B52F9] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4a42db]"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
