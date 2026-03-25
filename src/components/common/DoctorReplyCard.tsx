import ChatIcon from "@/features/doctor/components/Icons/ChatIcon";
import HandLikeIcon from "@/features/doctor/components/Icons/HandLikeIcon";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import VerificationIcon from "@/assets/icons/VerificationIcon";
import DisLikeIcon from "@/assets/icons/DisLikeIcon";

// ================= RESPONSIVE =================
const { width: Screen_Width } = Dimensions.get("window");
const Base_Width = 432;
const scale = (size: number) => (Screen_Width / Base_Width) * size;

// ================= CONSTANTS =================
const AVATAR_SIZE = scale(47);
const Card_Radius = scale(11);
// ================= TYPES =================
type DoctorReplyCardProps = {
  title: string;
  major: string;
  message: string;
  time: string;
  avatar?: string;
};
// ================= COMPONENT =================
export default function DoctorReplyCard({
  title,
  major,
  message,
  time,
  avatar,
}: DoctorReplyCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            avatar ? { uri: avatar } : require("../../../assets/icon.png")
          }
          style={styles.avatar}
        />
        <View style={styles.headerContent}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{title}</Text>
            <VerificationIcon
              color={palette.white}
              bgColor={colors.primaryLight}
              size={14}
            />
          </View>
          <Text style={styles.major}>{major}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.footer}>
        <View style={styles.actions}>
          {/**needs the dislike*/}
          <HandLikeIcon size={25} color="#cdcdcd" />
          <DisLikeIcon size={25} color="#cdcdcd"/>
        </View>

        <View style={styles.ReplyContainer}>
          <ChatIcon size={25} color="#cdcdcd" />
          <Text style={styles.reply}>Reply</Text>
        </View>
      </View>
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "rgba(228, 224, 235, 0.7)",
    borderRadius: Card_Radius,
    padding: scale(30),
    gap: scale(20),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    marginLeft: scale(14),
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: scale(16),
    fontWeight: "600",
    marginRight: scale(6),
  },
  major: {
    fontSize: scale(12),
    color: palette.darkGray,
    marginTop: scale(2),
  },
  time: {
    fontSize: scale(12),
    color: palette.darkGray,
  },
  message: {
    marginTop: scale(14),
    fontSize: scale(14),
    lineHeight: scale(20),
    color: palette.dark,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#70707037",
    paddingTop: scale(10),
    marginTop: scale(10),
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  ReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reply: {
    fontSize: scale(16),
    color: "#cdcdcd",
  },
});
