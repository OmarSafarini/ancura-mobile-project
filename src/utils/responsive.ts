import { Dimensions } from "react-native";

const Width = 430;
const { width: screenWidth } = Dimensions.get("window");

export const scale = (size: number) => (screenWidth / Width) * size;

