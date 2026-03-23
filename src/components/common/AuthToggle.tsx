import { Colors } from "@/utils/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import { Dimensions } from "react-native";
import { Family } from "@/utils/typography";

const { width } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const rs = (size: number) => (width / guidelineBaseWidth) * size; // this code will be refactored in the future from line 9 to 11

export default function AuthToggle() {
  const [active, setActive] = useState<"signin" | "signup">("signin");

  const totalWidth = width * 0.85;
  const overlap = rs(22);
  const buttonWidth = totalWidth / 2 + overlap / 2;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setActive("signin")}
        style={[
          styles.button,
          {
            width: buttonWidth,
            left: 0,
            zIndex: active === "signin" ? 2 : 1,
            backgroundColor:
              active === "signin" ? Colors.primaryLight : Colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            active === "signin"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Sign in
        </Text>
      </Pressable>

      <Pressable
        onPress={() => setActive("signup")}
        style={[
          styles.button,
          {
            width: buttonWidth,
            left: buttonWidth - overlap,
            zIndex: active === "signup" ? 2 : 1,
            backgroundColor:
              active === "signup" ? Colors.primaryLight : Colors.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            active === "signup"
              ? styles.activeText
              : styles.inactiveText,
          ]}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: rs(50),
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    paddingVertical: rs(13),
    borderRadius: rs(10),
    alignItems: "center",
  },
  text: {
    fontSize: moderateScale(12),
    fontFamily: Family.FG_Regular, 
  },
  activeText: {
    color: Colors.textDark,
    fontFamily: Family.FG_Semibold, 
  },
  inactiveText: {
    color: "rgba(255,255,255,0.6)",
    fontFamily: Family.FG_Regular,
  },
});