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
    width: scale(34),
    height: scale(34),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(6),
    backgroundColor: Colors.formBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
});