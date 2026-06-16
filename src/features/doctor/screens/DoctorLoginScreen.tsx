import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import AppBackground from "../../../components/base/AppBackground";
import Logo from "../../../assets/icons/Logo";
import FadeInView from "../../../utils/FadeInView";
import InputField from "../../../components/forms/InputFeild";
import NormalButton from "../../../components/common/NormalButton";
import HIPAAFooter from "../../../components/common/Footer";
import { Colors, palette } from "../../../utils/colors";
import { Family } from "../../../utils/typography";
import { scale } from "../../../utils/responsive";
import { signIn } from "../../../services/authService";
import { useAuthStore } from "../../../store/authStore";
import {
  checkBiometricSupport,
  saveBiometricCredentials,
  getBiometricCredentials,
  promptBiometricAuth,
} from "../../../services/biometricService";

export default function DoctorLoginScreen({ navigation }: any) {
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const { isAuthenticating, error, setError } = useAuthStore();

  useEffect(() => {
    const checkBiometrics = async () => {
      const supported = await checkBiometricSupport();
      if (supported) {
        const creds = await getBiometricCredentials("doctor");
        if (creds) {
          setHasBiometrics(true);
        }
      }
    };
    checkBiometrics();
  }, []);

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const trimmedEmail = data.email.trim();
      await signIn(trimmedEmail, data.password, "doctor");

      const supported = await checkBiometricSupport();
      const creds = await getBiometricCredentials("doctor");
      if (supported && !creds) {
        Alert.alert(
          "Enable Face ID / Touch ID",
          "Would you like to enable biometric login for future use?",
          [
            { text: "No", style: "cancel" },
            {
              text: "Yes",
              onPress: async () => {
                await saveBiometricCredentials(
                  data.email,
                  data.password,
                  "doctor",
                );
                setHasBiometrics(true);
              },
            },
          ],
        );
      }
    } catch {}
  };

  const handleBiometricLogin = async () => {
    setError(null);
    const success = await promptBiometricAuth("Sign in to Ancura");
    if (!success) return;

    const creds = await getBiometricCredentials("doctor");
    if (!creds) {
      setHasBiometrics(false);
      setError("Session expired. Please sign in with email and password.");
      return;
    }
    try {
      await signIn(creds.email, creds.password, "doctor");
    } catch (err: any) {
      setError(
        err?.message ?? "Biometric login failed. Please sign in manually.",
      );
    }
  };

  return (
    <AppBackground variant="clean">
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <FadeInView delay={0} style={styles.logoContainer}>
            <Logo size={scale(110)} />
          </FadeInView>

          {/* Title Section */}
          <FadeInView delay={150} style={styles.titleContainer}>
            <Text style={styles.titleText}>Doctor Login</Text>
          </FadeInView>

          {/* Form Section */}
          <FadeInView delay={300} style={styles.formContainer}>
            <InputField
              control={control}
              name="email"
              label="Email"
              placeholder="doctor@ancura.com"
              rules={{ 
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" }
              }}
            />

            <View style={{ height: scale(15) }} />

            <InputField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter Password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 13,
                  message: "Password cannot exceed 13 characters",
                },
              }}
              secureTextEntry={true}
            />

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DoctorForgotPasswordScreen")
                }
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>

          {/* Actions Section */}
          <FadeInView delay={450} style={styles.actionsContainer}>
            {/* Error Message */}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {hasBiometrics ? (
              <View style={styles.biometricRow}>
                <View style={{ flex: 1 }}>
                  <NormalButton
                    title="Login"
                    onPress={handleSubmit(onSubmit)}
                    bgColor={Colors.primary}
                    loading={isAuthenticating}
                    disabled={isAuthenticating}
                  />
                </View>
                <TouchableOpacity
                  style={styles.biometricButton}
                  onPress={handleBiometricLogin}
                >
                  <Ionicons
                    name="finger-print"
                    size={scale(28)}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <NormalButton
                title="Login"
                onPress={handleSubmit(onSubmit)}
                bgColor={Colors.primary}
                loading={isAuthenticating}
                disabled={isAuthenticating}
              />
            )}

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            <NormalButton
              title="Sign Up"
              onPress={() => navigation.navigate("DoctorProfileAndSettings")}
              bgColor={Colors.secondary}
              disabled={isAuthenticating}
            />
          </FadeInView>

          {/* Spacer pushing bottom elements down */}
          <View style={styles.spacer} />

          {/* Footer */}
          <FadeInView delay={600} style={{ width: "100%" }}>
            <HIPAAFooter />
          </FadeInView>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
    paddingBottom: scale(20),
    paddingTop: scale(70),
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: scale(35),
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: scale(30),
  },
  titleText: {
    fontFamily: Family.HV_Bold,
    fontSize: scale(24),
    color: Colors.textDark,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  forgotPasswordText: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(14),
    color: Colors.secondary,
  },
  errorText: {
    width: "100%",
    marginBottom: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    backgroundColor: "rgba(255, 80, 80, 0.12)",
    borderRadius: scale(8),
    borderLeftWidth: 3,
    borderLeftColor: "#FF5050",
    color: "#FF5050",
    fontFamily: Family.FG_Regular,
    fontSize: scale(13),
  },
  spacer: {
    flex: 1,
    minHeight: scale(30),
  },
  actionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: scale(20),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: palette.lightGray,
  },
  orText: {
    marginHorizontal: scale(15),
    color: Colors.textGray,
    fontFamily: Family.FG_Regular,
    fontSize: scale(14),
  },
  biometricRow: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: scale(10),
  },
  biometricButton: {
    height: scale(54),
    width: scale(54),
    borderRadius: scale(12),
    backgroundColor: "rgba(0, 86, 210, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});
