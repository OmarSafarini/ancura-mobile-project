import { supabaseClient } from "../supabase";
import { CaseData } from '@/types/ICaseData';



export const getPatintProfile = async (patientId: string)=>{
  const res = await supabaseClient.get(
    `/patient?id=eq.${patientId}&select=*`
  );
  return res.data?.[0] ?? null;
};

export const getPatintPosts = async (patientId: string):Promise<CaseData[]>=>{
  const res = await supabaseClient.get(
 `/post?patient_id=eq.${patientId}&select=*&order=timestamp.desc`
  );
  return (res.data || []).map((c: CaseData) => ({
    ...c,
    status: c.isReplied ? "doctor_replied" : "under_review",
  }));
};