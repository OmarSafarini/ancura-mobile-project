import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import AppBackground from '../../../components/layout/AppBackground';
import Logo from '../../../assets/icons/Logo';
import FadeInView from '../../../utils/FadeInView';
import AuthToggle from '../../../components/common/AuthToggle';
import InputField from '../../../components/forms/InputFeild';
import FormDropdown from '../../../components/forms/Dropdown';
import NormalButton from '../../../components/common/NormalButton';
import { Colors, palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';

const genderData = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
];

export default function PatientAuthScreen() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nickname: '',
      password: '',
      age: '',
      gender: '',
    }
  });

  const onSubmit = (data: any) => {
    console.log("Form Data: ", { mode: authMode, ...data });
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
            <AuthToggle value={authMode} onChange={setAuthMode} />
          </FadeInView>

          {/* Form Section */}
          <FadeInView delay={450} style={styles.formContainer}>
            <InputField
              control={control}
              name="nickname"
              label="Nickname"
              placeholder="USR-978896"
              rules={{ required: "Nickname is required" }}
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
                maxLength: { value: 13, message: "Password cannot exceed 13 characters" }
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
            <NormalButton
              title="Continue"
              onPress={handleSubmit(onSubmit)}
              bgColor={Colors.primary}
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
});
