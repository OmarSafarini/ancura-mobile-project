import { View, Text, StyleSheet, ViewStyle } from "react-native";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

type LicenseButtonProps = {
  label?: string;
  width?: number;
  backgroundColor?: string;
  thumbColor?: string;
};

const HEIGHT = scale(50);
const BUTTON_WIDTH = scale(325);
const THUMB_SIZE = scale(30);
const PADDING = scale(10);

export default function LicenseVerificationButton({ label = "Verify License Information", width, backgroundColor = Colors.formBackground, thumbColor = Colors.secondary }: LicenseButtonProps) {
  const buttonWidth = width || BUTTON_WIDTH;
  return (
    <View style={[ styles.container, { width: buttonWidth, backgroundColor, }, ]}>
      <Text style={styles.text}>{label}</Text>
      <View style={[styles.thumb, { backgroundColor: thumbColor }]}>
        <ArrowRightIcon color={Colors.formBackground} size={scale(14)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    position: "absolute",
    alignSelf: "center",
    color: Colors.textDark,
    fontSize: scale(14),
    fontFamily: Family.FG_Medium,
  },

  thumb: {
    position: "absolute",
    right: PADDING,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.15,
    shadowRadius: scale(5),
    elevation: 4,
  },
});