import React from 'react';
import { Routes, Route } from 'react-router-dom';
import YouTubeHeader from './components/YouTubeHeader';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import VideoDetail from './components/VideoDetail';

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-[#0b0c0f] text-gray-100">
      <YouTubeHeader />
      <Routes>
        <Route
          path="/category/:category"
          element={
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <VideoGrid />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <VideoGrid />
            </div>
          }
        />
        <Route
          path="/video/:videoId"
          element={
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <VideoDetail />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;