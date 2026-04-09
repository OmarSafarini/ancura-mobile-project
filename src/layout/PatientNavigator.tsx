import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

import PatientHomePage from '@/features/patient/screens/PatientHomePage';
import CreateCase from '@/features/patient/screens/CreateCaseScreen';
import { BaseKnowledge } from '@/features/patient/screens/BaseKnowledge';
import { Notification as PatientNotificationsPage } from '@/features/patient/screens/Notification';
import Settings from '@/features/patient/screens/Settings';

// TODO: Create these screens when ready
function SpecificCasePage() {
  return <View><Text>Specific Case</Text></View>;
}
function EditCasePage() {
  return <View><Text>Edit Case</Text></View>;
}
function CaseDetailsRepliesPage() {
  return <View><Text>Case Details & Replies</Text></View>;
}

const Tab = createBottomTabNavigator();
const PatientCasesStack = createNativeStackNavigator();

function PatientCasesFlow() {
  return (
    <PatientCasesStack.Navigator>
      <PatientCasesStack.Screen name="CasesStatus" component={PatientHomePage} options={{ title: 'حالاتي' }} />
      <PatientCasesStack.Screen name="AddCase" component={CreateCase} options={{ title: 'إضافة حالة' }} />
      <PatientCasesStack.Screen name="SpecificCase" component={SpecificCasePage} />
      <PatientCasesStack.Screen name="EditCase" component={EditCasePage} />
      <PatientCasesStack.Screen name="CaseDetailsWithReplies" component={CaseDetailsRepliesPage} />
    </PatientCasesStack.Navigator>
  );
}

export default function PatientNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="MyCasesTab" component={PatientCasesFlow} options={{ tabBarLabel: 'حالاتي' }} />
      <Tab.Screen name="BaseKnowledgeTab" component={BaseKnowledge} options={{ tabBarLabel: 'المعرفة الطبية' }} />
      <Tab.Screen name="NotificationsTab" component={PatientNotificationsPage} options={{ tabBarLabel: 'الإشعارات' }} />
      <Tab.Screen name="ProfileTab" component={Settings} options={{ tabBarLabel: 'حسابي' }} />
    </Tab.Navigator>
  );
}