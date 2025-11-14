import React, { createContext, useState, useCallback } from 'react';
import * as yt from '../api/youtube';

export const VideoContext = createContext(null);

export function VideoProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVideos = useCallback(async ({ query = '', category = '', pageToken = '', append = false } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await yt.searchVideos({ query, category, pageToken, maxResults: 50 });
      const items = res?.items || [];
      const token = res?.nextPageToken || null;
      setNextPageToken(token);
      setVideos((prev) => (append ? [...prev, ...items] : items));
    } catch (err) {
      setError(err.message || 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(() => {
    if (!nextPageToken) return;
    // use current searchTerm and category must be provided by caller; caller will pass category via fetchVideos
    // We'll expose nextPageToken so UI can call fetchVideos with it
    return fetchVideos({ pageToken: nextPageToken, append: true });
  }, [nextPageToken, fetchVideos]);

  return (
    <VideoContext.Provider value={{ searchTerm, setSearchTerm, videos, setVideos, fetchVideos, loadMore, nextPageToken, loading, error }}>
      {children}
    </VideoContext.Provider>
  );
}

export default VideoProvider;
