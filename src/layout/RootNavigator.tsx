import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import PatientNavigator from './PatientNavigator';
import DoctorNavigator from './DoctorNavigator';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {


  return (
    //we will add conditional navigation but not now cuz we have to complete the ui flow perfectly
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="PatientApp" component={PatientNavigator} />
      <RootStack.Screen name="DoctorApp" component={DoctorNavigator} />
    </RootStack.Navigator>
  );
}
