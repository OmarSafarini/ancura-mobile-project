/**
 * @file PatientAuthScreen.test.tsx
 * Unit tests for src/features/patient/screens/PatientAuthScreen.tsx
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('@services/authService', () => ({
  signIn: jest.fn(),
  signUp: jest.fn(),
}));

jest.mock('@services/biometricService', () => ({
  checkBiometricSupport: jest.fn(),
  saveBiometricCredentials: jest.fn(),
  getBiometricCredentials: jest.fn(),
  promptBiometricAuth: jest.fn(),
}));

// Mock heavy UI components
jest.mock('@components/base/AppBackground', () => {
  const { View } = require('react-native');
  return ({ children }: any) => <View testID="app-background">{children}</View>;
});

jest.mock('@assets/icons/Logo', () => {
  const { View } = require('react-native');
  return ({ size }: any) => <View testID="logo" style={{ width: size, height: size }} />;
});

jest.mock('@utils/FadeInView', () => {
  const { View } = require('react-native');
  return ({ children, style }: any) => <View style={style}>{children}</View>;
});

jest.mock('@components/common/AuthToggle', () => {
  const { TouchableOpacity, Text, View } = require('react-native');
  return ({ value, onChange }: any) => (
    <View testID="auth-toggle">
      <TouchableOpacity testID="toggle-signin" onPress={() => onChange('signin')}>
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity testID="toggle-signup" onPress={() => onChange('signup')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
});

jest.mock('@components/forms/InputFeild', () => {
  const { TextInput } = require('react-native');
  return ({ name, placeholder, secureTextEntry }: any) => (
    <TextInput
      testID={`input-${name}`}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
});

jest.mock('@components/forms/Dropdown', () => {
  const { View, Text } = require('react-native');
  return ({ name, label }: any) => (
    <View testID={`dropdown-${name}`}>
      <Text>{label}</Text>
    </View>
  );
});

jest.mock('@components/common/NormalButton', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress, loading, disabled }: any) => (
    <TouchableOpacity
      testID={`btn-${title?.replace(/\s+/g, '-').toLowerCase()}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('@utils/responsive', () => ({ scale: (n: number) => n }));
jest.mock('@utils/colors', () => ({
  Colors: { primary: '#0056D2', secondary: '#00A3A3', textDark: '#111', textGray: '#888' },
  palette: { lightGray: '#ccc' },
}));
jest.mock('@utils/typography', () => ({
  Family: { HV_Bold: 'HV_Bold', FG_Regular: 'FG_Regular', FG_MediumItalic: 'FG_MediumItalic' },
}));
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name }: any) => {
    const { View } = require('react-native');
    return <View testID={`icon-${name}`} />;
  },
}));

// ─── Imports (after mocks) ────────────────────────────────────────────────────

import PatientAuthScreen from '@features/patient/screens/PatientAuthScreen';
import { signIn, signUp } from '@services/authService';
import * as biometricService from '@services/biometricService';
import { useAuthStore } from '@store/authStore';

const mockedSignIn = signIn as jest.Mock;
const mockedSignUp = signUp as jest.Mock;
const mockedCheckBiometricSupport = biometricService.checkBiometricSupport as jest.Mock;
const mockedGetBiometricCredentials = biometricService.getBiometricCredentials as jest.Mock;
const mockedPromptBiometricAuth = biometricService.promptBiometricAuth as jest.Mock;

const mockNavigation = { navigate: jest.fn() };

const resetStore = () =>
  useAuthStore.setState({
    user: null,
    token: null,
    role: null,
    isLoading: false,
    isAuthenticating: false,
    error: null,
  });

const renderScreen = () => render(<PatientAuthScreen navigation={mockNavigation} />);

// ══════════════════════════════════════════════════════════════════════════════
// Tests
// ══════════════════════════════════════════════════════════════════════════════

describe('PatientAuthScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
    mockedCheckBiometricSupport.mockResolvedValue(false);
    mockedGetBiometricCredentials.mockResolvedValue(null);
  });

  it('TC-PAS-01 | renders in signin mode by default', async () => {
    const { getByTestId, queryByTestId } = renderScreen();
    await waitFor(() => {
      expect(getByTestId('btn-sign-in')).toBeTruthy();
      expect(getByTestId('input-email')).toBeTruthy();
      expect(getByTestId('input-password')).toBeTruthy();
      expect(queryByTestId('input-age')).toBeNull();
    });
  });

  it('TC-PAS-02 | switches to signup mode and shows extra fields', async () => {
    const { getByTestId } = renderScreen();
    
    await waitFor(() => getByTestId('toggle-signup'));
    fireEvent.press(getByTestId('toggle-signup'));

    await waitFor(() => {
      expect(getByTestId('input-age')).toBeTruthy();
      expect(getByTestId('dropdown-gender')).toBeTruthy();
      expect(getByTestId('btn-create-account')).toBeTruthy();
    });
  });

  it('TC-PAS-03 | calls signIn in signin mode', async () => {
    mockedSignIn.mockResolvedValueOnce(undefined);
    const { getByTestId } = renderScreen();

    await waitFor(() => getByTestId('btn-sign-in'));
    await act(async () => fireEvent.press(getByTestId('btn-sign-in')));

    await waitFor(() => expect(mockedSignIn).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'patient'));
  });

  it('TC-PAS-04 | calls signUp in signup mode', async () => {
    mockedSignUp.mockResolvedValueOnce(undefined);
    const { getByTestId } = renderScreen();

    await waitFor(() => getByTestId('toggle-signup'));
    fireEvent.press(getByTestId('toggle-signup'));

    await waitFor(() => getByTestId('btn-create-account'));
    await act(async () => fireEvent.press(getByTestId('btn-create-account')));

    await waitFor(() => expect(mockedSignUp).toHaveBeenCalledWith(expect.any(String), expect.any(String), 'patient', expect.any(Object)));
  });

  it('TC-PAS-05 | shows biometric button when creds available', async () => {
    mockedCheckBiometricSupport.mockResolvedValue(true);
    mockedGetBiometricCredentials.mockResolvedValue({ email: 'p@x.com', password: 'p' });

    const { getByTestId } = renderScreen();
    await waitFor(() => expect(getByTestId('icon-finger-print')).toBeTruthy());
  });

  it('TC-PAS-06 | handles biometric login success', async () => {
    mockedCheckBiometricSupport.mockResolvedValue(true);
    mockedGetBiometricCredentials.mockResolvedValue({ email: 'p@x.com', password: 'p' });
    mockedPromptBiometricAuth.mockResolvedValue(true);
    mockedSignIn.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('icon-finger-print'));
    await act(async () => fireEvent.press(getByTestId('icon-finger-print')));

    await waitFor(() => expect(mockedSignIn).toHaveBeenCalledWith('p@x.com', 'p', 'patient'));
  });

  it('TC-PAS-07 | displays error message from store', async () => {
    useAuthStore.setState({ error: 'Auth Failed' });
    const { getByText } = renderScreen();
    await waitFor(() => expect(getByText('Auth Failed')).toBeTruthy());
  });
});
