import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";

import AppBackground from "@/components/layout/AppBackground"; 
import DoctorGreeting from "../components/DoctorGreeting";
import CaseCard from "@/components/common/CaseCard";
import IconWrapper from "@/features/doctor/components/Icons/IconWrapper";
import ClockIcon from "@/features/doctor/components/Icons/ClockIcon";
import ChatIcon from "../components/Icons/ChatIcon";
import StartwithTickIcon from "../components/Icons/StartwithTickIcon";
import StatisticsSection from "../components/ViewStatisticSection";
import DoctorBNB from "../components/DoctorBNB";

import { Colors,palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

export default function DoctorDashboardAndCases({ navigation }: any) {

  const handleViewAllCases = () => {
    navigation.navigate('DoctorHomeScreen');
  };

  const handleViewDashboardScreen = () => {
    navigation.navigate('DashboardScreen');
  };

  const cases = [
    { title: "Anxiety and sleep problem", created_at: "2h ago", status: "Under Review"},
    { title: "Headache after work", created_at: "5h ago", status: "Doctor Replied" },
    { title: "Stomach pain", created_at: "1d ago", status: "Resolved" },
    { title: "Back pain", created_at: "3d ago", status: "", isEmergency: true },
    { title: "Stomach pain", created_at: "1d ago", status: "Resolved" },
    { title: "Back pain", created_at: "3d ago", status: "" },
  ];

  const chartData = [
    { label: "Sat", value: 20 },
    { label: "Sun", value: 45 },
    { label: "Mon", value: 30 },
    { label: "Tue", value: 70, active: true },
    { label: "Wed", value: 50 },
    { label: "Thu", value: 35 },
    { label: "Fri", value: 60 },
  ];

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={styles.screen}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>

          <View style={styles.greetingContainer}>
            <DoctorGreeting name="Smith" image={undefined} />
          </View>

          <View style={styles.box}>
            <View style={styles.chartBox}>
              <StatisticsSection data={chartData} onPress={handleViewDashboardScreen} />
            </View>

            <View style={styles.iconsColumn}>
              <IconWrapper size={scale(65)} bgColor={Colors.secondary} shape="square">
                <ClockIcon size={scale(29)} color={palette.white} />
              </IconWrapper>

              <IconWrapper size={scale(65)} bgColor={palette.white} shape="square">
                <ChatIcon size={scale(27)} color={Colors.primary} />
              </IconWrapper>

              <IconWrapper size={scale(65)} bgColor={Colors.primary} shape="square">
                <StartwithTickIcon size={scale(29)} color={palette.white} />
              </IconWrapper>
            </View>
          </View>

          <View style={styles.casesContainer}>
            <View style={styles.grid}>
              <View style={styles.column}>
                {cases.slice(0, 3).map((item, index) => (
                  <CaseCard key={index} data={item as any} />
                ))}
              </View>

              <View style={styles.column}>
                {cases.slice(3, 6).map((item, index) => (
                  <CaseCard key={index} data={item as any} />
                ))}
              </View>
            </View>

            <Pressable 
              style={styles.viewCasesContainer} 
              onPress={handleViewAllCases}
            >
              <Text style={styles.viewCases}>View all cases</Text>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: scale(20),
  },

  contentWrapper: {
    width: scale(333),
  },

  greetingContainer: {
    alignSelf: 'flex-start',   
    marginLeft: -scale(20),           
    marginBottom: scale(20),  
  },

  box: {
    width: scale(333),
    height: scale(217),
    flexDirection: "row",
    justifyContent: "space-between",
    //marginBottom: scale(25),
  },

  chartBox: {
    width: scale(230),
    height: scale(215),
    backgroundColor: "rgba(255,255,255,0.5)",
    borderRadius: scale(24),
    overflow: "hidden",
    padding: 0,
  },

  iconsColumn: {
    width: scale(80),
    height: scale(217),
    justifyContent: "space-between",
    alignItems: "center",
  },

  casesContainer: {
    width: scale(333),
    marginTop: scale(20),
  },

  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  column: {
    width: scale(160),
    flexDirection: "column",
    gap: scale(15),
  },

  viewCasesContainer: {
    marginTop: scale(15),
    alignSelf: 'flex-end',    
  },

  viewCases: {
    fontSize: scale(14),
    fontFamily: Family.FG_Regular,
    color: Colors.secondary,
  },
});