'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/actions/user';
import Input from '../common/Input';
import Button from '../common/Button/Button';
import { ButtonType } from '../common/Button/button.types';
import GoogleAuthButton from './GoogleAuthButton';

export enum AuthFormType {
  Register = 'register',
  Login = 'login'
}

interface AuthFormProps {
  authFormType?: AuthFormType;
}

export default function AuthForm({ authFormType = AuthFormType.Login }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(authFormType === AuthFormType.Login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    
    try {
      if (isLogin) {
        // Login logic
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else {
          setSuccess('Login successful!');
          router.push('/');
        }
      } else {
        // Register logic
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        
        await registerUser({ email, password, name });
        setSuccess('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Tabs */}
          <div className="flex bg-gradient-to-r from-blue-600 to-indigo-600">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 px-6 font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 px-6 font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error/Success Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {/* Name field (only for register) */}
              {!isLogin && (
                <Input
                  type="text"
                  label="Full Name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full"
                />
              )}

              {/* Email field */}
              <Input
                type="email"
                label="Email Address"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full"
              />

              {/* Password field */}
              <Input
                type="password"
                label="Password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                buttonType={ButtonType.Primary}
                className="w-full py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Auth */}
            <GoogleAuthButton />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}