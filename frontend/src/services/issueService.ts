import type { Issue } from '../types';
import { apiClient } from './apiClient';

export const issueService = {
  getAll: async (): Promise<Issue[]> => {
    const response = await apiClient.get<Issue[]>('/issues');
    return response.data;
  },

  getById: async (id: number): Promise<Issue> => {
    const response = await apiClient.get<Issue>(`/issues/${id}`);
    return response.data;
  },

  create: async (newIssue: Omit<Issue, 'id'>): Promise<Issue> => {
    const response = await apiClient.post<Issue>('/issues', newIssue);
    return response.data;
  },

  update: async (
    id: number,
    updatedIssue: Omit<Issue, 'id'>,
  ): Promise<Issue> => {
    const response = await apiClient.put<Issue>(`/issues/${id}`, updatedIssue);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/issues/${id}`);
  },
};
