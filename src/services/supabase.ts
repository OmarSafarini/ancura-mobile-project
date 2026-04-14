import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});

supabaseClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token ?? SUPABASE_ANON_KEY}`;
  return config;
});

supabaseClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refresh_token');
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(
          `${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
          { refresh_token: refreshToken },
          { headers: { apikey: SUPABASE_ANON_KEY } }
        );

        await AsyncStorage.setItem('access_token', data.access_token);
        await AsyncStorage.setItem('refresh_token', data.refresh_token);

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        return supabaseClient(originalRequest);

      } catch (refreshError) {
        await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'doctor_id']);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const getSupabaseSession = async () => {
  const doctorId = await AsyncStorage.getItem('doctor_id');
  if (!doctorId) throw new Error('No session found');
  return { id: doctorId };
};