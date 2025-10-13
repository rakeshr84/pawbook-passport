import { useState } from 'react';
import WelcomePage from '@/components/WelcomePage';
import CategorySelection from '@/components/CategorySelection';
import PetForm from '@/components/PetForm';
import RegistrationModal from '@/components/RegistrationModal';
import SuccessPage from '@/components/SuccessPage';
import PetPassportView from '@/components/PetPassportView';
import { Screen, Category, PetFormData, UserFormData } from '@/types/pet';

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
    }
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
          onAddMedicalRecords={() => alert('Phase 2: Medical Records coming soon!')}
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
