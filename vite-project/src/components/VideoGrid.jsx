import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoCard from './VideoCard';
import { VideoContext } from '../context/VideoContext';

const CATEGORIES = [
  'Hamma', 'Musika', 'Dasturlash', 'Videolar', 'Gaming', 'Sportlar',
  'Kinolar', 'Yangiliklar', 'Tibbiyot', 'Taraqqiyot'
];

const localVideos = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
    title: 'React va Tailwind CSS yordamida ajoyib veb-sayt yaratish | Complete Tutorial',
    channel: 'Web Developer Kanal',
    channelAvatar: 'W',
    category: 'Dasturlash',
    views: '125K ko\'rish',
    uploadedAt: '2 kun oldin',
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    title: 'Musical Beats - Chill Mix 2024',
    channel: 'Music Channel',
    channelAvatar: 'M',
    category: 'Musika',
    views: '85K ko\'rish',
    uploadedAt: '1 hafta oldin',
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1618983258176-e23cf480537f?w=400&h=225&fit=crop',
    title: 'Sport Highlights - Best Goals',
    channel: 'Sport Channel',
    channelAvatar: 'S',
    category: 'Sportlar',
    views: '220K ko\'rish',
    uploadedAt: '3 kun oldin',
  },
  {
    id: '4',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
    title: 'Node.js va Express - Backend kursi',
    channel: 'Backend Guruh',
    channelAvatar: 'B',
    category: 'Dasturlash',
    views: '156K ko\'rish',
    uploadedAt: '5 kun oldin',
  },
  {
    id: '5',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    title: 'Top Pop Hits 2024',
    channel: 'Top Music',
    channelAvatar: 'T',
    category: 'Musika',
    views: '198K ko\'rish',
    uploadedAt: '1 hafta oldin',
  },
  {
    id: '6',
    thumbnail: 'https://images.unsplash.com/photo-1618983258176-e23cf480537f?w=400&h=225&fit=crop',
    title: 'TypeScript bilan ishlamiz - Xavfsiz kod yozish qoidalari',
    channel: 'Code Quality Channel',
    channelAvatar: 'C',
    category: 'Dasturlash',
    views: '102K ko\'rish',
    uploadedAt: '4 kun oldin',
  },
  {
    id: '7',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
    title: 'Vite - Eng tez build tool | Next generation frontend tooling',
    channel: 'Dev Tools Academy',
    channelAvatar: 'D',
    category: 'Dasturlash',
    views: '78K ko\'rish',
    uploadedAt: '3 hafta oldin',
  },
  {
    id: '8',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    title: 'React Hooks - State Management va Performance Optimization',
    channel: 'React Experts',
    channelAvatar: 'R',
    category: 'Dasturlash',
    views: '312K ko\'rish',
    uploadedAt: '2 hafta oldin',
  },
  {
    id: '9',
    thumbnail: 'https://images.unsplash.com/photo-1618983258176-e23cf480537f?w=400&h=225&fit=crop',
    title: 'MongoDB Database - Hamma narsani o\'rganamiz',
    channel: 'Database Masters',
    channelAvatar: 'D',
    category: 'Dasturlash',
    views: '267K ko\'rish',
    uploadedAt: '1 kun oldin',
  },
  {
    id: '10',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=225&fit=crop',
    title: 'REST API va GraphQL - API development comparison',
    channel: 'API Design Pro',
    channelAvatar: 'A',
    category: 'Dasturlash',
    views: '189K ko\'rish',
    uploadedAt: '6 kun oldin',
  },
  {
    id: '11',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    title: 'Docker va Kubernetes - Containerization Complete Guide',
    channel: 'DevOps Academy',
    channelAvatar: 'D',
    category: 'Dasturlash',
    views: '156K ko\'rish',
    uploadedAt: '2 kun oldin',
  },
  {
    id: '12',
    thumbnail: 'https://images.unsplash.com/photo-1618983258176-e23cf480537f?w=400&h=225&fit=crop',
    title: 'Web Security Best Practices - Hakkerlardan qanday qo\'limiz',
    channel: 'Security Experts',
    channelAvatar: 'S',
    category: 'Tibbiyot',
    views: '234K ko\'rish',
    uploadedAt: '4 kun oldin',
  },
];

export default function VideoGrid() {
  const slugs = CATEGORIES.map((c) =>
    c.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  );

  const params = useParams();
  const currentParam = (params.category || 'hamma').toString().toLowerCase();
  const activeCategory = Math.max(0, slugs.indexOf(currentParam));

  const { searchTerm, videos: fetchedVideos, fetchVideos, loading, nextPageToken } = useContext(VideoContext);

  const activeCategoryName = CATEGORIES[activeCategory] || 'Hamma';

  // Fetch videos when route category or searchTerm changes
  useEffect(() => {
    const catName = CATEGORIES[activeCategory] || 'Hamma';
    // Always fetch when searchTerm or category changes
    fetchVideos({ query: searchTerm, category: catName === 'Hamma' ? '' : catName });
  }, [activeCategory, searchTerm, fetchVideos]);
  let filteredVideos = [];

  if (fetchedVideos && fetchedVideos.length > 0) {
    filteredVideos = fetchedVideos;
  } else {
    // Fallback: filter local videos by category and search term
    filteredVideos = localVideos.filter((v) => {
      const matchCat = activeCategoryName === 'Hamma' || (v.category || '').toLowerCase() === activeCategoryName.toLowerCase();
      if (!searchTerm) return matchCat;
      const q = searchTerm.toLowerCase();
      const matchQ = (v.title || '').toLowerCase().includes(q) || (v.channel || '').toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }

  return (
    <main className="flex-1 bg-transparent overflow-y-auto">
      <div className="sticky top-0 bg-transparent border-b border-[#1f1f1f] z-40">
        <div className="px-4 py-3">
          {/* Category pills */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat, index) => {
              const slug = slugs[index];
              return (
                <Link key={index} to={`/category/${slug}`} className="flex-shrink-0">
                  <button
                    className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-200 flex-shrink-0 ${
                      activeCategory === index
                        ? 'bg-[#20242a] text-white shadow-md'
                        : 'bg-[#161619] text-gray-300 hover:bg-[#232629]'
                    }`}
                  >
                    {cat}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="p-4 md:p-6">
        {loading && <div className="text-gray-400">Yuklanmoqda...</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))
          ) : (
            !loading && <div className="text-gray-400">Bu bo'lim uchun video topilmadi.</div>
          )}
        </div>

        {/* Load more */}
        <div className="mt-8 flex justify-center pb-8">
          {nextPageToken && !loading && (
            <button
              onClick={() => {
                const catName = CATEGORIES[activeCategory] || 'Hamma';
                fetchVideos({ query: searchTerm, category: catName, pageToken: nextPageToken, append: true });
              }}
              className="px-6 py-2 bg-[#20242a] text-white rounded-full font-medium hover:bg-[#262b32] transition"
            >
              Yana yuklash
            </button>
          )}
          {loading && <div className="text-gray-400 text-center">Yuklanmoqda...</div>}
        </div>
      </div>
    </main>
  );
}
