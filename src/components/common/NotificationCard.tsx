import React from "react";
import { palette, Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ClockIcon from "@/assets/icons/ClockIcon";

// _____________ Responsive _____________________
const { width: Screen_Width } = Dimensions.get("window");
const Base_Width = 432;
const scale = (size: number) => (Screen_Width / Base_Width) * size;

// _____________ Constants _____________________
const Card_Radius = scale(20);

// _____________ Types _____________________
export interface NotificationCardProps {
  title: string;
  time: string;
  isRead: boolean;
}

// _____________ Patient Comment Card _____________________

export default function NotificationCard({
  title,
  time,
  isRead,
}: NotificationCardProps) {
  return (
    <View style={[styles.Card, isRead ? styles.ReadCard : styles.UnReadCard]}>
      <View style={styles.CardHeader}>
  <Text style={styles.Title}>{title}</Text>
  {!isRead && <View style={styles.Dot} />}
</View>
      <View style={styles.TimeContainer}>
        <ClockIcon color={'gray'} size={16}/>
        <Text style={styles.Time}>{time}</Text>
      </View>
    </View>
  );
}

// _____________ Style _____________________

const styles = StyleSheet.create({
  Card: {
    borderRadius: Card_Radius,
    padding: scale(15),
    gap: scale(10),
  },
  UnReadCard: {
    backgroundColor: "rgba(182,192,249,0.4)",
    borderWidth: 0.1,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  ReadCard: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.darkGray3,
  },
  Dot: {
  width: scale(8),
  height: scale(8),
  borderRadius: scale(4),
  backgroundColor: colors.primary,
  right:0,
  top:0
  },
  CardHeader: {
    flexDirection:'row',
    justifyContent:'space-between'
  },
Title:{
  color: colors.primary,
  fontSize: scale(16),
  fontWeight:'500',
  flex:1
},
Time:{
  color:'#00000056',
  fontSize:scale(12),
  fontWeight:'500',
},
TimeContainer:{
  flexDirection:'row',
  alignItems:'center',
  gap:scale(4)
}
});
