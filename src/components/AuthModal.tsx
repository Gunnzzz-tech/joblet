import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../lib/auth-context';
import { api } from '../lib/api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['JOB_SEEKER', 'EMPLOYER']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login, register, loginWithGoogle } = useAuth();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'JOB_SEEKER',
    },
  });

  const handleGoogleAuth = async () => {
    setError(null);
    setLoading(true);
    const result = await loginWithGoogle();
    setLoading(false);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error || 'Google sign-in failed');
    }
  };

  const onLoginSubmit = async (data: LoginForm) => {
    setError(null);
    setLoading(true);
    const result = await login(data.email, data.password);
    setLoading(false);
    
    if (result.success) {
      onClose();
      loginForm.reset();
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const onRegisterSubmit = async (data: RegisterForm) => {
    setError(null);
    setLoading(true);
    const displayName = `${data.firstName} ${data.lastName}`;
    const role = data.role === 'JOB_SEEKER' ? 'jobseeker' : 'employer';
    const result = await register(
      data.email,
      data.password,
      displayName,
      role
    );
    setLoading(false);
    
    if (result.success) {
      onClose();
      registerForm.reset();
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-2">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-gray-600 mb-6">
            {mode === 'login'
              ? 'Sign in to continue to Taskify'
              : 'Join Taskify to find your dream job or hire talent'}
          </p>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                mode === 'register'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleAuth}
            className="w-full mb-4 py-3 px-4 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with email</span>
            </div>
          </div>

          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...loginForm.register('email')}
                  className="input"
                  placeholder="Enter your email"
                />
                {loginForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...loginForm.register('password')}
                  className="input"
                  placeholder="Enter your password"
                />
                {loginForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <a href="#" className="text-sm text-accent hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">First Name</label>
                  <input
                    type="text"
                    {...registerForm.register('firstName')}
                    className="input"
                    placeholder="John"
                  />
                  {registerForm.formState.errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">
                      {registerForm.formState.errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label">Last Name</label>
                  <input
                    type="text"
                    {...registerForm.register('lastName')}
                    className="input"
                    placeholder="Doe"
                  />
                  {registerForm.formState.errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">
                      {registerForm.formState.errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="label">I am a</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="JOB_SEEKER"
                      {...registerForm.register('role')}
                      className="mr-2"
                    />
                    <span className="text-sm">Job Seeker</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="EMPLOYER"
                      {...registerForm.register('role')}
                      className="mr-2"
                    />
                    <span className="text-sm">Employer</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  {...registerForm.register('email')}
                  className="input"
                  placeholder="Enter your email"
                />
                {registerForm.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  type="password"
                  {...registerForm.register('password')}
                  className="input"
                  placeholder="Enter your password"
                />
                {registerForm.formState.errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  {...registerForm.register('confirmPassword')}
                  className="input"
                  placeholder="Confirm your password"
                />
                {registerForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {registerForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

