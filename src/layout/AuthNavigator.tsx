import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EntryPage from '@/features/auth/EntryScreen';
import RoleSelectionScreen from '@/features/auth/RoleSelectionScreen';
import DoctorForgotPasswordScreen from '@/features/doctor/screens/DoctorForgotPasswordScreen';
import DoctorLoginScreen from '@/features/doctor/screens/DoctorLoginScreen';
import DoctorNewPasswordScreen from '@/features/doctor/screens/DoctorNewPasswordScreen';
import DoctorProfileAndSetting from '@/features/doctor/screens/DoctorProfileAndSetting';
import DoctorVerificationScreen from '@/features/doctor/screens/DoctorVerificationScreen';
import {LicenseVerification} from '@/features/patient/screens/LicenseVerification';

const AuthStack = createNativeStackNavigator();
const AuthStackDoctor = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="EntryPage" component={EntryPage} />
      <AuthStack.Screen name="ChooseRole" component={RoleSelectionScreen} />
    </AuthStack.Navigator>
  );
}

export function AuthNavigatorDoctor() {
  return (
    <AuthStackDoctor.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackDoctor.Screen name="DoctorLoginScreen" component={DoctorLoginScreen} />
      <AuthStackDoctor.Screen name="DoctorForgotPasswordScreen" component={DoctorForgotPasswordScreen} />
      <AuthStackDoctor.Screen name="DoctorVerificationScreen" component={DoctorVerificationScreen} />
      <AuthStackDoctor.Screen name="DoctorNewPasswordScreen" component={DoctorNewPasswordScreen} />
      <AuthStackDoctor.Screen name="DoctorProfileAndSetting" component={DoctorProfileAndSetting} />
      <AuthStackDoctor.Screen name="LicenseVerification" component={LicenseVerification} />
    </AuthStackDoctor.Navigator>
  );
}

