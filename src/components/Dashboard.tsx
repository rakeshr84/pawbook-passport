import { defaultAvatarFor, formatSpeciesBreed } from '@/lib/utils';
import { PetAvatar } from '@/components/PetAvatar';

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
}

const StatusDot = ({ status = 'ok' }: { status?: 'ok' | 'expiring' | 'due' }) => {
  const color = status === 'ok' ? 'bg-green-500' : status === 'expiring' ? 'bg-amber-500' : 'bg-red-500';
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />;
};

const Dashboard = ({ user, pets, onSelectPet, onAddPet, onLogout }: DashboardProps) => {
  const formatWeight = (w?: number, u?: WeightUnit) =>
    (w != null && !Number.isNaN(w)) ? `${w} ${u || 'kg'}` : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-light text-gray-900">Welcome back{user?.full_name ? `, ${user.full_name}` : ''} 👋</h1>
            <p className="text-gray-600 font-light mt-1">Your pets at a glance</p>
          </div>
          <button
            onClick={onLogout}
            className="px-5 py-3 bg-white/60 backdrop-blur-md rounded-full shadow-lg text-gray-800 hover:bg-white transition-all duration-300 font-light border border-gray-200"
          >
            Logout
          </button>
        </div>

        {/* Empty state */}
        {pets.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-lg text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 mx-auto mb-6 flex items-center justify-center text-4xl">🐾</div>
            <h2 className="text-3xl font-light text-gray-900 mb-3">Add your first pet</h2>
            <p className="text-gray-600 font-light max-w-xl mx-auto mb-8">It takes less than 60 seconds to create your first passport 🐾</p>
            <button
              onClick={onAddPet}
              className="bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
            >
              + Add Pet
            </button>
          </div>
        ) : (
          <>
            {/* Grid of pets */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add new pet card */}
              <button
                onClick={onAddPet}
                className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 flex flex-col items-center justify-center"
              >
                <div className="text-5xl mb-3">➕</div>
                <div className="text-xl font-medium text-gray-900">Add New Pet</div>
                <div className="text-gray-600 font-light mt-1">Create another passport</div>
              </button>

              {pets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPet(p.id)}
                  className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
                >
                  <div className="flex items-center gap-4">
                    <PetAvatar pet={p} size={80} rounded="2xl" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-light text-gray-900 truncate">{p.name}</h3>
                        <StatusDot status={p.status} />
                      </div>
                      <p className="text-gray-600 font-light truncate">
                        {formatSpeciesBreed(p.species, p.breed)} {p.ageLabel ? `• ${p.ageLabel}` : ''} {formatWeight(p.weight, p.weightUnit) && `• ${formatWeight(p.weight, p.weightUnit)}`}
                      </p>
                      {p.microchipNumber && (
                        <p className="text-gray-500 font-light mt-1 text-sm truncate">Chip: {p.microchipNumber}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-light">View Passport</span>
                    <span className="text-blue-600 font-medium">Open →</span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
