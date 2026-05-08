import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuthStore } from '../store/authStore';
import { restoreSession } from '../services/authService';

import AuthNavigator from './AuthNavigator';
import PatientNavigator from './PatientNavigator';
import DoctorNavigator from './DoctorNavigator';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { role, isLoading } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);


  if (isLoading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }


  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'patient' ? (
        <RootStack.Screen name="PatientApp" component={PatientNavigator} />
      ) : role === 'doctor' ? (
        <RootStack.Screen name="DoctorApp" component={DoctorNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
});