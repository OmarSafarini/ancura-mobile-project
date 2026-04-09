import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardAndCasesScreen from '@/features/doctor/screens/DashboardAndCasesScreen';
import DashboardScreen from '@/features/doctor/screens/DashboardScreen';
import DoctorHomeScreen from '@/features/doctor/screens/DoctorHomeScreen';
import AllRepliesScreen from '@/features/screens/AllRepliesScreen';
import CaseDetailsAndRepliesScreen from '@/features/screens/CaseDetailsAndRepliesScreen';
import DoctorRepliesScreen from '@/features/screens/DoctorRepliesScreen';
import {ActivityLog} from '@/features/patient/screens/ActivityLog';
import {Notification} from '@/features/patient/screens/Notification';
import DoctorProfile from '@/features/doctor/screens/DoctorProfile';

const CasesStack = createNativeStackNavigator();
const ActivityLogStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const NotificationsStack = createNativeStackNavigator();

export function DoctorMainStack() {
  return (
    <CasesStack.Navigator>
      <CasesStack.Screen name="DashboardAndCasesScreen" component={DashboardAndCasesScreen}/>
      <CasesStack.Screen name="DashboardScreen" component={DashboardScreen}/>
      <CasesStack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen}/>
      <CasesStack.Screen name="AllRepliesScreen" component={AllRepliesScreen}/>
      <CasesStack.Screen name="CaseDetailsAndRepliesScreen" component={CaseDetailsAndRepliesScreen}/>
      <CasesStack.Screen name="DoctorRepliesScreen" component={DoctorRepliesScreen}/>
    </CasesStack.Navigator>
  );
}

export function DoctorActivityLogStack() {
  return (
    <ActivityLogStack.Navigator>
      <ActivityLogStack.Screen name="ProfileSettings" component={ActivityLog} />
    </ActivityLogStack.Navigator>
  );
}

export function DoctorNotificationsStack() {
  return (
    <NotificationsStack.Navigator>
      <NotificationsStack.Screen name="Notification" component={Notification} />
    </NotificationsStack.Navigator>
  );
}

export function DoctorProfileStack() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="DoctorProfile" component={DoctorProfile} />
    </ProfileStack.Navigator>
  );
}

