import { supabaseClient } from '@/services/supabase';
import { formatDistanceToNow } from 'date-fns';

const parseTimestamp = (timestampString: any) => {
  if (!timestampString) return new Date();
  if (typeof timestampString !== 'string') return new Date(timestampString);
  if (!timestampString.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(timestampString)) {
    return new Date(timestampString + 'Z');
  }
  return new Date(timestampString);
};

export const getRepliesByCaseId = async (caseId: number) => {
  const { data } = await supabaseClient.get('/reply', {
    params: {
      case_id: `eq.${caseId}`,
      select: '*,doctor(full_name,profilePic)',
    },
  });
  const formattedReplies =
    data?.map((reply: any) => ({
      ...reply,

      timestamp: formatDistanceToNow(
        parseTimestamp(reply.timestamp),
        { addSuffix: true }
      ).replace('about ', ''),
    })) ?? [];

  console.log('replies fetched:', formattedReplies);

  return formattedReplies;

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