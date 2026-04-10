import ChatIcon from "@/features/doctor/components/Icons/ChatIcon";
import HandLikeIcon from "@/features/doctor/components/Icons/HandLikeIcon";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions, Pressable } from "react-native";
import VerificationIcon from "@/assets/icons/VerificationIcon";
import DisLikeIcon from "@/assets/icons/DisLikeIcon";
import { scale } from "@/utils/responsive";


// ________________ CONSTANTS ________________
const AVATAR_SIZE = scale(47);
const Card_Radius = scale(11);
// ________________ TYPES ________________
type DoctorReplyCardProps = {
  title: string;
  major: string;
  message: string;
  time: string;
  avatar?: string;
  CardOnPress:()=>void;
  ChatOnPress:()=>void;
};
// ________________ COMPONENT ________________
export default function DoctorReplyCard({
  title,
  major,
  message,
  time,
  avatar,
  CardOnPress,
  ChatOnPress
}: DoctorReplyCardProps) {
  return (
    <Pressable style={styles.container} onPress={CardOnPress}>
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
              size={12}
            />
          </View>
          <Text style={styles.major}>{major}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>

      <Text style={styles.message}>{message}</Text>

      <View style={styles.footer}>
        <View style={styles.actions}>
          <HandLikeIcon size={18} color="#707070" />
          <DisLikeIcon size={18} color="#707070" />
        </View>

        <Pressable style={styles.ReplyContainer} onPress={ChatOnPress}>
          <ChatIcon size={18} color="#707070" />
          <Text style={styles.reply}>Reply</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

// ________________ STYLES ________________
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#e4e0ebad",
    borderRadius: Card_Radius,
    padding: scale(18),
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
    fontFamily:Family.FG_Bold
  },
  major: {
     fontFamily: Family.HV_Regular,
    fontSize: scale(8),
    color: "#9F9DA1",
    marginTop: scale(2),
  },
  time: {
    fontFamily: Family.HV_Regular,
    fontSize: scale(8),
    color: "#6666668c",
  },
  message: {
    marginBottom: scale(14),
    fontSize: scale(14),
    lineHeight: scale(20),
    color: palette.dark,
    fontFamily:Family.FG_Regular
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
    gap:scale(10),
  },
  ReplyContainer: {
    flexDirection: "row",
    gap:scale(5),
    alignItems: "center",
  },
  reply: {
    fontSize: scale(10),
    color: "#707070",
    fontFamily:Family.FG_Medium
  },
});
