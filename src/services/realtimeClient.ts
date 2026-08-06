import { createClient } from '@supabase/supabase-js';
import { getAccessToken } from './tokenService';

// Read directly from env to avoid a circular dependency with supabase.ts
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';

/**
 * Supabase JS client — used ONLY for Realtime subscriptions.
 * All REST calls still go through the Axios client in supabase.ts.
 *
 * We pass a custom `accessToken` getter so the WS connection always uses
 * the latest JWT (even after a token refresh).
 */
export const supabaseRealtime = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // We manage auth ourselves via Axios + tokenService, so disable
    // supabase-js's own auth persistence to avoid conflicts.
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    // Inject the current JWT into every realtime request header
    fetch: async (url, options = {}) => {
      const token = await getAccessToken();
      const headers = new Headers((options as RequestInit).headers);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return fetch(url, { ...(options as RequestInit), headers });
    },
  },
});

/**
 * Update the realtime client's auth token.
 * Call this after a token refresh so existing subscriptions stay alive.
 */
export const setRealtimeToken = async () => {
  const token = await getAccessToken();
  if (token) {
    await supabaseRealtime.realtime.setAuth(token);
  }
};
