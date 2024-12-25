import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      await login.mutateAsync(data);
      navigate('/');
    } catch (error) {
      toast.error('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="space-y-6">
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        isLoading={login.isPending}
      />
      <div className="text-sm text-center">
        <span className="text-muted-foreground">Don't have an account? </span>
        <Link
          to="/register"
          className="font-semibold text-primary hover:text-primary/80"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}