import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
export default function YoutubeIcon({ size = 28, color = Colors.darkPink }) {
  return (
    <Svg
      width={scale(size)}
      height={scale(size)}
      viewBox="0 0 30 31"
    >
      <Path
        d="M1 26.0511V4.95054C1 3.2106 1 2.33967 1.37353 1.82487C1.69954 1.37556 2.20204 1.08055 2.7599 1.01002C3.39885 0.929244 4.18252 1.33893 5.7476 2.15714L25.9284 12.7074L25.9357 12.7106C27.6653 13.6148 28.5305 14.0671 28.8143 14.67C29.0619 15.1959 29.0619 15.803 28.8143 16.3289C28.5301 16.9326 27.6629 17.3868 25.9284 18.2936L5.7476 28.8438C4.1814 29.6626 3.39908 30.0707 2.7599 29.9899C2.20204 29.9194 1.69954 29.6245 1.37353 29.1752C1 28.6603 1 27.791 1 26.0511Z"
        stroke={color}
        fill={`${Colors.pink}20`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}