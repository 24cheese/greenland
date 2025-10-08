import { useState, useEffect } from 'react';
import { fetchProjectById } from '../api/projectApi';
import { Project } from '../types/project';

export function useFetchProjectDetail(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const getProjectDetail = async () => {
      try {
        setLoading(true);
        const response = await fetchProjectById(id);
        setProject(response.data);
      } catch (err: any) {
        setError(err);
        console.error(`Lỗi khi tải chi tiết dự án với id ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    getProjectDetail();
  }, [id]);

  return { project, loading, error };
}