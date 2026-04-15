import axios from 'axios';

const SUPABASE_URL = "https://gpadeeifohsdoznbcgpr.supabase.co";
const SUPABASE_ANON_KEY = 'sb_publishable_sREom59JX0RaoZe52_4VUQ_48ux9gs8';

export const supabaseClient = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});