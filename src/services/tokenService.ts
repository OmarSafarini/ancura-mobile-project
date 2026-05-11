import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
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
// Keychain (iOS) / Keystore (Android) / AsyncStorage (Web fallback)
export async function saveTokens(tokens: StoredTokens): Promise<void> {
  if (Platform.OS === 'web') {
    await Promise.all([
      AsyncStorage.setItem(SECURE_KEYS.ACCESS_TOKEN, tokens.accessToken),
      AsyncStorage.setItem(SECURE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
    ]);
  } else {
    await Promise.all([
      SecureStore.setItemAsync(SECURE_KEYS.ACCESS_TOKEN, tokens.accessToken),
      SecureStore.setItemAsync(SECURE_KEYS.REFRESH_TOKEN, tokens.refreshToken),
    ]);
  }
}

export async function getAccessToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return AsyncStorage.getItem(SECURE_KEYS.ACCESS_TOKEN);
  }
  return SecureStore.getItemAsync(SECURE_KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  if (Platform.OS === 'web') {
    return AsyncStorage.getItem(SECURE_KEYS.REFRESH_TOKEN);
  }
  return SecureStore.getItemAsync(SECURE_KEYS.REFRESH_TOKEN);
}

export async function clearTokens(): Promise<void> {
  if (Platform.OS === 'web') {
    await Promise.all([
      AsyncStorage.removeItem(SECURE_KEYS.ACCESS_TOKEN),
      AsyncStorage.removeItem(SECURE_KEYS.REFRESH_TOKEN),
    ]);
  } else {
    await Promise.all([
      SecureStore.deleteItemAsync(SECURE_KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(SECURE_KEYS.REFRESH_TOKEN),
    ]);
  }
}

// ─── AsyncStorage: User metadata (Non-sensitive) ─────────────────
export async function saveUserMeta(meta: StoredUserMeta): Promise<void> {
  await AsyncStorage.setItem(ASYNC_KEYS.USER_META, JSON.stringify(meta));
}

export async function getUserMeta(): Promise<StoredUserMeta | null> {
  const rawMeta = await AsyncStorage.getItem(ASYNC_KEYS.USER_META);
  if (!rawMeta) return null;

  try {
    return JSON.parse(rawMeta) as StoredUserMeta;
  } catch {
    return null;
  }
}

export async function clearUserMeta(): Promise<void> {
  await AsyncStorage.removeItem(ASYNC_KEYS.USER_META);
}




// ─── Logout ────────────────────────────────────────────────────
export async function clearAllAuthData(): Promise<void> {
  await Promise.all([clearTokens(), clearUserMeta()]);
}