import React, { useState } from 'react';
import {
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  MoreHorizontal
} from 'lucide-react';
import { initialChatContacts } from '../../data/mockData';

export default function ChatView({ onOpenMobileSidebar }) {
  const [contacts, setContacts] = useState(initialChatContacts);
  const [activeTab, setActiveTab] = useState('personal'); // 'all' | 'personal' | 'teams'
  const [selectedContactId, setSelectedContactId] = useState(3); // John Carlio
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectedContact =
    contacts.find((c) => c.id === selectedContactId) || contacts[0];

  const filteredContacts = contacts.filter((c) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'personal' && c.category === 'personal') ||
      (activeTab === 'teams' && c.category === 'teams');
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'them', // active user side
      text: messageText,
      time: 'Just now'
    };

    setContacts(
      contacts.map((c) => {
        if (c.id === selectedContactId) {
          return {
            ...c,
            lastMessage: messageText,
            messages: [...(c.messages || []), newMsg]
          };
        }
        return c;
      })
    );

    setMessageText('');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
      <div className="bg-white rounded-2xl shadow-2xs border border-gray-100/60 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[720px]">
        {/* Left Contact List Pane (4 columns) matching screenshot 22 */}
        <div className="lg:col-span-4 border-r border-gray-100 p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header: Title and Blue Plus button */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1E1B3A]">Message</h2>
              <button
                onClick={() => alert("Start new conversation")}
                className="w-8 h-8 rounded-full bg-[#5B52F9] text-white flex items-center justify-center hover:bg-[#4a42db] transition-colors shadow-xs"
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3.5 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F8F9FD] rounded-xl text-xs text-[#1E1B3A] border border-gray-200/80 focus:outline-none focus:ring-2 focus:ring-[#5B52F9]/20"
              />
            </div>

            {/* Sub-tabs: All | Personal | Teams with underline indicator */}
            <div className="flex items-center justify-around border-b border-gray-100 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('all')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'all'
                    ? 'text-[#5B52F9]'
                    : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
                }`}
              >
                All
                {activeTab === 'all' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B52F9] rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('personal')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'personal'
                    ? 'text-[#5B52F9]'
                    : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
                }`}
              >
                Personal
                {activeTab === 'personal' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B52F9] rounded-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`pb-2.5 transition-colors relative ${
                  activeTab === 'teams'
                    ? 'text-[#5B52F9]'
                    : 'text-[#8E8EA1] hover:text-[#1E1B3A]'
                }`}
              >
                Teams
                {activeTab === 'teams' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5B52F9] rounded-full" />
                )}
              </button>
            </div>

            {/* Contacts scroll list */}
            <div className="space-y-1 overflow-y-auto max-h-[500px]">
              {filteredContacts.map((contact) => {
                const isSelected = contact.id === selectedContactId;

                return (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContactId(contact.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#ECEBFE]/50 shadow-2xs'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {/* Avatar with online dot */}
                    <div className="relative shrink-0">
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-[#1E1B3A] truncate">
                          {contact.name}
                        </h4>
                        <span className="text-[10px] text-[#8E8EA1] shrink-0">
                          {contact.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#8E8EA1] truncate mt-0.5">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Chat Stream Pane (8 columns) matching screenshot 22 */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-50"
                />
                {selectedContact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1E1B3A]">
                  {selectedContact.name}
                </h3>
                <p className="text-[11px] text-[#8E8EA1]">
                  {selectedContact.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>

            {/* Action Buttons: Phone, Video, Menu */}
            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-2 hover:text-[#5B52F9] hover:bg-gray-50 rounded-xl transition-colors">
                <Phone size={18} />
              </button>
              <button className="p-2 hover:text-[#5B52F9] hover:bg-gray-50 rounded-xl transition-colors">
                <Video size={18} />
              </button>
              <button className="p-2 hover:text-[#5B52F9] hover:bg-gray-50 rounded-xl transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {/* Default conversation flow from screenshot 22 */}
            <div className="space-y-3">
              {/* Blue bubble 1 */}
              <div className="flex justify-start">
                <div className="bg-[#437EF7] text-white text-xs px-4 py-2.5 rounded-2xl max-w-md shadow-xs">
                  Lorem Ipsum is simply
                </div>
              </div>

              {/* Blue bubble 2 */}
              <div className="flex items-center gap-2 justify-start">
                <div className="bg-[#437EF7] text-white text-xs px-4 py-2.5 rounded-2xl max-w-md shadow-xs">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <span className="text-[9px] text-blue-100 float-right mt-1">09.02 PM</span>
                </div>
                <button className="text-gray-300 hover:text-gray-500">
                  <MoreHorizontal size={14} />
                </button>
              </div>

              {/* Incoming mock image card preview matching screenshot 22 */}
              <div className="flex items-start gap-3 justify-start pt-2">
                <img
                  src={selectedContact.avatar}
                  alt="avatar"
                  className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100 max-w-md">
                      <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&auto=format&fit=crop&q=80"
                        alt="Preview"
                        className="rounded-xl h-28 object-cover"
                      />
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&auto=format&fit=crop&q=80"
                        alt="Preview"
                        className="rounded-xl h-28 object-cover"
                      />
                    </div>
                    <button className="text-gray-300 hover:text-gray-500">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Blue bubble 3 */}
              <div className="flex items-center gap-2 justify-start pt-2">
                <div className="bg-[#437EF7] text-white text-xs px-4 py-2.5 rounded-2xl max-w-md shadow-xs">
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                  <span className="text-[9px] text-blue-100 float-right mt-1">09.04 PM</span>
                </div>
                <button className="text-gray-300 hover:text-gray-500">
                  <MoreHorizontal size={14} />
                </button>
              </div>

              {/* Incoming user bubble */}
              <div className="flex items-center gap-3 justify-start">
                <img
                  src={selectedContact.avatar}
                  alt="avatar"
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
              </div>

              {/* Additional sent messages */}
              {selectedContact.messages &&
                selectedContact.messages.map((m) => (
                  <div key={m.id} className="flex justify-start">
                    <div className="bg-[#437EF7] text-white text-xs px-4 py-2.5 rounded-2xl max-w-md shadow-xs">
                      <p>{m.text}</p>
                      <span className="text-[9px] text-blue-100 float-right mt-1">{m.time}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Bottom Message Composer Input Bar matching screenshot 22 */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-gray-100 flex items-center gap-3 bg-[#F8F9FD] m-4 rounded-2xl"
          >
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Attach File"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-transparent text-xs text-[#1E1B3A] placeholder-[#8E8EA1] focus:outline-none"
            />

            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Emojis"
            >
              <Smile size={18} />
            </button>

            <button
              type="submit"
              className="text-[#437EF7] hover:text-blue-700 p-1 transition-transform active:scale-90"
              title="Send"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
