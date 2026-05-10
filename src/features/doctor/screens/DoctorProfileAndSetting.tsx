import AppBackground from "@/components/base/AppBackground";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import React, { useState } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputFeild";
import LicenseVerificationButton from "../components/LiecenseVerficationButton";
import UploadImageButton from "../components/UploadImageButton";
import BackButton from "@/components/common/BackButton";
import { uploadDoctorProfileImage } from "@/services/Doctor/DoctorService";
import { signUp } from "@/services/authService";

export default function DoctorProfileAndSettings({ navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      FullName: "",
      Location: "",
      Email: "",
      Password: "",
      Bio: "",
    },
  });
const OnSubmit = async (data: any) => {
  
  try {
    let imageUrl = "";

    if (selectedImage) {
      imageUrl = await uploadDoctorProfileImage(
        selectedImage,
        "doctor_profile.jpg",
        "image/jpeg"
      );
    }

    console.log("Uploaded Image:", imageUrl);

    await signUp(
      data.Email,
      data.Password,
      "doctor",
      {
        full_name: data.FullName,
        bio: data.Bio,
        location: data.Location,
        profilePic: imageUrl,
      }
    );

 navigation.navigate("LicenseVerification");
  } catch (error) {
    console.log("ERROR:", error);
  }
};

  const goBack = () => {
  navigation.navigate("DoctorLoginScreen");
  };


  return (
    <AppBackground variant="clean">
      <View style={styles.container}>
        <SafeAreaView style={{ paddingTop: insets.top }}>
          <View style={styles.header}>
            <Text style={styles.title}>Profile & Settings</Text>
            <BackButton onPress={goBack} />
          </View>
        </SafeAreaView>
        <View>
          <UploadImageButton
onImageSelected={(uri) => {
    setSelectedImage(uri);
  }}/>
          </View>

        <View style={styles.Form}>
          <InputField
            control={control as any}
            name="FullName"
            label="Full Name"
            placeholder="Enter your Name"
            rules={{ required: "Name is required" }}
          />

          <InputField
            control={control as any}
            name="Location"
            label="Location"
            placeholder="Enter your Location"
            rules={{ required: "Location is required" }}
          />
          <InputField
            control={control as any}
            name="Email"
            label="Email"
            placeholder="Enter your Email"
            rules={{
              required: "Location is required",
              pattern: {
                value: "/\S+@\S+\.\S+/",
                message: "Invalid email",
              },
            }}
          />
          <InputField
            control={control as any}
            name="Password"
            label="Password"
            placeholder="Enter your password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              maxLength: {
                value: 13,
                message: "Password must be at least 13 characters",
              },
            }}
            secureTextEntry={true}
          />
          <InputField
            control={control as any}
            name="Bio"
            label="Bio"
            placeholder="Enter your Bio"
            numberOfLines={4}
            rules={{ required: "Bio is required" }}
          />
        </View>
        <SafeAreaView
          style={[styles.BottomBar, { paddingBottom: insets.bottom }]}
        >
          <LicenseVerificationButton onPress={handleSubmit(OnSubmit)} />
        </SafeAreaView>
      </View>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(51),
    justifyContent: "space-between",
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(56),
    marginTop: scale(10),
  },
  title: {
    fontSize: scale(24),
    fontFamily: Family.FG_Medium,
    color: Colors.textDark,
  },

  Form: {
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10),
  },
  BottomBar: {
    marginTop: scale(5),
  },
});
