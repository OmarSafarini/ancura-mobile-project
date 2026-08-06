import type { CaseData } from "@/types/ICaseData";
import { addMockCase, updateMockCase, mockCases, delay, MOCK_PATIENT } from '../mockData';

export type CaseInput = {
  patient_id: string;
  title: string;
  description: string;
  file?: string | string[] | null;
  isEmergency?: boolean;
};

export const createCase = async (payload: CaseInput): Promise<CaseData> => {
  if (!payload.title || !payload.description) {
    throw new Error("Missing required fields");
  }

  try {
    const newCase = await addMockCase({
      ...payload,
      status: 'under_review',
    });
    return newCase;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create case");
  }
};

export const editCase = async (
  caseId: number,
  payload: Partial<CaseInput>
): Promise<CaseData> => {
  try {
    const updated = await updateMockCase(caseId, payload);
    return updated as CaseData;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update case");
  }
};

export const getCaseById = async (
  caseId: number
): Promise<CaseData> => {
  try {
    await delay();
    const caseData = mockCases.find(c => c.id === caseId);
    if (caseData) {
      return { ...caseData, patient: MOCK_PATIENT } as CaseData;
    }
    throw new Error("Case not found");
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch case files"
    );
  }
};