// Matches the `license` table in the database
export interface ILicense {
  id: number;            // BIGINT
  doctor_id: string;     // UUID — references doctor(id)
  authority: string;           // was: licensingAuthority
  years_exp?: number;          // was: verificationDate (wrong type!)
  license_number?: string;     // was: licenseNumber
  issue_date: string;          // new
  expire_date: string;         // new
  document?: string;           // URL or path to uploaded doc
  created_at: string;

  // UI-only helper (not in DB — computed from expire_date vs today)
  is_verified?: boolean;
}