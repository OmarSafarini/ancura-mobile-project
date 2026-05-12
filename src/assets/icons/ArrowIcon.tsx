import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color: string;
  size: number;
  opacity?: number;
};

export default function ArrowIcon({ color, size, opacity = 1 }: Props) {
  return (
    <Svg
      width={size}
      height={(size * 14) / 18}
      viewBox="0 0 18 14"
      fill="none"
      opacity={opacity}
    >
      <Path
        d="M4.15565 5.74295L0.600098 9.17153M0.600098 9.17153L4.15565 12.6001M0.600098 9.17153H12.1557C14.6103 9.17153 16.6001 7.25275 16.6001 4.88581C16.6001 2.51888 14.6103 0.600098 12.1557 0.600098H7.71121"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}