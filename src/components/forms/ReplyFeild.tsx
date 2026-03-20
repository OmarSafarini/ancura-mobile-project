import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { palette,Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";

const ReplyField = ({ control, name }: { control: any; name: string }) => {
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
            value={value}
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
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 278
  },

  inputText: {
    fontSize: 18,
    color: palette.darkGray,
    fontFamily: Family.FG_Regular
  }
});