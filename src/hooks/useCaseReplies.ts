import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { getRepliesByCaseId, postReply } from '@/services/common_services/ReplyService';
import { useAuthStore } from '@/store/authStore';
import { useAddNotification } from './useAddNotification';
import { useAddActivitylog } from './useAddActivitylog';
import { updateCaseStatus } from '@/services/common_services/Case';
import { supabaseRealtime } from '@/services/realtimeClient';

type UseCaseRepliesProps = {
  caseId: string | number;
  caseData?: any;
  role?: string;
};

export const useCaseReplies = ({ caseId, caseData, role = 'patient' }: UseCaseRepliesProps) => {
  const queryClient = useQueryClient();
  const authUser = useAuthStore((state) => state.user);
  const isDoctor = role === 'doctor';

  const { mutate: sendNotification } = useAddNotification();
  const { mutate: addActivitylog } = useAddActivitylog();

  const { data: replies = [], isLoading } = useQuery({
    queryKey: ['replies', String(caseId)],
    queryFn: () => getRepliesByCaseId(caseId),
    enabled: !!caseId,
    // Poll every 6s as a reliable fallback in case the WebSocket event is missed.
    refetchInterval: 6000,
    refetchIntervalInBackground: false,
    refetchOnMount: 'always',
  });

  // ─── Realtime Subscription ────────────────────────────────────────
  // IMPORTANT: We do NOT use a `filter` parameter here.
  // Supabase Realtime filters require the column to be indexed on the DB;
  // without an index, events are silently dropped. Instead we subscribe to
  // ALL changes on `reply` and check the case_id client-side.
  useEffect(() => {
    if (!caseId) return;

    const channelName = `replies:case:${caseId}`;

    // Remove any existing channel with this name before creating a fresh one
    const existing = supabaseRealtime.getChannels().find(
      (ch) => ch.topic === `realtime:${channelName}`
    );
    if (existing) supabaseRealtime.removeChannel(existing);

    const channel = supabaseRealtime
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reply',
          // No server-side filter — we handle it client-side below
        },
        (payload: any) => {
          // Only refresh if the incoming change belongs to this case
          const rowCaseId =
            payload?.new?.case_id ?? payload?.old?.case_id;
          if (!rowCaseId || String(rowCaseId) === String(caseId)) {
            queryClient.invalidateQueries({ queryKey: ['replies', String(caseId)] });
          }
        }
      )
      .subscribe((status: string) => {
        console.log('[Realtime] reply channel status:', status);
      });

    return () => {
      supabaseRealtime.removeChannel(channel);
    };
  }, [caseId, queryClient]);
  // ─────────────────────────────────────────────────────────────────

  const { mutate: submitReplyMutate, isPending: isSubmitting } = useMutation({
    mutationFn: async (payload: any) => {
      await postReply(payload);
      await updateCaseStatus(String(caseId), "doctor_replied");
    },
    onSuccess: useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ["replies", String(caseId)] });
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["doctorCases"] });
      queryClient.invalidateQueries({ queryKey: ["patientPost"] });
      queryClient.invalidateQueries({ queryKey: ["case", caseId] });

      addActivitylog({
        doctor_id: authUser?.id as string,
        history_title: "New Reply Added",
        body: `You replied to case: ${caseData?.title}`,
        status: "comment",
      });

      if (isDoctor && caseData?.patient_id) {
        sendNotification({
          patientId: caseData.patient_id,
          title: `New reply received for your case: ${caseData?.title}`,
          status: 'doctor_replied',
        });
      }
    }, [queryClient, caseId, authUser?.id, caseData, isDoctor, addActivitylog, sendNotification]),
  });

  const sendReply = useCallback((body: string) => {
    if (!authUser?.id || !body?.trim()) return;

    submitReplyMutate({
      caseId: Number(caseId),
      doctorId: authUser.id,
      patientId: caseData?.patient_id,
      body: body.trim(),
    });
  }, [submitReplyMutate, authUser?.id, caseData?.patient_id, caseId]);

  return {
    replies,
    isLoading,
    sendReply,
    isSubmitting,
  };
};