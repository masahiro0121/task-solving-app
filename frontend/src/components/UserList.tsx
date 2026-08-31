import type { User } from '../types';

type Props = {
  users: User[];
  onStartEdit: (user: User) => void;
  onDelete: (username: string) => void;
};

export const UserList = ({ users, onStartEdit, onDelete }: Props) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">ユーザー一覧</h2>
        {users.length === 0 ? (
          <p className="text-muted mb-0">ユーザーがいません。</p>
        ) : (
          <table className="table table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>ユーザー名</th>
                <th>権限</th>
                <th className="text-end">操作</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>
                    <span className="badge bg-secondary">{user.authority}</span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-success me-2"
                      onClick={() => onStartEdit(user)}
                    >
                      編集
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(user.username)}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
