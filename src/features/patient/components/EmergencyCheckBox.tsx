import { palette } from "@/utils/colors";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";


function EmergencyCheckBox({ onPress, isActive=false }: any) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.toggleOuter,
        {
          borderColor: palette.red,
          backgroundColor: palette.white,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
      hitSlop={10}
    >
        <View
          style={[
            styles.toggleInner,
            {
              backgroundColor: palette.red,
              opacity: isActive ? 1 : 0,
            },
          ]}
        />
    </Pressable>
  );
}

export default EmergencyCheckBox;

const styles = StyleSheet.create({
  toggleOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
});