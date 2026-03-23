import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';

export interface BarData {
  label: string;
  value: number;
  active?: boolean;
}

interface StatisticsChartProps {
  data: BarData[];
  height?: number;
}

const DESIGN_MAX_BAR_HEIGHT = 160;
const BAR_WIDTH = 12;

const AnimatedBar = ({ targetHeight, active }: { targetHeight: number, active?: boolean }) => {
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
}: StatisticsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  const getBarHeight = (value: number) =>
    (value / maxValue) * height;

  return (
    <View style={styles.container}>
      <View style={[styles.barsRow, { height }]}>
        {data.map((item, index) => (
          <View key={index} style={styles.barColumn}>
            <AnimatedBar 
              targetHeight={getBarHeight(item.value)} 
              active={item.active} 
            />
          </View>
        ))}
      </View>

      <View style={styles.labelsRow}>
        {data.map((item, index) => (
          <Text key={index} style={styles.label}>
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginHorizontal: 16,
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
    width: BAR_WIDTH,
    borderRadius: 10,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  label: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Family.FG_Regular,
    fontSize: 12,
    color: '#303030',
  },
});