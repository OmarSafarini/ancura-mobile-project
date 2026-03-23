import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { palette,Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import UploadIcon from "@assets/icons/UploadIcon";

const AttachmentsField = ({ onFilesChange }: { onFilesChange?: (files: any[]) => void }) => {
  const [files, setFiles] = useState<any[]>([]);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
      });

      if (result.canceled) return;

      const selectedFiles = result.assets ?? [result];
      setFiles(selectedFiles);

      onFilesChange?.(selectedFiles);

    } catch (error) {
      console.log("Error picking file:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={pickFile}>
        <View style={styles.row}>
          <UploadIcon width={15.86} height={17.94} />
          <Text style={styles.title}>Attachment files</Text>
        </View>
        <Text style={styles.subtitle}>
          Please do not attach any photos that reveal your identity.
        </Text>
      </TouchableOpacity>

      {/* {files.map((file, index) => (
        <View key={index} >
          <Text>{file.name}</Text>
        </View>
      ))} */}
    </View>
  );
};

export default AttachmentsField;
const styles = StyleSheet.create({

  container: {
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: palette.white,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: 11,

    width: 327,
    height: 103,

    paddingVertical: 20,
    gap: 6
  },

  row: {
  flexDirection: "row",
  alignItems: "center",
  gap: 5.14
},

  title: {
    color: Colors.textDark,
    fontSize: 13,
    fontFamily: Family.FG_Medium
  },

  subtitle: {
    color: palette.darkGray,
    fontSize: 8,
    fontFamily: Family.FG_Regular
  },


});