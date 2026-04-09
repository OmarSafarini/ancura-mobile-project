import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import Svg, { Path, Defs, ClipPath, G, Rect, Circle } from 'react-native-svg';
import { palette } from '../../utils/colors';
import { Family } from '../../utils/typography';
import TickIcon from '../../assets/icons/TickIcon';
import { scale } from '../../utils/responsive';

const CONFETTI_RECTS: [number, number, number, number, number, string][] = [
  [309, 4, 17, 8, -25, 'rgba(86,184,165,0.75)'],
  [297, 1, 31, 6, -136, 'rgba(86,184,165,0.75)'],
  [203, 1, 23, 8, -35, 'rgba(253,165,165,0.85)'],
  [73, 41, 14, 8, -51, 'rgba(61,189,150,0.35)'],
  [371, 131, 16, 8, -136, 'rgba(253,165,165,0.85)'],
  [345, 206, 15, 6, 96, 'rgba(61,189,150,0.85)'],
  [12, 260, 21, 6, 39, 'rgba(86,184,165,0.60)'],
  [111, 318, 8, 9, -4, 'rgba(236,180,60,0.60)'],
];

const CONFETTI_CIRCLES: [number, number, number, string][] = [
  [313, 17, 2.3, 'rgba(236,180,60,0.45)'],
  [367, 28, 5.8, 'rgba(253,165,165,0.75)'],
  [127, 55, 6.3, 'rgba(86,184,165,0.35)'],
  [110, 95, 2.8, 'rgba(61,189,150,0.90)'],
  [82, 148, 4.8, 'rgba(253,165,165,0.65)'],
  [117, 155, 4.8, 'rgba(236,180,60,0.90)'],
  [281, 157, 6.8, 'rgba(61,189,150,0.90)'],
  [402, 202, 3.3, 'rgba(86,184,165,0.60)'],
  [217, 197, 3.8, 'rgba(253,165,165,0.90)'],
  [70, 215, 5.8, 'rgba(253,165,165,0.60)'],
  [279, 225, 6.3, 'rgba(61,189,150,0.75)'],
  [101, 264, 6.8, 'rgba(61,189,150,0.60)'],
  [244, 297, 6.8, 'rgba(253,165,165,0.45)'],
  [239, 307, 5.8, 'rgba(61,189,150,0.60)'],
  [94, 308, 4.8, 'rgba(236,180,60,0.90)'],
];

const AnimatedG = Animated.createAnimatedComponent(G);

interface SuccessScreenProps {
  subtitle: string;
  onPress: () => void;
}

export default function SuccessScreen({ subtitle, onPress }: SuccessScreenProps) {
  const { width, height } = useWindowDimensions();
  const archHeight = scale(45);

  const boxHeight = Math.max(scale(355), 335);
  const archApexY = height - boxHeight;
  const archCornerY = archApexY + archHeight;

  const bgTranslateY = useRef(new Animated.Value(height)).current;
  const contentTranslateY = useRef(new Animated.Value(height)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const confettiOpacity = useRef(new Animated.Value(0)).current;
  const confettiTranslateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(bgTranslateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
      speed: 12,
    }).start();

    Animated.spring(contentTranslateY, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
      speed: 12,
    }).start();

    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(confettiOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(confettiTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 14,
          speed: 8,
        }),
      ]),
    ]).start();
  }, [width]);

  const handlePress = () => {
    if (onPress) onPress();
  };

  const bgPath = `M 0 ${archCornerY} Q ${width / 2} ${archApexY} ${width} ${archCornerY} L ${width} ${height * 5} L 0 ${height * 5} Z`;

  return (
    <View style={styles.absoluteWrapper} pointerEvents="box-none">
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: 'rgba(0, 0, 0, 0.3)', opacity: contentOpacity }
        ]}
      />
      <Animated.View 
        style={[
          StyleSheet.absoluteFillObject, 
          { transform: [{ translateY: bgTranslateY }] }
        ]} 
        pointerEvents="none"
      >
        <Svg width="100%" height="100%">
          <Defs>
            <ClipPath id="archClip">
              <Path d={bgPath} />
            </ClipPath>
          </Defs>

          <G clipPath="url(#archClip)">
            <Path d={bgPath} fill="#FFFFFF" />

            <AnimatedG style={{ opacity: confettiOpacity, transform: [{ translateY: confettiTranslateY }] }}>
              {CONFETTI_RECTS.map(([left, top, w, h, rot, color], i) => (
                <Rect
                  key={`rect-${i}`}
                  x={scale(left)}
                  y={archApexY + scale(top) + scale(30)}
                  width={w}
                  height={h}
                  fill={color}
                  rx={2}
                  transform={`rotate(${rot}, ${scale(left) + w / 2}, ${archApexY + scale(top) + scale(30) + h / 2})`}
                />
              ))}
              {CONFETTI_CIRCLES.map(([left, top, r, color], i) => (
                <Circle
                  key={`circle-${i}`}
                  cx={scale(left) + r}
                  cy={archApexY + scale(top) + scale(30) + r}
                  r={r}
                  fill={color}
                />
              ))}
            </AnimatedG>
          </G>
        </Svg>
      </Animated.View>

      <Animated.View
        style={[
          styles.contentWrapper,
          {
            opacity: contentOpacity,
            transform: [{ translateY: contentTranslateY }],
            paddingTop: archApexY + scale(40),
          },
        ]}
        pointerEvents="box-none"
      >
        <TickIcon size={Math.round(scale(85))} />

        <Text style={[styles.title, { fontSize: Math.round(scale(32)) }]}>
          Successful!
        </Text>

        <Text style={[styles.subtitle, { fontSize: Math.round(scale(12.8)) }]}>
          {subtitle}
        </Text>

        <TouchableOpacity
          style={[styles.button, { width: '100%' }]}
          onPress={handlePress}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText, { fontSize: Math.round(scale(16)) }]}>
            Browse Home
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  absoluteWrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  contentWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    paddingHorizontal: 30,
    zIndex: 20,
  },
  title: {
    fontFamily: Family.FG_Regular,
    color: '#071E3D',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontFamily: Family.HV_Regular,
    fontWeight: '300',
    color: '#092E61',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 16,
  },
  button: {
    height: 64,
    backgroundColor: palette.darkGreen,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    fontFamily: Family.FG_Medium,
    color: palette.white,
  },
});