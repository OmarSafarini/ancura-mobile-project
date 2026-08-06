import { Dimensions, Platform } from "react-native";

const Width = 430;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

export const screenWidth = Platform.OS === 'web' && windowWidth > 768 ? 390 : windowWidth;
export const screenHeight = Platform.OS === 'web' && windowWidth > 768 ? 844 : windowHeight;

export const scale = (size: number) => (screenWidth / Width) * size;
