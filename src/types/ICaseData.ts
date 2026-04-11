export type CaseStatus = "Under Review" | "Doctor Replied" | "Resolved";

//case data
export type CaseData = {
  id: number;
  patient_id: number;
  title: string;
  description: string;
  created_at: string;
  file?: string;
  status?: CaseStatus;
  isEmergency: boolean;
};

//reply for specific case
export type ReplyData = {
  id: string;
  case_id: number;
  title: string;
  major: string;
  message: string;
  time: string;
};


//comment for specific reply
export type CommentData = {
  id: string;
  reply_id: string;
  title: string;
  description: string;
  time: string;
  major: string;
};