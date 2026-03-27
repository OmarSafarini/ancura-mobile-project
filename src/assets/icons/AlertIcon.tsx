import Svg, { Polygon } from "react-native-svg";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";


export default function WarningIcon({ size = 60, color = Colors.warning }: {size?: number, color?: string}) {
  return (
    <Svg width={scale(size)} height={scale(size)} viewBox="0 0 100 100">
      <Polygon
        points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
        stroke={color}
        strokeWidth="5"
        fill="transparent"
      />
    </Svg>
  );
}