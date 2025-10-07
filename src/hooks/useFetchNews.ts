import { useEffect, useState } from 'react';
import { fetchNews } from '../api/newsApi';
import { NewsItem } from '../types/news';

export const useFetchNews = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews()
      .then(setNewsList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { newsList, loading };
};
