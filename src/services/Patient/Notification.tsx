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

export const addPatientNotification = async (payload:any) => {
  if (!payload.patient_id) {
    throw new Error("No patient ID provided for notification");
  }

  try {
    const res = await supabaseClient.post(
      `/notification`, 
      payload
    );
    return res.data;
  } catch (error:any) {
    console.error("addPatientNotification ERROR:",error?.response?.data || error.message);
    throw error;
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    const res = await supabaseClient.patch(
      `/notification?id=eq.${id}`,
      {
        isRead: true,
      }
    );

    return res.data;
  } catch (error: any) {
    console.error(
      "markNotificationAsRead ERROR:",
      error?.response?.data || error.message
    );
    throw error;
  }
};