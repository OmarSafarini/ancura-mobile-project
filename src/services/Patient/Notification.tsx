import { supabaseClient } from "../supabase";

export const getPatientNotification = async (patientId: string | null) => {

  if (!patientId) {
    throw new Error("No authenticated user ID provided");
  }
  try {
    const res = await supabaseClient.get(
      `/notification?patient_id=eq.${patientId}&select=*&order=created_at.desc`
    );
    return res.data;
  } catch (error) {
    console.error("getPatientNotification ERROR:", error);
    throw error;
  }
};