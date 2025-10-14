import { useState } from 'react';
import WelcomePage from '@/components/WelcomePage';
import SignIn from '@/components/SignIn';
import Dashboard, { PetCardData } from '@/components/Dashboard';
import CategorySelection from '@/components/CategorySelection';
import PetForm from '@/components/PetForm';
import RegistrationModal from '@/components/RegistrationModal';
import SuccessPage from '@/components/SuccessPage';
import PetPassportView from '@/components/PetPassportView';
import MedicalDashboard from '@/components/MedicalDashboard';
import VaccineSelection from '@/components/VaccineSelection';
import VaccineDetailsForm from '@/components/VaccineDetailsForm';
import VaccinationListView from '@/components/VaccinationListView';
import TimelineView from '@/components/TimelineView';
import TreatmentSelection from '@/components/TreatmentSelection';
import TreatmentDetailsForm from '@/components/TreatmentDetailsForm';
import TreatmentListView from '@/components/TreatmentListView';
import ExamSelection from '@/components/ExamSelection';
import ExamDetailsForm from '@/components/ExamDetailsForm';
import ExamListView from '@/components/ExamListView';
import { Screen, Category, PetFormData, UserFormData } from '@/types/pet';
import { VaccinationRecord, TreatmentRecord, ClinicalExam } from '@/types/medical';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [petData, setPetData] = useState<PetFormData | null>(null);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [vaccinations, setVaccinations] = useState<VaccinationRecord[]>([]);
  const [treatments, setTreatments] = useState<TreatmentRecord[]>([]);
  const [examinations, setExaminations] = useState<ClinicalExam[]>([]);
  const [selectedVaccine, setSelectedVaccine] = useState<string>('');
  const [selectedTreatmentType, setSelectedTreatmentType] = useState<string>('');
  const [selectedExamType, setSelectedExamType] = useState<string>('');
  
  // Authentication state
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState<{ full_name?: string; email?: string } | null>(null);
  const [pets, setPets] = useState<PetCardData[]>([]);

  const handleGetStarted = () => {
    setCurrentScreen('category');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setCurrentScreen('form');
  };

  const handlePetFormSubmit = (data: PetFormData) => {
    setPetData(data);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (data: UserFormData) => {
    console.log('User registered:', data);
    console.log('Pet data:', petData);
    setUserData(data);
    setShowRegistrationModal(false);
    
    // Set auth state for new user
    setIsAuthed(true);
    setUser({ full_name: data.fullName, email: data.email });
    
    // Calculate age for pet card
    const calculateAgeLabel = (dob: string): string => {
      const birthDate = new Date(dob);
      const today = new Date();
      const years = today.getFullYear() - birthDate.getFullYear();
      const months = today.getMonth() - birthDate.getMonth();
      
      if (years > 0) return `${years}y ${months > 0 ? `${months}m` : ''}`.trim();
      if (months > 0) return `${months}m`;
      return 'New';
    };
    
    // Add pet to pets array
    if (petData) {
      const newPet: PetCardData = {
        id: crypto.randomUUID(),
        name: petData.name,
        breed: petData.breed,
        ageLabel: calculateAgeLabel(petData.dateOfBirth),
        photoUrl: petData.profilePhotoPreview,
        status: 'ok',
      };
      setPets(prev => [...prev, newPet]);
    }
    
    setCurrentScreen('dashboard');
  };

  const handleViewPassport = () => {
    setCurrentScreen('passport');
  };

  const handleAddAnother = () => {
    setCurrentScreen('welcome');
    setSelectedCategory(null);
    setPetData(null);
    setUserData(null);
    setShowRegistrationModal(false);
  };

  const handleBack = () => {
    if (currentScreen === 'category') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'form') {
      setCurrentScreen('category');
      setSelectedCategory(null);
    } else if (currentScreen === 'medical-dashboard') {
      setCurrentScreen('passport');
    } else if (currentScreen === 'vaccine-selection') {
      setCurrentScreen('medical-dashboard');
    } else if (currentScreen === 'vaccine-details') {
      setCurrentScreen('vaccine-selection');
    } else if (currentScreen === 'vaccination-list') {
      setCurrentScreen('medical-dashboard');
    } else if (currentScreen === 'timeline' || currentScreen === 'treatment-list' || currentScreen === 'exam-list') {
      setCurrentScreen('medical-dashboard');
    } else if (currentScreen === 'treatment-selection') {
      setCurrentScreen('medical-dashboard');
    } else if (currentScreen === 'treatment-details') {
      setCurrentScreen('treatment-selection');
    } else if (currentScreen === 'exam-selection') {
      setCurrentScreen('medical-dashboard');
    } else if (currentScreen === 'exam-details') {
      setCurrentScreen('exam-selection');
    }
  };

  const handleAddMedicalRecords = () => {
    setCurrentScreen('medical-dashboard');
  };

  const handleAddVaccination = () => {
    setCurrentScreen('vaccine-selection');
  };

  const handleVaccineNext = (vaccine: string, customName?: string) => {
    setSelectedVaccine(customName || vaccine);
    setCurrentScreen('vaccine-details');
  };

  const handleSaveVaccination = (record: Omit<VaccinationRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => {
    const newRecord: VaccinationRecord = {
      ...record,
      id: crypto.randomUUID(),
      pet_id: petData?.name || '',
      created_at: new Date(),
      updated_at: new Date(),
    };
    
    setVaccinations(prev => [...prev, newRecord]);
    
    toast({
      title: "Vaccination saved!",
      description: `${record.vaccine_name} record has been added successfully.`,
    });
    
    setCurrentScreen('medical-dashboard');
  };

  const handleViewVaccinationList = () => {
    setCurrentScreen('vaccination-list');
  };

  const handleViewTimeline = () => {
    setCurrentScreen('timeline');
  };

  const handleViewVaccineDetails = (id: string) => {
    console.log('View vaccine details:', id);
  };

  const handleAddTreatment = () => setCurrentScreen('treatment-selection');
  const handleTreatmentNext = (type: string) => {
    setSelectedTreatmentType(type);
    setCurrentScreen('treatment-details');
  };
  const handleSaveTreatment = (record: Omit<TreatmentRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => {
    const newRecord: TreatmentRecord = {
      ...record,
      id: crypto.randomUUID(),
      pet_id: petData?.name || '',
      created_at: new Date(),
      updated_at: new Date(),
    };
    setTreatments(prev => [...prev, newRecord]);
    toast({ title: "Treatment saved!", description: `${record.product_name} record has been added.` });
    setCurrentScreen('medical-dashboard');
  };
  const handleViewTreatmentList = () => setCurrentScreen('treatment-list');
  const handleViewTreatmentDetails = (id: string) => console.log('View treatment:', id);

  const handleAddExam = () => setCurrentScreen('exam-selection');
  const handleExamNext = (type: string) => {
    setSelectedExamType(type);
    setCurrentScreen('exam-details');
  };
  const handleSaveExam = (record: Omit<ClinicalExam, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => {
    const newRecord: ClinicalExam = {
      ...record,
      id: crypto.randomUUID(),
      pet_id: petData?.name || '',
      created_at: new Date(),
      updated_at: new Date(),
    };
    setExaminations(prev => [...prev, newRecord]);
    toast({ title: "Examination saved!", description: "Health exam record has been added." });
    setCurrentScreen('medical-dashboard');
  };
  const handleViewExamList = () => setCurrentScreen('exam-list');
  const handleViewExamDetails = (id: string) => console.log('View exam:', id);

  // Auth handlers
  const handleSignInClick = () => {
    setCurrentScreen('signin');
  };

  const handleSignIn = (params: { email?: string; password?: string; provider?: 'google' | 'apple' }) => {
    const displayName = 'PawBuck User';
    setUser({ 
      full_name: displayName, 
      email: params.email ?? `${(params.provider || 'user')}@example.com` 
    });
    setIsAuthed(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setUser(null);
    setPets([]);
    setCurrentScreen('welcome');
  };

  const handleSelectPet = (id: string) => {
    const selected = pets.find(p => p.id === id);
    if (!selected) return;
    
    // For now, just show passport view - in real app would load pet data
    setCurrentScreen('passport');
  };

  const handleAddPetFromDashboard = () => {
    setCurrentScreen('category');
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomePage onGetStarted={handleGetStarted} onSignIn={handleSignInClick} />
      )}

      {currentScreen === 'signin' && (
        <SignIn onBack={() => setCurrentScreen('welcome')} onSignIn={handleSignIn} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          user={user}
          pets={pets}
          onSelectPet={handleSelectPet}
          onAddPet={handleAddPetFromDashboard}
          onLogout={handleLogout}
        />
      )}
      
      {currentScreen === 'category' && (
        <CategorySelection
          onSelectCategory={handleSelectCategory}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'form' && selectedCategory && (
        <PetForm
          category={selectedCategory}
          onSubmit={handlePetFormSubmit}
          onBack={handleBack}
        />
      )}
      
      {currentScreen === 'success' && petData && (
        <SuccessPage
          petName={petData.name}
          petPhoto={petData.profilePhotoPreview}
          onViewPassport={handleViewPassport}
          onAddAnother={handleAddAnother}
        />
      )}

      {currentScreen === 'passport' && petData && userData && selectedCategory && (
        <PetPassportView
          petData={petData}
          userData={userData}
          category={selectedCategory}
          onBack={() => setCurrentScreen('success')}
          onAddMedicalRecords={handleAddMedicalRecords}
          onAddAnother={handleAddAnother}
        />
      )}

      {currentScreen === 'medical-dashboard' && petData && (
        <MedicalDashboard
          petData={petData}
          onBack={handleBack}
          onAddVaccination={handleAddVaccination}
          onAddTreatment={handleAddTreatment}
          onAddExam={handleAddExam}
          onViewFullHistory={handleViewTimeline}
          onViewVaccinationList={handleViewVaccinationList}
          onViewTreatmentList={handleViewTreatmentList}
          onViewExamList={handleViewExamList}
          vaccinations={vaccinations}
          treatments={treatments}
          examinations={examinations}
        />
      )}

      {currentScreen === 'vaccine-selection' && petData && (
        <VaccineSelection
          petData={petData}
          onBack={handleBack}
          onNext={handleVaccineNext}
        />
      )}

      {currentScreen === 'vaccine-details' && petData && (
        <VaccineDetailsForm
          petData={petData}
          selectedVaccine={selectedVaccine}
          onSave={handleSaveVaccination}
          onBack={handleBack}
          onCancel={() => setCurrentScreen('medical-dashboard')}
        />
      )}

      {currentScreen === 'vaccination-list' && petData && (
        <VaccinationListView
          petData={{
            name: petData.name,
            breed: petData.breed,
            photo: petData.profilePhotoPreview || '',
          }}
          vaccinations={vaccinations}
          onBack={handleBack}
          onAddNew={handleAddVaccination}
          onViewDetails={handleViewVaccineDetails}
        />
      )}

      {currentScreen === 'timeline' && petData && (
        <TimelineView
          petData={{ name: petData.name, breed: petData.breed }}
          vaccinations={vaccinations}
          treatments={treatments}
          examinations={examinations}
          onBack={handleBack}
        />
      )}

      {currentScreen === 'treatment-selection' && petData && (
        <TreatmentSelection petData={petData} onBack={handleBack} onNext={handleTreatmentNext} />
      )}

      {currentScreen === 'treatment-details' && petData && (
        <TreatmentDetailsForm
          petData={petData}
          treatmentType={selectedTreatmentType}
          onSave={handleSaveTreatment}
          onBack={handleBack}
          onCancel={() => setCurrentScreen('medical-dashboard')}
        />
      )}

      {currentScreen === 'treatment-list' && petData && (
        <TreatmentListView
          petData={{ name: petData.name, breed: petData.breed, photo: petData.profilePhotoPreview }}
          treatments={treatments}
          onBack={handleBack}
          onAddNew={handleAddTreatment}
          onViewDetails={handleViewTreatmentDetails}
        />
      )}

      {currentScreen === 'exam-selection' && petData && (
        <ExamSelection petData={petData} onBack={handleBack} onNext={handleExamNext} />
      )}

      {currentScreen === 'exam-details' && petData && (
        <ExamDetailsForm
          petData={petData}
          examType={selectedExamType}
          onSave={handleSaveExam}
          onBack={handleBack}
          onCancel={() => setCurrentScreen('medical-dashboard')}
        />
      )}

      {currentScreen === 'exam-list' && petData && (
        <ExamListView
          petData={{ name: petData.name, breed: petData.breed, photo: petData.profilePhotoPreview }}
          examinations={examinations}
          onBack={handleBack}
          onAddNew={handleAddExam}
          onViewDetails={handleViewExamDetails}
        />
      )}

      {showRegistrationModal && petData && (
        <RegistrationModal
          petName={petData.name}
          onSubmit={handleRegistrationSubmit}
        />
      )}
    </>
  );
};

export default Index;
