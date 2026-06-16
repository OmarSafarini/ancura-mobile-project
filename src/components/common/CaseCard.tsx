import React, { useRef, useEffect } from "react";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View, GestureResponderEvent, Platform, Animated, Easing } from "react-native";
import { scale } from "@/utils/responsive";
import { CaseData } from "@/types/ICaseData";
import UnderViewIcon from "@/assets/icons/UnderViewIcon";
import DoctorRepliedIcon from "@/assets/icons/DoctorRepliedIcon";
import ResolvedIcon from "@/assets/icons/ResolvedIcon";

type Props = {
  data: CaseData;
  onPress?: (event: GestureResponderEvent) => void;
};

const STATUS_CONFIG = {
  under_review: {
    label: "Under Review",
    containerColor: "rgba(232, 112, 0, 0.15)",
    IconComponent: UnderViewIcon,
    iconBackground: Colors.underReview,
  },
  doctor_replied: {
    label: "Doctor Replied",
    containerColor: "rgba(8, 7, 14, 0.08)",
    IconComponent: DoctorRepliedIcon,
    iconBackground: Colors.secondary,
  },
  resolved: {
    label: "Resolved",
    containerColor: "rgba(195, 227, 199, 0.67)",
    IconComponent: ResolvedIcon,
    iconBackground: Colors.secondary,
  },
  empty: {
    label: "None",
    containerColor: "rgba(255, 255, 255, 0.75)",
    IconComponent: null,
    iconBackground: "transparent",
  }
} as const;

export default function CaseCard({ data, onPress }: Props) {
  const status = data.status || "empty";
  const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG["empty"];

  // Base shifting color animation value
  const colorAnim = useRef(new Animated.Value(0)).current;

  // Expanding radar pulse animation value
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (data.isEmergency) {
      // Shifting border color timing loop
      Animated.loop(
        Animated.sequence([
          Animated.timing(colorAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: false,
          }),
          Animated.timing(colorAnim, {
            toValue: 0,
            duration: 2500,
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Expanding radar pulse timing loop
      Animated.loop(
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        })
      ).start();
    }
  }, [data.isEmergency, colorAnim, pulseAnim]);

  // Interpolate base border colors (coral -> warm red -> hot pink)
  const animatedBorderColor = colorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [
      "rgba(255, 99, 132, 0.55)", // Soft rose/pink
      "rgba(255, 33, 33, 0.95)",  // Hot premium red
      "rgba(255, 60, 110, 0.7)",  // Warm magenta/coral
    ],
  });

  // Interpolate radar pulse scale and opacity
  const pulseScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.07],
  });

  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 0],
  });

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: Platform.OS === 'android' && data.isEmergency
            ? '#FFFDFD'
            : "rgba(255, 255, 255, 0.25)"
        }
      ]}
    >
      <View style={[StyleSheet.absoluteFillObject, { backgroundColor: config.containerColor, borderRadius: scale(15) }]} pointerEvents="none" />

      {data.isEmergency && (
        <>
          {/* Base Color-Shifting Border */}
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderWidth: scale(0.8),
                borderRadius: scale(15),
                borderColor: animatedBorderColor,
              },
            ]}
            pointerEvents="none"
          />

          {/* Outer Pulsing Radar Expand Wave */}
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderWidth: scale(0.6),
                borderRadius: scale(15),
                borderColor: "rgba(255, 45, 85, 0.75)",
                transform: [{ scale: pulseScale }],
                opacity: pulseOpacity,
              },
            ]}
            pointerEvents="none"
          />
        </>
      )}

      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.arrowContainer}>
        <Feather name="chevron-right" size={scale(12)} color={Colors.textDark} style={{ opacity: 0.8 }} />
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.time}>{data.time_ago}</Text>
        {status !== "empty" && config.IconComponent && (
          <View style={styles.reviewContainer}>
            <View style={[styles.iconCircle, { backgroundColor: config.iconBackground }]}>
              <config.IconComponent width={scale(11.2)} height={scale(11.2)} />
            </View>
            <Text style={[styles.reviewText, { color: config.iconBackground }]}>{config.label}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(160),
    height: scale(130),
    borderRadius: scale(15),
    padding: scale(12),
    justifyContent: "space-between",
  },
  title: {
    fontSize: scale(13),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
    maxWidth: "75%",
  },
  arrowContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    alignSelf: "center",
    borderRadius: scale(20),
    padding: scale(5),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  time: {
    fontSize: scale(8),
    fontFamily: Family.HV_Regular,
    color: "rgba(0,0,0,0.36)",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: scale(10),
    paddingHorizontal: scale(8),
    paddingVertical: scale(3.2),
    gap: scale(5),
  },
  reviewText: {
    paddingTop: scale(2),
    fontSize: scale(8.4),
    fontFamily: Family.FG_Regular,
  },
  iconCircle: {
    width: scale(14.8),
    height: scale(14.8),
    borderRadius: scale(14.8),
    justifyContent: "center",
    alignItems: "center",
  },
});