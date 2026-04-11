import React from "react";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ClockIcon from "@/assets/icons/ClockIcon";
import { scale } from "@/utils/responsive";
import CaseStatus from "./CaseStatus";

// _____________ Constants _____________________
const Card_Radius = scale(20);

// _____________ Types _____________________
export interface NotificationCardProps {
  title: string;
  date: string;
  isRead: boolean;
  status?: "under_review" | "doctor_replied" | "resolved" | "None";
}

// _____________ Patient Comment Card _____________________

export default function NotificationCard({
  title,
  date,
  isRead,
  status = "None"
}: NotificationCardProps) {


  return (
    <View style={[styles.Card, isRead ? styles.ReadCard : styles.UnReadCard]}>
      <View style={styles.CardHeader}>
        <Text style={styles.Title}>{title}</Text>
        {!isRead && <View style={styles.Dot} />}
      </View>
      <View style={styles.Footer}>
        <View style={styles.TimeContainer}>
          <ClockIcon color={"gray"} size={11} />
          <Text style={styles.Time}>{date}</Text>
        </View>
        {status !== "None" && <CaseStatus status={status} backgroundColor={isRead ? "rgba(216, 216, 216, 0.48)" : "rgba(255, 255, 255, 0.48)"} />}
      </View>
    </View>
  );
}

// _____________ Style _____________________

const styles = StyleSheet.create({
  Card: {
    borderRadius: Card_Radius,
    padding: scale(18),
    gap: scale(5),
  },
  UnReadCard: {
    backgroundColor: "rgba(182,192,249,0.4)",
    borderWidth: 0.1,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  ReadCard: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: "#66666649",
  },
  Dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(4),
    backgroundColor: colors.primary,
    right: 0,
    top: 0,
  },
  CardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {
    color: colors.primary,
    fontSize: scale(12),
    fontFamily: Family.FG_Regular,
    flex: 1,
  },
  Footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10)
  },
  Time: {
    color: "#00000056",
    fontSize: scale(8),
    fontFamily: Family.HV_Regular
  },
  TimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
  },
});
