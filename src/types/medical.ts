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
