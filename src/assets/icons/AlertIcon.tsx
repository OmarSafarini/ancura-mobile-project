import { Pressable, GestureResponderEvent } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

type Props = {
  size?: number;
  color?: string;
  onPress?: (event: GestureResponderEvent) => void; 
};

export default function WarningIcon({ size = 60, color = Colors.warning, onPress }: Props) {
  const svg = (
    <Svg width={scale(size)} height={scale(size)} viewBox="0 0 100 100">
      <Polygon
        points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
        stroke={color}
        strokeWidth="5"
        fill="transparent"
      />
    </Svg>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {svg}
      </Pressable>
    );
  }

  return svg;
}