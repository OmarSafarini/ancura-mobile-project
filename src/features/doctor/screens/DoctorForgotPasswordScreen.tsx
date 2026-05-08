import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import AppBackground from '../../../components/base/AppBackground';
import Logo from '../../../assets/icons/Logo';
import FadeInView from '../../../utils/FadeInView';
import InputField from '../../../components/forms/InputFeild';
import NormalButton from '../../../components/common/NormalButton';
import HIPAAFooter from '../../../components/common/Footer';
import { Colors } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';
import { resetPasswordForEmail } from '../../../services/authService';
import { useState } from 'react';

export default function DoctorForgotPasswordScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setError('');
      await resetPasswordForEmail(data.email);
      navigation.navigate('DoctorVerificationScreen', { email: data.email });
    } catch (e: any) {
      setError(e.message || "Error sending code. Please check your email.");
    } finally {
      setLoading(false);
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
            <Text style={styles.titleText}>Forgot Password</Text>
          </FadeInView>

          {/* Form Section */}
          <FadeInView delay={300} style={styles.formContainer}>
            <InputField
              control={control}
              name="email"
              label="Email"
              placeholder="doctor@example.com"
              rules={{
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
              }}
            />
            {error ? <Text style={{ color: Colors.error, marginTop: 10 }}>{error}</Text> : null}
          </FadeInView>

          {/* Actions Section */}
          <FadeInView delay={450} style={styles.actionsContainer}>
            <NormalButton
              title="Send"
              onPress={handleSubmit(onSubmit)}
              bgColor={Colors.primary}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.footerTextContainer}>
              <Text style={styles.footerText}>Do you have an account?</Text>
            </View>

            <NormalButton
              title="Sign In"
              onPress={() => navigation.navigate('DoctorLoginScreen')}
              bgColor={Colors.secondary}
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
  footerTextContainer: {
    marginVertical: scale(20),
  },
  footerText: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(14),
    color: Colors.primary,
  },
  spacer: {
    flex: 1,
    minHeight: scale(30),
  },
});
