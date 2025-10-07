import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';

// Dùng Generic Type <T> để hook có thể làm việc với mọi loại dữ liệu
export function useFetchData<T>(apiFunction: () => Promise<AxiosResponse<T[]>>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiFunction();
        setData(response.data);
      } catch (err: any) {
        setError(err);
        console.error('Lỗi khi fetch dữ liệu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiFunction]); // Phụ thuộc vào hàm api, nếu nó thay đổi, hook sẽ chạy lại

  return { data, loading, error };
}