import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearAllAuthData } from './tokenService';
import { useAuthStore } from '../store/authStore';
import { SupabaseAuthResponse } from '../types/auth.types';

export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// ─── Axios Instance ───────────────────────────────────────────────

export const supabaseClient: AxiosInstance = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});

// ─── Request Interceptor ──────────────────────────────────────────

supabaseClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await getAccessToken(); 
      config.headers.Authorization = token
        ? `Bearer ${token}`
        : `Bearer ${SUPABASE_ANON_KEY}`;
      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor (Token Refresh Logic) ───────────────────

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null): void {
  failedQueue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token!);
    }
  });
  failedQueue = [];
}

supabaseClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 403) {
      console.log("Forbidden - no permission");
    }

    if (status >= 500) {
      console.log("Server error");
    }

    if (status === 401) {
      console.log("Unauthorized - token expired or missing");
      
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return supabaseClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const { data } = await axios.post<SupabaseAuthResponse>(
          `${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
          { refresh_token: refreshToken },
          { headers: { apikey: SUPABASE_ANON_KEY, 'Content-Type': 'application/json' } },
        );

        await saveTokens({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
        });

        useAuthStore.getState().setToken(data.access_token);
        processQueue(null, data.access_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return supabaseClient(originalRequest);

      } catch (refreshError) {
        await AsyncStorage.multiRemove(['access_token', 'refresh_token']);
        processQueue(refreshError, null);
        await clearAllAuthData();
        useAuthStore.getState().clearSession(); 
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const getSupabaseSession = async () => {
  const doctorId = useAuthStore.getState().session?.id;
  if (!doctorId) throw new Error('No session found');
  return { id: doctorId };
};
