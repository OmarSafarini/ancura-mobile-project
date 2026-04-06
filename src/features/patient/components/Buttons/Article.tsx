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
import { Colors } from "@/utils/colors";

// __________________ CONSTANTS __________________ 
const Card_Radius = scale(11);

// __________________  TYPES __________________ 
type ArticleProps = {
  title: string;
  onPress?: () => void;
  isSelected : boolean;
};

// ________________ COMPONENT __________________
export default function Article({ title, onPress, isSelected }: ArticleProps) {
  return (
    <Pressable
      style={[styles.button, isSelected && styles.selected]}
      onPress={onPress}
    >
      <DocumentIcon size={12} color={isSelected ? Colors.formBackground : colors.primary} />
      <Text style={[styles.text, isSelected && styles.selectedText]}>{title}</Text> 
    </Pressable>
  );
}

// __________________  STYLES __________________ 
const styles = StyleSheet.create({
  button: {
  width: scale(95),     
  height: scale(29),    
  flexDirection: "row",
  justifyContent: "center", 
  alignItems: "center", 
  borderWidth: 1,
  borderColor: colors.primary,
  borderRadius: Card_Radius,
  paddingHorizontal: scale(10), 
  paddingVertical: 0,           
  gap: scale(5),
  backgroundColor: palette.white,
},

  icon: {
    justifyContent: "center",
    alignItems: "center",
  },

  selected: {
    backgroundColor: colors.primary,
  },

  selectedText: {
    color: Colors.formBackground,
  },

  text: {
    fontSize: scale(10),
    color: palette.dark,
    fontFamily:Family.FG_Regular,
    justifyContent:"center",
    alignItems:"center",
    textAlignVertical: "center", 
    includeFontPadding: false, 
    marginTop: scale(4),       
  },
});
