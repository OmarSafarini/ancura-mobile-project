import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import ChatIcon from "@/features/doctor/components/Icons/ChatIcon";
import { scale } from "@/utils/responsive";
import CaseStatus from "./CaseStatus";
import ClockIcon from "@/features/doctor/components/Icons/ClockIcon";
import FileBar from "./FileBar";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import IconWrapper from "./../../features/doctor/components/Icons/IconWrapper";

// ________________ CONSTANTS ________________
const AVATAR_SIZE = scale(25);
const Card_Radius = scale(11);
const Tags_Radius = scale(14);
// ________________ TYPES ________________
type CaseDetailCardProps = {
  userId: string;
  gender: string;
  age: number;
  title: string;
  description: string;
  date: string;
  avatar?: string;
  status?: "under_review" | "doctor_replied" | "resolved";
};

// ________________ COMPONENT ________________
export default function CaseDetailsCard({
  userId,
  gender,
  age,
  title,
  description,
  date,
  avatar,
  status,
}: CaseDetailCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            avatar ? { uri: avatar } : require("../../../assets/icon.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.tag}>{userId}</Text>
        <Text style={styles.tag}>{gender}</Text>
        <Text style={styles.tag}>{age}</Text>
        {status && <CaseStatus status={status} />}
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
      <FileBar
        title="Clinical Psychology License - California Board"
        icon={
          <IconWrapper size={12} bgColor="#ffffff" shape="circle">
            <ArrowLeftIcon size={8} color="#6D7EB5" />
          </IconWrapper>
        }
      />
      <FileBar title="Clinical Psychology License - California Board" />
      <View style={styles.DateContainer}>
        <ClockIcon size={12} color="#666666ac" />
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

// ________________ STYLES ________________
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff9d",
    borderRadius: Card_Radius,
    padding: scale(18),
    gap: scale(14),
    maxHeight: "50%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: scale(9),
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  tag: {
    backgroundColor: "#ffffffa1",
    paddingHorizontal: scale(8),
    paddingVertical: scale(5),
    borderRadius: Tags_Radius,
    fontSize: scale(11),
    fontFamily: Family.FG_Regular,
    borderWidth: 1,
    borderColor: palette.darkGray,
  },
  title: {
    fontSize: scale(20),
    fontFamily: Family.FG_Medium,
  },

  description: {
    fontSize: scale(14),
    color: colors.primary,
    lineHeight: scale(20),
    fontWeight: "500",
    fontFamily: Family.FG_Regular,
  },
  DateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
  },
  date: {
    fontSize: scale(10),
    color: "#666666ac",
  },
});
