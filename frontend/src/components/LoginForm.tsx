import { useState } from 'react';
import type { FormEvent } from 'react';
import { authService } from '../services/authService';

type Props = {
  onLoginSuccess: (username: string) => void;
};

export const LoginForm = ({ onLoginSuccess }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await authService.login(username, password);
      onLoginSuccess(username);
    } catch (err) {
      setError(
        'ログインに失敗しました。ユーザー名またはパスワードを確認してください。',
      );
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <h2 className="text-center mb-4 font-bold">ログイン</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ユーザー名</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          ログイン
        </button>
      </form>
    </div>
  );
};
