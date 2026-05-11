// ─── Expo SecureStore ──────────────────────────────────────────────────────
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(() => Promise.resolve()),
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

// ─── Expo LocalAuthentication ──────────────────────────────────────────────
jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(() => Promise.resolve(true)),
  isEnrolledAsync: jest.fn(() => Promise.resolve(true)),
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true })),
}));

// ─── AsyncStorage ─────────────────────────────────────────────────────────
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// ─── Platform ─────────────────────────────────────────────────────────────
// jest-expo should handle Platform.OS. If not, we can mock it here:
// But let's try WITHOUT a custom Platform mock first to see if jest-expo kicks in.
// If it fails, we will mock it in the test file itself for more control.
