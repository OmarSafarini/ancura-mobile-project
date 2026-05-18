import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getCommentsByReplyId, postComment } from '@/services/common_services/CommentService';
import { useAuthStore } from '@/store/authStore';
import { useAddNotification } from './useAddNotification';
import { useAddActivitylog } from './useAddActivitylog';

type UseReplyCommentsProps = {
  replyId: string | number;
  caseData?: any;
};

export const useReplyComments = ({ replyId, caseData }: UseReplyCommentsProps) => {
  const queryClient = useQueryClient();
  const authUser = useAuthStore((state) => state.user);
  const authRole = useAuthStore((state) => state.role);

  const { mutate: sendNotification } = useAddNotification();
  const { mutate: addActivitylog } = useAddActivitylog();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', String(replyId)],
    queryFn: () => getCommentsByReplyId(replyId),
    enabled: !!replyId,
  });

  const { mutate: submitCommentMutate, isPending: isSubmitting } = useMutation({
    mutationFn: postComment,
    onSuccess: useCallback(() => {
      queryClient.invalidateQueries({ queryKey: ['comments', String(replyId)] });

      if (authRole === 'doctor' && caseData?.patient_id) {
        addActivitylog({
          doctor_id: authUser?.id as string,
          history_title: "Comment Added",
          body: `You commented on a reply for case: ${caseData?.title}`,
          status: "comment",
        });

        sendNotification({
          patientId: caseData.patient_id,
          title: `New comment on your case: ${caseData?.title}`,
          status: 'doctor_replied',
        });
      }
    }, [queryClient, replyId, authRole, caseData, authUser?.id, addActivitylog, sendNotification]),
  });

  const sendComment = useCallback((body: string) => {
    if (!authUser?.id || !body?.trim()) return;

    submitCommentMutate({
      replyId: String(replyId),
      body: body.trim(),
      userId: authUser.id,
      role: authRole,
    });
  }, [submitCommentMutate, authUser?.id, authRole, replyId]);

  return {
    comments,
    isLoading,
    sendComment,
    isSubmitting,
  };
};