import { useState } from 'react';
import { X, Clock, Users, MapPin } from 'lucide-react';

const toDateKey = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

const formatTime = (value) => {
  const [hours, minutes] = value.split(':').map(Number);
  return `${String(hours % 12 || 12).padStart(2, '0')}:${String(minutes).padStart(2, '0')}${hours < 12 ? 'am' : 'pm'}`;
};

export default function CreateEventModal({ isOpen, selectedDate, onClose, onSaveEvent }) {
  const [eventType, setEventType] = useState('event');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(toDateKey(selectedDate));
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');
  const [location, setLocation] = useState('');
  const [attendee, setAttendee] = useState('');
  const [showDateTime, setShowDateTime] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showAttendee, setShowAttendee] = useState(false);

  if (!isOpen) return null;

  const [year, month, day] = date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const dateLabel = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const handleSave = (event) => {
    event.preventDefault();
    const startLabel = formatTime(startTime);
    const endLabel = formatTime(endTime);
    onSaveEvent({
      type: eventType,
      title: title.trim(),
      date,
      time: `${startLabel} - ${endLabel}`,
      startTime: startLabel,
      location: location.trim(),
      attendee: attendee.trim(),
      color: eventType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close create event dialog"
        className="absolute inset-0 bg-black/40 backdrop-blur-xs"
        onClick={onClose}
      />
      <form
        onSubmit={handleSave}
        className="relative z-10 max-h-[90vh] w-full max-w-md space-y-4 overflow-y-auto rounded-lg bg-white p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-[#11112D]">Create an Event</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF1F1] text-[#F45B65] hover:bg-[#FFE5E5]"
          >
            <X size={14} />
          </button>
        </div>

        <div className="flex w-fit items-center gap-1 rounded-lg bg-[#F8F7FB] p-1">
          {['event', 'reminder', 'task'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setEventType(type)}
              className={`min-w-[52px] rounded-md px-3 py-1.5 text-[10px] font-medium capitalize transition-colors ${
                eventType === type
                  ? 'bg-[#FF8A6A] text-white'
                  : 'text-[#65627B] hover:bg-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Add title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full rounded-lg border-0 bg-[#F7F7F9] px-3 py-2.5 text-xs text-[#1E1B3A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
        />

        <div className="flex items-start gap-3 text-[10px] text-[#5E6482]">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF2EC] text-[#FF8A6A]">
            <Clock size={14} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-[#24223B]">
              {dateLabel} &nbsp; {formatTime(startTime)} - {formatTime(endTime)}
            </p>
            <p className="mt-1 text-[9px] text-[#9A98A9]">
              Time zone - Does not repeat
            </p>
            <button
              type="button"
              onClick={() => setShowDateTime((shown) => !shown)}
              className="mt-1 text-[10px] font-semibold text-[#5B52F9] hover:underline"
            >
              {showDateTime ? 'Hide time options' : 'Find a time'}
            </button>
            {showDateTime && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                <input
                  aria-label="Event date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  className="col-span-3 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[10px] text-[#1E1B3A] sm:col-span-1"
                />
                <input
                  aria-label="Start time"
                  type="time"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  required
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[10px] text-[#1E1B3A]"
                />
                <input
                  aria-label="End time"
                  type="time"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  required
                  className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[10px] text-[#1E1B3A]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAttendee((shown) => !shown)}
            className="flex items-center gap-1.5 rounded-lg bg-[#6155F5] px-3.5 py-2 text-[10px] font-semibold text-white hover:bg-[#4a42db]"
          >
            <Users size={12} />
            <span>{attendee || 'Add People'}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowLocation((shown) => !shown)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-[10px] font-medium text-[#5E6482] hover:border-[#5B52F9] hover:text-[#5B52F9]"
          >
            <MapPin size={12} className="text-[#5B52F9]" />
            <span>{location || 'Add location'}</span>
          </button>
        </div>

        {showAttendee && (
          <input
            type="text"
            placeholder="Name or email"
            value={attendee}
            onChange={(event) => setAttendee(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
          />
        )}
        {showLocation && (
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-[#1E1B3A] focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
          />
        )}

        <div className="flex items-start gap-3 rounded-lg bg-[#F8F8FA] p-2.5 text-[10px]">
          <img
            src="/john-deo.png"
            alt={attendee || 'John Deo'}
            className="h-7 w-7 shrink-0 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-[#24223B]">{attendee || 'John Deo'}</p>
            <p className="mt-0.5 text-[9px] text-[#9A98A9]">
              Busy - Default visibility - notify 30 minutes before
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#EEEAFD] px-4 py-2 text-[10px] font-medium text-[#5B52F9] hover:bg-[#F8F7FF]"
          >
            Close
          </button>
          <button
            type="submit"
            className="rounded-lg bg-[#6155F5] px-5 py-2 text-[10px] font-semibold text-white hover:bg-[#4a42db]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
