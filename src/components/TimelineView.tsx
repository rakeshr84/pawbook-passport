import { useState } from 'react';
import { ChevronLeft, FileText, Mail } from 'lucide-react';
import { VaccinationRecord, TreatmentRecord, ClinicalExam } from '@/types/medical';

interface TimelineViewProps {
  petData: { name: string; breed: string };
  vaccinations: VaccinationRecord[];
  treatments: TreatmentRecord[];
  examinations: ClinicalExam[];
  onBack: () => void;
}

type FilterType = 'all' | 'vaccines' | 'treatments' | 'exams';

interface TimelineItem {
  id: string;
  type: 'vaccine' | 'treatment' | 'exam';
  emoji: string;
  date: Date;
  title: string;
  subtitle?: string;
  nextDue?: string;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

export default function TimelineView({ petData, vaccinations, treatments, examinations, onBack }: TimelineViewProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const allRecords: TimelineItem[] = [
    ...vaccinations.map(v => ({ id: v.id, type: 'vaccine' as const, emoji: '💉', date: v.vaccination_date, title: v.vaccine_name, subtitle: v.vet_name, nextDue: `Valid until: ${formatDate(v.valid_until)}` })),
    ...treatments.map(t => ({ id: t.id, type: 'treatment' as const, emoji: '💊', date: t.date_administered, title: t.product_name, subtitle: t.treatment_type, nextDue: t.next_due_date ? `Next due: ${formatDate(t.next_due_date)}` : undefined })),
    ...examinations.map(e => ({ id: e.id, type: 'exam' as const, emoji: '🏥', date: e.exam_date, title: e.exam_type, subtitle: e.vet_name, nextDue: e.reason })),
  ];

  const filteredItems = allRecords.filter(item => {
    if (filter === 'all') return true;
    return filter === 'vaccines' ? item.type === 'vaccine' : filter === 'treatments' ? item.type === 'treatment' : item.type === 'exam';
  });

  // Group by year
  const itemsByYear = filteredItems.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {} as Record<number, TimelineItem[]>);

  // Sort years descending
  const years = Object.keys(itemsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-light text-gray-900">Complete Health Timeline</h1>
            <p className="text-gray-500 font-light mt-1">{petData.name} • {petData.breed}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-2 mb-8 shadow-lg inline-flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-light transition-all duration-200 ${
              filter === 'all'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('vaccines')}
            className={`px-6 py-3 rounded-xl font-light transition-all duration-200 ${
              filter === 'vaccines'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Vaccines
          </button>
          <button
            onClick={() => setFilter('treatments')}
            className={`px-6 py-3 rounded-xl font-light transition-all duration-200 ${
              filter === 'treatments'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Treatments
          </button>
          <button
            onClick={() => setFilter('exams')}
            className={`px-6 py-3 rounded-xl font-light transition-all duration-200 ${
              filter === 'exams'
                ? 'bg-gray-900 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Exams
          </button>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {years.map(year => (
            <div key={year}>
              <h2 className="text-2xl font-light text-gray-900 mb-4">{year}</h2>
              
              <div className="space-y-4">
                {itemsByYear[year]
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className="text-3xl">{item.emoji}</div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 font-light mb-1">
                            {formatDate(item.date)}
                          </div>
                          <h3 className="text-xl font-medium text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <p className="text-sm text-gray-600 font-light">{item.subtitle}</p>
                          )}
                          {item.nextDue && (
                            <p className="text-sm text-gray-600 font-light mt-2">{item.nextDue}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Export Options */}
        <div className="mt-12 bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-light text-gray-900 mb-6">Export Options</h3>
          
          <div className="flex gap-4 flex-wrap">
            <button className="flex items-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300">
              <FileText className="w-5 h-5" />
              Export as PDF
            </button>
            <button className="flex items-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300">
              <Mail className="w-5 h-5" />
              Email Records
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-3">
              No records found
            </h2>
            <p className="text-xl text-gray-600 font-light">
              {filter === 'all' 
                ? 'Start adding medical records to see them here'
                : `No ${filter} records yet`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
