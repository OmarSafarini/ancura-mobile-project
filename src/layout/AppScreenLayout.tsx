import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppBackground, { BackgroundVariant } from '../components/base/AppBackground';
import { scale } from '../utils/responsive';

interface AppScreenLayoutProps {
  children: React.ReactNode;
  variant?: BackgroundVariant;
  style?: ViewStyle;
  disableHorizontalPadding?: boolean;
}

export default function AppScreenLayout({
  children,
  variant = 'clean',
  style,
  disableHorizontalPadding = false,
}: AppScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  
  // Web mockup needs manual safe area since insets are 0
  const topPadding = Platform.OS === 'web' ? Math.max(insets.top, scale(55)) : insets.top;
  const bottomPadding = Platform.OS === 'web' ? Math.max(insets.bottom, scale(34)) : insets.bottom;

  return (
    <AppBackground variant={variant}>
      <View
        style={[
          styles.container,
          {
            paddingTop: topPadding,
            paddingBottom: bottomPadding,
          },
          !disableHorizontalPadding && styles.horizontalPadding,
          // Only apply insets left/right if horizontal padding is disabled
          disableHorizontalPadding && {
            paddingLeft: insets.left,
            paddingRight: insets.right,
          },
          style,
        ]}
      >
        {children}
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  horizontalPadding: {
    paddingHorizontal: scale(40),
  },
});
