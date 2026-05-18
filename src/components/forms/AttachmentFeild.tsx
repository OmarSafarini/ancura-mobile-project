import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { AttachmentsFieldProps } from "@/types/IAttachmentFieldProps";
import { palette, Colors } from "@/utils/colors";
import { Family } from "@/utils/typography";
import { scale } from "@utils/responsive";
import UploadIcon from "@assets/icons/UploadIcon";
import FileBar from "@components/common/FileBar";
import TrashIcon from "@assets/icons/TrashIcon";

const AttachmentsField = ({
  onFilesChange,
  files: controlledFiles,
  maxFiles = 5,
  acceptedTypes = "*/*",
}: AttachmentsFieldProps) => {
  const [internalFiles, setInternalFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [error, setError] = useState("");

  const selectedFiles = Array.isArray(controlledFiles)
    ? controlledFiles : internalFiles;

  const handleFilesChange = (newFiles: DocumentPicker.DocumentPickerAsset[]) => {
    if (!controlledFiles) {
      setInternalFiles(newFiles);
    }
    onFilesChange?.(newFiles);
  };

  const pickFile = async () => {
    setError("");

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: acceptedTypes,
        multiple: maxFiles > 1,
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.length) return;

      const newFiles = result.assets;

      const remainingSlots = maxFiles - selectedFiles.length;

      if (remainingSlots <= 0) {
        setError(maxFiles === 1 ? "You can upload only 1 file." : `You can upload only ${maxFiles} files.`);
        return;
      }

      const allowedNewFiles = newFiles.slice(0, remainingSlots);

      if (newFiles.length > remainingSlots) {
        setError(`Only ${remainingSlots} more file(s) allowed.`);
      }

      handleFilesChange([...selectedFiles, ...allowedNewFiles]);
    } catch (err) {
      setError("Error while selecting files. Please try again.");
    }
  };

  const takePhoto = async () => {
    setError("");
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        setError("Camera permission is required to take photos.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
      });

      if (result.canceled || !result.assets?.length) return;

      const remainingSlots = maxFiles - selectedFiles.length;

      if (remainingSlots <= 0) {
        setError(maxFiles === 1 ? "You can upload only 1 file." : `You can upload only ${maxFiles} files.`);
        return;
      }

      const asset = result.assets[0];
      const newFile = {
        uri: asset.uri,
        name: asset.fileName || `photo_${Date.now()}.jpg`,
        mimeType: asset.mimeType || "image/jpeg",
        size: asset.fileSize,
      } as DocumentPicker.DocumentPickerAsset;

      handleFilesChange([...selectedFiles, newFile]);
    } catch (err) {
      setError("Error while taking photo. Please try again.");
    }
  };

  const handlePress = () => {
    Alert.alert(
      "Add Attachment",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: takePhoto,
        },
        {
          text: "Choose File",
          onPress: pickFile,
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    handleFilesChange(updated);
  };


  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.row}>
          <UploadIcon width={scale(15.86)} height={scale(17.94)} />
          <Text style={styles.title}>Attachment files</Text>
        </View>
        <Text style={styles.subtitle}>
          Please do not attach any photos that reveal your identity.
        </Text>
      </TouchableOpacity>
      {error !== "" && (
        <Text style={styles.errorText}>{error}</Text>
      )}

     {/*selectedFiles.length > 0 && (
        <View style={styles.filesContainer}>
          {selectedFiles.map((file, index) => (
            <FileBar
              key={file.uri || index}
              title={file.name || "Unknown file"}
              icon={
                <TouchableOpacity 
                  onPress={() => removeFile(index)}
                  hitSlop={10}
                >
                  <TrashIcon color={Colors.primary} size={scale(12)} />
                </TouchableOpacity>
              }
            />
          ))}
        </View>
      )*/}
    </View>
  );
};

export default AttachmentsField;

const styles = StyleSheet.create({
  wrapper: {
    gap: scale(12),
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
    borderWidth: scale(1),
    borderStyle: "dashed",
    borderColor: Colors.primary,
    borderRadius: scale(11),
    width: scale(327),
    height: scale(103),
    paddingVertical: scale(20),
    gap: scale(6),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5.14),
  },
  title: {
    color: Colors.textDark,
    fontSize: scale(13),
    fontFamily: Family.FG_Medium,
  },
  subtitle: {
    color: palette.darkGray,
    fontSize: scale(8),
    fontFamily: Family.FG_Regular,
    textAlign: "center",
  },
  filesContainer: {
    gap: scale(8),
    width: "100%",
  },
  errorText: {
  color: Colors.warning,
  fontSize: scale(10),
  marginTop: scale(6),
  fontFamily: Family.FG_Light,
},
});