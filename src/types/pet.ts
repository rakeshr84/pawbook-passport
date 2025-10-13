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
  vetClinic: string;
  vetPhone: string;
}

export interface UserFormData {
  email: string;
  password: string;
  fullName: string;
}

export interface Category {
  id: string;
  name: string;
  bgGradient: string;
  tabEmoji: string;
  photos: string[];
  mascot: string;
  message: string;
}

export type Screen = 'welcome' | 'category' | 'form' | 'success';
