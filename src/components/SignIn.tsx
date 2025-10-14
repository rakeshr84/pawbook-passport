import { useState } from 'react';

export interface SignInProps {
  onBack?: () => void;
  onSignIn: (params: { email?: string; password?: string; provider?: 'google' | 'apple' }) => void;
}

const SignIn = ({ onBack, onSignIn }: SignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = email.trim().length > 3 && password.trim().length >= 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-lg space-y-8">
        <div className="flex items-center gap-4">
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Back"
            >
              ←
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-light text-gray-900">Welcome back</h1>
            <p className="text-gray-600 font-light mt-1">Sign in to see your pets and records</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-6 py-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-all duration-300 font-light"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-2">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 border border-gray-200 rounded-xl bg-white focus:outline-none focus:border-gray-400 transition-all duration-300 font-light"
            />
          </label>

          <div className="flex items-center justify-between">
            <button
              className="text-sm text-gray-600 hover:text-gray-900 font-light"
              onClick={() => alert('Password reset flow is not implemented in the MVP.')}
              type="button"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={() => onSignIn({ email, password })}
            disabled={!canSubmit}
            className="w-full bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300"
          >
            Sign In
          </button>

          <div className="flex items-center gap-4">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-sm text-gray-500 font-light">or</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => onSignIn({ provider: 'google' })}
              className="w-full border border-gray-300 text-gray-800 rounded-xl px-6 py-4 font-light hover:bg-gray-50 transition-all duration-300"
            >
              Continue with Google
            </button>
            <button
              onClick={() => onSignIn({ provider: 'apple' })}
              className="w-full border border-gray-300 text-gray-800 rounded-xl px-6 py-4 font-light hover:bg-gray-50 transition-all duration-300"
            >
              Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
