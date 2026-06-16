import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ResolvedIcon = (props) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={5.79851} cy={5.79851} r={5.79851} fill="#8EB392" />
    <Path
      d="M8.27692 3.77686L4.64904 7.49025L3 5.80234"
      stroke="white"
      strokeWidth={1.0}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ResolvedIcon;
