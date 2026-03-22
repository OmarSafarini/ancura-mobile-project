import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function PersonIcon({ size = 68, color = "#6D7EB5", bgColor = "#B6C0F9" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 68 68"
      fill="none"
    >
      <Circle
        cx="34"
        cy="34"
        r="34"
        fill={bgColor}
      />

      <Path
        d="M44.1199 48.2242C41.6335 45.4472 38.0208 43.6997 34 43.6997C29.9792 43.6997 26.3662 45.4472 23.8797 48.2242M34 51.4594C24.3574 51.4594 16.5405 43.6426 16.5405 34C16.5405 24.3574 24.3574 16.5405 34 16.5405C43.6426 16.5405 51.4594 24.3574 51.4594 34C51.4594 43.6426 43.6426 51.4594 34 51.4594ZM34 37.8799C30.7858 37.8799 28.1802 35.2742 28.1802 32.06C28.1802 28.8458 30.7858 26.2402 34 26.2402C37.2142 26.2402 39.8198 28.8458 39.8198 32.06C39.8198 35.2742 37.2142 37.8799 34 37.8799Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};