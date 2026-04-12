import { CaseData, ReplyData, CommentData } from "./ICaseData";
import { BarData } from "./IStatisticsChartProps";

//This is only fake data for testing purposes

export const dummyCases: CaseData[] = [
  {
    id: 1,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000001",
    title: "Headache and fever",
    description: "Patient has been experiencing continuous headache and mild fever for 2 days. Panadol is not helping.",
    timestamp: "2026-04-02",
    status: "Under Review",
    isEmergency: false,
    isReplied: false,
  },
  {
    id: 2,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000002",
    title: "Skin Rash",
    description: "Severe red rash appeared suddenly on both arms and neck after eating seafood.",
    timestamp: "2026-04-01",
    status: "Doctor Replied",
    isEmergency: true,
    isReplied: true,
  },
  {
    id: 3,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000003",
    title: "Lower Back Pain",
    description: "Sharp shooting pain in the lower back radiating to the left leg.",
    timestamp: "2026-03-31",
    status: "Resolved",
    isEmergency: false,
    isReplied: true,
  },
  {
    id: 4,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000004",
    title: "Anxiety and Panic Attacks",
    description: "Shortness of breath and rapid heartbeat during the night.",
    timestamp: "2026-04-03",
    status: "Doctor Replied",
    isEmergency: true,
    isReplied: true,
  },
  {
    id: 5,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000005",
    title: "Blurry Vision",
    description: "Sudden blurriness in the right eye, struggling to read screens.",
    timestamp: "2026-04-04",
    status: "Under Review",
    isEmergency: true,
    isReplied: false,
  },
  {
    id: 6,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000006",
    title: "Dry Cough",
    description: "Persistent dry cough for 2 weeks, worse at night.",
    timestamp: "2026-03-25",
    status: "Resolved",
    isEmergency: false,
    isReplied: true,
  },
  {
    id: 7,
    patient_id: "a1b2c3d4-0001-0000-0000-000000000007",
    title: "Toothache",
    description: "Extreme pain in the lower left molar when drinking cold water.",
    timestamp: "2026-04-05",
    status: "Doctor Replied",
    isEmergency: false,
    isReplied: true,
  },
];

export const allDummyReplies: ReplyData[] = [
  {
    id: 1,
    case_id: 1,
    doctor_id: "b2c3d4e5-0002-0000-0000-000000000001",
    doctor_name: "Dr. Ahmed Mansour",
    doctor_major: "General Practitioner",
    body: "Since Panadol isn't helping, please monitor your temperature. If it exceeds 39°C, go to the nearest ER.",
    timestamp: "2026-04-02T10:00:00",
  },
  {
    id: 2,
    case_id: 2,
    doctor_id: "b2c3d4e5-0002-0000-0000-000000000002",
    doctor_name: "Dr. Khaled Youssef",
    doctor_major: "Dermatologist & Allergist",
    body: "This sounds like an allergic reaction to seafood. Do you have any difficulty breathing or swelling in your lips?",
    timestamp: "2026-04-01T09:00:00",
  },
  {
    id: 3,
    case_id: 2,
    doctor_id: "b2c3d4e5-0002-0000-0000-000000000002",
    doctor_name: "Dr. Khaled Youssef",
    doctor_major: "Dermatologist & Allergist",
    body: "If the rash spreads, take an antihistamine like Claritin immediately and use calamine lotion.",
    timestamp: "2026-04-01T09:50:00",
  },
  {
    id: 4,
    case_id: 3,
    doctor_id: "b2c3d4e5-0002-0000-0000-000000000003",
    doctor_name: "Dr. Yaser Kamal",
    doctor_major: "Orthopedic Surgeon",
    body: "This might be sciatica. Rest flat on a firm mattress and apply hot packs. Avoid lifting anything heavy.",
    timestamp: "2026-03-31T14:00:00",
  },
  {
    id: 5,
    case_id: 4,
    doctor_id: "b2c3d4e5-0002-0000-0000-000000000004",
    doctor_name: "Dr. Sarah Ahmed",
    doctor_major: "Clinical Psychologist",
    body: "I understand how scary this feels. Try the 4-7-8 breathing technique when you feel an attack coming.",
    timestamp: "2026-04-03T08:50:00",
  },
  {
    id: 6,
    case_id: 7,
    doctor_id: "b2c3d4e5-0002-0000-0000-000000000005",
    doctor_name: "Dr. Rami Nabil",
    doctor_major: "Dentist",
    body: "Avoid cold or hot drinks. You can take Ibuprofen for the pain. Book an appointment for an X-ray as soon as possible.",
    timestamp: "2026-04-05T07:00:00",
  },
];

export const allDummyComments: CommentData[] = [
  // Comments related to reply 2 (Dr. Khaled asking about breathing)
  {
    id: 1,
    reply_id: 2,
    author_name: "You",
    body: "No difficulty breathing, just severe itching on my arms.",
    timestamp: "2026-04-01T09:55:00",
    author_role: "Patient",
    no_of_likes: 0,
    no_of_dislikes: 0,
    no_of_replies: 0,
  },
  // Comments related to reply 5 (Dr. Sarah on Anxiety)
  {
    id: 2,
    reply_id: 5,
    author_name: "You",
    body: "Could you send a more detailed plan on how to start this breathing technique?",
    timestamp: "2026-04-03T08:55:00",
    author_role: "Patient",
    no_of_likes: 0,
    no_of_dislikes: 0,
    no_of_replies: 1,
  },
  {
    id: 3,
    reply_id: 5,
    author_name: "Dr. Sarah Ahmed",
    author_role: "Clinical Psychologist",
    body: "Inhale for 4 seconds, hold for 7 seconds, exhale slowly for 8 seconds. Repeat 4 times.",
    timestamp: "2026-04-03T09:00:00",
    no_of_likes: 2,
    no_of_dislikes: 0,
    no_of_replies: 0,
  },
  // Comments related to reply 6 (Dr. Rami on Toothache)
  {
    id: 4,
    reply_id: 6,
    author_name: "You",
    body: "Thank you Dr. Rami, is there any specific toothpaste I should use in the meantime?",
    timestamp: "2026-04-05T07:10:00",
    author_role: "Patient",
    no_of_likes: 0,
    no_of_dislikes: 0,
    no_of_replies: 0,
  },
];

export const dashboardChartData: BarData[] = [
  { label: "Sat", value: 20 },
  { label: "Sun", value: 45 },
  { label: "Mon", value: 30 },
  { label: "Tue", value: 70, active: true },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 35 },
  { label: "Fri", value: 60 },
];

export const doctorPeriodData: Record<'Weekly' | 'Monthly' | 'All Time', {
  comments: number;
  time: number;
  score: number;
  chart: BarData[];
}> = {
  Weekly: {
    comments: 48,
    time: 24,
    score: 48,
    chart: [
      { label: "Sat", value: 45 },
      { label: "Sun", value: 62 },
      { label: "Mon", value: 38 },
      { label: "Tue", value: 75, active: true },
      { label: "Wed", value: 55 },
      { label: "Thu", value: 68 },
      { label: "Fri", value: 42 },
    ],
  },
  Monthly: {
    comments: 183,
    time: 97,
    score: 176,
    chart: [
      { label: "W1", value: 55 },
      { label: "W2", value: 80 },
      { label: "W3", value: 65, active: true },
      { label: "W4", value: 70 },
    ],
  },
  'All Time': {
    comments: 847,
    time: 412,
    score: 763,
    chart: [
      { label: "Jan", value: 60 },
      { label: "Feb", value: 75 },
      { label: "Mar", value: 50 },
      { label: "Apr", value: 90, active: true },
      { label: "May", value: 70 },
      { label: "Jun", value: 85 },
    ],
  },
};
