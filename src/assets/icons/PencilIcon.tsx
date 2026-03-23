import React from "react";
import Svg, { Path } from "react-native-svg";

export default function PencilIcon({ size = 11, color = "#6D7EB5" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
    >
      <Path
        d="M0.5 10.5H10.5M0.5 10.5V7.9336L5.5 2.80081M0.5 10.5L3 10.5L7.99999 5.3672M5.5 2.80081L7.29289 0.960284L7.29397 0.959192C7.54077 0.705836 7.66439 0.578933 7.80689 0.531402C7.93242 0.489533 8.06765 0.489533 8.19318 0.531402C8.33558 0.578899 8.45906 0.705658 8.70551 0.958655L9.79288 2.07491C10.0404 2.32899 10.1642 2.45609 10.2106 2.60259C10.2514 2.73145 10.2513 2.87025 10.2106 2.99912C10.1642 3.14551 10.0401 3.27296 9.79289 3.52668L7.99999 5.3672M5.5 2.80081L7.99999 5.3672"
        stroke={color}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
