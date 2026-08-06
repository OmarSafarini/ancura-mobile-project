import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  useWindowDimensions,
  ViewStyle,
  Easing,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
import { Colors } from '../../utils/colors';
import { palette } from '../../utils/colors';
import { Family } from '../../utils/typography';
import { scale } from '../../utils/responsive';

// ─── Constants ────────────────────────────────────────────────────────────────
const THUMB_SIZE = scale(67);
const CONTAINER_HEIGHT = scale(83);
const EDGE_PADDING = scale(8);
const SLIDE_THRESHOLD = 0.8;

// ─── Types ────────────────────────────────────────────────────────────────────
export interface SlideButtonProps {
  label?: string;
  onSlideComplete: () => void;
  backgroundColor?: string;
  width?: number;
  style?: ViewStyle;
}

// ─── Component ────────────────────────────────────────────────────────────────
const SlideButton: React.FC<SlideButtonProps> = ({
  label = "Let's Go",
  onSlideComplete,
  backgroundColor = Colors.primary,
  width,
  style,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  const screenWidth = Platform.OS === 'web' && windowWidth > 768 ? 390 : windowWidth;
  const buttonWidth = width ?? Math.min(screenWidth - scale(48), scale(335));
  const trackWidth = buttonWidth - THUMB_SIZE - EDGE_PADDING * 2;

  const thumbX = useRef(new Animated.Value(0)).current;
  const thumbXSnapshot = useRef(0);
  const dragOrigin = useRef(0);
  const isDragging = useRef(false);
  const arrowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const id = thumbX.addListener(({ value }) => {
      thumbXSnapshot.current = value;
    });
    return () => thumbX.removeListener(id);
  }, [thumbX]);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(arrowAnim, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    );
    animation.start();
    return () => animation.stop();
  }, [arrowAnim]);

  // ── animation styles ────────────────────────────────────────────────
  const labelOpacity = thumbX.interpolate({
    inputRange: [0, trackWidth * 0.45],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const chevronOpacity = thumbX.interpolate({
    inputRange: [0, trackWidth * 0.5, trackWidth * 0.85],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  const arrow1Opacity = arrowAnim.interpolate({
    inputRange: [0, 0.3, 0.6, 1],
    outputRange: [0.3, 1, 0.3, 0.3],
  });

  const arrow2Opacity = arrowAnim.interpolate({
    inputRange: [0, 0.3, 0.6, 0.9, 1],
    outputRange: [0.3, 0.3, 1, 0.3, 0.3],
  });

  // ── Gesture handler ───────────────────────────────────────────────────────
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        isDragging.current = true;
        thumbX.stopAnimation();
        dragOrigin.current = thumbXSnapshot.current || 0;
      },

      onPanResponderMove: (_, gs) => {
        const next = Math.max(0, Math.min(dragOrigin.current + gs.dx, trackWidth));
        thumbX.setValue(next);
      },

      onPanResponderRelease: (_, gs) => {
        const finalValue = Math.max(0, Math.min(dragOrigin.current + gs.dx, trackWidth));

        if (finalValue >= trackWidth * SLIDE_THRESHOLD) {
          // ─ Snap to end → callback → reset ──────────────────────────────
          Animated.timing(thumbX, {
            toValue: trackWidth,
            duration: 130,
            useNativeDriver: false,
          }).start(() => {
            onSlideComplete();
            setTimeout(() => {
              Animated.spring(thumbX, {
                toValue: 0,
                useNativeDriver: false,
                bounciness: 7,
              }).start(() => {
                isDragging.current = false;
              });
            }, 350);
          });
        } else {
          // ── Snap back ───────────────────────────────────────────────────
          Animated.spring(thumbX, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 7,
          }).start(() => {
            isDragging.current = false;
          });
        }
      },

      onPanResponderTerminate: () => {
        isDragging.current = false;
        Animated.spring(thumbX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <View
      style={[
        styles.container,
        { backgroundColor, width: buttonWidth },
        style,
      ]}
    >

      <Animated.View style={[styles.labelWrap, { opacity: labelOpacity }]} pointerEvents="none">
        <Text style={styles.label}>{label}</Text>
      </Animated.View>


      <Animated.View style={[styles.chevronWrap, { opacity: chevronOpacity }]}>
        <Svg width={scale(30)} height={scale(26)} viewBox="-2 -2 30 26" fill="none">
          <AnimatedPath
            opacity={arrow1Opacity}
            d="M0 0L11 11L0 22"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <AnimatedPath
            opacity={arrow2Opacity}
            d="M15 0L26 11L15 22"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>


      <Animated.View
        style={[styles.thumb, { transform: [{ translateX: thumbX }] }]}
        {...panResponder.panHandlers}
      >
        <Svg width={THUMB_SIZE} height={THUMB_SIZE} viewBox="0 0 67 67" fill="none">
          <Path
            d="M28 23L39 34L28 45"
            stroke={Colors.primary}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    borderRadius: CONTAINER_HEIGHT / 2,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  labelWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  label: {
    color: palette.white,
    fontSize: scale(21),
    fontFamily: Family.FG_Regular,
    textAlign: 'center',
    marginTop: scale(6),
  },
  chevronWrap: {
    position: 'absolute',
    right: scale(41),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  thumb: {
    position: 'absolute',
    left: EDGE_PADDING,
    top: EDGE_PADDING,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: palette.white,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    cursor: Platform.OS === 'web' ? 'pointer' : undefined,
    touchAction: Platform.OS === 'web' ? 'none' : undefined,
  } as ViewStyle,
});

export default SlideButton;