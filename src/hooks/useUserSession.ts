import { useMemo } from "react";
import { useAuthStore } from "@/store/authStore";

export const useUserSession = () => {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);

  const doctorId = useMemo(
    () => (user?.id ? String(user.id) : undefined),
    [user?.id]
  );

  return useMemo(
    () => ({
      user,
      role,
      doctorId,
      isDoctor: role === "doctor",
      isPatient: role === "patient",
    }),
    [user, role, doctorId]
  );
};