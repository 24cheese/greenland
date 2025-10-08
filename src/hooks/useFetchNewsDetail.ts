import { useState, useEffect } from 'react';
import { fetchNewsById } from '../api/newsApi'; 
import { News } from '../types/news';

export function useFetchNewsDetail(id: string | undefined) {
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Chỉ chạy khi có id
    if (!id) {
      setLoading(false);
      return;
    }

    const getNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchNewsById(id);
        setNews(response.data);
      } catch (err: any) {
        setError(err);
        console.error(`Lỗi khi tải chi tiết tin tức với id ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    getNewsDetail();
  }, [id]); // Hook sẽ chạy lại mỗi khi id thay đổi

  return { news, loading, error };
}