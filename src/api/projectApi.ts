import apiClient from "./apiClient";
import { Project } from "../types/Project";
import { AxiosResponse } from "axios";

export const fetchAllProjects = (): Promise<AxiosResponse<Project[]>> => {
  return apiClient.get('/api/projects');
}