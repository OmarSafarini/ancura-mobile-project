import axios from "axios";
import { supabaseClient } from "./supabase";
import { setRealtimeToken } from "./realtimeClient";
import {
  saveTokens,
  saveUserMeta,
  getUserMeta,
  clearAllAuthData,
  getAccessToken,
} from "./tokenService";
import { useAuthStore } from "../store/authStore";
import {
  AuthUser,
  DoctorStatus,
  SupabaseAuthResponse,
  UserRole,
} from "../types/auth.types";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

/**
   @param email    
   @param password 
   @param role     
 */

export async function signIn(
  email: string,
  password: string,
  role: UserRole,
): Promise<void> {
  const { setSession, setAuthenticating, setError, clearSession } =
    useAuthStore.getState();

  setAuthenticating(true);
  setError(null);

  try {
    // Web Mock: Bypass real authentication
    await new Promise(resolve => setTimeout(resolve, 800));
    const authUser: AuthUser = {
      id: role === 'patient' ? 'patient_1' : 'doctor_1',
      email: email,
      role,
      verify_status: 'approved',
    };
    
    await saveTokens({ accessToken: "fake-jwt-token-123", refreshToken: "fake-refresh-token" });
    await saveUserMeta({ id: authUser.id, email: authUser.email, role: authUser.role, verify_status: authUser.verify_status } as any);

    // Set a fake access token
    setSession(authUser, "fake-jwt-token-123");
  } catch (err: any) {
    clearSession();
    setError("Mock login failed");
    throw err;
  }
}

/**
   @param email 
   @param password 
   @param role 
   @param meta 
 */

export async function signUp(
  email: string,
  password: string,
  role: UserRole,
  meta: any = {},
): Promise<void> {
  const { setSession, setAuthenticating, setError, clearSession } =
    useAuthStore.getState();

  setAuthenticating(true);
  setError(null);

  try {
    // Web Mock: Bypass real authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Set a fake session and user for mock purposes
    const authUser: AuthUser = {
      id: role === 'patient' ? 'patient_1' : 'doctor_1',
      email: email,
      role,
      verify_status: 'approved',
    };
    
    await saveTokens({ accessToken: "fake-jwt-token-new", refreshToken: "fake-refresh-token" });
    await saveUserMeta({ id: authUser.id, email: authUser.email, role: authUser.role, verify_status: authUser.verify_status } as any);

    setSession(authUser, "fake-jwt-token-new");
    return;
  } catch (err: any) {
    console.error("Supabase API Error Data:", err?.response?.data);

    const message =
      err?.response?.data?.msg ??
      err?.response?.data?.error_description ??
      err?.message ??
      "An error occurred while creating the account. Please check the data.";
    setError(message);
    clearSession();
    throw err;
  }
}

export async function signOut(): Promise<void> {
  const { clearSession, setAuthenticating } = useAuthStore.getState();
  setAuthenticating(true);

  try {
    // Web Mock: Bypass real authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch {
  } finally {
    await clearAllAuthData();
    clearSession();
  }
}

export async function restoreSession(): Promise<void> {
  const { setSession, clearSession } = useAuthStore.getState();

  try {
    const userMeta = await getUserMeta();
    if (!userMeta) {
      clearSession();
      return;
    }

    const accessToken = await getAccessToken();
    if (!accessToken) {
      await clearAllAuthData();
      clearSession();
      return;
    }

    const authUser: AuthUser = {
      id: userMeta.id,
      email: userMeta.email,
      role: userMeta.role,
    };

    setSession(authUser, accessToken);
    // Authenticate the Realtime WebSocket with the user's JWT
    await setRealtimeToken();
  } catch {
    await clearAllAuthData();
    clearSession();
  }
}

export async function resetPasswordForEmail(email: string): Promise<void> {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    // Web Mock: Bypass real authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
  } catch (error: any) {
    throw error;
  }
}

export async function verifyOTP(email: string, token: string): Promise<string> {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    // Web Mock: Bypass real authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    return "fake-recovery-token";
  } catch (error: any) {
    throw error;
  }
}

export async function updatePassword(
  email: string,
  newPassword: string,
  tempAccessToken: string,
): Promise<void> {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    // Web Mock: Bypass real authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    await signIn(email, newPassword, "doctor");
  } catch (error: any) {
    throw error;
  }
}
