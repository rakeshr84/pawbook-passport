import { ChevronRight } from 'lucide-react';

interface WelcomePageProps {
  onGetStarted: () => void;
}

const WelcomePage = ({ onGetStarted }: WelcomePageProps) => {
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

        <button
          onClick={onGetStarted}
          className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium smooth-transition hover:gap-4 hover:shadow-lg"
        >
          Get Started
          <ChevronRight className="w-5 h-5 smooth-transition group-hover:translate-x-1" />
        </button>

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
