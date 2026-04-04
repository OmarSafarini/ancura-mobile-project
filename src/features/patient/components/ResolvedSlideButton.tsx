import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import TickIcon from '../../../assets/icons/TickIcon';
import { palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';

const THUMB_SIZE = scale(61);
const TRACK_HEIGHT = scale(39);
const SLIDE_THRESHOLD = 0.8;
const TRACK_LEFT = scale(16);
const TRACK_VERTICAL_OFFSET = (THUMB_SIZE - TRACK_HEIGHT) / 2;

interface ResolvedSlideButtonProps {
  onSlideComplete: () => void;
  style?: ViewStyle;
}

const ResolvedSlideButton: React.FC<ResolvedSlideButtonProps> = ({ onSlideComplete, style }) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const maxTravel = Math.max(1, containerWidth - THUMB_SIZE);
  const maxTravelRef = useRef(maxTravel);
  maxTravelRef.current = maxTravel;

  const thumbX = useRef(new Animated.Value(0)).current;
  // Track current value directly — no addListener overhead
  const thumbXSnapshot = useRef(0);
  const dragOrigin = useRef(0);

  const labelOpacity = thumbX.interpolate({
    inputRange: [0, maxTravel * 0.45],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const chevronOpacity = thumbX.interpolate({
    inputRange: [0, maxTravel * 0.25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      // Only take control when horizontal gesture is dominant → safe with parent ScrollViews
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > Math.abs(gs.dy) && Math.abs(gs.dx) > 5,
      onPanResponderGrant: () => {
        thumbX.stopAnimation((val) => {
          thumbXSnapshot.current = val;
          dragOrigin.current = val;
        });
      },
      onPanResponderMove: (_, gs) => {
        const next = Math.max(0, Math.min(dragOrigin.current + gs.dx, maxTravelRef.current));
        thumbXSnapshot.current = next;
        thumbX.setValue(next);
      },
      onPanResponderRelease: (_, gs) => {
        const final = Math.max(0, Math.min(dragOrigin.current + gs.dx, maxTravelRef.current));
        if (final >= maxTravelRef.current * SLIDE_THRESHOLD) {
          // Snap to end → trigger callback → spring back
          Animated.timing(thumbX, {
            toValue: maxTravelRef.current,
            duration: 130,
            useNativeDriver: false,
          }).start(() => {
            onSlideComplete();
            setTimeout(() => {
              Animated.spring(thumbX, {
                toValue: 0,
                useNativeDriver: false,
                bounciness: 7,
              }).start();
            }, 350);
          });
        } else {
          // Snap back
          Animated.spring(thumbX, {
            toValue: 0,
            useNativeDriver: false,
            bounciness: 7,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(thumbX, { toValue: 0, useNativeDriver: false }).start();
      },
    })
  ).current;

  // Don't render interactive content until we know the real width
  const isReady = containerWidth > 0;

  return (
    <View
      style={[styles.container, style]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {/* Render only after width is measured */}
      {isReady && (
        <>
          {/* Green pill track */}
          <View style={styles.track}>
            {/* Label: absolutely centered */}
            <Animated.View style={[styles.labelWrapper, { opacity: labelOpacity }]}>
              <Text style={styles.label}>Mark As Resolved</Text>
            </Animated.View>
            {/* Chevrons: pinned to the right */}
            <Animated.View style={[styles.chevronWrapper, { opacity: chevronOpacity }]}>
              <Svg width={scale(14)} height={scale(12)} viewBox="0 0 14 12" fill="none">
                <Path opacity={0.7} d="M0 0L5.76 5.76L0 11.52" stroke="white" strokeLinecap="round" />
                <Path d="M7.75977 0L13.5198 5.76L7.75977 11.52" stroke="white" strokeLinecap="round" />
              </Svg>
            </Animated.View>
          </View>

          {/* Sliding thumb with tick */}
          <Animated.View
            style={[styles.thumb, { transform: [{ translateX: thumbX }] }]}
            {...panResponder.panHandlers}
          >
            <TickIcon size={THUMB_SIZE} />
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: scale(300),
    height: THUMB_SIZE,
    alignSelf: 'center',
  },
  track: {
    position: 'absolute',
    left: TRACK_LEFT,
    top: TRACK_VERTICAL_OFFSET,
    right: 0,
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: palette.darkGreen,
    overflow: 'hidden',
  },
  labelWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronWrapper: {
    position: 'absolute',
    right: scale(16),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: palette.white,
    fontSize: scale(14),
    fontFamily: Family.FG_Regular,
    includeFontPadding: false,
    textAlignVertical: 'center',
    transform: [{ translateY: scale(2) }],
    marginLeft: scale(4),
  },
  thumb: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResolvedSlideButton;
