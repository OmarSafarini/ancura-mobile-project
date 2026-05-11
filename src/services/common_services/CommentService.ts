import { supabaseClient } from '@/services/supabase';
import { formatDistanceToNow } from 'date-fns';


export const getCommentsByReplyId = async (replyId: number) => {
  const { data } = await supabaseClient.get('/comment', {
    params: {
      reply_id: `eq.${replyId}`,
      select: '*,doctor(full_name,profilePic),patient(nickname,profilePic)',
      order: 'timestamp',
    },
  });

  return (data ?? []).map((item: any) => ({
    ...item,

    timestamp: formatDistanceToNow(
      new Date(item.timestamp),
      { addSuffix: true }
    ).replace('about ', ''),
    author_name: item.doctor?.full_name || item.patient?.nickname,
    author_role: item.doctor ? 'Doctor' : 'Patient',
  }));
};
export const postComment = async ({
  replyId,
  body,
  userId,
  role,
}: {
  replyId: number;
  body: string;
  userId: string;
  role: 'doctor' | 'patient';
}) => {

  const payload: any = {
    reply_id: replyId,
    body,
  };

  if (role === 'doctor') {
    payload.doctor_id = userId;
  } else {
    payload.patient_id = userId;
  }

  const { data } = await supabaseClient.post('/comment', payload);

  return data?.[0];
};