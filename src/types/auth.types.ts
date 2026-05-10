export type UserRole = 'patient' | 'doctor';
export type DoctorStatus = 'pending' | 'verified' | 'rejected';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  doctorStatus?: DoctorStatus;
}
export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  doctorStatus?: DoctorStatus;
}

export interface StoredTokens {
  accessToken: string;
  refreshToken: string;
}

export interface StoredUserMeta {
  id: string;
  email: string;
  role: UserRole;
}

export interface SupabaseAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
  };
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  error: string | null;

  setSession: (user: AuthUser, token: string) => void;
  setToken: (token: string) => void;
  clearSession: () => void;
  setLoading: (val: boolean) => void;
  setAuthenticating: (val: boolean) => void;
  setError: (msg: string | null) => void;
}
