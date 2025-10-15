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
import { DocumentsView } from '@/components/DocumentsView';
import AppHeader from '@/components/AppHeader';
import EditProfile from '@/components/EditProfile';
import { Screen, Category, PetFormData, UserFormData } from '@/types/pet';
import { VaccinationRecord, TreatmentRecord, ClinicalExam } from '@/types/medical';
import { PetDocument, DocKind } from '@/types/document';
import { useUploads } from '@/hooks/useUploads';
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

  // Documents state
  const [documents, setDocuments] = useState<PetDocument[]>([]);

  // Universal upload system
  const { uploads, handleUpload, filesFor, removeFile } = useUploads();

  // Delete confirmation & undo state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lastDeleted, setLastDeleted] = useState<{
    pet: PetCardData;
    vaccinations: VaccinationRecord[];
    treatments: TreatmentRecord[];
    exams: ClinicalExam[];
    health: HealthState;
    documents: PetDocument[];
  } | null>(null);
  const [undoTimer, setUndoTimer] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; action?: () => void } | null>(null);

  // Sync currentScreen with navStack
  useEffect(() => {
    const latest = navStack[navStack.length - 1];
    if (latest) setCurrentScreen(latest);
  }, [navStack]);

  // Navigation helpers
  const push = (screen: Screen) => setNavStack(prev => [...prev, screen]);
  const pop = () => setNavStack(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  const replace = (screen: Screen) => setNavStack(prev => [...prev.slice(0, -1), screen]);

  // Document management
  const MAX_MB = 20;
  const MAX_BYTES = MAX_MB * 1024 * 1024;

  const addDocuments = async (petId: string, kind: DocKind, files: FileList) => {
    const toDoc = (f: File): PetDocument | null => {
      if (f.size > MAX_BYTES) {
        setSnackbar({ message: `${f.name}: over ${MAX_MB}MB` });
        return null;
      }
      const mime = f.type || "application/octet-stream";
      const url = URL.createObjectURL(f);
      const isImage = mime.startsWith("image/");
      return {
        id: crypto.randomUUID(),
        pet_id: petId,
        kind,
        title: f.name.replace(/\.[^.]+$/, ""),
        mime,
        size: f.size,
        created_at: new Date().toISOString(),
        url,
        thumbnail: isImage ? url : undefined,
      };
    };

    const docs: PetDocument[] = [];
    for (const f of Array.from(files)) {
      const d = toDoc(f);
      if (d) docs.push(d);
    }
    if (!docs.length) return;

    setDocuments(prev => [...docs, ...prev]); // newest first
    setSnackbar({
      message: docs.length === 1 ? "File attached ✓" : `${docs.length} files attached ✓`
    });
  };

  const removeDocument = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  };

  const docsFor = (petId: string, kind?: DocKind) =>
    documents.filter(d => d.pet_id === petId && (!kind || d.kind === kind));


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
      
      // Persist avatar choice: photo wins, else avatar
      const finalPhoto = petData.profilePhotoPreview || petData.avatarUrl || defaultAvatarFor(species);
      const finalTint = petData.profilePhotoPreview ? undefined : petData.avatarTint;
      
      const newPet: PetCardData = {
        id: petId,
        name: petData.name,
        species,
        breed: petData.breed,
        dateOfBirth: petData.dateOfBirth,
        ageLabel: calculateAgeLabel(petData.dateOfBirth),
        avatarUrl: petData.avatarUrl,
        photoUrl: finalPhoto,
        coatColorId: petData.coatColorId,
        avatarTint: finalTint,
        weight: petData.weight !== '' && petData.weight != null ? Number(petData.weight) : undefined,
        weightUnit: petData.weightUnit || 'kg',
        microchipNumber: petData.microchipNumber || undefined,
        status: 'ok',
      };
      
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

  // Delete pet utilities
  const pickByPet = <T extends { pet_id?: string }>(rows: T[], petId: string) => 
    rows.filter(r => r.pet_id === petId);
  const dropByPet = <T extends { pet_id?: string }>(rows: T[], petId: string) => 
    rows.filter(r => r.pet_id !== petId);

  const buildSnapshot = (pet: PetCardData) => ({
    pet,
    vaccinations: pickByPet(vaccinations, pet.id),
    treatments: pickByPet(treatments, pet.id),
    exams: pickByPet(examinations, pet.id),
    documents: pickByPet(documents, pet.id),
    health: {
      weight: health.weight.filter(w => w.petId === pet.id),
      food: health.food.filter(f => f.petId === pet.id),
      water: health.water.filter(w => w.petId === pet.id),
      activity: health.activity.filter(a => a.petId === pet.id),
      meds: health.meds.filter(m => m.petId === pet.id),
    }
  });

  const restoreSnapshot = (snap: typeof lastDeleted) => {
    if (!snap) return;
    setPets(prev => [...prev, snap.pet]);
    setVaccinations(prev => [...prev, ...snap.vaccinations]);
    setTreatments(prev => [...prev, ...snap.treatments]);
    setExaminations(prev => [...prev, ...snap.exams]);
    setDocuments(prev => [...prev, ...snap.documents]);
    setHealth(prev => ({
      weight: [...prev.weight, ...snap.health.weight],
      food: [...prev.food, ...snap.health.food],
      water: [...prev.water, ...snap.health.water],
      activity: [...prev.activity, ...snap.health.activity],
      meds: [...prev.meds, ...snap.health.meds],
    }));
  };

  const permanentlyDeletePet = (petId: string) => {
    setPets(prev => prev.filter(p => p.id !== petId));
    setVaccinations(prev => dropByPet(prev, petId));
    setTreatments(prev => dropByPet(prev, petId));
    setExaminations(prev => dropByPet(prev, petId));
    setDocuments(prev => dropByPet(prev, petId));
    setHealth(prev => ({
      weight: prev.weight.filter(w => w.petId !== petId),
      food: prev.food.filter(f => f.petId !== petId),
      water: prev.water.filter(w => w.petId !== petId),
      activity: prev.activity.filter(a => a.petId !== petId),
      meds: prev.meds.filter(m => m.petId !== petId),
    }));
  };

  const handleRequestDeletePet = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDeletePet = () => {
    if (!currentPetId) return;
    const pet = pets.find(p => p.id === currentPetId);
    if (!pet) return;

    // Snapshot for undo
    const snap = buildSnapshot(pet);
    setLastDeleted(snap);

    // Delete now
    permanentlyDeletePet(pet.id);

    // Clear selection & navigate
    setCurrentPetId(null);
    if (pets.length - 1 > 0) {
      setNavStack(['welcome', 'dashboard']);
    } else {
      setNavStack(['welcome']);
    }

    // Snackbar with Undo (5s)
    setSnackbar({
      message: `${pet.name || 'Pet'} deleted`,
      action: () => {
        if (undoTimer) {
          window.clearTimeout(undoTimer);
          setUndoTimer(null);
        }
        if (lastDeleted) restoreSnapshot(lastDeleted);
        setLastDeleted(null);
        setSnackbar(null);
        setNavStack(['welcome', 'dashboard']);
      }
    });

    const t = window.setTimeout(() => {
      setSnackbar(null);
      setLastDeleted(null);
      setUndoTimer(null);
    }, 5000);
    setUndoTimer(t);

    setShowDeleteModal(false);

    toast({
      title: "Pet deleted",
      description: `${pet.name || 'Pet'} has been removed. Undo available for 5 seconds.`,
    });
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
          onDeletePet={(id) => {
            setCurrentPetId(id);
            handleRequestDeletePet();
          }}
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
          onDeletePet={handleRequestDeletePet}
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
          onViewDocuments={() => push('documents')}
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

      {currentScreen === 'vaccine-details' && petData && currentPetId && (
        <VaccineDetailsForm
          petData={petData}
          selectedVaccine={selectedVaccine}
          onSave={handleSaveVaccination}
          onBack={handleBack}
          onCancel={() => setCurrentScreen('medical-dashboard')}
          petId={currentPetId}
          uploads={uploads}
          onUpload={handleUpload}
          onRemoveUpload={removeFile}
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

      {currentScreen === 'treatment-details' && petData && currentPetId && (
        <TreatmentDetailsForm
          petData={petData}
          treatmentType={selectedTreatmentType}
          onSave={handleSaveTreatment}
          onBack={handleBack}
          onCancel={() => setCurrentScreen('medical-dashboard')}
          petId={currentPetId}
          uploads={uploads}
          onUpload={handleUpload}
          onRemoveUpload={removeFile}
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

      {currentScreen === 'exam-details' && petData && currentPetId && (
        <ExamDetailsForm
          petData={petData}
          examType={selectedExamType}
          onSave={handleSaveExam}
          onBack={handleBack}
          onCancel={() => setCurrentScreen('medical-dashboard')}
          petId={currentPetId}
          uploads={uploads}
          onUpload={handleUpload}
          onRemoveUpload={removeFile}
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

      {currentScreen === 'documents' && currentPetId && (
        <DocumentsView
          petId={currentPetId}
          petName={pets.find(p => p.id === currentPetId)?.name || 'Pet'}
          uploads={uploads}
          onUpload={handleUpload}
          onRemove={removeFile}
          onBack={handleBack}
        />
      )}

      {showRegistrationModal && petData && (
        <RegistrationModal
          petName={petData.name}
          onSubmit={handleRegistrationSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentPetId && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
            <h3 className="text-2xl font-light text-gray-900 mb-2">Delete this pet?</h3>
            <p className="text-gray-600 font-light mb-4">
              This will remove the profile, medical records, and health logs for
              <span className="font-medium"> {pets.find(p => p.id === currentPetId)?.name || 'this pet'}</span>.
              You can undo for the next 5 seconds.
            </p>

            <div className="flex gap-3 justify-end pt-4">
              <button 
                onClick={() => setShowDeleteModal(false)} 
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 font-light"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDeletePet} 
                className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Undo Snackbar */}
      {snackbar && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-gray-900 text-white rounded-full px-5 py-3 shadow-lg flex items-center gap-4">
            <span className="font-light">{snackbar.message}</span>
            {snackbar.action && (
              <button onClick={snackbar.action} className="underline font-medium">
                Undo
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
