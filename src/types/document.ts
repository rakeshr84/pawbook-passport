export type DocKind =
  | "certificate"     // vaccination certificate
  | "pretravel"       // pre-travel vet certificate
  | "lab"             // labs
  | "exam"            // exam report
  | "treatment"       // deworm/flea-tick proof
  | "other";

export interface PetDocument {
  id: string;
  pet_id: string;
  kind: DocKind;
  title: string;           // display name (editable)
  mime: string;            // 'application/pdf' | 'image/jpeg' | ...
  size: number;            // bytes
  created_at: string;      // ISO
  url: string;             // object URL (in-memory)
  thumbnail?: string;      // object URL for image thumb (same as url for images)
  notes?: string;
}
