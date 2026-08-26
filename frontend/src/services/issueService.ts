import axios from 'axios';
import type { Issue } from '../types';

const BASE_URL = 'http://localhost:8080/api/issues';

// バックエンドへのリクエストをまとめたオブジェクト
export const issueService = {
  // 一覧取得
  getAll: () => {
    return axios.get<Issue[]>(BASE_URL).then((res) => res.data);
  },

  // 詳細取得
  getById: (id: number) => {
    return axios.get<Issue>(`${BASE_URL}/${id}`).then((res) => res.data);
  },

  // 新規作成
  create: (newIssue: Omit<Issue, 'id'>) => {
    return axios.post(BASE_URL, newIssue);
  },

  // 更新
  update: (id: number, updatedIssue: Omit<Issue, 'id'>) => {
    return axios.put(`${BASE_URL}/${id}`, updatedIssue);
  },

  // 削除
  delete: (id: number) => {
    return axios.delete(`${BASE_URL}/${id}`);
  },
};
