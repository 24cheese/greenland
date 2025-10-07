import apiClient from './apiClient';
import { News } from '../types/news';
import { AxiosResponse } from 'axios';

export const fetchAllNews = (): Promise<AxiosResponse<News[]>> => {
  return apiClient.get('/api/news');
};