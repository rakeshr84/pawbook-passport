import { useState } from 'react';
import WelcomePage from '@/components/WelcomePage';
import CategorySelection from '@/components/CategorySelection';
import PetForm from '@/components/PetForm';
import RegistrationModal from '@/components/RegistrationModal';
import SuccessPage from '@/components/SuccessPage';
import PetPassportView from '@/components/PetPassportView';
import MedicalDashboard from '@/components/MedicalDashboard';
import VaccineSelection from '@/components/VaccineSelection';
import OCRScanner from '@/components/OCRScanner';
import { Screen, Category, PetFormData, UserFormData } from '@/types/pet';
import { ExtractedVaccine } from '@/types/medical';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [petData, setPetData] = useState<PetFormData | null>(null);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

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
    setCurrentScreen('success');
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
    } else if (currentScreen === 'vaccine-selection' || currentScreen === 'ocr-scanner') {
      setCurrentScreen('medical-dashboard');
    }
  };

  const handleAddMedicalRecords = () => {
    setCurrentScreen('medical-dashboard');
  };

  const handleAddVaccination = () => {
    setCurrentScreen('vaccine-selection');
  };

  const handleScanCertificate = () => {
    setCurrentScreen('ocr-scanner');
  };

  const handleVaccineNext = (selectedVaccine: string, customName?: string) => {
    console.log('Selected vaccine:', selectedVaccine, customName);
    // Phase 2 Part 2 will handle vaccine details form
    alert('Vaccine details form coming in Phase 2 Part 2!');
  };

  const handleOCRComplete = (vaccines: ExtractedVaccine[]) => {
    console.log('Extracted vaccines:', vaccines);
    // Phase 2 Part 2 will handle saving vaccines
    alert(`Successfully extracted ${vaccines.length} vaccines! Full implementation coming in Phase 2 Part 2.`);
    setCurrentScreen('medical-dashboard');
  };

  return (
    <>
      {currentScreen === 'welcome' && (
        <WelcomePage onGetStarted={handleGetStarted} />
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
          onScanCertificate={handleScanCertificate}
        />
      )}

      {currentScreen === 'vaccine-selection' && petData && (
        <VaccineSelection
          petData={petData}
          onBack={handleBack}
          onNext={handleVaccineNext}
          onUploadCertificate={handleScanCertificate}
        />
      )}

      {currentScreen === 'ocr-scanner' && (
        <OCRScanner
          onBack={handleBack}
          onComplete={handleOCRComplete}
          onEditManually={handleAddVaccination}
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
