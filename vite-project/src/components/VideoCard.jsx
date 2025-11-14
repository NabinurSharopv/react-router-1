import React from 'react';
import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

function formatDuration(iso) {
  if (!iso) return '';
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return '';
  const hours = parseInt(m[1] || 0, 10);
  const minutes = parseInt(m[2] || 0, 10);
  const seconds = parseInt(m[3] || 0, 10);
  const total = hours * 3600 + minutes * 60 + seconds;
  const hh = Math.floor(total / 3600);
  const mm = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  if (hh > 0) return `${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  return `${mm}:${String(ss).padStart(2, '0')}`;
}

export default function VideoCard({ id, thumbnail, title, channel, views, uploadedAt, channelAvatar, duration }) {
  return (
    <Link to={`/video/${id}`} className="group cursor-pointer no-underline">
      <div>
        {/* Thumbnail Container */}
        <div className="relative mb-3 overflow-hidden rounded-xl bg-[#0f1012] aspect-video shadow-sm group-hover:shadow-lg transition-all duration-200">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          
          {/* Duration Badge */}
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-medium">
            {duration ? formatDuration(duration) : '12:34'}
          </span>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="text-white text-4xl">▶</div>
          </div>
        </div>

        {/* Info Container */}
        <div className="flex gap-3 px-0">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            {channelAvatar}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 group/content">
            {/* Title */}
            <h3 className="text-sm font-medium text-gray-100 line-clamp-2 group-hover/content:text-blue-400 transition duration-200">
              {title}
            </h3>
            
            {/* Channel Name */}
            <p className="text-xs text-gray-400 mt-1 hover:text-gray-200 transition">
              {channel}
            </p>
            
            {/* Stats */}
            <p className="text-xs text-gray-400 mt-0.5">
              {views} • {uploadedAt}
            </p>
          </div>

          {/* Menu Button */}
          <button 
            onClick={(e) => e.preventDefault()}
            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-[#161618] rounded-full transition duration-200"
          >
            <MoreVertical size={18} className="text-gray-300" />
          </button>
        </div>
      </div>
    </Link>
  );
}
