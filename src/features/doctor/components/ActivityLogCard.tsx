import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CaseStatus from "@/components/common/CaseStatus";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";

const ActivityLogCard = ({ title, description, time, isResolved }: { title: string; description: string; time: string; isResolved?: boolean; }) => {
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
    borderRadius: 30,
   
    width: 327,
    height: 100.75,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },

  header: {
    marginLeft:30,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  timeContainer: {
    marginRight: 30
  },

  title: {
    fontSize: 16,
    fontFamily:Family.FG_Regular,
    color: Colors.textDark
  },

  time: {
    fontSize: 10,
    fontFamily:Family.FG_Regular,
    color: Colors.textGray
  },

  descriptionContainer: {
    marginLeft:30,
    marginTop: 8
  },

  description: {
    fontSize: 10,
    color: Colors.textBlue,
    fontFamily:Family.FG_Regular,
    lineHeight: 14
  },

  statusContainer: {
    marginRight: 21,
    marginBottom: 9.53,
    alignItems: "flex-end"
  }

});