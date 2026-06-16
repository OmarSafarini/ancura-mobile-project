import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const DoctorRepliedIcon = (props) => (
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
      d="M7.33333 4.50024H8.66667C8.85076 4.50024 9 4.66814 9 4.87524V9.00024L7.889 7.96185C7.82915 7.90592 7.75359 7.87524 7.67578 7.87524H5C4.8159 7.87524 4.66667 7.70735 4.66667 7.50024V6.37524M7.33333 4.50024V3.37524C7.33333 3.16814 7.1841 3.00024 7 3.00024H3.33333C3.14924 3.00024 3 3.16814 3 3.37524V7.50036L4.111 6.4618C4.17085 6.40586 4.24641 6.37524 4.32422 6.37524H4.66667M7.33333 4.50024V6.00024C7.33333 6.20735 7.18409 6.37524 7 6.37524H4.66667"
      stroke="white"
      strokeWidth={0.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default DoctorRepliedIcon;
