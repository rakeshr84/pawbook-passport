import { PetAvatar } from '@/components/PetAvatar';
import { Plus, Heart, FileText, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PetCardData } from '@/components/Dashboard';
import { formatSpeciesBreed } from '@/lib/utils';

interface HomeScreenProps {
  pets: PetCardData[];
  onAddPet: () => void;
  onQuickAction: (petId: string, tab: 'health' | 'records' | 'profile') => void;
}

const StatusDot = ({ status = 'ok' }: { status?: 'ok' | 'expiring' | 'due' }) => {
  const colorClass = 
    status === 'ok' ? 'bg-green-500 shadow-green-500/50' : 
    status === 'expiring' ? 'bg-amber-500 shadow-amber-500/50' : 
    'bg-red-500 shadow-red-500/50';
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colorClass} shadow-lg`} />;
};

const HomeScreen = ({ pets, onAddPet, onQuickAction }: HomeScreenProps) => {
  return (
    <div className="min-h-screen gradient-bg pb-24 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-light text-foreground mb-2">
            🐾 Your Pets
          </h1>
          <p className="text-muted-foreground font-light">
            {pets.length === 0 
              ? "Let's welcome your first friend" 
              : `${pets.length} ${pets.length === 1 ? 'pet' : 'pets'} under your care`}
          </p>
        </div>

        {/* Empty state */}
        {pets.length === 0 ? (
          <div className="glass-effect rounded-3xl p-12 shadow-lg text-center animate-fade-in">
            <div className="w-24 h-24 rounded-full gradient-accent mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg animate-glow-pulse">
              🐾
            </div>
            <h2 className="text-2xl font-light text-foreground mb-3">
              Let's welcome your first friend 🐾
            </h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto mb-8">
              Create a profile in less than 60 seconds
            </p>
            <Button
              onClick={onAddPet}
              variant="gradient"
              size="lg"
              className="button-glow-tap"
            >
              <Plus className="w-5 h-5" />
              Add Pet
            </Button>
          </div>
        ) : (
          <>
            {/* Pet Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {pets.map((pet) => (
                <div
                  key={pet.id}
                  className="glass-effect rounded-3xl p-6 shadow-lg hover:shadow-xl ios-transition"
                >
                  {/* Status indicator */}
                  <div className="flex justify-between items-start mb-4">
                    <StatusDot status={pet.status} />
                    <div className="text-xs text-muted-foreground font-light">
                      {pet.ageLabel || ''}
                    </div>
                  </div>

                  {/* Pet Avatar */}
                  <div className="flex justify-center mb-4">
                    <PetAvatar pet={pet} size={96} />
                  </div>

                  {/* Pet Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-medium text-foreground mb-1">
                      {pet.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                      {formatSpeciesBreed(pet.species, pet.breed)}
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => onQuickAction(pet.id, 'health')}
                      className="flex flex-col items-center gap-1 p-3 rounded-2xl glass-effect hover:bg-accent/10 ios-transition button-glow-tap"
                    >
                      <Heart className="w-5 h-5 text-accent" strokeWidth={2} />
                      <span className="text-xs font-light text-foreground">Health</span>
                    </button>

                    <button
                      onClick={() => onQuickAction(pet.id, 'records')}
                      className="flex flex-col items-center gap-1 p-3 rounded-2xl glass-effect hover:bg-accent/10 ios-transition button-glow-tap"
                    >
                      <FileText className="w-5 h-5 text-accent" strokeWidth={2} />
                      <span className="text-xs font-light text-foreground">Records</span>
                    </button>

                    <button
                      onClick={() => onQuickAction(pet.id, 'profile')}
                      className="flex flex-col items-center gap-1 p-3 rounded-2xl glass-effect hover:bg-accent/10 ios-transition button-glow-tap"
                    >
                      <User className="w-5 h-5 text-accent" strokeWidth={2} />
                      <span className="text-xs font-light text-foreground">Profile</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tips Card */}
            <div className="mt-8 glass-effect rounded-3xl p-6 shadow-lg animate-fade-in">
              <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Quick Tips
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="font-medium text-foreground">📅 Stay on track</div>
                  <div className="text-muted-foreground font-light">
                    Add vaccination dates to get reminders
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">📄 Upload docs</div>
                  <div className="text-muted-foreground font-light">
                    Keep all medical records in one place
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="font-medium text-foreground">❤️ Track health</div>
                  <div className="text-muted-foreground font-light">
                    Monitor weight, food, and activities
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Floating Add Pet Button (only when pets exist) */}
        {pets.length > 0 && (
          <button
            onClick={onAddPet}
            className="fixed bottom-24 right-6 w-14 h-14 rounded-full gradient-accent shadow-lg hover:shadow-xl flex items-center justify-center ios-transition button-glow-tap animate-fade-in z-40"
            aria-label="Add Pet"
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
