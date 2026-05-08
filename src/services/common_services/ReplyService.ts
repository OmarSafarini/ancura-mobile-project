import { supabaseClient } from '@/services/supabase';

export const getRepliesByCaseId = async (caseId: number) => {
  const { data } = await supabaseClient.get('/reply', {
    params: {
      case_id: `eq.${caseId}`,
      select: '*,doctor(fullname)',
    },
  });
  console.log('replies fetched:', data);
  return data ?? [];
};

export const postReply = async ({
  caseId,
  doctorId,
  patientId,
  body,
}: {
  caseId: number;
  doctorId: string;
  patientId: string;
  body: string;
}) => {
  const { data } = await supabaseClient.post('/reply', {
    case_id: caseId,
    reply_to: 'post',
    patient_id: patientId,
    doctor_id: doctorId,
    body,
  });
  return data?.[0];
};

//temp for now
export const likeReply = async (replyId: string, currentLikes: number) => {
  const { data } = await supabaseClient.patch(
    '/reply',
    { likes: currentLikes + 1 },
    {
      params: { id: `eq.${replyId}` },
      headers: { Prefer: 'return=representation' },
    }
  );
  return data?.[0];
};

export const dislikeReply = async (replyId: string, currentDislikes: number) => {
  const { data } = await supabaseClient.patch(
    '/reply',
    { dislikes: currentDislikes + 1 },
    {
      params: { id: `eq.${replyId}` },
      headers: { Prefer: 'return=representation' },
    }
  );
  return data?.[0];
};