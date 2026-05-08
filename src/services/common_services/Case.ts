import { supabaseClient } from '../supabase';   

export const getAllCases = async () => {
  try {
    const { data, status, statusText } = await supabaseClient.get('/case', {
      params: {
        select: '*',

        isReplied: 'eq.false',

        order: 'timestamp.desc',
      },
      headers: {
      },
    });

    console.log('Status:', status, statusText);
    console.log('Fetched cases:', data);
    console.log('Data status:', data.status);

    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error('Error fetching cases:', error.response?.data || error.message);
    console.error('Full error:', error);
    throw error;
  }
};