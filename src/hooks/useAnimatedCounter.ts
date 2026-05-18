import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

export function useAnimatedCounter(target: number, duration: number = 700) {
  const [display, setDisplay] = useState(0);
  const animValue = useRef(new Animated.Value(0)).current;
  const isMounted = useRef(true);

  const animate = useCallback(() => {
    if (!isMounted.current) return;

    // Reset animation
    animValue.setValue(0);

    const listener = animValue.addListener(({ value }) => {
      if (isMounted.current) {
        setDisplay(Math.floor(value));
      }
    });

    Animated.timing(animValue, {
      toValue: target,
      duration,
      useNativeDriver: false,
    }).start(() => {
      if (isMounted.current) {
        setDisplay(target);
      }
    });

    return listener;
  }, [target, duration, animValue]);

  // Run animation when target changes
  useEffect(() => {
    const listener = animate();

    return () => {
      if (listener) {
        animValue.removeListener(listener);
      }
    };
  }, [animate, animValue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { display, animate };
}