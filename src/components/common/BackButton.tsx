import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";

type Props = {
  onPress?: () => void;
};

export default function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <View pointerEvents="none">
        <ArrowLeftIcon size={scale(18)} color={Colors.textDark2} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: scale(6),
    backgroundColor: Colors.formBackground,
    padding: scale(8),
    justifyContent: "center",
    alignItems: "center",
  },
});