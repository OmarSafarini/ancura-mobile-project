import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { Family } from "@/utils/typography";
import { palette, Colors } from "@/utils/colors";

const FormDropdown = ({ control, name, label, data, placeholder, rules,width }: { control: any; name: string; label: string; data: any[]; placeholder: string; rules: any; width: number }) => {
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
              style={[styles.dropdown, { width }]}
              data={data}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              value={value}
              onChange={(item) => onChange(item.value)}
              renderItem={(item, index) => {
                const isSelected = item.value === value;
                const isLast = data.findIndex(d => d.value === item.value) === data.length - 1;
                return (
    <View style={[styles.item, isSelected && styles.selectedItem, isLast && styles.lastItem]}>
      <Text style={[styles.itemText, isSelected && styles.selectedText]}>
        {item.label}
      </Text>
    </View>
  );
}}
              containerStyle={{
    borderWidth: 1,
    borderColor: Colors.formBorder,
    borderRadius: 8,
    overflow: "hidden"
  }}
            />

            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
};

export default FormDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  label: {
    fontSize: 12,
    fontFamily: Family.HV_Bold,
    color: palette.darkGray,
    marginBottom: 6
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.formBorder,
    borderRadius: 8,
    padding: 12
  },
  dropdownList: {
    borderWidth: 1,
    borderColor: Colors.formBorder,
    borderTopWidth: 0, 
    borderRadius: 8,
    overflow: "hidden"
  },
  item: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.formBorder
  },
  lastItem: {
    borderBottomWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  selectedItem: {
    backgroundColor: Colors.primary
  },
  itemText: {
    fontSize: 16,
    color: palette.darkGray,
    fontFamily: Family.HV_Regular
  },
  selectedText: {
    color: palette.white
  },
  error: {
    color: "red",
    marginTop: 4,
    fontSize: 12
  }
});