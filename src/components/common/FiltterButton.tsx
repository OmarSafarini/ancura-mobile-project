import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { scale } from "@/utils/responsive";

interface FilterButtonProps {
  title: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function FilterButton({
  title,
  isActive = false,
  onPress,
}: FilterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: isActive ? "#6D7EB5" : "transparent",
          borderColor: "#6D7EB5",
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          { color: isActive ? "#FFFFFF" : "#6D7EB5" },
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(12),
    height: scale(28),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(14),
    borderWidth: 1.5,
  },
  title: {
    fontSize: scale(12),
  },
});