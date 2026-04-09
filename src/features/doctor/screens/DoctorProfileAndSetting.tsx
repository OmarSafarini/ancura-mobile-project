import AppBackground from "@/components/layout/AppBackground";
import { Colors, palette } from "@/utils/colors";
import { Family } from "@/utils/typography";
import React from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputFeild";
import LicenseVerificationButton from "../components/LiecenseVerficationButton";
import UploadImageButton from "../components/UploadImageButton";

export default function DoctorProfileAndSettings(navigation : any) {
  const insets = useSafeAreaInsets();
  const user = {
    profilePic: require("../../../../assets/ancura.gif"),
    name: "Dr.Aprar Ismail",
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      FullName: "",
      Location: "",
      Email: "",
      Password: "",
      Bio: "",
    },
  });
  const OnSubmit = (data: any) => {
    console.log("Profile: ", data);
    navigation.navigate('LicenseVerification');
  };
  return (
    <AppBackground variant="clean">
      <View style={styles.container}>
        <SafeAreaView style={[styles.NavBar, { paddingTop: insets.top }]}>
          <Text style={styles.Text}>Profile & Settings</Text>
        </SafeAreaView>
        <View>
          <UploadImageButton
            initialImage={user.profilePic}
            onImageSelected={(uri) => console.log("Selected image URI:", uri)}
          />
        </View>

        <View style={styles.Form}>
          <InputField
            control={control}
            name="FullName"
            label="Full Name"
            placeholder="Enter your Name"
            rules={{ required: "Name is required" }}
          />

          <InputField
            control={control}
            name="Location"
            label="Location"
            placeholder="Enter your Location"
            rules={{ required: "Location is required" }}
          />
          <InputField
            control={control}
            name="Email"
            label="Email"
            placeholder="Enter your Email"
            rules={{
              required: "Location is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email",
              },
            }}
          />
          <InputField
            control={control}
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
            control={control}
            name="Bio"
            label="Bio"
            placeholder="Enter your Bio"
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
