import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  size: number;
  bgColor?: string;
  shape?: "circle" | "square";
  //so the icon will be in the shape
  children: React.ReactNode;
};

export default function IconWrapper({
  size,
  bgColor = "#eee",
  shape = "circle",
  children,
}: Props) {
  return (
    <View style={[styles.bg, dynamicStyle(size, bgColor, shape)]}>
      {/*any thing inside the wrapper will be shown here */}
      {children}
    </View>
  );
}

const dynamicStyle = (size: number, bgColor: string, shape: "circle" | "square") => ({
  width: size,
  height: size,
  //16 according to figma
  borderRadius: shape === "circle" ? size / 2 : 16, 
  backgroundColor: bgColor,
});

const styles = StyleSheet.create({
  bg: {
    justifyContent: "center",
    alignItems: "center",
  },
});