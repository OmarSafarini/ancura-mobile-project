import axios from 'axios';
import { supabaseClient } from './supabase';
import { saveTokens, saveUserMeta, getUserMeta, clearAllAuthData, getAccessToken } from './tokenService';
import { useAuthStore } from '../store/authStore';
import { AuthUser, SupabaseAuthResponse, UserRole } from '../types/auth.types';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;


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
    const { data: authData } = await axios.post<SupabaseAuthResponse>(
      `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
      { email, password },
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    const { access_token, refresh_token, user } = authData;

    await saveTokens({
      accessToken: access_token,
      refreshToken: refresh_token,
    });

    const table = role === 'patient' ? 'patient' : 'doctor';

    const { data: profileRows } = await supabaseClient.get<{ id: string }[]>(
      `/${table}`,
      { params: { id: `eq.${user.id}`, select: 'id' } },
    );

    if (!profileRows || profileRows.length === 0) {
      await clearAllAuthData();
      await axios.post(
        `${SUPABASE_URL}/auth/v1/logout`,
        {},
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${access_token}` } },
      );
      throw new Error(
        role === 'patient'
          ? 'This account is not registered as a patient. Try logging in as a doctor.'
          : 'This account is not registered as a doctor. Try logging in as a patient.',
      );
    }

    await saveUserMeta({ id: user.id, email: user.email, role });

    const authUser: AuthUser = { id: user.id, email: user.email, role };
    setSession(authUser, access_token);

  } catch (err: any) {
    const message =
      err?.response?.data?.error_description ??
      err?.message ??
      'An unexpected error occurred. Please try again.';
    clearSession();
    setError(message);
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
  meta: any = {}
): Promise<void> {
  const { setSession, setAuthenticating, setError, clearSession } =
    useAuthStore.getState();

  setAuthenticating(true);
  setError(null);

  try {
    const { data: authData } = await axios.post<SupabaseAuthResponse>(
      `${SUPABASE_URL}/auth/v1/signup`,
      { email, password },
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    const { access_token, refresh_token, user } = authData;

    if (!user || (!access_token && !refresh_token)) {
      throw new Error('account created successfully, please verify your email');
    }

    await saveTokens({
      accessToken: access_token,
      refreshToken: refresh_token,
    });

    if (role === 'patient') {
      const generatedNickname = `USR-${Math.floor(100000 + Math.random() * 900000)}`;

      await supabaseClient.post(
        '/patient',
        {
          id: user.id,
          nickname: generatedNickname,
          age: meta.age,
          gender: meta.gender, 
        },
        { headers: { Prefer: 'return=minimal' } } 
      );
    } else {
      await supabaseClient.post(
        '/doctor',
        {
          id: user.id,
          email: user.email,
          FullName: meta.full_name || 'Dr. New User',
          points: 0,
        },
        { headers: { Prefer: 'return=minimal' } }
      );
    }

    await saveUserMeta({ id: user.id, email: user.email, role });

    const authUser: AuthUser = { id: user.id, email: user.email, role };
    setSession(authUser, access_token);

  } catch (err: any) {
    console.error("Supabase API Error Data:", err?.response?.data);
    
    const message =
      err?.response?.data?.msg ??
      err?.response?.data?.error_description ??
      err?.message ??
      'An error occurred while creating the account. Please check the data.';
    setError(message);
    clearSession();
    throw err;
  }
}



export async function signOut(): Promise<void> {
  const { clearSession, setAuthenticating } = useAuthStore.getState();
  setAuthenticating(true);

  try {
    const token = await getAccessToken();
    if (token) {
      await axios.post(
        `${SUPABASE_URL}/auth/v1/logout`,
        {},
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${token}`,
          },
        },
      );
    }
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

  } catch {
    await clearAllAuthData();
    clearSession();
  }
}


export async function resetPasswordForEmail(email: string): Promise<void> {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    await axios.post(
      `${SUPABASE_URL}/auth/v1/recover`,
      { email },
      { headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    throw error;
  }
}


export async function verifyOTP(email: string, token: string): Promise<string> {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    const { data } = await axios.post<SupabaseAuthResponse>(
      `${SUPABASE_URL}/auth/v1/verify`,
      { type: 'recovery', email, token },
      { headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' } }
    );

    return data.access_token;
  } catch (error: any) {
    throw error;
  }
}

export async function updatePassword(email: string, newPassword: string, tempAccessToken: string): Promise<void> {
  const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
  const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

  try {
    await axios.put(
      `${SUPABASE_URL}/auth/v1/user`,
      { password: newPassword },
      { 
        headers: { 
          apikey: SUPABASE_ANON_KEY, 
          Authorization: `Bearer ${tempAccessToken}`,
          'Content-Type': 'application/json' 
        } 
      }
    );

 
    await signIn(email, newPassword, 'doctor');
  } catch (error: any) {
    throw error;
  }
}
