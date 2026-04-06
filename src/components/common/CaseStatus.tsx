import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette,Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@utils/responsive";
import { CaseStatusProps,Variant } from "@/types/ICaseStatusProps";
import { caseStatusMap } from "@/types/ICaseStatusMap";



const CaseStatus = ({ status, variant="default",backgroundColor="rgba(216, 216, 216, 0.48)" }: CaseStatusProps) => {

  const config = caseStatusMap[status];

  const { text, color, Icon } = config;

  return (
    <View style={[styles.container,variant === "activityLog" && styles.cardVariant,{backgroundColor:backgroundColor}]}>
  {Icon && <Icon width={scale(12)} height={scale(12)} />}

  <Text style={[styles.text, { color }]}>
    {text}
  </Text>
</View>
  );
};

export default CaseStatus;

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(216, 216, 216, 0.48)",
    borderRadius: scale(11),

    width: scale(74),
    height: scale(18.22),

    gap: scale(2),
    marginVertical: scale(4),
  },

  text: {
    fontSize: scale(8),
    fontFamily: Family.FG_Regular,
  },

  cardVariant: {
  backgroundColor: "rgba(225, 225, 225, 0.48)", 
},

});