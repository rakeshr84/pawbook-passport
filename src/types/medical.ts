export interface VaccinationRecord {
  id: string;
  pet_id: string;
  
  vaccine_type: string;
  vaccine_name: string;
  manufacturer: string;
  product_name: string;
  batch_number: string;
  
  vaccination_date: Date;
  valid_from: Date;
  valid_until: Date;
  
  vet_name: string;
  vet_clinic: string;
  vet_address: string;
  vet_phone: string;
  
  certificate_url?: string;
  extracted_via_ocr: boolean;
  
  reminder_enabled: boolean;
  reminder_days_before: number;
  
  status: 'valid' | 'expiring_soon' | 'expired';
  
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export type HealthStatus = 'up_to_date' | 'due_soon' | 'overdue';

export interface VaccineOption {
  id: string;
  name: string;
  description: string;
  recommended?: boolean;
}

export interface ExtractedVaccine {
  vaccine_name: string;
  vaccination_date: string;
  valid_until: string;
  vet_name?: string;
  vet_clinic?: string;
  selected: boolean;
}

export interface TreatmentRecord {
  id: string;
  pet_id: string;
  
  treatment_type: 'anti-parasitic' | 'deworming' | 'echinococcus' | 'medication' | 'other';
  manufacturer?: string;
  product_name: string;
  batch_number?: string;
  
  date_administered: Date;
  next_due_date?: Date;
  dosage?: string;
  
  vet_name?: string;
  vet_clinic?: string;
  vet_phone?: string;
  
  certificate_url?: string;
  
  reminder_enabled: boolean;
  reminder_days_before: number;
  
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface ClinicalExam {
  id: string;
  pet_id: string;
  
  exam_type: 'annual' | 'pre-travel' | 'illness' | 'follow-up' | 'other';
  exam_date: Date;
  reason?: string;
  
  no_signs_of_disease: boolean;
  fit_to_transport: boolean;
  fit_for_journey: boolean;
  
  weight?: number;
  weight_unit?: 'lbs' | 'kg';
  temperature?: number;
  temperature_unit?: 'F' | 'C';
  heart_rate?: number;
  respiratory_rate?: number;
  
  findings?: string;
  
  vet_name: string;
  vet_clinic: string;
  vet_address?: string;
  vet_phone?: string;
  vet_license?: string;
  vet_signature_url?: string;
  
  certificate_url?: string;
  
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
