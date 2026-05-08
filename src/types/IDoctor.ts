import { ImageSourcePropType } from "react-native";
import { ILicense } from "./ILicense";

// Matches the `doctor` table in the database
export interface IDoctor {
  id: string;          // UUID — references auth.users(id)
  full_name: string;           // was: name (matched SQL FullName)
  email: string;
  bio?: string;
  points: number;              // was: reputation
  location?: string;           // was: Location
  created_at: string;
  license?: ILicense;
  // UI-only fields (not in DB — fetched from joined queries or calculated)
  profilePic?: string;
  years_exp?: number;          // from license.years_exp
  comments_count?: number;     // aggregated stat
}