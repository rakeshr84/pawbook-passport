import { ChevronLeft, Plus } from 'lucide-react';
import { TreatmentRecord } from '@/types/medical';

interface TreatmentListViewProps {
  petData: {
    name: string;
    breed: string;
    photo?: string;
  };
  treatments: TreatmentRecord[];
  onBack: () => void;
  onAddNew: () => void;
  onViewDetails: (id: string) => void;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function getTreatmentIcon(type: string): string {
  const icons: Record<string, string> = {
    'anti-parasitic': '🦟',
    'deworming': '🐛',
    'echinococcus': '✈️',
    'medication': '💊',
    'other': '📝',
  };
  return icons[type] || '💊';
}

function getTreatmentTypeDisplay(type: string): string {
  const displays: Record<string, string> = {
    'anti-parasitic': 'Anti-Parasitic',
    'deworming': 'Deworming',
    'echinococcus': 'Echinococcus',
    'medication': 'Medication',
    'other': 'Treatment',
  };
  return displays[type] || 'Treatment';
}

export default function TreatmentListView({
  petData,
  treatments,
  onBack,
  onAddNew,
  onViewDetails,
}: TreatmentListViewProps) {
  const now = new Date();

  // Separate due soon treatments
  const dueSoonTreatments = treatments.filter((t) => {
    if (!t.next_due_date) return false;
    const daysUntil = Math.floor(
      (new Date(t.next_due_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntil > 0 && daysUntil <= 30;
  });

  const activeTreatments = treatments.filter((t) => !dueSoonTreatments.includes(t));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-light text-gray-900">Treatment Records</h1>
              <p className="text-gray-500 font-light mt-1">
                {petData.name} • {petData.breed}
              </p>
            </div>
          </div>
          <button
            onClick={onAddNew}
            className="bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        {/* Due Soon Section */}
        {dueSoonTreatments.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              <h2 className="text-2xl font-light text-gray-900">Due Soon</h2>
            </div>

            <div className="space-y-4">
              {dueSoonTreatments.map((treatment) => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  status="due_soon"
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* Active Treatments Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl font-light text-gray-900">Active Treatments</h2>
          </div>

          {activeTreatments.length > 0 ? (
            <div className="space-y-4">
              {activeTreatments.map((treatment) => (
                <TreatmentCard
                  key={treatment.id}
                  treatment={treatment}
                  status="active"
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-md rounded-2xl p-12 shadow-lg text-center">
              <p className="text-gray-600 font-light">No treatment records yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TreatmentCard({
  treatment,
  status,
  onViewDetails,
}: {
  treatment: TreatmentRecord;
  status: 'due_soon' | 'active';
  onViewDetails: (id: string) => void;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{getTreatmentIcon(treatment.treatment_type)}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-medium text-gray-900 mb-1">
                {treatment.product_name}
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-gray-600 font-light">
            <p className="text-sm capitalize">
              {getTreatmentTypeDisplay(treatment.treatment_type)}
            </p>
            <p>Administered: {formatDate(treatment.date_administered)}</p>
            {treatment.next_due_date && (
              <p className={status === 'due_soon' ? 'text-amber-600 font-medium' : ''}>
                {status === 'due_soon' ? '⚠️ ' : ''}
                Next due: {formatDate(treatment.next_due_date)}
              </p>
            )}
            {treatment.vet_name && <p>Vet: {treatment.vet_name}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onViewDetails(treatment.id)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-light hover:bg-gray-50 transition-all duration-300"
        >
          View Details
        </button>
        {treatment.certificate_url && (
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-light hover:bg-gray-50 transition-all duration-300">
            📄 Receipt
          </button>
        )}
      </div>
    </div>
  );
}