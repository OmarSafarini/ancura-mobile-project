import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import AppBackground from '../../../components/base/AppBackground';
import Logo from '../../../assets/icons/Logo';
import FadeInView from '../../../utils/FadeInView';
import AuthToggle from '../../../components/common/AuthToggle';
import InputField from '../../../components/forms/InputFeild';
import FormDropdown from '../../../components/forms/Dropdown';
import NormalButton from '../../../components/common/NormalButton';
import { Colors, palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';
import { signIn, signUp } from '../../../services/authService';
import { useAuthStore } from '../../../store/authStore';

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export default function PatientAuthScreen({ navigation }: any) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { isAuthenticating, error, setError } = useAuthStore();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
      age: '',
      gender: '',
    },
  });

  const handleModeChange = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setError(null);
    reset();
  };

  const onSubmit = async (data: any) => {
    console.log("Form Submitted! Data:", data);
    try {
      if (authMode === 'signin') {
        console.log("Attempting to sign in...");
        await signIn(data.email, data.password, 'patient');
      } else {
        console.log("Attempting to sign up...");
        await signUp(data.email, data.password, 'patient', {
          age: parseInt(data.age, 10),
          gender: data.gender ? data.gender.toLowerCase() : 'male',
        });
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
    }
  };

  return (
    <AppBackground variant="clean">
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
            <Text style={styles.titleLine1}>Your Path to</Text>
            <Text style={styles.titleLine2}>Mental Wellness</Text>
            <Text style={styles.titleLine3}>Starts Here!</Text>
          </FadeInView>

          {/* Toggle Section */}
          <FadeInView delay={300} style={styles.toggleContainer}>
            <AuthToggle value={authMode} onChange={handleModeChange} />
          </FadeInView>

          {/* Form Section */}
          <FadeInView delay={450} style={styles.formContainer}>
            <InputField
              control={control}
              name="email"
              label="Email"
              placeholder="your@email.com"
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={{ height: scale(15) }} />

            <InputField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter Password"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                maxLength: { value: 13, message: "Password cannot exceed 13 characters" },
              }}
              secureTextEntry={true}
            />

            {authMode === 'signup' && (
              <>
                <View style={{ height: scale(15) }} />

                <View style={styles.formRow}>
                  <View style={styles.halfInput}>
                    <InputField
                      control={control}
                      name="age"
                      label="Age"
                      placeholder="Enter Age"
                      rules={{ required: "Age is required" }}
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={[styles.halfInput, { paddingTop: scale(3.5) }]}>
                    <FormDropdown
                      control={control}
                      name="gender"
                      label="Gender"
                      data={genderData}
                      placeholder="Gender"
                      rules={{ required: "Gender is required" }}
                    />
                  </View>
                </View>
              </>
            )}
          </FadeInView>

          {/* Spacer pushing bottom elements down */}
          <View style={styles.spacer} />

          {/* Actions Section */}
          <FadeInView delay={600} style={styles.actionsContainer}>
            {/* Error Message */}
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            <NormalButton
              title={authMode === 'signin' ? 'Sign In' : 'Create Account'}
              onPress={handleSubmit(onSubmit)}
              bgColor={Colors.primary}
              loading={isAuthenticating}
              disabled={isAuthenticating}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            <NormalButton
              title="Generate New Anonymous ID"
              onPress={() => console.log('Generate ID')}
              bgColor={palette.darkGray2}
              textColor={Colors.textDark}
              disabled={isAuthenticating}
            />
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
    paddingBottom: scale(40),
    paddingTop: scale(70),
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: scale(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: scale(25),
  },
  titleLine1: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(32),
    color: Colors.primary,
    marginBottom: scale(2),
  },
  titleLine2: {
    fontFamily: Family.HV_Bold,
    fontSize: scale(30),
    color: Colors.secondary,
    marginBottom: scale(10),
  },
  titleLine3: {
    fontFamily: Family.FG_MediumItalic,
    fontSize: scale(34),
    color: Colors.textDark,
  },
  toggleContainer: {
    width: '100%',
    marginBottom: scale(20),
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formRow: {
    flexDirection: 'row',
    width: '100%',
    gap: scale(15),
  },
  halfInput: {
    flex: 1,
  },
  spacer: {
    flex: 1,
    minHeight: scale(30),
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
  errorText: {
    width: '100%',
    marginBottom: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    backgroundColor: 'rgba(255, 80, 80, 0.12)',
    borderRadius: scale(8),
    borderLeftWidth: 3,
    borderLeftColor: '#FF5050',
    color: '#FF5050',
    fontFamily: Family.FG_Regular,
    fontSize: scale(13),
  },
});
