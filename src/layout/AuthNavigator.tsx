import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth Common Screens
import EntryScreen from '../features/auth/EntryScreen';
import RoleSelectionScreen from '../features/auth/RoleSelectionScreen';

// Patient Auth Screens
import PatientAuthScreen from '../features/patient/screens/PatientAuthScreen';

// Doctor Auth Screens
import DoctorLoginScreen from '../features/doctor/screens/DoctorLoginScreen';
import DoctorForgotPasswordScreen from '../features/doctor/screens/DoctorForgotPasswordScreen';
import DoctorVerificationScreen from '../features/doctor/screens/DoctorVerificationScreen';
import DoctorNewPasswordScreen from '../features/doctor/screens/DoctorNewPasswordScreen';
import DoctorProfileAndSettings from '../features/doctor/screens/DoctorProfileAndSetting';
import {LicenseVerification} from '@/features/doctor/screens/LicenseVerification';
import { DoctorProvider } from '@/Context/DoctorContext';
const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
            // <DoctorProvider>

    <Stack.Navigator
      initialRouteName="EntryScreen"
      screenOptions={{
        headerShown: false, 
      }}
    >
      {/* 1. Initial Welcome Flow */}
      <Stack.Screen name="EntryScreen" component={EntryScreen} />
      <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} />

      {/* 2. Patient Auth Flow */}
      <Stack.Screen name="PatientAuthScreen" component={PatientAuthScreen} />

      {/* 3. Doctor Auth Flow */}
      <Stack.Screen name="DoctorLoginScreen" component={DoctorLoginScreen} />
      <Stack.Screen name="DoctorForgotPasswordScreen" component={DoctorForgotPasswordScreen} />
      <Stack.Screen name="DoctorVerificationScreen" component={DoctorVerificationScreen} />
      <Stack.Screen name="DoctorNewPasswordScreen" component={DoctorNewPasswordScreen} />
      <Stack.Screen name="DoctorProfileAndSettings" component={DoctorProfileAndSettings} />
      <Stack.Screen name="LicenseVerification" component={LicenseVerification} />
    </Stack.Navigator>
   
  );
}