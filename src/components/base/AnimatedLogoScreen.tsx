import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import LogoOverlay from '@/assets/icons/LogoOverlay';
import { palette } from '@/utils/colors';

export interface AnimatedLogoScreenProps {
  size?: number;
}

const AnimatedLogoScreen = ({ size = 180 }: AnimatedLogoScreenProps) => {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const runAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(1000),
          
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
          
          Animated.delay(1000),

          Animated.timing(anim, {
            toValue: 2,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),

          Animated.delay(1000),

          Animated.timing(anim, {
            toValue: 3,
            duration: 3000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    runAnimation();
  }, [anim]);


  
  const topColor = anim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [palette.darkGreen, palette.lightGray, palette.darkGreen, palette.darkGreen],
  });

  const bottomColor = anim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [palette.lightGray, palette.darkBlue, palette.darkBlue, palette.lightGray],
  });

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, { width: size, height: size * (408 / 331) }]}>
        <LogoOverlay 
          topColor={topColor} 
          bottomColor={bottomColor} 
          size={size} 
          opacity={1} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedLogoScreen;
