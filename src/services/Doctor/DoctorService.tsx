import { CaseData } from '@/types/ICaseData';
import { IDoctor } from '@/types/IDoctor';
import { mockCases, delay, MOCK_DOCTOR } from '../mockData';

export const getAllCases = async (): Promise<CaseData[]> => {
  try {
    await delay();
    return mockCases as any[];
  } catch (error) {
    console.error("getAllCasesDoctor ERROR:", error);
    throw error; 
  }
};

export const getDoctorProfile = async (doctorId: string): Promise<IDoctor> => {
  try {
    await delay();
    return MOCK_DOCTOR;
  } catch (error) {
    console.error("getDoctorProfile ERROR:", error);
    throw error; 
  }
};

export const getDoctorLicense = async (doctorId: string) => {
  try {
    await delay();
    return { id: 1, doctor_id: doctorId, license_number: 'MOCK-LIC-1234' };
  } catch (error) {
    console.error("getDoctorLicense ERROR:", error);
    throw error; 
  }
};
