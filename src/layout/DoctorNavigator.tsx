import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardAndCasesScreen from '../features/doctor/screens/DashboardAndCasesScreen';
import DashboardScreen from '../features/doctor/screens/DashboardScreen';
import DoctorHomeScreen from '../features/doctor/screens/DoctorHomeScreen';
import CaseDetailsAndRepliesScreen from '../features/common_screens/CaseDetailsAndRepliesScreen';
import DoctorRepliesScreen from '../features/common_screens/DoctorRepliesScreen';
import AllRepliesScreen from '../features/common_screens/AllRepliesScreen';
import { BaseKnowledge } from '../features/patient/screens/BaseKnowledge';

import ActivityLogScreen from '../features/doctor/screens/ActivityLog';

import DoctorProfile from '../features/doctor/screens/DoctorProfile';

import DoctorBNB from '../features/doctor/components/DoctorBNB';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

function DoctorHomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="DashboardAndCasesScreen" component={DashboardAndCasesScreen} />
      <HomeStack.Screen name="DashboardScreen" component={DashboardScreen} />
      <HomeStack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
    </HomeStack.Navigator>
  );
}

function DoctorTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <DoctorBNB {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={DoctorHomeStackNavigator}
      />
      <Tab.Screen
        name="BaseKnowledgeTab"
        component={BaseKnowledge}
      />
      <Tab.Screen
        name="ActivityTab"
        component={ActivityLogScreen}
      />
    </Tab.Navigator>
  );
}

export default function DoctorNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="DoctorTabs" component={DoctorTabNavigator} />
      <RootStack.Screen name="CaseDetailsAndRepliesScreen" component={CaseDetailsAndRepliesScreen} />
      <RootStack.Screen name="DoctorRepliesScreen" component={DoctorRepliesScreen} />
      <RootStack.Screen name="AllRepliesScreen" component={AllRepliesScreen} />
      <RootStack.Screen name="ProfileTab" component={DoctorProfile} />
    </RootStack.Navigator>
  );
}