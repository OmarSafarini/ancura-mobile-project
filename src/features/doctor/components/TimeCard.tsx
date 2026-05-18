import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconWrapper from "../../../components/common/IconWrapper";
import ClockIcon from "../../../assets/icons/ClockIcon";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

export const TimeCard = ({ value, unit }: {
  value: string | number;
  unit: string;
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.title}>Avg Response Time</Text>
        <IconWrapper size={scale(36)} bgColor={palette.white}>
          <ClockIcon color={Colors.secondary} size={scale(21)} />
        </IconWrapper>
      </View>

      <View style={styles.rowBetween}>
        <View style={styles.line} />
        <Text style={styles.value}>
          {value}
          <Text style={styles.small}>{unit}</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.secondaryLight,
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
    width: scale(88),
    fontSize: scale(16),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark2,
  },

  line: {
    width: scale(4),
    height: scale(29),
    borderRadius: scale(20),
    backgroundColor: Colors.secondary,
  },

  value: {
    fontSize: scale(40),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark2,
  },

  small: {
    fontSize: scale(40),
    color: "#505050B2",
  },
});