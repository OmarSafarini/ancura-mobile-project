import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Family } from "@/utils/typography";
import { Colors } from "@/utils/colors";
const InputField = ({ control, name, label, placeholder, rules,width }: { control: any; name: string; label: string; placeholder: string; rules: any; width: number }) => {
  return (
    <View style={[styles.formInput, { width }]}>
      <View style={styles.wrapper}>
        
        <Text style={styles.label}>{label}</Text>

        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <View style={styles.inputField}>
                <TextInput
                  placeholder={placeholder}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={styles.inputText}
                  placeholderTextColor="#666"
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
    alignItems: "flex-start",
  },

  wrapper: {
    flexDirection: "column",
    gap: 8,
    //width: 370,
  },

  label: {
    color: Colors.formLabel,
    fontFamily:Family.HV_Bold,
    fontSize: 12,
    lineHeight: 18,
  },

  inputField: {
    backgroundColor: Colors.formBackground,
    borderWidth: 1,
    borderColor: Colors.formBorder,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },

  inputText: {
    fontSize: 18,
    color: Colors.formLabel,
    fontFamily:Family.FG_Light
  },

  error: {
    color: Colors.warning,
    fontSize: 12,
    marginTop: 4,
  }

});