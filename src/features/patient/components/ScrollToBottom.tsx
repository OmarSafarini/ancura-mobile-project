import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import ArrowDownIcon from "@/assets/icons/ArrowDownIcon"; 
import {scale} from "@/utils/responsive";
type Props = {
  onPress: () => void;
};

export default function ScrollToBottomButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <View style={styles.iconWrapper}>
        <ArrowDownIcon />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: scale(20),
    //bottom: scale(30),
    width: scale(59),
    height: scale(59),
    borderRadius: scale(30),
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",

    // shadow (iOS + Android)
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: scale(4),
    elevation: 5,
  },

  iconWrapper: {
    transform: [{ rotate: "0deg" }], // السهم جاهز لتحت
  },
});