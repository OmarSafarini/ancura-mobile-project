import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CaseStatus from "@/components/common/CaseStatus";
import { ActivityLogCardProps } from "@/types/IActivityLogProps";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@utils/responsive";

const ActivityLogCard = ({ title, description, time, isResolved }: ActivityLogCardProps) => {
  return (
    <View style={styles.card}>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      {isResolved && (
        <View style={styles.statusContainer}>
          <CaseStatus status="resolved" variant="activityLog"/>
        </View>
      )}

    </View>
  );
};

export default ActivityLogCard;

const styles = StyleSheet.create({

  card: {
    backgroundColor: palette.white,
    borderRadius: scale(30),
   
    width: scale(327),
    height: scale(100.75),
    marginBottom: scale(12),

    shadowColor: Colors.shadow,
    shadowOpacity: 0.05,
    shadowRadius: scale(4),
    elevation: scale(3),
  },

  header: {
    marginLeft:scale(30),
    marginTop: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  timeContainer: {
    marginRight: scale(30)
  },

  title: {
    fontSize: scale(16),
    fontFamily:Family.FG_Regular,
    color: Colors.textDark
  },

  time: {
    fontSize: scale(10),
    fontFamily:Family.FG_Regular,
    color: Colors.textGray
  },

  descriptionContainer: {
    marginLeft:scale(30),
    marginTop: scale(8)
  },

  description: {
    fontSize: scale(10),
    color: Colors.textBlue,
    fontFamily:Family.FG_Regular,
    lineHeight: scale(14)
  },

  statusContainer: {
    marginRight: scale(21),
    marginBottom: scale(9.53),
    alignItems: "flex-end"
  }

});