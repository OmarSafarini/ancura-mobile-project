import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';

import { TimePeriod, TimePeriodSelectorProps } from "../../../types/ITimePeriodSelectorProps";

const PERIODS: TimePeriod[] = ['Weekly', 'Monthly', 'All Time'];

export default function TimePeriodSelector({
  selectedPeriod,
  onPeriodChange,
}: TimePeriodSelectorProps) {
  return (
    <View style={styles.container}>
      {PERIODS.map((period) => {
        const isActive = selectedPeriod === period;
        return (
          <TouchableOpacity
            key={period}
            style={[
              styles.segment,
              isActive && styles.segmentActive,
            ]}
            onPress={() => onPeriodChange(period)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.segmentText,
                isActive && styles.segmentTextActive,
              ]}
            >
              {period}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    borderRadius: 15,
    padding: 6,
    marginVertical: 10,
    width: '100%',
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  segmentActive: {
    backgroundColor: palette.lightBlue,
  },
  segmentText: {
    fontFamily: Family.FG_Regular,
    fontSize: 16,
    color: '#303030',
  },
  segmentTextActive: {
    fontFamily: Family.FG_Medium,
  },
});
