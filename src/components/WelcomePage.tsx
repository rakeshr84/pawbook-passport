import { ChevronRight } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

const WelcomePage = ({ onGetStarted, onSignIn }: WelcomePageProps) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-2xl w-full text-center space-y-12">
        <div className="space-y-6">
          <div className="text-6xl">🐾</div>
          <h1 className="text-5xl font-light tracking-tight text-foreground">
            PawBuck
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            Everything for your pet, all in one place
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-full font-medium smooth-transition hover:gap-4 hover:shadow-lg"
          >
            I'm New to PawBuck
            <ChevronRight className="w-5 h-5 smooth-transition group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onSignIn}
            className="inline-flex items-center justify-center gap-3 border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-light hover:bg-gray-50 transition-all duration-300"
          >
            I Already Have an Account
          </button>
        </div>

        <div className="pt-8">
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg max-w-md mx-auto">
            <div className="text-3xl mb-4">🏥</div>
            <h3 className="font-medium text-foreground mb-2">Health Records</h3>
            <p className="text-sm text-muted-foreground">
              All medical history in one place
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
