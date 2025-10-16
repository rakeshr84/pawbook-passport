export interface PetFormData {
  name: string;
  breed: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'unknown';
  colorMarkings: string;
  weight: string;
  weightUnit: 'lbs' | 'kg';
  microchipNumber: string;
  profilePhoto: File | null;
  profilePhotoPreview: string;
  avatarUrl?: string;
  vetClinic: string;
  vetPhone: string;
  category: string;
}

export interface UserFormData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface Category {
  id: string;
  name: string;
  bgGradient: string;
  tabIcon: string;
  photos: Array<{ src: string; position: string }>;
  mascot: string;
  message: string;
}

export type Screen = 
  | 'welcome' 
  | 'category' 
  | 'form' 
  | 'success' 
  | 'passport'
  | 'medical-dashboard'
  | 'vaccine-selection'
  | 'vaccine-details'
  | 'vaccination-list'
  | 'timeline'
  | 'treatment-selection'
  | 'treatment-details'
  | 'treatment-list'
  | 'exam-selection'
  | 'exam-details'
  | 'exam-list'
  | 'documents'
  | 'signin'
  | 'dashboard'
  | 'edit-profile';
