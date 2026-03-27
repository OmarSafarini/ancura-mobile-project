import WarningIcon from "@/assets/icons/AlertIcon";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "@/utils/responsive";
import { Colors } from "@/utils/colors";
import { IPopUpAlert } from "@/types/IPopUpAlert";
import { Family } from "@/utils/typography";

export default function PopUpAlert({ title, description, cancel, confirm, onConfirm, onCancel }: IPopUpAlert) {
  return (
    <View style={styles.popup}>
      <View style={styles.iconContainer}>
        <WarningIcon size={60} />
        <Ionicons
          name="alert-outline"
          size={scale(28)}
          color={Colors.warning}
          style={styles.icon}
        />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [styles.cancelBtn, pressed && styles.buttonPressed]}
          onPress={onCancel}
        >
          <Text style={styles.cancelText}>{cancel}</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.logoutBtn, pressed && styles.buttonPressed]}
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
    width: scale(254),
    height: scale(235),
    paddingVertical: scale(20),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.formBackground,
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: Colors.textDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
    alignItems: "center",
  },

  iconContainer: {
    width: scale(60),
    height: scale(60),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scale(12),
  },

  icon: {
    position: "absolute",
  },

  title: {
    fontSize: scale(24),
    fontWeight: "600",
    fontFamily : Family.FG_Medium,
    color: Colors.textDark,
    marginBottom: scale(6),
  },

  description: {
    fontSize: scale(14),
    color: Colors.formLabel,
    fontFamily : Family.FG_Regular,
    textAlign: "center",
    marginBottom: scale(20),
    marginTop: scale(10),
    lineHeight: scale(16),
    width : scale(160)
  },

  buttonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%", 
},

cancelBtn: {
  width: "48%",
  backgroundColor: "#F0F0F0",
  paddingVertical: scale(7),
  borderRadius: scale(10),
  alignItems: "center", 
  justifyContent: "center",
},

logoutBtn: {
  width: "48%",
  backgroundColor: Colors.warning,
  paddingVertical: scale(7),
  borderRadius: scale(10),
  alignItems: "center",
  justifyContent: "center",
},

  buttonPressed: {
    opacity: 0.75,
  },

  cancelText: {
    fontSize: scale(10),
    color: Colors.textDark,
    fontFamily : Family.FG_Regular,
  },

  logoutText: {
    fontSize: scale(10),
    fontFamily : Family.FG_Regular,
    color: "#FFF",
  },

});