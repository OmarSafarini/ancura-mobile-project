import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StoredTokens, StoredUserMeta } from '../types/auth.types';

// ─── Keys ─────────────────────────────────────────────────────────
const SECURE_KEYS = {
  ACCESS_TOKEN: 'ancura_access_token',
  REFRESH_TOKEN: 'ancura_refresh_token',
} as const;

const ASYNC_KEYS = {
  USER_META: 'ancura_user_meta',
} as const;



// ─── SecureStore: Tokens (Sensitive) ─────────────────────────────
// Keychain (iOS) / Keystore (Android)
export async function saveTokens(tokens: StoredTokens): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(SECURE_KEYS.ACCESS_TOKEN, tokens.accessToken),
    SecureStore.setItemAsync(SECURE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
  ]);
}


export async function getAccessToken(): Promise<string | null> {
  return SecureStore.getItemAsync(SECURE_KEYS.ACCESS_TOKEN);
}


export async function getRefreshToken(): Promise<string | null> {
  return SecureStore.getItemAsync(SECURE_KEYS.REFRESH_TOKEN);
}


export async function clearTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(SECURE_KEYS.ACCESS_TOKEN),
    SecureStore.deleteItemAsync(SECURE_KEYS.REFRESH_TOKEN),
  ]);
}




// ─── AsyncStorage: User Meta (Non-Sensitive) ──────────────────────
export async function saveUserMeta(meta: StoredUserMeta): Promise<void> {
  await AsyncStorage.setItem(ASYNC_KEYS.USER_META, JSON.stringify(meta));
}


export async function getUserMeta(): Promise<StoredUserMeta | null> {
  const raw = await AsyncStorage.getItem(ASYNC_KEYS.USER_META);
  if (!raw) return null;
  return JSON.parse(raw) as StoredUserMeta;
}


export async function clearUserMeta(): Promise<void> {
  await AsyncStorage.removeItem(ASYNC_KEYS.USER_META);
}





// ─── Logout ────────────────────────────────────────────────────
export async function clearAllAuthData(): Promise<void> {
  await Promise.all([clearTokens(), clearUserMeta()]);
}
