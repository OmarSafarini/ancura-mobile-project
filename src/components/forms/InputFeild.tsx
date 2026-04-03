import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { InputFieldProps } from "@/types/InputFieldProps";
import { Family } from "@/utils/typography";
import { Colors, palette } from "@/utils/colors";
import {scale} from "@utils/responsive";
const InputField = ({ control, name, label, placeholder, rules, isEdit=false, secureTextEntry }: InputFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
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
                  { backgroundColor: isEdit
                    ? (isFocused ? palette.white : "transparent") 
                    : palette.white,},
                  error && { borderColor: Colors.warning },
                ]}
              >
                <TextInput
                  placeholder={placeholder}
                  value={value || ""}
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false);
                  }}
                  onFocus={() => setIsFocused(true)}
                  onChangeText={onChange}
                  style={styles.inputText}
                  placeholderTextColor={Colors.formLabel}
                  secureTextEntry={secureTextEntry}
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
    width: "100%",
  },

  wrapper: {
    flexDirection: "column",
    gap: scale(8),
    width: "100%",
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
    fontFamily:Family.FG_Light,
    width: "100%",
  },

  error: {
    color: Colors.warning,
    fontFamily:Family.FG_Light,
    fontSize: scale(12),
    marginTop: scale(4),
  }

});