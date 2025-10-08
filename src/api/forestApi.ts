import apiClient from "./apiClient";
import { Forest } from "../types/forest";
import { AxiosResponse } from "axios";

export const fetchAllForests = (): Promise<AxiosResponse<Forest[]>> => {
    return apiClient.get('/api/forests-map')
}