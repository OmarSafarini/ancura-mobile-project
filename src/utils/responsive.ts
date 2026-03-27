import { Dimensions } from "react-native";

const Width = 430;

export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const scale = (size: number) => (screenWidth / Width) * size;

