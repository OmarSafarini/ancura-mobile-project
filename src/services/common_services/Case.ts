import { CaseData } from '@/types/ICaseData';
import { mockCases, delay, deleteMockCase, updateMockCase } from '../mockData';

export const getAllCases = async () => {
  try {
    await delay();
    return mockCases as any[];
  } catch (error: any) {
    console.error('Error fetching cases:', error.message);
    throw error;
  }
};

export const deleteCase = async (caseId: string | number): Promise<void> => {
  try {
    const id = typeof caseId === 'string' ? parseInt(caseId) : caseId;
    await deleteMockCase(id);
  } catch (error: any) {
    console.error('Error deleting case:', error.message);
    throw error;
  }
};

export const updateCaseStatus = async (
  caseId: string | number,
  newStatus: "under_review" | "doctor_replied" | "resolved"
): Promise<void> => {
  try {
    const id = typeof caseId === 'string' ? parseInt(caseId) : caseId;
    await updateMockCase(id, {
      status: newStatus,
      isReplied: newStatus === "doctor_replied" ? true : undefined,
    });
  } catch (error: any) {
    console.error("Error updating case status:", error.message);
    throw error;
  }
};