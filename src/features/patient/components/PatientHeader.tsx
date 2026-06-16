import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import NotificationsIcon from "@/assets/icons/NotificationsIcon";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getPatientNotification } from "@/services/Patient/Notification";

interface PatientHeaderProps {
  title?: string;
  profilePic?: any;
  rightIcon?: "back" | "notification";
  onRightPress?: () => void;
  useSafeArea?: boolean;
  titleStyle?: any;
  containerStyle?: any;
}

export default function PatientHeader({
  title,
  profilePic,
  rightIcon = "back",
  onRightPress,
  useSafeArea = true,
  titleStyle,
  containerStyle,
}: PatientHeaderProps) {
  const navigation = useNavigation<any>();
  const user = useAuthStore((state) => state.user);

  // Fetch notifications to get unread count
  const { data: notifications } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => getPatientNotification(user?.id as string),
    enabled: !!user?.id && rightIcon === "notification",
    refetchInterval: 10000, // Poll every 10s to keep badge fresh
  });

  const unreadCount = notifications
    ? notifications.filter((n: any) => !n.is_read).length
    : 0;

  const handleRightPress = () => {
    if (onRightPress) {
      onRightPress();
    } else if (rightIcon === "back") {
      navigation.goBack();
    } else if (rightIcon === "notification") {
      navigation.navigate("PatientNotifyTab");
    }
  };

  const content = (
    <View style={[styles.header, containerStyle]}>
      {profilePic ? (
        <Image style={styles.img} source={profilePic} transition={150} />
      ) : (
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      )}

      {rightIcon === "back" ? (
        <Pressable
          style={({ pressed }) => [styles.iconWrapper, pressed && { opacity: 0.7 }]}
          onPress={handleRightPress}
        >
          <View pointerEvents="none">
            <ArrowLeftIcon
              color={Colors.textDark2}
              size={scale(18)}
            />
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={({ pressed }) => [styles.iconWrapper, pressed && { opacity: 0.7 }]}
          onPress={handleRightPress}
        >
          <View style={{ position: "relative" }}>
            <NotificationsIcon size={scale(18)} color={Colors.textDark2} />
            {unreadCount > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </View>
        </Pressable>
      )}
    </View>
  );

  if (useSafeArea) {
    return <SafeAreaView>{content}</SafeAreaView>;
  }

  return content;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(25),
    marginTop: scale(10),
  },
  iconWrapper: {
    width: scale(34),
    height: scale(34),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: scale(6),
    backgroundColor: Colors.formBackground,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  title: {
    fontSize: scale(24),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },
  img: {
    width: scale(54),
    height: scale(54),
    borderRadius: scale(16),
  },
  badgeContainer: {
    position: "absolute",
    top: -scale(6),
    right: -scale(6),
    backgroundColor: "#F8545D",
    borderRadius: scale(8),
    minWidth: scale(14),
    height: scale(14),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(2),
    borderWidth: 1.2,
    borderColor: Colors.formBackground,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: scale(8),
    fontWeight: "bold",
    textAlign: "center",
  },
});
