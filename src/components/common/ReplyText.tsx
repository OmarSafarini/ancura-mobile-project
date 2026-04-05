import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";

type Props = {
  title: string;
  color: string;
};

export default function ReplyText({ title, color }: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: color }]} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
  },

  line: {
    width: scale(6),
    height: scale(30),
    borderRadius: scale(11),
  },

  text: {
    fontSize: scale(20),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },
});