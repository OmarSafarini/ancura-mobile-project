import { supabaseClient } from '@/services/supabase';

export interface DoctorProfile {
  full_name: string;
  profilePic?: string | null;
}

export const getDoctorBasicInfo = async (id: string): Promise<DoctorProfile> => {
  try {
    console.log('Fetching doctor for id:', id);

    const { data, status } = await supabaseClient.get('/doctor', {
      params: {
        id: `eq.${id}`,  
        select: 'full_name,profilePic',
      },
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });
        return searchParams.toString();
      },
    });


    if (!data || data.length === 0) {
      throw new Error(`Doctor not found for id: ${id}`);
    }

    const doctor = data[0];
    console.log("DOCTOR DATA:", doctor);
console.log("PROFILE PIC URL:", doctor.profilePic);

    return {
      full_name: doctor.full_name || 'Doctor',
      profilePic: doctor.profilePic || null,
    };

  } catch (error: any) {
    console.error('Failed to get doctor info:', error.message);
    if (error.response?.data) console.error('Response Data:', error.response.data);

    return {
      full_name: 'Doctor',
      profilePic: null,
    };
  }
};