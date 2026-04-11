import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconWrapper from "../../../components/common/IconWrapper";
import StartwithTickIcon from "../../../assets/icons/StartwithTickIcon";
import { palette, Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

export const ScoreCard = ({ value }: {
  value: string | number;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>Reputation Score</Text>
        <IconWrapper size={scale(36)} bgColor={Colors.primary}>
          <StartwithTickIcon color={palette.white} size={scale(21)} />
        </IconWrapper>
      </View>

      <View style={styles.rowBetween}>
        <View style={styles.line} />
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e3dfea",
    borderRadius: scale(15),
    height: scale(130),
    width: scale(160),
    padding: scale(16),
    justifyContent: "space-between",
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    width: scale(90),
    fontSize: scale(16),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark2,
  },

  line: {
    width: scale(4),
    height: scale(29),
    borderRadius: scale(20),
    backgroundColor: Colors.primary,
  },

  value: {
    fontSize: scale(40),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark2,
  },
});