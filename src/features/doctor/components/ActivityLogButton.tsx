import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, ViewStyle,} from 'react-native';
import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import { Colors } from '@/utils/colors';

const HEIGHT = 57;
const THUMB_SIZE = 34; 
const PADDING = 11;
const MAX_WIDTH = 240;

type SlideButtonProps = {
  label?: string;
  width?: number;
  backgroundColor?: string;
  style?: ViewStyle;
};

export default function SlideButton({ label = "Activity Log", width, backgroundColor = Colors.primary,style,}: SlideButtonProps) {
  const { width: screenWidth } = useWindowDimensions(); 
  const buttonWidth = width || Math.min(screenWidth * 0.42, MAX_WIDTH);

  return (
    <View
      style={[styles.container, { width: buttonWidth, backgroundColor }, style,]}>
      <Text style={styles.text}>{label}</Text>
      <View style={styles.thumb}>
        <ArrowRightIcon color={Colors.primary} size={THUMB_SIZE * 0.45} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },    
  text: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    marginStart : 30,
    fontSize: 13,
  },
  thumb: {
    position: 'absolute',
    left: PADDING,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});