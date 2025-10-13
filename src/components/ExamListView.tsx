import { ChevronLeft, Plus } from 'lucide-react';
import { ClinicalExam } from '@/types/medical';

interface ExamListViewProps {
  petData: {
    name: string;
    breed: string;
    photo?: string;
  };
  examinations: ClinicalExam[];
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

function getExamIcon(type: string): string {
  const icons: Record<string, string> = {
    'annual': '🏥',
    'pre-travel': '✈️',
    'illness': '🩺',
    'follow-up': '🔄',
    'other': '📋',
  };
  return icons[type] || '🏥';
}

function getExamTypeDisplay(type: string): string {
  const displays: Record<string, string> = {
    'annual': 'Annual Checkup',
    'pre-travel': 'Pre-Travel Certificate',
    'illness': 'Illness Visit',
    'follow-up': 'Follow-up Exam',
    'other': 'Health Examination',
  };
  return displays[type] || 'Health Examination';
}

export default function ExamListView({
  petData,
  examinations,
  onBack,
  onAddNew,
  onViewDetails,
}: ExamListViewProps) {
  // Sort by date, most recent first
  const sortedExams = [...examinations].sort(
    (a, b) => new Date(b.exam_date).getTime() - new Date(a.exam_date).getTime()
  );

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
              <h1 className="text-4xl font-light text-gray-900">Health Examinations</h1>
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

        {/* Examinations List */}
        {sortedExams.length > 0 ? (
          <div className="space-y-4">
            {sortedExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} onViewDetails={onViewDetails} />
            ))}
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-md rounded-2xl p-12 shadow-lg text-center">
            <p className="text-gray-600 font-light">No examination records yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ExamCard({
  exam,
  onViewDetails,
}: {
  exam: ClinicalExam;
  onViewDetails: (id: string) => void;
}) {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-4xl">{getExamIcon(exam.exam_type)}</div>
            <div className="flex-1">
              <h3 className="text-2xl font-medium text-gray-900 mb-1">
                {getExamTypeDisplay(exam.exam_type)}
              </h3>
            </div>
          </div>

          <div className="space-y-2 text-gray-600 font-light">
            <p>{formatDate(exam.exam_date)}</p>
            {exam.reason && <p>{exam.reason}</p>}

            {/* Health Declaration badges for travel certs */}
            {exam.exam_type === 'pre-travel' && (
              <div className="flex gap-2 flex-wrap mt-3">
                {exam.no_signs_of_disease && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-light">
                    ✓ No disease signs
                  </span>
                )}
                {exam.fit_to_transport && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-light">
                    ✓ Fit to transport
                  </span>
                )}
                {exam.fit_for_journey && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-light">
                    ✓ Fit for journey
                  </span>
                )}
              </div>
            )}

            {/* Vital Signs */}
            {(exam.weight || exam.temperature) && (
              <div className="flex gap-4 mt-3 text-sm">
                {exam.weight && (
                  <p>
                    Weight: {exam.weight} {exam.weight_unit}
                  </p>
                )}
                {exam.temperature && (
                  <p>
                    Temp: {exam.temperature}°{exam.temperature_unit}
                  </p>
                )}
              </div>
            )}

            {exam.vet_name && <p className="mt-3">Vet: {exam.vet_name}</p>}
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => onViewDetails(exam.id)}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-light hover:bg-gray-50 transition-all duration-300"
        >
          View Details
        </button>
        {exam.certificate_url && (
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-light hover:bg-gray-50 transition-all duration-300">
            📄 Certificate
          </button>
        )}
      </div>
    </div>
  );
}