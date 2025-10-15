import { useState, useEffect } from 'react';
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
import AppHeader from '@/components/AppHeader';
import EditProfile from '@/components/EditProfile';
import { Screen, Category, PetFormData, UserFormData } from '@/types/pet';
import { VaccinationRecord, TreatmentRecord, ClinicalExam } from '@/types/medical';
import { HealthState } from '@/types/health';
import { toast } from '@/hooks/use-toast';
import { normalizeSpecies, defaultAvatarFor, getPetImageUrl } from '@/lib/utils';

// Helper: Calculate age label with proper negative month handling
const calculateAgeLabel = (dob: string): string => {
  const d = new Date(dob);
  const t = new Date();
  let years = t.getFullYear() - d.getFullYear();
  let months = t.getMonth() - d.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (years > 0) return `${years}y${months ? ` ${months}m` : ''}`.trim();
  
  const days = Math.floor((+t - +d) / 86400000);
  return days >= 30 ? `${months}m` : 'New';
};

const Index = () => {
  // Navigation stack for clean back button logic
  const [navStack, setNavStack] = useState<Screen[]>(['welcome']);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [petData, setPetData] = useState<PetFormData | null>(null);
  const [userData, setUserData] = useState<UserFormData | null>(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  
  // Current active pet ID for medical records
  const [currentPetId, setCurrentPetId] = useState<string | null>(null);
  
  // Medical records indexed by pet ID
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

  // Health tracking state
  const [health, setHealth] = useState<HealthState>({
    weight: [],
    food: [],
    water: [],
    activity: [],
    meds: [],
  });

  // Sync currentScreen with navStack
  useEffect(() => {
    const latest = navStack[navStack.length - 1];
    if (latest) setCurrentScreen(latest);
  }, [navStack]);

  // Navigation helpers
  const push = (screen: Screen) => setNavStack(prev => [...prev, screen]);
  const pop = () => setNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  const replace = (screen: Screen) => setNavStack(prev => [...prev.slice(0, -1), screen]);

  const handleGetStarted = () => {
    push('category');
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    push('form');
  };

  const handlePetFormSubmit = (data: PetFormData) => {
    setPetData(data);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = (data: UserFormData) => {
    setUserData(data);
    setShowRegistrationModal(false);
    
    // Set auth state for new user
    setIsAuthed(true);
    setUser({ full_name: data.fullName, email: data.email });
    
    // Create pet with stable UUID
    if (petData) {
      const petId = crypto.randomUUID();
      const species = normalizeSpecies(petData.category);
      const avatarUrl = petData.avatarUrl || (petData.avatarUrl ? defaultAvatarFor(species) : undefined);
      const uploaded = petData.profilePhotoPreview || undefined;
      // If photo uploaded, clear tint; otherwise keep it
      const finalTint = uploaded ? undefined : petData.avatarTint;
      
      const newPet: PetCardData = {
        id: petId,
        name: petData.name,
        species,
        breed: petData.breed,
        dateOfBirth: petData.dateOfBirth,
        ageLabel: calculateAgeLabel(petData.dateOfBirth),
        avatarUrl,
        photoUrl: uploaded,
        coatColorId: petData.coatColorId,
        avatarTint: finalTint,
        weight: petData.weight !== '' && petData.weight != null ? Number(petData.weight) : undefined,
        weightUnit: petData.weightUnit || 'kg',
        microchipNumber: petData.microchipNumber || undefined,
        status: 'ok',
      };
      
      // Ensure photoUrl is always set using the helper
      newPet.photoUrl = getPetImageUrl(newPet);
      
      setPets(prev => [...prev, newPet]);
      setCurrentPetId(petId);
      
      toast({
        title: "🎉 Passport created!",
        description: `${petData.name}'s passport is ready. You can now add medical records.`,
      });
    }
    
    // Go to dashboard after registration
    replace('dashboard');
  };

  const handleViewPassport = () => {
    push('passport');
  };

  // Centralized "Add Another Pet" flow
  const handleAddAnotherPet = () => {
    setPetData(null);
    setSelectedCategory(null);
    setCurrentPetId(null);
    push('category');
  };

  // Legacy handler redirects to centralized one
  const handleAddAnother = () => {
    handleAddAnotherPet();
  };

  // Simplified back navigation using nav stack
  const handleBack = () => {
    pop();
  };

  const handleAddMedicalRecords = () => {
    push('medical-dashboard');
  };

  const handleAddVaccination = () => {
    push('vaccine-selection');
  };

  const handleVaccineNext = (vaccine: string, customName?: string) => {
    setSelectedVaccine(customName || vaccine);
    push('vaccine-details');
  };

  const handleSaveVaccination = (record: Omit<VaccinationRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => {
    if (!currentPetId) {
      toast({ title: "Error", description: "No active pet selected", variant: "destructive" });
      return;
    }
    
    const newRecord: VaccinationRecord = {
      ...record,
      id: crypto.randomUUID(),
      pet_id: currentPetId,
      created_at: new Date(),
      updated_at: new Date(),
    };
    
    setVaccinations(prev => [...prev, newRecord]);
    
    toast({
      title: "✅ Vaccination saved!",
      description: "You can now upload a certificate photo (optional).",
    });
    
    replace('medical-dashboard');
  };

  const handleViewVaccinationList = () => {
    push('vaccination-list');
  };

  const handleViewTimeline = () => {
    push('timeline');
  };

  const handleViewVaccineDetails = (id: string) => {
    console.log('View vaccine details:', id);
  };

  const handleAddTreatment = () => push('treatment-selection');
  
  const handleTreatmentNext = (type: string) => {
    setSelectedTreatmentType(type);
    push('treatment-details');
  };
  
  const handleSaveTreatment = (record: Omit<TreatmentRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => {
    if (!currentPetId) {
      toast({ title: "Error", description: "No active pet selected", variant: "destructive" });
      return;
    }
    
    const newRecord: TreatmentRecord = {
      ...record,
      id: crypto.randomUUID(),
      pet_id: currentPetId,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setTreatments(prev => [...prev, newRecord]);
    
    toast({
      title: "✅ Treatment saved!",
      description: "You can now upload a certificate photo (optional).",
    });
    
    replace('medical-dashboard');
  };
  
  const handleViewTreatmentList = () => push('treatment-list');
  const handleViewTreatmentDetails = (id: string) => console.log('View treatment:', id);

  const handleAddExam = () => push('exam-selection');
  
  const handleExamNext = (type: string) => {
    setSelectedExamType(type);
    push('exam-details');
  };
  
  const handleSaveExam = (record: Omit<ClinicalExam, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => {
    if (!currentPetId) {
      toast({ title: "Error", description: "No active pet selected", variant: "destructive" });
      return;
    }
    
    const newRecord: ClinicalExam = {
      ...record,
      id: crypto.randomUUID(),
      pet_id: currentPetId,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setExaminations(prev => [...prev, newRecord]);
    
    toast({
      title: "✅ Examination saved!",
      description: "You can now upload test results (optional).",
    });
    
    replace('medical-dashboard');
  };
  
  const handleViewExamList = () => push('exam-list');
  const handleViewExamDetails = (id: string) => console.log('View exam:', id);

  // Auth handlers
  const handleSignInClick = () => {
    push('signin');
  };

  const handleSignIn = (params: { email?: string; password?: string; provider?: 'google' | 'apple' }) => {
    const displayName = 'PawBuck User';
    setUser({ 
      full_name: displayName, 
      email: params.email ?? `${(params.provider || 'user')}@example.com` 
    });
    setIsAuthed(true);
    replace('dashboard');
  };

  const handleLogout = () => {
    setIsAuthed(false);
    setUser(null);
    setPets([]);
    setCurrentPetId(null);
    setNavStack(['welcome']);
  };

  // Health tracking handlers
  const handleSaveWeight = (weight: number, unit: "kg" | "lbs", date: string) => {
    if (!currentPetId) return;
    setHealth(h => ({
      ...h,
      weight: [...h.weight, { id: crypto.randomUUID(), petId: currentPetId, date, weight, unit }]
    }));
    toast({ title: "Weight logged", description: `${weight} ${unit} recorded for ${date}` });
  };

  const handleSaveFood = (amount: number, date: string, name?: string) => {
    if (!currentPetId) return;
    setHealth(h => ({
      ...h,
      food: [...h.food, { id: crypto.randomUUID(), petId: currentPetId, date, amount, unit: "g", foodName: name }]
    }));
    toast({ title: "Food logged", description: `${amount}g recorded` });
  };

  const handleSaveWater = (amount: number, date: string) => {
    if (!currentPetId) return;
    setHealth(h => ({
      ...h,
      water: [...h.water, { id: crypto.randomUUID(), petId: currentPetId, date, amount, unit: "ml" }]
    }));
    toast({ title: "Water logged", description: `${amount}ml recorded` });
  };

  const handleSaveActivity = (duration: number, kind: "walk" | "play" | "training", date: string, distanceKm?: number) => {
    if (!currentPetId) return;
    setHealth(h => ({
      ...h,
      activity: [...h.activity, { id: crypto.randomUUID(), petId: currentPetId, date, kind, duration, durationUnit: "min", distanceKm }]
    }));
    toast({ title: "Activity logged", description: `${duration} min ${kind} recorded` });
  };

  const handleSaveMed = (name: string, taken: boolean, date: string, dose?: string) => {
    if (!currentPetId) return;
    setHealth(h => ({
      ...h,
      meds: [...h.meds, { id: crypto.randomUUID(), petId: currentPetId, date, name, dose, taken }]
    }));
    toast({ title: "Medication logged", description: `${name} ${taken ? 'taken' : 'skipped'}` });
  };

  const handleSelectPet = (id: string) => {
    const selected = pets.find(p => p.id === id);
    if (!selected) return;
    
    // Hydrate full pet data from selected pet
    setPetData({
      name: selected.name,
      breed: selected.breed || '',
      dateOfBirth: selected.dateOfBirth || '',
      gender: 'unknown',
      colorMarkings: '',
      weight: selected.weight != null ? String(selected.weight) : '',
      weightUnit: selected.weightUnit ?? 'kg',
      microchipNumber: selected.microchipNumber || '',
      profilePhoto: null,
      profilePhotoPreview: selected.photoUrl || '',
      avatarUrl: selected.avatarUrl,
      coatColorId: selected.coatColorId,
      avatarTint: selected.avatarTint,
      vetClinic: '',
      vetPhone: '',
      category: selected.species,
    });
    setCurrentPetId(selected.id);
    setSelectedCategory({ id: selected.species, name: selected.species, bgGradient: '', tabIcon: '', photos: [], mascot: '', message: '' });
    push('passport');
  };

  const handleEditProfile = () => {
    push('edit-profile');
  };

  const handleSaveProfile = (updatedUser: { full_name?: string; phone?: string }) => {
    setUser(prev => ({ ...prev, ...updatedUser }));
    pop();
    toast({
      title: "✅ Profile updated!",
      description: "Your profile has been saved successfully.",
    });
  };

  const showAppHeader = isAuthed && pets.length > 0 && !['welcome', 'signin'].includes(currentScreen);

  return (
    <>
      <AppHeader
        showDashboard={showAppHeader}
        onDashboard={() => setNavStack(['welcome', 'dashboard'])}
      />

      {currentScreen === 'welcome' && (
        <WelcomePage
          onGetStarted={handleGetStarted}
          onSignIn={handleSignInClick}
          onGoToDashboard={() => setNavStack(['welcome', 'dashboard'])}
          isAuthed={isAuthed}
        />
      )}

      {currentScreen === 'signin' && (
        <SignIn onBack={handleBack} onSignIn={handleSignIn} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          user={user}
          pets={pets}
          onSelectPet={handleSelectPet}
          onAddPet={handleAddAnotherPet}
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

      {currentScreen === 'passport' && petData && selectedCategory && currentPetId && (
        <PetPassportView
          petData={petData}
          userData={userData}
          user={user}
          category={selectedCategory}
          petId={currentPetId}
          health={health}
          onBack={() => {
            if (isAuthed) {
              setNavStack(['welcome', 'dashboard']);
            } else {
              pop();
            }
          }}
          onAddMedicalRecords={handleAddMedicalRecords}
          onAddAnother={handleAddAnother}
          onEditProfile={handleEditProfile}
          onSaveWeight={handleSaveWeight}
          onSaveFood={handleSaveFood}
          onSaveWater={handleSaveWater}
          onSaveActivity={handleSaveActivity}
          onSaveMed={handleSaveMed}
        />
      )}

      {currentScreen === 'edit-profile' && (
        <EditProfile
          user={user}
          onSave={handleSaveProfile}
          onCancel={handleBack}
        />
      )}

      {currentScreen === 'medical-dashboard' && petData && currentPetId && (
        <MedicalDashboard
          pet={pets.find(p => p.id === currentPetId) || { ...petData, species: petData.category, id: currentPetId }}
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
