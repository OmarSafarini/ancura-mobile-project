import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Colors as colors, palette } from "../../../../utils/colors";
import DocumentIcon from "../Icons/DoucmentIcon";

// ================= RESPONSIVE =================
const { width: Screen_Width } = Dimensions.get("window");
const Base_Width = 432;
const scale = (size: number) => (Screen_Width / Base_Width) * size;

// ================= CONSTANTS =================
const Card_Radius = scale(11);

// ================= TYPES =================
type ArticleProps = {
  title: string;
  onPress?: () => void;
};

// ================= COMPONENT =================
export default function Article({ title, onPress }: ArticleProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}  activeOpacity={0.7}>
      <DocumentIcon size={16} color={colors.primary} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: Card_Radius,
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    gap: scale(6),
    backgroundColor: palette.white,
  },

  icon: {
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: scale(13),
    color: palette.dark,
  },
});
