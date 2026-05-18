import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getRepliesByCaseId, postReply } from '@/services/common_services/ReplyService';
import { useAuthStore } from '@/store/authStore';
import { useAddNotification } from './useAddNotification';
import { useAddActivitylog } from './useAddActivitylog';

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
  });

  const { mutate: submitReplyMutate, isPending: isSubmitting } = useMutation({
    mutationFn: postReply,
    onSuccess: useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['replies', String(caseId)] });

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
      caseId: String(caseId),
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