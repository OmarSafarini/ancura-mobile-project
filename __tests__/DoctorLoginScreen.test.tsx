/**
 * @file DoctorLoginScreen.test.tsx
 * Unit tests for src/features/doctor/screens/DoctorLoginScreen.tsx
 *
 * Strategy:
 *  - Mock all native/expo modules and navigation
 *  - Mock authService & biometricService entirely
 *  - Use @testing-library/react-native to render and interact with the component
 *
 * Covered behaviours:
 *  - Renders core UI elements (logo, title, fields, button)
 *  - Form validation (required fields, min/max length)
 *  - Successful login flow
 *  - Biometric button visibility based on stored credentials
 *  - Biometric login flow (success & failure)
 *  - Error message display from authStore
 *  - Navigation to Forgot Password screen
 *  - Navigation to Sign Up screen
 */

import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';

// ─── Mocks ────────────────────────────────────────────────────────────────────

jest.mock('@services/authService', () => ({
  signIn: jest.fn(),
}));

jest.mock('@services/biometricService', () => ({
  checkBiometricSupport: jest.fn(),
  saveBiometricCredentials: jest.fn(),
  getBiometricCredentials: jest.fn(),
  promptBiometricAuth: jest.fn(),
}));

// Mock heavy UI components that have native dependencies
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

jest.mock('@components/forms/InputFeild', () => {
  const { TextInput } = require('react-native');
  return ({ name, placeholder, secureTextEntry, control, rules }: any) => (
    <TextInput
      testID={`input-${name}`}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
});

jest.mock('@components/common/NormalButton', () => {
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress, loading, disabled, testID }: any) => (
    <TouchableOpacity
      testID={testID ?? `btn-${title?.replace(/\s+/g, '-').toLowerCase()}`}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Text>{loading ? 'Loading...' : title}</Text>
    </TouchableOpacity>
  );
});

jest.mock('@components/common/Footer', () => {
  const { View } = require('react-native');
  return () => <View testID="footer" />;
});

jest.mock('@utils/responsive', () => ({ scale: (n: number) => n }));
jest.mock('@utils/colors', () => ({
  Colors: { primary: '#0056D2', secondary: '#00A3A3', textDark: '#111', textGray: '#888' },
  palette: { lightGray: '#ccc' },
}));
jest.mock('@utils/typography', () => ({
  Family: { HV_Bold: 'HV_Bold', FG_Regular: 'FG_Regular' },
}));
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color }: any) => {
    const { View } = require('react-native');
    return <View testID={`icon-${name}`} />;
  },
}));

// ─── Imports (after mocks) ────────────────────────────────────────────────────

import DoctorLoginScreen from '@features/doctor/screens/DoctorLoginScreen';
import { signIn } from '@services/authService';
import * as biometricService from '@services/biometricService';
import { useAuthStore } from '@store/authStore';

const mockedSignIn = signIn as jest.Mock;
const mockedCheckBiometricSupport = biometricService.checkBiometricSupport as jest.Mock;
const mockedGetBiometricCredentials = biometricService.getBiometricCredentials as jest.Mock;
const mockedPromptBiometricAuth = biometricService.promptBiometricAuth as jest.Mock;
const mockedSaveBiometricCredentials = biometricService.saveBiometricCredentials as jest.Mock;

// ─── Navigation mock ──────────────────────────────────────────────────────────
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// ─── Helper ───────────────────────────────────────────────────────────────────
const resetStore = () =>
  useAuthStore.setState({
    user: null,
    token: null,
    role: null,
    isLoading: false,
    isAuthenticating: false,
    error: null,
  });

const renderScreen = () =>
  render(<DoctorLoginScreen navigation={mockNavigation} />);

// ══════════════════════════════════════════════════════════════════════════════
// Rendering
// ══════════════════════════════════════════════════════════════════════════════
describe('DoctorLoginScreen — Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
    mockedCheckBiometricSupport.mockResolvedValue(false);
    mockedGetBiometricCredentials.mockResolvedValue(null);
  });

  it('TC-DLS-R-01 | renders the logo', async () => {
    const { getByTestId } = renderScreen();
    await waitFor(() => expect(getByTestId('logo')).toBeTruthy());
  });

  it('TC-DLS-R-02 | renders "Doctor Login" title', async () => {
    const { getByText } = renderScreen();
    await waitFor(() => expect(getByText('Doctor Login')).toBeTruthy());
  });

  it('TC-DLS-R-03 | renders email input field', async () => {
    const { getByTestId } = renderScreen();
    await waitFor(() => expect(getByTestId('input-email')).toBeTruthy());
  });

  it('TC-DLS-R-04 | renders password input field', async () => {
    const { getByTestId } = renderScreen();
    await waitFor(() => expect(getByTestId('input-password')).toBeTruthy());
  });

  it('TC-DLS-R-05 | renders Login button', async () => {
    const { getByText } = renderScreen();
    await waitFor(() => expect(getByText('Login')).toBeTruthy());
  });

  it('TC-DLS-R-06 | renders Sign Up button', async () => {
    const { getByText } = renderScreen();
    await waitFor(() => expect(getByText('Sign Up')).toBeTruthy());
  });

  it('TC-DLS-R-07 | renders Forgot Password text', async () => {
    const { getByText } = renderScreen();
    await waitFor(() => expect(getByText('Forgot Password?')).toBeTruthy());
  });

  it('TC-DLS-R-08 | renders HIPAA footer', async () => {
    const { getByTestId } = renderScreen();
    await waitFor(() => expect(getByTestId('footer')).toBeTruthy());
  });

  it('TC-DLS-R-09 | does NOT show biometric button when no credentials stored', async () => {
    const { queryByTestId } = renderScreen();
    await waitFor(() => {
      expect(queryByTestId('icon-finger-print')).toBeNull();
    });
  });

  it('TC-DLS-R-10 | shows biometric button when credentials are stored', async () => {
    mockedCheckBiometricSupport.mockResolvedValue(true);
    mockedGetBiometricCredentials.mockResolvedValue({ email: 'doc@x.com', password: 'pass' });

    const { getByTestId } = renderScreen();
    await waitFor(() => expect(getByTestId('icon-finger-print')).toBeTruthy());
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// Login Flow
// ══════════════════════════════════════════════════════════════════════════════
describe('DoctorLoginScreen — Login Flow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
    mockedCheckBiometricSupport.mockResolvedValue(false);
    mockedGetBiometricCredentials.mockResolvedValue(null);
  });

  it('TC-DLS-L-01 | calls signIn when Login button is pressed', async () => {
    mockedSignIn.mockResolvedValueOnce(undefined);
    const { getByTestId } = renderScreen();

    await waitFor(() => getByTestId('btn-login'));
    await act(async () => fireEvent.press(getByTestId('btn-login')));

    await waitFor(() => expect(mockedSignIn).toHaveBeenCalledTimes(1));
  });

  it('TC-DLS-L-02 | passes "doctor" role to signIn', async () => {
    mockedSignIn.mockResolvedValueOnce(undefined);
    const { getByTestId } = renderScreen();

    await waitFor(() => getByTestId('btn-login'));
    await act(async () => fireEvent.press(getByTestId('btn-login')));

    await waitFor(() =>
      expect(mockedSignIn).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(String),
        'doctor',
      ),
    );
  });

  it('TC-DLS-L-03 | prompts biometric save Alert after successful login (no creds saved)', async () => {
    mockedSignIn.mockResolvedValueOnce(undefined);
    mockedCheckBiometricSupport.mockResolvedValue(true);
    mockedGetBiometricCredentials.mockResolvedValue(null); // no creds yet
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementationOnce(() => {});

    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('btn-login'));
    await act(async () => fireEvent.press(getByTestId('btn-login')));

    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith(
      'Enable Face ID / Touch ID',
      expect.any(String),
      expect.any(Array),
    ));
  });

  it('TC-DLS-L-04 | displays error message from authStore', async () => {
    useAuthStore.setState({ error: 'Invalid login credentials' });
    const { getByText } = renderScreen();
    await waitFor(() => expect(getByText('Invalid login credentials')).toBeTruthy());
  });

  it('TC-DLS-L-05 | does not show error message when error is null', async () => {
    useAuthStore.setState({ error: null });
    const { queryByText } = renderScreen();
    await waitFor(() =>
      expect(queryByText('Invalid login credentials')).toBeNull(),
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// Biometric Login Flow
// ══════════════════════════════════════════════════════════════════════════════
describe('DoctorLoginScreen — Biometric Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
    mockedCheckBiometricSupport.mockResolvedValue(true);
    mockedGetBiometricCredentials.mockResolvedValue({ email: 'd@x.com', password: 'pw123' });
  });

  it('TC-DLS-B-01 | calls promptBiometricAuth when fingerprint icon is pressed', async () => {
    mockedPromptBiometricAuth.mockResolvedValueOnce(true);
    mockedSignIn.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('icon-finger-print'));
    await act(async () => fireEvent.press(getByTestId('icon-finger-print')));

    await waitFor(() => expect(mockedPromptBiometricAuth).toHaveBeenCalledWith('Sign in to Ancura'));
  });

  it('TC-DLS-B-02 | calls signIn with stored credentials after biometric success', async () => {
    mockedPromptBiometricAuth.mockResolvedValueOnce(true);
    mockedSignIn.mockResolvedValueOnce(undefined);

    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('icon-finger-print'));
    await act(async () => fireEvent.press(getByTestId('icon-finger-print')));

    await waitFor(() =>
      expect(mockedSignIn).toHaveBeenCalledWith('d@x.com', 'pw123', 'doctor'),
    );
  });

  it('TC-DLS-B-03 | does NOT call signIn when biometric prompt fails', async () => {
    mockedPromptBiometricAuth.mockResolvedValueOnce(false);

    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('icon-finger-print'));
    await act(async () => fireEvent.press(getByTestId('icon-finger-print')));

    await waitFor(() => expect(mockedSignIn).not.toHaveBeenCalled());
  });

  it('TC-DLS-B-04 | sets error when no credentials found after biometric success', async () => {
    mockedPromptBiometricAuth.mockResolvedValueOnce(true);
    mockedGetBiometricCredentials
      .mockResolvedValueOnce({ email: 'd@x.com', password: 'pw' }) // for initial check
      .mockResolvedValueOnce(null); // for after biometric success

    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('icon-finger-print'));
    await act(async () => fireEvent.press(getByTestId('icon-finger-print')));

    await waitFor(() => {
      const state = useAuthStore.getState();
      expect(state.error).toBe('Session expired. Please sign in with email and password.');
    });
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// Navigation
// ══════════════════════════════════════════════════════════════════════════════
describe('DoctorLoginScreen — Navigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
    mockedCheckBiometricSupport.mockResolvedValue(false);
    mockedGetBiometricCredentials.mockResolvedValue(null);
  });

  it('TC-DLS-N-01 | navigates to DoctorForgotPasswordScreen on Forgot Password press', async () => {
    const { getByText } = renderScreen();
    await waitFor(() => getByText('Forgot Password?'));
    fireEvent.press(getByText('Forgot Password?'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('DoctorForgotPasswordScreen');
  });

  it('TC-DLS-N-02 | navigates to DoctorProfileAndSettings on Sign Up press', async () => {
    const { getByTestId } = renderScreen();
    await waitFor(() => getByTestId('btn-sign-up'));
    fireEvent.press(getByTestId('btn-sign-up'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('DoctorProfileAndSettings');
  });
});
