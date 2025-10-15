import { useState, useEffect } from 'react';
import { Mail, Lock, Sparkles, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SignInPageProps {
  onSignIn: (email: string, password: string) => void;
  onSignUp: (email: string, password: string, name: string) => void;
  onBack: () => void;
  isAuthed?: boolean;
}

const SignInPage = ({ onSignIn, onSignUp, onBack, isAuthed }: SignInPageProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Show welcome message only on first load
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') {
      onSignIn(email, password);
    } else {
      onSignUp(email, password, name);
    }
  };

  // Welcome overlay
  if (showWelcome) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center mx-auto shadow-lg animate-glow-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <p className="text-2xl font-light text-foreground italic">
            'When design feels inevitable, it feels like love.'
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-8 px-4 animate-fade-in">
      <div className="max-w-md mx-auto">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-light ios-transition mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Main Card */}
        <div className="glass-effect rounded-3xl p-8 shadow-xl">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-4xl">🐾</span>
            </div>
            <h1 className="text-3xl font-light text-foreground mb-2">
              {mode === 'signin' ? 'Welcome back' : 'Join PawBuck'}
            </h1>
            <p className="text-muted-foreground font-light">
              {mode === 'signin' 
                ? 'Sign in to access your pets' 
                : 'Create an account to get started'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-light text-muted-foreground mb-2">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="glass-effect border-border"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="glass-effect border-border pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-muted-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="glass-effect border-border pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full mt-6"
            >
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </Button>

          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-muted-foreground font-light hover:text-foreground ios-transition text-sm"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : 'Already have an account? Sign in'}
            </button>
          </div>

          {/* Forgot Password (only in signin mode) */}
          {mode === 'signin' && (
            <div className="mt-4 text-center">
              <button className="text-accent font-light text-sm hover:underline">
                Forgot password?
              </button>
            </div>
          )}

        </div>

        {/* Bottom Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground font-light">
            By continuing, you agree to PawBuck's Terms of Service and Privacy Policy
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignInPage;