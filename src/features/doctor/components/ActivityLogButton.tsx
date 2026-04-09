import {View, Text, StyleSheet, useWindowDimensions, ViewStyle, Pressable,} from "react-native";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@/utils/responsive";

type SlideButtonProps = {
  label?: string;
  width?: number;
  backgroundColor?: string;
  style?: ViewStyle;
  onPress?: () => void;
};

const HEIGHT = scale(50);        
const BUTTON_WIDTH = scale(154); 
const THUMB_SIZE = scale(30);    
const PADDING = scale(10); 

export default function ActivityLogButton({ label = "Activity Log", width, backgroundColor = Colors.primary,style, onPress }: SlideButtonProps) {
  const { width: screenWidth } = useWindowDimensions();
  const buttonWidth = width || BUTTON_WIDTH;
  return (
    <Pressable
      style={[styles.container,{width: buttonWidth,backgroundColor,},style,]} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.thumb}>
        <ArrowRightIcon
          color={Colors.primary}
          size={scale(THUMB_SIZE * 0.65)}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: "center",
    alignSelf: "center",
  },

  text: {
    position: "absolute",
    alignSelf: "center",
    color: Colors.formBackground,
    marginStart: scale(25),
    fontSize: scale(13),
    fontFamily: Family.FG_Medium,
  },

  thumb: {
    position: "absolute",
    left: PADDING,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Colors.formBackground,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: scale(3) },
    shadowOpacity: 0.15,
    shadowRadius: scale(5),
    elevation: 4,
  },
});