import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import AppBackground from '../../../components/base/AppBackground';
import Logo from '../../../assets/icons/Logo';
import FadeInView from '../../../utils/FadeInView';
import AuthOTPInput from '../../../components/forms/AuthOTPInput';
import NormalButton from '../../../components/common/NormalButton';
import HIPAAFooter from '../../../components/common/Footer';
import { Colors, palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';
import { verifyOTP } from '../../../services/authService';
import { useState } from 'react';

export default function DoctorVerificationScreen({ navigation, route }: any) {
  const email = route.params?.email || '';

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onCodeFilled = (code: string) => {
    setOtp(code);
  };

  const handleSend = async () => {
    if (otp.length < 8) {
      setError("Please enter the full 8-digit verification code");
      return;
    }
    try {
      setLoading(true);
      setError('');
      const tempToken = await verifyOTP(email, otp);
      
      navigation.navigate('DoctorNewPasswordScreen', { tempToken, email });
    } catch (e: any) {
      setError("Invalid verification code or expired.");
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
            <Text style={styles.titleText}>Verification</Text>
            <Text style={styles.subtitleText}>Enter Verification Code</Text>
          </FadeInView>

          {/* Form Section (OTP) */}
          <FadeInView delay={300} style={styles.formContainer}>
            <AuthOTPInput length={8} onCodeFilled={onCodeFilled} />
            {error ? <Text style={{ color: Colors.error, marginTop: 10 }}>{error}</Text> : null}

            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>if you didn't receive a code. </Text>
              <TouchableOpacity onPress={() => console.log('Resend clicked')}>
                <Text style={styles.resendLink}>Resend</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>

          {/* Actions Section */}
          <FadeInView delay={450} style={styles.actionsContainer}>
            <NormalButton
              title="Verify"
              onPress={handleSend}
              bgColor={Colors.primary}
              loading={loading}
              disabled={loading}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.line} />
              <Text style={styles.orText}>or</Text>
              <View style={styles.line} />
            </View>

            <NormalButton
              title="Apply as a Licensed Professional"
              onPress={() => navigation.navigate('DoctorProfileAndSettings')}
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
    marginBottom: scale(30),
  },
  titleText: {
    fontFamily: Family.HV_Bold,
    fontSize: scale(24),
    color: Colors.textDark,
    marginBottom: scale(10),
  },
  subtitleText: {
    fontFamily: Family.HV_Bold,
    fontSize: scale(18),
    color: palette.darkGray,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: scale(30),
  },
  resendContainer: {
    flexDirection: 'row',
    marginTop: scale(10),
  },
  resendText: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(14),
    color: palette.darkGray4,
  },
  resendLink: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(14),
    color: Colors.secondary,
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
  spacer: {
    flex: 1,
    minHeight: scale(30),
  },
});
