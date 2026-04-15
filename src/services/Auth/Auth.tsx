import { supabaseClient } from '@/services/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const doctorLogin = async (email: string, password: string) => {
  const response = await supabaseClient.post(
    '/auth/v1/token?grant_type=password',
    { email, password },
    {
      baseURL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    }
  );

  const { access_token, refresh_token, user } = response.data;

  await AsyncStorage.setItem('access_token', access_token);
  await AsyncStorage.setItem('refresh_token', refresh_token);
  await AsyncStorage.setItem('doctor_id', user.id);

  return { access_token, user };
};

export const getDoctorToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('access_token');
};

export const getDoctorId = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('doctor_id');
};