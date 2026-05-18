import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCases } from "@/services/common_services/Case";
import type { CaseData } from "@/types/ICaseData";

export const useGetDoctorCases = () => {
  const query = useQuery<CaseData[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    placeholderData: (previous) => previous,
  });

  const cases = useMemo(() => query.data ?? [], [query.data]);

  const activeCases = useMemo(
    () =>
      cases.filter((item) => {
        const status = String(item.status ?? "").toLowerCase();
        return status !== "resolved";
      }),
    [cases]
  );

  const previewCases = useMemo(
    () => activeCases.slice(0, 6),
    [activeCases]
  );

  return {
    ...query,
    cases,
    activeCases,
    previewCases,
  };
};