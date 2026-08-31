import { Link, useNavigate } from 'react-router-dom';

type Props = {
  isLoggedIn: boolean;
  currentUser: string | null;
  authority: string | null;
  onLogout: () => void;
};

export const Navbar = ({
  isLoggedIn,
  currentUser,
  authority,
  onLogout,
}: Props) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    const isConfirmed = window.confirm('ログアウトしますか？');
    if (!isConfirmed) return;

    onLogout();
    navigate('/login');
  };

  if (!isLoggedIn) return null;

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4 border-bottom border-secondary">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/issues">
          課題管理アプリ
        </Link>

        <div className="navbar-nav me-auto">
          <Link className="nav-link" to="/issues">
            課題一覧
          </Link>

          {authority === 'ADMIN' && (
            <Link className="nav-link" to="/users">
              ユーザー管理
            </Link>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-light">
            User: <strong>{currentUser}</strong>
          </span>
          <button
            onClick={handleLogoutClick}
            className="btn btn-outline-light btn-sm"
          >
            ログアウト
          </button>
        </div>
      </div>
    </nav>
  );
};
