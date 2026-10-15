import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import { initialPeople, calendarEvents } from '../../data/mockData';
import CreateEventModal from './CreateEventModal';

const initialDate = new Date(2021, 11, 2);
const dayMs = 24 * 60 * 60 * 1000;
const dateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const formatDate = (date, options = { month: 'long', day: 'numeric', year: 'numeric' }) =>
  date.toLocaleDateString('en-US', options);
const colorClasses = {
  cyan: 'bg-[#00D0E8]',
  purple: 'bg-[#9C27B0]',
  coral: 'bg-[#FF7A50]',
  pink: 'bg-[#D946EF]',
  teal: 'bg-[#00BCD4]',
  event: 'bg-[#5B52F9]',
  reminder: 'bg-[#FF7A50]',
  task: 'bg-[#00BCD4]'
};

function getMonthDays(date) {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const start = new Date(date.getFullYear(), date.getMonth(), 1 - firstDay.getDay());
  return Array.from({ length: 42 }, (_, index) => new Date(start.getTime() + index * dayMs));
}

function getEventColor(event) {
  return colorClasses[event.color] || colorClasses[event.type] || colorClasses.event;
}

export default function CalendarView() {
  const [calendarMode, setCalendarMode] = useState('month');
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [visibleMonth, setVisibleMonth] = useState(new Date(2021, 11, 1));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [peopleSearch, setPeopleSearch] = useState('');
  const [events, setEvents] = useState(() =>
    calendarEvents.map((event, index) => ({
      ...event,
      id: `seed-${index}`,
      date: dateKey(new Date(2021, 11, event.day))
    }))
  );

  const miniCalendarDays = getMonthDays(visibleMonth).slice(0, 35);
  const filteredPeople = initialPeople.filter((person) =>
    `${person.name} ${person.email}`.toLowerCase().includes(peopleSearch.toLowerCase())
  );

  const moveDate = (amount) => {
    const nextDate = new Date(selectedDate);
    if (calendarMode === 'year') nextDate.setFullYear(nextDate.getFullYear() + amount);
    else if (calendarMode === 'month') nextDate.setMonth(nextDate.getMonth() + amount);
    else if (calendarMode === 'week') nextDate.setDate(nextDate.getDate() + amount * 7);
    else nextDate.setDate(nextDate.getDate() + amount);
    setSelectedDate(nextDate);
    setVisibleMonth(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const saveEvent = (event) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      { ...event, id: `event-${Date.now()}` }
    ]);
  };

  const selectedEvents = events.filter((event) => event.date === dateKey(selectedDate));
  const monthDays = useMemo(() => getMonthDays(selectedDate), [selectedDate]);
  const weekStart = new Date(selectedDate);
  weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    new Date(weekStart.getTime() + index * dayMs)
  );

  const headerLabel = calendarMode === 'year'
    ? String(selectedDate.getFullYear())
    : calendarMode === 'month'
      ? formatDate(selectedDate, { month: 'long', year: 'numeric' })
      : formatDate(selectedDate);

  const renderEvent = (event) => (
    <span
      key={event.id}
      className={`block truncate rounded px-1.5 py-0.5 text-left text-[9px] font-bold text-white ${getEventColor(event)}`}
      title={`${event.title}${event.time ? ` — ${event.time}` : ''}`}
    >
      {event.title}
    </span>
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#1E1B3A]">Calendar</h1>
        <div className="inline-flex items-center self-start rounded-xl border border-gray-100 bg-white p-1 shadow-2xs">
          {['day', 'week', 'month', 'year'].map((mode) => (
            <button
              key={mode}
              onClick={() => setCalendarMode(mode)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
                calendarMode === mode
                  ? 'bg-[#5B52F9] text-white shadow-xs'
                  : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
        <aside className="space-y-6 lg:col-span-1">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#5B52F9] px-4 py-3 text-xs font-semibold text-white shadow-md shadow-indigo-200 transition-all hover:bg-[#4a42db] active:scale-98"
          >
            <Plus size={16} />
            <span>Create Schedule</span>
          </button>

          <section className="rounded-2xl border border-gray-100/60 bg-white p-5 shadow-2xs">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#1E1B3A]">
                {formatDate(visibleMonth, { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-1 text-gray-400">
                <button
                  aria-label="Previous month"
                  onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1))}
                  className="rounded p-0.5 hover:bg-gray-100 hover:text-gray-700"
                >
                  <ChevronLeft size={14} />
                </button>
                <button
                  aria-label="Next month"
                  onClick={() => setVisibleMonth(new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1))}
                  className="rounded p-0.5 hover:bg-gray-100 hover:text-gray-700"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#8E8EA1]">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <span key={`${day}-${index}`}>{day}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {miniCalendarDays.map((date) => {
                const isSelected = dateKey(date) === dateKey(selectedDate);
                const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
                return (
                  <button
                    key={dateKey(date)}
                    onClick={() => selectDate(date)}
                    className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full font-medium ${
                      isSelected
                        ? 'bg-[#5B52F9] font-bold text-white'
                        : isCurrentMonth
                          ? 'text-[#1E1B3A] hover:bg-[#ECEBFE]'
                          : 'text-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-gray-100/60 bg-white p-5 shadow-2xs">
            <h2 className="text-xs font-bold text-[#1E1B3A]">People</h2>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="search"
                placeholder="Search for People"
                value={peopleSearch}
                onChange={(event) => setPeopleSearch(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-[#F8F9FD] py-1.5 pl-8 pr-3 text-xs text-[#1E1B3A] focus:outline-none focus:ring-1 focus:ring-[#5B52F9]"
              />
            </div>
            <div className="space-y-3">
              {filteredPeople.map((person) => (
                <div key={person.email} className="flex items-center gap-2.5">
                  <img src={person.avatar} alt={person.name} className="h-7 w-7 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-[#1E1B3A]">{person.name}</p>
                    <p className="truncate text-[10px] text-[#8E8EA1]">{person.email}</p>
                  </div>
                </div>
              ))}
              {filteredPeople.length === 0 && (
                <p className="text-xs text-[#8E8EA1]">No people found.</p>
              )}
            </div>
            <button
              onClick={() => {
                setCalendarMode('day');
                const today = new Date();
                setSelectedDate(today);
                setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
              }}
              className="mt-2 w-full rounded-xl border border-gray-200 py-2 text-xs font-semibold text-[#1E1B3A] transition-colors hover:border-[#5B52F9] hover:text-[#5B52F9]"
            >
              My Schedule
            </button>
          </section>
        </aside>

        <section className="rounded-2xl border border-gray-100/60 bg-white p-4 shadow-2xs sm:p-6 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <h2 className="text-base font-bold text-[#1E1B3A]">{headerLabel}</h2>
            <div className="flex items-center gap-1.5 text-gray-400">
              <button
                aria-label="Previous date range"
                onClick={() => moveDate(-1)}
                className="rounded-lg p-1 hover:bg-gray-100 hover:text-gray-700"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                aria-label="Next date range"
                onClick={() => moveDate(1)}
                className="rounded-lg p-1 hover:bg-gray-100 hover:text-gray-700"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {calendarMode === 'month' && (
            <div>
              <div className="grid grid-cols-7 border-b border-gray-100 pb-3 text-center text-xs font-bold text-[#8E8EA1]">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
              </div>
              <div className="grid grid-cols-7 pt-2">
                {monthDays.map((date) => {
                  const dayEvents = events.filter((event) => event.date === dateKey(date));
                  const inMonth = date.getMonth() === selectedDate.getMonth();
                  const isSelected = dateKey(date) === dateKey(selectedDate);
                  return (
                    <button
                      key={dateKey(date)}
                      onClick={() => selectDate(date)}
                      className={`min-h-[88px] overflow-hidden border-b border-r border-gray-100 p-1.5 text-left transition-colors hover:bg-[#F8F9FD] sm:min-h-[100px] sm:p-2 ${
                        inMonth ? 'text-[#1E1B3A]' : 'text-gray-300'
                      } ${isSelected ? 'bg-[#F8F7FF]' : ''}`}
                    >
                      <span className={`mb-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                        isSelected ? 'bg-[#5B52F9] text-white' : ''
                      }`}>
                        {String(date.getDate()).padStart(2, '0')}
                      </span>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(renderEvent)}
                        {dayEvents.length > 2 && (
                          <span className="block text-[9px] text-gray-400">+{dayEvents.length - 2} more</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {calendarMode === 'day' && (
            <div className="space-y-3">
              {Array.from({ length: 17 }, (_, index) => index + 7).map((hour) => {
                const hourLabel = `${String(hour % 12 || 12).padStart(2, '0')}:00 ${hour < 12 ? 'AM' : 'PM'}`;
                const hourEvents = selectedEvents.filter((event) =>
                  event.time?.toLowerCase().includes(`${String(hour % 12 || 12).padStart(2, '0')}:`)
                );
                return (
                  <div key={hour} className="flex min-h-10 items-start gap-3 border-t border-gray-100 pt-2 text-xs">
                    <span className="w-16 shrink-0 text-[#8E8EA1]">{hourLabel}</span>
                    <div className="flex-1 space-y-1">
                      {hourEvents.map(renderEvent)}
                    </div>
                  </div>
                );
              })}
              {selectedEvents.filter((event) => event.time === 'All Day').map(renderEvent)}
              {selectedEvents.length === 0 && (
                <p className="py-3 text-center text-xs text-[#8E8EA1]">
                  No events on this date.
                </p>
              )}
            </div>
          )}

          {calendarMode === 'week' && (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-7">
              {weekDays.map((date) => {
                const dayEvents = events.filter((event) => event.date === dateKey(date));
                return (
                  <button
                    key={dateKey(date)}
                    onClick={() => {
                      selectDate(date);
                      setCalendarMode('day');
                    }}
                    className="min-h-40 rounded-xl bg-gray-50 p-3 text-left transition-colors hover:bg-[#F3F1FF]"
                  >
                    <p className="mb-3 text-xs font-bold text-[#1E1B3A]">
                      {formatDate(date, { weekday: 'short', day: 'numeric' })}
                    </p>
                    <div className="space-y-1">{dayEvents.map(renderEvent)}</div>
                  </button>
                );
              })}
            </div>
          )}

          {calendarMode === 'year' && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 12 }, (_, month) => {
                const monthDate = new Date(selectedDate.getFullYear(), month, 1);
                const dates = getMonthDays(monthDate).slice(0, new Date(selectedDate.getFullYear(), month + 1, 0).getDate() + new Date(selectedDate.getFullYear(), month, 1).getDay());
                return (
                  <div key={month} className="rounded-xl border border-gray-100 bg-[#F8F9FD] p-3">
                    <button
                      onClick={() => {
                        setSelectedDate(monthDate);
                        setCalendarMode('month');
                      }}
                      className="mb-2 text-xs font-bold text-[#1E1B3A] hover:text-[#5B52F9]"
                    >
                      {formatDate(monthDate, { month: 'long' })}
                    </button>
                    <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-[#5E6482]">
                      {dates.map((date) => (
                        <button
                          key={dateKey(date)}
                          onClick={() => {
                            selectDate(date);
                            setCalendarMode('day');
                          }}
                          className={`rounded py-0.5 ${
                            date.getMonth() === month
                              ? 'hover:bg-[#ECEBFE]'
                              : 'text-gray-300'
                          }`}
                        >
                          {date.getDate()}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <CreateEventModal
        key={`${isModalOpen}-${dateKey(selectedDate)}`}
        isOpen={isModalOpen}
        selectedDate={selectedDate}
        onClose={() => setIsModalOpen(false)}
        onSaveEvent={saveEvent}
      />
    </div>
  );
}
