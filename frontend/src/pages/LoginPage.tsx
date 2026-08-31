import { LoginForm } from '../components/LoginForm';

type LoginPageProps = {
  onLoginSuccess: (username: string) => void;
};

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  return (
    <div className="container my-5" style={{ maxWidth: '400px' }}>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};
