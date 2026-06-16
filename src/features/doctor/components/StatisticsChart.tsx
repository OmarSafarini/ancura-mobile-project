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

const AnimatedBar = ({ 
  targetHeight, 
  active,
  width, 
  maxHeight,
  activeColor = palette.darkGreen,
  inactiveColor = '#E4E0EB',
  inactiveOpacity = 0.6
}: { 
  targetHeight: number, 
  active?: boolean, 
  width?: number,
  maxHeight: number,
  activeColor?: string,
  inactiveColor?: string,
  inactiveOpacity?: number
}) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: targetHeight,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [targetHeight]);

  // Use a beautifully translucent grey color as the background track
  const trackColor = inactiveColor.startsWith('#') ? `${inactiveColor}33` : 'rgba(228, 224, 235, 0.4)';

  return (
    <View style={{ height: maxHeight, width, justifyContent: 'flex-end', alignItems: 'center' }}>
      {/* Actual Bar */}
      <Animated.View
        style={[
          styles.bar,
          {
            width,
            height: animatedHeight,
            backgroundColor: active ? activeColor : inactiveColor,
            opacity: active ? 1 : inactiveOpacity,
          },
        ]}
      />
    </View>
  );
};

export default function StatisticsChart({
  data,
  height = DESIGN_MAX_BAR_HEIGHT,
  showLabels = true,
  barWidth = BAR_WIDTH,   
  spacing = "space-between",
  noPadding = false,
  activeBarColor,
  inactiveBarColor,
  inactiveBarOpacity,
}: StatisticsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  const getBarHeight = (value: number) =>
    (value / maxValue) * height;

  return (
    <View
      style={[
        styles.container,
        noPadding && {
          backgroundColor: 'transparent',
          borderRadius: 0,
          paddingVertical: 0,
          paddingHorizontal: scale(16), // inset columns and labels so they are never cut off at the edges
          marginHorizontal: 0,
        },
      ]}
    >
      <View style={[styles.barsRow, { height, justifyContent: spacing }]}>
        {data.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            <AnimatedBar 
              targetHeight={getBarHeight(item.value)} 
              active={item.active} 
              width={barWidth}
              maxHeight={height}
              activeColor={activeBarColor}
              inactiveColor={inactiveBarColor}
              inactiveOpacity={inactiveBarOpacity}
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
    marginHorizontal: 0,
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
    fontFamily: Family.FG_Medium,
    fontSize: scale(12),
    color: '#08070E',
    opacity: 0.9,
  },
});