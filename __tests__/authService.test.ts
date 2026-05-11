/**
 * @file authService.test.ts
 * Unit tests for src/services/authService.ts
 *
 * Covered functions:
 *  - signIn
 *  - signUp
 *  - signOut
 *  - restoreSession
 *  - resetPasswordForEmail
 *  - verifyOTP
 *  - updatePassword
 */

import axios from 'axios';
import {
  signIn,
  signUp,
  signOut,
  restoreSession,
  resetPasswordForEmail,
  verifyOTP,
  updatePassword,
} from '@services/authService';
import { useAuthStore } from '@store/authStore';
import * as tokenService from '@services/tokenService';
import { supabaseClient } from '@services/supabase';

// ─── Module-level mocks ────────────────────────────────────────────────────
jest.mock('axios');
jest.mock('@services/supabase', () => ({
  supabaseClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));
jest.mock('@services/tokenService', () => ({
  saveTokens: jest.fn(),
  saveUserMeta: jest.fn(),
  getUserMeta: jest.fn(),
  clearAllAuthData: jest.fn(),
  getAccessToken: jest.fn(),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSupabase = supabaseClient as jest.Mocked<typeof supabaseClient>;
const mockedTokenService = tokenService as jest.Mocked<typeof tokenService>;

// ─── Helpers ───────────────────────────────────────────────────────────────
const FAKE_AUTH_RESPONSE = {
  access_token: 'fake-access-token',
  refresh_token: 'fake-refresh-token',
  token_type: 'bearer',
  expires_in: 3600,
  user: { id: 'user-uuid-123', email: 'test@example.com' },
};

const resetStore = () => {
  useAuthStore.setState({
    user: null,
    token: null,
    role: null,
    isLoading: true,
    isAuthenticating: false,
    error: null,
  });
};

// ══════════════════════════════════════════════════════════════════════════════
// signIn
// ══════════════════════════════════════════════════════════════════════════════
describe('signIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  it('TC-SI-01 | successfully signs in a patient and sets session', async () => {
    // Arrange
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({
      data: [{ id: 'user-uuid-123', status: null }],
    });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    // Act
    await signIn('test@example.com', 'password123', 'patient');

    // Assert
    const state = useAuthStore.getState();
    expect(state.user).toMatchObject({
      id: 'user-uuid-123',
      email: 'test@example.com',
      role: 'patient',
    });
    expect(state.token).toBe('fake-access-token');
    expect(state.isAuthenticating).toBe(false);
    expect(state.error).toBeNull();
  });

  it('TC-SI-02 | successfully signs in a doctor and attaches doctorStatus', async () => {
    // Arrange
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({
      data: [{ id: 'user-uuid-123', status: 'verified' }],
    });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    // Act
    await signIn('doctor@example.com', 'password123', 'doctor');

    // Assert
    const state = useAuthStore.getState();
    expect(state.user?.role).toBe('doctor');
    expect(state.user?.doctorStatus).toBe('verified');
  });

  it('TC-SI-03 | throws error if patient profile is not found (wrong role)', async () => {
    // Arrange — profile table returns empty rows
    mockedAxios.post
      .mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE }) // auth endpoint
      .mockResolvedValueOnce({ data: {} });                 // logout endpoint (cleanup)
    mockedSupabase.get.mockResolvedValueOnce({ data: [] }); // no profile rows
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    // Act & Assert
    await expect(signIn('doctor@example.com', 'password123', 'patient')).rejects.toThrow(
      'This account is not registered as a patient',
    );

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
  });

  it('TC-SI-04 | throws error if doctor profile is not found (wrong role)', async () => {
    mockedAxios.post
      .mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE })
      .mockResolvedValueOnce({ data: {} });
    mockedSupabase.get.mockResolvedValueOnce({ data: [] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await expect(signIn('patient@example.com', 'password123', 'doctor')).rejects.toThrow(
      'This account is not registered as a doctor',
    );
  });

  it('TC-SI-05 | sets error in store when Supabase auth returns 400', async () => {
    // Arrange — axios throws with a Supabase-shaped error
    const supabaseError = {
      response: { data: { error_description: 'Invalid login credentials' } },
    };
    mockedAxios.post.mockRejectedValueOnce(supabaseError);

    // Act & Assert
    await expect(signIn('bad@example.com', 'wrong', 'patient')).rejects.toBeDefined();

    const state = useAuthStore.getState();
    expect(state.error).toBe('Invalid login credentials');
    expect(state.user).toBeNull();
  });

  it('TC-SI-06 | sets generic error when no error_description is present', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('Network Error'));

    await expect(signIn('bad@example.com', 'wrong', 'patient')).rejects.toThrow();
    expect(useAuthStore.getState().error).toBe('Network Error');
  });

  it('TC-SI-07 | calls saveTokens with correct access and refresh tokens', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({ data: [{ id: 'user-uuid-123' }] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signIn('test@example.com', 'password123', 'patient');

    expect(mockedTokenService.saveTokens).toHaveBeenCalledWith({
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
    });
  });

  it('TC-SI-08 | calls saveUserMeta with correct id, email and role', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({ data: [{ id: 'user-uuid-123' }] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signIn('test@example.com', 'password123', 'doctor');

    expect(mockedTokenService.saveUserMeta).toHaveBeenCalledWith({
      id: 'user-uuid-123',
      email: 'test@example.com',
      role: 'doctor',
    });
  });

  it('TC-SI-09 | queries the patient table when role is patient', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({ data: [{ id: 'user-uuid-123' }] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signIn('test@example.com', 'password123', 'patient');

    expect(mockedSupabase.get).toHaveBeenCalledWith(
      '/patient',
      expect.objectContaining({ params: expect.objectContaining({ id: 'eq.user-uuid-123' }) }),
    );
  });

  it('TC-SI-10 | queries the doctor table when role is doctor', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({ data: [{ id: 'user-uuid-123' }] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signIn('doc@example.com', 'password123', 'doctor');

    expect(mockedSupabase.get).toHaveBeenCalledWith(
      '/doctor',
      expect.anything(),
    );
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// signUp
// ══════════════════════════════════════════════════════════════════════════════
describe('signUp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  it('TC-SU-01 | successfully registers a patient and sets session', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.post.mockResolvedValueOnce({ data: {} });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signUp('new@example.com', 'password123', 'patient', { age: 25, gender: 'male' });

    const state = useAuthStore.getState();
    expect(state.user?.role).toBe('patient');
    expect(state.user?.email).toBe('test@example.com');
    expect(state.error).toBeNull();
  });

  it('TC-SU-02 | successfully registers a doctor and sets session', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.post.mockResolvedValueOnce({ data: {} });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signUp('doc@example.com', 'password123', 'doctor', {
      full_name: 'Dr. Smith',
      bio: 'Psychiatrist',
      location: 'Amman',
    });

    const state = useAuthStore.getState();
    expect(state.user?.role).toBe('doctor');
  });

  it('TC-SU-03 | inserts to /patient table for patient role', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.post.mockResolvedValueOnce({ data: {} });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signUp('p@example.com', 'password123', 'patient', { age: 22, gender: 'female' });

    expect(mockedSupabase.post).toHaveBeenCalledWith(
      '/patient',
      expect.objectContaining({ id: 'user-uuid-123', age: 22, gender: 'female' }),
      expect.anything(),
    );
  });

  it('TC-SU-04 | generated nickname for patient starts with USR-', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.post.mockResolvedValueOnce({ data: {} });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signUp('p@example.com', 'password123', 'patient', { age: 22, gender: 'male' });

    const callArgs = (mockedSupabase.post as jest.Mock).mock.calls[0][1];
    expect(callArgs.nickname).toMatch(/^USR-\d{6}$/);
  });

  it('TC-SU-05 | inserts to /doctor table for doctor role', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.post.mockResolvedValueOnce({ data: {} });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await signUp('doc@example.com', 'password123', 'doctor', { full_name: 'Dr. Ali' });

    expect(mockedSupabase.post).toHaveBeenCalledWith(
      '/doctor',
      expect.objectContaining({ id: 'user-uuid-123', full_name: 'Dr. Ali' }),
      expect.anything(),
    );
  });

  it('TC-SU-06 | throws and sets error if Supabase signup fails', async () => {
    const err = { response: { data: { error_description: 'Email already taken' } } };
    mockedAxios.post.mockRejectedValueOnce(err);

    try {
      await signUp('existing@example.com', 'password123', 'patient');
    } catch (caught) {
      expect(caught).toBe(err);
    }

    expect(useAuthStore.getState().error).toBe('Email already taken');
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('TC-SU-07 | throws if user or tokens are absent in response (email verification needed)', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        access_token: null,
        refresh_token: null,
        user: null,
        token_type: 'bearer',
        expires_in: 0,
      },
    });

    await expect(
      signUp('p@example.com', 'password123', 'patient'),
    ).rejects.toThrow('account created successfully, please verify your email');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// signOut
// ══════════════════════════════════════════════════════════════════════════════
describe('signOut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
    // Pre-populate a session
    useAuthStore.setState({
      user: { id: 'u1', email: 'a@b.com', role: 'patient' },
      token: 'some-token',
      role: 'patient',
    });
  });

  it('TC-SO-01 | clears session in store after signOut', async () => {
    mockedTokenService.getAccessToken.mockResolvedValueOnce('some-token');
    mockedAxios.post.mockResolvedValueOnce({});
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await signOut();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.role).toBeNull();
  });

  it('TC-SO-02 | calls Supabase /auth/v1/logout with the bearer token', async () => {
    mockedTokenService.getAccessToken.mockResolvedValueOnce('my-access-token');
    mockedAxios.post.mockResolvedValueOnce({});
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await signOut();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/auth/v1/logout'),
      {},
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer my-access-token' }),
      }),
    );
  });

  it('TC-SO-03 | still clears session even if logout API call throws', async () => {
    mockedTokenService.getAccessToken.mockResolvedValueOnce('token');
    mockedAxios.post.mockRejectedValueOnce(new Error('Network failure'));
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    // Should NOT throw
    await expect(signOut()).resolves.toBeUndefined();

    expect(useAuthStore.getState().user).toBeNull();
  });

  it('TC-SO-04 | skips logout API call when no token is stored', async () => {
    mockedTokenService.getAccessToken.mockResolvedValueOnce(null);
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await signOut();

    // axios.post should NOT have been called for logout
    expect(mockedAxios.post).not.toHaveBeenCalled();
  });

  it('TC-SO-05 | always calls clearAllAuthData regardless of API result', async () => {
    mockedTokenService.getAccessToken.mockResolvedValueOnce('token');
    mockedAxios.post.mockRejectedValueOnce(new Error('Fail'));
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await signOut();

    expect(mockedTokenService.clearAllAuthData).toHaveBeenCalledTimes(1);
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// restoreSession
// ══════════════════════════════════════════════════════════════════════════════
describe('restoreSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  it('TC-RS-01 | restores session from stored meta and token', async () => {
    mockedTokenService.getUserMeta.mockResolvedValueOnce({
      id: 'u1',
      email: 'restore@example.com',
      role: 'patient',
    });
    mockedTokenService.getAccessToken.mockResolvedValueOnce('restored-token');

    await restoreSession();

    const state = useAuthStore.getState();
    expect(state.user).toMatchObject({
      id: 'u1',
      email: 'restore@example.com',
      role: 'patient',
    });
    expect(state.token).toBe('restored-token');
  });

  it('TC-RS-02 | clears session if userMeta is missing', async () => {
    mockedTokenService.getUserMeta.mockResolvedValueOnce(null);

    await restoreSession();

    expect(useAuthStore.getState().user).toBeNull();
  });

  it('TC-RS-03 | clears session and all auth data if token is missing', async () => {
    mockedTokenService.getUserMeta.mockResolvedValueOnce({
      id: 'u1',
      email: 'a@b.com',
      role: 'doctor',
    });
    mockedTokenService.getAccessToken.mockResolvedValueOnce(null);
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await restoreSession();

    expect(mockedTokenService.clearAllAuthData).toHaveBeenCalled();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('TC-RS-04 | clears auth data on unexpected error', async () => {
    mockedTokenService.getUserMeta.mockRejectedValueOnce(new Error('Storage error'));
    mockedTokenService.clearAllAuthData.mockResolvedValueOnce(undefined);

    await expect(restoreSession()).resolves.toBeUndefined();
    expect(useAuthStore.getState().user).toBeNull();
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// resetPasswordForEmail
// ══════════════════════════════════════════════════════════════════════════════
describe('resetPasswordForEmail', () => {
  beforeEach(() => jest.clearAllMocks());

  it('TC-RP-01 | calls POST /auth/v1/recover with the provided email', async () => {
    mockedAxios.post.mockResolvedValueOnce({});

    await resetPasswordForEmail('user@example.com');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/auth/v1/recover'),
      { email: 'user@example.com' },
      expect.anything(),
    );
  });

  it('TC-RP-02 | throws if the API call fails', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('API error'));

    await expect(resetPasswordForEmail('bad@example.com')).rejects.toThrow('API error');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// verifyOTP
// ══════════════════════════════════════════════════════════════════════════════
describe('verifyOTP', () => {
  beforeEach(() => jest.clearAllMocks());

  it('TC-OTP-01 | returns the access_token on success', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { ...FAKE_AUTH_RESPONSE },
    });

    const token = await verifyOTP('user@example.com', '123456');

    expect(token).toBe('fake-access-token');
  });

  it('TC-OTP-02 | calls /auth/v1/verify with type recovery', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });

    await verifyOTP('user@example.com', '654321');

    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining('/auth/v1/verify'),
      { type: 'recovery', email: 'user@example.com', token: '654321' },
      expect.anything(),
    );
  });

  it('TC-OTP-03 | throws if OTP is invalid', async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error('OTP expired'));

    await expect(verifyOTP('user@example.com', 'wrong-otp')).rejects.toThrow('OTP expired');
  });
});

// ══════════════════════════════════════════════════════════════════════════════
// updatePassword
// ══════════════════════════════════════════════════════════════════════════════
describe('updatePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetStore();
  });

  it('TC-UP-01 | calls PUT /auth/v1/user with new password and temp token', async () => {
    mockedAxios.put.mockResolvedValueOnce({});
    // signIn internal calls:
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({ data: [{ id: 'user-uuid-123', status: 'verified' }] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await updatePassword('doc@example.com', 'newPassword1', 'temp-token-abc');

    expect(mockedAxios.put).toHaveBeenCalledWith(
      expect.stringContaining('/auth/v1/user'),
      { password: 'newPassword1' },
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer temp-token-abc' }),
      }),
    );
  });

  it('TC-UP-02 | re-signs in as doctor after updating password', async () => {
    mockedAxios.put.mockResolvedValueOnce({});
    mockedAxios.post.mockResolvedValueOnce({ data: FAKE_AUTH_RESPONSE });
    mockedSupabase.get.mockResolvedValueOnce({ data: [{ id: 'user-uuid-123', status: 'verified' }] });
    mockedTokenService.saveTokens.mockResolvedValueOnce(undefined);
    mockedTokenService.saveUserMeta.mockResolvedValueOnce(undefined);

    await updatePassword('doc@example.com', 'newPassword1', 'temp-token-abc');

    const state = useAuthStore.getState();
    expect(state.user?.role).toBe('doctor');
    expect(state.token).toBe('fake-access-token');
  });

  it('TC-UP-03 | throws if PUT /auth/v1/user fails', async () => {
    mockedAxios.put.mockRejectedValueOnce(new Error('Update failed'));

    await expect(
      updatePassword('doc@example.com', 'newPassword1', 'bad-token'),
    ).rejects.toThrow('Update failed');
  });
});
