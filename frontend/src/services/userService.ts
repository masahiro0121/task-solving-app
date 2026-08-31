import type { User, UserForm } from '../types';
import { apiClient } from './apiClient';

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  create: async (newUser: UserForm): Promise<User> => {
    const response = await apiClient.post<User>('/users', newUser);
    return response.data;
  },

  update: async (
    targetUsername: string,
    data: { username: string; password?: string; authority: string },
  ): Promise<User> => {
    const response = await apiClient.put<User>(`/users/${targetUsername}`, {
      username: data.username,
      password: data.password,
      authority: data.authority,
    });

    return response.data;
  },

  delete: async (username: string): Promise<void> => {
    await apiClient.delete(`/users/${username}`);
  },
};
