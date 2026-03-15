import React from "react";
import { palette ,Colors as colors } from "../../utils/colors";
import { Family } from "../../utils/typography";
import { View, Text, StyleSheet, Dimensions } from "react-native";

// _____________ Responsive _____________________
const { width: Screen_Width } = Dimensions.get("window");
const Base_Width = 432;
const scale = (size: number) => (Screen_Width / Base_Width) * size;

// _____________ Constants _____________________
const Card_Radius = scale(16);

// _____________ Types _____________________
export interface PatientCommentCardProps {
  title: string;
  discreption: string;
  time: string;
}

// _____________ Patient Comment Card _____________________

export default function PatientCommentCard({
  title,
  discreption,
  time,
}: PatientCommentCardProps) {
  return (
    <View style={styles .Card}>
      <View style={styles.Card_Header}>
        <Text style={styles.Title}>{title}</Text>
        <Text style={styles.Time}>{time}</Text>
      </View>
      <Text style={styles.Discreption}>{discreption}</Text>
    </View>
  );
}

// _____________ Style _____________________

const styles  = StyleSheet.create({
    Card:{
     borderRadius: Card_Radius ,
     backgroundColor:palette.white,
     padding: scale(18),
     borderWidth: 0.1, 
     borderColor:palette.darkGray2,
     gap:scale(10),
     
    },
    Card_Header:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    },
    Title:{
        //fontFamily:Family.FG_Regular,
        fontSize:scale(16),
        fontWeight:'bold',
    },
    Time:{
        //fontFamily:Family.FG_Regular,
        fontSize:scale(12),
        color:palette.darkGray
    },
    Discreption:{
       // fontFamily:Family.FG_Regular,
        fontSize:scale(14),
        color:colors.primary
    }
})