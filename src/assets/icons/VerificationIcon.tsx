import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type Props = {
  color: string;
  size: number;
  bgColor?: string;
};

export default function CheckIconWithBg({ color, size, bgColor = '#D4EDDA' }: Props) {
  return (
    <View style={[styles.bgCircle, getDynamicStyle(size, bgColor)]}>
      <Svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24">
        <Path
          d="M20 6L9 17L4 12"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

const getDynamicStyle = (size: number, bgColor: string) => ({
  width: size,
  height: size,
  borderRadius: size / 2,
  backgroundColor: bgColor,
});

const styles = StyleSheet.create({
  bgCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});