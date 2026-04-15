import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import AppBackground from "@/components/base/AppBackground";
import DoctorGreeting from "../components/DoctorGreeting";
import TimePeriodSelector from "../components/TimePeriodSelector";
import StatsCard from "../components/StatisticCard";
import ActivityLogButton from "../components/ActivityLogButton";
import StatisticsChart from "@/features/doctor/components/StatisticsChart";
import { doctorPeriodData } from "@/types/mockData";

import { scale } from "@/utils/responsive";

// --- Animated Counter Hook ---
function useAnimatedCounter(target: number, duration = 700) {
  const [display, setDisplay] = useState(0);
  const animValue = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    animValue.setValue(0);
    const listener = animValue.addListener(({ value }) => {
      setDisplay(Math.floor(value));
    });
    Animated.timing(animValue, {
      toValue: target,
      duration,
      useNativeDriver: false,
    }).start(() => {
      animValue.removeListener(listener);
      setDisplay(target);
    });
    return listener;
  }, [target, duration]);

  useEffect(() => {
    const listenerId = animate();
    return () => animValue.removeListener(listenerId);
  }, [animate]);

  return { display, animate };
}

export default function DoctorDashboard({ navigation }: any) {
  const [selectedPeriod, setSelectedPeriod] = useState<'Weekly' | 'Monthly' | 'All Time'>('Weekly');
  const data = doctorPeriodData[selectedPeriod];

  const comments = useAnimatedCounter(data.comments);
  const time = useAnimatedCounter(data.time);
  const score = useAnimatedCounter(data.score);

  // Re-animate every time the screen comes into focus
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
            <StatsCard type="time" value={time.display} />
            <StatsCard type="score" value={score.display} />
          </View>
        </View>

        <View style={styles.chartContainer}>
          <StatisticsChart
            data={data.chart}
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