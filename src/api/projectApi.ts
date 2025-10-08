import apiClient from "./apiClient";
import { Project } from "../types/project";
import { AxiosResponse } from "axios";

export const fetchAllProjects = (): Promise<AxiosResponse<Project[]>> => {
  return apiClient.get('/api/projects');
}

export const fetchProjectById = (id: string): Promise<AxiosResponse<Project>> => {
  return apiClient.get(`/api/projects/${id}`);
};