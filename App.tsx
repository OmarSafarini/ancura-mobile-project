import { StyleSheet, View } from 'react-native';
import { useAppFonts } from './src/utils/useAppFonts';



export default function App() {
  const { fontsLoaded } = useAppFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (

    <View style={styles.container}> 
    
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