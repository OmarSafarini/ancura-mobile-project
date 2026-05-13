import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { Ionicons } from '@expo/vector-icons';
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
import { checkBiometricSupport, saveBiometricCredentials, getBiometricCredentials, promptBiometricAuth } from '../../../services/biometricService';

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export default function PatientAuthScreen({ navigation }: any) {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const { isAuthenticating, error, setError } = useAuthStore();

  useEffect(() => {
    const checkBiometrics = async () => {
      const supported = await checkBiometricSupport();
      const creds = await getBiometricCredentials('patient');
      if (supported && creds) {
        setHasBiometrics(true);
      }
    };
    checkBiometrics();
  }, []);

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
      const trimmedEmail = data.email.trim();
      if (authMode === 'signin') {
        console.log("Attempting to sign in...");
        await signIn(trimmedEmail, data.password, 'patient');
        
        const supported = await checkBiometricSupport();
        const creds = await getBiometricCredentials('patient');
        if (supported && !creds) {
          Alert.alert(
            "Enable Face ID / Touch ID",
            "Would you like to enable biometric login for future use?",
            [
              { text: "No", style: "cancel" },
              { 
                text: "Yes", 
                onPress: async () => {
                  await saveBiometricCredentials(data.email, data.password, 'patient');
                  setHasBiometrics(true);
                }
              }
            ]
          );
        }
      } else {
        console.log("Attempting to sign up...");
        await signUp(trimmedEmail, data.password, 'patient', {
          age: parseInt(data.age, 10),
          gender: data.gender ? data.gender.toLowerCase() : 'male',
        });
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
    }
  };

  const handleBiometricLogin = async () => {
    setError(null);
    const success = await promptBiometricAuth('Sign in to Ancura');
    if (!success) return;

    const creds = await getBiometricCredentials('patient');
    if (!creds) {
      setHasBiometrics(false);
      setError('Session expired. Please sign in with email and password.');
      return;
    }
    try {
      await signIn(creds.email, creds.password, 'patient');
    } catch (err: any) {
      setError(err?.message ?? 'Biometric login failed. Please sign in manually.');
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
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
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

                  <View style={styles.halfInput}>
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

            {authMode === 'signin' && hasBiometrics ? (
              <View style={styles.biometricRow}>
                <View style={{ flex: 1 }}>
                  <NormalButton
                    title="Sign In"
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
                  <Ionicons name="finger-print" size={scale(28)} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ) : (
              <NormalButton
                title={authMode === 'signin' ? 'Sign In' : 'Create Account'}
                onPress={handleSubmit(onSubmit)}
                bgColor={Colors.primary}
                loading={isAuthenticating}
                disabled={isAuthenticating}
              />
            )}


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
  biometricRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: scale(10),
  },
  biometricButton: {
    height: scale(54),
    width: scale(54),
    borderRadius: scale(12),
    backgroundColor: 'rgba(0, 86, 210, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
});
