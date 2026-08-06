import { mockReplies, delay, addMockReply, MOCK_DOCTOR, MOCK_PATIENT } from '../mockData';

export const getRepliesByCaseId = async (caseId: number) => {
  await delay();
  // We don't parse timestamps for mock data here, we can just return it
  const replies = mockReplies.filter(r => r.post_id === caseId);
  return replies;
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
  const role = doctorId ? 'doctor' : 'patient';
  const newReply = await addMockReply({
    post_id: caseId,
    content: body,
    user_id: role === 'doctor' ? MOCK_DOCTOR.id : MOCK_PATIENT.id,
  }, role);
  return newReply;
};

//temp for now
export const likeReply = async (replyId: string, currentLikes: number) => {
  await delay();
  return { id: replyId, likes: currentLikes + 1 };
};

export const dislikeReply = async (replyId: string, currentDislikes: number) => {
  await delay();
  return { id: replyId, dislikes: currentDislikes + 1 };
};