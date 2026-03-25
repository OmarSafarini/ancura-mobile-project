import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { palette } from '../../utils/colors';

interface TickIconProps {
  size?: number;
}

export default function TickIcon({ size = 85 }: TickIconProps) {
  return (
    <Svg width={size} height={size} viewBox="57 0 85 85" fill="none">
      <Circle cx="99.5" cy="42.5" r="42.5" fill={palette.lightGreen} />
      <Circle cx="99.5" cy="42.5" r="32.5" fill={palette.darkGreen} />
      <Path
        d="M113 33L94.4375 52L86 43.3636"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
