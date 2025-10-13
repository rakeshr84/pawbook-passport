import { ChevronLeft } from 'lucide-react';
import { PetFormData } from '@/types/pet';

interface ExamSelectionProps {
  petData: PetFormData;
  onBack: () => void;
  onNext: (examType: string) => void;
}

export default function ExamSelection({ petData, onBack, onNext }: ExamSelectionProps) {
  const exams = [
    {
      id: 'annual',
      emoji: '🏥',
      title: 'Annual Checkup',
      description: 'Routine wellness examination',
      examples: 'Physical exam, weight check, general health assessment',
    },
    {
      id: 'pre-travel',
      emoji: '✈️',
      title: 'Pre-Travel Certificate',
      description: 'Health certificate for international travel',
      examples: 'Required within 10 days of travel for most countries',
    },
    {
      id: 'illness',
      emoji: '🩺',
      title: 'Illness Visit',
      description: 'Examination for specific health concern',
      examples: 'Injury, illness, behavior issue, or symptom evaluation',
    },
    {
      id: 'follow-up',
      emoji: '🔄',
      title: 'Follow-up Examination',
      description: 'Re-check after previous treatment or diagnosis',
      examples: '',
    },
    {
      id: 'other',
      emoji: '📋',
      title: 'Other Examination',
      description: 'Custom examination type',
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
            <h1 className="text-4xl font-light text-gray-900">Add Health Examination</h1>
            <p className="text-gray-500 font-light mt-1">
              Select the type of examination for {petData.name}
            </p>
          </div>
        </div>

        {/* Exam Options */}
        <div className="space-y-4">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => onNext(exam.id)}
              className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {exam.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">
                    {exam.title}
                  </h3>
                  <p className="text-gray-600 font-light mb-2">
                    {exam.description}
                  </p>
                  {exam.examples && (
                    <p className="text-sm text-gray-500 font-light">
                      {exam.examples}
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