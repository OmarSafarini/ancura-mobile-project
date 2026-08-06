import { delay, MOCK_DOCTOR, MOCK_PATIENT } from '../mockData';

let mockComments: any[] = [];

export const getCommentsByReplyId = async (replyId: number) => {
  await delay();
  const comments = mockComments.filter(c => c.reply_id === replyId);
  return comments;
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
  await delay();
  const newComment = {
    id: Math.floor(Math.random() * 10000),
    reply_id: replyId,
    body,
    timestamp: "Just now",
    author_name: role === 'doctor' ? MOCK_DOCTOR.full_name : MOCK_PATIENT.nickname,
    author_role: role === 'doctor' ? 'Doctor' : 'Patient',
    doctor: role === 'doctor' ? MOCK_DOCTOR : null,
    patient: role === 'patient' ? MOCK_PATIENT : null,
  };
  mockComments.push(newComment);
  return newComment;
};