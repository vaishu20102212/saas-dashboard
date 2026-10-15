import { useState } from 'react';
import {
  Plus,
  Search,
  MapPin,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { initialSchedules, initialPeople } from '../../data/mockData';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [peopleSearch, setPeopleSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newDate, setNewDate] = useState(() => {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  });
  const [newTime, setNewTime] = useState('10:00');
  const [newLocation, setNewLocation] = useState('');

  const handleDelete = (id) => {
    setSchedules((currentSchedules) =>
      currentSchedules.filter((schedule) => schedule.id !== id)
    );
  };

  const handleCreateSchedule = (event) => {
    event.preventDefault();
    const [year, month, day] = newDate.split('-').map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const [hours, minutes] = newTime.split(':').map(Number);
    const formattedTime = `${String(hours % 12 || 12).padStart(2, '0')}.${String(minutes).padStart(2, '0')}${hours < 12 ? 'AM' : 'PM'}`;

    setSchedules((currentSchedules) => [
      { id: Date.now(), date: formattedDate, time: formattedTime, location: newLocation.trim() },
      ...currentSchedules
    ]);
    setNewLocation('');
    setIsCreateOpen(false);
  };

  const filteredPeople = initialPeople.filter(
    (p) =>
      p.name.toLowerCase().includes(peopleSearch.toLowerCase()) ||
      p.email.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      {/* Left Column: Mini Calendar & People List matching Screenshot 5 */}
      <div className="lg:col-span-1 space-y-6">
        {/* Create Schedule Button */}
        <button
          onClick={() => setIsCreateOpen(true)}
          className="w-full py-3 px-4 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all active:scale-98"
        >
          <Plus size={16} />
          <span>Create Schedule</span>
        </button>

        {/* Mini Calendar Widget */}
        <div className="bg-white rounded-2xl p-5 shadow-2xs border border-gray-100/60">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#1E1B3A]">December 2, 2021</span>
            <div className="flex items-center gap-1 text-gray-400">
              <button className="hover:text-gray-700 p-0.5"><ChevronLeft size={14} /></button>
              <button className="hover:text-gray-700 p-0.5"><ChevronRight size={14} /></button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#8E8EA1] mb-2">
            <span>S</span>
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            <span className="text-gray-300 py-1">29</span>
            <span className="text-gray-300 py-1">30</span>
            <span className="text-[#1E1B3A] py-1 font-medium">1</span>
            <span className="text-[#1E1B3A] py-1 font-medium">2</span>
            {/* Day 3 highlighted purple circle matching screenshot */}
            <span className="w-6 h-6 mx-auto rounded-full bg-[#5B52F9] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              3
            </span>
            <span className="text-[#1E1B3A] py-1 font-medium">4</span>
            <span className="text-[#1E1B3A] py-1 font-medium">5</span>
            <span className="text-[#1E1B3A] py-1 font-medium">6</span>
            <span className="text-[#1E1B3A] py-1 font-medium">7</span>
            <span className="text-[#1E1B3A] py-1 font-medium">8</span>
            <span className="text-[#1E1B3A] py-1 font-medium">9</span>
            <span className="text-[#1E1B3A] py-1 font-medium">10</span>
            <span className="text-[#1E1B3A] py-1 font-medium">11</span>
            <span className="text-[#1E1B3A] py-1 font-medium">12</span>
            <span className="text-[#1E1B3A] py-1 font-medium">13</span>
            <span className="text-[#1E1B3A] py-1 font-medium">14</span>
            <span className="text-[#1E1B3A] py-1 font-medium">15</span>
            <span className="text-[#1E1B3A] py-1 font-medium">16</span>
            <span className="text-[#1E1B3A] py-1 font-medium">17</span>
            <span className="text-[#1E1B3A] py-1 font-medium">18</span>
            <span className="text-[#1E1B3A] py-1 font-medium">19</span>
            <span className="text-[#1E1B3A] py-1 font-medium">20</span>
            <span className="text-[#1E1B3A] py-1 font-medium">21</span>
            <span className="text-[#1E1B3A] py-1 font-medium">22</span>
            <span className="text-[#1E1B3A] py-1 font-medium">23</span>
            <span className="text-[#1E1B3A] py-1 font-medium">24</span>
            <span className="text-[#1E1B3A] py-1 font-medium">25</span>
            <span className="text-[#1E1B3A] py-1 font-medium">26</span>
            <span className="text-[#1E1B3A] py-1 font-medium">27</span>
            <span className="text-[#1E1B3A] py-1 font-medium">28</span>
            <span className="text-[#1E1B3A] py-1 font-medium">29</span>
            <span className="text-[#1E1B3A] py-1 font-medium">30</span>
            <span className="text-[#1E1B3A] py-1 font-medium">31</span>
            <span className="text-gray-300 py-1">1</span>
            <span className="text-gray-300 py-1">2</span>
          </div>
        </div>

        {/* People Section */}
        <div className="bg-white rounded-2xl p-5 shadow-2xs border border-gray-100/60 space-y-4">
          <h4 className="text-xs font-bold text-[#1E1B3A]">People</h4>

          {/* Search box */}
          <div className="relative">
            <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for People"
              value={peopleSearch}
              onChange={(e) => setPeopleSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-[#1E1B3A] focus:outline-none focus:ring-1 focus:ring-[#5B52F9]"
            />
          </div>

          {/* People list */}
          <div className="space-y-3">
            {filteredPeople.map((person, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#1E1B3A] truncate">{person.name}</p>
                  <p className="text-[10px] text-[#8E8EA1] truncate">{person.email}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => alert("My personal schedule viewed")}
            className="w-full py-2 border border-gray-200 hover:border-[#5B52F9] hover:text-[#5B52F9] text-[#1E1B3A] rounded-xl text-xs font-semibold transition-colors mt-2"
          >
            My Schedule
          </button>
        </div>
      </div>

      {/* Right Column: Schedule List Table matching Screenshot 5 */}
      <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-2xs border border-gray-100/60">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#1E1B3A]">Schedule List</h2>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#5B52F9] hover:bg-[#4a42db] text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 transition-all active:scale-98"
          >
            <Plus size={16} />
            <span>Add New</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="text-[#8E8EA1] font-semibold border-b border-gray-100">
                <th className="pb-3.5 w-10">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-[#5B52F9] accent-[#5B52F9]"
                  />
                </th>
                <th className="pb-3.5">Date <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5">Time <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5">Location <span className="text-[10px]">▾</span></th>
                <th className="pb-3.5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {schedules.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-[#5B52F9] accent-[#5B52F9]"
                    />
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2 text-[#1E1B3A] font-semibold">
                      <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <CalendarIcon size={12} />
                      </div>
                      <span>{item.date}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-[#5E6482] font-medium">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      <span>{item.time}</span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#ECEBFE] text-[#5B52F9]">
                      <MapPin size={12} className="text-[#5B52F9]" />
                      <span>{item.location}</span>
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => alert(`Edit schedule for: ${item.date}`)}
                        className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center transition-colors"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-7 h-7 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close create schedule dialog"
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsCreateOpen(false)}
          />
          <form
            onSubmit={handleCreateSchedule}
            className="relative z-10 w-full max-w-md space-y-5 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <h3 className="text-base font-bold text-[#1E1B3A]">Create Schedule</h3>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Date
              <input
                type="date"
                value={newDate}
                onChange={(event) => setNewDate(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              />
            </label>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Time
              <input
                type="time"
                value={newTime}
                onChange={(event) => setNewTime(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              />
            </label>
            <label className="block space-y-1.5 text-xs font-semibold text-[#1E1B3A]">
              Location
              <input
                type="text"
                value={newLocation}
                onChange={(event) => setNewLocation(event.target.value)}
                placeholder="Enter location"
                required
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] px-4 py-2.5 text-xs font-normal"
              />
            </label>
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-[#8E8EA1] hover:text-[#1E1B3A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#5B52F9] px-5 py-2 text-xs font-semibold text-white hover:bg-[#4a42db]"
              >
                Add Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
