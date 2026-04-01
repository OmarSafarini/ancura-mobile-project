import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { FormDropdownProps } from "@/types/IDropdownProps";
import { Family } from "@/utils/typography";
import { palette, Colors } from "@/utils/colors";
import { scale } from "@utils/responsive";
import { Ionicons } from "@expo/vector-icons";

const FormDropdown = ({
  control,
  name,
  label,
  data,
  placeholder,
  rules,
}: FormDropdownProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Dropdown
              style={styles.dropdown}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              value={value}
              onChange={(item) => onChange(item.value)}
              selectedTextStyle={styles.selectedValue}
              placeholderStyle={styles.selectedValue}
              maxHeight={data.length * scale(60)}
              flatListProps={{
                scrollEnabled: false,
              }}
              renderRightIcon={() => (
                <View>
                  <Ionicons
                   name="chevron-down"
                    size={scale(20)}
                    color={Colors.primary}   
                  />
                </View>
              )}
              renderItem={(item) => {
                const isSelected = item.value === value;
                const isLast =
                  data.findIndex((d) => d.value === item.value) ===
                  data.length - 1;

                return (
                  <View
                    style={[
                      styles.item,
                      isSelected && styles.selectedItem,
                      isLast && styles.lastItem,
                    ]}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && styles.selectedText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                );
              }}
              containerStyle={styles.dropdownList}
            />

            {error?.message && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export default FormDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(16),
  },

  label: {
    fontSize: scale(12),
    fontFamily: Family.HV_Bold,
    color: palette.darkGray,
    marginBottom: scale(6),
  },

  dropdown: {
    borderWidth: scale(1),
    borderColor: Colors.formBorder,
    borderRadius: scale(8),
    padding: scale(12),
  },

  dropdownList: {
    borderWidth: scale(1),
    borderColor: Colors.formBorder,
    borderTopWidth: 0,
    borderRadius: scale(8),
    overflow: "hidden",
  },

  item: {
    height: scale(48),
    justifyContent: "center",
    paddingHorizontal: scale(12),
    borderBottomWidth: scale(1),
    borderBottomColor: Colors.formBorder,
  },
  selectedValue: {
  fontSize: scale(16),
  fontFamily: Family.HV_Regular,
  color: palette.darkGray,
},

  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },

  selectedItem: {
    backgroundColor: Colors.primary,
  },

  itemText: {
    fontSize: scale(16),
    color: palette.darkGray,
    fontFamily: Family.HV_Regular,
  },

  selectedText: {
    color: palette.white,
  },

  error: {
    color: Colors.warning,
    marginTop: scale(4),
    fontSize: scale(12),
  },
});