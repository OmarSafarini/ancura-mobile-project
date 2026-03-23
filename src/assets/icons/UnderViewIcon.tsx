import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const UnderViewIcon = (props) => (
  <Svg
    width={12}
    height={12}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={5.79851} cy={5.79851} r={5.79851} fill="#E87000" />
    <Path
      d="M5.79854 3.80434V5.79854H7.79273M5.79854 9.38809C3.81608 9.38809 2.20898 7.78099 2.20898 5.79854C2.20898 3.81608 3.81608 2.20898 5.79854 2.20898C7.78099 2.20898 9.38809 3.81608 9.38809 5.79854C9.38809 7.78099 7.78099 9.38809 5.79854 9.38809Z"
      stroke="white"
      strokeWidth={0.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default UnderViewIcon;
