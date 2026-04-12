import axios from 'axios';

const SUPABASE_URL = 'https://gpadeeifohsdoznbcgpr.supabase.co'; // this should be in the env
const SUPABASE_ANON_KEY = 'sb_publishable_sREom59JX0RaoZe52_4VUQ_48ux9gs8'; // this should be in the env

export const supabaseApi = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`, 
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
});