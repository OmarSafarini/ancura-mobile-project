import { supabaseClient } from "../supabase";
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

// export const createDoctor = async (data: IDoctor) => {
//   const res = await supabaseClient.post("/doctor", {
//     id: data.id,
//     full_name: data.full_name,
//     email: data.email,
//     bio: data.bio,
//     points: data.points ?? 0,
//     location: data.location,
//     created_at: new Date().toISOString(),
//     profile_pic: data.profile_pic ?? null,
//   });

//   return res.data?.[0];
// };
