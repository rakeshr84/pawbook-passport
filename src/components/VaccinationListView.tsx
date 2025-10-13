import { ChevronLeft, Plus, FileText } from 'lucide-react';
import { VaccinationRecord } from '@/types/medical';

interface VaccinationListViewProps {
  petData: {
    name: string;
    breed: string;
    photo: string;
  };
  vaccinations: VaccinationRecord[];
  onBack: () => void;
  onAddNew: () => void;
  onViewDetails: (id: string) => void;
}

// Helper function
function getVaccineStatus(validUntil: Date): {
  status: 'valid' | 'expiring_soon' | 'expired';
  daysUntilDue: number;
} {
  const now = new Date();
  const expiryDate = new Date(validUntil);
  const daysUntilDue = Math.floor((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilDue < 0) {
    return { status: 'expired', daysUntilDue };
  } else if (daysUntilDue <= 30) {
    return { status: 'expiring_soon', daysUntilDue };
  } else {
    return { status: 'valid', daysUntilDue };
  }
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
}

export default function VaccinationListView({
  petData,
  vaccinations,
  onBack,
  onAddNew,
  onViewDetails,
}: VaccinationListViewProps) {
  // Categorize vaccinations
  const actionRequired = vaccinations.filter(v => {
    const { status } = getVaccineStatus(v.valid_until);
    return status === 'expiring_soon' || status === 'expired';
  });

  const upToDate = vaccinations.filter(v => {
    const { status } = getVaccineStatus(v.valid_until);
    return status === 'valid';
  });

  const history = vaccinations.filter(v => {
    const { status } = getVaccineStatus(v.valid_until);
    return status === 'expired';
  });

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
              <h1 className="text-4xl font-light text-gray-900">Vaccination Records</h1>
              <p className="text-gray-500 font-light mt-1">{petData.name} • {petData.breed}</p>
            </div>
          </div>
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        <div className="space-y-8">
          {/* Action Required Section */}
          {actionRequired.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h2 className="text-2xl font-light text-gray-900">Action Required</h2>
              </div>
              
              <div className="space-y-4">
                {actionRequired.map((vaccine) => {
                  const { status, daysUntilDue } = getVaccineStatus(vaccine.valid_until);
                  return (
                    <div
                      key={vaccine.id}
                      className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {vaccine.vaccine_name}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 font-light">
                            <p className="flex items-center gap-2">
                              <span className={status === 'expired' ? 'text-red-600' : 'text-amber-600'}>
                                {status === 'expired' 
                                  ? `⚠ Overdue by ${Math.abs(daysUntilDue)} days`
                                  : `⚠ Due: ${formatDate(vaccine.valid_until)} (${daysUntilDue} days)`
                                }
                              </span>
                            </p>
                            <p>Last: {formatDate(vaccine.vaccination_date)}</p>
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300">
                          Schedule Booster
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Up to Date Section */}
          {upToDate.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-2xl font-light text-gray-900">Up to Date</h2>
              </div>
              
              <div className="space-y-4">
                {upToDate.map((vaccine) => {
                  const { daysUntilDue } = getVaccineStatus(vaccine.valid_until);
                  return (
                    <div
                      key={vaccine.id}
                      className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-medium text-gray-900 mb-2">
                            {vaccine.vaccine_name}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600 font-light">
                            <p>✓ Valid until: {formatDate(vaccine.valid_until)}</p>
                            <p>Given: {formatDate(vaccine.vaccination_date)}</p>
                            {vaccine.vet_name && <p>Vet: {vaccine.vet_name}</p>}
                            {vaccine.batch_number && <p>Batch: {vaccine.batch_number}</p>}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => onViewDetails(vaccine.id)}
                          className="text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200"
                        >
                          View Details
                        </button>
                        {vaccine.certificate_url && (
                          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200">
                            <FileText className="w-4 h-4" />
                            Certificate
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* History Section */}
          {history.length > 0 && (
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">History (Expired/Past)</h2>
              
              <div className="space-y-3">
                {history.map((vaccine) => (
                  <div
                    key={vaccine.id}
                    className="bg-white/40 backdrop-blur-md rounded-xl p-4 shadow hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-700">{vaccine.vaccine_name}</h4>
                        <p className="text-sm text-gray-500 font-light">
                          {formatDate(vaccine.vaccination_date)} - {formatDate(vaccine.valid_until)} (Expired)
                        </p>
                      </div>
                      <button
                        onClick={() => onViewDetails(vaccine.id)}
                        className="text-sm text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {vaccinations.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-3">
                No vaccination records yet
              </h2>
              <p className="text-xl text-gray-600 font-light mb-6">
                Start tracking {petData.name}'s vaccinations
              </p>
              <button
                onClick={onAddNew}
                className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
              >
                Add First Vaccination
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
