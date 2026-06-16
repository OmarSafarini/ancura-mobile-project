import React from "react";
import { View, StyleSheet } from "react-native";
import StatisticsChart from "./StatisticsChart";
import Statistics from "./ViewMoreStatistics";
import { scale } from "@/utils/responsive";
import { StatisticsSectionProps } from "../../../types/IViewStatisticSectionProps";

export default function StatisticsSection({ data, onPress }: StatisticsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <StatisticsChart
          data={data}
          showLabels={false}
          barWidth={scale(9)}
          noPadding={true}
          height={scale(185)}
          spacing="space-around"
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Statistics onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(252),
    height: scale(215),
    backgroundColor: "rgba(255, 255, 255, 0.45)", // premium semi-transparent overlay
    borderRadius: scale(24),
    overflow: "hidden",
    position: "relative",
  },

  chartWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  buttonWrapper: {
    position: "absolute",
    bottom: scale(18), // beautiful elevated positioning matching the mockup
    alignSelf: "center",
  },
});