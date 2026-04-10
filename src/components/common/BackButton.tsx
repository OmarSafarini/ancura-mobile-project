import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { scale } from "@/utils/responsive";
import { Colors ,palette} from "@/utils/colors";

type Props = {
  onPress?: () => void;
};

export default function BackButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <ArrowLeftIcon size={scale(18)} color="#071E3D" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: scale(33),
    height: scale(33),
    backgroundColor: palette.white,
    borderRadius: scale(8), 
    justifyContent: "center",
    alignItems: "center",
  },
});