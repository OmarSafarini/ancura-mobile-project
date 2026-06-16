import React, { useEffect, useRef } from "react";
import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import { scale } from "@/utils/responsive";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";

interface MagicalGreetingProps {
  nickname?: string;
}

export default function MagicalGreeting({ nickname = "Guest" }: MagicalGreetingProps) {
  // Entrance animation values
  const entranceAnim = useRef(new Animated.Value(0)).current; // Opacity & Scale for nickname
  const subtitleAnim = useRef(new Animated.Value(0)).current; // Opacity & TranslateY for subtitle

  useEffect(() => {
    // Entrance animations run once when component mounts
    Animated.stagger(150, [
      // 1. Nickname spring entrance
      Animated.spring(entranceAnim, {
        toValue: 1,
        tension: 30,
        friction: 7,
        useNativeDriver: true,
      }),
      // 2. Subtitle fade + slide entrance
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();
  }, [entranceAnim, subtitleAnim]);

  // Interpolate entrance animation for scale
  const nicknameScale = entranceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const subtitleTranslateY = subtitleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [12, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: entranceAnim,
          transform: [
            { scale: nicknameScale },
          ],
        }}
      >
        <Text style={[styles.text, styles.userName]}>Hi {nickname}</Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: subtitleAnim,
          transform: [
            { translateY: subtitleTranslateY },
          ],
        }}
      >
        <Text style={[styles.text, styles.subText]}>How are you feeling today?</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: scale(20),
    position: "relative",
    justifyContent: "center",
  },
  text: {
    fontFamily: Family.FG_Regular,
  },
  userName: {
    fontFamily: Family.FG_Light,
    fontSize: scale(32),
    color: palette.dark,
  },
  subText: {
    fontSize: scale(19),
    color: Colors.primary,
    marginTop: scale(4),
  },
});
