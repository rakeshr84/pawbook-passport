import { defaultAvatarFor, formatSpeciesBreed } from '@/lib/utils';
import { PetAvatar } from '@/components/PetAvatar';
import { Plus, LogOut, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BottomTabNav from '@/components/BottomTabNav';

export type WeightUnit = 'kg' | 'lbs';

export interface PetCardData {
  id: string;
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string;
  ageLabel?: string;
  photoUrl?: string;
  avatarUrl?: string;
  coatColorId?: string;
  avatarTint?: string;
  weight?: number;
  weightUnit?: WeightUnit;
  microchipNumber?: string;
  status?: 'ok' | 'expiring' | 'due';
}

export interface DashboardProps {
  user: { full_name?: string; email?: string } | null;
  pets: PetCardData[];
  onSelectPet: (id: string) => void;
  onAddPet: () => void;
  onLogout: () => void;
  onDeletePet?: (id: string) => void;
}

const StatusDot = ({ status = 'ok' }: { status?: 'ok' | 'expiring' | 'due' }) => {
  const colorClass = 
    status === 'ok' ? 'bg-green-500 shadow-green-500/50' : 
    status === 'expiring' ? 'bg-amber-500 shadow-amber-500/50' : 
    'bg-red-500 shadow-red-500/50';
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${colorClass} shadow-lg`} />;
};

const Dashboard = ({ user, pets, onSelectPet, onAddPet, onLogout, onDeletePet }: DashboardProps) => {
  const formatWeight = (w?: number, u?: WeightUnit) =>
    (w != null && !Number.isNaN(w)) ? `${w} ${u || 'kg'}` : '';

  return (
    <>
      <div className="min-h-screen gradient-bg pb-24">
        <div className="max-w-6xl mx-auto px-4 py-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-light text-foreground flex items-center gap-3">
                Welcome back
                {user?.full_name && (
                  <span className="text-accent">{user.full_name}</span>
                )}
                <span className="text-2xl">👋</span>
              </h1>
              <p className="text-muted-foreground font-light mt-1">Your pets at a glance</p>
            </div>
            <Button
              onClick={onLogout}
              variant="glass"
              size="sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Empty state */}
          {pets.length === 0 ? (
            <div className="glass-effect rounded-3xl p-12 shadow-lg text-center animate-fade-in">
              <div className="w-24 h-24 rounded-full gradient-accent mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg animate-glow-pulse">
                🐾
              </div>
              <h2 className="text-3xl font-light text-foreground mb-3">Add your first pet</h2>
              <p className="text-muted-foreground font-light max-w-xl mx-auto mb-8">
                It takes less than 60 seconds to create your first passport 🐾
              </p>
              <Button
                onClick={onAddPet}
                variant="gradient"
                size="lg"
              >
                <Plus className="w-5 h-5" />
                Add Pet
              </Button>
            </div>
          ) : (
            <>
              {/* Grid of pets */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
                
                {/* Add new pet card */}
                <button
                  onClick={onAddPet}
                  className="glass-effect rounded-3xl p-8 shadow hover:shadow-lg ios-transition flex flex-col items-center justify-center min-h-[280px] group"
                >
                  <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center mb-4 shadow-lg group-hover:animate-glow-pulse">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">Add Pet</h3>
                  <p className="text-sm text-muted-foreground font-light mt-1">Create new profile</p>
                </button>

                {/* Pet cards */}
                {pets.map((pet) => {
                  const imgSrc = pet.avatarUrl || defaultAvatarFor(pet.species);

                  return (
                    <button
                      key={pet.id}
                      onClick={() => onSelectPet(pet.id)}
                      className="glass-effect rounded-3xl p-6 shadow hover:shadow-lg ios-transition text-left group relative overflow-hidden"
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 gradient-accent opacity-0 group-hover:opacity-5 ios-transition pointer-events-none" />
                      
                      {/* Status indicator */}
                      <div className="absolute top-4 right-4">
                        <StatusDot status={pet.status} />
                      </div>

                      {/* Pet Avatar */}
                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <PetAvatar pet={pet} size={96} />
                          {pet.status === 'due' && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                              !
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pet Info */}
                      <div className="text-center">
                        <h3 className="text-xl font-medium text-foreground mb-1 group-hover:text-accent ios-transition">
                          {pet.name}
                        </h3>
                        <p className="text-sm text-muted-foreground font-light mb-2">
                          {formatSpeciesBreed(pet.species, pet.breed)}
                        </p>
                        
                        {pet.ageLabel && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-effect text-xs text-muted-foreground">
                            <span>{pet.ageLabel}</span>
                            {formatWeight(pet.weight, pet.weightUnit) && (
                              <>
                                <span>•</span>
                                <span>{formatWeight(pet.weight, pet.weightUnit)}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Delete button (if provided) */}
                      {onDeletePet && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeletePet(pet.id);
                          }}
                          className="absolute bottom-4 right-4 text-xs text-destructive hover:underline opacity-0 group-hover:opacity-100 ios-transition"
                        >
                          Delete
                        </button>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tips Card */}
              <div className="mt-8 glass-effect rounded-3xl p-6 shadow-lg">
                <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
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

        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <BottomTabNav 
        activeTab="home" 
        onTabChange={(tab) => {
          console.log('Tab changed:', tab);
          // Handle tab navigation here
        }}
      />
    </>
  );
};

export default Dashboard;