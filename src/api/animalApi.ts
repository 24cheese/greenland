import apiClient from './apiClient';
import { Animal } from '../types/animal';
import { AxiosResponse } from 'axios';

export const fetchAllAnimals = (): Promise<AxiosResponse<Animal[]>> => {
  return apiClient.get('/api/animals');
};