export type Gender = 'male' | 'female';

// Matches the `patient` table in the database
export interface IPatient {
  id: string;          // UUID — references auth.users(id)
  nickname: string;
  age?: number;
  gender?: Gender;
  created_at: string;
  // NOTE: password is managed by Supabase Auth, never stored here
}
