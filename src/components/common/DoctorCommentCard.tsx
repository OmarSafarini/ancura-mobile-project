import React from "react";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import VerificationIcon from "../../assets/icons/VerificationIcon"

// _____________ Responsive _____________________
const { width: Screen_Width } = Dimensions.get("window");
const Base_Width = 432;
const scale = (size: number) => (Screen_Width / Base_Width) * size;

// _____________ Constants _____________________
const Card_Radius = scale(16);
const Avatar_Size = scale(42);

// _____________ Types _____________________
export interface DoctorCommentCardProps {
  title: string;
  discreption: string;
  time: string;
  avatar?: string;
  major: string;
}

// _____________ Patient Comment Card _____________________

export default function DoctorCommentCard({
  title,
  discreption,
  time,
  avatar,
  major,
}: DoctorCommentCardProps) {
  return (
    <View style={styles.Card}>
      <View style={styles.Card_Header}>
        <View style={styles.Card_Header}>
          <Image
            source={
              avatar ? { uri: avatar } : require("../../../assets/icon.png")
            }
            style={styles.Card_Img}
          />
          <View style={styles.Card_Sup_Header}>
            <View style={styles.Card_Header}>
              <Text style={styles.Title}>{title}</Text>
              <VerificationIcon
                color={palette.white}
                bgColor={colors.primaryLight}
                size={16}
              />
            </View>
            <Text style={styles.Sub_Title}>{major}</Text>
          </View>
        </View>
        <Text style={styles.Time}>{time}</Text>
      </View>
      <Text style={styles.Discreption}>{discreption}</Text>
    </View>
  );
}

// _____________ Style _____________________

const styles = StyleSheet.create({
  Card: {
    borderRadius: Card_Radius,
    backgroundColor: palette.white,
    padding: scale(18),
    borderWidth: 0.1,
    borderColor: palette.darkGray2,
    gap: scale(10),
  },
  Card_Header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap:scale(5)
  },

  Card_Img: {
    width: Avatar_Size,
    height: Avatar_Size,
    borderRadius: Avatar_Size / 2,
  },
  Card_Sup_Header: {
    gap: scale(2),
    paddingLeft: scale(10),
  },
  Title: {
    //fontFamily:Family.FG_Regular,
    fontSize: scale(16),
    fontWeight: "bold",
  },
  Sub_Title: {
    //fontFamily:Family.FG_Regular,
    fontSize: scale(10),
    fontWeight: "bold",
    color: palette.darkGray,
  },
  Time: {
    //fontFamily:Family.FG_Regular,
    fontSize: scale(12),
    color: palette.darkGray,
  },
  Discreption: {
    // fontFamily:Family.FG_Regular,
    fontSize: scale(14),
    color: palette.dark,
   
  },
});
