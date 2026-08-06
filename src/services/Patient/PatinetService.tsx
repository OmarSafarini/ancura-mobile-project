import { CaseData } from '@/types/ICaseData';
import { mockCases, MOCK_PATIENT, delay, addMockCase } from '../mockData';

export const getPatintProfile = async (id: string) => {
  try {
    await delay();
    console.log("PATIENT RES MOCK:", MOCK_PATIENT);
    return MOCK_PATIENT;
  } catch (error) {
    console.error("getPatintProfile ERROR:", error);
    throw error; 
  }
};

export const getPatintPosts = async (patientId: string): Promise<CaseData[]> => {
  try {
    await delay();
    const patientCases = mockCases.filter(c => c.patient_id === patientId || patientId === MOCK_PATIENT.id);
    console.log("PATIENT Cases MOCK:", patientCases);
    return patientCases as any[];
  } catch (error) {
    console.error("getPatintCases ERROR:", error);
    throw error; 
  }
};

export const createCase = async (caseData: any) => {
  try {
    const newCase = await addMockCase({
      ...caseData,
      patient_id: MOCK_PATIENT.id,
      status: 'under_review'
    });
    return newCase;
  } catch (error) {
    throw error;
  }
};
