export type LogId = string;

export type WeightEntry = { 
  id: LogId; 
  petId: string; 
  date: string; 
  weight: number; 
  unit: "kg" | "lbs"; 
};

export type FoodEntry = { 
  id: LogId; 
  petId: string; 
  date: string; 
  foodName?: string; 
  amount: number; 
  unit: "g"; 
};

export type WaterEntry = { 
  id: LogId; 
  petId: string; 
  date: string; 
  amount: number; 
  unit: "ml"; 
};

export type ActivityEntry = { 
  id: LogId; 
  petId: string; 
  date: string; 
  kind: "walk" | "play" | "training"; 
  duration: number; 
  durationUnit: "min"; 
  distanceKm?: number; 
};

export type MedEntry = { 
  id: LogId; 
  petId: string; 
  date: string; 
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
