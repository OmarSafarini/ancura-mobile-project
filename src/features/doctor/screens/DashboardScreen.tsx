import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import AppBackground from "@/components/layout/AppBackground";
import DoctorGreeting from "../components/DoctorGreeting";
import TimePeriodSelector from "../components/TimePeriodSelector";
import StatsCard from "../components/StatisticCard";
import ActivityLogButton from "../components/ActivityLogButton";
import StatisticsChart, { BarData } from "@/features/doctor/components/StatisticsChart";
import DoctorBNB from "../components/DoctorBNB";

import { scale } from "@/utils/responsive";

const sampleBarData: BarData[] = [
  { label: "Sat", value: 45 },
  { label: "Sun", value: 62 },
  { label: "Mon", value: 38 },
  { label: "Tue", value: 75, active: true },
  { label: "Wed", value: 55 },
  { label: "Thu", value: 68 },
  { label: "Fri", value: 42 },
  
];

export default function DoctorDashboard(navigation : any) {
  const [selectedPeriod, setSelectedPeriod] = useState<'Weekly' | 'Monthly' | 'All Time'>('Weekly');

  const handleViewActivityLog = () => {
    navigation.navigate('ActivityLog');
  };

  return (
    <AppBackground>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        <View style={styles.headerContainer}>
          <DoctorGreeting name="Lian Sawalha" image={undefined} />
          <TimePeriodSelector 
            selectedPeriod={selectedPeriod} 
            onPeriodChange={setSelectedPeriod} 
          />
        </View>

        <View style={styles.statisticsGrid}>

          <View style={styles.leftColumn}>
            <StatsCard type="comments" value="248" />
            <ActivityLogButton 
              label="Activity Log" 
              style={styles.activityButton} 
              onPress={handleViewActivityLog}
            />
          </View>

          <View style={styles.rightColumn}>
            <StatsCard type="time" value="24" />
            <StatsCard type="score" value="4.8" />
          </View>

        </View>

        <View style={styles.chartContainer}>
          <StatisticsChart 
            data={sampleBarData}
            showLabels={true}
            barWidth={scale(9)}
            spacing="space-around"
            //height={scale(175)}
            noPadding={true}
          />
        </View>

      </ScrollView>

      {/*<DoctorBNB />*/}
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: scale(45),
    paddingBottom: scale(100),
    paddingHorizontal: scale(16),
    flexGrow: 1,
    alignItems: "center", 
    justifyContent: "center",
  },

  headerContainer: {
    width: '100%',
    gap: scale(27),
    marginBottom: scale(26),
    alignItems: 'flex-start',
  },

  selectorContainer: {
  },

  statisticsGrid: {
    flexDirection: 'row',
    gap: scale(22),
    marginBottom: scale(34),
    justifyContent: 'center',
  },

  leftColumn: {
    flex: 1,
    maxWidth: scale(168),
    gap: scale(16),
  },

  rightColumn: {
    flex: 1,
    maxWidth: scale(168),
    gap: scale(16),
  },

  activityButton: {
    width: '100%',
  },
  chartContainer: {
    width: '100%',
  },
});