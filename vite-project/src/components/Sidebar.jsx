import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Bell, Folder, Clock, Video, Heart } from 'lucide-react';

const MENU = [
  { to: '/', icon: Home, label: 'Bosh sahifa' },
  { to: '/category/explore', icon: Compass, label: 'Kashf etish' },
  { to: '/category/subscriptions', icon: Bell, label: 'Obunalar' },
  { to: '/library', icon: Folder, label: 'Kutubxona' },
  { to: '/history', icon: Clock, label: 'Tarix' },
  { to: '/your-videos', icon: Video, label: 'Sizning videolar' },
  { to: '/liked', icon: Heart, label: 'Yoqtirilganlar' },
];

export default function Sidebar() {
  return (
    <aside className={`w-64 bg-[#0b0c0f] border-r border-[#1f1f1f] text-gray-300 flex flex-col h-full`}> 
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#1f1f1f]">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-6 bg-red-600 rounded-sm flex items-center justify-center">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8.5v7l6-3.5-6-3.5z" />
            </svg>
          </div>
          <span className="text-white font-semibold">YouTube</span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="p-3 flex-1 overflow-y-auto">
        {MENU.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="mb-1 flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-[#121214] transition-colors text-gray-200"
          >
            <item.icon size={20} className="text-gray-400" />
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Footer / Settings */}
      <div className="p-3 border-t border-[#1f1f1f]">
        <div className="text-xs text-gray-500">© 2025 Your App</div>
      </div>
    </aside>
  );
}
