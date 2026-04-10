import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// --- Screens for Tab 1 (Home / Dashboard Stack) ---
import DashboardAndCasesScreen from '../features/doctor/screens/DashboardAndCasesScreen';
import DashboardScreen from '../features/doctor/screens/DashboardScreen'; // Statistics
import DoctorHomeScreen from '../features/doctor/screens/DoctorHomeScreen'; // All Cases
import CaseDetailsAndRepliesScreen from '../features/screens/CaseDetailsAndRepliesScreen';
import DoctorRepliesScreen from '../features/screens/DoctorRepliesScreen';
import AllRepliesScreen from '../features/screens/AllRepliesScreen';

// --- Screens for Tab 2 (Activity Log) ---
import ActivityLogScreen from '../features/patient/screens/ActivityLog'; 

// --- Screens for Tab 3 (Notifications) ---
import NotificationScreen from '../features/patient/screens/Notification';

// --- Screens for Tab 4 (Profile & Settings) ---
import DoctorProfileAndSettings from '../features/doctor/screens/DoctorProfileAndSetting';

// --- Custom Tab Bar ---
import DoctorBNB from '../features/doctor/components/DoctorBNB';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// --- Journey 2: Home Stack ---
function DoctorHomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false}}>
      <HomeStack.Screen name="DashboardAndCasesScreen" component={DashboardAndCasesScreen} />
      <HomeStack.Screen name="DashboardScreen" component={DashboardScreen} />
      <HomeStack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
      <HomeStack.Screen name="CaseDetailsAndRepliesScreen" component={CaseDetailsAndRepliesScreen} />
      <HomeStack.Screen name="DoctorRepliesScreen" component={DoctorRepliesScreen} />
      <HomeStack.Screen name="AllRepliesScreen" component={AllRepliesScreen} />
    </HomeStack.Navigator>
  );
}

// --- Main Doctor Tab Navigator ---
export default function DoctorNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <DoctorBNB {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tab 1: Home / Dashboard */}
      <Tab.Screen 
        name="HomeTab" 
        component={DoctorHomeStackNavigator} 
        options={{ tabBarLabel: 'Home' }} 
      />

      {/* Tab 2: Activity Log */}
      <Tab.Screen 
        name="ActivityTab" 
        component={ActivityLogScreen} 
        options={{ tabBarLabel: 'Activity' }} 
      />

      {/* Tab 3: Notifications */}
      <Tab.Screen 
        name="NotificationsTab" 
        component={NotificationScreen} 
        options={{ tabBarLabel: 'Alerts' }} 
      />

      {/* Tab 4: Profile & Settings */}
      <Tab.Screen 
        name="ProfileTab" 
        component={DoctorProfileAndSettings} 
        options={{ tabBarLabel: 'Profile' }} 
      />
    </Tab.Navigator>
  );
}
