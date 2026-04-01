import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import AppBackground from '../../../components/layout/AppBackground';
import Logo from '../../../assets/icons/Logo';
import FadeInView from '../../../utils/FadeInView';
import InputField from '../../../components/forms/InputFeild';
import NormalButton from '../../../components/common/NormalButton';
import HIPAAFooter from '../../../components/common/Footer';
import { Colors } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';

export default function DoctorNewPasswordScreen() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    }
  });

  const onSubmit = (data: any) => {
    console.log("New Password Data: ", data);
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
            <Text style={styles.titleText}>New Password</Text>
          </FadeInView>

          {/* Form Section */}
          <FadeInView delay={300} style={styles.formContainer}>
            <InputField
              control={control}
              name="newPassword"
              label="Enter New Password"
              placeholder=""
              rules={{ required: "New Password is required" }}
            />

            <View style={{ height: scale(15) }} />

            <InputField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder=""
              rules={{ required: "Confirm Password is required" }}
            />
          </FadeInView>

          {/* Actions Section */}
          <FadeInView delay={450} style={styles.actionsContainer}>
            <NormalButton
              title="Confirm"
              onPress={handleSubmit(onSubmit)}
              bgColor={Colors.primary}
            />
          </FadeInView>

          {/* Spacer pushing bottom elements down */}
          <View style={styles.spacer} />

          {/* Footer */}
          <FadeInView delay={600} style={{ width: '100%' }}>
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
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: scale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: scale(40),
  },
  titleText: {
    fontFamily: Family.HV_Bold,
    fontSize: scale(24),
    color: Colors.textDark,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: scale(30),
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  spacer: {
    flex: 1,
    minHeight: scale(30),
  },
});
