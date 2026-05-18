import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDoctorBasicInfo } from "@/services/Doctor/Doctor";
import { useDoctor } from "@/Context/DoctorContext";

export const useDoctorBasicInfo = (doctorId?: string) => {
  const { doctorData, setDoctorData } = useDoctor();

  const query = useQuery({
    queryKey: ["doctorBasicInfo", doctorId],
    queryFn: () => getDoctorBasicInfo(doctorId!),
    enabled: !!doctorId,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    retry: 1,
    initialData: doctorData.full_name
      ? {
          full_name: doctorData.full_name,
          profilePic: doctorData.profilePic ?? null,
        }
      : undefined,
  });

  useEffect(() => {
    if (query.data) {
      setDoctorData((previous) => ({
        ...previous,
        full_name: query.data.full_name,
        profilePic: query.data.profilePic ?? undefined,
      }));
    }
  }, [query.data, setDoctorData]);

  return query;
};