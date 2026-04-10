import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from 'react-native-flash-message';
import { useAppFonts } from './src/utils/useAppFonts';
import CreateCaseScreen from '@/features/patient/screens/CreateCaseScreen';
import EditCaseScreen from '@/features/patient/screens/EditCaseScreen';


export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <EditCaseScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});