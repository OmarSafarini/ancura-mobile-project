import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
  size?: number;
};

export default function LocationIcon({ color = "#6D7EB5", size = 20 }: Props) {
  return (
    <Svg
      width={size * 0.8} 
      height={size}
      viewBox="0 0 16 20"
      fill="none"
    >
      <Path
        d="M0.600098 7.62146C0.600098 12.5427 4.8446 16.6123 6.72332 18.1726C6.9922 18.3959 7.12825 18.5089 7.32884 18.5662C7.48504 18.6108 7.71493 18.6108 7.87114 18.5662C8.07211 18.5088 8.20721 18.3969 8.4771 18.1727C10.3558 16.6125 14.6001 12.5431 14.6001 7.62191C14.6001 5.75954 13.8626 3.97323 12.5499 2.65633C11.2371 1.33943 9.45674 0.599609 7.60022 0.599609C5.74369 0.599609 3.96312 1.33954 2.65036 2.65644C1.3376 3.97334 0.600098 5.75909 0.600098 7.62146Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.60013 6.68541C5.60013 7.80578 6.49556 8.71401 7.60014 8.71401C8.70471 8.71401 9.60015 7.80578 9.60015 6.68541C9.60015 5.56505 8.70471 4.65681 7.60014 4.65681C6.49556 4.65681 5.60013 5.56505 5.60013 6.68541Z"
        stroke={color}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}