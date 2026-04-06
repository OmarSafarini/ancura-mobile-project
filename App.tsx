import { StyleSheet, View } from 'react-native';
import { useAppFonts } from './src/utils/useAppFonts';
import CreateCaseScreen from '@/features/patient/screens/CreateCaseScreen';


export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <CreateCaseScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});