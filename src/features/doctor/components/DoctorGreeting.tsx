import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, palette } from "@/utils/colors";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";

interface Props {
  name: string;
  image: any; 
}

const DoctorGreeting = ({ name, image }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.avatar} />

      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.name}>Dr. {name}</Text>
      </View>
    </View>
  );
};

export default DoctorGreeting;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(40),
    marginLeft: scale(20),
  },

  avatar: {
    width: scale(49),
    height: scale(49),
    borderRadius: scale(25),
    backgroundColor: "#d9d9d9",
  },

  textContainer: {
    marginLeft: scale(10),
  },

  greeting: {
    fontSize: scale(10),
    color: "#757575",
    fontFamily: Family.FG_Regular,
  },

  name: {
    fontSize: scale(14),
    color: "#071e3d",
    fontFamily: Family.FG_Regular,
  },
});