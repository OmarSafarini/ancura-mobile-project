import React from "react";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { scale } from "@/utils/responsive";

// _____________ Constants _____________________
const Card_Radius = scale(11);

// _____________ Types _____________________
export interface PatientCommentCardProps {
  title: string;
  discreption: string;
  time: string;
}

// _____________ Patient Comment Card _____________________

export default function PatientCommentCard({
  title,
  discreption,
  time,
}: PatientCommentCardProps) {
  return (
    <View style={styles.Card}>
      <View style={styles.Card_Header}>
        <Text style={styles.Title}>{title}</Text>
        <Text style={styles.Time}>{time}</Text>
      </View>
      <Text style={styles.Discreption}>{discreption}</Text>
    </View>
  );
}

// _____________ Style _____________________

const styles = StyleSheet.create({
  Card: {
    borderRadius: Card_Radius,
    backgroundColor: palette.white,
    padding: scale(18),
    borderWidth: 1,
    borderColor: "#66666649",
    gap: scale(10),
    maxHeight:'20%',
  },
  Card_Header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Title: {
    fontFamily: Family.FG_Bold,
    fontSize: scale(11),
    fontWeight: "bold",
  },
  Time: {
    fontFamily: Family.HV_Regular,
    fontSize: scale(8),
    color: "#6666668c",
  },
  Discreption: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(12),
    color: colors.primary,
    lineHeight:scale(15)
  },
});
