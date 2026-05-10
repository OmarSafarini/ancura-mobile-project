import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import ChatIcon from "@/assets/icons/ChatIcon";
import { scale } from "@/utils/responsive";
import CaseStatus from "./CaseStatus";
import ClockIcon from "@/assets/icons/ClockIcon";
import FileBar from "./FileBar";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import IconWrapper from "./IconWrapper";
import { Status } from "@/types/ICaseStatusProps";
import { useQuery } from "@tanstack/react-query";
import { getCaseById } from "@/services/Patient/Cases";
import Loading from "./Loading";

// ________________ CONSTANTS ________________
const AVATAR_SIZE = scale(25);
const Card_Radius = scale(11);
const Tags_Radius = scale(14);

//________________ TYPS ______________________
type CaseDetailsCardProps = {
  caseId: number;
};
// ________________ COMPONENT ________________
export default function CaseDetailsCard({caseId}:CaseDetailsCardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["case", caseId],
    queryFn: () => getCaseById(caseId),
  });

  if (isLoading) return <Loading/>;
  if (error || !data) return <Text>{error?.message}</Text>;
  const caseData = Array.isArray(data) ? data[0] : data;
  console.log("caseData",caseData)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            require("../../../assets/icon.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.tag}>{caseData.patient_id}</Text>
        <Text style={styles.tag}>{caseData.patient.gender}</Text>
        <Text style={styles.tag}>{caseData.patient.age}</Text>
        {caseData.status && <CaseStatus status={caseData.status} />}
      </View>

      <Text style={styles.title}>{caseData.title}</Text>

      <Text style={styles.description}>{caseData.description}</Text>
     {caseData.file &&
  <FileBar
    title={caseData.file}
    icon={
      <IconWrapper size={12} bgColor="#ffffff" shape="circle">
        <ArrowLeftIcon size={8} color="#6D7EB5" />
      </IconWrapper>
    }
  />
}
      <View style={styles.DateContainer}>
        <ClockIcon size={12} color="#666666ac" />
        <Text style={styles.date}>{caseData.Date}</Text>
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
