import React from "react";
import { View, StyleSheet } from "react-native";
import StatisticsChart, { BarData } from "./StatisticsChart";
import Statistics from "./ViewMoreStatistics";
import { scale } from "@/utils/responsive";

interface StatisticsSectionProps {
  data: BarData[];
}

export default function StatisticsSection({ data }: StatisticsSectionProps) {
  return (
    <View style={styles.container}>

      <View style={styles.chartWrapper}>
        
          <StatisticsChart data={data} showLabels={false} barWidth={scale(6)} noPadding={true} height={scale(168)}/>
       
      </View>

      <View style={styles.buttonWrapper}>
        <Statistics />
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: scale(230),
    height: scale(215),
    backgroundColor: 'rgba(255,255,255,0.50)',
    borderRadius: scale(24),
    overflow: "hidden",
    position: 'relative',
  },

  chartWrapper: {
    width: '100%',
    position:'absolute',
    bottom: -scale(10), 
    left: -scale(10),

  },
  

  buttonWrapper: {
    position: "absolute",
    bottom: scale(10),
    alignSelf: "center",
  },
});