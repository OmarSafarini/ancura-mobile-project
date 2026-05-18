import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Screens for Tab 1 (Patient Home Stack) ---
import PatientHomePage from '../features/patient/screens/PatientHomePage';
import CreateCaseScreen from '../features/patient/screens/CreateCaseScreen';
import CaseDetailsAndRepliesScreen from '../features/common_screens/CaseDetailsAndRepliesScreen';
//import EditCaseScreen from '../features/patient/screens/EditCaseScreen';
import AllRepliesScreen from '../features/common_screens/AllRepliesScreen';
import DoctorRepliesScreen from '../features/common_screens/DoctorRepliesScreen';

// --- Screens for Tab 2 (Knowledge Base) ---
import { BaseKnowledge as BaseKnowledgeScreen } from '../features/patient/screens/BaseKnowledge';

// --- Screens for Tab 3 (Notifications) ---
import NotificationScreen from '../features/patient/screens/Notification';

// --- Screens for Tab 4 (Settings) ---
import PatientSettingsScreen from '../features/patient/screens/Settings';

// --- Custom Tab Bar ---
import PatientBNB from '../features/patient/components/PatientBNB';
import EditCaseScreen from '@/features/patient/screens/EditCaseScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const RootStack = createNativeStackNavigator();

// --- Journey 1: Patient Home Stack ---
function PatientHomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="PatientHomePage" component={PatientHomePage} />
    </HomeStack.Navigator>
  );
}

// --- Patient Tab Navigator ---
function PatientTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <PatientBNB {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tab 1: Home / Dashboard */}
      <Tab.Screen
        name="PatientHomeTab"
        component={PatientHomeStackNavigator}
        options={{ tabBarLabel: 'Dashboard' }}
      />

      {/* Tab 2: Knowledge Base / Resources */}
      <Tab.Screen
        name="PatientKnowledgeTab"
        component={BaseKnowledgeScreen}
        options={{ tabBarLabel: 'Resources' }}
      />

      {/* Tab 3: Notifications */}
      <Tab.Screen
        name="PatientNotifyTab"
        component={NotificationScreen}
        options={{ tabBarLabel: 'Notifications' }}
      />

      {/* Tab 4: Settings / Profile */}
      <Tab.Screen
        name="PatientProfileTab"
        component={PatientSettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
}

// --- Main Patient Root Navigator ---
export default function PatientNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="PatientTabs" component={PatientTabNavigator} />
      <RootStack.Screen name="CreateCaseScreen" component={CreateCaseScreen} />
      <RootStack.Screen name="CaseDetailsAndRepliesScreen" component={CaseDetailsAndRepliesScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="EditCaseScreen" component={EditCaseScreen} />
      <RootStack.Screen name="AllRepliesScreen" component={AllRepliesScreen} options={{ gestureEnabled: false }} />
      <RootStack.Screen name="DoctorRepliesScreen" component={DoctorRepliesScreen} options={{ gestureEnabled: false }} />
    </RootStack.Navigator>
  );
}