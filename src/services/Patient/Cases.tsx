import { supabaseClient } from "../supabase";
import type { CaseData } from "@/types/ICaseData";


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
    const { data } = await supabaseClient.post("/case", payload, {
      headers: {
        Prefer: "return=representation",
      },
    });

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to create case");
  }
};

export const editCase = async (
  caseId: number,
  payload: Partial<CaseInput>
): Promise<CaseData> => {
  try {
    const { data } = await supabaseClient.patch(`/case?id=eq.${caseId}`, payload);

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Failed to update case");
  }
};

export const getCaseById = async (
  caseId: number
): Promise<CaseData> => {
  try {
  const { data } = await supabaseClient.get(
    `/case?id=eq.${caseId}&select=*,patient:patient_id(*)`
  );
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch case files"
    );
  }
};