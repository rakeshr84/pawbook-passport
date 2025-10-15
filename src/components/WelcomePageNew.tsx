import { useState, useEffect } from 'react';
import { ChevronDown, FileText, Activity, Sparkles, Heart, Shield, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomePageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onGoToDashboard?: () => void;
  isAuthed?: boolean;
}

const WelcomePageNew = ({ onGetStarted, onSignIn, onGoToDashboard, isAuthed }: WelcomePageProps) => {
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    // Show quote for 3 seconds on first load
    const hasSeenQuote = sessionStorage.getItem('hasSeenQuote');
    if (!hasSeenQuote) {
      const timer = setTimeout(() => {
        setShowQuote(false);
        sessionStorage.setItem('hasSeenQuote', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowQuote(false);
    }
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Welcome quote overlay
  if (showQuote) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-6 px-6">
          <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center mx-auto shadow-lg animate-glow-pulse">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <p className="text-2xl md:text-3xl font-light text-foreground italic max-w-2xl">
            'When design feels inevitable, it feels like love.'
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg animate-fade-in">
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
        
        {/* Floating paw icon with glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center shadow-lg animate-glow-pulse">
            <span className="text-4xl">🐾</span>
          </div>
        </div>

        <div className="max-w-2xl w-full text-center space-y-6 mt-20">
          
          {/* Logo */}
          <h1 className="text-6xl font-light text-foreground animate-zoom-in">
            pa<span className="relative inline-block">
              w<span className="absolute -top-1 -right-1 w-3 h-3 gradient-accent rounded-full"></span>
            </span>buck
          </h1>
          
          {/* Tagline */}
          <p className="text-muted-foreground font-light text-xl max-w-xl mx-auto">
            Your pet's passport, health tracker, and care hub — all in one place 🐾
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button
              onClick={onGetStarted}
              variant="gradient"
              size="lg"
              className="shadow-xl shadow-accent/25"
            >
              <Sparkles className="w-5 h-5" />
              Get Started
            </Button>
            
            <Button
              onClick={onSignIn}
              variant="glass"
              size="lg"
            >
              Sign In
            </Button>
          </div>

          {isAuthed && onGoToDashboard && (
            <div className="pt-4">
              <button
                onClick={onGoToDashboard}
                className="text-accent font-medium underline hover:text-accent/80 ios-transition"
              >
                Go to Dashboard →
              </button>
            </div>
          )}

          {/* Scroll indicator */}
          <button
            onClick={scrollToFeatures}
            className="mt-12 inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground ios-transition group"
          >
            <span className="text-sm font-light">See what's inside</span>
            <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-3">
              Everything your pet needs
            </h2>
            <p className="text-muted-foreground font-light text-lg">
              Beautifully simple, powerfully organized
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Health Tracking */}
            <div className="glass-effect rounded-3xl p-8 shadow-lg hover:shadow-xl ios-transition group">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:animate-glow-pulse">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-3">Health Tracking</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Track vaccinations, medications, and vet visits. Never miss an important date with smart reminders.
              </p>
            </div>

            {/* Medical Records */}
            <div className="glass-effect rounded-3xl p-8 shadow-lg hover:shadow-xl ios-transition group">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:animate-glow-pulse">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-3">Medical Records</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Upload and organize all your pet's documents. Access them instantly when you need them most.
              </p>
            </div>

            {/* Activity Monitoring */}
            <div className="glass-effect rounded-3xl p-8 shadow-lg hover:shadow-xl ios-transition group">
              <div className="w-16 h-16 gradient-accent rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:animate-glow-pulse">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-3">Activity Monitoring</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Log daily activities, food intake, and wellness metrics. See trends and patterns over time.
              </p>
            </div>

          </div>

          {/* Additional Features */}
          <div className="mt-12 glass-effect rounded-3xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              
              <div className="space-y-2">
                <Shield className="w-10 h-10 text-accent mx-auto" />
                <h4 className="text-lg font-medium text-foreground">Secure & Private</h4>
                <p className="text-sm text-muted-foreground font-light">
                  Your pet's data is encrypted and private
                </p>
              </div>

              <div className="space-y-2">
                <Bell className="w-10 h-10 text-accent mx-auto" />
                <h4 className="text-lg font-medium text-foreground">Smart Reminders</h4>
                <p className="text-sm text-muted-foreground font-light">
                  Never miss vaccinations or appointments
                </p>
              </div>

              <div className="space-y-2">
                <Sparkles className="w-10 h-10 text-accent mx-auto" />
                <h4 className="text-lg font-medium text-foreground">Beautiful Design</h4>
                <p className="text-sm text-muted-foreground font-light">
                  Clean, intuitive, and delightful to use
                </p>
              </div>

            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button
              onClick={onGetStarted}
              variant="gradient"
              size="lg"
              className="shadow-xl shadow-accent/25"
            >
              <Sparkles className="w-5 h-5" />
              Start Your Journey
            </Button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="py-8 text-center text-muted-foreground text-sm font-light">
        <p>Made with ❤️ for pet parents everywhere</p>
      </div>

    </div>
  );
};

export default WelcomePageNew;