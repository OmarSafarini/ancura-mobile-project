import { supabaseClient } from '@/services/supabase';

export interface DoctorProfile {
  fullname: string;
  avatar_url?: string | null;
}
export const getDoctorBasicInfo = async (id: string): Promise<DoctorProfile> => {
  try {
    const { data } = await supabaseClient.get('/doctor', {
      params: {
        id: `eq.${id}`,
        select: 'fullname',
      },
    });

    if (!data || data.length === 0) {
      throw new Error('Doctor not found');
    }

    return data[0];
  } catch (error) {
    console.error('Failed to get doctor info:', error);
    return {
      fullname: 'Doctor',
    };
  }
};