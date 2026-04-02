import { Colors } from "@/utils/colors";
import { Pressable, StyleSheet, Text, View , useWindowDimensions  } from "react-native";
import { useState } from "react";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

interface AuthToggleProps {
  value: "signin" | "signup";
  onChange: (value: "signin" | "signup") => void;
}

export default function AuthToggle({ value, onChange }: AuthToggleProps) {
  return (
    <View style={[styles.container, { width: "100%" }]}>
      
      <View 
        style={[
          styles.activeBackground, 
          { 
            left: value === "signin" ? 0 : undefined,
            right: value === "signup" ? 0 : undefined,
          }
        ]} 
      />

      <Pressable
        onPress={() => onChange("signin")}
        style={styles.tab}
      >
        <Text style={[styles.text, value === "signin" ? styles.activeText : styles.inactiveText]}>
          Sign in
        </Text>
      </Pressable>

      <Pressable
        onPress={() => onChange("signup")}
        style={styles.tab}
      >
        <Text style={[styles.text, value === "signup" ? styles.activeText : styles.inactiveText]}>
          Sign up
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: scale(50),
    alignSelf: "center",
    backgroundColor: Colors.primary,
    borderRadius: scale(10),
    flexDirection: "row", 
  },
  activeBackground: {
    position: "absolute",
    height: "100%",
    width: "50%", 
    backgroundColor: Colors.primaryLight, 
    borderRadius: scale(10),
    zIndex: 0,
  },
  tab: {
    flex: 1, 
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, 
  },
  text: {
    fontSize: scale(16),
    fontFamily: Family.FG_Medium, 
    top: scale(2), 
  },
  activeText: {
    color: Colors.textDark,
  },
  inactiveText: {
    color: "rgba(255,255,255,0.6)",
  },
});