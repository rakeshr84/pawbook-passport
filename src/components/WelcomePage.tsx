import { ChevronDown, FileText, Activity, Sparkles } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
  onGoToDashboard?: () => void;
  isAuthed?: boolean;
}

const WelcomePage = ({ onGetStarted, onSignIn, onGoToDashboard, isAuthed }: WelcomePageProps) => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 animate-fade-in">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center space-y-6">
          <div className="text-6xl animate-scale-in">🐾</div>
          <h1 className="text-5xl font-light text-gray-900">PawBuck</h1>
          <p className="text-gray-600 font-light text-lg max-w-xl mx-auto">
            Your pet's passport, health tracker, and care hub — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="bg-gray-900 text-white px-10 py-4 rounded-full shadow-[4px_4px_10px_rgba(0,0,0,0.15)] hover:shadow-[2px_2px_6px_rgba(0,0,0,0.2)] active:translate-y-[1px] transition-all duration-300 font-medium group"
            >
              🐾 I'm New to PawBuck
            </button>
            <button
              onClick={onSignIn}
              className="bg-white/60 text-gray-800 px-10 py-4 rounded-full border border-gray-200 hover:bg-white transition-all duration-300 font-light"
            >
              I Already Have an Account
            </button>
          </div>

          {isAuthed && onGoToDashboard && (
            <div className="pt-6">
              <button
                onClick={onGoToDashboard}
                className="text-blue-700 font-medium underline hover:text-blue-900 transition-colors"
              >
                Go to My Pets Dashboard →
              </button>
            </div>
          )}

          {/* Scroll indicator */}
          <button
            onClick={scrollToFeatures}
            className="pt-12 text-gray-400 hover:text-gray-600 transition-colors animate-bounce flex flex-col items-center gap-2 mx-auto"
          >
            <span className="text-sm font-light">Learn more</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Feature Teasers */}
      <div id="features" className="pb-20 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-3 text-blue-500">
              <FileText className="w-full h-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">Pet Passport</h3>
            <p className="text-gray-600 font-light text-sm">
              Vaccines, treatments, exams — organized for every pet.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-3 text-green-500">
              <Activity className="w-full h-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">Health Tracking</h3>
            <p className="text-gray-600 font-light text-sm">
              Track weight, food, water, activity, and medicines daily.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-3 text-purple-500">
              <Sparkles className="w-full h-full" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-1">Smart Avatars</h3>
            <p className="text-gray-600 font-light text-sm">
              Choose a photo or animated avatar for every pet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
