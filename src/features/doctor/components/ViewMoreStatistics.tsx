import { StyleSheet, Text, View, Pressable } from "react-native";
import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Family } from "@/utils/typography";
import { Colors } from "@/utils/colors";

const { width } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const rs = (size: number) => (width / guidelineBaseWidth) * size; // this code will be refactored in the future

export default function Statistics() {
  return (
    <View style={styles.container}>
`      <Pressable style={styles.arrowWrapper}>
        <Text style={styles.arrow}>{">"}</Text>  
        {/* this code will be refactored in the future */}
      </Pressable>

      {/* Statistics */}
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
    gap: rs(10),
  },

  statsWrapper: {
    backgroundColor: "#F8F6FB",
    paddingVertical: rs(7),
    paddingHorizontal: rs(23),
    borderRadius: rs(14),
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: rs(4) },
    shadowOpacity: 0.15,
    shadowRadius: rs(6),
    elevation: 6,
  },
  statsText: {
    fontSize: moderateScale(12),
    fontFamily: Family.FG_Bold,
    color: Colors.textDark,
  },

  arrowWrapper: {
    width: rs(38),
    height: rs(38),
    borderRadius: rs(19),

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: rs(5) },
    shadowOpacity: 0.18,
    shadowRadius: rs(8),
    elevation: 8,
  },
  arrow: {
    fontSize: moderateScale(18),
    fontFamily: Family.FG_Semibold,
    color: Colors.secondary,
  },
});