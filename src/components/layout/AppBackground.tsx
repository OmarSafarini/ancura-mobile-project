import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, palette } from '../../utils/colors';
import LogoOverlay from '../../assets/icons/LogoOverlay';
import BackgroundTexture from '../../assets/icons/BackgroundTexture';
import { scale, screenWidth, screenHeight } from '../../utils/responsive';


export type BackgroundVariant = 'clean' | 'texture' | 'logo';

interface AppBackgroundProps {
  variant?: BackgroundVariant;
  children?: React.ReactNode;
  style?: ViewStyle;
}

export default function AppBackground({
  variant = 'clean',
  children,
  style,
}: AppBackgroundProps) {
  return (
    <LinearGradient
      colors={[
        palette.lightBlue,
        palette.offWhite,
        palette.offWhite,
        palette.lightGreen,
      ]}
      locations={[0.12, 0.3413, 0.7019, 1]}
      start={{ x: 0.6, y: 0 }}
      end={{ x: 0.4, y: 1 }}
      style={[styles.container, style]}
    >
      {variant === 'texture' && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <BackgroundTexture width={screenWidth} height={screenHeight} />
        </View>
      )}

      {variant === 'logo' && (
        <View style={[StyleSheet.absoluteFill, styles.centered]} pointerEvents="none">
          <LogoOverlay size={scale(280)} />
        </View>
      )}

      <View style={styles.content}>
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
