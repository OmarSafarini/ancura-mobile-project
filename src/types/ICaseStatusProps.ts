import React from "react";

export type Status = "under_review" | "doctor_replied" | "resolved";
export type Variant = "default" | "activityLog";

export interface CaseStatusProps {
  status: Status;
  variant?: Variant;
}
