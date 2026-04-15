import { supabaseClient } from '@/services/supabase';

export const addComment = async (replyId: number, body: string) => {
  const { data } = await supabaseClient.post('/comment', {
    reply_id: replyId,
    body,
    nooflikes: 0,
    noofdislikes: 0,
    noofreplies: 0,
  });

  const comment = data?.[0];
  if (!comment) throw new Error('Failed to create comment');

  return comment;
};