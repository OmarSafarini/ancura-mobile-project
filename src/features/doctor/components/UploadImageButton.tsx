import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { scale } from "@/utils/responsive";
import { Colors, palette } from "@/utils/colors";
import ImageIcon from "@/assets/icons/ImageIcon";

interface UploadImageButtonProps {
  onImageSelected?: (uri: string) => void;
}

export default function UploadImageButton({onImageSelected }: UploadImageButtonProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
const  initialImage=require("../../../../assets/ancura.gif");
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImageSelected && onImageSelected(uri);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={imageUri ? { uri: imageUri } : initialImage}
        style={styles.img}
      />
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <ImageIcon color={palette.white} size={17} />
        <Text style={styles.buttonText}>Upload Photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: scale(10) },
  img: { 
    width: scale(125),
    height: scale(125),
    borderRadius: scale(100),
    borderWidth: scale(4),
    borderColor: palette.white, 
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor:Colors.primary,
    paddingVertical: scale(8),
    paddingHorizontal: scale(15),
    borderRadius: scale(10),
    gap: scale(5),
  },
  buttonText: {
    color: palette.white,
    fontSize: scale(14),
    fontWeight: "500",
  },
});