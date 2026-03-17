import { Colors } from "@/utils/colors";
import Svg, { Polygon } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type IPopUpAlert = {
  title : string,
  description : string,
  cancel : string , 
  confirm : string,
  onConfirm?: () => void;
  onCancel?: () => void;
};

export default function LogOutPopUp({ title, description ,cancel , confirm, onConfirm, onCancel }: IPopUpAlert) {
  return (
    <View style={styles.popup}>

      <View style={styles.iconContainer}>
        <Svg width={scale(60)} height={scale(60)} viewBox="0 0 100 100">
          <Polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            stroke={Colors.warning}
            strokeWidth="5"
            fill="transparent"
          />
        </Svg>
        <Ionicons
          name="alert-outline"
          size={moderateScale(28)}
          color={Colors.warning}
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>
        {description}
      </Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [
            styles.cancelBtn,
            pressed && styles.buttonPressed,
          ]}
          onPress={onCancel}
        >
          <Text style={styles.cancelText}>{cancel}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.logoutBtn,
            pressed && styles.buttonPressed,
          ]}
          onPress={onConfirm}
        >
          <Text style={styles.logoutText}>{confirm}</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  popup: {
    width: scale(220),
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(16),

    backgroundColor: "#FFF",
    borderRadius: scale(14),

    /* border خفيف */
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",

    /* shadow احترافي */
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,

    elevation: 6, // Android shadow

    alignItems: "center",
  },

  iconContainer: {
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(12),
  },

  icon: {
    position: "absolute",
  },

  title: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: Colors.textDark,
    marginBottom: verticalScale(6),
  },

  description: {
    fontSize: moderateScale(11),
    color: Colors.formLabel,
    textAlign: "center",
    marginBottom: verticalScale(18),
    lineHeight: moderateScale(16),
  },

  buttonRow: {
    flexDirection: "row",
    gap: scale(10),
  },

  cancelBtn: {
    backgroundColor: "#F0F0F0",
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(18),
    borderRadius: scale(10),
  },

  logoutBtn: {
    backgroundColor: Colors.warning,
    paddingVertical: verticalScale(7),
    paddingHorizontal: scale(18),
    borderRadius: scale(10),
  },

  buttonPressed: {
    opacity: 0.75,
  },

  cancelText: {
    fontSize: moderateScale(10),
    color: Colors.textDark,
    fontWeight: "500",
  },

  logoutText: {
    fontSize: moderateScale(10),
    color: "#FFF",
    fontWeight: "500",
  },

});