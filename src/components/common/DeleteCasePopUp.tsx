import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { scale } from "@/utils/responsive";
import { palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import DeleteIcon from "@/assets/icons/DeleteIcon";

type Props = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmBtnColor?: string;
  icon?: React.ReactNode;
};

export default function DeleteCasePopUp({ 
  visible, 
  onConfirm, 
  onCancel,
  title = "Delete Case",
  description = "You are going to delete this case , are you sure?",
  cancelText = "No, Keep it.",
  confirmText = "Yes, Delete!",
  confirmBtnColor = palette.red,
  icon
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          {icon ? icon : <DeleteIcon />}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>
            {description}
          </Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [styles.cancelBtn, pressed && styles.pressed]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.deleteBtn, 
                { backgroundColor: confirmBtnColor },
                pressed && styles.pressed
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: '80%', 
    maxWidth: scale(320),
    paddingTop: scale(20),
    paddingBottom: scale(14),
    paddingHorizontal: scale(16),
    backgroundColor: palette.white,
    borderRadius: scale(11),
    alignItems: "center",
    gap: scale(10),
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: palette.dark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: scale(22),
    fontFamily: Family.FG_Medium,
    color: palette.dark,
    textAlign: "center",
  },
  description: {
    fontSize: scale(14),
    fontFamily: Family.FG_Regular,
    color: "rgba(8,7,14,0.50)",
    textAlign: "center",
    lineHeight: scale(18),
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    gap: scale(10),
    width: '100%',
    marginTop: scale(12),
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: scale(11),
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: scale(11),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    fontSize: scale(12),
    fontFamily: Family.FG_Regular,
    color: palette.dark,
  },
  deleteText: {
    fontSize: scale(12),
    fontFamily: Family.FG_Regular,
    color: palette.white,
  },
  pressed: {
    opacity: 0.75,
  },
});
