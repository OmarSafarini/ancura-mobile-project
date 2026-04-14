import { supabaseClient } from '@/services/supabase';

export const getRepliesByPostId = async (postId: number) => {
  const { data } = await supabaseClient.get('/reply', {
    params: {
      post_id: `eq.${postId}`,
      select: '*',        
      order: 'timestamp.asc',
    },
  });
  return data ?? [];
};

export const postReply = async ({
  postId,
  doctorId,
  patientId,
  body,
}: {
  postId: number;
  doctorId: string;
  patientId: string;
  body: string;
}) => {
  const { data } = await supabaseClient.post('/reply', {
    post_id: postId,
    reply_to: 'post',
    patient_id: patientId,
    doctor_id: doctorId,
    body,
  });
  return data?.[0];
};