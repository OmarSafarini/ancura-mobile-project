import React from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import AppBackground from '../../../components/base/AppBackground';
import Logo from '../../../assets/icons/Logo';
import FadeInView from '../../../utils/FadeInView';
import InputField from '../../../components/forms/InputFeild';
import NormalButton from '../../../components/common/NormalButton';
import HIPAAFooter from '../../../components/common/Footer';
import { Colors, palette } from '../../../utils/colors';
import { Family } from '../../../utils/typography';
import { scale } from '../../../utils/responsive';
import { doctorLogin } from '@/services/Auth/Auth';

export default function DoctorLoginScreen({ navigation }: any) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: any) => {
  try {
    const { user } = await doctorLogin(data.email, data.password);
    console.log("✅ Logged in:", user.id);
    navigation.reset({
      index: 0,
      routes: [{ name: 'DoctorApp' }],
    });
  } catch (error: any) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    // هون تقدر تعرض error message للمستخدم
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
            <Text style={styles.titleText}>Doctor Login</Text>
          </FadeInView>

          {/* Form Section */}
          <FadeInView delay={300} style={styles.formContainer}>
            <InputField
              control={control}
              name="email"
              label="Email"
              placeholder="USR-978896"
              rules={{ required: "Email is required" }}
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

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('DoctorForgotPasswordScreen')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </FadeInView>

          {/* Actions Section */}
          <FadeInView delay={450} style={styles.actionsContainer}>
            <NormalButton
              title="Login"
              onPress={handleSubmit(onSubmit)}
              bgColor={Colors.primary}
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
    marginBottom: scale(35),
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
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  forgotPasswordText: {
    fontFamily: Family.FG_Regular,
    fontSize: scale(14),
    color: Colors.secondary,
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
