import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { UserRole } from '../types/auth.types';

const getBiometricKey = (role: UserRole) => `biometric_credentials_${role}`;

export async function checkBiometricSupport(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) return false;
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return isEnrolled;
  } catch {
    return false;
  }
}

export async function saveBiometricCredentials(email: string, password: string, role: UserRole): Promise<void> {
  const credentials = JSON.stringify({ email, password });
  await SecureStore.setItemAsync(getBiometricKey(role), credentials);
}

export async function getBiometricCredentials(role: UserRole): Promise<{ email: string; password: string } | null> {
  try {
    const data = await SecureStore.getItemAsync(getBiometricKey(role));
    if (data) return JSON.parse(data);
    return null;
  } catch {
    return null;
  }
}

export async function clearBiometricCredentials(role: UserRole): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(getBiometricKey(role));
  } catch {}
}

/**
 * Prompts Face ID, Touch ID, or device PIN as fallback.
 * Returns true if any of them succeeds.
 */
export async function promptBiometricAuth(promptMessage: string = 'Sign in to Ancura'): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      cancelLabel: 'Cancel',
      disableDeviceFallback: false, // Allow Face ID → PIN fallback
      fallbackLabel: 'Use Passcode',
    });
    return result.success;
  } catch {
    return false;
  }
}
