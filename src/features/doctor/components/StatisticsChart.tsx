import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '@utils/responsive';

import { BarData, StatisticsChartProps } from "../../../types/IStatisticsChartProps";


const DESIGN_MAX_BAR_HEIGHT = scale(160);
const BAR_WIDTH = scale(12);

const AnimatedBar = ({ targetHeight, active,width, }: { targetHeight: number, active?: boolean, width?: number }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: targetHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [targetHeight]);

  return (
    <Animated.View
      style={[
        styles.bar,
        {
          width,
          height: animatedHeight,
          backgroundColor: active ? palette.darkGreen : '#E4E0EB',
          opacity: active ? 1 : 0.6,
        },
      ]}
    />
  );
};

export default function StatisticsChart({
  data,
  height = DESIGN_MAX_BAR_HEIGHT,
  showLabels = true,
  barWidth = BAR_WIDTH,   
  spacing = "space-between",

}: StatisticsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  const getBarHeight = (value: number) =>
    (value / maxValue) * height;

  return (
    <View style={styles.container}>
      <View style={[styles.barsRow, { height, justifyContent: spacing }]}>
        {data.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            <AnimatedBar 
              targetHeight={getBarHeight(item.value)} 
              active={item.active} 
              width={barWidth}
            />
          </View>
        ))}
      </View>
      
      {showLabels && (
      <View style={styles.labelsRow}>
        {data.map((item, index) => (
          <Text key={index} style={styles.label}>
            {item.label}
          </Text>
        ))}
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderRadius: scale(24),
    paddingVertical: scale(24),
    paddingHorizontal: scale(20),
    marginHorizontal: scale(16),
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  bar: {
    //width: BAR_WIDTH,
    borderRadius: scale(10),
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: scale(16),
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Family.FG_Regular,
    fontSize: scale(12),
    color: '#303030',
  },
});