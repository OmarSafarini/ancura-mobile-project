import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AppBackground from "@/components/base/AppBackground";
import DoctorGreeting from "../components/DoctorGreeting";
import TimePeriodSelector from "../components/TimePeriodSelector";
import StatsCard from "../components/StatisticCard";
import ActivityLogButton from "../components/ActivityLogButton";
import StatisticsChart from "@/features/doctor/components/StatisticsChart";

import { scale } from "@/utils/responsive";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getDoctorDashboardStats } from "@/services/Doctor/DoctorDashboard";
import { useDoctorBasicInfo } from "@/hooks/useDoctorBasicInfo";
import { useUserSession } from "@/hooks/useUserSession";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import Loading from "@/components/common/Loading";


export default function DoctorDashboard({ navigation }: any) {
  const { doctorId } = useUserSession();

  const [selectedPeriod, setSelectedPeriod] = useState<'Weekly' | 'Monthly' | 'All Time'>('Weekly');
  const { data: doctorInfo } = useDoctorBasicInfo(doctorId);

  const {
    data: stats = { comments: 0, time: 0, score: 0, chart: [] },
    isPending,
  } = useQuery({
    queryKey: ['doctorDashboard', selectedPeriod, doctorId],
    queryFn: () => getDoctorDashboardStats(doctorId!, selectedPeriod),
    enabled: !!doctorId,
    staleTime: 3 * 60 * 1000,
  });

  const avgTimeValue =
  stats.time >= 1440
    ? Math.round((stats.time / 1440) * 10) / 10
    : Math.round((stats.time / 60) * 10) / 10;
  const avgTimeUnit = stats.time >= 1440 ? "d" : "h";

  const comments = useAnimatedCounter(stats.comments);
  const time = useAnimatedCounter(avgTimeValue);
  const score = useAnimatedCounter(stats.score);

  useFocusEffect(
    useCallback(() => {
      comments.animate();
      time.animate();
      score.animate();
    }, [selectedPeriod])
  );

  const handleViewActivityLog = () => {
    navigation.navigate('ActivityTab');
  };

    if (isPending) {
  return (
    <AppBackground>
      <Loading text="Loading dashboard..." />
    </AppBackground>
  );
}

  return (
    <AppBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerContainer}>
          <DoctorGreeting
            name={doctorInfo?.full_name || "Doctor"}
            image={doctorInfo?.profilePic ? { uri: doctorInfo.profilePic } : undefined}
          />

          <TimePeriodSelector
            selectedPeriod={selectedPeriod}
            onPeriodChange={(period) => {
              setSelectedPeriod(period);
            }}
          />
        </View>

        <View style={styles.statisticsGrid}>
          <View style={styles.leftColumn}>
            <StatsCard type="comments" value={comments.display} />

            <ActivityLogButton
              label="Activity Log"
              style={styles.activityButton}
              onPress={handleViewActivityLog}
            />
          </View>

          <View style={styles.rightColumn}>
            <StatsCard type="time" value={time.display} unit={avgTimeUnit} />
            <StatsCard type="score" value={score.display} />
          </View>
        </View>

        <View style={styles.chartContainer}>
          <StatisticsChart
            data={stats.chart}
            showLabels={true}
            barWidth={scale(9)}
            spacing="space-around"
            noPadding={true}
          />
        </View>
      </ScrollView>
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

  selectorContainer: {},

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