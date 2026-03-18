import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import ChatIcon from "@/features/doctor/components/Icons/ChatIcon";

// ================= RESPONSIVE =================
const { width: Screen_Width } = Dimensions.get("window");
const Base_Width = 432;
const scale = (size: number) => (Screen_Width / Base_Width) * size;

// ================= CONSTANTS =================
const AVATAR_SIZE = scale(30);
const Card_Radius = scale(11);
const Tags_Radius = scale(14);
// ================= TYPES =================
type CaseDetailCardProps = {
  userId: string;
  gender: string;
  age: number;
  title: string;
  description: string;
  date: string;
  avatar?: string;
};

// ================= COMPONENT =================
export default function CaseDetailsCard({
  userId,
  gender,
  age,
  title,
  description,
  date,
  avatar,
}: CaseDetailCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            avatar ? { uri: avatar } : require("../../../assets/icon.png")
          }
          style={styles.avatar}
        />

        <Text style={styles.tag}>{userId}</Text>
        <Text style={styles.tag}>{gender}</Text>
        <Text style={styles.tag}>{age}</Text>
        {/* there is a statuse component should be added */}
        <View style={styles.repliedContainer}>
          <ChatIcon size={16} color={palette.darkGreen} />
          <Text style={styles.repliedText}>Doctor Replied</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>
      {/*Temp until the file component is done */}
      <Text>Clinical Psychology License - California Board</Text>
      <Text>Clinical Psychology License - California Board</Text>
      <View style={styles.DateContainer}>
        <ChatIcon size={16} color={palette.darkGray} />
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    backgroundColor: "#ffffff75",
    borderRadius: Card_Radius,
    padding: scale(23),
    gap: scale(14),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  tag: {
    backgroundColor: "#ffffffa1",
    paddingHorizontal: scale(13),
    paddingVertical: scale(5),
    borderRadius: Tags_Radius,
    fontSize: scale(12),
    borderWidth: 1,
    borderColor: palette.darkGray,
  },
  repliedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(4),
    backgroundColor: "#ffffffa1",
    paddingHorizontal: scale(7),
    paddingVertical: scale(5),
    borderRadius: Tags_Radius,
  },
  repliedText: {
    fontSize: scale(12),
    color: palette.darkGreen,
  },

  title: {
    fontSize: scale(20),
    fontWeight: "700",
    marginTop: scale(6),
  },

  description: {
    fontSize: scale(14),
    color: colors.primary,
    lineHeight: scale(20),
    fontWeight: "500",
  },
  DateContainer:{
    flexDirection:'row',
    alignItems:'center',
    gap:scale(3)
  },
  date: {
    fontSize: scale(12),
    color: palette.darkGray,
  },
});
