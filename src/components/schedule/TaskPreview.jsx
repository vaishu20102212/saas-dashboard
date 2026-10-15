import { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import TaskBoard from './TaskBoard';
import TaskList from './TaskList';
import TaskTimeline from './TaskTimeline';
import { initialTasks } from '../../data/mockData';

export default function TaskPreview() {
  const [viewType, setViewType] = useState('board'); // 'list' | 'board' | 'timeline'
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [addTaskOpen, setAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    column: 'todo',
    startDate: '',
    endDate: '',
    membersCount: 1,
    appType: 'Figma',
    timeSlot: '09.00 AM - 11.00 AM',
    completed: false,
    comments: 0,
    likes: 0
  });

  const toggleComplete = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => task.id === id ? { ...task, ...updates } : task)
    );
  };

  const addTask = (event) => {
    event.preventDefault();
    const taskToAdd = {
      ...newTask,
      completed: newTask.column === 'done'
    };
    setTasks((currentTasks) => [
      { ...taskToAdd, id: `task-${Date.now()}` },
      ...currentTasks
    ]);
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      column: 'todo',
      startDate: '',
      endDate: '',
      membersCount: 1,
      appType: 'Figma',
      timeSlot: '09.00 AM - 11.00 AM',
      completed: false,
      comments: 0,
      likes: 0
    });
    setAddTaskOpen(false);
  };

  const getStatus = (task) => {
    if (task.column === 'done') return 'done';
    if (task.column === 'in-progress' || task.column === 'in-review') return 'doing';
    return 'todo';
  };

  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredTasks = searchedTasks.filter((task) => {
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || getStatus(task) === statusFilter;
    return matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header bar matching screenshot 6 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="text-xl font-bold text-[#1E1B3A]">Task Preview</h2>

          {/* View switcher pill */}
          <div className="inline-flex items-center p-1 bg-white border border-gray-100 rounded-xl shadow-2xs">
            <button
              onClick={() => {
                setViewType('list');
                setFilterOpen(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'list'
                  ? 'bg-[#5B52F9] text-white shadow-xs'
                  : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
              }`}
            >
              List
            </button>
            <button
              onClick={() => {
                setViewType('board');
                setFilterOpen(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'board'
                  ? 'bg-[#5B52F9] text-white shadow-xs'
                  : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
              }`}
            >
              Board
            </button>
            <button
              onClick={() => {
                setViewType('timeline');
                setFilterOpen(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewType === 'timeline'
                  ? 'bg-[#5B52F9] text-white shadow-xs'
                  : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
              }`}
            >
              Timeline
            </button>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {(viewType === 'list' || viewType === 'timeline') && (
            <button
              type="button"
              onClick={() => setAddTaskOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#5B52F9] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-[#4a42db] active:scale-98"
            >
              <Plus size={14} />
              <span>Add Task</span>
            </button>
          )}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-60 pl-3 pr-8 py-2 bg-white rounded-xl text-xs text-[#1E1B3A] border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
            />
            <Search size={14} className="absolute right-2.5 top-3 text-gray-400" />
          </div>

          {viewType === 'board' && (
            <div className="relative">
              <button
                type="button"
                aria-expanded={filterOpen}
                onClick={() => setFilterOpen((open) => !open)}
                className="flex items-center gap-1.5 rounded-xl bg-[#5B52F9] px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-[#4a42db] active:scale-98"
              >
                <Filter size={14} />
                <span>Filter</span>
              </button>
              {filterOpen && (
                <div className="absolute right-0 top-11 z-30 w-52 space-y-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
                  <label className="block space-y-1 text-xs font-semibold text-[#1E1B3A]">
                    Priority
                    <select
                      value={priorityFilter}
                      onChange={(event) => setPriorityFilter(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-[#F8F9FD] px-3 py-2 font-normal"
                    >
                      <option value="all">All priorities</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </label>
                  <label className="block space-y-1 text-xs font-semibold text-[#1E1B3A]">
                    Status
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="w-full rounded-lg border border-gray-200 bg-[#F8F9FD] px-3 py-2 font-normal"
                    >
                      <option value="all">All statuses</option>
                      <option value="todo">To Do</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </select>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setPriorityFilter('all');
                      setStatusFilter('all');
                    }}
                    className="text-xs font-semibold text-[#5B52F9] hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Render selected view */}
      {viewType === 'board' && (
        <TaskBoard tasks={filteredTasks} onToggleComplete={toggleComplete} />
      )}
      {viewType === 'list' && (
        <TaskList
          tasks={searchedTasks}
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      )}
      {viewType === 'timeline' && (
        <TaskTimeline tasks={searchedTasks} onToggleComplete={toggleComplete} />
      )}

      {addTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close add task dialog"
            className="absolute inset-0 bg-black/40"
            onClick={() => setAddTaskOpen(false)}
          />
          <form
            onSubmit={addTask}
            className="relative z-10 max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-base font-bold text-[#1E1B3A]">Add Task</h3>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Task name
              <input
                type="text"
                value={newTask.title}
                onChange={(event) => setNewTask({ ...newTask, title: event.target.value })}
                placeholder="Enter task name"
                required
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              />
            </label>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Description
              <textarea
                value={newTask.description}
                onChange={(event) => setNewTask({ ...newTask, description: event.target.value })}
                placeholder="Add task details"
                rows="2"
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Status
                <select
                  value={newTask.column}
                  onChange={(event) => setNewTask({ ...newTask, column: event.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">Doing</option>
                  <option value="done">Done</option>
                </select>
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Priority
                <select
                  value={newTask.priority}
                  onChange={(event) => setNewTask({ ...newTask, priority: event.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Start date
                <input
                  type="text"
                  value={newTask.startDate}
                  onChange={(event) => setNewTask({ ...newTask, startDate: event.target.value })}
                  placeholder="DD/MM/YYYY"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                />
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                End date
                <input
                  type="text"
                  value={newTask.endDate}
                  onChange={(event) => setNewTask({ ...newTask, endDate: event.target.value })}
                  placeholder="DD/MM/YYYY"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                />
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Application
                <select
                  value={newTask.appType}
                  onChange={(event) => setNewTask({ ...newTask, appType: event.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                >
                  {['Figma', 'Illustrator', 'Photoshop', 'XD'].map((app) => (
                    <option key={app}>{app}</option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
                Members
                <input
                  type="number"
                  min="1"
                  value={newTask.membersCount}
                  onChange={(event) => setNewTask({ ...newTask, membersCount: Number(event.target.value) })}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
                />
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setAddTaskOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-[#8E8EA1] hover:text-[#1E1B3A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B52F9] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4a42db]"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
