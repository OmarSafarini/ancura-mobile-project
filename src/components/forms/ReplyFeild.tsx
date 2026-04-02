import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { ReplyFieldProps } from "@/types/IReplyFieldProps";
import { palette,Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import {scale} from "@utils/responsive";

const ReplyField = ({ control, name }: ReplyFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.inputField}>
          <TextInput
            style={styles.inputText}
            placeholder="Reply"
            placeholderTextColor={palette.darkGray}
            value={value || ""}
            onBlur={onBlur}
            onChangeText={onChange}
          />
        </View>
      )}
    />
  );
};

export default ReplyField;
const styles = StyleSheet.create({
  inputField: {
    backgroundColor: palette.white,
    borderWidth: scale(1),
    borderColor: Colors.secondary,
    borderRadius: scale(24),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    width: "100%"
  },

  inputText: {
    fontSize: scale(18),
    color: palette.darkGray,
    fontFamily: Family.FG_Regular
  }
});