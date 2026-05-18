import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { scale } from "@/utils/responsive";
import { Family } from "@/utils/typography";

interface Props {
  name: any;
  image: any; 
}

function greeting() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  }

const DoctorGreeting = ({ name, image }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.avatar} transition={150} />

      <View style={styles.textContainer}>
        <Text style={styles.greeting}>{greeting()}</Text>
        <Text style={styles.name}>{name}</Text>
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