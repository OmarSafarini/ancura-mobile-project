import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});

supabaseClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

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

supabaseClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.log("Unauthorized - token expired or missing");
      //need to be modified
     //if unAuthrized should log out 
    }

    if (status === 403) {
      console.log("Forbidden - no permission");
    }

    if (status >= 500) {
      console.log("Server error");
    }

    return Promise.reject(error);
  }
);