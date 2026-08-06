import { CaseData } from "@/types/ICaseData";
import { ReplyData } from "@/types/IReplyData";
import { IDoctor } from "@/types/IDoctor";

// Mock profiles
export const MOCK_PATIENT = {
  id: "patient_1",
  full_name: "John Doe",
  nickname: "Guest",
  profilePic: null,
};

export const MOCK_DOCTOR: IDoctor = {
  id: "doctor_1",
  full_name: "Dr. Emily Smith",
  email: "doctor@ancura.com",
  profilePic: null,
  role: "doctor",
  specialization: "General Practice"
};

// Global in-memory state
export let mockCases: CaseData[] = [
  {
    id: 1,
    patient_id: "patient_1",
    title: "Chronic back pain during morning",
    description: "I've been experiencing severe lower back pain for the past 2 weeks, mostly when waking up.",
    status: "under_review",
    created_at: new Date(Date.now() - 100000000).toISOString(),
    time_ago: "1 day ago",
  },
  {
    id: 2,
    patient_id: "patient_1",
    title: "Persistent headache and fatigue",
    description: "Frequent headaches behind the eyes and feeling tired all day.",
    status: "doctor_replied",
    created_at: new Date(Date.now() - 300000000).toISOString(),
    time_ago: "3 days ago",
  },
  {
    id: 3,
    patient_id: "patient_1",
    title: "Skin rash on arms",
    description: "Red itchy rash appeared after using a new soap. Not going away.",
    status: "resolved",
    created_at: new Date(Date.now() - 600000000).toISOString(),
    time_ago: "1 week ago",
  },
  {
    id: 4,
    patient_id: "patient_2", // someone else's case for the doctor to see
    title: "Difficulty breathing after exercise",
    description: "Wheezing and shortness of breath specifically after jogging.",
    status: "under_review",
    created_at: new Date(Date.now() - 5000000).toISOString(),
    time_ago: "2 hours ago",
  }
];

export let mockReplies: ReplyData[] = [
  {
    id: 1,
    post_id: 2,
    user_id: "doctor_1",
    content: "Please make sure to drink at least 3 liters of water. Have you checked your blood pressure recently?",
    created_at: new Date(Date.now() - 200000000).toISOString(),
    time_ago: "2 days ago",
    user_type: "doctor",
    doctor_info: [{ full_name: "Dr. Emily Smith" }]
  },
  {
    id: 2,
    post_id: 2,
    user_id: "patient_1",
    content: "No I haven't. I will get it checked today.",
    created_at: new Date(Date.now() - 100000000).toISOString(),
    time_ago: "1 day ago",
    user_type: "patient",
    doctor_info: []
  },
  {
    id: 3,
    post_id: 3,
    user_id: "doctor_1",
    content: "Stop using the new soap immediately and apply a mild hydrocortisone cream twice daily.",
    created_at: new Date(Date.now() - 500000000).toISOString(),
    time_ago: "6 days ago",
    user_type: "doctor",
    doctor_info: [{ full_name: "Dr. Emily Smith" }]
  }
];

export let mockNotifications: any[] = [
  {
    id: 1,
    title: "Doctor Replied",
    message: "Dr. Emily Smith replied to your case.",
    is_read: false,
    created_at: new Date(Date.now() - 200000000).toISOString(),
    time_ago: "2 days ago"
  },
  {
    id: 2,
    title: "Case Resolved",
    message: "Your case 'Skin rash on arms' has been resolved.",
    is_read: true,
    created_at: new Date(Date.now() - 600000000).toISOString(),
    time_ago: "1 week ago"
  }
];

// ---------------- Helpers ----------------

export const delay = (ms: number = 300) => new Promise(res => setTimeout(res, ms));

export const addMockCase = async (caseData: any) => {
  await delay();
  const newCase = {
    ...caseData,
    id: Math.floor(Math.random() * 10000),
    created_at: new Date().toISOString(),
    time_ago: "Just now",
  };
  mockCases = [newCase, ...mockCases];
  return newCase;
};

export const updateMockCase = async (id: number, updates: any) => {
  await delay();
  mockCases = mockCases.map(c => c.id === id ? { ...c, ...updates } : c);
  return mockCases.find(c => c.id === id);
};

export const deleteMockCase = async (id: number) => {
  await delay();
  mockCases = mockCases.filter(c => c.id !== id);
  return true;
};

export const addMockReply = async (reply: any, userRole: 'doctor'|'patient') => {
  await delay();
  const newReply = {
    ...reply,
    id: Math.floor(Math.random() * 10000),
    created_at: new Date().toISOString(),
    time_ago: "Just now",
    user_type: userRole,
    doctor_info: userRole === 'doctor' ? [{ full_name: MOCK_DOCTOR.full_name }] : []
  };
  mockReplies = [...mockReplies, newReply]; // Append at end usually better for replies, or start depending on sorting
  
  // Auto-update case status if a doctor replies
  if (userRole === 'doctor') {
    const caseIndex = mockCases.findIndex(c => c.id === reply.post_id);
    if (caseIndex !== -1 && mockCases[caseIndex].status !== 'resolved') {
      mockCases[caseIndex] = { ...mockCases[caseIndex], status: 'doctor_replied' };
    }
  }
  
  return newReply;
};
