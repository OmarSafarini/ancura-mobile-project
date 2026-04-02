import React from "react";

import UnderReviewIcon from "@assets/icons/UnderViewIcon";
import DoctorRepliedIcon from "@assets/icons/DoctorRepliedIcon";
import ResolvedIcon from "@assets/icons/ResolvedIcon";

import type { Status } from "@/types/ICaseStatusProps";
import { Colors } from "@/utils/colors";

export type StatusConfig = {
  text: string;
  color: string;
  Icon: React.ComponentType<{ width: number; height: number }> | null;
};

export const caseStatusMap: Record<Status, StatusConfig> = {
  under_review: {
    text: "Under Review",
    color: Colors.underReview,
    Icon: UnderReviewIcon,
  },
  doctor_replied: {
    text: "Doctor Replied",
    color: Colors.secondary,
    Icon: DoctorRepliedIcon,
  },
  resolved: {
    text: "Resolved",
    color: Colors.secondary,
    Icon: ResolvedIcon,
  },
};