import React, { useState, useContext } from 'react';
import { Search, Menu, Bell, User, Mic, Upload } from 'lucide-react';
import { VideoContext } from '../context/VideoContext';
import { useNavigate } from 'react-router-dom';

export default function YouTubeHeader() {
  const { setSearchTerm } = useContext(VideoContext);
  const [local, setLocal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (local.trim()) {
      setSearchTerm(local.trim());
      navigate('/');
    }
  };

  return (
    <header className="bg-[#0b0c0f] border-b border-[#1f1f1f] sticky top-0 z-50">
      <div className="flex items-center justify-between px-2 md:px-4 py-2.5">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center gap-2 md:gap-4 min-w-fit">
          <button className="p-2.5 hover:bg-[#121214] rounded-full transition duration-200">
            <Menu size={24} className="text-gray-300" />
          </button>
          <div 
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition"
            onClick={() => {
              setSearchTerm('');
              navigate('/');
            }}
          >
            <div className="text-red-500 text-2xl font-bold">▶</div>
            <span className="text-xl font-bold text-gray-200 hidden sm:inline">YouTube</span>
          </div>
        </div>

        {/* Middle - Search */}
        <div className="flex-1 mx-2 md:mx-4 max-w-2xl">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-[#0f1012] rounded-full border border-[#222326] transition hover:border-[#3a3f45]"
          >
            <input
              type="text"
              placeholder="Videos, channels, playlists qidiring..."
              value={local}
              onChange={(e) => setLocal(e.target.value)}
              className="bg-transparent w-full outline-none px-4 py-2.5 text-sm text-gray-200 placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="p-2.5 hover:bg-[#121214] rounded-r-full transition"
            >
              <Search size={20} className="text-gray-300" />
            </button>
          </form>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-2.5 hover:bg-[#121214] rounded-full transition hidden md:flex">
            <Mic size={20} className="text-gray-300" />
          </button>
          <button className="p-2.5 hover:bg-[#121214] rounded-full transition hidden sm:flex">
            <Upload size={20} className="text-gray-300" />
          </button>
          <button className="p-2.5 hover:bg-[#121214] rounded-full transition">
            <Bell size={20} className="text-gray-300" />
          </button>
          <button className="p-2.5 hover:bg-[#121214] rounded-full transition">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <User size={18} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
