import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await register.mutateAsync(data);
      toast.success('Registration successful! Please sign in.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        isLoading={register.isPending}
      />
      <div className="text-sm text-center">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link
          to="/login"
          className="font-semibold text-primary hover:text-primary/80"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}