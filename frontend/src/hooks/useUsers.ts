import { useState, useEffect } from 'react';
import type { User, UserForm } from '../types';
import { userService } from '../services/userService';

export const useUsers = (isLoggedIn: boolean) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (err) {
      console.error('ユーザー一覧の取得に失敗しました:', err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const handleSubmit = async (payload: UserForm) => {
    try {
      await userService.create(payload);
      fetchUsers();
    } catch (err) {
      alert('ユーザーの登録に失敗しました');
    }
  };

  const handleStartEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleUpdate = async (payload: {
    username: string;
    password?: string;
    authority: string;
  }) => {
    if (!editingUser) return;

    if (!payload.password || payload.password.trim() === '') {
      alert('パスワードを入力してください');
      return;
    }

    try {
      await userService.update(editingUser.username, {
        username: payload.username,
        password: payload.password,
        authority: payload.authority,
      });
      handleCancelEdit();
      fetchUsers();
    } catch (error) {
      console.error('ユーザーの更新に失敗しました:', error);
      alert('ユーザーの更新に失敗しました');
    }
  };

  const handleDelete = async (targetUsername: string) => {
    const isConfirmed = window.confirm(
      `ユーザー「${targetUsername}」を削除しますか？`,
    );
    if (!isConfirmed) return;

    try {
      await userService.delete(targetUsername);
      fetchUsers();

      if (editingUser?.username === targetUsername) {
        handleCancelEdit();
      }
    } catch (error) {
      console.error('ユーザーの削除に失敗しました:', error);
      alert('ユーザーの削除に失敗しました');
    }
  };

  return {
    users,
    editingUsername: editingUser?.username ?? null,
    editingUser,
    handleSubmit,
    handleStartEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
  };
};
