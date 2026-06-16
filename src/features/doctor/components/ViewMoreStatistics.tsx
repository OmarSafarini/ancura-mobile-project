import { StyleSheet, Text, View, Pressable } from "react-native";
import { Family } from "@/utils/typography";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";

interface Props {
  onPress?: () => void;
}

export default function Statistics({ onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.arrowWrapper}>
        <ArrowRightIcon size={scale(24)} color={Colors.secondary} strokeWidth={1.5} />
      </View>
      <View style={styles.statsWrapper}>
        <Text style={styles.statsText}>Statistics</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10), // clean space separating the buttons
  },

  statsWrapper: {
    width: scale(135), // elegant compact width
    height: scale(44), // elegant height
    backgroundColor: "#FFFFFF",
    borderRadius: scale(22), // perfect capsule rounding
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    zIndex: 1,
    // Individual shadow restored to the pill to separate it visually:
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 4,
  },
  statsText: {
    fontSize: scale(20), // beautifully large and clear text
    fontFamily: Family.FG_Medium, // elegant lighter medium font weight
    color: "#444346", // custom requested text color
    letterSpacing: -0.4,
    textAlign: "center",
    paddingTop: scale(3.5), // perfect vertical alignment nudge
  },
  arrowWrapper: {
    width: scale(52), // perfect circular button size
    height: scale(52),
    borderRadius: scale(26),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    zIndex: 2,
    // Individual shadow restored to the circle button to separate it visually as a layer:
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.12,
    shadowRadius: scale(6),
    elevation: 6,
  },
});