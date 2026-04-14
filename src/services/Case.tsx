import { supabaseClient } from './supabase';   // اللي فيه axios

export const getAllCases = async () => {
  try {
    const { data, status, statusText } = await supabaseClient.get('/post', {
      params: {
        // الصيغة الصحيحة للـ select + join
        select: '*',

        // الفلتر
        isreplied: 'eq.false',

        // الترتيب (desc = الأحدث أولاً)
        order: 'timestamp.desc',
      },
      headers: {
        // مهم: لو عايز تفعل RLS مع الـ user الحالي
        // Authorization: `Bearer ${userAccessToken}`   ← لو عندك session
      },
    });

    console.log('✅ Status:', status, statusText);
    console.log('✅ Fetched cases:', data);

    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error('❌ Error fetching cases:', error.response?.data || error.message);
    console.error('Full error:', error);
    throw error;
  }
};