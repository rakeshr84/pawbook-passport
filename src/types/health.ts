export type LogId = string;

export type WeightEntry = { 
  id: LogId; 
  petId: string; 
  timestamp: string; // ISO 8601 with time
  weight: number; 
  unit: "kg" | "lbs"; 
};

export type FoodEntry = { 
  id: LogId; 
  petId: string; 
  timestamp: string; // ISO 8601 with time
  foodName?: string; 
  amount: number; 
  unit: "g"; 
};

export type WaterEntry = { 
  id: LogId; 
  petId: string; 
  timestamp: string; // ISO 8601 with time
  amount: number; 
  unit: "ml"; 
};

export type ActivityEntry = { 
  id: LogId; 
  petId: string; 
  timestamp: string; // ISO 8601 with time
  kind: "walk" | "play" | "training"; 
  duration: number; 
  durationUnit: "min"; 
  distanceKm?: number; 
};

export type MedEntry = { 
  id: LogId; 
  petId: string; 
  timestamp: string; // ISO 8601 with time
  name: string; 
  dose?: string; 
  taken: boolean; 
};

export type HealthState = {
  weight: WeightEntry[];
  food: FoodEntry[];
  water: WaterEntry[];
  activity: ActivityEntry[];
  meds: MedEntry[];
};
