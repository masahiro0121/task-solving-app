import { apiClient } from './apiClient';

type CurrentUserResponse = {
  username: string;
  authority: string;
};

export const authService = {
  login: async (username: string, password?: string): Promise<void> => {
    const params = new URLSearchParams();
    params.append('username', username);

    if (password) {
      params.append('password', password);
    }

    await apiClient.post('/login', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },

  me: async (): Promise<CurrentUserResponse> => {
    const response = await apiClient.get<CurrentUserResponse>('/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/logout');
  },
};
