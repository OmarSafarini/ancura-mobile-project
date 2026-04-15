import React from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { scale } from "@/utils/responsive";

interface NormalButtonProps {
  title: string;
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function NormalButton({
  title,
  onPress,
  bgColor,
  textColor,
  loading = false,
  disabled = false,
}: NormalButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.container,
        bgColor ? { backgroundColor: bgColor } : { backgroundColor: "#6D7EB5" },
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor ?? "#FFFFFF"} size="small" />
      ) : (
        <Text style={[styles.title, textColor ? { color: textColor } : { color: "#FFFFFF" }]}>
          {title ?? "There is no title"}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: scale(50),
    borderRadius: scale(8),
  },
  title: {
    fontWeight: "500",
    fontSize: scale(16),
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});