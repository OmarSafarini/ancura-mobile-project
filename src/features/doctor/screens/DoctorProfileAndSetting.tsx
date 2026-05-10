import AppBackground from "@/components/base/AppBackground";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputFeild";
import LicenseVerificationButton from "../components/LiecenseVerficationButton";
import UploadImageButton from "../components/UploadImageButton";
import IconWrapper from "../../../components/common/IconWrapper";
import ArrowLeftIcon from "@/assets/icons/ArrowLeftIcon";
import { uploadDoctorProfileImage } from "@/services/Doctor/DoctorService";
import { signUp } from "@/services/authService";
import { useDoctor } from "@/Context/DoctorContext";
import { useFocusEffect } from "@react-navigation/native";

export default function DoctorProfileAndSettings({ navigation }: any) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const insets = useSafeAreaInsets();
const {doctorData,setDoctorData } = useDoctor();
  const { control, handleSubmit ,reset } = useForm({
    defaultValues: {
      FullName: "",
      Location: "",
      Email: "",
      Password: "",
      Bio: "",
    },
  });

  useFocusEffect(
    useCallback(() => {
      reset({
        FullName: doctorData.full_name || "",
        Location: doctorData.location || "",
        Email: doctorData.email || "",
        Password: "",
        Bio: doctorData.bio || "",
      });
    }, [doctorData, reset])
  );
  
const OnSubmit = async (data: any) => {
  let imageUrl = "";
  try {
    if (selectedImage) {
      imageUrl = await uploadDoctorProfileImage(
        selectedImage,
        "doctor_profile.jpg",
        "image/jpeg"
      );
    }

    setDoctorData({
      full_name: data.FullName,
      bio: data.Bio,
      location: data.Location,
      email: data.Email,
      profilePic: imageUrl,
    });


    console.log(setDoctorData);
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
        <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
          <Text style={styles.Text}>Profile & Settings</Text>
          <IconWrapper size={scale(33)} bgColor={palette.white} shape="square">
            <ArrowLeftIcon size={scale(18)} color={palette.dark} onPress={goBack} />
          </IconWrapper>
        </SafeAreaView>
        <View>
          <UploadImageButton
onImageSelected={(uri) => {
    setSelectedImage(uri);
  }}
  />
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
            placeholder="UserName@gmail.com"
            rules={{
              required: "Location is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
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
    padding: scale(40),
    justifyContent: "space-between",
    flex: 1,
  },
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: scale(20),
  },
  Text: {
    fontFamily: Family.FG_Medium,
    fontWeight: "500",
    fontSize: scale(24),
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
