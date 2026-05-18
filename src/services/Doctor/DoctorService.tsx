import { SUPABASE_ANON_KEY, SUPABASE_URL, supabaseClient } from "../supabase";
import { CaseData } from '@/types/ICaseData';
import { IDoctor } from '@/types/IDoctor';


export const getAllCases = async (): Promise<CaseData[]> => {
  try{
  const res = await supabaseClient.get(`/post_with_time?select=*&order=timestamp.desc`);
  console.log(res.data)
  return res.data;
  }catch(error){
     console.error("getAllCasesDoctor ERROR:", error);
    throw error; 
  }
  
};

export const getDoctorProfile = async (doctorId: string): Promise<IDoctor> => {
  try{
    const res = await supabaseClient.get(`/doctor?id=eq.${doctorId}&select=*`);
   console.log(res.data);
  return res.data?.[0];
  }catch(error){
     console.error("getDoctorProfile ERROR:", error);
    throw error; 
  }
 
};

export const getDoctorLicense = async (doctorId: string) => {
  try{
    const res = await supabaseClient.get(
    `/license?doctor_id=eq.${doctorId}&select=*`,
  );
    console.log(res.data)
  return res.data?.[0];
  }catch(error){
     console.error("getDoctorLicense ERROR:", error);
    throw error; 
  }
  
};
