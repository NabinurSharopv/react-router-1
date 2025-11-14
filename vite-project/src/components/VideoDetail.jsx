import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share2, MoreVertical, Bell } from 'lucide-react';

export default function VideoDetail() {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  // Sample video data - real app'da API'dan olamiz
  const videoData = {
    id: videoId,
    title: 'React va Tailwind CSS yordamida ajoyib veb-sayt yaratish | Complete Tutorial',
    channel: 'Web Developer Kanal',
    channelAvatar: 'W',
    subscribers: '256K obunachi',
    views: '125,432 ko\'rish',
    uploadedAt: '2 kun oldin',
    description: 'Ushbu video kursda siz React va Tailwind CSS yordamida professional veb-saytlarni qanday yaratishni o\'rganasiz. Biz HTML, CSS, JavaScript, React hooks, va Tailwind CSS dan foydalanib to\'liq responsive sayt yaratamiz.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=450&fit=crop',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    likes: '8.2K',
    dislikes: '145',
  };

  const relatedVideos = [
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=169&fit=crop',
      title: 'JavaScript Advanced Concepts 2024',
      channel: 'Dasturlash Akademiyasi',
      views: '85K',
      uploadedAt: '1 hafta',
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1618983258176-e23cf480537f?w=300&h=169&fit=crop',
      title: 'Web Design Trends - Yangi dizaynlar',
      channel: 'Design Masters',
      views: '220K',
      uploadedAt: '3 kun',
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=300&h=169&fit=crop',
      title: 'Node.js Backend Development',
      channel: 'Backend Guruh',
      views: '156K',
      uploadedAt: '5 kun',
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=169&fit=crop',
      title: 'CSS Grid Complete Guide',
      channel: 'Frontend Experts',
      views: '198K',
      uploadedAt: '1 hafta',
    },
  ];

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-6">
          {/* Video Player */}
          <div className="mb-6">
            <div className="relative w-full bg-black rounded-xl overflow-hidden aspect-video shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={videoData.videoUrl}
                title={videoData.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Video Title and Actions */}
              <div className="bg-white rounded-lg p-4 md:p-6 mb-4 shadow-sm">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {videoData.title}
                </h1>

                {/* Channel Info */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {videoData.channelAvatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{videoData.channel}</p>
                      <p className="text-sm text-gray-600">{videoData.subscribers}</p>
                    </div>
                    <button
                      onClick={() => setSubscribed(!subscribed)}
                      className={`ml-4 px-6 py-2 rounded-full font-semibold transition ${
                        subscribed
                          ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {subscribed ? 'Obuna qilgan' : 'Obuna qilish'}
                    </button>
                  </div>
                </div>

                {/* Video Stats */}
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                  <span>{videoData.views}</span>
                  <span>{videoData.uploadedAt}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
                      liked
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsUp size={20} />
                    <span className="hidden sm:inline">{videoData.likes}</span>
                  </button>

                  <button
                    onClick={handleDislike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition ${
                      disliked
                        ? 'bg-gray-200 text-gray-900'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <ThumbsDown size={20} />
                  </button>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
                    <Share2 size={20} />
                    <span className="hidden sm:inline">Baham ko'rish</span>
                  </button>

                  <button className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition ml-auto">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Video tavsifi</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {videoData.description}
                </p>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Tegishli videolar</h3>
                <div className="space-y-3">
                  {relatedVideos.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => navigate(`/video/${video.id}`)}
                      className="flex gap-3 cursor-pointer group"
                    >
                      <div className="relative w-28 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                          {video.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">{video.channel}</p>
                        <p className="text-xs text-gray-600">{video.views} • {video.uploadedAt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
