import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { palette,Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";

import UnderReviewIcon from "@assets/icons/UnderViewIcon";
import DoctorRepliedIcon from "@assets/icons/DoctorRepliedIcon";
import ResolvedIcon from "@assets/icons/ResolvedIcon";

const CaseStatus = ({ status, variant }: { status: string; variant?: "default" | "activityLog" }) => {

  const getConfig = () => {
    switch (status) {
      case "under_review":
        return {
          text: "Under Review",
          color: Colors.underReview,
          Icon: UnderReviewIcon
        };

      case "doctor_replied":
        return {
          text: "Doctor Replied",
          color: Colors.secondary,
          Icon: DoctorRepliedIcon
        };

      case "resolved":
        return {
          text: "Resolved",
          color: Colors.secondary,
          Icon: ResolvedIcon
        };

      default:
        return {
          text: status,
          color: "#999",
          Icon: null
        };
    }
  };

  const { text, color, Icon } = getConfig();

  return (
    <View style={[styles.container,variant === "activityLog" && styles.cardVariant]}>
  {Icon && <Icon width={12} height={12} />}

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

    backgroundColor: "#FFFFFF7A",    
    borderRadius: 11,

    width: 74,
    height: 18.22,

    gap: 2,
    marginVertical: 4,
  },

  text: {
    fontSize: 8,
    fontFamily: Family.FG_Regular,
  },

  cardVariant: {
  backgroundColor: "rgba(225, 225, 225, 0.48)", 
},

});