import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ArrowRightIcon({
  color,
  size,
  strokeWidth = 1.5,
}: {
  color: string;
  size: number;
  strokeWidth?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      style={{ transform: [{ scaleX: -1 }] }}
    >
      <Path
        d="M11.25 14.25L6 9L11.25 3.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}