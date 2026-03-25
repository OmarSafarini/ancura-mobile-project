import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color: string;
  size: number;
};

export default function ClockIcon({ color, size }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 31 31"
      fill="none"
    >
      <Path
        d="M15.5 7.44444V15.5H23.5556M15.5 30C7.49187 30 1 23.5081 1 15.5C1 7.49187 7.49187 1 15.5 1C23.5081 1 30 7.49187 30 15.5C30 23.5081 23.5081 30 15.5 30Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}