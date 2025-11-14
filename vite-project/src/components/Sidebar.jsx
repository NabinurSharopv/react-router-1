import React, { useState } from 'react';
import { Home, Flame, Music, Play, Users, Settings, ChevronDown } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const mainMenuItems = [
    { icon: Home, label: 'Bosh sahifa' },
    { icon: Flame, label: 'Trending' },
    { icon: Play, label: 'Obunalar' },
  ];

  const secondMenuItems = [
    { icon: Music, label: 'Musika' },
    { icon: Users, label: 'Sportlar' },
    { icon: Play, label: 'Gaming' },
  ];

  const channels = [
    { name: 'Dasturlash Akademiyasi', online: true },
    { name: 'Web Dev Kanal', online: false },
    { name: 'Frontend Masters', online: true },
    { name: 'Backend Experts', online: false },
  ];

  return (
    <aside className={`${
      isOpen ? 'w-64' : 'w-20'
    } bg-[#0b0c0f] border-r border-[#1f1f1f] text-gray-300 transition-all duration-300 overflow-hidden flex flex-col h-full`}>
      
      {/* Main Menu */}
      <div className="p-3 border-b border-gray-200">
        {mainMenuItems.map((item, index) => (
          <div
            key={index}
            className="mb-2 flex items-center gap-4 px-3 py-3 hover:bg-[#121214] rounded-lg cursor-pointer transition duration-200 group"
          >
              <item.icon size={24} className="text-gray-400 group-hover:text-white" />
              {isOpen && <span className="text-sm font-medium text-gray-200">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Secondary Menu */}
      <div className="p-3 border-b border-gray-200">
        {secondMenuItems.map((item, index) => (
          <div
            key={index}
            className="mb-2 flex items-center gap-4 px-3 py-3 hover:bg-[#121214] rounded-lg cursor-pointer transition duration-200 group"
          >
              <item.icon size={24} className="text-gray-400 group-hover:text-white" />
              {isOpen && <span className="text-sm font-medium text-gray-200">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* Subscriptions */}
      <div className="p-3 border-b border-[#1f1f1f] flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-3 px-3">
          <span className={`text-xs font-bold text-gray-400 ${!isOpen && 'hidden'}`}>
            OBUNALAR
          </span>
          {isOpen && <ChevronDown size={18} className="text-gray-600" />}
        </div>

        {channels.map((channel, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#121214] rounded-lg cursor-pointer transition duration-200 mb-1 group"
          >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${
              channel.online 
                ? 'bg-gradient-to-br from-red-400 to-red-600' 
                : 'bg-gray-400'
            }`}>
              {channel.name.charAt(0)}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 truncate group-hover:font-medium">
                  {channel.name}
                </p>
                {channel.online && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-400">Direct</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="p-3 border-t border-[#1f1f1f]">
        <div className="flex items-center gap-4 px-3 py-3 hover:bg-[#121214] rounded-lg cursor-pointer transition duration-200 group">
          <Settings size={24} className="text-gray-400 group-hover:text-white" />
          {isOpen && <span className="text-sm font-medium text-gray-200">Sozlamalar</span>}
        </div>
      </div>

      {/* Toggle Button */}
      <div className="p-3 border-t border-[#1f1f1f]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-xs text-gray-400 hover:bg-[#121214] rounded-lg transition"
        >
          {isOpen ? 'Kichraytir' : 'Kattalashtir'}
        </button>
      </div>
    </aside>
  );
}
