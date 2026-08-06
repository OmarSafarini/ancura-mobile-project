import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconWrapper from "../../../components/common/IconWrapper";
import ChatIcon from "../../../assets/icons/ChatIcon";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

export const CommentCard = ({ value }: {
  value: string | number;
}) => {
  return (
    <View style={styles.card}>
      <IconWrapper size={scale(36)} bgColor="#e3dfea">
        <ChatIcon color={Colors.primary} size={scale(21)} />
      </IconWrapper>

      <Text style={styles.value}>{value}</Text>

      <View style={styles.row}>
        <View style={styles.line} />
        <Text style={styles.subtitle}>Comments on patients case </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF80",
    borderRadius: scale(15),
    height: scale(205),
    width: "100%",
    padding: scale(12),
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  value: {
    fontSize: scale(64),
    fontFamily: Family.FG_Medium,
    color: "#44434680",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },

  line: {
    width: scale(4),
    height: scale(29),
    borderRadius: scale(20),
    backgroundColor: Colors.primary,
  },

  subtitle: {
    width: scale(83),
    fontSize: scale(14),
    fontFamily: Family.FG_Regular,
    color: "#00000080",
  },
});