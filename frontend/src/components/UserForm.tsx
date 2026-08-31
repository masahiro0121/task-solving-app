import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

type UserDraft = {
  username: string;
  authority: string;
};

type Props = {
  onCreate: (payload: {
    username: string;
    password: string;
    authority: string;
  }) => void;
  onUpdate: (payload: {
    username: string;
    password: string;
    authority: string;
  }) => void;
  editingUsername: string | null;
  userToEdit: UserDraft | null;
  onCancelEdit: () => void;
};

export const UserForm = ({
  onCreate,
  onUpdate,
  editingUsername,
  userToEdit,
  onCancelEdit,
}: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authority, setAuthority] = useState('USER');
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editAuthority, setEditAuthority] = useState('USER');

  useEffect(() => {
    if (!userToEdit) {
      return;
    }

    setEditUsername(userToEdit.username);
    setEditAuthority(userToEdit.authority);
    setEditPassword('');
  }, [userToEdit]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({ username, password, authority });
    setUsername('');
    setPassword('');
    setAuthority('USER');
  };

  const handleUpdateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUsername) return;

    onUpdate({
      username: editUsername,
      password: editPassword,
      authority: editAuthority,
    });
    onCancelEdit();
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-body">
        {editingUsername ? (
          <div>
            <h2 className="h5 card-title mb-3">ユーザー編集</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-3">
                <label className="form-label">ユーザー名</label>
                <input
                  type="text"
                  className="form-control"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">パスワード</label>
                <input
                  type="password"
                  className="form-control"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="新しいパスワードを入力してください"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">権限</label>
                <select
                  className="form-select"
                  value={editAuthority}
                  onChange={(e) => setEditAuthority(e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary me-2">
                更新
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancelEdit}
              >
                キャンセル
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="h5 card-title mb-3">新規ユーザー登録</h2>
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
              <div className="mb-3">
                <label className="form-label">権限</label>
                <select
                  className="form-select"
                  value={authority}
                  onChange={(e) => setAuthority(e.target.value)}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                登録
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
