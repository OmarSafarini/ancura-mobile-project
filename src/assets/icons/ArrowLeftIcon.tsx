import * as React from "react";
import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";

type ArrowLeftIconProps = {
  color: string;
  size: number;
  onPress?: () => void;
};

export default function ArrowLeftIcon({ color, size, onPress }: ArrowLeftIconProps) {
  return (
    <Pressable 
        onPress={onPress} 
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        <Path
          d="M11.25 14.25L6 9L11.25 3.75"
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Pressable>
  );
}