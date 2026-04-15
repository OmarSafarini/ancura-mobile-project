import { supabaseClient } from "../supabase";
import { CaseData } from '@/types/ICaseData';


export const getPatintProfile = async (id: string) => {
  try {
  const res = await supabaseClient.get(
    `/patient?id=eq.${id}&select=*`
  );

    console.log("PATIENT RES:", res.data);

    return res.data?.[0] || null; 
  } catch (error) {
    console.error("getPatintProfile ERROR:", error);
    throw error; 
  }
};

export const getPatintPosts = async (patientId: string):Promise<CaseData[]>=>{
  try{const res = await supabaseClient.get(
 `/post_with_time?patient_id=eq.${patientId}&select=*&order=timestamp.desc`
  );
    console.log("PATIENT Cases:", res.data);
    return res.data;
  }catch(error){
     console.error("getPatintCases ERROR:", error);
    throw error; 
  }
  
};
