import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Family } from "@/utils/typography";
import { Colors } from "@/utils/colors";
import { scale } from "@/utils/responsive";

const InputField = ({ control, name, label, placeholder, rules }: { control: any; name: string; label: string; placeholder: string; rules?: any }) => {
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
              <View style={[styles.inputField, error && styles.inputFieldError]}>
                <TextInput
                  placeholder={placeholder}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.inputText}
                  placeholderTextColor={Colors.formLabel}
                />
              </View>

              {error && (
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
    fontFamily: Family.HV_Bold,
    fontSize: scale(12),
    marginLeft: scale(4),
  },
  inputField: {
    backgroundColor: Colors.formBackground,
    borderWidth: 1,
    borderColor: Colors.formBorder,
    borderRadius: scale(8),
    height: scale(50),
    justifyContent: "center",
    paddingHorizontal: scale(16),
    width: "100%",
  },
  inputFieldError: {
    borderColor: Colors.warning,
    borderWidth: 1.5,
  },
  inputText: {
    flex: 1,
    fontSize: scale(16),
    color: Colors.textDark,
    fontFamily: Family.FG_Light,
  },
  error: {
    color: Colors.warning,
    fontSize: scale(12),
    fontFamily: Family.FG_Regular,
    marginTop: scale(4),
    marginLeft: scale(4),
  }
});