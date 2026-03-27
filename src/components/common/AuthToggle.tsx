import { Colors } from "@/utils/colors";
import { Pressable, StyleSheet, Text, View , useWindowDimensions  } from "react-native";
import { useState } from "react";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

export default function AuthToggle() {
  const [active, setActive] = useState<"signin" | "signup">("signin");
const { width } = useWindowDimensions();
  const totalWidth = width * 0.85;
  const overlap = scale(22);
  const buttonWidth = totalWidth / 2 + overlap / 2;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setActive("signin")}
        style={[ styles.button,{width: buttonWidth,left: 0,zIndex: active === "signin" ? 2 : 1,backgroundColor: active === "signin" ? Colors.primaryLight : Colors.primary,},]}>
        <Text style={[ styles.text, active === "signin" ? styles.activeText : styles.inactiveText, ]}>
          Sign in
        </Text>
      </Pressable>
      <Pressable
        onPress={() => setActive("signup")}
        style={[styles.button,{width: buttonWidth,left: buttonWidth - overlap,zIndex: active === "signup" ? 2 : 1,backgroundColor: active === "signup" ? Colors.primaryLight : Colors.primary,},]}>
        <Text style={[styles.text, active === "signup" ? styles.activeText : styles.inactiveText,]}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scale(50),
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    paddingVertical: scale(14),
    borderRadius: scale(10),
    alignItems: "center",
  },
  text: {
    fontSize: scale(12),
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