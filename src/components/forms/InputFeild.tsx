import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { InputFieldProps } from "@/types/InputFieldProps";
import { Family } from "@/utils/typography";
import { Colors } from "@/utils/colors";
import {scale} from "@utils/responsive";
const InputField = ({ control, name, label, placeholder, rules }: InputFieldProps) => {
  return (
    <View style={styles.formInput}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <View
                style={[
                  styles.inputField,
                  error && { borderColor: Colors.warning },
                ]}
              >
                <TextInput
                  placeholder={placeholder}
                  value={value || ""}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.inputText}
                  placeholderTextColor={Colors.formLabel}
                />
              </View>

              {error?.message && (
                <Text style={styles.error}>{error.message}</Text>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

export default InputField;


const styles = StyleSheet.create({

  formInput: {
    alignItems: "flex-start",
  width: "100%",
  },

  wrapper: {
    flexDirection: "column",
    gap: scale(8),
  },

  label: {
    color: Colors.formLabel,
    fontFamily:Family.HV_Bold,
    fontSize: scale(12),
    lineHeight: scale(18),
  },

  inputField: {
    backgroundColor: Colors.formBackground,
    borderWidth: scale(1),
    borderColor: Colors.formBorder,
    borderRadius: scale(8),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    width: "100%",
  },

  inputText: {
    fontSize: scale(18),
    color: Colors.formLabel,
    fontFamily:Family.FG_Light
  },

  error: {
    color: Colors.warning,
    fontFamily:Family.FG_Light,
    fontSize: scale(12),
    marginTop: scale(4),
  }

});