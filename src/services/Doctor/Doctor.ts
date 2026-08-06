import { MOCK_DOCTOR, delay } from '../mockData';

export interface DoctorProfile {
  full_name: string;
  profilePic?: string | null;
}

export const getDoctorBasicInfo = async (id: string): Promise<DoctorProfile> => {
  try {
    await delay();
    return {
      full_name: MOCK_DOCTOR.full_name || 'Doctor',
      profilePic: MOCK_DOCTOR.profilePic || null,
    };
  } catch (error: any) {
    return {
      full_name: 'Doctor',
      profilePic: null,
    };
  }
};