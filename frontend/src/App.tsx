import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { IssuesPage } from './pages/IssuesPage';
import { UsersPage } from './pages/UsersPage';

export function App() {
  const {
    isLoggedIn,
    currentUser,
    authority,
    handleLoginSuccess,
    handleLogout,
  } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username: string) => {
    const isLoginSuccessful = await handleLoginSuccess(username);

    if (!isLoginSuccessful) {
      return;
    }

    navigate('/issues');
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        authority={authority}
        onLogout={handleLogout}
      />

      <div className="container my-5" style={{ maxWidth: '800px' }}>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/issues" replace />
              ) : (
                <LoginPage onLoginSuccess={handleLogin} />
              )
            }
          />

          <Route
            path="/issues"
            element={
              isLoggedIn ? (
                <IssuesPage authority={authority} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/issues/new"
            element={
              isLoggedIn ? (
                <IssuesPage authority={authority} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/issues/:id"
            element={
              isLoggedIn ? (
                <IssuesPage authority={authority} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/users"
            element={
              isLoggedIn && authority === 'ADMIN' ? (
                <UsersPage isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to={isLoggedIn ? '/issues' : '/login'} replace />
              )
            }
          />

          <Route
            path="/users/new"
            element={
              isLoggedIn && authority === 'ADMIN' ? (
                <UsersPage isLoggedIn={isLoggedIn} />
              ) : (
                <Navigate to={isLoggedIn ? '/issues' : '/login'} replace />
              )
            }
          />

          <Route
            path="/"
            element={
              <Navigate to={isLoggedIn ? '/issues' : '/login'} replace />
            }
          />

          <Route
            path="*"
            element={
              <Navigate to={isLoggedIn ? '/issues' : '/login'} replace />
            }
          />
        </Routes>
      </div>
    </>
  );
}
