import { StyleSheet, Text, View, Pressable } from "react-native";
import { Family } from "@/utils/typography";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";


export default function Statistics() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.arrowWrapper}>
        <ArrowRightIcon size={scale(22)} color={Colors.secondary} />
      </Pressable>
      <Pressable style={styles.statsWrapper}>
        <Text style={styles.statsText}>Statistics</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10),
  },

  statsWrapper: {
    width: scale(129),
    height: scale(35),
    backgroundColor: "#F8F6FB",
    borderRadius: scale(14),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: scale(4) },
    shadowOpacity: 0.15,
    shadowRadius: scale(6),
    elevation: 6,
  },
  statsText: {
    fontSize: scale(12),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },
  arrowWrapper: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.formBackground,
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: scale(5) },
    shadowOpacity: 0.18,
    shadowRadius: scale(8),
    elevation: 8,
  },
  arrow: {
    fontSize: scale(18),
    fontFamily: Family.FG_Semibold,
    color: Colors.secondary,
  },
});