import { Check } from 'lucide-react';

interface SuccessPageProps {
  petName: string;
  petPhoto: string;
  onViewPassport: () => void;
  onAddAnother: () => void;
}

const SuccessPage = ({ petName, petPhoto, onViewPassport, onAddAnother }: SuccessPageProps) => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-10">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-light text-foreground">All set</h1>
          <p className="text-xl text-muted-foreground font-light">
            {petName}'s passport is ready
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src={petPhoto}
            alt={petName}
            className="w-32 h-32 rounded-full object-cover border-4 border-primary"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 max-w-lg mx-auto">
          <button 
            onClick={onViewPassport}
            className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-gray-800 smooth-transition"
          >
            View Passport
          </button>
          <button
            onClick={onAddAnother}
            className="flex-1 border border-gray-300 text-gray-700 px-8 py-4 rounded-full font-light hover:border-gray-400 hover:bg-white/50 smooth-transition"
          >
            Add Another Pet
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
