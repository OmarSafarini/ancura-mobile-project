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

export const uploadDoctorProfileImage = async (
  uri: string,
  fileName: string,
  mimeType: string
): Promise<string> => {
  try {
    const safeFileName = fileName.replace(/\s+/g, "_");
    const uniqueFileName = `${Date.now()}_${safeFileName}`;

    const uploadUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/doctor-profile/${uniqueFileName}`;

    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
        "Content-Type": mimeType,
      },
      body: blob,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Upload failed: ${errorText}`);
    }

    return `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/doctor-profile/${uniqueFileName}`;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to upload doctor profile image"
    );
  }
};

export interface DoctorInput {
  id:string;
  full_name: string;
  email: string;
  bio?: string;
  location?: string;
  profilePic?: string;
}

export const createDoctor = async (payload: DoctorInput): Promise<IDoctor> => {
  try {
    const { data } = await supabaseClient.post("/doctor", payload, {
      headers: {
        apikey: SUPABASE_ANON_KEY!,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
    });

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.log("FULL ERROR:", error?.response?.data);
    throw new Error("Failed to create doctor");
  }
};