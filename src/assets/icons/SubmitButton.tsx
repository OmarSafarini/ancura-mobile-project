import Svg, { Circle, Path } from "react-native-svg";

type Props = {
  size?: number;
  backgroundColor?: string;
  arrowColor?: string;
};

export default function ArrowInCircle({ size = 59, backgroundColor = "#8EB392", arrowColor = "#FFFFFF",}: Props) {

  return (
    <Svg width={size} height={size} viewBox="0 0 59 59" fill="none">
      <Circle
        cx="29.5"
        cy="29.5"
        r="25"
        fill={backgroundColor}
      />
      <Path
        d="M29.5 20L24 25.5M29.5 20L35 25.5M29.5 20V38"
        stroke={arrowColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}