import * as React from "react";
import Svg, { Path } from "react-native-svg";

export default function ArrowLeftIcon({color, size}: { color: string; size: number;}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.25 14.25L6 9L11.25 3.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}