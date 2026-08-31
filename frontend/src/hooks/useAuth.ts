import { useEffect, useState } from 'react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authority, setAuthority] = useState<string | null>(null);

  const clearAuthState = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setAuthority(null);
  };

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const user = await authService.me();

        if (!isMounted) {
          return;
        }

        setCurrentUser(user.username);
        setAuthority(user.authority);
        setIsLoggedIn(true);
      } catch (error) {
        console.info('セッションの復元は行われませんでした:', error);

        if (isMounted) {
          clearAuthState();
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLoginSuccess = async (username: string) => {
    const trimmedUsername = username.trim();

    try {
      const user = await authService.me();
      setCurrentUser(user.username || trimmedUsername);
      setAuthority(user.authority);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('ログイン後のユーザー情報取得に失敗しました:', error);
      clearAuthState();
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      clearAuthState();
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
      alert('ログアウトに失敗しました');
    }
  };

  return {
    isLoggedIn,
    currentUser,
    authority,
    handleLoginSuccess,
    handleLogout,
  };
};
