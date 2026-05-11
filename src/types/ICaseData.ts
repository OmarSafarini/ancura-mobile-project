// Matches CaseStatus options used across the UI
// NOTE: `status` is derived from `isReplied` + business logic, not a DB column
export type CaseStatus = "Under Review" | "Doctor Replied" | "Resolved"| "empty";

// Matches the `post` table in the database
export type CaseData = {
  id: number;              // BIGINT
  patient_id: string;      // UUID — references patient(id)
  title: string;
  description: string;
  file?: string;               // attached image/pdf URL
  timestamp: string;           // was: created_at (matches SQL column name)
  time_ago:string;
  isEmergency: boolean;
  isReplied: boolean;          // was: missing entirely

  // UI-only — derived from isReplied + business logic
  status?: CaseStatus;
};

// Matches the `reply` table in the database
export type ReplyData = {
  id: number;                  // BIGINT
  case_id: number;             // links to post.id
  patient_id?: string;         // UUID
  doctor_id?: string;          // UUID
  body: string;                // was: message
  timestamp: string;           // was: time

  // UI-only — fetched from joined doctor row
  doctor_name?: string;        // was: title
  doctor_major?: string;       // was: major
};

// Matches the `comment` table in the database
export type CommentData = {
  id: number;                  // was: string
  reply_id: number;            // links to reply.id
  body: string;                // was: description
  timestamp: string;           // was: time
  no_of_likes: number;         // new
  no_of_dislikes: number;      // new
  no_of_replies: number;       // new

  // UI-only — fetched from joined patient/doctor row
  author_name?: string;        // was: title
  author_role?: string;        // was: major ("Patient" | specialty)
};