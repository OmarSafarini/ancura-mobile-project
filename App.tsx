import { StyleSheet, View } from 'react-native';
import { useAppFonts } from './src/utils/useAppFonts';
import { Notification } from '@/features/patient/screens/Notification';
import { LicenseVerification } from '@/features/patient/screens/LicenseVerification';
import { BaseKnowledge } from '@/features/patient/screens/BaseKnowledge';
import { ActivityLog } from '@/features/patient/screens/ActivityLog';


export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}> 
      <Notification/> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});