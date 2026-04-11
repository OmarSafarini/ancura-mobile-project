import { CaseData, ReplyData, CommentData } from "./ICaseData";



//This is only fake data for testing purposes
export const dummyCases: CaseData[] = [
  {
    id: 1,
    patient_id: 101,
    title: "Headache and fever",
    description: "Patient has been experiencing continuous headache and mild fever for 2 days. Panadol is not helping.",
    created_at: "2026-04-02",
    status: "Under Review",
    isEmergency: false,
  },
  {
    id: 2,
    patient_id: 102,
    title: "Skin Rash",
    description: "Severe red rash appeared suddenly on both arms and neck after eating seafood.",
    created_at: "2026-04-01",
    status: "Doctor Replied",
    isEmergency: true,
  },
  {
    id: 3,
    patient_id: 103,
    title: "Lower Back Pain",
    description: "Sharp shooting pain in the lower back radiating to the left leg.",
    created_at: "2026-03-31",
    status: "Resolved",
    isEmergency: false,
  },
  {
    id: 4,
    patient_id: 104,
    title: "Anxiety and Panic Attacks",
    description: "Shortness of breath and rapid heartbeat during the night.",
    created_at: "2026-04-03",
    status: "Doctor Replied",
    isEmergency: true,
  },
  {
    id: 5,
    patient_id: 105,
    title: "Blurry Vision",
    description: "Sudden blurriness in the right eye, struggling to read screens.",
    created_at: "2026-04-04",
    status: "Under Review",
    isEmergency: true,
  },
  {
    id: 6,
    patient_id: 106,
    title: "Dry Cough",
    description: "Persistent dry cough for 2 weeks, worse at night.",
    created_at: "2026-03-25",
    status: "Resolved",
    isEmergency: false,
  },
  {
    id: 7,
    patient_id: 107,
    title: "Toothache",
    description: "Extreme pain in the lower left molar when drinking cold water.",
    created_at: "2026-04-05",
    status: "Doctor Replied",
    isEmergency: false,
  },
];

export const allDummyReplies: ReplyData[] = [
  // Replies for Case 1 (Headache & fever)
  {
    id: "reply_1",
    case_id: 1,
    title: "Dr. Ahmed Mansour",
    major: "General Practitioner",
    message: "Since Panadol isn't helping, please monitor your temperature. If it exceeds 39°C, go to the nearest ER.",
    time: "2 hours ago",
  },
  // Replies for Case 2 (Skin Rash)
  {
    id: "reply_2",
    case_id: 2,
    title: "Dr. Khaled Youssef",
    major: "Dermatologist & Allergist",
    message: "This sounds like an allergic reaction to seafood. Do you have any difficulty breathing or swelling in your lips?",
    time: "1 hour ago",
  },
  {
    id: "reply_3",
    case_id: 2,
    title: "Dr. Khaled Youssef",
    major: "Dermatologist & Allergist",
    message: "If the rash spreads, take an antihistamine like Claritin immediately and use calamine lotion.",
    time: "50 mins ago",
  },
  // Replies for Case 3 (Lower back pain)
  {
    id: "reply_4",
    case_id: 3,
    title: "Dr. Yaser Kamal",
    major: "Orthopedic Surgeon",
    message: "This might be sciatica. Rest flat on a firm mattress and apply hot packs. Avoid lifting anything heavy.",
    time: "3 days ago",
  },
  // Replies for Case 4 (Anxiety)
  {
    id: "reply_5",
    case_id: 4,
    title: "Dr. Sarah Ahmed",
    major: "Clinical Psychologist",
    message: "I understand how scary this feels. Try the 4-7-8 breathing technique when you feel an attack coming.",
    time: "10 mins ago",
  },
  // Replies for Case 7 (Toothache)
  {
    id: "reply_6",
    case_id: 7,
    title: "Dr. Rami Nabil",
    major: "Dentist",
    message: "Avoid cold or hot drinks. You can take Ibuprofen for the pain. Book an appointment for an X-ray as soon as possible.",
    time: "Just now",
  },
];

export const allDummyComments: CommentData[] = [
  // Comments related to reply_2 (Dr. Khaled asking about breathing)
  {
    id: "comment_1",
    reply_id: "reply_2",
    title: "You",
    description: "No difficulty breathing, just severe itching on my arms.",
    time: "55 mins ago",
    major: "Patient",
  },
  // Comments related to reply_5 (Dr. Sarah on Anxiety)
  {
    id: "comment_2",
    reply_id: "reply_5",
    title: "You",
    description: "Could you send a more detailed plan on how to start this breathing technique?",
    time: "5 mins ago",
    major: "Patient",
  },
  {
    id: "comment_3",
    reply_id: "reply_5",
    title: "Dr. Sarah Ahmed",
    major: "Clinical Psychologist",
    description: "Inhale for 4 seconds, hold for 7 seconds, exhale slowly for 8 seconds. Repeat 4 times.",
    time: "Just now",
  },
  // Comments related to reply_6 (Dr. Rami on Toothache)
  {
    id: "comment_4",
    reply_id: "reply_6",
    title: "You",
    description: "Thank you Dr. Rami, is there any specific toothpaste I should use in the meantime?",
    time: "Just now",
    major: "Patient",
  },
];

export const dashboardChartData = [
  { label: "Sat", value: 20 },
  { label: "Sun", value: 45 },
  { label: "Mon", value: 30 },
  { label: "Tue", value: 70, active: true },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 35 },
  { label: "Fri", value: 60 },
];

export const doctorPeriodData = {
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

