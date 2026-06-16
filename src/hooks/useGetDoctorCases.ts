import { useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCases } from "@/services/common_services/Case";
import type { CaseData } from "@/types/ICaseData";
import { supabaseRealtime } from "@/services/realtimeClient";

export const useGetDoctorCases = () => {
  const queryClient = useQueryClient();

  const query = useQuery<CaseData[]>({
    queryKey: ["cases"],
    queryFn: getAllCases,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    placeholderData: (previous) => previous,
  });

  // ─── Realtime Subscription ─────────────────────────────────────────
  // Listen for any INSERT / UPDATE / DELETE on the `case` table.
  // When a patient submits a new case, the doctor's list refreshes instantly.
  useEffect(() => {
    const channelName = "doctor:cases";
    const invalidate = () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["doctorCases"] });
    };

    // Remove any existing channel with this name before creating a fresh one
    const existing = supabaseRealtime.getChannels().find(
      (ch) => ch.topic === `realtime:${channelName}`
    );
    if (existing) supabaseRealtime.removeChannel(existing);

    const channel = supabaseRealtime
      .channel(channelName)
      .on("postgres_changes", { event: "*", schema: "public", table: "case" }, invalidate)
      .subscribe();

    return () => {
      supabaseRealtime.removeChannel(channel);
    };
  }, [queryClient]);
  // ──────────────────────────────────────────────────────────────────

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