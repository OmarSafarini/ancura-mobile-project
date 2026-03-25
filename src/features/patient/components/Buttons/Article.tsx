import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { Colors as colors, palette } from "../../../../utils/colors";
import DocumentIcon from "../Icons/DoucmentIcon";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";


// __________________ CONSTANTS __________________ 
const Card_Radius = scale(11);

// __________________  TYPES __________________ 
type ArticleProps = {
  title: string;
  onPress?: () => void;
};

// __________________ COMPONENT __________________
export default function Article({ title, onPress }: ArticleProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <DocumentIcon size={12} color={colors.primary} />
      <Text style={styles.text}>{title}</Text> 
    </Pressable>
  );
}

// __________________  STYLES __________________ 
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: Card_Radius,
    paddingHorizontal: scale(21),
    paddingVertical: scale(8),
    gap: scale(6),
    backgroundColor: palette.white,
  },

  icon: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: scale(10),
    color: palette.dark,
    fontFamily:Family.FG_Regular
  },
});
