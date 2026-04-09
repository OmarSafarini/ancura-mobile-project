import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator, AuthNavigatorDoctor } from './AuthNavigator';
import { DoctorMainStack as DoctorNavigator } from './DoctorNavigator';
import PatientNavigator from './PatientNavigator';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'doctor' | 'patient' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="AuthFlow" component={AuthNavigator} />
        ) : userRole === 'doctor' ? (
          <RootStack.Screen name="DoctorFlow" component={DoctorNavigator} />
        ) : (
          <RootStack.Screen name="PatientFlow" component={PatientNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}