const mockVideos = [
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
  // add a few more for demo
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
  }
];

// Enhanced YouTube adapter: supports search + details + pagination
async function callYouTube(endpoint, paramsObj) {
  const key = import.meta.env.VITE_YT_API_KEY;
  if (!key) throw new Error('Missing VITE_YT_API_KEY');
  const params = new URLSearchParams({ ...paramsObj, key });
  const url = `https://www.googleapis.com/youtube/v3/${endpoint}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
  return res.json();
}

function mapVideoItem(snippet, stats = {}, content = {}) {
  return {
    id: snippet.resourceId?.videoId || snippet.videoId || snippet.id || '',
    thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
    title: snippet.title || snippet.snippet?.title || '',
    channel: snippet.channelTitle || snippet.snippet?.channelTitle || '',
    channelAvatar: (snippet.channelTitle || snippet.snippet?.channelTitle || '').charAt(0).toUpperCase(),
    category: '',
    views: stats.viewCount || '',
    uploadedAt: snippet.publishedAt || snippet.snippet?.publishedAt || '',
    duration: content.duration || '',
  }
}

export async function searchVideos({ query = '', category = '', pageToken = '', maxResults = 50 } = {}) {
  // If no API key, fallback to mock behavior (keep structure: { items, nextPageToken })
  if (!import.meta.env.VITE_YT_API_KEY) {
    const qlower = (query || '').toString().toLowerCase();
    const catlower = (category || '').toString().toLowerCase();
    let results = mockVideos.slice();
    if (catlower && catlower !== 'hamma') {
      results = results.filter((v) => (v.category || '').toLowerCase() === catlower);
    }
    if (qlower) {
      results = results.filter((v) => (
        v.title.toLowerCase().includes(qlower) || (v.channel || '').toLowerCase().includes(qlower)
      ));
    }
    return { items: results, nextPageToken: null };
  }

  // Use YouTube API: search -> videos (details)
  try {
    const q = query || category || 'trending';
    const searchRes = await callYouTube('search', {
      part: 'snippet',
      q,
      type: 'video',
      maxResults: String(maxResults),
      pageToken: pageToken || undefined,
    });

    const videoIds = (searchRes.items || [])
      .map((it) => it.id?.videoId)
      .filter(Boolean)
      .join(',');

    let details = {};
    if (videoIds) {
      const videosRes = await callYouTube('videos', {
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
      });
      // map by id for quick lookup
      details = (videosRes.items || []).reduce((acc, v) => {
        acc[v.id] = v;
        return acc;
      }, {});
    }

    const items = (searchRes.items || []).map((it) => {
      const id = it.id?.videoId;
      const detail = details[id];
      const snippet = detail?.snippet || it.snippet || {};
      const stats = detail?.statistics || {};
      const content = detail?.contentDetails || {};
      return {
        id,
        thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
        title: snippet.title || '',
        channel: snippet.channelTitle || '',
        channelAvatar: (snippet.channelTitle || '').charAt(0).toUpperCase(),
        category: '',
        views: stats.viewCount || '',
        uploadedAt: snippet.publishedAt || '',
        duration: content.duration || '',
      };
    });

    return { items, nextPageToken: searchRes.nextPageToken || null };
  } catch (err) {
    console.error('YouTube API error', err);
    // fallback to mock
    return { items: mockVideos.slice(), nextPageToken: null };
  }
}

export default { searchVideos };
