import { ChevronLeft } from 'lucide-react';
import { PetFormData } from '@/types/pet';

interface TreatmentSelectionProps {
  petData: PetFormData;
  onBack: () => void;
  onNext: (treatmentType: string, customName?: string) => void;
}

export default function TreatmentSelection({ petData, onBack, onNext }: TreatmentSelectionProps) {
  const treatments = [
    {
      id: 'anti-parasitic',
      emoji: '🦟',
      title: 'Anti-Parasitic (Flea/Tick)',
      description: 'Flea and tick prevention treatments',
      examples: 'Common: Simparica, Bravecto, Frontline, NexGard',
    },
    {
      id: 'deworming',
      emoji: '🐛',
      title: 'Deworming',
      description: 'Intestinal parasite treatment',
      examples: 'Common: Drontal, Panacur, Milbemax',
    },
    {
      id: 'echinococcus',
      emoji: '✈️',
      title: 'Echinococcus Treatment',
      description: 'Required for international travel (UK, Ireland, Finland, Norway, Malta)',
      examples: 'Must be administered 24-120 hours before travel',
    },
    {
      id: 'medication',
      emoji: '💊',
      title: 'Medication',
      description: 'Prescription or over-the-counter medications',
      examples: 'Antibiotics, pain relief, supplements, etc.',
    },
    {
      id: 'other',
      emoji: '📝',
      title: 'Other Treatment',
      description: 'Custom treatment not listed above',
      examples: '',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-6">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-light text-gray-900">Add Treatment</h1>
            <p className="text-gray-500 font-light mt-1">
              Select the type of treatment you're recording for {petData.name}
            </p>
          </div>
        </div>

        {/* Treatment Options */}
        <div className="space-y-4">
          {treatments.map((treatment) => (
            <button
              key={treatment.id}
              onClick={() => onNext(treatment.id)}
              className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {treatment.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 font-light mb-2">
                    {treatment.description}
                  </p>
                  {treatment.examples && (
                    <p className="text-sm text-gray-500 font-light">
                      {treatment.examples}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8">
          <button
            onClick={onBack}
            className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}