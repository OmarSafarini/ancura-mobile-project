import { supabaseClient } from '../supabase';   

export const getAllCases = async () => {
  try {
    const { data, status, statusText } = await supabaseClient.get('/post_with_time', {
      params: {
        select: '*',

        //isReplied: 'eq.false',

        order: 'timestamp.desc',
      },
      headers: {
      },
    });

    console.log('Status:', status, statusText);
    console.log('Fetched cases:', data);
    console.log('Data status:', data.status);

    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error('Error fetching cases:', error.response?.data || error.message);
    console.error('Full error:', error);
    throw error;
  }
};

/**
 * 
 * @param caseId 
 */
export const deleteCase = async (caseId: string): Promise<void> => {
  try {
    await supabaseClient.delete('/case', {
      params: {
        id: `eq.${caseId}`,
      },
    });
  } catch (error: any) {
    console.error('Error deleting case:', error.response?.data || error.message);
    throw error;
  }
};

export const updateCaseStatus = async (
  caseId: string,
  newStatus: "under_review" | "doctor_replied" | "resolved"
): Promise<void> => {
  try {
    console.log("PATCH CASE STATUS:", caseId, newStatus);

    const { data, status, statusText } = await supabaseClient.patch(
      "/case",
      {
        status: newStatus,
        isReplied: newStatus === "doctor_replied" ? true : undefined,
      },
      {
        params: {
          id: `eq.${caseId}`,
        },
        headers: {
          Prefer: "return=representation",
        },
      }
    );

    console.log("PATCH RESPONSE:", status, statusText);
    console.log("PATCH DATA:", data);

    if (!Array.isArray(data) || data.length === 0) {
      console.warn("No case was updated. Check caseId:", caseId);
    }
  } catch (error: any) {
    console.error(
      "Error updating case status:",
      error.response?.data || error.message
    );
    throw error;
  }
};